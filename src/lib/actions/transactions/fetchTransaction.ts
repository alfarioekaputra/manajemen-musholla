import { db } from "@/lib/db";
import { createClient } from "../../supabase/client";
import { eq, sql } from "drizzle-orm";
import { accounts, transactions } from "@/lib/schema";

// Definisikan tipe untuk data akun yang di-join
type AccountData = {
  name: string;
  type: "masuk" | "keluar";
};

// Definisikan tipe untuk baris transaksi dari Supabase (termasuk join)
type TransactionFromSupabase = {
  id: string;
  amount: number;
  description: string;
  date: string;
  accounts: AccountData | null; // accounts bisa null jika tidak ada join atau data tidak ditemukan
};

export type TransactionRow = {
  id: string;
  amount: number;
  description: string;
  date: string;
  account_name: string;
  type: "masuk" | "keluar";
};

export async function fetchTransactionsByTenant(
  tenantId: string,
  pageIndex: number,
  pageSize: number,
): Promise<{ data: TransactionRow[]; total: number }> {
  const supabase = createClient();

  const from = pageIndex * pageSize;
  const to = from + pageSize - 1;

  const {
    data: txs,
    count,
    error,
  } = await supabase
    .from("transactions")
    .select("id, amount, description, date, accounts(name, type)", {
      count: "exact",
    })
    .eq("tenant_id", tenantId)
    .range(from, to)
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching transactions:", error.message);
    return { data: [], total: 0 };
  }

  const mapped: TransactionRow[] = (
    txs as unknown as TransactionFromSupabase[]
  ).map((t) => ({
    id: t.id,
    amount: t.amount,
    description: t.description,
    date: t.date,
    account_name: t.accounts?.name ?? "-",
    type: t.accounts?.type ?? "keluar", // Beri nilai default yang sesuai, misalnya "keluar" atau "masuk"
  }));

  return { data: mapped, total: count ?? 0 };
}

export async function fetchTotalMasukByTenant(tenantId: string) {
  const [result] = await db
    .select({
      total: sql<number>`COALESCE(SUM(${transactions.amount}), 0)`,
    })
    .from(transactions)
    .innerJoin(accounts, eq(transactions.accountId, accounts.id))
    .where(
      sql`
          ${transactions.tenantId} = ${tenantId}
          AND ${accounts.type} = 'masuk'
          AND DATE_TRUNC('month', ${transactions.date}) = DATE_TRUNC('month', CURRENT_DATE)
        `,
    );

  return result?.total ?? 0;
}

export async function fetchTotalKeluarByTenant(tenantId: string) {
  const [result] = await db
    .select({
      total: sql<number>`COALESCE(SUM(${transactions.amount}), 0)`,
    })
    .from(transactions)
    .innerJoin(accounts, eq(transactions.accountId, accounts.id))
    .where(
      sql`
          ${transactions.tenantId} = ${tenantId}
          AND ${accounts.type} = 'keluar'
          AND DATE_TRUNC('month', ${transactions.date}) = DATE_TRUNC('month', CURRENT_DATE)
        `,
    );
  console.log(result);
  return result?.total ?? 0;
}

export async function fetchMasukByTenant(tenantId: string) {
  const results = await db
    .select({
      id: transactions.id,
      amount: transactions.amount,
      description: transactions.description,
      date: transactions.date,
      accountName: accounts.name,
      accountType: accounts.type,
    })
    .from(transactions)
    .innerJoin(accounts, eq(transactions.accountId, accounts.id))
    .where(
      sql`
          ${transactions.tenantId} = ${tenantId}
          AND ${accounts.type} = 'masuk'
          AND DATE_TRUNC('month', ${transactions.date}) = DATE_TRUNC('month', CURRENT_DATE)
        `,
    );

  return results;
}

export async function fetchKeluarByTenant(tenantId: string) {
  const results = await db
    .select({
      id: transactions.id,
      amount: transactions.amount,
      description: transactions.description,
      date: transactions.date,
      accountName: accounts.name,
      accountType: accounts.type,
    })
    .from(transactions)
    .innerJoin(accounts, eq(transactions.accountId, accounts.id))
    .where(
      sql`
          ${transactions.tenantId} = ${tenantId}
          AND ${accounts.type} = 'keluar'
          AND DATE_TRUNC('month', ${transactions.date}) = DATE_TRUNC('month', CURRENT_DATE)
        `,
    );

  return results;
}

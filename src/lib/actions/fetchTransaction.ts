import { createClient } from "../supabase/client";

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

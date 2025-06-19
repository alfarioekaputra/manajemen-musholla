import { createClient } from "../supabase/client";

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapped: TransactionRow[] = (txs as any[]).map((t) => ({
    id: t.id,
    amount: t.amount,
    description: t.description,
    date: t.date,
    account_name: t.accounts?.name ?? "-",
    type: t.accounts?.type ?? "-",
  }));

  return { data: mapped, total: count ?? 0 };
}

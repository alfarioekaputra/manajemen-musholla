"use server";
import { createClient } from "@/lib/supabase/server";
import { db } from "../../db";
import { transactions } from "../../schema";
import { format } from "date-fns";

export async function createTransaction(form: {
  accountId: string;
  amount: number;
  description?: string;
  date: Date;
}) {
  const supabase = await createClient();
  const { data: session } = await supabase.auth.getSession();
  const userId = session?.session?.user.id;
  if (!userId) return false;

  const { data: userData } = await supabase
    .from("users")
    .select("tenant_id")
    .eq("id", userId)
    .single();

  const tenantId = userData?.tenant_id;
  if (!tenantId) return false;

  const formattedDate = format(form.date, "yyyy-MM-dd"); // Assuming your DB wants "yyyy-MM-dd" string

  try {
    return await db.insert(transactions).values({
      tenantId,
      accountId: form.accountId,
      amount: form.amount.toString(),
      description: form.description,
      date: formattedDate,
      userId,
    });
  } catch (err) {
    console.error("Gagal simpan transaksi:", err);
    return false;
  }
}

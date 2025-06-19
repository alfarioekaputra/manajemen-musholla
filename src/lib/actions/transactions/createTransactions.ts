"use server";
import { createClient } from "@/lib/supabase/server";
import { db } from "../../db";
import { transactions } from "../../schema";

export async function createTransaction(form: {
  accountId: string;
  amount: string;
  description?: string;
  date: string;
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

  try {
    return await db.insert(transactions).values({
      tenantId,
      accountId: form.accountId,
      amount: form.amount,
      description: form.description,
      date: form.date,
      userId,
    });
  } catch (err) {
    console.error("Gagal simpan transaksi:", err);
    return false;
  }
}

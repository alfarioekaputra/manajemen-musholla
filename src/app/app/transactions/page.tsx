import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TransactionTable from "./_components/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function TransactionsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <>
      <Button variant="default">
        <Link href="/app/transactions/create">Tambah Data</Link>
      </Button>
      <TransactionTable />
    </>
  );
}

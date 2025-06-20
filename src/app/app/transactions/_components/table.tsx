"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import DataTable from "@/components/datatable";
import { ColumnDef } from "@tanstack/react-table";
import {
  fetchTransactionsByTenant,
  TransactionRow,
} from "@/lib/actions/transactions/fetchTransaction";

const columns: ColumnDef<TransactionRow>[] = [
  { accessorKey: "date", header: "Tanggal" },
  { accessorKey: "account_name", header: "Jenis" },
  {
    accessorKey: "amount",
    header: "Nominal",
    cell: ({ row }) => {
      const amt = row.original.amount;
      return (
        <span className={amt > 0 ? "text-green-600" : "text-red-600"}>
          Rp {amt.toLocaleString("id-ID")}
        </span>
      );
    },
  },
  { accessorKey: "description", header: "Keterangan" },
];

export default function TransactionTable() {
  const [data, setData] = useState<TransactionRow[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: session } = await supabase.auth.getSession();
      const user = session?.session?.user;
      if (!user) return;

      const { data: userRow } = await supabase
        .from("users")
        .select("tenant_id")
        .eq("id", user.id)
        .single();

      const tenantId = userRow?.tenant_id;
      if (!tenantId) return;

      const { data: txs, total } = await fetchTransactionsByTenant(
        tenantId,
        pageIndex,
        pageSize,
      );

      setData(txs);
      setTotalRows(total);
    }

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  return (
    <DataTable
      data={data}
      columns={columns}
      pageIndex={pageIndex}
      pageSize={pageSize}
      totalRows={totalRows}
      onPageChange={setPageIndex}
    />
  );
}

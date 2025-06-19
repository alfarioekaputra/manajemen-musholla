"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { createTransaction } from "@/lib/actions/transactions/createTransactions";
import { useRouter } from "next/navigation";

type Account = {
  id: string;
  name: string;
  type: "masuk" | "keluar";
};

// 🎯 Zod schema untuk validasi
const TransactionSchema = z.object({
  accountId: z.string().nonempty("Pilih akun terlebih dahulu"),
  amount: z.string().refine((val) => parseFloat(val) > 0, {
    message: "Nominal harus lebih dari 0",
  }),
  description: z.string().optional(),
  date: z.string().nonempty("Tanggal wajib diisi"),
});

type TransactionFormValues = z.infer<typeof TransactionSchema>;

export default function TransactionForm() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
    },
  });

  useEffect(() => {
    async function fetchAccounts() {
      const supabase = createClient();
      const { data: session } = await supabase.auth.getSession();
      const userId = session?.session?.user.id;
      if (!userId) return;

      const { data } = await supabase
        .from("users")
        .select("tenant_id")
        .eq("id", userId)
        .single();

      const tenantId = data?.tenant_id;

      const { data: accs } = await supabase
        .from("accounts")
        .select("id, name, type")
        .eq("tenant_id", tenantId);

      setAccounts(accs || []);
    }

    fetchAccounts();
  }, []);

  const onSubmit = async (data: TransactionFormValues) => {
    const success = await createTransaction(data);
    if (success) {
      router.push("/app/transactions");
    } else {
      alert("Gagal menyimpan transaksi");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-6 rounded shadow max-w-md"
    >
      <h2 className="text-xl font-semibold">Tambah Transaksi</h2>

      <div>
        <label className="block mb-1">Akun</label>
        <select
          {...register("accountId")}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">-- Pilih Akun --</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name}
            </option>
          ))}
        </select>
        {errors.accountId && (
          <p className="text-red-500 text-sm">{errors.accountId.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Nominal</label>
        <input
          type="number"
          step="any"
          {...register("amount")}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Keterangan</label>
        <input
          type="text"
          {...register("description")}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Tanggal</label>
        <input
          type="date"
          {...register("date")}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Simpan
      </button>
    </form>
  );
}

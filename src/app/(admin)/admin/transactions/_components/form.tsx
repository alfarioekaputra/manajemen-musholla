"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { createTransaction } from "@/lib/actions/transactions/createTransactions";
import { useRouter } from "next/navigation";

import {
  FileText,
  Tag,
  Save,
  Banknote,
  CalendarIcon,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type Account = {
  id: string;
  name: string;
  type: "masuk" | "keluar";
};

// 🎯 Zod schema untuk validasi
const TransactionSchema = z.object({
  accountId: z.string().nonempty("Pilih akun terlebih dahulu"),
  amount: z.number().min(0, "Amount must be a positive number."),
  description: z.string().optional(),
  date: z.date({
    required_error: "A date is required.", // Optional: add a required error message
    invalid_type_error: "Please select a valid date.", // Optional: error if input isn't a date
  }),
});

export default function TransactionForm() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(false); // <--- State loading baru

  const form = useForm<z.infer<typeof TransactionSchema>>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      date: new Date(),
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

  const onSubmit = async (data: z.infer<typeof TransactionSchema>) => {
    setIsLoading(true);
    const success = await createTransaction(data);
    if (success) {
      setIsLoading(false);
      router.push("/admin/transactions");
    } else {
      alert("Gagal menyimpan transaksi");
    }
  };

  const formatCurrency = (value: number | undefined | null): string => {
    if (value === undefined || value === null) {
      return "0"; // Atau "" jika Anda ingin input kosong
    }
    return new Intl.NumberFormat("id-ID").format(value);
  };

  // Modifikasi handleAmountChange
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInputValue = e.target.value;

    const cleanNumericString = rawInputValue.replace(/\D/g, "");

    // Pastikan tidak kosong sebelum parsing
    let parsedNumber: number;
    if (cleanNumericString === "") {
      parsedNumber = 0; // Jika string kosong, anggap 0
    } else {
      parsedNumber = parseInt(cleanNumericString, 10); // Gunakan radix 10 secara eksplisit
    }

    // Final check for NaN and safe integer
    const finalNumberValue = isNaN(parsedNumber) ? 0 : parsedNumber;

    // Perbarui nilai di react-hook-form
    form.setValue("amount", finalNumberValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl flex items-center gap-2">
            Detail Transaksi
          </CardTitle>
          <CardDescription>
            Isi semua field yang diperlukan untuk mencatat transaksi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="accountId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        Kategori
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 w-full">
                            <SelectValue placeholder="-- Pilih Kategori --" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full">
                          {accounts.map((account) => (
                            <SelectItem key={account.id} value={account.id}>
                              <div className="flex items-center gap-2">
                                <span>{account.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold flex items-center gap-2">
                        <Banknote className="h-4 w-4" />
                        Nominal
                      </FormLabel>
                      <div className="relative">
                        <Input
                          // {...field}
                          name={field.name}
                          onBlur={field.onBlur}
                          type="text"
                          placeholder="0"
                          className="h-12 pl-12 text-lg no-arrows-input"
                          value={formatCurrency(field.value)}
                          onChange={handleAmountChange}
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground font-semibold">
                          Rp
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Keterangan
                      </FormLabel>
                      <Textarea {...field} rows={4} className="resize-none" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Tanggal
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pilih Tanggal</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>
              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 text-base font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      {/* <--- Spinner */}
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      Simpan Transaksi
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

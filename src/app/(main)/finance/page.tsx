import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react";

import {
  fetchKeluarByTenant,
  fetchMasukByTenant,
  fetchTotalKeluarByTenant,
  fetchTotalMasukByTenant,
} from "@/lib/actions/transactions/fetchTransaction";

export default async function Finance() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const totalMasuk = await fetchTotalMasukByTenant(
    "cc7ecaf6-4a29-48a8-badb-d4b96b0dbec3",
  );

  const totalKeluar = await fetchTotalKeluarByTenant(
    "cc7ecaf6-4a29-48a8-badb-d4b96b0dbec3",
  );

  const saldo = totalMasuk - totalKeluar;

  const incomeData = await fetchMasukByTenant(
    "cc7ecaf6-4a29-48a8-badb-d4b96b0dbec3",
  );

  const expenseData = await fetchKeluarByTenant(
    "cc7ecaf6-4a29-48a8-badb-d4b96b0dbec3",
  );

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const monthName = month[today.getMonth()];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Laporan Keuangan
          </h1>
          <p className="text-gray-600">
            Transparansi pengelolaan dana Musholla Al-Barokah
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-green-50 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">
                Total Pemasukan
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(totalMasuk)}
              </div>
              <p className="text-xs text-green-600 mt-1">{monthName} 2025</p>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-700">
                Total Pengeluaran
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(totalKeluar)}
              </div>
              <p className="text-xs text-red-600 mt-1">{monthName} 2025</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">
                Saldo
              </CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(saldo)}
              </div>
              <p className="text-xs text-blue-600 mt-1">Per {monthName} 2025</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Income Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <TrendingUp className="h-5 w-5 mr-2" />
                Pemasukan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incomeData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-green-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-500">
                          {formatDate(item.date)}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-800">
                        {item.description}
                      </h3>
                      <Badge variant="outline" className="mt-1">
                        {item.accountName}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        {formatCurrency(parseInt(item.amount))}
                      </p>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700"
                      >
                        Pemasukan
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expense Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-700">
                <TrendingDown className="h-5 w-5 mr-2" />
                Pengeluaran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenseData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-red-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-500">
                          {formatDate(item.date)}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-800">
                        {item.description}
                      </h3>
                      <Badge variant="outline" className="mt-1">
                        {item.accountName}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600">
                        {formatCurrency(parseInt(item.amount))}
                      </p>
                      <Badge
                        variant="secondary"
                        className="bg-red-100 text-red-700"
                      >
                        Pengeluaran
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Note */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-blue-800 text-center">
              <strong>Catatan:</strong> Semua data keuangan ini dipublikasikan
              untuk menjaga transparansi dan akuntabilitas dalam pengelolaan
              dana musholla. Jika ada pertanyaan, silakan hubungi pengurus.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Banknote, BookOpen, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Selamat Datang di
            <span className="text-emerald-600 block">
              Musholla Baitul Jannah
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Tempat ibadah yang terbuka untuk semua umat Muslim. Mari bergabung
            dalam aktivitas keagamaan dan membangun komunitas yang lebih kuat
            bersama-sama.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Link href="/activities">Lihat Kegiatan</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">Baca Blog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Informasi Terbuka
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <Banknote className="h-8 w-8 text-emerald-600 mb-2" />
                <CardTitle>Laporan Keuangan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Transparansi penuh dalam pengelolaan dana masjid. Lihat
                  pemasukan dan pengeluaran secara real-time.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/finance">Lihat Detail</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <Calendar className="h-8 w-8 text-emerald-600 mb-2" />
                <CardTitle>Kegiatan Musholla</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Jadwal sholat berjamaah, kajian rutin, dan berbagai kegiatan
                  keagamaan lainnya.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/activities">Lihat Jadwal</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <BookOpen className="h-8 w-8 text-emerald-600 mb-2" />
                <CardTitle>Blog Ilmu Agama</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Artikel-artikel edukatif tentang ajaran Islam, fiqh, akhlak,
                  dan kehidupan sehari-hari.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/blog">Baca Artikel</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Financial Summary */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Ringkasan Keuangan Bulan Ini
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Total Pemasukan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">
                  Rp 12,500,000
                </p>
                <p className="text-green-600 mt-2">
                  Dari infaq, sedekah, dan donasi
                </p>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Banknote className="h-5 w-5 mr-2" />
                  Total Pengeluaran
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">Rp 8,750,000</p>
                <p className="text-blue-600 mt-2">
                  Untuk operasional dan kegiatan
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

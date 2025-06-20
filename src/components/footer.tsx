import { Building2, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-8 w-8 text-emerald-400" />
              <span className="text-xl font-bold">Musholla Al-Barokah</span>
            </div>
            <p className="text-gray-300 mb-4">
              Tempat ibadah yang memberikan kedamaian dan ketenangan bagi umat
              Muslim. Bergabunglah dengan komunitas kami dalam menjalankan
              aktivitas keagamaan.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">
                  Jl. Barokah No. 123, Jakarta
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">+62 21 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">
                  info@musholla-albarokah.id
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Waktu Sholat</h3>
            <div className="space-y-1 text-gray-300">
              <div className="flex justify-between">
                <span>Subuh</span>
                <span>04:30</span>
              </div>
              <div className="flex justify-between">
                <span>Dzuhur</span>
                <span>12:00</span>
              </div>
              <div className="flex justify-between">
                <span>Ashar</span>
                <span>15:15</span>
              </div>
              <div className="flex justify-between">
                <span>Maghrib</span>
                <span>18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Isya</span>
                <span>19:30</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Musholla Baitul Jannah. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}

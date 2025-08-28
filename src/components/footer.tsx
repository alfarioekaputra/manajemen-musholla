import { Building2, MapPin, Phone, Mail } from "lucide-react";

export default async function Footer() {
  const today = new Date();

  // Get the year
  const year = today.getFullYear();

  // Get the month (add 1 because getMonth() returns 0-11) and pad with a leading zero if needed
  const month = String(today.getMonth() + 1).padStart(2, "0");

  // Get the day of the month and pad with a leading zero if needed
  const day = String(today.getDate()).padStart(2, "0");

  // Combine the parts into the desired format
  const formattedDate = `${year}-${month}-${day}`;
  const res = await fetch(
    `https://api.myquran.com/v2/sholat/jadwal/1204/${formattedDate}`,
    {
      cache: "no-store", // atau next: { revalidate: 3600 } untuk ISR
    },
  );
  const data = await res.json();

  const jadwal = data.data.jadwal;

  console.log(jadwal);
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-8 w-8 text-emerald-400" />
              <span className="text-xl font-bold">Musholla Baitul Jannah</span>
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
                  Sentraland Paradise, Cluster Venezia Parung Panjang
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">+62 21 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">
                  info@mushollabaituljannah.id
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Waktu Sholat (Parung Panjang, Kab. Bogor)
            </h3>
            <div className="space-y-1 text-gray-300">
              <div className="flex justify-between">
                <span>Subuh</span>
                <span>{jadwal.subuh}</span>
              </div>
              <div className="flex justify-between">
                <span>Dzuhur</span>
                <span>{jadwal.dzuhur}</span>
              </div>
              <div className="flex justify-between">
                <span>Ashar</span>
                <span>{jadwal.ashar}</span>
              </div>
              <div className="flex justify-between">
                <span>Maghrib</span>
                <span>{jadwal.maghrib}</span>
              </div>
              <div className="flex justify-between">
                <span>Isya</span>
                <span>{jadwal.isya}</span>
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

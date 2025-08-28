import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, MapPin } from "lucide-react";

export default function Activities() {
  const regularActivities = [
    {
      name: "Sholat Berjamaah",
      schedule: "5 waktu sehari",
      description: "Sholat berjamaah untuk semua jamaah",
      participants: "Semua jamaah",
    },
    {
      name: "Kajian Rutin",
      schedule: "Setiap Ahad Malam Seini setelah Isya",
      description: "Kajian ilmu agama bersama ustadz",
      participants: "Terbuka untuk umum",
    },
    {
      name: "TPA Anak-anak",
      schedule: "Senin - Kamis sore",
      description: "Taman Pendidikan Al-Quran untuk anak-anak",
      participants: "Anak usia 5-12 tahun",
    },
  ];

  const upcomingEvents = [
    {
      title: "Peringatan Maulid Nabi",
      date: "2024-02-15",
      time: "19:00 WIB",
      location: "Musholla Al-Barokah",
      description:
        "Peringatan kelahiran Nabi Muhammad SAW dengan ceramah dan shalawat",
    },
    {
      title: "Santunan Anak Yatim",
      date: "2024-02-20",
      time: "09:00 WIB",
      location: "Musholla Al-Barokah",
      description:
        "Program santunan rutin untuk anak yatim di sekitar musholla",
    },
    {
      title: "Bakti Sosial",
      date: "2024-02-25",
      time: "08:00 WIB",
      location: "Sekitar Musholla",
      description: "Kegiatan gotong royong membersihkan lingkungan sekitar",
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Kegiatan Musholla
          </h1>
          <p className="text-gray-600">
            Jadwal kegiatan rutin dan acara mendatang di Musholla Al-Barokah
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Regular Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-emerald-700">
                <Calendar className="h-5 w-5 mr-2" />
                Kegiatan Rutin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regularActivities.map((activity, index) => (
                  <div key={index} className="p-4 bg-emerald-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {activity.name}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{activity.schedule}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{activity.participants}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Calendar className="h-5 w-5 mr-2" />
                Acara Mendatang
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {event.title}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700"
                      >
                        Mendatang
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

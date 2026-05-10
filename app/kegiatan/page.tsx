import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Kegiatan Komunitas — Komunitas Wikimedia Indonesia",
  description:
    "Komunitas Wikimedia Indonesia mendorong partisipasi sukarelawan serta mendukung komunitas yang aktif menyunting, berbagi, dan menjaga kualitas informasi di proyek Wikimedia.",
};

const activities = [
  {
    title: "Rapat Komunitas",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Rapat_Komunitas_Wikimedia_Bandung-1.jpg",
    description:
      "Pertemuan rutin anggota komunitas menjadi ruang untuk saling bertukar ide, mengevaluasi kegiatan yang telah berjalan, serta merencanakan langkah-langkah selanjutnya secara bersama-sama. Melalui proses ini, komunitas dapat menjaga koordinasi dan pengembangan kegiatan secara berkelanjutan.",
    href: "https://id.wikimedia.org/wiki/Rapat_Komunitas",
  },
  {
    title: "Dana Wiki",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/WikiBusanding_-_Pesisir_Teluk_Betung_(26).jpg",
    description:
      "Program pendanaan yang mendukung kegiatan komunitas dalam meningkatkan kontribusi konten di proyek Wikimedia. Program ini juga mendorong pengembangan ide, kreativitas, serta partisipasi aktif komunitas dalam berbagai inisiatif yang berfokus pada penguatan pengetahuan bebas.",
    href: "https://meta.wikimedia.org/wiki/Wikimedia_Indonesia/Dana_Wiki",
  },
  {
    title: "Malam Keakraban",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Makrab_Komunitas_Wikimedia_Bandung_2026_(14).jpg",
    description:
      "Kegiatan komunitas yang dirancang sebagai ruang untuk mempererat hubungan antaranggota, membangun keakraban, serta meningkatkan interaksi dalam suasana yang lebih santai. Melalui kegiatan ini, anggota dapat saling mengenal lebih dekat dan memperkuat rasa kebersamaan dalam komunitas.",
    href: "https://id.wikimedia.org/wiki/Malam_Keakraban",
  },
  {
    title: "Kunjungan Komunitas",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Visitation_of_Wikimedia_Indonesia_to_Nias_Wikimedia_community,_Gunungsitoli_City;_September_2024_(22).jpg",
    description:
      "Kegiatan Tim Komunitas mengunjungi berbagai komunitas yang didukung Wikimedia Indonesia untuk mengenal anggota lebih dekat serta memahami aspirasi dan kebutuhan mereka secara langsung.",
    href: null,
  },
  {
    title: "Perayaan Ulang Tahun",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Foto_bersama_sukarelawan_dan_kue_ulang_tahun_ke-25_Wikipedia_(3).jpg",
    description:
      "Perayaan ulang tahun proyek Wikimedia sebagai momen untuk merayakan perjalanan, kontribusi, dan perkembangan komunitas pengetahuan bebas.",
    href: null,
  },
  {
    title: "Hibah Buku",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Hibah_Wikimedia_Indonesia_PNG.png",
    description:
      "Program dukungan buku yang memberikan akses bacaan bagi sukarelawan untuk memperkaya pengetahuan dan referensi dalam berkontribusi di proyek Wikimedia. Melalui program ini, sukarelawan diharapkan dapat meningkatkan kualitas dan kedalaman konten yang mereka kembangkan.",
    href: "https://meta.wikimedia.org/wiki/Wikimedia_Indonesia/Hibah_Buku",
  },
];

export default function KegiatanPage() {
  return (
    <>
      <Header />
      <main className="flex-1">

        {/* Page Hero */}
        <section className="bg-[#f0f5ff] border-b border-[#dbe8f8]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
              <div>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-950 leading-tight mb-5">
                  Kegiatan Komunitas
                </h1>
                <p className="text-gray-500 text-base lg:text-lg leading-relaxed max-w-3xl">
                  Komunitas Wikimedia Indonesia mendorong partisipasi sukarelawan serta
                  mendukung komunitas yang aktif menyunting, berbagi, dan menjaga kualitas
                  informasi di proyek Wikimedia. Dukungan ini diwujudkan melalui berbagai
                  kegiatan, mulai dari mentorship bagi anggota komunitas untuk saling
                  belajar dan berkembang, penguatan komunitas daerah melalui hibah dan
                  pertemuan, hingga forum daring dan luring yang menjadi ruang diskusi
                  terbuka dan kolaboratif.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Activities Grid */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-10">
              {activities.map((activity, index) => (
                <article
                  key={activity.title}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: "16/10" }}>
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Number badge */}
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                      <span className="text-[11px] font-extrabold text-[#006A9F]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <h2 className="text-[17px] font-bold text-gray-900 mb-2.5 leading-snug">
                      {activity.title}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1">
                      {activity.description}
                    </p>

                    {activity.href && (
                      <div className="mt-5 pt-5 border-t border-gray-100">
                        <a
                          href={activity.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#006A9F] hover:text-[#005080] transition-colors group/link"
                        >
                          Pelajari lebih lanjut
                          <svg
                            className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

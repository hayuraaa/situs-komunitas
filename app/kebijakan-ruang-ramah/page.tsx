import type { Metadata } from "next";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Kebijakan Ruang Ramah — Komunitas Wikimedia Indonesia",
  description:
    "Panduan kebijakan ruang ramah untuk seluruh acara yang diselenggarakan oleh Wikimedia Indonesia demi pengalaman yang positif bagi semua peserta.",
};

const harassmentItems = [
  "Komentar verbal yang menyinggung hal-hal yang berhubungan dengan gender, orientasi seksual, identitas gender atau ekspresi, disabilitas, penampilan fisik, ukuran tubuh, ras, suku, afiliasi politik, atau agama;",
  "Intimidasi yang disengaja, menguntit, mengikuti orang lain tanpa seizinnya, pelecehan melalui foto atau rekaman, mengganggu pembicaraan atau acara lainnya;",
  "Menampilkan konten-konten seksual yang tidak kontekstual, melakukan kontak fisik yang tidak sesuai pada tempatnya, dan menyoroti aktivitas seksual yang tidak diinginkan;",
  "Perilaku lainnya yang tidak secara eksplisit dibahas di atas, tetapi dapat ditafsirkan sebagai bentuk tindakan yang tidak disukai dan tidak masuk akal.",
];

const preventionParagraphs = [
  "Karena acara komunitas Wikimedia dikelola oleh sukarelawan dan/atau staf Wikimedia Indonesia, penyelenggara acara juga mengharapkan bantuan dan dukungan dari semua peserta dalam mempertahankan kebijakan ruang ramah acara ini. Jika Anda mengalami tindakan pelecehan, atau Anda melihat orang lain yang mengalami tindakan pelecehan, atau memiliki masalah lain, segera hubungi penyelenggara acara.",
  "Jika panitia khawatir akan perilaku seseorang, atau menerima keluhan dari peserta acara, panitia mungkin akan mengambil tindakan yang sesuai dengan situasi pada saat itu. Hal ini dapat berupa peringatan secara personal kepada orang yang bersangkutan; atau dalam kasus yang lebih serius, panitia acara mungkin perlu meminta orang tersebut untuk meninggalkan tempat acara.",
  "Panitia penyelenggara acara dengan senang hati membantu peserta untuk memberikan pendamping, atau membantu orang-orang yang mengalami pelecehan agar merasa aman selama acara berlangsung.",
  "Individu dengan pola perilaku melecehkan atau yang mengancam akan melecehkan individu lain atau berpotensi mengganggu acara, mereka dapat diminta untuk tidak hadir dalam acara tersebut. Penyelenggara acara dapat mengambil langkah-langkah terlebih dahulu untuk mengecualikan individu dari acara, di mana ada keyakinan bahwa kehadiran peserta tersebut akan melakukan pelecehan atau menimbulkan “efek membahayakan” bagi peserta lainnya.",
];

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 shrink-0 mt-0.5"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function KebijakanRuangRamahPage() {
  return (
    <>
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-[#f0f5ff] border-b border-[#dbe8f8]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-950 leading-tight mb-5">
                Kebijakan Ruang Ramah
              </h1>
              <p className="text-gray-500 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
                Kebijakan ruang ramah acara adalah panduan untuk pertemuan komunitas
                Wikimedia yang semua peserta diharapkan dapat memberikan pengalaman
                yang positif dan suasana yang saling mendukung bagi semua peserta
                dalam acara Wikimedia Indonesia.
              </p>
            </div>
          </div>
        </section>

        {/* Panduan Umum */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-950 leading-tight mb-6">
                  Panduan umum kebijakan ruang yang ramah untuk seluruh acara-acara
                  yang diselenggarakan oleh Wikimedia Indonesia
                </h2>
                <p className="text-gray-500 text-base leading-relaxed">
                  Wikimedia Indonesia berdedikasi untuk memberikan pengalaman yang
                  ramah bagi semua orang, tanpa memandang jenis kelamin, orientasi
                  seksual, identitas gender atau ekspresi, disabilitas, penampilan,
                  ras, agama, atau pilihan lisensi bebas (dan tidak terbatas pada
                  aspek-aspek tersebut). Kami tidak memberikan toleransi atas
                  pelecehan yang terjadi pada peserta acara-acara yang
                  diselenggarakan oleh Wikimedia Indonesia. Siapa pun yang
                  melanggar peraturan ini dapat diminta untuk meninggalkan acara
                  tersebut.
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <div className="relative" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src="/Untitled2.png"
                    alt="Kebijakan Ruang Ramah"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Definisi Pelecehan */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-[#006A9F] to-[#0088cc] p-8 md:p-12 shadow-xl">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
                Definisi Pelecehan
              </h2>
              <p className="text-white/90 text-base lg:text-lg mb-8">
                Yang termasuk kategori pelecehan, sebagai berikut:
              </p>
              <ul className="space-y-5">
                {harassmentItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white text-base lg:text-lg leading-relaxed">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-white font-semibold text-base lg:text-lg mt-8">
                Peserta yang diminta untuk menghentikan perilaku tersebut diharapkan dapat mematuhinya.
              </p>
            </div>
          </div>
        </section>

        {/* Konten Berpotensi Menyinggung */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <div className="relative w-full max-w-md" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src="/Untitled.png"
                    alt="Konten yang berpotensi menyinggung"
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-950 leading-tight mb-6">
                  Konten yang Berpotensi Menyinggung
                </h2>
                <div className="space-y-4 text-gray-500 text-base leading-relaxed">
                  <p>
                    Gambar dan media lain yang mungkin menyinggung, menyusahkan,
                    atau mengganggu orang lain tidak boleh ditampilkan dalam
                    konferensi dan acara, kecuali saat konten tersebut terkait
                    langsung dengan topik yang berhubungan dengan Wikimedia. Selain
                    itu, peserta harus diberi informasi dengan jelas sebelum konten
                    ditampilkan.
                  </p>
                  <p>
                    Beberapa contoh konten semacam itu mencakup gambar yang
                    menunjukkan ketelanjangan, konten seksual, kekerasan, atau
                    gambar medis. Perhatian yang sama juga harus dilakukan ketika
                    menggambarkan orang pribumi yang telah meninggal, tidak hanya
                    dengan citra, tetapi juga dalam rekaman teks atau audio, yang
                    harus dihindari jika memungkinkan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tindakan Pencegahan */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-[#006A9F] to-[#0088cc] p-8 md:p-12 shadow-xl">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-8">
                Tindakan Pencegahan
              </h2>
              <div className="space-y-5 text-white text-base lg:text-lg leading-relaxed">
                {preventionParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

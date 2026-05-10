"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const kegiatan = [
  {
    title: "Rapat Komunitas",
    deskripsi:
      "Pertemuan rutin untuk membahas, mengevaluasi, dan merencanakan kegiatan komunitas.",
    gambar:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Rapat_Komunitas_Wikimedia_Bandung-1.jpg",
  },
  {
    title: "Dana Wiki",
    deskripsi:
      "Dukungan pendanaan untuk kegiatan komunitas dalam meningkatkan kontribusi dan kreativitas.",
    gambar:
      "https://commons.wikimedia.org/wiki/Special:FilePath/WikiBusanding_-_Pesisir_Teluk_Betung_(26).jpg",
  },
  {
    title: "Malam Keakraban",
    deskripsi:
      "Kegiatan untuk mempererat hubungan dan interaksi antaranggota.",
    gambar:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Makrab_Komunitas_Wikimedia_Bandung_2026_(14).jpg",
  },
  {
    title: "Kunjungan Komunitas",
    deskripsi:
      "Kegiatan Tim Komunitas mengunjungi berbagai komunitas yang didukung oleh Wikimedia Indonesia.",
    gambar:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Visitation_of_Wikimedia_Indonesia_to_Nias_Wikimedia_community,_Gunungsitoli_City;_September_2024_(22).jpg",
  },
  {
    title: "Perayaan Ulang Tahun",
    deskripsi: "Kegiatan untuk merayakan ulang tahun proyek Wikimedia.",
    gambar:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Foto_bersama_sukarelawan_dan_kue_ulang_tahun_ke-25_Wikipedia_(3).jpg",
  },
  {
    title: "Hibah Buku",
    deskripsi:
      "Dukungan buku bagi sukarelawan untuk meningkatkan kualitas kontribusi di proyek Wikimedia.",
    gambar:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Hibah_Wikimedia_Indonesia_PNG.png",
  },
];

// Tambahkan 3 clone di akhir agar looping mulus ke depan
const displayed = [...kegiatan, ...kegiatan.slice(0, 3)];

export default function KegiatanSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const getAmount = useCallback(() => {
    const card = scrollRef.current?.querySelector("[data-card]") as HTMLElement | null;
    return card ? card.offsetWidth + 24 : 320;
  }, []);

  // Scroll maju 1 card; jika masuk zona clone, silently reset setelah animasi
  const advance = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = getAmount();
    const currentIndex = Math.round(el.scrollLeft / amount);
    const nextIndex = currentIndex + 1;

    el.scrollTo({ left: nextIndex * amount, behavior: "smooth" });

    if (nextIndex >= kegiatan.length) {
      setTimeout(() => {
        el.scrollTo({
          left: (nextIndex - kegiatan.length) * amount,
          behavior: "instant",
        });
      }, 550);
    }
  }, [getAmount]);

  const retreat = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = getAmount();
    const currentIndex = Math.round(el.scrollLeft / amount);
    if (currentIndex <= 0) {
      el.scrollTo({ left: (kegiatan.length - 1) * amount, behavior: "instant" });
    } else {
      el.scrollTo({ left: (currentIndex - 1) * amount, behavior: "smooth" });
    }
  }, [getAmount]);

  // Restart interval setelah interaksi manual
  const restartInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPausedRef.current) advance();
    }, 3000);
  }, [advance]);

  // Mulai autoplay
  useEffect(() => {
    restartInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [restartInterval]);

  // Sinkronisasi activeIndex dari posisi scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / getAmount()) % kegiatan.length;
      setActiveIndex(idx);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [getAmount]);

  const handlePrev = () => { retreat(); restartInterval(); };
  const handleNext = () => { advance(); restartInterval(); };

  return (
    <section
      className="bg-blue-10 relative overflow-hidden bg-blue-50 py-20 lg:py-28"
      onMouseEnter={() => { isPausedRef.current = true; }}
      onMouseLeave={() => { isPausedRef.current = false; }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[37fr_63fr] gap-2 lg:gap-8 items-end mb-10">
          <h2 className="text-4xl font-extrabold text-gray-950 leading-tight">
            Kegiatan Kami
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            Komunitas Wikimedia Indonesia mendorong partisipasi sukarelawan
            serta mendukung komunitas aktif dalam menyunting, berbagi, dan
            menjaga kualitas informasi.
          </p>
        </div>

        {/* Cards — pembungkus relative untuk tombol panah di sisi */}
        <div className="relative">
          <button
            onClick={handlePrev}
            aria-label="Sebelumnya"
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-500 shadow-sm flex items-center justify-center hover:border-gray-400 hover:text-gray-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            aria-label="Berikutnya"
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-500 shadow-sm flex items-center justify-center hover:border-gray-400 hover:text-gray-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        >
          {displayed.map((item, i) => (
            <div
              key={i}
              data-card=""
              className="snap-start shrink-0 w-[80vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={item.gambar}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-[0.95rem] mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.deskripsi}
                </p>
              </div>
            </div>
          ))}
        </div>{/* end scrollRef */}
        </div>{/* end relative */}

      </div>
    </section>
  );
}

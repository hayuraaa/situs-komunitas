"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const penerima = [
  {
    nama: "Muhammad Rifqi Saifudin",
    penghargaan: "Sukarelawan Teraktif 2025",
    deskripsi:
      "Aktif dalam berbagai kegiatan komunitas, kompetisi, serta menginisiasi WikiKlinik untuk membantu kontributor baru. Pada 2025, tercatat 331.787 suntingan di berbagai proyek Wikimedia.",
    foto: "https://picsum.photos/seed/rifqi/600/800",
  },
  {
    nama: "Komunitas Wikimedia Yogyakarta",
    penghargaan: "Komunitas Teraktif 2025",
    deskripsi:
      "Aktif menyelenggarakan rapat, kegiatan menyunting bersama, kompetisi, program pengembangan konten, dan hibah dari Wikimedia Indonesia dan Wikimedia Foundation.",
    foto: "https://picsum.photos/seed/yogya/600/800",
  },
  {
    nama: "Komunitas Wikisource Indonesia",
    penghargaan: "Komunitas Media Sosial Teraktif 2025",
    deskripsi:
      "Aktif memanfaatkan akun @wikisource.id untuk berbagi informasi, panduan, dan materi edukatif. Sepanjang 2025 komunitas ini mengunggah sebanyak 75 konten.",
    foto: "https://picsum.photos/seed/wikisource/600/800",
  },
  {
    nama: "KlubWiki Universitas Brawijaya",
    penghargaan: "Komunitas Pendatang Baru Terbanyak 2025",
    deskripsi:
      "Mencatat 20 anggota baru. Keterlibatan anggota baru berkembang dari peserta menjadi panitia melalui aktivitas komunitas.",
    foto: "https://picsum.photos/seed/brawijaya/600/800",
  },
];

export default function DariKomunitasSection() {
  const [aktif, setAktif] = useState(0);
  const [teksVisible, setTeksVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);

  const goTo = useCallback((index: number) => {
    setTeksVisible(false);
    setTimeout(() => {
      setAktif(index);
      setTeksVisible(true);
    }, 250);
  }, []);

  const restartInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        setTeksVisible(false);
        setTimeout(() => {
          setAktif((prev) => (prev + 1) % penerima.length);
          setTeksVisible(true);
        }, 250);
      }
    }, 4000);
  }, []);

  useEffect(() => {
    restartInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [restartInterval]);

  const item = penerima[aktif];

  return (
    <section
      className="bg-gray-50 py-20 lg:py-28"
      onMouseEnter={() => { isPausedRef.current = true; }}
      onMouseLeave={() => { isPausedRef.current = false; }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[37fr_63fr] gap-2 lg:gap-8 items-end mb-10">
          <h2 className="text-3xl font-extrabold text-gray-950 leading-tight">
            Dari komunitas, untuk dampak yang lebih luas
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            Terdapat berbagai cara untuk berkontribusi di Wikimedia Indonesia,
            baik secara individu maupun melalui komunitas, dengan semangat
            membebaskan pengetahuan.
          </p>
        </div>

        {/* Card — tidak ada animasi pada card itu sendiri */}
        <div className="relative">
          <div className="grid grid-cols-[1fr_3fr] rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white">

            {/* Kiri — foto sliding */}
            <div className="relative overflow-hidden aspect-square">
              <div
                className="flex h-full"
                style={{
                  width: `${penerima.length * 100}%`,
                  transform: `translateX(-${aktif * (100 / penerima.length)}%)`,
                  transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {penerima.map((p, i) => (
                  <div
                    key={i}
                    className="relative flex-shrink-0"
                    style={{ width: `${100 / penerima.length}%` }}
                  >
                    <img
                      src={p.foto}
                      alt={p.nama}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Dots di dalam foto */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                      {penerima.map((_, di) => (
                        <button
                          key={di}
                          onClick={() => { goTo(di); restartInterval(); }}
                          aria-label={`Slide ${di + 1}`}
                          className="rounded-full transition-all duration-300"
                          style={{
                            width: di === aktif ? "20px" : "6px",
                            height: "6px",
                            backgroundColor: di === aktif ? "#fff" : "rgba(255,255,255,0.5)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kanan — keterangan, fade saat berganti */}
            <div
              className="flex flex-col justify-center px-8 py-10 lg:px-12 lg:py-12"
              style={{
                opacity: teksVisible ? 1 : 0,
                transition: "opacity 0.25s ease",
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-3">
                {item.penghargaan}
              </p>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-950 leading-tight mb-5">
                {item.nama}
              </h3>
              <hr className="border-gray-100 mb-5" />
              <p className="text-sm text-gray-500 leading-relaxed max-w-prose">
                {item.deskripsi}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const penerima = [
  {
    nama: "Muhammad Rifqi Saifudin",
    penghargaan: "Sukarelawan Teraktif 2025",
    deskripsi:
      "Rifqi aktif dalam berbagai kegiatan komunitas dan kompetisi, serta menginisiasi WikiKlinik untuk membantu kontributor baru. Pada 2025, Rifqi tercatat telah melakukan 331.787 suntingan di berbagai proyek Wikimedia.",
    foto: "/Muhammad%20Rifqi%20Saifudin.webp",
  },
  {
    nama: "Komunitas Wikimedia Yogyakarta",
    penghargaan: "Komunitas Teraktif 2025",
    deskripsi:
      "Komunitas Wikimedia Yogyakarta aktif menyelenggarakan rapat komunitas, kegiatan menyunting bersama, kompetisi, program pengembangan konten, serta berbagai program hibah dari Wikimedia Indonesia dan Wikimedia Foundation.",
    foto: "/Komunitas%20Wikimedia%20Yogyakarta.webp",
  },
  {
    nama: "Komunitas Wikisource Indonesia",
    penghargaan: "Komunitas Media Sosial Teraktif 2025",
    deskripsi:
      "Komunitas Wikisource Indonesia aktif memanfaatkan akun @wikisource.id untuk membagikan informasi, panduan, dan materi edukatif. Sepanjang 2025, komunitas ini telah mengunggah sebanyak 75 konten.",
    foto: "/Komunitas%20Wikisource%20Indonesia.webp",
  },
  {
    nama: "KlubWiki Universitas Brawijaya",
    penghargaan: "Komunitas Pendatang Baru Terbanyak 2025",
    deskripsi:
      "Sepanjang 2025, KlubWiki UB mendapatkan penambahan 20 anggota baru. Keterlibatan anggota baru juga berkembang, dari awalnya sebagai peserta hingga menjadi panitia dalam berbagai aktivitas komunitas.",
    foto: "/KlubWiki%20Universitas%20Brawijaya.webp",
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
    }, 5000);
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
      className="bg-gray-50 py-16 lg:py-20"
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
            Terdapat berbagai cara untuk berkontribusi di Wikimedia Indonesia, baik secara individu maupun bersama komunitas.
          </p>
        </div>

        {/* Card */}
        <div className="relative">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_3fr] rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white">

            {/* Foto sliding */}
            <div className="relative overflow-hidden aspect-video lg:aspect-square">
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

            {/* Keterangan — fade saat berganti */}
            <div
              className="flex flex-col justify-center px-6 py-7 lg:px-12 lg:py-12"
              style={{
                opacity: teksVisible ? 1 : 0,
                transition: "opacity 0.25s ease",
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">
                {item.penghargaan}
              </p>
              <h3 className="text-xl lg:text-3xl font-extrabold text-gray-950 leading-tight mb-4">
                {item.nama}
              </h3>
              <hr className="border-gray-100 mb-4" />
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.deskripsi}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

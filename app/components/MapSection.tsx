"use client";

import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => (
    <div className="h-[380px] sm:h-[520px] bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200">
      <p className="text-sm text-gray-400">Memuat peta…</p>
    </div>
  ),
});

export default function MapSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[37fr_63fr] gap-2 lg:gap-8 items-end mb-10">
          <h2 className="text-4xl font-extrabold text-gray-950 leading-tight">
            Bergabung bersama kami
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            Jelajahi sebaran komunitas Wikimedia Indonesia di berbagai daerah dan temukan ruang kolaborasi terdekat untuk mulai berpartisipasi.
          </p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <MapClient />
      </div>
    </section>
  );
}

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Blobs */}
      <div
        aria-hidden
        className="animate-blob absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #3366cc 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="animate-blob absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, #14866d 0%, transparent 70%)",
          animationDelay: "4s",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-12 sm:py-16 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Kiri */}
          <div>
            <h1
              className="animate-fade-up text-[2rem] sm:text-5xl lg:text-6xl font-extrabold text-gray-950 leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6"
              style={{ animationDelay: "0.1s" }}
            >
              Membebaskan{" "}
              <span style={{ color: "#006A9F" }}>
                pengetahuan
              </span>{" "}
              bersama komunitas
            </h1>

            <p
              className="animate-fade-up text-gray-500 text-base sm:text-lg leading-relaxed max-w-lg"
              style={{ animationDelay: "0.25s" }}
            >
              Di sini, setiap orang memulai perjalanan untuk membebaskan pengetahuan. Komunitas Wikimedia Indonesia hadir sebagai ruang untuk belajar, bertumbuh, dan berkolaborasi bersama dalam membangun pengetahuan terbuka yang bisa diakses oleh semua orang.
            </p>
          </div>

          {/* Kanan */}
          <div
            className="animate-slide-right relative"
            style={{ animationDelay: "0.15s" }}
          >
            <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[4/3]">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/WikiNusantara_2026_%E2%80%93_Group_Photo_at_Opening_Session_%28Day_1%2C_11_April_2026%29_-_5.jpg/1280px-WikiNusantara_2026_%E2%80%93_Group_Photo_at_Opening_Session_%28Day_1%2C_11_April_2026%29_-_5.jpg"
                alt="WikiNusantara 2026"
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

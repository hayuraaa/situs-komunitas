export default function QuoteBanner() {
  return (
    <section className="bg-[#006A9F] py-14">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <p
          aria-hidden
          className="font-black text-6xl leading-none mb-3 select-none"
          style={{ color: "#eaf3fb", opacity: 0.4 }}
        >
          &ldquo;
        </p>
        <p className="font-semibold italic text-2xl sm:text-3xl leading-snug text-white/90">
          Bayangkan suatu dunia tempat setiap manusia bisa berbagi beragam pengetahuan secara bebas
        </p>
      </div>
    </section>
  );
}

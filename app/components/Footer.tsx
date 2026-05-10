import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Kegiatan", href: "/kegiatan" },
  { label: "Dokumentasi", href: "/dokumentasi" },
  { label: "Kebijakan Ruang Ramah", href: "/kebijakan-ruang-ramah" },
  { label: "Kontak", href: "/kontak" },
];

const externalLinks = [
  { label: "Wikipedia Bahasa Indonesia", href: "https://id.wikipedia.org" },
  { label: "Wikimedia Commons", href: "https://commons.wikimedia.org" },
  { label: "Wikidata", href: "https://www.wikidata.org" },
  { label: "Wikisource", href: "https://id.wikisource.org" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-600 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <div className="py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Image
                src="/logo-wikimedia-indonesia.svg"
                alt="Komunitas Wikimedia Indonesia"
                width={180}
                height={60}
                unoptimized
                className="h-12 w-auto"
              />
              <a
                href="https://wikimedia.or.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/0/05/Wikimedia-logo-id.svg"
                  alt="Wikimedia Indonesia"
                  width={60}
                  height={60}
                  unoptimized
                  className="h-12 w-auto"
                />
              </a>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">
              Mendorong partisipasi sukarelawan dan mendukung komunitas yang aktif menyunting, berbagi, dan menjaga kualitas informasi.
            </p>
            <div className="text-sm text-gray-600 space-y-1">
              <p>komunitas@wikimedia.or.id</p>
            </div>
          </div>

          <div>
            <h3 className="text-gray-900 text-xs font-semibold uppercase tracking-widest mb-5">
              Halaman
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-[#006A9F] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 text-xs font-semibold uppercase tracking-widest mb-5">
              Alamat
            </h3>
            <address className="not-italic text-sm text-gray-600 leading-relaxed space-y-1">
              <p className="font-semibold text-gray-700">Wikimedia Indonesia</p>
              <p>TCC Batavia Tower One, Lt. 6</p>
              <p>Jalan K.H. Mas Mansyur No. 12</p>
              <p>Karet Tengsin, Tanah Abang</p>
              <p>Jakarta Pusat 10220 Indonesia</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-200 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            Konten tersedia di bawah{" "}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#006A9F] underline underline-offset-2 transition-colors"
            >
              Creative Commons Atribusi-BerbagiSerupa 4.0 Internasional
            </a>
          </p>
          <p>© {new Date().getFullYear()} Komunitas Wikimedia Indonesia</p>
        </div>

      </div>
    </footer>
  );
}

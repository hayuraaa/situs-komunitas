import type { Metadata } from 'next'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Kontak — Komunitas Wikimedia Indonesia',
  description:
    'Hubungi Komunitas Wikimedia Indonesia untuk kerja sama, pertanyaan, atau sekadar menyapa.',
}

export default function KontakPage() {
  return (
    <>
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-[#f0f5ff] border-b border-[#dbe8f8]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-950 leading-tight mb-5">
                Kontak
              </h1>
              <p className="text-gray-500 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
                Komunitas Wikimedia Indonesia terbuka untuk bekerja sama dengan berbagai
                pihak — individu, institusi, maupun organisasi yang ingin berkontribusi
                dalam memperluas akses pengetahuan bebas di Indonesia.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">

              {/* Left: deskripsi + foto */}
              <div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-950 leading-tight mb-5">
                  Kirim Pesan
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-8">
                  Tertarik bergabung atau bekerja sama? Silakan hubungi kami
                  — baik berupa pertanyaan, usulan program, maupun sekadar menyapa.
                </p>
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <div className="relative" style={{ aspectRatio: '4/3' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/WikiNusantara_2026_%E2%80%93_Group_Photo_at_Closing_Session_%28Day_2%2C_12_April_2026%29_-_6.jpg/1280px-WikiNusantara_2026_%E2%80%93_Group_Photo_at_Closing_Session_%28Day_2%2C_12_April_2026%29_-_6.jpg"
                      alt="WikiNusantara 2026 — Foto Bersama"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <ContactForm />

            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="max-w-md mx-auto">
              <div className="rounded-2xl bg-gradient-to-r from-[#006A9F] to-[#0088cc] p-10 shadow-xl text-center">
                <div className="text-5xl mb-4">✉️</div>
                <h3 className="font-extrabold text-xl text-white mb-3">Atau Hubungi Langsung</h3>
                <a
                  href="mailto:komunitas@wikimedia.or.id"
                  className="text-lg text-white hover:text-blue-100 transition-colors font-medium"
                >
                  komunitas@wikimedia.or.id
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

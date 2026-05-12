import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Dokumentasi — Komunitas Wikimedia Indonesia",
  description:
    "Kumpulan berita dan cerita dari komunitas Wikimedia Indonesia — kegiatan, kolaborasi, dan perjalanan para sukarelawan.",
};

interface Author {
  id: number;
  name: string;
  slug: string;
}

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  published_at: string;
  views: number;
  authors: Author[];
  categories: string[];
  keywords: string[];
}

interface ApiResponse {
  success: boolean;
  data: Article[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

const CARDS_PER_PAGE = 6;
const API_PAGES_TO_FETCH = 6;

async function fetchPage(page: number): Promise<Article[]> {
  try {
    const res = await fetch(
      `https://dashboard.wikimedia.or.id/api/v1/articles?page=${page}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const json: ApiResponse = await res.json();
    return json.success ? json.data : [];
  } catch {
    return [];
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function DokumentasiPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt((pageParam as string) ?? "1", 10));

  const apiPages = await Promise.all(
    Array.from({ length: API_PAGES_TO_FETCH }, (_, i) => fetchPage(i + 1))
  );
  const allKomunitas = apiPages.flat().filter((a) => a.categories.includes("komunitas"));

  const totalPages = Math.ceil(allKomunitas.length / CARDS_PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(1, totalPages));
  const start = (safePage - 1) * CARDS_PER_PAGE;
  const articles = allKomunitas.slice(start, start + CARDS_PER_PAGE);

  return (
    <>
      <Header />
      <main className="flex-1">

        {/* Page Hero */}
        <section className="bg-[#f0f5ff] border-b border-[#dbe8f8]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-950 leading-tight mb-5">
                Dokumentasi Kegiatan
              </h1>
              <p className="text-gray-500 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
                Kumpulan berita dan cerita dari komunitas Wikimedia Indonesia yang merekam perjalanan, kolaborasi, dan kontribusi para sukarelawan dalam mengembangkan pengetahuan terbuka bagi semua orang.
              </p>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            {articles.length === 0 ? (
              <p className="text-center text-gray-400 py-20">
                Belum ada artikel komunitas yang tersedia saat ini.
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-10">
                  {articles.map((article, index) => (
                    <article
                      key={article.id}
                      className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      {/* Thumbnail */}
                      <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: "16/10" }}>
                        <Image
                          src={article.featured_image}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          {...(index === 0 ? { priority: true } : { loading: "lazy" })}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-6">
                        {/* Meta */}
                        <div className="flex items-center gap-2 mb-3 text-xs text-gray-400">
                          <time dateTime={article.published_at}>
                            {formatDate(article.published_at)}
                          </time>
                          {article.authors.length > 0 && (
                            <>
                              <span>·</span>
                              <span className="truncate max-w-[140px]">
                                {article.authors.map((a) => a.name).join(", ")}
                              </span>
                            </>
                          )}
                        </div>

                        <h2 className="text-[17px] font-bold text-gray-900 mb-2.5 leading-snug line-clamp-2">
                          {article.title}
                        </h2>
                        <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-3">
                          {article.excerpt.trim()}
                        </p>

                        {/* CTA */}
                        <div className="mt-5 pt-5 border-t border-gray-100">
                          <a
                            href={`https://app.wikimedia.or.id/rubrik/${article.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#006A9F] hover:text-[#005080] transition-colors group/link"
                          >
                            Lihat selengkapnya
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
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-14">
                    {/* Prev */}
                    <Link
                      href={`/dokumentasi?page=${safePage - 1}`}
                      aria-disabled={safePage === 1}
                      className={`flex items-center justify-center w-9 h-9 rounded-lg border text-sm transition-colors ${
                        safePage === 1
                          ? "pointer-events-none border-gray-100 text-gray-300"
                          : "border-gray-200 text-gray-500 hover:border-[#006A9F] hover:text-[#006A9F]"
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </Link>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <Link
                        key={p}
                        href={`/dokumentasi?page=${p}`}
                        className={`flex items-center justify-center w-9 h-9 rounded-lg border text-sm font-medium transition-colors ${
                          p === safePage
                            ? "bg-[#006A9F] border-[#006A9F] text-white"
                            : "border-gray-200 text-gray-600 hover:border-[#006A9F] hover:text-[#006A9F]"
                        }`}
                      >
                        {p}
                      </Link>
                    ))}

                    {/* Next */}
                    <Link
                      href={`/dokumentasi?page=${safePage + 1}`}
                      aria-disabled={safePage === totalPages}
                      className={`flex items-center justify-center w-9 h-9 rounded-lg border text-sm transition-colors ${
                        safePage === totalPages
                          ? "pointer-events-none border-gray-100 text-gray-300"
                          : "border-gray-200 text-gray-500 hover:border-[#006A9F] hover:text-[#006A9F]"
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

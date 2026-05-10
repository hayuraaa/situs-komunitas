import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Komunitas Wikimedia Indonesia",
  description:
    "Mendorong partisipasi sukarelawan dan mendukung komunitas yang aktif menyunting, berbagi, dan menjaga kualitas informasi.",
  icons: {
    icon: "/ico-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${sourceSans.variable} h-full`}>
      <body
        className="min-h-full flex flex-col font-[family-name:var(--font-source-sans)]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

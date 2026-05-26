import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import KegiatanSection from "./components/KegiatanSection";
import QuoteBanner from "./components/QuoteBanner";
import MapSection from "./components/MapSection";
import DariKomunitasSection from "./components/DariKomunitasSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <KegiatanSection />
        <QuoteBanner />
        <DariKomunitasSection />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}

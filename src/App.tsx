import { ModalProvider } from './hooks/ModalContext';
import { useUTMs } from './hooks/useUTMs';
import { useScrollDepth } from './hooks/useScrollDepth';

import Header from './components/Header';
import Hero from './components/Hero';
import JiuJitsuForEveryone from './components/JiuJitsuForEveryone';
import Reviews from './components/Reviews';
import About from './components/About';
import Classes from './components/Classes';
import HowToSchedule from './components/HowToSchedule';
import Coaches from './components/Coaches';
import Gallery from './components/Gallery';
import Stats from './components/Stats';
import FAQ from './components/FAQ';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import StickyCTABar from './components/StickyCTABar';

function AppInner() {
  useUTMs();
  useScrollDepth();

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main">
        <Hero />
        <JiuJitsuForEveryone />
        <Reviews />
        <About />
        <Classes />
        <HowToSchedule />
        <Coaches />
        <Gallery />
        <Stats />
        <FAQ />
        <MapSection />
      </main>
      <Footer />
      <BookingModal />
      <StickyCTABar />
    </>
  );
}

export default function App() {
  return (
    <ModalProvider>
      <AppInner />
    </ModalProvider>
  );
}

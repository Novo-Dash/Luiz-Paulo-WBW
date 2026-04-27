import Hero from './components/Hero';
import Stats from './components/Stats';
import Classes from './components/Classes';
import About from './components/About';
import Coaches from './components/Coaches';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import MapSection from './components/MapSection';
import Footer from './components/Footer';

import { ModalProvider } from './hooks/ModalContext';
import BookingModal from './components/BookingModal';

function App() {
  return (
    <ModalProvider>
      <main>
        <Hero />
        <Stats />
        <Classes />
        <About />
        <Coaches />
        <Gallery />
        <Reviews />
        <FAQ />
        <MapSection />
      </main>
      <Footer />
      <BookingModal />
    </ModalProvider>
  );
}

export default App;

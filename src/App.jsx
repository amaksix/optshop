import { Route, Routes } from 'react-router-dom';
import { CookieBanner } from './components/CookieBanner';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { LegalDialog } from './components/LegalDialog';
import { LegalProvider } from './context/Legal';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <LegalProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <CookieBanner />
      <LegalDialog />
    </LegalProvider>
  );
}

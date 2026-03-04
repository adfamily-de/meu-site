import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/custom/Navbar';
import { Footer } from '@/components/custom/Footer';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { MinistriesPage } from '@/pages/MinistriesPage';
import { UrgentPage } from '@/pages/UrgentPage';
import { BlogPage } from '@/pages/BlogPage';
import { ContactPage } from '@/pages/ContactPage';
import { DonatePage } from '@/pages/DonatePage';
import { StorePage } from '@/pages/StorePage';
import { AdminPage } from '@/pages/AdminPage';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/quem-somos" element={<AboutPage />} />
              <Route path="/o-que-fazemos" element={<MinistriesPage />} />
              <Route path="/urgencias" element={<UrgentPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogPage />} />
              <Route path="/contato" element={<ContactPage />} />
              <Route path="/doar" element={<DonatePage />} />
              <Route path="/loja" element={<StorePage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;

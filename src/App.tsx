import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Navigation } from './components/Navigation';
import { CookieBanner } from './components/CookieBanner';
import { Home } from './pages/Home';
import { Quote } from './pages/Quote';
import { Impressum } from './pages/Impressum';
import { Privacy } from './pages/Privacy';
import './index.css';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
          <CookieBanner />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;

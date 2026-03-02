import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X } from 'lucide-react';

export function CookieBanner() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (type: 'necessary' | 'all') => {
    localStorage.setItem('cookieConsent', type);
    setIsVisible(false);
    
    // Here you would initialize tracking scripts based on consent
    if (type === 'all') {
      // Initialize Google Analytics, Meta Pixel, etc.
      // gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto section-padding py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Content */}
          <div className="flex-1 pr-4">
            <h4 className="font-semibold text-navy mb-1">
              {t('cookie.title')}
            </h4>
            <p className="text-sm text-gray-600">
              {t('cookie.message')}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleAccept('necessary')}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-navy transition-colors"
            >
              {t('cookie.necessary')}
            </button>
            <button
              onClick={() => handleAccept('all')}
              className="px-4 py-2 text-sm font-medium bg-gold text-navy rounded-lg hover:bg-gold-600 transition-colors"
            >
              {t('cookie.acceptAll')}
            </button>
            <button
              onClick={() => handleAccept('necessary')}
              className="p-2 text-gray-400 hover:text-navy transition-colors md:hidden"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Mail, MapPin } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy text-white py-16">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/favicon.svg" alt="TR Sales Agency Logo" className="w-10 h-10" />
              <span className="font-bold text-lg">Sales Agency</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t('impressum.contact')}</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-gold" />
                <span>30 N Gould St Ste R<br />Sheridan, WY 82801, USA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gold" />
                <a href="mailto:info@trsales.net" className="hover:text-gold transition-colors">
                  info@trsales.net
                </a>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
            <div className="space-y-2 text-sm">
              <Link 
                to="/impressum" 
                className="block text-gray-400 hover:text-gold transition-colors"
              >
                {t('footer.impressum')}
              </Link>
              <Link 
                to="/privacy" 
                className="block text-gray-400 hover:text-gold transition-colors"
              >
                {t('footer.privacy')}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-500">Made in Wyoming</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

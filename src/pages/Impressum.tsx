import { useLanguage } from '../context/LanguageContext';
import { Footer } from '../components/Footer';
import { Building2, MapPin, Mail, User } from 'lucide-react';

export function Impressum() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto section-padding">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-navy p-8 md:p-12">
            <h1 className="heading-lg text-white">
              {t('impressum.title')}
            </h1>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 space-y-10">
            {/* Company */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-gold" />
                </div>
                <h2 className="text-xl font-bold text-navy">
                  {t('impressum.company')}
                </h2>
              </div>
              <div className="pl-13 ml-5">
                <p className="text-gray-600">TR Sales Agency</p>
                <p className="text-gray-600">Limited Liability Company</p>
                <p className="text-gray-600">Wyoming, USA</p>
              </div>
            </div>

            {/* Address */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <h2 className="text-xl font-bold text-navy">
                  {t('impressum.address')}
                </h2>
              </div>
              <div className="pl-13 ml-5">
                <p className="text-gray-600">30 N Gould St Ste R</p>
                <p className="text-gray-600">Sheridan, WY 82801</p>
                <p className="text-gray-600">United States of America</p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <h2 className="text-xl font-bold text-navy">
                  {t('impressum.contact')}
                </h2>
              </div>
              <div className="pl-13 ml-5 space-y-2">
                <p>
                  <span className="text-gray-500">Email: </span>
                  <a 
                    href="mailto:info@trsales.net" 
                    className="text-gold hover:underline"
                  >
                    info@trsales.net
                  </a>
                </p>
                <p>
                  <span className="text-gray-500">Alternative: </span>
                  <a 
                    href="mailto:raisyah@trsales.net" 
                    className="text-gold hover:underline"
                  >
                    raisyah@trsales.net
                  </a>
                </p>
              </div>
            </div>

            {/* Responsible */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-gold" />
                </div>
                <h2 className="text-xl font-bold text-navy">
                  {t('impressum.responsible')}
                </h2>
              </div>
              <div className="pl-13 ml-5">
                <p className="text-gray-600">TR Sales Agency Team</p>
                <p className="text-gray-600">30 N Gould St Ste R</p>
                <p className="text-gray-600">Sheridan, WY 82801, USA</p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="pt-8 border-t border-gray-100">
              <h2 className="text-xl font-bold text-navy mb-4">
                {t('impressum.disclaimer')}
              </h2>
              <div className="text-sm text-gray-500 space-y-4">
                <p>
                  Despite careful content control, we assume no liability for the content of external links. 
                  The operators of the linked pages are solely responsible for their content.
                </p>
                <p>
                  All content on this website is protected by copyright. Any use outside the limits of 
                  copyright law is prohibited without prior written consent.
                </p>
                <p>
                  This website is operated by TR Sales Agency, a company registered in Wyoming, USA. 
                  All services are subject to Wyoming state law and applicable federal laws of the United States.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

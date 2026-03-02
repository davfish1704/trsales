import { useLanguage } from '../context/LanguageContext';
import { Footer } from '../components/Footer';
import { Shield, Database, Cookie, UserCheck, Mail } from 'lucide-react';

export function Privacy() {
  const { t } = useLanguage();

  const sections = [
    {
      key: 'controller',
      icon: Shield,
    },
    {
      key: 'data',
      icon: Database,
    },
    {
      key: 'cookies',
      icon: Cookie,
    },
    {
      key: 'rights',
      icon: UserCheck,
    },
    {
      key: 'contact',
      icon: Mail,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto section-padding">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-navy p-8 md:p-12">
            <h1 className="heading-lg text-white mb-4">
              {t('privacy.title')}
            </h1>
            <p className="text-gray-300 max-w-xl">
              {t('privacy.intro')}
            </p>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 space-y-10">
            {sections.map(({ key, icon: Icon }) => (
              <div key={key} className="group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-navy mb-3">
                      {(t(`privacy.sections.${key}.title`))}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {(t(`privacy.sections.${key}.content`))}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Additional Details */}
            <div className="pt-8 border-t border-gray-100">
              <h3 className="text-lg font-bold text-navy mb-4">
                Data Processing Details
              </h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-navy mb-2">Log Files</h4>
                  <p>
                    When you visit our website, our servers automatically record information 
                    that your browser sends. This includes your IP address, browser type and 
                    version, operating system, referrer URL, and timestamp. This data is used 
                    solely for technical analysis and security purposes.
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-navy mb-2">Contact Form Data</h4>
                  <p>
                    When you submit a quote request, we store the information you provide 
                    (name, email, company, phone, project details) to process your inquiry. 
                    This data is retained for up to 2 years for follow-up purposes unless you 
                    request deletion.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-navy mb-2">Third-Party Services</h4>
                  <p>
                    We do not share your personal data with third parties except as necessary 
                    to provide our services (e.g., email service providers) or as required by law. 
                    All third-party providers are GDPR-compliant.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-navy mb-2">Your Rights (GDPR)</h4>
                  <p>
                    Under the General Data Protection Regulation, you have the right to: access 
                    your personal data, request correction of inaccurate data, request deletion 
                    of your data (right to be forgotten), restrict or object to processing, 
                    and data portability. To exercise these rights, contact us at info@trsales.net.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-navy mb-2">Data Security</h4>
                  <p>
                    We implement appropriate technical and organizational measures to protect 
                    your personal data against unauthorized access, alteration, disclosure, or 
                    destruction. This includes SSL encryption, secure server infrastructure, 
                    and regular security audits.
                  </p>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                Last updated: March 2024
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

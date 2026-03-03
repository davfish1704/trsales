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
                {t('privacy.detailsTitle')}
              </h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-navy mb-2">{t('privacy.logFiles.title')}</h4>
                  <p>
                    {t('privacy.logFiles.content')}
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-navy mb-2">{t('privacy.contactForm.title')}</h4>
                  <p>
                    {t('privacy.contactForm.content')}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-navy mb-2">{t('privacy.thirdParty.title')}</h4>
                  <p>
                    {t('privacy.thirdParty.content')}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-navy mb-2">{t('privacy.gdprRights.title')}</h4>
                  <p>
                    {t('privacy.gdprRights.content')}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-navy mb-2">{t('privacy.dataSecurity.title')}</h4>
                  <p>
                    {t('privacy.dataSecurity.content')}
                  </p>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                {t('privacy.lastUpdated')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

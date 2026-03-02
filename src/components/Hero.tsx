import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Hero() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    const elements = hero.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-tech/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-navy/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#0A1628 1px, transparent 1px), linear-gradient(90deg, #0A1628 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto section-padding pt-32 pb-20 text-center">
        {/* Badge */}
        <div 
          className="reveal opacity-0 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-8"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-600">TR Sales Agency</span>
        </div>

        {/* Headline */}
        <h1 
          className="reveal opacity-0 heading-xl text-navy mb-6"
          style={{ animationDelay: '0.2s' }}
        >
          {t('hero.headline')}
        </h1>

        {/* Subheadline */}
        <p 
          className="reveal opacity-0 body-lg max-w-2xl mx-auto mb-10"
          style={{ animationDelay: '0.3s' }}
        >
          {t('hero.subheadline')}
        </p>

        {/* CTA Buttons */}
        <div 
          className="reveal opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          style={{ animationDelay: '0.4s' }}
        >
          <Link
            to="/quote"
            className="btn-primary flex items-center gap-2 text-base"
          >
            {t('hero.cta')}
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Response Badge */}
        <div 
          className="reveal opacity-0 flex items-center justify-center gap-2 text-sm text-gray-500"
          style={{ animationDelay: '0.5s' }}
        >
          <Clock size={16} className="text-gold" />
          <span>{t('hero.responseBadge')}</span>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="reveal opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

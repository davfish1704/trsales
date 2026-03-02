import { useEffect, useRef } from 'react';
import { Bot, Globe, Smartphone, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  Bot,
  Globe,
  Smartphone,
  TrendingUp,
};

interface ProductCardProps {
  title: string;
  description: string;
  iconName: keyof typeof iconMap;
  delay: number;
}

function ProductCard({ title, description, iconName, delay }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = iconMap[iconName];

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-fade-in');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="opacity-0 group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Icon */}
      <div className="w-14 h-14 bg-navy/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
        <Icon className="w-7 h-7 text-navy group-hover:text-gold transition-colors" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-navy mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>

      {/* Hover Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}

export function ProductCards() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      title: t('products.automation.title'),
      description: t('products.automation.description'),
      iconName: 'Bot' as const,
    },
    {
      title: t('products.websites.title'),
      description: t('products.websites.description'),
      iconName: 'Globe' as const,
    },
    {
      title: t('products.digital.title'),
      description: t('products.digital.description'),
      iconName: 'Smartphone' as const,
    },
    {
      title: t('products.ads.title'),
      description: t('products.ads.description'),
      iconName: 'TrendingUp' as const,
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg text-navy mb-4">
            {t('products.title')}
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.title}
              title={product.title}
              description={product.description}
              iconName={product.iconName}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

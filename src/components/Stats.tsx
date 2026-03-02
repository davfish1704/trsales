import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface StatItemProps {
  value: string;
  label: string;
  delay: number;
}

function StatItem({ value, label, delay }: StatItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(item);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={itemRef}
      className={`text-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gold mb-2">
        {value}
      </div>
      <div className="text-sm md:text-base text-gray-500 font-medium uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      value: (t('stats.projects.value')) || '150+',
      label: t('stats.projects.label'),
    },
    {
      value: (t('stats.satisfaction.value')) || '98%',
      label: t('stats.satisfaction.label'),
    },
    {
      value: (t('stats.response.value')) || '24h',
      label: t('stats.response.label'),
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-tech/10 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto section-padding relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              label={stat.label}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

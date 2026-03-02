import { Hero } from '../components/Hero';
import { ProductCards } from '../components/ProductCards';
import { Stats } from '../components/Stats';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <main>
      <Hero />
      <ProductCards />
      <Stats />
      <Footer />
    </main>
  );
}

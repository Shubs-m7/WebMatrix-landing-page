import { Hero } from '@/components/home/Hero';
import { AnimatedSlideshowSection } from '@/components/home/AnimatedSlideshowSection';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { Services } from '@/components/home/Services';
import { Testimonials } from '@/components/home/Testimonials';
import { CTA } from '@/components/home/CTA';

export default function Page() {
  return (
    <div className="min-h-screen">
      <Hero />
      <AnimatedSlideshowSection />
      <FeaturedWork />
      <Services />
      <Testimonials />
      <CTA />
    </div>
  );
}

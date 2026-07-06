'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechCorp',
    company: 'TechCorp',
    content: 'Outstanding work! The team delivered a stunning website with incredible 3D effects that wowed our clients.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Product Lead, StartupX',
    company: 'StartupX',
    content: 'Best development partner we\'ve had. Fast, professional, and the attention to detail is unmatched.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Director, GrowthCo',
    company: 'GrowthCo',
    content: 'Our conversion rate tripled after the redesign. The performance optimization alone paid for itself.',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Founder, NextGen',
    company: 'NextGen',
    content: 'The motion design and user experience they crafted completely transformed how our users interact with our product.',
    rating: 5,
  },
  {
    name: 'Jessica Alba',
    role: 'CTO, FinTech AI',
    company: 'FinTech AI',
    content: 'Unbelievable attention to detail and clean code. Their full-stack capabilities helped us launch months ahead of schedule.',
    rating: 5,
  }
];

// Duplicate for infinite scroll effect
const scrollTestimonials = [...testimonials, ...testimonials];

export const Testimonials = () => {
  return (
    <section className="py-32 bg-background relative overflow-hidden flex flex-col justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-display-sm font-display font-bold mb-4">
            Trusted by <span className="text-gradient">Visionaries</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light">
            Don't just take our word for it—see what our partners have to say.
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
        
        {/* Left/Right Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-6 px-4 w-max animate-marquee">
          {scrollTestimonials.map((testimonial, index) => (
            <Card key={index} className="w-[300px] sm:w-[350px] md:w-[400px] shrink-0 border-border/30 hover:border-primary/50 transition-all duration-500 glass hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(108,92,231,0.15)] group">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent drop-shadow-[0_0_8px_rgba(0,209,255,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(0,209,255,0.8)] transition-all duration-300" />
                  ))}
                </div>
                <p className="text-foreground/90 text-lg mb-8 leading-relaxed font-light group-hover:text-foreground transition-colors duration-300">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-border/30 group-hover:border-primary/30 transition-colors duration-300">
                  <Avatar className="h-12 w-12 border border-primary/20 shadow-[0_0_15px_rgba(108,92,231,0.2)] group-hover:shadow-[0_0_20px_rgba(108,92,231,0.4)] transition-all duration-300">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground font-light">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, ArrowRight, Zap, Star } from 'lucide-react';
import Link from 'next/link';

const packages = [
  {
    name: 'Starter',
    price: '₹15,000',
    description: 'Perfect for small businesses and startups looking for a digital presence.',
    features: [
      'Up to 5 custom pages',
      'Responsive mobile design',
      'Basic SEO optimization',
      'Contact forms & lead capture',
      'Subtle scroll animations',
      '1 month of maintenance support',
    ],
    icon: Zap,
    popular: false,
    color: 'accent',
  },
  {
    name: 'Professional',
    price: '₹25,000',
    description: 'For growing businesses that need a premium, high-conversion web experience.',
    features: [
      'Up to 15 custom pages',
      'Premium custom design system',
      'Advanced Framer Motion animations',
      'CMS integration (Sanity/Strapi)',
      'Basic 3D elements & interactions',
      'Performance optimization (90+ LH)',
      '3 months of priority support',
      'Advanced analytics setup',
    ],
    icon: Star,
    popular: true,
    color: 'primary',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Full-scale digital products and applications with unlimited potential.',
    features: [
      'Unlimited pages & architecture',
      'Custom complex functionality',
      'Full-stack Next.js development',
      'Advanced immersive 3D/WebGL',
      'Custom API & SaaS integrations',
      'Comprehensive security audit',
      '6+ months of dedicated support',
      'Dedicated project manager',
    ],
    icon: Sparkles,
    popular: false,
    color: 'accent',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background">
      {/* Immersive Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-20%] w-[70vw] h-[70vw] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-float" style={{ animationDuration: '15s' }}></div>
        <div className="absolute bottom-[-10%] right-[-20%] w-[60vw] h-[60vw] bg-accent/10 rounded-full blur-[120px] mix-blend-screen opacity-40 animate-float" style={{ animationDuration: '20s', animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background/90 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border border-primary/30 text-sm font-medium mb-8 shadow-glow"
          >
            <Zap className="h-4 w-4 text-accent animate-pulse" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Pricing & Plans
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-display-lg font-display font-black tracking-tighter mb-8 leading-[1.1]">
            Our <span className="relative whitespace-nowrap">
              <span className="absolute -inset-1 bg-gradient-to-r from-primary to-accent blur-2xl opacity-40"></span>
              <span className="relative text-gradient">Services</span>
            </span>
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl font-light leading-relaxed">
            Choose the perfect package to elevate your brand. From sleek landing pages to complex digital ecosystems.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-32 max-w-7xl mx-auto items-center">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`h-full ${pkg.popular ? 'lg:-my-8' : ''}`}
            >
              <Card className={`h-full relative overflow-hidden group glass ${pkg.popular ? 'border-primary/50 shadow-glow bg-card/60' : 'border-border/30 bg-card/30 hover:border-primary/30'} transition-all duration-500 hover:-translate-y-2`}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {pkg.popular && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-accent to-primary animate-gradient-xy" />
                )}

                <CardContent className="p-8 md:p-10 relative z-10 flex flex-col h-full">
                  {pkg.popular && (
                    <div className="absolute -top-3 right-8">
                      <span className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-glow">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-8">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${pkg.color}/20 to-background flex items-center justify-center mb-6 border border-${pkg.color}/20`}>
                      <pkg.icon className={`h-7 w-7 text-${pkg.color}`} />
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-2">{pkg.name}</h3>
                    <p className="text-muted-foreground text-sm h-10">{pkg.description}</p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-4xl md:text-5xl font-black ${pkg.popular ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent' : 'text-foreground'}`}>
                        {pkg.price}
                      </span>
                      {pkg.price !== 'Custom' && <span className="text-muted-foreground font-medium">/project</span>}
                    </div>
                  </div>

                  <div className="flex-grow mb-10">
                    <ul className="space-y-4">
                      {pkg.features.map((feature, fIndex) => (
                        <motion.li 
                          key={feature} 
                          className="flex items-start gap-3 group/item"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + (index * 0.1) + (fIndex * 0.05) }}
                        >
                          <div className={`mt-1 shrink-0 w-5 h-5 rounded-full bg-${pkg.color}/10 flex items-center justify-center group-hover/item:bg-${pkg.color}/30 transition-colors duration-300`}>
                            <Check className={`h-3 w-3 text-${pkg.color}`} />
                          </div>
                          <span className="text-muted-foreground group-hover/item:text-foreground transition-colors duration-300 text-sm">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-8 border-t border-border/30">
                    <Button 
                      asChild 
                      className={`w-full h-14 rounded-full text-lg font-medium transition-all duration-300 ${pkg.popular ? 'bg-primary hover:bg-primary-glow text-primary-foreground shadow-[0_0_30px_rgba(108,92,231,0.4)] hover:shadow-[0_0_50px_rgba(108,92,231,0.6)]' : 'glass hover:bg-white/10'}`}
                    >
                      <Link href="/contact">
                        {pkg.popular ? 'Get Started Now' : 'Choose Plan'}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="p-12 rounded-[2rem] glass bg-background/50 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Need something <span className="text-gradient">different?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
                We also offer hourly consultation, retainer models, and white-label development for agencies. Let's discuss your unique requirements.
              </p>
              <Button asChild size="lg" className="h-14 px-8 rounded-full text-lg shadow-[0_0_30px_rgba(108,92,231,0.3)] hover:shadow-[0_0_50px_rgba(108,92,231,0.5)] transition-all duration-300 bg-primary hover:bg-primary-glow text-primary-foreground group">
                <Link href="/contact">
                  <span className="flex items-center">
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

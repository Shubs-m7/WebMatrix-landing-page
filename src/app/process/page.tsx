'use client';

import { motion } from 'framer-motion';
import { Search, Palette, Code, TestTube, Rocket, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const steps = [
  {
    icon: Search,
    title: 'Discover & Strategy',
    description: 'We dive deep into your business goals, target audience, and competitive landscape to create a solid foundation.',
    color: 'primary',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Our designers craft beautiful, user-centric interfaces with immersive 3D elements and fluid animations that convert visitors.',
    color: 'accent',
  },
  {
    icon: Code,
    title: 'Development',
    description: 'Clean, performant code brought to life with cutting-edge technologies like Next.js, WebGL, and Framer Motion.',
    color: 'primary',
  },
  {
    icon: TestTube,
    title: 'Quality Assurance',
    description: 'Rigorous testing across devices, browsers, and scenarios to ensure flawless functionality and blazing fast performance.',
    color: 'accent',
  },
  {
    icon: Rocket,
    title: 'Launch & Deploy',
    description: 'Smooth deployment with edge caching, monitoring, analytics, and training to ensure a successful global go-live.',
    color: 'primary',
  },
  {
    icon: TrendingUp,
    title: 'Growth & Support',
    description: 'Ongoing optimization, A/B testing, and iterative improvements to maximize your ROI and keep you ahead of the curve.',
    color: 'accent',
  },
];

export default function ProcessPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background">
      {/* Immersive Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-float" style={{ animationDuration: '12s' }}></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[60vw] h-[60vw] bg-accent/10 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-float" style={{ animationDuration: '15s', animationDelay: '1s' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background/80 to-background" />
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
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              How We Work
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-display-lg font-display font-black tracking-tighter mb-8 leading-[1.1]">
            Our <span className="text-gradient">Process</span>
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl font-light leading-relaxed">
            A proven, transparent methodology that delivers exceptional digital experiences every time.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Central glowing line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50 blur-[1px]" />
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-gradient-to-b from-primary via-accent to-primary opacity-50" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col md:flex-row gap-8 mb-16 md:mb-24 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Mobile connecting line */}
              {index < steps.length - 1 && (
                <div className="md:hidden absolute left-[2.75rem] top-[5.5rem] bottom-[-4rem] w-[2px] bg-gradient-to-b from-primary/50 to-accent/50" />
              )}

              {/* Icon Container */}
              <div className="relative shrink-0 flex items-center justify-center md:w-1/2 group z-10">
                <div className={`flex justify-center md:justify-${index % 2 === 0 ? 'start' : 'end'} w-full md:px-12`}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent blur-xl opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-500 rounded-full" />
                    <div className="w-24 h-24 rounded-full glass border border-primary/30 flex items-center justify-center shadow-glow relative z-10 bg-background/50 group-hover:bg-background/30 transition-colors duration-500">
                      <step.icon className={`h-10 w-10 text-${step.color} group-hover:scale-110 transition-transform duration-500`} />
                    </div>
                    {/* Node point connecting to center line */}
                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${index % 2 === 0 ? 'left-[-48px]' : 'right-[-48px]'} w-12 h-[2px] bg-gradient-to-r ${index % 2 === 0 ? 'from-transparent to-primary/50' : 'from-primary/50 to-transparent'}`} />
                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${index % 2 === 0 ? 'left-[-52px]' : 'right-[-52px]'} w-2 h-2 rounded-full bg-primary shadow-glow`} />
                  </div>
                </div>
              </div>

              {/* Content Card */}
              <div className="md:w-1/2 w-full">
                <Card className="h-full glass border-border/30 hover:border-primary/50 transition-all duration-500 hover:shadow-glow group cursor-pointer relative overflow-hidden bg-card/40">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-primary/20 to-transparent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-3xl font-display font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all duration-300 leading-tight">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 max-w-4xl mx-auto"
        >
          <div className="relative p-[1px] rounded-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-xy" />
            <div className="relative p-12 md:p-16 rounded-[23px] glass bg-background/80 text-center">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Ready to Start?
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                Most projects are completed within 6-12 weeks. We provide transparent timelines, 
                milestone-based payments, and a dedicated team for your success.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                <Button asChild size="lg" className="h-14 px-8 rounded-full text-lg shadow-[0_0_40px_rgba(108,92,231,0.4)] hover:shadow-[0_0_60px_rgba(108,92,231,0.6)] transition-all duration-300 bg-primary hover:bg-primary-glow text-primary-foreground border border-primary-glow/50 group w-full sm:w-auto">
                  <Link href="/contact">
                    <span className="flex items-center">
                      Get an Estimate
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg glass hover:bg-white/10 transition-colors duration-300 w-full sm:w-auto">
                  <Link href="/services">View our Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

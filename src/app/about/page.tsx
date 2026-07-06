'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Award, Users, Zap, Target, TrendingUp, CheckCircle2, Sparkles, Linkedin, Mail, Github, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const values = [
  {
    icon: Target,
    title: 'User-First',
    description: 'Every decision we make prioritizes the end user experience',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Lightning-fast, optimized experiences are our standard',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We work as an extension of your team, not just a vendor',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Quality and attention to detail in every pixel and line of code',
  },
];

const team = [
  {
    name: 'Jay Tiwary',
    role: 'CEO & Founder',
    bio: 'A passionate entrepreneur with a knack for building innovative digital solutions. With a background in computer science and business, Jay is dedicated to creating meaningful impact through technology. He is the driving force behind the company, ensuring that every project is delivered with precision and excellence. He is a 10x developer and a master of his craft.',
  },
  {
    name: 'Abhi Singh',
    role: 'Lead Developer',
    bio: 'A full-stack engineering expert specializing in modern web technologies and performance optimization. With expertise across React, Node.js, and cloud architectures, Abhi builds scalable, high-performance applications that exceed client expectations. Passionate about clean code, best practices, and mentoring the next generation of developers.',
  },
  {
    name: 'Shubham Mulye',
    role: 'Sr. Designer',
    bio: 'A creative design leader with a keen eye for aesthetics and user experience. Specializes in crafting intuitive interfaces that blend beautiful visuals with functional design. Expert in design systems, prototyping, and translating complex requirements into elegant, user-centric solutions that drive engagement and conversions.',
  },
  {
    name: 'Pawan Mishra',
    role: 'Manager',
    bio: 'A strategic operations leader with expertise in project management, team coordination, and client relations. Pawan ensures seamless project delivery by aligning resources, managing timelines, and maintaining clear communication. Known for building high-performing teams and fostering a collaborative environment that drives innovation and excellence.',
  },
  {
    name: 'Mahadev Patil',
    role: 'Content and Blog Writer',
    bio: 'A skilled wordsmith with expertise in crafting compelling narratives that resonate with audiences. Specializes in SEO-optimized content, technical writing, and storytelling that drives engagement and conversions.',
  },
  {
    name: 'Ishita Naik',
    role: 'Social Media Manager',
    bio: 'A creative strategist who transforms brands through innovative social media campaigns. Expert in community building, content curation, and analytics-driven growth strategies that amplify brand presence across platforms.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background">
      {/* Immersive Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-float" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-accent/20 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-float" style={{ animationDuration: '14s', animationDelay: '2s' }}></div>
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
              Our Story
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-display-lg font-display font-black tracking-tighter mb-8 leading-[1.1]">
            Engineering <br />
            <span className="relative whitespace-nowrap">
              <span className="absolute -inset-1 bg-gradient-to-r from-primary to-accent blur-2xl opacity-40"></span>
              <span className="relative text-gradient">Digital Excellence</span>
            </span>
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl font-light leading-relaxed">
            We're a team of passionate designers, developers, and creative technologists
            dedicated to pushing the boundaries of what's possible on the web.
          </p>
        </motion.div>

        {/* Values Section */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Core <span className="text-gradient">Values</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="h-full glass border-border/30 hover:border-primary/50 transition-all duration-500 hover:shadow-glow group cursor-pointer relative overflow-hidden bg-card/40">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-8 relative z-10">
                    <div className="mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-primary/20">
                      <value.icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-500" />
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-4 text-foreground/90 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all duration-300">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Meet the <span className="text-gradient">Team</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Talented individuals united by a passion for creating exceptional web experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <Card className="h-full glass border-border/30 hover:border-primary/50 transition-all duration-500 hover:shadow-glow group relative overflow-hidden bg-card/40">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>

                  <CardContent className="p-8 relative z-10 flex flex-col h-full">
                    <div className="flex flex-col items-center text-center flex-grow">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="mb-6 relative"
                      >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-accent blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                        <Avatar className="w-32 h-32 mx-auto ring-2 ring-primary/30 group-hover:ring-primary transition-all duration-500 relative z-10 bg-background">
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-foreground font-display text-3xl font-bold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>

                      <div className="mb-6">
                        <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all duration-300">
                          {member.name}
                        </h3>
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 group-hover:border-primary/40 group-hover:bg-primary/20 transition-all duration-300">
                          <span className="text-primary text-sm font-medium tracking-wide uppercase">{member.role}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                        {member.bio}
                      </p>

                      <div className="flex items-center justify-center gap-4 pt-6 border-t border-border/30 w-full mt-auto group-hover:border-primary/30 transition-colors duration-500">
                        {[
                          { icon: Linkedin, label: 'LinkedIn' },
                          { icon: Mail, label: 'Email' },
                          { icon: Github, label: 'GitHub' }
                        ].map((social, i) => (
                          <motion.a
                            key={social.label}
                            href="#"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-xl bg-background/50 border border-border/50 hover:border-primary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(108,92,231,0.3)] transition-all duration-300"
                            aria-label={social.label}
                          >
                            <social.icon className="h-4 w-4" />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl blur-2xl opacity-50 pointer-events-none" />
          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            {[
              { icon: CheckCircle2, value: '10+', label: 'Projects Delivered', color: 'primary' },
              { icon: TrendingUp, value: '90+', label: 'Avg. Lighthouse Score', color: 'accent' },
              { icon: Award, value: '100%', label: 'Client Satisfaction', color: 'primary' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.02, y: -5 }}
                className="p-10 rounded-3xl glass border border-border/30 hover:border-primary/50 transition-all duration-500 hover:shadow-glow text-center group bg-card/40"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-primary/20`}>
                  <stat.icon className={`h-8 w-8 text-primary group-hover:text-accent transition-colors`} />
                </div>
                <div className="text-5xl md:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
                  {stat.value}
                </div>
                <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">Ready to build something amazing?</h2>
          <Button asChild size="lg" className="h-14 px-8 rounded-full text-lg shadow-[0_0_40px_rgba(108,92,231,0.4)] hover:shadow-[0_0_60px_rgba(108,92,231,0.6)] transition-all duration-300 bg-primary hover:bg-primary-glow text-primary-foreground border border-primary-glow/50 group">
            <Link href="/contact">
              <span className="flex items-center">
                Get in touch
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MapPin, Phone, Send, Sparkles, Clock, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { apiRequest } from '@/lib/api';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeline, setTimeline] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = new FormData(e.currentTarget);
      const name = String(form.get('name') || '').trim();
      const email = String(form.get('email') || '').trim();
      const budget = String(form.get('budget') || '').trim();
      const message = String(form.get('message') || '').trim();

      await apiRequest('/api/leads', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          budget: budget || undefined,
          timeline: timeline || undefined,
          message,
        }),
      });

      toast.success('Message sent successfully! We\'ll be in touch soon.');
      (e.target as HTMLFormElement).reset();
      setTimeline(undefined);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background">
      {/* Immersive Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[0%] left-[-10%] w-[60vw] h-[60vw] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-float" style={{ animationDuration: '18s' }}></div>
        <div className="absolute bottom-[0%] right-[-10%] w-[50vw] h-[50vw] bg-accent/20 rounded-full blur-[120px] mix-blend-screen opacity-40 animate-float" style={{ animationDuration: '22s', animationDelay: '3s' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-background/10 via-background/80 to-background" />
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
              Let's Connect
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-display-lg font-display font-black tracking-tighter mb-8 leading-[1.1]">
            Get in <span className="relative whitespace-nowrap">
              <span className="absolute -inset-1 bg-gradient-to-r from-primary to-accent blur-2xl opacity-40"></span>
              <span className="relative text-gradient">Touch</span>
            </span>
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl font-light leading-relaxed">
            Ready to build something extraordinary? Drop us a line and let's start the conversation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1 space-y-6"
          >
            <Card className="glass border-border/30 bg-card/40 relative overflow-hidden group hover:border-primary/50 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-8 relative z-10">
                <div className="space-y-10">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center shrink-0 border border-primary/20 shadow-[0_0_15px_rgba(108,92,231,0.2)] group-hover:scale-110 transition-transform duration-500">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl mb-1 text-foreground/90">Email Us</h3>
                      <a href="mailto:webmatrix.work@gmail.com" className="text-muted-foreground hover:text-primary transition-colors text-sm break-all">
                        webmatrix.work@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center shrink-0 border border-accent/20 shadow-[0_0_15px_rgba(0,209,255,0.2)] group-hover:scale-110 transition-transform duration-500">
                      <Phone className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl mb-1 text-foreground/90">Call Us</h3>
                      <a href="tel:+919112144335" className="text-muted-foreground hover:text-primary transition-colors text-sm block">
                        +91 9112144335
                      </a>
                      <a href="tel:+917448223550" className="text-muted-foreground hover:text-primary transition-colors text-sm block">
                        +91 7448223550
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center shrink-0 border border-primary/20 shadow-[0_0_15px_rgba(108,92,231,0.2)] group-hover:scale-110 transition-transform duration-500">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl mb-1 text-foreground/90">Location</h3>
                      <p className="text-muted-foreground text-sm">
                        Mumbai, Maharashtra<br/>India
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-border/30 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden group hover:shadow-glow transition-all duration-500">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
              <CardContent className="p-8 relative z-10 flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center shrink-0 border border-border/50">
                  <Clock className="h-6 w-6 text-foreground/80" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-2 text-foreground">Quick Response</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We typically respond within 24 hours. For urgent inquiries, please call us directly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2"
          >
            <Card className="glass border-border/30 bg-card/40 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary animate-gradient-xy opacity-50" />
              <CardContent className="p-8 md:p-12 relative z-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-sm font-medium text-foreground/80 tracking-wide uppercase">Name *</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        placeholder="John Doe" 
                        required 
                        className="h-14 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl text-lg px-5"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-sm font-medium text-foreground/80 tracking-wide uppercase">Email *</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        required 
                        className="h-14 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl text-lg px-5"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="budget" className="text-sm font-medium text-foreground/80 tracking-wide uppercase">Budget Range</Label>
                      <Input 
                        id="budget" 
                        name="budget" 
                        placeholder="e.g. ₹50,000 - ₹1,00,000" 
                        className="h-14 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl text-lg px-5"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="timeline" className="text-sm font-medium text-foreground/80 tracking-wide uppercase">Expected Timeline</Label>
                      <Select value={timeline} onValueChange={setTimeline}>
                        <SelectTrigger id="timeline" className="h-14 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl text-lg px-5">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent className="glass border-border/30 bg-card/80 backdrop-blur-xl">
                          <SelectItem value="urgent" className="focus:bg-primary/20">ASAP / Urgent</SelectItem>
                          <SelectItem value="1-2m" className="focus:bg-primary/20">1-2 months</SelectItem>
                          <SelectItem value="2-3m" className="focus:bg-primary/20">2-3 months</SelectItem>
                          <SelectItem value="3m+" className="focus:bg-primary/20">3+ months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-sm font-medium text-foreground/80 tracking-wide uppercase">Project Details *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project goals, features, and any specific requirements..."
                      className="min-h-[180px] bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl text-lg p-5 resize-y"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-16 rounded-xl text-lg font-bold shadow-[0_0_30px_rgba(108,92,231,0.3)] hover:shadow-[0_0_50px_rgba(108,92,231,0.6)] transition-all duration-300 bg-primary hover:bg-primary-glow text-primary-foreground group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                        Sending Message...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Send Message
                        <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover } from "@/components/ui/animated-slideshow"

const SLIDES = [
  {
    id: "slide-1",
    title: "frontend dev",
    imageUrl:
      "https://images.unsplash.com/photo-1654618977232-a6c6dea9d1e8?q=80&w=2486&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "slide-2",
    title: "backend dev",
    imageUrl:
      "https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "slide-6",
    title: "UI UX design",
    imageUrl:
      "https://images.unsplash.com/photo-1688733720228-4f7a18681c4f?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "slide-3",
    title: "video editing",
    imageUrl:
      "https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "slide-4",
    title: "SEO optimization",
    imageUrl:
      "https://images.unsplash.com/photo-1726066012698-bb7a3abce786?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]

export function AnimatedSlideshowSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Calculate which slide should be active based on scroll progress (0 to 1)
    const totalSlides = SLIDES.length;
    // Map scroll progress to a slide index
    let currentSlideIndex = Math.floor(latest * totalSlides);
    // Clamp to valid array bounds
    if (currentSlideIndex >= totalSlides) {
      currentSlideIndex = totalSlides - 1;
    }
    if (currentSlideIndex < 0) {
      currentSlideIndex = 0;
    }
    
    if (currentSlideIndex !== activeSlide) {
      setActiveSlide(currentSlideIndex);
    }
  });

  return (
    <div ref={containerRef} className="relative h-[350vh] bg-background">
      <HoverSlider 
        activeSlide={activeSlide}
        onSlideChange={setActiveSlide}
        className="sticky top-0 h-screen place-content-center p-6 md:px-12 text-foreground z-10 overflow-hidden flex flex-col justify-center"
      >
        <div className="container mx-auto">
          <h3 className="mb-12 text-primary text-sm font-semibold tracking-widest uppercase">
            / our services
          </h3>
          <div className="flex flex-wrap items-center justify-between gap-6 md:gap-12">
            <div className="flex flex-col space-y-4 md:space-y-8 w-full md:w-1/2 z-20">
              {SLIDES.map((slide, index) => (
                <TextStaggerHover
                  key={slide.title}
                  index={index}
                  className={`cursor-pointer text-4xl md:text-5xl lg:text-7xl font-display font-bold uppercase tracking-tighter transition-colors duration-500 ${
                    activeSlide === index ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                  text={slide.title}
                />
              ))}
            </div>
            <HoverSliderImageWrap className="w-full md:w-5/12 h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
              {SLIDES.map((slide, index) => (
                <div key={slide.id} className="w-full h-full">
                  <HoverSliderImage
                    index={index}
                    imageUrl={slide.imageUrl}
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover scale-[1.02]"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ))}
            </HoverSliderImageWrap>
          </div>
        </div>
      </HoverSlider>
    </div>
  )
}

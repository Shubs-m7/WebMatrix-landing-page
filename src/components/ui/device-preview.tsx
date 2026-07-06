'use client';

import React, { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

interface DevicePreviewProps {
  desktopImage: string;
  mobileImage?: string;
  title: string;
  className?: string;
  priority?: boolean;
  display?: 'both' | 'desktop' | 'mobile';
}

export const DevicePreview = ({
  desktopImage,
  mobileImage,
  title,
  className,
  priority = false,
  display = 'both',
}: DevicePreviewProps) => {
  const desktopAspect = '16 / 10';
  const mobileAspect = '9 / 19.5';

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[920px] overflow-visible transition-all duration-500 ease-out',
        'sm:max-w-[960px]',
        className
      )}
      style={{ aspectRatio: desktopAspect }}
    >
      {display !== 'mobile' && (
        <div className="absolute inset-0 rounded-xl md:rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 shadow-2xl backdrop-blur-sm transition-all">
          {/* Screen Bezel */}
          <div className="absolute inset-[2px] md:inset-[3px] rounded-[10px] md:rounded-[13px] bg-[#0a0a0a] ring-1 ring-black/20 dark:ring-white/10 overflow-hidden shadow-inner">
            
            {/* Macbook Notch */}
            <div className="absolute top-0 left-1/2 h-[12px] md:h-[16px] w-[80px] md:w-[100px] -translate-x-1/2 bg-[#0a0a0a] rounded-b-md md:rounded-b-lg flex items-center justify-center z-20">
              <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-white/10" />
            </div>

            {/* Glass Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none z-10" />
            
            <img
              src={desktopImage}
              alt={`${title} - Desktop View`}
              className="h-full w-full object-cover object-top transition-transform duration-1000 group-hover:scale-[1.02]"
              loading={priority ? 'eager' : 'lazy'}
            />
          </div>
        </div>
      )}

      {mobileImage && display !== 'desktop' && (
        <div
          className={cn(
            'absolute -bottom-[4%] -right-[4%] w-[26%] max-w-[160px] origin-bottom-right transition-transform duration-700 z-20',
            'sm:-bottom-[3%] sm:-right-[3%] sm:w-[24%] sm:max-w-[180px]',
            'md:-bottom-[5%] md:-right-[2%] md:w-[22%] md:max-w-[220px]',
            'group-hover:-translate-y-2 group-hover:-translate-x-2 sm:group-hover:-translate-y-4 sm:group-hover:-translate-x-4',
            'drop-shadow-2xl'
          )}
        >
          <div
            className="relative rounded-[1.5rem] md:rounded-[2rem] border border-white/20 dark:border-white/10 bg-zinc-800 dark:bg-zinc-900 shadow-2xl overflow-hidden ring-4 ring-black/10 dark:ring-black/40"
            style={{ aspectRatio: mobileAspect }}
          >
            {/* iPhone Bezel */}
            <div className="absolute inset-[3px] md:inset-[4px] rounded-[1.3rem] md:rounded-[1.7rem] bg-[#0a0a0a] overflow-hidden ring-1 ring-white/10">
              
              {/* Dynamic Island */}
              <div className="absolute top-1.5 md:top-2 left-1/2 h-[10px] md:h-[14px] w-[36px] md:w-[48px] -translate-x-1/2 bg-[#050505] rounded-full z-20 flex items-center justify-end px-1.5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">
                <div className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-white/20" />
              </div>

              {/* Screen Content */}
              <img
                src={mobileImage}
                alt={`${title} - Mobile View`}
                className="h-full w-full object-cover object-top transition-transform duration-1000 group-hover:scale-[1.05]"
                loading="lazy"
              />

              {/* Home Indicator */}
              <div className="absolute bottom-1 md:bottom-1.5 left-1/2 h-[3px] md:h-[4px] w-[35%] -translate-x-1/2 bg-white/40 backdrop-blur-md rounded-full z-20" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
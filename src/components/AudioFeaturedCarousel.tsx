"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Headphones, ChevronLeft, ChevronRight, Target } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { TrainingModule } from '@/types/portal';

interface AudioFeaturedCarouselProps {
  modules: TrainingModule[];
  onPlay: (dbId: string, url: string) => void;
  currentPlayingId: string | null;
}

// Placeholder images for visual impact
const placeholderImages = [
  "https://images.unsplash.com/photo-1517976384346-3136801d605d?q=80&w=1200", // Jet cockpit
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200", // Tech/AI
  "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1200", // Air Force
  "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?q=80&w=1200", // Cyber
];

const AudioFeaturedCarousel = ({ modules, onPlay, currentPlayingId }: AudioFeaturedCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const featuredModules = modules.slice(0, 4); // Limit to 4 featured items

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">FEATURED <span className="font-light text-white/40">TRANSMISSIONS</span></h3>
        <div className="flex gap-3">
          <button onClick={scrollPrev} className="p-3 bg-white/5 hover:bg-[#00E5FF]/10 rounded-xl transition-colors border border-white/10"><ChevronLeft className="w-4 h-4 text-white/60" /></button>
          <button onClick={scrollNext} className="p-3 bg-white/5 hover:bg-[#00E5FF]/10 rounded-xl transition-colors border border-white/10"><ChevronRight className="w-4 h-4 text-white/60" /></button>
        </div>
      </div>

      <div className="embla overflow-hidden rounded-3xl" ref={emblaRef}>
        <div className="embla__container flex">
          {featuredModules.map((mod, index) => {
            const isActive = currentPlayingId === mod.dbId;
            const imageUrl = placeholderImages[index % placeholderImages.length];

            return (
              <div key={mod.dbId} className="embla__slide flex-[0_0_90%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 first:pl-0">
                <motion.div
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.01 }}
                  className={`relative aspect-[16/10] rounded-2xl overflow-hidden group transition-all duration-500 cursor-pointer ${isActive ? 'border-4 border-[#00E5FF] shadow-[0_0_40px_rgba(0,229,255,0.3)]' : 'border border-white/10'}`}
                >
                  {/* Image with Cyan Filter */}
                  <img 
                    src={imageUrl} 
                    alt={mod.title} 
                    className="w-full h-full object-cover opacity-70 grayscale-[0.5] group-hover:opacity-100 transition-all duration-700"
                    style={{ filter: 'hue-rotate(180deg) saturate(1.5)' }}
                  />
                  
                  {/* Overlay and Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono font-black text-[#00E5FF] uppercase tracking-widest">TRANSMISSION ID: {mod.id}</span>
                      <h4 className="text-2xl font-black text-white uppercase leading-tight tracking-tighter">{mod.title}</h4>
                      <p className="text-sm text-white/60 line-clamp-2">{mod.desc}</p>
                    </div>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); onPlay(mod.dbId, mod.audioUrl); }}
                      className="mt-4 flex items-center gap-3 bg-[#00E5FF] text-black px-6 py-3 rounded-xl font-black uppercase text-xs hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(0,229,255,0.2)]"
                    >
                      <Play size={16} fill="black" className={isActive ? 'animate-pulse' : ''} /> 
                      {isActive ? 'PLAYING NOW' : 'INITIATE UPLINK'}
                    </button>
                  </div>

                  {/* Hover Effect: Grid and Target */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                    <Target className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-[#00E5FF]/50 animate-pulse" />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AudioFeaturedCarousel;
"use client";

import React from 'react';
import { Play, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface StreamingHeroProps {
  title: string;
  description: string;
  onWatch: () => void;
}

const StreamingHero = ({ title, description, onWatch }: StreamingHeroProps) => {
  return (
    <section className="relative h-[85vh] w-full flex items-end pb-32 px-12 md:px-20 overflow-hidden">
      {/* Background Image / Video Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1517976384346-3136801d605d?auto=format&fit=crop&w=1920&q=90" 
          className="w-full h-full object-cover opacity-50"
          alt="Hero background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/40 to-transparent"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 bg-[#00E5FF] text-black text-[10px] font-black uppercase rounded shadow-[0_0_15px_rgba(0,229,255,0.4)]">Top Choice</span>
          <span className="text-xs font-bold text-[#00E5FF] uppercase tracking-[0.3em]">Project Aeris // Core Doctrine</span>
        </div>
        
        <h2 className="text-6xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase italic">
          {title}
        </h2>
        
        <p className="text-xl text-white/60 font-medium leading-relaxed max-w-2xl">
          {description}
        </p>
        
        <div className="flex gap-4 pt-6">
          <button 
            onClick={onWatch}
            className="flex items-center gap-3 bg-white text-black px-10 py-4 rounded-xl font-black uppercase text-sm hover:bg-[#00E5FF] transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] group"
          >
            <Play fill="black" size={20} className="group-hover:scale-110 transition-transform" /> 
            Iniciar Briefing
          </button>
          <button className="flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-10 py-4 rounded-xl font-black uppercase text-sm hover:bg-white/20 transition-all border border-white/10">
            <Info size={20} /> 
            Mais Intel
          </button>
        </div>
      </motion.div>

      {/* Indicador de Som/Vídeo Lateral */}
      <div className="absolute bottom-32 right-20 flex items-center gap-4">
         <div className="w-12 h-[1px] bg-white/20" />
         <span className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.5em]">Sync_Active</span>
      </div>
    </section>
  );
};

export default StreamingHero;
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Headphones, Clock, Target } from 'lucide-react';
import { TrainingModule } from '@/types/portal';

interface AudioGridCardProps {
  mod: TrainingModule;
  index: number;
  onPlay: (dbId: string, url: string) => void;
  isActive: boolean;
  isPlaying: boolean;
}

// Placeholder image for grid items (Tactical/Command theme)
const defaultGridImage = "https://images.unsplash.com/photo-1517976384346-3136801d605d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const AudioGridCard = ({ mod, index, onPlay, isActive, isPlaying }: AudioGridCardProps) => {
  const isLocked = mod.locked; // Assuming master controls locking status

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLocked) {
      onPlay(mod.dbId, mod.audioUrl);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`relative aspect-[3/4] rounded-2xl overflow-hidden group transition-all duration-500 ${
        isLocked 
          ? 'bg-red-900/10 border border-red-500/20 opacity-50 cursor-default' 
          : 'bg-[#0A192F]/80 border border-white/10 hover:border-[#00E5FF]/60 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] cursor-pointer'
      }`}
      onClick={handleAction}
    >
      {/* Image and Visual Effects */}
      <div className="relative h-1/2 w-full">
        <img 
          src={defaultGridImage} 
          alt={mod.title} 
          className="w-full h-full object-cover opacity-70 grayscale-[0.5] transition-all duration-700"
          style={{ filter: 'hue-rotate(180deg) saturate(1.5)' }}
        />
        
        {/* Hover Effect: Grid and Target */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <Target className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-[#00E5FF]/50 animate-pulse" />
        </div>

        {/* Play Button Overlay */}
        <button 
          onClick={handleAction}
          disabled={isLocked}
          className={`absolute bottom-4 right-4 w-12 h-12 rounded-full transition-all flex items-center justify-center z-10 ${
            isLocked 
              ? 'bg-gray-700/50 text-gray-500' 
              : isActive && isPlaying 
                ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_#00E5FF]' 
                : 'bg-white/10 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black'
          }`}
        >
          {isActive && isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
        </button>
      </div>

      {/* Metadata Section */}
      <div className="p-6 space-y-4 h-1/2 flex flex-col justify-between">
        <div className="space-y-2">
          <span className="text-[9px] font-mono font-black text-[#00E5FF] uppercase tracking-widest">VOX ID: {mod.id}</span>
          <h4 className="text-lg font-black text-white uppercase leading-tight tracking-tighter line-clamp-2">{mod.title}</h4>
          <p className="text-xs text-white/40 line-clamp-3">{mod.desc}</p>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-2">
            <Clock size={12} className="text-white/30" />
            <span className="text-[10px] font-mono text-white/60">25:30</span> {/* Placeholder duration */}
          </div>
          <span className="text-[10px] font-mono text-white/40 uppercase">{mod.type}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AudioGridCard;
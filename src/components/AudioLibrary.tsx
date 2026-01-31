"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Headphones, Play, Pause, Radio, Volume2 } from 'lucide-react';
import { TrainingModule } from '@/types/portal';
import WaveformVisualizer from './WaveformVisualizer';

interface AudioLibraryProps {
  modules: TrainingModule[];
}

const AudioLibrary = ({ modules }: AudioLibraryProps) => {
  const [currentIdx, setCurrentIdx] = useState<number | null>(null);
  const audioModules = modules.filter(m => m.audioUrl);

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <Radio className="w-6 h-6 text-[#00E5FF]" />
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">AURAL INTELLIGENCE <span className="font-light text-white/20">FEED</span></h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {audioModules.map((mod, idx) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`group flex items-center gap-8 p-6 bg-white/[0.02] border ${currentIdx === idx ? 'border-[#00E5FF]/40 bg-[#00E5FF]/5' : 'border-white/5'} rounded-3xl hover:bg-white/[0.05] transition-all`}
          >
            <div className="w-16 h-16 bg-black/40 rounded-2xl flex items-center justify-center border border-white/10">
              <Headphones className={currentIdx === idx ? 'text-[#00E5FF]' : 'text-white/20'} />
            </div>

            <div className="flex-1 space-y-1">
              <span className="text-[8px] font-mono font-black text-[#00E5FF]/40 uppercase tracking-widest">{mod.id} // SIGNAL_ACTIVE</span>
              <h3 className="text-xl font-bold text-white uppercase">{mod.title}</h3>
              <p className="text-xs text-white/40 max-w-2xl line-clamp-1">{mod.desc}</p>
            </div>

            <div className="hidden md:block w-32">
              <WaveformVisualizer active={currentIdx === idx} />
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-[8px] font-mono text-white/20 uppercase">Duration</p>
                <p className="text-xs font-mono text-white/60">08:42</p>
              </div>
              <button 
                onClick={() => setCurrentIdx(currentIdx === idx ? null : idx)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${currentIdx === idx ? 'bg-[#00E5FF] text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-white/40 hover:text-white'}`}
              >
                {currentIdx === idx ? <Pause className="fill-current" /> : <Play className="fill-current ml-1" />}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AudioLibrary;
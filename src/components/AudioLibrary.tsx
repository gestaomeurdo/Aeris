"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Headphones, Play, Pause, Radio, Edit3, Lock, Unlock, Trash2 } from 'lucide-react';
import { TrainingModule } from '@/types/portal';
import WaveformVisualizer from './WaveformVisualizer';

interface AudioLibraryProps {
  modules: TrainingModule[];
  isMaster?: boolean;
  onEdit?: (m: TrainingModule) => void;
  onToggleLock?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const AudioLibrary = ({ modules, isMaster, onEdit, onToggleLock, onDelete }: AudioLibraryProps) => {
  const [currentIdx, setCurrentIdx] = React.useState<number | null>(null);
  const audioModules = modules.filter(m => m.audioUrl || isMaster);

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
            className={`group flex items-center gap-8 p-6 bg-white/[0.02] border ${mod.locked ? 'border-white/5 opacity-50' : 'border-[#00E5FF]/40 bg-[#00E5FF]/5'} rounded-3xl hover:bg-white/[0.05] transition-all relative`}
          >
            <div className="w-16 h-16 bg-black/40 rounded-2xl flex items-center justify-center border border-white/10">
              <Headphones className={currentIdx === idx ? 'text-[#00E5FF]' : 'text-white/20'} />
            </div>

            <div className="flex-1 space-y-1">
              <span className="text-[8px] font-mono font-black text-[#00E5FF]/40 uppercase tracking-widest">{mod.id} // {mod.locked ? 'ENCRYPTED' : 'SIGNAL_ACTIVE'}</span>
              <h3 className="text-xl font-bold text-white uppercase">{mod.title}</h3>
              <p className="text-xs text-white/40 max-w-2xl line-clamp-1">{mod.desc}</p>
            </div>

            <div className="hidden md:block w-32">
              <WaveformVisualizer active={currentIdx === idx} />
            </div>

            <div className="flex items-center gap-6">
              {isMaster && (
                <div className="flex items-center gap-2 border-r border-white/10 pr-6 mr-2">
                   <button 
                     onClick={() => onEdit?.(mod)}
                     className="p-3 bg-white/5 hover:bg-[#00E5FF]/20 rounded-xl text-white/40 hover:text-[#00E5FF] transition-all"
                   >
                     <Edit3 size={16} />
                   </button>
                   <button 
                     onClick={() => onToggleLock?.(mod.id)}
                     className="p-3 bg-white/5 hover:bg-[#00E5FF]/20 rounded-xl text-white/40 hover:text-[#00E5FF] transition-all"
                   >
                     {mod.locked ? <Lock size={16} /> : <Unlock size={16} />}
                   </button>
                   <button 
                     onClick={() => onDelete?.(mod.id)}
                     className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-500/40 hover:text-red-500 transition-all"
                   >
                     <Trash2 size={16} />
                   </button>
                </div>
              )}
              
              <div className="text-right">
                <p className="text-[8px] font-mono text-white/20 uppercase">Sync</p>
                <p className="text-xs font-mono text-white/60">{mod.progress}%</p>
              </div>
              <button 
                onClick={() => setCurrentIdx(currentIdx === idx ? null : idx)}
                disabled={mod.locked && !isMaster}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${currentIdx === idx ? 'bg-[#00E5FF] text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-white/40 hover:text-white disabled:opacity-20'}`}
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
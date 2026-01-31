"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle, Lock, ChevronRight, Edit3, Trash2, Unlock, ShieldAlert } from 'lucide-react';
import { TrainingModule } from '@/types/portal';
import { useIsMobile } from '@/hooks/use-mobile';

interface MissionBannerProps {
  mod: TrainingModule;
  index: number;
  isMaster?: boolean;
  onSelect: (m: TrainingModule) => void;
  onEdit?: (m: TrainingModule) => void;
  onDelete?: (id: string) => void;
  onToggleLock?: (id: string) => void;
}

const MissionBanner = ({ mod, index, isMaster, onSelect, onEdit, onDelete, onToggleLock }: MissionBannerProps) => {
  const isMobile = useIsMobile();
  const isLocked = mod.locked && !isMaster;
  const isComplete = mod.progress === 100;
  const Icon = isComplete ? CheckCircle : Target;

  const handleClick = () => {
    if (isLocked) return;
    onSelect(mod);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`relative w-full p-4 md:p-6 flex flex-col md:flex-row items-center justify-between rounded-2xl transition-all duration-500 overflow-hidden group gap-4 md:gap-0 ${
        isLocked 
          ? 'bg-red-900/10 border border-red-500/20 opacity-50 cursor-default' 
          : 'bg-[#0A192F]/60 backdrop-blur-md border border-[#00E5FF]/20 hover:border-[#00E5FF]/60 hover:bg-[#0A192F]/80 cursor-pointer'
      }`}
      onClick={handleClick}
    >
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-10 opacity-0">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00E5FF]/10" />
      </div>

      <div className="flex items-center gap-4 md:gap-6 relative z-10 w-full md:w-auto">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${
          isLocked ? 'bg-red-500/10' : isComplete ? 'bg-green-500/10' : 'bg-[#00E5FF]/10'
        }`}>
          {isLocked ? <ShieldAlert className="w-5 h-5 md:w-6 md:h-6 text-red-500" /> : <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isComplete ? 'text-green-500' : 'text-[#00E5FF]'}`} />}
        </div>
        <div className="space-y-0.5">
          <span className="text-[8px] md:text-[9px] font-mono font-black text-white/40 uppercase tracking-widest">MISSION CODE</span>
          <p className={`text-sm md:text-lg font-mono font-bold ${isLocked ? 'text-white/30' : 'text-white'}`}>{mod.id}</p>
        </div>
      </div>

      <div className="w-full md:flex-1 space-y-2 relative z-10 px-0 md:px-8 md:border-x md:border-white/5 md:mx-4">
        <h3 className={`text-base md:text-xl font-black uppercase tracking-tighter leading-tight transition-colors ${isLocked ? 'text-white/30' : 'text-white group-hover:text-[#00E5FF]'}`}>
          {mod.title}
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${mod.progress}%` }} transition={{ duration: 1.5 }} className={`h-full ${isComplete ? 'bg-green-500' : 'bg-amber-500'}`} />
          </div>
          <span className={`text-[9px] font-mono font-bold ${isComplete ? 'text-green-500' : 'text-amber-500'}`}>{mod.progress}%</span>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6 relative z-10 w-full md:w-auto border-t border-white/5 pt-4 md:pt-0 md:border-0">
        {isMaster && (
          <div className="flex items-center gap-2">
            <button onClick={(e) => { e.stopPropagation(); onEdit?.(mod); }} className="p-2 bg-black/40 border border-white/10 rounded-lg text-white/60 hover:text-[#00E5FF]"><Edit3 size={14} /></button>
            <button onClick={(e) => { e.stopPropagation(); onDelete?.(mod.id); }} className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500"><Trash2 size={14} /></button>
          </div>
        )}
        <button
          className={`flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${
            isLocked ? 'bg-gray-700/50 text-gray-500' : 'bg-amber-500 text-black shadow-lg'
          }`}
        >
          {isComplete ? 'COMPLETE' : 'ENGAGE'}
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
};

export default MissionBanner;
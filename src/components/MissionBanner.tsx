"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle, Lock, ChevronRight, Edit3, Trash2, Unlock, ShieldAlert } from 'lucide-react';
import { TrainingModule } from '@/types/portal';

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
      className={`relative w-full p-6 flex items-center justify-between rounded-2xl transition-all duration-500 overflow-hidden group ${
        isLocked 
          ? 'bg-red-900/10 border border-red-500/20 opacity-50 cursor-default' 
          : 'bg-[#0A192F]/60 backdrop-blur-md border border-[#00E5FF]/20 hover:border-[#00E5FF]/60 hover:bg-[#0A192F]/80 cursor-pointer'
      }`}
      onClick={handleClick}
    >
      {/* Background Glow/Effect */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-10' : 'opacity-0 group-hover:opacity-10'}`}>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00E5FF]/10" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#00E5FF]/10" />
      </div>

      {/* Left Section: Status & Code */}
      <div className="flex items-center gap-6 relative z-10 min-w-[200px]">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
          isLocked ? 'bg-red-500/10' : isComplete ? 'bg-green-500/10' : 'bg-[#00E5FF]/10'
        }`}>
          {isLocked ? <ShieldAlert className="w-6 h-6 text-red-500" /> : <Icon className={`w-6 h-6 ${isComplete ? 'text-green-500' : 'text-[#00E5FF]'}`} />}
        </div>
        <div className="space-y-1">
          <span className="text-[9px] font-mono font-black text-white/40 uppercase tracking-widest">MISSION CODE</span>
          <p className={`text-lg font-mono font-bold ${isLocked ? 'text-white/30' : 'text-white'}`}>{mod.id}</p>
        </div>
      </div>

      {/* Center Section: Title & Progress */}
      <div className="flex-1 space-y-2 relative z-10 px-8 border-x border-white/5 mx-4">
        <h3 className={`text-xl font-black uppercase tracking-tighter leading-tight transition-colors ${isLocked ? 'text-white/30' : 'text-white group-hover:text-[#00E5FF]'}`}>
          {mod.title}
        </h3>
        
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-mono font-black text-white/40 uppercase tracking-widest">Mission Integrity:</span>
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${mod.progress}%` }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className={`h-full ${isComplete ? 'bg-green-500' : 'bg-amber-500'} shadow-[0_0_10px_rgba(255,165,0,0.5)]`}
            />
          </div>
          <span className={`text-[10px] font-mono font-bold ${isComplete ? 'text-green-500' : 'text-amber-500'}`}>{mod.progress}%</span>
        </div>
      </div>

      {/* Right Section: Action Button & Master Controls */}
      <div className="flex items-center gap-6 relative z-10">
        {isMaster && (
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={(e) => { e.stopPropagation(); onEdit?.(mod); }} className="p-2 bg-black/40 hover:bg-[#00E5FF]/20 border border-white/10 rounded-lg text-white/60 hover:text-[#00E5FF] transition-all"><Edit3 size={14} /></button>
            <button onClick={(e) => { e.stopPropagation(); onToggleLock?.(mod.id); }} className="p-2 bg-black/40 border border-white/10 rounded-lg text-white/60 hover:text-[#00E5FF] transition-all">{mod.locked ? <Lock size={14} /> : <Unlock size={14} />}</button>
            <button onClick={(e) => { e.stopPropagation(); onDelete?.(mod.id); }} className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 transition-all"><Trash2 size={14} /></button>
          </div>
        )}

        <button
          onClick={handleClick}
          disabled={isLocked}
          className={`flex items-center gap-3 px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${
            isLocked 
              ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed' 
              : 'bg-amber-500 text-black shadow-[0_0_30px_rgba(255,165,0,0.3)] hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isComplete ? 'MISSION COMPLETE' : 'ENGAGE PROTOCOL'}
          {!isLocked && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
        </button>
      </div>
    </motion.div>
  );
};

export default MissionBanner;
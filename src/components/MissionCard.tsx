"use client";

import React from 'react';
import { FileText, Headphones, Podcast, Lock, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface MissionCardProps {
  id: string;
  title: string;
  type: string;
  progress: number;
  isLocked?: boolean;
}

const MissionCard = ({ id, title, type, progress, isLocked }: MissionCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative group overflow-hidden bg-zinc-900/40 backdrop-blur-xl border border-amber-500/10 rounded-xl p-5 transition-all duration-300 hover:border-amber-500/40"
    >
      {/* Top Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-zinc-800">
        <div 
          className="h-full bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.5)]" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between items-start mb-6 pt-2">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-amber-500/60 uppercase tracking-widest font-bold">
            {id} // {type}
          </span>
          <h3 className="text-lg font-semibold text-zinc-100 mt-1 tracking-tight group-hover:text-amber-400 transition-colors">
            {title}
          </h3>
        </div>
        {isLocked ? (
          <Lock className="w-4 h-4 text-zinc-600" />
        ) : progress === 100 ? (
          <CheckCircle2 className="w-4 h-4 text-amber-500" />
        ) : null}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all group/btn">
          <FileText className="w-4 h-4 text-amber-500" />
          <span className="text-[9px] font-mono uppercase text-zinc-500 group-hover/btn:text-amber-500">Docs</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all group/btn">
          <Headphones className="w-4 h-4 text-amber-500" />
          <span className="text-[9px] font-mono uppercase text-zinc-500 group-hover/btn:text-amber-500">Audio</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all group/btn">
          <Podcast className="w-4 h-4 text-amber-500" />
          <span className="text-[9px] font-mono uppercase text-zinc-500 group-hover/btn:text-amber-500">Intel</span>
        </button>
      </div>
    </motion.div>
  );
};

export default MissionCard;
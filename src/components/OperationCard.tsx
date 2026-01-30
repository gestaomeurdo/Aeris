"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Headphones, Podcast, Lock, ShieldCheck } from 'lucide-react';
import TacticalButton from './TacticalButton';

interface OperationCardProps {
  code: string;
  title: string;
  status: 'active' | 'locked' | 'complete';
  progress: number;
}

const OperationCard = ({ code, title, status, progress }: OperationCardProps) => {
  const isLocked = status === 'locked';

  return (
    <div className="relative bg-zinc-900/40 backdrop-blur-xl border-l border-zinc-800/50 p-6 flex flex-col gap-6 group overflow-hidden min-h-[320px]">
      {/* Lesson Cover Background layer */}
      <div 
        className="absolute inset-0 bg-[url('https://i.ibb.co/mrPSkq5v/1.png')] bg-cover bg-center opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-20 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black/80" />

      {/* Linha de acento em Ouro Envelhecido */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-amber-900/50 via-amber-600/50 to-amber-900/50 opacity-50 group-hover:opacity-100 transition-opacity" />
      
      {/* Grid Pattern Sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(180,120,50,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(180,120,50,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-amber-700 font-bold uppercase tracking-[0.2em]">OP-{code}</span>
            <div className="h-[1px] w-8 bg-amber-900/30" />
          </div>
          <h3 className="text-xl font-bold text-zinc-200 uppercase tracking-tighter group-hover:text-amber-400 transition-colors">
            {title}
          </h3>
        </div>
        {status === 'complete' && <ShieldCheck className="w-5 h-5 text-amber-600" />}
      </div>

      <div className="space-y-2 relative z-10">
        <div className="flex justify-between text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
          <span>Deployment Status</span>
          <span className="text-amber-700">{progress}%</span>
        </div>
        <div className="h-1 bg-black border border-zinc-800/50 rounded-sm overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-amber-950 via-amber-600 to-amber-950 shadow-[0_0_10px_rgba(217,119,6,0.3)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 relative z-10 mt-auto">
        {isLocked ? (
          <div className="col-span-3 flex items-center justify-center gap-2 p-8 border border-dashed border-zinc-800/50 rounded-md bg-black/60 backdrop-blur-sm">
            <Lock className="w-4 h-4 text-zinc-800" />
            <span className="text-[10px] font-mono text-zinc-800 uppercase tracking-widest font-bold">Access Restricted</span>
          </div>
        ) : (
          <>
            <TacticalButton icon={FileText} label="PDF" />
            <TacticalButton icon={Headphones} label="Audio" />
            <TacticalButton icon={Podcast} label="Cast" />
          </>
        )}
      </div>
    </div>
  );
};

export default OperationCard;
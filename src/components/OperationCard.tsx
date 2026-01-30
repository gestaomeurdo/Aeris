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
    <div className="relative bg-zinc-900/40 backdrop-blur-xl border-l border-zinc-800 p-6 flex flex-col gap-6 group overflow-hidden">
      {/* Gold top accent line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-amber-600/50 via-amber-400 to-amber-600/50 opacity-50 group-hover:opacity-100 transition-opacity" />
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      <div className="flex justify-between items-start relative">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-amber-600 font-bold uppercase tracking-[0.2em]">OP-{code}</span>
            <div className="h-[1px] w-8 bg-amber-600/20" />
          </div>
          <h3 className="text-xl font-bold text-zinc-100 uppercase tracking-tighter group-hover:text-amber-200 transition-colors">
            {title}
          </h3>
        </div>
        {status === 'complete' && <ShieldCheck className="w-5 h-5 text-amber-500" />}
      </div>

      {/* Progress Section */}
      <div className="space-y-2">
        <div className="flex justify-between text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
          <span>Deployment Status</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-amber-900 via-amber-500 to-amber-900"
          />
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-3 gap-3">
        {isLocked ? (
          <div className="col-span-3 flex items-center justify-center gap-2 p-8 border border-dashed border-zinc-800 rounded-md bg-black/20">
            <Lock className="w-4 h-4 text-zinc-700" />
            <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">Access Restricted</span>
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
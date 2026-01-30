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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-[#0C0C0C] border border-white/[0.03] rounded-sm p-8 flex flex-col gap-8 transition-all duration-500 hover:border-[#D4AF37]/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.05)] overflow-hidden"
    >
      {/* Background Cover Image with Glassmorphism */}
      <div 
        className="absolute inset-0 bg-[url('https://i.ibb.co/mrPSkq5v/1.png')] bg-cover bg-center opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700"
      />
      
      {/* Premium 1px Gold Top Border Highlight */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-[0.3em]">MODULE {code}</span>
            <div className="h-[1px] w-6 bg-[#D4AF37]/20" />
          </div>
          <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
            {title}
          </h3>
        </div>
        {status === 'complete' ? (
          <div className="p-2 bg-[#D4AF37]/10 rounded-full">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
          </div>
        ) : !isLocked && (
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_8px_#D4AF37]" />
        )}
      </div>

      <div className="space-y-3 relative z-10">
        <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
          <span>Completion Rate</span>
          <span className="text-[#D4AF37]">{progress}%</span>
        </div>
        <div className="h-[2px] bg-zinc-900 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 relative z-10 mt-2">
        {isLocked ? (
          <div className="col-span-3 flex flex-col items-center justify-center gap-3 p-10 border border-dashed border-zinc-800/50 rounded-sm bg-black/40 backdrop-blur-sm">
            <Lock className="w-5 h-5 text-zinc-800" />
            <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.2em] font-bold">Access Restricted</span>
          </div>
        ) : (
          <>
            <TacticalButton icon={FileText} label="PDF" />
            <TacticalButton icon={Headphones} label="AUDIO" />
            <TacticalButton icon={Podcast} label="PODCAST" />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default OperationCard;
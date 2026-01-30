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
      className="group relative bg-[#0A192F]/60 backdrop-blur-md border border-[#00E5FF]/5 rounded-sm p-8 flex flex-col gap-8 transition-all duration-500 hover:border-[#00E5FF]/30 hover:shadow-[0_0_30px_rgba(0,229,255,0.05)] overflow-hidden"
    >
      {/* Background Cover Image */}
      <div 
        className="absolute inset-0 bg-[url('https://i.ibb.co/mrPSkq5v/1.png')] bg-cover bg-center opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700"
      />
      
      {/* Cyan Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-[#00E5FF] font-bold uppercase tracking-[0.3em]">UNIT {code}</span>
            <div className="h-[1px] w-6 bg-[#00E5FF]/20" />
          </div>
          <h3 className="text-xl font-bold text-[#B0BEC5] uppercase tracking-tight group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
        </div>
        {status === 'complete' ? (
          <ShieldCheck className="w-5 h-5 text-[#00E5FF]" />
        ) : !isLocked && (
          <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_8px_#00E5FF]" />
        )}
      </div>

      <div className="space-y-3 relative z-10">
        <div className="flex justify-between text-[10px] font-mono text-[#B0BEC5]/60 uppercase tracking-widest font-bold">
          <span>Sync Progress</span>
          <span className="text-[#00E5FF]">{progress}%</span>
        </div>
        <div className="h-[2px] bg-[#020B1A] overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[#00E5FF]/50 to-[#00E5FF] shadow-[0_0_10px_#00E5FF]"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 relative z-10 mt-2">
        {isLocked ? (
          <div className="col-span-3 flex flex-col items-center justify-center gap-3 p-10 border border-dashed border-[#00E5FF]/10 rounded-sm bg-[#020B1A]/40 backdrop-blur-sm">
            <Lock className="w-5 h-5 text-[#0A192F]" />
            <span className="text-[10px] font-mono text-[#0A192F] uppercase tracking-[0.2em] font-bold font-black">Restricted</span>
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
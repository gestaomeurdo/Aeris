"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Headphones, Podcast, Lock, ShieldCheck, ArrowUpRight } from 'lucide-react';
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-[#0A192F]/40 backdrop-blur-xl border border-white/[0.05] rounded-2xl p-8 flex flex-col gap-8 transition-all duration-700 hover:border-[#00E5FF]/20 hover:bg-[#0A192F]/60 overflow-hidden"
    >
      {/* Mesh Gradient Background */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00E5FF]/5 blur-[60px] rounded-full group-hover:bg-[#00E5FF]/10 transition-colors duration-700" />
      
      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/[0.03] border border-white/[0.05] rounded-full">
            <span className="text-[9px] font-mono text-[#00E5FF] font-black uppercase tracking-widest">MODULE {code}</span>
          </div>
          <h3 className="text-2xl font-semibold text-white/90 tracking-tight group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
        </div>
        
        {status === 'complete' ? (
          <div className="p-2 bg-[#00E5FF]/10 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-[#00E5FF]" />
          </div>
        ) : !isLocked ? (
          <div className="p-2 bg-white/[0.05] rounded-lg group-hover:bg-[#00E5FF]/10 transition-colors">
            <ArrowUpRight className="w-5 h-5 text-[#B0BEC5] group-hover:text-[#00E5FF] transition-all" />
          </div>
        ) : null}
      </div>

      <div className="space-y-4 relative z-10">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-mono text-[#B0BEC5]/40 uppercase tracking-widest font-bold">Synchronization Status</span>
          <span className="text-sm font-mono font-bold text-[#00E5FF]">{progress}%</span>
        </div>
        <div className="h-[4px] bg-white/[0.03] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="h-full bg-gradient-to-r from-[#00E5FF]/40 to-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.4)] rounded-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 relative z-10">
        {isLocked ? (
          <div className="col-span-3 flex flex-col items-center justify-center gap-4 py-12 border border-dashed border-white/10 rounded-xl bg-black/20">
            <div className="w-12 h-12 bg-white/[0.02] rounded-full flex items-center justify-center border border-white/5">
              <Lock className="w-5 h-5 text-white/10" />
            </div>
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] font-black">Encrypted Access Required</span>
          </div>
        ) : (
          <>
            <TacticalButton icon={FileText} label="DOC" />
            <TacticalButton icon={Headphones} label="VOX" />
            <TacticalButton icon={Podcast} label="HUB" />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default OperationCard;
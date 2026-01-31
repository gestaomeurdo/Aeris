"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap } from 'lucide-react';

const AerisLogo = ({ size = 44 }) => {
  return (
    <div className="relative flex flex-col items-center group">
      {/* Camadas de Glow Dinâmico */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#00E5FF]/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-[#00E5FF]/20 transition-colors duration-1000" />
      
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Anéis Orbitais */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-2 border border-[#00E5FF]/10 rounded-full border-t-[#00E5FF]/40"
        />
        
        <Shield size={size} className="text-[#00E5FF] absolute drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]" strokeWidth={1.5} />
        <motion.div
          animate={{ opacity: [1, 0.5, 1], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Zap size={size/1.8} className="text-white relative z-10" />
        </motion.div>
      </div>
      
      <div className="mt-4 flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-[#00E5FF]/30 to-transparent" />
        <span className="text-[7px] tracking-[0.6em] text-[#00E5FF]/60 font-mono uppercase font-black pl-[0.6em]">
          CORE_SYNC
        </span>
      </div>
    </div>
  );
};

export default AerisLogo;
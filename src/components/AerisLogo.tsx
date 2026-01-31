"use client";

import React from 'react';
import { motion } from 'framer-motion';

const AerisLogo = () => {
  return (
    <div className="relative flex flex-col items-center group">
      {/* Camadas de Glow Dinâmico */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00E5FF]/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#00E5FF]/10 transition-colors duration-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#6366F1]/5 blur-[60px] rounded-full pointer-events-none" />
      
      <div className="relative">
        {/* Anel Orbital Moderno */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 border border-[#00E5FF]/10 rounded-full border-t-[#00E5FF]/40 border-l-[#00E5FF]/40"
        />
        
        <img 
          src="https://i.ibb.co/Sw0JfffL/1.png" 
          alt="AERIS Academy Logo" 
          className="h-20 w-auto drop-shadow-[0_0_25px_rgba(0,229,255,0.3)] group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      
      <div className="mt-6 flex flex-col items-center gap-1">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#00E5FF]/30 to-transparent" />
        <span className="text-[9px] tracking-[0.8em] text-[#00E5FF]/60 font-mono uppercase font-black text-center pl-[0.8em]">
          ACADEMY PORTAL
        </span>
      </div>
    </div>
  );
};

export default AerisLogo;
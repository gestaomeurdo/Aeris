"use client";

import React from 'react';
import { Shield } from 'lucide-react';

const AerisLogo = () => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-500/10 blur-[60px] rounded-full" />
      
      <div className="relative flex items-center gap-3">
        <div className="p-2 border border-amber-500/30 rounded-lg bg-gradient-to-br from-amber-200/10 to-transparent">
          <Shield className="w-8 h-8 text-amber-500 fill-amber-500/20" />
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-500 to-amber-700 font-sans">
            AERIS
          </span>
          <span className="text-[8px] tracking-[0.5em] text-amber-500/60 font-mono uppercase font-bold -mt-1 text-center">
            Academy Portal
          </span>
        </div>
      </div>
    </div>
  );
};

export default AerisLogo;
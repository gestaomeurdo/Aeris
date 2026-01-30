"use client";

import React from 'react';

const AerisLogo = () => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Glow Effect Profundo (Ciano Neon) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#00E5FF]/10 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="relative">
        <img 
          src="https://i.ibb.co/Sw0JfffL/1.png" 
          alt="AERIS Academy Logo" 
          className="h-24 w-auto drop-shadow-[0_0_20px_rgba(0,229,255,0.2)]"
        />
      </div>
      
      <div className="mt-2 text-[10px] tracking-[0.6em] text-[#00E5FF]/40 font-mono uppercase font-bold text-center">
        Academy Portal
      </div>
    </div>
  );
};

export default AerisLogo;
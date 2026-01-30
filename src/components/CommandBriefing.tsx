"use client";

import React from 'react';
import { Play, Activity, Wifi, ShieldAlert, Radio } from 'lucide-react';

const CommandBriefing = () => {
  return (
    <div className="relative w-full aspect-video bg-[#020B1A] rounded-sm p-4 border border-[#B0BEC5]/20 shadow-2xl overflow-hidden group">
      {/* Silver Metallic Frame Effect */}
      <div className="absolute inset-0 border-[1px] border-[#B0BEC5]/10 pointer-events-none z-20 rounded-sm" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-10" />

      {/* Video Content */}
      <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
        <img 
          src="https://i.ibb.co/mrPSkq5v/1.png" 
          alt="Briefing Cover" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-1000 grayscale-[0.3]"
        />
        
        {/* HUD Overlay - Cyber Space Style */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none z-30">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4 bg-[#020B1A]/80 backdrop-blur-md border border-[#00E5FF]/30 px-4 py-2">
              <Activity className="w-4 h-4 text-[#00E5FF]" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-[#00E5FF] font-bold uppercase tracking-widest">CYBER STREAM // 7.0</span>
                <span className="text-[8px] font-mono text-[#B0BEC5] uppercase">Deep Space Uplink Enabled</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-[#020B1A]/60 backdrop-blur-md border border-[#B0BEC5]/20 px-3 py-1.5">
              <Radio className="w-3 h-3 text-red-500 animate-pulse" />
              <span className="text-[9px] font-mono text-[#B0BEC5] font-bold uppercase tracking-widest">Live</span>
            </div>
          </div>

          <div className="flex justify-center items-center gap-12">
            <button className="pointer-events-auto group/btn relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 border border-[#00E5FF]/30 group-hover/btn:border-[#00E5FF] group-hover/btn:rotate-45 transition-all duration-700 rounded-full" />
              <div className="absolute inset-2 border border-[#00E5FF]/10 group-hover/btn:border-[#00E5FF]/40 rounded-full" />
              <div className="w-16 h-16 bg-[#00E5FF]/10 group-hover/btn:bg-[#00E5FF]/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all">
                <Play className="w-8 h-8 text-[#00E5FF] fill-[#00E5FF]/20 group-hover/btn:scale-110 transition-transform" />
              </div>
            </button>
          </div>

          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Wifi className="w-3 h-3 text-[#00E5FF]/60" />
                <span className="text-[10px] font-mono text-[#B0BEC5] font-bold uppercase tracking-widest">Auth: Encrypted Node</span>
              </div>
              <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Mission Briefing Module</h2>
            </div>
            
            <div className="bg-[#00E5FF]/10 border border-[#00E5FF]/30 px-5 py-2 flex items-center gap-3">
              <ShieldAlert className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-[10px] font-mono font-bold text-[#00E5FF] uppercase tracking-[0.3em]">Secured</span>
            </div>
          </div>
        </div>

        {/* Scanlines Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,229,255,0.02)_50%,rgba(0,0,0,0.1)_50%)] z-40 bg-[length:100%_4px]" />
      </div>
    </div>
  );
};

export default CommandBriefing;
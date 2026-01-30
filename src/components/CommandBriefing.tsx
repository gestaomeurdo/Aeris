"use client";

import React from 'react';
import { Play, Activity, Wifi, ShieldAlert, Radio } from 'lucide-react';

const CommandBriefing = () => {
  return (
    <div className="relative w-full aspect-video bg-[#050505] rounded-sm p-4 border border-zinc-800 shadow-2xl overflow-hidden group">
      {/* Brushed Metal Frame Effect */}
      <div className="absolute inset-0 border-[1px] border-white/10 pointer-events-none z-20 rounded-sm" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-10" />

      {/* Video Content */}
      <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
        <img 
          src="https://i.ibb.co/mrPSkq5v/1.png" 
          alt="Briefing Cover" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-1000 grayscale-[0.5] contrast-[1.1]"
        />
        
        {/* HUD Overlay - Cockpit Style */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none z-30">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4 bg-black/60 backdrop-blur-md border border-[#D4AF37]/20 px-4 py-2">
              <Activity className="w-4 h-4 text-[#D4AF37]" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-widest">Live Feed // 04.ALPHA</span>
                <span className="text-[8px] font-mono text-zinc-500 uppercase">Synchronized Tactical Interface</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md border border-zinc-800 px-3 py-1.5">
              <Radio className="w-3 h-3 text-red-500 animate-pulse" />
              <span className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-widest">Rec Recording</span>
            </div>
          </div>

          <div className="flex justify-center items-center gap-12">
            {/* Center Play Interaction */}
            <button className="pointer-events-auto group/btn relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 border border-[#D4AF37]/30 group-hover/btn:border-[#D4AF37] group-hover/btn:rotate-45 transition-all duration-700 rounded-full" />
              <div className="absolute inset-2 border border-[#D4AF37]/10 group-hover/btn:border-[#D4AF37]/40 rounded-full" />
              <div className="w-16 h-16 bg-[#D4AF37]/10 group-hover/btn:bg-[#D4AF37]/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all">
                <Play className="w-8 h-8 text-[#D4AF37] fill-[#D4AF37]/20 group-hover/btn:scale-110 transition-transform" />
              </div>
            </button>
          </div>

          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Wifi className="w-3 h-3 text-[#D4AF37]/60" />
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest">Auth: Commander Verified</span>
              </div>
              <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Strategic Intelligence Briefing</h2>
            </div>
            
            <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-5 py-2 flex items-center gap-3">
              <ShieldAlert className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-[0.3em]">Classified</span>
            </div>
          </div>
        </div>

        {/* Scanlines Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] z-40 bg-[length:100%_2px,3px_100%]" />
      </div>
    </div>
  );
};

export default CommandBriefing;
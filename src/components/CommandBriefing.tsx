"use client";

import React from 'react';
import { Play, Activity, Wifi, ShieldAlert } from 'lucide-react';

const CommandBriefing = () => {
  return (
    <div className="relative w-full aspect-video bg-black border-[12px] border-zinc-900 shadow-[0_0_0_1px_rgba(245,158,11,0.2),0_20px_50px_rgba(0,0,0,0.8)]">
      {/* Metallic Screws / Bezel Detail */}
      <div className="absolute -top-2 -left-2 w-1.5 h-1.5 rounded-full bg-zinc-700 border border-black shadow-inner" />
      <div className="absolute -top-2 -right-2 w-1.5 h-1.5 rounded-full bg-zinc-700 border border-black shadow-inner" />
      <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 rounded-full bg-zinc-700 border border-black shadow-inner" />
      <div className="absolute -bottom-2 -right-2 w-1.5 h-1.5 rounded-full bg-zinc-700 border border-black shadow-inner" />

      {/* Video Content */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale-[0.2] contrast-[1.1]">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />
      </div>

      {/* HUD Elements */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 px-2 py-1 bg-black/60 border border-amber-500/30 backdrop-blur-sm">
              <Activity className="w-3 h-3 text-amber-500" />
              <span className="text-[10px] font-mono text-amber-500 uppercase font-bold tracking-widest">Live Feed // 04.22.84</span>
            </div>
            <div className="text-[8px] font-mono text-zinc-500 pl-1 uppercase">Lat: 38.8977° N | Lon: 77.0365° W</div>
          </div>
          <div className="flex items-center gap-4 bg-black/60 border border-zinc-800 px-3 py-1 backdrop-blur-sm">
            <Wifi className="w-3 h-3 text-green-500" />
            <div className="h-2 w-[1px] bg-zinc-800" />
            <span className="text-[10px] font-mono text-zinc-300 uppercase">Stream: Optimized</span>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="pointer-events-auto group relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 border border-amber-500/20 group-hover:border-amber-500 group-hover:rotate-45 transition-all duration-500" />
            <div className="absolute inset-2 border border-amber-500/10 group-hover:border-amber-500/40" />
            <Play className="w-8 h-8 text-amber-500 fill-amber-500/20 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Active Source</span>
            <h2 className="text-xl font-bold text-white uppercase tracking-tighter">COMMAND BRIEFING</h2>
          </div>
          <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 px-4 py-2">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-[0.3em]">Confidential</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandBriefing;
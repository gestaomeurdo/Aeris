"use client";

import React from 'react';
import { Play, Activity, Wifi, ShieldAlert } from 'lucide-react';

const CommandBriefing = () => {
  return (
    <div className="relative w-full aspect-video bg-black border-[12px] border-zinc-900 shadow-[0_0_0_1px_rgba(180,120,50,0.1),0_20px_50px_rgba(0,0,0,0.9)]">
      {/* Bezel Detailing (Metal Escovado) */}
      <div className="absolute -top-2 -left-2 w-1.5 h-1.5 rounded-full bg-zinc-600 border border-black shadow-inner" />
      <div className="absolute -top-2 -right-2 w-1.5 h-1.5 rounded-full bg-zinc-600 border border-black shadow-inner" />
      <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 rounded-full bg-zinc-600 border border-black shadow-inner" />
      <div className="absolute -bottom-2 -right-2 w-1.5 h-1.5 rounded-full bg-zinc-600 border border-black shadow-inner" />

      {/* Video / Cover Image */}
      <div className="absolute inset-0 bg-[url('https://i.ibb.co/mrPSkq5v/1.png')] bg-cover bg-center grayscale-[0.2] contrast-[1.1]">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px]" />
      </div>

      <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 px-2 py-1 bg-black/80 border border-amber-800/40 backdrop-blur-sm">
              <Activity className="w-3 h-3 text-amber-600" />
              <span className="text-[10px] font-mono text-amber-600 uppercase font-bold tracking-widest">Active Stream // 0xAF4</span>
            </div>
            <div className="text-[8px] font-mono text-zinc-600 pl-1 uppercase font-bold">Secure Tactical Uplink</div>
          </div>
          <div className="flex items-center gap-4 bg-black/80 border border-zinc-800/50 px-3 py-1 backdrop-blur-sm">
            <Wifi className="w-3 h-3 text-amber-700/60" />
            <div className="h-2 w-[1px] bg-zinc-800" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Signal: Encrypted</span>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="pointer-events-auto group relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 border border-amber-800/30 group-hover:border-amber-600 group-hover:rotate-45 transition-all duration-700" />
            <div className="absolute inset-2 border border-amber-900/20 group-hover:border-amber-700/50" />
            <Play className="w-8 h-8 text-amber-600 fill-amber-700/20 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-amber-800 uppercase tracking-[0.3em] font-bold">Intel Source</span>
            <h2 className="text-xl font-bold text-zinc-100 uppercase tracking-tighter">COMMAND BRIEFING</h2>
          </div>
          <div className="flex items-center gap-3 bg-amber-950/20 border border-amber-900/30 px-4 py-2">
            <ShieldAlert className="w-4 h-4 text-amber-700" />
            <span className="text-[10px] font-mono text-amber-700 font-bold uppercase tracking-[0.4em]">Classified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandBriefing;
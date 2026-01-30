"use client";

import React from 'react';
import { Play, ShieldAlert, Volume2, Maximize, Settings } from 'lucide-react';

const VideoBriefing = () => {
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-amber-500/20 bg-black group shadow-[0_0_40px_-15px_rgba(245,158,11,0.3)]">
      {/* Background/Thumbnail */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-md">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[10px] font-mono text-amber-500 uppercase font-bold tracking-widest">Secure Feed // Classified</span>
        </div>
      </div>

      {/* Central Play */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button className="w-24 h-24 flex items-center justify-center rounded-full border-2 border-amber-500/30 bg-amber-500/10 backdrop-blur-xl group-hover:scale-110 transition-transform duration-500">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.6)]">
            <Play className="w-6 h-6 text-black fill-black ml-1" />
          </div>
        </button>
      </div>

      {/* Footer Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-amber-500">04:22 / 12:45</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden relative">
              <div className="absolute top-0 left-0 h-full w-1/3 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <h4 className="text-sm font-bold text-white uppercase tracking-tighter">Commander's Initial Briefing</h4>
            </div>
            <div className="flex items-center gap-4 text-amber-500/60">
              <Volume2 className="w-5 h-5 hover:text-amber-400 cursor-pointer" />
              <Settings className="w-5 h-5 hover:text-amber-400 cursor-pointer" />
              <Maximize className="w-5 h-5 hover:text-amber-400 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBriefing;
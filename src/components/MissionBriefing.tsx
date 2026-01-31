"use client";

import React from 'react';
import { Play, Maximize2, Settings, Info, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const MissionBriefing = () => {
  return (
    <section className="relative space-y-6">
      <div className="flex justify-between items-end px-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-[0.4em]">Live Intelligence Feed</span>
          </div>
          <h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">
            MISSION <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 font-light">BRIEFING</span>
          </h2>
        </div>
        <div className="flex items-center gap-4 bg-white/[0.03] backdrop-blur-xl border border-white/10 px-6 py-3 rounded-xl">
          <Activity className="w-4 h-4 text-[#00E5FF]" />
          <span className="text-[11px] font-mono font-bold text-white/80 uppercase tracking-widest">Signal: Encrypted</span>
        </div>
      </div>

      <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070" 
          alt="Briefing Visual" 
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
        />
        
        {/* Glass Overlay HUD */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        
        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
          <div className="flex justify-between items-start">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex gap-6">
              <div className="space-y-1">
                <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Operation Code</p>
                <p className="text-xs font-mono text-[#00E5FF]">VORTEX-ZERO-9</p>
              </div>
              <div className="w-[1px] h-full bg-white/10" />
              <div className="space-y-1">
                <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Security Clearance</p>
                <p className="text-xs font-mono text-[#00E5FF]">OMEGA</p>
              </div>
            </div>
            
            <button className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-[#00E5FF]/20 hover:border-[#00E5FF]/40 transition-all">
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex justify-center items-center">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative w-24 h-24 bg-[#00E5FF] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,229,255,0.4)] group/play"
            >
              <div className="absolute inset-0 bg-[#00E5FF] rounded-full animate-ping opacity-20" />
              <Play className="w-8 h-8 text-black fill-black ml-1" />
            </motion.button>
          </div>

          <div className="flex justify-between items-end">
            <div className="space-y-2 max-w-lg">
              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 w-fit">
                <Info className="w-3 h-3 text-[#00E5FF]" />
                <span className="text-[9px] font-black text-white/80 uppercase tracking-widest italic">Awaiting Authorization Input</span>
              </div>
              <p className="text-lg text-white font-medium leading-tight">Protocolo de Infiltração em Redes Neurais e Defesa Cibernética de Camada 7.</p>
            </div>
            
            <div className="flex gap-4">
              <button className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                <Maximize2 className="w-5 h-5 text-white/60" />
              </button>
            </div>
          </div>
        </div>

        {/* HUD Scanlines Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      </div>
    </section>
  );
};

export default MissionBriefing;
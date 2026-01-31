"use client";

import React from 'react';
import { Play, Activity, Radio, Maximize2, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const CommandBriefing = () => {
  return (
    <div className="relative w-full aspect-video bg-[#020B1A] rounded-2xl p-1 border border-white/[0.05] shadow-2xl overflow-hidden group">
      <div className="relative w-full h-full overflow-hidden bg-black rounded-xl flex items-center justify-center">
        {/* Camada de Imagem com Zoom Suave */}
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          src="https://i.ibb.co/mrPSkq5v/1.png" 
          alt="Briefing Cover" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-1000 grayscale-[0.2]"
        />
        
        {/* HUD Moderno */}
        <div className="absolute inset-0 p-10 flex flex-col justify-between z-30 pointer-events-none">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-white/80 font-black uppercase tracking-[0.2em]">LIVE UPLINK // 7.0-BETA</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="p-2.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full pointer-events-auto hover:bg-[#00E5FF]/10 hover:border-[#00E5FF]/40 transition-all">
                <Settings className="w-4 h-4 text-white/60" />
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <button className="pointer-events-auto group/btn relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#00E5FF]/20 blur-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 rounded-full" />
              <div className="absolute inset-0 border-2 border-[#00E5FF]/40 group-hover/btn:border-[#00E5FF] transition-all duration-500 rounded-full scale-110 group-hover/btn:scale-100" />
              <div className="w-16 h-16 bg-white/10 group-hover/btn:bg-[#00E5FF] rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300">
                <Play className="w-6 h-6 text-white fill-white group-hover/btn:scale-110 transition-transform" />
              </div>
            </button>
          </div>

          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white tracking-tight uppercase">OPERATIONAL BRIEFING</h2>
              <div className="flex items-center gap-3">
                <Activity className="w-3 h-3 text-[#00E5FF]" />
                <span className="text-[10px] font-mono font-bold text-[#B0BEC5]/60 uppercase tracking-[0.4em]">Ready for synchronization</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full pointer-events-auto hover:bg-white/10 transition-all">
                <Maximize2 className="w-4 h-4 text-white/60" />
              </button>
            </div>
          </div>
        </div>

        {/* Efeito de Vinheta e Scanlines Subtis */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(0,229,255,1)_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px]" />
      </div>
    </div>
  );
};

export default CommandBriefing;
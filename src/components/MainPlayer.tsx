"use client";

import React from 'react';
import { Play, Maximize, Volume2, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const MainPlayer = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full aspect-video rounded-3xl overflow-hidden bg-zinc-900 group shadow-[0_0_50px_-12px_rgba(6,182,212,0.3)]"
    >
      {/* Simulação de Thumbnail / Vídeo */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Play central button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button className="w-20 h-20 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(34,211,238,0.4)]">
          <Play className="text-cyan-400 fill-cyan-400 w-8 h-8 ml-1" />
        </button>
      </div>

      {/* Video Controls bar */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center gap-4 text-white">
          <div className="flex-1 h-1.5 bg-white/20 rounded-full cursor-pointer relative">
            <div className="absolute top-0 left-0 h-full w-[45%] bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          </div>
          <div className="flex items-center gap-4 text-zinc-300">
            <Volume2 className="w-5 h-5 hover:text-cyan-400 cursor-pointer" />
            <Settings className="w-5 h-5 hover:text-cyan-400 cursor-pointer" />
            <Maximize className="w-5 h-5 hover:text-cyan-400 cursor-pointer" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MainPlayer;
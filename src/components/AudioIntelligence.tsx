"use client";

import React from 'react';
import { Headphones, Radio, Play, SkipForward, Mic2 } from 'lucide-react';
import WaveformVisualizer from './WaveformVisualizer';

const AudioIntelligence = () => {
  const audios = [
    { title: "Estratégia de Guerra Assimétrica", host: "Gen. Silva", duration: "12:45", active: true },
    { title: "Criptografia de Campo V3", host: "Com. Costa", duration: "45:20", active: false },
    { title: "Liderança sob Fogo Cruzado", host: "Ten. Almeida", duration: "32:10", active: false },
  ];

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-[2px] w-12 bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]" />
        <h3 className="text-3xl font-black text-white tracking-tighter uppercase">INTELIGÊNCIA EM <span className="font-light">ÁUDIO</span></h3>
        <div className="flex-1 h-[1px] bg-white/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {audios.map((audio, i) => (
          <div 
            key={i}
            className={`relative group bg-[#0A192F]/40 backdrop-blur-xl border ${audio.active ? 'border-[#00E5FF]/40 bg-[#00E5FF]/5' : 'border-white/5'} rounded-2xl p-6 transition-all duration-500 hover:border-[#00E5FF]/30 overflow-hidden`}
          >
            {audio.active && (
              <div className="absolute top-0 right-0 p-4">
                <div className="flex items-center gap-2 px-2 py-1 bg-[#00E5FF]/10 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                  <span className="text-[8px] font-black text-[#00E5FF] uppercase tracking-widest">On Air</span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-[#00E5FF]/40 transition-colors">
                  <Headphones className={`w-8 h-8 ${audio.active ? 'text-[#00E5FF]' : 'text-white/20'}`} />
                  {audio.active && (
                    <div className="absolute -bottom-1 -right-1">
                      <WaveformVisualizer active={true} />
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <h4 className="text-white font-bold leading-tight group-hover:text-[#00E5FF] transition-colors">{audio.title}</h4>
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{audio.host}</p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-black/40 rounded-xl p-3 border border-white/5">
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <Play className={`w-4 h-4 ${audio.active ? 'text-[#00E5FF] fill-[#00E5FF]' : 'text-white/40'}`} />
                  </button>
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <SkipForward className="w-4 h-4 text-white/20" />
                  </button>
                </div>
                <span className="text-[10px] font-mono text-white/20">{audio.duration}</span>
              </div>
            </div>

            {/* Tactical Grid Background Deco */}
            <div className="absolute -bottom-4 -right-4 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
              <Radio className="w-24 h-24 text-white" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AudioIntelligence;
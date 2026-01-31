"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Globe, Shield, Activity, Radio, FileText, Cpu, Zap, Headphones, ChevronRight, Share2, MessageSquare, Lock } from 'lucide-react';

const FutureVisionPortal = () => {
  const newsFeed = [
    "NEW DOCTRINE: Adaptive Neural Learning v2.4 authorized.",
    "INTEL: Pacific Fleet synchronization complete.",
    "ALERT: Cyber-threat level downgraded to Blue.",
    "UPDATE: Lunar base communication established."
  ];

  const futureModules = [
    "Advanced Flight Tactics", "Neural Leadership", "Global Logistics", "Cyber Defense v4", 
    "Satellite Uplink Mgmt", "AI Command Integration", "Quantum Cryptography", "Orbital Mechanics",
    "Bio-Digital Ethics", "Stealth Fleet Ops", "Rapid Deployment X", "Geopolitical Strategy",
    "Swarm Intelligence", "Psychological Operations", "Nuclear Deterrence Protocols", "Space Domain Awareness",
    "Extreme Env. Survival", "Urban Warfare Sim", "Electronic Countermeasures", "Human-Agent Teaming"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-[80vh] rounded-[40px] border border-white/5 bg-[#010816] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,229,255,0.1)]"
    >
      {/* Header de Status Simplificado */}
      <div className="p-6 border-b border-[#00E5FF]/20 flex justify-between items-center bg-black/40">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-[#00E5FF] tracking-[0.4em] animate-pulse font-black">GLOBAL OPERATIONAL READINESS // PHASE 4 ACTIVE</span>
        </div>
        <div className="flex items-center gap-4">
           <Activity className="w-4 h-4 text-[#00E5FF]" />
           <span className="text-[10px] font-black text-white/80 uppercase tracking-widest italic">Global Proficiency Level: 94.8%</span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Lado Esquerdo: Feed de Dados (Adaptado do código do usuário) */}
        <div className="w-80 border-r border-white/5 p-8 space-y-8 bg-black/20 hidden lg:block">
          <div className="space-y-2">
            <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Live Intelligence Feed</h4>
            <div className="space-y-4 pt-4">
              {newsFeed.map((news, i) => (
                <div key={i} className="text-[9px] font-mono text-[#00E5FF]/80 leading-tight border-l border-[#00E5FF]/30 pl-3">
                  [SEC_ALERT] {news} <br/>
                  <span className="text-white/20">TIMESTAMP: 2026.01.31 // 11:37:00</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-auto space-y-4 pt-8">
             <div className="p-6 bg-[#00E5FF]/5 border border-[#00E5FF]/10 rounded-3xl space-y-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-[#00E5FF]" />
                  <span className="text-[10px] font-mono font-black text-white uppercase tracking-widest">Neural Link Sync</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     animate={{ width: ['0%', '82%', '78%', '85%'] }}
                     transition={{ duration: 5, repeat: Infinity }}
                     className="h-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]"
                   />
                </div>
             </div>
          </div>
        </div>

        {/* Centro: Mapa e Título (Adaptado do código do usuário) */}
        <div className="flex-1 relative flex flex-col items-center justify-center p-12 text-center bg-grid-pattern">
           <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
              <Globe size={600} className="text-[#00E5FF]/30 animate-spin-slow" />
           </div>
           
           <div className="relative z-10 space-y-6">
              <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none">
                WELCOME TO THE <span className="text-[#00E5FF] not-italic">FUTURE.</span> <br/>
                <span className="text-2xl font-light tracking-[0.3em] block mt-4 text-white/60">WE CAN LEARN LIKE THIS WITH AERIS.</span>
              </h1>
              
              <div className="grid grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto opacity-60">
                {futureModules.slice(0, 8).map((title, i) => (
                  <div key={i} className="aspect-video bg-black/50 border border-white/5 rounded-lg flex flex-col items-center justify-center p-4">
                    <Lock size={16} className="text-[#00E5FF]/20 mb-2" />
                    <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest text-center">{title}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
      
      {/* Barra Inferior de Status (Adaptada do código do usuário) */}
      <div className="h-16 bg-black/80 border-t border-[#00E5FF]/10 flex items-center justify-between px-10">
         <div className="flex items-center gap-6">
            <Activity size={20} className="text-[#00E5FF]" />
            <span className="text-[10px] font-black text-white/80 uppercase tracking-widest italic">Global Proficiency Level: 94.8%</span>
         </div>
         <div className="flex gap-4 items-center">
            <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: '0%' }}
                animate={{ width: '75%' }}
                transition={{ duration: 1.5 }}
                className="h-full bg-[#00E5FF]"
              />
            </div>
            <Cpu size={20} className="text-[#00E5FF]" />
         </div>
      </div>
    </motion.div>
  );
};

export default FutureVisionPortal;
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Globe, Shield, Activity, Radio, FileText, Cpu, Zap, Headphones, ChevronRight, Share2, MessageSquare } from 'lucide-react';
import WaveformVisualizer from './WaveformVisualizer';

const FutureVisionPortal = () => {
  const [bootSequence, setBootSequence] = useState(true);
  const [text, setText] = useState("");
  const fullText = "WELCOME TO THE FUTURE. WE CAN LEARN LIKE THIS WITH AERIS.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setTimeout(() => setBootSequence(false), 1500);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  if (bootSequence) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center font-mono">
        <div className="flex flex-col items-center gap-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#00FF41] text-lg md:text-2xl font-black tracking-[0.2em] text-center"
          >
            {text}<span className="animate-pulse">_</span>
          </motion.div>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 300 }}
            transition={{ duration: 2 }}
            className="h-[1px] bg-[#00FF41]/20 relative overflow-hidden"
          >
            <motion.div 
              animate={{ x: [-300, 300] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 w-20 bg-[#00FF41]/60 blur-md"
            />
          </motion.div>
        </div>
      </div>
    );
  }

  const futureModules = [
    "Advanced Flight Tactics", "Neural Leadership", "Global Logistics", "Cyber Defense v4", 
    "Satellite Uplink Mgmt", "AI Command Integration", "Quantum Cryptography", "Orbital Mechanics",
    "Bio-Digital Ethics", "Stealth Fleet Ops", "Rapid Deployment X", "Geopolitical Strategy",
    "Swarm Intelligence", "Psychological Operations", "Nuclear Deterrence Protocols", "Space Domain Awareness",
    "Extreme Env. Survival", "Urban Warfare Sim", "Electronic Countermeasures", "Human-Agent Teaming"
  ];

  const newsFeed = [
    "NEW DOCTRINE: Adaptive Neural Learning v2.4 authorized.",
    "INTEL: Pacific Fleet synchronization complete.",
    "ALERT: Cyber-threat level downgraded to Blue.",
    "UPDATE: Lunar base communication established."
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative min-h-[90vh] rounded-[40px] border border-white/5 bg-[#010816] overflow-hidden flex flex-col"
    >
      {/* Background Mapa Mundi Radar */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <svg viewBox="0 0 1000 500" className="w-full h-full text-[#00E5FF] fill-current stroke-current opacity-40">
           {/* Simplificação de mapa com círculos de radar */}
           <circle cx="500" cy="250" r="100" fill="none" strokeWidth="1" className="animate-ping" />
           <circle cx="500" cy="250" r="200" fill="none" strokeWidth="0.5" />
           <circle cx="500" cy="250" r="300" fill="none" strokeWidth="0.5" />
           <line x1="0" y1="250" x2="1000" y2="250" strokeWidth="0.5" />
           <line x1="500" y1="0" x2="500" y2="500" strokeWidth="0.5" />
           {/* Pontos de sinal */}
           <circle cx="200" cy="150" r="3" className="animate-pulse" />
           <circle cx="800" cy="350" r="3" className="animate-pulse" />
           <circle cx="450" cy="400" r="3" className="animate-pulse" />
        </svg>
      </div>

      {/* Header HUD Superior */}
      <div className="relative z-10 px-10 py-6 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-[#00E5FF] uppercase tracking-[0.4em] font-black">PLATFORM STATUS</span>
            <span className="text-xs font-mono text-white/80">GLOBAL_READY_LEVEL_01</span>
          </div>
          <div className="h-8 w-[1px] bg-white/10" />
          <div className="flex items-center gap-4">
             <div className="flex flex-col">
                <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Active Learners</span>
                <span className="text-xs font-mono font-black text-white">42,891</span>
             </div>
             <Activity className="w-4 h-4 text-[#00E5FF] animate-pulse" />
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-4 py-2 bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-full">
              <span className="text-[9px] font-mono text-[#00E5FF] font-black uppercase tracking-widest">FULL PLATFORM PREVIEW</span>
           </div>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex overflow-hidden">
        {/* Sidebar de Recursos Técnica */}
        <aside className="w-80 border-r border-white/5 bg-black/20 p-8 flex flex-col gap-8">
           <div className="space-y-4">
              <h4 className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.4em]">Resource Repository</h4>
              <div className="space-y-2">
                 {['Tactical Manual v7', 'Command Directives', 'Uplink Protocols', 'Fleet Logistics', 'Neural Handbook'].map(doc => (
                   <div key={doc} className="group flex items-center justify-between p-4 bg-white/[0.02] hover:bg-[#00E5FF]/5 border border-white/5 rounded-2xl transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-[#00E5FF]/40 group-hover:text-[#00E5FF]" />
                        <span className="text-xs font-bold text-white/60 group-hover:text-white uppercase tracking-tighter">{doc}</span>
                      </div>
                      <ChevronRight className="w-3 h-3 text-white/10" />
                   </div>
                 ))}
              </div>
           </div>

           <div className="mt-auto space-y-4">
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
        </aside>

        {/* Grid Principal de Módulos Futuros */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-10">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {futureModules.map((title, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative aspect-square bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-[#00E5FF]/40 transition-all cursor-pointer overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  
                  <div className="space-y-2">
                    <span className="text-[8px] font-mono text-white/20 uppercase">MOD-{100 + i}</span>
                    <h5 className="text-[11px] font-black text-white/80 group-hover:text-white uppercase leading-tight tracking-tighter">{title}</h5>
                  </div>

                  <div className="flex items-center justify-between">
                    <Cpu className="w-4 h-4 text-white/10 group-hover:text-[#00E5FF]/40" />
                    <div className="h-4 w-4 rounded-full border border-white/10 flex items-center justify-center">
                       <div className="w-1.5 h-1.5 bg-white/10 rounded-full group-hover:bg-[#00E5FF] transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </main>

        {/* Feed de Inteligência e Radar Lateral */}
        <aside className="w-72 border-l border-white/5 bg-black/40 p-8 space-y-10">
           <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <Radio className="w-3 h-3 text-red-500 animate-pulse" />
                 <h4 className="text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.3em]">Live Intelligence Feed</h4>
              </div>
              <div className="space-y-6">
                 {newsFeed.map((news, i) => (
                   <div key={i} className="space-y-2 border-l border-[#00E5FF]/20 pl-4 py-1">
                      <p className="text-[10px] text-white/60 leading-relaxed font-medium uppercase tracking-tighter">{news}</p>
                      <span className="text-[8px] font-mono text-white/10 uppercase">T+ 0{i}:24:00</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="aspect-square bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center relative overflow-hidden group">
              <Globe className="w-20 h-20 text-[#00E5FF]/10 group-hover:text-[#00E5FF]/20 transition-colors" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-[#00E5FF]/5 rounded-full m-8 border-t-[#00E5FF]/40"
              />
              <span className="absolute bottom-4 text-[7px] font-mono text-white/20 uppercase tracking-widest">Global Uplink: ACTIVE</span>
           </div>
        </aside>
      </div>

      {/* Barra Inferior: Player de Áudio Persistente */}
      <footer className="relative z-20 h-20 bg-black/80 backdrop-blur-xl border-t border-[#00E5FF]/10 flex items-center px-10 gap-10">
         <div className="flex items-center gap-4 w-80">
            <div className="w-12 h-12 bg-[#00E5FF]/10 rounded-xl flex items-center justify-center">
               <Headphones className="w-6 h-6 text-[#00E5FF]" />
            </div>
            <div className="flex flex-col">
               <span className="text-[10px] font-black text-white uppercase tracking-tighter">Strategic Podcast Feed</span>
               <span className="text-[9px] font-mono text-[#00E5FF] uppercase">Episode 84: The Future of Warfare</span>
            </div>
         </div>

         <div className="flex-1 flex items-center gap-8 px-10">
            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden relative">
               <motion.div 
                 animate={{ x: ['-100%', '0%'] }}
                 transition={{ duration: 240, repeat: Infinity }}
                 className="absolute inset-0 bg-[#00E5FF]/40"
               />
            </div>
            <WaveformVisualizer active={true} />
         </div>

         <div className="flex items-center gap-6">
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all">
               <Share2 className="w-4 h-4 text-white/60" />
            </button>
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all">
               <MessageSquare className="w-4 h-4 text-white/60" />
            </button>
         </div>
      </footer>
    </motion.div>
  );
};

export default FutureVisionPortal;
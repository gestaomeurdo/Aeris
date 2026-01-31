"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Globe, Shield, Activity, Radio, FileText, Cpu, Zap, Headphones, ChevronRight, Share2, MessageSquare, Lock, Play } from 'lucide-react';

const FutureVisionPortal = () => {
  const newsFeed = [
    "NEW DOCTRINE: Adaptive Neural Learning v2.4 authorized.",
    "INTEL: Pacific Fleet synchronization complete.",
    "ALERT: Cyber-threat level downgraded to Blue.",
    "UPDATE: Lunar base communication established."
  ];

  const futureModules = [
    { title: "Advanced Flight Tactics", status: "LOCKED", icon: Zap, color: "text-red-500" },
    { title: "Neural Leadership", status: "BETA", icon: Cpu, color: "text-yellow-500" },
    { title: "Global Logistics", status: "LOCKED", icon: Globe, color: "text-red-500" },
    { title: "Cyber Defense v4", status: "ACTIVE", icon: Shield, color: "text-[#00E5FF]" },
    { title: "Satellite Uplink Mgmt", status: "LOCKED", icon: Radio, color: "text-red-500" },
    { title: "AI Command Integration", status: "BETA", icon: Terminal, color: "text-yellow-500" },
    { title: "Quantum Cryptography", status: "LOCKED", icon: Lock, color: "text-red-500" },
    { title: "Orbital Mechanics", status: "ACTIVE", icon: Activity, color: "text-[#00E5FF]" },
  ];

  const featuredModule = {
    title: "NEURAL LEADERSHIP: AI Command Integration",
    description: "Integrating advanced AI models into strategic decision-making processes for optimized command efficiency and reduced human error in high-stress environments. Access requires Level 5 clearance.",
    status: "BETA ACCESS",
    image: "https://i.ibb.co/mrPSkq5v/1.png" // Reusing the briefing image for a high-tech look
  };

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

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Lado Esquerdo: Feed de Dados (Sidebar) */}
        <div className="w-full lg:w-80 border-r border-white/5 p-8 space-y-8 bg-black/20 flex-shrink-0">
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

        {/* Centro: Conteúdo Principal (Featured + Gallery) */}
        <div className="flex-1 p-12 space-y-12 overflow-y-auto custom-scrollbar">
          
          {/* Featured Module (Estilo Netflix Banner) */}
          <div className="relative w-full aspect-[16/6] rounded-3xl overflow-hidden shadow-2xl group">
            <img 
              src={featuredModule.image} 
              alt="Featured Module" 
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700 grayscale-[0.5]"
            />
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent p-12 flex flex-col justify-center space-y-6">
              <span className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-[0.4em]">{featuredModule.status}</span>
              <h2 className="text-5xl font-black text-white uppercase tracking-tighter max-w-xl leading-tight">
                {featuredModule.title}
              </h2>
              <p className="text-white/70 max-w-lg text-sm">{featuredModule.description}</p>
              
              <div className="flex gap-4 pt-4">
                <button className="flex items-center gap-3 px-8 py-4 bg-[#00E5FF] text-black font-black uppercase text-xs rounded-xl hover:scale-[1.05] transition-transform shadow-[0_0_30px_rgba(0,229,255,0.4)]">
                  <Play className="w-4 h-4 fill-black" />
                  Access Preview
                </button>
                <button className="flex items-center gap-3 px-8 py-4 bg-white/10 text-white font-black uppercase text-xs rounded-xl hover:bg-white/20 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share Link
                </button>
              </div>
            </div>
          </div>

          {/* Future Modules Gallery */}
          <div className="space-y-6 pt-8">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
              UPCOMING <span className="font-light text-white/40">ASSETS</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {futureModules.map((mod, i) => {
                const Icon = mod.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="relative aspect-[4/3] bg-black/40 border border-white/5 rounded-2xl p-5 flex flex-col justify-between group hover:border-[#00E5FF]/30 transition-all overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                    
                    <div className="flex justify-between items-start relative z-10">
                      <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${mod.color}/20`}>
                        <Icon className={`w-5 h-5 ${mod.color}`} />
                      </div>
                      <span className={`text-[8px] font-mono font-black uppercase tracking-widest px-2 py-1 rounded-full ${mod.status === 'ACTIVE' ? 'bg-[#00E5FF]/10 text-[#00E5FF]' : mod.status === 'BETA' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
                        {mod.status}
                      </span>
                    </div>
                    
                    <div className="relative z-10 space-y-1">
                      <h4 className="text-sm font-bold text-white uppercase leading-tight">{mod.title}</h4>
                      <div className="flex items-center gap-2 text-[9px] font-mono text-white/40">
                        <Lock className="w-3 h-3" />
                        <span>Access Tier 5</span>
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <button className="px-4 py-2 bg-[#00E5FF] text-black text-[10px] font-black uppercase rounded-lg">
                          View Details
                       </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Barra Inferior de Status */}
      <div className="h-16 bg-black/80 border-t border-[#00E5FF]/10 flex items-center justify-between px-10 flex-shrink-0">
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
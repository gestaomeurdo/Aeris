"use client";

import React from 'react';
import { Play, Headset, FileText, Lock, Shield, Radio, Globe, Zap, Activity, Cpu, Terminal, ChevronRight, Info } from 'lucide-react';

interface FutureVisionPortalProps {
  onExit: () => void;
}

const FutureVisionPortal = ({ onExit }: FutureVisionPortalProps) => {
  const LOGO_URL = "https://i.ibb.co/BKdX0Nzn/1.png"; //

  // Ativos Futuros baseados nas suas imagens
  const upcomingAssets = [
    { title: "ADVANCED FLIGHT TACTICS", status: "LOCKED", type: "TACTICAL" },
    { title: "NEURAL LEADERSHIP", status: "BETA", type: "STRATEGY" },
    { title: "GLOBAL LOGISTICS", status: "LOCKED", type: "OPS" },
    { title: "CYBER DEFENSE V4", status: "ACTIVE", type: "SECURITY" },
    { title: "SATELLITE UPLINK MGMT", status: "LOCKED", type: "COMM" },
    { title: "AI COMMAND INTEGRATION", status: "BETA", type: "INTELLIGENCE" },
    { title: "QUANTUM CRYPTOGRAPHY", status: "LOCKED", type: "SECURITY" },
    { title: "ORBITAL MECHANICS", status: "ACTIVE", type: "SPACE" }
  ]; //

  return (
    <div className="h-screen bg-[#020202] text-white flex flex-col overflow-hidden font-mono animate-in fade-in duration-1000">
      
      {/* HEADER TÁTICO - */}
      <header className="h-16 border-b border-cyan-500/20 bg-black/80 backdrop-blur-md flex items-center justify-between px-8 z-50">
        <div className="flex items-center gap-4">
          <img src={LOGO_URL} className="h-8 w-8 object-contain" alt="Aeris Logo" />
          <div className="h-4 w-[1px] bg-cyan-900 mx-2"></div>
          <span className="text-[9px] tracking-[0.5em] text-cyan-500 animate-pulse uppercase">
            GLOBAL OPERATIONAL READINESS // PHASE 4 ACTIVE
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[9px] text-cyan-700 uppercase font-black tracking-widest flex items-center gap-2">
            <Activity size={12} /> GLOBAL PROFICIENCY LEVEL: 94.8%
          </span>
          <button 
            onClick={onExit}
            className="text-[9px] border border-cyan-500/30 px-6 py-2 rounded-full hover:bg-cyan-500/10 text-cyan-400 font-black transition-all"
          >
            EXIT SIMULATION
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Background Grid Pattern - */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

        {/* SIDEBAR: LIVE INTELLIGENCE FEED - */}
        <aside className="w-80 border-r border-white/5 p-6 space-y-8 bg-black/40 relative z-10 overflow-y-auto custom-scrollbar">
          <div className="space-y-6">
            <h5 className="text-[10px] text-cyan-500 font-black tracking-widest uppercase flex items-center gap-2 italic">
              <Terminal size={14} /> Live Intelligence Feed
            </h5>
            <div className="space-y-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="text-[9px] border-l border-cyan-900/50 pl-4 py-1 space-y-1">
                  <p className="text-cyan-400/80 leading-relaxed uppercase">
                    [SEC_ALERT] {i === 1 ? 'Adaptive Neural Learning V2.4 Authorized.' : i === 2 ? 'Satellite Uplink Synchronization complete.' : 'Cyber-Threat Level downgraded to Blue.'}
                  </p>
                  <span className="text-zinc-700 font-mono tracking-tighter">TIMESTAMP: 2026.01.31 // 11:52:00</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                <Radio size={16} className="animate-pulse" />
              </div>
              <span className="text-[10px] font-black text-cyan-500 uppercase">Neural Link Sync</span>
            </div>
            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500 w-[78%]"></div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-10 overflow-y-auto relative z-10 custom-scrollbar space-y-12">
          
          {/* FEATURED MODULE: NEURAL LEADERSHIP - */}
          <section className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black border border-cyan-500/20 p-12 min-h-[400px] flex items-center">
            <div className="max-w-xl space-y-6 relative z-10">
              <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-tight">
                NEURAL LEADERSHIP: <br/> 
                <span className="text-cyan-500 not-italic">AI COMMAND INTEGRATION</span>
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed font-light">
                Integrating advanced AI models into strategic decision-making processes for optimized command efficiency and reduced human error in high-stress environments. Access requires Level 5 clearance.
              </p>
              <div className="flex gap-4 pt-4">
                <button className="bg-cyan-600 text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-cyan-500 transition-all">
                  Access Briefing
                </button>
                <div className="h-10 w-[1px] bg-white/10 mx-2"></div>
                <div className="flex flex-col justify-center">
                  <span className="text-[8px] text-zinc-500 uppercase">Encryption</span>
                  <span className="text-[10px] text-cyan-400 font-bold">AES-256 BIT</span>
                </div>
              </div>
            </div>
            {/* Imagem de Fundo Estilizada - */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 opacity-20 group-hover:opacity-40 transition-opacity">
              <Zap size={300} className="text-cyan-500 rotate-12" />
            </div>
          </section>

          {/* UPCOMING ASSETS GRID - */}
          <section className="space-y-6">
            <h4 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] border-l-2 border-cyan-500 pl-4">Upcoming Assets</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {upcomingAssets.map((asset, i) => (
                <div key={i} className="bg-zinc-900/30 border border-white/5 p-6 rounded-2xl hover:border-cyan-500/40 transition-all cursor-not-allowed group relative overflow-hidden">
                   <div className="flex justify-between items-start mb-6">
                     <div className={`p-2 rounded-lg border ${asset.status === 'ACTIVE' ? 'bg-cyan-500/10 border-cyan-500/20' : 'bg-zinc-800 border-white/5 opacity-50'}`}>
                        {i % 2 === 0 ? <Shield size={16} /> : <Cpu size={16} />}
                     </div>
                     <span className={`text-[8px] font-black px-2 py-0.5 rounded ${asset.status === 'ACTIVE' ? 'bg-cyan-600 text-black' : 'bg-red-900/20 text-red-500'}`}>
                       {asset.status}
                     </span>
                   </div>
                   <h5 className="text-[11px] font-black uppercase italic tracking-tighter leading-tight mb-2 group-hover:text-cyan-400 transition-colors">
                     {asset.title}
                   </h5>
                   <div className="text-[8px] text-zinc-600 font-mono tracking-widest">ACCESS LEVEL: 0{i+1}</div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <style>{`
        .bg-grid-pattern { 
          background-image: radial-gradient(#0891b2 1px, transparent 1px); 
          background-size: 50px 50px; 
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #083344; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default FutureVisionPortal;
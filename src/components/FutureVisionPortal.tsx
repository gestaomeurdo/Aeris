"use client";

import React, { useState, useEffect } from 'react';
import { Play, Headset, FileText, Lock, Shield, Radio, Globe, Zap, Search, Info, ChevronRight, Star, Activity, Terminal } from 'lucide-react';

interface FutureVisionPortalProps {
  onExit: () => void;
}

const FutureVisionPortal = ({ onExit }: FutureVisionPortalProps) => {
  const [stage, setStage] = useState('message'); // 'message' -> 'portal'
  const LOGO_URL = "https://i.ibb.co/BKdX0Nzn/1.png"; //

  // Efeito de transição automática da mensagem para o portal
  useEffect(() => {
    const timer = setTimeout(() => setStage('portal'), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Biblioteca Massiva do Futuro (Exemplos de como a plataforma ficará cheia)
  const futureLibrary = [
    {
      category: "Tactical Video Intelligence",
      items: [
        { title: "Mastering Air Force Leadership", img: "https://images.unsplash.com/photo-1579962336211-1335017a55a1?auto=format&fit=crop&w=800&q=80", type: "Video" }, //
        { title: "Modernizing Military Learning", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80", type: "Documentary" }, //
        { title: "Neural Command Integration", img: "https://images.unsplash.com/photo-1517976384346-3136801d605d?auto=format&fit=crop&w=800&q=80", type: "AI Briefing" },
        { title: "Advanced Flight Tactics", img: "https://images.unsplash.com/photo-1506917728037-b6af01ad7d42?auto=format&fit=crop&w=800&q=80", type: "Simulation" },
        { title: "Orbital Defense Protocols", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80", type: "Classified" },
        { title: "Cyber Warfare V5", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", type: "Defense" }
      ]
    },
    {
      category: "Strategic Audio Intelligence (Podcast/Audiobook)",
      items: [
        { title: "The Air Force SNCOs - Leaders of Leaders", img: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=800&q=80", type: "Audiobook" }, //
        { title: "Enlisted Ranks & Structure", img: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80", type: "Podcast" }, //
        { title: "Psychological Operations", img: "https://images.unsplash.com/photo-1590498670872-359146522c71?auto=format&fit=crop&w=800&q=80", type: "Audio Intel" },
        { title: "Global Command Theory", img: "https://images.unsplash.com/photo-1517976384346-3136801d605d?auto=format&fit=crop&w=800&q=80", type: "Lectures" },
        { title: "Stealth Logistics", img: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=800&q=80", type: "Audiobook" }
      ]
    },
    {
      category: "Digital Doctrine (Interactive Documents)",
      items: [
        { title: "Unlocking Junior Enlisted Tier", img: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80", type: "Interactive PDF" }, //
        { title: "Satellite Uplink Protocols", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80", type: "Manual" },
        { title: "Rapid Deployment Guide", img: "https://images.unsplash.com/photo-1579962336211-1335017a55a1?auto=format&fit=crop&w=800&q=80", type: "Doctrine" }
      ]
    }
  ];

  // --- ESTÁGIO 1: A MENSAGEM DE IMPACTO ---
  if (stage === 'message') {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center p-12 text-center space-y-12 animate-in fade-in duration-1000">
        <img src={LOGO_URL} className="w-24 h-24 animate-pulse object-contain" alt="Logo" />
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-widest leading-none uppercase italic">
          WELCOME TO THE FUTURE. <br/>
          <span className="text-cyan-500 not-italic block mt-4">WE CAN LEARN LIKE THIS WITH AERIS.</span>
        </h1>
        <div className="w-64 h-1 bg-zinc-900 rounded-full overflow-hidden relative">
          <div className="absolute inset-0 bg-cyan-500 animate-[progress_4s_ease-in-out]"></div>
        </div>
        <style>{`
          @keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }
        `}</style>
      </div>
    );
  }

  // --- ESTÁGIO 2: O PORTAL COMPLETO (NETFLIX STYLE) ---
  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans overflow-x-hidden animate-in fade-in duration-1000">
      
      {/* NAVBAR FUTURISTA */}
      <nav className="fixed top-0 w-full h-20 px-12 flex items-center justify-between bg-black/80 backdrop-blur-xl z-[100] border-b border-cyan-500/10">
        <div className="flex items-center gap-4">
          <img src={LOGO_URL} className="h-10 w-10 object-contain" alt="Logo" />
          <h1 className="text-xl font-black tracking-tighter uppercase italic">Aeris - <span className="text-cyan-500 not-italic">Academy</span></h1>
        </div>
        <div className="flex items-center gap-8 font-mono text-[9px] text-cyan-500 animate-pulse tracking-widest">
           <span>SEC_LEVEL: UNRESTRICTED</span>
           <button onClick={onExit} className="px-6 py-2 border border-cyan-500/30 rounded-full text-white font-black uppercase hover:bg-cyan-500/10 transition-all">Exit Vision</button>
        </div>
      </nav>

      <div className="pt-32 space-y-20 pb-24">
        {futureLibrary.map((cat, i) => (
          <section key={i} className="px-12 space-y-6">
            <div className="flex items-center gap-4 border-l-4 border-cyan-500 pl-4">
              <h3 className="text-2xl font-black italic tracking-tighter uppercase">{cat.category}</h3>
              <ChevronRight className="text-cyan-500" size={24} />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {cat.items.map((item, idx) => (
                <div key={idx} className="group relative aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-white/5 transition-all duration-500 hover:scale-110 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:z-50 hover:border-cyan-500/50">
                  <img src={item.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity" alt={item.title} />
                  
                  {/* Overlay ao passar o mouse */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                    <div className="flex items-center gap-2 mb-2">
                       <Play fill="cyan" size={14} className="text-cyan-400" />
                       <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest">{item.type}</span>
                    </div>
                    <h4 className="text-[11px] font-black uppercase italic leading-tight mb-2 tracking-tighter">{item.title}</h4>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, s) => <Star key={s} size={8} fill="cyan" className="text-cyan-500" />)}
                    </div>
                  </div>

                  {/* Detalhe visual de HUD */}
                  <div className="absolute top-2 right-2 text-[8px] font-mono text-cyan-900 opacity-0 group-hover:opacity-100 transition-opacity">
                    CORE_ASSET_SYNC
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* FOOTER DE COMANDO */}
      <footer className="px-12 py-8 bg-zinc-950/50 border-t border-cyan-500/10 flex justify-between items-center">
         <div className="flex items-center gap-6">
            <Activity className="text-cyan-500" size={20} />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Global Intelligence Network Active // Aeris Academy 2026</span>
         </div>
         <div className="flex items-center gap-4">
            <Terminal className="text-zinc-700" size={16} />
            <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest">V. 4.0.1 BETA</span>
         </div>
      </footer>
    </div>
  );
};

export default FutureVisionPortal;
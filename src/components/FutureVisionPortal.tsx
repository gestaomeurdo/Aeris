"use client";

import React, { useState, useEffect } from 'react';
import { Play, Headset, FileText, ChevronRight, Star, Activity, Shield, Globe, Zap, Terminal, Scan } from 'lucide-react';

interface FutureVisionPortalProps {
  onExit: () => void;
}

const FutureVisionPortal = ({ onExit }: FutureVisionPortalProps) => {
  const [stage, setStage] = useState('message');
  const LOGO_URL = "https://i.ibb.co/BKdX0Nzn/1.png";

  useEffect(() => {
    const timer = setTimeout(() => setStage('portal'), 3500);
    return () => clearTimeout(timer);
  }, []);

  // Dados da Biblioteca (Mantidos da versão anterior)
  const futureLibrary = [
    {
      category: "Tactical Video Intelligence // Classified Streams",
      items: [
        { title: "Mastering Air Force Leadership", img: "https://images.unsplash.com/photo-1579962336211-1335017a55a1?auto=format&fit=crop&w=800&q=80", type: "Video Protocol", status: "LIVE" },
        { title: "Modernizing Military Learning", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80", type: "Documentary", status: "ARCHIVED" },
        { title: "Neural Command Integration", img: "https://images.unsplash.com/photo-1517976384346-3136801d605d?auto=format&fit=crop&w=800&q=80", type: "AI Briefing", status: "BETA" },
        { title: "Advanced Flight Tactics", img: "https://images.unsplash.com/photo-1506917728037-b6af01ad7d42?auto=format&fit=crop&w=800&q=80", type: "Sim Data", status: "RESTRICTED" },
        { title: "Orbital Defense Protocols", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80", type: "Space Cmd", status: "TOP SECRET" },
        { title: "Cyber Warfare V5", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", type: "Defense Net", status: "ACTIVE" }
      ]
    },
    {
      category: "Strategic Audio Intel // Secure Comms",
      items: [
        { title: "The Air Force SNCOs - Leaders", img: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=800&q=80", type: "Audiobook", status: "SYNCED" },
        { title: "Enlisted Ranks & Structure", img: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80", type: "Podcast Feed", status: "LIVE" },
        { title: "Psychological Operations", img: "https://images.unsplash.com/photo-1590498670872-359146522c71?auto=format&fit=crop&w=800&q=80", type: "Audio Intel", status: "DECRYPTED" },
        { title: "Global Command Theory", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80", type: "Lectures", status: "ARCHIVED" }
      ]
    },
    {
      category: "Digital Doctrine // Interactive Schematics",
      items: [
        { title: "Unlocking Junior Tier", img: "https://images.unsplash.com/photo-1603827457577-609e6f42a45e?auto=format&fit=crop&w=800&q=80", type: "Interactive PDF", status: "READY" },
        { title: "Satellite Uplink Protocols", img: "https://images.unsplash.com/photo-1451186859696-371d9477be93?auto=format&fit=crop&w=800&q=80", type: "Tech Manual", status: "UPDATED" },
        { title: "Rapid Deployment Guide", img: "https://images.unsplash.com/photo-1522037576655-7a93239642d9?auto=format&fit=crop&w=800&q=80", type: "Field Doctrine", status: "READY" }
      ]
    }
  ];

  // --- ESTÁGIO 1: MENSAGEM DE IMPACTO (Mais Agressiva) ---
  if (stage === 'message') {
    return (
      <div className="h-screen bg-[#020202] flex flex-col items-center justify-center p-12 text-center overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 animate-pulse-slow pointer-events-none"></div>
        <div className="relative z-10 space-y-12 flex flex-col items-center">
          <div className="relative">
            <img src={LOGO_URL} className="w-32 h-32 animate-spin-slow object-contain relative z-10" alt="Logo" />
            <div className="absolute inset-0 bg-cyan-500 blur-[100px] opacity-30 animate-pulse"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase italic glitch-text" data-text="WELCOME TO THE FUTURE.">
            WELCOME TO THE FUTURE. <br/>
            <span className="text-cyan-500 not-italic block mt-4 text-3xl tracking-[0.5em]">AERIS TACTICAL LEARNING OS</span>
          </h1>
          <div className="w-96 h-2 bg-zinc-900/50 rounded-full overflow-hidden relative border border-cyan-900/30">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-600 animate-[progress_3.5s_ease-in-out] shadow-[0_0_20px_#06b6d4]"></div>
          </div>
          <p className="text-cyan-700 font-mono text-xs uppercase tracking-widest animate-pulse">Initializing Neural Link...</p>
        </div>
        <style>{`
          @keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
          .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
          .animate-spin-slow { animation: spin 12s linear infinite; }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  // --- ESTÁGIO 2: O PORTAL HOLOGRÁFICO "BADASS" ---
  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans overflow-x-hidden animate-in fade-in duration-1000 bg-tactical-depth">
      
      {/* Efeitos de Fundo */}
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="fixed inset-0 bg-scanlines opacity-5 pointer-events-none"></div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full h-24 px-12 flex items-center justify-between bg-black/40 backdrop-blur-xl z-[100] border-b border-cyan-500/20 shadow-[0_5px_30px_-10px_rgba(6,182,212,0.2)]">
        <div className="flex items-center gap-6">
          <img src={LOGO_URL} className="h-12 w-12 object-contain" alt="Logo" />
          <div>
             <h1 className="text-2xl font-black tracking-tighter uppercase italic leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-500">Aeris <span className="not-italic">Academy</span></h1>
             <span className="text-[9px] text-cyan-700 font-mono uppercase tracking-[0.3em]">Future Warfare Initiative // v.2026</span>
          </div>
        </div>
        <div className="flex items-center gap-10 font-mono text-[10px] tracking-widest">
           <div className="flex items-center gap-2 text-cyan-500 animate-pulse">
             <Activity size={14} /> <span>SYSTEM STATUS: OPTIMAL</span>
           </div>
           <button onClick={onExit} className="group relative px-8 py-3 overflow-hidden rounded-full bg-cyan-950/30 text-cyan-400 font-black uppercase border border-cyan-500/30 hover:text-black transition-all">
             <span className="relative z-10">DEACTIVATE VISION</span>
             <div className="absolute inset-0 bg-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
           </button>
        </div>
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="pt-40 space-y-24 pb-32 relative z-10">
        {futureLibrary.map((cat, i) => (
          <section key={i} className="px-12 space-y-8">
            {/* Título da Seção Estilizado */}
            <div className="flex items-center gap-4 pl-4 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_15px_#06b6d4]"></div>
              <Terminal className="text-cyan-500" size={24} />
              <h3 className="text-3xl font-black italic tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-800 typing-effect">
                {cat.category}
              </h3>
            </div>
            
            {/* Grid de Cards Holográficos */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {cat.items.map((item, idx) => (
                <div key={idx} className="group relative aspect-[16/9] rounded-xl overflow-hidden bg-black/50 border border-cyan-900/50 transition-all duration-500 hover:scale-110 hover:z-50 hover:border-cyan-400 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.6)] cursor-pointer cyber-card">
                  
                  {/* Imagem com Efeito de Scanline */}
                  <div className="absolute inset-0 z-0">
                    <img src={item.img} className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity grayscale group-hover:grayscale-0" alt={item.title} />
                    <div className="absolute inset-0 bg-scanlines opacity-20 group-hover:opacity-10 transition-opacity"></div>
                  </div>
                  
                  {/* Overlay de Informação Holográfica */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100">
                    
                    {/* Badge de Status Superior */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                       <Scan size={14} className="text-cyan-500 animate-pulse" />
                       <span className={`text-[8px] font-black px-2 py-0.5 rounded-sm border ${item.status === 'LIVE' || item.status === 'READY' || item.status === 'ACTIVE' || item.status === 'SYNCED' || item.status === 'DECRYPTED' || item.status === 'UPDATED' ? 'border-green-500/50 text-green-400 bg-green-900/20' : 'border-cyan-500/50 text-cyan-400 bg-cyan-900/20'}`}>
                         {item.status}
                       </span>
                    </div>

                    {/* Conteúdo Inferior */}
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                         {/* CORREÇÃO APLICADA AQUI: Usando cat.category */}
                         {cat.category.includes("Video") ? <Play fill="cyan" size={14} className="text-cyan-400" /> : <FileText size={14} className="text-cyan-400" />}
                         <span className="text-[9px] font-black text-cyan-300 uppercase tracking-widest glitch-text-sm">{item.type}</span>
                      </div>
                      <h4 className="text-base font-black uppercase italic leading-tight mb-3 tracking-tighter text-white group-hover:text-cyan-50">{item.title}</h4>
                      
                      {/* Dados Extras no Hover */}
                      <div className="h-0 overflow-hidden group-hover:h-auto transition-all opacity-0 group-hover:opacity-100">
                        <div className="flex items-center gap-1 pt-2 border-t border-cyan-900/50">
                          {[...Array(5)].map((_, s) => <Star key={s} size={10} fill={s < 4 ? "cyan" : "none"} className="text-cyan-500" />)}
                          <span className="text-[9px] text-zinc-400 ml-2 font-mono">RATING: 4.8 // ACCESS: TIER-1</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Efeito de Borda de Scanner */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/50 rounded-xl transition-all pointer-events-none overflow-hidden">
                     <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* FOOTER TÁTICO */}
      <footer className="fixed bottom-0 w-full px-12 py-6 bg-black/80 backdrop-blur-md border-t border-cyan-900/30 flex justify-between items-center z-50 font-mono text-[9px] uppercase tracking-widest">
         <div className="flex items-center gap-6">
            <Zap className="text-cyan-500" size={16} />
            <span className="text-zinc-400">Quantum Link: <span className="text-cyan-400 animate-pulse">STABLE (45ms)</span></span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">Data Encryption: <span className="text-cyan-400">MIL-SPEC AES-512</span></span>
         </div>
         <div className="flex gap-6 text-zinc-600">
            <Shield size={16} className="hover:text-cyan-500 transition-colors cursor-pointer" />
            <Globe size={16} className="hover:text-cyan-500 transition-colors cursor-pointer" />
         </div>
      </footer>

      {/* CSS CUSTOMIZADO PARA EFEITOS AVANÇADOS */}
      <style>{`
        .bg-grid-pattern { background-image: radial-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px); background-size: 40px 40px; }
        .bg-scanlines { background: repeating-linear-gradient(0deg, rgba(0,0,0,0.2) 0px, rgba(0,0,0,0.2) 1px, transparent 1px, transparent 2px); }
        .bg-tactical-depth { background: radial-gradient(circle at center, #050a0e 0%, #000000 100%); }
        
        .cyber-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(45deg, transparent 40%, rgba(6, 182, 212, 0.1) 45%, rgba(6, 182, 212, 0.4) 50%, rgba(6, 182, 212, 0.1) 55%, transparent 60%); opacity: 0; transition: opacity 0.3s; pointer-events: none; mix-blend-mode: overlay; }
        .cyber-card:hover::before { opacity: 1; animation: hologram-shift 2s infinite linear; }

        @keyframes shimmer { 100% { left: 200%; } }
        @keyframes hologram-shift { 0% { background-position: 0% 0%; } 100% { background-position: 200% 200%; } }

        /* Efeito Glitch no Texto */
        .glitch-text { position: relative; }
        .glitch-text::before, .glitch-text::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.8; }
        .glitch-text::before { left: 2px; text-shadow: -1px 0 red; clip: rect(44px, 450px, 56px, 0); animation: glitch-anim 5s infinite linear alternate-reverse; }
        .glitch-text::after { left: -2px; text-shadow: -1px 0 blue; clip: rect(44px, 450px, 56px, 0); animation: glitch-anim2 5s infinite linear alternate-reverse; }
        @keyframes glitch-anim { 0% { clip: rect(32px, 9999px, 28px, 0); } 20% { clip: rect(68px, 9999px, 9px, 0); } 40% { clip: rect(95px, 9999px, 75px, 0); } 60% { clip: rect(96px, 9999px, 79px, 0); } 80% { clip: rect(62px, 9999px, 23px, 0); } 100% { clip: rect(75px, 9999px, 57px, 0); } }
        @keyframes glitch-anim2 { 0% { clip: rect(65px, 9999px, 88px, 0); } 20% { clip: rect(33px, 9999px, 71px, 0); } 40% { clip: rect(8px, 9999px, 19px, 0); } 60% { clip: rect(66px, 9999px, 2px, 0); } 80% { clip: rect(98px, 9999px, 46px, 0); } 100% { clip: rect(70px, 9999px, 26px, 0); } }
      `}</style>
    </div>
  );
};

export default FutureVisionPortal;
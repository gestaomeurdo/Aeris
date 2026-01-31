"use client";

import React, { useState, useEffect } from 'react';
import { Play, Headset, FileText, Settings, Lock, CheckCircle, Search, Layout, Database, BarChart3, X, Shield, Radio, Edit3, Plus, Trash2, Globe, Zap, Info, ChevronRight, Activity, Cpu, Target, Layers } from 'lucide-react';

const Index = () => {
  const [isMaster, setIsMaster] = useState(false);
  const [showFuture, setShowFuture] = useState(false);
  const LOGO_URL = "https://i.ibb.co/BKdX0Nzn/1.png"; //

  const modules = [
    { id: 1, title: "Mastering Air Force Leadership - The NCO Core", img: "https://images.unsplash.com/photo-1579962336211-1335017a55a1?auto=format&fit=crop&w=800&q=80", type: "Video Course" },
    { id: 2, title: "Modernizing Military Learning", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80", type: "Strategy" },
    { id: 3, title: "The Air Force SNCOs - Leaders of Leaders", img: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=800&q=80", type: "Audiobook" },
    { id: 4, title: "Understanding Air Force Enlisted Ranks", img: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80", type: "Interactive" },
    { id: 5, title: "Unlocking the Air Force Junior Enlisted Tier", img: "https://images.unsplash.com/photo-1590498670872-359146522c71?auto=format&fit=crop&w=800&q=80", type: "Video" }
  ]; //

  const handleLogin = () => {
    const user = prompt("ID DO OPERADOR:");
    const pass = prompt("SENHA:");
    if (user === "mike" && pass === "@mike2026") setIsMaster(true); //
  };

  // --- COMPONENTE DA ABA FUTURO (CENTRO DE COMANDO) ---
  const FutureVision = () => (
    <div className="h-screen bg-[#010101] text-white flex flex-col relative overflow-hidden animate-in fade-in duration-700 font-mono">
      {/* Overlay de Scanlines e Glow */}
      <div className="absolute inset-0 pointer-events-none z-50 bg-scanline opacity-10"></div>
      <div className="absolute inset-0 pointer-events-none z-40 shadow-[inset_0_0_100px_rgba(6,182,212,0.2)]"></div>

      {/* Header Tático */}
      <header className="p-6 border-b border-cyan-500/20 bg-black flex justify-between items-center relative z-50">
        <div className="flex items-center gap-6">
          <img src={LOGO_URL} className="h-10 w-10 object-contain shadow-[0_0_15px_rgba(6,182,212,0.5)]" alt="Aeris" />
          <div className="flex flex-col">
            <span className="text-[10px] text-cyan-500 font-black tracking-[0.5em] uppercase animate-pulse">Phase 4: Global Deployment Mode</span>
            <span className="text-[8px] text-zinc-600">ENCRYPTION: AES-512 // NEURAL_LINK: ACTIVE</span>
          </div>
        </div>
        <button onClick={() => setShowFuture(false)} className="text-[10px] border border-cyan-500/30 px-6 py-2 rounded hover:bg-cyan-500 hover:text-black transition-all font-black uppercase tracking-widest">Abord Simulation</button>
      </header>

      {/* Interface Principal */}
      <div className="flex-1 flex p-8 gap-8 relative z-10">
        {/* Painel Esquerdo: Assets Futuros */}
        <div className="w-80 flex flex-col gap-6">
          <div className="flex-1 bg-black/40 border border-cyan-900/30 rounded-lg p-6 backdrop-blur-md">
            <h3 className="text-[10px] text-cyan-500 mb-6 flex items-center gap-2 font-black uppercase italic tracking-widest"><Layers size={14}/> Integrated Assets</h3>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-white/5 bg-white/5 rounded-md group hover:border-cyan-500 transition-all cursor-pointer">
                  <span className="text-[9px] text-zinc-500 group-hover:text-cyan-400 uppercase">Neural_Course_0{i+10}</span>
                  <Lock size={12} className="text-cyan-900" />
                </div>
              ))}
            </div>
          </div>
          <div className="h-40 bg-black/40 border border-cyan-900/30 rounded-lg p-6 flex flex-col justify-center gap-2 backdrop-blur-md">
            <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest italic">Global Proficiency Index</span>
            <div className="flex items-end gap-2 text-4xl font-black text-cyan-400 italic">94.8<span className="text-sm pb-1">%</span></div>
            <div className="w-full h-1 bg-zinc-900 rounded-full"><div className="w-[94%] h-full bg-cyan-500 animate-pulse"></div></div>
          </div>
        </div>

        {/* Centro: O Wow Factor (Mapa + Título) */}
        <div className="flex-1 bg-black/40 border border-cyan-900/30 rounded-lg relative overflow-hidden flex flex-col items-center justify-center p-12 backdrop-blur-md bg-grid-pattern">
          {/* Mapa Mundi SVG Tático */}
          <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
             <Globe size={800} className="text-cyan-500 animate-spin-slow" />
          </div>

          <div className="relative z-10 text-center space-y-8 animate-in zoom-in duration-1000">
            <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              WELCOME TO THE <span className="text-cyan-500 not-italic">FUTURE.</span> <br/>
              <span className="text-2xl font-light tracking-[0.4em] block mt-4 border-y border-cyan-500/20 py-4">WE CAN LEARN LIKE THIS WITH AERIS.</span>
            </h1>
            <div className="flex gap-12 justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-24 h-12 bg-white/5 rounded border border-white/10 flex items-center justify-center"><Activity className="text-cyan-500" /></div>
                <span className="text-[8px] text-zinc-500 uppercase">Live_Sync</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-24 h-12 bg-white/5 rounded border border-white/10 flex items-center justify-center"><Cpu className="text-cyan-500" /></div>
                <span className="text-[8px] text-zinc-500 uppercase">Neural_Net</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-24 h-12 bg-white/5 rounded border border-white/10 flex items-center justify-center"><Target className="text-cyan-500" /></div>
                <span className="text-[8px] text-zinc-500 uppercase">Precision</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito: Radar e Feed */}
        <div className="w-80 flex flex-col gap-6">
           <div className="h-64 bg-black/40 border border-cyan-900/30 rounded-lg p-6 relative backdrop-blur-md overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <div className="w-48 h-48 border border-cyan-500 rounded-full animate-ping"></div>
                <div className="w-32 h-32 border border-cyan-500 rounded-full"></div>
              </div>
              <h4 className="text-[9px] text-cyan-700 mb-4 font-bold tracking-[0.2em] uppercase">Intelligence Tracker</h4>
              <div className="text-[9px] text-zinc-500 leading-tight space-y-2 mt-20">
                <div>{`> SATELLITE_LINK: ESTABLISHED`}</div>
                <div className="text-cyan-600">{`> DATA_STREAM: 18.5 TB/s`}</div>
                <div className="animate-pulse">{`> STATUS: OPTIMAL_READY`}</div>
              </div>
           </div>
           <div className="flex-1 bg-black/40 border border-cyan-900/30 rounded-lg p-6 backdrop-blur-md">
             <h4 className="text-[9px] text-zinc-600 mb-6 font-bold uppercase italic tracking-widest border-b border-zinc-900 pb-2">Operational News Feed</h4>
             <div className="space-y-6">
               {[1,2,3].map(i => (
                 <div key={i} className="text-[8px] font-mono border-l-2 border-cyan-900/50 pl-3">
                   <div className="text-zinc-500 font-bold mb-1">SEC_NODE_0{i} UPDATED</div>
                   <div className="text-cyan-900 italic tracking-tighter">New leadership framework uploaded for Pacific Region...</div>
                 </div>
               ))}
             </div>
           </div>
        </div>
      </div>

      <style>{`
        .bg-grid-pattern { background-image: radial-gradient(#083344 1px, transparent 1px); background-size: 50px 50px; }
        .bg-scanline { background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06)); background-size: 100% 3px, 3px 100%; }
        .animate-spin-slow { animation: spin 60s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );

  // --- HOME (ESTILO NETFLIX) ---
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30">
      {showFuture ? <FutureVision /> : (
        <>
          <nav className="fixed top-0 w-full h-24 px-12 flex items-center justify-between bg-gradient-to-b from-black to-transparent z-[100]">
            <div className="flex items-center gap-12">
              <div className="flex items-center gap-4 cursor-pointer" onClick={() => setShowFuture(false)}>
                <img src={LOGO_URL} className="h-12 w-12 object-contain" alt="Aeris Academy" />
                <h1 className="text-2xl font-black tracking-tighter uppercase italic leading-none">Aeris <span className="text-cyan-500 not-italic">Academy</span></h1>
              </div>
              <div className="hidden lg:flex gap-8 text-[11px] font-black uppercase tracking-widest text-zinc-500">
                <button className="text-white border-b-2 border-cyan-500 pb-1">Home</button>
                <button onClick={() => setShowFuture(true)} className="hover:text-cyan-400 transition-colors uppercase italic animate-pulse">Vision 2026</button>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <Search size={20} className="text-zinc-500" />
              <Settings onClick={handleLogin} size={18} className={`cursor-pointer ${isMaster ? 'text-green-500' : 'text-zinc-800'}`} />
            </div>
          </nav>

          <header className="relative h-[85vh] w-full flex items-center px-12 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1517976384346-3136801d605d?auto=format&fit=crop&w=1920&q=90" className="w-full h-full object-cover opacity-30 grayscale" alt="Hero" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-3xl space-y-6">
               <h2 className="text-7xl font-black italic tracking-tighter uppercase leading-[0.9]">Aeris Learning <br/> <span className="text-cyan-500 not-italic">Initiative</span></h2>
               <p className="text-xl text-zinc-400 font-light max-w-lg">Transformando o treinamento estático da Força Aérea em inteligência tática imersiva e pronta para a missão.</p>
               <div className="flex gap-4">
                 <button className="bg-cyan-600 text-white px-10 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-cyan-500 transition-all">Watch Overview</button>
                 <button onClick={() => setShowFuture(true)} className="bg-zinc-900 text-white border border-white/10 px-10 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-zinc-800 transition-all italic tracking-[0.3em]">Explore Future</button>
               </div>
            </div>
          </header>

          <main className="relative z-10 -mt-20 px-12 pb-24 space-y-12">
            <h3 className="text-xl font-bold italic tracking-tighter uppercase flex items-center gap-4">Strategic Assets Ready <div className="h-[1px] flex-1 bg-white/5"></div></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {modules.map((mod) => (
                <div key={mod.id} className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer border border-white/5 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-cyan-500/40 bg-zinc-900">
                   <img src={mod.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity" alt={mod.title} />
                   <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                      <div className="flex items-center gap-2 mb-2"><img src={LOGO_URL} className="h-4 w-4" /><span className="text-[10px] font-black text-cyan-500 uppercase">{mod.type}</span></div>
                      <h4 className="text-lg font-black leading-tight uppercase italic tracking-tighter">{mod.title}</h4>
                   </div>
                </div>
              ))}
            </div>
          </main>
        </>
      )}

      <style>{`
        .bg-grid-pattern { background-image: radial-gradient(#083344 1px, transparent 1px); background-size: 50px 50px; }
        .bg-scanline { background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06)); background-size: 100% 3px, 3px 100%; }
        .animate-spin-slow { animation: spin 60s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Index;
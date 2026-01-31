"use client";

import React, { useState, useEffect } from 'react';
import { Play, Info, ChevronRight, Star, Shield, Activity, Terminal } from 'lucide-react';

interface FutureVisionPortalProps {
  onExit: () => void;
}

const FutureVisionPortal = ({ onExit }: FutureVisionPortalProps) => {
  const [stage, setStage] = useState('message');
  const LOGO_URL = "https://i.ibb.co/BKdX0Nzn/1.png";

  useEffect(() => {
    const timer = setTimeout(() => setStage('portal'), 4000);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    {
      title: "Tactical Intelligence // Originals",
      items: [
        { title: "Mastering Leadership", img: "https://images.unsplash.com/photo-1579962336211-1335017a55a1?q=80&w=800", duration: "12h 45m" },
        { title: "Neural Integration", img: "https://images.unsplash.com/photo-1517976384346-3136801d605d?q=80&w=800", duration: "Premium" },
        { title: "Modern Warfare", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800", duration: "45min" },
        { title: "Cyber Defense", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800", duration: "Locked" },
      ]
    },
    {
      title: "Audio Briefings // Strategic Comms",
      items: [
        { title: "SNCO Leaders", img: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?q=80&w=800", duration: "8h" },
        { title: "Rank Structure", img: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800", duration: "3h" },
        { title: "Global Command", img: "https://images.unsplash.com/photo-1590498670872-359146522c71?q=80&w=800", duration: "1h 20m" },
        { title: "Field Ops", img: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=800", duration: "5h" },
      ]
    }
  ];

  if (stage === 'message') {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-1000">
        <img src={LOGO_URL} className="w-24 h-24 mb-12 animate-pulse object-contain" />
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
          WELCOME TO THE FUTURE. <br/>
          <span className="text-cyan-500 not-italic block mt-4 text-3xl tracking-[0.4em]">WE CAN LEARN LIKE THIS WITH AERIS.</span>
        </h1>
        <div className="mt-12 w-80 h-1 bg-zinc-900 rounded-full overflow-hidden relative border border-white/5">
          <div className="absolute inset-0 bg-cyan-500 animate-[load_4s_linear]"></div>
        </div>
        <style>{` @keyframes load { 0% { width: 0%; } 100% { width: 100%; } } `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden animate-in fade-in duration-700">
      
      {/* HEADER NETFLIX STYLE */}
      <nav className="fixed top-0 w-full h-20 px-12 flex items-center justify-between bg-gradient-to-b from-black via-black/80 to-transparent z-[100]">
        <div className="flex items-center gap-10">
          <img src={LOGO_URL} className="h-10 w-10 object-contain" />
          <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-zinc-400">
            <span className="text-white cursor-pointer">Vision 2026</span>
            <span className="hover:text-cyan-500 cursor-pointer transition-colors" onClick={onExit}>Present Day</span>
          </div>
        </div>
        <button onClick={onExit} className="text-[10px] font-black border border-white/10 px-6 py-2 rounded-full hover:bg-white/5 transition-all uppercase tracking-widest">Exit</button>
      </nav>

      {/* HERO BANNER - CINEMATIC */}
      <header className="relative h-[80vh] flex items-end pb-24 px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1506917728037-b6af01ad7d42?q=80&w=1920" className="w-full h-full object-cover opacity-50 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-cyan-500" />
            <span className="text-xs font-black text-cyan-500 uppercase tracking-[0.4em]">USAF Strategic Asset</span>
          </div>
          <h2 className="text-7xl font-black italic tracking-tighter uppercase leading-[0.85]">Neural Command <br/> <span className="text-cyan-500 not-italic">V.2026</span></h2>
          <div className="flex gap-4 pt-4">
            <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-black uppercase text-xs hover:bg-cyan-500 transition-all"><Play size={16} fill="black" /> Play Briefing</button>
            <button className="flex items-center gap-2 bg-zinc-800/80 backdrop-blur-md px-8 py-3 rounded-lg font-black uppercase text-xs border border-white/5 hover:bg-zinc-700 transition-all"><Info size={16} /> More Intel</button>
          </div>
        </div>
      </header>

      {/* ROWS DE CONTEÚDO */}
      <main className="relative z-20 -mt-20 px-12 pb-32 space-y-16">
        {sections.map((sec, i) => (
          <section key={i} className="space-y-4">
            <h3 className="text-xl font-black italic tracking-tighter uppercase flex items-center gap-3">
               {sec.title} <ChevronRight className="text-cyan-500" size={20} />
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {sec.items.map((item, idx) => (
                <div key={idx} className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-zinc-900 border border-white/5 transition-all duration-500 hover:scale-110 hover:z-50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] hover:border-cyan-500/50">
                   <img src={item.img} className="w-full h-full object-cover opacity-70 group-hover:opacity-40 transition-opacity" />
                   <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                      <div className="flex items-center gap-2 mb-2 text-cyan-400">
                         <Star size={12} fill="currentColor" /> <span className="text-[9px] font-black uppercase tracking-widest">Top Rated Asset</span>
                      </div>
                      <h4 className="text-sm font-black uppercase italic leading-tight">{item.title}</h4>
                      <div className="mt-2 text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{item.duration} // Syncing...</div>
                   </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

    </div>
  );
};

export default FutureVisionPortal;
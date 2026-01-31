"use client";

import React, { useState, useEffect } from 'react';
import { Play, Info, ChevronRight, Star, Shield, Activity, Terminal, Lock, Radio } from 'lucide-react';
import VideoModal from './VideoModal';

interface FutureVisionPortalProps {
  onExit: () => void;
}

const FutureVisionPortal = ({ onExit }: FutureVisionPortalProps) => {
  const [stage, setStage] = useState('message');
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const LOGO_URL = "https://i.ibb.co/BKdX0Nzn/1.png"; 
  const ACADEMY_VIDEO_URL = "https://www.youtube.com/embed/qN4w_g-224E?autoplay=1"; // Placeholder video URL

  useEffect(() => {
    const timer = setTimeout(() => setStage('portal'), 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleInitializeAcademy = () => {
    setIsVideoOpen(true);
  };

  // Content sections
  const sections = [
    {
      title: "Top Command Picks // 2026",
      items: [
        { title: "Mastering Air Force Leadership", img: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1200", type: "Command Course" },
        { title: "Modernizing Military Learning", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200", type: "Intelligence" },
        { title: "The Air Force SNCOs", img: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?q=80&w=1200", type: "Leadership" },
        { title: "Enlisted Ranks & Structure", img: "https://images.unsplash.com/photo-1523450031158-d6d809774df7?q=80&w=1200", type: "Protocol" }
      ]
    },
    {
      title: "Tactical Audio // Podcasts & Audiobooks",
      items: [
        { title: "Leadership Under Fire", img: "https://images.unsplash.com/photo-1517976384346-3136801d605d?q=80&w=800", type: "Podcast" },
        { title: "Stealth Logistics", img: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=800", type: "Audiobook" },
        { title: "Global Defense Theory", img: "https://images.unsplash.com/photo-1551808198-b21703c19e5d?q=80&w=800", type: "Audiobook" },
        { title: "Junior Tier Foundations", img: "https://images.unsplash.com/photo-1496247749665-49cf94d9967d?q=80&w=800", type: "Podcast" }
      ]
    }
  ]; 

  if (stage === 'message') {
    return (
      <div className="h-screen bg-[#020202] flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-1000">
        <img src={LOGO_URL} className="w-32 h-32 mb-10 animate-spin-slow object-contain" />
        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.85] glitch-text" data-text="WELCOME TO THE FUTURE.">
          WELCOME TO THE FUTURE. <br/>
          <span className="text-cyan-500 not-italic block mt-6 text-3xl tracking-[0.5em] font-light">AERIS ACADEMY ECOSYSTEM</span>
        </h1>
        <div className="mt-16 w-96 h-1.5 bg-zinc-900 rounded-full overflow-hidden relative border border-cyan-500/20">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-400 animate-[load_3.5s_linear] shadow-[0_0_20px_#06b6d4]"></div>
        </div>
        <style>{` @keyframes load { 0% { width: 0%; } 100% { width: 100%; } } .animate-spin-slow { animation: spin 10s linear infinite; } `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden animate-in fade-in duration-700">
      
      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
        videoUrl={ACADEMY_VIDEO_URL} 
      />

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full h-24 px-12 flex items-center justify-between bg-gradient-to-b from-black via-black/80 to-transparent z-[110]">
        <div className="flex items-center gap-10">
          <img src={LOGO_URL} className="h-12 w-12 object-contain" />
          <div className="flex gap-8 text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500">
            <span className="text-white border-b-2 border-cyan-500 pb-1 italic">Future Vision</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors" onClick={onExit}>Operational Hub</span>
          </div>
        </div>
        <button onClick={onExit} className="text-[10px] font-black border border-cyan-500/30 px-8 py-2.5 rounded-full hover:bg-cyan-500/10 text-cyan-400 transition-all uppercase tracking-widest bg-black/40 backdrop-blur-md">Deactivate Vision</button>
      </nav>

      {/* --- MEGA HERO CARD (THE "WOW" FACTOR) --- */}
      <section className="relative h-[90vh] w-full flex items-center px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* F-35 Lighting II high res image */}
          <img src="https://images.unsplash.com/photo-1517976384346-3136801d605d?q=80&w=1920" className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-[3s]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-8 animate-in slide-in-from-left duration-1000">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-cyan-600 text-white text-[10px] font-black uppercase tracking-widest rounded shadow-[0_0_15px_rgba(6,182,212,0.5)]">Mission Alpha</div>
            <span className="text-xs font-bold text-cyan-500 uppercase tracking-[0.5em]">2026 Strategy Overview</span>
          </div>
          <h2 className="text-[100px] font-black italic tracking-tighter uppercase leading-[0.8] text-white">
            WE LEARN <br/> <span className="text-transparent stroke-text">LIKE THIS.</span>
          </h2>
          <p className="text-2xl text-zinc-400 font-light max-w-2xl leading-relaxed">
            AERIS Academy is not just a platform; it is the future of tactical readiness. Integrating video, audio, and digital doctrine into a single command center.
          </p>
          <div className="flex gap-6 pt-6">
            <button 
              onClick={handleInitializeAcademy} 
              className="flex items-center gap-4 bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-sm hover:bg-cyan-500 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
            >
              <Play size={20} fill="black" /> Initialize Academy
            </button>
            <button className="flex items-center gap-4 bg-zinc-900/60 backdrop-blur-xl border border-white/10 text-white px-12 py-5 rounded-2xl font-black uppercase text-sm hover:bg-zinc-800 transition-all">
              <Info size={20} /> Tactical Specs
            </button>
          </div>
        </div>

        {/* HUD Elements no Hero */}
        <div className="absolute bottom-12 right-12 text-right space-y-2 hidden lg:block opacity-40">
           <div className="text-[10px] font-mono text-cyan-500 tracking-widest">AERIS_OS // GLOBAL_READINESS</div>
           <div className="text-[10px] font-mono text-white">94.8% PROFICIENCY RATING</div>
        </div>
      </section>

      {/* MÓDULOS ESTILO NETFLIX (USAF THEMED) */}
      <main className="relative z-20 -mt-24 px-12 pb-48 space-y-20">
        {sections.map((sec, i) => (
          <section key={i} className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-3xl font-black italic tracking-tighter uppercase flex items-center gap-4">
                 {sec.title} <ChevronRight className="text-cyan-500" size={28} />
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {sec.items.map((item, idx) => (
                <div key={idx} className="group relative aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer bg-zinc-900 border border-white/5 transition-all duration-700 hover:scale-110 hover:z-50 hover:shadow-[0_40px_80px_rgba(0,0,0,0.9)] hover:border-cyan-500/50">
                   <img src={item.img} className="w-full h-full object-cover opacity-70 group-hover:opacity-30 transition-opacity" />
                   <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all translate-y-8 group-hover:translate-y-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                      <div className="flex items-center gap-3 mb-3">
                         <Radio size={14} className="text-cyan-500 animate-pulse" />
                         <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">{item.type}</span>
                      </div>
                      <h4 className="text-xl font-black uppercase italic leading-tight mb-2 tracking-tighter">{item.title}</h4>
                      <div className="h-1 w-0 bg-cyan-500 group-hover:w-full transition-all duration-700"></div>
                   </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      <style>{`
        .stroke-text { -webkit-text-stroke: 1px white; color: transparent; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #083344; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default FutureVisionPortal;
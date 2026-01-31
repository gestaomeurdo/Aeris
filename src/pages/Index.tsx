"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Headset, Star, Activity, X, Settings } from 'lucide-react';

interface Asset {
  id: string;
  title: string;
  type: string;
  img: string;
  description: string;
}

const Index = () => {
  const [view, setView] = useState<'home' | 'future'>('home'); 
  const [activeAsset, setActiveAsset] = useState<Asset | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMaster, setIsMaster] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const LOGO_URL = "https://i.ibb.co/BKdX0Nzn/1.png";

  // Função para converter link do Drive em link direto de streaming
  const getDriveLink = (id: string) => `https://drive.google.com/uc?export=download&id=${id}`;

  // Seus 5 Ativos Reais com as Capinhas Táticas USAF
  const assets: Asset[] = [
    { 
      id: "1aK9R5ZANYYr1zsvQr0FPE1Od43zvTRGm", 
      title: "Mastering Air Force Leadership - The NCO Core", 
      type: "Leadership", 
      img: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1200",
      description: "Desenvolvimento de liderança avançada para o corpo de NCOs." 
    },
    { 
      id: "1w4HmN-1UItC19DVTqouVjtOHlx4ZgyHK", 
      title: "Modernizing Military Learning", 
      type: "Strategy", 
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
      description: "A transição tecnológica do ensino tradicional para o digital." 
    },
    { 
      id: "1clRvHpJYb9r2XIMfdJcc7yT2Bn5cjIbN", 
      title: "The Air Force SNCOs - Leaders of Leaders", 
      type: "Leadership", 
      img: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?q=80&w=1200",
      description: "Estratégias de comando para sargentos seniores." 
    },
    { 
      id: "100iaYX3KIyMz6u8spzqls8VU2nC_TIke", 
      title: "Understanding Air Force Enlisted Ranks", 
      type: "Structure", 
      img: "https://images.unsplash.com/photo-1523450031158-d6d809774df7?q=80&w=1200",
      description: "Mapeamento técnico da hierarquia global da USAF." 
    },
    { 
      id: "1mnxJeIFbkf1JnGFVT9wjoOYvTUcDBspO", 
      title: "Unlocking the Air Force Junior Enlisted Tier", 
      type: "Training", 
      img: "https://images.unsplash.com/photo-1506917728037-b6af01ad7d42?q=80&w=1200",
      description: "Fundamentos táticos para os níveis iniciais da tropa." 
    }
  ];

  const handleLogin = () => {
    const user = prompt("OPERATOR ID:");
    const pass = prompt("SECURITY KEY:");
    if (user === "mike" && pass === "@mike2026") {
      setIsMaster(true);
      alert("Acesso Master concedido, Operador Mike.");
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full h-24 px-12 flex items-center justify-between bg-black/80 backdrop-blur-xl z-[100] border-b border-white/5">
        <div className="flex items-center gap-4">
          <img src={LOGO_URL} className="h-10 w-10 object-contain" alt="Aeris Academy" />
          <h1 className="text-xl font-black uppercase italic tracking-tighter">Aeris - <span className="text-cyan-500 not-italic">Academy</span></h1>
        </div>
        <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
          <button onClick={() => setView('home')} className={view === 'home' ? "text-white border-b border-cyan-500 pb-1" : "hover:text-white"}>Home</button>
          <button onClick={() => setView('future')} className={view === 'future' ? "text-cyan-500 italic" : "hover:text-cyan-400 italic"}>Future Vision 2026</button>
        </div>
        <Settings onClick={handleLogin} className={`cursor-pointer ${isMaster ? 'text-green-500' : 'text-zinc-800'}`} size={20} />
      </nav>

      {/* VIEW: HOME (NETFLIX STYLE) */}
      {view === 'home' && (
        <main className="pt-32 animate-in fade-in duration-700 pb-24">
          {/* HERO BANNER */}
          <section className="px-12 mb-16 relative h-[60vh] rounded-3xl overflow-hidden mx-12">
            <img src="https://images.unsplash.com/photo-1517976384346-3136801d605d?q=80&w=1920" className="absolute inset-0 w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent flex items-center px-16">
               <div className="max-w-2xl space-y-6">
                 <span className="text-cyan-500 font-bold uppercase tracking-widest text-xs tracking-[0.5em]">USAF Strategic Asset</span>
                 <h2 className="text-6xl font-black italic uppercase leading-none tracking-tighter">AERIS LEARNING <br/> <span className="text-cyan-500 not-italic">INITIATIVE</span></h2>
                 <p className="text-zinc-400 font-light text-lg">A evolução digital da prontidão tática. Inteligência distribuída em tempo real.</p>
                 <button className="bg-white text-black px-10 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-cyan-500 transition-all">Watch Overview</button>
               </div>
            </div>
          </section>

          {/* GRID DE CARDS */}
          <section className="px-12 space-y-8">
            <h3 className="text-lg font-black italic uppercase tracking-widest flex items-center gap-4">
              Tactical Assets <div className="h-[1px] flex-1 bg-white/5"></div>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {assets.map((asset) => (
                <div 
                  key={asset.id} 
                  onClick={() => setActiveAsset(asset)}
                  className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer bg-zinc-900 border border-white/5 transition-all hover:scale-105 hover:border-cyan-500/50"
                >
                  <img src={asset.img} className="w-full h-full object-cover opacity-70 group-hover:opacity-30 transition-opacity" alt={asset.title} />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <span className="text-[9px] font-black text-cyan-500 uppercase mb-1">{asset.type}</span>
                    <h4 className="text-sm font-black uppercase italic leading-tight mb-2 tracking-tighter">{asset.title}</h4>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={8} fill="cyan" className="text-cyan-500" />)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* VIEW: FUTURE (WAR ROOM) */}
      {view === 'future' && (
        <main className="h-screen bg-black flex flex-col animate-in slide-in-from-bottom duration-1000 overflow-hidden font-mono pt-24">
           <div className="flex-1 p-12 relative flex flex-col items-center justify-center text-center space-y-8 bg-grid-pattern">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900 via-transparent to-transparent"></div>
              <img src={LOGO_URL} className="w-24 h-24 animate-pulse opacity-50" alt="Logo" />
              <h2 className="text-6xl font-black italic text-white uppercase tracking-tighter leading-none">
                WELCOME TO THE <span className="text-cyan-500 not-italic underline decoration-1 underline-offset-8">FUTURE.</span> <br/>
                <span className="text-2xl font-light tracking-[0.3em] block mt-6">WE CAN LEARN LIKE THIS WITH AERIS.</span>
              </h2>
              <div className="grid grid-cols-4 gap-4 pt-12 opacity-30">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-48 h-28 border border-cyan-900 rounded-xl flex flex-col items-center justify-center gap-2">
                    <Lock size={16} className="text-cyan-900" />
                    <span className="text-[8px] uppercase tracking-widest">Asset_0{i+10} // Encrypted</span>
                  </div>
                ))}
              </div>
           </div>
           <div className="h-16 bg-cyan-600 text-black flex items-center justify-between px-12 font-black text-[10px] uppercase tracking-widest">
             <div className="flex items-center gap-6 italic"><Activity size={18} /> GLOBAL PROFICIENCY: 94.8%</div>
             <span>AERIS_OS v.2026 // PHASE_4_ACTIVE</span>
           </div>
        </main>
      )}

      {/* PLAYER MODAL (FUNCTIONAL) */}
      {activeAsset && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/95 backdrop-blur-xl animate-in zoom-in duration-300">
           <div className="bg-zinc-950 border border-cyan-500/20 w-full max-w-5xl rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400"><Headset size={24}/></div>
                    <h3 className="text-xl font-bold uppercase italic tracking-tighter">{activeAsset.title}</h3>
                 </div>
                 <button onClick={() => {setActiveAsset(null); setIsPlaying(false);}} className="p-2 hover:bg-white/10 rounded-full"><X size={32}/></button>
              </div>
              <div className="p-12 flex flex-col items-center gap-10">
                 <div className="w-full max-w-md bg-zinc-900/50 p-8 rounded-3xl border border-white/5 text-center space-y-8">
                    <audio ref={audioRef} src={getDriveLink(activeAsset.id)} onEnded={() => setIsPlaying(false)} />
                    <h5 className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Strategic Intelligence Feed</h5>
                    <button 
                      onClick={togglePlay} 
                      className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-black shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105 transition-transform"
                    >
                        {isPlaying ? <Pause size={36} fill="black" /> : <Play size={36} fill="black" className="ml-1" />}
                    </button>
                    <p className="text-sm text-zinc-400">{activeAsset.description}</p>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Index;
"use client";

import React, { useState, useEffect } from 'react';
import AerisLogo from '@/components/AerisLogo';
import MissionBriefing from '@/components/MissionBriefing';
import DigitalDoctrine from '@/components/DigitalDoctrine';
import EditorSidebar from '@/components/EditorSidebar';
import { Terminal, Target, Shield, Bell, LayoutGrid, User, Wifi } from 'lucide-react';
import { PortalData } from '@/types/portal';

const INITIAL_DATA: PortalData = {
  mainVideo: "https://youtu.be/mQayAWnJQOE",
  missionTitle: "AERIS ACADEMY",
  missionDescription: "Mastering Air Force Leadership and modernizing military tactical learning through digital immersive doctrines.",
  modules: [
    { 
      id: "MOD-01", 
      title: "Mastering Air Force Leadership", 
      desc: "Focus on The NCO Core values and leadership strategies for modern aviation environments.", 
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      docUrl: "https://www.africau.edu/images/default/sample.pdf", 
      progress: 85, 
      locked: false 
    },
    { 
      id: "MOD-02", 
      title: "Modernizing Military Learning", 
      desc: "Transitioning from legacy PDF structures to dynamic, audio-visual tactical interfaces.", 
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      docUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", 
      progress: 30, 
      locked: false 
    },
    { 
      id: "MOD-03", 
      title: "The Air Force SNCOs", 
      desc: "Detailed study on 'Leaders of Leaders' and the strategic tier of enlisted command.", 
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      docUrl: "https://pdfobject.com/pdf/sample.pdf", 
      progress: 0, 
      locked: false 
    },
    { 
      id: "MOD-04", 
      title: "Enlisted Ranks & Structure", 
      desc: "Complete visual guide to the Air Force enlisted rank hierarchy and responsibilities.", 
      audioUrl: "",
      docUrl: "", 
      progress: 0, 
      locked: true 
    }
  ]
};

const Index = () => {
  const [data, setData] = useState<PortalData>(INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aeris_data');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Matrix corrupt: resetting to initial parameters");
      }
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-[#B0BEC5] font-sans selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      <EditorSidebar data={data} onUpdate={setData} />

      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-[#00E5FF]/5 blur-[120px] rounded-full opacity-30" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>
      
      {/* HUD Sidebar */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 w-20 bg-black/60 backdrop-blur-3xl border border-white/5 rounded-[32px] flex flex-col items-center py-10 gap-10 z-50 shadow-2xl">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#6366F1] flex items-center justify-center p-2.5">
          <AerisLogo />
        </div>
        <div className="flex flex-col gap-6">
          <button className="group relative p-4 text-[#00E5FF]"><LayoutGrid className="w-6 h-6" /></button>
          <button className="group p-4 text-white/20 hover:text-white"><Target className="w-6 h-6" /></button>
          <button className="group p-4 text-white/20 hover:text-white"><Terminal className="w-6 h-6" /></button>
          <button className="group p-4 text-white/20 hover:text-white"><Shield className="w-6 h-6" /></button>
        </div>
        <div className="mt-auto"><button className="p-4 text-white/20 hover:text-white"><User className="w-6 h-6" /></button></div>
      </nav>

      <div className="pl-32 pr-12">
        <header className="pt-12 pb-12 flex justify-between items-center border-b border-white/5 mb-16">
          <div className="space-y-1">
            <p className="text-[10px] font-mono font-black text-[#00E5FF]/40 uppercase tracking-[0.5em]">AERIS ACADEMY TERMINAL</p>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">AERIS ACADEMY</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 px-6 py-3 bg-white/[0.03] rounded-2xl border border-white/5">
              <Wifi className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-[10px] font-mono font-black text-white/60 tracking-widest uppercase">Uplink: Synchronized</span>
            </div>
            <button className="p-3 bg-white/5 border border-white/10 rounded-2xl"><Bell className="w-5 h-5 text-white/40" /></button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto space-y-32 pb-32">
          <MissionBriefing 
            title={data.missionTitle} 
            videoUrl={data.mainVideo} 
            description={data.missionDescription} 
          />
          
          <DigitalDoctrine modules={data.modules} />

          <footer className="pt-20 flex flex-col items-center gap-10 opacity-30 text-[9px] font-mono font-black text-white/20 tracking-[1em] uppercase">
            // END OF LINE // SYSTEM SECURE //
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
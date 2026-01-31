"use client";

import React, { useState, useEffect } from 'react';
import TacticalSidebar from '@/components/TacticalSidebar';
import Breadcrumbs from '@/components/Breadcrumbs';
import MissionBriefing from '@/components/MissionBriefing';
import OperationsCenter from '@/components/OperationsCenter';
import AudioLibrary from '@/components/AudioLibrary';
import DocGallery from '@/components/DocGallery';
import TroopReadiness from '@/components/TroopReadiness';
import EditorSidebar from '@/components/EditorSidebar';
import { Bell, Wifi, Search } from 'lucide-react';
import { PortalData } from '@/types/portal';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_DATA: PortalData = {
  mainVideo: "https://youtu.be/mQayAWnJQOE",
  missionTitle: "AERIS ACADEMY",
  missionDescription: "Mastering Air Force Leadership and modernizing military tactical learning through digital immersive doctrines.",
  modules: [
    { 
      id: "MOD-01", 
      title: "Mastering Air Force Leadership", 
      desc: "Development of leadership core values for modern aviation.", 
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      docUrl: "https://www.africau.edu/images/default/sample.pdf", 
      progress: 85, 
      locked: false 
    },
    { 
      id: "MOD-02", 
      title: "Modernizing Military Learning", 
      desc: "Digital transformation of legacy documentation.", 
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      docUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", 
      progress: 30, 
      locked: false 
    },
    { 
      id: "MOD-03", 
      title: "The Air Force SNCOs", 
      desc: "Strategic analysis of high-enlisted leadership.", 
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      docUrl: "https://pdfobject.com/pdf/sample.pdf", 
      progress: 0, 
      locked: false 
    },
    { 
      id: "MOD-04", 
      title: "Enlisted Ranks & Structure", 
      desc: "Global rank hierarchy mapping.", 
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
  const [activeView, setActiveView] = useState('missions');
  const [search, setSearch] = useState('');

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

  const currentYear = new Date().getFullYear();
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).toUpperCase();

  return (
    <div className="min-h-screen bg-[#020617] text-[#B0BEC5] font-sans selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      <EditorSidebar data={data} onUpdate={setData} />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-[#00E5FF]/5 blur-[120px] rounded-full opacity-30" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>
      
      <TacticalSidebar activeView={activeView} onViewChange={setActiveView} />

      <div className="pl-32 pr-12 relative z-10">
        <header className="pt-12 pb-12 flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-white/5 mb-8">
          <div className="space-y-1">
            <p className="text-[10px] font-mono font-black text-[#00E5FF]/40 uppercase tracking-[0.5em]">AERIS ACADEMY TERMINAL</p>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">INTEGRATED TACTICAL KNOWLEDGE</h1>
          </div>
          
          <div className="flex-1 max-w-xl mx-8 relative group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#00E5FF] transition-colors" />
             <input 
               placeholder="Search Doctrine & Intelligence..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 pl-12 pr-6 text-xs text-white placeholder:text-white/20 outline-none focus:border-[#00E5FF]/40 focus:bg-white/[0.05] transition-all"
             />
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 px-6 py-3 bg-white/[0.03] rounded-2xl border border-white/5">
              <Wifi className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-[10px] font-mono font-black text-white/60 tracking-widest uppercase">Signal: Encrypted</span>
            </div>
            <button className="p-3 bg-white/5 border border-white/10 rounded-2xl"><Bell className="w-5 h-5 text-white/40" /></button>
          </div>
        </header>

        <Breadcrumbs view={activeView} />

        <main className="max-w-7xl mx-auto pb-32">
          <AnimatePresence mode="wait">
            {activeView === 'missions' && (
              <motion.div
                key="missions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-32"
              >
                <MissionBriefing 
                  title={data.missionTitle} 
                  videoUrl={data.mainVideo} 
                  description={data.missionDescription} 
                />
                <OperationsCenter modules={data.modules} />
              </motion.div>
            )}

            {activeView === 'vault' && (
              <motion.div
                key="vault"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="space-y-20"
              >
                <AudioLibrary modules={data.modules} />
                <DocGallery modules={data.modules} />
              </motion.div>
            )}

            {activeView === 'readiness' && (
              <motion.div
                key="readiness"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <TroopReadiness modules={data.modules} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="border-t border-white/5 py-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-mono font-black text-white/20 tracking-[0.3em] uppercase">
          <div className="flex items-center gap-10">
            <span>Last Sync: {today}</span>
            <span className="text-[#00E5FF]/40">Security Level: Classified</span>
          </div>
          <div className="flex items-center gap-10">
            <span>AERIS OS v2.4</span>
            <span>© {currentYear} // AERIS ACADEMY</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
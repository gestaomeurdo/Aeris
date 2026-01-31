"use client";

import React, { useState, useEffect } from 'react';
import TacticalSidebar from '@/components/TacticalSidebar';
import Breadcrumbs from '@/components/Breadcrumbs';
import MissionBriefing from '@/components/MissionBriefing';
import OperationsCenter from '@/components/OperationsCenter';
import AudioLibrary from '@/components/AudioLibrary';
import DocGallery from '@/components/DocGallery';
import EditorSidebar from '@/components/EditorSidebar';
import { Bell, Wifi } from 'lucide-react';
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
      desc: "Comprehensive development of leadership core values for modern aviation environments and strategic command.", 
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      docUrl: "https://www.africau.edu/images/default/sample.pdf", 
      progress: 85, 
      locked: false 
    },
    { 
      id: "MOD-02", 
      title: "Modernizing Military Learning", 
      desc: "Transformation of legacy document structures into dynamic, high-fidelity digital tactical interfaces.", 
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      docUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", 
      progress: 30, 
      locked: false 
    },
    { 
      id: "MOD-03", 
      title: "The Air Force SNCOs", 
      desc: "Strategic analysis of 'Leaders of Leaders' and the implementation of advanced enlisted command protocols.", 
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      docUrl: "https://pdfobject.com/pdf/sample.pdf", 
      progress: 0, 
      locked: false 
    },
    { 
      id: "MOD-04", 
      title: "Enlisted Ranks & Structure", 
      desc: "Technical mapping of the global Air Force rank hierarchy and operational responsibilities.", 
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
  const [activeView, setActiveView] = useState('dashboard');

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
      
      <TacticalSidebar activeView={activeView} onViewChange={setActiveView} />

      <div className="pl-32 pr-12">
        <header className="pt-12 pb-12 flex justify-between items-center border-b border-white/5 mb-8">
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

        <Breadcrumbs view={activeView} />

        <main className="max-w-7xl mx-auto pb-32">
          <AnimatePresence mode="wait">
            {activeView === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
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

            {activeView === 'missions' && (
              <motion.div
                key="missions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <OperationsCenter modules={data.modules} />
              </motion.div>
            )}

            {activeView === 'audio' && (
              <motion.div
                key="audio"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <AudioLibrary modules={data.modules} />
              </motion.div>
            )}

            {activeView === 'docs' && (
              <motion.div
                key="docs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <DocGallery modules={data.modules} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="pt-20 flex flex-col items-center gap-10 opacity-30 text-[9px] font-mono font-black text-white/20 tracking-[1em] uppercase">
          // END OF LINE // SYSTEM SECURE //
        </footer>
      </div>
    </div>
  );
};

export default Index;
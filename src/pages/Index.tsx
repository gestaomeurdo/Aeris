"use client";

import React, { useState, useEffect } from 'react';
import TacticalSidebar from '@/components/TacticalSidebar';
import Breadcrumbs from '@/components/Breadcrumbs';
import MissionBriefing from '@/components/MissionBriefing';
import OperationsCenter from '@/components/OperationsCenter';
import AudioLibrary from '@/components/AudioLibrary';
import DocGallery from '@/components/DocGallery';
import SecurityProtocol from '@/components/SecurityProtocol';
import OperationalStats from '@/components/OperationalStats';
import AuthTerminal from '@/components/AuthTerminal';
import EditorSidebar from '@/components/EditorSidebar';
import { Bell, Wifi, Plus, Edit3 } from 'lucide-react';
import { PortalData, TrainingModule } from '@/types/portal';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_DATA: PortalData = {
  mainVideo: "https://youtu.be/mQayAWnJQOE",
  missionTitle: "AERIS ACADEMY",
  missionDescription: "Mastering Air Force Leadership and modernizing military tactical learning through digital immersive doctrines.",
  modules: [
    { id: "MOD-01", title: "Mastering Air Force Leadership", desc: "The NCO Core: Comprehensive development of leadership values.", type: "Leadership", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", docUrl: "https://www.africau.edu/images/default/sample.pdf", progress: 100, locked: false },
    { id: "MOD-02", title: "Modernizing Military Learning", desc: "Transformation of legacy structures into high-fidelity interfaces.", type: "Strategy", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", docUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", progress: 85, locked: false },
    { id: "MOD-03", title: "The Air Force SNCOs", desc: "Leaders of Leaders: Implementation of advanced command protocols.", type: "Leadership", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", docUrl: "https://pdfobject.com/pdf/sample.pdf", progress: 40, locked: false },
    { id: "MOD-04", title: "Air Force Enlisted Ranks", desc: "Technical mapping of the global rank hierarchy.", type: "Structure", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", docUrl: "", progress: 20, locked: false },
    { id: "MOD-05", title: "Junior Enlisted Tier", desc: "Unlocking foundational roles and responsibilities.", type: "Structure", audioUrl: "", docUrl: "", progress: 0, locked: false },
    { id: "MOD-06", title: "Tactical Data Analysis", desc: "Advanced intelligence processing and visualization.", type: "Advanced", audioUrl: "", docUrl: "", progress: 0, locked: true },
    { id: "MOD-07", title: "Cyber-Security Protocols", desc: "Defensive digital operations and secure uplink management.", type: "Advanced", audioUrl: "", docUrl: "", progress: 0, locked: true }
  ]
};

const Index = () => {
  const [data, setData] = useState<PortalData>(INITIAL_DATA);
  const [activeView, setActiveView] = useState('dashboard');
  const [isMaster, setIsMaster] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aeris_data_v3');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Matrix corrupt: resetting to initial parameters");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('aeris_data_v3', JSON.stringify(data));
  }, [data]);

  const handleUserClick = () => {
    if (isMaster) {
      if (confirm("Deseja encerrar a sessão do Operador Mike?")) {
        setIsMaster(false);
      }
    } else {
      setIsAuthOpen(true);
    }
  };

  // Funções de Gerenciamento do Mike
  const handleUpdateVideo = () => {
    const url = prompt("Insira a nova URL do vídeo (YouTube ou MP4):", data.mainVideo);
    if (url) setData(prev => ({ ...prev, mainVideo: url }));
  };

  const handleAddModule = () => {
    const title = prompt("Título do novo módulo tático:");
    if (title) {
      const newModule: TrainingModule = {
        id: `MOD-${(data.modules.length + 1).toString().padStart(2, '0')}`,
        title,
        desc: "New tactical asset description required.",
        type: "Advanced",
        audioUrl: "",
        docUrl: "",
        progress: 0,
        locked: true
      };
      setData(prev => ({ ...prev, modules: [...prev.modules, newModule] }));
    }
  };

  const handleDeleteModule = (id: string) => {
    if (confirm(`Deseja remover o módulo ${id} permanentemente?`)) {
      setData(prev => ({ ...prev, modules: prev.modules.filter(m => m.id !== id) }));
    }
  };

  const handleToggleLock = (id: string) => {
    setData(prev => ({
      ...prev,
      modules: prev.modules.map(m => m.id === id ? { ...m, locked: !m.locked } : m)
    }));
  };

  const modulesToDisplay = data.modules.map(mod => ({
    ...mod,
    locked: isMaster ? false : mod.locked
  }));

  return (
    <div className="min-h-screen bg-[#020202] text-[#B0BEC5] font-sans selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      <EditorSidebar data={data} onUpdate={setData} />
      
      <AuthTerminal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onSuccess={() => setIsMaster(true)} 
      />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-[#00E5FF]/5 blur-[120px] rounded-full opacity-30" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>
      
      <TacticalSidebar 
        activeView={activeView} 
        onViewChange={setActiveView} 
        isMaster={isMaster}
        onUserClick={handleUserClick}
      />

      <div className="pl-32 pr-12 relative z-10">
        <header className="pt-12 pb-12 flex justify-between items-center border-b border-white/5 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase">AERIS ACADEMY</h1>
              {isMaster && (
                <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-[9px] font-black text-green-500 uppercase rounded-full tracking-widest animate-pulse">
                  Operator: Mike
                </span>
              )}
            </div>
            <p className="text-[10px] font-mono font-black text-[#00E5FF]/40 uppercase tracking-[0.5em]">System Status: Optimal</p>
          </div>
          <div className="flex items-center gap-6">
            {isMaster && (
              <div className="flex gap-4">
                <button 
                  onClick={handleUpdateVideo}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
                >
                  <Edit3 className="w-3 h-3 text-[#00E5FF]" />
                  Update Video
                </button>
                <button 
                  onClick={handleAddModule}
                  className="flex items-center gap-2 bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/30 px-4 py-2.5 rounded-xl text-[9px] font-black text-[#00E5FF] uppercase tracking-widest transition-all"
                >
                  <Plus className="w-3 h-3" />
                  Add Module
                </button>
              </div>
            )}
            <div className="hidden md:flex items-center gap-6 px-6 py-3 bg-white/[0.03] rounded-2xl border border-white/5">
              <Wifi className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-[10px] font-mono font-black text-white/60 tracking-widest uppercase">Uplink: Synchronized</span>
            </div>
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
                <OperationsCenter 
                  modules={modulesToDisplay} 
                  isMaster={isMaster}
                  onDelete={handleDeleteModule}
                  onToggleLock={handleToggleLock}
                />
              </motion.div>
            )}

            {activeView === 'missions' && (
              <motion.div key="missions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <OperationsCenter 
                  modules={modulesToDisplay} 
                  isMaster={isMaster}
                  onDelete={handleDeleteModule}
                  onToggleLock={handleToggleLock}
                />
              </motion.div>
            )}

            {activeView === 'audio' && (
              <motion.div key="audio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AudioLibrary modules={modulesToDisplay} />
              </motion.div>
            )}

            {activeView === 'docs' && (
              <motion.div key="docs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <DocGallery modules={modulesToDisplay} />
              </motion.div>
            )}

            {activeView === 'stats' && (
              <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <OperationalStats />
              </motion.div>
            )}

            {activeView === 'security' && (
              <motion.div key="security" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <SecurityProtocol isMaster={isMaster} onLogin={setIsMaster} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="pt-20 flex flex-col items-center gap-10 opacity-30 text-[9px] font-mono font-black text-white/20 tracking-[1em] uppercase">
          <div className="flex gap-12">
            <span>ENCRYPTION: AES-256</span>
            <span>LOCAL_SYNC: ACTIVE</span>
          </div>
          // END OF LINE // OPERATIONAL_HUB_v2.0 //
        </footer>
      </div>
    </div>
  );
};

export default Index;
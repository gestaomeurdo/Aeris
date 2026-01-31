"use client";

import React, { useState, useEffect } from 'react';
import TacticalSidebar from '@/components/TacticalSidebar';
import Breadcrumbs from '@/components/Breadcrumbs';
import MissionBriefing from '@/components/MissionBriefing';
import OperationsCenter from '@/components/OperationsCenter';
import AudioLibrary from '@/components/AudioLibrary';
import DocGallery from '@/components/DocGallery';
import SecurityProtocol from '@/components/SecurityProtocol';
import FutureVisionPortal from '@/components/FutureVisionPortal';
import AuthTerminal from '@/components/AuthTerminal';
import EditModuleModal from '@/components/EditModuleModal';
import OperationalStats from '@/components/OperationalStats';
import AddModuleModal from '@/components/AddModuleModal';
import { Bell, Wifi, Plus, Edit3, Search } from 'lucide-react';
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
    { id: "MOD-07", title: "Cyber-Security Protocols", desc: "Defensive digital operations and secure uplink management.", type: "Advanced", audioUrl: "", docUrl: "", progress: 0, locked: true },
  ]
};

const LOCAL_STORAGE_KEY = 'aeris_data_v5';

// Helper function to load initial state from localStorage
const loadInitialData = (): PortalData => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (saved) {
    try {
      const parsedData: PortalData = JSON.parse(saved);
      // Revoke old object URLs if they exist (cleanup simulation)
      parsedData.modules.forEach(mod => {
        if (mod.audioUrl.startsWith('blob:')) URL.revokeObjectURL(mod.audioUrl);
        if (mod.docUrl.startsWith('blob:')) URL.revokeObjectURL(mod.docUrl);
      });
      return parsedData;
    } catch (e) {
      console.error("Matrix corrupt: resetting to initial parameters", e);
      return INITIAL_DATA;
    }
  }
  return INITIAL_DATA;
};

const getNextModuleId = (modules: TrainingModule[]) => {
  // Find the highest existing number to ensure uniqueness
  const maxIdNumber = modules.reduce((max, mod) => {
    const num = parseInt(mod.id.split('-')[1], 10);
    return num > max ? num : max;
  }, 0);
  
  const nextIdNumber = maxIdNumber + 1;
  return `MOD-${nextIdNumber.toString().padStart(2, '0')}`;
};

const Index = () => {
  // Initialize state using the function to load from localStorage immediately
  const [data, setData] = useState<PortalData>(loadInitialData);
  const [activeView, setActiveView] = useState('dashboard');
  const [isMaster, setIsMaster] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<TrainingModule | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // New State for Add Modal

  // Effect to save data whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
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

  const handleUpdateVideo = () => {
    const url = prompt("Insira a nova URL do vídeo (YouTube ou MP4):", data.mainVideo);
    if (url) setData(prev => ({ ...prev, mainVideo: url }));
  };

  // Opens the new Add Module Modal
  const handleAddModule = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveNewModule = (newModuleData: Omit<TrainingModule, 'id'>, file: File | null) => {
    const nextId = getNextModuleId(data.modules);
    
    let audioUrl = newModuleData.audioUrl;
    let docUrl = newModuleData.docUrl;
    
    // Process file and create local URL
    if (file) {
      const url = URL.createObjectURL(file);
      if (file.type === 'audio/mp3' || file.type === 'audio/mpeg') {
        audioUrl = url;
        docUrl = ''; // Ensure only one asset type is set
      } else if (file.type === 'application/pdf') {
        docUrl = url;
        audioUrl = ''; // Ensure only one asset type is set
      }
    }

    const newModule: TrainingModule = {
      ...newModuleData,
      id: nextId,
      audioUrl,
      docUrl,
      progress: 0,
      locked: false,
    };

    setData(prev => ({ ...prev, modules: [...prev.modules, newModule] }));
    // Optionally set the new module for immediate editing
    setEditingModule(newModule);
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

  const handleUpdateModule = (updated: TrainingModule) => {
    setData(prev => ({
      ...prev,
      modules: prev.modules.map(m => m.id === updated.id ? updated : m)
    }));
  };
  
  const handleExitFutureVision = () => {
    setActiveView('dashboard');
  };

  const modulesToDisplay = data.modules.map(mod => ({
    ...mod,
    // Only unlock if isMaster is true
    locked: isMaster ? false : mod.locked
  }));

  const nextModuleId = getNextModuleId(data.modules);

  return (
    <div className="min-h-screen bg-[#020202] text-[#B0BEC5] font-sans selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      <AuthTerminal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onSuccess={() => setIsMaster(true)} 
      />

      <EditModuleModal
        isOpen={!!editingModule}
        onClose={() => setEditingModule(null)}
        module={editingModule}
        onSave={handleUpdateModule}
      />
      
      <AddModuleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNewModule}
        nextId={nextModuleId}
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

      {activeView === 'future' ? (
        <div className="pl-36 relative z-10 min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div key="future-portal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FutureVisionPortal onExit={handleExitFutureVision} />
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div className="pl-36 pr-12 relative z-10">
          <header className="pt-12 pb-12 flex justify-between items-center border-b border-white/5 mb-8">
            <div className="flex items-center gap-8">
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-white tracking-tighter uppercase">AERIS <span className="text-[#00E5FF]">ACADEMY</span></h1>
                <p className="text-[10px] font-mono font-black text-[#00E5FF]/40 uppercase tracking-[0.5em]">System Status: Optimal</p>
              </div>
              <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
              <span className="text-[10px] font-mono text-[#00E5FF] uppercase tracking-widest font-black hidden md:block">
                {isMaster ? 'MASTER_NODE' : 'PUBLIC_ACCESS'}
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative group hidden lg:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-[#00E5FF] transition-colors" size={14} />
                <input 
                  className="bg-white/[0.03] border border-white/5 rounded-full py-2.5 pl-12 pr-6 text-xs w-64 focus:outline-none focus:border-[#00E5FF]/30 transition-all placeholder:text-white/10" 
                  placeholder="Search tactical assets..." 
                />
              </div>

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
                    onClick={handleAddModule} // Updated to open modal
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
                    onEdit={setEditingModule}
                  />
                  <OperationalStats />
                </motion.div>
              )}

              {activeView === 'missions' && (
                <motion.div key="missions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <OperationsCenter 
                    modules={modulesToDisplay} 
                    isMaster={isMaster}
                    onDelete={handleDeleteModule}
                    onToggleLock={handleToggleLock}
                    onEdit={setEditingModule}
                  />
                </motion.div>
              )}

              {activeView === 'audio' && (
                <motion.div key="audio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <AudioLibrary 
                    modules={modulesToDisplay} 
                    isMaster={isMaster}
                    onEdit={setEditingModule}
                    onToggleLock={handleToggleLock}
                    onDelete={handleDeleteModule}
                  />
                </motion.div>
              )}

              {activeView === 'docs' && (
                <motion.div key="docs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <DocGallery 
                    modules={modulesToDisplay} 
                    isMaster={isMaster}
                    onEdit={setEditingModule}
                    onToggleLock={handleToggleLock}
                    onDelete={handleDeleteModule}
                  />
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
      )}
    </div>
  );
};

export default Index;
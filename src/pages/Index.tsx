"use client";

import React, { useState, useEffect } from 'react';
import TacticalSidebar from '@/components/TacticalSidebar';
import StreamingHero from '@/components/StreamingHero';
import StreamingCategory from '@/components/StreamingCategory';
import Breadcrumbs from '@/components/Breadcrumbs';
import MissionModal from '@/components/MissionModal';
import AudioLibrary from '@/components/AudioLibrary';
import DocGallery from '@/components/DocGallery';
import SecurityProtocol from '@/components/SecurityProtocol';
import FutureVisionPortal from '@/components/FutureVisionPortal';
import AuthTerminal from '@/components/AuthTerminal';
import EditModuleModal from '@/components/EditModuleModal';
import { Search, Wifi, Plus, Edit3, Settings, Shield } from 'lucide-react';
import { PortalData, TrainingModule } from '@/types/portal';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_DATA: PortalData = {
  mainVideo: "https://youtu.be/mQayAWnJQOE",
  missionTitle: "AERIS LEARNING INITIATIVE OVERVIEW",
  missionDescription: "Transformando o treinamento estático em inteligência imersiva e pronta para o combate. A revolução digital na formação da Força Aérea.",
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
  const [editingModule, setEditingModule] = useState<TrainingModule | null>(null);
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('aeris_data_v5');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Matrix corrupt: resetting to initial parameters");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('aeris_data_v5', JSON.stringify(data));
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
    const url = prompt("Insira a nova URL do vídeo:", data.mainVideo);
    if (url) setData(prev => ({ ...prev, mainVideo: url }));
  };

  const handleAddModule = () => {
    const title = prompt("Título do novo módulo:");
    if (title) {
      const newModule: TrainingModule = {
        id: `MOD-${(data.modules.length + 1).toString().padStart(2, '0')}`,
        title,
        desc: "Tactical description required.",
        type: "Advanced",
        audioUrl: "",
        docUrl: "",
        progress: 0,
        locked: true
      };
      setData(prev => ({ ...prev, modules: [...prev.modules, newModule] }));
      setEditingModule(newModule);
    }
  };

  const handleDeleteModule = (id: string) => {
    if (confirm(`Remover módulo ${id}?`)) {
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

  const modulesToDisplay = data.modules.map(mod => ({
    ...mod,
    locked: isMaster ? false : mod.locked
  }));

  const categories = [
    { title: "Doutrina de Liderança (NCO/SNCO)", items: modulesToDisplay.filter(m => m.type === 'Leadership' || m.type === 'Strategy') },
    { title: "Estrutura & Operações Táticas", items: modulesToDisplay.filter(m => m.type === 'Structure' || m.type === 'Advanced') }
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-[#B0BEC5] font-sans selection:bg-[#00E5FF]/30 selection:text-white">
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

      <MissionModal 
        isOpen={!!selectedModule}
        onClose={() => setSelectedModule(null)}
        module={selectedModule}
      />

      {/* NAVBAR ESTILO STREAMING */}
      <nav className={`fixed top-0 w-full h-24 px-12 md:px-20 flex items-center justify-between z-[100] transition-all duration-500 ${scrolled ? 'bg-[#020202]/95 backdrop-blur-md border-b border-white/5' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('dashboard')}>
            <Shield className="text-[#00E5FF]" size={32} />
            <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white">Aeris <span className="text-[#00E5FF] not-italic">Academy</span></h1>
          </div>
          <div className="hidden lg:flex gap-8 text-[11px] font-black uppercase tracking-widest text-white/40">
            <button onClick={() => setActiveView('dashboard')} className={`hover:text-[#00E5FF] transition-colors ${activeView === 'dashboard' ? 'text-white' : ''}`}>Home</button>
            <button onClick={() => setActiveView('stats')} className={`hover:text-[#00E5FF] transition-colors ${activeView === 'stats' ? 'text-white' : ''}`}>Vision 2026</button>
            <button onClick={() => setActiveView('audio')} className={`hover:text-[#00E5FF] transition-colors ${activeView === 'audio' ? 'text-white' : ''}`}>Audio Hub</button>
            <button onClick={() => setActiveView('docs')} className={`hover:text-[#00E5FF] transition-colors ${activeView === 'docs' ? 'text-white' : ''}`}>Resources</button>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="relative group hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-[#00E5FF] transition-colors" size={16} />
            <input 
              className="bg-white/5 border border-white/5 rounded-full py-2.5 pl-12 pr-6 text-xs w-64 focus:outline-none focus:border-[#00E5FF]/30 transition-all placeholder:text-white/10 text-white" 
              placeholder="Pesquisar assets..." 
            />
          </div>
          
          {isMaster && (
            <div className="flex gap-4">
              <button onClick={handleUpdateVideo} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/60 transition-all"><Edit3 size={18} /></button>
              <button onClick={handleAddModule} className="p-3 bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 text-[#00E5FF] rounded-xl transition-all"><Plus size={18} /></button>
            </div>
          )}

          <button 
            onClick={handleUserClick} 
            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${isMaster ? 'border-green-500 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'border-white/10 text-white/20 hover:text-white'}`}
          >
            <Settings size={20} />
          </button>
        </div>
      </nav>
      
      <div className="relative">
        <main className="pb-32">
          <AnimatePresence mode="wait">
            {activeView === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-16"
              >
                <StreamingHero 
                  title={data.missionTitle} 
                  description={data.missionDescription} 
                  onWatch={() => setSelectedModule(modulesToDisplay[0])}
                />
                
                <div className="relative z-10 -mt-20 space-y-24">
                  {categories.map((cat, i) => (
                    <StreamingCategory 
                      key={i}
                      title={cat.title}
                      modules={cat.items}
                      onSelect={setSelectedModule}
                      isMaster={isMaster}
                      onEdit={setEditingModule}
                      onDelete={handleDeleteModule}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {activeView === 'audio' && (
              <motion.div key="audio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-40 px-20">
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
              <motion.div key="docs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-40 px-20">
                <DocGallery 
                  modules={modulesToDisplay} 
                  isMaster={isMaster}
                  onEdit={setEditingModule}
                  onToggleLock={handleToggleLock}
                  onDelete={handleDeleteModule}
                />
              </motion.div>
            )}

            {activeView === 'stats' && (
              <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <FutureVisionPortal />
              </motion.div>
            )}

            {activeView === 'security' && (
              <motion.div key="security" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-40 px-20">
                <SecurityProtocol isMaster={isMaster} onLogin={setIsMaster} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="px-20 py-12 border-t border-white/5 bg-black/40 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 text-[9px] font-mono font-black text-white/40 tracking-[0.5em] uppercase">
          <div className="flex gap-12">
            <span>AERIS ACADEMY v2.6</span>
            <span>UPLINK: ENCRYPTED</span>
          </div>
          <div className="flex gap-8">
            <span>// END OF LINE //</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
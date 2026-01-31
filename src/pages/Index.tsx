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
import { Wifi, Plus, Edit3, Search, Trash2 } from 'lucide-react';
import { PortalData, TrainingModule } from '@/types/portal';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'aeris_content_data';

const DEFAULT_DATA: PortalData = {
  mainVideo: "https://youtu.be/mQayAWnJQOE",
  missionTitle: "AERIS ACADEMY",
  missionDescription: "Mastering Air Force Leadership and modernizing military tactical learning through digital immersive doctrines.",
  modules: [
    { id: "MOD-01", title: "Mastering Air Force Leadership", desc: "The NCO Core: Comprehensive development of leadership values.", type: "Leadership", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", docUrl: "https://www.africau.edu/images/default/sample.pdf", progress: 100, locked: false },
    { id: "MOD-02", title: "Modernizing Military Learning", desc: "Transformation of legacy structures into high-fidelity interfaces.", type: "Strategy", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", docUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", progress: 85, locked: false },
    { id: "MOD-03", title: "The Air Force SNCOs", desc: "Leaders of Leaders: Implementation of advanced command protocols.", type: "Leadership", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", docUrl: "https://pdfobject.com/pdf/sample.pdf", progress: 40, locked: false },
  ]
};

const Index = () => {
  // LÓGICA DE CARREGAMENTO ULTRA-ESTRITA
  const [data, setData] = useState<PortalData>(() => {
    if (typeof window === 'undefined') return DEFAULT_DATA;
    
    const saved = window.localStorage.getItem(STORAGE_KEY);
    
    // Se saved for null (NUNCA EXISTIU), usa default.
    // Se for "[]" ou "{...modules: []}", ele DEVE usar o valor salvo.
    if (saved === null) {
      return DEFAULT_DATA;
    }
    
    try {
      return JSON.parse(saved);
    } catch (e) {
      return DEFAULT_DATA;
    }
  });

  const [isMaster, setIsMaster] = useState(true); // Sempre Admin para testes
  const [activeView, setActiveView] = useState('dashboard');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<TrainingModule | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // SALVAMENTO IMEDIATO EM QUALQUER MUDANÇA
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const handlePurgeDatabase = () => {
    if (confirm("ATENÇÃO: Isso apagará TODOS os módulos permanentemente. Confirmar?")) {
      setData(prev => ({
        ...prev,
        modules: []
      }));
    }
  };

  const handleUpdateVideo = () => {
    const url = prompt("Nova URL do vídeo:", data.mainVideo);
    if (url) setData(prev => ({ ...prev, mainVideo: url }));
  };

  const handleAddModule = () => {
    setIsAddModalOpen(true);
  };

  const getNextModuleId = (modules: TrainingModule[]) => {
    if (modules.length === 0) return "MOD-01";
    const maxIdNumber = modules.reduce((max, mod) => {
      const parts = mod.id.split('-');
      const num = parts.length >= 2 ? parseInt(parts[1], 10) : 0;
      return !isNaN(num) && num > max ? num : max;
    }, 0);
    return `MOD-${(maxIdNumber + 1).toString().padStart(2, '0')}`;
  };

  const handleSaveNewModule = (newModuleData: Omit<TrainingModule, 'id'>, file: File | null) => {
    const nextId = getNextModuleId(data.modules);
    let audioUrl = newModuleData.audioUrl;
    let docUrl = newModuleData.docUrl;
    
    if (file) {
      const url = URL.createObjectURL(file);
      if (file.type.startsWith('audio/')) { audioUrl = url; docUrl = ''; }
      else if (file.type === 'application/pdf') { docUrl = url; audioUrl = ''; }
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
  };

  const handleDeleteModule = (id: string) => {
    if (confirm(`Remover módulo ${id}?`)) {
      setData(prev => ({
        ...prev,
        modules: prev.modules.filter(m => m.id !== id)
      }));
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

  return (
    <div className="min-h-screen bg-[#020202] text-[#B0BEC5] font-sans selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      <AuthTerminal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onSuccess={() => setIsMaster(true)} />
      <EditModuleModal isOpen={!!editingModule} onClose={() => setEditingModule(null)} module={editingModule} onSave={handleUpdateModule} />
      <AddModuleModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleSaveNewModule} nextId={getNextModuleId(data.modules)} />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-[#00E5FF]/5 blur-[120px] rounded-full opacity-30" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>
      
      <TacticalSidebar activeView={activeView} onViewChange={setActiveView} isMaster={isMaster} onUserClick={() => setIsMaster(!isMaster)} />

      <div className="pl-36 pr-12 relative z-10">
        <header className="pt-12 pb-12 flex justify-between items-center border-b border-white/5 mb-8">
          <div className="flex items-center gap-8">
            <div className="space-y-1">
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase">AERIS <span className="text-[#00E5FF]">ACADEMY</span></h1>
              <p className="text-[10px] font-mono font-black text-[#00E5FF]/40 uppercase tracking-[0.5em]">Persistence: Solid State</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* CONTROLES TÉCNICOS VISÍVEIS PARA VOCÊ */}
            <button 
              onClick={handlePurgeDatabase}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
            >
              <Trash2 size={12} /> PURGE ALL
            </button>
            <button onClick={handleUpdateVideo} className="bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-white/10">Video URL</button>
            <button onClick={handleAddModule} className="bg-[#00E5FF]/10 hover:bg-[#00E5FF] hover:text-black px-4 py-2.5 rounded-xl text-[9px] font-black text-[#00E5FF] uppercase tracking-widest transition-all border border-[#00E5FF]/30">+ New Module</button>
            
            <div className="hidden md:flex items-center gap-4 px-6 py-3 bg-white/[0.03] rounded-2xl border border-white/5">
              <Wifi className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-[10px] font-mono font-black text-white/60 uppercase">Live Sync</span>
            </div>
          </div>
        </header>

        <Breadcrumbs view={activeView} />

        <main className="max-w-7xl mx-auto pb-32">
          {activeView === 'future' ? (
             <FutureVisionPortal onExit={() => setActiveView('dashboard')} />
          ) : (
            <AnimatePresence mode="wait">
              {activeView === 'dashboard' && (
                <motion.div key="db" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-32">
                  <MissionBriefing title={data.missionTitle} videoUrl={data.mainVideo} description={data.missionDescription} />
                  <OperationsCenter modules={modulesToDisplay} isMaster={isMaster} onDelete={handleDeleteModule} onToggleLock={handleToggleLock} onEdit={setEditingModule} />
                  <OperationalStats />
                </motion.div>
              )}
              {activeView === 'missions' && <OperationsCenter modules={modulesToDisplay} isMaster={isMaster} onDelete={handleDeleteModule} onToggleLock={handleToggleLock} onEdit={setEditingModule} />}
              {activeView === 'audio' && <AudioLibrary modules={modulesToDisplay} isMaster={isMaster} onEdit={setEditingModule} onToggleLock={handleToggleLock} onDelete={handleDeleteModule} />}
              {activeView === 'docs' && <DocGallery modules={modulesToDisplay} isMaster={isMaster} onEdit={setEditingModule} onToggleLock={handleToggleLock} onDelete={handleDeleteModule} />}
            </AnimatePresence>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
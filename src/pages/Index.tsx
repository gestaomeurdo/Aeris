"use client";

import React, { useState, useEffect, useCallback } from 'react';
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
import { Wifi, Plus, Edit3, Search, Trash2, Database, RefreshCw } from 'lucide-react';
import { PortalData, TrainingModule } from '@/types/portal';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'aeris_portal_v3_final'; // Nova chave para garantir limpeza de caches antigos

const INITIAL_DEMO_DATA: PortalData = {
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
  // 1. CARREGAMENTO INICIAL RÍGIDO
  const [data, setData] = useState<PortalData>(() => {
    if (typeof window === 'undefined') return INITIAL_DEMO_DATA;
    const saved = localStorage.getItem(STORAGE_KEY);
    
    if (saved === null) {
      console.log("DATABASE: No record found. Seeding defaults.");
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_DATA));
      return INITIAL_DEMO_DATA;
    }
    
    try {
      const parsed = JSON.parse(saved);
      console.log("DATABASE: Record found. Modules count:", parsed.modules?.length);
      return parsed;
    } catch (e) {
      console.error("DATABASE: Corrupt record found. Resetting.");
      return INITIAL_DEMO_DATA;
    }
  });

  // MODO DESENVOLVEDOR: IsMaster é sempre TRUE para você gerenciar tudo
  const [isMaster, setIsMaster] = useState(true); 
  const [activeView, setActiveView] = useState('dashboard');
  const [editingModule, setEditingModule] = useState<TrainingModule | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // 2. FUNÇÃO DE SALVAMENTO ATÔMICO (Garante que o localStorage atualize ANTES do refresh)
  const saveToStorage = useCallback((newData: PortalData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    console.log("DATABASE: Synchronized. Saved modules:", newData.modules.length);
  }, []);

  // Sincroniza estado com armazenamento sempre que 'data' mudar
  useEffect(() => {
    saveToStorage(data);
  }, [data, saveToStorage]);

  const handlePurgeAll = () => {
    if (confirm("FORCE WIPE: Deletar TODOS os módulos permanentemente? Isso não pode ser desfeito.")) {
      const emptyData = { ...data, modules: [] };
      setData(emptyData);
      saveToStorage(emptyData);
    }
  };

  const handleResetToDefaults = () => {
    if (confirm("FACTORY RESET: Restaurar os módulos de demonstração?")) {
      setData(INITIAL_DEMO_DATA);
      saveToStorage(INITIAL_DEMO_DATA);
    }
  };

  const handleDeleteModule = (id: string) => {
    if (confirm(`Remover módulo ${id}?`)) {
      const newData = {
        ...data,
        modules: data.modules.filter(m => m.id !== id)
      };
      setData(newData);
      saveToStorage(newData);
    }
  };

  const handleSaveNewModule = (newModuleData: Omit<TrainingModule, 'id'>, file: File | null) => {
    const nextIdNumber = data.modules.length > 0 
      ? Math.max(...data.modules.map(m => parseInt(m.id.split('-')[1] || "0"))) + 1 
      : 1;
    const nextId = `MOD-${nextIdNumber.toString().padStart(2, '0')}`;
    
    let audioUrl = newModuleData.audioUrl;
    let docUrl = newModuleData.docUrl;
    
    if (file) {
      const url = URL.createObjectURL(file);
      if (file.type.startsWith('audio/')) { audioUrl = url; docUrl = ''; }
      else if (file.type === 'application/pdf') { docUrl = url; audioUrl = ''; }
    }

    const newModule: TrainingModule = { ...newModuleData, id: nextId, audioUrl, docUrl, progress: 0, locked: false };
    const newData = { ...data, modules: [...data.modules, newModule] };
    setData(newData);
    saveToStorage(newData);
  };

  const handleUpdateModule = (updated: TrainingModule) => {
    const newData = {
      ...data,
      modules: data.modules.map(m => m.id === updated.id ? updated : m)
    };
    setData(newData);
    saveToStorage(newData);
  };

  const handleToggleLock = (id: string) => {
    const newData = {
      ...data,
      modules: data.modules.map(m => m.id === id ? { ...m, locked: !m.locked } : m)
    };
    setData(newData);
    saveToStorage(newData);
  };

  const modulesToDisplay = data.modules.map(mod => ({
    ...mod,
    locked: isMaster ? false : mod.locked
  }));

  return (
    <div className="min-h-screen bg-[#020202] text-[#B0BEC5] font-sans selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      <EditModuleModal isOpen={!!editingModule} onClose={() => setEditingModule(null)} module={editingModule} onSave={handleUpdateModule} />
      <AddModuleModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleSaveNewModule} nextId={`MOD-${(data.modules.length + 1).toString().padStart(2, '0')}`} />

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
              <p className="text-[10px] font-mono font-black text-[#00E5FF]/40 uppercase tracking-[0.5em]">Persistence Level: Absolute</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* CONTROLES DE DESENVOLVEDOR AGORA SEMPRE VISÍVEIS */}
            <button 
              onClick={handlePurgeAll}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
            >
              <Trash2 size={12} /> Purge Database
            </button>
            <button 
              onClick={handleResetToDefaults}
              className="flex items-center gap-2 bg-amber-500/10 hover:bg-amber-600 text-amber-500 hover:text-white border border-amber-500/20 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
            >
              <RefreshCw size={12} /> Factory Reset
            </button>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#00E5FF]/10 hover:bg-[#00E5FF] hover:text-black px-4 py-2.5 rounded-xl text-[9px] font-black text-[#00E5FF] uppercase tracking-widest transition-all border border-[#00E5FF]/30"
            >
              + Add Module
            </button>
            
            <div className="hidden md:flex items-center gap-4 px-6 py-3 bg-white/[0.03] rounded-2xl border border-white/5">
              <Database className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-[10px] font-mono font-black text-white/60 uppercase">DB: {data.modules.length} Assets</span>
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
                <OperationsCenter 
                  modules={modulesToDisplay} 
                  isMaster={isMaster} 
                  onDelete={handleDeleteModule} 
                  onToggleLock={handleToggleLock} 
                  onEdit={setEditingModule} 
                />
              )}
              
              {activeView === 'audio' && (
                <AudioLibrary 
                  modules={modulesToDisplay} 
                  isMaster={isMaster} 
                  onEdit={setEditingModule} 
                  onToggleLock={handleToggleLock} 
                  onDelete={handleDeleteModule} 
                />
              )}
              
              {activeView === 'docs' && (
                <DocGallery 
                  modules={modulesToDisplay} 
                  isMaster={isMaster} 
                  onEdit={setEditingModule} 
                  onToggleLock={handleToggleLock} 
                  onDelete={handleDeleteModule} 
                />
              )}
            </AnimatePresence>
          )}
        </main>
      </div>

      {/* PAINEL DE DEBUG INVISÍVEL NO TOPO - ÚTIL PARA VOCÊ CONFERIR NO CONSOLE (F12) */}
      <footer className="py-10 text-center opacity-10 text-[8px] font-mono tracking-widest hover:opacity-100 transition-opacity">
        LOCAL_STORAGE_HASH: {STORAGE_KEY} | MODULE_COUNT: {data.modules.length}
      </footer>
    </div>
  );
};

export default Index;
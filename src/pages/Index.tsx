"use client";

import React, { useState, useEffect, useCallback } from 'react';
import TacticalSidebar from '@/components/TacticalSidebar';
import Breadcrumbs from '@/components/Breadcrumbs';
import MissionBriefing from '@/components/MissionBriefing';
import OperationsCenter from '@/components/OperationsCenter';
import AudioLibrary from '@/components/AudioLibrary';
import DocGallery from '@/components/DocGallery';
import FutureVisionPortal from '@/components/FutureVisionPortal';
import EditModuleModal from '@/components/EditModuleModal';
import OperationalStats from '@/components/OperationalStats';
import AddModuleModal from '@/components/AddModuleModal';
import { Database, Trash2, RefreshCw } from 'lucide-react';
import { PortalData, TrainingModule } from '@/types/portal';
import { AnimatePresence, motion } from 'framer-motion';

const STORAGE_KEY = 'aeris_final_storage_v5';

// AGORA O PADRÃO É VAZIO. NÃO TEM MAIS NADA ESCRITO AQUI.
const EMPTY_PORTAL_DATA: PortalData = {
  mainVideo: "https://youtu.be/mQayAWnJQOE",
  missionTitle: "AERIS ACADEMY",
  missionDescription: "Configure seu centro de comando adicionando novos módulos táticos.",
  modules: [] // VAZIO NO CÓDIGO-FONTE
};

const Index = () => {
  const [data, setData] = useState<PortalData>(() => {
    if (typeof window === 'undefined') return EMPTY_PORTAL_DATA;
    const saved = localStorage.getItem(STORAGE_KEY);
    try {
      return saved ? JSON.parse(saved) : EMPTY_PORTAL_DATA;
    } catch (e) {
      return EMPTY_PORTAL_DATA;
    }
  });

  const [isMaster, setIsMaster] = useState(true); 
  const [activeView, setActiveView] = useState('dashboard');
  const [editingModule, setEditingModule] = useState<TrainingModule | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const handlePurgeAll = () => {
    if (confirm("Apagar tudo?")) {
      setData(EMPTY_PORTAL_DATA);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(EMPTY_PORTAL_DATA));
    }
  };

  const handleSaveNewModule = (newModuleData: Omit<TrainingModule, 'id'>, file: File | null) => {
    const nextId = `MOD-${(data.modules.length + 1).toString().padStart(2, '0')}`;
    let audioUrl = newModuleData.audioUrl;
    let docUrl = newModuleData.docUrl;
    
    if (file) {
      const url = URL.createObjectURL(file);
      if (file.type.startsWith('audio/')) { audioUrl = url; docUrl = ''; }
      else if (file.type === 'application/pdf') { docUrl = url; audioUrl = ''; }
    }

    const newModule: TrainingModule = { ...newModuleData, id: nextId, audioUrl, docUrl, progress: 0, locked: false };
    setData(prev => ({ ...prev, modules: [...prev.modules, newModule] }));
  };

  const handleDeleteModule = (id: string) => {
    setData(prev => ({ ...prev, modules: prev.modules.filter(m => m.id !== id) }));
  };

  const handleUpdateModule = (updated: TrainingModule) => {
    setData(prev => ({ ...prev, modules: prev.modules.map(m => m.id === updated.id ? updated : m) }));
  };

  const handleToggleLock = (id: string) => {
    setData(prev => ({ ...prev, modules: prev.modules.map(m => m.id === id ? { ...m, locked: !m.locked } : m) }));
  };

  return (
    <div className="min-h-screen bg-[#020202] text-[#B0BEC5] font-sans overflow-x-hidden">
      <EditModuleModal isOpen={!!editingModule} onClose={() => setEditingModule(null)} module={editingModule} onSave={handleUpdateModule} />
      <AddModuleModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleSaveNewModule} nextId={`MOD-${(data.modules.length + 1).toString().padStart(2, '0')}`} />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-[#00E5FF]/5 blur-[120px] rounded-full opacity-30" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>
      
      <TacticalSidebar activeView={activeView} onViewChange={setActiveView} isMaster={isMaster} onUserClick={() => setIsMaster(!isMaster)} />

      <div className="pl-36 pr-12 relative z-10">
        <header className="pt-12 pb-12 flex justify-between items-center border-b border-white/5 mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">AERIS <span className="text-[#00E5FF]">ACADEMY</span></h1>
            <p className="text-[10px] font-mono text-[#00E5FF]/40 uppercase tracking-[0.5em]">Status: Ready</p>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={handlePurgeAll} className="flex items-center gap-2 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">
              <Trash2 size={14} /> Limpar Tudo
            </button>
            <button onClick={() => setIsAddModalOpen(true)} className="bg-[#00E5FF] text-black px-8 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all hover:scale-105">
              + Novo Módulo
            </button>
            <div className="flex items-center gap-4 px-6 py-3 bg-white/[0.03] rounded-2xl border border-white/5">
              <Database className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-[10px] font-mono font-black text-white/60 uppercase">{data.modules.length} Módulos</span>
            </div>
          </div>
        </header>

        <Breadcrumbs view={activeView} />

        <main className="max-w-7xl mx-auto pb-32">
          {activeView === 'future' ? (
             <FutureVisionPortal onExit={() => setActiveView('dashboard')} />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={activeView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {activeView === 'dashboard' && (
                  <div className="space-y-32">
                    <MissionBriefing title={data.missionTitle} videoUrl={data.mainVideo} description={data.missionDescription} />
                    <OperationsCenter modules={data.modules} isMaster={isMaster} onDelete={handleDeleteModule} onToggleLock={handleToggleLock} onEdit={setEditingModule} />
                    <OperationalStats />
                  </div>
                )}
                {activeView === 'missions' && <OperationsCenter modules={data.modules} isMaster={isMaster} onDelete={handleDeleteModule} onToggleLock={handleToggleLock} onEdit={setEditingModule} />}
                {activeView === 'audio' && <AudioLibrary modules={data.modules} isMaster={isMaster} onEdit={setEditingModule} onToggleLock={handleToggleLock} onDelete={handleDeleteModule} />}
                {activeView === 'docs' && <DocGallery modules={data.modules} isMaster={isMaster} onEdit={setEditingModule} onToggleLock={handleToggleLock} onDelete={handleDeleteModule} />}
              </motion.div>
            </AnimatePresence>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
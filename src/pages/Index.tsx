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
import { Wifi, Plus, Trash2, Database, RefreshCw } from 'lucide-react';
import { PortalData, TrainingModule } from '@/types/portal';
import { AnimatePresence, motion } from 'framer-motion';

// CHAVES ÚNICAS PARA ESTA VERSÃO
const STORAGE_KEY = 'aeris_master_db_v4';
const INIT_KEY = 'aeris_db_initialized_v4';

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
  // LÓGICA DE CARREGAMENTO COM TRAVA DE SEGURANÇA
  const [data, setData] = useState<PortalData>(() => {
    if (typeof window === 'undefined') return INITIAL_DEMO_DATA;

    const hasBeenInitialized = localStorage.getItem(INIT_KEY);
    const savedData = localStorage.getItem(STORAGE_KEY);

    // SE JÁ FOI INICIALIZADO UMA VEZ NA VIDA DESTE NAVEGADOR
    if (hasBeenInitialized === 'true') {
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          console.log("DATABASE: Carregando dados do usuário. Módulos:", parsed.modules.length);
          return parsed;
        } catch (e) {
          console.error("DATABASE: Erro ao ler dados. Mantendo vazio.");
        }
      }
      // Se já inicializou mas não tem dados (ou deu erro), retorna a estrutura vazia, NÃO os defaults
      return { ...INITIAL_DEMO_DATA, modules: [] };
    }

    // SE É A PRIMEIRA VEZ ABSOLUTA (NUNCA VIU O APP)
    console.log("DATABASE: Primeira execução. Semeando dados iniciais.");
    localStorage.setItem(INIT_KEY, 'true');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_DATA));
    return INITIAL_DEMO_DATA;
  });

  const [isMaster, setIsMaster] = useState(true); 
  const [activeView, setActiveView] = useState('dashboard');
  const [editingModule, setEditingModule] = useState<TrainingModule | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Sincronização Atômica
  const syncToDisk = useCallback((newData: PortalData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    console.log("DISK_SYNC: Salvo com sucesso. Assets:", newData.modules.length);
  }, []);

  // Efeito de persistência em cada mudança
  useEffect(() => {
    syncToDisk(data);
  }, [data, syncToDisk]);

  const handlePurgeAll = () => {
    if (confirm("Deseja apagar TUDO? A trava de inicialização impedirá que os dados voltem.")) {
      const empty = { ...data, modules: [] };
      setData(empty);
      syncToDisk(empty);
    }
  };

  const handleResetDefaults = () => {
    if (confirm("Restaurar dados de demonstração?")) {
      setData(INITIAL_DEMO_DATA);
      syncToDisk(INITIAL_DEMO_DATA);
    }
  };

  const handleDeleteModule = (id: string) => {
    if (confirm(`Excluir ${id}?`)) {
      const updated = { ...data, modules: data.modules.filter(m => m.id !== id) };
      setData(updated);
      syncToDisk(updated);
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
    const updated = { ...data, modules: [...data.modules, newModule] };
    setData(updated);
    syncToDisk(updated);
  };

  const handleUpdateModule = (updated: TrainingModule) => {
    const newData = { ...data, modules: data.modules.map(m => m.id === updated.id ? updated : m) };
    setData(newData);
    syncToDisk(newData);
  };

  const handleToggleLock = (id: string) => {
    const newData = { ...data, modules: data.modules.map(m => m.id === id ? { ...m, locked: !m.locked } : m) };
    setData(newData);
    syncToDisk(newData);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-[#B0BEC5] font-sans overflow-x-hidden selection:bg-[#00E5FF] selection:text-black">
      <EditModuleModal isOpen={!!editingModule} onClose={() => setEditingModule(null)} module={editingModule} onSave={handleUpdateModule} />
      <AddModuleModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleSaveNewModule} nextId={`MOD-${(data.modules.length + 1).toString().padStart(2, '0')}`} />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-[#00E5FF]/5 blur-[120px] rounded-full opacity-30" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>
      
      <TacticalSidebar activeView={activeView} onViewChange={setActiveView} isMaster={isMaster} onUserClick={() => setIsMaster(!isMaster)} />

      <div className="pl-36 pr-12 relative z-10">
        <header className="pt-12 pb-12 flex justify-between items-center border-b border-white/5 mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">AERIS <span className="text-[#00E5FF]">ACADEMY</span></h1>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-black text-[#00E5FF]/40 uppercase tracking-[0.5em]">Persistence: Locked</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={handlePurgeAll} className="flex items-center gap-2 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">
              <Trash2 size={12} /> Purge DB
            </button>
            <button onClick={handleResetDefaults} className="flex items-center gap-2 bg-amber-500/10 hover:bg-amber-600 text-amber-500 hover:text-white border border-amber-500/20 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">
              <RefreshCw size={12} /> Reset Demo
            </button>
            <button onClick={() => setIsAddModalOpen(true)} className="bg-[#00E5FF]/10 hover:bg-[#00E5FF] hover:text-black px-6 py-2.5 rounded-xl text-[9px] font-black text-[#00E5FF] uppercase tracking-widest transition-all border border-[#00E5FF]/30">
              + New Asset
            </button>
            
            <div className="flex items-center gap-4 px-6 py-3 bg-white/[0.03] rounded-2xl border border-white/5">
              <Database className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-[10px] font-mono font-black text-white/60 uppercase">Assets: {data.modules.length}</span>
            </div>
          </div>
        </header>

        <Breadcrumbs view={activeView} />

        <main className="max-w-7xl mx-auto pb-32">
          {activeView === 'future' ? (
             <FutureVisionPortal onExit={() => setActiveView('dashboard')} />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeView === 'dashboard' && (
                  <div className="space-y-32">
                    <MissionBriefing title={data.missionTitle} videoUrl={data.mainVideo} description={data.missionDescription} />
                    <OperationsCenter modules={data.modules} isMaster={isMaster} onDelete={handleDeleteModule} onToggleLock={handleToggleLock} onEdit={setEditingModule} />
                    <OperationalStats />
                  </div>
                )}
                
                {activeView === 'missions' && (
                  <OperationsCenter modules={data.modules} isMaster={isMaster} onDelete={handleDeleteModule} onToggleLock={handleToggleLock} onEdit={setEditingModule} />
                )}
                
                {activeView === 'audio' && (
                  <AudioLibrary modules={data.modules} isMaster={isMaster} onEdit={setEditingModule} onToggleLock={handleToggleLock} onDelete={handleDeleteModule} />
                )}
                
                {activeView === 'docs' && (
                  <DocGallery modules={data.modules} isMaster={isMaster} onEdit={setEditingModule} onToggleLock={handleToggleLock} onDelete={handleDeleteModule} />
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </main>
      </div>

      <footer className="py-20 text-center opacity-10 text-[8px] font-mono tracking-widest uppercase pointer-events-none">
        DB_ID: {STORAGE_KEY} | PERSISTENCE_ACTIVE
      </footer>
    </div>
  );
};

export default Index;
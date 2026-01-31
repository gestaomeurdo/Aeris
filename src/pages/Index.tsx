"use client";

import React, { useState, useEffect } from 'react';
import TacticalSidebar from '@/components/TacticalSidebar';
import Breadcrumbs from '@/components/Breadcrumbs';
import MissionBriefing from '@/components/MissionBriefing';
import OperationsCenter from '@/components/OperationsCenter';
import AudioLibrary from '@/components/AudioLibrary';
import DocGallery from '@/components/DocGallery';
import EditModuleModal from '@/components/EditModuleModal';
import OperationalStats from '@/components/OperationalStats';
import AddModuleModal from '@/components/AddModuleModal';
import EditMainBriefingModal from '@/components/EditMainBriefingModal';
import AuthTerminal from '@/components/AuthTerminal';
import { Database, Loader2, Settings2 } from 'lucide-react';
import { PortalData, TrainingModule } from '@/types/portal';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSession } from '@/contexts/SessionContext';

const Index = () => {
  const { isMaster, isLoading: isAuthLoading, logout } = useSession();
  
  const [data, setData] = useState<PortalData>({
    mainVideo: "https://youtu.be/mQayAWnJQOE",
    missionTitle: "AERIS ACADEMY",
    missionDescription: "Adaptive Education through Responsive & Intelligent Systems",
    modules: []
  });

  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [editingModule, setEditingModule] = useState<TrainingModule | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditMainModalOpen, setIsEditMainModalOpen] = useState(false);
  const [isAuthTerminalOpen, setIsAuthTerminalOpen] = useState(false);

  useEffect(() => { 
    const savedBriefing = localStorage.getItem('aeris_main_briefing');
    if (savedBriefing) {
      const parsed = JSON.parse(savedBriefing);
      setData(prev => ({
        ...prev,
        mainVideo: parsed.video,
        missionTitle: parsed.title,
        missionDescription: parsed.description
      }));
    }
    
    if (!isAuthLoading) {
      fetchModules(); 
    }
  }, [isAuthLoading]);

  const fetchModules = async () => {
    setIsLoading(true);
    const { data: modules, error } = await supabase
      .from('training_modules')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      toast.error("Erro ao carregar módulos");
    } else {
      const mappedModules: TrainingModule[] = (modules || []).map(m => ({
        id: m.module_id,
        dbId: m.id,
        title: m.title,
        desc: m.desc_text,
        type: m.type as any,
        category: (m.category as any) || 'module',
        audioUrl: m.audio_url || '',
        docUrl: m.doc_url || '',
        coverUrl: m.cover_url || '',
        progress: m.progress,
        locked: m.locked
      }));
      setData(prev => ({ ...prev, modules: mappedModules }));
    }
    setIsLoading(false);
  };

  const uploadFile = async (file: File, bucketPath: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `${bucketPath}/${fileName}`;
    
    const { error: uploadError } = await supabase.storage.from('assets').upload(filePath, file);
    if (uploadError) throw uploadError;
    
    const { data: { publicUrl } } = supabase.storage.from('assets').getPublicUrl(filePath);
    return publicUrl;
  };

  const handleSaveNewModule = async (newModuleData: Omit<TrainingModule, 'id' | 'dbId' | 'progress' | 'coverUrl'>, files: { audio?: File, doc?: File, cover?: File }) => {
    if (!isMaster) {
      toast.error("Acesso negado.");
      return;
    }
    
    const nextId = `ASSET-${(data.modules.length + 1).toString().padStart(2, '0')}`;
    const toastId = toast.loading("Implantando assets...");
    
    try {
      let audioUrl = '';
      let docUrl = '';
      let coverUrl = '';

      if (files.audio) audioUrl = await uploadFile(files.audio, 'audio');
      if (files.doc) docUrl = await uploadFile(files.doc, 'docs');
      if (files.cover) coverUrl = await uploadFile(files.cover, 'covers'); 

      const { error } = await supabase
        .from('training_modules')
        .insert([{
          module_id: nextId,
          title: newModuleData.title,
          desc_text: newModuleData.desc,
          type: newModuleData.type,
          category: newModuleData.category,
          audio_url: audioUrl,
          doc_url: docUrl,
          cover_url: coverUrl, 
          progress: 0,
          locked: false
        }]);

      if (error) throw error;
      toast.success("Asset implantado com sucesso", { id: toastId });
      fetchModules();
    } catch (err: any) {
      toast.error(`Falha na missão: ${err.message}`, { id: toastId });
    }
  };

  const handleUpdateModule = async (updated: TrainingModule, files: { audio?: File, doc?: File, cover?: File }) => {
    if (!isMaster) {
      toast.error("Acesso negado.");
      return;
    }
    
    const toastId = toast.loading("Atualizando assets...");
    try {
      let audioUrl = updated.audioUrl;
      let docUrl = updated.docUrl;
      let coverUrl = updated.coverUrl; 

      if (files.audio) audioUrl = await uploadFile(files.audio, 'audio');
      if (files.doc) docUrl = await uploadFile(files.doc, 'docs');
      if (files.cover) coverUrl = await uploadFile(files.cover, 'covers'); 

      const { error } = await supabase
        .from('training_modules')
        .update({
          title: updated.title,
          desc_text: updated.desc,
          progress: updated.progress,
          locked: updated.locked,
          audio_url: audioUrl,
          doc_url: docUrl,
          cover_url: coverUrl 
        })
        .eq('module_id', updated.id);
      if (error) throw error;
      toast.success("Asset atualizado", { id: toastId });
      fetchModules();
    } catch (err: any) {
      toast.error(`Falha na atualização: ${err.message}`, { id: toastId });
    }
  };

  const handleDeleteModule = async (id: string) => {
    if (!isMaster) return;
    const { error } = await supabase.from('training_modules').delete().eq('module_id', id);
    if (error) toast.error("Erro ao deletar");
    else { toast.success("Removido com sucesso"); fetchModules(); }
  };

  const handleToggleLock = async (id: string) => {
    if (!isMaster) return;
    const mod = data.modules.find(m => m.id === id);
    if (!mod) return;
    const { error } = await supabase.from('training_modules').update({ locked: !mod.locked }).eq('module_id', id);
    if (error) toast.error("Erro ao alterar trava");
    else fetchModules();
  };
  
  const handleLogout = async () => {
    await logout();
    window.location.reload(); // Recarregar para limpar estados residuais
  };

  const manualModules = data.modules.filter(m => m.category === 'module');
  const podcastModules = data.modules.filter(m => m.category === 'podcast');

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020202]">
        <Loader2 className="w-12 h-12 text-[#00E5FF] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-[#B0BEC5] font-sans overflow-x-hidden">
      <EditModuleModal isOpen={!!editingModule} onClose={() => setEditingModule(null)} module={editingModule} onSave={handleUpdateModule} />
      <AddModuleModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleSaveNewModule} nextId={`ASSET-${(data.modules.length + 1).toString().padStart(2, '0')}`} />
      
      <EditMainBriefingModal 
        isOpen={isEditMainModalOpen} 
        onClose={() => setIsEditMainModalOpen(false)} 
        currentData={{
          title: data.missionTitle,
          video: data.mainVideo,
          description: data.missionDescription
        }}
        onSave={(newData) => {
          if (!isMaster) return;
          setData(prev => ({ ...prev, missionTitle: newData.title, mainVideo: newData.video, missionDescription: newData.description }));
          localStorage.setItem('aeris_main_briefing', JSON.stringify(newData));
          toast.success("Briefing atualizado");
        }}
      />
      
      <AuthTerminal 
        isOpen={isAuthTerminalOpen} 
        onClose={() => setIsAuthTerminalOpen(false)} 
        onSuccess={() => {}} 
      />

      <div className="fixed inset-0 pointer-events-none z-0"><div className="absolute inset-0 bg-grid-pattern opacity-5" /></div>
      <TacticalSidebar 
        activeView={activeView} 
        onViewChange={setActiveView} 
        isMaster={isMaster} 
        onUserClick={isMaster ? handleLogout : () => setIsAuthTerminalOpen(true)} 
      />
      
      <div className="pl-36 pr-12 relative z-10">
        <header className="pt-12 pb-12 flex justify-between items-center border-b border-white/5 mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-white uppercase">AERIS <span className="text-[#00E5FF]">ACADEMY</span></h1>
            <div className="flex items-center gap-2"><div className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-amber-500 animate-pulse' : 'bg-[#00E5FF]'}`} /></div>
          </div>
          {isMaster && (
            <button onClick={() => setIsAddModalOpen(true)} className="bg-[#00E5FF] text-black px-8 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105">+ Deploy Asset</button>
          )}
        </header>

        <Breadcrumbs view={activeView} />

        <main className="max-w-7xl mx-auto pb-32">
          {isLoading ? <div className="h-[40vh] flex items-center justify-center"><Loader2 className="w-12 h-12 text-[#00E5FF] animate-spin" /></div> : (
            <AnimatePresence mode="wait">
              <motion.div key={activeView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {activeView === 'dashboard' && (
                  <div className="space-y-32">
                    <MissionBriefing 
                      title={data.missionTitle} 
                      videoUrl={data.mainVideo} 
                      description={data.missionDescription} 
                      onEdit={isMaster ? () => setIsEditMainModalOpen(true) : undefined} 
                    />
                    <OperationsCenter modules={manualModules} isMaster={isMaster} onDelete={handleDeleteModule} onToggleLock={handleToggleLock} onEdit={setEditingModule} />
                    <OperationalStats />
                  </div>
                )}
                {activeView === 'missions' && <OperationsCenter modules={manualModules} isMaster={isMaster} onDelete={handleDeleteModule} onToggleLock={handleToggleLock} onEdit={setEditingModule} />}
                {activeView === 'audio' && <AudioLibrary modules={podcastModules} isMaster={isMaster} onEdit={setEditingModule} onDelete={handleDeleteModule} onToggleLock={handleToggleLock} />}
                {activeView === 'docs' && <DocGallery modules={manualModules} isMaster={isMaster} onEdit={setEditingModule} onToggleLock={handleToggleLock} onDelete={handleDeleteModule} />}
              </motion.div>
            </AnimatePresence>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
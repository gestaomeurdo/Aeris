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
import { Database, Loader2, Settings2 } from 'lucide-react';
import { PortalData, TrainingModule } from '@/types/portal';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const [data, setData] = useState<PortalData>({
    mainVideo: "https://youtu.be/mQayAWnJQOE",
    missionTitle: "AERIS ACADEMY",
    missionDescription: "Configure seu centro de comando adicionando novos módulos táticos.",
    modules: []
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isMaster, setIsMaster] = useState(true); 
  const [activeView, setActiveView] = useState('dashboard');
  const [editingModule, setEditingModule] = useState<TrainingModule | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditMainModalOpen, setIsEditMainModalOpen] = useState(false);

  useEffect(() => { 
    // Carregar configurações do briefing principal do localStorage
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
    fetchModules(); 
  }, []);

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
        audioUrl: m.audio_url || '',
        docUrl: m.doc_url || '',
        progress: m.progress,
        locked: m.locked
      }));
      setData(prev => ({ ...prev, modules: mappedModules }));
    }
    setIsLoading(false);
  };

  const handleUpdateMainBriefing = (newData: { title: string; video: string; description: string }) => {
    setData(prev => ({
      ...prev,
      missionTitle: newData.title,
      mainVideo: newData.video,
      missionDescription: newData.description
    }));
    localStorage.setItem('aeris_main_briefing', JSON.stringify(newData));
    toast.success("Briefing principal atualizado localmente");
  };

  const uploadFile = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
    const { error: uploadError } = await supabase.storage.from('assets').upload(filePath, file);
    if (uploadError) throw uploadError;
    const { data: { publicUrl } } = supabase.storage.from('assets').getPublicUrl(filePath);
    return publicUrl;
  };

  const handleSaveNewModule = async (newModuleData: Omit<TrainingModule, 'id'>, files: { audio?: File, doc?: File }) => {
    const nextId = `MOD-${(data.modules.length + 1).toString().padStart(2, '0')}`;
    const toastId = toast.loading("Implantando assets...");
    
    try {
      let audioUrl = '';
      let docUrl = '';
      if (files.audio) audioUrl = await uploadFile(files.audio);
      if (files.doc) docUrl = await uploadFile(files.doc);

      const { error } = await supabase
        .from('training_modules')
        .insert([{
          module_id: nextId,
          title: newModuleData.title,
          desc_text: newModuleData.desc,
          type: newModuleData.type,
          audio_url: audioUrl,
          doc_url: docUrl,
          progress: 0,
          locked: false
        }]);

      if (error) throw error;
      toast.success("Módulo implantado com sucesso", { id: toastId });
      fetchModules();
    } catch (err: any) {
      toast.error(`Falha na missão: ${err.message}`, { id: toastId });
    }
  };

  const handleUpdateModule = async (updated: TrainingModule, files: { audio?: File, doc?: File }) => {
    const toastId = toast.loading("Atualizando assets...");
    
    try {
      let audioUrl = updated.audioUrl;
      let docUrl = updated.docUrl;

      if (files.audio) audioUrl = await uploadFile(files.audio);
      if (files.doc) docUrl = await uploadFile(files.doc);

      const { error } = await supabase
        .from('training_modules')
        .update({
          title: updated.title,
          desc_text: updated.desc,
          progress: updated.progress,
          locked: updated.locked,
          audio_url: audioUrl,
          doc_url: docUrl
        })
        .eq('module_id', updated.id);

      if (error) throw error;
      toast.success("Módulo atualizado", { id: toastId });
      fetchModules();
    } catch (err: any) {
      toast.error(`Falha na atualização: ${err.message}`, { id: toastId });
    }
  };

  const handleDeleteModule = async (id: string) => {
    const { error } = await supabase.from('training_modules').delete().eq('module_id', id);
    if (error) toast.error("Erro ao deletar");
    else { toast.success("Módulo removido"); fetchModules(); }
  };

  const handleToggleLock = async (id: string) => {
    const mod = data.modules.find(m => m.id === id);
    if (!mod) return;
    const { error } = await supabase.from('training_modules').update({ locked: !mod.locked }).eq('module_id', id);
    if (error) toast.error("Erro ao alterar trava");
    else fetchModules();
  };

  return (
    <div className="min-h-screen bg-[#020202] text-[#B0BEC5] font-sans overflow-x-hidden">
      <EditModuleModal isOpen={!!editingModule} onClose={() => setEditingModule(null)} module={editingModule} onSave={handleUpdateModule} />
      <AddModuleModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleSaveNewModule} nextId={`MOD-${(data.modules.length + 1).toString().padStart(2, '0')}`} />
      
      <EditMainBriefingModal 
        isOpen={isEditMainModalOpen} 
        onClose={() => setIsEditMainModalOpen(false)} 
        currentData={{
          title: data.missionTitle,
          video: data.mainVideo,
          description: data.missionDescription
        }}
        onSave={handleUpdateMainBriefing}
      />

      <div className="fixed inset-0 pointer-events-none z-0"><div className="absolute inset-0 bg-grid-pattern opacity-5" /></div>
      <TacticalSidebar activeView={activeView} onViewChange={setActiveView} isMaster={isMaster} onUserClick={() => setIsMaster(!isMaster)} />
      <div className="pl-36 pr-12 relative z-10">
        <header className="pt-12 pb-12 flex justify-between items-center border-b border-white/5 mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-white uppercase">AERIS <span className="text-[#00E5FF]">ACADEMY</span></h1>
            <div className="flex items-center gap-2"><div className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-amber-500 animate-pulse' : 'bg-[#00E5FF]'}`} /></div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsAddModalOpen(true)} className="bg-[#00E5FF] text-black px-8 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105">+ Novo Módulo</button>
            <div className="flex items-center gap-4 px-6 py-3 bg-white/[0.03] rounded-2xl border border-white/5"><Database className="w-4 h-4 text-[#00E5FF]" /></div>
          </div>
        </header>
        <Breadcrumbs view={activeView} />
        <main className="max-w-7xl mx-auto pb-32">
          {isLoading ? <div className="h-[40vh] flex items-center justify-center"><Loader2 className="w-12 h-12 text-[#00E5FF] animate-spin" /></div> : (
            <AnimatePresence mode="wait">
              <motion.div key={activeView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {activeView === 'dashboard' && (
                  <div className="space-y-32">
                    <div className="relative group">
                      {isMaster && (
                        <button 
                          onClick={() => setIsEditMainModalOpen(true)}
                          className="absolute -top-12 right-0 z-20 flex items-center gap-2 bg-white/5 hover:bg-[#00E5FF]/20 border border-white/10 hover:border-[#00E5FF]/40 px-4 py-2 rounded-xl transition-all"
                        >
                          <Settings2 className="w-4 h-4 text-[#00E5FF]" />
                          <span className="text-[10px] font-black text-white uppercase tracking-widest">Editar Briefing</span>
                        </button>
                      )}
                      <MissionBriefing title={data.missionTitle} videoUrl={data.mainVideo} description={data.missionDescription} />
                    </div>
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
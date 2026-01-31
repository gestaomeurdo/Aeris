"use client";

import React, { useState, useEffect } from 'react';
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
import { Database, Trash2, Loader2 } from 'lucide-react';
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

  useEffect(() => {
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

  const handlePurgeAll = async () => {
    if (confirm("Apagar todos os módulos do banco de dados?")) {
      const { error } = await supabase
        .from('training_modules')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (error) toast.error("Erro ao limpar banco");
      else {
        setData(prev => ({ ...prev, modules: [] }));
        toast.success("Banco de dados limpo");
      }
    }
  };

  const handleSaveNewModule = async (newModuleData: Omit<TrainingModule, 'id'>, file: File | null) => {
    const nextId = `MOD-${(data.modules.length + 1).toString().padStart(2, '0')}`;
    let audioUrl = '';
    let docUrl = '';
    
    const toastId = toast.loading("Enviando asset...");

    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(filePath, file);

      if (uploadError) {
        console.error("Erro detalhado do Supabase:", uploadError);
        toast.error(`Erro no upload: ${uploadError.message}`, { id: toastId });
        return;
      }

      const { data: { publicUrl } } = supabase.storage.from('assets').getPublicUrl(filePath);
      
      if (file.type.startsWith('audio/')) audioUrl = publicUrl;
      else if (file.type === 'application/pdf') docUrl = publicUrl;
    }

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

    if (error) {
      toast.error(`Erro ao salvar: ${error.message}`, { id: toastId });
    } else {
      toast.success("Módulo implantado com sucesso", { id: toastId });
      fetchModules();
    }
  };

  const handleDeleteModule = async (id: string) => {
    const { error } = await supabase
      .from('training_modules')
      .delete()
      .eq('module_id', id);

    if (error) toast.error("Erro ao deletar");
    else {
      toast.success("Módulo removido");
      fetchModules();
    }
  };

  const handleUpdateModule = async (updated: TrainingModule) => {
    const { error } = await supabase
      .from('training_modules')
      .update({
        title: updated.title,
        desc_text: updated.desc,
        progress: updated.progress,
        locked: updated.locked,
        audio_url: updated.audioUrl,
        doc_url: updated.docUrl
      })
      .eq('module_id', updated.id);

    if (error) toast.error("Erro ao atualizar");
    else {
      toast.success("Módulo atualizado");
      fetchModules();
    }
  };

  const handleToggleLock = async (id: string) => {
    const mod = data.modules.find(m => m.id === id);
    if (!mod) return;

    const { error } = await supabase
      .from('training_modules')
      .update({ locked: !mod.locked })
      .eq('module_id', id);

    if (error) toast.error("Erro ao alterar trava");
    else fetchModules();
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
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-amber-500 animate-pulse' : 'bg-[#00E5FF]'}`} />
              <p className="text-[10px] font-mono text-[#00E5FF]/40 uppercase tracking-[0.5em]">{isLoading ? 'Syncing...' : 'Database Connected'}</p>
            </div>
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
          {isLoading ? (
            <div className="h-[40vh] flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-12 h-12 text-[#00E5FF] animate-spin" />
              <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em]">Retrieving Data...</span>
            </div>
          ) : activeView === 'future' ? (
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
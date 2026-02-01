"use client";

import React, { useState, useEffect } from 'react';
import { X, Save, FileAudio, FileText, Video, Headphones, BookOpen, Radio } from 'lucide-react';
import { TrainingModule } from '@/types/portal';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  module: TrainingModule | null;
  availablePodcasts: TrainingModule[];
  onSave: (module: TrainingModule, files: { audio?: File, audiobook?: File, doc?: File, cover?: File }) => void;
}

const EditModuleModal = ({ isOpen, onClose, module, availablePodcasts, onSave }: EditModuleModalProps) => {
  const [formData, setFormData] = useState<TrainingModule | null>(null);
  const [files, setFiles] = useState<{ audio?: File, audiobook?: File, doc?: File, cover?: File }>({});

  useEffect(() => {
    if (module) {
      setFormData({ ...module });
      setFiles({});
    }
  }, [module]);

  if (!isOpen || !formData) return null;

  const handleSave = () => {
    if (formData) {
      onSave(formData, files);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-[#0A0A0A] border border-white/10 w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Editar Asset</h2>
            <p className="text-[10px] font-mono text-[#00E5FF] uppercase tracking-[0.3em] mt-1">ID: {formData.id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors"><X className="w-5 h-5 text-white/40" /></button>
        </div>

        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Título</Label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white font-bold" />
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Descrição</Label>
            <textarea value={formData.desc} onChange={(e) => setFormData({ ...formData, desc: e.target.value })} rows={3} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white leading-relaxed" />
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-[0.2em] pl-1 flex items-center gap-2">
              <Radio size={12} /> Vincular Podcast do Hub
            </Label>
            <Select 
              value={formData.audioUrl || "none"} 
              onValueChange={(val) => setFormData({ ...formData, audioUrl: val === "none" ? "" : val })}
            >
              <SelectTrigger className="bg-white/[0.03] border-white/10 rounded-2xl py-6 text-white">
                <SelectValue placeholder="Selecione um podcast do Hub..." />
              </SelectTrigger>
              <SelectContent className="bg-[#020617] border-white/10 text-white">
                <SelectItem value="none">Nenhum vinculado</SelectItem>
                {availablePodcasts.map(p => (
                  <SelectItem key={p.dbId} value={p.audioUrl}>{p.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-[9px] text-white/20 mt-1 italic">* Isso vincula o áudio que já está no Audio Hub a este capítulo.</p>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Link Vídeo YouTube</Label>
            <input type="text" value={formData.videoUrl || ''} onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white font-mono text-xs" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-[24px]">
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-green-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Headphones size={12} /> Novo Podcast MP3
              </Label>
              <input type="file" accept="audio/*" onChange={(e) => setFiles({ ...files, audio: e.target.files?.[0] })} className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-2 text-xs" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-purple-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <BookOpen size={12} /> Novo Audiobook MP3
              </Label>
              <input type="file" accept="audio/*" onChange={(e) => setFiles({ ...files, audiobook: e.target.files?.[0] })} className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-2 text-xs" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <FileText size={12} /> Novo PDF Manual
              </Label>
              <input type="file" accept=".pdf" onChange={(e) => setFiles({ ...files, doc: e.target.files?.[0] })} className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-2 text-xs" />
            </div>
          </div>
        </div>

        <div className="p-8 bg-white/[0.02] border-t border-white/5 flex gap-4">
          <button onClick={onClose} className="flex-1 px-6 py-4 rounded-2xl border border-white/10 text-[11px] font-black text-white/60 hover:bg-white/5 transition-all">Abortar</button>
          <button onClick={handleSave} className="flex-2 bg-[#00E5FF] text-black px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:scale-[1.02] transition-all">Salvar Alterações</button>
        </div>
      </div>
    </div>
  );
};

export default EditModuleModal;
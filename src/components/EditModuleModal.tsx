"use client";

import React, { useState, useEffect } from 'react';
import { X, Save, Type, Headphones, FileText, BarChart, Upload, Image, AlignLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrainingModule } from '@/types/portal';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface EditModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  module: TrainingModule | null;
  onSave: (updated: TrainingModule, files: { audio?: File, doc?: File, cover?: File }) => void;
}

const EditModuleModal = ({ isOpen, onClose, module, onSave }: EditModuleModalProps) => {
  const [formData, setFormData] = useState<TrainingModule | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  useEffect(() => {
    if (module) {
      setFormData({ ...module });
      setAudioFile(null);
      setDocFile(null);
      setCoverFile(null);
    }
  }, [module]);

  if (!formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, { 
      audio: audioFile || undefined, 
      doc: docFile || undefined,
      cover: coverFile || undefined
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-2xl bg-[#020617] border border-[#00E5FF]/30 rounded-[32px] overflow-hidden shadow-[0_0_100px_rgba(0,229,255,0.1)]"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/40">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#00E5FF]/10 rounded-lg"><Save className="w-5 h-5 text-[#00E5FF]" /></div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-widest">TACTICAL OVERRIDE</span>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Edit Module: {formData.id}</h3>
                </div>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-xl transition-colors"><X className="w-6 h-6 text-white/40" /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label className="text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">Module Title</Label>
                  <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="bg-white/[0.03] border-white/10 rounded-2xl py-4 text-white" />
                </div>

                {/* Novo campo de descrição para o módulo */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">
                    <AlignLeft className="w-3 h-3 text-[#00E5FF]" /> Module Description
                  </Label>
                  <Textarea 
                    value={formData.desc} 
                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })} 
                    className="bg-white/[0.03] border-white/10 rounded-2xl py-4 text-white h-24 resize-none" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-[9px] font-mono font-black text-[#00E5FF] uppercase tracking-[0.2em]">
                      <Image className="w-3 h-3" /> Cover (.jpg/.png)
                    </Label>
                    <Input type="file" accept=".jpg, .jpeg, .png" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} className="bg-white/[0.03] border-white/10 text-white/60 text-xs file:bg-[#00E5FF]/20" />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-[9px] font-mono font-black text-[#00E5FF] uppercase tracking-[0.2em]">
                      <Headphones className="w-3 h-3" /> Audio (.mp3)
                    </Label>
                    <Input type="file" accept=".mp3" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} className="bg-white/[0.03] border-white/10 text-white/60 text-xs file:bg-[#00E5FF]/20" />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-[9px] font-mono font-black text-[#00E5FF] uppercase tracking-[0.2em]">
                      <FileText className="w-3 h-3" /> Manual (.pdf)
                    </Label>
                    <Input type="file" accept=".pdf" onChange={(e) => setDocFile(e.target.files?.[0] || null)} className="bg-white/[0.03] border-white/10 text-white/60 text-xs file:bg-[#00E5FF]/20" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">Sync Progress ({formData.progress}%)</Label>
                  <input type="range" min="0" max="100" value={formData.progress} onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })} className="w-full accent-[#00E5FF] bg-white/5 h-2 rounded-full appearance-none cursor-pointer" />
                </div>
              </div>

              <button type="submit" className="w-full py-5 bg-[#00E5FF] text-black font-black uppercase text-xs rounded-2xl shadow-[0_0_30px_rgba(0,229,255,0.2)] hover:scale-[1.02] transition-all">
                Confirm Changes
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditModuleModal;
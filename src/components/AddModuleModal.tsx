"use client";

import React, { useState, useEffect } from 'react';
import { X, Save, FileText, Headphones, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrainingModule } from '@/types/portal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AddModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newModule: Omit<TrainingModule, 'id'>, files: { audio?: File, doc?: File }) => void;
  nextId: string;
}

const moduleTypes: { label: string, value: TrainingModule['type'] }[] = [
  { label: "Leadership Doctrine", value: "Leadership" },
  { label: "Strategic Planning", value: "Strategy" },
  { label: "Structural Hierarchy", value: "Structure" },
  { label: "Advanced Intelligence", value: "Advanced" },
];

const AddModuleModal = ({ isOpen, onClose, onSave, nextId }: AddModuleModalProps) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<TrainingModule['type']>('Advanced');
  const [description, setDescription] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setAudioFile(null);
      setDocFile(null);
      setType('Advanced');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || (!audioFile && !docFile)) {
      alert("Por favor, preencha o título, descrição e suba ao menos um arquivo.");
      return;
    }

    const newModuleData: Omit<TrainingModule, 'id'> = {
      title,
      desc: description,
      type,
      audioUrl: '', 
      docUrl: '', 
      progress: 0,
      locked: false,
    };

    onSave(newModuleData, { 
      audio: audioFile || undefined, 
      doc: docFile || undefined 
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
                  <span className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-widest">DEPLOYMENT_CENTER</span>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">New Asset: {nextId}</h3>
                </div>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-xl transition-colors"><X className="w-6 h-6 text-white/40" /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label className="text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">Asset Title</Label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="E.g., Flight Dynamics V3" className="bg-white/[0.03] border-white/10 rounded-2xl py-4 text-white" />
                </div>

                <div className="space-y-2">
                  <Label className="text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">Tactical Briefing</Label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description..." className="bg-white/[0.03] border-white/10 rounded-2xl py-4 text-white h-24 resize-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-[9px] font-mono font-black text-[#00E5FF] uppercase tracking-[0.2em] pl-1">
                      <Headphones className="w-3 h-3" /> Audio Briefing (.mp3)
                    </Label>
                    <Input type="file" accept=".mp3" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} className="bg-white/[0.03] border-white/10 text-xs file:bg-[#00E5FF]/20 file:text-[#00E5FF] file:border-0" />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-[9px] font-mono font-black text-[#00E5FF] uppercase tracking-[0.2em] pl-1">
                      <FileText className="w-3 h-3" /> Technical Manual (.pdf)
                    </Label>
                    <Input type="file" accept=".pdf" onChange={(e) => setDocFile(e.target.files?.[0] || null)} className="bg-white/[0.03] border-white/10 text-xs file:bg-[#00E5FF]/20 file:text-[#00E5FF] file:border-0" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">Content Category</Label>
                  <Select value={type} onValueChange={(value: TrainingModule['type']) => setType(value)}>
                    <SelectTrigger className="bg-white/[0.03] border-white/10 rounded-2xl py-4 text-white"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-[#020617] border-[#00E5FF]/30 text-white">
                      {moduleTypes.map(item => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <button type="submit" className="w-full py-5 bg-[#00E5FF] text-black font-black uppercase text-xs rounded-2xl shadow-[0_0_30px_rgba(0,229,255,0.2)] hover:scale-[1.02] transition-all">
                Confirm Deployment
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddModuleModal;
"use client";

import React, { useState, useEffect } from 'react';
import { X, Save, Type, FileText, Headphones, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrainingModule } from '@/types/portal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AddModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newModule: Omit<TrainingModule, 'id'>, file: File | null) => void;
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
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<'audio' | 'doc' | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setFile(null);
      setFileType(null);
      setType('Advanced');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !file) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const newModuleData: Omit<TrainingModule, 'id'> = {
      title,
      desc: description,
      type,
      audioUrl: fileType === 'audio' ? 'PENDING' : '', 
      docUrl: fileType === 'doc' ? 'PENDING' : '', 
      progress: 0,
      locked: false,
    };

    onSave(newModuleData, file);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    
    if (selectedFile) {
      const mimeType = selectedFile.type;
      if (mimeType === 'application/pdf') {
        setFileType('doc');
      } else if (mimeType.startsWith('audio/')) {
        setFileType('audio');
      } else {
        alert("Apenas arquivos .mp3 ou .pdf são suportados.");
        setFile(null);
        setFileType(null);
      }
    }
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
                <div className="p-2 bg-[#00E5FF]/10 rounded-lg">
                  <Save className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-widest">DEPLOYMENT_CENTER</span>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">New Asset: {nextId}</h3>
                </div>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-xl transition-colors">
                <X className="w-6 h-6 text-white/40" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">
                    Asset Title
                  </Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="E.g., Flight Dynamics V3"
                    className="bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:border-[#00E5FF]/40 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">
                    Tactical Briefing
                  </Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of the content..."
                    className="bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white h-24 resize-none focus:border-[#00E5FF]/40 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">
                    Content Category
                  </Label>
                  <Select value={type} onValueChange={(value: TrainingModule['type']) => setType(value)}>
                    <SelectTrigger className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white h-auto">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#020617] border-[#00E5FF]/30 text-white">
                      {moduleTypes.map(item => (
                        <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">
                    Upload Asset (.pdf or .mp3)
                  </Label>
                  <Input
                    type="file"
                    accept=".pdf,.mp3,audio/mpeg,audio/mp3,application/pdf"
                    onChange={handleFileChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white file:bg-[#00E5FF]/10 file:text-[#00E5FF] file:rounded-full file:border-0 file:px-4 file:py-1 file:mr-4"
                  />
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={!title || !file}
                  className="w-full py-5 bg-[#00E5FF] text-black font-black uppercase text-xs rounded-2xl shadow-[0_0_30px_rgba(0,229,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  Confirm Deployment
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddModuleModal;
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

// Mapping user-friendly types to existing TrainingModule types
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
      // Using native alert for simplicity, as per existing code style (e.g., in SecurityProtocol)
      alert("Please fill all required fields and select a file.");
      return;
    }

    const newModuleData: Omit<TrainingModule, 'id'> = {
      title,
      desc: description,
      type,
      audioUrl: fileType === 'audio' ? 'LOCAL_PENDING' : '', 
      docUrl: fileType === 'doc' ? 'LOCAL_PENDING' : '', 
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
      if (selectedFile.type === 'application/pdf') {
        setFileType('doc');
      } else if (selectedFile.type === 'audio/mp3') {
        setFileType('audio');
      } else {
        alert("Unsupported file type. Please select .mp3 or .pdf.");
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
                  <span className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-widest">NEW ASSET DEPLOYMENT</span>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Create Module: {nextId}</h3>
                </div>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-xl transition-colors">
                <X className="w-6 h-6 text-white/40" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-6">
                
                {/* Title */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">
                    <Type className="w-3 h-3 text-[#00E5FF]" /> Module Title
                  </Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Advanced Cyber Warfare"
                    className="bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:border-[#00E5FF]/40 outline-none transition-all"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">
                    <FileText className="w-3 h-3 text-[#00E5FF]" /> Tactical Description
                  </Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief summary of the module's objective..."
                    className="bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white h-24 resize-none focus:border-[#00E5FF]/40 outline-none transition-all"
                  />
                </div>

                {/* Type Dropdown */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">
                    <ChevronDown className="w-3 h-3 text-[#00E5FF]" /> Content Type
                  </Label>
                  <Select value={type} onValueChange={(value: TrainingModule['type']) => setType(value)}>
                    <SelectTrigger className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:ring-0 focus:ring-offset-0 focus:border-[#00E5FF]/40 h-auto">
                      <SelectValue placeholder="Select Module Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#020617] border-[#00E5FF]/30 text-white">
                      {moduleTypes.map(item => (
                        <SelectItem key={item.value} value={item.value} className="hover:bg-[#00E5FF]/10">
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">
                    <Headphones className="w-3 h-3 text-[#00E5FF]" /> Asset File (.mp3 or .pdf)
                  </Label>
                  <div className="relative">
                    <Input
                      type="file"
                      accept=".mp3, .pdf"
                      onChange={handleFileChange}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:border-[#00E5FF]/40 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#00E5FF]/10 file:text-[#00E5FF] hover:file:bg-[#00E5FF]/20"
                    />
                    {file && (
                      <div className="absolute top-1/2 right-4 -translate-y-1/2 text-[10px] font-mono text-white/60 uppercase tracking-widest">
                        {file.name} ({fileType === 'audio' ? 'VOX' : 'DOC'})
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={!title || !description || !file}
                  className="w-full py-5 bg-[#00E5FF] text-black font-black uppercase text-xs rounded-2xl shadow-[0_0_30px_rgba(0,229,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
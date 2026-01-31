"use client";

import React, { useState, useEffect } from 'react';
import { X, Save, FileText, Headphones, Upload, Zap, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrainingModule } from '@/types/portal';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface AddModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newModule: Omit<TrainingModule, 'id'>, files: { audio?: File, doc?: File }) => void;
  nextId: string;
}

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
    if (!title || !description) {
      alert("Por favor, preencha o título e a descrição.");
      return;
    }

    onSave({
      title,
      desc: description,
      type,
      audioUrl: '', 
      docUrl: '', 
      progress: 0,
      locked: false,
    }, { 
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
                <div className="p-2 bg-[#00E5FF]/10 rounded-lg"><Zap className="w-5 h-5 text-[#00E5FF]" /></div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-widest">ASSET_DEPLOYMENT</span>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">New Operational Module: {nextId}</h3>
                </div>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-xl transition-colors"><X className="w-6 h-6 text-white/40" /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-6">
                {/* Visual Type Selector */}
                <div className="space-y-3">
                  <Label className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">Transmission Focus</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setType('Advanced')}
                      className={`flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-500 ${
                        type === 'Advanced' 
                        ? 'bg-[#00E5FF]/10 border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.2)]' 
                        : 'bg-white/5 border-white/10 opacity-40 grayscale hover:grayscale-0 hover:opacity-100'
                      }`}
                    >
                      <Headphones className={`w-8 h-8 ${type === 'Advanced' ? 'text-[#00E5FF]' : 'text-white'}`} />
                      <span className={`text-[10px] font-black uppercase tracking-widest ${type === 'Advanced' ? 'text-[#00E5FF]' : 'text-white'}`}>🎙️ Audio Transmission</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setType('Strategy')}
                      className={`flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-500 ${
                        type === 'Strategy' 
                        ? 'bg-[#00E5FF]/10 border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.2)]' 
                        : 'bg-white/5 border-white/10 opacity-40 grayscale hover:grayscale-0 hover:opacity-100'
                      }`}
                    >
                      <FileText className={`w-8 h-8 ${type === 'Strategy' ? 'text-[#00E5FF]' : 'text-white'}`} />
                      <span className={`text-[10px] font-black uppercase tracking-widest ${type === 'Strategy' ? 'text-[#00E5FF]' : 'text-white'}`}>📄 Classified Doc</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">Module Title</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="DESIGNATE_IDENTIFIER" className="bg-white/[0.03] border-white/10 rounded-2xl py-6 text-white font-bold" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">Briefing Data</Label>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="ENTER_TACTICAL_DATA" className="bg-white/[0.03] border-white/10 rounded-2xl py-4 text-white h-24 resize-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-[24px]">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-mono font-black text-[#00E5FF] uppercase tracking-widest pl-1">Upload VOX (.mp3)</Label>
                    <div className="relative group">
                       <Input type="file" accept=".mp3" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} className="bg-white/[0.03] border-white/10 text-xs file:bg-[#00E5FF]/20 file:text-[#00E5FF] file:border-0 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-mono font-black text-[#00E5FF] uppercase tracking-widest pl-1">Upload INTEL (.pdf)</Label>
                    <Input type="file" accept=".pdf" onChange={(e) => setDocFile(e.target.files?.[0] || null)} className="bg-white/[0.03] border-white/10 text-xs file:bg-[#00E5FF]/20 file:text-[#00E5FF] file:border-0 rounded-xl" />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full py-6 bg-[#00E5FF] text-black font-black uppercase text-xs rounded-2xl shadow-[0_0_40px_rgba(0,229,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                <Upload size={18} />
                Confirm Mission Uplink
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddModuleModal;
"use client";

import React, { useState, useEffect } from 'react';
import { X, Save, Video, AlignLeft, Type } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface EditMainBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: {
    title: string;
    video: string;
    description: string;
  };
  onSave: (newData: { title: string; video: string; description: string }) => void;
}

const EditMainBriefingModal = ({ isOpen, onClose, currentData, onSave }: EditMainBriefingModalProps) => {
  const [title, setTitle] = useState(currentData.title);
  const [video, setVideo] = useState(currentData.video);
  const [description, setDescription] = useState(currentData.description);

  useEffect(() => {
    if (isOpen) {
      setTitle(currentData.title);
      setVideo(currentData.video);
      setDescription(currentData.description);
    }
  }, [isOpen, currentData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, video, description });
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
                <div className="p-2 bg-[#00E5FF]/10 rounded-lg"><Video className="w-5 h-5 text-[#00E5FF]" /></div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-widest">COMMAND_CENTER</span>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Editar Briefing Principal</h3>
                </div>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-xl transition-colors"><X className="w-6 h-6 text-white/40" /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">
                    <Type className="w-3 h-3 text-[#00E5FF]" /> Título da Missão
                  </Label>
                  <Input 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="bg-white/[0.03] border-white/10 rounded-2xl py-6 text-white text-lg font-bold" 
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">
                    <Video className="w-3 h-3 text-[#00E5FF]" /> URL do Vídeo (YouTube)
                  </Label>
                  <Input 
                    value={video} 
                    onChange={(e) => setVideo(e.target.value)} 
                    className="bg-white/[0.03] border-white/10 rounded-2xl py-4 text-white font-mono text-xs" 
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">
                    <AlignLeft className="w-3 h-3 text-[#00E5FF]" /> Descrição Tática
                  </Label>
                  <Textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className="bg-white/[0.03] border-white/10 rounded-2xl py-4 text-white h-32 resize-none leading-relaxed" 
                  />
                </div>
              </div>

              <button type="submit" className="w-full py-5 bg-[#00E5FF] text-black font-black uppercase text-xs rounded-2xl shadow-[0_0_30px_rgba(0,229,255,0.2)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                <Save className="w-4 h-4" /> Atualizar Briefing
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditMainBriefingModal;
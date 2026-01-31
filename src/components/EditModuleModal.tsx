"use client";

import React, { useState, useEffect } from 'react';
import { X, Save, Type, AlignLeft, Headphones, FileText, BarChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrainingModule } from '@/types/portal';

interface EditModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  module: TrainingModule | null;
  onSave: (updated: TrainingModule) => void;
}

const EditModuleModal = ({ isOpen, onClose, module, onSave }: EditModuleModalProps) => {
  const [formData, setFormData] = useState<TrainingModule | null>(null);

  useEffect(() => {
    if (module) setFormData({ ...module });
  }, [module]);

  if (!formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
                <div className="p-2 bg-[#00E5FF]/10 rounded-lg">
                  <Save className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-widest">TACTICAL OVERRIDE</span>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Edit Module: {formData.id}</h3>
                </div>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-xl transition-colors">
                <X className="w-6 h-6 text-white/40" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">
                    <Type className="w-3 h-3 text-[#00E5FF]" /> Module Title
                  </label>
                  <input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:border-[#00E5FF]/40 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">
                    <AlignLeft className="w-3 h-3 text-[#00E5FF]" /> Tactical Description
                  </label>
                  <textarea
                    value={formData.desc}
                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white h-32 resize-none focus:border-[#00E5FF]/40 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">
                      <Headphones className="w-3 h-3 text-[#00E5FF]" /> Audio URL (MP3)
                    </label>
                    <input
                      value={formData.audioUrl}
                      onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:border-[#00E5FF]/40 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">
                      <FileText className="w-3 h-3 text-[#00E5FF]" /> Document URL (PDF)
                    </label>
                    <input
                      value={formData.docUrl}
                      onChange={(e) => setFormData({ ...formData, docUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:border-[#00E5FF]/40 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.2em] pl-1">
                    <BarChart className="w-3 h-3 text-[#00E5FF]" /> Synchronization Progress ({formData.progress}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                    className="w-full accent-[#00E5FF] bg-white/5 h-2 rounded-full appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  className="w-full py-5 bg-[#00E5FF] text-black font-black uppercase text-xs rounded-2xl shadow-[0_0_30px_rgba(0,229,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Confirm Changes
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditModuleModal;
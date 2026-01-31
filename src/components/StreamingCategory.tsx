"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Lock, Star, ChevronRight, Edit3, Trash2 } from 'lucide-react';
import { TrainingModule } from '@/types/portal';

interface StreamingCategoryProps {
  title: string;
  modules: TrainingModule[];
  onSelect: (m: TrainingModule) => void;
  isMaster?: boolean;
  onEdit?: (m: TrainingModule) => void;
  onDelete?: (id: string) => void;
}

const StreamingCategory = ({ title, modules, onSelect, isMaster, onEdit, onDelete }: StreamingCategoryProps) => {
  return (
    <section className="px-12 md:px-20 space-y-6">
      <div className="flex items-center gap-4 group cursor-pointer">
        <h3 className="text-2xl font-black tracking-tight text-white/90 group-hover:text-white transition-colors uppercase italic">{title}</h3>
        <ChevronRight className="text-[#00E5FF] group-hover:translate-x-1 transition-transform" size={24} />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((mod, idx) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer bg-[#0A192F] transition-all duration-500 hover:scale-110 hover:z-50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/5"
            onClick={() => !mod.locked && onSelect(mod)}
          >
            {/* Imagem Placeholder Baseada no Tipo */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F] to-black flex items-center justify-center">
               <span className="text-white/5 font-black text-6xl uppercase italic tracking-tighter select-none">{mod.type}</span>
            </div>

            {/* Admin Controls Overlay */}
            {isMaster && (
              <div className="absolute top-4 right-4 z-30 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button 
                   onClick={(e) => { e.stopPropagation(); onEdit?.(mod); }}
                   className="p-2 bg-black/60 hover:bg-[#00E5FF]/20 border border-white/10 rounded-lg text-white hover:text-[#00E5FF] transition-all"
                 >
                   <Edit3 size={14} />
                 </button>
                 <button 
                   onClick={(e) => { e.stopPropagation(); onDelete?.(mod.id); }}
                   className="p-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500/20 rounded-lg text-red-500 transition-all"
                 >
                   <Trash2 size={14} />
                 </button>
              </div>
            )}

            {/* Hover Info Overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 bg-gradient-to-t from-black via-black/40 to-transparent">
              {mod.locked ? (
                <div className="mb-3 flex items-center gap-2">
                  <Lock className="text-amber-500" size={18} />
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Restricted Asset</span>
                </div>
              ) : (
                <div className="flex gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#00E5FF] flex items-center justify-center text-black">
                    <Play fill="black" size={12} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/10">
                    <Star size={12} />
                  </div>
                </div>
              )}
              
              <h4 className="text-lg font-black leading-tight mb-2 uppercase italic text-white">{mod.title}</h4>
              
              <div className="flex items-center gap-3 text-[10px] font-black text-white/40 uppercase tracking-tighter">
                <span className="text-[#00E5FF]">{mod.type}</span>
                <span>•</span>
                <span>{mod.progress}% Sync</span>
                <span>•</span>
                <span className="px-1.5 py-0.5 border border-white/10 rounded">HD</span>
              </div>
            </div>

            {/* Borda de Scanline no Hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#00E5FF]/40 rounded-2xl transition-all pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StreamingCategory;
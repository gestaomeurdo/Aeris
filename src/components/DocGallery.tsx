"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, ShieldAlert, Edit3, Lock, Unlock, Trash2 } from 'lucide-react';
import { TrainingModule } from '@/types/portal';

interface DocGalleryProps {
  modules: TrainingModule[];
  isMaster?: boolean;
  onEdit?: (m: TrainingModule) => void;
  onToggleLock?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const DocGallery = ({ modules, isMaster, onEdit, onToggleLock, onDelete }: DocGalleryProps) => {
  // Filtra módulos que têm docUrl, estão bloqueados, ou se o usuário é Master
  const docModules = modules.filter(m => m.docUrl || m.locked || isMaster);

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <FileText className="w-6 h-6 text-[#00E5FF]" />
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">TECHNICAL <span className="font-light text-white/20">RESOURCES</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {docModules.map((mod, idx) => {
          const isLocked = mod.locked && !isMaster;
          const hasDoc = !!mod.docUrl;

          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative aspect-[3/4] bg-black/40 border ${isLocked ? 'border-red-500/20 opacity-60' : 'border-[#00E5FF]/20'} rounded-3xl overflow-hidden group p-6 flex flex-col justify-between transition-all`}
            >
              {/* Master Controls Overlay */}
              {isMaster && (
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                   <button 
                     onClick={() => onEdit?.(mod)}
                     className="p-2 bg-black/60 hover:bg-[#00E5FF]/20 border border-white/10 rounded-lg text-white/40 hover:text-[#00E5FF] transition-all"
                   >
                     <Edit3 size={14} />
                   </button>
                   <button 
                     onClick={() => onToggleLock?.(mod.id)}
                     className="p-2 bg-black/60 hover:bg-[#00E5FF]/20 border border-white/10 rounded-lg text-white/40 hover:text-[#00E5FF] transition-all"
                   >
                     {mod.locked ? <Lock size={14} /> : <Unlock size={14} />}
                   </button>
                   <button 
                     onClick={() => onDelete?.(mod.id)}
                     className="p-2 bg-red-500/10 hover:bg-red-500/30 border border-red-500/20 rounded-lg text-red-500 transition-all"
                   >
                     <Trash2 size={14} />
                   </button>
                </div>
              )}

              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                  {isLocked ? <ShieldAlert className="text-red-500/40" /> : <FileText className="text-[#00E5FF]/40" />}
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] font-mono font-black text-white/20 uppercase tracking-widest">{mod.id}</span>
                  <h3 className="text-lg font-bold text-white uppercase leading-tight">{mod.title}</h3>
                  <p className="text-[10px] text-white/40 line-clamp-3 mt-2">{mod.desc}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-[1px] w-full bg-white/5" />
                
                <div className="flex flex-col gap-3">
                  {isMaster && (
                    <button 
                      onClick={() => onToggleLock?.(mod.id)}
                      className={`w-full py-2.5 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${mod.locked ? 'border-amber-500/30 text-amber-500 bg-amber-500/5 hover:bg-amber-500/20' : 'border-[#00E5FF]/30 text-[#00E5FF] bg-[#00E5FF]/5 hover:bg-[#00E5FF]/20'}`}
                    >
                      {mod.locked ? <Lock size={12} /> : <Unlock size={12} />}
                      {mod.locked ? 'Unlock Asset' : 'Secure Asset'}
                    </button>
                  )}

                  {isLocked ? (
                    <div className="flex items-center gap-2 text-[9px] font-mono text-red-500/60 uppercase font-black py-3">
                      <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                      Access Denied
                    </div>
                  ) : hasDoc ? (
                    <a 
                      href={mod.docUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-full py-3 bg-white/5 hover:bg-[#00E5FF] hover:text-black rounded-xl transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View Asset
                    </a>
                  ) : (
                    <div className="text-[9px] font-mono text-white/40 uppercase font-black py-3 text-center">
                      No Document Attached
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DocGallery;
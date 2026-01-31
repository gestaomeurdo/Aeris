"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, ShieldAlert, Edit3, Lock, Unlock, Trash2, Database } from 'lucide-react';
import { TrainingModule } from '@/types/portal';

interface DocGalleryProps {
  modules: TrainingModule[];
  isMaster?: boolean;
  onEdit?: (m: TrainingModule) => void;
  onToggleLock?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const DocGallery = ({ modules, isMaster, onEdit, onToggleLock, onDelete }: DocGalleryProps) => {
  const docModules = modules.filter(m => m.docUrl || isMaster);

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <Database className="w-6 h-6 text-[#00E5FF]" />
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">TECHNICAL <span className="font-light text-white/20">MANUALS</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {docModules.map((mod, idx) => {
          const isLocked = mod.locked && !isMaster;
          const hasDoc = !!mod.docUrl;

          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative aspect-[3/4.5] bg-black/60 border ${isLocked ? 'border-red-500/20 opacity-60' : 'border-[#00E5FF]/30 shadow-[0_0_30px_rgba(0,229,255,0.05)]'} rounded-3xl overflow-hidden group p-8 flex flex-col justify-between transition-all hover:bg-black/80 hover:border-[#00E5FF]/60`}
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isLocked ? 'bg-red-500/10' : 'bg-[#00E5FF]/10 border border-[#00E5FF]/20'}`}>
                    {isLocked ? <ShieldAlert className="text-red-500" /> : <FileText className="text-[#00E5FF]" />}
                  </div>
                  <div className="text-right">
                    <span className="block text-[8px] font-mono text-[#00E5FF] font-black uppercase tracking-widest">Asset ID</span>
                    <span className="block text-xs font-mono text-white/60">{mod.id}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-[1px] w-4 bg-[#00E5FF]" />
                    <span className="text-[9px] font-mono font-black text-[#00E5FF] uppercase tracking-widest">Technical Intel</span>
                  </div>
                  <h3 className="text-xl font-black text-white uppercase leading-[1.1] tracking-tight group-hover:text-[#00E5FF] transition-colors">{mod.title}</h3>
                  <p className="text-[10px] text-white/30 leading-relaxed font-medium uppercase tracking-wider">{mod.type} Category</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <p className="text-[10px] text-white/40 leading-relaxed italic line-clamp-3">
                    {mod.desc || "Classified technical document. Access restricted to authorized operators only."}
                  </p>
                </div>

                {isLocked ? (
                  <div className="flex items-center justify-center gap-2 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                    <Lock size={14} className="text-red-500" />
                    <span className="text-[10px] font-mono font-black text-red-500 uppercase tracking-widest">Protocol Locked</span>
                  </div>
                ) : hasDoc ? (
                  <button 
                    onClick={() => window.open(mod.docUrl, '_blank')}
                    className="w-full py-4 bg-[#00E5FF] text-black rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(0,229,255,0.2)]"
                  >
                    <ExternalLink size={14} />
                    View Technical File
                  </button>
                ) : (
                  <div className="py-4 text-center border border-dashed border-white/10 rounded-2xl">
                    <span className="text-[9px] font-mono text-white/20 uppercase">No Data Stream</span>
                  </div>
                )}
              </div>

              {/* Master Controls */}
              {isMaster && (
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => onEdit?.(mod)} className="p-2 bg-black/60 border border-white/10 rounded-lg text-white/40 hover:text-[#00E5FF]"><Edit3 size={14} /></button>
                   <button onClick={() => onDelete?.(mod.id)} className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500"><Trash2 size={14} /></button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DocGallery;
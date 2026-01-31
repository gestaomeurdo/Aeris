"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, ShieldAlert, Download } from 'lucide-react';
import { TrainingModule } from '@/types/portal';

interface DocGalleryProps {
  modules: TrainingModule[];
}

const DocGallery = ({ modules }: DocGalleryProps) => {
  const docModules = modules.filter(m => m.docUrl || m.locked);

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <FileText className="w-6 h-6 text-[#00E5FF]" />
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">TECHNICAL <span className="font-light text-white/20">RESOURCES</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {docModules.map((mod, idx) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative aspect-[3/4] bg-black/40 border ${mod.locked ? 'border-red-500/20' : 'border-white/10'} rounded-3xl overflow-hidden group p-6 flex flex-col justify-between`}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                {mod.locked ? <ShieldAlert className="text-red-500/40" /> : <FileText className="text-[#00E5FF]/40" />}
              </div>
              <div className="space-y-1">
                <span className="text-[8px] font-mono font-black text-white/20 uppercase tracking-widest">{mod.id}</span>
                <h3 className="text-lg font-bold text-white uppercase leading-tight">{mod.title}</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-[1px] w-full bg-white/5" />
              {mod.locked ? (
                <div className="flex items-center gap-2 text-[9px] font-mono text-red-500/60 uppercase font-black">
                  <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                  Access Denied
                </div>
              ) : (
                <a 
                  href={mod.docUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full py-3 bg-white/5 hover:bg-[#00E5FF] hover:text-black rounded-xl transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest"
                >
                  <ExternalLink className="w-3 h-3" />
                  View Asset
                </a>
              )}
            </div>

            {/* Visual HUD Decoration */}
            <div className="absolute top-2 right-2 flex gap-1">
               <div className="w-1 h-1 bg-white/10" />
               <div className="w-1 h-1 bg-white/10" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DocGallery;
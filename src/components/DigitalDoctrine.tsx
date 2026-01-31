"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Cpu, ChevronRight, Lock } from 'lucide-react';
import { TrainingModule } from '@/types/portal';
import DocViewerModal from './DocViewerModal';

interface DigitalDoctrineProps {
  modules: TrainingModule[];
}

const DigitalDoctrine = ({ modules }: DigitalDoctrineProps) => {
  const [viewingDoc, setViewingDoc] = useState<TrainingModule | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target': return Target;
      case 'Cpu': return Cpu;
      default: return Shield;
    }
  };

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-[2px] w-12 bg-[#6366F1] shadow-[0_0_10px_#6366F1]" />
        <h3 className="text-3xl font-black text-white tracking-tighter uppercase">DOUTRINA <span className="font-light">DIGITAL</span></h3>
        <div className="flex-1 h-[1px] bg-white/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {modules.map((mod, i) => {
          const Icon = getIcon(mod.id.includes('01') ? 'Target' : mod.id.includes('02') ? 'Cpu' : 'Shield');
          
          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative bg-[#0A192F]/60 backdrop-blur-2xl border ${mod.locked ? 'border-white/5 opacity-60' : 'border-white/10 hover:border-[#00E5FF]/40'} rounded-3xl p-8 flex flex-col gap-6 transition-all duration-500 overflow-hidden shadow-2xl`}
            >
              <div className="flex justify-between items-start">
                <div className={`p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:border-[#00E5FF]/20 transition-all ${!mod.locked && 'group-hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]'}`}>
                  <Icon className={`w-8 h-8 ${mod.locked ? 'text-white/20' : 'text-[#00E5FF]'}`} />
                </div>
                <span className="text-[10px] font-mono font-black text-white/20 uppercase tracking-[0.3em]">{mod.id}</span>
              </div>

              <div className="space-y-3">
                <h4 className="text-2xl font-black text-white tracking-tighter leading-tight uppercase group-hover:text-[#00E5FF] transition-colors">{mod.title}</h4>
                <p className="text-sm text-white/40 leading-relaxed line-clamp-2">{mod.desc}</p>
              </div>

              <div className="mt-auto space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] font-mono font-black uppercase tracking-widest">
                    <span className="text-white/30">Nível de Sincronia</span>
                    <span className={mod.locked ? 'text-white/20' : 'text-[#00E5FF]'}>{mod.progress}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${mod.progress}%` }}
                      className={`h-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_10px_rgba(0,229,255,0.3)]`}
                    />
                  </div>
                </div>

                {mod.locked ? (
                  <div className="flex items-center justify-center gap-3 py-4 bg-white/5 rounded-2xl border border-dashed border-white/10">
                    <Lock className="w-4 h-4 text-white/20" />
                    <span className="text-[10px] font-mono font-black text-white/20 uppercase tracking-widest">Acesso Restrito</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => setViewingDoc(mod)}
                    className="group/btn relative w-full py-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center gap-3 hover:bg-[#00E5FF] transition-all duration-500 overflow-hidden"
                  >
                    <span className="relative z-10 text-[11px] font-black text-white group-hover/btn:text-black uppercase tracking-[0.2em]">Iniciar Missão</span>
                    <ChevronRight className="relative z-10 w-4 h-4 text-[#00E5FF] group-hover/btn:text-black transition-colors" />
                    <div className="absolute inset-0 bg-[#00E5FF] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <DocViewerModal 
        isOpen={!!viewingDoc}
        onClose={() => setViewingDoc(null)}
        url={viewingDoc?.docUrl || ''}
        title={viewingDoc?.title || ''}
      />
    </section>
  );
};

export default DigitalDoctrine;
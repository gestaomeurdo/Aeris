"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Cpu, ChevronRight, Lock, Headphones, FileText } from 'lucide-react';
import { TrainingModule } from '@/types/portal';
import MissionModal from './MissionModal';

interface DigitalDoctrineProps {
  modules: TrainingModule[];
}

const DigitalDoctrine = ({ modules }: DigitalDoctrineProps) => {
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);

  const getIcon = (id: string) => {
    if (id.includes('01')) return Target;
    if (id.includes('02')) return Cpu;
    return Shield;
  };

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-[2px] w-12 bg-[#6366F1] shadow-[0_0_10px_#6366F1]" />
        <h3 className="text-3xl font-black text-white tracking-tighter uppercase">DOUTRINA <span className="font-light">DIGITAL</span></h3>
        <div className="flex-1 h-[1px] bg-white/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modules.map((mod, i) => {
          const Icon = getIcon(mod.id);
          
          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => !mod.locked && setSelectedModule(mod)}
              className={`group relative bg-[#0A192F]/60 backdrop-blur-2xl border ${mod.locked ? 'border-white/5 opacity-60' : 'border-white/10 hover:border-[#00E5FF]/40 cursor-pointer'} rounded-[32px] p-8 flex flex-col gap-6 transition-all duration-500 overflow-hidden shadow-2xl`}
            >
              <div className="flex justify-between items-start">
                <div className={`p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:border-[#00E5FF]/20 transition-all ${!mod.locked && 'group-hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]'}`}>
                  <Icon className={`w-8 h-8 ${mod.locked ? 'text-white/20' : 'text-[#00E5FF]'}`} />
                </div>
                <ChevronRight className={`w-5 h-5 ${mod.locked ? 'text-white/10' : 'text-white/20 group-hover:text-[#00E5FF]'} transition-colors`} />
              </div>

              <div className="space-y-3">
                <h4 className="text-2xl font-black text-white tracking-tighter leading-tight uppercase group-hover:text-[#00E5FF] transition-colors">{mod.title}</h4>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-white/30 uppercase tracking-widest">
                    <Headphones className="w-3 h-3" /> Audio Brief
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-white/30 uppercase tracking-widest">
                    <FileText className="w-3 h-3" /> Digital Doc
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-white/5">
                {mod.locked ? (
                  <div className="flex items-center justify-center gap-3 py-4 bg-white/5 rounded-2xl border border-dashed border-white/10">
                    <Lock className="w-4 h-4 text-white/20" />
                    <span className="text-[10px] font-mono font-black text-white/20 uppercase tracking-widest">Acesso Restrito</span>
                  </div>
                ) : (
                  <div className="flex justify-between items-center text-[10px] font-mono font-black uppercase tracking-widest text-[#00E5FF]">
                    <span>Iniciar Missão</span>
                    <span>{mod.id}</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <MissionModal 
        isOpen={!!selectedModule}
        onClose={() => setSelectedModule(null)}
        module={selectedModule}
      />
    </section>
  );
};

export default DigitalDoctrine;
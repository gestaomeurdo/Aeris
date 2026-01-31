"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Cpu, ChevronRight, Headphones, FileText, Activity, Layers } from 'lucide-react';
import { TrainingModule } from '@/types/portal';
import MissionModal from './MissionModal';

interface OperationsCenterProps {
  modules: TrainingModule[];
}

const TacticalCard = ({ mod, index, onSelect }: { mod: TrainingModule, index: number, onSelect: (m: TrainingModule) => void }) => {
  const Icon = mod.id.includes('01') ? Target : mod.id.includes('02') ? Cpu : Shield;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => !mod.locked && onSelect(mod)}
      className={`group relative bg-[#020B1A]/80 backdrop-blur-md border ${mod.locked ? 'border-white/5 opacity-50 cursor-not-allowed' : 'border-[#00E5FF]/20 hover:border-[#00E5FF]/60 cursor-pointer'} rounded-xl p-0 overflow-hidden transition-all duration-300 shadow-2xl`}
    >
      {/* HUD Scanline Effect */}
      {!mod.locked && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      )}

      <div className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div className="p-3 rounded-lg bg-[#00E5FF]/5 border border-[#00E5FF]/10 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all">
            <Icon className={`w-6 h-6 ${mod.locked ? 'text-white/20' : 'text-[#00E5FF]'}`} />
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full border ${mod.locked ? 'border-white/10' : 'border-[#00E5FF]/30 bg-[#00E5FF]/10'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${mod.locked ? 'bg-white/20' : 'bg-[#00E5FF] animate-pulse'}`} />
              <span className={`text-[8px] font-mono font-black uppercase tracking-tighter ${mod.locked ? 'text-white/20' : 'text-[#00E5FF]'}`}>
                {mod.locked ? 'ENCRYPTED' : 'READY FOR BRIEFING'}
              </span>
            </div>
            
            {/* Proficiency Level Meter */}
            {!mod.locked && (
              <div className="flex flex-col items-end gap-1">
                <span className="text-[7px] font-mono text-white/40 uppercase tracking-widest">Proficiency Level</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${mod.progress}%` }}
                      className="h-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]"
                    />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-[#00E5FF]">{mod.progress}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xl font-black text-white tracking-tighter uppercase group-hover:text-[#00E5FF] transition-colors leading-tight">
            {mod.title}
          </h4>
          <p className="text-[11px] text-white/40 leading-relaxed line-clamp-2 italic">
            "Objective: {mod.desc}"
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
           <div className="flex gap-3">
             <div className="flex items-center gap-1.5">
               <Headphones className="w-3 h-3 text-white/20" />
               <span className="text-[8px] font-mono text-white/40">VOX</span>
             </div>
             <div className="flex items-center gap-1.5">
               <FileText className="w-3 h-3 text-white/20" />
               <span className="text-[8px] font-mono text-white/40">DOC</span>
             </div>
           </div>
           
           {!mod.locked && (
             <div className="flex items-center gap-1 group/btn">
               <span className="text-[9px] font-mono font-black text-[#00E5FF] uppercase group-hover:mr-2 transition-all">ACCESS BRIEFING</span>
               <ChevronRight className="w-3 h-3 text-[#00E5FF]" />
             </div>
           )}
        </div>
      </div>
    </motion.div>
  );
};

const OperationsCenter = ({ modules }: OperationsCenterProps) => {
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);

  return (
    <section className="space-y-12">
      <div className="flex items-center gap-4 border-l-2 border-[#00E5FF] pl-6">
        <div className="space-y-1">
          <h3 className="text-4xl font-black text-white tracking-tighter uppercase">
            STRATEGIC <span className="font-light text-white/40">LEARNING ASSETS</span>
          </h3>
          <p className="text-[10px] font-mono font-black text-[#00E5FF]/40 uppercase tracking-[0.4em]">
            Operational Theater Status: Synchronized
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod, i) => (
          <TacticalCard 
            key={mod.id} 
            mod={mod} 
            index={i} 
            onSelect={setSelectedModule} 
          />
        ))}
      </div>

      <MissionModal 
        isOpen={!!selectedModule}
        onClose={() => setSelectedModule(null)}
        module={selectedModule}
      />
    </section>
  );
};

export default OperationsCenter;
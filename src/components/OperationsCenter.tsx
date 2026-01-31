"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Cpu, ChevronRight, Lock, Headphones, FileText, Activity, Layers, Trash2, Unlock, Edit3, ExternalLink, Database } from 'lucide-react';
import { TrainingModule } from '@/types/portal';
import MissionModal from './MissionModal';

interface OperationsCenterProps {
  modules: TrainingModule[];
  isMaster?: boolean;
  onDelete?: (id: string) => void;
  onToggleLock?: (id: string) => void;
  onEdit?: (m: TrainingModule) => void;
}

const TacticalCard = ({ 
  mod, 
  index, 
  onSelect, 
  onEdit,
  isMaster, 
  onDelete, 
  onToggleLock 
}: { 
  mod: TrainingModule, 
  index: number, 
  onSelect: (m: TrainingModule) => void,
  onEdit?: (m: TrainingModule) => void,
  isMaster?: boolean,
  onDelete?: (id: string) => void,
  onToggleLock?: (id: string) => void
}) => {
  const isDoc = !!mod.docUrl && !mod.audioUrl;
  const isLocked = mod.locked && !isMaster;
  
  // Escolha do ícone baseada no conteúdo
  const Icon = isDoc ? Database : (mod.id.includes('01') ? Target : mod.id.includes('02') ? Cpu : Shield);

  const handleClick = () => {
    if (isLocked) return;
    if (isDoc && mod.docUrl) {
      window.open(mod.docUrl, '_blank');
    } else {
      onSelect(mod);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group relative bg-[#020B1A]/80 backdrop-blur-md border ${isLocked ? 'border-red-500/10 opacity-50' : isDoc ? 'border-[#00E5FF]/30' : 'border-[#00E5FF]/20'} hover:border-[#00E5FF]/60 rounded-xl p-0 overflow-hidden transition-all duration-300 shadow-2xl`}
    >
      {/* Admin Controls */}
      {isMaster && (
        <div className="absolute top-4 right-4 z-20 flex gap-2">
           <button onClick={(e) => { e.stopPropagation(); onEdit?.(mod); }} className="p-2 bg-black/40 hover:bg-[#00E5FF]/20 border border-white/10 rounded-lg text-white/60 hover:text-[#00E5FF] transition-all"><Edit3 size={14} /></button>
           <button onClick={(e) => { e.stopPropagation(); onToggleLock?.(mod.id); }} className="p-2 bg-black/40 border border-white/10 rounded-lg text-white/60 hover:text-[#00E5FF] transition-all">{mod.locked ? <Lock size={14} /> : <Unlock size={14} />}</button>
           <button onClick={(e) => { e.stopPropagation(); onDelete?.(mod.id); }} className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 transition-all"><Trash2 size={14} /></button>
        </div>
      )}

      <div 
        onClick={handleClick}
        className={`p-6 space-y-6 ${!isLocked ? 'cursor-pointer group-hover:bg-white/[0.01]' : 'cursor-default'}`}
      >
        <div className="flex justify-between items-start pt-2">
          <div className={`p-3 rounded-lg ${isDoc ? 'bg-[#00E5FF]/10 border-[#00E5FF]/30' : 'bg-[#00E5FF]/5 border-[#00E5FF]/10'} group-hover:scale-110 transition-all`}>
            <Icon className={`w-6 h-6 ${isLocked ? 'text-white/20' : 'text-[#00E5FF]'}`} />
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${isLocked ? 'border-red-500/30 bg-red-500/10' : 'border-[#00E5FF]/30 bg-[#00E5FF]/10'}`}>
              <div className={`w-1 h-1 rounded-full ${isLocked ? 'bg-red-500' : 'bg-[#00E5FF] animate-pulse'}`} />
              <span className={`text-[8px] font-mono font-black uppercase tracking-tighter ${isLocked ? 'text-red-400' : 'text-[#00E5FF]'}`}>
                {isLocked ? 'ENCRYPTED' : isDoc ? 'READ-ONLY INTEL' : 'SIGNAL ACTIVE'}
              </span>
            </div>
            <span className="text-[8px] font-mono text-white/20 uppercase">{mod.type} // {mod.id}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xl font-black text-white tracking-tighter uppercase group-hover:text-[#00E5FF] transition-colors leading-tight">
            {mod.title}
          </h4>
          <p className="text-[11px] text-white/40 leading-relaxed line-clamp-2 italic">
            {isDoc ? "TECHNICAL MANUAL: Accessing secure repository data..." : mod.desc}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
           <div className="flex gap-3">
             <div className="flex items-center gap-1">
               <FileText className={`w-3 h-3 ${mod.docUrl ? 'text-[#00E5FF]' : 'text-white/20'}`} />
               <span className="text-[8px] font-mono text-white/40">DOC</span>
             </div>
             <div className="flex items-center gap-1">
               <Headphones className={`w-3 h-3 ${mod.audioUrl ? 'text-[#00E5FF]' : 'text-white/20'}`} />
               <span className="text-[8px] font-mono text-white/40">VOX</span>
             </div>
           </div>
           
           {!isLocked && (
             <div className="flex items-center gap-2 group/btn">
               <span className="text-[9px] font-mono font-black text-[#00E5FF] uppercase">
                 {isDoc ? 'VIEW FILE' : 'START MISSION'}
               </span>
               {isDoc ? <ExternalLink className="w-3 h-3 text-[#00E5FF]" /> : <ChevronRight className="w-3 h-3 text-[#00E5FF]" />}
             </div>
           )}
        </div>
      </div>
    </motion.div>
  );
};

const OperationsCenter = ({ modules, isMaster, onDelete, onToggleLock, onEdit }: OperationsCenterProps) => {
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);

  return (
    <section className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-[#00E5FF] animate-pulse" />
            <h3 className="text-4xl font-black text-white tracking-tighter uppercase">STRATEGIC <span className="font-light text-white/40">RESOURCES</span></h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod, i) => (
          <TacticalCard 
            key={mod.id} 
            mod={mod} 
            index={i} 
            onSelect={setSelectedModule} 
            onEdit={onEdit}
            isMaster={isMaster}
            onDelete={onDelete}
            onToggleLock={onToggleLock}
          />
        ))}
      </div>

      <MissionModal isOpen={!!selectedModule} onClose={() => setSelectedModule(null)} module={selectedModule} />
    </section>
  );
};

export default OperationsCenter;
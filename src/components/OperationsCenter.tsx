"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Cpu, ChevronRight, Lock, Headphones, FileText, Activity, Layers, Trash2, Unlock, Edit3 } from 'lucide-react';
import { TrainingModule } from '@/types/portal';
import MissionModal from './MissionModal';
import EditModuleModal from './EditModuleModal';

interface OperationsCenterProps {
  modules: TrainingModule[];
  isMaster?: boolean;
  onDelete?: (id: string) => void;
  onToggleLock?: (id: string) => void;
  onUpdateModule?: (updated: TrainingModule) => void;
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
  onEdit: (m: TrainingModule) => void,
  isMaster?: boolean,
  onDelete?: (id: string) => void,
  onToggleLock?: (id: string) => void
}) => {
  const Icon = mod.id.includes('01') ? Target : mod.id.includes('02') ? Cpu : Shield;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group relative bg-[#020B1A]/80 backdrop-blur-md border ${mod.locked ? 'border-white/5 opacity-50' : 'border-[#00E5FF]/20 hover:border-[#00E5FF]/60'} rounded-xl p-0 overflow-hidden transition-all duration-300 shadow-2xl`}
    >
      {/* Admin Controls Overlay */}
      {isMaster && (
        <div className="absolute top-4 right-4 z-20 flex gap-2">
           <button 
             onClick={(e) => { e.stopPropagation(); onEdit(mod); }}
             className="p-2 bg-black/40 hover:bg-[#00E5FF]/20 border border-white/10 rounded-lg text-white/60 hover:text-[#00E5FF] transition-all"
             title="Edit Parameters"
           >
             <Edit3 size={14} />
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); onToggleLock?.(mod.id); }}
             className="p-2 bg-black/40 hover:bg-[#00E5FF]/20 border border-white/10 rounded-lg text-white/60 hover:text-[#00E5FF] transition-all"
           >
             {mod.locked ? <Lock size={14} /> : <Unlock size={14} />}
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); onDelete?.(mod.id); }}
             className="p-2 bg-red-500/10 hover:bg-red-500/30 border border-red-500/20 rounded-lg text-red-500 transition-all"
           >
             <Trash2 size={14} />
           </button>
        </div>
      )}

      <div 
        onClick={() => !mod.locked && onSelect(mod)}
        className={`p-6 space-y-6 ${!mod.locked ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <div className="flex justify-between items-start pt-2">
          <div className={`p-3 rounded-lg bg-[#00E5FF]/5 border border-[#00E5FF]/10 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all`}>
            <Icon className={`w-6 h-6 ${mod.locked ? 'text-white/20' : 'text-[#00E5FF]'}`} />
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${mod.locked ? 'border-white/10' : 'border-[#00E5FF]/30 bg-[#00E5FF]/10'}`}>
              <div className={`w-1 h-1 rounded-full ${mod.locked ? 'bg-white/20' : 'bg-[#00E5FF] animate-pulse'}`} />
              <span className={`text-[8px] font-mono font-black uppercase tracking-tighter ${mod.locked ? 'text-white/20' : 'text-[#00E5FF]'}`}>
                {mod.locked ? 'ENCRYPTED' : 'READY FOR BRIEFING'}
              </span>
            </div>
            <span className="text-[8px] font-mono text-white/20 uppercase">ID: {mod.id}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xl font-black text-white tracking-tighter uppercase group-hover:text-[#00E5FF] transition-colors leading-tight">
            {mod.title}
          </h4>
          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-mono font-black text-[#00E5FF]/40 uppercase tracking-widest">Mission Objective</span>
            <p className="text-[11px] text-white/40 leading-relaxed line-clamp-2">
              {mod.desc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 h-4 w-full">
           <div className="h-full bg-[#00E5FF]/20 w-full rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${mod.progress}%` }}
               className="h-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]"
             />
           </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
           <div className="flex gap-3">
             <div className="flex items-center gap-1">
               <Headphones className={`w-3 h-3 ${mod.audioUrl ? 'text-[#00E5FF]' : 'text-white/20'}`} />
               <span className="text-[8px] font-mono text-white/40">VOX</span>
             </div>
             <div className="flex items-center gap-1">
               <FileText className={`w-3 h-3 ${mod.docUrl ? 'text-[#00E5FF]' : 'text-white/20'}`} />
               <span className="text-[8px] font-mono text-white/40">DOC</span>
             </div>
           </div>
           
           {!mod.locked && (
             <div className="flex items-center gap-1 group/btn">
               <span className="text-[9px] font-mono font-black text-[#00E5FF] uppercase group-hover:mr-2 transition-all">START MISSION</span>
               <ChevronRight className="w-3 h-3 text-[#00E5FF]" />
             </div>
           )}
        </div>
      </div>
    </motion.div>
  );
};

const OperationsCenter = ({ modules, isMaster, onDelete, onToggleLock, onUpdateModule }: OperationsCenterProps) => {
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);
  const [editingModule, setEditingModule] = useState<TrainingModule | null>(null);

  return (
    <section className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-[#00E5FF] animate-pulse" />
            <h3 className="text-4xl font-black text-white tracking-tighter uppercase">
              STRATEGIC <span className="font-light text-white/40">LEARNING ASSETS</span>
            </h3>
          </div>
          <p className="text-[10px] font-mono font-black text-[#00E5FF]/40 uppercase tracking-[0.4em] pl-8">
            Tactical readiness & intelligence synchronization
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white/[0.02] border border-white/10 rounded-xl px-5 py-3">
          <Layers className="w-4 h-4 text-white/40" />
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-white/20 uppercase">Deployment</span>
            <span className="text-xs font-mono font-black text-white/80">CORE_V1.0</span>
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
            onEdit={setEditingModule}
            isMaster={isMaster}
            onDelete={onDelete}
            onToggleLock={onToggleLock}
          />
        ))}
      </div>

      <MissionModal 
        isOpen={!!selectedModule}
        onClose={() => setSelectedModule(null)}
        module={selectedModule}
      />

      <EditModuleModal
        isOpen={!!editingModule}
        onClose={() => setEditingModule(null)}
        module={editingModule}
        onSave={(updated) => onUpdateModule?.(updated)}
      />
    </section>
  );
};

export default OperationsCenter;
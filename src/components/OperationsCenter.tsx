"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Layers, PlusCircle } from 'lucide-react';
import { TrainingModule } from '@/types/portal';
import MissionModal from './MissionModal';
import MissionBanner from './MissionBanner'; // Importando o novo componente

interface OperationsCenterProps {
  modules: TrainingModule[];
  isMaster?: boolean;
  onDelete?: (id: string) => void;
  onToggleLock?: (id: string) => void;
  onEdit?: (m: TrainingModule) => void;
}

const OperationsCenter = ({ modules, isMaster, onDelete, onToggleLock, onEdit }: OperationsCenterProps) => {
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);

  // Filtra apenas módulos que são 'module' (não 'podcast')
  const missionModules = modules.filter(m => m.category === 'module');

  return (
    <section className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-amber-500 animate-pulse" />
            <h3 className="text-4xl font-black text-white tracking-tighter uppercase">FIELD OPERATIONS <span className="font-light text-white/40">COMMAND</span></h3>
          </div>
          <p className="text-sm text-white/40 font-mono uppercase tracking-widest pl-8">Execute tactical training protocols.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {missionModules.map((mod, i) => (
          <MissionBanner 
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
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Target } from 'lucide-react';
import { TrainingModule } from '@/types/portal';

interface TroopReadinessProps {
  modules: TrainingModule[];
}

const TroopReadiness = ({ modules }: TroopReadinessProps) => {
  const avgProgress = modules.reduce((acc, m) => acc + m.progress, 0) / modules.length;

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <BarChart3 className="w-8 h-8 text-[#00E5FF]" />
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">TROOP <span className="font-light text-white/20">READINESS</span></h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Core Metric */}
        <div className="lg:col-span-2 bg-[#020B1A]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-10 space-y-8">
          <div className="flex justify-between items-center">
            <h4 className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.4em]">Fleet Performance Index</h4>
            <TrendingUp className="w-4 h-4 text-[#00E5FF]" />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-end">
               <span className="text-6xl font-black text-white">{Math.round(avgProgress)}%</span>
               <span className="text-xs font-mono text-[#00E5FF] mb-2">OPERATIONAL_CAPACITY</span>
            </div>
            <div className="h-4 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${avgProgress}%` }}
                 transition={{ duration: 1 }}
                 className="h-full bg-gradient-to-r from-[#00E5FF]/40 to-[#00E5FF] shadow-[0_0_20px_#00E5FF]"
               />
            </div>
          </div>
        </div>

        {/* Tactical Sub-stats */}
        <div className="space-y-4">
           {[
             { label: 'Active Personnel', val: '1,240', icon: Users },
             { label: 'Intelligence Sync', val: '98.4%', icon: Target },
             { label: 'System Uptime', val: '100%', icon: Shield }
           ].map((stat, i) => (
             <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center justify-between">
                <div className="space-y-1">
                   <p className="text-[9px] font-mono text-white/20 uppercase">{stat.label}</p>
                   <p className="text-xl font-bold text-white">{stat.val}</p>
                </div>
                <stat.icon className="w-5 h-5 text-white/20" />
             </div>
           ))}
        </div>
      </div>
      
      {/* Module Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {modules.map((mod, i) => (
           <div key={i} className="p-6 bg-black/40 border border-white/5 rounded-2xl space-y-3">
              <p className="text-[8px] font-mono text-white/20 uppercase">{mod.id}</p>
              <h5 className="text-sm font-bold text-white uppercase truncate">{mod.title}</h5>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-[#00E5FF]">{mod.progress}%</span>
                <div className={`w-2 h-2 rounded-full ${mod.progress > 50 ? 'bg-[#00E5FF]' : 'bg-red-500'} animate-pulse`} />
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default TroopReadiness;
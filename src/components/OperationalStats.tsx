"use client";

import React from 'react';
import { BarChart3, Activity, Zap, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const OperationalStats = () => {
  const stats = [
    { label: 'Asset Synchronization', value: '82%', icon: Activity },
    { label: 'Operational Readiness', value: 'LVL 4', icon: Zap },
    { label: 'Cohort Engagement', value: '94.2%', icon: Users },
  ];

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <BarChart3 className="w-6 h-6 text-[#00E5FF]" />
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">OPERATIONAL <span className="font-light text-white/20">METRICS</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-10 bg-black/40 border border-white/10 rounded-[32px] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-scanline opacity-5" />
            <stat.icon className="w-12 h-12 text-[#00E5FF]/20 absolute -top-2 -right-2 rotate-12 group-hover:rotate-0 transition-transform" />
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-mono font-black text-white/20 uppercase tracking-widest">{stat.label}</span>
              <p className="text-5xl font-black text-white">{stat.value}</p>
            </div>
            <div className="mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: '70%' }}
                 className="h-full bg-[#00E5FF] shadow-[0_0_15px_#00E5FF]"
               />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-12 aspect-[21/9] flex items-center justify-center overflow-hidden relative">
         <div className="absolute inset-0 bg-grid-pattern opacity-20" />
         <div className="flex items-end gap-3 h-48">
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${Math.random() * 100}%` }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: i * 0.05 }}
                className="w-4 bg-gradient-to-t from-[#00E5FF]/0 to-[#00E5FF]/40 rounded-t-lg"
              />
            ))}
         </div>
         <p className="absolute bottom-8 text-[10px] font-mono text-white/20 uppercase tracking-[1em]">Tactical Data Feed // REALTIME</p>
      </div>
    </div>
  );
};

export default OperationalStats;
"use client";

import React from 'react';
import AerisLogo from '@/components/AerisLogo';
import CommandBriefing from '@/components/CommandBriefing';
import OperationCard from '@/components/OperationCard';
import { Terminal, Target, Shield, Bell, Cpu, LayoutGrid, User } from 'lucide-react';
import { motion } from 'framer-motion';

const operations = [
  { code: "01", title: "Core Fundamentals", status: 'complete' as const, progress: 100 },
  { code: "02", title: "Tactical Operations", status: 'active' as const, progress: 45 },
  { code: "03", title: "Cyber Defense Matrix", status: 'locked' as const, progress: 0 },
  { code: "04", title: "Elite Leadership", status: 'locked' as const, progress: 0 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#020B1A] text-[#B0BEC5] font-sans selection:bg-[#00E5FF] selection:text-black overflow-x-hidden pb-20">
      {/* Background Decorativo Moderno */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00E5FF]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#6366F1]/5 blur-[120px] rounded-full" />
      </div>
      
      {/* Navegação Flutuante Lateral */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 w-16 bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-2xl flex flex-col items-center py-8 gap-8 z-50 shadow-2xl">
        <button className="group relative p-3 text-[#00E5FF] transition-all duration-300">
          <LayoutGrid className="w-5 h-5 group-hover:scale-110" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-[#00E5FF] rounded-r-full shadow-[0_0_10px_#00E5FF]" />
        </button>
        <button className="group p-3 text-white/20 hover:text-white transition-all">
          <Target className="w-5 h-5 group-hover:scale-110" />
        </button>
        <button className="group p-3 text-white/20 hover:text-white transition-all">
          <Terminal className="w-5 h-5 group-hover:scale-110" />
        </button>
        <div className="w-6 h-[1px] bg-white/5" />
        <button className="group p-3 text-white/20 hover:text-white transition-all mt-auto">
          <User className="w-5 h-5 group-hover:scale-110" />
        </button>
      </nav>

      <div className="pl-32 pr-12">
        <header className="pt-20 pb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
          >
            <AerisLogo />
          </motion.div>
          
          <div className="mt-12 flex items-center gap-12 text-[9px] font-mono text-white/30 uppercase tracking-[0.5em] font-black">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_12px_#00E5FF]" />
              NEURAL_LINK: OPTIMAL
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <div className="flex items-center gap-3">
              RANK: CYBER_ELITE
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto space-y-32">
          {/* Main Briefing Section */}
          <section className="space-y-10">
            <div className="flex justify-between items-end">
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-[#00E5FF] uppercase tracking-[0.4em] font-black pl-1">INTELLIGENCE NODE</span>
                <h2 className="text-5xl font-bold text-white tracking-tighter uppercase">MISSION BRIEFING</h2>
              </div>
              <div className="flex items-center gap-4 bg-white/[0.03] backdrop-blur-xl px-6 py-3 border border-white/5 rounded-full shadow-lg">
                <Cpu className="w-4 h-4 text-[#00E5FF]" />
                <span className="text-[10px] font-mono font-black text-white/80 uppercase tracking-widest">UPLINK_STABLE_V7.2</span>
              </div>
            </div>
            <CommandBriefing />
          </section>

          {/* Operations Grid */}
          <section className="space-y-12">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-white tracking-tighter uppercase">NEURAL MODULES</h3>
                <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] font-black">ACTIVE SYNCHRONIZATION THREADS</p>
              </div>
              <div className="flex items-center gap-4 px-6 py-3 bg-white/[0.03] border border-white/5 rounded-xl">
                <Shield className="w-4 h-4 text-[#00E5FF]" />
                <span className="text-[10px] font-black text-white/40 tracking-[0.2em] uppercase">Security Level: Omega</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {operations.map((op, idx) => (
                <OperationCard 
                  key={op.code}
                  code={op.code}
                  title={op.title}
                  status={op.status}
                  progress={op.progress}
                />
              ))}
            </div>
          </section>

          <footer className="pt-24 border-t border-white/5 flex flex-col items-center gap-8 opacity-20 hover:opacity-100 transition-opacity duration-700">
            <div className="flex gap-20 text-[9px] font-mono text-white/40 uppercase tracking-[0.6em] font-black">
              <span>AERIS_ACADEMY_v4.2</span>
              <span className="text-[#00E5FF]/20">/ /</span>
              <span>CYBER_COMMAND</span>
              <span className="text-[#00E5FF]/20">/ /</span>
              <span>2024</span>
            </div>
            <Bell className="w-4 h-4 text-[#00E5FF]/40 animate-pulse" />
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
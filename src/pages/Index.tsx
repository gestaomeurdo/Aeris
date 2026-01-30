"use client";

import React from 'react';
import AerisLogo from '@/components/AerisLogo';
import CommandBriefing from '@/components/CommandBriefing';
import OperationCard from '@/components/OperationCard';
import { Menu, Terminal, Target, Shield, Bell, Cpu, Grid3X3 } from 'lucide-react';

const operations = [
  { code: "01", title: "Core Fundamentals", status: 'complete' as const, progress: 100 },
  { code: "02", title: "Tactical Operations", status: 'active' as const, progress: 45 },
  { code: "03", title: "Cyber Defense Matrix", status: 'locked' as const, progress: 0 },
  { code: "04", title: "Elite Leadership", status: 'locked' as const, progress: 0 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      {/* Tactical HUD Overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.05),transparent_50%)] pointer-events-none" />
      
      {/* Sidebar Navigation - Elite Command Style */}
      <nav className="fixed left-0 top-0 bottom-0 w-20 bg-[#080808] border-r border-[#D4AF37]/10 flex flex-col items-center py-10 gap-10 z-50">
        <button className="p-3 text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all duration-300 border-b border-transparent hover:border-[#D4AF37]/30">
          <Grid3X3 className="w-6 h-6" />
        </button>
        <button className="p-3 text-zinc-600 hover:text-[#D4AF37] transition-all duration-300">
          <Target className="w-6 h-6" />
        </button>
        <button className="p-3 text-zinc-600 hover:text-[#D4AF37] transition-all duration-300">
          <Terminal className="w-6 h-6" />
        </button>
        <button className="p-3 text-zinc-600 hover:text-[#D4AF37] transition-all duration-300 mt-auto">
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Main Content Area */}
      <div className="pl-20">
        <header className="pt-16 pb-12 flex flex-col items-center relative">
          <AerisLogo />
          
          {/* Status Bar */}
          <div className="mt-10 flex items-center gap-10 text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] font-medium">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
              SECURE UPLINK
            </div>
            <div className="w-[1px] h-3 bg-zinc-800" />
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              CADET ID: ALPHA-7
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-8 pb-24 space-y-24">
          {/* Main Briefing Section */}
          <section className="space-y-8">
            <div className="flex justify-between items-end border-b border-zinc-900 pb-6">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-[0.3em] font-bold">Strategic Intelligence</span>
                <h2 className="text-3xl font-light text-white tracking-tight uppercase">Command <span className="font-bold">Briefing</span></h2>
              </div>
              <div className="flex items-center gap-4 bg-[#0A0A0A] p-3 border border-[#D4AF37]/20 rounded-sm">
                <Cpu className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-[10px] font-mono font-bold text-zinc-400">SIGMA-9 PROTOCOL</span>
              </div>
            </div>
            <CommandBriefing />
          </section>

          {/* Operations Grid */}
          <section className="space-y-10">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-2xl font-light text-white tracking-tight uppercase">Tactical <span className="font-bold">Modules</span></h3>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Select operation for deployment</p>
              </div>
              <div className="flex items-center gap-4 px-5 py-3 bg-[#0A0A0A] border border-[#D4AF37]/10">
                <Shield className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-bold text-zinc-300 tracking-widest uppercase">Rank: Elite Cadet</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {operations.map((op) => (
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

          <footer className="pt-20 border-t border-zinc-900/50 flex flex-col items-center gap-6 opacity-40 hover:opacity-100 transition-all duration-500">
            <div className="flex gap-16 text-[9px] font-mono text-zinc-600 uppercase tracking-[0.5em] font-bold">
              <span>AERIS ACADEMY</span>
              <span className="text-[#D4AF37]/30">|</span>
              <span>PRESTIGE DIVISION</span>
              <span className="text-[#D4AF37]/30">|</span>
              <span>v4.0.2</span>
            </div>
          </footer>
        </main>
      </div>

      {/* Aesthetic HUD Elements */}
      <div className="fixed top-10 right-10 flex flex-col gap-6 pointer-events-none opacity-20">
        <Bell className="w-4 h-4 text-[#D4AF37]" />
        <div className="h-40 w-[1px] bg-gradient-to-b from-[#D4AF37] to-transparent" />
      </div>
    </div>
  );
};

export default Index;
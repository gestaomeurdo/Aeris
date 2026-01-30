"use client";

import React from 'react';
import AerisLogo from '@/components/AerisLogo';
import CommandBriefing from '@/components/CommandBriefing';
import OperationCard from '@/components/OperationCard';
import { Menu, Terminal, Target, Shield, Bell, Cpu, Grid3X3, Github } from 'lucide-react';

const operations = [
  { code: "01", title: "Core Fundamentals", status: 'complete' as const, progress: 100 },
  { code: "02", title: "Tactical Operations", status: 'active' as const, progress: 45 },
  { code: "03", title: "Cyber Defense Matrix", status: 'locked' as const, progress: 0 },
  { code: "04", title: "Elite Leadership", status: 'locked' as const, progress: 0 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#020B1A] text-[#B0BEC5] font-sans selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      {/* Cyber Space Overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.05),transparent_50%)] pointer-events-none" />
      
      {/* Sidebar Navigation - Space Command Style */}
      <nav className="fixed left-0 top-0 bottom-0 w-20 bg-[#020B1A] border-r border-[#00E5FF]/10 flex flex-col items-center py-10 gap-10 z-50">
        <button className="p-3 text-[#00E5FF] hover:bg-[#00E5FF]/5 transition-all duration-300 border-b border-transparent hover:border-[#00E5FF]/30">
          <Grid3X3 className="w-6 h-6" />
        </button>
        <button className="p-3 text-[#B0BEC5]/40 hover:text-[#00E5FF] transition-all duration-300">
          <Target className="w-6 h-6" />
        </button>
        <button className="p-3 text-[#B0BEC5]/40 hover:text-[#00E5FF] transition-all duration-300">
          <Terminal className="w-6 h-6" />
        </button>
        {/* GitHub Link Added */}
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-3 text-[#B0BEC5]/40 hover:text-[#00E5FF] transition-all duration-300"
        >
          <Github className="w-6 h-6" />
        </a>
        <button className="p-3 text-[#B0BEC5]/40 hover:text-[#00E5FF] transition-all duration-300 mt-auto">
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Main Content Area */}
      <div className="pl-20">
        <header className="pt-16 pb-12 flex flex-col items-center relative">
          <AerisLogo />
          
          {/* Status Bar */}
          <div className="mt-10 flex items-center gap-10 text-[10px] font-mono text-[#B0BEC5]/40 uppercase tracking-[0.4em] font-medium">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
              NEURAL LINK: ACTIVE
            </div>
            <div className="w-[1px] h-3 bg-[#B0BEC5]/10" />
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A192F]" />
              CADET NODE: ALPHA-7
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-8 pb-24 space-y-24">
          {/* Main Briefing Section */}
          <section className="space-y-8">
            <div className="flex justify-between items-end border-b border-[#00E5FF]/10 pb-6">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#00E5FF] uppercase tracking-[0.3em] font-bold">Cyber Intelligence</span>
                <h2 className="text-3xl font-light text-white tracking-tight uppercase">MISSION <span className="font-bold">BRIEFING</span></h2>
              </div>
              <div className="flex items-center gap-4 bg-[#0A192F] p-3 border border-[#00E5FF]/20 rounded-sm">
                <Cpu className="w-5 h-5 text-[#00E5FF]" />
                <span className="text-[10px] font-mono font-bold text-[#B0BEC5]">UPLINK STABLE</span>
              </div>
            </div>
            <CommandBriefing />
          </section>

          {/* Operations Grid */}
          <section className="space-y-10">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-2xl font-light text-white tracking-tight uppercase">Neural <span className="font-bold">Modules</span></h3>
                <p className="text-[10px] font-mono text-[#B0BEC5]/40 uppercase tracking-widest">Select module for synchronization</p>
              </div>
              <div className="flex items-center gap-4 px-5 py-3 bg-[#0A192F] border border-[#00E5FF]/10">
                <Shield className="w-4 h-4 text-[#00E5FF]" />
                <span className="text-xs font-bold text-[#B0BEC5] tracking-widest uppercase">Rank: Cyber Elite</span>
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

          <footer className="pt-20 border-t border-[#00E5FF]/10 flex flex-col items-center gap-6 opacity-40 hover:opacity-100 transition-all duration-500">
            <div className="flex gap-16 text-[9px] font-mono text-[#B0BEC5] uppercase tracking-[0.5em] font-bold">
              <span>AERIS ACADEMY</span>
              <span className="text-[#00E5FF]/30">|</span>
              <span>CYBER DIVISION</span>
              <span className="text-[#00E5FF]/30">|</span>
              <span>v4.0.2</span>
            </div>
          </footer>
        </main>
      </div>

      {/* Aesthetic Space HUD Elements */}
      <div className="fixed top-10 right-10 flex flex-col gap-6 pointer-events-none opacity-20">
        <Bell className="w-4 h-4 text-[#00E5FF]" />
        <div className="h-40 w-[1px] bg-gradient-to-b from-[#00E5FF] to-transparent" />
      </div>
    </div>
  );
};

export default Index;
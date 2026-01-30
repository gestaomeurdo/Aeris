"use client";

import React from 'react';
import AerisLogo from '@/components/AerisLogo';
import CommandBriefing from '@/components/CommandBriefing';
import OperationCard from '@/components/OperationCard';
import { Menu, Terminal, Target, Shield, Bell, Cpu, Grid } from 'lucide-react';

const operations = [
  { code: "01", title: "Core Fundamentals", status: 'complete' as const, progress: 100 },
  { code: "02", title: "Tactical Operations", status: 'active' as const, progress: 45 },
  { code: "03", title: "Cyber Defense Matrix", status: 'locked' as const, progress: 0 },
  { code: "04", title: "Elite Leadership", status: 'locked' as const, progress: 0 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-zinc-200 font-sans selection:bg-amber-800 selection:text-amber-100 overflow-x-hidden">
      {/* Tactical Grid Background (Ouro Envelhecido) */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(146,64,14,0.03),transparent)] pointer-events-none" />
      
      {/* Sidebar Navigation */}
      <nav className="fixed left-0 top-0 bottom-0 w-20 bg-black border-r border-zinc-900 flex flex-col items-center py-8 gap-8 z-50">
        <button className="p-3 text-amber-700 hover:bg-amber-950/20 rounded-none border-l-2 border-amber-600 shadow-[0_0_10px_rgba(180,120,50,0.1)]">
          <Grid className="w-6 h-6" />
        </button>
        <button className="p-3 text-zinc-700 hover:text-amber-600 transition-colors">
          <Target className="w-6 h-6" />
        </button>
        <button className="p-3 text-zinc-700 hover:text-amber-600 transition-colors">
          <Terminal className="w-6 h-6" />
        </button>
        <button className="p-3 text-zinc-700 hover:text-amber-600 transition-colors mt-auto">
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Main Container */}
      <div className="pl-20">
        {/* Header Section */}
        <header className="pt-16 pb-12 flex flex-col items-center">
          <AerisLogo />
          <div className="mt-8 flex items-center gap-12 text-[9px] font-mono text-zinc-700 uppercase tracking-[0.4em] font-bold">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-900 shadow-[0_0_5px_rgba(120,53,15,0.5)]" />
              AUTH: COMMANDER
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse shadow-[0_0_8px_rgba(217,119,6,0.4)]" />
              STATUS: ENCRYPTED
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              SECTOR: 7-ALPHA
            </div>
          </div>
        </header>

        {/* Tactical Content */}
        <main className="max-w-7xl mx-auto px-12 py-8 space-y-20">
          {/* Briefing Module */}
          <section className="space-y-8">
            <div className="flex justify-between items-end border-b border-zinc-900/50 pb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-amber-900 uppercase tracking-[0.4em] font-black">Strategic Objective</span>
                <h3 className="text-3xl font-black uppercase tracking-tighter text-zinc-100">COMMAND BRIEFING</h3>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest font-bold">Protocol</p>
                  <p className="text-sm font-black text-amber-700">SIGMA-IV</p>
                </div>
                <div className="p-4 bg-zinc-950 border border-zinc-900 shadow-inner">
                  <Cpu className="w-6 h-6 text-amber-800" />
                </div>
              </div>
            </div>
            <CommandBriefing />
          </section>

          {/* Operations Grid */}
          <section className="space-y-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 flex items-center justify-center bg-amber-950/10 border border-amber-900/20 shadow-xl">
                  <Target className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-zinc-100">Training Operations</h3>
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] font-bold">Current Cycle: 04.1 // Beta Unit</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 bg-zinc-950/50 p-4 border border-zinc-900 shadow-2xl">
                <div className="text-right">
                  <p className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest font-bold">Access Rank</p>
                  <p className="text-sm font-black text-amber-600">CADET ELITE</p>
                </div>
                <div className="w-10 h-10 rounded-none bg-black flex items-center justify-center border border-amber-900/30 shadow-[0_0_15px_rgba(180,120,50,0.1)]">
                  <Shield className="w-5 h-5 text-amber-800" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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

          <footer className="pt-24 pb-16 flex flex-col items-center gap-8 opacity-30 hover:opacity-100 transition-opacity duration-700">
            <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-amber-900/40 to-transparent" />
            <div className="flex gap-16 text-[9px] font-mono text-zinc-700 uppercase tracking-[0.5em] font-bold">
              <span>AERIS ACADEMY</span>
              <span className="text-amber-900/50">///</span>
              <span>EST. MCMLXXXIV</span>
              <span className="text-amber-900/50">///</span>
              <span>SECURE SESSION</span>
            </div>
          </footer>
        </main>
      </div>

      {/* OS Decor Elements */}
      <div className="fixed top-0 right-0 p-10 flex flex-col gap-6 pointer-events-none">
        <Bell className="w-4 h-4 text-zinc-900" />
        <div className="h-48 w-[1px] bg-gradient-to-b from-amber-900/20 via-zinc-900 to-transparent" />
      </div>
      
      <div className="fixed bottom-10 left-28 pointer-events-none">
        <div className="text-[8px] font-mono text-zinc-800 uppercase space-y-2 font-bold tracking-widest">
          <p>SYS.UPLINK: STABLE</p>
          <p>ENCRYPTION: 4096-BIT</p>
          <p>LOCATION: CLASSIFIED</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
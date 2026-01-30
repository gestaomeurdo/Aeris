"use client";

import React from 'react';
import AerisLogo from '@/components/AerisLogo';
import CommandBriefing from '@/components/CommandBriefing';
import OperationCard from '@/components/OperationCard';
import { Menu, Terminal, Target, Shield, Bell, Cpu, Grid } from 'lucide-react';
import { MadeWithDyad } from "@/components/made-with-dyad";

const operations = [
  { code: "01", title: "Core Fundamentals", status: 'complete' as const, progress: 100 },
  { code: "02", title: "Tactical Operations", status: 'active' as const, progress: 45 },
  { code: "03", title: "Cyber Defense Matrix", status: 'locked' as const, progress: 0 },
  { code: "04", title: "Elite Leadership", status: 'locked' as const, progress: 0 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-zinc-100 font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden">
      {/* Tactical Grid Background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.02),transparent)] pointer-events-none" />
      
      {/* Sidebar Navigation */}
      <nav className="fixed left-0 top-0 bottom-0 w-20 bg-zinc-950 border-r border-zinc-900 flex flex-col items-center py-8 gap-8 z-50">
        <button className="p-3 text-amber-500 hover:bg-amber-500/5 rounded-none border-l-2 border-amber-500">
          <Grid className="w-6 h-6" />
        </button>
        <button className="p-3 text-zinc-600 hover:text-amber-500 transition-colors">
          <Target className="w-6 h-6" />
        </button>
        <button className="p-3 text-zinc-600 hover:text-amber-500 transition-colors">
          <Terminal className="w-6 h-6" />
        </button>
        <button className="p-3 text-zinc-600 hover:text-amber-500 transition-colors mt-auto">
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Main Container */}
      <div className="pl-20">
        {/* Header Section */}
        <header className="pt-12 pb-8 flex flex-col items-center">
          <AerisLogo />
          <div className="mt-8 flex items-center gap-12 text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              SYSTEM: ONLINE
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              NETWORK: SECURE
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              REGION: US-EAST
            </div>
          </div>
        </header>

        {/* Tactical Content */}
        <main className="max-w-7xl mx-auto px-12 py-8 space-y-16">
          {/* Briefing Module */}
          <section className="space-y-6">
            <div className="flex justify-between items-end border-b border-zinc-900 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-amber-600 uppercase tracking-widest font-bold">Priority Delta</span>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white">Active Intelligence Brief</h3>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-[9px] font-mono text-zinc-500 uppercase">Authorization</p>
                  <p className="text-sm font-bold text-zinc-300">Level 05 Alpha</p>
                </div>
                <div className="p-3 bg-zinc-900 border border-zinc-800">
                  <Cpu className="w-5 h-5 text-amber-500" />
                </div>
              </div>
            </div>
            <CommandBriefing />
          </section>

          {/* Operations Grid */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-amber-500/10 border border-amber-500/20">
                  <Target className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tighter text-white">Training Operations</h3>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">Deployment Schedule: Cycle 04</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[9px] font-mono text-zinc-500 uppercase">Unit Status</p>
                  <p className="text-sm font-bold text-amber-500">RANK: CADET ELITE</p>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-amber-500/20 p-1">
                  <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <Shield className="w-5 h-5 text-amber-500" />
                  </div>
                </div>
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

          <footer className="pt-20 pb-12 flex flex-col items-center gap-6 opacity-40 hover:opacity-100 transition-opacity">
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
            <div className="flex gap-12 text-[9px] font-mono text-zinc-600 uppercase tracking-[0.4em]">
              <span>Protocol v2.4</span>
              <span>Encrypted Session</span>
              <span>Terminal 0x1A4</span>
            </div>
            <MadeWithDyad />
          </footer>
        </main>
      </div>

      {/* OS Decor Elements */}
      <div className="fixed top-0 right-0 p-8 flex flex-col gap-4 pointer-events-none">
        <Bell className="w-4 h-4 text-zinc-800" />
        <div className="h-32 w-[1px] bg-zinc-900" />
      </div>
      
      <div className="fixed bottom-8 left-24 pointer-events-none">
        <div className="text-[8px] font-mono text-zinc-800 uppercase space-y-1">
          <p>System Boot: SUCCESS</p>
          <p>Kernel: AERIS-X64-CMD</p>
          <p>User: AUTHENTICATED</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
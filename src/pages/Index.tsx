"use client";

import React from 'react';
import AerisLogo from '@/components/AerisLogo';
import MissionBriefing from '@/components/MissionBriefing';
import AudioIntelligence from '@/components/AudioIntelligence';
import DigitalDoctrine from '@/components/DigitalDoctrine';
import { Terminal, Target, Shield, Bell, Cpu, LayoutGrid, User, Search, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-[#B0BEC5] font-sans selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-[#00E5FF]/5 blur-[120px] rounded-full opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-[50%] h-[50%] bg-[#6366F1]/5 blur-[120px] rounded-full opacity-50" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
      </div>
      
      {/* HUD Navigation Sidebar */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 w-20 bg-black/40 backdrop-blur-3xl border border-white/5 rounded-[32px] flex flex-col items-center py-10 gap-10 z-50 shadow-2xl">
        <div className="mb-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#6366F1] flex items-center justify-center p-2.5 shadow-[0_0_20px_rgba(0,229,255,0.3)]">
            <AerisLogo />
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          <button className="group relative p-4 text-[#00E5FF] transition-all duration-300">
            <LayoutGrid className="w-6 h-6 group-hover:scale-110" />
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#00E5FF] rounded-r-full shadow-[0_0_15px_#00E5FF]" />
          </button>
          <button className="group p-4 text-white/20 hover:text-white transition-all">
            <Target className="w-6 h-6 group-hover:scale-110" />
          </button>
          <button className="group p-4 text-white/20 hover:text-white transition-all">
            <Terminal className="w-6 h-6 group-hover:scale-110" />
          </button>
          <button className="group p-4 text-white/20 hover:text-white transition-all">
            <Shield className="w-6 h-6 group-hover:scale-110" />
          </button>
        </div>

        <div className="mt-auto flex flex-col gap-6">
          <button className="group p-4 text-white/20 hover:text-white transition-all">
            <User className="w-6 h-6 group-hover:scale-110" />
          </button>
        </div>
      </nav>

      {/* Main Content Dashboard */}
      <div className="pl-32 pr-12">
        <header className="pt-12 pb-12 flex justify-between items-center border-b border-white/5 mb-16">
          <div className="flex items-center gap-12">
            <div className="space-y-1">
              <p className="text-[10px] font-mono font-black text-white/30 uppercase tracking-[0.5em]">Command Center v9.0</p>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase">OPERATOR DASHBOARD</h1>
            </div>
            <div className="hidden md:flex items-center gap-8 px-8 py-3 bg-white/[0.03] rounded-2xl border border-white/5">
              <div className="flex items-center gap-3">
                <Wifi className="w-4 h-4 text-[#00E5FF]" />
                <span className="text-[10px] font-mono font-black text-white/60 tracking-widest">NET: ACTIVE</span>
              </div>
              <div className="w-[1px] h-4 bg-white/10" />
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                <span className="text-[10px] font-mono font-black text-white/60 tracking-widest">SENSORS: OPTIMAL</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-hover:text-[#00E5FF] transition-colors" />
              <input 
                type="text" 
                placeholder="PROCURAR MISSÃO..." 
                className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-[10px] font-mono font-black text-white placeholder:text-white/20 focus:outline-none focus:border-[#00E5FF]/40 focus:ring-1 focus:ring-[#00E5FF]/20 transition-all w-64"
              />
            </div>
            <button className="relative p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
              <Bell className="w-5 h-5 text-white/40" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-[#020617]" />
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto space-y-32 pb-32">
          {/* Main Content Components */}
          <MissionBriefing />
          
          <AudioIntelligence />
          
          <DigitalDoctrine />

          {/* HUD Footer Decor */}
          <footer className="pt-20 flex flex-col items-center gap-10 opacity-30">
            <div className="flex items-center gap-20">
              <div className="flex flex-col items-center gap-2">
                <span className="text-[9px] font-black text-white/40 tracking-[0.4em] uppercase">Security Matrix</span>
                <div className="flex gap-1">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={`h-1 w-4 rounded-full ${i < 8 ? 'bg-[#00E5FF]' : 'bg-white/10'}`} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-[9px] font-black text-white/40 tracking-[0.4em] uppercase">Neural Uplink</span>
                <div className="flex gap-1">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={`h-1 w-4 rounded-full ${i < 10 ? 'bg-[#6366F1]' : 'bg-white/10'}`} />
                  ))}
                </div>
              </div>
            </div>
            <div className="text-[9px] font-mono font-black text-white/20 tracking-[1em] uppercase">
              // AERIS ACADEMY TERMINAL // END OF LINE //
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
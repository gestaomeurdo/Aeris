"use client";

import React from 'react';
import AerisLogo from '@/components/AerisLogo';
import VideoBriefing from '@/components/VideoBriefing';
import MissionCard from '@/components/MissionCard';
import { LayoutDashboard, Target, BookOpen, Shield, Bell, Settings } from 'lucide-react';
import { MadeWithDyad } from "@/components/made-with-dyad";

const missions = [
  { id: "M-01", title: "Core Fundamentals", type: "Essential Training", progress: 100 },
  { id: "M-02", title: "Tactical Operations", type: "Field Strategy", progress: 45 },
  { id: "M-03", title: "Cyber Defense Matrix", type: "Security Protocols", progress: 0, isLocked: true },
  { id: "M-04", title: "Elite Leadership", type: "Command Path", progress: 0, isLocked: true },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-zinc-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 h-24 border-b border-amber-500/10 bg-black/80 backdrop-blur-xl z-50 px-8 flex items-center justify-between">
        <div className="w-64 hidden lg:flex items-center gap-6">
          <button className="p-2 text-zinc-500 hover:text-amber-500 transition-colors">
            <LayoutDashboard className="w-5 h-5" />
          </button>
          <button className="p-2 text-amber-500 bg-amber-500/10 rounded-lg">
            <Target className="w-5 h-5" />
          </button>
          <button className="p-2 text-zinc-500 hover:text-amber-500 transition-colors">
            <BookOpen className="w-5 h-5" />
          </button>
        </div>

        <AerisLogo />

        <div className="w-64 flex justify-end items-center gap-4">
          <button className="relative p-2 text-zinc-500 hover:text-amber-500 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full" />
          </button>
          <div className="h-8 w-[1px] bg-zinc-800" />
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest">Rank: Cadet</p>
              <p className="text-xs font-bold text-white">John Doe</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-amber-500/20 flex items-center justify-center overflow-hidden">
              <Shield className="w-5 h-5 text-amber-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-12 px-8 max-w-7xl mx-auto">
        {/* Hero Section / Briefing */}
        <section className="mb-16">
          <div className="flex flex-col items-center mb-10 text-center">
            <h2 className="text-zinc-500 text-[10px] font-mono uppercase tracking-[0.5em] mb-2">Operation: Level Up</h2>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">COMMAND CENTER</h1>
            <div className="h-1 w-24 bg-amber-500 rounded-full" />
          </div>

          <div className="w-full lg:w-[85%] mx-auto">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs font-mono text-amber-500 uppercase font-bold">Priority One Intel</span>
              </div>
              <span className="text-xs font-mono text-zinc-500">Subject: Tactical Systems v2.4</span>
            </div>
            <VideoBriefing />
          </div>
        </section>

        {/* Missions Grid */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-amber-500" />
              <h3 className="text-xl font-bold uppercase tracking-tight">Active Training Modules</h3>
            </div>
            <div className="flex items-center gap-6 text-[10px] font-mono text-zinc-500 uppercase">
              <div className="flex items-center gap-2">
                <span className="text-amber-500 font-bold">04</span> Total
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-500 font-bold">01</span> Completed
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {missions.map((mission) => (
              <MissionCard 
                key={mission.id}
                id={mission.id}
                title={mission.title}
                type={mission.type}
                progress={mission.progress}
                isLocked={mission.isLocked}
              />
            ))}
          </div>
        </section>

        <footer className="mt-20 pt-8 border-t border-zinc-900 flex flex-col items-center gap-4">
          <div className="flex items-center gap-8 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
            <span className="hover:text-amber-500 cursor-pointer transition-colors">Terms of Engagement</span>
            <span className="hover:text-amber-500 cursor-pointer transition-colors">Privacy Shield</span>
            <span className="hover:text-amber-500 cursor-pointer transition-colors">Command Support</span>
          </div>
          <MadeWithDyad />
        </footer>
      </main>

      {/* Decorative Side Elements */}
      <div className="fixed left-4 bottom-4 flex flex-col gap-4 text-zinc-800 pointer-events-none hidden lg:flex">
        <span className="text-[10px] font-mono rotate-90 origin-left tracking-[0.3em] uppercase">Security Level: Class A</span>
      </div>
    </div>
  );
};

export default Index;
"use client";

import React from 'react';
import Sidebar from '@/components/Sidebar';
import MainPlayer from '@/components/MainPlayer';
import ChapterCard from '@/components/ChapterCard';
import { Search, Bell, User } from 'lucide-react';
import { MadeWithDyad } from "@/components/made-with-dyad";

const chapters = [
  { title: "Arquitetura de Sistemas High-Load", duration: "45 min", progress: 85 },
  { title: "Cloud Native e Microserviços", duration: "1h 20 min", progress: 40 },
  { title: "Segurança em Ambientes Distribuídos", duration: "55 min", progress: 0 },
  { title: "IA Generativa Aplicada ao Dev", duration: "30 min", progress: 0 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-zinc-100 flex font-sans selection:bg-cyan-500 selection:text-black">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Boas-vindas ao <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Futuro</span>
            </h1>
            <p className="text-zinc-500 mt-1">Sua jornada tech de hoje: Arquitetura Avançada.</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-cyan-400" />
              <input 
                type="text" 
                placeholder="Pesquisar recursos..." 
                className="bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 w-64 transition-all"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-cyan-400 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 pl-3 border-l border-zinc-800">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-900 border border-zinc-700 flex items-center justify-center">
                  <User className="w-5 h-5 text-zinc-400" />
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-semibold">User Admin</p>
                  <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-wider">Plan Pro</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  Em Reprodução
                </h2>
                <span className="text-sm text-cyan-400 font-medium">Módulo 04 / Aula 12</span>
              </div>
              <MainPlayer />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-4">Estatísticas de Aprendizado</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Horas Assistidas", value: "124h", color: "text-cyan-400" },
                  { label: "Projetos Concluídos", value: "18", color: "text-blue-400" },
                  { label: "Rank Global", value: "#42", color: "text-purple-400" }
                ].map((stat) => (
                  <div key={stat.label} className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-4">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar - Chapters */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Currículo do Curso</h2>
              <button className="text-sm text-zinc-500 hover:text-white transition-colors underline underline-offset-4">Ver tudo</button>
            </div>
            <div className="space-y-4">
              {chapters.map((chapter, idx) => (
                <ChapterCard 
                  key={idx}
                  index={idx}
                  title={chapter.title}
                  duration={chapter.duration}
                  progress={chapter.progress}
                />
              ))}
            </div>
          </div>
        </div>

        <MadeWithDyad />
      </main>
    </div>
  );
};

export default Index;
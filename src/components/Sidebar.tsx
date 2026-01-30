"use client";

import React from 'react';
import { LayoutDashboard, BookOpen, Video, Mic, Settings, LogOut, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: BookOpen, label: 'Capítulos', active: false },
  { icon: Video, label: 'Aulas Ao Vivo', active: false },
  { icon: Mic, label: 'Podcasts', active: false },
  { icon: Settings, label: 'Configurações', active: false },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col z-50">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)]">
          <Cpu className="text-black w-6 h-6" />
        </div>
        <span className="text-2xl font-bold tracking-tighter text-white">AERIS</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
              item.active 
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-colors",
              item.active ? "text-cyan-400" : "text-zinc-500 group-hover:text-cyan-400"
            )} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-red-400 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
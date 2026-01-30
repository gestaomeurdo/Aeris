"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TacticalButtonProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  className?: string;
}

const TacticalButton = ({ icon: Icon, label, onClick, className }: TacticalButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 0.98, y: 1 }}
      whileTap={{ scale: 0.95, y: 2 }}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center justify-center gap-2 p-4 min-w-[80px]",
        "bg-gradient-to-b from-zinc-800 to-zinc-950",
        "border border-zinc-700/30 rounded-md",
        "shadow-[0_4px_0_0_rgba(0,0,0,1),0_8px_16px_rgba(0,0,0,0.5)]",
        "active:shadow-[0_1px_0_0_rgba(0,0,0,1)] active:translate-y-[3px]",
        "transition-all duration-100",
        className
      )}
    >
      {/* Luz indicadora em Ouro Metálico */}
      <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
      
      <div className="p-2 rounded bg-black/40 border border-white/5 group-hover:border-amber-600/40 transition-colors">
        <Icon className="w-5 h-5 text-zinc-500 group-hover:text-amber-500 transition-colors" />
      </div>
      
      <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 group-hover:text-amber-200/80 transition-colors">
        {label}
      </span>

      {/* Glossy Overlay (Efeito Metal Escovado) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
    </motion.button>
  );
};

export default TacticalButton;
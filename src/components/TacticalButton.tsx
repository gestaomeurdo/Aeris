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
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center justify-center gap-3 py-5 px-3",
        "bg-white/[0.03] backdrop-blur-md border border-white/[0.05] rounded-xl",
        "transition-all duration-500 hover:border-[#00E5FF]/40 hover:bg-[#00E5FF]/5",
        "hover:shadow-[0_8px_30px_rgb(0,0,0,0.12),0_0_20px_rgba(0,229,255,0.1)]",
        className
      )}
    >
      <Icon className="w-5 h-5 text-[#B0BEC5]/60 group-hover:text-[#00E5FF] transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]" />
      
      <span className="text-[8px] font-mono font-bold uppercase tracking-[0.25em] text-[#B0BEC5]/40 group-hover:text-[#00E5FF]/80 transition-colors duration-300">
        {label}
      </span>

      {/* Indicador de Seleção Interno */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#00E5FF] group-hover:w-1/3 transition-all duration-500 rounded-full" />
    </motion.button>
  );
};

export default TacticalButton;
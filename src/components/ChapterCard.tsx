"use client";

import React from 'react';
import { FileText, Play, Podcast, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ChapterCardProps {
  title: string;
  duration: string;
  progress: number;
  index: number;
}

const ChapterCard = ({ title, duration, progress, index }: ChapterCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 hover:border-cyan-500/30 transition-all duration-500"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Capítulo {index + 1}</span>
          <h3 className="text-lg font-semibold text-white mt-1 group-hover:text-cyan-400 transition-colors">{title}</h3>
        </div>
        <div className="p-2 rounded-full bg-zinc-800 text-zinc-400">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-sm text-zinc-400">
          <span>{duration}</span>
          <div className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>{progress}% concluído</span>
        </div>

        <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 bg-zinc-800/50 border-zinc-700 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 gap-2 transition-all">
            <FileText className="w-3 h-3" /> PDF
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-zinc-800/50 border-zinc-700 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 gap-2 transition-all">
            <Play className="w-3 h-3" /> Vídeo
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-zinc-800/50 border-zinc-700 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 gap-2 transition-all">
            <Podcast className="w-3 h-3" /> Cast
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChapterCard;
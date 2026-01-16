
import React from 'react';
import { Heart, Stars, Moon, Sun } from 'lucide-react';

export interface ThemeConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  colors: {
    bg: string;
    text: string;
    accent: string;
    card: string;
    gradient: string;
    border: string;
  };
  typography: {
    serif: boolean;
    tracking: string;
  };
  animation: 'float' | 'sparkle' | 'drift' | 'pulse';
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'classic',
    name: 'Classic Romance',
    icon: <Heart className="w-5 h-5" />,
    colors: {
      bg: 'bg-[#fff9f5]',
      text: 'text-[#5d4037]',
      accent: 'bg-[#d81b60]',
      card: 'bg-white/70 backdrop-blur-md',
      gradient: 'from-rose-100 via-orange-50 to-rose-100',
      border: 'border-rose-200/50',
    },
    typography: {
      serif: true,
      tracking: 'tracking-tight',
    },
    animation: 'float'
  },
  {
    id: 'ethereal',
    name: 'Ethereal Glow',
    icon: <Stars className="w-5 h-5" />,
    colors: {
      bg: 'bg-[#0a061a]',
      text: 'text-violet-100',
      accent: 'bg-violet-400',
      card: 'bg-indigo-950/40 backdrop-blur-xl',
      gradient: 'from-indigo-950 via-purple-950 to-slate-950',
      border: 'border-violet-500/30',
    },
    typography: {
      serif: true,
      tracking: 'tracking-widest',
    },
    animation: 'sparkle'
  },
  {
    id: 'modern',
    name: 'Modern Minimal',
    icon: <Sun className="w-5 h-5" />,
    colors: {
      bg: 'bg-[#fafafa]',
      text: 'text-[#1a1a1a]',
      accent: 'bg-black',
      card: 'bg-white/40 backdrop-blur-sm',
      gradient: 'from-stone-50 via-white to-stone-100',
      border: 'border-black/5',
    },
    typography: {
      serif: false,
      tracking: 'tracking-tighter',
    },
    animation: 'drift'
  },
  {
    id: 'dark',
    name: 'Midnight Love',
    icon: <Moon className="w-5 h-5" />,
    colors: {
      bg: 'bg-[#020617]',
      text: 'text-slate-200',
      accent: 'bg-rose-500',
      card: 'bg-slate-900/60 backdrop-blur-2xl',
      gradient: 'from-black via-slate-950 to-blue-950',
      border: 'border-white/10',
    },
    typography: {
      serif: true,
      tracking: 'tracking-normal',
    },
    animation: 'pulse'
  }
];

export const APP_NAME = "Eternal";

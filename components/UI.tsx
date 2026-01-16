
import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-bold transition-all duration-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 text-white shadow-[0_15px_35px_-5px_rgba(244,63,94,0.4)] hover:shadow-[0_25px_50px_-10px_rgba(244,63,94,0.6)] hover:-translate-y-1 hover:brightness-110",
    secondary: "bg-white/[0.05] text-white backdrop-blur-2xl border border-white/10 hover:bg-white/[0.1] hover:border-white/20 hover:-translate-y-1 shadow-2xl",
    outline: "border-2 border-rose-500/40 text-rose-500 hover:border-rose-500 hover:bg-rose-500/5",
    ghost: "text-slate-500 hover:text-white hover:bg-white/5"
  };

  const sizes = {
    sm: "px-8 py-3 text-xs tracking-widest uppercase",
    md: "px-12 py-5 text-base",
    lg: "px-16 py-7 text-2xl font-serif italic"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col space-y-4 w-full group">
      {label && <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 ml-2 group-focus-within:text-rose-500 transition-colors duration-500">{label}</label>}
      <input 
        className={`w-full bg-white/[0.02] border border-white/5 rounded-3xl px-8 py-5 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500/40 focus:bg-white/[0.04] transition-all duration-700 placeholder:text-slate-800 text-white text-lg ${className}`}
        {...props}
      />
    </div>
  );
};

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col space-y-4 w-full group">
      {label && <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 ml-2 group-focus-within:text-rose-500 transition-colors duration-500">{label}</label>}
      <textarea 
        className={`w-full bg-white/[0.02] border border-white/5 rounded-[2.5rem] px-8 py-6 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500/40 focus:bg-white/[0.04] transition-all duration-700 min-h-[180px] placeholder:text-slate-800 text-white text-lg leading-relaxed ${className}`}
        {...props}
      />
    </div>
  );
};

export const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    className={`glass p-16 rounded-[4rem] border border-white/5 bg-white/[0.01] backdrop-blur-[40px] shadow-3xl ${className}`}
  >
    {children}
  </motion.div>
);

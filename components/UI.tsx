
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
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 text-white shadow-[0_10px_20px_-5px_rgba(244,63,94,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(244,63,94,0.6)] hover:brightness-110",
    secondary: "bg-white/5 text-white backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 shadow-xl",
    outline: "border-2 border-rose-500/30 text-rose-500 hover:border-rose-500 hover:bg-rose-500/5",
    ghost: "text-slate-400 hover:text-white hover:bg-white/5"
  };

  const sizes = {
    sm: "px-6 py-2.5 text-sm",
    md: "px-10 py-4 text-base",
    lg: "px-12 py-5 text-xl"
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
    <div className="flex flex-col space-y-3 w-full group">
      {label && <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-1 group-focus-within:text-rose-500 transition-colors">{label}</label>}
      <input 
        className={`w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500/50 transition-all placeholder:text-slate-700 text-white ${className}`}
        {...props}
      />
    </div>
  );
};

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col space-y-3 w-full group">
      {label && <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-1 group-focus-within:text-rose-500 transition-colors">{label}</label>}
      <textarea 
        className={`w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500/50 transition-all min-h-[140px] placeholder:text-slate-700 text-white leading-relaxed ${className}`}
        {...props}
      />
    </div>
  );
};

export const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className={`glass p-10 rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl ${className}`}
  >
    {children}
  </motion.div>
);

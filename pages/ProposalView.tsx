
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Heart, Music, Volume2, VolumeX, Sparkles, Star } from 'lucide-react';
import { getProposalById } from '../utils/storage';
import { THEMES, ThemeConfig } from '../constants';
import { ProposalData } from '../types';
import { Button, Input } from '../components/UI';

const BackgroundElements: React.FC<{ theme: ThemeConfig }> = ({ theme }) => {
  if (theme.id === 'ethereal') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 3 + Math.random() * 4, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            className="absolute bg-white rounded-full blur-[1px]"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/5 to-transparent mix-blend-overlay" />
      </div>
    );
  }

  if (theme.id === 'classic') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [-20, 1200],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 15 + Math.random() * 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10 
            }}
            className="absolute text-rose-200/20"
            style={{ left: Math.random() * 100 + '%', top: '-50px' }}
          >
            <Heart size={Math.random() * 20 + 10} fill="currentColor" />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-30" />
      </div>
    );
  }

  if (theme.id === 'dark') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-500/5 blur-[120px] rounded-full" 
        />
      </div>
    );
  }

  return null;
};

const ScrollReveal: React.FC<{ children: React.ReactNode; direction?: 'up' | 'left' | 'right' | 'none' }> = ({ children, direction = 'up' }) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 60 : 0,
      x: direction === 'left' ? -60 : direction === 'right' ? 60 : 0,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

const ProposalView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<ProposalData | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [password, setPassword] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAccepted, setHasAccepted] = useState<boolean | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const opacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.15], [1, 0.9]);
  const blurValue = useTransform(smoothProgress, [0, 0.1], ["blur(0px)", "blur(10px)"]);

  useEffect(() => {
    if (id) {
      const p = getProposalById(id);
      if (p) {
        setData(p);
        if (p.password) setIsLocked(true);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  const handleUnlock = () => {
    if (data && password === data.password) {
      setIsLocked(false);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play().catch(e => console.log("Audio play failed", e));
      setIsPlaying(!isPlaying);
    }
  };

  if (!data) return null;

  if (isLocked) {
    return (
      <div className="min-h-screen bg-[#0f0a0f] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          className="max-w-md w-full glass p-10 rounded-[2.5rem] text-center space-y-8 shadow-2xl border border-white/10"
        >
          <div className="relative inline-block">
            <Heart className="w-16 h-16 text-rose-500 fill-rose-500/20 animate-pulse" />
            <Sparkles className="absolute -top-2 -right-2 text-amber-400 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-4xl font-serif mb-3">A Private Chapter</h1>
            <p className="text-slate-400 text-lg">This story is protected for intimacy. Enter the shared secret to continue.</p>
          </div>
          <Input 
            type="password" 
            placeholder="Secret word..." 
            className="text-center text-xl tracking-widest bg-white/5 border-white/10 py-4"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleUnlock()}
          />
          <Button className="w-full py-6 rounded-2xl text-lg font-semibold" onClick={handleUnlock}>Unlock Forever</Button>
        </motion.div>
      </div>
    );
  }

  const theme = THEMES.find(t => t.id === data.theme) || THEMES[0];

  return (
    <div className={`min-h-[500vh] ${theme.colors.bg} ${theme.colors.text} ${theme.typography.tracking} transition-colors duration-1000 overflow-x-hidden selection:bg-rose-500/30`}>
      {data.musicUrl && (
        <audio ref={audioRef} src={data.musicUrl} loop />
      )}
      
      <BackgroundElements theme={theme} />

      {/* Music Toggle Floating */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={toggleMusic}
        className="fixed top-8 right-8 z-50 p-4 rounded-full glass-dark text-white border border-white/10 hover:scale-110 transition-transform active:scale-95"
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </motion.button>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-rose-500 z-[60] origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative px-6 text-center">
        <motion.div style={{ opacity, scale, filter: blurValue }} className="z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 relative inline-block"
          >
            <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full scale-110" />
            <img 
              src={data.mainImageUrl} 
              alt="Main" 
              className="w-48 h-48 md:w-72 md:h-72 rounded-[3rem] object-cover mx-auto shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] relative border-4 border-white/20"
            />
          </motion.div>
          
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.2 }}
              className={`text-6xl md:text-9xl ${theme.typography.serif ? 'font-serif' : 'font-sans font-black'} tracking-tighter leading-none`}
            >
              {data.creatorName} <span className="text-rose-500">&</span> {data.partnerName}
            </motion.h1>
            
            <motion.div 
               initial={{ scaleX: 0 }}
               animate={{ scaleX: 1 }}
               transition={{ delay: 1, duration: 1.5, ease: "circOut" }}
               className={`h-[1px] w-32 mx-auto ${theme.colors.accent} opacity-30`} 
            />
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1.2 }}
              className="text-xl md:text-3xl italic opacity-70 font-serif"
            >
              {data.title}
            </motion.p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 opacity-40"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase font-bold">The Journey Begins</span>
          <div className="w-[1px] h-20 bg-current" />
        </motion.div>
      </section>

      {/* Memories Section */}
      <section className="py-64 px-6 max-w-6xl mx-auto">
        <div className="mb-40 text-center">
          <ScrollReveal direction="none">
            <span className="text-xs tracking-[0.5em] uppercase opacity-40 font-bold block mb-4">Chronicles</span>
            <h2 className="text-5xl md:text-7xl font-serif">A Lifetime of Firsts</h2>
          </ScrollReveal>
        </div>

        <div className="space-y-80">
          {data.memories.map((m, i) => (
            <div key={m.id} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-32`}>
              <ScrollReveal direction={i % 2 === 0 ? 'left' : 'right'}>
                <div className="w-full md:w-[500px] group relative">
                  <div className="absolute inset-0 bg-rose-500/10 rounded-[2rem] translate-x-4 translate-y-4 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500" />
                  <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative">
                    <img 
                      src={`https://images.unsplash.com/photo-1518196775741-20158462bbff?auto=format&fit=crop&q=80&w=1000&sig=${m.id}`} 
                      alt={m.title} 
                      className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction={i % 2 === 0 ? 'right' : 'left'}>
                <div className="flex-1 space-y-6 text-left">
                  <span className={`text-sm tracking-widest uppercase py-2 px-4 rounded-full ${theme.colors.card} border ${theme.colors.border}`}>
                    {new Date(m.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <h3 className="text-4xl md:text-6xl font-serif leading-tight">{m.title}</h3>
                  <div className={`w-12 h-1 ${theme.colors.accent} opacity-30`} />
                  <p className="text-2xl md:text-3xl leading-relaxed opacity-80 font-serif italic max-w-lg">
                    "{m.description}"
                  </p>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </section>

      {/* Love Letter Section - Editorial Style */}
      <section className="py-80 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="none">
            <div className={`p-16 md:p-32 rounded-[3rem] ${theme.colors.card} border ${theme.colors.border} relative overflow-hidden group shadow-2xl`}>
              {/* Decorative Quote Mark */}
              <div className="absolute -top-10 -left-10 text-[20rem] font-serif italic opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                &ldquo;
              </div>
              
              <div className="relative z-10 space-y-12">
                <div className="flex justify-center">
                  <Heart className="text-rose-500/40 w-12 h-12" />
                </div>
                <p className="text-3xl md:text-5xl font-serif leading-relaxed italic text-center whitespace-pre-wrap">
                  {data.message}
                </p>
                <div className="flex justify-center pt-8">
                  <span className="text-xs tracking-[0.4em] uppercase font-bold opacity-30">Forever Yours, {data.creatorName}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The Question - Grand Finale */}
      <section className="min-h-[120vh] flex flex-col items-center justify-center px-6 relative overflow-hidden pb-40">
        <AnimatePresence>
          {hasAccepted && (
            <div className="absolute inset-0 pointer-events-none z-[100]">
              {[...Array(80)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    opacity: 0, 
                    scale: 0, 
                    x: '50vw', 
                    y: '50vh',
                    rotate: 0 
                  }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    scale: [0, Math.random() * 1.5 + 0.5, 0],
                    x: `${Math.random() * 100}vw`,
                    y: `${Math.random() * 100}vh`,
                    rotate: 360
                  }}
                  transition={{ duration: 3 + Math.random() * 3, ease: "circOut" }}
                  className="absolute"
                >
                  {i % 2 === 0 ? (
                    <Heart className="text-rose-500 w-6 h-6 fill-rose-500" />
                  ) : (
                    <Star className="text-amber-400 w-4 h-4 fill-amber-400" />
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        <div className="text-center space-y-16 relative z-10 max-w-5xl">
          <ScrollReveal>
            <div className="flex flex-col items-center space-y-12">
              <motion.div
                animate={{ 
                  scale: [1, 1.15, 1],
                  filter: ["drop-shadow(0 0 0px #f43f5e00)", "drop-shadow(0 0 40px #f43f5e66)", "drop-shadow(0 0 0px #f43f5e00)"]
                }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="relative"
              >
                <Heart className="w-24 h-24 md:w-40 md:h-40 text-rose-500 fill-rose-500" />
                <motion.div 
                  animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.4, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute inset-0 bg-rose-500 rounded-full blur-3xl -z-10" 
                />
              </motion.div>

              {!hasAccepted ? (
                <>
                  <h2 className="text-6xl md:text-9xl font-serif leading-none tracking-tight">
                    Will you spend <br /> <span className="italic text-rose-500 underline decoration-rose-500/20 underline-offset-[20px]">forever</span> with me?
                  </h2>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-12 pt-10">
                    <Button 
                      size="lg" 
                      className="px-24 py-8 rounded-[2rem] text-3xl font-serif shadow-2xl hover:scale-105 active:scale-95 transition-all"
                      onClick={() => setHasAccepted(true)}
                    >
                      Yes, A Million Times
                    </Button>
                    <motion.div whileHover={{ x: [0, -20, 20, -20, 0], scale: 0.9 }}>
                       <Button 
                        variant="ghost" 
                        size="lg" 
                        className="opacity-40 hover:opacity-100 text-xl"
                      >
                        No
                      </Button>
                    </motion.div>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="space-y-10"
                >
                  <h3 className="text-6xl md:text-[10rem] font-serif italic text-rose-500 leading-none">Finally, Ours.</h3>
                  <div className="space-y-4">
                    <p className="text-2xl md:text-3xl opacity-60 font-serif">A new beginning, a shared soul, an eternal promise.</p>
                    <p className="text-lg tracking-[0.5em] uppercase font-black opacity-30 pt-12">Established {new Date().getFullYear()}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer className="py-32 text-center opacity-30 text-[10px] tracking-[1em] uppercase font-bold z-10 relative">
        Designed for a Lifetime by Eternal
      </footer>
    </div>
  );
};

export default ProposalView;

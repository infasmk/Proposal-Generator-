
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Heart, Music, Volume2, VolumeX, Sparkles, Star, Diamond } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getProposalById } from '../utils/storage.ts';
import { THEMES, ThemeConfig } from '../constants.tsx';
import { ProposalData } from '../types.ts';
import { Button, Input } from '../components/UI.tsx';

const BackgroundElements: React.FC<{ theme: ThemeConfig }> = ({ theme }) => {
  if (theme.id === 'ethereal') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.6, 0.1],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{ 
              duration: 4 + Math.random() * 6, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            className="absolute bg-white rounded-full blur-[2px]"
            style={{
              width: Math.random() * 4 + 'px',
              height: Math.random() * 4 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-rose-500/10 mix-blend-screen" />
      </div>
    );
  }

  if (theme.id === 'classic') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,63,94,0.05),transparent_70%)]" />
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [-100, 1500],
              x: [Math.random() * 20 - 10, Math.random() * 20 - 10],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 20 + Math.random() * 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 15 
            }}
            className="absolute opacity-10"
            style={{ left: Math.random() * 100 + '%', top: '-10%' }}
          >
            <Heart size={Math.random() * 24 + 12} fill="#f43f5e" className="text-rose-500" />
          </motion.div>
        ))}
      </div>
    );
  }

  return null;
};

const ScrollReveal: React.FC<{ children: React.ReactNode; direction?: 'up' | 'left' | 'right' | 'none' }> = ({ children, direction = 'up' }) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 80 : 0,
      x: direction === 'left' ? -80 : direction === 'right' ? 80 : 0,
      scale: 0.9,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
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
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 45, damping: 15, restDelta: 0.001 });
  
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);
  const heroBlur = useTransform(smoothProgress, [0, 0.15], ["blur(0px)", "blur(20px)"]);

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
      else audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      setIsPlaying(!isPlaying);
    }
  };

  const handleAccept = () => {
    setHasAccepted(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#ffffff', '#fbbf24']
    });
    // Create extra bursts
    setTimeout(() => {
      confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });
    }, 500);
  };

  if (!data) return null;

  if (isLocked) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 40 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          className="max-w-md w-full glass p-12 rounded-[3rem] text-center space-y-10"
        >
          <div className="relative inline-block">
            <Diamond className="w-16 h-16 text-rose-500 animate-pulse" />
            <Sparkles className="absolute -top-4 -right-4 text-amber-400 w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-serif mb-4 leading-tight">An Intimate Secret</h1>
            <p className="text-slate-400 text-lg leading-relaxed">This story is for two souls only. Enter the secret word to witness the journey.</p>
          </div>
          <Input 
            type="password" 
            placeholder="Shared secret word..." 
            className="text-center text-2xl tracking-[0.3em] bg-white/5 border-white/10 py-6"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleUnlock()}
          />
          <Button className="w-full py-8 rounded-3xl text-xl font-bold" onClick={handleUnlock}>Unlock Experience</Button>
        </motion.div>
      </div>
    );
  }

  const theme = THEMES.find(t => t.id === data.theme) || THEMES[0];

  return (
    <div className={`min-h-[600vh] ${theme.colors.bg} ${theme.colors.text} transition-colors duration-1000 overflow-x-hidden selection:bg-rose-500/40`}>
      {data.musicUrl && <audio ref={audioRef} src={data.musicUrl} loop />}
      
      <BackgroundElements theme={theme} />

      {/* Persistent HUD */}
      <div className="fixed top-10 left-0 right-0 z-50 px-10 flex justify-between items-center pointer-events-none">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 0.5, x: 0 }} className="flex items-center space-x-2 text-[10px] tracking-[0.5em] uppercase font-black">
          <Heart className="w-3 h-3 text-rose-500" />
          <span>Eternal Journey</span>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={toggleMusic}
          className="pointer-events-auto p-5 rounded-full glass-dark text-white border-white/10 hover:scale-110 active:scale-95 transition-all shadow-2xl"
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative px-6 text-center">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale, filter: heroBlur }} className="z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 relative"
          >
            <div className="absolute inset-[-40px] bg-rose-500/20 blur-[100px] rounded-full" />
            <img 
              src={data.mainImageUrl} 
              alt="Main Story" 
              className="w-56 h-56 md:w-80 md:h-80 rounded-[4rem] object-cover mx-auto shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] border-4 border-white/10 relative"
            />
          </motion.div>
          
          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className={`text-7xl md:text-[12rem] ${theme.typography.serif ? 'font-serif' : 'font-sans font-black'} tracking-tighter leading-none`}
            >
              {data.creatorName} <span className="text-rose-500">&</span> {data.partnerName}
            </motion.h1>
            
            <motion.div 
               initial={{ scaleX: 0 }}
               animate={{ scaleX: 1 }}
               transition={{ delay: 1, duration: 2, ease: "circOut" }}
               className={`h-[1px] w-48 mx-auto ${theme.colors.accent} opacity-40`} 
            />
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1.5 }}
              className="text-2xl md:text-4xl italic opacity-60 font-serif"
            >
              {data.title}
            </motion.p>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 opacity-30"
        >
          <div className="w-[1px] h-24 bg-current" />
        </motion.div>
      </section>

      {/* Memories Narrative */}
      <section className="py-80 px-6 max-w-7xl mx-auto space-y-[40vh]">
        {data.memories.map((m, i) => (
          <div key={m.id} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-20 md:gap-40`}>
            <ScrollReveal direction={i % 2 === 0 ? 'left' : 'right'}>
              <div className="w-full md:w-[600px] group relative">
                <div className="absolute inset-0 bg-rose-500/5 rounded-[3rem] translate-x-8 translate-y-8 -z-10 group-hover:translate-x-12 group-hover:translate-y-12 transition-all duration-700" />
                <div className="aspect-[3/4] rounded-[3.5rem] overflow-hidden shadow-3xl relative">
                  <img 
                    src={`https://images.unsplash.com/photo-1518196775741-20158462bbff?auto=format&fit=crop&q=80&w=1200&sig=${m.id}`} 
                    alt={m.title} 
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s]" 
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all duration-1000" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction={i % 2 === 0 ? 'right' : 'left'}>
              <div className="flex-1 space-y-10 text-left">
                <div className="flex items-center space-x-4">
                  <span className={`text-[10px] tracking-[0.4em] uppercase font-black py-3 px-6 rounded-full glass border-white/10`}>
                    {new Date(m.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h3 className="text-5xl md:text-8xl font-serif leading-none italic">{m.title}</h3>
                <div className={`w-20 h-1 ${theme.colors.accent} opacity-50`} />
                <p className="text-2xl md:text-4xl leading-relaxed opacity-70 font-serif italic max-w-2xl">
                  "{m.description}"
                </p>
              </div>
            </ScrollReveal>
          </div>
        ))}
      </section>

      {/* The Soul Message */}
      <section className="py-80 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="none">
            <div className={`p-20 md:p-40 rounded-[5rem] ${theme.colors.card} border ${theme.colors.border} relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)]`}>
              <div className="absolute -top-10 -left-10 text-[30rem] font-serif italic opacity-[0.02] select-none pointer-events-none">&ldquo;</div>
              <div className="relative z-10 text-center space-y-16">
                <Heart className="text-rose-500 w-16 h-16 mx-auto fill-rose-500/20" />
                <p className="text-4xl md:text-7xl font-serif leading-tight italic whitespace-pre-wrap">
                  {data.message}
                </p>
                <div className="pt-20">
                  <p className="text-xs tracking-[1em] uppercase font-black opacity-30">Forever yours, always.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The Question Finale */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative pb-64">
        <div className="text-center space-y-24 relative z-10 max-w-6xl">
          <ScrollReveal>
            <div className="flex flex-col items-center space-y-20">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  filter: ["drop-shadow(0 0 0px #f43f5e00)", "drop-shadow(0 0 60px #f43f5e88)", "drop-shadow(0 0 0px #f43f5e00)"]
                }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="relative"
              >
                <Diamond className="w-32 h-32 md:w-56 md:h-56 text-rose-500 fill-rose-500/10" />
                <motion.div 
                  animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 2, 1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute inset-0 bg-rose-500 rounded-full blur-[100px] -z-10" 
                />
              </motion.div>

              {!hasAccepted ? (
                <>
                  <h2 className="text-7xl md:text-[14rem] font-serif leading-[0.8] tracking-tighter">
                    Will you <br /> stay <span className="italic text-rose-500">forever</span>?
                  </h2>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
                    <Button 
                      size="lg" 
                      className="px-24 py-10 rounded-[3rem] text-4xl font-serif shadow-[0_40px_100px_rgba(244,63,94,0.4)] hover:scale-105 active:scale-95"
                      onClick={handleAccept}
                    >
                      Yes, A Million Times
                    </Button>
                    <motion.div whileHover={{ rotate: [0, -5, 5, -5, 0], x: [0, -10, 10, -10, 0] }}>
                       <Button variant="ghost" className="opacity-40 hover:opacity-100 text-2xl">No</Button>
                    </motion.div>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 2, ease: "circOut" }}
                  className="space-y-12"
                >
                  <h3 className="text-8xl md:text-[18rem] font-serif italic text-rose-500 leading-none">Finally.</h3>
                  <div className="space-y-4">
                    <p className="text-3xl md:text-5xl opacity-80 font-serif">Today, our eternity began.</p>
                    <div className="pt-20">
                      <Button variant="secondary" onClick={() => navigate('/')} className="px-12 py-6 rounded-full">
                        Create Your Own Eternal Story
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer className="py-40 text-center opacity-20 text-[10px] tracking-[1.5em] uppercase font-black">
        A Sacred Moment Captured by Eternal
      </footer>
    </div>
  );
};

export default ProposalView;

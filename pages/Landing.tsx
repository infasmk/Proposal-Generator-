
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight, Diamond } from 'lucide-react';
import { Button } from '../components/UI.tsx';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02040a]">
      {/* Cinematic Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-rose-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-violet-600/10 blur-[150px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-10 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/20">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>
          <span className="text-2xl font-serif tracking-[0.2em] uppercase font-bold">Eternal</span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-6"
        >
          <Button variant="ghost" size="sm" onClick={() => navigate('/create')} className="hidden md:flex">How it works</Button>
          <Button variant="secondary" size="sm" onClick={() => navigate('/create')}>Create Experience</Button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-20 pb-40 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 px-6 py-2 rounded-full glass border-white/10 mb-12"
          >
            <Diamond className="w-4 h-4 text-amber-300" />
            <span className="text-[10px] font-black tracking-[0.4em] text-white uppercase">The Gold Standard of Proposals</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-[10rem] font-serif mb-10 leading-[0.85] tracking-tighter">
            Where <span className="italic text-rose-500">forever</span> <br className="hidden md:block" /> begins.
          </h1>
          
          <p className="text-xl md:text-3xl text-slate-400 max-w-2xl mx-auto mb-16 leading-relaxed font-light">
            Don't just ask. Curate a cinematic digital narrative that encapsulates every heartbeat of your journey.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" onClick={() => navigate('/create')} className="px-12 py-6 rounded-[2rem] text-xl shadow-[0_20px_50px_rgba(244,63,94,0.3)]">
              Build Your Story <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
            <Button variant="secondary" size="lg" className="px-12 py-6 rounded-[2rem] text-xl">
              Explore Template
            </Button>
          </div>
        </motion.div>

        {/* Dynamic Demo Preview */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="mt-32 w-full relative"
        >
          <div className="relative aspect-[16/9] max-w-6xl mx-auto rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl shadow-rose-500/10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#02040a]/80 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2000" 
              className="w-full h-full object-cover"
              alt="Luxury Proposal Preview"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-20">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="glass p-8 rounded-[2rem] border-white/20 text-center"
              >
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-2 italic">Julian & Sofia</h2>
                <div className="w-12 h-[1px] bg-rose-500 mx-auto mb-4" />
                <p className="text-white/60 tracking-[0.3em] uppercase text-[10px] font-bold">The Ethereal Theme</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-40 px-6 bg-gradient-to-b from-transparent to-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard 
            icon={<Diamond className="w-10 h-10 text-rose-500" />}
            title="Editorial Design"
            description="Four world-class themes meticulously crafted with custom typography and motion systems."
          />
          <FeatureCard 
            icon={<Heart className="w-10 h-10 text-violet-500" />}
            title="Atmospheric Sound"
            description="Seamless background music integration to evoke precisely the right emotions at the right time."
          />
          <FeatureCard 
            icon={<Heart className="w-10 h-10 text-emerald-500" />}
            title="Bank-Level Privacy"
            description="Encrypted URLs and optional password protection ensure your intimate story stays private."
          />
        </div>
      </section>

      <footer className="py-20 text-center border-t border-white/5">
        <p className="text-[10px] tracking-[0.5em] uppercase font-black text-slate-600">Established MMXXIV • Eternal</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="p-12 rounded-[2.5rem] glass border-white/5 group transition-all duration-500 hover:bg-white/[0.04]"
  >
    <div className="mb-10 p-5 bg-white/5 rounded-3xl w-fit group-hover:scale-110 group-hover:bg-rose-500/10 transition-all duration-500">{icon}</div>
    <h3 className="text-3xl font-serif mb-4">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-lg font-light">{description}</p>
  </motion.div>
);

export default Landing;

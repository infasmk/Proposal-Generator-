
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Stars, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../components/UI';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f0a0f]">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-900/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, 1, 0],
              y: [0, -100] 
            }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Sparkles className="w-4 h-4 text-rose-300" />
          </motion.div>
        ))}
      </div>

      <nav className="relative z-10 flex items-center justify-between px-8 py-8 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
          <span className="text-xl font-serif tracking-widest uppercase">Eternal</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm text-slate-400 font-medium">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <Button variant="secondary" size="sm" onClick={() => navigate('/create')}>Sign In</Button>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
            <Stars className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase">Crafting core memories since 2024</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-[1.1]">
            Turn your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-violet-500 italic">love story</span> into a digital masterpiece.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Create a private, cinematic proposal experience that your partner will cherish forever. Elegant, intimate, and absolutely unforgettable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button size="lg" onClick={() => navigate('/create')}>
              Create Your Proposal <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="secondary" size="lg">
              View Sample Page
            </Button>
          </div>
        </motion.div>

        {/* Floating Demo Preview */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-24 w-full max-w-5xl mx-auto relative px-4"
        >
          <div className="aspect-video glass rounded-3xl overflow-hidden shadow-2xl shadow-rose-500/10 border border-white/10">
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1518196775741-20158462bbff?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center flex items-center justify-center relative">
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative text-center">
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">Sarah & Michael</h2>
                <div className="w-12 h-[1px] bg-white/50 mx-auto mb-4" />
                <p className="text-white/80 font-serif italic text-xl">The start of our forever...</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <section id="features" className="relative z-10 py-32 px-4 bg-[#0f0a0f]/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<ShieldCheck className="w-8 h-8 text-rose-500" />}
            title="Private & Secure"
            description="Your proposal is only accessible via a unique link. Optional password protection for complete peace of mind."
          />
          <FeatureCard 
            icon={<Stars className="w-8 h-8 text-violet-500" />}
            title="Cinematic Motion"
            description="Ultra-smooth entrance animations and scroll-based storytelling that feel like a high-end film production."
          />
          <FeatureCard 
            icon={<Heart className="w-8 h-8 text-pink-500" />}
            title="Emotional Timeline"
            description="Relive your favorite moments through a beautiful photographic timeline of your journey together."
          />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-8 rounded-3xl glass-dark hover:border-white/20 transition-all duration-500 group">
    <div className="mb-6 p-3 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-2xl font-serif mb-4">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

export default Landing;

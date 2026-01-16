
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, ChevronLeft, Plus, Trash2, Image as ImageIcon, 
  Music, Lock, CheckCircle2, Heart, Sparkles 
} from 'lucide-react';
import { Button, Input, TextArea, GlassCard } from '../components/UI';
import { ProposalData, ProposalStep, Memory } from '../types';
import { THEMES } from '../constants';
import { generateId } from '../utils/storage';

interface CreatorProps {
  onCreate: (data: ProposalData) => void;
}

const Creator: React.FC<CreatorProps> = ({ onCreate }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<ProposalStep>('basics');
  const [data, setData] = useState<Partial<ProposalData>>({
    theme: 'classic',
    memories: [],
    isPremium: false
  });

  const steps: ProposalStep[] = ['basics', 'memories', 'letter', 'design', 'privacy', 'review'];
  const currentStepIndex = steps.indexOf(step);

  const next = () => setStep(steps[currentStepIndex + 1]);
  const back = () => setStep(steps[currentStepIndex - 1]);

  const handleCreate = () => {
    const finalData = {
      ...data,
      id: generateId(),
      createdAt: Date.now(),
    } as ProposalData;
    onCreate(finalData);
    navigate(`/p/${finalData.id}`);
  };

  const addMemory = () => {
    const newMemory: Memory = {
      id: Math.random().toString(),
      date: '',
      title: '',
      description: '',
    };
    setData(prev => ({ ...prev, memories: [...(prev.memories || []), newMemory] }));
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-white pt-12 pb-24 px-4 overflow-x-hidden">
      <div className="max-w-3xl mx-auto">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-16">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="hover:bg-white/5">
            <ChevronLeft className="mr-2 w-4 h-4" /> Back to Home
          </Button>
          <div className="flex space-x-3">
            {steps.map((s, i) => (
              <motion.div 
                key={s} 
                className="relative"
              >
                <div 
                  className={`h-1.5 w-8 rounded-full transition-all duration-700 ${
                    i <= currentStepIndex ? 'bg-rose-500' : 'bg-white/10'
                  }`} 
                />
                {i === currentStepIndex && (
                  <motion.div 
                    layoutId="step-glow"
                    className="absolute inset-0 bg-rose-500 blur-sm rounded-full opacity-50"
                  />
                )}
              </motion.div>
            ))}
          </div>
          <div className="w-10 md:w-20" /> {/* Spacer */}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 'basics' && (
              <div className="space-y-10">
                <header>
                  <div className="flex items-center space-x-3 mb-2">
                    <Sparkles className="text-amber-400 w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-rose-500">Phase 01</span>
                  </div>
                  <h1 className="text-5xl font-serif mb-4">The Foundation</h1>
                  <p className="text-slate-400 text-lg">Every great story needs its protagonists. Who are we celebrating today?</p>
                </header>
                <GlassCard className="space-y-8 p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Input 
                      label="Your Full Name" 
                      placeholder="e.g. Michael James" 
                      value={data.creatorName || ''}
                      onChange={e => setData({...data, creatorName: e.target.value})}
                    />
                    <Input 
                      label="Their Full Name" 
                      placeholder="e.g. Sarah Elizabeth" 
                      value={data.partnerName || ''}
                      onChange={e => setData({...data, partnerName: e.target.value})}
                    />
                  </div>
                  <Input 
                    label="Story Title" 
                    placeholder="e.g. Our Beautiful Journey Together" 
                    value={data.title || ''}
                    onChange={e => setData({...data, title: e.target.value})}
                  />
                  <div className="space-y-3">
                    <Input 
                      label="Hero Image URL" 
                      placeholder="https://images.unsplash.com/..." 
                      value={data.mainImageUrl || ''}
                      onChange={e => setData({...data, mainImageUrl: e.target.value})}
                    />
                    <p className="text-[10px] text-slate-500 italic px-2">Tip: Use a high-quality photo of both of you at a favorite place.</p>
                  </div>
                </GlassCard>
              </div>
            )}

            {step === 'memories' && (
              <div className="space-y-10">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <Sparkles className="text-amber-400 w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-[0.3em] text-rose-500">Phase 02</span>
                    </div>
                    <h1 className="text-5xl font-serif mb-4">Milestones</h1>
                    <p className="text-slate-400 text-lg">Curate the moments that built your world.</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={addMemory} className="rounded-2xl border-white/20">
                    <Plus className="mr-2 w-4 h-4" /> Add Memory
                  </Button>
                </header>
                <div className="space-y-8">
                  <AnimatePresence mode="popLayout">
                    {(data.memories || []).map((m, idx) => (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, x: 50 }}
                        layout
                      >
                        <GlassCard className="relative group p-8">
                          <button 
                            onClick={() => setData(prev => ({ ...prev, memories: prev.memories?.filter(x => x.id !== m.id) }))}
                            className="absolute top-6 right-6 p-2 text-slate-500 hover:text-rose-500 transition-colors bg-white/5 rounded-full"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Input 
                              label="Date of Event" 
                              type="date" 
                              value={m.date}
                              onChange={e => {
                                const newMemories = [...(data.memories || [])];
                                newMemories[idx].date = e.target.value;
                                setData({...data, memories: newMemories});
                              }}
                            />
                            <div className="md:col-span-2">
                              <Input 
                                label="Memory Title" 
                                placeholder="e.g. The Rainy Rooftop Dance" 
                                value={m.title}
                                onChange={e => {
                                  const newMemories = [...(data.memories || [])];
                                  newMemories[idx].title = e.target.value;
                                  setData({...data, memories: newMemories});
                                }}
                              />
                            </div>
                          </div>
                          <TextArea 
                            label="The Story" 
                            placeholder="I remember the way the light caught your eyes..." 
                            value={m.description}
                            className="mt-6 text-base"
                            onChange={e => {
                              const newMemories = [...(data.memories || [])];
                              newMemories[idx].description = e.target.value;
                              setData({...data, memories: newMemories});
                            }}
                          />
                        </GlassCard>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {(!data.memories || data.memories.length === 0) && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-32 text-center border-2 border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.02]"
                    >
                      <ImageIcon className="w-16 h-16 text-slate-800 mx-auto mb-6" />
                      <p className="text-slate-500 text-lg italic">Your timeline is empty. Add your first memory above.</p>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {step === 'letter' && (
              <div className="space-y-10">
                <header>
                  <div className="flex items-center space-x-3 mb-2">
                    <Sparkles className="text-amber-400 w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-rose-500">Phase 03</span>
                  </div>
                  <h1 className="text-5xl font-serif mb-4">The Intimate Letter</h1>
                  <p className="text-slate-400 text-lg">This is the soul of your proposal. Speak directly to them.</p>
                </header>
                <GlassCard className="p-10">
                  <TextArea 
                    label="Your Message" 
                    placeholder="My dearest Sarah..." 
                    className="min-h-[400px] text-xl leading-relaxed italic font-serif bg-transparent border-none p-0 focus:ring-0"
                    value={data.message || ''}
                    onChange={e => setData({...data, message: e.target.value})}
                  />
                  <div className="mt-6 flex items-center justify-between text-slate-500 text-xs uppercase tracking-widest border-t border-white/5 pt-6">
                    <span>Pro Tip: Keep it authentic. Perfection isn't as beautiful as truth.</span>
                    <span>{data.message?.length || 0} characters</span>
                  </div>
                </GlassCard>
              </div>
            )}

            {step === 'design' && (
              <div className="space-y-10">
                <header>
                  <div className="flex items-center space-x-3 mb-2">
                    <Sparkles className="text-amber-400 w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-rose-500">Phase 04</span>
                  </div>
                  <h1 className="text-5xl font-serif mb-4">Set the Atmosphere</h1>
                  <p className="text-slate-400 text-lg">Choose a visual aesthetic and auditory backdrop.</p>
                </header>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {THEMES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setData({...data, theme: t.id as any})}
                      className={`relative group p-8 rounded-[2.5rem] text-left transition-all duration-500 border-2 overflow-hidden ${
                        data.theme === t.id 
                          ? 'border-rose-500 bg-rose-500/10' 
                          : 'border-white/5 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${t.colors.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
                      <div className="relative z-10">
                        <div className="p-4 bg-white/5 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">{t.icon}</div>
                        <h3 className="text-2xl font-serif mb-2">{t.name}</h3>
                        <p className="text-sm text-slate-500">Includes specialized animations and {t.animation} effects.</p>
                      </div>
                    </button>
                  ))}
                </div>

                <GlassCard className="flex items-center space-x-6 p-8">
                  <div className="p-4 bg-rose-500/10 rounded-2xl">
                    <Music className="w-8 h-8 text-rose-500" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Input 
                      label="Background Music Link (MP3 URL)"
                      placeholder="https://mysite.com/romantic-song.mp3" 
                      value={data.musicUrl || ''}
                      onChange={e => setData({...data, musicUrl: e.target.value})}
                    />
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest px-1">Note: Must be a direct link ending in .mp3 for autoplay to work.</p>
                  </div>
                </GlassCard>
              </div>
            )}

            {step === 'privacy' && (
              <div className="space-y-10">
                <header>
                  <div className="flex items-center space-x-3 mb-2">
                    <Sparkles className="text-amber-400 w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-rose-500">Phase 05</span>
                  </div>
                  <h1 className="text-5xl font-serif mb-4">Sacred & Secure</h1>
                  <p className="text-slate-400 text-lg">This moment is for your eyes only.</p>
                </header>
                <GlassCard className="space-y-10 p-12">
                  <div className="flex flex-col md:flex-row items-center gap-10 p-10 rounded-[2rem] bg-white/5 border border-white/10">
                    <div className="p-6 bg-rose-500/10 rounded-3xl">
                      <Lock className="w-12 h-12 text-rose-500" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-2xl font-serif">Password Protection</p>
                      <p className="text-slate-400">Add an extra layer of privacy. Your partner will need this to unlock the page.</p>
                    </div>
                    <Input 
                      placeholder="Your secret word..." 
                      className="md:w-64 text-center text-xl py-4"
                      value={data.password || ''}
                      onChange={e => setData({...data, password: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-3xl bg-amber-500/5 border border-amber-500/20">
                      <h4 className="font-bold text-amber-200 mb-2 uppercase text-xs tracking-widest">Unguessable URL</h4>
                      <p className="text-sm text-amber-200/60 leading-relaxed">Every proposal link is generated with a unique cryptographic hash, making it impossible to discover by accident.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-blue-500/5 border border-blue-500/20">
                      <h4 className="font-bold text-blue-200 mb-2 uppercase text-xs tracking-widest">Self Destruct</h4>
                      <p className="text-sm text-blue-200/60 leading-relaxed">Pages are designed to be permanent unless you choose to delete them, preserving your legacy forever.</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}

            {step === 'review' && (
              <div className="space-y-10">
                <header>
                  <div className="flex items-center space-x-3 mb-2">
                    <Sparkles className="text-amber-400 w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-rose-500">Finale</span>
                  </div>
                  <h1 className="text-5xl font-serif mb-4">Confirm Your Vision</h1>
                  <p className="text-slate-400 text-lg">One last look before the magic happens.</p>
                </header>
                <GlassCard className="p-12 space-y-12">
                  <div className="flex items-center space-x-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-rose-500 blur-2xl opacity-20" />
                      <div className="w-32 h-32 rounded-3xl bg-white/5 overflow-hidden border-2 border-white/20 relative">
                        {data.mainImageUrl ? (
                          <img src={data.mainImageUrl} alt="Main" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center"><ImageIcon className="opacity-20" /></div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-4xl font-serif">{data.creatorName} & {data.partnerName}</h3>
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center text-xs tracking-widest uppercase opacity-50"><Heart className="w-3 h-3 mr-1" /> {data.memories?.length} Memories</span>
                        <span className="flex items-center text-xs tracking-widest uppercase opacity-50"><CheckCircle2 className="w-3 h-3 mr-1" /> {THEMES.find(t => t.id === data.theme)?.name}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6 pt-10 border-t border-white/5">
                    <div className="flex items-center text-slate-300">
                      <CheckCircle2 className="w-5 h-5 mr-4 text-green-500" />
                      <span className="text-lg">Full cinematic scroll animations active</span>
                    </div>
                    <div className="flex items-center text-slate-300">
                      <CheckCircle2 className="w-5 h-5 mr-4 text-green-500" />
                      <span className="text-lg">Dynamic {data.theme} theme atmospheric effects</span>
                    </div>
                    <div className="flex items-center text-slate-300">
                      <CheckCircle2 className="w-5 h-5 mr-4 text-green-500" />
                      <span className="text-lg">Music pre-loaded: {data.musicUrl ? 'Active' : 'Muted'}</span>
                    </div>
                  </div>

                  <Button size="lg" className="w-full py-8 rounded-[2rem] text-2xl font-serif shadow-[0_32px_64px_-16px_rgba(244,63,94,0.4)]" onClick={handleCreate}>
                    Create Eternal Memory <Heart className="ml-3 w-6 h-6" />
                  </Button>
                </GlassCard>
              </div>
            )}

            {/* Step Controls */}
            <div className="mt-16 flex justify-between items-center">
              {currentStepIndex > 0 ? (
                <Button variant="ghost" onClick={back} className="text-slate-400 hover:text-white">
                  <ChevronLeft className="mr-2 w-4 h-4" /> Go Back
                </Button>
              ) : <div />}
              
              {currentStepIndex < steps.length - 1 && (
                <Button onClick={next} className="px-12 py-4 rounded-2xl group">
                  Next Chapter <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Creator;

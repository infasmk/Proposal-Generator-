
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.tsx';
import Creator from './pages/Creator.tsx';
import ProposalView from './pages/ProposalView.tsx';
import { ProposalData } from './types.ts';
import { getProposals, saveProposal } from './utils/storage.ts';

const App: React.FC = () => {
  const [proposals, setProposals] = useState<ProposalData[]>([]);

  useEffect(() => {
    setProposals(getProposals());
  }, []);

  const handleCreateProposal = (data: ProposalData) => {
    saveProposal(data);
    setProposals(prev => [...prev, data]);
  };

  return (
    <div className="min-h-screen selection:bg-rose-500/30">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<Creator onCreate={handleCreateProposal} />} />
        <Route path="/p/:id" element={<ProposalView />} />
      </Routes>
    </div>
  );
};

export default App;

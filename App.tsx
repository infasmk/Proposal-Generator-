
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Creator from './pages/Creator';
import ProposalView from './pages/ProposalView';
import { ProposalData } from './types';
import { getProposals, saveProposal } from './utils/storage';

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

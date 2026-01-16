
import { ProposalData } from '../types.ts';

const STORAGE_KEY = 'eternal_proposals';

export const getProposals = (): ProposalData[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveProposal = (proposal: ProposalData) => {
  const proposals = getProposals();
  proposals.push(proposal);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(proposals));
};

export const getProposalById = (id: string): ProposalData | undefined => {
  return getProposals().find(p => p.id === id);
};

export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};


export interface Memory {
  id: string;
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface ProposalData {
  id: string;
  creatorName: string;
  partnerName: string;
  title: string;
  message: string;
  memories: Memory[];
  mainImageUrl: string;
  musicUrl?: string;
  theme: 'classic' | 'modern' | 'ethereal' | 'dark';
  password?: string;
  expiryHours?: number;
  createdAt: number;
  isPremium: boolean;
}

export type ProposalStep = 'basics' | 'memories' | 'letter' | 'design' | 'privacy' | 'review';

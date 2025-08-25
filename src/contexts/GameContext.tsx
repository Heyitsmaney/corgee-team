import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Challenge {
  id: string;
  type: 'scam' | 'finance' | 'spending';
  title: string;
  description: string;
  options: { id: string; text: string; correct?: boolean }[];
  reward: number;
  feedback: string;
}

interface GameContextType {
  currentChallenge: Challenge | null;
  dailyChallenges: Challenge[];
  setCurrentChallenge: (challenge: Challenge | null) => void;
  generateDailyChallenge: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const sampleChallenges: Challenge[] = [
  {
    id: '1',
    type: 'scam',
    title: 'Suspicious Banking SMS',
    description: 'You receive an SMS: "Your bank account has been locked. Click here to verify: bit.ly/bank-verify". What do you do?',
    options: [
      { id: 'a', text: 'Click the link immediately to verify', correct: false },
      { id: 'b', text: 'Call the bank directly using their official number', correct: true },
      { id: 'c', text: 'Forward the message to friends for advice', correct: false },
      { id: 'd', text: 'Ignore the message completely', correct: false }
    ],
    reward: 50,
    feedback: 'Great job! Always verify suspicious messages by contacting the institution directly through official channels.'
  },
  {
    id: '2',
    type: 'finance',
    title: 'Investment Opportunity',
    description: 'A friend offers you a "guaranteed 20% monthly return" investment. What should you consider?',
    options: [
      { id: 'a', text: 'Invest immediately - 20% is amazing!', correct: false },
      { id: 'b', text: 'Ask for documentation and research the company', correct: true },
      { id: 'c', text: 'Invest a small amount to test', correct: false },
      { id: 'd', text: 'Ask more friends to join for better returns', correct: false }
    ],
    reward: 75,
    feedback: 'Excellent! "Guaranteed" high returns are often too good to be true. Always research before investing.'
  },
  {
    id: '3',
    type: 'spending',
    title: 'Monthly Budget Challenge',
    description: 'Your monthly income is $3000. After essential expenses ($2000), you have $1000 left. How should you allocate it?',
    options: [
      { id: 'a', text: 'Spend it all on entertainment', correct: false },
      { id: 'b', text: 'Save 50%, spend 30% on wants, invest 20%', correct: true },
      { id: 'c', text: 'Save all of it', correct: false },
      { id: 'd', text: 'Invest everything in crypto', correct: false }
    ],
    reward: 60,
    feedback: 'Perfect! The 50-30-20 rule is a great starting point for balanced financial management.'
  }
];

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [dailyChallenges] = useState<Challenge[]>(sampleChallenges);

  const generateDailyChallenge = () => {
    const randomChallenge = dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)];
    setCurrentChallenge(randomChallenge);
  };

  return (
    <GameContext.Provider value={{
      currentChallenge,
      dailyChallenges,
      setCurrentChallenge,
      generateDailyChallenge
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar: {
    gender: 'male' | 'female';
    skinTone: string;
    outfit: string;
  };
  financialPersona: {
    type: 'saver' | 'spender' | 'investor';
    riskTolerance: 'low' | 'medium' | 'high';
    scamAwareness: number;
  };
  goals: string;
  bio: string;
}

export interface UserProgress {
  level: number;
  coins: number;
  financialLiteracyScore: number;
  milSkillScore: number;
  badges: string[];
  completedChallenges: string[];
  cityBuildings: string[];
}

interface UserContextType {
  profile: UserProfile | null;
  progress: UserProgress;
  updateProfile: (profile: UserProfile) => void;
  updateProgress: (progress: Partial<UserProgress>) => void;
  addCoins: (amount: number) => void;
  addBadge: (badge: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<UserProgress>({
    level: 1,
    coins: 100,
    financialLiteracyScore: 0,
    milSkillScore: 0,
    badges: [],
    completedChallenges: [],
    cityBuildings: ['house']
  });

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  const updateProgress = (newProgress: Partial<UserProgress>) => {
    setProgress(prev => ({ ...prev, ...newProgress }));
  };

  const addCoins = (amount: number) => {
    setProgress(prev => ({ ...prev, coins: prev.coins + amount }));
  };

  const addBadge = (badge: string) => {
    setProgress(prev => ({
      ...prev,
      badges: prev.badges.includes(badge) ? prev.badges : [...prev.badges, badge]
    }));
  };

  return (
    <UserContext.Provider value={{
      profile,
      progress,
      updateProfile,
      updateProgress,
      addCoins,
      addBadge
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
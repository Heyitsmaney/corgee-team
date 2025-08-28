import React, { useState, useEffect } from 'react';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { GameWorld } from './components/GameWorld';
import { DailyChallenge } from './components/DailyChallenge';
import { Community } from './components/Community';
import { Settings } from './components/Settings';
import { UserProvider } from './contexts/UserContext';
import { GameProvider } from './contexts/GameContext';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'dashboard' | 'game' | 'challenge' | 'community'>('onboarding');
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingComplete = localStorage.getItem('finverse-onboarding');
    if (onboardingComplete) {
      setIsOnboarded(true);
      setCurrentScreen('dashboard');
    }
  }, []);

  const handleOnboardingComplete = () => {
    setIsOnboarded(true);
    setCurrentScreen('dashboard');
    localStorage.setItem('finverse-onboarding', 'true');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentScreen} />;
      case 'game':
        return <GameWorld onNavigate={setCurrentScreen} />;
      case 'challenge':
        return <DailyChallenge onNavigate={setCurrentScreen} />;
      case 'community':
        return <Community onNavigate={setCurrentScreen} />;
      default:
        return <Dashboard onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <UserProvider>
      <GameProvider>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          {renderScreen()}
        </div>
      </GameProvider>
    </UserProvider>
  );
}

export default App;
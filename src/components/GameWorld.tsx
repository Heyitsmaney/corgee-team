import React, { useState, useEffect } from 'react';
import { ArrowLeft, Building2, Shield, ShoppingCart, TrendingUp, Users, Map, Coins, Trophy, Gift, Zap, Target, BookOpen, Play, Star, Dice6, Wheel, Award, Gem } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { BankDistrict } from './districts/BankDistrict';
import { ScamAlley } from './districts/ScamAlley';
import { MarketStreet } from './districts/MarketStreet';
import { InvestmentPark } from './districts/InvestmentPark';
import { RewardWheel } from './districts/RewardWheel';

interface GameWorldProps {
  onNavigate: (screen: 'dashboard' | 'game' | 'challenge' | 'community') => void;
}

export const GameWorld: React.FC<GameWorldProps> = ({ onNavigate }) => {
  const { progress, addCoins, updateProgress } = useUser();
  const [currentDistrict, setCurrentDistrict] = useState<'overview' | 'bank' | 'scam' | 'market' | 'investment' | 'wheel'>('overview');
  const [cityLevel, setCityLevel] = useState(1);
  const [dailyMissions, setDailyMissions] = useState([
    { id: '1', title: 'Complete 3 Bank Lessons', progress: 1, target: 3, reward: 150, completed: false },
    { id: '2', title: 'Identify 2 Scams Correctly', progress: 0, target: 2, reward: 200, completed: false },
    { id: '3', title: 'Make 5 Smart Purchases', progress: 2, target: 5, reward: 100, completed: false },
    { id: '4', title: 'Complete Investment Tutorial', progress: 0, target: 1, reward: 300, completed: false }
  ]);

  const districts = [
    {
      id: 'bank',
      name: 'Bank District',
      icon: Building2,
      color: 'from-blue-500 to-cyan-500',
      description: 'Learn banking, loans, and financial management',
      unlocked: true,
      level: 3,
      activities: ['Savings Game', 'Loan Calculator', 'Budget Planner', 'Cash Flow Simulator']
    },
    {
      id: 'scam',
      name: 'Scam Alley',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      description: 'Master cybersecurity and scam detection',
      unlocked: progress.level >= 2,
      level: 2,
      activities: ['Phishing Detector', 'Ransomware Defense', 'Social Engineering Quiz', 'FOMO Resistance']
    },
    {
      id: 'market',
      name: 'Market Street',
      icon: ShoppingCart,
      color: 'from-green-500 to-emerald-500',
      description: 'Smart shopping and budget management',
      unlocked: progress.level >= 1,
      level: 4,
      activities: ['Bargain Hunter', 'Price Comparison', 'Scam Detector', 'Budget Challenge']
    },
    {
      id: 'investment',
      name: 'Investment Park',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      description: 'Trading, investing, and portfolio management',
      unlocked: progress.level >= 3,
      level: 1,
      activities: ['Stock Simulator', 'Portfolio Builder', 'Risk Assessment', 'Market Analysis']
    }
  ];

  const cityBuildings = [
    { name: 'Player House', unlocked: true, level: progress.level },
    { name: 'Community Center', unlocked: progress.level >= 2, level: 2 },
    { name: 'Financial Academy', unlocked: progress.level >= 3, level: 3 },
    { name: 'Security Tower', unlocked: progress.milSkillScore >= 50, level: 2 },
    { name: 'Trading Floor', unlocked: progress.financialLiteracyScore >= 60, level: 1 },
    { name: 'Shopping Mall', unlocked: progress.coins >= 500, level: 4 },
    { name: 'Bank Headquarters', unlocked: progress.level >= 5, level: 0 },
    { name: 'Cyber Defense Center', unlocked: progress.milSkillScore >= 80, level: 0 }
  ];

  const completeMission = (missionId: string) => {
    setDailyMissions(prev => prev.map(mission => 
      mission.id === missionId 
        ? { ...mission, completed: true, progress: mission.target }
        : mission
    ));
    
    const mission = dailyMissions.find(m => m.id === missionId);
    if (mission) {
      addCoins(mission.reward);
    }
  };

  const renderDistrictContent = () => {
    switch (currentDistrict) {
      case 'bank':
        return <BankDistrict onBack={() => setCurrentDistrict('overview')} />;
      case 'scam':
        return <ScamAlley onBack={() => setCurrentDistrict('overview')} />;
      case 'market':
        return <MarketStreet onBack={() => setCurrentDistrict('overview')} />;
      case 'investment':
        return <InvestmentPark onBack={() => setCurrentDistrict('overview')} />;
      case 'wheel':
        return <RewardWheel onBack={() => setCurrentDistrict('overview')} />;
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* City Overview */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">FinVerse City</h2>
            <p className="text-purple-200">Level {cityLevel} Financial Metropolis</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentDistrict('wheel')}
              className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-colors"
            >
              <Wheel size={20} />
              <span>Spin Wheel</span>
            </button>
            <div className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-2 rounded-full">
              <Coins className="text-yellow-400" size={20} />
              <span className="text-white font-semibold">{progress.coins}</span>
            </div>
          </div>
        </div>

        {/* City Buildings Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {cityBuildings.map((building, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                building.unlocked
                  ? 'bg-gradient-to-b from-white/20 to-white/10 border-white/30 hover:border-white/50'
                  : 'bg-gray-500/10 border-gray-500/30 opacity-50'
              }`}
            >
              <div className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                building.unlocked ? 'bg-purple-500/30' : 'bg-gray-500/30'
              }`}>
                <Building2 className={building.unlocked ? 'text-purple-300' : 'text-gray-400'} size={24} />
              </div>
              <h3 className={`font-semibold text-sm ${building.unlocked ? 'text-white' : 'text-gray-400'}`}>
                {building.name}
              </h3>
              <p className={`text-xs ${building.unlocked ? 'text-purple-300' : 'text-gray-500'}`}>
                Level {building.level}
              </p>
            </div>
          ))}
        </div>

        {/* Daily Missions */}
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <Target className="mr-2" size={20} />
            Daily Missions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dailyMissions.map(mission => (
              <div
                key={mission.id}
                className={`p-3 rounded-lg border ${
                  mission.completed
                    ? 'bg-green-500/20 border-green-500/30'
                    : 'bg-white/10 border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium text-sm">{mission.title}</h4>
                  <span className="text-yellow-400 text-xs font-semibold">+{mission.reward}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-700/30 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        mission.completed ? 'bg-green-400' : 'bg-purple-400'
                      }`}
                      style={{ width: `${(mission.progress / mission.target) * 100}%` }}
                    />
                  </div>
                  <span className="text-purple-300 text-xs">
                    {mission.progress}/{mission.target}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Districts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {districts.map(district => (
          <div
            key={district.id}
            className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
              district.unlocked
                ? 'border-white/30 hover:border-white/50 cursor-pointer transform hover:scale-105'
                : 'border-gray-500/30 opacity-50 cursor-not-allowed'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${district.color} opacity-20`} />
            <div className="relative p-6 bg-white/10 backdrop-blur-lg">
              <div className="flex items-center justify-between mb-4">
                <district.icon className="text-white" size={32} />
                <div className="text-right">
                  <div className="text-white font-bold text-lg">Level {district.level}</div>
                  <div className="text-purple-200 text-sm">District</div>
                </div>
              </div>
              
              <h3 className="text-white font-bold text-xl mb-2">{district.name}</h3>
              <p className="text-purple-200 text-sm mb-4">{district.description}</p>
              
              <div className="space-y-2 mb-4">
                {district.activities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Play className="text-purple-400" size={12} />
                    <span className="text-purple-200 text-xs">{activity}</span>
                  </div>
                ))}
              </div>
              
              {district.unlocked ? (
                <button
                  onClick={() => setCurrentDistrict(district.id as any)}
                  className="w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg font-semibold transition-colors"
                >
                  Enter District
                </button>
              ) : (
                <div className="w-full bg-gray-500/20 text-gray-400 py-2 rounded-lg font-semibold text-center">
                  Unlock at Level {district.id === 'scam' ? 2 : district.id === 'investment' ? 3 : 1}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate('challenge')}
            className="flex flex-col items-center space-y-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 p-4 rounded-lg border border-orange-500/30 hover:border-orange-500/50 transition-colors"
          >
            <Zap className="text-orange-400" size={24} />
            <span className="text-white font-semibold text-sm">Daily Challenge</span>
          </button>
          
          <button
            onClick={() => setCurrentDistrict('wheel')}
            className="flex flex-col items-center space-y-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4 rounded-lg border border-yellow-500/30 hover:border-yellow-500/50 transition-colors"
          >
            <Gift className="text-yellow-400" size={24} />
            <span className="text-white font-semibold text-sm">Reward Wheel</span>
          </button>
          
          <button
            onClick={() => onNavigate('community')}
            className="flex flex-col items-center space-y-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-lg border border-blue-500/30 hover:border-blue-500/50 transition-colors"
          >
            <Users className="text-blue-400" size={24} />
            <span className="text-white font-semibold text-sm">Community</span>
          </button>
          
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex flex-col items-center space-y-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-lg border border-purple-500/30 hover:border-purple-500/50 transition-colors"
          >
            <Trophy className="text-purple-400" size={24} />
            <span className="text-white font-semibold text-sm">Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => currentDistrict === 'overview' ? onNavigate('dashboard') : setCurrentDistrict('overview')}
            className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{currentDistrict === 'overview' ? 'Back to Dashboard' : 'Back to City'}</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-2 rounded-full">
              <Coins className="text-yellow-400" size={20} />
              <span className="text-white font-semibold">{progress.coins}</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-500/20 px-3 py-2 rounded-full">
              <Star className="text-purple-400" size={20} />
              <span className="text-white font-semibold">Level {progress.level}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        {renderDistrictContent()}
      </div>
    </div>
  );
};
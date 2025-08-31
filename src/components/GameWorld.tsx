import React, { useState, useEffect } from 'react';
import { ArrowLeft, Building2, Shield, ShoppingCart, TrendingUp, Users, Map, Coins, Trophy, Gift, Zap, Target, BookOpen, Play, Star, Dice6, ShipWheel as Wheel, Award, Gem, MapPin, Navigation, Compass } from 'lucide-react';
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
  const [activeMissions, setActiveMissions] = useState([
    { id: '1', title: 'Complete 3 Bank Lessons', progress: 1, target: 3, reward: 150, completed: false, district: 'bank' },
    { id: '2', title: 'Identify 2 Scams Correctly', progress: 0, target: 2, reward: 200, completed: false, district: 'scam' },
    { id: '3', title: 'Make 5 Smart Purchases', progress: 2, target: 5, reward: 100, completed: false, district: 'market' },
    { id: '4', title: 'Complete Investment Tutorial', progress: 0, target: 1, reward: 300, completed: false, district: 'investment' }
  ]);

  const districts = [
    {
      id: 'bank',
      name: 'Bank District',
      icon: Building2,
      color: 'from-blue-500 to-cyan-500',
      description: 'Master banking, loans, budgeting, and financial management',
      unlocked: true,
      level: 3,
      position: { x: 20, y: 30 },
      activities: ['Savings Simulator', 'Loan Calculator', 'Budget Planner', 'Cash Flow Manager']
    },
    {
      id: 'scam',
      name: 'Scam Alley',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      description: 'Learn cybersecurity and scam detection skills',
      unlocked: true,
      level: 2,
      position: { x: 70, y: 20 },
      activities: ['Phishing Detector', 'Ransomware Defense', 'Social Engineering Quiz', 'FOMO Resistance']
    },
    {
      id: 'market',
      name: 'Market Street',
      icon: ShoppingCart,
      color: 'from-green-500 to-emerald-500',
      description: 'Smart shopping and budget management',
      unlocked: true,
      level: 4,
      position: { x: 20, y: 70 },
      activities: ['Bargain Hunter', 'Price Comparison', 'Scam Detector', 'Budget Challenge']
    },
    {
      id: 'investment',
      name: 'Investment Park',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      description: 'Trading, investing, and portfolio management',
      unlocked: true,
      level: 1,
      position: { x: 70, y: 70 },
      activities: ['Stock Simulator', 'Portfolio Builder', 'Risk Assessment', 'Market Analysis']
    }
  ];

  const cityBuildings = [
    { name: 'Player House', unlocked: true, level: progress.level, position: { x: 45, y: 50 } },
    { name: 'Community Center', unlocked: progress.level >= 2, level: 2, position: { x: 50, y: 40 } },
    { name: 'Financial Academy', unlocked: progress.level >= 3, level: 3, position: { x: 40, y: 45 } },
    { name: 'Security Tower', unlocked: progress.milSkillScore >= 50, level: 2, position: { x: 60, y: 30 } },
    { name: 'Trading Floor', unlocked: progress.financialLiteracyScore >= 60, level: 1, position: { x: 55, y: 60 } },
    { name: 'Shopping Mall', unlocked: progress.coins >= 500, level: 4, position: { x: 30, y: 60 } },
    { name: 'Bank Headquarters', unlocked: progress.level >= 5, level: 0, position: { x: 25, y: 35 } },
    { name: 'Cyber Defense Center', unlocked: progress.milSkillScore >= 80, level: 0, position: { x: 65, y: 25 } }
  ];

  const completeMission = (missionId: string) => {
    setActiveMissions(prev => prev.map(mission => 
      mission.id === missionId 
        ? { ...mission, completed: true, progress: mission.target }
        : mission
    ));
    
    const mission = activeMissions.find(m => m.id === missionId);
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
        return renderCityOverview();
    }
  };

  const renderCityOverview = () => (
    <div className="space-y-6">
      {/* City Header */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white">FinVerse City</h2>
            <p className="text-purple-200">Level {cityLevel} Financial Metropolis</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                <MapPin className="text-blue-400" size={16} />
                <span className="text-blue-200 text-sm">4 Districts Unlocked</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building2 className="text-green-400" size={16} />
                <span className="text-green-200 text-sm">{cityBuildings.filter(b => b.unlocked).length} Buildings</span>
              </div>
            </div>
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

        {/* Interactive City Map */}
        <div className="relative bg-gradient-to-b from-sky-200 to-green-200 rounded-xl h-96 overflow-hidden">
          {/* Sky and Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-blue-200 to-green-300"></div>
          
          {/* Clouds */}
          <div className="absolute top-4 left-10 w-16 h-8 bg-white/60 rounded-full"></div>
          <div className="absolute top-6 right-20 w-12 h-6 bg-white/50 rounded-full"></div>
          <div className="absolute top-8 left-1/3 w-20 h-10 bg-white/40 rounded-full"></div>

          {/* Roads */}
          <div className="absolute top-1/2 left-0 right-0 h-8 bg-gray-600 transform -translate-y-1/2"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-8 bg-gray-600 transform -translate-x-1/2"></div>
          
          {/* Road Lines */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-yellow-300 transform -translate-y-1/2"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-yellow-300 transform -translate-x-1/2"></div>

          {/* Districts */}
          {districts.map(district => (
            <button
              key={district.id}
              onClick={() => setCurrentDistrict(district.id as any)}
              disabled={!district.unlocked}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                district.unlocked 
                  ? 'hover:scale-110 cursor-pointer' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
              style={{ 
                left: `${district.position.x}%`, 
                top: `${district.position.y}%` 
              }}
            >
              <div className={`relative ${district.unlocked ? 'animate-pulse' : ''}`}>
                {/* Building Base */}
                <div className={`w-16 h-20 bg-gradient-to-t ${district.color} rounded-t-lg border-2 border-white/30 shadow-lg`}>
                  <div className="flex items-center justify-center h-full">
                    <district.icon className="text-white" size={24} />
                  </div>
                </div>
                
                {/* Building Details */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-xs">{district.level}</span>
                </div>
                
                {/* District Label */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-black/60 text-white px-2 py-1 rounded text-xs font-semibold">
                    {district.name}
                  </div>
                </div>

                {/* Unlock Indicator */}
                {!district.unlocked && (
                  <div className="absolute inset-0 bg-black/50 rounded-t-lg flex items-center justify-center">
                    <div className="text-white text-xs font-semibold bg-red-600 px-2 py-1 rounded">
                      Level {district.id === 'scam' ? 2 : district.id === 'investment' ? 3 : 1}
                    </div>
                  </div>
                )}
              </div>
            </button>
          ))}

          {/* City Buildings */}
          {cityBuildings.map((building, index) => (
            <div
              key={index}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                building.unlocked ? 'opacity-100' : 'opacity-30'
              }`}
              style={{ 
                left: `${building.position.x}%`, 
                top: `${building.position.y}%` 
              }}
            >
              <div className={`w-8 h-10 bg-gradient-to-t from-gray-600 to-gray-400 rounded-t ${
                building.unlocked ? 'shadow-md' : ''
              }`}>
                <div className="w-full h-2 bg-yellow-600 rounded-t"></div>
              </div>
              
              {building.unlocked && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-black/60 text-white px-1 py-0.5 rounded text-xs">
                    {building.name}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* City Center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 bg-gradient-to-t from-purple-600 to-pink-500 rounded-full border-4 border-white/50 shadow-lg flex items-center justify-center">
              <Star className="text-white" size={20} />
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-bold">
                City Center
              </div>
            </div>
          </div>

          {/* Navigation Compass */}
          <div className="absolute top-4 right-4">
            <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
              <Compass className="text-gray-700" size={20} />
            </div>
          </div>
        </div>

        {/* City Stats */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-blue-400">{progress.level}</div>
            <div className="text-blue-200 text-xs">City Level</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-green-400">{cityBuildings.filter(b => b.unlocked).length}</div>
            <div className="text-green-200 text-xs">Buildings</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-purple-400">{districts.filter(d => d.unlocked).length}</div>
            <div className="text-purple-200 text-xs">Districts</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-yellow-400">{activeMissions.filter(m => m.completed).length}</div>
            <div className="text-yellow-200 text-xs">Missions</div>
          </div>
        </div>
      </div>

      {/* Active Missions */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <Target className="mr-2" size={24} />
          Active City Missions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeMissions.map(mission => (
            <div
              key={mission.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                mission.completed
                  ? 'bg-green-500/20 border-green-500/30'
                  : 'bg-white/10 border-white/20 hover:border-white/40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-medium">{mission.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400 text-sm font-semibold">+{mission.reward}</span>
                  <button
                    onClick={() => setCurrentDistrict(mission.district as any)}
                    className="text-purple-300 hover:text-white text-xs bg-purple-600/30 px-2 py-1 rounded"
                  >
                    Go to {mission.district}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-700/30 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      mission.completed ? 'bg-green-400' : 'bg-purple-400'
                    }`}
                    style={{ width: `${(mission.progress / mission.target) * 100}%` }}
                  />
                </div>
                <span className="text-purple-300 text-sm">
                  {mission.progress}/{mission.target}
                </span>
              </div>
              
              {mission.completed && (
                <div className="mt-2 flex items-center space-x-2 text-green-400 text-sm">
                  <Trophy size={16} />
                  <span>Mission Completed!</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* District Quick Access */}
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
                <h4 className="text-white font-medium text-sm">Available Activities:</h4>
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

      {/* City Progress */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-4">City Development Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-3">
            <h3 className="text-white font-semibold">Financial Literacy</h3>
            <div className="w-full bg-blue-900/30 rounded-full h-3">
              <div 
                className="bg-blue-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progress.financialLiteracyScore, 100)}%` }}
              />
            </div>
            <div className="text-blue-300 text-sm">{progress.financialLiteracyScore}/100</div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-white font-semibold">Security Skills</h3>
            <div className="w-full bg-red-900/30 rounded-full h-3">
              <div 
                className="bg-red-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progress.milSkillScore, 100)}%` }}
              />
            </div>
            <div className="text-red-300 text-sm">{progress.milSkillScore}/100</div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-white font-semibold">City Level</h3>
            <div className="w-full bg-purple-900/30 rounded-full h-3">
              <div 
                className="bg-purple-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(progress.level / 10) * 100}%` }}
              />
            </div>
            <div className="text-purple-300 text-sm">Level {progress.level}/10</div>
          </div>
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
          
          <div className="flex items-center space-x-2">
            <Map className="text-purple-400" size={20} />
            <span className="text-white font-semibold">
              {currentDistrict === 'overview' ? 'FinVerse City' : 
               currentDistrict === 'bank' ? 'Bank District' :
               currentDistrict === 'scam' ? 'Scam Alley' :
               currentDistrict === 'market' ? 'Market Street' :
               currentDistrict === 'investment' ? 'Investment Park' :
               'Reward Wheel'}
            </span>
          </div>
          
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
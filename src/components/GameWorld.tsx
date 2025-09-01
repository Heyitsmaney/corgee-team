import React, { useState, useEffect } from 'react';
import { ArrowLeft, Building2, Shield, ShoppingCart, TrendingUp, Users, Map, Coins, Trophy, Gift, Zap, Target, BookOpen, Play, Star, Dice6, ShipWheel as Wheel, Award, Gem, MapPin, Navigation, Compass, AlertTriangle, X, CheckCircle, Clock, Bell, Sparkles } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { BankDistrict } from './districts/BankDistrict';
import { ScamAlley } from './districts/ScamAlley';
import { MarketStreet } from './districts/MarketStreet';
import { InvestmentPark } from './districts/InvestmentPark';
import { RewardWheel } from './districts/RewardWheel';

interface PopupCase {
  id: string;
  type: 'scam_alert' | 'investment_tip' | 'budget_warning' | 'achievement' | 'mission_complete';
  title: string;
  message: string;
  options?: { id: string; text: string; action: () => void }[];
  autoClose?: number;
  reward?: number;
}

interface GameWorldProps {
  onNavigate: (screen: 'dashboard' | 'game' | 'challenge' | 'community') => void;
}

export const GameWorld: React.FC<GameWorldProps> = ({ onNavigate }) => {
  const { progress, addCoins, updateProgress } = useUser();
  const [currentDistrict, setCurrentDistrict] = useState<'overview' | 'bank' | 'scam' | 'market' | 'investment' | 'wheel'>('overview');
  const [cityLevel, setCityLevel] = useState(1);
  const [popupCase, setPopupCase] = useState<PopupCase | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);
  const [activeMissions, setActiveMissions] = useState([
    { id: '1', title: 'Complete 3 Bank Lessons', progress: 1, target: 3, reward: 150, completed: false, district: 'bank' },
    { id: '2', title: 'Identify 2 Scams Correctly', progress: 0, target: 2, reward: 200, completed: false, district: 'scam' },
    { id: '3', title: 'Make 5 Smart Purchases', progress: 2, target: 5, reward: 100, completed: false, district: 'market' },
    { id: '4', title: 'Complete Investment Tutorial', progress: 0, target: 1, reward: 300, completed: false, district: 'investment' }
  ]);

  // Random popup cases that appear during gameplay
  const randomPopupCases: PopupCase[] = [
    {
      id: 'scam1',
      type: 'scam_alert',
      title: '🚨 Scam Alert!',
      message: 'You received a suspicious SMS: "Your bank account will be closed in 2 hours. Click here to verify: bit.ly/bank-verify". What do you do?',
      options: [
        { 
          id: 'click', 
          text: 'Click the link to verify', 
          action: () => {
            addCoins(-50);
            setNotifications(prev => [...prev, 'You fell for a phishing scam! -50 coins']);
            updateProgress({ milSkillScore: Math.max(0, progress.milSkillScore - 10) });
          }
        },
        { 
          id: 'call', 
          text: 'Call the bank directly', 
          action: () => {
            addCoins(100);
            setNotifications(prev => [...prev, 'Smart choice! You avoided a scam! +100 coins']);
            updateProgress({ milSkillScore: progress.milSkillScore + 15 });
          }
        },
        { 
          id: 'ignore', 
          text: 'Ignore the message', 
          action: () => {
            addCoins(25);
            setNotifications(prev => [...prev, 'Safe choice, but calling the bank would be better! +25 coins']);
            updateProgress({ milSkillScore: progress.milSkillScore + 5 });
          }
        }
      ]
    },
    {
      id: 'investment1',
      type: 'investment_tip',
      title: '💡 Investment Opportunity',
      message: 'A friend offers you a "guaranteed 20% monthly return" investment. This sounds like:',
      options: [
        { 
          id: 'invest', 
          text: 'Amazing opportunity!', 
          action: () => {
            addCoins(-200);
            setNotifications(prev => [...prev, 'You lost money to a Ponzi scheme! -200 coins']);
            updateProgress({ financialLiteracyScore: Math.max(0, progress.financialLiteracyScore - 15) });
          }
        },
        { 
          id: 'research', 
          text: 'Too good to be true - research first', 
          action: () => {
            addCoins(150);
            setNotifications(prev => [...prev, 'Excellent judgment! You avoided a scam! +150 coins']);
            updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 20 });
          }
        }
      ]
    },
    {
      id: 'budget1',
      type: 'budget_warning',
      title: '⚠️ Budget Alert',
      message: 'You\'ve spent 90% of your entertainment budget this month. There\'s a concert you want to attend for $50. What do you do?',
      options: [
        { 
          id: 'buy', 
          text: 'Buy the ticket anyway', 
          action: () => {
            addCoins(-30);
            setNotifications(prev => [...prev, 'Budget exceeded! Consider better planning. -30 coins']);
          }
        },
        { 
          id: 'wait', 
          text: 'Wait for next month', 
          action: () => {
            addCoins(75);
            setNotifications(prev => [...prev, 'Great self-control! Budget discipline rewarded! +75 coins']);
            updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 10 });
          }
        },
        { 
          id: 'adjust', 
          text: 'Adjust budget from another category', 
          action: () => {
            addCoins(50);
            setNotifications(prev => [...prev, 'Smart budget reallocation! +50 coins']);
            updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 15 });
          }
        }
      ]
    }
  ];

  // Trigger random popup cases
  useEffect(() => {
    const interval = setInterval(() => {
      if (!popupCase && Math.random() < 0.3) { // 30% chance every 10 seconds
        const randomCase = randomPopupCases[Math.floor(Math.random() * randomPopupCases.length)];
        setPopupCase(randomCase);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [popupCase]);

  // Auto-close notifications
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(prev => prev.slice(1));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const districts = [
    {
      id: 'bank',
      name: 'Bank District',
      icon: Building2,
      color: 'from-blue-500 to-cyan-500',
      description: 'Master banking, loans, budgeting, and financial management',
      unlocked: true, // Always accessible
      level: 3,
      position: { x: 20, y: 30 },
      activities: ['Savings Simulator', 'Loan Calculator', 'Budget Planner', 'Cash Flow Manager'],
      hoverInfo: 'Learn banking fundamentals, budgeting, and smart borrowing strategies'
    },
    {
      id: 'scam',
      name: 'Scam Alley',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      description: 'Learn cybersecurity and scam detection skills',
      unlocked: true, // Always accessible
      level: 2,
      position: { x: 70, y: 20 },
      activities: ['Phishing Detector', 'Ransomware Defense', 'Social Engineering Quiz', 'FOMO Resistance'],
      hoverInfo: 'Master cybersecurity and protect yourself from online threats'
    },
    {
      id: 'market',
      name: 'Market Street',
      icon: ShoppingCart,
      color: 'from-green-500 to-emerald-500',
      description: 'Smart shopping and budget management',
      unlocked: true, // Always accessible
      level: 4,
      position: { x: 20, y: 70 },
      activities: ['Bargain Hunter', 'Price Comparison', 'Scam Detector', 'Budget Challenge'],
      hoverInfo: 'Learn smart shopping techniques and avoid marketplace scams'
    },
    {
      id: 'investment',
      name: 'Investment Park',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      description: 'Trading, investing, and portfolio management',
      unlocked: true, // Always accessible
      level: 1,
      position: { x: 70, y: 70 },
      activities: ['Stock Simulator', 'Portfolio Builder', 'Risk Assessment', 'Market Analysis'],
      hoverInfo: 'Master investing, trading, and portfolio management skills'
    }
  ];

  const cityBuildings = [
    { name: 'Player House', unlocked: true, level: progress.level, position: { x: 45, y: 50 }, description: 'Your personal space in FinVerse City' },
    { name: 'Community Center', unlocked: true, level: 2, position: { x: 50, y: 40 }, description: 'Connect with other players and share experiences' },
    { name: 'Financial Academy', unlocked: true, level: 3, position: { x: 40, y: 45 }, description: 'Advanced financial education and certification' },
    { name: 'Security Tower', unlocked: true, level: 2, position: { x: 60, y: 30 }, description: 'Cybersecurity training and threat monitoring' },
    { name: 'Trading Floor', unlocked: true, level: 1, position: { x: 55, y: 60 }, description: 'Live trading simulation and market analysis' },
    { name: 'Shopping Mall', unlocked: true, level: 4, position: { x: 30, y: 60 }, description: 'Practice smart shopping and scam detection' },
    { name: 'Bank Headquarters', unlocked: true, level: 5, position: { x: 25, y: 35 }, description: 'Banking services and loan management' },
    { name: 'Cyber Defense Center', unlocked: true, level: 3, position: { x: 65, y: 25 }, description: 'Advanced threat detection and response training' }
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
      setPopupCase({
        id: 'mission_complete',
        type: 'mission_complete',
        title: '🎉 Mission Complete!',
        message: `Congratulations! You completed "${mission.title}" and earned ${mission.reward} coins!`,
        autoClose: 3000,
        reward: mission.reward
      });
    }
  };

  const closePopup = () => {
    setPopupCase(null);
  };

  const triggerRandomEvent = () => {
    const events = [
      {
        type: 'scam_alert',
        title: '🚨 Live Scam Alert',
        message: 'A new phishing campaign is targeting bank customers. Stay vigilant!',
        reward: 25
      },
      {
        type: 'investment_tip',
        title: '📈 Market Update',
        message: 'Tech stocks are showing strong growth. Consider diversifying your portfolio.',
        reward: 30
      },
      {
        type: 'achievement',
        title: '🏆 New Achievement',
        message: 'You\'ve successfully avoided 5 scams this week! Security expert level unlocked.',
        reward: 100
      }
    ];
    
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    setPopupCase({
      id: Date.now().toString(),
      type: randomEvent.type as any,
      title: randomEvent.title,
      message: randomEvent.message,
      autoClose: 4000,
      reward: randomEvent.reward
    });
    
    if (randomEvent.reward) {
      addCoins(randomEvent.reward);
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
        <div className="relative bg-gradient-to-b from-sky-200 to-green-200 rounded-xl h-96 overflow-hidden group">
          {/* Sky and Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-blue-200 to-green-300"></div>
          
          {/* Clouds */}
          <div className="absolute top-4 left-10 w-16 h-8 bg-white/60 rounded-full animate-pulse"></div>
          <div className="absolute top-6 right-20 w-12 h-6 bg-white/50 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-8 left-1/3 w-20 h-10 bg-white/40 rounded-full animate-pulse delay-2000"></div>

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
              onMouseEnter={() => setHoveredBuilding(district.id)}
              onMouseLeave={() => setHoveredBuilding(null)}
              disabled={!district.unlocked}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                district.unlocked 
                  ? 'hover:scale-125 cursor-pointer hover:z-10' 
                  : 'opacity-50 cursor-not-allowed'
              } ${hoveredBuilding === district.id ? 'animate-bounce' : ''}`}
              style={{ 
                left: `${district.position.x}%`, 
                top: `${district.position.y}%` 
              }}
            >
              <div className={`relative ${district.unlocked ? 'hover:animate-pulse' : ''}`}>
                {/* Building Base */}
                <div className={`w-16 h-20 bg-gradient-to-t ${district.color} rounded-t-lg border-2 border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  hoveredBuilding === district.id ? 'shadow-yellow-400/50' : ''
                }`}>
                  <div className="flex items-center justify-center h-full">
                    <district.icon className={`text-white transition-all duration-300 ${
                      hoveredBuilding === district.id ? 'scale-125' : ''
                    }`} size={24} />
                  </div>
                </div>
                
                {/* Building Details */}
                <div className={`absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center transition-all duration-300 ${
                  hoveredBuilding === district.id ? 'animate-spin' : ''
                }`}>
                  <span className="text-black font-bold text-xs">{district.level}</span>
                </div>
                
                {/* District Label */}
                <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
                  hoveredBuilding === district.id ? 'scale-110' : ''
                }`}>
                  <div className={`bg-black/60 text-white px-2 py-1 rounded text-xs font-semibold ${
                    hoveredBuilding === district.id ? 'bg-black/80' : ''
                  }`}>
                    {district.name}
                  </div>
                </div>

                {/* Hover Info */}
                {hoveredBuilding === district.id && (
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-20">
                    <div className="bg-black/90 text-white px-3 py-2 rounded-lg text-xs max-w-48 text-center">
                      {district.hoverInfo}
                    </div>
                  </div>
                )}

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
              onMouseEnter={() => setHoveredBuilding(building.name)}
              onMouseLeave={() => setHoveredBuilding(null)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                building.unlocked ? 'opacity-100 hover:scale-110 cursor-pointer' : 'opacity-30'
              } transition-all duration-300`}
              style={{ 
                left: `${building.position.x}%`, 
                top: `${building.position.y}%` 
              }}
            >
              <div className={`w-8 h-10 bg-gradient-to-t from-gray-600 to-gray-400 rounded-t transition-all duration-300 ${
                building.unlocked ? 'shadow-md hover:shadow-lg' : ''
              } ${hoveredBuilding === building.name ? 'shadow-blue-400/50' : ''}`}>
                <div className={`w-full h-2 bg-yellow-600 rounded-t transition-all duration-300 ${
                  hoveredBuilding === building.name ? 'bg-yellow-400' : ''
              }`}>
                </div>
              </div>
              
              {building.unlocked && hoveredBuilding === building.name && (
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-20">
                  <div className="bg-black/90 text-white px-2 py-1 rounded text-xs max-w-32 text-center">
                    {building.name}
                    <div className="text-purple-300 text-xs mt-1">{building.description}</div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* City Center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 bg-gradient-to-t from-purple-600 to-pink-500 rounded-full border-4 border-white/50 shadow-lg flex items-center justify-center animate-pulse hover:animate-spin transition-all duration-300 cursor-pointer">
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
            <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white/90 transition-all duration-300 cursor-pointer hover:rotate-45">
              <Compass className="text-gray-700" size={20} />
            </div>
          </div>

          {/* Random Event Trigger */}
          <button
            onClick={triggerRandomEvent}
            className="absolute bottom-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-colors text-xs"
          >
            <Sparkles size={16} className="mr-1" />
            Random Event
          </button>
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Target className="mr-2" size={24} />
            Active City Missions
          </h2>
          <div className="flex items-center space-x-2 text-sm text-purple-300">
            <Clock size={16} />
            <span>Real-time updates</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeMissions.map(mission => (
            <div
              key={mission.id}
              className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                mission.completed
                  ? 'bg-green-500/20 border-green-500/30 animate-pulse'
                  : 'bg-white/10 border-white/20 hover:border-white/40 hover:bg-white/15'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-medium">{mission.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400 text-sm font-semibold animate-pulse">+{mission.reward}</span>
                  <button
                    onClick={() => setCurrentDistrict(mission.district as any)}
                    className="text-purple-300 hover:text-white text-xs bg-purple-600/30 px-2 py-1 rounded hover:bg-purple-600/50 transition-colors"
                  >
                    Go to {mission.district}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-700/30 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-700 ${
                      mission.completed ? 'bg-green-400 animate-pulse' : 'bg-purple-400'
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
                  <Trophy size={16} className="animate-bounce" />
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
            className={`relative overflow-hidden rounded-xl border-2 transition-all duration-500 group ${
              district.unlocked
                ? 'border-white/30 hover:border-white/50 cursor-pointer transform hover:scale-105 hover:shadow-2xl'
                : 'border-gray-500/30 opacity-50 cursor-not-allowed'
            }`}
            onClick={() => setCurrentDistrict(district.id as any)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${district.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
            <div className="relative p-6 bg-white/10 backdrop-blur-lg">
              <div className="flex items-center justify-between mb-4">
                <district.icon className="text-white group-hover:scale-110 transition-transform duration-300" size={32} />
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
                  <div key={index} className="flex items-center space-x-2 group-hover:translate-x-1 transition-transform duration-300">
                    <Play className="text-purple-400" size={12} />
                    <span className="text-purple-200 text-xs">{activity}</span>
                  </div>
                ))}
              </div>
              
              {district.unlocked ? (
                <button
                  className="w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Quick Actions</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 text-sm">Live</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate('challenge')}
            className="flex flex-col items-center space-y-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 p-4 rounded-lg border border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
          >
            <Zap className="text-orange-400 group-hover:animate-bounce" size={24} />
            <span className="text-white font-semibold text-sm">Daily Challenge</span>
          </button>
          
          <button
            onClick={() => setCurrentDistrict('wheel')}
            className="flex flex-col items-center space-y-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4 rounded-lg border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
          >
            <Gift className="text-yellow-400 group-hover:animate-spin" size={24} />
            <span className="text-white font-semibold text-sm">Reward Wheel</span>
          </button>
          
          <button
            onClick={() => onNavigate('community')}
            className="flex flex-col items-center space-y-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-lg border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
          >
            <Users className="text-blue-400 group-hover:animate-pulse" size={24} />
            <span className="text-white font-semibold text-sm">Community</span>
          </button>
          
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex flex-col items-center space-y-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-lg border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
          >
            <Trophy className="text-purple-400 group-hover:animate-bounce" size={24} />
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

  // Popup Case Component
  const renderPopupCase = () => {
    if (!popupCase) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/30 max-w-md w-full mx-4 animate-slideUp">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-bold text-xl">{popupCase.title}</h3>
            <button
              onClick={closePopup}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <p className="text-purple-200 mb-6">{popupCase.message}</p>
          
          {popupCase.options ? (
            <div className="space-y-3">
              {popupCase.options.map(option => (
                <button
                  key={option.id}
                  onClick={() => {
                    option.action();
                    closePopup();
                  }}
                  className="w-full text-left p-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 text-white"
                >
                  {option.text}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={closePopup}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
            >
              Continue
            </button>
          )}
          
          {popupCase.reward && (
            <div className="mt-4 text-center">
              <span className="bg-yellow-500/30 text-yellow-200 px-3 py-1 rounded-full text-sm">
                +{popupCase.reward} coins
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-40 space-y-2">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-lg p-4 max-w-sm animate-slideInRight"
          >
            <div className="flex items-center space-x-3">
              <Bell className="text-yellow-400" size={20} />
              <span className="text-white text-sm">{notification}</span>
            </div>
          </div>
        ))}
      </div>

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

      {/* Popup Cases */}
      {renderPopupCase()}
    </div>
  );
};
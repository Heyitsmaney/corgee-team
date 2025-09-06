import React, { useState, useEffect } from 'react';
import { ArrowLeft, Building2, ShoppingCart, TrendingUp, Shield, Gift, Map, Coins, Trophy, Star, Bell, AlertTriangle, X, CheckCircle, Eye, Brain, Zap, Target, Award, Clock, Users, MessageCircle, Play, Pause, Volume2, VolumeX, Calendar, Smartphone, CreditCard, Heart, Flame, TrendingDown, DollarSign, Coffee, TowerControl as GameController2, Headphones, ShoppingBag, Wifi, Battery, Signal, Sparkles, Crown, Gem, Lightning, Rocket, Gamepad } from 'lucide-react';
import { BankDistrict } from './districts/BankDistrict';
import { ScamAlley } from './districts/ScamAlley';
import { InvestmentPark } from './districts/InvestmentPark';
import { MarketStreet } from './districts/MarketStreet';
import { RewardWheel } from './districts/RewardWheel';
import { useUser } from '../contexts/UserContext';

interface GameWorldProps {
  onNavigate: (screen: 'dashboard' | 'game' | 'challenge' | 'community' | 'settings') => void;
}

interface GenZScenario {
  id: string;
  type: 'shopping' | 'crypto' | 'bnpl' | 'social' | 'subscription' | 'gig_economy' | 'dating' | 'gaming';
  title: string;
  situation: string;
  context: string;
  timeLimit: number; // seconds
  options: {
    id: string;
    text: string;
    emoji: string;
    consequence: string;
    moneyImpact: number;
    creditImpact: number;
    stressLevel: number;
    aiResponse: string;
    isOptimal: boolean;
  }[];
  urgency: 'low' | 'medium' | 'high' | 'extreme';
  platform: 'instagram' | 'tiktok' | 'snapchat' | 'discord' | 'whatsapp' | 'dating_app' | 'shopping_app' | 'crypto_app';
  reward: number;
  streakBonus: number;
}

interface AIFeedback {
  personality: 'supportive' | 'savage' | 'wise' | 'hype';
  message: string;
  tips: string[];
  memeReference?: string;
}

interface PopupCase {
  id: string;
  type: 'scam_alert' | 'investment_tip' | 'budget_warning' | 'achievement' | 'daily_bonus' | 'market_news' | 'security_alert' | 'gen_z_scenario' | 'fomo_alert' | 'impulse_buy' | 'crypto_hype' | 'bnpl_trap';
  title: string;
  message: string;
  options?: { id: string; text: string; reward?: number; consequence?: string }[];
  reward?: number;
  urgency: 'low' | 'medium' | 'high';
  autoClose?: number;
  icon: React.ComponentType<any>;
  color: string;
  platform?: string;
  timeLimit?: number;
}

interface CityMission {
  id: string;
  title: string;
  description: string;
  district: 'bank' | 'scam' | 'investment' | 'market' | 'reward';
  type: 'exploration' | 'challenge' | 'collection' | 'social' | 'learning';
  requirements: string[];
  rewards: { type: 'coins' | 'xp' | 'badge' | 'nft'; amount: number; name?: string }[];
  progress: number;
  maxProgress: number;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
}

interface NotificationItem {
  id: string;
  type: 'achievement' | 'warning' | 'tip' | 'social' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: { text: string; callback: () => void };
}

export const GameWorld: React.FC<GameWorldProps> = ({ onNavigate }) => {
  const { progress, addCoins, updateProgress, addBadge } = useUser();
  const [currentDistrict, setCurrentDistrict] = useState<'overview' | 'bank' | 'scam' | 'investment' | 'market' | 'reward'>('overview');
  const [popupCase, setPopupCase] = useState<PopupCase | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeMissions, setActiveMissions] = useState<CityMission[]>([]);
  const [showMissionPanel, setShowMissionPanel] = useState(false);
  const [cityStats, setCityStats] = useState({
    population: 2847,
    happiness: 85,
    security: 78,
    economy: 92,
    education: 88
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [backgroundMusic, setBackgroundMusic] = useState(false);

  const districts = [
    { 
      id: 'bank', 
      name: 'Bank District', 
      icon: Building2, 
      color: 'from-blue-500 to-cyan-500',
      description: 'Master banking, budgeting & loans',
      unlocked: true,
      buildings: ['Central Bank', 'Credit Union', 'Investment Firm', 'Financial Academy'],
      population: 450,
      specialFeature: 'Advanced Budgeting Tools'
    },
    { 
      id: 'scam', 
      name: 'Scam Alley', 
      icon: Shield, 
      color: 'from-red-500 to-orange-500',
      description: 'Learn cybersecurity & scam detection',
      unlocked: true,
      buildings: ['Security Center', 'Cyber Academy', 'Threat Lab', 'Safe House'],
      population: 320,
      specialFeature: 'Real-time Threat Detection'
    },
    { 
      id: 'investment', 
      name: 'Investment Park', 
      icon: TrendingUp, 
      color: 'from-purple-500 to-pink-500',
      description: 'Trading, investing & portfolio management',
      unlocked: true,
      buildings: ['Stock Exchange', 'Trading Floor', 'Portfolio Center', 'Risk Lab'],
      population: 680,
      specialFeature: 'Live Market Simulation'
    },
    { 
      id: 'market', 
      name: 'Market Street', 
      icon: ShoppingCart, 
      color: 'from-green-500 to-emerald-500',
      description: 'Smart shopping & consumer protection',
      unlocked: true,
      buildings: ['Shopping Mall', 'Local Market', 'Price Comparison Center', 'Consumer Rights Office'],
      population: 520,
      specialFeature: 'Real Price Intelligence'
    },
    { 
      id: 'reward', 
      name: 'Reward Plaza', 
      icon: Gift, 
      color: 'from-yellow-500 to-orange-500',
      description: 'Spin wheels, collect NFTs & trade rewards',
      unlocked: true,
      buildings: ['Reward Wheel', 'NFT Gallery', 'Trading Post', 'Achievement Hall'],
      population: 380,
      specialFeature: 'Exclusive Digital Assets'
    }
  ];

  const cityMissions: CityMission[] = [
    {
      id: '1',
      title: 'Financial Literacy Master',
      description: 'Complete all banking lessons and achieve 80+ financial literacy score',
      district: 'bank',
      type: 'learning',
      requirements: ['Complete 5 banking lessons', 'Score 80+ on financial literacy', 'Create a budget plan'],
      rewards: [
        { type: 'coins', amount: 500 },
        { type: 'badge', amount: 1, name: 'Financial Expert' },
        { type: 'nft', amount: 1, name: 'Golden Calculator' }
      ],
      progress: Math.min(progress.financialLiteracyScore, 80),
      maxProgress: 80,
      completed: progress.financialLiteracyScore >= 80,
      difficulty: 'medium',
      estimatedTime: '2 hours'
    },
    {
      id: '2',
      title: 'Scam Fighter Champion',
      description: 'Master cybersecurity and protect the community from threats',
      district: 'scam',
      type: 'challenge',
      requirements: ['Complete cybersecurity academy', 'Detect 10 scams correctly', 'Help 5 community members'],
      rewards: [
        { type: 'coins', amount: 750 },
        { type: 'badge', amount: 1, name: 'Cyber Guardian' },
        { type: 'nft', amount: 1, name: 'Digital Shield' }
      ],
      progress: Math.min(progress.milSkillScore, 100),
      maxProgress: 100,
      completed: progress.milSkillScore >= 75,
      difficulty: 'hard',
      estimatedTime: '3 hours'
    },
    {
      id: '3',
      title: 'Investment Strategist',
      description: 'Build a diversified portfolio and master trading fundamentals',
      district: 'investment',
      type: 'collection',
      requirements: ['Complete trading academy', 'Build portfolio worth $100k', 'Avoid investment scams'],
      rewards: [
        { type: 'coins', amount: 1000 },
        { type: 'badge', amount: 1, name: 'Portfolio Master' },
        { type: 'nft', amount: 1, name: 'Trading Crown' }
      ],
      progress: 45,
      maxProgress: 100,
      completed: false,
      difficulty: 'hard',
      estimatedTime: '4 hours'
    },
    {
      id: '4',
      title: 'Smart Shopper Elite',
      description: 'Master bargaining and avoid all shopping scams',
      district: 'market',
      type: 'exploration',
      requirements: ['Visit all market areas', 'Complete bargaining challenges', 'Identify 5 shopping scams'],
      rewards: [
        { type: 'coins', amount: 400 },
        { type: 'badge', amount: 1, name: 'Bargain Hunter' },
        { type: 'nft', amount: 1, name: 'Market Crown' }
      ],
      progress: 30,
      maxProgress: 100,
      completed: false,
      difficulty: 'medium',
      estimatedTime: '1.5 hours'
    },
    {
      id: '5',
      title: 'Treasure Collector',
      description: 'Collect rare NFTs and build an impressive digital collection',
      district: 'reward',
      type: 'collection',
      requirements: ['Spin wheel 20 times', 'Collect 5 rare NFTs', 'Trade with other players'],
      rewards: [
        { type: 'coins', amount: 300 },
        { type: 'badge', amount: 1, name: 'Collector Supreme' },
        { type: 'nft', amount: 1, name: 'Legendary Vault' }
      ],
      progress: 15,
      maxProgress: 100,
      completed: false,
      difficulty: 'easy',
      estimatedTime: '2 hours'
    }
  ];

  const samplePopupCases: PopupCase[] = [
    {
      id: '1',
      type: 'scam_alert',
      title: '🚨 Urgent Scam Alert!',
      message: 'A new phishing email is targeting bank customers. Someone claiming to be from Vietcombank is asking for account verification. What do you do?',
      options: [
        { id: 'a', text: 'Click the link to verify', reward: -50, consequence: 'You fell for the scam and lost coins!' },
        { id: 'b', text: 'Call the bank directly', reward: 100, consequence: 'Smart choice! You avoided the scam and earned coins!' },
        { id: 'c', text: 'Ignore the email', reward: 25, consequence: 'Safe choice, but you could have helped others by reporting it.' }
      ],
      urgency: 'high',
      icon: AlertTriangle,
      color: 'from-red-500 to-orange-500'
    },
    {
      id: '2',
      type: 'investment_tip',
      title: '💡 Market Opportunity',
      message: 'VCB stock just announced a 15% dividend increase. The price is up 3% today. What\'s your move?',
      options: [
        { id: 'a', text: 'Buy immediately', reward: -25, consequence: 'You bought at a peak! Wait for better entry points.' },
        { id: 'b', text: 'Research and wait', reward: 75, consequence: 'Wise! Good investors research before acting.' },
        { id: 'c', text: 'Set a limit order', reward: 100, consequence: 'Excellent strategy! You\'ll buy at your target price.' }
      ],
      urgency: 'medium',
      icon: TrendingUp,
      color: 'from-green-500 to-blue-500'
    },
    {
      id: '3',
      type: 'budget_warning',
      title: '⚠️ Budget Alert',
      message: 'You\'ve spent 90% of your entertainment budget this month. There are still 10 days left!',
      options: [
        { id: 'a', text: 'Continue spending normally', reward: -30, consequence: 'You went over budget and had to use savings.' },
        { id: 'b', text: 'Cut entertainment spending', reward: 50, consequence: 'Good discipline! You stayed within budget.' },
        { id: 'c', text: 'Find free activities', reward: 75, consequence: 'Creative solution! You saved money and had fun.' }
      ],
      urgency: 'medium',
      icon: AlertTriangle,
      color: 'from-yellow-500 to-red-500'
    },
    {
      id: '4',
      type: 'achievement',
      title: '🏆 Achievement Unlocked!',
      message: 'Congratulations! You\'ve completed 10 daily challenges in a row!',
      reward: 200,
      urgency: 'low',
      autoClose: 5000,
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: '5',
      type: 'daily_bonus',
      title: '🎁 Daily Login Bonus',
      message: 'Welcome back! Here\'s your daily bonus for consistent learning.',
      reward: 50,
      urgency: 'low',
      autoClose: 3000,
      icon: Gift,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: '6',
      type: 'market_news',
      title: '📈 Market Update',
      message: 'Breaking: Vietnamese stock market hits new high! VN-Index up 2.5% on strong banking sector performance.',
      urgency: 'low',
      autoClose: 4000,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: '7',
      type: 'security_alert',
      title: '🔒 Security Reminder',
      message: 'Remember to enable 2FA on your banking apps! Cybersecurity is everyone\'s responsibility.',
      urgency: 'medium',
      autoClose: 6000,
      icon: Shield,
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const sampleNotifications: NotificationItem[] = [
    {
      id: '1',
      type: 'achievement',
      title: 'New Badge Earned!',
      message: 'You\'ve unlocked the "Scam Fighter" badge for detecting 5 scams correctly.',
      timestamp: '2 minutes ago',
      read: false,
      action: { text: 'View Badge', callback: () => setShowNotifications(false) }
    },
    {
      id: '2',
      type: 'warning',
      title: 'Budget Alert',
      message: 'You\'re approaching your monthly entertainment budget limit.',
      timestamp: '1 hour ago',
      read: false,
      action: { text: 'Review Budget', callback: () => setCurrentDistrict('bank') }
    },
    {
      id: '3',
      type: 'tip',
      title: 'Investment Tip',
      message: 'Market volatility is high today. Consider dollar-cost averaging for new investments.',
      timestamp: '3 hours ago',
      read: true
    },
    {
      id: '4',
      type: 'social',
      title: 'Community Update',
      message: 'Sarah shared a new scam report that might interest you.',
      timestamp: '5 hours ago',
      read: true,
      action: { text: 'View Report', callback: () => onNavigate('community') }
    },
    {
      id: '5',
      type: 'system',
      title: 'Daily Challenge Available',
      message: 'New cybersecurity challenge is ready! Complete it before midnight.',
      timestamp: '8 hours ago',
      read: false,
      action: { text: 'Start Challenge', callback: () => onNavigate('challenge') }
    }
  ];

  useEffect(() => {
    setActiveMissions(cityMissions);
    setNotifications(sampleNotifications);

    // Simulate random popup cases
    const popupInterval = setInterval(() => {
      if (!popupCase && Math.random() < 0.3) {
        const randomCase = samplePopupCases[Math.floor(Math.random() * samplePopupCases.length)];
        setPopupCase(randomCase);
        
        if (randomCase.autoClose) {
          setTimeout(() => setPopupCase(null), randomCase.autoClose);
        }
      }
    }, 15000);

    return () => clearInterval(popupInterval);
  }, [popupCase]);

  const handlePopupResponse = (optionId: string) => {
    if (!popupCase || !popupCase.options) return;
    
    const selectedOption = popupCase.options.find(opt => opt.id === optionId);
    if (selectedOption) {
      if (selectedOption.reward) {
        addCoins(selectedOption.reward);
      }
      
      // Add notification about the consequence
      const newNotification: NotificationItem = {
        id: Date.now().toString(),
        type: selectedOption.reward && selectedOption.reward > 0 ? 'achievement' : 'warning',
        title: 'Action Result',
        message: selectedOption.consequence || 'Action completed.',
        timestamp: 'Just now',
        read: false
      };
      
      setNotifications(prev => [newNotification, ...prev]);
    }
    
    setPopupCase(null);
  };

  const closePopup = () => {
    if (popupCase?.reward) {
      addCoins(popupCase.reward);
    }
    setPopupCase(null);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const renderDistrictCard = (district: any) => (
    <div
      key={district.id}
      className="group relative overflow-hidden rounded-2xl border-2 border-white/30 hover:border-white/60 transition-all duration-500 transform hover:scale-105 hover:rotate-1 cursor-pointer district-card animate-slideInUp"
      style={{animationDelay: `${parseInt(district.id) * 0.1}s`}}
      onClick={() => setCurrentDistrict(district.id)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${district.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
      <div className="relative p-8 glass">
        <div className="flex items-center justify-between mb-4">
          <div className="p-4 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
            <district.icon className="text-white group-hover:scale-110 transition-transform duration-300" size={32} />
          </div>
          <div className="text-right">
            <div className="text-white font-bold text-2xl gradient-text">{district.population}</div>
            <div className="text-purple-200 text-xs font-medium">Citizens</div>
          </div>
        </div>
        
        <h3 className="text-white font-bold text-xl mb-3 group-hover:text-yellow-200 transition-colors">
          {district.name}
        </h3>
        <p className="text-purple-200 text-sm mb-6 group-hover:text-purple-100 transition-colors leading-relaxed">
          {district.description}
        </p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-purple-300 flex items-center">
              <Sparkles size={14} className="mr-1" />
              Special Feature:
            </span>
            <span className="text-white font-medium text-xs">{district.specialFeature}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-white font-semibold text-sm flex items-center">
            <Building2 size={14} className="mr-1" />
            Buildings:
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {district.buildings.map((building: string, index: number) => (
              <div key={index} className="text-purple-200 group-hover:text-purple-100 transition-colors bg-white/5 rounded px-2 py-1">
                • {building}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-6 right-6">
          {district.unlocked ? (
            <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse-glow shadow-lg shadow-green-400/50"></div>
          ) : (
            <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
          )}
        </div>
      </div>
    </div>
  );

  const renderPopupCase = () => {
    if (!popupCase) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className={`bg-gradient-to-br ${popupCase.color} p-1 rounded-2xl max-w-md w-full animate-slideUp`}>
          <div className="bg-gray-900/95 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-full bg-gradient-to-r ${popupCase.color}`}>
                  <popupCase.icon className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{popupCase.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      popupCase.urgency === 'high' ? 'bg-red-500/30 text-red-200' :
                      popupCase.urgency === 'medium' ? 'bg-yellow-500/30 text-yellow-200' :
                      'bg-green-500/30 text-green-200'
                    }`}>
                      {popupCase.urgency.toUpperCase()} PRIORITY
                    </span>
                    {popupCase.reward && (
                      <span className="text-yellow-400 text-sm">+{popupCase.reward} coins</span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={closePopup}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-purple-200 mb-6">{popupCase.message}</p>

            {popupCase.options ? (
              <div className="space-y-3">
                {popupCase.options.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handlePopupResponse(option.id)}
                    className="w-full text-left p-4 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 hover:border-white/40 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white">{option.text}</span>
                      {option.reward && (
                        <span className={`text-sm font-medium ${
                          option.reward > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {option.reward > 0 ? '+' : ''}{option.reward} coins
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <button
                onClick={closePopup}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
              >
                Collect Reward
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderNotificationPanel = () => (
    <div className="fixed top-0 right-0 h-full w-96 bg-gray-900/95 backdrop-blur-lg border-l border-white/20 z-40 transform transition-transform duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-xl">Notifications</h2>
          <button
            onClick={() => setShowNotifications(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                notification.read 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-white/10 border-white/20 hover:bg-white/15'
              }`}
              onClick={() => markNotificationRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${
                  notification.type === 'achievement' ? 'bg-yellow-500/20 text-yellow-400' :
                  notification.type === 'warning' ? 'bg-red-500/20 text-red-400' :
                  notification.type === 'tip' ? 'bg-blue-500/20 text-blue-400' :
                  notification.type === 'social' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {notification.type === 'achievement' && <Trophy size={16} />}
                  {notification.type === 'warning' && <AlertTriangle size={16} />}
                  {notification.type === 'tip' && <Brain size={16} />}
                  {notification.type === 'social' && <Users size={16} />}
                  {notification.type === 'system' && <Bell size={16} />}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm">{notification.title}</h3>
                  <p className="text-purple-200 text-xs mb-2">{notification.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 text-xs">{notification.timestamp}</span>
                    {notification.action && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          notification.action!.callback();
                        }}
                        className="text-blue-400 hover:text-blue-300 text-xs font-medium"
                      >
                        {notification.action.text}
                      </button>
                    )}
                  </div>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMissionPanel = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-white/20 z-40 transform transition-transform duration-300">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-xl">Active City Missions</h2>
          <button
            onClick={() => setShowMissionPanel(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-64 overflow-y-auto">
          {activeMissions.map(mission => (
            <div key={mission.id} className="bg-white/10 rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold text-sm">{mission.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    mission.difficulty === 'easy' ? 'bg-green-500/30 text-green-200' :
                    mission.difficulty === 'medium' ? 'bg-yellow-500/30 text-yellow-200' :
                    'bg-red-500/30 text-red-200'
                  }`}>
                    {mission.difficulty.toUpperCase()}
                  </span>
                  <Clock className="text-purple-400" size={12} />
                  <span className="text-purple-300 text-xs">{mission.estimatedTime}</span>
                </div>
              </div>

              <p className="text-purple-200 text-xs mb-3">{mission.description}</p>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-xs">
                  <span className="text-purple-300">Progress:</span>
                  <span className="text-white">{mission.progress}/{mission.maxProgress}</span>
                </div>
                <div className="w-full bg-gray-700/30 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      mission.completed ? 'bg-green-400' : 'bg-blue-400'
                    }`}
                    style={{ width: `${(mission.progress / mission.maxProgress) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1 mb-3">
                <h4 className="text-white font-medium text-xs">Rewards:</h4>
                <div className="flex flex-wrap gap-1">
                  {mission.rewards.map((reward, index) => (
                    <span key={index} className={`px-2 py-1 rounded text-xs ${
                      reward.type === 'coins' ? 'bg-yellow-500/30 text-yellow-200' :
                      reward.type === 'xp' ? 'bg-blue-500/30 text-blue-200' :
                      reward.type === 'badge' ? 'bg-purple-500/30 text-purple-200' :
                      'bg-pink-500/30 text-pink-200'
                    }`}>
                      {reward.amount} {reward.type}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setCurrentDistrict(mission.district)}
                disabled={mission.completed}
                className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors ${
                  mission.completed
                    ? 'bg-green-500/30 text-green-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                }`}
              >
                {mission.completed ? 'Completed ✓' : 'Continue Mission'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-8">
      {/* City Header */}
      <div className="text-center animate-slideInDown">
        <div className="relative inline-block mb-6">
          <Map className="mx-auto text-purple-400 animate-float" size={80} />
          <div className="absolute -top-2 -right-2">
            <Sparkles className="text-yellow-400 animate-pulse" size={24} />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4 gradient-text">FinVerse City</h1>
        <p className="text-purple-200 text-xl leading-relaxed max-w-2xl mx-auto">
          Explore districts, complete missions, and master financial skills in the ultimate Gen Z money game! 🚀
        </p>
      </div>

      {/* City Stats */}
      <div className="glass rounded-2xl p-8 border border-white/20 animate-slideInUp">
        <h2 className="text-white font-bold text-2xl mb-6 gradient-text flex items-center">
          <BarChart3 className="mr-3" size={28} />
          City Statistics (Live)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { name: 'Population', value: cityStats.population.toLocaleString(), icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/20' },
            { name: 'Happiness', value: `${cityStats.happiness}%`, icon: Heart, color: 'text-pink-400', bg: 'bg-pink-500/20' },
            { name: 'Security', value: `${cityStats.security}%`, icon: Shield, color: 'text-red-400', bg: 'bg-red-500/20' },
            { name: 'Economy', value: `${cityStats.economy}%`, icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-500/20' },
            { name: 'Education', value: `${cityStats.education}%`, icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/20' }
          ].map(stat => (
            <div key={stat.name} className="text-center group">
              <div className={`p-4 rounded-full ${stat.bg} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`${stat.color}`} size={28} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-purple-300 text-sm font-medium">{stat.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Districts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {districts.map(renderDistrictCard)}
      </div>

      {/* Quick Actions */}
      <div className="glass rounded-2xl p-8 border border-white/20 animate-slideInUp" style={{animationDelay: '0.4s'}}>
        <h2 className="text-white font-bold text-2xl mb-6 gradient-text flex items-center">
          <Lightning className="mr-3" size={28} />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <button
            onClick={() => onNavigate('challenge')}
            className="btn-warning p-6 rounded-xl transition-all interactive-card group"
          >
            <Calendar className="mx-auto mb-3 group-hover:scale-110 transition-transform" size={32} />
            <div className="font-bold text-sm">Daily Challenge</div>
            <div className="text-xs opacity-80 mt-1">Earn 2x XP</div>
          </button>
          
          <button
            onClick={() => setCurrentDistrict('reward')}
            className="btn-success p-6 rounded-xl transition-all interactive-card group"
          >
            <Gift className="mx-auto mb-3 group-hover:scale-110 transition-transform" size={32} />
            <div className="font-bold text-sm">Spin Wheel</div>
            <div className="text-xs opacity-80 mt-1">Win NFTs</div>
          </button>
          
          <button
            onClick={() => onNavigate('community')}
            className="btn-primary p-6 rounded-xl transition-all interactive-card group"
          >
            <Users className="mx-auto mb-3 group-hover:scale-110 transition-transform" size={32} />
            <div className="font-bold text-sm">Community</div>
            <div className="text-xs opacity-80 mt-1">Share & Learn</div>
          </button>
          
          <button
            onClick={() => setShowMissionPanel(true)}
            className="btn-danger p-6 rounded-xl transition-all interactive-card group"
          >
            <Target className="mx-auto mb-3 group-hover:scale-110 transition-transform" size={32} />
            <div className="font-bold text-sm">Missions</div>
            <div className="text-xs opacity-80 mt-1">Epic Rewards</div>
          </button>
        </div>
      </div>

      {/* Active Missions Preview */}
      <div className="glass rounded-2xl p-8 border border-white/20 animate-slideInUp" style={{animationDelay: '0.6s'}}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-2xl gradient-text flex items-center">
            <Rocket className="mr-3" size={28} />
            Active Missions
          </h2>
          <button
            onClick={() => setShowMissionPanel(true)}
            className="text-purple-300 hover:text-white text-sm transition-colors font-medium flex items-center"
          >
            <Crown size={16} className="mr-1" />
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeMissions.slice(0, 4).map(mission => (
            <div key={mission.id} className="glass-dark rounded-lg p-6 border border-white/10 interactive-card">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-semibold">{mission.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  mission.completed ? 'bg-green-500/30 text-green-200' : 'bg-blue-500/30 text-blue-200'
                }`}>
                  {mission.completed ? 'COMPLETE' : 'ACTIVE'}
                </span>
              </div>
              <div className="w-full bg-gray-700/30 rounded-full h-3 mb-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-700 ${
                    mission.completed ? 'bg-green-400' : 'bg-blue-400'
                  }`}
                  style={{ width: `${(mission.progress / mission.maxProgress) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-purple-300 font-medium capitalize">{mission.district} district</span>
                <span className="text-white font-bold">{mission.progress}/{mission.maxProgress}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentDistrict) {
      case 'bank':
        return <BankDistrict onBack={() => setCurrentDistrict('overview')} />;
      case 'scam':
        return <ScamAlley onBack={() => setCurrentDistrict('overview')} />;
      case 'investment':
        return <InvestmentPark onBack={() => setCurrentDistrict('overview')} />;
      case 'market':
        return <MarketStreet onBack={() => setCurrentDistrict('overview')} />;
      case 'reward':
        return <RewardWheel onBack={() => setCurrentDistrict('overview')} />;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Enhanced Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Dashboard</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <Map className="text-purple-400" size={20} />
            <span className="text-white font-semibold">
              {currentDistrict === 'overview' ? 'FinVerse City' : 
               districts.find(d => d.id === currentDistrict)?.name || 'FinVerse City'}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Audio Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-lg transition-colors ${
                  soundEnabled ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                }`}
              >
                {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
              <button
                onClick={() => setBackgroundMusic(!backgroundMusic)}
                className={`p-2 rounded-lg transition-colors ${
                  backgroundMusic ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-500/20 text-gray-400'
                }`}
              >
                {backgroundMusic ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>

            {/* Notifications */}
            <button
              onClick={() => setShowNotifications(true)}
              className="relative p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Bell className="text-purple-400" size={20} />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{unreadCount}</span>
                </div>
              )}
            </button>

            {/* Missions */}
            <button
              onClick={() => setShowMissionPanel(true)}
              className="flex items-center space-x-2 bg-purple-500/20 px-3 py-2 rounded-lg hover:bg-purple-500/30 transition-colors"
            >
              <Target className="text-purple-400" size={16} />
              <span className="text-white text-sm font-medium">
                {activeMissions.filter(m => !m.completed).length} Active
              </span>
            </button>

            {/* Coins */}
            <div className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-2 rounded-lg">
              <Coins className="text-yellow-400" size={20} />
              <span className="text-white font-semibold">{progress.coins.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        {renderContent()}
      </div>

      {/* Floating Action Buttons */}
      {currentDistrict === 'overview' && (
        <div className="fixed bottom-6 right-6 space-y-3 z-20">
          <button
            onClick={() => setCurrentDistrict('reward')}
            className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-glow"
          >
            <Gift className="text-white" size={24} />
          </button>
          
          <button
            onClick={() => onNavigate('challenge')}
            className="w-14 h-14 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <Zap className="text-white" size={24} />
          </button>
        </div>
      )}

      {/* Popup Cases */}
      {popupCase && renderPopupCase()}

      {/* Notification Panel */}
      {showNotifications && renderNotificationPanel()}

      {/* Mission Panel */}
      {showMissionPanel && renderMissionPanel()}

      {/* Background Overlay for Panels */}
      {(showNotifications || showMissionPanel) && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={() => {
            setShowNotifications(false);
            setShowMissionPanel(false);
          }}
        />
      )}
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Building2, ShoppingCart, TrendingUp, Shield, Gift, Map, Coins, Trophy, Star, Bell, AlertTriangle, X, CheckCircle, Eye, Brain, Zap, Target, Award, Clock, Users, MessageCircle, Play, Pause, Volume2, VolumeX, Calendar, Smartphone, CreditCard, Heart, Flame, TrendingDown, DollarSign, Coffee, GameController2, Headphones, ShoppingBag, Wifi, Battery, Signal } from 'lucide-react';
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
  const [currentGenZScenario, setCurrentGenZScenario] = useState<GenZScenario | null>(null);
  const [scenarioTimeLeft, setScenarioTimeLeft] = useState(0);
  const [streak, setStreak] = useState(0);
  const [dailyFailures, setDailyFailures] = useState(0);
  const [aiPersonality, setAiPersonality] = useState<'supportive' | 'savage' | 'wise' | 'hype'>('hype');
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
      name: 'Money Moves HQ', 
      icon: Building2, 
      color: 'from-blue-500 to-cyan-500',
      description: 'Level up your money game 💰',
      unlocked: true,
      buildings: ['Digital Bank', 'Credit Builder', 'Loan Shark Detector', 'Budget Boss Arena'],
      population: 450,
      specialFeature: 'AI Budget Coach'
    },
    { 
      id: 'scam', 
      name: 'Scam Survival Zone', 
      icon: Shield, 
      color: 'from-red-500 to-orange-500',
      description: 'Don\'t get finessed 🛡️',
      unlocked: true,
      buildings: ['Phishing Simulator', 'Romance Scam Lab', 'Crypto Rug Pull Detector', 'Social Engineering Arena'],
      population: 320,
      specialFeature: 'Live Scam Alerts'
    },
    { 
      id: 'investment', 
      name: 'Diamond Hands District', 
      icon: TrendingUp, 
      color: 'from-purple-500 to-pink-500',
      description: 'To the moon or bust 🚀',
      unlocked: true,
      buildings: ['Meme Stock Arena', 'Crypto Casino', 'YOLO Prevention Center', 'Paper Trading Gym'],
      population: 680,
      specialFeature: 'FOMO Resistance Training'
    },
    { 
      id: 'market', 
      name: 'Impulse Buy Boulevard', 
      icon: ShoppingCart, 
      color: 'from-green-500 to-emerald-500',
      description: 'Shop smart, not hard 🛍️',
      unlocked: true,
      buildings: ['BNPL Trap House', 'Influencer Marketing Lab', 'Cart Abandonment Clinic', 'Subscription Graveyard'],
      population: 520,
      specialFeature: 'Anti-Impulse Shield'
    },
    { 
      id: 'reward', 
      name: 'Flex Zone', 
      icon: Gift, 
      color: 'from-yellow-500 to-orange-500',
      description: 'Earn your bragging rights ✨',
      unlocked: true,
      buildings: ['Gacha Machine', 'NFT Flex Gallery', 'Clout Exchange', 'Achievement Shrine'],
      population: 380,
      specialFeature: 'Limited Edition Drops'
    }
  ];

  const cityMissions: CityMission[] = [
    {
      id: '1',
      title: 'Money Moves Mastery',
      description: 'Survive 10 real-world money scenarios without going broke',
      district: 'bank',
      type: 'learning',
      requirements: ['Dodge 5 impulse purchases', 'Set up emergency fund', 'Avoid 3 subscription traps'],
      rewards: [
        { type: 'coins', amount: 500 },
        { type: 'badge', amount: 1, name: 'Money Boss' },
        { type: 'nft', amount: 1, name: 'Diamond Hands Avatar' }
      ],
      progress: Math.min(progress.financialLiteracyScore, 80),
      maxProgress: 80,
      completed: progress.financialLiteracyScore >= 80,
      difficulty: 'medium',
      estimatedTime: '30 min'
    },
    {
      id: '2',
      title: 'Scam Slayer Supreme',
      description: 'Don\'t fall for any tricks - become unscammable',
      district: 'scam',
      type: 'challenge',
      requirements: ['Spot 15 scams in a row', 'Save 3 friends from scams', 'Complete phishing bootcamp'],
      rewards: [
        { type: 'coins', amount: 750 },
        { type: 'badge', amount: 1, name: 'Unscammable' },
        { type: 'nft', amount: 1, name: 'Anti-Scam Shield' }
      ],
      progress: Math.min(progress.milSkillScore, 100),
      maxProgress: 100,
      completed: progress.milSkillScore >= 75,
      difficulty: 'hard',
      estimatedTime: '45 min'
    },
    {
      id: '3',
      title: 'Diamond Hands Legend',
      description: 'Make smart investments without FOMO or panic selling',
      district: 'investment',
      type: 'collection',
      requirements: ['Resist 5 FOMO trades', 'Hold through 3 market crashes', 'Spot 2 pump & dumps'],
      rewards: [
        { type: 'coins', amount: 1000 },
        { type: 'badge', amount: 1, name: 'Diamond Hands' },
        { type: 'nft', amount: 1, name: 'Rocket Ship NFT' }
      ],
      progress: 45,
      maxProgress: 100,
      completed: false,
      difficulty: 'hard',
      estimatedTime: '1 hour'
    },
    {
      id: '4',
      title: 'Anti-Impulse Champion',
      description: 'Resist the urge to buy everything you see online',
      district: 'market',
      type: 'exploration',
      requirements: ['Abandon 10 shopping carts', 'Unsubscribe from 5 services', 'Resist 3 flash sales'],
      rewards: [
        { type: 'coins', amount: 400 },
        { type: 'badge', amount: 1, name: 'Impulse Killer' },
        { type: 'nft', amount: 1, name: 'Self-Control Crown' }
      ],
      progress: 30,
      maxProgress: 100,
      completed: false,
      difficulty: 'medium',
      estimatedTime: '20 min'
    },
    {
      id: '5',
      title: 'Flex Master Supreme',
      description: 'Collect the rarest digital assets and flex on everyone',
      district: 'reward',
      type: 'collection',
      requirements: ['Get 3 legendary drops', 'Trade 5 NFTs', 'Reach 10k clout points'],
      rewards: [
        { type: 'coins', amount: 300 },
        { type: 'badge', amount: 1, name: 'Ultimate Flexer' },
        { type: 'nft', amount: 1, name: 'Golden Flex Badge' }
      ],
      progress: 15,
      maxProgress: 100,
      completed: false,
      difficulty: 'easy',
      estimatedTime: '30 min'
    }
  ];

  const genZScenarios: GenZScenario[] = [
    {
      id: '1',
      type: 'shopping',
      title: '🔥 FLASH SALE ALERT',
      situation: 'Your favorite influencer just posted a 24-hour flash sale',
      context: 'That jacket you\'ve been wanting is 50% off but only for the next 2 hours! Your friends are all buying it and posting stories. You have $200 in your account and rent is due in 5 days.',
      timeLimit: 30,
      options: [
        {
          id: 'a',
          text: 'YOLO, buy it now! 🛍️',
          emoji: '💸',
          consequence: 'You bought the jacket but now you\'re short on rent money',
          moneyImpact: -120,
          creditImpact: 0,
          stressLevel: 8,
          aiResponse: 'Bruh... that FOMO hit different but your future self is crying rn 😭',
          isOptimal: false
        },
        {
          id: 'b',
          text: 'Add to wishlist, check budget first 📝',
          emoji: '🧠',
          consequence: 'Smart move! You avoided impulse buying and kept your rent money safe',
          moneyImpact: 0,
          creditImpact: 0,
          stressLevel: 2,
          aiResponse: 'PERIODT! That\'s some big brain energy right there 🧠✨',
          isOptimal: true
        },
        {
          id: 'c',
          text: 'Use BNPL - pay later! 💳',
          emoji: '⚠️',
          consequence: 'You got the jacket but now have 4 payments of $30 to worry about',
          moneyImpact: -30,
          creditImpact: -10,
          stressLevel: 6,
          aiResponse: 'BNPL is a trap bestie... those payments add up FAST 📈',
          isOptimal: false
        }
      ],
      urgency: 'high',
      platform: 'instagram',
      reward: 100,
      streakBonus: 25
    },
    {
      id: '2',
      type: 'crypto',
      title: '🚀 MOONSHOT OPPORTUNITY',
      situation: 'Your Discord group is going crazy over a new crypto',
      context: 'Everyone\'s saying this new token is about to 100x. Your friend just made $500 in 10 minutes. The chart is going parabolic and FOMO is hitting HARD.',
      timeLimit: 45,
      options: [
        {
          id: 'a',
          text: 'APE IN! TO THE MOON! 🚀',
          emoji: '🌙',
          consequence: 'You bought at the peak... it crashed 80% the next day',
          moneyImpact: -400,
          creditImpact: 0,
          stressLevel: 10,
          aiResponse: 'Oof... you got rekt by FOMO. This is why we don\'t chase pumps 📉',
          isOptimal: false
        },
        {
          id: 'b',
          text: 'Research first, invest small 🔍',
          emoji: '🤓',
          consequence: 'You missed the pump but avoided the dump. Your money is safe.',
          moneyImpact: 0,
          creditImpact: 0,
          stressLevel: 3,
          aiResponse: 'W move! Better to miss gains than lose everything. You\'re built different 💪',
          isOptimal: true
        },
        {
          id: 'c',
          text: 'Put in half my savings 💰',
          emoji: '😰',
          consequence: 'Moderate loss but you still have some money left',
          moneyImpact: -200,
          creditImpact: 0,
          stressLevel: 7,
          aiResponse: 'Could\'ve been worse but never risk money you can\'t afford to lose 😬',
          isOptimal: false
        }
      ],
      urgency: 'extreme',
      platform: 'discord',
      reward: 150,
      streakBonus: 50
    },
    {
      id: '3',
      type: 'bnpl',
      title: '💳 BUY NOW, PAY LATER',
      situation: 'Checkout page offering 4 easy payments',
      context: 'You\'re buying a $400 gaming setup. The site offers 4 payments of $100 with no interest. Seems like a good deal since you get paid next week.',
      timeLimit: 60,
      options: [
        {
          id: 'a',
          text: 'Sounds good, split it up! 📅',
          emoji: '💳',
          consequence: 'You now have 4 monthly payments to remember and budget for',
          moneyImpact: -100,
          creditImpact: -5,
          stressLevel: 5,
          aiResponse: 'BNPL seems easy but it\'s just debt with extra steps... be careful 👀',
          isOptimal: false
        },
        {
          id: 'b',
          text: 'Save up and buy later 💪',
          emoji: '⏰',
          consequence: 'You waited, saved up, and bought it without any debt stress',
          moneyImpact: 0,
          creditImpact: 0,
          stressLevel: 1,
          aiResponse: 'THAT\'S the energy! Delayed gratification hits different when you own it outright 🔥',
          isOptimal: true
        },
        {
          id: 'c',
          text: 'Use credit card instead 💸',
          emoji: '📈',
          consequence: 'Higher interest rate but more flexible payments',
          moneyImpact: -400,
          creditImpact: -15,
          stressLevel: 7,
          aiResponse: 'Credit cards have higher interest than BNPL... this ain\'t it chief 😅',
          isOptimal: false
        }
      ],
      urgency: 'medium',
      platform: 'shopping_app',
      reward: 120,
      streakBonus: 30
    },
    {
      id: '4',
      type: 'social',
      title: '💕 ROMANCE SCAM ALERT',
      situation: 'Your online crush needs emergency money',
      context: 'You\'ve been talking to someone amazing for 2 weeks. They say they\'re stuck abroad and need $300 for a flight home. They promise to pay you back with interest.',
      timeLimit: 90,
      options: [
        {
          id: 'a',
          text: 'Send the money, love is real! 💕',
          emoji: '💸',
          consequence: 'You got scammed. They blocked you and disappeared with your money.',
          moneyImpact: -300,
          creditImpact: 0,
          stressLevel: 9,
          aiResponse: 'Nooo bestie... that\'s a classic romance scam. Never send money to online strangers 💔',
          isOptimal: false
        },
        {
          id: 'b',
          text: 'Ask for video call first 📹',
          emoji: '🤔',
          consequence: 'They make excuses and eventually block you. Scam avoided!',
          moneyImpact: 0,
          creditImpact: 0,
          stressLevel: 4,
          aiResponse: 'Smart! Real people can video call. You dodged a bullet there 🛡️',
          isOptimal: true
        },
        {
          id: 'c',
          text: 'Send half to test them 🤷‍♀️',
          emoji: '😬',
          consequence: 'Still got scammed but lost less money',
          moneyImpact: -150,
          creditImpact: 0,
          stressLevel: 6,
          aiResponse: 'Any amount is too much for online strangers... but at least it wasn\'t everything 😔',
          isOptimal: false
        }
      ],
      urgency: 'high',
      platform: 'dating_app',
      reward: 200,
      streakBonus: 75
    },
    {
      id: '5',
      type: 'subscription',
      title: '📱 SUBSCRIPTION TRAP',
      situation: 'Free trial ending soon notification',
      context: 'You signed up for a "free" 7-day trial of a meditation app. It\'s about to charge you $19.99/month. You used it twice.',
      timeLimit: 120,
      options: [
        {
          id: 'a',
          text: 'Keep it, might use it more 🧘‍♀️',
          emoji: '💸',
          consequence: 'You\'re now paying $20/month for an app you rarely use',
          moneyImpact: -20,
          creditImpact: 0,
          stressLevel: 3,
          aiResponse: 'Subscription creep is real... those $20s add up to hundreds per year 📊',
          isOptimal: false
        },
        {
          id: 'b',
          text: 'Cancel immediately! ❌',
          emoji: '✂️',
          consequence: 'You cancelled and saved $240 per year. Smart move!',
          moneyImpact: 0,
          creditImpact: 0,
          stressLevel: 1,
          aiResponse: 'YES! Cancel culture but make it subscriptions. You just saved $240/year 💰',
          isOptimal: true
        },
        {
          id: 'c',
          text: 'Forget about it 🤷‍♀️',
          emoji: '😴',
          consequence: 'You forgot and got charged. Now you have another subscription to track.',
          moneyImpact: -20,
          creditImpact: 0,
          stressLevel: 4,
          aiResponse: 'Forgetting subscriptions is how they get you... set calendar reminders! ⏰',
          isOptimal: false
        }
      ],
      urgency: 'medium',
      platform: 'smartphone',
      reward: 80,
      streakBonus: 20
    }
  ];

  const samplePopupCases: PopupCase[] = [
    {
      id: '1',
      type: 'gen_z_scenario',
      title: '🔥 FLASH SALE FOMO',
      message: 'Your fave influencer just dropped a 2-hour flash sale! That jacket you\'ve been eyeing is 50% off but rent is due in 5 days...',
      options: [
        { id: 'a', text: 'YOLO buy it! 🛍️', reward: -50, consequence: 'FOMO got you... now you\'re short on rent 😭' },
        { id: 'b', text: 'Check budget first 🧠', reward: 100, consequence: 'Big brain move! Your future self thanks you ✨' },
        { id: 'c', text: 'Use BNPL 💳', reward: -25, consequence: 'BNPL trap activated... those payments add up fast 📈' }
      ],
      urgency: 'high',
      timeLimit: 30,
      icon: AlertTriangle,
      color: 'from-red-500 to-orange-500',
      platform: 'Instagram'
    },
    {
      id: '2',
      type: 'crypto_hype',
      title: '🚀 MOONSHOT ALERT',
      message: 'Your Discord is going CRAZY over this new token! Everyone\'s saying it\'s about to 100x. FOMO is hitting hard...',
      options: [
        { id: 'a', text: 'APE IN! 🌙', reward: -100, consequence: 'You bought the top... it crashed 80% next day 📉' },
        { id: 'b', text: 'Research first 🔍', reward: 150, consequence: 'Missed the pump, avoided the dump. W move! 💪' },
        { id: 'c', text: 'YOLO half savings 💰', reward: -75, consequence: 'Could\'ve been worse but never risk what you can\'t lose 😬' }
      ],
      urgency: 'extreme',
      timeLimit: 45,
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      platform: 'Discord'
    },
    {
      id: '3',
      type: 'bnpl_trap',
      title: '💳 BNPL TEMPTATION',
      message: 'Checkout is offering 4 easy payments of $100 for that gaming setup. No interest! Seems legit...',
      options: [
        { id: 'a', text: 'Split it up! 📅', reward: -30, consequence: 'BNPL is just debt with extra steps... be careful 👀' },
        { id: 'b', text: 'Save up first 💪', reward: 120, consequence: 'Delayed gratification hits different! You own it outright 🔥' },
        { id: 'c', text: 'Credit card instead 💸', reward: -50, consequence: 'Higher interest than BNPL... this ain\'t it chief 😅' }
      ],
      urgency: 'medium',
      timeLimit: 60,
      icon: AlertTriangle,
      color: 'from-blue-500 to-cyan-500',
      platform: 'Shopping App'
    },
    {
      id: '4',
      type: 'fomo_alert',
      title: '💕 ROMANCE SCAM INCOMING',
      message: 'Your online crush needs $300 for an emergency flight home. They promise to pay back with interest...',
      options: [
        { id: 'a', text: 'Send money! 💕', reward: -300, consequence: 'Classic romance scam... never send money to online strangers 💔' },
        { id: 'b', text: 'Video call first 📹', reward: 200, consequence: 'They made excuses and blocked you. Scam avoided! 🛡️' },
        { id: 'c', text: 'Send half to test 🤷‍♀️', reward: -150, consequence: 'Any amount is too much for strangers... but could\'ve been worse 😔' }
      ],
      urgency: 'high',
      timeLimit: 90,
      icon: Heart,
      color: 'from-pink-500 to-red-500',
      platform: 'Dating App'
    },
    {
      id: '5',
      type: 'impulse_buy',
      title: '📱 SUBSCRIPTION TRAP',
      message: 'Free trial ending! That meditation app you used twice is about to charge $19.99/month...',
      options: [
        { id: 'a', text: 'Keep it 🧘‍♀️', reward: -20, consequence: 'Subscription creep is real... those $20s add up to hundreds 📊' },
        { id: 'b', text: 'Cancel now! ❌', reward: 80, consequence: 'Cancel culture but make it subscriptions! Saved $240/year 💰' },
        { id: 'c', text: 'Forget about it 🤷‍♀️', reward: -20, consequence: 'Forgetting subscriptions is how they get you... set reminders! ⏰' }
      ],
      urgency: 'low',
      timeLimit: 120,
      icon: Smartphone,
      color: 'from-green-500 to-blue-500',
      platform: 'Phone'
    },
    {
      id: '6',
      type: 'daily_bonus',
      title: '🎁 Daily Survival Bonus',
      message: 'You survived another day without getting finessed! Here\'s your reward.',
      reward: 100,
      urgency: 'low',
      autoClose: 3000,
      icon: Gift,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: '7',
      type: 'market_news',
      title: '📈 Market Tea ☕',
      message: 'Breaking: Crypto market is having a moment! Bitcoin up 15% but remember - what goes up...',
      urgency: 'low',
      autoClose: 4000,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: '8',
      type: 'achievement',
      title: '🏆 STREAK LEGEND!',
      message: 'You\'ve made 10 smart money decisions in a row! You\'re officially unscammable 💪',
      reward: 500,
      urgency: 'medium',
      autoClose: 5000,
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500'
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

    // Simulate random Gen Z scenarios and popup cases
    const popupInterval = setInterval(() => {
      if (!popupCase && Math.random() < 0.3) {
        // 70% chance for Gen Z scenario, 30% for regular popup
        if (Math.random() < 0.7) {
          const randomScenario = genZScenarios[Math.floor(Math.random() * genZScenarios.length)];
          setCurrentGenZScenario(randomScenario);
          setScenarioTimeLeft(randomScenario.timeLimit);
        } else {
          const randomCase = samplePopupCases[Math.floor(Math.random() * samplePopupCases.length)];
          setPopupCase(randomCase);
        }
        
        if (popupCase?.autoClose) {
          setTimeout(() => setPopupCase(null), popupCase.autoClose);
        }
      }
    }, 10000); // More frequent scenarios

    return () => clearInterval(popupInterval);
  }, [popupCase, currentGenZScenario]);

  // Countdown timer for Gen Z scenarios
  useEffect(() => {
    if (currentGenZScenario && scenarioTimeLeft > 0) {
      const timer = setTimeout(() => {
        setScenarioTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (currentGenZScenario && scenarioTimeLeft === 0) {
      // Time's up! Auto-select worst option
      handleGenZScenarioResponse(currentGenZScenario.options[0].id);
    }
  }, [currentGenZScenario, scenarioTimeLeft]);

  const getAIFeedback = (isOptimal: boolean, aiResponse: string): AIFeedback => {
    const personalities = ['supportive', 'savage', 'wise', 'hype'] as const;
    const personality = personalities[Math.floor(Math.random() * personalities.length)];
    
    return {
      personality,
      message: aiResponse,
      tips: isOptimal 
        ? ['You\'re getting good at this!', 'Keep making smart choices', 'Your future self is proud']
        : ['Learn from this mistake', 'Everyone messes up sometimes', 'Try again and do better'],
      memeReference: isOptimal ? 'Big brain energy 🧠' : 'This ain\'t it chief 😅'
    };
  };

  const handleGenZScenarioResponse = (optionId: string) => {
    if (!currentGenZScenario) return;
    
    const selectedOption = currentGenZScenario.options.find(opt => opt.id === optionId);
    if (selectedOption) {
      // Update coins and progress
      addCoins(selectedOption.moneyImpact);
      
      if (selectedOption.isOptimal) {
        setStreak(prev => prev + 1);
        addCoins(currentGenZScenario.reward + (streak * currentGenZScenario.streakBonus));
        updateProgress({ 
          financialLiteracyScore: progress.financialLiteracyScore + 10,
          milSkillScore: progress.milSkillScore + 15
        });
      } else {
        setStreak(0);
        setDailyFailures(prev => prev + 1);
        updateProgress({ 
          milSkillScore: Math.max(0, progress.milSkillScore - 5)
        });
      }
      
      // Show AI feedback
      const feedback = getAIFeedback(selectedOption.isOptimal, selectedOption.aiResponse);
      
      // Add notification about the result
      const newNotification: NotificationItem = {
        id: Date.now().toString(),
        type: selectedOption.isOptimal ? 'achievement' : 'warning',
        title: selectedOption.isOptimal ? '🔥 Smart Move!' : '😬 Lesson Learned',
        message: feedback.message,
        timestamp: 'Just now',
        read: false
      };
      
      setNotifications(prev => [newNotification, ...prev]);
    }
    
    setCurrentGenZScenario(null);
    setScenarioTimeLeft(0);
  };

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
      className="group relative overflow-hidden rounded-2xl border-2 border-white/30 hover:border-white/60 transition-all duration-500 transform hover:scale-105 hover:rotate-1 cursor-pointer"
      onClick={() => setCurrentDistrict(district.id)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${district.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
      <div className="relative p-8 bg-white/10 backdrop-blur-lg">
        <div className="flex items-center justify-between mb-4">
          <district.icon className="text-white group-hover:scale-110 transition-transform duration-300" size={48} />
          <div className="text-right">
            <div className="text-white font-bold text-lg">{district.population}</div>
            <div className="text-purple-200 text-sm">Citizens</div>
          </div>
        </div>
        
        <h3 className="text-white font-bold text-xl mb-2 group-hover:text-yellow-200 transition-colors">
          {district.name}
        </h3>
        <p className="text-purple-200 text-sm mb-4 group-hover:text-purple-100 transition-colors">
          {district.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-purple-300">Special Feature:</span>
            <span className="text-white font-medium">{district.specialFeature}</span>
          </div>
        </div>

        <div className="space-y-1">
          <h4 className="text-white font-semibold text-sm">Buildings:</h4>
          <div className="grid grid-cols-2 gap-1 text-xs">
            {district.buildings.map((building: string, index: number) => (
              <div key={index} className="text-purple-200 group-hover:text-purple-100 transition-colors">
                • {building}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-4 right-4">
          {district.unlocked ? (
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          ) : (
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          )}
        </div>
      </div>
    </div>
  );

  const renderGenZScenario = () => {
    if (!currentGenZScenario) return null;

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 p-1 rounded-2xl max-w-md w-full animate-slideUp">
          <div className="bg-gray-900/95 backdrop-blur-lg rounded-xl p-6">
            {/* Platform Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  {currentGenZScenario.platform === 'instagram' && <Smartphone className="text-white" size={16} />}
                  {currentGenZScenario.platform === 'discord' && <MessageCircle className="text-white" size={16} />}
                  {currentGenZScenario.platform === 'shopping_app' && <ShoppingBag className="text-white" size={16} />}
                  {currentGenZScenario.platform === 'dating_app' && <Heart className="text-white" size={16} />}
                  {currentGenZScenario.platform === 'smartphone' && <Smartphone className="text-white" size={16} />}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{currentGenZScenario.title}</h3>
                  <p className="text-purple-300 text-sm capitalize">{currentGenZScenario.platform.replace('_', ' ')}</p>
                </div>
              </div>
              
              {/* Timer */}
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                scenarioTimeLeft <= 10 ? 'bg-red-500/30 text-red-200' :
                scenarioTimeLeft <= 30 ? 'bg-yellow-500/30 text-yellow-200' :
                'bg-green-500/30 text-green-200'
              }`}>
                <Clock size={16} />
                <span className="font-bold">{scenarioTimeLeft}s</span>
              </div>
            </div>

            {/* Scenario Content */}
            <div className="mb-6">
              <p className="text-purple-200 mb-2">{currentGenZScenario.situation}</p>
              <div className="bg-white/10 rounded-lg p-4 border-l-4 border-purple-500">
                <p className="text-white italic">"{currentGenZScenario.context}"</p>
              </div>
            </div>

            {/* Urgency Indicator */}
            <div className={`flex items-center space-x-2 mb-4 px-3 py-2 rounded-lg ${
              currentGenZScenario.urgency === 'extreme' ? 'bg-red-500/30 border border-red-500/50' :
              currentGenZScenario.urgency === 'high' ? 'bg-orange-500/30 border border-orange-500/50' :
              currentGenZScenario.urgency === 'medium' ? 'bg-yellow-500/30 border border-yellow-500/50' :
              'bg-green-500/30 border border-green-500/50'
            }`}>
              <Flame className={
                currentGenZScenario.urgency === 'extreme' ? 'text-red-400' :
                currentGenZScenario.urgency === 'high' ? 'text-orange-400' :
                currentGenZScenario.urgency === 'medium' ? 'text-yellow-400' :
                'text-green-400'
              } size={16} />
              <span className="text-white text-sm font-medium">
                {currentGenZScenario.urgency.toUpperCase()} URGENCY
              </span>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentGenZScenario.options.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleGenZScenarioResponse(option.id)}
                  className="w-full text-left p-4 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 hover:border-white/40 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="text-white font-medium">{option.text}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {option.moneyImpact !== 0 && (
                        <span className={`text-sm font-medium ${
                          option.moneyImpact > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {option.moneyImpact > 0 ? '+' : ''}${option.moneyImpact}
                        </span>
                      )}
                      <div className={`w-2 h-2 rounded-full ${
                        option.stressLevel <= 3 ? 'bg-green-400' :
                        option.stressLevel <= 6 ? 'bg-yellow-400' :
                        'bg-red-400'
                      }`} />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Rewards */}
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="text-purple-300">Base Reward: +{currentGenZScenario.reward} coins</span>
                {streak > 0 && (
                  <span className="text-yellow-400">Streak Bonus: +{streak * currentGenZScenario.streakBonus}</span>
                )}
              </div>
              <div className="text-purple-400">
                Current Streak: {streak} 🔥
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
                    {popupCase.platform && (
                      <span className="px-2 py-1 bg-white/20 text-white rounded text-xs">
                        {popupCase.platform}
                      </span>
                    )}
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
                    {popupCase.timeLimit && (
                      <span className="text-purple-300 text-sm">{popupCase.timeLimit}s</span>
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
      <div className="text-center">
        <Map className="mx-auto mb-4 text-purple-400" size={64} />
        <h1 className="text-4xl font-bold text-white mb-2">FinVerse City 🏙️</h1>
        <p className="text-purple-200 text-lg">Where Gen Z learns money skills without the boring lectures!</p>
        
        {/* Streak Display */}
        <div className="mt-4 flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 px-4 py-2 rounded-full border border-orange-500/30">
            <Flame className="text-orange-400" size={20} />
            <span className="text-white font-bold">{streak} Day Streak</span>
          </div>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-4 py-2 rounded-full border border-green-500/30">
            <Trophy className="text-green-400" size={20} />
            <span className="text-white font-bold">Level {progress.level}</span>
          </div>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full border border-purple-500/30">
            <Brain className="text-purple-400" size={20} />
            <span className="text-white font-bold">{Math.max(0, 10 - dailyFailures)} Lives Left</span>
          </div>
        </div>
      </div>

      {/* City Stats */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-white font-bold text-xl mb-4">City Vibes Check 📊</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: 'Gen Z Population', value: cityStats.population, icon: Users, color: 'text-blue-400' },
            { name: 'Happiness Level', value: `${cityStats.happiness}%`, icon: Star, color: 'text-yellow-400' },
            { name: 'Scam Resistance', value: `${cityStats.security}%`, icon: Shield, color: 'text-red-400' },
            { name: 'Money Moves', value: `${cityStats.economy}%`, icon: TrendingUp, color: 'text-green-400' },
            { name: 'Financial IQ', value: `${cityStats.education}%`, icon: Brain, color: 'text-purple-400' }
          ].map(stat => (
            <div key={stat.name} className="text-center">
              <stat.icon className={`mx-auto mb-2 ${stat.color}`} size={24} />
              <div className="text-white font-bold text-lg">{stat.value}</div>
              <div className="text-purple-300 text-sm">{stat.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Districts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {districts.map(renderDistrictCard)}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-white font-bold text-xl mb-4">Quick Moves ⚡</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate('challenge')}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 rounded-xl hover:from-orange-700 hover:to-red-700 transition-colors"
          >
            <Calendar className="mx-auto mb-2" size={24} />
            <div className="font-semibold text-sm">Daily Survival</div>
          </button>
          
          <button
            onClick={() => setCurrentDistrict('reward')}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white p-4 rounded-xl hover:from-yellow-700 hover:to-orange-700 transition-colors"
          >
            <Gift className="mx-auto mb-2" size={24} />
            <div className="font-semibold text-sm">Flex Zone</div>
          </button>
          
          <button
            onClick={() => onNavigate('community')}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-colors"
          >
            <Users className="mx-auto mb-2" size={24} />
            <div className="font-semibold text-sm">Squad Up</div>
          </button>
          
          <button
            onClick={() => setShowMissionPanel(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-colors"
          >
            <Target className="mx-auto mb-2" size={24} />
            <div className="font-semibold text-sm">Quests</div>
          </button>
        </div>
      </div>

      {/* Active Missions Preview */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-xl">Active Quests 🎯</h2>
          <button
            onClick={() => setShowMissionPanel(true)}
            className="text-purple-300 hover:text-white text-sm transition-colors"
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeMissions.slice(0, 4).map(mission => (
            <div key={mission.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-semibold text-sm">{mission.title}</h3>
                <span className={`px-2 py-1 rounded text-xs ${
                  mission.completed ? 'bg-green-500/30 text-green-200' : 'bg-blue-500/30 text-blue-200'
                }`}>
                  {mission.completed ? 'COMPLETE' : 'ACTIVE'}
                </span>
              </div>
              <div className="w-full bg-gray-700/30 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    mission.completed ? 'bg-green-400' : 'bg-blue-400'
                  }`}
                  style={{ width: `${(mission.progress / mission.maxProgress) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-purple-300">{mission.district} district</span>
                <span className="text-white">{mission.progress}/{mission.maxProgress}</span>
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

      {/* Gen Z Scenarios */}
      {currentGenZScenario && renderGenZScenario()}

      {/* Notification Panel */}
      {showNotifications && renderNotificationPanel()}

      {/* Mission Panel */}
      {showMissionPanel && renderMissionPanel()}

      {/* Background Overlay for Panels */}
      {(showNotifications || showMissionPanel || currentGenZScenario) && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={() => {
            setShowNotifications(false);
            setShowMissionPanel(false);
            if (currentGenZScenario) {
              // Auto-select first (worst) option if they click away
              handleGenZScenarioResponse(currentGenZScenario.options[0].id);
            }
          }}
        />
      )}
    </div>
  );
};
import React, { useState } from 'react';
import { 
  Home, 
  Gamepad2, 
  Calendar, 
  Users, 
  Trophy, 
  Coins, 
  Target,
  TrendingUp,
  Shield,
  Star,
  BarChart3,
  PieChart,
  Activity,
  Award,
  Clock,
  CheckCircle,
  AlertTriangle,
  Brain,
  Zap,
  Eye,
  BookOpen,
  RefreshCw
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface DashboardProps {
  onNavigate: (screen: 'dashboard' | 'game' | 'challenge' | 'community') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { profile, progress } = useUser();
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'achievements'>('overview');
  const [realTimeData, setRealTimeData] = useState({
    lastUpdated: new Date(),
    isUpdating: false
  });

  const menuItems = [
    { icon: Home, label: 'Dashboard', screen: 'dashboard' as const, active: true },
    { icon: Gamepad2, label: 'Game World', screen: 'game' as const },
    { icon: Calendar, label: 'Daily Challenges', screen: 'challenge' as const },
    { icon: Users, label: 'Community', screen: 'community' as const },
  ];

  const achievements = [
    { 
      name: 'First Steps', 
      description: 'Complete onboarding', 
      earned: true,
      category: 'milestone',
      earnedDate: '2024-01-15',
      rarity: 'common'
    },
    { 
      name: 'Scam Fighter', 
      description: 'Identify 5 scams correctly', 
      earned: progress.milSkillScore > 50,
      category: 'security',
      earnedDate: progress.milSkillScore > 50 ? '2024-01-18' : null,
      rarity: 'rare'
    },
    { 
      name: 'Smart Saver', 
      description: 'Complete savings challenge', 
      earned: progress.financialLiteracyScore > 30,
      category: 'finance',
      earnedDate: progress.financialLiteracyScore > 30 ? '2024-01-20' : null,
      rarity: 'uncommon'
    },
    { 
      name: 'City Builder', 
      description: 'Unlock 3 buildings', 
      earned: progress.cityBuildings.length >= 3,
      category: 'progression',
      earnedDate: progress.cityBuildings.length >= 3 ? '2024-01-22' : null,
      rarity: 'common'
    },
    {
      name: 'Streak Master',
      description: 'Complete 7 daily challenges in a row',
      earned: false,
      category: 'consistency',
      earnedDate: null,
      rarity: 'epic'
    },
    {
      name: 'Community Helper',
      description: 'Help 10 community members',
      earned: false,
      category: 'social',
      earnedDate: null,
      rarity: 'rare'
    }
  ];

  // Mock data for analytics
  const weeklyProgress = [
    { day: 'Mon', financial: 20, security: 15, challenges: 2 },
    { day: 'Tue', financial: 35, security: 25, challenges: 3 },
    { day: 'Wed', financial: 45, security: 40, challenges: 2 },
    { day: 'Thu', financial: 60, security: 55, challenges: 4 },
    { day: 'Fri', financial: 75, security: 65, challenges: 3 },
    { day: 'Sat', financial: 85, security: 70, challenges: 5 },
    { day: 'Sun', financial: progress.financialLiteracyScore, security: progress.milSkillScore, challenges: 4 }
  ];

  const skillBreakdown = [
    { skill: 'Scam Detection', score: progress.milSkillScore, maxScore: 100, color: 'from-red-500 to-orange-500' },
    { skill: 'Investment Knowledge', score: Math.min(progress.financialLiteracyScore * 0.8, 100), maxScore: 100, color: 'from-blue-500 to-cyan-500' },
    { skill: 'Budgeting Skills', score: Math.min(progress.financialLiteracyScore * 1.2, 100), maxScore: 100, color: 'from-green-500 to-emerald-500' },
    { skill: 'Digital Literacy', score: Math.min(progress.milSkillScore * 0.9, 100), maxScore: 100, color: 'from-purple-500 to-pink-500' }
  ];

  const recentActivities = [
    { 
      type: 'challenge', 
      title: 'Completed Phishing Email Challenge', 
      time: '2 hours ago', 
      reward: '+50 coins',
      icon: Shield,
      color: 'text-red-400'
    },
    { 
      type: 'achievement', 
      title: 'Earned "Smart Saver" badge', 
      time: '1 day ago', 
      reward: '+100 coins',
      icon: Award,
      color: 'text-yellow-400'
    },
    { 
      type: 'game', 
      title: 'Explored Bank District', 
      time: '2 days ago', 
      reward: '+30 coins',
      icon: Gamepad2,
      color: 'text-blue-400'
    },
    { 
      type: 'community', 
      title: 'Shared scam report', 
      time: '3 days ago', 
      reward: '+25 coins',
      icon: Users,
      color: 'text-green-400'
    },
    { 
      type: 'lesson', 
      title: 'Completed Cash Flow Analysis', 
      time: '4 days ago', 
      reward: '+75 coins',
      icon: BookOpen,
      color: 'text-purple-400'
    },
    { 
      type: 'scam', 
      title: 'Avoided TikTok Investment Scam', 
      time: '5 days ago', 
      reward: '+150 coins',
      icon: Shield,
      color: 'text-red-400'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 text-gray-300';
      case 'uncommon': return 'border-green-400 text-green-300';
      case 'rare': return 'border-blue-400 text-blue-300';
      case 'epic': return 'border-purple-400 text-purple-300';
      case 'legendary': return 'border-yellow-400 text-yellow-300';
      default: return 'border-gray-400 text-gray-300';
    }
  };

  const updateRealTimeData = () => {
    setRealTimeData(prev => ({ ...prev, isUpdating: true }));
    
    // Simulate real-time data update
    setTimeout(() => {
      setRealTimeData({
        lastUpdated: new Date(),
        isUpdating: false
      });
    }, 1000);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Real-time Update Header */}
      <div className="flex items-center justify-between bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-white text-sm">
            Last updated: {realTimeData.lastUpdated.toLocaleTimeString()}
          </span>
        </div>
        <button
          onClick={updateRealTimeData}
          disabled={realTimeData.isUpdating}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`${realTimeData.isUpdating ? 'animate-spin' : ''}`} size={16} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="text-blue-400" size={24} />
            <span className="text-blue-300 text-2xl font-bold">{progress.financialLiteracyScore}</span>
          </div>
          <h3 className="text-white font-semibold">Financial Literacy</h3>
          <p className="text-blue-200 text-sm mb-3">Your knowledge score</p>
          <div className="w-full bg-blue-900/30 rounded-full h-2 mb-2">
            <div 
              className="bg-blue-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress.financialLiteracyScore, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-blue-300">
            <span>Beginner</span>
            <span>Expert</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30">
          <div className="flex items-center justify-between mb-4">
            <Shield className="text-red-400" size={24} />
            <span className="text-red-300 text-2xl font-bold">{progress.milSkillScore}</span>
          </div>
          <h3 className="text-white font-semibold">Security Skills</h3>
          <p className="text-red-200 text-sm mb-3">Scam detection ability</p>
          <div className="w-full bg-red-900/30 rounded-full h-2 mb-2">
            <div 
              className="bg-red-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress.milSkillScore, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-red-300">
            <span>Vulnerable</span>
            <span>Protected</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-xl p-6 border border-green-500/30">
          <div className="flex items-center justify-between mb-4">
            <Target className="text-green-400" size={24} />
            <span className="text-green-300 text-2xl font-bold">{progress.level}</span>
          </div>
          <h3 className="text-white font-semibold">Level Progress</h3>
          <p className="text-green-200 text-sm mb-3">Current level</p>
          <div className="w-full bg-green-900/30 rounded-full h-2 mb-2">
            <div 
              className="bg-green-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(progress.level / 10) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-green-300">
            <span>Level {progress.level}</span>
            <span>Level {progress.level + 1}</span>
          </div>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-xl flex items-center">
            <BarChart3 className="mr-2" size={24} />
            Weekly Progress (Real-time)
          </h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-blue-200">Financial</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-red-200">Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-green-200">Challenges</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-2 h-48">
          {weeklyProgress.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex-1 flex flex-col justify-end space-y-1 w-full">
                <div 
                  className="bg-blue-400 rounded-t"
                  style={{ height: `${(day.financial / 100) * 100}%`, minHeight: '4px' }}
                />
                <div 
                  className="bg-red-400 rounded-t"
                  style={{ height: `${(day.security / 100) * 100}%`, minHeight: '4px' }}
                />
                <div 
                  className="bg-green-400 rounded-t"
                  style={{ height: `${(day.challenges / 5) * 100}%`, minHeight: '4px' }}
                />
              </div>
              <span className="text-purple-300 text-xs mt-2">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-white font-semibold text-xl mb-4 flex items-center">
          <Activity className="mr-2" size={24} />
          Recent Activities (Live Feed)
        </h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
              <div className={`p-2 rounded-lg bg-white/10 ${activity.color}`}>
                <activity.icon size={20} />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium">{activity.title}</h3>
                <p className="text-purple-300 text-sm">{activity.time}</p>
              </div>
              <div className="text-yellow-400 font-semibold text-sm">
                {activity.reward}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="text-purple-300 hover:text-white text-sm transition-colors">
            View All Activities →
          </button>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Skill Breakdown */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-white font-semibold text-xl mb-6 flex items-center">
          <Brain className="mr-2" size={24} />
          Skill Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillBreakdown.map((skill, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-medium">{skill.skill}</h3>
                <span className="text-purple-300 text-sm">{skill.score}/100</span>
              </div>
              <div className="w-full bg-gray-700/30 rounded-full h-3">
                <div 
                  className={`bg-gradient-to-r ${skill.color} h-3 rounded-full transition-all duration-700`}
                  style={{ width: `${(skill.score / skill.maxScore) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-purple-400">
                <span>Needs Work</span>
                <span>Proficient</span>
                <span>Expert</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
          <div className="flex items-center justify-between mb-4">
            <Zap className="text-purple-400" size={24} />
            <span className="text-purple-300 text-2xl font-bold">87%</span>
          </div>
          <h3 className="text-white font-semibold">Challenge Success Rate</h3>
          <p className="text-purple-200 text-sm">Last 30 days</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-xl p-6 border border-yellow-500/30">
          <div className="flex items-center justify-between mb-4">
            <Clock className="text-yellow-400" size={24} />
            <span className="text-yellow-300 text-2xl font-bold">5</span>
          </div>
          <h3 className="text-white font-semibold">Day Streak</h3>
          <p className="text-yellow-200 text-sm">Current streak</p>
        </div>

        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-lg rounded-xl p-6 border border-cyan-500/30">
          <div className="flex items-center justify-between mb-4">
            <Eye className="text-cyan-400" size={24} />
            <span className="text-cyan-300 text-2xl font-bold">23</span>
          </div>
          <h3 className="text-white font-semibold">Scams Detected</h3>
          <p className="text-cyan-200 text-sm">Total identified</p>
        </div>
      </div>

      {/* Learning Path Progress */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-white font-semibold text-xl mb-6 flex items-center">
          <BookOpen className="mr-2" size={24} />
          Learning Path Progress
        </h2>
        <div className="space-y-4">
          {[
            { topic: 'Basic Banking', progress: 100, total: 100, status: 'completed' },
            { topic: 'Investment Fundamentals', progress: 75, total: 100, status: 'in-progress' },
            { topic: 'Scam Recognition', progress: 60, total: 100, status: 'in-progress' },
            { topic: 'Digital Security', progress: 30, total: 100, status: 'in-progress' },
            { topic: 'Advanced Investing', progress: 0, total: 100, status: 'locked' }
          ].map((path, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
              <div className={`p-2 rounded-lg ${
                path.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                path.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {path.status === 'completed' ? <CheckCircle size={20} /> :
                 path.status === 'in-progress' ? <Clock size={20} /> :
                 <AlertTriangle size={20} />}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium">{path.topic}</h3>
                <div className="flex items-center space-x-3 mt-2">
                  <div className="flex-1 bg-gray-700/30 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        path.status === 'completed' ? 'bg-green-400' :
                        path.status === 'in-progress' ? 'bg-blue-400' :
                        'bg-gray-400'
                      }`}
                      style={{ width: `${(path.progress / path.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-purple-300 text-sm">{path.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      {/* Achievement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-xl p-6 border border-yellow-500/30 text-center">
          <Trophy className="mx-auto mb-2 text-yellow-400" size={32} />
          <div className="text-2xl font-bold text-white">{achievements.filter(a => a.earned).length}</div>
          <div className="text-yellow-200 text-sm">Earned</div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30 text-center">
          <Star className="mx-auto mb-2 text-purple-400" size={32} />
          <div className="text-2xl font-bold text-white">{achievements.filter(a => a.rarity === 'rare' && a.earned).length}</div>
          <div className="text-purple-200 text-sm">Rare Badges</div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-xl p-6 border border-blue-500/30 text-center">
          <Target className="mx-auto mb-2 text-blue-400" size={32} />
          <div className="text-2xl font-bold text-white">{Math.round((achievements.filter(a => a.earned).length / achievements.length) * 100)}%</div>
          <div className="text-blue-200 text-sm">Completion</div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-xl p-6 border border-green-500/30 text-center">
          <Coins className="mx-auto mb-2 text-green-400" size={32} />
          <div className="text-2xl font-bold text-white">{progress.coins}</div>
          <div className="text-green-200 text-sm">Total Coins</div>
        </div>
      </div>

      {/* Achievement Grid */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-white font-semibold text-xl mb-6">All Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                achievement.earned 
                  ? `bg-gradient-to-r from-yellow-500/10 to-orange-500/10 ${getRarityColor(achievement.rarity)} shadow-lg` 
                  : 'bg-gray-500/10 border-gray-500/30 text-gray-400'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    achievement.earned ? 'bg-yellow-500/20' : 'bg-gray-500/20'
                  }`}>
                    <Trophy className={achievement.earned ? 'text-yellow-400' : 'text-gray-400'} size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{achievement.name}</h3>
                    <p className="text-sm opacity-80">{achievement.description}</p>
                  </div>
                </div>
                {achievement.earned && (
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                      {achievement.rarity.toUpperCase()}
                    </div>
                    {achievement.earnedDate && (
                      <div className="text-xs text-purple-300 mt-1">
                        {achievement.earnedDate}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  achievement.category === 'milestone' ? 'bg-blue-500/30 text-blue-200' :
                  achievement.category === 'security' ? 'bg-red-500/30 text-red-200' :
                  achievement.category === 'finance' ? 'bg-green-500/30 text-green-200' :
                  achievement.category === 'progression' ? 'bg-purple-500/30 text-purple-200' :
                  achievement.category === 'consistency' ? 'bg-orange-500/30 text-orange-200' :
                  'bg-cyan-500/30 text-cyan-200'
                }`}>
                  {achievement.category.toUpperCase()}
                </span>
                
                {achievement.earned && (
                  <CheckCircle className="text-green-400" size={20} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {profile?.name.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">Welcome back, {profile?.name || 'Player'}!</h1>
              <p className="text-purple-200 text-sm">Level {progress.level} Financial Explorer</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-2 rounded-full">
              <Coins className="text-yellow-400" size={20} />
              <span className="text-white font-semibold">{progress.coins}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation Menu */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <h2 className="text-white font-semibold mb-4">Navigation</h2>
              <div className="space-y-2">
                {menuItems.map(item => (
                  <button
                    key={item.label}
                    onClick={() => onNavigate(item.screen)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      item.active 
                        ? 'bg-purple-600 text-white' 
                        : 'text-purple-200 hover:bg-white/10'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <h2 className="text-white font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button 
                  onClick={() => onNavigate('game')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors text-sm"
                >
                  <Gamepad2 className="mx-auto mb-1" size={20} />
                  <div className="font-semibold">Enter Game</div>
                </button>
                
                <button 
                  onClick={() => onNavigate('challenge')}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white p-3 rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors text-sm"
                >
                  <Calendar className="mx-auto mb-1" size={20} />
                  <div className="font-semibold">Daily Challenge</div>
                </button>
                
                <button 
                  onClick={() => onNavigate('community')}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-colors text-sm"
                >
                  <Users className="mx-auto mb-1" size={20} />
                  <div className="font-semibold">Community</div>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tab Navigation */}
            <div className="flex space-x-4">
              {[
                { id: 'overview', label: 'Overview', icon: Home },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                { id: 'achievements', label: 'Achievements', icon: Trophy }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 text-purple-200 hover:bg-white/20'
                  }`}
                >
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'achievements' && renderAchievements()}

            {/* Financial Goal Progress */}
            {profile?.goals && (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h2 className="text-white font-semibold text-xl mb-4 flex items-center">
                  <Target className="mr-2" size={24} />
                  Your Financial Goal
                </h2>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-purple-200 italic mb-4">"{profile.goals}"</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-sm text-purple-300 mb-2">
                        <span>Progress</span>
                        <span>{Math.min(progress.coins, 1000)} / 1000 coins</span>
                      </div>
                      <div className="w-full bg-purple-900/30 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((progress.coins / 1000) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{Math.round((progress.coins / 1000) * 100)}%</div>
                      <div className="text-purple-300 text-sm">Complete</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
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
  Star
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface DashboardProps {
  onNavigate: (screen: 'dashboard' | 'game' | 'challenge' | 'community') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { profile, progress } = useUser();

  const menuItems = [
    { icon: Home, label: 'Dashboard', screen: 'dashboard' as const, active: true },
    { icon: Gamepad2, label: 'Game World', screen: 'game' as const },
    { icon: Calendar, label: 'Daily Challenges', screen: 'challenge' as const },
    { icon: Users, label: 'Community', screen: 'community' as const },
  ];

  const achievements = [
    { name: 'First Steps', description: 'Complete onboarding', earned: true },
    { name: 'Scam Fighter', description: 'Identify 5 scams correctly', earned: progress.milSkillScore > 50 },
    { name: 'Smart Saver', description: 'Complete savings challenge', earned: progress.financialLiteracyScore > 30 },
    { name: 'City Builder', description: 'Unlock 3 buildings', earned: progress.cityBuildings.length >= 3 },
  ];

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
          <div className="lg:col-span-1">
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
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="text-blue-400" size={24} />
                  <span className="text-blue-300 text-2xl font-bold">{progress.financialLiteracyScore}</span>
                </div>
                <h3 className="text-white font-semibold">Financial Literacy</h3>
                <p className="text-blue-200 text-sm">Your knowledge score</p>
                <div className="mt-3 w-full bg-blue-900/30 rounded-full h-2">
                  <div 
                    className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progress.financialLiteracyScore, 100)}%` }}
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30">
                <div className="flex items-center justify-between mb-4">
                  <Shield className="text-red-400" size={24} />
                  <span className="text-red-300 text-2xl font-bold">{progress.milSkillScore}</span>
                </div>
                <h3 className="text-white font-semibold">MIL Skills</h3>
                <p className="text-red-200 text-sm">Media literacy defense</p>
                <div className="mt-3 w-full bg-red-900/30 rounded-full h-2">
                  <div 
                    className="bg-red-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progress.milSkillScore, 100)}%` }}
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-xl p-6 border border-green-500/30">
                <div className="flex items-center justify-between mb-4">
                  <Target className="text-green-400" size={24} />
                  <span className="text-green-300 text-2xl font-bold">{progress.level}</span>
                </div>
                <h3 className="text-white font-semibold">Level Progress</h3>
                <p className="text-green-200 text-sm">Your current level</p>
                <div className="mt-3 w-full bg-green-900/30 rounded-full h-2">
                  <div 
                    className="bg-green-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(progress.level / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-white font-semibold text-xl mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => onNavigate('game')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
                >
                  <Gamepad2 className="mx-auto mb-2" size={32} />
                  <div className="font-semibold">Enter Game World</div>
                  <div className="text-sm opacity-90">Explore financial districts</div>
                </button>
                
                <button 
                  onClick={() => onNavigate('challenge')}
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors"
                >
                  <Calendar className="mx-auto mb-2" size={32} />
                  <div className="font-semibold">Daily Challenge</div>
                  <div className="text-sm opacity-90">Test your skills today</div>
                </button>
                
                <button 
                  onClick={() => onNavigate('community')}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-colors"
                >
                  <Users className="mx-auto mb-2" size={32} />
                  <div className="font-semibold">Join Community</div>
                  <div className="text-sm opacity-90">Share and learn together</div>
                </button>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-white font-semibold text-xl mb-4 flex items-center">
                <Trophy className="mr-2 text-yellow-400" size={24} />
                Achievements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      achievement.earned 
                        ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-100' 
                        : 'bg-gray-500/20 border-gray-500/30 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{achievement.name}</h3>
                      {achievement.earned && <Star className="text-yellow-400" size={20} />}
                    </div>
                    <p className="text-sm opacity-80">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Goal Progress */}
            {profile?.goals && (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h2 className="text-white font-semibold text-xl mb-4">Your Financial Goal</h2>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-purple-200 italic">"{profile.goals}"</p>
                  <div className="mt-4">
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
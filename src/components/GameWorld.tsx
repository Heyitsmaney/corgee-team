import React, { useState } from 'react';
import { ArrowLeft, Building, Shield, ShoppingCart, Coins, Star, AlertTriangle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface GameWorldProps {
  onNavigate: (screen: 'dashboard' | 'game' | 'challenge' | 'community') => void;
}

export const GameWorld: React.FC<GameWorldProps> = ({ onNavigate }) => {
  const { progress, addCoins, updateProgress, addBadge } = useUser();
  const [currentDistrict, setCurrentDistrict] = useState<'overview' | 'bank' | 'scam' | 'market'>('overview');
  const [gameState, setGameState] = useState({
    bankAccount: 100,
    savingsGoal: 500,
    currentChallenge: null as any,
    completedActivities: [] as string[]
  });

  const districts = [
    {
      id: 'bank',
      name: 'Bank District',
      description: 'Learn about savings, investments, and banking',
      icon: Building,
      color: 'from-blue-500 to-cyan-500',
      activities: ['savings-game', 'investment-quiz', 'bank-tour']
    },
    {
      id: 'scam',
      name: 'Scam Alley',
      description: 'Practice identifying and avoiding scams',
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      activities: ['phishing-test', 'scam-detective', 'security-training']
    },
    {
      id: 'market',
      name: 'Market Street',
      description: 'Master budgeting and smart spending',
      icon: ShoppingCart,
      color: 'from-green-500 to-emerald-500',
      activities: ['budget-challenge', 'price-comparison', 'needs-vs-wants']
    }
  ];

  const handleDistrictEnter = (districtId: string) => {
    setCurrentDistrict(districtId as any);
  };

  const handleActivityComplete = (activity: string, reward: number) => {
    addCoins(reward);
    updateProgress({ 
      financialLiteracyScore: progress.financialLiteracyScore + 10,
      milSkillScore: progress.milSkillScore + 5
    });
    setGameState(prev => ({
      ...prev,
      completedActivities: [...prev.completedActivities, activity]
    }));

    // Award badges based on activities
    if (activity.includes('scam') && !progress.badges.includes('Scam Fighter')) {
      addBadge('Scam Fighter');
    }
    if (activity.includes('savings') && !progress.badges.includes('Smart Saver')) {
      addBadge('Smart Saver');
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Welcome to FinVerse</h1>
        <p className="text-purple-200 text-lg">Choose a district to begin your financial adventure!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {districts.map(district => (
          <div key={district.id} className="group cursor-pointer" onClick={() => handleDistrictEnter(district.id)}>
            <div className={`bg-gradient-to-br ${district.color}/20 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 group-hover:scale-105`}>
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${district.color} flex items-center justify-center`}>
                  <district.icon size={32} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">{district.name}</h3>
                <p className="text-purple-200 text-sm mb-4">{district.description}</p>
                
                <div className="space-y-2">
                  <div className="text-xs text-purple-300">
                    {district.activities.length} Activities Available
                  </div>
                  <div className="flex justify-center space-x-2">
                    {district.activities.map((_, index) => (
                      <div 
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          gameState.completedActivities.includes(district.activities[index])
                            ? 'bg-green-400' 
                            : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* City Progress */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-white font-semibold text-xl mb-4 flex items-center">
          <Building className="mr-2" size={24} />
          Your Financial City
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {progress.cityBuildings.map((building, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                <Building size={24} className="text-white" />
              </div>
              <p className="text-purple-200 text-sm capitalize">{building}</p>
            </div>
          ))}
          
          {/* Locked buildings */}
          {[...Array(Math.max(0, 6 - progress.cityBuildings.length))].map((_, index) => (
            <div key={`locked-${index}`} className="text-center opacity-50">
              <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-gray-600/50 flex items-center justify-center">
                <Building size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-400 text-sm">Locked</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBankDistrict = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentDistrict('overview')}
          className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to City</span>
        </button>
        <div className="flex items-center space-x-2 bg-blue-500/20 px-4 py-2 rounded-full">
          <Coins className="text-blue-400" size={20} />
          <span className="text-white font-semibold">{progress.coins}</span>
        </div>
      </div>

      <div className="text-center mb-8">
        <Building className="mx-auto mb-4 text-blue-400" size={64} />
        <h1 className="text-3xl font-bold text-white mb-2">Bank District</h1>
        <p className="text-blue-200">Master the fundamentals of banking and savings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Savings Challenge */}
        <div className="bg-blue-500/20 backdrop-blur-lg rounded-xl p-6 border border-blue-500/30">
          <h3 className="text-white font-bold text-lg mb-3">Savings Challenge</h3>
          <p className="text-blue-200 text-sm mb-4">Choose the best savings account option</p>
          
          <div className="space-y-3">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-white font-medium">Regular Savings: 1% APY</div>
              <div className="text-blue-300 text-sm">Low risk, instant access</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-white font-medium">CD 6-month: 3% APY</div>
              <div className="text-blue-300 text-sm">Medium risk, locked for 6 months</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-white font-medium">High-Yield: 4.5% APY</div>
              <div className="text-blue-300 text-sm">Higher risk, minimum balance required</div>
            </div>
          </div>

          <button 
            onClick={() => handleActivityComplete('savings-game', 50)}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors"
          >
            Complete Challenge (+50 coins)
          </button>
        </div>

        {/* Investment Basics */}
        <div className="bg-green-500/20 backdrop-blur-lg rounded-xl p-6 border border-green-500/30">
          <h3 className="text-white font-bold text-lg mb-3">Investment Quiz</h3>
          <p className="text-green-200 text-sm mb-4">Test your knowledge of basic investing</p>
          
          <div className="space-y-3">
            <div className="text-white text-sm">
              <strong>Question:</strong> Which investment typically offers the highest long-term returns?
            </div>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 bg-white/10 rounded hover:bg-white/20 text-green-200 text-sm">
                A) Savings Account
              </button>
              <button 
                onClick={() => handleActivityComplete('investment-quiz', 75)}
                className="w-full text-left px-3 py-2 bg-white/10 rounded hover:bg-white/20 text-green-200 text-sm"
              >
                B) Stock Market (Correct!)
              </button>
              <button className="w-full text-left px-3 py-2 bg-white/10 rounded hover:bg-white/20 text-green-200 text-sm">
                C) Cash Under Mattress
              </button>
            </div>
          </div>
        </div>

        {/* Bank Tour */}
        <div className="bg-purple-500/20 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
          <h3 className="text-white font-bold text-lg mb-3">Virtual Bank Tour</h3>
          <p className="text-purple-200 text-sm mb-4">Explore different banking services</p>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-purple-200">
              <Star size={16} />
              <span className="text-sm">Checking Accounts</span>
            </div>
            <div className="flex items-center space-x-3 text-purple-200">
              <Star size={16} />
              <span className="text-sm">Loans & Credit</span>
            </div>
            <div className="flex items-center space-x-3 text-purple-200">
              <Star size={16} />
              <span className="text-sm">Online Banking Security</span>
            </div>
          </div>

          <button 
            onClick={() => handleActivityComplete('bank-tour', 30)}
            className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-colors"
          >
            Take Tour (+30 coins)
          </button>
        </div>
      </div>
    </div>
  );

  const renderScamAlley = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentDistrict('overview')}
          className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to City</span>
        </button>
      </div>

      <div className="text-center mb-8">
        <AlertTriangle className="mx-auto mb-4 text-red-400" size={64} />
        <h1 className="text-3xl font-bold text-white mb-2">Scam Alley</h1>
        <p className="text-red-200">Learn to identify and avoid financial scams</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phishing Email Test */}
        <div className="bg-red-500/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30">
          <h3 className="text-white font-bold text-lg mb-3">Phishing Email Challenge</h3>
          <div className="bg-white/10 rounded-lg p-4 mb-4">
            <div className="text-xs text-gray-400 mb-2">From: security@bank-urgent.com</div>
            <div className="text-sm text-white">
              <strong>Subject: URGENT: Account Suspended</strong><br/>
              Your account has been suspended due to suspicious activity. 
              Click here immediately to verify: bit.ly/verify-now
            </div>
          </div>
          
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 bg-white/10 rounded hover:bg-white/20 text-red-200 text-sm">
              Click the link to verify
            </button>
            <button 
              onClick={() => handleActivityComplete('phishing-test', 100)}
              className="w-full text-left px-3 py-2 bg-white/10 rounded hover:bg-white/20 text-red-200 text-sm"
            >
              Report as phishing (Correct!)
            </button>
          </div>
        </div>

        {/* Investment Scam Detector */}
        <div className="bg-orange-500/20 backdrop-blur-lg rounded-xl p-6 border border-orange-500/30">
          <h3 className="text-white font-bold text-lg mb-3">Investment Scam Detector</h3>
          <div className="bg-white/10 rounded-lg p-4 mb-4">
            <div className="text-sm text-white">
              <strong>"GUARANTEED 50% RETURNS IN 30 DAYS!"</strong><br/>
              <span className="text-orange-200">
                Join our exclusive crypto investment group. 
                Limited time offer! Send $500 now to secure your spot.
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 bg-white/10 rounded hover:bg-white/20 text-orange-200 text-sm">
              Invest $500 immediately
            </button>
            <button 
              onClick={() => handleActivityComplete('scam-detective', 80)}
              className="w-full text-left px-3 py-2 bg-white/10 rounded hover:bg-white/20 text-orange-200 text-sm"
            >
              Red flag: Too good to be true (Correct!)
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMarketStreet = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentDistrict('overview')}
          className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to City</span>
        </button>
      </div>

      <div className="text-center mb-8">
        <ShoppingCart className="mx-auto mb-4 text-green-400" size={64} />
        <h1 className="text-3xl font-bold text-white mb-2">Market Street</h1>
        <p className="text-green-200">Master budgeting and smart spending habits</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Budget Challenge */}
        <div className="bg-green-500/20 backdrop-blur-lg rounded-xl p-6 border border-green-500/30">
          <h3 className="text-white font-bold text-lg mb-3">Monthly Budget Challenge</h3>
          <div className="mb-4">
            <div className="text-white mb-2">Monthly Income: $3,000</div>
            <div className="text-green-200 text-sm mb-3">Allocate your budget wisely:</div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-green-200">Fixed Expenses</span>
                <span className="text-white">$2,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-200">Remaining</span>
                <span className="text-white">$1,000</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => handleActivityComplete('budget-challenge', 60)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors"
          >
            Plan Your Budget (+60 coins)
          </button>
        </div>

        {/* Needs vs Wants */}
        <div className="bg-blue-500/20 backdrop-blur-lg rounded-xl p-6 border border-blue-500/30">
          <h3 className="text-white font-bold text-lg mb-3">Needs vs Wants</h3>
          <p className="text-blue-200 text-sm mb-4">Categorize these items correctly:</p>
          
          <div className="space-y-3">
            {[
              { item: 'Rent payment', category: 'need' },
              { item: 'Designer sneakers', category: 'want' },
              { item: 'Groceries', category: 'need' },
              { item: 'Movie subscription', category: 'want' }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                <span className="text-white text-sm">{item.item}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.category === 'need' 
                    ? 'bg-red-500/30 text-red-200' 
                    : 'bg-blue-500/30 text-blue-200'
                }`}>
                  {item.category.toUpperCase()}
                </span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => handleActivityComplete('needs-vs-wants', 40)}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors"
          >
            Complete Exercise (+40 coins)
          </button>
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentDistrict) {
      case 'bank':
        return renderBankDistrict();
      case 'scam':
        return renderScamAlley();
      case 'market':
        return renderMarketStreet();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-2 rounded-full">
              <Coins className="text-yellow-400" size={20} />
              <span className="text-white font-semibold">{progress.coins}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        {renderCurrentView()}
      </div>
    </div>
  );
};
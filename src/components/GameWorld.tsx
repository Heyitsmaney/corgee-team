import React, { useState, useEffect } from 'react';
import { ArrowLeft, Building, Shield, ShoppingCart, Coins, Star, AlertTriangle, TrendingUp, DollarSign, CreditCard, Smartphone, Zap, Coffee, Car, Home, Gamepad2, Brain, CheckCircle, XCircle, Timer, Target } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface GameWorldProps {
  onNavigate: (screen: 'dashboard' | 'game' | 'challenge' | 'community') => void;
}

interface BankAccount {
  balance: number;
  savingsAccounts: {
    id: string;
    name: string;
    balance: number;
    interestRate: number;
    term: number;
    risk: 'low' | 'medium' | 'high';
  }[];
}

interface Investment {
  id: string;
  name: string;
  type: 'stock' | 'crypto' | 'etf';
  price: number;
  change: number;
  owned: number;
  risk: 'low' | 'medium' | 'high';
}

interface SpendingItem {
  id: string;
  name: string;
  category: 'food' | 'transport' | 'utilities' | 'entertainment' | 'shopping';
  price: number;
  necessity: 'need' | 'want';
  icon: any;
}

export const GameWorld: React.FC<GameWorldProps> = ({ onNavigate }) => {
  const { progress, addCoins, updateProgress, addBadge } = useUser();
  const [currentDistrict, setCurrentDistrict] = useState<'overview' | 'bank' | 'scam' | 'market' | 'investment'>('overview');
  const [bankAccount, setBankAccount] = useState<BankAccount>({
    balance: 1000,
    savingsAccounts: []
  });
  const [monthlyBudget, setMonthlyBudget] = useState({
    income: 3000,
    spent: 0,
    budget: {
      food: 600,
      transport: 300,
      utilities: 400,
      entertainment: 200,
      shopping: 300
    }
  });
  const [investments, setInvestments] = useState<Investment[]>([
    { id: '1', name: 'VN-Index ETF', type: 'etf', price: 25.50, change: 2.3, owned: 0, risk: 'low' },
    { id: '2', name: 'VCB Stock', type: 'stock', price: 85.20, change: -1.2, owned: 0, risk: 'medium' },
    { id: '3', name: 'Bitcoin', type: 'crypto', price: 45000, change: 5.8, owned: 0, risk: 'high' },
    { id: '4', name: 'Tech ETF', type: 'etf', price: 120.30, change: 3.1, owned: 0, risk: 'medium' }
  ]);
  const [currentScam, setCurrentScam] = useState<any>(null);
  const [aiMentorMessage, setAiMentorMessage] = useState<string>('');

  const districts = [
    {
      id: 'bank',
      name: 'Bank District',
      description: 'Manage savings, open accounts, and learn banking',
      icon: Building,
      color: 'from-blue-500 to-cyan-500',
      activities: ['open-account', 'savings-game', 'loan-simulator']
    },
    {
      id: 'investment',
      name: 'Investment Park',
      description: 'Trade stocks, crypto, and build your portfolio',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      activities: ['stock-trading', 'portfolio-analysis', 'risk-assessment']
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
      color: 'from-purple-500 to-indigo-500',
      activities: ['budget-challenge', 'spending-simulator', 'needs-vs-wants']
    }
  ];

  const spendingItems: SpendingItem[] = [
    { id: '1', name: 'Groceries', category: 'food', price: 150, necessity: 'need', icon: Coffee },
    { id: '2', name: 'Food Delivery', category: 'food', price: 80, necessity: 'want', icon: Coffee },
    { id: '3', name: 'Grab/Taxi', category: 'transport', price: 45, necessity: 'need', icon: Car },
    { id: '4', name: 'Electricity Bill', category: 'utilities', price: 120, necessity: 'need', icon: Zap },
    { id: '5', name: 'Netflix', category: 'entertainment', price: 30, necessity: 'want', icon: Gamepad2 },
    { id: '6', name: 'New Clothes', category: 'shopping', price: 200, necessity: 'want', icon: ShoppingCart },
    { id: '7', name: 'Phone Bill', category: 'utilities', price: 50, necessity: 'need', icon: Smartphone },
    { id: '8', name: 'Cinema Tickets', category: 'entertainment', price: 25, necessity: 'want', icon: Gamepad2 }
  ];

  const scamScenarios = [
    {
      id: '1',
      type: 'sms',
      title: 'Suspicious Banking SMS',
      content: 'URGENT: Your VCB account has been locked due to suspicious activity. Click here to verify immediately: bit.ly/vcb-verify-2024',
      sender: '+84 901 234 567',
      isScam: true,
      redFlags: ['Shortened URL', 'Urgent language', 'Unknown sender', 'Asks for verification'],
      correctAction: 'Contact bank directly using official number',
      reward: 100
    },
    {
      id: '2',
      type: 'email',
      title: 'Investment Opportunity',
      content: 'GUARANTEED 50% RETURNS IN 30 DAYS! Join our exclusive crypto investment group. Limited spots available. Send 1,000,000 VND now to secure your position!',
      sender: 'crypto.invest.vn@gmail.com',
      isScam: true,
      redFlags: ['Guaranteed returns', 'Pressure tactics', 'Upfront payment', 'Too good to be true'],
      correctAction: 'Research thoroughly and avoid guaranteed return promises',
      reward: 150
    },
    {
      id: '3',
      type: 'call',
      title: 'Tech Support Scam',
      content: 'Hello, this is Microsoft support. We detected viruses on your computer. Please download TeamViewer so we can fix it remotely.',
      sender: 'Microsoft Support',
      isScam: true,
      redFlags: ['Unsolicited call', 'Remote access request', 'Fake company name', 'Urgency'],
      correctAction: 'Hang up and contact official support if needed',
      reward: 80
    }
  ];

  useEffect(() => {
    // Generate random scam scenario
    if (currentDistrict === 'scam' && !currentScam) {
      const randomScam = scamScenarios[Math.floor(Math.random() * scamScenarios.length)];
      setCurrentScam(randomScam);
    }
  }, [currentDistrict, currentScam]);

  const showAiMentorFeedback = (message: string) => {
    setAiMentorMessage(message);
    setTimeout(() => setAiMentorMessage(''), 5000);
  };

  const handleDistrictEnter = (districtId: string) => {
    setCurrentDistrict(districtId as any);
  };

  const handleSavingsAccount = (accountType: string) => {
    const accounts = {
      'basic': { name: 'Basic Savings', interestRate: 1.5, term: 0, risk: 'low' as const, minDeposit: 100 },
      'term-6m': { name: '6-Month Term Deposit', interestRate: 4.2, term: 6, risk: 'low' as const, minDeposit: 500 },
      'high-yield': { name: 'High-Yield Savings', interestRate: 6.8, term: 12, risk: 'medium' as const, minDeposit: 1000 }
    };

    const account = accounts[accountType as keyof typeof accounts];
    if (bankAccount.balance >= account.minDeposit) {
      const newAccount = {
        id: Date.now().toString(),
        ...account,
        balance: account.minDeposit
      };
      
      setBankAccount(prev => ({
        balance: prev.balance - account.minDeposit,
        savingsAccounts: [...prev.savingsAccounts, newAccount]
      }));
      
      addCoins(50);
      showAiMentorFeedback(`Great choice! You opened a ${account.name} account. Higher interest rates mean more money over time, but consider the lock-in period.`);
    }
  };

  const handleInvestment = (investmentId: string, action: 'buy' | 'sell', amount: number) => {
    const investment = investments.find(inv => inv.id === investmentId);
    if (!investment) return;

    if (action === 'buy' && bankAccount.balance >= investment.price * amount) {
      setBankAccount(prev => ({ ...prev, balance: prev.balance - (investment.price * amount) }));
      setInvestments(prev => prev.map(inv => 
        inv.id === investmentId ? { ...inv, owned: inv.owned + amount } : inv
      ));
      addCoins(25);
      showAiMentorFeedback(`You bought ${amount} shares of ${investment.name}. Remember: diversification is key to managing risk!`);
    }
  };

  const handleSpending = (itemId: string) => {
    const item = spendingItems.find(i => i.id === itemId);
    if (!item || bankAccount.balance < item.price) return;

    setBankAccount(prev => ({ ...prev, balance: prev.balance - item.price }));
    setMonthlyBudget(prev => ({ ...prev, spent: prev.spent + item.price }));

    if (item.necessity === 'need') {
      addCoins(10);
      showAiMentorFeedback(`Good choice! ${item.name} is a necessity. You're managing your budget well.`);
    } else {
      if (monthlyBudget.spent + item.price > monthlyBudget.income * 0.8) {
        showAiMentorFeedback(`Warning! You're spending too much on wants. Consider if ${item.name} is really necessary this month.`);
      } else {
        addCoins(5);
        showAiMentorFeedback(`${item.name} is a want, not a need. It's okay to treat yourself sometimes, but watch your budget!`);
      }
    }
  };

  const handleScamResponse = (action: 'click' | 'ignore' | 'report') => {
    if (!currentScam) return;

    if (action === 'click' && currentScam.isScam) {
      // Wrong choice - clicked on scam
      addCoins(-50);
      updateProgress({ milSkillScore: Math.max(0, progress.milSkillScore - 10) });
      showAiMentorFeedback(`❌ You fell for the scam! You lost 50 coins. Red flags: ${currentScam.redFlags.join(', ')}. Always ${currentScam.correctAction}.`);
    } else if ((action === 'ignore' || action === 'report') && currentScam.isScam) {
      // Correct choice - avoided scam
      addCoins(currentScam.reward);
      updateProgress({ milSkillScore: progress.milSkillScore + 15 });
      showAiMentorFeedback(`✅ Great job! You avoided the scam and earned ${currentScam.reward} coins. You correctly identified: ${currentScam.redFlags.join(', ')}.`);
      
      if (progress.milSkillScore + 15 >= 50 && !progress.badges.includes('Scam Fighter')) {
        addBadge('Scam Fighter');
      }
    }

    // Generate new scam
    setTimeout(() => {
      const newScam = scamScenarios[Math.floor(Math.random() * scamScenarios.length)];
      setCurrentScam(newScam);
    }, 3000);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Welcome to FinVerse</h1>
        <p className="text-purple-200 text-lg">Your comprehensive financial simulation world!</p>
      </div>

      {/* AI Mentor Message */}
      {aiMentorMessage && (
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-lg rounded-xl p-4 border border-cyan-500/30 mb-6">
          <div className="flex items-center space-x-3">
            <Brain className="text-cyan-400" size={24} />
            <div>
              <h3 className="text-cyan-200 font-semibold">AI Mentor</h3>
              <p className="text-white">{aiMentorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Account Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-xl p-6 border border-green-500/30">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="text-green-400" size={24} />
            <span className="text-2xl font-bold text-white">{bankAccount.balance.toLocaleString()}</span>
          </div>
          <h3 className="text-white font-semibold">Account Balance</h3>
          <p className="text-green-200 text-sm">Available funds</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <Building className="text-blue-400" size={24} />
            <span className="text-2xl font-bold text-white">{bankAccount.savingsAccounts.length}</span>
          </div>
          <h3 className="text-white font-semibold">Savings Accounts</h3>
          <p className="text-blue-200 text-sm">Active accounts</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-purple-400" size={24} />
            <span className="text-2xl font-bold text-white">{investments.reduce((sum, inv) => sum + inv.owned, 0)}</span>
          </div>
          <h3 className="text-white font-semibold">Investments</h3>
          <p className="text-purple-200 text-sm">Total holdings</p>
        </div>
      </div>

      {/* Districts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        className="w-2 h-2 rounded-full bg-white/30"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Budget Overview */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-white font-semibold text-xl mb-4 flex items-center">
          <Target className="mr-2" size={24} />
          Monthly Budget Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between text-sm text-purple-300 mb-2">
              <span>Spent this month</span>
              <span>{monthlyBudget.spent.toLocaleString()} / {monthlyBudget.income.toLocaleString()}</span>
            </div>
            <div className="w-full bg-purple-900/30 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((monthlyBudget.spent / monthlyBudget.income) * 100, 100)}%` }}
              />
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{Math.round((monthlyBudget.spent / monthlyBudget.income) * 100)}%</div>
            <div className="text-purple-300 text-sm">Budget Used</div>
          </div>
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
          <span className="text-white font-semibold">{bankAccount.balance.toLocaleString()}</span>
        </div>
      </div>

      <div className="text-center mb-8">
        <Building className="mx-auto mb-4 text-blue-400" size={64} />
        <h1 className="text-3xl font-bold text-white mb-2">Bank District</h1>
        <p className="text-blue-200">Master banking, savings, and financial planning</p>
      </div>

      {/* Savings Account Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-500/20 backdrop-blur-lg rounded-xl p-6 border border-blue-500/30">
          <h3 className="text-white font-bold text-lg mb-3">Basic Savings</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-blue-200">Interest Rate</span>
              <span className="text-white">1.5% APY</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-200">Min Deposit</span>
              <span className="text-white">100 coins</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-200">Risk Level</span>
              <span className="text-green-400">Low</span>
            </div>
          </div>
          <button 
            onClick={() => handleSavingsAccount('basic')}
            disabled={bankAccount.balance < 100}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Open Account
          </button>
        </div>

        <div className="bg-yellow-500/20 backdrop-blur-lg rounded-xl p-6 border border-yellow-500/30">
          <h3 className="text-white font-bold text-lg mb-3">6-Month Term</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-yellow-200">Interest Rate</span>
              <span className="text-white">4.2% APY</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-yellow-200">Min Deposit</span>
              <span className="text-white">500 coins</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-yellow-200">Risk Level</span>
              <span className="text-green-400">Low</span>
            </div>
          </div>
          <button 
            onClick={() => handleSavingsAccount('term-6m')}
            disabled={bankAccount.balance < 500}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Open Account
          </button>
        </div>

        <div className="bg-green-500/20 backdrop-blur-lg rounded-xl p-6 border border-green-500/30">
          <h3 className="text-white font-bold text-lg mb-3">High-Yield Savings</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-green-200">Interest Rate</span>
              <span className="text-white">6.8% APY</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-200">Min Deposit</span>
              <span className="text-white">1000 coins</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-200">Risk Level</span>
              <span className="text-yellow-400">Medium</span>
            </div>
          </div>
          <button 
            onClick={() => handleSavingsAccount('high-yield')}
            disabled={bankAccount.balance < 1000}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Open Account
          </button>
        </div>
      </div>

      {/* Current Savings Accounts */}
      {bankAccount.savingsAccounts.length > 0 && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-white font-semibold text-xl mb-4">Your Savings Accounts</h2>
          <div className="space-y-4">
            {bankAccount.savingsAccounts.map(account => (
              <div key={account.id} className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-medium">{account.name}</h3>
                    <p className="text-purple-300 text-sm">{account.interestRate}% APY</p>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{account.balance.toLocaleString()} coins</div>
                    <div className="text-green-400 text-sm">+{(account.balance * account.interestRate / 100 / 12).toFixed(0)} monthly</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderInvestmentPark = () => (
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
        <TrendingUp className="mx-auto mb-4 text-green-400" size={64} />
        <h1 className="text-3xl font-bold text-white mb-2">Investment Park</h1>
        <p className="text-green-200">Build your investment portfolio and learn about markets</p>
      </div>

      {/* Investment Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {investments.map(investment => (
          <div key={investment.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-white font-bold text-lg">{investment.name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  investment.type === 'stock' ? 'bg-blue-500/30 text-blue-200' :
                  investment.type === 'crypto' ? 'bg-orange-500/30 text-orange-200' :
                  'bg-green-500/30 text-green-200'
                }`}>
                  {investment.type.toUpperCase()}
                </span>
              </div>
              <div className="text-right">
                <div className="text-white font-bold">{investment.price.toLocaleString()}</div>
                <div className={`text-sm ${investment.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {investment.change >= 0 ? '+' : ''}{investment.change}%
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">You own</span>
                <span className="text-white">{investment.owned} shares</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Risk Level</span>
                <span className={`${
                  investment.risk === 'low' ? 'text-green-400' :
                  investment.risk === 'medium' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {investment.risk.toUpperCase()}
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleInvestment(investment.id, 'buy', 1)}
                  disabled={bankAccount.balance < investment.price}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy 1 Share
                </button>
                <button
                  onClick={() => handleInvestment(investment.id, 'sell', 1)}
                  disabled={investment.owned < 1}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sell 1 Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Portfolio Summary */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-white font-semibold text-xl mb-4">Portfolio Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {investments.reduce((sum, inv) => sum + (inv.owned * inv.price), 0).toLocaleString()}
            </div>
            <div className="text-purple-300 text-sm">Total Value</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {investments.reduce((sum, inv) => sum + inv.owned, 0)}
            </div>
            <div className="text-purple-300 text-sm">Total Shares</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              +{investments.reduce((sum, inv) => sum + (inv.owned * inv.price * inv.change / 100), 0).toFixed(0)}
            </div>
            <div className="text-purple-300 text-sm">Today's P&L</div>
          </div>
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
        <p className="text-red-200">Practice identifying and avoiding financial scams</p>
      </div>

      {currentScam && (
        <div className="bg-red-500/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-xl">{currentScam.title}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              currentScam.type === 'sms' ? 'bg-blue-500/30 text-blue-200' :
              currentScam.type === 'email' ? 'bg-green-500/30 text-green-200' :
              'bg-purple-500/30 text-purple-200'
            }`}>
              {currentScam.type.toUpperCase()}
            </span>
          </div>

          <div className="bg-white/10 rounded-lg p-4 mb-6">
            <div className="text-xs text-gray-400 mb-2">From: {currentScam.sender}</div>
            <div className="text-white">{currentScam.content}</div>
          </div>

          <div className="space-y-3">
            <h3 className="text-white font-semibold">What do you do?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => handleScamResponse('click')}
                className="p-3 bg-red-600/30 hover:bg-red-600/50 text-red-200 rounded-lg transition-colors"
              >
                Click/Follow Instructions
              </button>
              <button
                onClick={() => handleScamResponse('ignore')}
                className="p-3 bg-yellow-600/30 hover:bg-yellow-600/50 text-yellow-200 rounded-lg transition-colors"
              >
                Ignore Message
              </button>
              <button
                onClick={() => handleScamResponse('report')}
                className="p-3 bg-green-600/30 hover:bg-green-600/50 text-green-200 rounded-lg transition-colors"
              >
                Report as Scam
              </button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white/5 rounded-lg">
            <h4 className="text-white font-semibold text-sm mb-2">Red Flags to Look For:</h4>
            <div className="flex flex-wrap gap-2">
              {currentScam.redFlags.map((flag: string, index: number) => (
                <span key={index} className="px-2 py-1 bg-red-500/30 text-red-200 rounded text-xs">
                  {flag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
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
        <ShoppingCart className="mx-auto mb-4 text-purple-400" size={64} />
        <h1 className="text-3xl font-bold text-white mb-2">Market Street</h1>
        <p className="text-purple-200">Master budgeting and smart spending decisions</p>
      </div>

      {/* Budget Overview */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
        <h2 className="text-white font-semibold text-xl mb-4">Monthly Budget</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{monthlyBudget.income.toLocaleString()}</div>
            <div className="text-green-300 text-sm">Monthly Income</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{monthlyBudget.spent.toLocaleString()}</div>
            <div className="text-red-300 text-sm">Spent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{(monthlyBudget.income - monthlyBudget.spent).toLocaleString()}</div>
            <div className="text-blue-300 text-sm">Remaining</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{Math.round((monthlyBudget.spent / monthlyBudget.income) * 100)}%</div>
            <div className="text-purple-300 text-sm">Budget Used</div>
          </div>
        </div>
      </div>

      {/* Shopping Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {spendingItems.map(item => (
          <div key={item.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  item.necessity === 'need' ? 'bg-green-500/20' : 'bg-orange-500/20'
                }`}>
                  <item.icon size={20} className={
                    item.necessity === 'need' ? 'text-green-400' : 'text-orange-400'
                  } />
                </div>
                <div>
                  <h3 className="text-white font-medium">{item.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.necessity === 'need' ? 'bg-green-500/30 text-green-200' : 'bg-orange-500/30 text-orange-200'
                  }`}>
                    {item.necessity.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-bold">{item.price} coins</div>
              </div>
            </div>
            
            <button
              onClick={() => handleSpending(item.id)}
              disabled={bankAccount.balance < item.price}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Purchase
            </button>
          </div>
        ))}
      </div>

      {/* Budget Categories */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-white font-semibold text-xl mb-4">Budget Categories</h2>
        <div className="space-y-4">
          {Object.entries(monthlyBudget.budget).map(([category, budget]) => {
            const spent = spendingItems
              .filter(item => item.category === category)
              .reduce((sum, item) => sum + (monthlyBudget.spent > 0 ? item.price : 0), 0);
            const percentage = (spent / budget) * 100;
            
            return (
              <div key={category} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-200 capitalize">{category}</span>
                  <span className="text-white">{spent} / {budget}</span>
                </div>
                <div className="w-full bg-purple-900/30 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      percentage > 100 ? 'bg-red-400' : 
                      percentage > 80 ? 'bg-yellow-400' : 'bg-green-400'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentDistrict) {
      case 'bank':
        return renderBankDistrict();
      case 'investment':
        return renderInvestmentPark();
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
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Building2, Calculator, PiggyBank, CreditCard, TrendingUp, DollarSign, Percent, Target, BookOpen, Play, Award, Coins, BarChart3, AlertTriangle, CheckCircle, Brain, Zap, Clock, Shield, Users, Star, Eye, Gamepad2, Gift, Trophy, Activity, RefreshCw, TrendingDown, Wallet, Home, Car, GraduationCap, Briefcase } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

interface BankDistrictProps {
  onBack: () => void;
}

interface SavingsChallenge {
  id: string;
  title: string;
  goal: number;
  current: number;
  timeframe: string;
  difficulty: 'easy' | 'medium' | 'hard';
  reward: number;
  tips: string[];
  milestones: { amount: number; reward: number; unlocked: boolean }[];
}

interface LoanScenario {
  id: string;
  title: string;
  situation: string;
  loanAmount: number;
  purpose: string;
  options: {
    id: string;
    lender: string;
    apr: number;
    term: number;
    monthlyPayment: number;
    totalCost: number;
    pros: string[];
    cons: string[];
  }[];
  correctChoice: string;
  explanation: string;
  reward: number;
}

interface BudgetGame {
  id: string;
  scenario: string;
  monthlyIncome: number;
  expenses: { category: string; amount: number; required: boolean }[];
  goals: string[];
  challenge: string;
  reward: number;
}

export const BankDistrict: React.FC<BankDistrictProps> = ({ onBack }) => {
  const { progress, addCoins, updateProgress } = useUser();
  const [activeGame, setActiveGame] = useState<'overview' | 'lessons' | 'budgeting' | 'loans' | 'savings' | 'calculator' | 'scenarios' | 'games'>('overview');
  const [selectedScenario, setSelectedScenario] = useState<LoanScenario | null>(null);
  const [savingsGoal, setSavingsGoal] = useState(10000000); // 10M VND
  const [monthlyContribution, setMonthlyContribution] = useState(1000000); // 1M VND
  const [interestRate, setInterestRate] = useState(6); // 6% annual
  const [timeHorizon, setTimeHorizon] = useState(12); // 12 months
  const [calculatedResults, setCalculatedResults] = useState({
    finalAmount: 0,
    totalContributions: 0,
    interestEarned: 0,
    monthsToGoal: 0
  });

  const savingsChallenges: SavingsChallenge[] = [
    {
      id: '1',
      title: 'Emergency Fund Builder',
      goal: 15000000, // 15M VND (3 months expenses)
      current: 5000000,
      timeframe: '6 months',
      difficulty: 'medium',
      reward: 300,
      tips: [
        'Automate transfers to savings account',
        'Cut one unnecessary subscription',
        'Save loose change daily',
        'Use the 52-week savings challenge'
      ],
      milestones: [
        { amount: 5000000, reward: 50, unlocked: true },
        { amount: 10000000, reward: 100, unlocked: false },
        { amount: 15000000, reward: 150, unlocked: false }
      ]
    },
    {
      id: '2',
      title: 'Motorbike Down Payment',
      goal: 8000000, // 8M VND
      current: 2500000,
      timeframe: '8 months',
      difficulty: 'easy',
      reward: 200,
      tips: [
        'Compare motorbike prices across dealers',
        'Consider certified pre-owned options',
        'Factor in insurance and registration costs',
        'Save for maintenance fund too'
      ],
      milestones: [
        { amount: 2500000, reward: 30, unlocked: true },
        { amount: 5000000, reward: 60, unlocked: false },
        { amount: 8000000, reward: 110, unlocked: false }
      ]
    },
    {
      id: '3',
      title: 'House Down Payment',
      goal: 500000000, // 500M VND (20% of 2.5B house)
      current: 75000000,
      timeframe: '5 years',
      difficulty: 'hard',
      reward: 1000,
      tips: [
        'Open high-yield savings account',
        'Consider government housing programs',
        'Track property prices in target areas',
        'Factor in closing costs and fees'
      ],
      milestones: [
        { amount: 100000000, reward: 100, unlocked: false },
        { amount: 250000000, reward: 300, unlocked: false },
        { amount: 500000000, reward: 600, unlocked: false }
      ]
    }
  ];

  const loanScenarios: LoanScenario[] = [
    {
      id: '1',
      title: 'First Motorbike Purchase',
      situation: 'You need a motorbike for work commute. The bike costs 80M VND and you have 20M saved.',
      loanAmount: 60000000,
      purpose: 'Transportation for work',
      options: [
        {
          id: 'a',
          lender: 'Bank Personal Loan',
          apr: 18.5,
          term: 36,
          monthlyPayment: 2180000,
          totalCost: 78480000,
          pros: ['No collateral required', 'Quick approval', 'Fixed rate'],
          cons: ['High interest rate', 'Shorter term', 'Strict income requirements']
        },
        {
          id: 'b',
          lender: 'Dealer Financing',
          apr: 15.0,
          term: 48,
          monthlyPayment: 1665000,
          totalCost: 79920000,
          pros: ['Lower monthly payment', 'Convenient process', 'Promotional rates'],
          cons: ['Variable rates possible', 'Dealer markup', 'Limited negotiation']
        },
        {
          id: 'c',
          lender: 'Credit Union',
          apr: 12.5,
          term: 42,
          monthlyPayment: 1720000,
          totalCost: 72240000,
          pros: ['Lowest total cost', 'Member benefits', 'Flexible terms'],
          cons: ['Membership required', 'Slower approval', 'Limited locations']
        }
      ],
      correctChoice: 'c',
      explanation: 'Credit union offers the lowest total cost (72.2M vs 78.5M vs 79.9M) despite slightly higher monthly payment. The 6.7M savings over the loan term makes it the best choice.',
      reward: 150
    },
    {
      id: '2',
      title: 'Home Purchase Decision',
      situation: 'You want to buy a 2.5B VND apartment. You have 400M saved and earn 50M monthly.',
      loanAmount: 2100000000,
      purpose: 'Primary residence purchase',
      options: [
        {
          id: 'a',
          lender: 'Government Housing Loan',
          apr: 6.8,
          term: 300,
          monthlyPayment: 13650000,
          totalCost: 4095000000,
          pros: ['Lowest interest rate', 'Government backing', 'Tax benefits'],
          cons: ['Strict eligibility', 'Property restrictions', 'Longer process']
        },
        {
          id: 'b',
          lender: 'Commercial Bank Mortgage',
          apr: 8.5,
          term: 300,
          monthlyPayment: 15890000,
          totalCost: 4767000000,
          pros: ['Faster approval', 'Flexible property choice', 'Additional services'],
          cons: ['Higher interest rate', 'Stricter income requirements', 'Higher fees']
        },
        {
          id: 'c',
          lender: 'Developer Financing',
          apr: 9.2,
          term: 240,
          monthlyPayment: 19450000,
          totalCost: 4668000000,
          pros: ['Convenient process', 'Promotional offers', 'Bundled services'],
          cons: ['Higher rates', 'Limited to specific projects', 'Less negotiation power']
        }
      ],
      correctChoice: 'a',
      explanation: 'Government housing loan saves 672M VND compared to commercial bank (4.095B vs 4.767B total cost). Monthly payment of 13.65M is manageable with 50M income (27% debt-to-income ratio).',
      reward: 250
    },
    {
      id: '3',
      title: 'Business Expansion Loan',
      situation: 'Your small business needs 200M VND for equipment and inventory expansion.',
      loanAmount: 200000000,
      purpose: 'Business equipment and inventory',
      options: [
        {
          id: 'a',
          lender: 'SME Development Bank',
          apr: 8.5,
          term: 60,
          monthlyPayment: 4080000,
          totalCost: 244800000,
          pros: ['SME-focused', 'Business advisory', 'Flexible repayment'],
          cons: ['Longer approval process', 'Extensive documentation', 'Collateral required']
        },
        {
          id: 'b',
          lender: 'Commercial Bank',
          apr: 11.0,
          term: 48,
          monthlyPayment: 5120000,
          totalCost: 245760000,
          pros: ['Faster approval', 'Existing relationship', 'Additional services'],
          cons: ['Higher interest rate', 'Personal guarantee required', 'Stricter terms']
        },
        {
          id: 'c',
          lender: 'Online Lender',
          apr: 15.5,
          term: 36,
          monthlyPayment: 7020000,
          totalCost: 252720000,
          pros: ['Quick approval', 'Minimal paperwork', 'Online process'],
          cons: ['Highest cost', 'Limited support', 'Variable rates']
        }
      ],
      correctChoice: 'a',
      explanation: 'SME Development Bank offers the lowest total cost (244.8M) and provides business advisory services. The longer approval time is worth the 8M savings and additional support.',
      reward: 200
    }
  ];

  const budgetGames: BudgetGame[] = [
    {
      id: '1',
      scenario: 'Fresh Graduate Starting First Job',
      monthlyIncome: 15000000,
      expenses: [
        { category: 'Rent (shared apartment)', amount: 4000000, required: true },
        { category: 'Food & groceries', amount: 3000000, required: true },
        { category: 'Transportation', amount: 1500000, required: true },
        { category: 'Phone & internet', amount: 800000, required: true },
        { category: 'Entertainment', amount: 2000000, required: false },
        { category: 'Clothes & personal', amount: 1500000, required: false },
        { category: 'Emergency fund', amount: 1500000, required: false },
        { category: 'Savings/Investment', amount: 700000, required: false }
      ],
      goals: ['Build 3-month emergency fund', 'Save for motorbike down payment', 'Start investing'],
      challenge: 'Allocate your 15M VND salary to cover needs, wants, and savings while building financial security.',
      reward: 100
    },
    {
      id: '2',
      scenario: 'Young Family with New Baby',
      monthlyIncome: 35000000,
      expenses: [
        { category: 'Mortgage payment', amount: 12000000, required: true },
        { category: 'Utilities & maintenance', amount: 2500000, required: true },
        { category: 'Food & groceries', amount: 6000000, required: true },
        { category: 'Baby expenses', amount: 3000000, required: true },
        { category: 'Transportation', amount: 3500000, required: true },
        { category: 'Insurance (health/life)', amount: 2000000, required: true },
        { category: 'Entertainment', amount: 2000000, required: false },
        { category: 'Education savings', amount: 2000000, required: false },
        { category: 'Emergency fund', amount: 2000000, required: false }
      ],
      goals: ['Maintain 6-month emergency fund', 'Start education savings for child', 'Plan for family growth'],
      challenge: 'Balance family needs with long-term financial security on a 35M VND household income.',
      reward: 150
    },
    {
      id: '3',
      scenario: 'Mid-Career Professional Planning Retirement',
      monthlyIncome: 50000000,
      expenses: [
        { category: 'Mortgage payment', amount: 15000000, required: true },
        { category: 'Living expenses', amount: 12000000, required: true },
        { category: 'Transportation', amount: 4000000, required: true },
        { category: 'Insurance premiums', amount: 3000000, required: true },
        { category: 'Children education', amount: 8000000, required: true },
        { category: 'Entertainment & travel', amount: 3000000, required: false },
        { category: 'Retirement savings', amount: 3000000, required: false },
        { category: 'Investment portfolio', amount: 2000000, required: false }
      ],
      goals: ['Maximize retirement savings', 'Diversify investment portfolio', 'Plan for children\'s university'],
      challenge: 'Optimize your 50M VND income for current needs while securing your family\'s future.',
      reward: 200
    }
  ];

  // Calculate savings projections
  useEffect(() => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = timeHorizon;
    
    // Future value of annuity formula
    const futureValue = monthlyContribution * (((1 + monthlyRate) ** totalMonths - 1) / monthlyRate);
    const totalContributions = monthlyContribution * totalMonths;
    const interestEarned = futureValue - totalContributions;
    
    // Calculate months to reach goal
    const monthsToGoal = Math.log(1 + (savingsGoal * monthlyRate) / monthlyContribution) / Math.log(1 + monthlyRate);
    
    setCalculatedResults({
      finalAmount: Math.round(futureValue),
      totalContributions: Math.round(totalContributions),
      interestEarned: Math.round(interestEarned),
      monthsToGoal: Math.round(monthsToGoal)
    });
  }, [monthlyContribution, interestRate, timeHorizon, savingsGoal]);

  const completeSavingsChallenge = (challengeId: string) => {
    const challenge = savingsChallenges.find(c => c.id === challengeId);
    if (challenge) {
      addCoins(challenge.reward);
      updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 15 });
    }
  };

  const solveLoanScenario = (scenarioId: string, choiceId: string) => {
    const scenario = loanScenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    const isCorrect = choiceId === scenario.correctChoice;
    if (isCorrect) {
      addCoins(scenario.reward);
      updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 20 });
    } else {
      addCoins(-25);
    }
  };

  const renderLessons = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Brain className="mx-auto mb-4 text-blue-400 animate-pulse-glow" size={64} />
        <h2 className="text-3xl font-bold text-white mb-2 gradient-text">Banking Academy</h2>
        <p className="text-blue-200 text-lg">Interactive lessons that don't suck! 🎮</p>
        <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <Zap className="text-yellow-400" size={16} />
            <span className="text-yellow-200">Interactive Scenarios</span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="text-purple-400" size={16} />
            <span className="text-purple-200">Instant Rewards</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="text-green-400" size={16} />
            <span className="text-green-200">Real-World Practice</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Lesson 1: Banking Basics - Interactive Story */}
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-8 border border-blue-500/30 interactive-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-blue-500/20 rounded-full">
                <Building2 className="text-blue-400" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Banking Basics: Your First Account</h3>
                <p className="text-blue-200">Interactive story-based learning</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-yellow-400 font-bold text-xl">+150 coins</div>
              <div className="text-yellow-200 text-sm">Completion reward</div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-6 mb-6 border-l-4 border-blue-500">
            <h4 className="text-white font-semibold mb-3 flex items-center">
              <Smartphone className="mr-2" size={20} />
              Scenario: You just turned 18 and need your first bank account
            </h4>
            <p className="text-blue-200 mb-4">
              You walk into Vietcombank with your ID and 2M VND birthday money. The banker offers you three account types...
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 rounded-lg p-4 border border-white/20 hover:border-blue-400 transition-all cursor-pointer group">
              <h5 className="text-white font-semibold mb-2">💳 Basic Savings</h5>
              <ul className="text-blue-200 text-sm space-y-1 mb-3">
                <li>• 0.5% interest annually</li>
                <li>• No monthly fees</li>
                <li>• ATM card included</li>
                <li>• 5 free transfers/month</li>
              </ul>
              <div className="text-green-400 text-xs font-medium">✅ Best for beginners</div>
            </div>

            <div className="bg-white/10 rounded-lg p-4 border border-white/20 hover:border-yellow-400 transition-all cursor-pointer group">
              <h5 className="text-white font-semibold mb-2">💎 Premium Account</h5>
              <ul className="text-yellow-200 text-sm space-y-1 mb-3">
                <li>• 2.5% interest annually</li>
                <li>• 50K VND monthly fee</li>
                <li>• Premium debit card</li>
                <li>• Unlimited transfers</li>
              </ul>
              <div className="text-yellow-400 text-xs font-medium">⚠️ High fees for low balance</div>
            </div>

            <div className="bg-white/10 rounded-lg p-4 border border-white/20 hover:border-red-400 transition-all cursor-pointer group">
              <h5 className="text-white font-semibold mb-2">🎯 Investment Package</h5>
              <ul className="text-red-200 text-sm space-y-1 mb-3">
                <li>• "Guaranteed" 8% returns</li>
                <li>• 100K VND setup fee</li>
                <li>• Lock-in for 2 years</li>
                <li>• "Special promotion"</li>
              </ul>
              <div className="text-red-400 text-xs font-medium">🚨 Too good to be true!</div>
            </div>
          </div>

          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-4">
            <h5 className="text-green-300 font-semibold mb-2">💡 Pro Tips:</h5>
            <ul className="text-green-200 text-sm space-y-1">
              <li>• Start simple - you can always upgrade later</li>
              <li>• Calculate if premium fees are worth the benefits</li>
              <li>• Be suspicious of "guaranteed" high returns</li>
              <li>• Read all terms and conditions carefully</li>
            </ul>
          </div>

          <button
            onClick={() => {
              addCoins(150);
              updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 15 });
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-colors text-lg"
          >
            Complete Banking Basics (+150 coins)
          </button>
        </div>

        {/* Lesson 2: Credit Cards - Decision Game */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-8 border border-purple-500/30 interactive-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-purple-500/20 rounded-full">
                <CreditCard className="text-purple-400" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Credit Cards: Friend or Foe?</h3>
                <p className="text-purple-200">Interactive decision-making game</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-yellow-400 font-bold text-xl">+200 coins</div>
              <div className="text-yellow-200 text-sm">Smart choices bonus</div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-6 mb-6 border-l-4 border-purple-500">
            <h4 className="text-white font-semibold mb-3 flex items-center">
              <ShoppingBag className="mr-2" size={20} />
              Scenario: You're at the mall and see the perfect outfit (3M VND)
            </h4>
            <p className="text-purple-200 mb-4">
              You have 500K in cash, 2M in savings, and a credit card with 10M limit. What do you do?
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 cursor-pointer hover:bg-red-500/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-white font-semibold">💳 Use Credit Card (YOLO!)</h5>
                <span className="text-red-400 text-sm">-50 coins</span>
              </div>
              <p className="text-red-200 text-sm mb-2">"I'll pay it off later... maybe"</p>
              <div className="text-red-300 text-xs">
                ❌ Result: 24% interest = 720K extra if you take 1 year to pay off
              </div>
            </div>

            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 cursor-pointer hover:bg-yellow-500/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-white font-semibold">💰 Use Savings</h5>
                <span className="text-yellow-400 text-sm">+25 coins</span>
              </div>
              <p className="text-yellow-200 text-sm mb-2">"I have the money, why not?"</p>
              <div className="text-yellow-300 text-xs">
                ⚠️ Result: Depletes emergency fund, but no debt
              </div>
            </div>

            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 cursor-pointer hover:bg-green-500/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-white font-semibold">🧠 Wait and Save</h5>
                <span className="text-green-400 text-sm">+100 coins</span>
              </div>
              <p className="text-green-200 text-sm mb-2">"I'll save up for it properly"</p>
              <div className="text-green-300 text-xs">
                ✅ Result: Builds discipline, keeps emergency fund intact
              </div>
            </div>
          </div>

          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-4">
            <h5 className="text-blue-300 font-semibold mb-2">🎯 Credit Card Reality Check:</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h6 className="text-blue-200 font-medium mb-1">Smart Uses:</h6>
                <ul className="text-blue-200 space-y-1">
                  <li>• Building credit history</li>
                  <li>• Emergency expenses only</li>
                  <li>• Online purchase protection</li>
                  <li>• Cashback on planned purchases</li>
                </ul>
              </div>
              <div>
                <h6 className="text-blue-200 font-medium mb-1">Danger Zones:</h6>
                <ul className="text-blue-200 space-y-1">
                  <li>• Impulse shopping</li>
                  <li>• Only paying minimums</li>
                  <li>• Cash advances (28% interest!)</li>
                  <li>• Multiple cards without tracking</li>
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              addCoins(200);
              updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 20 });
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors text-lg"
          >
            Master Credit Cards (+200 coins)
          </button>
        </div>

        {/* Lesson 3: Loans - Real Calculator */}
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-8 border border-orange-500/30 interactive-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-orange-500/20 rounded-full">
                <Calculator className="text-orange-400" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Loan Calculator Mastery</h3>
                <p className="text-orange-200">Interactive loan comparison tool</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-yellow-400 font-bold text-xl">+250 coins</div>
              <div className="text-yellow-200 text-sm">Calculator expert</div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-6 mb-6 border-l-4 border-orange-500">
            <h4 className="text-white font-semibold mb-3 flex items-center">
              <Car className="mr-2" size={20} />
              Challenge: Find the best motorbike loan for 60M VND
            </h4>
            <p className="text-orange-200 mb-4">
              Compare these three loan offers and calculate which saves you the most money:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <h5 className="text-white font-semibold mb-3">🏦 Bank A</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-orange-200">Interest Rate:</span>
                  <span className="text-white font-bold">12% APR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-200">Term:</span>
                  <span className="text-white">48 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-200">Processing Fee:</span>
                  <span className="text-white">1M VND</span>
                </div>
                <div className="border-t border-white/20 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-orange-200">Monthly Payment:</span>
                    <span className="text-green-400 font-bold">1,580,000 VND</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-200">Total Cost:</span>
                    <span className="text-red-400 font-bold">76,840,000 VND</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <h5 className="text-white font-semibold mb-3">🏪 Dealer Finance</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-orange-200">Interest Rate:</span>
                  <span className="text-white font-bold">15% APR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-200">Term:</span>
                  <span className="text-white">36 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-200">Processing Fee:</span>
                  <span className="text-white">500K VND</span>
                </div>
                <div className="border-t border-white/20 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-orange-200">Monthly Payment:</span>
                    <span className="text-green-400 font-bold">2,080,000 VND</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-200">Total Cost:</span>
                    <span className="text-red-400 font-bold">75,380,000 VND</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4 border border-green-500/50">
              <h5 className="text-white font-semibold mb-3">🤝 Credit Union</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-orange-200">Interest Rate:</span>
                  <span className="text-white font-bold">10% APR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-200">Term:</span>
                  <span className="text-white">42 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-200">Processing Fee:</span>
                  <span className="text-white">300K VND</span>
                </div>
                <div className="border-t border-white/20 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-orange-200">Monthly Payment:</span>
                    <span className="text-green-400 font-bold">1,720,000 VND</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-200">Total Cost:</span>
                    <span className="text-green-400 font-bold">72,540,000 VND</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-center">
                <span className="bg-green-500/30 text-green-200 px-2 py-1 rounded text-xs font-bold">
                  BEST DEAL! Saves 4.3M VND
                </span>
              </div>
            </div>
          </div>

          <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 mb-4">
            <h5 className="text-purple-300 font-semibold mb-2">🧮 Loan Shopping Pro Tips:</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <ul className="text-purple-200 space-y-1">
                <li>• Compare total cost, not just monthly payment</li>
                <li>• Factor in all fees and charges</li>
                <li>• Shorter terms = less total interest</li>
                <li>• Credit unions often have better rates</li>
              </ul>
              <ul className="text-purple-200 space-y-1">
                <li>• Get pre-approved to know your budget</li>
                <li>• Don't let dealers handle financing without comparison</li>
                <li>• Read all terms before signing</li>
                <li>• Consider paying extra toward principal</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => {
              addCoins(250);
              updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 25 });
            }}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-colors text-lg"
          >
            Become Loan Calculator Expert (+250 coins)
          </button>
        </div>

        {/* Lesson 4: Emergency Fund - Survival Game */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-8 border border-green-500/30 interactive-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-green-500/20 rounded-full">
                <Shield className="text-green-400" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Emergency Fund: Financial Survival</h3>
                <p className="text-green-200">Interactive crisis simulation</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-yellow-400 font-bold text-xl">+300 coins</div>
              <div className="text-yellow-200 text-sm">Survival master</div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-6 mb-6 border-l-4 border-green-500">
            <h4 className="text-white font-semibold mb-3 flex items-center">
              <AlertTriangle className="mr-2 text-red-400" size={20} />
              Crisis Simulation: Your motorbike breaks down
            </h4>
            <p className="text-green-200 mb-4">
              Repair cost: 8M VND. You need it for work. You have different financial situations to choose from:
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
              <h5 className="text-white font-semibold mb-2 flex items-center">
                <X className="mr-2 text-red-400" size={16} />
                Scenario A: No Emergency Fund
              </h5>
              <div className="text-red-200 text-sm space-y-2">
                <p><strong>Your options:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• Credit card (24% interest) = 10M total cost</li>
                  <li>• Borrow from family (awkward + strain relationships)</li>
                  <li>• Payday loan (300% APR) = financial disaster</li>
                  <li>• Miss work = lose income</li>
                </ul>
                <div className="bg-red-600/30 p-2 rounded mt-2">
                  <strong>Result: Stress level 📈📈📈 Financial damage: Severe</strong>
                </div>
              </div>
            </div>

            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
              <h5 className="text-white font-semibold mb-2 flex items-center">
                <CheckCircle className="mr-2 text-green-400" size={16} />
                Scenario B: 6-Month Emergency Fund (30M VND)
              </h5>
              <div className="text-green-200 text-sm space-y-2">
                <p><strong>Your options:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• Pay cash from emergency fund</li>
                  <li>• No interest, no debt, no stress</li>
                  <li>• Rebuild fund over next few months</li>
                  <li>• Continue working without interruption</li>
                </ul>
                <div className="bg-green-600/30 p-2 rounded mt-2">
                  <strong>Result: Stress level 📉 Financial damage: Minimal</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-4">
            <h5 className="text-blue-300 font-semibold mb-3">🎯 Emergency Fund Building Strategy:</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-blue-200 font-medium mb-2">Start Small:</h6>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• Week 1-4: Save 1M VND</li>
                  <li>• Month 2-3: Build to 5M VND</li>
                  <li>• Month 4-6: Reach 15M VND</li>
                  <li>• Month 7-12: Full 6-month fund</li>
                </ul>
              </div>
              <div>
                <h6 className="text-blue-200 font-medium mb-2">Smart Tactics:</h6>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• Automate transfers on payday</li>
                  <li>• Use high-yield savings account</li>
                  <li>• Save windfalls (bonuses, gifts)</li>
                  <li>• Cut one subscription = 200K/month</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-4">
            <h5 className="text-yellow-300 font-semibold mb-2">💡 Real Talk: Why People Skip Emergency Funds</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h6 className="text-yellow-200 font-medium mb-1">Common Excuses:</h6>
                <ul className="text-yellow-200 space-y-1">
                  <li>• "Nothing bad will happen to me"</li>
                  <li>• "I can just use credit cards"</li>
                  <li>• "I'll start saving next month"</li>
                  <li>• "My parents will help me"</li>
                </ul>
              </div>
              <div>
                <h6 className="text-yellow-200 font-medium mb-1">Reality Check:</h6>
                <ul className="text-yellow-200 space-y-1">
                  <li>• 78% of people live paycheck to paycheck</li>
                  <li>• Average emergency happens every 3-4 years</li>
                  <li>• Credit card debt = 24% interest trap</li>
                  <li>• Independence {'>'} depending on others</li>
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              addCoins(300);
              updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 30 });
            }}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-colors text-lg"
          >
            Master Financial Survival (+300 coins)
          </button>
        </div>
      </div>
    </div>
  );

  const renderSavingsGames = () => (
    <div className="space-y-6">
      <div className="text-center">
        <PiggyBank className="mx-auto mb-4 text-green-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Savings Challenge Center</h2>
        <p className="text-green-200">Build healthy saving habits with interactive challenges</p>
      </div>

      {/* Savings Calculator */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-semibold text-xl mb-6">💰 Interactive Savings Calculator</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">Savings Goal (VND)</label>
              <input
                type="number"
                value={savingsGoal}
                onChange={(e) => setSavingsGoal(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-green-400 focus:outline-none"
                placeholder="10,000,000"
              />
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Monthly Contribution (VND)</label>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-green-400 focus:outline-none"
                placeholder="1,000,000"
              />
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Annual Interest Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-green-400 focus:outline-none"
                placeholder="6.0"
              />
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Time Horizon (months)</label>
              <input
                type="number"
                value={timeHorizon}
                onChange={(e) => setTimeHorizon(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-green-400 focus:outline-none"
                placeholder="12"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-4 border border-green-500/30">
              <h4 className="text-green-300 font-semibold mb-3">📊 Projection Results</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-200">Final Amount:</span>
                  <span className="text-white font-bold">{calculatedResults.finalAmount.toLocaleString()} VND</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-200">Your Contributions:</span>
                  <span className="text-white">{calculatedResults.totalContributions.toLocaleString()} VND</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-200">Interest Earned:</span>
                  <span className="text-green-400 font-semibold">{calculatedResults.interestEarned.toLocaleString()} VND</span>
                </div>
                <div className="border-t border-green-500/30 pt-2">
                  <div className="flex justify-between">
                    <span className="text-green-200">Months to Goal:</span>
                    <span className="text-yellow-400 font-bold">{calculatedResults.monthsToGoal} months</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2">💡 Smart Savings Tips</h4>
              <ul className="text-blue-200 text-sm space-y-1">
                <li>• Automate savings transfers on payday</li>
                <li>• Use high-yield savings accounts (6%+ APY)</li>
                <li>• Start with small amounts and increase gradually</li>
                <li>• Track progress weekly to stay motivated</li>
                <li>• Consider term deposits for higher rates</li>
              </ul>
            </div>

            <button
              onClick={() => {
                addCoins(50);
                updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 10 });
              }}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-colors"
            >
              Save Calculation (+50 coins)
            </button>
          </div>
        </div>
      </div>

      {/* Savings Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {savingsChallenges.map(challenge => (
          <div key={challenge.id} className="bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">{challenge.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                challenge.difficulty === 'easy' ? 'bg-green-500/30 text-green-200' :
                challenge.difficulty === 'medium' ? 'bg-yellow-500/30 text-yellow-200' :
                'bg-red-500/30 text-red-200'
              }`}>
                {challenge.difficulty.toUpperCase()}
              </span>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {challenge.current.toLocaleString()} VND
                </div>
                <div className="text-green-200 text-sm">
                  of {challenge.goal.toLocaleString()} VND goal
                </div>
                <div className="text-purple-300 text-xs">{challenge.timeframe} timeline</div>
              </div>

              <div className="w-full bg-gray-700/30 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full transition-all duration-700"
                  style={{ width: `${(challenge.current / challenge.goal) * 100}%` }}
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-medium text-sm">Milestones:</h4>
                {challenge.milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center justify-between p-2 rounded ${
                    milestone.unlocked ? 'bg-green-500/20 border border-green-500/30' : 'bg-gray-500/20 border border-gray-500/30'
                  }`}>
                    <span className={`text-sm ${milestone.unlocked ? 'text-green-200' : 'text-gray-400'}`}>
                      {milestone.amount.toLocaleString()} VND
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs ${milestone.unlocked ? 'text-green-300' : 'text-gray-400'}`}>
                        +{milestone.reward} coins
                      </span>
                      {milestone.unlocked && <CheckCircle className="text-green-400" size={12} />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                <h4 className="text-blue-300 font-medium text-sm mb-2">💡 Tips:</h4>
                <ul className="text-blue-200 text-xs space-y-1">
                  {challenge.tips.map((tip, index) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => completeSavingsChallenge(challenge.id)}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-colors"
              >
                Join Challenge (+{challenge.reward} coins)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLoanScenarios = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CreditCard className="mx-auto mb-4 text-orange-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Smart Borrowing Academy</h2>
        <p className="text-orange-200">Master loan decisions with real-world scenarios</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loanScenarios.map(scenario => (
          <div key={scenario.id} className="bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-xl">{scenario.title}</h3>
              <span className="bg-orange-500/30 text-orange-200 px-3 py-1 rounded-full text-sm">
                +{scenario.reward} coins
              </span>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-6 border-l-4 border-orange-500">
              <p className="text-white mb-2"><strong>Situation:</strong> {scenario.situation}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-purple-200">Loan Amount:</span>
                  <span className="text-white ml-2 font-semibold">{scenario.loanAmount.toLocaleString()} VND</span>
                </div>
                <div>
                  <span className="text-purple-200">Purpose:</span>
                  <span className="text-white ml-2">{scenario.purpose}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {scenario.options.map(option => (
                <div key={option.id} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/30 transition-all cursor-pointer group">
                  <h4 className="text-white font-semibold mb-3">{option.lender}</h4>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-200">APR:</span>
                      <span className="text-white font-semibold">{option.apr}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-200">Term:</span>
                      <span className="text-white">{option.term} months</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-200">Monthly Payment:</span>
                      <span className="text-white font-semibold">{option.monthlyPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-white/20 pt-2">
                      <span className="text-purple-200">Total Cost:</span>
                      <span className="text-yellow-400 font-bold">{option.totalCost.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-green-500/20 border border-green-500/30 rounded p-2">
                      <h5 className="text-green-300 font-medium text-xs mb-1">Pros:</h5>
                      <ul className="text-green-200 text-xs space-y-1">
                        {option.pros.map((pro, index) => (
                          <li key={index}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-500/20 border border-red-500/30 rounded p-2">
                      <h5 className="text-red-300 font-medium text-xs mb-1">Cons:</h5>
                      <ul className="text-red-200 text-xs space-y-1">
                        {option.cons.map((con, index) => (
                          <li key={index}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => solveLoanScenario(scenario.id, option.id)}
                    className={`w-full py-2 rounded-lg font-semibold text-sm transition-colors ${
                      option.id === scenario.correctChoice
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-orange-600 hover:bg-orange-700 text-white'
                    }`}
                  >
                    Choose This Option
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2">💡 Expert Analysis:</h4>
              <p className="text-blue-200 text-sm">{scenario.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBudgetGames = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Calculator className="mx-auto mb-4 text-purple-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Budget Mastery Games</h2>
        <p className="text-purple-200">Practice budgeting with real-life scenarios</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {budgetGames.map(game => (
          <div key={game.id} className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h3 className="text-white font-bold text-xl mb-4">{game.scenario}</h3>
            
            <div className="bg-white/5 rounded-lg p-4 mb-6 border-l-4 border-purple-500">
              <p className="text-white mb-4">{game.challenge}</p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <DollarSign className="text-green-400" size={16} />
                  <span className="text-green-200">Monthly Income: {game.monthlyIncome.toLocaleString()} VND</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="text-blue-400" size={16} />
                  <span className="text-blue-200">Goals: {game.goals.length}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-3">💰 Expense Categories</h4>
                <div className="space-y-2">
                  {game.expenses.map((expense, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                      expense.required ? 'bg-red-500/20 border border-red-500/30' : 'bg-blue-500/20 border border-blue-500/30'
                    }`}>
                      <div className="flex items-center space-x-2">
                        {expense.required ? (
                          <AlertTriangle className="text-red-400" size={16} />
                        ) : (
                          <Star className="text-blue-400" size={16} />
                        )}
                        <span className="text-white text-sm">{expense.category}</span>
                      </div>
                      <span className="text-white font-semibold">{expense.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">🎯 Financial Goals</h4>
                <div className="space-y-2 mb-4">
                  {game.goals.map((goal, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-green-500/20 rounded">
                      <CheckCircle className="text-green-400" size={16} />
                      <span className="text-green-200 text-sm">{goal}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
                  <h5 className="text-yellow-300 font-medium text-sm mb-2">📊 Budget Analysis</h5>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-yellow-200">Required Expenses:</span>
                      <span className="text-white">
                        {game.expenses.filter(e => e.required).reduce((sum, e) => sum + e.amount, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-200">Optional Expenses:</span>
                      <span className="text-white">
                        {game.expenses.filter(e => !e.required).reduce((sum, e) => sum + e.amount, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-yellow-500/30 pt-1">
                      <span className="text-yellow-200">Remaining:</span>
                      <span className="text-green-400 font-semibold">
                        {(game.monthlyIncome - game.expenses.reduce((sum, e) => sum + e.amount, 0)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addCoins(game.reward);
                    updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 15 });
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
                >
                  Complete Budget (+{game.reward} coins)
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Building2 className="mx-auto mb-4 text-blue-400" size={64} />
        <h1 className="text-3xl font-bold text-white mb-2">Bank District</h1>
        <p className="text-blue-200">Master banking, budgeting, and financial management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { id: 'lessons', name: 'Banking Academy', icon: BookOpen, color: 'from-blue-500 to-cyan-500', description: 'Learn essential banking concepts', count: '12 lessons' },
          { id: 'budgeting', name: 'Budget Games', icon: Calculator, color: 'from-green-500 to-emerald-500', description: 'Master budgeting with scenarios', count: '8 scenarios' },
          { id: 'savings', name: 'Savings Challenges', icon: PiggyBank, color: 'from-purple-500 to-pink-500', description: 'Build saving habits', count: '6 challenges' },
          { id: 'loans', name: 'Loan Scenarios', icon: CreditCard, color: 'from-orange-500 to-red-500', description: 'Smart borrowing decisions', count: '10 cases' }
        ].map(game => (
          <button
            key={game.id}
            onClick={() => setActiveGame(game.id as any)}
            className="group relative overflow-hidden rounded-xl border-2 border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
            <div className="relative p-6 bg-white/10 backdrop-blur-lg">
              <game.icon className="text-white mb-3 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-white font-bold text-lg mb-2">{game.name}</h3>
              <p className="text-purple-200 text-sm mb-2">{game.description}</p>
              <div className="text-blue-300 text-xs font-medium">{game.count}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-4">Banking Skills Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{progress.financialLiteracyScore}</div>
            <p className="text-blue-200 text-sm">Financial Knowledge</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">8</div>
            <p className="text-green-200 text-sm">Lessons Completed</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{progress.level}</div>
            <p className="text-purple-200 text-sm">Banking Level</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{progress.coins}</div>
            <p className="text-yellow-200 text-sm">Available Coins</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeGame) {
      case 'lessons':
        return renderLessons();
      case 'savings':
        return renderSavingsGames();
      case 'loans':
        return renderLoanScenarios();
      case 'budgeting':
        return renderBudgetGames();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="space-y-6">
      {activeGame !== 'overview' && (
        <button
          onClick={() => setActiveGame('overview')}
          className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Bank District</span>
        </button>
      )}

      {renderContent()}
    </div>
  );
};
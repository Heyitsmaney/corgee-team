import React, { useState, useEffect } from 'react';
import { ArrowLeft, Building2, Calculator, PiggyBank, CreditCard, TrendingUp, DollarSign, Percent, Target, BookOpen, Play, Award, Coins, BarChart3, AlertTriangle, CheckCircle, Brain, Zap, Clock, Shield } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

interface BankDistrictProps {
  onBack: () => void;
}

interface BankingLesson {
  id: string;
  title: string;
  category: 'basics' | 'advanced' | 'products' | 'planning';
  content: string;
  keyPoints: string[];
  practicalTips: string[];
  realExamples: string[];
  commonMistakes: string[];
  reward: number;
  completed: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
}

interface LoanProduct {
  id: string;
  name: string;
  type: 'personal' | 'mortgage' | 'auto' | 'business' | 'education';
  interestRate: number;
  maxAmount: number;
  term: string;
  requirements: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
  realExample: string;
}

interface CreditCard {
  id: string;
  name: string;
  type: 'basic' | 'rewards' | 'premium' | 'business';
  apr: number;
  annualFee: number;
  rewards: string;
  benefits: string[];
  requirements: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
}

interface BudgetCategory {
  name: string;
  allocated: number;
  spent: number;
  remaining: number;
  color: string;
  tips: string[];
}

export const BankDistrict: React.FC<BankDistrictProps> = ({ onBack }) => {
  const { progress, addCoins, updateProgress } = useUser();
  const [activeGame, setActiveGame] = useState<'overview' | 'lessons' | 'budgeting' | 'loans' | 'calculator' | 'products' | 'cashflow'>('overview');
  const [selectedLesson, setSelectedLesson] = useState<BankingLesson | null>(null);
  const [budget, setBudget] = useState({
    income: 25000000, // 25M VND monthly
    categories: [
      { name: 'Housing', allocated: 8000000, spent: 7500000, remaining: 500000, color: 'bg-blue-400', tips: ['Consider roommates to split costs', 'Look for locations with good public transport'] },
      { name: 'Food', allocated: 5000000, spent: 4200000, remaining: 800000, color: 'bg-green-400', tips: ['Cook at home more often', 'Buy groceries in bulk'] },
      { name: 'Transportation', allocated: 3000000, spent: 2800000, remaining: 200000, color: 'bg-yellow-400', tips: ['Use public transport', 'Consider motorbike vs car costs'] },
      { name: 'Entertainment', allocated: 2000000, spent: 2500000, remaining: -500000, color: 'bg-purple-400', tips: ['Set entertainment limits', 'Find free activities'] },
      { name: 'Savings', allocated: 5000000, spent: 4000000, remaining: 1000000, color: 'bg-cyan-400', tips: ['Automate savings transfers', 'Start with 20% of income'] },
      { name: 'Emergency Fund', allocated: 2000000, spent: 1500000, remaining: 500000, color: 'bg-red-400', tips: ['Build 6 months of expenses', 'Keep in high-yield savings'] }
    ] as BudgetCategory[]
  });

  const [cashFlowData, setCashFlowData] = useState({
    monthlyIncome: 25000000,
    fixedExpenses: 15000000,
    variableExpenses: 6000000,
    savings: 4000000,
    netCashFlow: 0
  });

  const bankingLessons: BankingLesson[] = [
    {
      id: '1',
      title: 'Understanding Cash Flow Management',
      category: 'basics',
      content: 'Cash flow is the movement of money in and out of your accounts. Positive cash flow means you earn more than you spend, while negative cash flow means you spend more than you earn.',
      keyPoints: [
        'Cash flow = Income - Expenses',
        'Track both fixed and variable expenses',
        'Positive cash flow enables savings and investments',
        'Negative cash flow leads to debt accumulation',
        'Cash flow timing affects your financial stability'
      ],
      practicalTips: [
        'Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings',
        'Track expenses for 30 days to understand spending patterns',
        'Set up automatic transfers to savings accounts',
        'Review and adjust budget monthly',
        'Build emergency fund before investing'
      ],
      realExamples: [
        'Young professional earning 25M VND: 15M fixed costs, 6M variable, 4M savings = healthy cash flow',
        'Student with part-time job: 8M income, 10M expenses = need to reduce spending or increase income',
        'Family with irregular income: Track monthly averages and build larger emergency fund'
      ],
      commonMistakes: [
        'Not tracking small daily expenses that add up',
        'Forgetting about annual or quarterly expenses',
        'Not adjusting budget when income changes',
        'Spending savings on non-emergencies',
        'Not planning for irregular income periods'
      ],
      reward: 150,
      completed: false,
      difficulty: 'beginner',
      estimatedTime: '15 minutes'
    },
    {
      id: '2',
      title: 'Working Capital and Business Finance',
      category: 'advanced',
      content: 'Working capital is the money available for day-to-day operations. For personal finance, it\'s your liquid assets minus short-term debts.',
      keyPoints: [
        'Working Capital = Current Assets - Current Liabilities',
        'Positive working capital indicates financial health',
        'Liquidity ratios measure ability to pay short-term debts',
        'Cash conversion cycle affects cash flow timing',
        'Working capital management prevents cash crunches'
      ],
      practicalTips: [
        'Maintain 3-6 months of expenses in liquid savings',
        'Pay off high-interest debt to improve working capital',
        'Use credit cards wisely to manage cash flow timing',
        'Negotiate payment terms with service providers',
        'Monitor debt-to-income ratio monthly'
      ],
      realExamples: [
        'Freelancer with irregular income: Keeps 6 months expenses in savings for cash flow stability',
        'Small business owner: Uses business credit line to manage seasonal cash flow gaps',
        'Young professional: Pays off credit card debt to improve personal working capital'
      ],
      commonMistakes: [
        'Tying up too much money in illiquid investments',
        'Not planning for irregular expenses',
        'Using emergency fund for non-emergencies',
        'Ignoring the timing of income and expenses',
        'Not maintaining adequate cash reserves'
      ],
      reward: 200,
      completed: false,
      difficulty: 'advanced',
      estimatedTime: '25 minutes'
    },
    {
      id: '3',
      title: 'Interest Rates and Compound Growth',
      category: 'basics',
      content: 'Interest is the cost of borrowing money or the reward for saving. Compound interest is when you earn interest on both your principal and previously earned interest.',
      keyPoints: [
        'Simple Interest = Principal × Rate × Time',
        'Compound Interest = Principal × (1 + Rate)^Time',
        'Higher interest rates significantly impact long-term growth',
        'Compounding frequency affects total returns',
        'Time is the most powerful factor in compound growth'
      ],
      practicalTips: [
        'Start investing early to maximize compound growth',
        'Choose high-yield savings accounts for emergency funds',
        'Pay off high-interest debt before investing',
        'Reinvest dividends and interest for compound growth',
        'Use compound interest calculators for planning'
      ],
      realExamples: [
        'Saving 2M VND monthly at 6% annual return = 26.8M after 1 year, 58.7M after 2 years',
        'Credit card debt at 24% APR: 10M debt becomes 12.4M in one year if only minimum payments',
        'Starting investment at age 25 vs 35: 10 extra years can double retirement savings'
      ],
      commonMistakes: [
        'Not starting early enough to benefit from compounding',
        'Withdrawing investment gains instead of reinvesting',
        'Focusing on interest rate while ignoring fees',
        'Not comparing APR vs APY correctly',
        'Underestimating the power of consistent small investments'
      ],
      reward: 120,
      completed: false,
      difficulty: 'beginner',
      estimatedTime: '20 minutes'
    },
    {
      id: '4',
      title: 'Debit vs Credit: Smart Payment Strategies',
      category: 'products',
      content: 'Debit cards use your own money directly from your bank account, while credit cards let you borrow money that you must pay back later.',
      keyPoints: [
        'Debit cards prevent overspending but offer less protection',
        'Credit cards provide fraud protection and build credit history',
        'Credit utilization affects your credit score',
        'Payment timing impacts interest charges',
        'Different cards offer different rewards and benefits'
      ],
      practicalTips: [
        'Use credit cards for online purchases for better protection',
        'Keep credit utilization below 30% of limit',
        'Pay credit card balances in full each month',
        'Use debit cards for cash withdrawals and small purchases',
        'Monitor both accounts regularly for unauthorized transactions'
      ],
      realExamples: [
        'Online shopping: Credit card offers dispute protection if merchant doesn\'t deliver',
        'ATM withdrawals: Debit card avoids cash advance fees that credit cards charge',
        'Building credit: Responsible credit card use improves credit score for future loans'
      ],
      commonMistakes: [
        'Using credit cards like free money',
        'Only making minimum payments on credit cards',
        'Not monitoring credit utilization ratio',
        'Using debit cards for online purchases without protection',
        'Not taking advantage of credit card rewards and benefits'
      ],
      reward: 100,
      completed: false,
      difficulty: 'beginner',
      estimatedTime: '15 minutes'
    },
    {
      id: '5',
      title: 'Advanced Investment Portfolio Diversification',
      category: 'advanced',
      content: 'Diversification spreads investment risk across different asset classes, sectors, and geographic regions to protect against market volatility.',
      keyPoints: [
        'Don\'t put all eggs in one basket',
        'Asset allocation should match risk tolerance and timeline',
        'Geographic diversification reduces country-specific risks',
        'Sector diversification protects against industry downturns',
        'Rebalancing maintains target allocation percentages'
      ],
      practicalTips: [
        'Use index funds for instant diversification',
        'Allocate across stocks, bonds, real estate, commodities',
        'Consider international markets for geographic diversity',
        'Rebalance portfolio quarterly or when allocations drift 5%+',
        'Adjust allocation as you age (more conservative over time)'
      ],
      realExamples: [
        'Young investor (25): 80% stocks, 15% bonds, 5% alternatives',
        'Mid-career (40): 60% stocks, 30% bonds, 10% real estate',
        'Pre-retirement (55): 40% stocks, 50% bonds, 10% cash/alternatives'
      ],
      commonMistakes: [
        'Over-concentrating in familiar companies or sectors',
        'Chasing last year\'s best-performing investments',
        'Not rebalancing when allocations drift significantly',
        'Ignoring correlation between different investments',
        'Making emotional decisions during market volatility'
      ],
      reward: 250,
      completed: false,
      difficulty: 'advanced',
      estimatedTime: '30 minutes'
    },
    {
      id: '6',
      title: 'Smart Borrowing and Debt Management',
      category: 'planning',
      content: 'Smart borrowing involves understanding different types of debt, interest rates, and repayment strategies to minimize costs and build wealth.',
      keyPoints: [
        'Good debt helps build wealth (mortgages, education loans)',
        'Bad debt drains wealth (high-interest consumer debt)',
        'Debt-to-income ratio should stay below 36%',
        'Interest rates vary significantly between loan types',
        'Early repayment can save thousands in interest'
      ],
      practicalTips: [
        'Pay off highest interest rate debts first',
        'Consider debt consolidation for multiple high-rate debts',
        'Make extra principal payments when possible',
        'Shop around for best interest rates and terms',
        'Understand all fees and penalties before borrowing'
      ],
      realExamples: [
        'Mortgage at 8% APR vs personal loan at 18% APR: prioritize personal loan payoff',
        'Student loan at 6% vs investment return at 8%: invest while making minimum payments',
        'Credit card debt at 24% APR: pay off immediately before any other investments'
      ],
      commonMistakes: [
        'Only making minimum payments on high-interest debt',
        'Not shopping around for better interest rates',
        'Using home equity for consumer purchases',
        'Ignoring loan fees and penalties',
        'Not having a clear debt payoff strategy'
      ],
      reward: 180,
      completed: false,
      difficulty: 'intermediate',
      estimatedTime: '25 minutes'
    }
  ];

  const loanProducts: LoanProduct[] = [
    {
      id: '1',
      name: 'Personal Loan',
      type: 'personal',
      interestRate: 15.5,
      maxAmount: 500000000,
      term: '1-5 years',
      requirements: ['Stable income for 6+ months', 'Credit score 650+', 'Debt-to-income < 40%'],
      pros: ['No collateral required', 'Quick approval process', 'Flexible use of funds'],
      cons: ['Higher interest rates', 'Shorter repayment terms', 'Strict income requirements'],
      bestFor: 'Debt consolidation, emergency expenses, home improvements',
      realExample: 'Borrow 100M VND at 15.5% for 3 years = monthly payment 3.5M VND, total interest 26M VND'
    },
    {
      id: '2',
      name: 'Home Mortgage',
      type: 'mortgage',
      interestRate: 8.2,
      maxAmount: 5000000000,
      term: '15-30 years',
      requirements: ['20% down payment', 'Stable employment 2+ years', 'Debt-to-income < 28%'],
      pros: ['Lower interest rates', 'Long repayment terms', 'Tax deductions available'],
      cons: ['Requires large down payment', 'Property as collateral', 'Closing costs and fees'],
      bestFor: 'Purchasing primary residence or investment property',
      realExample: 'Borrow 2B VND at 8.2% for 20 years = monthly payment 16.8M VND, total interest 2.03B VND'
    },
    {
      id: '3',
      name: 'Auto Loan',
      type: 'auto',
      interestRate: 12.0,
      maxAmount: 1500000000,
      term: '3-7 years',
      requirements: ['Valid driver license', 'Insurance coverage', 'Stable income'],
      pros: ['Lower rates than personal loans', 'Vehicle as collateral', 'Build credit history'],
      cons: ['Vehicle depreciates rapidly', 'Gap insurance needed', 'Repossession risk'],
      bestFor: 'Purchasing reliable transportation for work',
      realExample: 'Borrow 800M VND at 12% for 5 years = monthly payment 17.8M VND, total interest 267M VND'
    },
    {
      id: '4',
      name: 'Business Loan',
      type: 'business',
      interestRate: 10.5,
      maxAmount: 2000000000,
      term: '1-10 years',
      requirements: ['Business plan', '2+ years operation', 'Financial statements', 'Collateral'],
      pros: ['Lower rates for secured loans', 'Tax deductible interest', 'Build business credit'],
      cons: ['Strict qualification requirements', 'Personal guarantees often required', 'Collateral at risk'],
      bestFor: 'Business expansion, equipment purchase, working capital',
      realExample: 'Borrow 500M VND at 10.5% for 7 years = monthly payment 8.2M VND, total interest 192M VND'
    }
  ];

  const creditCards: CreditCard[] = [
    {
      id: '1',
      name: 'Vietcombank Basic Card',
      type: 'basic',
      apr: 24.0,
      annualFee: 0,
      rewards: 'No rewards program',
      benefits: ['No annual fee', 'Basic fraud protection', 'Online banking access'],
      requirements: ['Monthly income 8M+ VND', 'Age 18-65', 'Valid ID'],
      pros: ['No annual fee', 'Easy approval', 'Good for building credit'],
      cons: ['High APR', 'No rewards', 'Low credit limit'],
      bestFor: 'First-time credit card users, building credit history'
    },
    {
      id: '2',
      name: 'BIDV Rewards Card',
      type: 'rewards',
      apr: 22.5,
      annualFee: 500000,
      rewards: '1% cashback on all purchases, 2% on dining',
      benefits: ['Cashback rewards', 'Travel insurance', 'Purchase protection', 'Extended warranty'],
      requirements: ['Monthly income 15M+ VND', 'Good credit score', 'Bank relationship'],
      pros: ['Earn rewards on spending', 'Good benefits package', 'Moderate APR'],
      cons: ['Annual fee', 'Higher income requirement', 'Rewards caps'],
      bestFor: 'Regular spenders who pay balances in full'
    },
    {
      id: '3',
      name: 'Techcombank Premium Card',
      type: 'premium',
      apr: 20.0,
      annualFee: 2000000,
      rewards: '2% cashback, 3% on travel, 5% on luxury purchases',
      benefits: ['Airport lounge access', 'Concierge service', 'Premium travel insurance', 'No foreign transaction fees'],
      requirements: ['Monthly income 50M+ VND', 'Excellent credit', 'High net worth'],
      pros: ['Excellent rewards', 'Premium benefits', 'Lower APR', 'High credit limits'],
      cons: ['High annual fee', 'Strict requirements', 'Temptation to overspend'],
      bestFor: 'High-income individuals with significant spending'
    }
  ];

  useEffect(() => {
    const netFlow = cashFlowData.monthlyIncome - cashFlowData.fixedExpenses - cashFlowData.variableExpenses;
    setCashFlowData(prev => ({ ...prev, netCashFlow: netFlow }));
  }, [cashFlowData.monthlyIncome, cashFlowData.fixedExpenses, cashFlowData.variableExpenses]);

  const completeLesson = (lessonId: string) => {
    const lesson = bankingLessons.find(l => l.id === lessonId);
    if (lesson && !lesson.completed) {
      addCoins(lesson.reward);
      updateProgress({ 
        financialLiteracyScore: progress.financialLiteracyScore + (lesson.difficulty === 'advanced' ? 25 : lesson.difficulty === 'intermediate' ? 15 : 10)
      });
      
      // Mark lesson as completed
      const updatedLessons = bankingLessons.map(l => 
        l.id === lessonId ? { ...l, completed: true } : l
      );
    }
  };

  const renderLessons = () => (
    <div className="space-y-6">
      <div className="text-center">
        <BookOpen className="mx-auto mb-4 text-blue-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Banking & Finance Academy</h2>
        <p className="text-blue-200">Master essential banking and financial management skills</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bankingLessons.map(lesson => (
          <div key={lesson.id} className="bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-bold text-lg">{lesson.title}</h3>
                <div className="flex items-center space-x-3 mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    lesson.difficulty === 'beginner' ? 'bg-green-500/30 text-green-200' :
                    lesson.difficulty === 'intermediate' ? 'bg-yellow-500/30 text-yellow-200' :
                    'bg-red-500/30 text-red-200'
                  }`}>
                    {lesson.difficulty.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    lesson.category === 'basics' ? 'bg-blue-500/30 text-blue-200' :
                    lesson.category === 'advanced' ? 'bg-purple-500/30 text-purple-200' :
                    lesson.category === 'products' ? 'bg-cyan-500/30 text-cyan-200' :
                    'bg-orange-500/30 text-orange-200'
                  }`}>
                    {lesson.category.toUpperCase()}
                  </span>
                  <div className="flex items-center space-x-1 text-purple-300">
                    <Clock size={12} />
                    <span className="text-xs">{lesson.estimatedTime}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 font-bold">+{lesson.reward}</div>
                <div className="text-yellow-200 text-sm">coins</div>
              </div>
            </div>
            
            <p className="text-purple-200 mb-4">{lesson.content}</p>
            
            <div className="space-y-4">
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                <h4 className="text-blue-300 font-medium text-sm mb-2">📚 Key Concepts:</h4>
                <ul className="text-blue-200 text-xs space-y-1">
                  {lesson.keyPoints.map((point, index) => (
                    <li key={index}>• {point}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                <h4 className="text-green-300 font-medium text-sm mb-2">💡 Practical Tips:</h4>
                <ul className="text-green-200 text-xs space-y-1">
                  {lesson.practicalTips.map((tip, index) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                <h4 className="text-yellow-300 font-medium text-sm mb-2">📊 Real Examples:</h4>
                <ul className="text-yellow-200 text-xs space-y-1">
                  {lesson.realExamples.map((example, index) => (
                    <li key={index}>• {example}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <h4 className="text-red-300 font-medium text-sm mb-2">⚠️ Common Mistakes:</h4>
                <ul className="text-red-200 text-xs space-y-1">
                  {lesson.commonMistakes.map((mistake, index) => (
                    <li key={index}>• {mistake}</li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => completeLesson(lesson.id)}
              disabled={lesson.completed}
              className={`w-full mt-4 py-3 rounded-lg font-semibold transition-colors ${
                lesson.completed
                  ? 'bg-green-500/30 text-green-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700'
              }`}
            >
              {lesson.completed ? 'Completed ✓' : `Complete Lesson (+${lesson.reward} coins)`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBudgeting = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Calculator className="mx-auto mb-4 text-green-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Smart Budgeting System</h2>
        <p className="text-green-200">Master the 50/30/20 rule and optimize your spending</p>
      </div>

      {/* Budget Overview */}
      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold text-xl">Monthly Budget Analysis</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">{budget.income.toLocaleString()} VND</div>
            <div className="text-green-200 text-sm">Monthly Income</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {budget.categories.map((category, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium">{category.name}</h4>
                <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-200">Allocated:</span>
                  <span className="text-white">{category.allocated.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-purple-200">Spent:</span>
                  <span className={category.spent > category.allocated ? 'text-red-400' : 'text-white'}>
                    {category.spent.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-purple-200">Remaining:</span>
                  <span className={category.remaining < 0 ? 'text-red-400' : 'text-green-400'}>
                    {category.remaining.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="w-full bg-gray-700/30 rounded-full h-2 mb-3">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    category.spent > category.allocated ? 'bg-red-400' : category.color
                  }`}
                  style={{ width: `${Math.min((category.spent / category.allocated) * 100, 100)}%` }}
                />
              </div>

              <div className="bg-white/5 rounded p-2">
                <h5 className="text-white text-xs font-medium mb-1">💡 Tips:</h5>
                <ul className="text-purple-200 text-xs space-y-1">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-blue-300 font-semibold mb-3">📊 Budget Health Analysis:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {Math.round((budget.categories.reduce((sum, cat) => sum + cat.spent, 0) / budget.income) * 100)}%
              </div>
              <div className="text-blue-200 text-sm">Income Utilized</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {budget.categories.filter(cat => cat.remaining >= 0).length}
              </div>
              <div className="text-green-200 text-sm">Categories On Track</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {Math.round((budget.categories.find(cat => cat.name === 'Savings')?.spent || 0) / budget.income * 100)}%
              </div>
              <div className="text-purple-200 text-sm">Savings Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Optimization Tips */}
      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-semibold text-xl mb-4">Budget Optimization Strategies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-green-300 font-medium">✅ What You're Doing Well:</h4>
            <ul className="text-green-200 text-sm space-y-2">
              <li>• Maintaining emergency fund allocation</li>
              <li>• Keeping housing costs reasonable (32% of income)</li>
              <li>• Saving 16% of income (above recommended 20%)</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-red-300 font-medium">⚠️ Areas for Improvement:</h4>
            <ul className="text-red-200 text-sm space-y-2">
              <li>• Entertainment spending is 25% over budget</li>
              <li>• Consider reducing dining out expenses</li>
              <li>• Look for ways to increase income streams</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCashFlow = () => (
    <div className="space-y-6">
      <div className="text-center">
        <BarChart3 className="mx-auto mb-4 text-purple-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Cash Flow Management</h2>
        <p className="text-purple-200">Understand and optimize your money flow</p>
      </div>

      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-semibold text-xl mb-6">Interactive Cash Flow Calculator</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">Monthly Income (VND)</label>
              <input
                type="number"
                value={cashFlowData.monthlyIncome}
                onChange={(e) => setCashFlowData(prev => ({ ...prev, monthlyIncome: Number(e.target.value) }))}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-blue-400 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Fixed Expenses (VND)</label>
              <input
                type="number"
                value={cashFlowData.fixedExpenses}
                onChange={(e) => setCashFlowData(prev => ({ ...prev, fixedExpenses: Number(e.target.value) }))}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-blue-400 focus:outline-none"
              />
              <p className="text-purple-300 text-sm mt-1">Rent, utilities, insurance, loan payments</p>
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Variable Expenses (VND)</label>
              <input
                type="number"
                value={cashFlowData.variableExpenses}
                onChange={(e) => setCashFlowData(prev => ({ ...prev, variableExpenses: Number(e.target.value) }))}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-blue-400 focus:outline-none"
              />
              <p className="text-purple-300 text-sm mt-1">Food, entertainment, shopping, transport</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3">Cash Flow Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-purple-200">Total Income:</span>
                  <span className="text-green-400 font-semibold">{cashFlowData.monthlyIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Total Expenses:</span>
                  <span className="text-red-400 font-semibold">
                    {(cashFlowData.fixedExpenses + cashFlowData.variableExpenses).toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-white/20 pt-2">
                  <div className="flex justify-between">
                    <span className="text-purple-200 font-semibold">Net Cash Flow:</span>
                    <span className={`font-bold ${cashFlowData.netCashFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {cashFlowData.netCashFlow.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`rounded-lg p-4 border ${
              cashFlowData.netCashFlow >= 0 
                ? 'bg-green-500/20 border-green-500/30' 
                : 'bg-red-500/20 border-red-500/30'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                cashFlowData.netCashFlow >= 0 ? 'text-green-300' : 'text-red-300'
              }`}>
                {cashFlowData.netCashFlow >= 0 ? '✅ Healthy Cash Flow' : '⚠️ Negative Cash Flow'}
              </h4>
              <p className={`text-sm ${
                cashFlowData.netCashFlow >= 0 ? 'text-green-200' : 'text-red-200'
              }`}>
                {cashFlowData.netCashFlow >= 0 
                  ? 'You have surplus money for savings and investments. Consider increasing your savings rate or exploring investment opportunities.'
                  : 'You\'re spending more than you earn. Review your expenses and look for areas to cut back or ways to increase income.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLoanProducts = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CreditCard className="mx-auto mb-4 text-orange-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Loan Products & Credit Cards</h2>
        <p className="text-orange-200">Compare and understand different financial products</p>
      </div>

      {/* Loan Products */}
      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-semibold text-xl mb-6">Available Loan Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loanProducts.map(loan => (
            <div key={loan.id} className="bg-white/5 rounded-lg p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-bold text-lg">{loan.name}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  loan.type === 'personal' ? 'bg-red-500/30 text-red-200' :
                  loan.type === 'mortgage' ? 'bg-green-500/30 text-green-200' :
                  loan.type === 'auto' ? 'bg-blue-500/30 text-blue-200' :
                  loan.type === 'business' ? 'bg-purple-500/30 text-purple-200' :
                  'bg-yellow-500/30 text-yellow-200'
                }`}>
                  {loan.type.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-purple-200 text-sm">Interest Rate:</span>
                  <div className="text-white font-semibold">{loan.interestRate}% APR</div>
                </div>
                <div>
                  <span className="text-purple-200 text-sm">Max Amount:</span>
                  <div className="text-white font-semibold">{(loan.maxAmount / 1000000).toFixed(0)}M VND</div>
                </div>
                <div>
                  <span className="text-purple-200 text-sm">Term:</span>
                  <div className="text-white font-semibold">{loan.term}</div>
                </div>
                <div>
                  <span className="text-purple-200 text-sm">Best For:</span>
                  <div className="text-white font-semibold text-xs">{loan.bestFor}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-blue-500/20 border border-blue-500/30 rounded p-3">
                  <h5 className="text-blue-300 font-medium text-sm mb-1">Requirements:</h5>
                  <ul className="text-blue-200 text-xs space-y-1">
                    {loan.requirements.map((req, index) => (
                      <li key={index}>• {req}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-500/20 border border-green-500/30 rounded p-2">
                    <h5 className="text-green-300 font-medium text-xs mb-1">Pros:</h5>
                    <ul className="text-green-200 text-xs space-y-1">
                      {loan.pros.map((pro, index) => (
                        <li key={index}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-500/20 border border-red-500/30 rounded p-2">
                    <h5 className="text-red-300 font-medium text-xs mb-1">Cons:</h5>
                    <ul className="text-red-200 text-xs space-y-1">
                      {loan.cons.map((con, index) => (
                        <li key={index}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded p-3">
                  <h5 className="text-yellow-300 font-medium text-sm mb-1">Real Example:</h5>
                  <p className="text-yellow-200 text-xs">{loan.realExample}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Credit Cards */}
      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-semibold text-xl mb-6">Credit Card Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creditCards.map(card => (
            <div key={card.id} className="bg-white/5 rounded-lg p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-bold">{card.name}</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  card.type === 'basic' ? 'bg-gray-500/30 text-gray-200' :
                  card.type === 'rewards' ? 'bg-green-500/30 text-green-200' :
                  card.type === 'premium' ? 'bg-purple-500/30 text-purple-200' :
                  'bg-blue-500/30 text-blue-200'
                }`}>
                  {card.type.toUpperCase()}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-purple-200 text-sm">APR:</span>
                  <span className="text-white font-semibold">{card.apr}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200 text-sm">Annual Fee:</span>
                  <span className="text-white font-semibold">
                    {card.annualFee === 0 ? 'Free' : `${card.annualFee.toLocaleString()} VND`}
                  </span>
                </div>
                <div>
                  <span className="text-purple-200 text-sm">Rewards:</span>
                  <div className="text-white text-sm">{card.rewards}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-blue-500/20 border border-blue-500/30 rounded p-2">
                  <h5 className="text-blue-300 font-medium text-xs mb-1">Benefits:</h5>
                  <ul className="text-blue-200 text-xs space-y-1">
                    {card.benefits.slice(0, 3).map((benefit, index) => (
                      <li key={index}>• {benefit}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-500/20 border border-green-500/30 rounded p-2">
                  <h5 className="text-green-300 font-medium text-xs mb-1">Best For:</h5>
                  <p className="text-green-200 text-xs">{card.bestFor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
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
          { id: 'lessons', name: 'Banking Academy', icon: BookOpen, color: 'from-blue-500 to-cyan-500', description: 'Learn essential banking concepts' },
          { id: 'budgeting', name: 'Smart Budgeting', icon: Calculator, color: 'from-green-500 to-emerald-500', description: 'Master the 50/30/20 rule' },
          { id: 'cashflow', name: 'Cash Flow Manager', icon: BarChart3, color: 'from-purple-500 to-pink-500', description: 'Optimize money flow' },
          { id: 'products', name: 'Financial Products', icon: CreditCard, color: 'from-orange-500 to-red-500', description: 'Compare loans and cards' }
        ].map(game => (
          <button
            key={game.id}
            onClick={() => setActiveGame(game.id as any)}
            className="group relative overflow-hidden rounded-xl border-2 border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
            <div className="relative p-6 bg-white/10 backdrop-blur-lg">
              <game.icon className="text-white mb-3" size={32} />
              <h3 className="text-white font-bold text-lg mb-2">{game.name}</h3>
              <p className="text-purple-200 text-sm">{game.description}</p>
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
            <div className="text-2xl font-bold text-green-400">{bankingLessons.filter(l => l.completed).length}</div>
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
      case 'budgeting':
        return renderBudgeting();
      case 'cashflow':
        return renderCashFlow();
      case 'products':
        return renderLoanProducts();
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
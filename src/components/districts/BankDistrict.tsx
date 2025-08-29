import React, { useState } from 'react';
import { ArrowLeft, Building2, Calculator, PiggyBank, TrendingUp, BookOpen, Play, Coins, Target, CreditCard, Percent, DollarSign, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

interface BankDistrictProps {
  onBack: () => void;
}

interface LoanProduct {
  id: string;
  name: string;
  type: 'personal' | 'mortgage' | 'auto' | 'business';
  apr: number;
  minAmount: number;
  maxAmount: number;
  term: string;
  requirements: string[];
  pros: string[];
  cons: string[];
}

interface BudgetCategory {
  name: string;
  allocated: number;
  spent: number;
  limit: number;
  essential: boolean;
}

export const BankDistrict: React.FC<BankDistrictProps> = ({ onBack }) => {
  const { progress, addCoins, updateProgress } = useUser();
  const [activeGame, setActiveGame] = useState<'overview' | 'savings' | 'loans' | 'budget' | 'cashflow' | 'lessons'>('overview');
  const [savingsAccount, setSavingsAccount] = useState({
    balance: 500,
    monthlyDeposit: 100,
    interestRate: 2.5,
    term: 12
  });
  
  const [budgetData, setBudgetData] = useState<BudgetCategory[]>([
    { name: 'Housing', allocated: 1200, spent: 1150, limit: 1300, essential: true },
    { name: 'Food', allocated: 400, spent: 380, limit: 450, essential: true },
    { name: 'Transportation', allocated: 200, spent: 180, limit: 250, essential: true },
    { name: 'Entertainment', allocated: 150, spent: 200, limit: 200, essential: false },
    { name: 'Shopping', allocated: 100, spent: 120, limit: 150, essential: false },
    { name: 'Emergency Fund', allocated: 200, spent: 0, limit: 200, essential: true }
  ]);

  const [cashFlowData, setCashFlowData] = useState({
    monthlyIncome: 3000,
    fixedExpenses: 1800,
    variableExpenses: 800,
    savings: 400,
    investments: 0
  });

  const loanProducts: LoanProduct[] = [
    {
      id: '1',
      name: 'Personal Loan',
      type: 'personal',
      apr: 12.5,
      minAmount: 1000,
      maxAmount: 50000,
      term: '1-5 years',
      requirements: ['Stable income', 'Credit score 650+', 'Employment history'],
      pros: ['Quick approval', 'No collateral needed', 'Flexible use'],
      cons: ['Higher interest rates', 'Shorter repayment terms', 'Affects credit score']
    },
    {
      id: '2',
      name: 'Home Mortgage',
      type: 'mortgage',
      apr: 6.8,
      minAmount: 100000,
      maxAmount: 1000000,
      term: '15-30 years',
      requirements: ['20% down payment', 'Debt-to-income ratio <43%', 'Property appraisal'],
      pros: ['Lower interest rates', 'Tax deductions', 'Build equity'],
      cons: ['Large down payment', 'Long-term commitment', 'Property risk']
    },
    {
      id: '3',
      name: 'Auto Loan',
      type: 'auto',
      apr: 8.2,
      minAmount: 5000,
      maxAmount: 80000,
      term: '3-7 years',
      requirements: ['Proof of income', 'Insurance coverage', 'Vehicle inspection'],
      pros: ['Lower rates than personal loans', 'Build credit history', 'Keep transportation'],
      cons: ['Vehicle depreciation', 'Gap insurance needed', 'Repossession risk']
    },
    {
      id: '4',
      name: 'Business Loan',
      type: 'business',
      apr: 9.5,
      minAmount: 10000,
      maxAmount: 500000,
      term: '1-10 years',
      requirements: ['Business plan', 'Financial statements', 'Collateral'],
      pros: ['Grow business', 'Tax benefits', 'Build business credit'],
      cons: ['Personal guarantees', 'Complex approval', 'Business risk']
    }
  ];

  const financialLessons = [
    {
      id: '1',
      title: 'Understanding Cash Flow',
      content: 'Cash flow is the movement of money in and out of your accounts. Positive cash flow means you earn more than you spend.',
      tips: [
        'Track all income sources monthly',
        'Categorize expenses as fixed vs variable',
        'Aim for 20% positive cash flow',
        'Use cash flow to predict future financial health'
      ],
      reward: 50,
      completed: false
    },
    {
      id: '2',
      title: 'Working Capital Management',
      content: 'Working capital is the difference between current assets and current liabilities. It shows your short-term financial health.',
      tips: [
        'Maintain 3-6 months of expenses in emergency fund',
        'Keep liquid assets for unexpected opportunities',
        'Don\'t tie up all money in long-term investments',
        'Monitor working capital ratio monthly'
      ],
      reward: 75,
      completed: false
    },
    {
      id: '3',
      title: 'Interest Types & Calculations',
      content: 'Simple interest is calculated on principal only. Compound interest includes interest on previously earned interest.',
      tips: [
        'Compound interest works for you in savings',
        'Compound interest works against you in debt',
        'Start investing early to maximize compounding',
        'Understand APR vs APY differences'
      ],
      reward: 60,
      completed: false
    },
    {
      id: '4',
      title: 'Debit vs Credit Cards',
      content: 'Debit cards use your own money immediately. Credit cards let you borrow money that must be repaid.',
      tips: [
        'Use debit for daily expenses to avoid debt',
        'Use credit cards for building credit history',
        'Pay credit card balances in full monthly',
        'Monitor both account types for fraud'
      ],
      reward: 40,
      completed: false
    },
    {
      id: '5',
      title: 'Banking Product Diversity',
      content: 'Banks offer various products: checking, savings, CDs, money market accounts, loans, and investment services.',
      tips: [
        'Compare interest rates across banks',
        'Understand fees and minimum balances',
        'Use multiple products strategically',
        'Read all terms and conditions carefully'
      ],
      reward: 55,
      completed: false
    }
  ];

  const calculateSavingsGrowth = () => {
    const { balance, monthlyDeposit, interestRate, term } = savingsAccount;
    const monthlyRate = interestRate / 100 / 12;
    let futureValue = balance;
    
    for (let month = 0; month < term; month++) {
      futureValue = (futureValue + monthlyDeposit) * (1 + monthlyRate);
    }
    
    return Math.round(futureValue);
  };

  const calculateLoanPayment = (principal: number, apr: number, years: number) => {
    const monthlyRate = apr / 100 / 12;
    const numPayments = years * 12;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    return Math.round(monthlyPayment);
  };

  const completeLesson = (lessonId: string, reward: number) => {
    addCoins(reward);
    updateProgress({
      financialLiteracyScore: progress.financialLiteracyScore + 15
    });
  };

  const renderSavingsGame = () => (
    <div className="space-y-6">
      <div className="text-center">
        <PiggyBank className="mx-auto mb-4 text-blue-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Savings Growth Simulator</h2>
        <p className="text-blue-200">See how your money grows with compound interest!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4">Savings Parameters</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-blue-200 text-sm mb-2">Initial Balance</label>
              <input
                type="number"
                value={savingsAccount.balance}
                onChange={(e) => setSavingsAccount(prev => ({ ...prev, balance: Number(e.target.value) }))}
                className="w-full px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-blue-200 text-sm mb-2">Monthly Deposit</label>
              <input
                type="number"
                value={savingsAccount.monthlyDeposit}
                onChange={(e) => setSavingsAccount(prev => ({ ...prev, monthlyDeposit: Number(e.target.value) }))}
                className="w-full px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-blue-200 text-sm mb-2">Annual Interest Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={savingsAccount.interestRate}
                onChange={(e) => setSavingsAccount(prev => ({ ...prev, interestRate: Number(e.target.value) }))}
                className="w-full px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-blue-200 text-sm mb-2">Time Period (months)</label>
              <input
                type="number"
                value={savingsAccount.term}
                onChange={(e) => setSavingsAccount(prev => ({ ...prev, term: Number(e.target.value) }))}
                className="w-full px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4">Growth Projection</h3>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                ${calculateSavingsGrowth().toLocaleString()}
              </div>
              <p className="text-green-200 text-sm">Final Balance</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-200">Total Deposits:</span>
                <span className="text-white">${(savingsAccount.balance + (savingsAccount.monthlyDeposit * savingsAccount.term)).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Interest Earned:</span>
                <span className="text-green-400">${(calculateSavingsGrowth() - savingsAccount.balance - (savingsAccount.monthlyDeposit * savingsAccount.term)).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-blue-200">Growth Rate:</span>
                <span className="text-green-400">
                  {(((calculateSavingsGrowth() - savingsAccount.balance - (savingsAccount.monthlyDeposit * savingsAccount.term)) / 
                    (savingsAccount.balance + (savingsAccount.monthlyDeposit * savingsAccount.term))) * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                addCoins(100);
                updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 10 });
              }}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-colors"
            >
              Start Savings Plan (+100 coins)
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLoanGame = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Calculator className="mx-auto mb-4 text-purple-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Smart Borrowing Center</h2>
        <p className="text-purple-200">Learn about different loan types and make informed decisions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loanProducts.map(loan => (
          <div key={loan.id} className="bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">{loan.name}</h3>
              <span className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-sm">
                {loan.apr}% APR
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Amount Range:</span>
                <span className="text-white">${loan.minAmount.toLocaleString()} - ${loan.maxAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Term:</span>
                <span className="text-white">{loan.term}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Monthly Payment (50k):</span>
                <span className="text-white">${calculateLoanPayment(50000, loan.apr, 5).toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-green-300 font-medium text-sm mb-1">Pros:</h4>
                <ul className="text-green-200 text-xs space-y-1">
                  {loan.pros.map((pro, index) => (
                    <li key={index}>• {pro}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-red-300 font-medium text-sm mb-1">Cons:</h4>
                <ul className="text-red-200 text-xs space-y-1">
                  {loan.cons.map((con, index) => (
                    <li key={index}>• {con}</li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => {
                addCoins(75);
                updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 12 });
              }}
              className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors"
            >
              Learn More (+75 coins)
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBudgetGame = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Target className="mx-auto mb-4 text-green-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Budget Master Challenge</h2>
        <p className="text-green-200">Balance your spending across different categories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4">Monthly Budget Breakdown</h3>
          <div className="space-y-4">
            {budgetData.map((category, index) => {
              const percentage = (category.spent / category.limit) * 100;
              const isOverBudget = category.spent > category.limit;
              const isNearLimit = percentage > 80 && !isOverBudget;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${category.essential ? 'text-blue-200' : 'text-purple-200'}`}>
                      {category.name}
                    </span>
                    <span className={`text-sm ${
                      isOverBudget ? 'text-red-400' : 
                      isNearLimit ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      ${category.spent}/${category.limit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700/30 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isOverBudget ? 'bg-red-400' :
                        isNearLimit ? 'bg-yellow-400' : 'bg-green-400'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  {isOverBudget && (
                    <div className="flex items-center space-x-1 text-red-300 text-xs">
                      <AlertCircle size={12} />
                      <span>Over budget by ${category.spent - category.limit}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4">Budget Analysis</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  ${budgetData.reduce((sum, cat) => sum + cat.allocated, 0)}
                </div>
                <p className="text-green-200 text-sm">Total Budget</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  ${budgetData.reduce((sum, cat) => sum + cat.spent, 0)}
                </div>
                <p className="text-blue-200 text-sm">Total Spent</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Budget Tips:</h4>
              <ul className="text-purple-200 text-sm space-y-2">
                <li>• Follow the 50/30/20 rule: 50% needs, 30% wants, 20% savings</li>
                <li>• Track expenses daily to avoid overspending</li>
                <li>• Prioritize essential categories first</li>
                <li>• Build an emergency fund before discretionary spending</li>
                <li>• Review and adjust budget monthly</li>
              </ul>
            </div>

            <button
              onClick={() => {
                addCoins(120);
                updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 15 });
              }}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-colors"
            >
              Optimize Budget (+120 coins)
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCashFlowGame = () => (
    <div className="space-y-6">
      <div className="text-center">
        <TrendingUp className="mx-auto mb-4 text-cyan-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Cash Flow Management</h2>
        <p className="text-cyan-200">Master the art of money flow optimization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4">Income Sources</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-cyan-200">Primary Job:</span>
              <span className="text-white">${cashFlowData.monthlyIncome.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-200">Side Hustle:</span>
              <span className="text-white">$500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-200">Investments:</span>
              <span className="text-white">$200</span>
            </div>
            <div className="border-t border-white/20 pt-2">
              <div className="flex justify-between font-semibold">
                <span className="text-cyan-200">Total Income:</span>
                <span className="text-green-400">${(cashFlowData.monthlyIncome + 700).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4">Expenses</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-red-200">Fixed Expenses:</span>
              <span className="text-white">${cashFlowData.fixedExpenses.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-200">Variable Expenses:</span>
              <span className="text-white">${cashFlowData.variableExpenses.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">Savings:</span>
              <span className="text-white">${cashFlowData.savings.toLocaleString()}</span>
            </div>
            <div className="border-t border-white/20 pt-2">
              <div className="flex justify-between font-semibold">
                <span className="text-red-200">Total Outflow:</span>
                <span className="text-red-400">${(cashFlowData.fixedExpenses + cashFlowData.variableExpenses + cashFlowData.savings).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4">Cash Flow Analysis</h3>
          <div className="space-y-4">
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${
                (cashFlowData.monthlyIncome + 700) - (cashFlowData.fixedExpenses + cashFlowData.variableExpenses + cashFlowData.savings) > 0
                  ? 'text-green-400' : 'text-red-400'
              }`}>
                ${((cashFlowData.monthlyIncome + 700) - (cashFlowData.fixedExpenses + cashFlowData.variableExpenses + cashFlowData.savings)).toLocaleString()}
              </div>
              <p className="text-purple-200 text-sm">Net Cash Flow</p>
            </div>

            <div className="bg-white/5 rounded-lg p-3">
              <h4 className="text-white font-medium mb-2">Recommendations:</h4>
              <ul className="text-purple-200 text-sm space-y-1">
                <li>• Increase emergency fund to 6 months expenses</li>
                <li>• Consider investing surplus cash flow</li>
                <li>• Review variable expenses for optimization</li>
                <li>• Explore additional income streams</li>
              </ul>
            </div>

            <button
              onClick={() => {
                addCoins(150);
                updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 20 });
              }}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-colors"
            >
              Optimize Cash Flow (+150 coins)
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLessons = () => (
    <div className="space-y-6">
      <div className="text-center">
        <BookOpen className="mx-auto mb-4 text-indigo-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Financial Education Center</h2>
        <p className="text-indigo-200">Master essential banking and financial concepts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {financialLessons.map(lesson => (
          <div key={lesson.id} className="bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">{lesson.title}</h3>
              <span className="bg-yellow-500/30 text-yellow-200 px-3 py-1 rounded-full text-sm">
                +{lesson.reward} coins
              </span>
            </div>
            
            <p className="text-purple-200 mb-4">{lesson.content}</p>
            
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-medium mb-2 flex items-center">
                <Info className="mr-2" size={16} />
                Key Tips:
              </h4>
              <ul className="text-purple-200 text-sm space-y-1">
                {lesson.tips.map((tip, index) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => completeLesson(lesson.id, lesson.reward)}
              disabled={lesson.completed}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                lesson.completed
                  ? 'bg-green-500/30 text-green-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
              }`}
            >
              {lesson.completed ? (
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle size={20} />
                  <span>Completed</span>
                </div>
              ) : (
                `Complete Lesson (+${lesson.reward} coins)`
              )}
            </button>
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
        <p className="text-blue-200">Master banking, loans, budgeting, and financial management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { id: 'savings', name: 'Savings Simulator', icon: PiggyBank, color: 'from-green-500 to-emerald-500', description: 'Learn compound interest' },
          { id: 'loans', name: 'Loan Center', icon: Calculator, color: 'from-purple-500 to-indigo-500', description: 'Smart borrowing decisions' },
          { id: 'budget', name: 'Budget Master', icon: Target, color: 'from-blue-500 to-cyan-500', description: 'Balance your spending' },
          { id: 'cashflow', name: 'Cash Flow Game', icon: TrendingUp, color: 'from-orange-500 to-red-500', description: 'Optimize money flow' }
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

      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-4">Available Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {financialLessons.slice(0, 3).map(lesson => (
            <div key={lesson.id} className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">{lesson.title}</h3>
              <p className="text-purple-200 text-sm mb-3">{lesson.content.substring(0, 80)}...</p>
              <button
                onClick={() => setActiveGame('lessons')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
              >
                Start Learning
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeGame) {
      case 'savings':
        return renderSavingsGame();
      case 'loans':
        return renderLoanGame();
      case 'budget':
        return renderBudgetGame();
      case 'cashflow':
        return renderCashFlowGame();
      case 'lessons':
        return renderLessons();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation */}
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
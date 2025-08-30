import React, { useState } from 'react';
import { ArrowLeft, Building2, Calculator, PiggyBank, TrendingUp, BookOpen, Play, Coins, Target, CreditCard, Percent, DollarSign, AlertCircle, CheckCircle, Info, Banknote, Wallet, Receipt, TrendingDown, BarChart3, PieChart } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

interface BankDistrictProps {
  onBack: () => void;
}

interface SavingsProduct {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'cd' | 'money_market';
  apy: number;
  minDeposit: number;
  features: string[];
  pros: string[];
  cons: string[];
  riskLevel: 'none' | 'low' | 'medium';
  liquidity: 'high' | 'medium' | 'low';
}

interface LoanProduct {
  id: string;
  name: string;
  type: 'personal' | 'mortgage' | 'auto' | 'business' | 'student';
  apr: number;
  minAmount: number;
  maxAmount: number;
  term: string;
  requirements: string[];
  pros: string[];
  cons: string[];
  collateral: boolean;
  creditScoreRequired: number;
}

interface BudgetCategory {
  name: string;
  allocated: number;
  spent: number;
  limit: number;
  essential: boolean;
  tips: string[];
}

interface FinancialLesson {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
  practicalTips: string[];
  commonMistakes: string[];
  realWorldExample: string;
  quiz: {
    question: string;
    options: { id: string; text: string; correct: boolean; explanation: string }[];
  };
  reward: number;
  completed: boolean;
}

export const BankDistrict: React.FC<BankDistrictProps> = ({ onBack }) => {
  const { progress, addCoins, updateProgress } = useUser();
  const [activeGame, setActiveGame] = useState<'overview' | 'savings' | 'loans' | 'budget' | 'cashflow' | 'lessons' | 'products'>('overview');
  const [savingsAccount, setSavingsAccount] = useState({
    balance: 500,
    monthlyDeposit: 100,
    interestRate: 2.5,
    term: 12,
    selectedProduct: 'savings'
  });
  
  const [budgetData, setBudgetData] = useState<BudgetCategory[]>([
    { 
      name: 'Housing', 
      allocated: 1200, 
      spent: 1150, 
      limit: 1300, 
      essential: true,
      tips: ['Negotiate rent annually', 'Consider roommates', 'Track utility usage', 'Compare housing costs']
    },
    { 
      name: 'Food & Groceries', 
      allocated: 400, 
      spent: 380, 
      limit: 450, 
      essential: true,
      tips: ['Meal planning saves 20%', 'Buy generic brands', 'Use grocery store apps', 'Cook at home more']
    },
    { 
      name: 'Transportation', 
      allocated: 200, 
      spent: 180, 
      limit: 250, 
      essential: true,
      tips: ['Use public transport', 'Carpool when possible', 'Maintain vehicle regularly', 'Compare fuel prices']
    },
    { 
      name: 'Entertainment', 
      allocated: 150, 
      spent: 200, 
      limit: 200, 
      essential: false,
      tips: ['Look for free events', 'Use streaming instead of cable', 'Group discounts', 'Happy hour deals']
    },
    { 
      name: 'Shopping', 
      allocated: 100, 
      spent: 120, 
      limit: 150, 
      essential: false,
      tips: ['Wait 24h before big purchases', 'Compare prices online', 'Use cashback apps', 'Buy during sales']
    },
    { 
      name: 'Emergency Fund', 
      allocated: 200, 
      spent: 0, 
      limit: 200, 
      essential: true,
      tips: ['Automate emergency savings', 'Keep in high-yield account', 'Don\'t touch unless emergency', 'Aim for 6 months expenses']
    }
  ]);

  const [cashFlowData, setCashFlowData] = useState({
    monthlyIncome: 3000,
    fixedExpenses: 1800,
    variableExpenses: 800,
    savings: 400,
    investments: 0,
    emergencyFund: 1200,
    workingCapital: 2000
  });

  const savingsProducts: SavingsProduct[] = [
    {
      id: '1',
      name: 'Basic Checking Account',
      type: 'checking',
      apy: 0.1,
      minDeposit: 0,
      features: ['Unlimited transactions', 'Debit card included', 'Online banking', 'Mobile app'],
      pros: ['No minimum balance', 'High liquidity', 'Easy access', 'No fees'],
      cons: ['Very low interest', 'No investment growth', 'Inflation risk'],
      riskLevel: 'none',
      liquidity: 'high'
    },
    {
      id: '2',
      name: 'High-Yield Savings',
      type: 'savings',
      apy: 4.5,
      minDeposit: 100,
      features: ['Competitive APY', 'FDIC insured', 'Online access', 'Automatic transfers'],
      pros: ['Higher interest rates', 'FDIC protection', 'Easy setup', 'Compound interest'],
      cons: ['Limited transactions', 'Online only', 'Rate can change'],
      riskLevel: 'none',
      liquidity: 'high'
    },
    {
      id: '3',
      name: '12-Month Certificate of Deposit',
      type: 'cd',
      apy: 5.2,
      minDeposit: 1000,
      features: ['Fixed interest rate', 'FDIC insured', 'Guaranteed returns', 'Automatic renewal'],
      pros: ['Guaranteed returns', 'Higher than savings', 'FDIC protection', 'Predictable income'],
      cons: ['Money locked up', 'Early withdrawal penalty', 'Inflation risk', 'Opportunity cost'],
      riskLevel: 'none',
      liquidity: 'low'
    },
    {
      id: '4',
      name: 'Money Market Account',
      type: 'money_market',
      apy: 3.8,
      minDeposit: 2500,
      features: ['Check writing', 'Debit card access', 'Tiered interest rates', 'FDIC insured'],
      pros: ['Higher interest than checking', 'Some liquidity', 'FDIC protection', 'Multiple access methods'],
      cons: ['High minimum balance', 'Limited transactions', 'Fees if below minimum', 'Variable rates'],
      riskLevel: 'low',
      liquidity: 'medium'
    }
  ];

  const loanProducts: LoanProduct[] = [
    {
      id: '1',
      name: 'Personal Loan',
      type: 'personal',
      apr: 12.5,
      minAmount: 1000,
      maxAmount: 50000,
      term: '2-7 years',
      requirements: ['Stable income for 2+ years', 'Credit score 650+', 'Debt-to-income ratio <40%'],
      pros: ['No collateral needed', 'Fixed interest rates', 'Predictable payments', 'Quick approval'],
      cons: ['Higher interest than secured loans', 'Origination fees', 'Affects credit utilization'],
      collateral: false,
      creditScoreRequired: 650
    },
    {
      id: '2',
      name: 'Home Mortgage',
      type: 'mortgage',
      apr: 6.8,
      minAmount: 100000,
      maxAmount: 1000000,
      term: '15-30 years',
      requirements: ['20% down payment', 'Credit score 620+', 'Stable employment', 'Property appraisal'],
      pros: ['Lower interest rates', 'Tax deductions', 'Build equity', 'Long repayment terms'],
      cons: ['Large down payment required', 'Closing costs', 'Property taxes', 'Foreclosure risk'],
      collateral: true,
      creditScoreRequired: 620
    },
    {
      id: '3',
      name: 'Auto Loan',
      type: 'auto',
      apr: 8.2,
      minAmount: 5000,
      maxAmount: 80000,
      term: '3-7 years',
      requirements: ['Proof of income', 'Auto insurance', 'Vehicle inspection', 'Credit score 580+'],
      pros: ['Lower rates than personal loans', 'Build credit history', 'Keep transportation'],
      cons: ['Vehicle depreciation', 'Gap insurance needed', 'Repossession risk'],
      collateral: true,
      creditScoreRequired: 580
    },
    {
      id: '4',
      name: 'Student Loan',
      type: 'student',
      apr: 5.5,
      minAmount: 1000,
      maxAmount: 200000,
      term: '10-25 years',
      requirements: ['Enrolled in accredited school', 'Satisfactory academic progress', 'FAFSA completion'],
      pros: ['Lower interest rates', 'Deferred payments while in school', 'Income-driven repayment', 'Potential forgiveness'],
      cons: ['Long repayment period', 'Interest accrues during school', 'Limited discharge options'],
      collateral: false,
      creditScoreRequired: 0
    },
    {
      id: '5',
      name: 'Business Loan',
      type: 'business',
      apr: 9.5,
      minAmount: 10000,
      maxAmount: 500000,
      term: '1-10 years',
      requirements: ['Business plan', 'Financial statements', 'Personal guarantee', 'Collateral'],
      pros: ['Grow business', 'Tax benefits', 'Build business credit', 'Retain ownership'],
      cons: ['Personal liability', 'Complex approval process', 'Business risk', 'Collateral requirements'],
      collateral: true,
      creditScoreRequired: 680
    }
  ];

  const financialLessons: FinancialLesson[] = [
    {
      id: '1',
      title: 'Understanding Cash Flow Management',
      content: 'Cash flow is the lifeblood of personal finance. It represents the movement of money in and out of your accounts over time. Positive cash flow means you earn more than you spend, while negative cash flow indicates spending exceeds income.',
      keyPoints: [
        'Cash flow = Total Income - Total Expenses',
        'Operating cash flow covers daily living expenses',
        'Free cash flow is money available for savings and investments',
        'Cash flow timing affects your ability to pay bills',
        'Seasonal variations can impact cash flow patterns'
      ],
      practicalTips: [
        'Track all income sources including side hustles and investments',
        'Categorize expenses as fixed (rent, insurance) vs variable (food, entertainment)',
        'Create a cash flow forecast for the next 3-6 months',
        'Build buffer for irregular expenses like car repairs',
        'Use cash flow analysis to identify spending patterns and optimization opportunities'
      ],
      commonMistakes: [
        'Focusing only on monthly totals without considering timing',
        'Ignoring irregular but predictable expenses',
        'Not accounting for tax obligations',
        'Mixing personal and business cash flows',
        'Failing to plan for seasonal income variations'
      ],
      realWorldExample: 'A freelance graphic designer earns $4,000 some months and $1,500 others. By tracking cash flow patterns, they discovered they needed $2,500 monthly to cover expenses and built a buffer fund for low-income months.',
      quiz: {
        question: 'If your monthly income is $3,000 and expenses are $2,800, what should you do with the $200 surplus?',
        options: [
          { id: 'a', text: 'Spend it on entertainment', correct: false, explanation: 'This doesn\'t build financial security or future wealth.' },
          { id: 'b', text: 'Save 50% and invest 50%', correct: true, explanation: 'Correct! Building both emergency savings and investments creates financial stability.' },
          { id: 'c', text: 'Save all of it', correct: false, explanation: 'While saving is good, some investment for growth is also important.' },
          { id: 'd', text: 'Invest all of it', correct: false, explanation: 'You need emergency savings before investing for liquidity.' }
        ]
      },
      reward: 100,
      completed: false
    },
    {
      id: '2',
      title: 'Working Capital and Liquidity Management',
      content: 'Working capital is your financial cushion - the difference between your liquid assets and short-term obligations. It ensures you can handle unexpected expenses without going into debt.',
      keyPoints: [
        'Working Capital = Current Assets - Current Liabilities',
        'Liquid assets include cash, savings, and easily convertible investments',
        'Current liabilities are debts due within one year',
        'Positive working capital indicates financial health',
        'Working capital ratio should be 1.2-2.0 for optimal balance'
      ],
      practicalTips: [
        'Maintain 3-6 months of expenses in emergency fund',
        'Keep some investments in liquid form (money market, short-term CDs)',
        'Don\'t tie up all money in long-term investments',
        'Monitor working capital ratio monthly',
        'Build working capital before taking on new debt'
      ],
      commonMistakes: [
        'Having too much cash earning low returns',
        'Investing emergency fund in illiquid assets',
        'Not accounting for irregular large expenses',
        'Borrowing for working capital needs',
        'Ignoring the opportunity cost of excess liquidity'
      ],
      realWorldExample: 'A young professional kept only $500 in savings while investing everything else. When their car needed $2,000 in repairs, they had to use credit cards at 18% interest instead of having liquid working capital.',
      quiz: {
        question: 'What\'s the ideal emergency fund size for someone with $2,500 monthly expenses?',
        options: [
          { id: 'a', text: '$2,500 (1 month)', correct: false, explanation: 'One month isn\'t enough for most emergencies.' },
          { id: 'b', text: '$7,500-15,000 (3-6 months)', correct: true, explanation: 'Correct! 3-6 months of expenses provides adequate emergency coverage.' },
          { id: 'c', text: '$25,000 (10 months)', correct: false, explanation: 'This might be too much cash earning low returns.' },
          { id: 'd', text: '$1,000 (fixed amount)', correct: false, explanation: 'Emergency funds should be based on your actual expenses.' }
        ]
      },
      reward: 120,
      completed: false
    },
    {
      id: '3',
      title: 'Interest Types and Compound Growth',
      content: 'Understanding how interest works is crucial for both saving and borrowing decisions. Simple interest is calculated only on the principal, while compound interest includes interest earned on previous interest.',
      keyPoints: [
        'Simple Interest = Principal × Rate × Time',
        'Compound Interest = Principal × (1 + Rate)^Time - Principal',
        'Compounding frequency affects total returns',
        'APY (Annual Percentage Yield) includes compounding effects',
        'Time is the most powerful factor in compound growth'
      ],
      practicalTips: [
        'Start investing early to maximize compounding time',
        'Choose accounts with daily or monthly compounding',
        'Reinvest dividends and interest for compound growth',
        'Understand APR vs APY when comparing products',
        'Use compound interest calculators for planning'
      ],
      commonMistakes: [
        'Confusing APR and APY when comparing accounts',
        'Not considering compounding frequency',
        'Withdrawing interest instead of reinvesting',
        'Underestimating the power of time in compounding',
        'Focusing only on interest rate without considering fees'
      ],
      realWorldExample: 'Two friends each save $200 monthly. Friend A puts it in a 0.1% checking account, Friend B in a 4% high-yield savings. After 10 years, Friend A has $24,120 while Friend B has $29,460 - a $5,340 difference!',
      quiz: {
        question: 'You invest $1,000 at 5% annual interest compounded annually. How much will you have after 2 years?',
        options: [
          { id: 'a', text: '$1,100', correct: false, explanation: 'This would be simple interest for only 1 year.' },
          { id: 'b', text: '$1,102.50', correct: true, explanation: 'Correct! Year 1: $1,050, Year 2: $1,102.50 with compound interest.' },
          { id: 'c', text: '$1,050', correct: false, explanation: 'This is only the first year\'s growth.' },
          { id: 'd', text: '$1,200', correct: false, explanation: 'This would be 20% growth, not 5% compounded.' }
        ]
      },
      reward: 110,
      completed: false
    },
    {
      id: '4',
      title: 'Debit vs Credit Cards: Strategic Usage',
      content: 'Debit and credit cards serve different purposes in financial management. Understanding when to use each can save money and build credit while avoiding debt traps.',
      keyPoints: [
        'Debit cards use your own money immediately',
        'Credit cards let you borrow money that must be repaid',
        'Credit cards offer better fraud protection',
        'Credit usage affects your credit score',
        'Interest charges apply if you carry a balance'
      ],
      practicalTips: [
        'Use debit for daily expenses to avoid overspending',
        'Use credit cards for online purchases (better fraud protection)',
        'Pay credit card balances in full each month',
        'Keep credit utilization below 30% of limit',
        'Use credit cards for building credit history'
      ],
      commonMistakes: [
        'Using credit cards like free money',
        'Only making minimum payments',
        'Ignoring credit utilization ratios',
        'Not monitoring statements for fraud',
        'Closing old credit cards (reduces credit history)'
      ],
      realWorldExample: 'Sarah uses her debit card for groceries and gas, but her credit card for online shopping and bills. She pays the credit card in full monthly, building excellent credit while earning 2% cashback on purchases.',
      quiz: {
        question: 'When is it better to use a credit card instead of a debit card?',
        options: [
          { id: 'a', text: 'When you don\'t have enough money in your account', correct: false, explanation: 'This leads to debt and interest charges.' },
          { id: 'b', text: 'For online purchases and building credit history', correct: true, explanation: 'Correct! Credit cards offer better fraud protection and help build credit when used responsibly.' },
          { id: 'c', text: 'For all purchases to earn rewards', correct: false, explanation: 'Only if you can pay in full monthly; otherwise interest negates rewards.' },
          { id: 'd', text: 'Never - debit is always better', correct: false, explanation: 'Credit cards have legitimate strategic uses when managed properly.' }
        ]
      },
      reward: 90,
      completed: false
    },
    {
      id: '5',
      title: 'Banking Product Diversity and Optimization',
      content: 'Banks offer various products designed for different financial needs. Understanding each product\'s purpose helps you optimize your financial strategy and minimize costs.',
      keyPoints: [
        'Checking accounts for daily transactions and bill payments',
        'Savings accounts for emergency funds and short-term goals',
        'CDs for guaranteed returns on money you won\'t need soon',
        'Money market accounts balance liquidity and returns',
        'Credit products help build credit and provide financing'
      ],
      practicalTips: [
        'Use multiple account types strategically',
        'Compare fees, minimums, and features across banks',
        'Automate transfers between accounts for optimization',
        'Review and optimize your banking setup annually',
        'Consider online banks for higher interest rates'
      ],
      commonMistakes: [
        'Using only one type of account for everything',
        'Not comparing options across different banks',
        'Paying unnecessary fees for basic services',
        'Keeping too much money in low-yield accounts',
        'Not taking advantage of bank bonuses and promotions'
      ],
      realWorldExample: 'Mike optimized his banking by using: checking for bills, high-yield savings for emergency fund, CD for house down payment savings, and rewards credit card for purchases. This strategy earned him an extra $800 annually in interest.',
      quiz: {
        question: 'What\'s the best account type for money you\'ll need in 6 months for a vacation?',
        options: [
          { id: 'a', text: 'Certificate of Deposit', correct: false, explanation: 'CDs have early withdrawal penalties for money needed soon.' },
          { id: 'b', text: 'High-yield savings account', correct: true, explanation: 'Correct! High-yield savings offers good returns with easy access for planned expenses.' },
          { id: 'c', text: 'Stock market investments', correct: false, explanation: 'Too risky for money needed in 6 months due to market volatility.' },
          { id: 'd', text: 'Basic checking account', correct: false, explanation: 'Checking accounts earn very little interest for 6-month savings.' }
        ]
      },
      reward: 85,
      completed: false
    },
    {
      id: '6',
      title: 'Advanced Budgeting: The 50/30/20 Rule',
      content: 'The 50/30/20 rule is a simple but effective budgeting framework that allocates your after-tax income into three categories: needs, wants, and savings/debt repayment.',
      keyPoints: [
        '50% for needs: housing, food, utilities, minimum debt payments',
        '30% for wants: entertainment, dining out, hobbies, non-essential shopping',
        '20% for savings and debt repayment above minimums',
        'Adjust percentages based on your financial goals',
        'Track spending to ensure you stay within each category'
      ],
      practicalTips: [
        'Calculate your after-tax income first',
        'List all expenses and categorize as needs vs wants',
        'Automate savings to ensure you hit the 20% target',
        'Review and adjust categories monthly',
        'Use budgeting apps to track spending in real-time'
      ],
      commonMistakes: [
        'Miscategorizing wants as needs',
        'Not accounting for irregular expenses',
        'Being too rigid when life circumstances change',
        'Ignoring the budget after creating it',
        'Not adjusting for income changes'
      ],
      realWorldExample: 'Lisa earns $4,000 monthly after taxes. She allocates $2,000 for needs (rent, groceries, utilities), $1,200 for wants (dining, entertainment), and $800 for savings and extra debt payments. This helped her pay off credit cards in 18 months.',
      quiz: {
        question: 'With $3,000 monthly after-tax income, how much should you allocate to savings using the 50/30/20 rule?',
        options: [
          { id: 'a', text: '$300', correct: false, explanation: 'This is only 10%, below the recommended 20%.' },
          { id: 'b', text: '$600', correct: true, explanation: 'Correct! 20% of $3,000 is $600 for savings and debt repayment.' },
          { id: 'c', text: '$900', correct: false, explanation: 'This is 30%, which should be allocated to wants.' },
          { id: 'd', text: '$1,500', correct: false, explanation: 'This is 50%, which should cover essential needs.' }
        ]
      },
      reward: 95,
      completed: false
    }
  ];

  const calculateSavingsGrowth = () => {
    const { balance, monthlyDeposit, interestRate, term, selectedProduct } = savingsAccount;
    const product = savingsProducts.find(p => p.id === selectedProduct);
    const actualRate = product ? product.apy : interestRate;
    const monthlyRate = actualRate / 100 / 12;
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
        <h2 className="text-2xl font-bold text-white mb-2">Advanced Savings & Investment Simulator</h2>
        <p className="text-blue-200">Compare different savings products and see your money grow!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4">Savings Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-blue-200 text-sm mb-2">Choose Savings Product</label>
              <select
                value={savingsAccount.selectedProduct}
                onChange={(e) => setSavingsAccount(prev => ({ ...prev, selectedProduct: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:border-blue-400 focus:outline-none"
              >
                {savingsProducts.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} - {product.apy}% APY
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-blue-200 text-sm mb-2">Initial Deposit</label>
              <input
                type="number"
                value={savingsAccount.balance}
                onChange={(e) => setSavingsAccount(prev => ({ ...prev, balance: Number(e.target.value) }))}
                className="w-full px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:border-blue-400 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-blue-200 text-sm mb-2">Monthly Contribution</label>
              <input
                type="number"
                value={savingsAccount.monthlyDeposit}
                onChange={(e) => setSavingsAccount(prev => ({ ...prev, monthlyDeposit: Number(e.target.value) }))}
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

            {/* Product Details */}
            {(() => {
              const selectedProduct = savingsProducts.find(p => p.id === savingsAccount.selectedProduct);
              return selectedProduct ? (
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">{selectedProduct.name} Features:</h4>
                  <ul className="text-blue-200 text-sm space-y-1">
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-blue-300">Min Deposit:</span>
                      <span className="text-white ml-1">${selectedProduct.minDeposit}</span>
                    </div>
                    <div>
                      <span className="text-blue-300">Liquidity:</span>
                      <span className="text-white ml-1">{selectedProduct.liquidity}</span>
                    </div>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4">Growth Projection & Analysis</h3>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                ${calculateSavingsGrowth().toLocaleString()}
              </div>
              <p className="text-green-200 text-sm">Final Balance</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-200">Total Contributions:</span>
                <span className="text-white">${(savingsAccount.balance + (savingsAccount.monthlyDeposit * savingsAccount.term)).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Interest Earned:</span>
                <span className="text-green-400">${(calculateSavingsGrowth() - savingsAccount.balance - (savingsAccount.monthlyDeposit * savingsAccount.term)).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-blue-200">Effective Growth Rate:</span>
                <span className="text-green-400">
                  {(((calculateSavingsGrowth() - savingsAccount.balance - (savingsAccount.monthlyDeposit * savingsAccount.term)) / 
                    (savingsAccount.balance + (savingsAccount.monthlyDeposit * savingsAccount.term))) * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Compound Interest Visualization */}
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Monthly Growth Breakdown</h4>
              <div className="space-y-2">
                {[3, 6, 12, 24].map(months => {
                  const tempAccount = { ...savingsAccount, term: months };
                  const tempGrowth = calculateSavingsGrowth();
                  return (
                    <div key={months} className="flex justify-between text-sm">
                      <span className="text-purple-200">After {months} months:</span>
                      <span className="text-white">${tempGrowth.toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => {
                addCoins(150);
                updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 20 });
              }}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-colors"
            >
              Start Optimized Savings Plan (+150 coins)
            </button>
          </div>
        </div>
      </div>

      {/* Savings Products Comparison */}
      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-semibold mb-4">Savings Products Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {savingsProducts.map(product => (
            <div key={product.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-white font-semibold mb-2">{product.name}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-200">APY:</span>
                  <span className="text-green-400 font-semibold">{product.apy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Min Deposit:</span>
                  <span className="text-white">${product.minDeposit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Liquidity:</span>
                  <span className={`${
                    product.liquidity === 'high' ? 'text-green-400' :
                    product.liquidity === 'medium' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {product.liquidity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Risk:</span>
                  <span className={`${
                    product.riskLevel === 'none' ? 'text-green-400' :
                    product.riskLevel === 'low' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {product.riskLevel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLoanGame = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Calculator className="mx-auto mb-4 text-purple-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Smart Borrowing & Loan Management Center</h2>
        <p className="text-purple-200">Master different loan types and make informed borrowing decisions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loanProducts.map(loan => (
          <div key={loan.id} className="bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">{loan.name}</h3>
              <div className="text-right">
                <span className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-sm">
                  {loan.apr}% APR
                </span>
                <div className="text-xs text-purple-300 mt-1">
                  Credit Score: {loan.creditScoreRequired}+
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Loan Range:</span>
                <span className="text-white">${loan.minAmount.toLocaleString()} - ${loan.maxAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Term:</span>
                <span className="text-white">{loan.term}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Monthly Payment ($50k):</span>
                <span className="text-white">${calculateLoanPayment(50000, loan.apr, 5).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Collateral Required:</span>
                <span className={loan.collateral ? 'text-red-400' : 'text-green-400'}>
                  {loan.collateral ? 'Yes' : 'No'}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <h4 className="text-green-300 font-medium text-sm mb-1">✅ Advantages:</h4>
                <ul className="text-green-200 text-xs space-y-1">
                  {loan.pros.map((pro, index) => (
                    <li key={index}>• {pro}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-red-300 font-medium text-sm mb-1">⚠️ Disadvantages:</h4>
                <ul className="text-red-200 text-xs space-y-1">
                  {loan.cons.map((con, index) => (
                    <li key={index}>• {con}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-blue-300 font-medium text-sm mb-1">📋 Requirements:</h4>
                <ul className="text-blue-200 text-xs space-y-1">
                  {loan.requirements.map((req, index) => (
                    <li key={index}>• {req}</li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => {
                addCoins(100);
                updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 15 });
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors"
            >
              Learn Loan Strategy (+100 coins)
            </button>
          </div>
        ))}
      </div>

      {/* Loan Comparison Tool */}
      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-semibold mb-4">Loan Comparison Calculator</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { amount: 10000, years: 3, name: 'Small Personal Loan' },
            { amount: 25000, years: 5, name: 'Medium Personal Loan' },
            { amount: 300000, years: 30, name: 'Home Mortgage' }
          ].map((scenario, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">{scenario.name}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-200">Amount:</span>
                  <span className="text-white">${scenario.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Term:</span>
                  <span className="text-white">{scenario.years} years</span>
                </div>
                {loanProducts.slice(0, 3).map(loan => (
                  <div key={loan.id} className="flex justify-between">
                    <span className="text-purple-200">{loan.name}:</span>
                    <span className="text-white">${calculateLoanPayment(scenario.amount, loan.apr, scenario.years)}/mo</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBudgetGame = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Target className="mx-auto mb-4 text-green-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Advanced Budget Master Challenge</h2>
        <p className="text-green-200">Master the 50/30/20 rule and optimize your spending</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4">Monthly Budget Analysis</h3>
          <div className="space-y-4">
            {budgetData.map((category, index) => {
              const percentage = (category.spent / category.limit) * 100;
              const isOverBudget = category.spent > category.limit;
              const isNearLimit = percentage > 80 && !isOverBudget;
              
              return (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${category.essential ? 'text-blue-200' : 'text-purple-200'}`}>
                        {category.name}
                      </span>
                      {category.essential && (
                        <span className="bg-blue-500/30 text-blue-200 px-2 py-1 rounded text-xs">NEED</span>
                      )}
                    </div>
                    <span className={`text-sm ${
                      isOverBudget ? 'text-red-400' : 
                      isNearLimit ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      ${category.spent}/${category.limit}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-700/30 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
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

                  {/* Category Tips */}
                  <div className="bg-white/5 rounded p-2">
                    <h5 className="text-white text-xs font-medium mb-1">💡 Optimization Tips:</h5>
                    <ul className="text-purple-200 text-xs space-y-0.5">
                      {category.tips.slice(0, 2).map((tip, tipIndex) => (
                        <li key={tipIndex}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4">50/30/20 Rule Analysis</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">50%</div>
                <div className="text-blue-200 text-sm">Needs</div>
                <div className="text-white text-xs mt-1">$1,500</div>
              </div>
              <div className="bg-purple-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-400">30%</div>
                <div className="text-purple-200 text-sm">Wants</div>
                <div className="text-white text-xs mt-1">$900</div>
              </div>
              <div className="bg-green-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">20%</div>
                <div className="text-green-200 text-sm">Savings</div>
                <div className="text-white text-xs mt-1">$600</div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Budget Optimization Recommendations:</h4>
              <ul className="text-purple-200 text-sm space-y-2">
                <li>• <strong>Needs (50%):</strong> Focus on essential expenses like housing, food, utilities, minimum debt payments</li>
                <li>• <strong>Wants (30%):</strong> Entertainment, dining out, hobbies, non-essential shopping</li>
                <li>• <strong>Savings (20%):</strong> Emergency fund, retirement, investments, extra debt payments</li>
                <li>• <strong>Tip:</strong> If you can't meet 20% savings, reduce wants category first</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-green-400">
                  ${budgetData.reduce((sum, cat) => sum + cat.allocated, 0)}
                </div>
                <p className="text-green-200 text-sm">Total Budget</p>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-400">
                  ${budgetData.reduce((sum, cat) => sum + cat.spent, 0)}
                </div>
                <p className="text-blue-200 text-sm">Total Spent</p>
              </div>
            </div>

            <button
              onClick={() => {
                addCoins(200);
                updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 25 });
              }}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-colors"
            >
              Optimize Budget Strategy (+200 coins)
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
        <h2 className="text-2xl font-bold text-white mb-2">Advanced Cash Flow & Working Capital Management</h2>
        <p className="text-cyan-200">Master the art of money flow optimization and liquidity management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2 text-green-400" size={20} />
            Income Sources
          </h3>
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
              <span className="text-cyan-200">Investment Income:</span>
              <span className="text-white">$200</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-200">Passive Income:</span>
              <span className="text-white">$150</span>
            </div>
            <div className="border-t border-white/20 pt-2">
              <div className="flex justify-between font-semibold">
                <span className="text-cyan-200">Total Monthly Income:</span>
                <span className="text-green-400">${(cashFlowData.monthlyIncome + 850).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <TrendingDown className="mr-2 text-red-400" size={20} />
            Expense Breakdown
          </h3>
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
            <div className="flex justify-between">
              <span className="text-purple-200">Investments:</span>
              <span className="text-white">${cashFlowData.investments.toLocaleString()}</span>
            </div>
            <div className="border-t border-white/20 pt-2">
              <div className="flex justify-between font-semibold">
                <span className="text-red-200">Total Monthly Outflow:</span>
                <span className="text-red-400">${(cashFlowData.fixedExpenses + cashFlowData.variableExpenses + cashFlowData.savings + cashFlowData.investments).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <BarChart3 className="mr-2 text-purple-400" size={20} />
            Financial Health Analysis
          </h3>
          <div className="space-y-4">
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${
                (cashFlowData.monthlyIncome + 850) - (cashFlowData.fixedExpenses + cashFlowData.variableExpenses + cashFlowData.savings + cashFlowData.investments) > 0
                  ? 'text-green-400' : 'text-red-400'
              }`}>
                ${((cashFlowData.monthlyIncome + 850) - (cashFlowData.fixedExpenses + cashFlowData.variableExpenses + cashFlowData.savings + cashFlowData.investments)).toLocaleString()}
              </div>
              <p className="text-purple-200 text-sm">Net Monthly Cash Flow</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Working Capital:</span>
                <span className="text-white">${cashFlowData.workingCapital.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Emergency Fund:</span>
                <span className="text-green-400">${cashFlowData.emergencyFund.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Debt-to-Income:</span>
                <span className="text-yellow-400">25%</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-3">
              <h4 className="text-white font-medium mb-2">💡 Optimization Tips:</h4>
              <ul className="text-purple-200 text-sm space-y-1">
                <li>• Increase emergency fund to 6 months expenses</li>
                <li>• Consider investing surplus cash flow</li>
                <li>• Review variable expenses for optimization</li>
                <li>• Explore additional income streams</li>
                <li>• Automate savings to ensure consistency</li>
              </ul>
            </div>

            <button
              onClick={() => {
                addCoins(180);
                updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 20 });
              }}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-colors"
            >
              Optimize Cash Flow (+180 coins)
            </button>
          </div>
        </div>
      </div>

      {/* Cash Flow Visualization */}
      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-semibold mb-4">Cash Flow Visualization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-white font-medium">Monthly Cash Flow Pattern</h4>
            <div className="h-32 bg-white/5 rounded-lg p-4 flex items-end justify-between">
              {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, index) => {
                const weeklyFlow = [800, 600, 900, 550][index];
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="bg-cyan-400 rounded-t w-8"
                      style={{ height: `${(weeklyFlow / 1000) * 80}px` }}
                    />
                    <span className="text-cyan-300 text-xs mt-2">{week}</span>
                    <span className="text-white text-xs">${weeklyFlow}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-medium">Working Capital Health</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-purple-200">Current Ratio:</span>
                <span className="text-green-400">2.1 (Healthy)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Quick Ratio:</span>
                <span className="text-green-400">1.8 (Good)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Cash Ratio:</span>
                <span className="text-yellow-400">0.6 (Adequate)</span>
              </div>
              <div className="bg-green-500/20 border border-green-500/30 rounded p-2">
                <p className="text-green-200 text-xs">
                  ✅ Your working capital is healthy! You have sufficient liquidity to handle unexpected expenses.
                </p>
              </div>
            </div>
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
        <p className="text-indigo-200">Master essential banking and financial concepts with interactive lessons</p>
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
            
            <div className="space-y-4">
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                <h4 className="text-blue-300 font-medium text-sm mb-2 flex items-center">
                  <Info className="mr-2" size={16} />
                  Key Learning Points:
                </h4>
                <ul className="text-blue-200 text-sm space-y-1">
                  {lesson.keyPoints.map((point, index) => (
                    <li key={index}>• {point}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                <h4 className="text-green-300 font-medium text-sm mb-2">💡 Practical Tips:</h4>
                <ul className="text-green-200 text-sm space-y-1">
                  {lesson.practicalTips.map((tip, index) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <h4 className="text-red-300 font-medium text-sm mb-2">⚠️ Common Mistakes:</h4>
                <ul className="text-red-200 text-sm space-y-1">
                  {lesson.commonMistakes.map((mistake, index) => (
                    <li key={index}>• {mistake}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                <h4 className="text-yellow-300 font-medium text-sm mb-2">📊 Real-World Example:</h4>
                <p className="text-yellow-200 text-sm">{lesson.realWorldExample}</p>
              </div>
            </div>

            <button
              onClick={() => completeLesson(lesson.id, lesson.reward)}
              disabled={lesson.completed}
              className={`w-full mt-4 py-3 rounded-lg font-semibold transition-colors ${
                lesson.completed
                  ? 'bg-green-500/30 text-green-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
              }`}
            >
              {lesson.completed ? (
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle size={20} />
                  <span>Lesson Completed</span>
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

  const renderProductsOverview = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Banknote className="mx-auto mb-4 text-green-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Banking Products Overview</h2>
        <p className="text-green-200">Explore different banking products and their strategic uses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4">Savings & Deposit Products</h3>
          <div className="space-y-4">
            {savingsProducts.map(product => (
              <div key={product.id} className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-white font-medium">{product.name}</h4>
                  <span className="text-green-400 font-semibold">{product.apy}% APY</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <div>
                    <span className="text-purple-200">Min Deposit:</span>
                    <span className="text-white ml-1">${product.minDeposit}</span>
                  </div>
                  <div>
                    <span className="text-purple-200">Liquidity:</span>
                    <span className={`ml-1 ${
                      product.liquidity === 'high' ? 'text-green-400' :
                      product.liquidity === 'medium' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {product.liquidity}
                    </span>
                  </div>
                </div>
                <p className="text-purple-200 text-xs">{product.features.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4">Credit & Loan Products</h3>
          <div className="space-y-4">
            {loanProducts.map(product => (
              <div key={product.id} className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-white font-medium">{product.name}</h4>
                  <span className="text-red-400 font-semibold">{product.apr}% APR</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <div>
                    <span className="text-purple-200">Range:</span>
                    <span className="text-white ml-1">${product.minAmount.toLocaleString()}-${product.maxAmount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-purple-200">Term:</span>
                    <span className="text-white ml-1">{product.term}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-purple-200">Collateral:</span>
                  <span className={product.collateral ? 'text-red-400' : 'text-green-400'}>
                    {product.collateral ? 'Required' : 'Not Required'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-semibold mb-4">Strategic Banking Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-300 font-semibold mb-2">💰 Savings Strategy</h4>
            <ul className="text-blue-200 text-sm space-y-1">
              <li>• Use high-yield savings for emergency funds</li>
              <li>• CDs for money you won't need for 6+ months</li>
              <li>• Money market for larger balances</li>
              <li>• Automate savings transfers</li>
            </ul>
          </div>
          
          <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
            <h4 className="text-purple-300 font-semibold mb-2">🏦 Credit Strategy</h4>
            <ul className="text-purple-200 text-sm space-y-1">
              <li>• Pay credit cards in full monthly</li>
              <li>• Keep utilization below 30%</li>
              <li>• Use credit for building credit history</li>
              <li>• Choose cards with rewards you'll use</li>
            </ul>
          </div>
          
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
            <h4 className="text-green-300 font-semibold mb-2">📊 Loan Strategy</h4>
            <ul className="text-green-200 text-sm space-y-1">
              <li>• Shop around for best rates</li>
              <li>• Improve credit score before applying</li>
              <li>• Consider total cost, not just monthly payment</li>
              <li>• Avoid unnecessary loan fees</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Building2 className="mx-auto mb-4 text-blue-400" size={64} />
        <h1 className="text-3xl font-bold text-white mb-2">Bank District</h1>
        <p className="text-blue-200">Master banking, loans, budgeting, and comprehensive financial management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { id: 'savings', name: 'Savings Simulator', icon: PiggyBank, color: 'from-green-500 to-emerald-500', description: 'Compare savings products & compound interest' },
          { id: 'loans', name: 'Smart Borrowing', icon: Calculator, color: 'from-purple-500 to-indigo-500', description: 'Learn loan types & payment strategies' },
          { id: 'budget', name: 'Budget Master', icon: Target, color: 'from-blue-500 to-cyan-500', description: 'Master 50/30/20 rule & expense tracking' },
          { id: 'cashflow', name: 'Cash Flow Manager', icon: TrendingUp, color: 'from-orange-500 to-red-500', description: 'Optimize money flow & working capital' },
          { id: 'lessons', name: 'Financial Academy', icon: BookOpen, color: 'from-indigo-500 to-purple-500', description: 'Interactive lessons with quizzes' },
          { id: 'products', name: 'Banking Products', icon: Banknote, color: 'from-cyan-500 to-blue-500', description: 'Explore all banking product types' }
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
        <h2 className="text-xl font-bold text-white mb-4">Your Banking Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{progress.financialLiteracyScore}</div>
            <p className="text-blue-200 text-sm">Financial Knowledge</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{financialLessons.filter(l => l.completed).length}</div>
            <p className="text-green-200 text-sm">Lessons Completed</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{progress.coins}</div>
            <p className="text-purple-200 text-sm">Total Coins</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">A+</div>
            <p className="text-yellow-200 text-sm">Banking Grade</p>
          </div>
        </div>
      </div>

      {/* Quick Start Lessons */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-4">Featured Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {financialLessons.slice(0, 3).map(lesson => (
            <div key={lesson.id} className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">{lesson.title}</h3>
              <p className="text-purple-200 text-sm mb-3">{lesson.content.substring(0, 100)}...</p>
              <div className="flex items-center justify-between">
                <span className="text-yellow-400 text-sm">+{lesson.reward} coins</span>
                <button
                  onClick={() => setActiveGame('lessons')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  Start Learning
                </button>
              </div>
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
      case 'products':
        return renderProductsOverview();
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
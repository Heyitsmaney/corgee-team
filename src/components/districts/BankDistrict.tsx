import React, { useState, useEffect } from 'react';
import { ArrowLeft, Building2, Calculator, PiggyBank, CreditCard, TrendingUp, DollarSign, Target, BookOpen, Award, Coins, Brain, AlertTriangle, CheckCircle, BarChart3, Activity, Percent, Clock, Shield, Star, Zap, Gift } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

interface BankDistrictProps {
  onBack: () => void;
}

interface BankProduct {
  id: string;
  name: string;
  type: 'savings' | 'checking' | 'credit' | 'loan' | 'investment';
  interestRate: number;
  fees: number;
  benefits: string[];
  requirements: string[];
  riskLevel: 'low' | 'medium' | 'high';
  recommended: boolean;
}

interface FinancialLesson {
  id: string;
  title: string;
  category: 'budgeting' | 'saving' | 'borrowing' | 'investing' | 'planning';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content: string;
  keyPoints: string[];
  practicalExercise: string;
  realWorldExample: string;
  commonMistakes: string[];
  actionSteps: string[];
  reward: number;
  completed: boolean;
}

interface BudgetCategory {
  name: string;
  allocated: number;
  spent: number;
  remaining: number;
  color: string;
  tips: string[];
}

interface LoanScenario {
  id: string;
  title: string;
  amount: number;
  purpose: string;
  options: {
    bank: string;
    interestRate: number;
    term: number;
    monthlyPayment: number;
    totalCost: number;
    pros: string[];
    cons: string[];
  }[];
  bestChoice: number;
  explanation: string;
  reward: number;
}

export const BankDistrict: React.FC<BankDistrictProps> = ({ onBack }) => {
  const { progress, addCoins, updateProgress } = useUser();
  const [activeGame, setActiveGame] = useState<'overview' | 'budgeting' | 'savings' | 'loans' | 'products' | 'lessons' | 'calculator' | 'cashflow' | 'wheel'>('overview');
  const [monthlyIncome, setMonthlyIncome] = useState(15000000); // 15M VND
  const [selectedLesson, setSelectedLesson] = useState<FinancialLesson | null>(null);
  const [selectedLoanScenario, setSelectedLoanScenario] = useState<LoanScenario | null>(null);
  const [budgetData, setBudgetData] = useState<BudgetCategory[]>([
    { name: 'Housing', allocated: 7500000, spent: 7200000, remaining: 300000, color: 'bg-blue-500', tips: ['Consider roommates', 'Negotiate rent', 'Look for utilities included'] },
    { name: 'Food', allocated: 3000000, spent: 3200000, remaining: -200000, color: 'bg-green-500', tips: ['Cook at home more', 'Buy in bulk', 'Use grocery apps for deals'] },
    { name: 'Transportation', allocated: 1500000, spent: 1400000, remaining: 100000, color: 'bg-yellow-500', tips: ['Use public transport', 'Carpool with colleagues', 'Walk for short distances'] },
    { name: 'Entertainment', allocated: 1500000, spent: 2100000, remaining: -600000, color: 'bg-purple-500', tips: ['Find free activities', 'Use student discounts', 'Set entertainment limits'] },
    { name: 'Savings', allocated: 1500000, spent: 1500000, remaining: 0, color: 'bg-cyan-500', tips: ['Automate savings', 'Start with 10%', 'Use high-yield accounts'] }
  ]);

  const bankProducts: BankProduct[] = [
    {
      id: '1',
      name: 'Basic Savings Account',
      type: 'savings',
      interestRate: 2.5,
      fees: 0,
      benefits: ['No minimum balance', 'Free ATM withdrawals', 'Mobile banking'],
      requirements: ['Valid ID', 'Minimum age 18'],
      riskLevel: 'low',
      recommended: true
    },
    {
      id: '2',
      name: 'High-Yield Savings',
      type: 'savings',
      interestRate: 4.2,
      fees: 50000,
      benefits: ['Higher interest rate', 'Compound interest', 'Online banking'],
      requirements: ['Minimum balance 5M VND', 'Monthly deposit 500K VND'],
      riskLevel: 'low',
      recommended: true
    },
    {
      id: '3',
      name: 'Student Credit Card',
      type: 'credit',
      interestRate: 18.9,
      fees: 0,
      benefits: ['No annual fee', 'Cashback on purchases', 'Build credit history'],
      requirements: ['Student status', 'Minimum income 3M VND'],
      riskLevel: 'medium',
      recommended: true
    },
    {
      id: '4',
      name: 'Premium Credit Card',
      type: 'credit',
      interestRate: 24.9,
      fees: 2000000,
      benefits: ['Airport lounge access', '5% cashback', 'Travel insurance'],
      requirements: ['Minimum income 20M VND', 'Good credit score'],
      riskLevel: 'high',
      recommended: false
    },
    {
      id: '5',
      name: 'Personal Loan',
      type: 'loan',
      interestRate: 12.5,
      fees: 500000,
      benefits: ['Quick approval', 'Flexible terms', 'No collateral'],
      requirements: ['Stable income', 'Credit check', 'Employment verification'],
      riskLevel: 'medium',
      recommended: false
    },
    {
      id: '6',
      name: 'Mortgage Loan',
      type: 'loan',
      interestRate: 8.5,
      fees: 10000000,
      benefits: ['Low interest rate', 'Long repayment term', 'Tax benefits'],
      requirements: ['20% down payment', 'Stable income 2+ years', 'Property appraisal'],
      riskLevel: 'high',
      recommended: true
    }
  ];

  const financialLessons: FinancialLesson[] = [
    {
      id: '1',
      title: 'The 50/30/20 Budgeting Rule',
      category: 'budgeting',
      difficulty: 'beginner',
      content: 'The 50/30/20 rule is a simple budgeting framework that allocates your after-tax income into three categories: 50% for needs, 30% for wants, and 20% for savings and debt repayment.',
      keyPoints: [
        '50% for essential needs (housing, food, utilities, minimum debt payments)',
        '30% for wants (entertainment, dining out, hobbies, non-essential shopping)',
        '20% for savings and extra debt payments (emergency fund, retirement, investments)',
        'Adjust percentages based on your financial situation and goals',
        'Track spending regularly to ensure you stay within each category'
      ],
      practicalExercise: 'Calculate your monthly after-tax income and allocate it using the 50/30/20 rule. Track your spending for one week to see how well you follow the plan.',
      realWorldExample: 'Mai earns 15M VND monthly. She allocates 7.5M for rent and food (needs), 4.5M for entertainment and shopping (wants), and 3M for savings and investments (future).',
      commonMistakes: [
        'Treating wants as needs (expensive phone plans, premium subscriptions)',
        'Not tracking spending regularly',
        'Ignoring the savings category when money is tight',
        'Being too rigid - adjust percentages based on life changes',
        'Not accounting for irregular expenses like medical bills'
      ],
      actionSteps: [
        'Calculate your monthly after-tax income',
        'List all your essential expenses (needs)',
        'Identify your discretionary spending (wants)',
        'Set up automatic savings transfers',
        'Review and adjust monthly'
      ],
      reward: 150,
      completed: false
    },
    {
      id: '2',
      title: 'Building an Emergency Fund',
      category: 'saving',
      difficulty: 'beginner',
      content: 'An emergency fund is money set aside to cover unexpected expenses like job loss, medical bills, or major repairs. It provides financial security and prevents you from going into debt during emergencies.',
      keyPoints: [
        'Start with 1 month of expenses, build to 3-6 months',
        'Keep emergency funds in easily accessible savings accounts',
        'Don\'t invest emergency funds in stocks or risky assets',
        'Only use for true emergencies, not planned expenses',
        'Replenish immediately after using emergency funds'
      ],
      practicalExercise: 'Calculate your monthly essential expenses and set a goal to save 3 months worth. Start by saving 500K VND monthly until you reach your target.',
      realWorldExample: 'Duc lost his job during COVID-19 but had 6 months of expenses saved (45M VND). This allowed him to pay rent and buy food while searching for new employment without borrowing money.',
      commonMistakes: [
        'Using emergency funds for vacations or shopping',
        'Keeping emergency money in checking accounts with no interest',
        'Not having any emergency fund at all',
        'Investing emergency funds in volatile assets',
        'Setting unrealistic emergency fund goals that discourage saving'
      ],
      actionSteps: [
        'Calculate your monthly essential expenses',
        'Open a separate high-yield savings account',
        'Set up automatic transfers of 10-15% of income',
        'Start with 1 month goal, then build to 3-6 months',
        'Only use for true emergencies'
      ],
      reward: 200,
      completed: false
    },
    {
      id: '3',
      title: 'Understanding Interest Rates and Compound Interest',
      category: 'saving',
      difficulty: 'intermediate',
      content: 'Interest is the cost of borrowing money or the reward for saving money. Compound interest is when you earn interest on both your original money and previously earned interest, creating exponential growth over time.',
      keyPoints: [
        'Simple interest = Principal × Rate × Time',
        'Compound interest grows exponentially over time',
        'The earlier you start saving, the more compound interest works for you',
        'High-interest debt (credit cards) compounds against you',
        'Even small amounts saved early can grow significantly'
      ],
      practicalExercise: 'Compare saving 1M VND monthly starting at age 25 vs age 35. Calculate the difference after 30 years with 6% annual interest.',
      realWorldExample: 'Linh saves 2M VND monthly from age 25-35 (total 240M VND invested). At 6% annual return, she has 1.2B VND at retirement. If she started at 35, she\'d need to save 4M VND monthly to reach the same amount.',
      commonMistakes: [
        'Waiting to start saving until you have "enough" money',
        'Not understanding how credit card interest compounds against you',
        'Focusing only on interest rates without considering fees',
        'Withdrawing savings early and losing compound growth',
        'Not taking advantage of employer retirement matching'
      ],
      actionSteps: [
        'Calculate compound interest on your current savings',
        'Set up automatic monthly savings transfers',
        'Pay off high-interest debt first',
        'Research high-yield savings accounts',
        'Start investing in index funds for long-term growth'
      ],
      reward: 180,
      completed: false
    },
    {
      id: '4',
      title: 'Smart Credit Card Management',
      category: 'borrowing',
      difficulty: 'intermediate',
      content: 'Credit cards can be powerful financial tools when used responsibly, but dangerous when mismanaged. Understanding how to use credit cards wisely can help build credit history and earn rewards while avoiding debt traps.',
      keyPoints: [
        'Pay full balance every month to avoid interest charges',
        'Keep credit utilization below 30% of credit limit',
        'Never use credit cards for cash advances (high fees)',
        'Understand the difference between statement balance and current balance',
        'Use credit cards for planned purchases, not impulse buying'
      ],
      practicalExercise: 'Track all credit card purchases for one month. Calculate how much interest you would pay if you only made minimum payments.',
      realWorldExample: 'Tuan has a 10M VND credit limit and keeps his balance under 3M VND (30% utilization). He pays the full balance monthly, earns 2% cashback, and builds excellent credit history without paying any interest.',
      commonMistakes: [
        'Making only minimum payments and paying high interest',
        'Using credit cards for cash advances',
        'Opening too many credit cards at once',
        'Maxing out credit limits',
        'Not reading credit card terms and conditions'
      ],
      actionSteps: [
        'Set up automatic full balance payments',
        'Monitor credit utilization monthly',
        'Choose cards with rewards that match your spending',
        'Read all terms and conditions carefully',
        'Check credit reports regularly for errors'
      ],
      reward: 220,
      completed: false
    },
    {
      id: '5',
      title: 'Loan Comparison and Smart Borrowing',
      category: 'borrowing',
      difficulty: 'advanced',
      content: 'Not all loans are created equal. Understanding different loan types, interest rates, terms, and fees helps you make smart borrowing decisions and save thousands of dollars over the loan lifetime.',
      keyPoints: [
        'APR (Annual Percentage Rate) includes interest rate plus fees',
        'Shorter loan terms mean higher monthly payments but less total interest',
        'Fixed rates stay the same, variable rates can change',
        'Secured loans (with collateral) typically have lower rates',
        'Your credit score significantly affects loan terms and rates'
      ],
      practicalExercise: 'Compare a 5-year vs 7-year car loan for 500M VND at 8% interest. Calculate the difference in monthly payments and total interest paid.',
      realWorldExample: 'Hoa needs 500M VND for a car. A 5-year loan costs 10.1M VND monthly with 105M VND total interest. A 7-year loan costs 7.8M VND monthly but 155M VND total interest - 50M VND more!',
      commonMistakes: [
        'Focusing only on monthly payment, not total cost',
        'Not shopping around for better rates',
        'Taking longer loan terms to lower monthly payments',
        'Not reading loan terms and conditions carefully',
        'Borrowing more than necessary because you qualify'
      ],
      actionSteps: [
        'Check your credit score before applying',
        'Get quotes from at least 3 different lenders',
        'Calculate total interest cost, not just monthly payments',
        'Consider making extra principal payments',
        'Read all loan documents carefully before signing'
      ],
      reward: 250,
      completed: false
    },
    {
      id: '6',
      title: 'Cash Flow Management and Working Capital',
      category: 'planning',
      difficulty: 'advanced',
      content: 'Cash flow is the movement of money in and out of your accounts. Positive cash flow means you earn more than you spend. Managing cash flow helps ensure you can pay bills on time and avoid debt.',
      keyPoints: [
        'Track income and expenses monthly to understand cash flow patterns',
        'Plan for irregular expenses like insurance, taxes, and maintenance',
        'Maintain working capital (cash buffer) for smooth operations',
        'Time large purchases with income cycles',
        'Use cash flow forecasting to plan major financial decisions'
      ],
      practicalExercise: 'Create a 6-month cash flow forecast including your regular income, fixed expenses, and planned large purchases.',
      realWorldExample: 'Minh is a freelancer with irregular income. He tracks cash flow monthly and keeps 2 months of expenses in checking account to handle income fluctuations and pay bills on time.',
      commonMistakes: [
        'Not planning for irregular but predictable expenses',
        'Spending money as soon as it arrives',
        'Not maintaining adequate cash reserves',
        'Making large purchases without considering cash flow impact',
        'Ignoring seasonal income or expense patterns'
      ],
      actionSteps: [
        'Track all income and expenses for 3 months',
        'Identify patterns in your cash flow',
        'Plan for irregular expenses by saving monthly',
        'Maintain 1-2 months expenses in checking account',
        'Review and adjust cash flow plan quarterly'
      ],
      reward: 300,
      completed: false
    },
    {
      id: '7',
      title: 'Investment Account Types and Tax Benefits',
      category: 'investing',
      difficulty: 'advanced',
      content: 'Different investment accounts offer various tax benefits and restrictions. Understanding these can help you maximize returns and minimize taxes on your investments.',
      keyPoints: [
        'Regular investment accounts: Taxed on dividends and capital gains',
        'Retirement accounts: Tax-deferred growth until withdrawal',
        'Education savings accounts: Tax-free growth for education expenses',
        'Health savings accounts: Triple tax benefit (deduct, grow, withdraw tax-free)',
        'Employer matching is free money - always contribute enough to get full match'
      ],
      practicalExercise: 'Calculate the tax savings of contributing 2M VND monthly to a retirement account vs regular investment account over 20 years.',
      realWorldExample: 'An earns 25M VND monthly and contributes 2M VND to retirement account. This reduces her taxable income by 24M VND annually, saving 4.8M VND in taxes while building retirement wealth.',
      commonMistakes: [
        'Not taking advantage of employer retirement matching',
        'Withdrawing from retirement accounts early and paying penalties',
        'Not understanding tax implications of different account types',
        'Putting all investments in taxable accounts',
        'Not maximizing tax-advantaged account contributions'
      ],
      actionSteps: [
        'Contribute enough to get full employer match',
        'Maximize retirement account contributions',
        'Consider tax-loss harvesting in taxable accounts',
        'Understand withdrawal rules for each account type',
        'Consult tax professional for complex situations'
      ],
      reward: 350,
      completed: false
    },
    {
      id: '8',
      title: 'Debt Consolidation and Payoff Strategies',
      category: 'borrowing',
      difficulty: 'intermediate',
      content: 'When you have multiple debts, strategic payoff methods can save money and reduce stress. Understanding debt consolidation and payoff strategies helps you become debt-free faster.',
      keyPoints: [
        'Debt avalanche: Pay minimums on all debts, extra on highest interest rate',
        'Debt snowball: Pay minimums on all debts, extra on smallest balance',
        'Debt consolidation: Combine multiple debts into one lower-rate loan',
        'Balance transfers: Move high-rate credit card debt to lower-rate cards',
        'Never ignore debt - it compounds quickly'
      ],
      practicalExercise: 'Compare debt avalanche vs snowball methods for paying off 3 different debts totaling 50M VND.',
      realWorldExample: 'Quan has 3 credit cards with 15M, 8M, and 5M VND balances at different interest rates. Using debt avalanche method, he saves 2.5M VND in interest compared to making minimum payments.',
      commonMistakes: [
        'Making only minimum payments on high-interest debt',
        'Taking on new debt while paying off existing debt',
        'Not considering debt consolidation options',
        'Closing credit cards immediately after paying them off',
        'Not addressing the spending habits that created debt'
      ],
      actionSteps: [
        'List all debts with balances, rates, and minimum payments',
        'Choose debt avalanche or snowball method',
        'Consider debt consolidation if it lowers overall rate',
        'Stop using credit cards until debt is paid off',
        'Create a realistic debt payoff timeline'
      ],
      reward: 280,
      completed: false
    }
  ];

  const loanScenarios: LoanScenario[] = [
    {
      id: '1',
      title: 'First Car Purchase Decision',
      amount: 400000000, // 400M VND
      purpose: 'Buy your first car for commuting to work',
      options: [
        {
          bank: 'Vietcombank Auto Loan',
          interestRate: 8.5,
          term: 5,
          monthlyPayment: 8200000,
          totalCost: 492000000,
          pros: ['Low interest rate', 'Established bank', 'Good customer service'],
          cons: ['Strict requirements', 'Higher monthly payment', 'Processing fees']
        },
        {
          bank: 'BIDV Quick Auto Loan',
          interestRate: 9.8,
          term: 7,
          monthlyPayment: 6800000,
          totalCost: 571200000,
          pros: ['Lower monthly payment', 'Fast approval', 'Flexible requirements'],
          cons: ['Higher total cost', 'Variable interest rate', 'Longer commitment']
        },
        {
          bank: 'Personal Loan (Any Purpose)',
          interestRate: 15.5,
          term: 5,
          monthlyPayment: 9600000,
          totalCost: 576000000,
          pros: ['No collateral required', 'Use for any purpose', 'Quick approval'],
          cons: ['Highest interest rate', 'Highest monthly payment', 'Highest total cost']
        }
      ],
      bestChoice: 0,
      explanation: 'Vietcombank offers the lowest total cost despite higher monthly payments. The 92M VND savings over the loan term is significant.',
      reward: 200
    },
    {
      id: '2',
      title: 'Home Purchase Mortgage Decision',
      amount: 2000000000, // 2B VND
      purpose: 'Buy your first apartment in Ho Chi Minh City',
      options: [
        {
          bank: 'VietinBank Fixed Rate Mortgage',
          interestRate: 7.8,
          term: 20,
          monthlyPayment: 16800000,
          totalCost: 4032000000,
          pros: ['Fixed rate security', 'Predictable payments', 'No rate increase risk'],
          cons: ['Higher initial rate', 'Less flexibility', 'Prepayment penalties']
        },
        {
          bank: 'Techcombank Variable Rate Mortgage',
          interestRate: 6.5,
          term: 25,
          monthlyPayment: 14200000,
          totalCost: 4260000000,
          pros: ['Lower initial rate', 'Lower monthly payment', 'Rate may decrease'],
          cons: ['Rate uncertainty', 'Longer commitment', 'Higher total cost if rates rise']
        },
        {
          bank: 'ACB Hybrid Mortgage (5yr fixed, then variable)',
          interestRate: 7.2,
          term: 20,
          monthlyPayment: 15900000,
          totalCost: 3816000000,
          pros: ['Balanced approach', 'Initial rate protection', 'Lowest total cost'],
          cons: ['Rate uncertainty after 5 years', 'Complex structure', 'Refinancing needed']
        }
      ],
      bestChoice: 2,
      explanation: 'ACB Hybrid offers the best balance of rate protection and total cost, saving 216M VND compared to VietinBank.',
      reward: 300
    }
  ];

  const [cashFlowData, setCashFlowData] = useState({
    income: {
      salary: 15000000,
      freelance: 2000000,
      investments: 500000,
      other: 0
    },
    expenses: {
      housing: 7500000,
      food: 3000000,
      transportation: 1500000,
      utilities: 800000,
      entertainment: 1500000,
      savings: 3000000,
      other: 1200000
    }
  });

  const totalIncome = Object.values(cashFlowData.income).reduce((sum, val) => sum + val, 0);
  const totalExpenses = Object.values(cashFlowData.expenses).reduce((sum, val) => sum + val, 0);
  const netCashFlow = totalIncome - totalExpenses;

  const completeLesson = (lesson: FinancialLesson) => {
    addCoins(lesson.reward);
    updateProgress({ 
      financialLiteracyScore: progress.financialLiteracyScore + (lesson.difficulty === 'advanced' ? 25 : lesson.difficulty === 'intermediate' ? 15 : 10)
    });
    
    // Mark lesson as completed
    setSelectedLesson(null);
  };

  const solveLoanScenario = (scenario: LoanScenario, chosenOption: number) => {
    const isCorrect = chosenOption === scenario.bestChoice;
    
    if (isCorrect) {
      addCoins(scenario.reward);
      updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 20 });
    } else {
      addCoins(-50);
    }
    
    setSelectedLoanScenario(null);
  };

  const renderBudgetingGame = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Calculator className="mx-auto mb-4 text-blue-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Advanced Budgeting Simulator</h2>
        <p className="text-blue-200">Master the 50/30/20 rule and optimize your spending</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h3 className="text-white font-semibold mb-4">Monthly Income</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-purple-200">After-tax Income:</span>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="bg-white/20 text-white px-3 py-1 rounded w-32 text-right"
                />
              </div>
              <div className="text-sm text-purple-300">
                Recommended allocation: 50% needs, 30% wants, 20% savings
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h3 className="text-white font-semibold mb-4">Budget Categories</h3>
            <div className="space-y-4">
              {budgetData.map((category, index) => {
                const percentage = (category.allocated / monthlyIncome) * 100;
                const spentPercentage = (category.spent / category.allocated) * 100;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{category.name}</span>
                      <span className="text-purple-300 text-sm">{percentage.toFixed(1)}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-700/30 rounded-full h-4 relative">
                      <div 
                        className={`${category.color} h-4 rounded-full transition-all duration-500`}
                        style={{ width: `${Math.min(spentPercentage, 100)}%` }}
                      />
                      {spentPercentage > 100 && (
                        <div className="absolute top-0 left-0 w-full h-4 bg-red-500/50 rounded-full" />
                      )}
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-200">
                        Spent: {category.spent.toLocaleString()} VND
                      </span>
                      <span className={`font-medium ${
                        category.remaining >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {category.remaining >= 0 ? 'Under' : 'Over'}: {Math.abs(category.remaining).toLocaleString()} VND
                      </span>
                    </div>

                    {category.remaining < 0 && (
                      <div className="bg-red-500/20 border border-red-500/30 rounded p-2">
                        <h4 className="text-red-300 font-medium text-sm mb-1">💡 Money-Saving Tips:</h4>
                        <ul className="text-red-200 text-xs space-y-1">
                          {category.tips.map((tip, tipIndex) => (
                            <li key={tipIndex}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h3 className="text-white font-semibold mb-4">Budget Analysis</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-400">{((budgetData.reduce((sum, cat) => sum + cat.allocated, 0) / monthlyIncome) * 100).toFixed(0)}%</div>
                  <div className="text-blue-200 text-sm">Budgeted</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">{((budgetData.reduce((sum, cat) => sum + cat.spent, 0) / monthlyIncome) * 100).toFixed(0)}%</div>
                  <div className="text-purple-200 text-sm">Spent</div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {((monthlyIncome - budgetData.reduce((sum, cat) => sum + cat.spent, 0)) / monthlyIncome * 100).toFixed(0)}%
                  </div>
                  <div className={`text-sm ${netCashFlow >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                    {netCashFlow >= 0 ? 'Surplus' : 'Deficit'}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/20 pt-4">
                <h4 className="text-white font-medium mb-3">Budget Recommendations:</h4>
                <div className="space-y-2 text-sm">
                  {budgetData.some(cat => cat.remaining < 0) && (
                    <div className="bg-red-500/20 border border-red-500/30 rounded p-3">
                      <div className="text-red-300 font-medium mb-1">⚠️ Over Budget Categories:</div>
                      <ul className="text-red-200 space-y-1">
                        {budgetData.filter(cat => cat.remaining < 0).map((cat, index) => (
                          <li key={index}>• {cat.name}: {Math.abs(cat.remaining).toLocaleString()} VND over</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {netCashFlow > 0 && (
                    <div className="bg-green-500/20 border border-green-500/30 rounded p-3">
                      <div className="text-green-300 font-medium mb-1">✅ Great Job! You have surplus:</div>
                      <p className="text-green-200">Consider increasing savings or investing the extra {netCashFlow.toLocaleString()} VND</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h3 className="text-white font-semibold mb-4">50/30/20 Rule Analysis</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-purple-200">Needs (50%):</span>
                <div className="text-right">
                  <div className="text-white font-semibold">{(monthlyIncome * 0.5).toLocaleString()} VND</div>
                  <div className="text-purple-300 text-sm">Target allocation</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-purple-200">Wants (30%):</span>
                <div className="text-right">
                  <div className="text-white font-semibold">{(monthlyIncome * 0.3).toLocaleString()} VND</div>
                  <div className="text-purple-300 text-sm">Target allocation</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-purple-200">Savings (20%):</span>
                <div className="text-right">
                  <div className="text-white font-semibold">{(monthlyIncome * 0.2).toLocaleString()} VND</div>
                  <div className="text-purple-300 text-sm">Target allocation</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                addCoins(100);
                updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 15 });
              }}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-colors"
            >
              Optimize Budget (+100 coins)
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCashFlowGame = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Activity className="mx-auto mb-4 text-green-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Cash Flow Management</h2>
        <p className="text-green-200">Track money in and out to maintain financial health</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2 text-green-400" size={20} />
            Monthly Income Sources
          </h3>
          <div className="space-y-3">
            {Object.entries(cashFlowData.income).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-purple-200 capitalize">{key}:</span>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setCashFlowData(prev => ({
                    ...prev,
                    income: { ...prev.income, [key]: Number(e.target.value) }
                  }))}
                  className="bg-white/20 text-white px-3 py-1 rounded w-32 text-right"
                />
              </div>
            ))}
            <div className="border-t border-white/20 pt-3">
              <div className="flex justify-between font-semibold">
                <span className="text-green-300">Total Income:</span>
                <span className="text-green-400">{totalIncome.toLocaleString()} VND</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <TrendingDown className="mr-2 text-red-400" size={20} />
            Monthly Expenses
          </h3>
          <div className="space-y-3">
            {Object.entries(cashFlowData.expenses).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-purple-200 capitalize">{key}:</span>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setCashFlowData(prev => ({
                    ...prev,
                    expenses: { ...prev.expenses, [key]: Number(e.target.value) }
                  }))}
                  className="bg-white/20 text-white px-3 py-1 rounded w-32 text-right"
                />
              </div>
            ))}
            <div className="border-t border-white/20 pt-3">
              <div className="flex justify-between font-semibold">
                <span className="text-red-300">Total Expenses:</span>
                <span className="text-red-400">{totalExpenses.toLocaleString()} VND</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-semibold mb-4">Cash Flow Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{totalIncome.toLocaleString()}</div>
            <div className="text-green-200 text-sm">Total Income</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{totalExpenses.toLocaleString()}</div>
            <div className="text-red-200 text-sm">Total Expenses</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {netCashFlow.toLocaleString()}
            </div>
            <div className={`text-sm ${netCashFlow >= 0 ? 'text-green-200' : 'text-red-200'}`}>
              Net Cash Flow
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="w-full bg-gray-700/30 rounded-full h-4 relative">
            <div 
              className="bg-green-400 h-4 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((totalIncome / (totalIncome + Math.abs(Math.min(netCashFlow, 0)))) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-purple-300 mt-1">
            <span>Deficit</span>
            <span>Balanced</span>
            <span>Surplus</span>
          </div>
        </div>

        {netCashFlow < 0 && (
          <div className="mt-4 bg-red-500/20 border border-red-500/30 rounded-lg p-4">
            <h4 className="text-red-300 font-semibold mb-2">⚠️ Budget Deficit Solutions:</h4>
            <ul className="text-red-200 text-sm space-y-1">
              <li>• Reduce entertainment and dining out expenses</li>
              <li>• Find additional income sources (freelance, part-time)</li>
              <li>• Negotiate lower rent or find cheaper housing</li>
              <li>• Use public transportation instead of private vehicle</li>
              <li>• Cook meals at home instead of eating out</li>
            </ul>
          </div>
        )}

        {netCashFlow > 0 && (
          <div className="mt-4 bg-green-500/20 border border-green-500/30 rounded-lg p-4">
            <h4 className="text-green-300 font-semibold mb-2">✅ Surplus Optimization Ideas:</h4>
            <ul className="text-green-200 text-sm space-y-1">
              <li>• Increase emergency fund to 6 months expenses</li>
              <li>• Invest in index funds for long-term growth</li>
              <li>• Pay extra on high-interest debt</li>
              <li>• Consider additional retirement contributions</li>
              <li>• Save for major goals (house down payment, education)</li>
            </ul>
          </div>
        )}

        <button
          onClick={() => {
            addCoins(150);
            updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 20 });
          }}
          className="w-full mt-4 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-colors"
        >
          Analyze Cash Flow (+150 coins)
        </button>
      </div>
    </div>
  );

  const renderLessons = () => (
    <div className="space-y-6">
      <div className="text-center">
        <BookOpen className="mx-auto mb-4 text-indigo-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Financial Education Center</h2>
        <p className="text-indigo-200">Master essential banking and financial management skills</p>
      </div>

      {selectedLesson ? (
        <div className="bg-white/10 rounded-xl p-8 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-bold text-2xl">{selectedLesson.title}</h3>
              <div className="flex items-center space-x-3 mt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedLesson.difficulty === 'beginner' ? 'bg-green-500/30 text-green-200' :
                  selectedLesson.difficulty === 'intermediate' ? 'bg-yellow-500/30 text-yellow-200' :
                  'bg-red-500/30 text-red-200'
                }`}>
                  {selectedLesson.difficulty.toUpperCase()}
                </span>
                <span className="text-yellow-400 font-semibold">+{selectedLesson.reward} coins</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedLesson(null)}
              className="text-purple-300 hover:text-white"
            >
              <ArrowLeft size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-purple-200 leading-relaxed">{selectedLesson.content}</p>
            </div>

            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-3">📚 Key Learning Points:</h4>
              <ul className="text-blue-200 space-y-2">
                {selectedLesson.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="text-blue-400 mt-0.5 flex-shrink-0" size={16} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-300 font-semibold mb-3">🎯 Practical Exercise:</h4>
              <p className="text-green-200">{selectedLesson.practicalExercise}</p>
            </div>

            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
              <h4 className="text-yellow-300 font-semibold mb-3">📊 Real-World Example:</h4>
              <p className="text-yellow-200">{selectedLesson.realWorldExample}</p>
            </div>

            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-3">⚠️ Common Mistakes to Avoid:</h4>
              <ul className="text-red-200 space-y-1">
                {selectedLesson.commonMistakes.map((mistake, index) => (
                  <li key={index}>• {mistake}</li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-300 font-semibold mb-3">📋 Action Steps:</h4>
              <ol className="text-purple-200 space-y-1">
                {selectedLesson.actionSteps.map((step, index) => (
                  <li key={index}>{index + 1}. {step}</li>
                ))}
              </ol>
            </div>

            <button
              onClick={() => completeLesson(selectedLesson)}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-colors"
            >
              Complete Lesson (+{selectedLesson.reward} coins)
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {financialLessons.map(lesson => (
            <button
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className="text-left bg-white/10 rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${
                  lesson.category === 'budgeting' ? 'bg-blue-500/20' :
                  lesson.category === 'saving' ? 'bg-green-500/20' :
                  lesson.category === 'borrowing' ? 'bg-orange-500/20' :
                  lesson.category === 'investing' ? 'bg-purple-500/20' :
                  'bg-cyan-500/20'
                }`}>
                  {lesson.category === 'budgeting' ? <Calculator className="text-blue-400" size={20} /> :
                   lesson.category === 'saving' ? <PiggyBank className="text-green-400" size={20} /> :
                   lesson.category === 'borrowing' ? <CreditCard className="text-orange-400" size={20} /> :
                   lesson.category === 'investing' ? <TrendingUp className="text-purple-400" size={20} /> :
                   <Target className="text-cyan-400" size={20} />}
                </div>
                <span className="text-yellow-400 font-semibold text-sm">+{lesson.reward}</span>
              </div>
              
              <h3 className="text-white font-semibold text-lg mb-2">{lesson.title}</h3>
              <p className="text-purple-200 text-sm mb-3">{lesson.content.substring(0, 120)}...</p>
              
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  lesson.difficulty === 'beginner' ? 'bg-green-500/30 text-green-200' :
                  lesson.difficulty === 'intermediate' ? 'bg-yellow-500/30 text-yellow-200' :
                  'bg-red-500/30 text-red-200'
                }`}>
                  {lesson.difficulty.toUpperCase()}
                </span>
                <span className="text-purple-300 text-xs capitalize">{lesson.category}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const renderLoanScenarios = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CreditCard className="mx-auto mb-4 text-orange-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Smart Loan Decisions</h2>
        <p className="text-orange-200">Compare loan options and make optimal borrowing choices</p>
      </div>

      {selectedLoanScenario ? (
        <div className="bg-white/10 rounded-xl p-8 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-bold text-2xl">{selectedLoanScenario.title}</h3>
              <p className="text-purple-200 mt-2">{selectedLoanScenario.purpose}</p>
              <p className="text-yellow-400 font-semibold">Loan Amount: {selectedLoanScenario.amount.toLocaleString()} VND</p>
            </div>
            <button
              onClick={() => setSelectedLoanScenario(null)}
              className="text-purple-300 hover:text-white"
            >
              <ArrowLeft size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {selectedLoanScenario.options.map((option, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4 border border-white/20">
                <h4 className="text-white font-semibold mb-3">{option.bank}</h4>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-200">Interest Rate:</span>
                    <span className="text-white">{option.interestRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-200">Term:</span>
                    <span className="text-white">{option.term} years</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-200">Monthly Payment:</span>
                    <span className="text-white">{option.monthlyPayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-purple-200">Total Cost:</span>
                    <span className="text-yellow-400">{option.totalCost.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-green-500/20 rounded p-2">
                    <h5 className="text-green-300 font-medium text-sm mb-1">Pros:</h5>
                    <ul className="text-green-200 text-xs space-y-1">
                      {option.pros.map((pro, proIndex) => (
                        <li key={proIndex}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/20 rounded p-2">
                    <h5 className="text-red-300 font-medium text-sm mb-1">Cons:</h5>
                    <ul className="text-red-200 text-xs space-y-1">
                      {option.cons.map((con, conIndex) => (
                        <li key={conIndex}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => solveLoanScenario(selectedLoanScenario, index)}
                  className={`w-full mt-4 py-2 rounded-lg font-semibold transition-colors ${
                    index === selectedLoanScenario.bestChoice
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Choose This Option
                </button>
              </div>
            ))}
          </div>

          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-300 font-semibold mb-2">💡 Analysis Tip:</h4>
            <p className="text-blue-200 text-sm">{selectedLoanScenario.explanation}</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loanScenarios.map(scenario => (
            <button
              key={scenario.id}
              onClick={() => setSelectedLoanScenario(scenario)}
              className="text-left bg-white/10 rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <CreditCard className="text-orange-400" size={24} />
                <span className="text-yellow-400 font-semibold">+{scenario.reward} coins</span>
              </div>
              
              <h3 className="text-white font-semibold text-lg mb-2">{scenario.title}</h3>
              <p className="text-purple-200 text-sm mb-3">{scenario.purpose}</p>
              <div className="text-yellow-400 font-semibold">
                Amount: {scenario.amount.toLocaleString()} VND
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const renderBankProducts = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Building2 className="mx-auto mb-4 text-blue-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Banking Products Comparison</h2>
        <p className="text-blue-200">Compare and choose the best banking products for your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bankProducts.map(product => (
          <div key={product.id} className="bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${
                product.type === 'savings' ? 'bg-green-500/20' :
                product.type === 'checking' ? 'bg-blue-500/20' :
                product.type === 'credit' ? 'bg-purple-500/20' :
                product.type === 'loan' ? 'bg-orange-500/20' :
                'bg-cyan-500/20'
              }`}>
                {product.type === 'savings' ? <PiggyBank className="text-green-400" size={20} /> :
                 product.type === 'checking' ? <Building2 className="text-blue-400" size={20} /> :
                 product.type === 'credit' ? <CreditCard className="text-purple-400" size={20} /> :
                 product.type === 'loan' ? <DollarSign className="text-orange-400" size={20} /> :
                 <TrendingUp className="text-cyan-400" size={20} />}
              </div>
              {product.recommended && (
                <span className="bg-green-500/30 text-green-200 px-2 py-1 rounded text-xs font-medium">
                  RECOMMENDED
                </span>
              )}
            </div>

            <h3 className="text-white font-semibold text-lg mb-2">{product.name}</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Interest Rate:</span>
                <span className="text-white">{product.interestRate}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Annual Fee:</span>
                <span className="text-white">{product.fees.toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Risk Level:</span>
                <span className={`${
                  product.riskLevel === 'low' ? 'text-green-400' :
                  product.riskLevel === 'medium' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {product.riskLevel.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-green-500/20 rounded p-2">
                <h4 className="text-green-300 font-medium text-sm mb-1">Benefits:</h4>
                <ul className="text-green-200 text-xs space-y-1">
                  {product.benefits.map((benefit, index) => (
                    <li key={index}>• {benefit}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-blue-500/20 rounded p-2">
                <h4 className="text-blue-300 font-medium text-sm mb-1">Requirements:</h4>
                <ul className="text-blue-200 text-xs space-y-1">
                  {product.requirements.map((req, index) => (
                    <li key={index}>• {req}</li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => {
                addCoins(50);
                updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 5 });
              }}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              Learn More (+50 coins)
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCalculator = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Calculator className="mx-auto mb-4 text-cyan-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Financial Calculators</h2>
        <p className="text-cyan-200">Interactive tools to plan your financial future</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Savings Growth Calculator */}
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4">Savings Growth Calculator</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-purple-200 text-sm mb-1">Monthly Savings (VND):</label>
              <input
                type="number"
                defaultValue="2000000"
                className="w-full bg-white/20 text-white px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-purple-200 text-sm mb-1">Annual Interest Rate (%):</label>
              <input
                type="number"
                defaultValue="6"
                step="0.1"
                className="w-full bg-white/20 text-white px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-purple-200 text-sm mb-1">Time Period (years):</label>
              <input
                type="number"
                defaultValue="10"
                className="w-full bg-white/20 text-white px-3 py-2 rounded"
              />
            </div>
            
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-300 font-semibold mb-2">Projected Results:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-200">Total Invested:</span>
                  <span className="text-white">240,000,000 VND</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-200">Interest Earned:</span>
                  <span className="text-green-400">87,500,000 VND</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-green-200">Final Amount:</span>
                  <span className="text-green-400">327,500,000 VND</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                addCoins(75);
                updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 10 });
              }}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-colors"
            >
              Calculate Savings (+75 coins)
            </button>
          </div>
        </div>

        {/* Loan Payment Calculator */}
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4">Loan Payment Calculator</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-purple-200 text-sm mb-1">Loan Amount (VND):</label>
              <input
                type="number"
                defaultValue="500000000"
                className="w-full bg-white/20 text-white px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-purple-200 text-sm mb-1">Interest Rate (%):</label>
              <input
                type="number"
                defaultValue="8.5"
                step="0.1"
                className="w-full bg-white/20 text-white px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-purple-200 text-sm mb-1">Loan Term (years):</label>
              <input
                type="number"
                defaultValue="5"
                className="w-full bg-white/20 text-white px-3 py-2 rounded"
              />
            </div>
            
            <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4">
              <h4 className="text-orange-300 font-semibold mb-2">Loan Details:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-orange-200">Monthly Payment:</span>
                  <span className="text-white">10,200,000 VND</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-200">Total Interest:</span>
                  <span className="text-orange-400">112,000,000 VND</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-orange-200">Total Paid:</span>
                  <span className="text-orange-400">612,000,000 VND</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                addCoins(75);
                updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 10 });
              }}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-colors"
            >
              Calculate Loan (+75 coins)
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-semibold mb-4">Smart Borrowing Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-green-300 font-medium">✅ Good Debt Examples:</h4>
            <ul className="text-green-200 text-sm space-y-1">
              <li>• Mortgage for primary residence</li>
              <li>• Student loans for education</li>
              <li>• Business loans for income generation</li>
              <li>• Car loans for necessary transportation</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-red-300 font-medium">❌ Bad Debt Examples:</h4>
            <ul className="text-red-200 text-sm space-y-1">
              <li>• Credit card debt for luxury purchases</li>
              <li>• Personal loans for vacations</li>
              <li>• Payday loans with extreme interest rates</li>
              <li>• Loans for depreciating assets</li>
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
        <p className="text-blue-200">Master banking, budgeting, and financial management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { id: 'budgeting', name: 'Budget Master', icon: Calculator, color: 'from-blue-500 to-cyan-500', description: 'Learn 50/30/20 rule and expense tracking' },
          { id: 'savings', name: 'Savings Simulator', icon: PiggyBank, color: 'from-green-500 to-emerald-500', description: 'Build emergency funds and savings habits' },
          { id: 'loans', name: 'Loan Advisor', icon: CreditCard, color: 'from-orange-500 to-red-500', description: 'Compare loans and make smart borrowing decisions' },
          { id: 'products', name: 'Banking Products', icon: Building2, color: 'from-purple-500 to-pink-500', description: 'Explore savings, checking, and credit options' },
          { id: 'lessons', name: 'Financial Academy', icon: BookOpen, color: 'from-indigo-500 to-purple-500', description: 'Comprehensive financial education' },
          { id: 'calculator', name: 'Financial Tools', icon: Calculator, color: 'from-cyan-500 to-blue-500', description: 'Interactive calculators and planning tools' },
          { id: 'cashflow', name: 'Cash Flow Manager', icon: Activity, color: 'from-teal-500 to-green-500', description: 'Track income and expenses in real-time' },
          { id: 'wheel', name: 'Banking Rewards', icon: Gift, color: 'from-yellow-500 to-orange-500', description: 'Spin for banking bonuses and rewards' }
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
        <h2 className="text-xl font-bold text-white mb-4">Your Banking Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{progress.financialLiteracyScore}</div>
            <p className="text-blue-200 text-sm">Financial Knowledge</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{progress.coins}</div>
            <p className="text-green-200 text-sm">Total Coins</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{progress.level}</div>
            <p className="text-purple-200 text-sm">Banking Level</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {financialLessons.filter(l => l.completed).length}/{financialLessons.length}
            </div>
            <p className="text-yellow-200 text-sm">Lessons Completed</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeGame) {
      case 'budgeting':
        return renderBudgetingGame();
      case 'cashflow':
        return renderCashFlowGame();
      case 'lessons':
        return renderLessons();
      case 'loans':
        return renderLoanScenarios();
      case 'products':
        return renderBankProducts();
      case 'calculator':
        return renderCalculator();
      case 'wheel':
        return (
          <div className="text-center py-12">
            <Gift className="mx-auto mb-4 text-yellow-400" size={64} />
            <h2 className="text-2xl font-bold text-white mb-2">Banking Reward Wheel</h2>
            <p className="text-yellow-200 mb-6">Spin for exclusive banking bonuses and financial tools!</p>
            <button
              onClick={() => {
                addCoins(Math.floor(Math.random() * 200) + 50);
                updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 5 });
              }}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transition-colors"
            >
              Spin Banking Wheel (100 coins)
            </button>
          </div>
        );
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
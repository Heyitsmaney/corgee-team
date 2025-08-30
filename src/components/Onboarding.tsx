import React, { useState } from 'react';
import { Mail, Chrome, User, Palette, Target, Brain, DollarSign, PiggyBank, TrendingUp, Shield, CreditCard, Calculator, AlertTriangle, Coins } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { UserProfile } from '../contexts/UserContext';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const { updateProfile, updateProgress } = useUser();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    avatar: {
      gender: 'male' as 'male' | 'female',
      skinTone: '#F4A460',
      outfit: 'casual'
    },
    financialProfile: {
      monthlyIncome: '',
      primaryExpenses: '',
      savingsHabits: '',
      debtSituation: '',
      investmentExperience: '',
      financialGoals: '',
      riskTolerance: '',
      budgetingMethod: '',
      emergencyFund: '',
      scamAwareness: '',
      onlineShoppingHabits: '',
      financialEducation: ''
    },
    goals: '',
    bio: ''
  });

  const steps = [
    'Login',
    'Create Avatar', 
    'Financial Assessment',
    'Risk & Security Profile',
    'Goals & Preferences'
  ];

  const handleLogin = (provider: string) => {
    setFormData(prev => ({ 
      ...prev, 
      email: provider === 'email' ? 'user@example.com' : 'user@gmail.com',
      name: 'Player'
    }));
    setStep(1);
  };

  const handleFinancialAnswer = (question: string, answer: string) => {
    setFormData(prev => ({
      ...prev,
      financialProfile: { ...prev.financialProfile, [question]: answer }
    }));
  };

  const completeOnboarding = () => {
    const profile: UserProfile = {
      id: 'user-1',
      email: formData.email,
      name: formData.name,
      avatar: formData.avatar,
      financialPersona: {
        type: formData.financialProfile.savingsHabits === 'regular_saver' ? 'saver' : 
              formData.financialProfile.investmentExperience === 'experienced' ? 'investor' : 'spender',
        riskTolerance: formData.financialProfile.riskTolerance as 'low' | 'medium' | 'high',
        scamAwareness: formData.financialProfile.scamAwareness === 'very_aware' ? 3 : 
                      formData.financialProfile.scamAwareness === 'somewhat_aware' ? 2 : 1
      },
      goals: formData.goals,
      bio: formData.bio
    };

    // Set initial progress based on financial profile
    const initialProgress = {
      level: 1,
      coins: formData.financialProfile.emergencyFund === 'six_months' ? 200 : 
             formData.financialProfile.emergencyFund === 'three_months' ? 150 : 100,
      financialLiteracyScore: formData.financialProfile.financialEducation === 'advanced' ? 30 :
                             formData.financialProfile.financialEducation === 'intermediate' ? 20 : 10,
      milSkillScore: formData.financialProfile.scamAwareness === 'very_aware' ? 25 :
                    formData.financialProfile.scamAwareness === 'somewhat_aware' ? 15 : 5,
      badges: [],
      completedChallenges: [],
      cityBuildings: ['house']
    };

    updateProfile(profile);
    updateProgress(initialProgress);
    onComplete();
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Welcome to FinVerse</h1>
              <p className="text-purple-200 text-lg">Your comprehensive financial literacy and cybersecurity adventure begins here!</p>
              <div className="mt-6 bg-white/10 rounded-lg p-4">
                <h2 className="text-white font-semibold mb-2">What You'll Learn:</h2>
                <div className="grid grid-cols-2 gap-3 text-sm text-purple-200">
                  <div className="flex items-center space-x-2">
                    <PiggyBank size={16} className="text-green-400" />
                    <span>Smart Saving & Budgeting</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield size={16} className="text-red-400" />
                    <span>Scam Detection & Prevention</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp size={16} className="text-blue-400" />
                    <span>Investment & Trading</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CreditCard size={16} className="text-purple-400" />
                    <span>Smart Shopping & Spending</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => handleLogin('email')}
                className="w-full flex items-center justify-center space-x-3 bg-white text-purple-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <Mail size={20} />
                <span>Continue with Email</span>
              </button>
              
              <button
                onClick={() => handleLogin('google')}
                className="w-full flex items-center justify-center space-x-3 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Chrome size={20} />
                <span>Continue with Google</span>
              </button>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="mx-auto mb-4 text-purple-300" size={48} />
              <h2 className="text-2xl font-bold text-white mb-2">Create Your Avatar</h2>
              <p className="text-purple-200">Customize your financial journey character</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 space-y-6">
              <div>
                <label className="block text-white font-semibold mb-3">Display Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your display name"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-purple-300 border border-white/30 focus:border-purple-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">Gender</label>
                <div className="flex space-x-4">
                  {['male', 'female'].map(gender => (
                    <button
                      key={gender}
                      onClick={() => setFormData(prev => ({ ...prev, avatar: { ...prev.avatar, gender: gender as 'male' | 'female' } }))}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        formData.avatar.gender === gender 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-white/20 text-purple-200 hover:bg-white/30'
                      }`}
                    >
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">Skin Tone</label>
                <div className="flex space-x-3">
                  {['#F4A460', '#DEB887', '#D2691E', '#8B4513', '#654321'].map(color => (
                    <button
                      key={color}
                      onClick={() => setFormData(prev => ({ ...prev, avatar: { ...prev.avatar, skinTone: color } }))}
                      className={`w-12 h-12 rounded-full border-4 transition-transform hover:scale-110 ${
                        formData.avatar.skinTone === color ? 'border-white' : 'border-white/30'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">Outfit Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {['casual', 'business', 'sporty', 'trendy'].map(outfit => (
                    <button
                      key={outfit}
                      onClick={() => setFormData(prev => ({ ...prev, avatar: { ...prev.avatar, outfit } }))}
                      className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                        formData.avatar.outfit === outfit 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-white/20 text-purple-200 hover:bg-white/30'
                      }`}
                    >
                      {outfit.charAt(0).toUpperCase() + outfit.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!formData.name}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50"
            >
              Next: Financial Assessment
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <DollarSign className="mx-auto mb-4 text-green-400" size={48} />
              <h2 className="text-2xl font-bold text-white mb-2">Financial Assessment</h2>
              <p className="text-purple-200">Help us understand your current financial situation</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <Coins className="mr-2 text-yellow-400" size={20} />
                  What's your approximate monthly income?
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: 'under_5m', label: 'Under 5 million VND ($200)' },
                    { value: '5m_15m', label: '5-15 million VND ($200-600)' },
                    { value: '15m_30m', label: '15-30 million VND ($600-1,200)' },
                    { value: 'over_30m', label: 'Over 30 million VND ($1,200+)' },
                    { value: 'student', label: 'I\'m a student with no regular income' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleFinancialAnswer('monthlyIncome', option.value)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        formData.financialProfile.monthlyIncome === option.value
                          ? 'bg-green-600 text-white'
                          : 'bg-white/20 text-purple-200 hover:bg-white/30'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <CreditCard className="mr-2 text-blue-400" size={20} />
                  What are your primary monthly expenses?
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: 'basic_needs', label: 'Basic needs only (food, housing, transport)' },
                    { value: 'comfortable', label: 'Comfortable living with some entertainment' },
                    { value: 'lifestyle', label: 'Lifestyle expenses (dining out, shopping, hobbies)' },
                    { value: 'luxury', label: 'Luxury spending and premium services' },
                    { value: 'family_support', label: 'Supporting family members financially' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleFinancialAnswer('primaryExpenses', option.value)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        formData.financialProfile.primaryExpenses === option.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/20 text-purple-200 hover:bg-white/30'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <PiggyBank className="mr-2 text-green-400" size={20} />
                  How do you currently handle savings?
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: 'no_savings', label: 'I don\'t save money regularly' },
                    { value: 'occasional', label: 'I save occasionally when I have extra money' },
                    { value: 'monthly_fixed', label: 'I save a fixed amount every month' },
                    { value: 'percentage_based', label: 'I save a percentage of my income (20-30%)' },
                    { value: 'automated', label: 'I have automated savings and investment plans' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleFinancialAnswer('savingsHabits', option.value)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        formData.financialProfile.savingsHabits === option.value
                          ? 'bg-green-600 text-white'
                          : 'bg-white/20 text-purple-200 hover:bg-white/30'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <Calculator className="mr-2 text-orange-400" size={20} />
                  What's your current debt situation?
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: 'no_debt', label: 'I have no debt' },
                    { value: 'student_loans', label: 'Student loans only' },
                    { value: 'credit_cards', label: 'Credit card debt that I pay monthly' },
                    { value: 'multiple_debts', label: 'Multiple debts (credit cards, personal loans)' },
                    { value: 'struggling', label: 'I\'m struggling to manage my debt payments' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleFinancialAnswer('debtSituation', option.value)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        formData.financialProfile.debtSituation === option.value
                          ? 'bg-orange-600 text-white'
                          : 'bg-white/20 text-purple-200 hover:bg-white/30'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={!formData.financialProfile.monthlyIncome || !formData.financialProfile.primaryExpenses || 
                       !formData.financialProfile.savingsHabits || !formData.financialProfile.debtSituation}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next: Risk & Security Profile
            </button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Shield className="mx-auto mb-4 text-red-400" size={48} />
              <h2 className="text-2xl font-bold text-white mb-2">Risk & Security Assessment</h2>
              <p className="text-purple-200">Understand your investment risk tolerance and cybersecurity awareness</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <TrendingUp className="mr-2 text-purple-400" size={20} />
                  What's your investment experience?
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: 'none', label: 'No investment experience' },
                    { value: 'beginner', label: 'Beginner - savings accounts and basic funds' },
                    { value: 'intermediate', label: 'Intermediate - stocks, bonds, some trading' },
                    { value: 'experienced', label: 'Experienced - diverse portfolio and strategies' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleFinancialAnswer('investmentExperience', option.value)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        formData.financialProfile.investmentExperience === option.value
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/20 text-purple-200 hover:bg-white/30'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <Target className="mr-2 text-blue-400" size={20} />
                  How do you handle investment risk?
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: 'low', label: 'Conservative - I prefer guaranteed returns even if lower' },
                    { value: 'medium', label: 'Balanced - I accept some risk for better returns' },
                    { value: 'high', label: 'Aggressive - I\'m comfortable with high risk for high rewards' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleFinancialAnswer('riskTolerance', option.value)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        formData.financialProfile.riskTolerance === option.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/20 text-purple-200 hover:bg-white/30'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <AlertTriangle className="mr-2 text-red-400" size={20} />
                  How aware are you of online scams and cybersecurity?
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: 'not_aware', label: 'Not very aware - I sometimes click suspicious links' },
                    { value: 'somewhat_aware', label: 'Somewhat aware - I\'m cautious but not always sure' },
                    { value: 'very_aware', label: 'Very aware - I actively avoid and report scams' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleFinancialAnswer('scamAwareness', option.value)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        formData.financialProfile.scamAwareness === option.value
                          ? 'bg-red-600 text-white'
                          : 'bg-white/20 text-purple-200 hover:bg-white/30'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">Do you have an emergency fund?</h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: 'none', label: 'No emergency fund' },
                    { value: 'one_month', label: '1 month of expenses saved' },
                    { value: 'three_months', label: '3 months of expenses saved' },
                    { value: 'six_months', label: '6+ months of expenses saved' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleFinancialAnswer('emergencyFund', option.value)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        formData.financialProfile.emergencyFund === option.value
                          ? 'bg-green-600 text-white'
                          : 'bg-white/20 text-purple-200 hover:bg-white/30'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(4)}
              disabled={!formData.financialProfile.investmentExperience || !formData.financialProfile.riskTolerance || 
                       !formData.financialProfile.scamAwareness || !formData.financialProfile.emergencyFund}
              className="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next: Goals & Preferences
            </button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="mx-auto mb-4 text-purple-300" size={48} />
              <h2 className="text-2xl font-bold text-white mb-2">Goals & Preferences</h2>
              <p className="text-purple-200">Set your financial goals and learning preferences</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">What's your primary financial goal?</h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: 'emergency_fund', label: 'Build an emergency fund' },
                    { value: 'debt_free', label: 'Become debt-free' },
                    { value: 'save_major_purchase', label: 'Save for a major purchase (house, car)' },
                    { value: 'investment_growth', label: 'Grow wealth through investments' },
                    { value: 'retirement', label: 'Plan for retirement' },
                    { value: 'financial_independence', label: 'Achieve financial independence' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleFinancialAnswer('financialGoals', option.value)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        formData.financialProfile.financialGoals === option.value
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/20 text-purple-200 hover:bg-white/30'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">How do you currently track your budget?</h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: 'no_tracking', label: 'I don\'t track my spending' },
                    { value: 'mental_tracking', label: 'I keep track mentally' },
                    { value: 'simple_notes', label: 'I use notes or simple apps' },
                    { value: 'spreadsheet', label: 'I use spreadsheets or detailed apps' },
                    { value: 'professional_tools', label: 'I use professional financial planning tools' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleFinancialAnswer('budgetingMethod', option.value)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        formData.financialProfile.budgetingMethod === option.value
                          ? 'bg-cyan-600 text-white'
                          : 'bg-white/20 text-purple-200 hover:bg-white/30'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">What's your current level of financial education?</h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: 'basic', label: 'Basic - I know about saving and spending' },
                    { value: 'intermediate', label: 'Intermediate - I understand investments and loans' },
                    { value: 'advanced', label: 'Advanced - I actively manage investments and taxes' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleFinancialAnswer('financialEducation', option.value)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        formData.financialProfile.financialEducation === option.value
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white/20 text-purple-200 hover:bg-white/30'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Describe your main financial goal</label>
                <textarea
                  value={formData.goals}
                  onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                  placeholder="e.g., Save $10,000 for emergency fund, pay off credit card debt, buy a house..."
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-purple-300 border border-white/30 focus:border-purple-400 focus:outline-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Tell us about yourself (optional)</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Share your background, interests, or what you hope to learn..."
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-purple-300 border border-white/30 focus:border-purple-400 focus:outline-none"
                  rows={3}
                />
              </div>
            </div>

            <button
              onClick={completeOnboarding}
              disabled={!formData.financialProfile.financialGoals || !formData.financialProfile.budgetingMethod || 
                       !formData.financialProfile.financialEducation || !formData.goals}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-colors disabled:opacity-50"
            >
              Start Your FinVerse Journey!
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-purple-300 mb-2">
            <span>Step {step + 1} of {steps.length}</span>
            <span>{steps[step]}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};
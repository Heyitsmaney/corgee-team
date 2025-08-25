import React, { useState } from 'react';
import { Mail, Chrome, User, Palette, Target, Brain } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { UserProfile } from '../contexts/UserContext';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const { updateProfile } = useUser();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    avatar: {
      gender: 'male' as 'male' | 'female',
      skinTone: '#F4A460',
      outfit: 'casual'
    },
    quiz: {
      spendingHabits: '',
      riskTolerance: '',
      scamAwareness: ''
    },
    goals: '',
    bio: ''
  });

  const steps = [
    'Login',
    'Create Avatar', 
    'Financial Quiz',
    'Profile Setup'
  ];

  const handleLogin = (provider: string) => {
    // Simulate login process
    setFormData(prev => ({ 
      ...prev, 
      email: provider === 'email' ? 'user@example.com' : 'user@gmail.com',
      name: 'Player'
    }));
    setStep(1);
  };

  const handleQuizAnswer = (question: string, answer: string) => {
    setFormData(prev => ({
      ...prev,
      quiz: { ...prev.quiz, [question]: answer }
    }));
  };

  const completeOnboarding = () => {
    const profile: UserProfile = {
      id: 'user-1',
      email: formData.email,
      name: formData.name,
      avatar: formData.avatar,
      financialPersona: {
        type: formData.quiz.spendingHabits === 'save' ? 'saver' : 
              formData.quiz.spendingHabits === 'invest' ? 'investor' : 'spender',
        riskTolerance: formData.quiz.riskTolerance as 'low' | 'medium' | 'high',
        scamAwareness: formData.quiz.scamAwareness === 'never' ? 3 : 
                      formData.quiz.scamAwareness === 'sometimes' ? 2 : 1
      },
      goals: formData.goals,
      bio: formData.bio
    };

    updateProfile(profile);
    onComplete();
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Welcome to FinVerse</h1>
              <p className="text-purple-200 text-lg">Your financial literacy adventure begins here!</p>
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
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
            >
              Next: Financial Quiz
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Brain className="mx-auto mb-4 text-purple-300" size={48} />
              <h2 className="text-2xl font-bold text-white mb-2">Financial Personality Quiz</h2>
              <p className="text-purple-200">Help us personalize your experience</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">What's your preferred approach to money?</h3>
                <div className="space-y-3">
                  {[
                    { value: 'save', label: 'I prefer to save and be cautious' },
                    { value: 'invest', label: 'I like to invest for growth' },
                    { value: 'spend', label: 'I enjoy spending on experiences' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleQuizAnswer('spendingHabits', option.value)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        formData.quiz.spendingHabits === option.value
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
                <h3 className="text-white font-semibold mb-4">How do you handle financial risk?</h3>
                <div className="space-y-3">
                  {[
                    { value: 'low', label: 'Very conservative - safety first' },
                    { value: 'medium', label: 'Balanced - some risk is okay' },
                    { value: 'high', label: 'Aggressive - high risk, high reward' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleQuizAnswer('riskTolerance', option.value)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        formData.quiz.riskTolerance === option.value
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
                <h3 className="text-white font-semibold mb-4">Do you ever click on suspicious links?</h3>
                <div className="space-y-3">
                  {[
                    { value: 'never', label: 'Never - I\'m very cautious online' },
                    { value: 'sometimes', label: 'Sometimes - if it looks legitimate' },
                    { value: 'often', label: 'Often - I trust most links' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleQuizAnswer('scamAwareness', option.value)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        formData.quiz.scamAwareness === option.value
                          ? 'bg-purple-600 text-white'
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
              disabled={!formData.quiz.spendingHabits || !formData.quiz.riskTolerance || !formData.quiz.scamAwareness}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next: Complete Profile
            </button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="mx-auto mb-4 text-purple-300" size={48} />
              <h2 className="text-2xl font-bold text-white mb-2">Complete Your Profile</h2>
              <p className="text-purple-200">Set your financial goals and personality</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">Financial Goal</label>
                <textarea
                  value={formData.goals}
                  onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                  placeholder="e.g., Save $5000 for a new car, Build emergency fund..."
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-purple-300 border border-white/30 focus:border-purple-400 focus:outline-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Short Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell others about yourself and your financial journey..."
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-purple-300 border border-white/30 focus:border-purple-400 focus:outline-none"
                  rows={3}
                />
              </div>
            </div>

            <button
              onClick={completeOnboarding}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-colors"
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
      <div className="max-w-md w-full">
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
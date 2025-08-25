import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Trophy, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useGame } from '../contexts/GameContext';

interface DailyChallengeProps {
  onNavigate: (screen: 'dashboard' | 'game' | 'challenge' | 'community') => void;
}

export const DailyChallenge: React.FC<DailyChallengeProps> = ({ onNavigate }) => {
  const { progress, addCoins, updateProgress } = useUser();
  const { currentChallenge, setCurrentChallenge, generateDailyChallenge, dailyChallenges } = useGame();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [streak, setStreak] = useState(5); // Simulated streak

  useEffect(() => {
    // Generate today's challenge if none exists
    if (!currentChallenge) {
      generateDailyChallenge();
    }
  }, [currentChallenge, generateDailyChallenge]);

  const handleAnswerSelect = (answerId: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answerId);
  };

  const submitAnswer = () => {
    if (!selectedAnswer || !currentChallenge) return;
    
    const selectedOption = currentChallenge.options.find(opt => opt.id === selectedAnswer);
    const isCorrect = selectedOption?.correct || false;
    
    setShowFeedback(true);
    setChallengeCompleted(true);
    
    if (isCorrect) {
      addCoins(currentChallenge.reward);
      updateProgress({ 
        financialLiteracyScore: progress.financialLiteracyScore + 15,
        milSkillScore: progress.milSkillScore + 10
      });
    }
  };

  const getNextChallenge = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setChallengeCompleted(false);
    generateDailyChallenge();
  };

  const upcomingChallenges = [
    {
      date: 'Tomorrow',
      title: 'Credit Card Safety',
      type: 'Security',
      difficulty: 'Medium'
    },
    {
      date: 'Day 3',
      title: 'Emergency Fund Planning',
      type: 'Finance',
      difficulty: 'Easy'
    },
    {
      date: 'Day 4',
      title: 'Social Media Scams',
      type: 'Security',
      difficulty: 'Hard'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-orange-500/20 px-3 py-2 rounded-full">
              <Trophy className="text-orange-400" size={20} />
              <span className="text-white font-semibold">{streak} day streak</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Page Header */}
        <div className="text-center">
          <Calendar className="mx-auto mb-4 text-purple-400" size={64} />
          <h1 className="text-3xl font-bold text-white mb-2">Daily Challenge</h1>
          <p className="text-purple-200">Test your financial knowledge and earn rewards!</p>
        </div>

        {/* Challenge Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-xl p-6 border border-blue-500/30 text-center">
            <Clock className="mx-auto mb-2 text-blue-400" size={32} />
            <div className="text-2xl font-bold text-white">24:00</div>
            <div className="text-blue-200 text-sm">Time Remaining</div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-lg rounded-xl p-6 border border-orange-500/30 text-center">
            <Trophy className="mx-auto mb-2 text-orange-400" size={32} />
            <div className="text-2xl font-bold text-white">{streak}</div>
            <div className="text-orange-200 text-sm">Day Streak</div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-xl p-6 border border-green-500/30 text-center">
            <CheckCircle className="mx-auto mb-2 text-green-400" size={32} />
            <div className="text-2xl font-bold text-white">{progress.completedChallenges.length}</div>
            <div className="text-green-200 text-sm">Completed</div>
          </div>
        </div>

        {/* Today's Challenge */}
        {currentChallenge && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Today's Challenge</h2>
                <div className="flex items-center space-x-4 text-sm">
                  <span className={`px-3 py-1 rounded-full ${
                    currentChallenge.type === 'scam' ? 'bg-red-500/30 text-red-200' :
                    currentChallenge.type === 'finance' ? 'bg-blue-500/30 text-blue-200' :
                    'bg-green-500/30 text-green-200'
                  }`}>
                    {currentChallenge.type.toUpperCase()}
                  </span>
                  <span className="text-purple-300">{currentChallenge.reward} coins reward</span>
                </div>
              </div>
              
              {currentChallenge.type === 'scam' && (
                <AlertTriangle className="text-red-400" size={32} />
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">{currentChallenge.title}</h3>
              <p className="text-purple-200 text-lg leading-relaxed">{currentChallenge.description}</p>
            </div>

            <div className="space-y-4">
              {currentChallenge.options.map(option => {
                const isSelected = selectedAnswer === option.id;
                const isCorrect = option.correct;
                const showResult = showFeedback && isSelected;
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? showResult
                          ? isCorrect
                            ? 'bg-green-500/20 border-green-500/50 text-green-100'
                            : 'bg-red-500/20 border-red-500/50 text-red-100'
                          : 'bg-purple-600/30 border-purple-500/50 text-white'
                        : 'bg-white/10 border-white/20 text-purple-200 hover:bg-white/20 hover:border-white/40'
                    } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.text}</span>
                      {showFeedback && isSelected && (
                        isCorrect ? (
                          <CheckCircle className="text-green-400" size={24} />
                        ) : (
                          <XCircle className="text-red-400" size={24} />
                        )
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {!showFeedback && (
              <button
                onClick={submitAnswer}
                disabled={!selectedAnswer}
                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
            )}

            {showFeedback && (
              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Explanation:</h4>
                <p className="text-purple-200">{currentChallenge.feedback}</p>
                
                {challengeCompleted && (
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-green-400 font-semibold">
                      Challenge Complete! +{currentChallenge.reward} coins
                    </div>
                    <button
                      onClick={getNextChallenge}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Try Another Challenge
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Upcoming Challenges */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4">Upcoming Challenges</h2>
          <div className="space-y-3">
            {upcomingChallenges.map((challenge, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">{challenge.title}</h3>
                  <div className="flex items-center space-x-3 text-sm mt-1">
                    <span className="text-purple-300">{challenge.date}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      challenge.type === 'Security' ? 'bg-red-500/30 text-red-200' : 'bg-blue-500/30 text-blue-200'
                    }`}>
                      {challenge.type}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      challenge.difficulty === 'Easy' ? 'bg-green-500/30 text-green-200' :
                      challenge.difficulty === 'Medium' ? 'bg-yellow-500/30 text-yellow-200' :
                      'bg-red-500/30 text-red-200'
                    }`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                </div>
                <Clock className="text-purple-400" size={20} />
              </div>
            ))}
          </div>
        </div>

        {/* Challenge History */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4">Recent Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">This Week</span>
                <span className="text-white">6/7 Correct</span>
              </div>
              <div className="w-full bg-purple-900/30 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '86%' }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">All Time</span>
                <span className="text-white">89% Success Rate</span>
              </div>
              <div className="w-full bg-purple-900/30 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: '89%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
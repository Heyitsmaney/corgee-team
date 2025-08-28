import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Trophy, AlertTriangle, CheckCircle, XCircle, Brain, Smartphone, Mail, Phone, CreditCard, DollarSign } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useGame } from '../contexts/GameContext';

interface DailyChallengeProps {
  onNavigate: (screen: 'dashboard' | 'game' | 'challenge' | 'community') => void;
}

interface RealityChallenge {
  id: string;
  type: 'sms' | 'email' | 'call' | 'social' | 'investment';
  title: string;
  scenario: string;
  context: string;
  options: {
    id: string;
    text: string;
    correct: boolean;
    consequence: string;
    explanation: string;
  }[];
  reward: number;
  aiMentorTip: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const DailyChallenge: React.FC<DailyChallengeProps> = ({ onNavigate }) => {
  const { progress, addCoins, updateProgress, addBadge } = useUser();
  const { currentChallenge, setCurrentChallenge, generateDailyChallenge } = useGame();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [streak, setStreak] = useState(5);
  const [currentRealityChallenge, setCurrentRealityChallenge] = useState<RealityChallenge | null>(null);

  const realityChallenges: RealityChallenge[] = [
    {
      id: '1',
      type: 'sms',
      title: 'Bank Account Locked SMS',
      scenario: 'You receive an SMS message',
      context: 'WARNING: Your VCB account has been locked due to unusual activity. Click link to verify immediately: vcb-verify.com/unlock',
      options: [
        {
          id: 'a',
          text: 'Click the link immediately to verify',
          correct: false,
          consequence: 'You could be scammed and lose personal information',
          explanation: 'This is a scam message. Banks never ask for verification via SMS.'
        },
        {
          id: 'b',
          text: 'Call the bank directly using their official hotline',
          correct: true,
          consequence: 'You verify safely and avoid being scammed',
          explanation: 'Correct! Always contact the bank directly through official phone numbers.'
        },
        {
          id: 'c',
          text: 'Ignore the message completely',
          correct: false,
          consequence: 'Might miss important information if it was a real message',
          explanation: 'Better to verify with the bank to be sure.'
        }
      ],
      reward: 100,
      aiMentorTip: 'Banks never ask for information verification via SMS or email. Always contact directly!',
      difficulty: 'easy'
    },
    {
      id: '2',
      type: 'investment',
      title: 'FOMO TikTok Investment Ad',
      scenario: 'You see a TikTok ad',
      context: 'TikTok Ad: "🚀 LAST CHANCE! Invest in MegaCoin now and get 10% MONTHLY returns with ZERO risk! My students made $50,000 in 30 days! Link in bio - only 24 hours left!"',
      options: [
        {
          id: 'a',
          text: 'Invest immediately - don\'t want to miss out!',
          correct: false,
          consequence: 'You likely lose money to a FOMO scam',
          explanation: 'FOMO tactics and unrealistic returns are classic scam signs.'
        },
        {
          id: 'b',
          text: 'Research the company and check for licenses before deciding',
          correct: true,
          consequence: 'You make an informed decision and avoid scams',
          explanation: 'Correct! Always research investments thoroughly, especially those with unrealistic promises.'
        },
        {
          id: 'c',
          text: 'Ask friends to join together for better returns',
          correct: false,
          consequence: 'You spread the scam to others and lose money together',
          explanation: 'Never involve others in unverified investment opportunities.'
        }
      ],
      reward: 150,
      aiMentorTip: '10% monthly returns with zero risk is impossible. Real investments carry risk and require research!',
      difficulty: 'medium'
    },
    {
      id: '3',
      type: 'social',
      title: 'Ransomware Email Attack',
      scenario: 'You receive an urgent email',
      context: 'Subject: URGENT - Your files have been encrypted! We have locked all your important documents. Pay 0.5 Bitcoin to wallet: 1A2B3C4D5E to get the decryption key within 48 hours or lose everything forever!',
      options: [
        {
          id: 'a',
          text: 'Pay the Bitcoin ransom immediately',
          correct: false,
          consequence: 'You lose money and may not get files back anyway',
          explanation: 'Paying ransomware encourages more attacks and doesn\'t guarantee file recovery.'
        },
        {
          id: 'b',
          text: 'Disconnect from internet and contact IT security experts',
          correct: true,
          consequence: 'You contain the attack and get professional help',
          explanation: 'Correct! Isolate the system and get expert help rather than paying criminals.'
        },
        {
          id: 'c',
          text: 'Click links in the email to learn more',
          correct: false,
          consequence: 'You might download more malware or give attackers more access',
          explanation: 'Never click links in suspicious emails, especially ransomware threats.'
        }
      ],
      reward: 120,
      aiMentorTip: 'Ransomware attacks are serious. Never pay ransoms - backup data regularly and use security software!',
      difficulty: 'hard'
    },
    {
      id: '4',
      type: 'social',
      title: 'Online Purchase Scam',
      scenario: 'You find a great deal online',
      context: 'Facebook Marketplace: "iPhone 15 Pro Max - Brand New, Original Box - Only $200! Must sell today due to emergency. Payment via bank transfer only. No meetups, will ship immediately!"',
      options: [
        {
          id: 'a',
          text: 'Transfer money immediately - great deal!',
          correct: false,
          consequence: 'You lose money and receive nothing',
          explanation: 'Too-good-to-be-true prices and bank transfer only are scam red flags.'
        },
        {
          id: 'b',
          text: 'Ask to meet in person and inspect the item first',
          correct: true,
          consequence: 'You avoid the scam by insisting on safe transaction methods',
          explanation: 'Correct! Always inspect items in person and use secure payment methods.'
        },
        {
          id: 'c',
          text: 'Ask for more photos and seller verification',
          correct: false,
          consequence: 'Scammer can easily fake photos and documents',
          explanation: 'Photos can be stolen from legitimate listings. Physical inspection is key.'
        }
      ],
      reward: 200,
      aiMentorTip: 'If the price seems too good to be true, it probably is. Always meet sellers in safe public places!',
      difficulty: 'medium'
    },
    {
      id: '5',
      type: 'social',
      title: 'Job Scam - Fake Remote Work',
      scenario: 'You receive a job offer email',
      context: 'Email: "Congratulations! You\'ve been selected for a $5000/month remote data entry position. No experience needed! Just pay $299 for training materials and equipment. Start earning immediately after payment!"',
      options: [
        {
          id: 'a',
          text: 'Pay the fee - $5000/month sounds amazing!',
          correct: false,
          consequence: 'You lose $299 and the job doesn\'t exist',
          explanation: 'Legitimate employers never ask for upfront payments from employees.'
        },
        {
          id: 'b',
          text: 'Research the company and ask for official documentation',
          correct: true,
          consequence: 'You discover it\'s a scam and avoid losing money',
          explanation: 'Correct! Always verify job offers through official company channels.'
        },
        {
          id: 'c',
          text: 'Ask friends if they know about this opportunity',
          correct: false,
          consequence: 'Friends might not recognize the scam either',
          explanation: 'Better to research the company directly rather than rely on word-of-mouth.'
        }
      ],
      reward: 130,
      aiMentorTip: 'Real jobs pay you, not the other way around. Never pay upfront fees for employment!',
      difficulty: 'medium'
    },
    {
      id: '6',
      type: 'email',
      title: 'Phishing Email - Fake Bank Alert',
      scenario: 'You receive an urgent email',
      context: 'From: security@vietcombank-official.com - "URGENT: Suspicious login detected from China. Your account will be suspended in 2 hours. Click here to verify your identity and secure your account: http://vcb-security-check.net"',
      options: [
        {
          id: 'a',
          text: 'Click the link and enter my banking details',
          correct: false,
          consequence: 'Hackers steal your banking credentials and money',
          explanation: 'The domain is fake - real VCB emails come from vietcombank.com.vn'
        },
        {
          id: 'b',
          text: 'Check the sender domain and call the bank directly',
          correct: true,
          consequence: 'You identify the phishing attempt and protect your account',
          explanation: 'Correct! Always verify suspicious emails by contacting the institution directly.'
        },
        {
          id: 'c',
          text: 'Forward the email to friends to warn them',
          correct: false,
          consequence: 'You might accidentally spread the phishing link',
          explanation: 'Better to report to the bank\'s security team instead of forwarding.'
        }
      ],
      reward: 180,
      aiMentorTip: 'Check email domains carefully! Scammers use similar-looking domains to trick victims.',
      difficulty: 'easy'
    },
    {
      id: '7',
      type: 'social',
      title: 'Social Engineering - Fake Tech Support',
      scenario: 'You receive a phone call',
      context: 'Caller: "Hello, this is John from Apple Support. We detected unusual activity on your iPhone. Someone in Russia is trying to access your photos. We need to install our security software remotely to protect you."',
      options: [
        {
          id: 'a',
          text: 'Allow remote access to fix the security issue',
          correct: false,
          consequence: 'Scammers install malware and steal your personal data',
          explanation: 'Apple never calls customers proactively about security issues.'
        },
        {
          id: 'b',
          text: 'Hang up and contact Apple through official channels',
          correct: true,
          consequence: 'You avoid the scam and protect your device',
          explanation: 'Correct! Tech companies don\'t make unsolicited support calls.'
        },
        {
          id: 'c',
          text: 'Ask for their employee ID and callback number',
          correct: false,
          consequence: 'Scammers can provide fake credentials to seem legitimate',
          explanation: 'Even with fake IDs, it\'s better to hang up and call official support.'
        }
      ],
      reward: 160,
      aiMentorTip: 'Major tech companies never call you first. They communicate through official apps and emails!',
      difficulty: 'medium'
    }
  ];

  useEffect(() => {
    // Generate today's reality challenge if none exists
    if (!currentRealityChallenge) {
      const randomChallenge = realityChallenges[Math.floor(Math.random() * realityChallenges.length)];
      setCurrentRealityChallenge(randomChallenge);
    }
  }, [currentRealityChallenge]);

  const handleAnswerSelect = (answerId: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answerId);
  };

  const submitAnswer = () => {
    if (!selectedAnswer || !currentRealityChallenge) return;
    
    const selectedOption = currentRealityChallenge.options.find(opt => opt.id === selectedAnswer);
    const isCorrect = selectedOption?.correct || false;
    
    setShowFeedback(true);
    setChallengeCompleted(true);
    
    if (isCorrect) {
      addCoins(currentRealityChallenge.reward);
      updateProgress({ 
        financialLiteracyScore: progress.financialLiteracyScore + 20,
        milSkillScore: progress.milSkillScore + 25
      });
      
      // Award badges based on performance
      if (progress.milSkillScore + 25 >= 75 && !progress.badges.includes('Scam Fighter')) {
        addBadge('Scam Fighter');
      }
      if (streak >= 7 && !progress.badges.includes('Streak Master')) {
        addBadge('Streak Master');
      }
    } else {
      // Wrong answer - lose some coins but still learn
      addCoins(-20);
      updateProgress({ 
        milSkillScore: Math.max(0, progress.milSkillScore - 5)
      });
    }
  };

  const getNextChallenge = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setChallengeCompleted(false);
    const newChallenge = realityChallenges[Math.floor(Math.random() * realityChallenges.length)];
    setCurrentRealityChallenge(newChallenge);
  };

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'sms': return Smartphone;
      case 'email': return Mail;
      case 'call': return Phone;
      case 'social': return Users;
      case 'investment': return DollarSign;
      default: return AlertTriangle;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/30 text-green-200';
      case 'medium': return 'bg-yellow-500/30 text-yellow-200';
      case 'hard': return 'bg-red-500/30 text-red-200';
      default: return 'bg-gray-500/30 text-gray-200';
    }
  };

  const upcomingChallenges = [
    {
      date: 'Tomorrow',
      title: 'Credit Card Phishing',
      type: 'Email',
      difficulty: 'Medium'
    },
    {
      date: 'Day 3',
      title: 'Investment Scam Call',
      type: 'Phone',
      difficulty: 'Hard'
    },
    {
      date: 'Day 4',
      title: 'Social Media Fraud',
      type: 'Social',
      difficulty: 'Easy'
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
          <h1 className="text-3xl font-bold text-white mb-2">Daily Reality Challenge</h1>
          <p className="text-purple-200">Real-world scenarios to test your financial security skills!</p>
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

        {/* Today's Reality Challenge */}
        {currentRealityChallenge && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Today's Reality Challenge</h2>
                <div className="flex items-center space-x-4 text-sm">
                  <span className={`px-3 py-1 rounded-full ${
                    currentRealityChallenge.type === 'sms' ? 'bg-blue-500/30 text-blue-200' :
                    currentRealityChallenge.type === 'email' ? 'bg-green-500/30 text-green-200' :
                    currentRealityChallenge.type === 'call' ? 'bg-purple-500/30 text-purple-200' :
                    currentRealityChallenge.type === 'social' ? 'bg-pink-500/30 text-pink-200' :
                    'bg-yellow-500/30 text-yellow-200'
                  }`}>
                    {currentRealityChallenge.type.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full ${getDifficultyColor(currentRealityChallenge.difficulty)}`}>
                    {currentRealityChallenge.difficulty.toUpperCase()}
                  </span>
                  <span className="text-purple-300">{currentRealityChallenge.reward} coins reward</span>
                </div>
              </div>
              
              {React.createElement(getChallengeIcon(currentRealityChallenge.type), {
                className: "text-purple-400",
                size: 32
              })}
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">{currentRealityChallenge.title}</h3>
              <p className="text-purple-200 mb-4">{currentRealityChallenge.scenario}</p>
              
              {/* Scenario Context */}
              <div className="bg-white/10 rounded-lg p-4 mb-6 border-l-4 border-purple-500">
                <p className="text-white italic">"{currentRealityChallenge.context}"</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg">How would you handle this situation?</h4>
              {currentRealityChallenge.options.map(option => {
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
                      <span className="flex-1">{option.text}</span>
                      {showFeedback && isSelected && (
                        isCorrect ? (
                          <CheckCircle className="text-green-400 ml-3" size={24} />
                        ) : (
                          <XCircle className="text-red-400 ml-3" size={24} />
                        )
                      )}
                    </div>
                    
                    {showFeedback && isSelected && (
                      <div className="mt-3 pt-3 border-t border-white/20">
                        <p className="text-sm font-medium mb-1">
                          {isCorrect ? '✅ Result:' : '❌ Result:'} {option.consequence}
                        </p>
                        <p className="text-sm opacity-90">{option.explanation}</p>
                      </div>
                    )}
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
                <div className="flex items-center space-x-3 mb-3">
                  <Brain className="text-cyan-400" size={24} />
                  <h4 className="text-cyan-200 font-semibold">AI Mentor's Tip:</h4>
                </div>
                <p className="text-white mb-4">{currentRealityChallenge.aiMentorTip}</p>
                
                {challengeCompleted && (
                  <div className="flex items-center justify-between">
                    <div className={`font-semibold ${
                      currentRealityChallenge.options.find(opt => opt.id === selectedAnswer)?.correct 
                        ? 'text-green-400' 
                        : 'text-red-400'
                    }`}>
                      {currentRealityChallenge.options.find(opt => opt.id === selectedAnswer)?.correct 
                        ? `Challenge Complete! +${currentRealityChallenge.reward} coins` 
                        : 'Wrong answer! -20 coins (but you learned something!)'}
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
                      challenge.type === 'Email' ? 'bg-green-500/30 text-green-200' :
                      challenge.type === 'Phone' ? 'bg-purple-500/30 text-purple-200' :
                      'bg-pink-500/30 text-pink-200'
                    }`}>
                      {challenge.type}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(challenge.difficulty.toLowerCase())}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                </div>
                <Clock className="text-purple-400" size={20} />
              </div>
            ))}
          </div>
        </div>

        {/* Performance Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">Weekly Performance</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-200">Correct Answers</span>
                  <span className="text-white">6/7 (86%)</span>
                </div>
                <div className="w-full bg-purple-900/30 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '86%' }} />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-200">Scam Detection</span>
                  <span className="text-white">{progress.milSkillScore}/100</span>
                </div>
                <div className="w-full bg-purple-900/30 rounded-full h-2">
                  <div className="bg-red-400 h-2 rounded-full" style={{ width: `${progress.milSkillScore}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">Challenge Categories</h2>
            <div className="space-y-3">
              {[
                { type: 'SMS Scams', score: 85, color: 'bg-blue-400' },
                { type: 'Email Phishing', score: 92, color: 'bg-green-400' },
                { type: 'Phone Scams', score: 78, color: 'bg-purple-400' },
                { type: 'Investment Fraud', score: 65, color: 'bg-yellow-400' }
              ].map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-purple-200 text-sm">{category.type}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-purple-900/30 rounded-full h-2">
                      <div 
                        className={`${category.color} h-2 rounded-full`} 
                        style={{ width: `${category.score}%` }} 
                      />
                    </div>
                    <span className="text-white text-sm w-8">{category.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
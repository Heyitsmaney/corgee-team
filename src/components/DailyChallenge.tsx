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
      title: 'Ngân hàng khóa tài khoản',
      scenario: 'Bạn nhận được tin nhắn SMS',
      context: 'CẢNH BÁO: Tài khoản VCB của bạn đã bị khóa do hoạt động bất thường. Nhấn vào link để xác minh ngay: vcb-verify.com/unlock',
      options: [
        {
          id: 'a',
          text: 'Nhấn vào link ngay để xác minh',
          correct: false,
          consequence: 'Bạn có thể bị lừa đảo và mất thông tin cá nhân',
          explanation: 'Đây là tin nhắn lừa đảo. Ngân hàng không bao giờ yêu cầu xác minh qua SMS.'
        },
        {
          id: 'b',
          text: 'Gọi trực tiếp đến số hotline chính thức của ngân hàng',
          correct: true,
          consequence: 'Bạn xác minh an toàn và tránh được lừa đảo',
          explanation: 'Đúng! Luôn liên hệ trực tiếp với ngân hàng qua số điện thoại chính thức.'
        },
        {
          id: 'c',
          text: 'Bỏ qua tin nhắn hoàn toàn',
          correct: false,
          consequence: 'Có thể bỏ lỡ thông tin quan trọng nếu đó là tin nhắn thật',
          explanation: 'Tốt hơn nên xác minh với ngân hàng để chắc chắn.'
        }
      ],
      reward: 100,
      aiMentorTip: 'Ngân hàng không bao giờ yêu cầu xác minh thông tin qua SMS hoặc email. Luôn liên hệ trực tiếp!',
      difficulty: 'easy'
    },
    {
      id: '2',
      type: 'social',
      title: 'Bạn bè mời góp vốn',
      scenario: 'Bạn thân nhất mời bạn tham gia',
      context: 'Bạn thân: "Mình vừa tham gia một nhóm đầu tư crypto siêu lợi nhuận! Chỉ cần 5 triệu, sau 1 tháng nhận lại 10 triệu. Bạn có muốn tham gia không?"',
      options: [
        {
          id: 'a',
          text: 'Đầu tư ngay vì tin tưởng bạn thân',
          correct: false,
          consequence: 'Có thể mất tiền và ảnh hưởng đến tình bạn',
          explanation: 'Dù là bạn thân, vẫn cần thận trọng với các khoản đầu tư "lợi nhuận cao".'
        },
        {
          id: 'b',
          text: 'Yêu cầu thông tin chi tiết và nghiên cứu kỹ trước khi quyết định',
          correct: true,
          consequence: 'Bạn đưa ra quyết định sáng suốt dựa trên thông tin',
          explanation: 'Đúng! Luôn nghiên cứu kỹ mọi khoản đầu tư, kể cả khi được giới thiệu bởi người thân.'
        },
        {
          id: 'c',
          text: 'Từ chối ngay và cắt đứt liên lạc',
          correct: false,
          consequence: 'Có thể làm tổn thương tình bạn không cần thiết',
          explanation: 'Không cần cắt đứt, nhưng nên giải thích lý do từ chối một cách tử tế.'
        }
      ],
      reward: 150,
      aiMentorTip: 'Lợi nhuận 100% trong 1 tháng là dấu hiệu của lừa đảo. Đầu tư thông minh cần thời gian và nghiên cứu!',
      difficulty: 'medium'
    },
    {
      id: '3',
      type: 'email',
      title: 'Email khuyến mãi đặc biệt',
      scenario: 'Bạn nhận được email từ một trang thương mại điện tử',
      context: 'CHÚC MỪNG! Bạn đã trúng thưởng 50 triệu VND từ Shopee. Để nhận thưởng, vui lòng chuyển phí xử lý 500,000 VND vào tài khoản: 1234567890 - Nguyễn Văn A',
      options: [
        {
          id: 'a',
          text: 'Chuyển tiền ngay để nhận thưởng',
          correct: false,
          consequence: 'Bạn sẽ mất 500,000 VND và không nhận được gì',
          explanation: 'Đây là lừa đảo. Không có giải thưởng nào yêu cầu trả phí trước.'
        },
        {
          id: 'b',
          text: 'Kiểm tra email gửi và liên hệ Shopee chính thức',
          correct: true,
          consequence: 'Bạn xác minh được đây là email lừa đảo',
          explanation: 'Đúng! Luôn xác minh qua kênh chính thức trước khi hành động.'
        },
        {
          id: 'c',
          text: 'Chia sẻ thông tin với bạn bè để họ cũng tham gia',
          correct: false,
          consequence: 'Bạn có thể làm bạn bè cũng bị lừa đảo',
          explanation: 'Không nên chia sẻ thông tin chưa được xác minh.'
        }
      ],
      reward: 120,
      aiMentorTip: 'Không có giải thưởng nào yêu cầu bạn trả tiền trước. Đây là dấu hiệu rõ ràng của lừa đảo!',
      difficulty: 'easy'
    },
    {
      id: '4',
      type: 'investment',
      title: 'Cơ hội đầu tư "độc quyền"',
      scenario: 'Một người lạ liên hệ qua mạng xã hội',
      context: 'Chuyên gia tài chính: "Tôi có thông tin nội bộ về một cổ phiếu sắp tăng 500%. Chỉ cần đầu tư 10 triệu, sau 1 tuần sẽ có 50 triệu. Cơ hội có hạn!"',
      options: [
        {
          id: 'a',
          text: 'Đầu tư ngay vì không muốn bỏ lỡ cơ hội',
          correct: false,
          consequence: 'Rất có thể bạn sẽ mất toàn bộ số tiền đầu tư',
          explanation: 'Thông tin nội bộ và lợi nhuận không thực tế là dấu hiệu của lừa đảo.'
        },
        {
          id: 'b',
          text: 'Yêu cầu giấy phép hoạt động và nghiên cứu kỹ',
          correct: true,
          consequence: 'Bạn phát hiện đây là lừa đảo và tránh được rủi ro',
          explanation: 'Đúng! Luôn yêu cầu giấy tờ chứng minh và nghiên cứu kỹ trước khi đầu tư.'
        },
        {
          id: 'c',
          text: 'Đầu tư một phần nhỏ để thử nghiệm',
          correct: false,
          consequence: 'Vẫn có thể mất tiền và tạo niềm tin sai lầm',
          explanation: 'Không nên đầu tư vào các cơ hội không rõ ràng, dù là số tiền nhỏ.'
        }
      ],
      reward: 200,
      aiMentorTip: 'Lợi nhuận 500% trong 1 tuần là không thể. Đầu tư thông minh cần thời gian và kiến thức!',
      difficulty: 'hard'
    },
    {
      id: '5',
      type: 'call',
      title: 'Cuộc gọi hỗ trợ kỹ thuật',
      scenario: 'Bạn nhận được cuộc gọi',
      context: 'Người gọi: "Xin chào, tôi là nhân viên Microsoft. Máy tính của bạn đã bị nhiễm virus nghiêm trọng. Chúng tôi cần truy cập từ xa để sửa chữa ngay."',
      options: [
        {
          id: 'a',
          text: 'Cho phép truy cập từ xa ngay lập tức',
          correct: false,
          consequence: 'Máy tính có thể bị cài phần mềm độc hại hoặc đánh cắp dữ liệu',
          explanation: 'Microsoft không bao giờ gọi điện chủ động để hỗ trợ kỹ thuật.'
        },
        {
          id: 'b',
          text: 'Cúp máy và liên hệ Microsoft qua kênh chính thức',
          correct: true,
          consequence: 'Bạn tránh được lừa đảo và bảo vệ máy tính',
          explanation: 'Đúng! Các công ty công nghệ lớn không gọi điện chủ động như vậy.'
        },
        {
          id: 'c',
          text: 'Hỏi thông tin cá nhân để xác minh',
          correct: false,
          consequence: 'Kẻ lừa đảo có thể sử dụng thông tin này để thuyết phục bạn',
          explanation: 'Không nên cung cấp thông tin cá nhân cho người lạ qua điện thoại.'
        }
      ],
      reward: 130,
      aiMentorTip: 'Các công ty công nghệ lớn không bao giờ gọi điện chủ động để hỗ trợ. Luôn cúp máy và liên hệ qua kênh chính thức!',
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
              <h4 className="text-white font-semibold text-lg">Bạn sẽ xử lý tình huống này như thế nào?</h4>
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
                          {isCorrect ? '✅ Kết quả:' : '❌ Kết quả:'} {option.consequence}
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
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Building, Shield, ShoppingCart, Coins, Star, AlertTriangle, TrendingUp, DollarSign, CreditCard, Smartphone, Zap, Coffee, Car, Home, Gamepad2, Brain, CheckCircle, XCircle, Timer, Target, BookOpen, Calculator, PieChart, Briefcase, MapPin, Utensils, Plane, Settings, Lock, Eye, EyeOff, Wifi, Globe, Users, MessageCircle, Heart, ShoppingBag, Truck, Package } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface GameWorldProps {
  onNavigate: (screen: 'dashboard' | 'game' | 'challenge' | 'community') => void;
}

interface BankAccount {
  balance: number;
  savingsAccounts: {
    id: string;
    name: string;
    balance: number;
    interestRate: number;
    term: number;
    risk: 'low' | 'medium' | 'high';
  }[];
  creditCards: {
    id: string;
    name: string;
    limit: number;
    used: number;
    apr: number;
    rewards: string;
  }[];
}

interface Investment {
  id: string;
  name: string;
  type: 'stock' | 'crypto' | 'etf';
  price: number;
  change: number;
  owned: number;
  risk: 'low' | 'medium' | 'high';
}

interface SpendingItem {
  id: string;
  name: string;
  category: 'food' | 'transport' | 'utilities' | 'entertainment' | 'shopping' | 'travel';
  price: number;
  marketPrice: number;
  necessity: 'need' | 'want';
  icon: any;
  scamRisk?: boolean;
  bargainTip?: string;
}

interface ScamScenario {
  id: string;
  type: 'sms' | 'email' | 'call' | 'social' | 'job' | 'investment' | 'online_shopping';
  title: string;
  content: string;
  sender: string;
  isScam: boolean;
  redFlags: string[];
  correctAction: string;
  reward: number;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  category: 'phishing' | 'malware' | 'ransomware' | 'social_engineering' | 'fomo' | 'job_scam';
}

export const GameWorld: React.FC<GameWorldProps> = ({ onNavigate }) => {
  const { progress, addCoins, updateProgress, addBadge } = useUser();
  const [currentDistrict, setCurrentDistrict] = useState<'overview' | 'bank' | 'scam' | 'market' | 'investment' | 'settings'>('overview');
  const [bankAccount, setBankAccount] = useState<BankAccount>({
    balance: 1000,
    savingsAccounts: [],
    creditCards: []
  });
  const [monthlyBudget, setMonthlyBudget] = useState({
    income: 3000,
    spent: 0,
    budget: {
      food: 600,
      transport: 300,
      utilities: 400,
      entertainment: 200,
      shopping: 300,
      travel: 200
    }
  });
  const [investments, setInvestments] = useState<Investment[]>([
    { id: '1', name: 'VN-Index ETF', type: 'etf', price: 25.50, change: 2.3, owned: 0, risk: 'low' },
    { id: '2', name: 'VCB Stock', type: 'stock', price: 85.20, change: -1.2, owned: 0, risk: 'medium' },
    { id: '3', name: 'Bitcoin', type: 'crypto', price: 45000, change: 5.8, owned: 0, risk: 'high' },
    { id: '4', name: 'Tech ETF', type: 'etf', price: 120.30, change: 3.1, owned: 0, risk: 'medium' }
  ]);
  const [currentScam, setCurrentScam] = useState<ScamScenario | null>(null);
  const [aiMentorMessage, setAiMentorMessage] = useState<string>('');
  const [currentLesson, setCurrentLesson] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: true,
    difficulty: 'intermediate' as 'basic' | 'intermediate' | 'advanced',
    language: 'vi' as 'vi' | 'en',
    privacy: 'normal' as 'strict' | 'normal' | 'relaxed'
  });

  const districts = [
    {
      id: 'bank',
      name: 'Bank District',
      description: 'Master banking, cash flow, and financial products',
      icon: Building,
      color: 'from-blue-500 to-cyan-500',
      activities: ['cash-flow-analysis', 'credit-debit-simulation', 'interest-calculator', 'working-capital-game']
    },
    {
      id: 'investment',
      name: 'Investment Park',
      description: 'Learn portfolio management and market analysis',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      activities: ['portfolio-diversification', 'risk-assessment', 'market-timing', 'compound-interest']
    },
    {
      id: 'scam',
      name: 'Scam Alley',
      description: 'Advanced cybersecurity and scam prevention',
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      activities: ['phishing-detection', 'malware-prevention', 'social-engineering', 'job-scam-awareness']
    },
    {
      id: 'market',
      name: 'Market Street',
      description: 'Smart shopping and bargain hunting skills',
      icon: ShoppingCart,
      color: 'from-purple-500 to-indigo-500',
      activities: ['price-comparison', 'bargain-hunting', 'scam-detection', 'quality-assessment']
    }
  ];

  const bankLessons = [
    {
      id: 'cash-flow',
      title: 'Cash Flow Management',
      content: 'Learn to track money in and out of your accounts. Positive cash flow means more money coming in than going out.',
      interactive: true,
      reward: 50
    },
    {
      id: 'working-capital',
      title: 'Working Capital Basics',
      content: 'Working capital = Current Assets - Current Liabilities. It shows your short-term financial health.',
      interactive: true,
      reward: 75
    },
    {
      id: 'interest-types',
      title: 'Simple vs Compound Interest',
      content: 'Simple interest: Interest only on principal. Compound interest: Interest on interest! Einstein called it the 8th wonder.',
      interactive: true,
      reward: 100
    },
    {
      id: 'debit-credit',
      title: 'Debit vs Credit Cards',
      content: 'Debit: Your money. Credit: Bank\'s money you borrow. Credit builds credit score but can lead to debt.',
      interactive: true,
      reward: 60
    }
  ];

  const advancedScamScenarios: ScamScenario[] = [
    {
      id: 'tiktok-investment',
      type: 'social',
      title: 'TikTok Investment FOMO',
      content: 'Video viral: "Tôi kiếm 10 triệu/tháng chỉ với 1 triệu vốn! Link đăng ký dưới comment. Chỉ còn 24h!"',
      sender: '@crypto_millionaire_vn',
      isScam: true,
      redFlags: ['Lợi nhuận không thực tế', 'Áp lực thời gian', 'Không có giấy phép', 'Testimonial giả'],
      correctAction: 'Nghiên cứu kỹ, kiểm tra giấy phép, tránh FOMO',
      reward: 150,
      difficulty: 'intermediate',
      category: 'fomo'
    },
    {
      id: 'job-scam-remote',
      type: 'job',
      title: 'Remote Job Scam',
      content: 'Email: "Congratulations! You\'re hired as Data Entry Specialist. $2000/month remote. Send $200 for equipment setup."',
      sender: 'hr@global-solutions.biz',
      isScam: true,
      redFlags: ['Yêu cầu trả tiền trước', 'Lương cao bất thường', 'Domain đáng nghi', 'Không phỏng vấn'],
      correctAction: 'Không bao giờ trả tiền để được tuyển dụng',
      reward: 200,
      difficulty: 'advanced',
      category: 'job_scam'
    },
    {
      id: 'ransomware-email',
      type: 'email',
      title: 'Ransomware Attack',
      content: 'Email: "Invoice_2024.pdf.exe" - Hóa đơn tháng này. Vui lòng mở file đính kèm để xem chi tiết.',
      sender: 'accounting@yourcompany.com',
      isScam: true,
      redFlags: ['File .exe giả dạng PDF', 'Email spoofing', 'Urgent tone', 'Suspicious attachment'],
      correctAction: 'Không mở file đính kèm đáng nghi, scan antivirus',
      reward: 250,
      difficulty: 'advanced',
      category: 'malware'
    },
    {
      id: 'social-engineering',
      type: 'call',
      title: 'Social Engineering Attack',
      content: 'Cuộc gọi: "Chào anh, em là nhân viên IT công ty. Hệ thống bị hack, cần anh cung cấp mật khẩu để bảo vệ tài khoản."',
      sender: 'IT Support',
      isScam: true,
      redFlags: ['Yêu cầu mật khẩu qua điện thoại', 'Tạo áp lực khẩn cấp', 'Không xác minh danh tính'],
      correctAction: 'Cúp máy, liên hệ IT qua kênh chính thức',
      reward: 180,
      difficulty: 'intermediate',
      category: 'social_engineering'
    },
    {
      id: 'fake-bank-app',
      type: 'sms',
      title: 'Fake Banking App',
      content: 'SMS: "Ứng dụng VCB mới đã ra mắt! Tải ngay để nhận 500k: bit.ly/vcb-new-app"',
      sender: 'VCB Bank',
      isScam: true,
      redFlags: ['Link rút gọn đáng nghi', 'Ưu đãi quá hấp dẫn', 'Không từ số chính thức'],
      correctAction: 'Tải app chỉ từ App Store/Google Play chính thức',
      reward: 120,
      difficulty: 'basic',
      category: 'phishing'
    }
  ];

  const marketItems: SpendingItem[] = [
    {
      id: '1',
      name: 'Cơm tấm sườn',
      category: 'food',
      price: 45000,
      marketPrice: 35000,
      necessity: 'need',
      icon: Utensils,
      bargainTip: 'Giá bình thường 30-40k. Trên 50k là đắt!'
    },
    {
      id: '2',
      name: 'Grab Food Delivery',
      category: 'food',
      price: 85000,
      marketPrice: 60000,
      necessity: 'want',
      icon: Truck,
      bargainTip: 'Phí ship + tip thường tăng 40-60% so với mua trực tiếp'
    },
    {
      id: '3',
      name: 'Vé máy bay HCM-HN',
      category: 'travel',
      price: 2500000,
      marketPrice: 1800000,
      necessity: 'want',
      icon: Plane,
      bargainTip: 'Đặt trước 2-3 tháng tiết kiệm 30-50%. Tránh cuối tuần và lễ tết'
    },
    {
      id: '4',
      name: 'iPhone "xách tay"',
      category: 'shopping',
      price: 15000000,
      marketPrice: 25000000,
      necessity: 'want',
      icon: Smartphone,
      scamRisk: true,
      bargainTip: 'Giá quá rẻ có thể là hàng fake, refurbished hoặc có vấn đề'
    },
    {
      id: '5',
      name: 'Rau củ chợ truyền thống',
      category: 'food',
      price: 50000,
      marketPrice: 50000,
      necessity: 'need',
      icon: Coffee,
      bargainTip: 'Mua buổi chiều thường rẻ hơn. Kiểm tra cân có chính xác không'
    },
    {
      id: '6',
      name: 'Khóa học online "Làm giàu"',
      category: 'entertainment',
      price: 2000000,
      marketPrice: 0,
      necessity: 'want',
      icon: BookOpen,
      scamRisk: true,
      bargainTip: 'Cảnh giác với khóa học hứa hẹn làm giàu nhanh. Tìm hiểu background giảng viên'
    }
  ];

  useEffect(() => {
    // Generate random scam scenario based on difficulty
    if (currentDistrict === 'scam' && !currentScam) {
      const filteredScenarios = advancedScamScenarios.filter(s => s.difficulty === settings.difficulty);
      const randomScam = filteredScenarios[Math.floor(Math.random() * filteredScenarios.length)] || advancedScamScenarios[0];
      setCurrentScam(randomScam);
    }
  }, [currentDistrict, currentScam, settings.difficulty]);

  const showAiMentorFeedback = (message: string) => {
    setAiMentorMessage(message);
    setTimeout(() => setAiMentorMessage(''), 7000);
  };

  const handleDistrictEnter = (districtId: string) => {
    setCurrentDistrict(districtId as any);
  };

  const handleBankLesson = (lessonId: string) => {
    const lesson = bankLessons.find(l => l.id === lessonId);
    if (lesson) {
      setCurrentLesson(lessonId);
      addCoins(lesson.reward);
      updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 10 });
      showAiMentorFeedback(`Excellent! You completed "${lesson.title}". ${lesson.content}`);
    }
  };

  const handleCreditCard = (cardType: string) => {
    const cards = {
      'basic': { name: 'Basic Credit Card', limit: 5000, apr: 18.9, rewards: 'None', fee: 0 },
      'rewards': { name: 'Rewards Credit Card', limit: 10000, apr: 21.9, rewards: '1% Cashback', fee: 100 },
      'premium': { name: 'Premium Credit Card', limit: 25000, apr: 15.9, rewards: '2% Cashback + Travel', fee: 500 }
    };

    const card = cards[cardType as keyof typeof cards];
    if (bankAccount.balance >= card.fee) {
      const newCard = {
        id: Date.now().toString(),
        ...card,
        used: 0
      };
      
      setBankAccount(prev => ({
        ...prev,
        balance: prev.balance - card.fee,
        creditCards: [...prev.creditCards, newCard]
      }));
      
      addCoins(30);
      showAiMentorFeedback(`You got a ${card.name}! Remember: Credit cards are tools. Use them wisely to build credit score, but always pay on time to avoid high interest charges.`);
    }
  };

  const handleScamResponse = (action: 'click' | 'ignore' | 'report') => {
    if (!currentScam) return;

    if (action === 'click' && currentScam.isScam) {
      // Wrong choice - clicked on scam
      const penalty = currentScam.difficulty === 'advanced' ? -100 : currentScam.difficulty === 'intermediate' ? -75 : -50;
      addCoins(penalty);
      updateProgress({ milSkillScore: Math.max(0, progress.milSkillScore - 15) });
      showAiMentorFeedback(`❌ You fell for the ${currentScam.category} scam! Lost ${Math.abs(penalty)} coins. Red flags you missed: ${currentScam.redFlags.join(', ')}. Always ${currentScam.correctAction}.`);
    } else if ((action === 'ignore' || action === 'report') && currentScam.isScam) {
      // Correct choice - avoided scam
      addCoins(currentScam.reward);
      updateProgress({ milSkillScore: progress.milSkillScore + 20 });
      showAiMentorFeedback(`✅ Great job! You avoided the ${currentScam.category} scam and earned ${currentScam.reward} coins. You correctly identified: ${currentScam.redFlags.join(', ')}.`);
      
      if (progress.milSkillScore + 20 >= 75 && !progress.badges.includes('Cyber Guardian')) {
        addBadge('Cyber Guardian');
      }
    }

    // Generate new scam after delay
    setTimeout(() => {
      const filteredScenarios = advancedScamScenarios.filter(s => s.difficulty === settings.difficulty);
      const newScam = filteredScenarios[Math.floor(Math.random() * filteredScenarios.length)] || advancedScamScenarios[0];
      setCurrentScam(newScam);
    }, 3000);
  };

  const handleMarketPurchase = (itemId: string) => {
    const item = marketItems.find(i => i.id === itemId);
    if (!item || bankAccount.balance < item.price) return;

    setBankAccount(prev => ({ ...prev, balance: prev.balance - item.price }));
    setMonthlyBudget(prev => ({ ...prev, spent: prev.spent + item.price }));

    const isGoodDeal = item.price <= item.marketPrice;
    const isScamRisk = item.scamRisk;

    if (isScamRisk) {
      addCoins(-50);
      showAiMentorFeedback(`⚠️ Warning! You bought "${item.name}" which has scam risks. ${item.bargainTip} Always verify seller credibility and product authenticity.`);
    } else if (isGoodDeal) {
      addCoins(20);
      showAiMentorFeedback(`💰 Great deal! You bought "${item.name}" at a fair price. ${item.bargainTip || 'Smart shopping!'}`);
    } else {
      addCoins(-10);
      showAiMentorFeedback(`💸 You overpaid for "${item.name}". ${item.bargainTip} Research market prices before buying.`);
    }
  };

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentDistrict('overview')}
          className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to City</span>
        </button>
      </div>

      <div className="text-center mb-8">
        <Settings className="mx-auto mb-4 text-purple-400" size={64} />
        <h1 className="text-3xl font-bold text-white mb-2">Game Settings</h1>
        <p className="text-purple-200">Customize your FinVerse experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center">
            <MessageCircle className="mr-2" size={20} />
            Notifications
          </h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-purple-200">Daily Challenges</span>
              <button
                onClick={() => setSettings(prev => ({ ...prev, notifications: !prev.notifications }))}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.notifications ? 'bg-green-500' : 'bg-gray-500'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.notifications ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </label>
            <label className="flex items-center justify-between">
              <span className="text-purple-200">Sound Effects</span>
              <button
                onClick={() => setSettings(prev => ({ ...prev, soundEffects: !prev.soundEffects }))}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.soundEffects ? 'bg-green-500' : 'bg-gray-500'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.soundEffects ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </label>
          </div>
        </div>

        {/* Difficulty */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center">
            <Target className="mr-2" size={20} />
            Difficulty Level
          </h3>
          <div className="space-y-3">
            {['basic', 'intermediate', 'advanced'].map(level => (
              <button
                key={level}
                onClick={() => setSettings(prev => ({ ...prev, difficulty: level as any }))}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  settings.difficulty === level
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/20 text-purple-200 hover:bg-white/30'
                }`}
              >
                <div className="font-medium capitalize">{level}</div>
                <div className="text-sm opacity-80">
                  {level === 'basic' ? 'Simple scenarios, basic scams' :
                   level === 'intermediate' ? 'Moderate complexity, common scams' :
                   'Complex scenarios, advanced threats'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center">
            <Globe className="mr-2" size={20} />
            Language
          </h3>
          <div className="space-y-3">
            {[
              { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
              { code: 'en', name: 'English', flag: '🇺🇸' }
            ].map(lang => (
              <button
                key={lang.code}
                onClick={() => setSettings(prev => ({ ...prev, language: lang.code as any }))}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                  settings.language === lang.code
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/20 text-purple-200 hover:bg-white/30'
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center">
            <Lock className="mr-2" size={20} />
            Privacy Settings
          </h3>
          <div className="space-y-3">
            {[
              { level: 'strict', name: 'Strict', desc: 'Maximum privacy protection' },
              { level: 'normal', name: 'Normal', desc: 'Balanced privacy and features' },
              { level: 'relaxed', name: 'Relaxed', desc: 'Full features, minimal privacy' }
            ].map(privacy => (
              <button
                key={privacy.level}
                onClick={() => setSettings(prev => ({ ...prev, privacy: privacy.level as any }))}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  settings.privacy === privacy.level
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/20 text-purple-200 hover:bg-white/30'
                }`}
              >
                <div className="font-medium">{privacy.name}</div>
                <div className="text-sm opacity-80">{privacy.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Account Management */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-bold text-lg mb-4">Account Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors">
            Export Progress
          </button>
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors">
            Reset Progress
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  const renderBankDistrict = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentDistrict('overview')}
          className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to City</span>
        </button>
        <div className="flex items-center space-x-2 bg-blue-500/20 px-4 py-2 rounded-full">
          <Coins className="text-blue-400" size={20} />
          <span className="text-white font-semibold">{bankAccount.balance.toLocaleString()}</span>
        </div>
      </div>

      <div className="text-center mb-8">
        <Building className="mx-auto mb-4 text-blue-400" size={64} />
        <h1 className="text-3xl font-bold text-white mb-2">Bank District</h1>
        <p className="text-blue-200">Master banking, cash flow, and financial products</p>
      </div>

      {/* Financial Lessons */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
        <h2 className="text-white font-semibold text-xl mb-4 flex items-center">
          <BookOpen className="mr-2" size={24} />
          Financial Literacy Lessons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bankLessons.map(lesson => (
            <div key={lesson.id} className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">{lesson.title}</h3>
              <p className="text-purple-200 text-sm mb-3">{lesson.content}</p>
              <button
                onClick={() => handleBankLesson(lesson.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors"
              >
                Learn (+{lesson.reward} coins)
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cash Flow Simulator */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
        <h2 className="text-white font-semibold text-xl mb-4 flex items-center">
          <Calculator className="mr-2" size={24} />
          Cash Flow Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">+{monthlyBudget.income.toLocaleString()}</div>
            <div className="text-green-200 text-sm">Monthly Income</div>
          </div>
          <div className="bg-red-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-400">-{monthlyBudget.spent.toLocaleString()}</div>
            <div className="text-red-200 text-sm">Monthly Expenses</div>
          </div>
          <div className="bg-blue-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {(monthlyBudget.income - monthlyBudget.spent).toLocaleString()}
            </div>
            <div className="text-blue-200 text-sm">Net Cash Flow</div>
          </div>
        </div>
      </div>

      {/* Credit Card Options */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
        <h2 className="text-white font-semibold text-xl mb-4 flex items-center">
          <CreditCard className="mr-2" size={24} />
          Credit Card Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-500/20 backdrop-blur-lg rounded-xl p-4 border border-gray-500/30">
            <h3 className="text-white font-bold mb-3">Basic Credit Card</h3>
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-200">Credit Limit</span>
                <span className="text-white">5,000 coins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-200">APR</span>
                <span className="text-white">18.9%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-200">Annual Fee</span>
                <span className="text-white">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-200">Rewards</span>
                <span className="text-white">None</span>
              </div>
            </div>
            <button 
              onClick={() => handleCreditCard('basic')}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-semibold transition-colors"
            >
              Apply Now
            </button>
          </div>

          <div className="bg-yellow-500/20 backdrop-blur-lg rounded-xl p-4 border border-yellow-500/30">
            <h3 className="text-white font-bold mb-3">Rewards Credit Card</h3>
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-yellow-200">Credit Limit</span>
                <span className="text-white">10,000 coins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-200">APR</span>
                <span className="text-white">21.9%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-200">Annual Fee</span>
                <span className="text-white">100 coins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-200">Rewards</span>
                <span className="text-white">1% Cashback</span>
              </div>
            </div>
            <button 
              onClick={() => handleCreditCard('rewards')}
              disabled={bankAccount.balance < 100}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              Apply Now
            </button>
          </div>

          <div className="bg-purple-500/20 backdrop-blur-lg rounded-xl p-4 border border-purple-500/30">
            <h3 className="text-white font-bold mb-3">Premium Credit Card</h3>
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-200">Credit Limit</span>
                <span className="text-white">25,000 coins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">APR</span>
                <span className="text-white">15.9%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Annual Fee</span>
                <span className="text-white">500 coins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Rewards</span>
                <span className="text-white">2% + Travel</span>
              </div>
            </div>
            <button 
              onClick={() => handleCreditCard('premium')}
              disabled={bankAccount.balance < 500}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Current Credit Cards */}
      {bankAccount.creditCards.length > 0 && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-white font-semibold text-xl mb-4">Your Credit Cards</h2>
          <div className="space-y-4">
            {bankAccount.creditCards.map(card => (
              <div key={card.id} className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-medium">{card.name}</h3>
                    <p className="text-purple-300 text-sm">{card.rewards} • {card.apr}% APR</p>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{card.used.toLocaleString()} / {card.limit.toLocaleString()}</div>
                    <div className="text-purple-300 text-sm">
                      {Math.round((card.used / card.limit) * 100)}% utilization
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-700/30 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        (card.used / card.limit) > 0.8 ? 'bg-red-400' :
                        (card.used / card.limit) > 0.5 ? 'bg-yellow-400' : 'bg-green-400'
                      }`}
                      style={{ width: `${(card.used / card.limit) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderScamAlley = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentDistrict('overview')}
          className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to City</span>
        </button>
        <div className="flex items-center space-x-2 bg-red-500/20 px-4 py-2 rounded-full">
          <Shield className="text-red-400" size={20} />
          <span className="text-white font-semibold">{settings.difficulty.toUpperCase()}</span>
        </div>
      </div>

      <div className="text-center mb-8">
        <AlertTriangle className="mx-auto mb-4 text-red-400" size={64} />
        <h1 className="text-3xl font-bold text-white mb-2">Scam Alley</h1>
        <p className="text-red-200">Advanced cybersecurity and scam prevention training</p>
      </div>

      {/* Cybersecurity Tips */}
      <div className="bg-red-500/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30 mb-6">
        <h2 className="text-white font-semibold text-xl mb-4 flex items-center">
          <Lock className="mr-2" size={24} />
          Cybersecurity Prevention Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-red-200 font-medium mb-2">🛡️ Basic Protection</h3>
            <ul className="text-sm text-white space-y-1">
              <li>• Use strong, unique passwords</li>
              <li>• Enable 2FA on all accounts</li>
              <li>• Keep software updated</li>
              <li>• Don't click suspicious links</li>
            </ul>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-red-200 font-medium mb-2">🔍 Advanced Detection</h3>
            <ul className="text-sm text-white space-y-1">
              <li>• Check sender email domains</li>
              <li>• Verify URLs before clicking</li>
              <li>• Be wary of urgent requests</li>
              <li>• Trust your instincts</li>
            </ul>
          </div>
        </div>
      </div>

      {currentScam && (
        <div className="bg-red-500/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-xl">{currentScam.title}</h2>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                currentScam.type === 'sms' ? 'bg-blue-500/30 text-blue-200' :
                currentScam.type === 'email' ? 'bg-green-500/30 text-green-200' :
                currentScam.type === 'call' ? 'bg-purple-500/30 text-purple-200' :
                currentScam.type === 'social' ? 'bg-pink-500/30 text-pink-200' :
                currentScam.type === 'job' ? 'bg-orange-500/30 text-orange-200' :
                'bg-yellow-500/30 text-yellow-200'
              }`}>
                {currentScam.type.toUpperCase()}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                currentScam.difficulty === 'basic' ? 'bg-green-500/30 text-green-200' :
                currentScam.difficulty === 'intermediate' ? 'bg-yellow-500/30 text-yellow-200' :
                'bg-red-500/30 text-red-200'
              }`}>
                {currentScam.difficulty.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-4 mb-6 border-l-4 border-red-500">
            <div className="text-xs text-gray-400 mb-2">From: {currentScam.sender}</div>
            <div className="text-white">{currentScam.content}</div>
          </div>

          <div className="space-y-3">
            <h3 className="text-white font-semibold">How do you respond?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => handleScamResponse('click')}
                className="p-3 bg-red-600/30 hover:bg-red-600/50 text-red-200 rounded-lg transition-colors"
              >
                Click/Follow Instructions
              </button>
              <button
                onClick={() => handleScamResponse('ignore')}
                className="p-3 bg-yellow-600/30 hover:bg-yellow-600/50 text-yellow-200 rounded-lg transition-colors"
              >
                Ignore Message
              </button>
              <button
                onClick={() => handleScamResponse('report')}
                className="p-3 bg-green-600/30 hover:bg-green-600/50 text-green-200 rounded-lg transition-colors"
              >
                Report as Scam
              </button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white/5 rounded-lg">
            <h4 className="text-white font-semibold text-sm mb-2">🚩 Red Flags to Identify:</h4>
            <div className="flex flex-wrap gap-2">
              {currentScam.redFlags.map((flag: string, index: number) => (
                <span key={index} className="px-2 py-1 bg-red-500/30 text-red-200 rounded text-xs">
                  {flag}
                </span>
              ))}
            </div>
            <div className="mt-3 text-sm text-purple-200">
              <strong>Correct Action:</strong> {currentScam.correctAction}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderMarketStreet = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentDistrict('overview')}
          className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to City</span>
        </button>
      </div>

      <div className="text-center mb-8">
        <ShoppingCart className="mx-auto mb-4 text-purple-400" size={64} />
        <h1 className="text-3xl font-bold text-white mb-2">Market Street</h1>
        <p className="text-purple-200">Master smart shopping and bargain hunting</p>
      </div>

      {/* Shopping Tips */}
      <div className="bg-purple-500/20 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30 mb-6">
        <h2 className="text-white font-semibold text-xl mb-4 flex items-center">
          <Target className="mr-2" size={24} />
          Smart Shopping Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-purple-200 font-medium mb-2">💰 Price Comparison</h3>
            <ul className="text-sm text-white space-y-1">
              <li>• Research market prices first</li>
              <li>• Use price comparison apps</li>
              <li>• Check multiple sellers</li>
              <li>• Consider total cost (shipping, tax)</li>
            </ul>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-purple-200 font-medium mb-2">🔍 Quality Assessment</h3>
            <ul className="text-sm text-white space-y-1">
              <li>• Read reviews carefully</li>
              <li>• Check seller reputation</li>
              <li>• Verify product authenticity</li>
              <li>• Understand return policy</li>
            </ul>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-purple-200 font-medium mb-2">⚠️ Scam Prevention</h3>
            <ul className="text-sm text-white space-y-1">
              <li>• Too good to be true = scam</li>
              <li>• Verify seller contact info</li>
              <li>• Use secure payment methods</li>
              <li>• Trust your instincts</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Market Items */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-white font-semibold text-xl mb-4">Marketplace</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {marketItems.map(item => {
            const isOverpriced = item.price > item.marketPrice;
            const isScamRisk = item.scamRisk;
            
            return (
              <div key={item.id} className={`rounded-xl p-4 border-2 transition-all ${
                isScamRisk ? 'bg-red-500/10 border-red-500/30' :
                isOverpriced ? 'bg-yellow-500/10 border-yellow-500/30' :
                'bg-white/10 border-white/20'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      item.necessity === 'need' ? 'bg-green-500/20' : 'bg-orange-500/20'
                    }`}>
                      <item.icon size={20} className={
                        item.necessity === 'need' ? 'text-green-400' : 'text-orange-400'
                      } />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.necessity === 'need' ? 'bg-green-500/30 text-green-200' : 'bg-orange-500/30 text-orange-200'
                        }`}>
                          {item.necessity.toUpperCase()}
                        </span>
                        {isScamRisk && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-red-500/30 text-red-200">
                            SCAM RISK
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${
                      isOverpriced ? 'text-red-400' : 'text-white'
                    }`}>
                      {item.price.toLocaleString()}đ
                    </div>
                    {item.marketPrice !== item.price && (
                      <div className="text-sm text-gray-400 line-through">
                        Market: {item.marketPrice.toLocaleString()}đ
                      </div>
                    )}
                  </div>
                </div>
                
                {item.bargainTip && (
                  <div className="mb-3 p-2 bg-white/5 rounded text-xs text-purple-200">
                    💡 {item.bargainTip}
                  </div>
                )}
                
                <button
                  onClick={() => handleMarketPurchase(item.id)}
                  disabled={bankAccount.balance < item.price}
                  className={`w-full py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    isScamRisk ? 'bg-red-600 hover:bg-red-700 text-white' :
                    isOverpriced ? 'bg-yellow-600 hover:bg-yellow-700 text-white' :
                    'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {isScamRisk ? 'Buy (Risky!)' : 
                   isOverpriced ? 'Buy (Overpriced)' : 'Purchase'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shopping Scam Cases */}
      <div className="bg-red-500/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30">
        <h2 className="text-white font-semibold text-xl mb-4 flex items-center">
          <AlertTriangle className="mr-2" size={24} />
          Common Shopping Scams
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-red-200 font-medium mb-2">🏪 Physical Store Scams</h3>
            <ul className="text-sm text-white space-y-1">
              <li>• Rigged scales (short weight)</li>
              <li>• Fake discounts (inflated original price)</li>
              <li>• Bait and switch tactics</li>
              <li>• Counterfeit products</li>
            </ul>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-red-200 font-medium mb-2">💻 Online Shopping Scams</h3>
            <ul className="text-sm text-white space-y-1">
              <li>• Fake websites with stolen photos</li>
              <li>• Too-good-to-be-true prices</li>
              <li>• No contact information</li>
              <li>• Requests for unusual payment methods</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Welcome to FinVerse</h1>
        <p className="text-purple-200 text-lg">Your comprehensive financial simulation world!</p>
      </div>

      {/* AI Mentor Message */}
      {aiMentorMessage && (
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-lg rounded-xl p-4 border border-cyan-500/30 mb-6">
          <div className="flex items-center space-x-3">
            <Brain className="text-cyan-400" size={24} />
            <div>
              <h3 className="text-cyan-200 font-semibold">AI Mentor</h3>
              <p className="text-white">{aiMentorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Account Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-xl p-6 border border-green-500/30">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="text-green-400" size={24} />
            <span className="text-2xl font-bold text-white">{bankAccount.balance.toLocaleString()}</span>
          </div>
          <h3 className="text-white font-semibold">Balance</h3>
          <p className="text-green-200 text-sm">Available funds</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <Building className="text-blue-400" size={24} />
            <span className="text-2xl font-bold text-white">{bankAccount.savingsAccounts.length}</span>
          </div>
          <h3 className="text-white font-semibold">Savings</h3>
          <p className="text-blue-200 text-sm">Active accounts</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
          <div className="flex items-center justify-between mb-2">
            <CreditCard className="text-purple-400" size={24} />
            <span className="text-2xl font-bold text-white">{bankAccount.creditCards.length}</span>
          </div>
          <h3 className="text-white font-semibold">Credit Cards</h3>
          <p className="text-purple-200 text-sm">Active cards</p>
        </div>

        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30">
          <div className="flex items-center justify-between mb-2">
            <Shield className="text-red-400" size={24} />
            <span className="text-2xl font-bold text-white">{progress.milSkillScore}</span>
          </div>
          <h3 className="text-white font-semibold">Security Score</h3>
          <p className="text-red-200 text-sm">Scam protection</p>
        </div>
      </div>

      {/* Districts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {districts.map(district => (
          <div key={district.id} className="group cursor-pointer" onClick={() => handleDistrictEnter(district.id)}>
            <div className={`bg-gradient-to-br ${district.color}/20 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 group-hover:scale-105`}>
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${district.color} flex items-center justify-center`}>
                  <district.icon size={32} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">{district.name}</h3>
                <p className="text-purple-200 text-sm mb-4">{district.description}</p>
                
                <div className="space-y-2">
                  <div className="text-xs text-purple-300">
                    {district.activities.length} Activities Available
                  </div>
                  <div className="flex justify-center space-x-2">
                    {district.activities.map((_, index) => (
                      <div 
                        key={index}
                        className="w-2 h-2 rounded-full bg-white/30"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Settings Access */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white font-semibold text-xl mb-2">Game Settings</h2>
            <p className="text-purple-200">Difficulty: {settings.difficulty} • Language: {settings.language.toUpperCase()}</p>
          </div>
          <button
            onClick={() => setCurrentDistrict('settings')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentDistrict) {
      case 'bank':
        return renderBankDistrict();
      case 'investment':
        return renderInvestmentPark();
      case 'scam':
        return renderScamAlley();
      case 'market':
        return renderMarketStreet();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  const renderInvestmentPark = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentDistrict('overview')}
          className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to City</span>
        </button>
      </div>

      <div className="text-center mb-8">
        <TrendingUp className="mx-auto mb-4 text-green-400" size={64} />
        <h1 className="text-3xl font-bold text-white mb-2">Investment Park</h1>
        <p className="text-green-200">Build your investment portfolio and learn about markets</p>
      </div>

      {/* Investment Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {investments.map(investment => (
          <div key={investment.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-white font-bold text-lg">{investment.name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  investment.type === 'stock' ? 'bg-blue-500/30 text-blue-200' :
                  investment.type === 'crypto' ? 'bg-orange-500/30 text-orange-200' :
                  'bg-green-500/30 text-green-200'
                }`}>
                  {investment.type.toUpperCase()}
                </span>
              </div>
              <div className="text-right">
                <div className="text-white font-bold">{investment.price.toLocaleString()}</div>
                <div className={`text-sm ${investment.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {investment.change >= 0 ? '+' : ''}{investment.change}%
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">You own</span>
                <span className="text-white">{investment.owned} shares</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Risk Level</span>
                <span className={`${
                  investment.risk === 'low' ? 'text-green-400' :
                  investment.risk === 'medium' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {investment.risk.toUpperCase()}
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleInvestment(investment.id, 'buy', 1)}
                  disabled={bankAccount.balance < investment.price}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy 1 Share
                </button>
                <button
                  onClick={() => handleInvestment(investment.id, 'sell', 1)}
                  disabled={investment.owned < 1}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sell 1 Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Portfolio Summary */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-white font-semibold text-xl mb-4">Portfolio Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {investments.reduce((sum, inv) => sum + (inv.owned * inv.price), 0).toLocaleString()}
            </div>
            <div className="text-purple-300 text-sm">Total Value</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {investments.reduce((sum, inv) => sum + inv.owned, 0)}
            </div>
            <div className="text-purple-300 text-sm">Total Shares</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              +{investments.reduce((sum, inv) => sum + (inv.owned * inv.price * inv.change / 100), 0).toFixed(0)}
            </div>
            <div className="text-purple-300 text-sm">Today's P&L</div>
          </div>
        </div>
      </div>
    </div>
  );

  const handleInvestment = (investmentId: string, action: 'buy' | 'sell', amount: number) => {
    const investment = investments.find(inv => inv.id === investmentId);
    if (!investment) return;

    if (action === 'buy' && bankAccount.balance >= investment.price * amount) {
      setBankAccount(prev => ({ ...prev, balance: prev.balance - (investment.price * amount) }));
      setInvestments(prev => prev.map(inv => 
        inv.id === investmentId ? { ...inv, owned: inv.owned + amount } : inv
      ));
      addCoins(25);
      showAiMentorFeedback(`You bought ${amount} shares of ${investment.name}. Remember: diversification is key to managing risk!`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-2 rounded-full">
              <Coins className="text-yellow-400" size={20} />
              <span className="text-white font-semibold">{progress.coins}</span>
            </div>
            <button
              onClick={() => setCurrentDistrict('settings')}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Settings className="text-purple-300" size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        {renderCurrentView()}
      </div>
    </div>
  );
};
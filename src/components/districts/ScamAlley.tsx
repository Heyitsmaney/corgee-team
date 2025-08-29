import React, { useState } from 'react';
import { ArrowLeft, Shield, AlertTriangle, Eye, Brain, Smartphone, Mail, Phone, Users, DollarSign, Briefcase, Lock, Wifi, CreditCard } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

interface ScamAlleyProps {
  onBack: () => void;
}

interface ScamCase {
  id: string;
  title: string;
  type: 'phishing' | 'ransomware' | 'social' | 'investment' | 'job' | 'fomo' | 'malware';
  difficulty: 'basic' | 'intermediate' | 'advanced';
  scenario: string;
  redFlags: string[];
  correctAction: string;
  consequences: {
    correct: string;
    incorrect: string;
  };
  prevention: string[];
  realExample: string;
  reward: number;
}

export const ScamAlley: React.FC<ScamAlleyProps> = ({ onBack }) => {
  const { progress, addCoins, updateProgress } = useUser();
  const [activeGame, setActiveGame] = useState<'overview' | 'detector' | 'database' | 'training' | 'quiz'>('overview');
  const [selectedCase, setSelectedCase] = useState<ScamCase | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);

  const scamDatabase: ScamCase[] = [
    {
      id: '1',
      title: 'TikTok FOMO Investment Scam',
      type: 'fomo',
      difficulty: 'basic',
      scenario: 'You see a TikTok ad: "🚀 LAST 24 HOURS! Invest in AI-Coin and get 15% MONTHLY returns! My students made $100k in 60 days! Zero risk guaranteed! Click link in bio NOW!"',
      redFlags: [
        'Unrealistic returns (15% monthly = 435% annually)',
        'Time pressure ("LAST 24 HOURS")',
        'Testimonials without proof',
        'Zero risk claims',
        'Social media advertising for investments'
      ],
      correctAction: 'Ignore the ad and research legitimate investment platforms',
      consequences: {
        correct: 'You avoid losing money to a Ponzi scheme and protect your financial future',
        incorrect: 'You lose your investment money and personal information to scammers'
      },
      prevention: [
        'Real investments carry risk - no guarantees',
        'Research investment platforms through official financial authorities',
        'Be skeptical of social media investment ads',
        'Consult licensed financial advisors',
        'If it sounds too good to be true, it probably is'
      ],
      realExample: 'In 2023, Vietnamese investors lost over $50M to TikTok crypto scams promising 20-30% monthly returns.',
      reward: 100
    },
    {
      id: '2',
      title: 'Ransomware Email Attack',
      type: 'ransomware',
      difficulty: 'advanced',
      scenario: 'Email: "Your files have been encrypted by CryptoLocker 3.0. Pay 2 Bitcoin ($60,000) to wallet 1A2B3C4D5E within 72 hours or lose everything forever. Download our decryption tool: malware-decrypt.exe"',
      redFlags: [
        'Threatening language and urgency',
        'Cryptocurrency payment demands',
        'Suspicious file attachments',
        'Grammar and spelling errors',
        'Untraceable payment methods'
      ],
      correctAction: 'Disconnect from internet, don\'t pay, contact cybersecurity experts, restore from backups',
      consequences: {
        correct: 'You contain the attack and recover files from backups without paying criminals',
        incorrect: 'You lose money and may not get files back, encouraging more attacks'
      },
      prevention: [
        'Regular automated backups to offline storage',
        'Keep software and antivirus updated',
        'Don\'t open suspicious email attachments',
        'Use email filtering and security software',
        'Train employees on cybersecurity awareness'
      ],
      realExample: 'WannaCry ransomware infected 300,000+ computers worldwide in 2017, demanding Bitcoin payments.',
      reward: 200
    },
    {
      id: '3',
      title: 'Fake Job Offer Scam',
      type: 'job',
      difficulty: 'intermediate',
      scenario: 'LinkedIn message: "Congratulations! You\'ve been selected for a $8,000/month remote marketing position at Google Vietnam. No interview needed! Just pay $500 for equipment and training materials to start immediately."',
      redFlags: [
        'No interview process for high-paying job',
        'Upfront payment requests',
        'Too-good-to-be-true salary',
        'Pressure to start immediately',
        'Unofficial communication channels'
      ],
      correctAction: 'Verify through official company channels and never pay upfront fees',
      consequences: {
        correct: 'You avoid the scam and continue legitimate job searching',
        incorrect: 'You lose $500 and the job doesn\'t exist'
      },
      prevention: [
        'Legitimate employers never ask for upfront payments',
        'Verify job offers through official company websites',
        'Research company reviews and employee experiences',
        'Be suspicious of unsolicited job offers',
        'Always have proper interviews and documentation'
      ],
      realExample: 'Vietnamese job seekers lost $2M in 2023 to fake remote work scams requiring equipment fees.',
      reward: 150
    },
    {
      id: '4',
      title: 'Facebook Marketplace Purchase Scam',
      type: 'social',
      difficulty: 'basic',
      scenario: 'Facebook post: "iPhone 15 Pro Max 256GB - Brand new, sealed box - Only $300! Must sell today due to family emergency. Bank transfer only, will ship immediately after payment. No meetups!"',
      redFlags: [
        'Price too good to be true (retail $1,200)',
        'Emergency sale story',
        'Bank transfer only payment',
        'No in-person inspection allowed',
        'Pressure to buy immediately'
      ],
      correctAction: 'Insist on meeting in person at safe location and inspect item before payment',
      consequences: {
        correct: 'You avoid losing money and find legitimate sellers instead',
        incorrect: 'You lose $300 and receive nothing'
      },
      prevention: [
        'Always meet sellers in safe, public locations',
        'Inspect items thoroughly before payment',
        'Use secure payment methods with buyer protection',
        'Research market prices before purchasing',
        'Trust your instincts if something feels wrong'
      ],
      realExample: 'Vietnamese consumers lost $15M in 2023 to fake online marketplace sellers.',
      reward: 80
    },
    {
      id: '5',
      title: 'Phishing Bank Email',
      type: 'phishing',
      difficulty: 'intermediate',
      scenario: 'Email from "security@vietcombank-verify.com": "URGENT: Suspicious login from China detected. Your account will be locked in 2 hours. Click here to verify: http://vcb-security-check.net/verify"',
      redFlags: [
        'Fake domain (not vietcombank.com.vn)',
        'Urgent time pressure',
        'Suspicious login claims',
        'External verification links',
        'Generic greeting without personal details'
      ],
      correctAction: 'Delete email and contact bank directly through official phone number',
      consequences: {
        correct: 'You protect your banking credentials and avoid account compromise',
        incorrect: 'Hackers steal your login details and drain your bank account'
      },
      prevention: [
        'Always check sender email domains carefully',
        'Banks never ask for credentials via email',
        'Contact institutions directly through official channels',
        'Use two-factor authentication on all accounts',
        'Keep banking apps updated with latest security'
      ],
      realExample: 'Vietnamese banks reported 50,000+ phishing attempts in 2023, with $8M in losses.',
      reward: 120
    },
    {
      id: '6',
      title: 'Malware Download Trap',
      type: 'malware',
      difficulty: 'advanced',
      scenario: 'Pop-up: "WARNING! Your computer is infected with 47 viruses! Download PC Cleaner Pro now to remove threats immediately. Free scan available - click here: pc-cleaner-pro.exe"',
      redFlags: [
        'Fake virus warnings in browser',
        'Exact number of "threats" claimed',
        'Pressure to download immediately',
        'Executable file downloads',
        'Pop-up advertisements for security software'
      ],
      correctAction: 'Close browser, run legitimate antivirus scan, never download from pop-ups',
      consequences: {
        correct: 'You avoid installing malware and keep your computer secure',
        incorrect: 'You install malware that steals personal data and banking information'
      },
      prevention: [
        'Use reputable antivirus software only',
        'Never download software from pop-up ads',
        'Keep browser and OS updated',
        'Use ad blockers and pop-up blockers',
        'Only download software from official websites'
      ],
      realExample: 'Fake antivirus malware infected 2M+ computers globally in 2023, stealing banking credentials.',
      reward: 180
    },
    {
      id: '7',
      title: 'Social Engineering Phone Call',
      type: 'social',
      difficulty: 'advanced',
      scenario: 'Phone call: "Hello, this is Officer Nguyen from Cyber Crime Division. Your identity has been stolen and used for money laundering. We need to verify your bank details immediately to protect your accounts."',
      redFlags: [
        'Unsolicited call from "authorities"',
        'Immediate action required',
        'Requesting sensitive financial information',
        'Creating fear and urgency',
        'No official identification provided'
      ],
      correctAction: 'Hang up and contact police directly through official numbers to verify',
      consequences: {
        correct: 'You avoid giving criminals your banking information',
        incorrect: 'Scammers use your information to access and drain your accounts'
      },
      prevention: [
        'Government agencies don\'t call asking for bank details',
        'Always verify caller identity through official channels',
        'Never give personal information over unsolicited calls',
        'Hang up and call back using official numbers',
        'Be aware of authority impersonation tactics'
      ],
      realExample: 'Vietnamese police reported 15,000+ authority impersonation scams in 2023.',
      reward: 160
    },
    {
      id: '8',
      title: 'Cryptocurrency Investment Scam',
      type: 'investment',
      difficulty: 'intermediate',
      scenario: 'WhatsApp group: "Join our exclusive crypto trading group! Our AI bot guarantees 5% daily profits. Minimum investment $1,000. See our live trading results! Join now before spots fill up!"',
      redFlags: [
        'Guaranteed daily profits (impossible)',
        'Exclusive group pressure',
        'Minimum investment requirements',
        'Fake trading results',
        'Limited spots availability pressure'
      ],
      correctAction: 'Leave the group and report to authorities, research legitimate crypto exchanges',
      consequences: {
        correct: 'You avoid losing money to a Ponzi scheme',
        incorrect: 'You lose your investment and may recruit others into the scam'
      },
      prevention: [
        'No investment can guarantee daily profits',
        'Research crypto exchanges through official financial authorities',
        'Be wary of investment groups on social media',
        'Understand that crypto is high-risk, high-volatility',
        'Only invest what you can afford to lose'
      ],
      realExample: 'Vietnamese investors lost $30M to fake crypto trading groups in 2023.',
      reward: 140
    }
  ];

  const scamTypes = [
    { type: 'phishing', name: 'Phishing', icon: Mail, color: 'from-red-500 to-pink-500', count: 12 },
    { type: 'ransomware', name: 'Ransomware', icon: Lock, color: 'from-orange-500 to-red-500', count: 8 },
    { type: 'social', name: 'Social Engineering', icon: Users, color: 'from-purple-500 to-indigo-500', count: 15 },
    { type: 'investment', name: 'Investment Scams', icon: DollarSign, color: 'from-green-500 to-blue-500', count: 10 },
    { type: 'job', name: 'Job Scams', icon: Briefcase, color: 'from-blue-500 to-cyan-500', count: 7 },
    { type: 'fomo', name: 'FOMO Scams', icon: Zap, color: 'from-yellow-500 to-orange-500', count: 9 },
    { type: 'malware', name: 'Malware', icon: Wifi, color: 'from-pink-500 to-purple-500', count: 6 }
  ];

  const handleScamDetection = (caseItem: ScamCase, detected: boolean) => {
    const isCorrect = detected;
    setShowFeedback(true);
    
    if (isCorrect) {
      addCoins(caseItem.reward);
      updateProgress({
        milSkillScore: progress.milSkillScore + 15
      });
    } else {
      addCoins(-30);
      updateProgress({
        milSkillScore: Math.max(0, progress.milSkillScore - 5)
      });
    }
  };

  const renderScamDetector = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Eye className="mx-auto mb-4 text-red-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Scam Detection Training</h2>
        <p className="text-red-200">Test your ability to identify real-world scams</p>
      </div>

      {selectedCase ? (
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-bold text-xl">{selectedCase.title}</h3>
              <div className="flex items-center space-x-3 mt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedCase.difficulty === 'basic' ? 'bg-green-500/30 text-green-200' :
                  selectedCase.difficulty === 'intermediate' ? 'bg-yellow-500/30 text-yellow-200' :
                  'bg-red-500/30 text-red-200'
                }`}>
                  {selectedCase.difficulty.toUpperCase()}
                </span>
                <span className="text-purple-300 text-sm">+{selectedCase.reward} coins</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedCase(null)}
              className="text-purple-300 hover:text-white"
            >
              <ArrowLeft size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-4 border-l-4 border-red-500">
              <h4 className="text-white font-semibold mb-2">Scenario:</h4>
              <p className="text-purple-200 italic">"{selectedCase.scenario}"</p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-3 flex items-center">
                <AlertTriangle className="mr-2" size={16} />
                Red Flags to Watch For:
              </h4>
              <ul className="text-red-200 text-sm space-y-1">
                {selectedCase.redFlags.map((flag, index) => (
                  <li key={index}>🚩 {flag}</li>
                ))}
              </ul>
            </div>

            {!showFeedback ? (
              <div className="space-y-4">
                <h4 className="text-white font-semibold">Is this a scam?</h4>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleScamDetection(selectedCase, true)}
                    className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    🚨 YES - This is a SCAM
                  </button>
                  <button
                    onClick={() => handleScamDetection(selectedCase, false)}
                    className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    ✅ NO - This is legitimate
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <h4 className="text-green-300 font-semibold mb-2">✅ Correct Action:</h4>
                  <p className="text-green-200">{selectedCase.correctAction}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h4 className="text-green-300 font-semibold mb-2">If You Act Correctly:</h4>
                    <p className="text-green-200 text-sm">{selectedCase.consequences.correct}</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <h4 className="text-red-300 font-semibold mb-2">If You Fall for It:</h4>
                    <p className="text-red-200 text-sm">{selectedCase.consequences.incorrect}</p>
                  </div>
                </div>

                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="text-blue-300 font-semibold mb-3">Prevention Tips:</h4>
                  <ul className="text-blue-200 text-sm space-y-1">
                    {selectedCase.prevention.map((tip, index) => (
                      <li key={index}>💡 {tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                  <h4 className="text-yellow-300 font-semibold mb-2">Real-World Impact:</h4>
                  <p className="text-yellow-200 text-sm">{selectedCase.realExample}</p>
                </div>

                <button
                  onClick={() => {
                    setSelectedCase(null);
                    setShowFeedback(false);
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors"
                >
                  Try Another Case
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scamDatabase.map(scamCase => (
            <button
              key={scamCase.id}
              onClick={() => setSelectedCase(scamCase)}
              className="text-left bg-white/10 rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${
                  scamCase.type === 'phishing' ? 'from-red-500/20 to-pink-500/20' :
                  scamCase.type === 'ransomware' ? 'from-orange-500/20 to-red-500/20' :
                  scamCase.type === 'social' ? 'from-purple-500/20 to-indigo-500/20' :
                  scamCase.type === 'investment' ? 'from-green-500/20 to-blue-500/20' :
                  scamCase.type === 'job' ? 'from-blue-500/20 to-cyan-500/20' :
                  scamCase.type === 'fomo' ? 'from-yellow-500/20 to-orange-500/20' :
                  'from-pink-500/20 to-purple-500/20'
                }`}>
                  {scamCase.type === 'phishing' ? <Mail className="text-red-400" size={20} /> :
                   scamCase.type === 'ransomware' ? <Lock className="text-orange-400" size={20} /> :
                   scamCase.type === 'social' ? <Users className="text-purple-400" size={20} /> :
                   scamCase.type === 'investment' ? <DollarSign className="text-green-400" size={20} /> :
                   scamCase.type === 'job' ? <Briefcase className="text-blue-400" size={20} /> :
                   scamCase.type === 'fomo' ? <Zap className="text-yellow-400" size={20} /> :
                   <Wifi className="text-pink-400" size={20} />}
                </div>
                <span className="text-yellow-400 text-sm font-semibold">+{scamCase.reward}</span>
              </div>
              
              <h3 className="text-white font-semibold mb-2">{scamCase.title}</h3>
              <p className="text-purple-200 text-sm mb-3">{scamCase.scenario.substring(0, 100)}...</p>
              
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  scamCase.difficulty === 'basic' ? 'bg-green-500/30 text-green-200' :
                  scamCase.difficulty === 'intermediate' ? 'bg-yellow-500/30 text-yellow-200' :
                  'bg-red-500/30 text-red-200'
                }`}>
                  {scamCase.difficulty.toUpperCase()}
                </span>
                <span className="text-purple-300 text-xs">{scamCase.type.toUpperCase()}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const renderScamDatabase = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Brain className="mx-auto mb-4 text-purple-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Scam Knowledge Database</h2>
        <p className="text-purple-200">Comprehensive library of scam types and prevention strategies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scamTypes.map(type => (
          <div key={type.type} className="bg-white/10 rounded-xl p-6 border border-white/20">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${type.color} p-3 mb-4`}>
              <type.icon className="text-white" size={24} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">{type.name}</h3>
            <p className="text-purple-200 text-sm mb-4">{type.count} documented cases</p>
            <button
              onClick={() => setActiveGame('detector')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
            >
              Study Cases
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-4">Latest Scam Alerts</h2>
        <div className="space-y-4">
          {[
            {
              title: 'New TikTok Crypto Scam Wave',
              description: 'Fake influencers promoting "AI trading bots" with guaranteed returns',
              severity: 'high',
              date: '2 hours ago'
            },
            {
              title: 'Fake Banking App Downloads',
              description: 'Malicious apps mimicking VietcomBank and BIDV on unofficial stores',
              severity: 'critical',
              date: '5 hours ago'
            },
            {
              title: 'Romance Scam Increase',
              description: 'Dating app scammers targeting young professionals with investment schemes',
              severity: 'medium',
              date: '1 day ago'
            }
          ].map((alert, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
              <div className={`p-2 rounded-lg ${
                alert.severity === 'critical' ? 'bg-red-500/30' :
                alert.severity === 'high' ? 'bg-orange-500/30' :
                'bg-yellow-500/30'
              }`}>
                <AlertTriangle className={`${
                  alert.severity === 'critical' ? 'text-red-400' :
                  alert.severity === 'high' ? 'text-orange-400' :
                  'text-yellow-400'
                }`} size={20} />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium">{alert.title}</h3>
                <p className="text-purple-200 text-sm">{alert.description}</p>
                <p className="text-purple-400 text-xs mt-1">{alert.date}</p>
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
        <Shield className="mx-auto mb-4 text-red-400" size={64} />
        <h1 className="text-3xl font-bold text-white mb-2">Scam Alley</h1>
        <p className="text-red-200">Master cybersecurity and scam detection skills</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { id: 'detector', name: 'Scam Detector', icon: Eye, color: 'from-red-500 to-orange-500', description: 'Test your scam detection skills' },
          { id: 'database', name: 'Scam Database', icon: Brain, color: 'from-purple-500 to-pink-500', description: 'Browse comprehensive scam library' },
          { id: 'training', name: 'Security Training', icon: Shield, color: 'from-blue-500 to-cyan-500', description: 'Learn cybersecurity fundamentals' },
          { id: 'quiz', name: 'Quick Quiz', icon: Zap, color: 'from-yellow-500 to-orange-500', description: 'Fast-paced scam identification' }
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
        <h2 className="text-xl font-bold text-white mb-4">Your Security Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{progress.milSkillScore}</div>
            <p className="text-red-200 text-sm">Security Score</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">23</div>
            <p className="text-green-200 text-sm">Scams Detected</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">$2,400</div>
            <p className="text-blue-200 text-sm">Money Protected</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeGame) {
      case 'detector':
        return renderScamDetector();
      case 'database':
        return renderScamDatabase();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="space-y-6">
      {activeGame !== 'overview' && (
        <button
          onClick={() => setActiveGame('overview')}
          className="flex items-center space-x-2 text-red-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Scam Alley</span>
        </button>
      )}

      {renderContent()}
    </div>
  );
};
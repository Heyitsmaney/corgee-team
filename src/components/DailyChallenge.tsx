import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Trophy, AlertTriangle, CheckCircle, XCircle, Brain, Smartphone, Mail, Phone, CreditCard, DollarSign, Shield, Users, Briefcase, Lock, Zap } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useGame } from '../contexts/GameContext';

interface DailyChallengeProps {
  onNavigate: (screen: 'dashboard' | 'game' | 'challenge' | 'community') => void;
}

interface RealityChallenge {
  id: string;
  type: 'sms' | 'email' | 'call' | 'social' | 'investment' | 'job' | 'ransomware' | 'purchase' | 'fomo';
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
  category: 'cybersecurity' | 'financial' | 'shopping' | 'social';
  realWorldExample: string;
  preventionTips: string[];
}

export const DailyChallenge: React.FC<DailyChallengeProps> = ({ onNavigate }) => {
  const { progress, addCoins, updateProgress, addBadge } = useUser();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [streak, setStreak] = useState(5);
  const [currentRealityChallenge, setCurrentRealityChallenge] = useState<RealityChallenge | null>(null);

  const realityChallenges: RealityChallenge[] = [
    {
      id: '1',
      type: 'sms',
      title: 'Bank Account Security Alert',
      scenario: 'You receive an urgent SMS message',
      context: 'WARNING: Your Vietcombank account has been locked due to unusual activity from China. Click link to verify immediately or account will be permanently closed: vcb-verify.com/unlock',
      options: [
        {
          id: 'a',
          text: 'Click the link immediately to verify my account',
          correct: false,
          consequence: 'You enter your banking credentials on a fake website, giving scammers access to your account',
          explanation: 'This is a classic phishing scam. Banks never ask for verification via SMS links.'
        },
        {
          id: 'b',
          text: 'Call Vietcombank directly using their official hotline',
          correct: true,
          consequence: 'You verify safely that your account is fine and avoid being scammed',
          explanation: 'Correct! Always contact the bank directly through official phone numbers to verify suspicious messages.'
        },
        {
          id: 'c',
          text: 'Forward the message to friends to warn them',
          correct: false,
          consequence: 'You accidentally spread the scam link to others who might click it',
          explanation: 'Better to report to the bank\'s security team rather than forwarding suspicious messages.'
        }
      ],
      reward: 100,
      aiMentorTip: 'Banks never ask for account verification via SMS or email. Always contact them directly through official channels!',
      difficulty: 'easy',
      category: 'cybersecurity',
      realWorldExample: 'In 2023, Vietnamese banks reported over 50,000 phishing SMS attempts, with victims losing average $2,000 each.',
      preventionTips: [
        'Save your bank\'s official phone number in contacts',
        'Check sender phone numbers carefully',
        'Banks use official domains ending in .com.vn',
        'Enable two-factor authentication on banking apps',
        'Never click links in financial SMS messages'
      ]
    },
    {
      id: '2',
      type: 'fomo',
      title: 'TikTok Investment FOMO Scam',
      scenario: 'You see a viral TikTok advertisement',
      context: 'TikTok Ad: "🚀 LAST CHANCE! Invest in AI-MegaCoin now and get 10% MONTHLY returns with ZERO risk! My students made $50,000 in 30 days! Only 100 spots left! Link in bio - expires in 24 hours!"',
      options: [
        {
          id: 'a',
          text: 'Invest immediately - don\'t want to miss this opportunity!',
          correct: false,
          consequence: 'You lose your investment money to a FOMO scam designed to pressure quick decisions',
          explanation: 'FOMO tactics and unrealistic returns (120% annually) are classic scam signs.'
        },
        {
          id: 'b',
          text: 'Research the company and check for proper licenses before deciding',
          correct: true,
          consequence: 'You discover it\'s an unregistered scam and protect your money',
          explanation: 'Correct! Always research investments thoroughly, especially those with unrealistic promises and time pressure.'
        },
        {
          id: 'c',
          text: 'Ask friends to join together for better group returns',
          correct: false,
          consequence: 'You spread the scam to others and everyone loses money together',
          explanation: 'Never involve others in unverified investment opportunities, especially with time pressure.'
        }
      ],
      reward: 150,
      aiMentorTip: '10% monthly returns with zero risk is mathematically impossible. Real investments always carry risk and require thorough research!',
      difficulty: 'medium',
      category: 'financial',
      realWorldExample: 'TikTok crypto scams caused $200M in losses globally in 2023, with Vietnamese investors losing average $5,000 each.',
      preventionTips: [
        'No legitimate investment guarantees 10%+ monthly returns',
        'Research investment platforms through official financial authorities',
        'Be extremely skeptical of social media investment ads',
        'Take time to research - legitimate opportunities don\'t expire in hours',
        'Consult licensed financial advisors for major investments'
      ]
    },
    {
      id: '3',
      type: 'ransomware',
      title: 'Ransomware Email Attack',
      scenario: 'You receive a threatening email',
      context: 'Subject: YOUR FILES ARE ENCRYPTED! We have locked all your important documents and photos. Pay 0.5 Bitcoin ($15,000) to wallet 1A2B3C4D5E within 48 hours to get the decryption key or lose everything forever! Download our payment app: crypto-pay.exe',
      options: [
        {
          id: 'a',
          text: 'Pay the Bitcoin ransom immediately to get my files back',
          correct: false,
          consequence: 'You lose $15,000 and may not get your files back anyway, encouraging more attacks',
          explanation: 'Paying ransomware encourages more attacks and doesn\'t guarantee file recovery.'
        },
        {
          id: 'b',
          text: 'Disconnect from internet and contact cybersecurity experts',
          correct: true,
          consequence: 'You contain the attack and get professional help to recover files safely',
          explanation: 'Correct! Isolate the system immediately and get expert help rather than paying criminals.'
        },
        {
          id: 'c',
          text: 'Download the payment app to see if it\'s legitimate',
          correct: false,
          consequence: 'You download additional malware that steals more personal information',
          explanation: 'Never download software from ransomware emails - they contain additional malware.'
        }
      ],
      reward: 200,
      aiMentorTip: 'Ransomware attacks are serious cybersecurity threats. Never pay ransoms - backup data regularly and use professional security software!',
      difficulty: 'hard',
      category: 'cybersecurity',
      realWorldExample: 'Vietnamese businesses lost $50M to ransomware in 2023, with average ransom demands of $25,000.',
      preventionTips: [
        'Backup important files regularly to offline storage',
        'Keep operating system and software updated',
        'Use reputable antivirus with real-time protection',
        'Don\'t open suspicious email attachments',
        'Train employees on cybersecurity awareness'
      ]
    },
    {
      id: '4',
      type: 'purchase',
      title: 'Facebook Marketplace Scam',
      scenario: 'You find an amazing deal online',
      context: 'Facebook Marketplace: "iPhone 15 Pro Max 256GB - Brand New in Box - Only $200! Must sell today due to emergency. Payment via bank transfer only. No meetups, will ship immediately after payment!"',
      options: [
        {
          id: 'a',
          text: 'Transfer money immediately - this is an incredible deal!',
          correct: false,
          consequence: 'You lose $200 and receive nothing. The seller disappears after payment',
          explanation: 'Too-good-to-be-true prices and bank transfer only payments are major scam red flags.'
        },
        {
          id: 'b',
          text: 'Insist on meeting in person to inspect the item first',
          correct: true,
          consequence: 'You avoid the scam by insisting on safe transaction methods',
          explanation: 'Correct! Always inspect expensive items in person and use secure payment methods with buyer protection.'
        },
        {
          id: 'c',
          text: 'Ask for more photos and seller verification documents',
          correct: false,
          consequence: 'Scammer easily provides fake photos stolen from legitimate listings',
          explanation: 'Photos and documents can be easily faked. Physical inspection is the only reliable verification.'
        }
      ],
      reward: 120,
      aiMentorTip: 'If the price seems too good to be true, it probably is. Always meet sellers in safe public places and inspect items!',
      difficulty: 'medium',
      category: 'shopping',
      realWorldExample: 'Vietnamese consumers lost $25M to fake online marketplace sellers in 2023, with electronics being the most common scam category.',
      preventionTips: [
        'Research market prices before purchasing',
        'Meet sellers in safe, public locations',
        'Use payment methods with buyer protection',
        'Inspect items thoroughly before payment',
        'Trust your instincts if something feels wrong'
      ]
    },
    {
      id: '5',
      type: 'job',
      title: 'Fake Remote Work Scam',
      scenario: 'You receive an exciting job offer email',
      context: 'Email: "Congratulations! You\'ve been selected for a $5,000/month remote data entry position with Apple Vietnam. No experience needed! Just pay $299 for training materials and laptop setup. Start earning immediately after payment!"',
      options: [
        {
          id: 'a',
          text: 'Pay the fee immediately - $5,000/month sounds amazing!',
          correct: false,
          consequence: 'You lose $299 and the job doesn\'t exist. Scammers disappear after payment',
          explanation: 'Legitimate employers never ask for upfront payments from employees.'
        },
        {
          id: 'b',
          text: 'Research the company through official channels and verify the offer',
          correct: true,
          consequence: 'You discover it\'s a scam and avoid losing money',
          explanation: 'Correct! Always verify job offers through official company websites and HR departments.'
        },
        {
          id: 'c',
          text: 'Ask friends if they know about this company and opportunity',
          correct: false,
          consequence: 'Friends might not recognize the scam either and encourage you to apply',
          explanation: 'Better to research the company directly through official channels rather than rely on word-of-mouth.'
        }
      ],
      reward: 130,
      aiMentorTip: 'Real jobs pay you, not the other way around. Never pay upfront fees for employment opportunities!',
      difficulty: 'medium',
      category: 'financial',
      realWorldExample: 'Vietnamese job seekers lost $8M to fake remote work scams in 2023, with average losses of $400 per victim.',
      preventionTips: [
        'Legitimate companies never charge employees for training',
        'Verify job offers through official company websites',
        'Research company reviews and employee experiences',
        'Be suspicious of unsolicited high-paying job offers',
        'Check if company has physical offices and real employees'
      ]
    },
    {
      id: '6',
      type: 'email',
      title: 'Phishing Email - Fake Security Alert',
      scenario: 'You receive an urgent security email',
      context: 'From: security@vietcombank-official.com - "URGENT: Suspicious login detected from Russia. Your account will be suspended in 2 hours. Click here to verify your identity and secure your account: http://vcb-security-check.net"',
      options: [
        {
          id: 'a',
          text: 'Click the link and enter my banking details to secure my account',
          correct: false,
          consequence: 'Hackers steal your banking credentials and drain your account',
          explanation: 'The domain is fake - real Vietcombank emails come from vietcombank.com.vn'
        },
        {
          id: 'b',
          text: 'Check the sender domain carefully and call the bank directly',
          correct: true,
          consequence: 'You identify the phishing attempt and protect your account',
          explanation: 'Correct! Always verify suspicious emails by contacting the institution directly through official channels.'
        },
        {
          id: 'c',
          text: 'Forward the email to friends to warn them about the security issue',
          correct: false,
          consequence: 'You accidentally spread the phishing link to others',
          explanation: 'Better to report to the bank\'s security team instead of forwarding suspicious emails.'
        }
      ],
      reward: 110,
      aiMentorTip: 'Check email domains carefully! Scammers use similar-looking domains to trick victims. Real banks use official .com.vn domains.',
      difficulty: 'easy',
      category: 'cybersecurity',
      realWorldExample: 'Vietnamese banks blocked 75,000+ phishing emails in 2023, preventing $100M in potential losses.',
      preventionTips: [
        'Always check sender email domains carefully',
        'Banks never ask for credentials via email',
        'Look for official domain extensions (.com.vn for Vietnamese banks)',
        'Contact institutions directly when in doubt',
        'Use email filters and security software'
      ]
    },
    {
      id: '7',
      type: 'call',
      title: 'Fake Tech Support Scam',
      scenario: 'You receive an unexpected phone call',
      context: 'Caller: "Hello, this is John from Apple Support Vietnam. We detected unusual activity on your iPhone. Someone in Russia is trying to access your photos and banking apps. We need to install our security software remotely to protect you immediately."',
      options: [
        {
          id: 'a',
          text: 'Allow remote access to fix the security issue',
          correct: false,
          consequence: 'Scammers install malware and steal your personal data and banking information',
          explanation: 'Apple never calls customers proactively about security issues or offers remote support.'
        },
        {
          id: 'b',
          text: 'Hang up and contact Apple through their official support channels',
          correct: true,
          consequence: 'You avoid the scam and protect your device and personal information',
          explanation: 'Correct! Major tech companies don\'t make unsolicited support calls to customers.'
        },
        {
          id: 'c',
          text: 'Ask for their employee ID and official callback number for verification',
          correct: false,
          consequence: 'Scammers provide fake credentials that seem legitimate',
          explanation: 'Even with fake IDs, it\'s better to hang up and contact official support directly.'
        }
      ],
      reward: 140,
      aiMentorTip: 'Major tech companies never call you first about security issues. They communicate through official apps and verified emails!',
      difficulty: 'medium',
      category: 'cybersecurity',
      realWorldExample: 'Tech support scams cost Vietnamese consumers $12M in 2023, with elderly victims losing average $800 each.',
      preventionTips: [
        'Tech companies don\'t make unsolicited support calls',
        'Never allow remote access to unknown callers',
        'Hang up and call official support numbers',
        'Be especially cautious with elderly family members',
        'Use official company apps for support requests'
      ]
    },
    {
      id: '8',
      type: 'investment',
      title: 'Ponzi Scheme Investment Offer',
      scenario: 'A friend approaches you with an investment opportunity',
      context: 'Friend: "I found this amazing investment platform called VietGold Pro! They guarantee 15% monthly returns with government backing. I already made $10,000 in 2 months! You should invest at least $5,000 to get the VIP package. Here\'s my referral code for bonus returns!"',
      options: [
        {
          id: 'a',
          text: 'Invest $5,000 immediately - my friend is successful with it!',
          correct: false,
          consequence: 'You lose your money to a Ponzi scheme that will eventually collapse',
          explanation: '15% monthly returns (180% annually) with no risk is impossible and indicates a Ponzi scheme.'
        },
        {
          id: 'b',
          text: 'Research the platform thoroughly and check with financial authorities',
          correct: true,
          consequence: 'You discover it\'s an unregistered Ponzi scheme and avoid losing money',
          explanation: 'Correct! Always research investment platforms through official financial authorities before investing.'
        },
        {
          id: 'c',
          text: 'Invest a smaller amount first to test if it really works',
          correct: false,
          consequence: 'You lose the test amount and may be encouraged to invest more when you see initial "returns"',
          explanation: 'Ponzi schemes often pay initial investors to encourage larger investments later.'
        }
      ],
      reward: 180,
      aiMentorTip: 'Guaranteed high returns with no risk don\'t exist. Even government bonds only offer 3-6% annually. Be extremely skeptical of 15%+ monthly promises!',
      difficulty: 'hard',
      category: 'financial',
      realWorldExample: 'Pincoin and iFan Ponzi schemes in Vietnam (2018) stole $660M from 32,000 investors with similar promises.',
      preventionTips: [
        'No investment can guarantee 15%+ monthly returns',
        'Check investment platforms with State Securities Commission',
        'Be wary when friends pressure you to invest',
        'Understand that legitimate investments carry risk',
        'Research company licenses and registration'
      ]
    },
    {
      id: '9',
      type: 'purchase',
      title: 'Weight Manipulation Market Scam',
      scenario: 'You\'re buying fruit at Ben Thanh Market',
      context: 'Vendor: "These mangoes are very fresh! 200,000 VND per kilogram." The vendor quickly weighs the fruit while blocking your view of the scale display, then asks for 400,000 VND for what looks like 1.5kg of mangoes.',
      options: [
        {
          id: 'a',
          text: 'Pay the amount - the vendor knows the weight better than me',
          correct: false,
          consequence: 'You overpay by 100,000 VND due to rigged scales or weight manipulation',
          explanation: 'Many market vendors use rigged scales or add hidden weights to overcharge customers.'
        },
        {
          id: 'b',
          text: 'Ask to see the scale display clearly and verify the weight',
          correct: true,
          consequence: 'You catch the weight manipulation and pay the correct amount',
          explanation: 'Correct! Always watch the weighing process and verify the scale display shows accurate weight.'
        },
        {
          id: 'c',
          text: 'Accept the price but ask for extra mangoes to make it fair',
          correct: false,
          consequence: 'You still overpay and the vendor may give you lower quality fruit',
          explanation: 'Better to ensure accurate weighing rather than negotiate for extra items.'
        }
      ],
      reward: 90,
      aiMentorTip: 'Market weight manipulation is common in tourist areas. Always watch the weighing process and know approximate weights of common items!',
      difficulty: 'easy',
      category: 'shopping',
      realWorldExample: 'Ho Chi Minh City market inspectors found 300+ rigged scales in 2023, overcharging customers by 20-40%.',
      preventionTips: [
        'Watch the weighing process carefully',
        'Ask to see the scale display clearly',
        'Know approximate weights of common items',
        'Shop at markets with certified scales',
        'Compare prices at multiple vendors'
      ]
    },
    {
      id: '10',
      type: 'social',
      title: 'Romance Scam with Investment Twist',
      scenario: 'You\'ve been chatting with someone on a dating app for 2 weeks',
      context: 'Match: "I really care about you and want to help you financially. I work in cryptocurrency trading and can teach you my strategy. Just send me $2,000 and I\'ll trade it for you. We can split the profits 50/50 and build our future together!"',
      options: [
        {
          id: 'a',
          text: 'Send the money - they seem to really care about my future',
          correct: false,
          consequence: 'You lose $2,000 to a romance scammer who disappears after receiving payment',
          explanation: 'Romance scammers build emotional connections to manipulate victims into sending money.'
        },
        {
          id: 'b',
          text: 'Suggest meeting in person first before any financial discussions',
          correct: true,
          consequence: 'The scammer makes excuses and eventually disappears, revealing their true intentions',
          explanation: 'Correct! Legitimate romantic interests don\'t ask for money or investment funds early in relationships.'
        },
        {
          id: 'c',
          text: 'Ask for proof of their trading success and credentials',
          correct: false,
          consequence: 'Scammer provides fake trading screenshots and documents that look convincing',
          explanation: 'Trading screenshots and documents can be easily faked. Better to avoid financial mixing with new relationships.'
        }
      ],
      reward: 160,
      aiMentorTip: 'Never mix romance with finance! Legitimate romantic interests don\'t ask for money or investment funds, especially early in relationships.',
      difficulty: 'hard',
      category: 'social',
      realWorldExample: 'Vietnamese victims lost $30M to romance scams in 2023, with average losses of $8,000 per victim.',
      preventionTips: [
        'Never send money to people you\'ve only met online',
        'Be suspicious if they quickly turn conversations to money',
        'Video chat to verify they are who they claim to be',
        'Research their photos using reverse image search',
        'Keep financial and romantic relationships separate'
      ]
    },
    {
      id: '11',
      type: 'job',
      title: 'Multi-Level Marketing Job Scam',
      scenario: 'You see an attractive job posting on social media',
      context: 'Job Post: "Earn $3,000-$8,000 monthly working from home! No experience needed! Flexible hours! Just recruit 5 friends and sell our premium health products. Join our success team! Registration fee: $500 for starter kit."',
      options: [
        {
          id: 'a',
          text: 'Pay the registration fee - the income potential is huge!',
          correct: false,
          consequence: 'You lose $500 and struggle to make money in a pyramid scheme',
          explanation: 'This is a multi-level marketing scheme where only top recruiters make money.'
        },
        {
          id: 'b',
          text: 'Research the company\'s business model and income disclosures',
          correct: true,
          consequence: 'You discover that 99% of participants lose money in MLM schemes',
          explanation: 'Correct! MLM schemes require recruiting others to make money, which is unsustainable for most participants.'
        },
        {
          id: 'c',
          text: 'Ask to speak with current successful employees for references',
          correct: false,
          consequence: 'They connect you with top recruiters who pressure you to join quickly',
          explanation: 'MLM recruiters are trained to pressure new recruits and won\'t show you failure statistics.'
        }
      ],
      reward: 170,
      aiMentorTip: 'If a job requires you to recruit friends or pay upfront fees, it\'s likely an MLM scheme. Real jobs pay you for your work, not for recruiting others!',
      difficulty: 'hard',
      category: 'financial',
      realWorldExample: 'Vietnamese participants in MLM schemes lost average $1,200 each in 2023, with 95% failing to make any profit.',
      preventionTips: [
        'Legitimate jobs don\'t require upfront payments',
        'Be wary of income claims without proof',
        'Research MLM company income disclosures',
        'Understand that recruiting friends can damage relationships',
        'Look for jobs that pay for your skills, not recruitment'
      ]
    },
    {
      id: '12',
      type: 'ransomware',
      title: 'Fake Software Update Ransomware',
      scenario: 'A pop-up appears while browsing the internet',
      context: 'Pop-up: "CRITICAL SECURITY UPDATE REQUIRED! Your Windows system is vulnerable to new cyber attacks. Download and install this security patch immediately: windows-security-update.exe. Failure to update within 1 hour may result in system compromise!"',
      options: [
        {
          id: 'a',
          text: 'Download and install the update immediately for security',
          correct: false,
          consequence: 'You install ransomware that encrypts your files and demands payment',
          explanation: 'This is fake software that installs ransomware on your computer.'
        },
        {
          id: 'b',
          text: 'Close the pop-up and check for updates through official Windows settings',
          correct: true,
          consequence: 'You avoid the malware and update safely through official channels',
          explanation: 'Correct! Always get software updates through official channels, never from pop-up advertisements.'
        },
        {
          id: 'c',
          text: 'Scan the file with antivirus before installing',
          correct: false,
          consequence: 'Some advanced malware can bypass antivirus detection initially',
          explanation: 'Better to avoid downloading suspicious files entirely rather than relying on antivirus detection.'
        }
      ],
      reward: 190,
      aiMentorTip: 'Never download software from pop-up ads! Always get updates through official channels like Windows Update or manufacturer websites.',
      difficulty: 'hard',
      category: 'cybersecurity',
      realWorldExample: 'Fake software update ransomware infected 50,000+ Vietnamese computers in 2023, with average ransom demands of $1,000.',
      preventionTips: [
        'Only download software from official websites',
        'Use Windows Update for system updates',
        'Enable automatic updates for security patches',
        'Use pop-up blockers in your browser',
        'Keep antivirus software updated and active'
      ]
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
      case 'job': return Briefcase;
      case 'ransomware': return Lock;
      case 'purchase': return CreditCard;
      case 'fomo': return Zap;
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cybersecurity': return 'bg-red-500/30 text-red-200';
      case 'financial': return 'bg-green-500/30 text-green-200';
      case 'shopping': return 'bg-blue-500/30 text-blue-200';
      case 'social': return 'bg-purple-500/30 text-purple-200';
      default: return 'bg-gray-500/30 text-gray-200';
    }
  };

  const upcomingChallenges = [
    {
      date: 'Tomorrow',
      title: 'Credit Card Phishing Email',
      type: 'Email',
      difficulty: 'Medium',
      category: 'Cybersecurity'
    },
    {
      date: 'Day 3',
      title: 'Fake Investment Call',
      type: 'Phone',
      difficulty: 'Hard',
      category: 'Financial'
    },
    {
      date: 'Day 4',
      title: 'Social Media Shopping Scam',
      type: 'Social',
      difficulty: 'Easy',
      category: 'Shopping'
    },
    {
      date: 'Day 5',
      title: 'Ransomware Email Attack',
      type: 'Email',
      difficulty: 'Hard',
      category: 'Cybersecurity'
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
                    currentRealityChallenge.type === 'investment' ? 'bg-yellow-500/30 text-yellow-200' :
                    currentRealityChallenge.type === 'job' ? 'bg-cyan-500/30 text-cyan-200' :
                    currentRealityChallenge.type === 'ransomware' ? 'bg-red-500/30 text-red-200' :
                    currentRealityChallenge.type === 'purchase' ? 'bg-indigo-500/30 text-indigo-200' :
                    'bg-orange-500/30 text-orange-200'
                  }`}>
                    {currentRealityChallenge.type.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full ${getDifficultyColor(currentRealityChallenge.difficulty)}`}>
                    {currentRealityChallenge.difficulty.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full ${getCategoryColor(currentRealityChallenge.category)}`}>
                    {currentRealityChallenge.category.toUpperCase()}
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
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-white/10 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <Brain className="text-cyan-400" size={24} />
                    <h4 className="text-cyan-200 font-semibold">AI Mentor's Tip:</h4>
                  </div>
                  <p className="text-white mb-4">{currentRealityChallenge.aiMentorTip}</p>
                </div>

                <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                  <h4 className="text-blue-300 font-semibold mb-2">📊 Real-World Example:</h4>
                  <p className="text-blue-200 text-sm">{currentRealityChallenge.realWorldExample}</p>
                </div>

                <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <h4 className="text-green-300 font-semibold mb-3">🛡️ Prevention Tips:</h4>
                  <ul className="text-green-200 text-sm space-y-1">
                    {currentRealityChallenge.preventionTips.map((tip, index) => (
                      <li key={index}>• {tip}</li>
                    ))}
                  </ul>
                </div>
                
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

        {/* Challenge Categories */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4">Challenge Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { category: 'cybersecurity', count: 4, icon: Shield, color: 'from-red-500 to-orange-500' },
              { category: 'financial', count: 3, icon: DollarSign, color: 'from-green-500 to-emerald-500' },
              { category: 'shopping', count: 2, icon: CreditCard, color: 'from-blue-500 to-cyan-500' },
              { category: 'social', count: 3, icon: Users, color: 'from-purple-500 to-pink-500' }
            ].map(cat => (
              <div key={cat.category} className="text-center">
                <div className={`w-12 h-12 mx-auto mb-2 rounded-lg bg-gradient-to-r ${cat.color} p-3`}>
                  <cat.icon className="text-white" size={24} />
                </div>
                <h3 className="text-white font-semibold capitalize">{cat.category}</h3>
                <p className="text-purple-300 text-sm">{cat.count} challenges</p>
              </div>
            ))}
          </div>
        </div>

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
                    <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(challenge.category.toLowerCase())}`}>
                      {challenge.category}
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
                  <span className="text-white">8/10 (80%)</span>
                </div>
                <div className="w-full bg-purple-900/30 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '80%' }} />
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

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-200">Financial Knowledge</span>
                  <span className="text-white">{progress.financialLiteracyScore}/100</span>
                </div>
                <div className="w-full bg-purple-900/30 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${progress.financialLiteracyScore}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">Challenge Type Performance</h2>
            <div className="space-y-3">
              {[
                { type: 'SMS Scams', score: 85, color: 'bg-blue-400' },
                { type: 'Email Phishing', score: 92, color: 'bg-green-400' },
                { type: 'Phone Scams', score: 78, color: 'bg-purple-400' },
                { type: 'Investment Fraud', score: 65, color: 'bg-yellow-400' },
                { type: 'Job Scams', score: 88, color: 'bg-cyan-400' },
                { type: 'Purchase Scams', score: 75, color: 'bg-pink-400' },
                { type: 'Ransomware', score: 70, color: 'bg-red-400' },
                { type: 'FOMO Scams', score: 82, color: 'bg-orange-400' }
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
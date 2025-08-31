import React, { useState } from 'react';
import { ArrowLeft, Shield, AlertTriangle, Eye, Brain, Smartphone, Mail, Phone, Users, Briefcase, Lock, Zap, Award, Coins, Target, BookOpen, Play, CheckCircle, XCircle, Clock, Star } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

interface ScamAlleyProps {
  onBack: () => void;
}

interface CyberSecurityLesson {
  id: string;
  title: string;
  category: 'basics' | 'advanced' | 'prevention' | 'response';
  content: string;
  keyPoints: string[];
  practicalTips: string[];
  realCases: string[];
  preventionSteps: string[];
  reward: number;
  completed: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
}

interface ScamCase {
  id: string;
  title: string;
  type: 'phishing' | 'ransomware' | 'social_engineering' | 'investment' | 'job' | 'romance' | 'tech_support' | 'online_purchase';
  description: string;
  realStory: string;
  scamTactics: string[];
  redFlags: string[];
  prevention: string[];
  response: string[];
  financialImpact: string;
  victimProfile: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  reward: number;
}

interface ScamQuiz {
  id: string;
  scenario: string;
  question: string;
  options: {
    id: string;
    text: string;
    correct: boolean;
    explanation: string;
  }[];
  reward: number;
  category: string;
}

export const ScamAlley: React.FC<ScamAlleyProps> = ({ onBack }) => {
  const { progress, addCoins, updateProgress } = useUser();
  const [activeGame, setActiveGame] = useState<'overview' | 'lessons' | 'cases' | 'quiz' | 'simulator' | 'prevention'>('overview');
  const [selectedCase, setSelectedCase] = useState<ScamCase | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<ScamQuiz | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const cyberSecurityLessons: CyberSecurityLesson[] = [
    {
      id: '1',
      title: 'Phishing Attack Recognition and Prevention',
      category: 'basics',
      content: 'Phishing is a cybercrime where attackers impersonate legitimate organizations to steal sensitive information like passwords, credit card numbers, or personal data.',
      keyPoints: [
        'Phishing attacks use fake emails, websites, and messages',
        'Attackers create urgency to pressure quick decisions',
        'Legitimate companies never ask for passwords via email',
        'URL spoofing makes fake websites look real',
        'Social engineering exploits human psychology'
      ],
      practicalTips: [
        'Always verify sender email addresses carefully',
        'Hover over links to see actual destination URLs',
        'Type website addresses manually instead of clicking links',
        'Use two-factor authentication on all important accounts',
        'Keep software and browsers updated with security patches'
      ],
      realCases: [
        'Vietnamese bank customers lost $2M in 2023 to fake Vietcombank emails asking for account verification',
        'Fake COVID-19 relief fund emails stole personal information from 5,000+ victims',
        'Phishing emails impersonating tax authorities collected sensitive data from 10,000+ citizens'
      ],
      preventionSteps: [
        'Install reputable antivirus software with email protection',
        'Enable spam filters and phishing protection in email clients',
        'Educate family members about phishing tactics',
        'Report phishing attempts to authorities and organizations',
        'Use password managers to avoid entering credentials on fake sites'
      ],
      reward: 150,
      completed: false,
      difficulty: 'beginner',
      estimatedTime: '20 minutes'
    },
    {
      id: '2',
      title: 'Ransomware Defense and Recovery',
      category: 'advanced',
      content: 'Ransomware is malicious software that encrypts your files and demands payment for decryption. It\'s one of the most dangerous cyber threats affecting individuals and businesses.',
      keyPoints: [
        'Ransomware encrypts files and demands cryptocurrency payments',
        'Attacks often come through email attachments or malicious websites',
        'Paying ransom doesn\'t guarantee file recovery',
        'Backup systems are the best defense against ransomware',
        'Modern ransomware also steals data before encryption'
      ],
      practicalTips: [
        'Backup important files to offline storage weekly',
        'Keep operating system and software updated',
        'Use reputable antivirus with real-time protection',
        'Don\'t open suspicious email attachments',
        'Enable Windows Defender or equivalent security features'
      ],
      realCases: [
        'Vietnamese hospital paid $50,000 ransom in 2023 after patient records were encrypted',
        'Small business lost 5 years of customer data when ransomware hit unprotected computers',
        'University students lost thesis work when dormitory computers were infected via USB drives'
      ],
      preventionSteps: [
        'Implement 3-2-1 backup strategy: 3 copies, 2 different media, 1 offsite',
        'Use cloud backup services with versioning',
        'Train employees/family on email security',
        'Segment networks to limit ransomware spread',
        'Have incident response plan ready'
      ],
      reward: 250,
      completed: false,
      difficulty: 'advanced',
      estimatedTime: '30 minutes'
    },
    {
      id: '3',
      title: 'Social Engineering and Psychological Manipulation',
      category: 'advanced',
      content: 'Social engineering exploits human psychology rather than technical vulnerabilities. Attackers manipulate emotions like fear, greed, and trust to bypass security measures.',
      keyPoints: [
        'Social engineering targets human psychology, not technology',
        'Attackers research victims through social media',
        'Authority, urgency, and fear are common manipulation tactics',
        'Pretexting involves creating fake scenarios to gain trust',
        'Information gathering happens over multiple interactions'
      ],
      practicalTips: [
        'Verify identity through independent channels before sharing information',
        'Be suspicious of unsolicited contact claiming emergencies',
        'Limit personal information shared on social media',
        'Question requests for sensitive information',
        'Trust your instincts when something feels wrong'
      ],
      realCases: [
        'Scammer impersonated bank manager to convince elderly woman to transfer $15,000 for "account security"',
        'Fake IT support called office workers claiming virus infection, installed malware on 50+ computers',
        'Romance scammer built 6-month relationship before requesting $8,000 for "medical emergency"'
      ],
      preventionSteps: [
        'Establish verification procedures for sensitive requests',
        'Train family and colleagues on social engineering tactics',
        'Use privacy settings on social media accounts',
        'Never provide sensitive information over unsolicited calls',
        'Create code words for family emergency verification'
      ],
      reward: 200,
      completed: false,
      difficulty: 'advanced',
      estimatedTime: '25 minutes'
    },
    {
      id: '4',
      title: 'Mobile Security and App Safety',
      category: 'basics',
      content: 'Mobile devices contain vast amounts of personal and financial information, making them attractive targets for cybercriminals through malicious apps and mobile-specific attacks.',
      keyPoints: [
        'Mobile malware can steal banking credentials and personal data',
        'Fake apps impersonate legitimate services',
        'Public Wi-Fi networks pose security risks',
        'App permissions can expose sensitive information',
        'Mobile phishing through SMS and messaging apps'
      ],
      practicalTips: [
        'Download apps only from official app stores',
        'Review app permissions before installation',
        'Use VPN on public Wi-Fi networks',
        'Enable automatic security updates',
        'Use biometric authentication when available'
      ],
      realCases: [
        'Fake banking app stole login credentials from 2,000+ Vietnamese users in 2023',
        'Malicious QR code scanner app harvested contact lists and photos',
        'Public Wi-Fi attack at coffee shop intercepted banking sessions of 50+ customers'
      ],
      preventionSteps: [
        'Install mobile security software',
        'Regularly review and revoke unnecessary app permissions',
        'Use official banking apps instead of mobile browsers',
        'Enable remote wipe capability for lost devices',
        'Avoid financial transactions on public Wi-Fi'
      ],
      reward: 130,
      completed: false,
      difficulty: 'beginner',
      estimatedTime: '18 minutes'
    },
    {
      id: '5',
      title: 'Advanced Threat Detection and Response',
      category: 'advanced',
      content: 'Advanced persistent threats (APTs) and sophisticated attacks require proactive detection and rapid response to minimize damage and prevent data loss.',
      keyPoints: [
        'APTs involve long-term, stealthy attacks on specific targets',
        'Zero-day exploits target unknown vulnerabilities',
        'Behavioral analysis can detect unusual account activity',
        'Incident response time affects damage severity',
        'Threat intelligence helps predict and prevent attacks'
      ],
      practicalTips: [
        'Monitor account activity and set up alerts for unusual transactions',
        'Use endpoint detection and response (EDR) tools',
        'Implement network segmentation to contain breaches',
        'Maintain updated threat intelligence feeds',
        'Practice incident response procedures regularly'
      ],
      realCases: [
        'Vietnamese government agency detected APT after 8 months of data exfiltration',
        'Banking trojan infected 500+ computers before detection and removal',
        'Supply chain attack compromised software used by 1,000+ businesses'
      ],
      preventionSteps: [
        'Deploy advanced threat detection tools',
        'Implement zero-trust security architecture',
        'Conduct regular security assessments and penetration testing',
        'Train security teams on latest attack techniques',
        'Establish threat hunting capabilities'
      ],
      reward: 300,
      completed: false,
      difficulty: 'advanced',
      estimatedTime: '40 minutes'
    }
  ];

  const scamCases: ScamCase[] = [
    {
      id: '1',
      title: 'Pincoin and iFan Ponzi Scheme (2018)',
      type: 'investment',
      description: 'Largest cryptocurrency Ponzi scheme in Vietnamese history, promising 48% monthly returns through "blockchain technology"',
      realStory: 'Modern Tech JSC raised $660 million from 32,000 investors across Vietnam by promising 48% monthly returns. The company claimed to use blockchain technology and artificial intelligence for trading. Investors were encouraged to recruit others for bonus returns. The scheme collapsed when new investor money couldn\'t cover promised returns.',
      scamTactics: [
        'Promised impossible 48% monthly returns (576% annually)',
        'Used complex technology terms to confuse investors',
        'Encouraged recruitment with referral bonuses',
        'Held lavish events to appear legitimate',
        'Claimed government and celebrity endorsements',
        'Created fake trading platforms showing profits'
      ],
      redFlags: [
        'Returns far above market rates (even government bonds only offer 3-6%)',
        'Emphasis on recruiting new investors',
        'Vague explanations of how profits are generated',
        'Pressure to invest quickly before "opportunity expires"',
        'Testimonials that seem too good to be true',
        'Lack of proper financial licenses and registration'
      ],
      prevention: [
        'Research investment companies through State Securities Commission',
        'Understand that legitimate investments always carry risk',
        'Be extremely skeptical of returns above 15% annually',
        'Verify company registration and licenses',
        'Consult licensed financial advisors',
        'Never invest money you can\'t afford to lose'
      ],
      response: [
        'Report to police and financial authorities immediately',
        'Document all communications and transactions',
        'Contact bank to freeze related accounts',
        'Join victim groups for collective legal action',
        'Warn others about the scheme'
      ],
      financialImpact: 'Average investor lost $20,000. Many victims borrowed money or sold assets to invest more. Total losses exceeded $660 million.',
      victimProfile: 'Middle-aged professionals, retirees, and small business owners seeking high returns for retirement or business expansion.',
      difficulty: 'intermediate',
      reward: 200
    },
    {
      id: '2',
      title: 'WannaCry Ransomware Global Attack (2017)',
      type: 'ransomware',
      description: 'Global ransomware attack that infected 300,000+ computers across 150 countries, including Vietnamese hospitals and businesses',
      realStory: 'WannaCry ransomware spread rapidly through Windows computers using a leaked NSA exploit. In Vietnam, major hospitals, universities, and businesses were affected. The malware encrypted files and demanded $300-600 in Bitcoin. Many organizations had to shut down operations for days or weeks.',
      scamTactics: [
        'Exploited unpatched Windows vulnerabilities',
        'Spread automatically across networks',
        'Demanded Bitcoin payments for decryption',
        'Created time pressure with increasing ransom amounts',
        'Targeted critical infrastructure for maximum impact',
        'Used legitimate-looking ransom notes'
      ],
      redFlags: [
        'Sudden file encryption with ransom demands',
        'Requests for cryptocurrency payments',
        'Threats of permanent data loss',
        'Time-limited payment deadlines',
        'Instructions to download Tor browser',
        'Demands to disable antivirus software'
      ],
      prevention: [
        'Keep operating systems updated with latest security patches',
        'Use reputable antivirus with real-time protection',
        'Backup important files to offline storage regularly',
        'Disable unnecessary network services and ports',
        'Train employees on email security and suspicious attachments',
        'Implement network segmentation to limit spread'
      ],
      response: [
        'Immediately disconnect infected computers from network',
        'Do not pay ransom (no guarantee of file recovery)',
        'Contact cybersecurity professionals for help',
        'Report incident to police and cybersecurity authorities',
        'Restore files from clean backups if available'
      ],
      financialImpact: 'Vietnamese businesses lost estimated $50M in downtime and recovery costs. Individual victims lost personal files and paid $300-600 ransoms.',
      victimProfile: 'Hospitals, schools, businesses, and individuals using outdated Windows systems without proper security updates.',
      difficulty: 'advanced',
      reward: 300
    },
    {
      id: '3',
      title: 'Facebook Marketplace iPhone Scam',
      type: 'online_purchase',
      description: 'Sophisticated online purchase scam using fake Facebook profiles and stolen product photos to sell non-existent electronics',
      realStory: 'Scammer created multiple fake Facebook profiles with stolen photos of iPhones and luxury electronics. Listed items at 60-70% of retail price claiming "urgent sale due to moving abroad." Required bank transfer payment and promised shipping. After payment, scammer disappeared and blocked victims.',
      scamTactics: [
        'Used stolen photos from legitimate listings',
        'Created multiple fake profiles with stolen identities',
        'Priced items below market but not suspiciously low',
        'Created urgency with "moving abroad" stories',
        'Insisted on bank transfer payments only',
        'Provided fake shipping tracking numbers'
      ],
      redFlags: [
        'Seller refuses to meet in person',
        'Only accepts bank transfers or cryptocurrency',
        'Price significantly below retail but not obviously fake',
        'Seller has limited Facebook history or friends',
        'Urgent sale with emotional backstory',
        'No phone calls, only text communication'
      ],
      prevention: [
        'Always meet sellers in safe, public locations',
        'Inspect items thoroughly before payment',
        'Use payment methods with buyer protection',
        'Research seller\'s profile and history',
        'Reverse image search product photos',
        'Trust your instincts if something feels wrong'
      ],
      response: [
        'Report to Facebook and local police immediately',
        'Contact bank to report fraudulent transaction',
        'Document all communications and evidence',
        'Warn others by sharing scammer\'s information',
        'File complaint with consumer protection agency'
      ],
      financialImpact: 'Vietnamese victims lost average $800 per scam. Total estimated losses $15M in 2023 from online marketplace fraud.',
      victimProfile: 'Young adults and students looking for discounted electronics, often first-time online buyers.',
      difficulty: 'basic',
      reward: 150
    },
    {
      id: '4',
      title: 'Fake Remote Job Recruitment Scam',
      type: 'job',
      description: 'Elaborate job scam targeting unemployed graduates with fake remote work opportunities requiring upfront payments',
      realStory: 'Scammers posted attractive remote job listings on job websites offering $2,000-5,000 monthly salaries for simple data entry work. After "interviews" via messaging apps, they offered positions but required $300-800 for "training materials," "laptop setup," or "background check fees." After payment, scammers disappeared.',
      scamTactics: [
        'Posted jobs on legitimate job websites',
        'Conducted fake interviews via messaging apps',
        'Offered high salaries for simple work',
        'Required upfront payments for various "fees"',
        'Used stolen company logos and information',
        'Created fake employee testimonials and success stories'
      ],
      redFlags: [
        'High salary offers for minimal qualifications',
        'Upfront payment requirements for any reason',
        'Interviews conducted only via text/messaging',
        'Vague job descriptions and company information',
        'Pressure to pay fees quickly to "secure position"',
        'No official company email addresses or phone numbers'
      ],
      prevention: [
        'Research companies through official websites and business registrations',
        'Never pay upfront fees for job opportunities',
        'Verify job offers through official company HR departments',
        'Be suspicious of unsolicited high-paying job offers',
        'Use video calls to verify recruiter identity',
        'Check company reviews on multiple platforms'
      ],
      response: [
        'Report fake job postings to job websites',
        'File complaints with labor authorities',
        'Warn other job seekers about the scam',
        'Contact bank if payments were made',
        'Report to police cybercrime units'
      ],
      financialImpact: 'Vietnamese job seekers lost average $500 per scam. Total estimated losses $8M in 2023 from fake job schemes.',
      victimProfile: 'Recent graduates, unemployed individuals, people seeking remote work opportunities during COVID-19.',
      difficulty: 'intermediate',
      reward: 180
    },
    {
      id: '5',
      title: 'TikTok Cryptocurrency FOMO Investment Scam',
      type: 'investment',
      description: 'Social media investment scam using FOMO tactics and fake success stories to promote fraudulent cryptocurrency investments',
      realStory: 'Scammers created viral TikTok videos showing fake trading results and luxury lifestyles. They promoted "exclusive" cryptocurrency investments with "limited time" offers promising 10-20% monthly returns. Victims were directed to fake trading platforms that showed artificial profits but prevented withdrawals.',
      scamTactics: [
        'Created viral content showing fake wealth and success',
        'Used FOMO tactics with "limited time" offers',
        'Showed fake trading screenshots and bank statements',
        'Encouraged victims to recruit friends for bonuses',
        'Built fake trading platforms with artificial profits',
        'Used celebrity deepfakes and fake endorsements'
      ],
      redFlags: [
        'Promises of 10%+ monthly returns with "no risk"',
        'Heavy promotion on social media platforms',
        'Pressure to invest quickly before "opportunity expires"',
        'Emphasis on recruiting others for additional profits',
        'Vague explanations of how profits are generated',
        'Testimonials featuring luxury cars and expensive lifestyles'
      ],
      prevention: [
        'Understand that legitimate investments always carry risk',
        'Research investment platforms through financial authorities',
        'Be extremely skeptical of social media investment advice',
        'Verify celebrity endorsements through official channels',
        'Start with small amounts on established platforms',
        'Consult licensed financial advisors for major investments'
      ],
      response: [
        'Report fraudulent content to social media platforms',
        'Contact financial authorities about illegal investment schemes',
        'Warn friends and family about the scam',
        'Document all evidence of fraudulent activity',
        'Seek legal advice for fund recovery'
      ],
      financialImpact: 'Vietnamese investors lost average $3,000 per scam. Young adults lost university tuition and family savings totaling $25M in 2023.',
      victimProfile: 'Young adults aged 18-30, students, and early-career professionals influenced by social media success stories.',
      difficulty: 'intermediate',
      reward: 220
    },
    {
      id: '6',
      title: 'Business Email Compromise (BEC) Attack',
      type: 'phishing',
      description: 'Sophisticated email attack targeting businesses by impersonating executives to authorize fraudulent wire transfers',
      realStory: 'Vietnamese manufacturing company lost $500,000 when scammers compromised CEO\'s email account. They sent fake instructions to finance team requesting urgent wire transfer to "new supplier" for "confidential acquisition." Finance team followed normal procedures but didn\'t verify through secondary channel.',
      scamTactics: [
        'Compromised or spoofed executive email accounts',
        'Researched company structure and procedures',
        'Created urgency with "confidential" business deals',
        'Targeted finance and accounting personnel',
        'Used legitimate business language and terminology',
        'Timed attacks during executive travel or busy periods'
      ],
      redFlags: [
        'Unusual payment requests from executives',
        'Urgency and confidentiality requirements',
        'Requests to bypass normal verification procedures',
        'Wire transfers to new or unusual accounts',
        'Slight changes in email addresses or domains',
        'Requests sent during off-hours or travel times'
      ],
      prevention: [
        'Implement dual authorization for large wire transfers',
        'Verify payment requests through secondary communication channels',
        'Train finance teams on BEC attack patterns',
        'Use email authentication protocols (SPF, DKIM, DMARC)',
        'Establish clear procedures for payment authorization',
        'Regular cybersecurity awareness training for all employees'
      ],
      response: [
        'Contact bank immediately to stop or reverse wire transfer',
        'Preserve all email evidence for investigation',
        'Report to FBI IC3 and local cybercrime units',
        'Conduct forensic analysis of compromised systems',
        'Review and strengthen payment authorization procedures'
      ],
      financialImpact: 'Vietnamese businesses lost average $200,000 per BEC attack. Total estimated losses $50M in 2023.',
      victimProfile: 'Mid-size businesses with established wire transfer procedures but limited cybersecurity awareness.',
      difficulty: 'advanced',
      reward: 280
    }
  ];

  const scamQuizzes: ScamQuiz[] = [
    {
      id: '1',
      scenario: 'You receive an email from "security@vietcombank-verify.com" saying your account will be suspended unless you verify your information immediately.',
      question: 'What should you do first?',
      options: [
        {
          id: 'a',
          text: 'Click the link and enter your banking details to verify',
          correct: false,
          explanation: 'This is a phishing email. The domain is fake - real Vietcombank emails come from vietcombank.com.vn'
        },
        {
          id: 'b',
          text: 'Call Vietcombank directly using their official phone number',
          correct: true,
          explanation: 'Correct! Always verify suspicious emails by contacting the institution directly through official channels.'
        },
        {
          id: 'c',
          text: 'Forward the email to friends to warn them',
          correct: false,
          explanation: 'Better to report to the bank\'s security team instead of forwarding suspicious emails.'
        }
      ],
      reward: 100,
      category: 'Phishing Detection'
    },
    {
      id: '2',
      scenario: 'A TikTok ad promises "10% monthly returns with zero risk" on a new cryptocurrency investment platform.',
      question: 'What\'s the biggest red flag here?',
      options: [
        {
          id: 'a',
          text: 'The platform is new and untested',
          correct: false,
          explanation: 'While new platforms are risky, the bigger issue is the impossible promise of high returns with no risk.'
        },
        {
          id: 'b',
          text: 'Promising 10% monthly returns with zero risk is mathematically impossible',
          correct: true,
          explanation: 'Correct! No legitimate investment can guarantee 10% monthly returns (120% annually) with zero risk.'
        },
        {
          id: 'c',
          text: 'It\'s advertised on TikTok instead of traditional media',
          correct: false,
          explanation: 'While social media ads should be viewed skeptically, the main issue is the impossible return promise.'
        }
      ],
      reward: 150,
      category: 'Investment Fraud'
    },
    {
      id: '3',
      scenario: 'Your computer shows a pop-up saying "Your files are encrypted. Pay 0.5 Bitcoin to get them back."',
      question: 'What should be your immediate response?',
      options: [
        {
          id: 'a',
          text: 'Pay the Bitcoin ransom to get files back quickly',
          correct: false,
          explanation: 'Paying ransoms encourages more attacks and doesn\'t guarantee file recovery.'
        },
        {
          id: 'b',
          text: 'Disconnect from internet and contact cybersecurity experts',
          correct: true,
          explanation: 'Correct! Isolate the system immediately and get professional help rather than paying criminals.'
        },
        {
          id: 'c',
          text: 'Try to decrypt the files yourself using online tools',
          correct: false,
          explanation: 'This wastes time and may cause more damage. Professional help is needed for ransomware incidents.'
        }
      ],
      reward: 200,
      category: 'Ransomware Response'
    }
  ];

  const completeLesson = (lessonId: string) => {
    const lesson = cyberSecurityLessons.find(l => l.id === lessonId);
    if (lesson && !lesson.completed) {
      addCoins(lesson.reward);
      updateProgress({ 
        milSkillScore: progress.milSkillScore + (lesson.difficulty === 'advanced' ? 30 : lesson.difficulty === 'intermediate' ? 20 : 15)
      });
    }
  };

  const studyCase = (caseId: string) => {
    const scamCase = scamCases.find(c => c.id === caseId);
    if (scamCase) {
      addCoins(scamCase.reward);
      updateProgress({ 
        milSkillScore: progress.milSkillScore + (scamCase.difficulty === 'advanced' ? 25 : scamCase.difficulty === 'intermediate' ? 15 : 10)
      });
    }
  };

  const submitQuizAnswer = () => {
    if (!selectedAnswer || !currentQuiz) return;
    
    const selectedOption = currentQuiz.options.find(opt => opt.id === selectedAnswer);
    const isCorrect = selectedOption?.correct || false;
    
    setShowFeedback(true);
    
    if (isCorrect) {
      addCoins(currentQuiz.reward);
      updateProgress({ milSkillScore: progress.milSkillScore + 20 });
    } else {
      addCoins(-20);
    }
  };

  const getNextQuiz = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    const randomQuiz = scamQuizzes[Math.floor(Math.random() * scamQuizzes.length)];
    setCurrentQuiz(randomQuiz);
  };

  const renderLessons = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Brain className="mx-auto mb-4 text-red-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Cybersecurity Academy</h2>
        <p className="text-red-200">Master advanced cybersecurity and scam prevention</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cyberSecurityLessons.map(lesson => (
          <div key={lesson.id} className="bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-bold text-lg">{lesson.title}</h3>
                <div className="flex items-center space-x-3 mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    lesson.difficulty === 'beginner' ? 'bg-green-500/30 text-green-200' :
                    lesson.difficulty === 'intermediate' ? 'bg-yellow-500/30 text-yellow-200' :
                    'bg-red-500/30 text-red-200'
                  }`}>
                    {lesson.difficulty.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    lesson.category === 'basics' ? 'bg-blue-500/30 text-blue-200' :
                    lesson.category === 'advanced' ? 'bg-purple-500/30 text-purple-200' :
                    lesson.category === 'prevention' ? 'bg-green-500/30 text-green-200' :
                    'bg-orange-500/30 text-orange-200'
                  }`}>
                    {lesson.category.toUpperCase()}
                  </span>
                  <div className="flex items-center space-x-1 text-purple-300">
                    <Clock size={12} />
                    <span className="text-xs">{lesson.estimatedTime}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 font-bold">+{lesson.reward}</div>
                <div className="text-yellow-200 text-sm">coins</div>
              </div>
            </div>
            
            <p className="text-purple-200 mb-4">{lesson.content}</p>
            
            <div className="space-y-4">
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <h4 className="text-red-300 font-medium text-sm mb-2">🎯 Key Concepts:</h4>
                <ul className="text-red-200 text-xs space-y-1">
                  {lesson.keyPoints.map((point, index) => (
                    <li key={index}>• {point}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                <h4 className="text-blue-300 font-medium text-sm mb-2">🛡️ Protection Tips:</h4>
                <ul className="text-blue-200 text-xs space-y-1">
                  {lesson.practicalTips.map((tip, index) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                <h4 className="text-yellow-300 font-medium text-sm mb-2">📊 Real Cases:</h4>
                <ul className="text-yellow-200 text-xs space-y-1">
                  {lesson.realCases.map((case_, index) => (
                    <li key={index}>• {case_}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                <h4 className="text-green-300 font-medium text-sm mb-2">✅ Prevention Steps:</h4>
                <ul className="text-green-200 text-xs space-y-1">
                  {lesson.preventionSteps.map((step, index) => (
                    <li key={index}>• {step}</li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => completeLesson(lesson.id)}
              disabled={lesson.completed}
              className={`w-full mt-4 py-3 rounded-lg font-semibold transition-colors ${
                lesson.completed
                  ? 'bg-green-500/30 text-green-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700'
              }`}
            >
              {lesson.completed ? 'Completed ✓' : `Complete Lesson (+${lesson.reward} coins)`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCases = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Eye className="mx-auto mb-4 text-orange-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Real Scam Case Studies</h2>
        <p className="text-orange-200">Learn from actual scam cases and victim experiences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scamCases.map(scamCase => (
          <div key={scamCase.id} className="bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">{scamCase.title}</h3>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  scamCase.difficulty === 'basic' ? 'bg-green-500/30 text-green-200' :
                  scamCase.difficulty === 'intermediate' ? 'bg-yellow-500/30 text-yellow-200' :
                  'bg-red-500/30 text-red-200'
                }`}>
                  {scamCase.difficulty.toUpperCase()}
                </span>
                <span className="text-yellow-400 text-sm">+{scamCase.reward}</span>
              </div>
            </div>

            <p className="text-purple-200 mb-4">{scamCase.description}</p>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border-l-4 border-orange-500">
                <h4 className="text-orange-300 font-semibold mb-2">📖 Real Story:</h4>
                <p className="text-orange-200 text-sm">{scamCase.realStory}</p>
              </div>

              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <h4 className="text-red-300 font-medium text-sm mb-2">🎯 Scam Tactics:</h4>
                <ul className="text-red-200 text-xs space-y-1">
                  {scamCase.scamTactics.map((tactic, index) => (
                    <li key={index}>• {tactic}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                <h4 className="text-yellow-300 font-medium text-sm mb-2">🚩 Red Flags:</h4>
                <ul className="text-yellow-200 text-xs space-y-1">
                  {scamCase.redFlags.map((flag, index) => (
                    <li key={index}>• {flag}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                <h4 className="text-green-300 font-medium text-sm mb-2">✅ Prevention:</h4>
                <ul className="text-green-200 text-xs space-y-1">
                  {scamCase.prevention.map((tip, index) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                <h4 className="text-blue-300 font-medium text-sm mb-2">💰 Financial Impact:</h4>
                <p className="text-blue-200 text-xs">{scamCase.financialImpact}</p>
              </div>

              <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3">
                <h4 className="text-purple-300 font-medium text-sm mb-2">👥 Victim Profile:</h4>
                <p className="text-purple-200 text-xs">{scamCase.victimProfile}</p>
              </div>
            </div>

            <button
              onClick={() => studyCase(scamCase.id)}
              className="w-full mt-4 bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-colors"
            >
              Study Case (+{scamCase.reward} coins)
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Target className="mx-auto mb-4 text-purple-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Scam Detection Quiz</h2>
        <p className="text-purple-200">Test your ability to identify and respond to scams</p>
      </div>

      {!currentQuiz ? (
        <div className="bg-white/10 rounded-xl p-8 border border-white/20 text-center">
          <h3 className="text-white font-semibold text-xl mb-4">Ready to Test Your Skills?</h3>
          <p className="text-purple-200 mb-6">Challenge yourself with real-world scam scenarios</p>
          <button
            onClick={getNextQuiz}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
          >
            Start Quiz Challenge
          </button>
        </div>
      ) : (
        <div className="bg-white/10 rounded-xl p-8 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold text-xl">Scam Detection Challenge</h3>
            <div className="flex items-center space-x-2">
              <span className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-sm">
                {currentQuiz.category}
              </span>
              <span className="text-yellow-400 font-semibold">+{currentQuiz.reward} coins</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4 mb-6 border-l-4 border-purple-500">
            <p className="text-white italic mb-4">"{currentQuiz.scenario}"</p>
            <h4 className="text-white font-semibold">{currentQuiz.question}</h4>
          </div>

          <div className="space-y-4">
            {currentQuiz.options.map(option => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = option.correct;
              const showResult = showFeedback && isSelected;
              
              return (
                <button
                  key={option.id}
                  onClick={() => !showFeedback && setSelectedAnswer(option.id)}
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
                      <p className="text-sm">{option.explanation}</p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {!showFeedback && (
            <button
              onClick={submitQuizAnswer}
              disabled={!selectedAnswer}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          )}

          {showFeedback && (
            <div className="mt-6 flex items-center justify-between">
              <div className={`font-semibold ${
                currentQuiz.options.find(opt => opt.id === selectedAnswer)?.correct 
                  ? 'text-green-400' 
                  : 'text-red-400'
              }`}>
                {currentQuiz.options.find(opt => opt.id === selectedAnswer)?.correct 
                  ? `Correct! +${currentQuiz.reward} coins` 
                  : 'Wrong answer! -20 coins'}
              </div>
              <button
                onClick={getNextQuiz}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Next Challenge
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Shield className="mx-auto mb-4 text-red-400" size={64} />
        <h1 className="text-3xl font-bold text-white mb-2">Scam Alley</h1>
        <p className="text-red-200">Master cybersecurity and scam detection skills</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { id: 'lessons', name: 'Cyber Academy', icon: Brain, color: 'from-red-500 to-orange-500', description: 'Learn cybersecurity fundamentals' },
          { id: 'cases', name: 'Real Scam Cases', icon: Eye, color: 'from-orange-500 to-yellow-500', description: 'Study actual scam incidents' },
          { id: 'quiz', name: 'Detection Quiz', icon: Target, color: 'from-purple-500 to-pink-500', description: 'Test your scam detection skills' },
          { id: 'simulator', name: 'Threat Simulator', icon: Zap, color: 'from-blue-500 to-cyan-500', description: 'Practice threat response' }
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
        <h2 className="text-xl font-bold text-white mb-4">Cybersecurity Skills Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{progress.milSkillScore}</div>
            <p className="text-red-200 text-sm">Security Score</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">{cyberSecurityLessons.filter(l => l.completed).length}</div>
            <p className="text-orange-200 text-sm">Lessons Completed</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">23</div>
            <p className="text-purple-200 text-sm">Scams Detected</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{progress.coins}</div>
            <p className="text-yellow-200 text-sm">Available Coins</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeGame) {
      case 'lessons':
        return renderLessons();
      case 'cases':
        return renderCases();
      case 'quiz':
        return renderQuiz();
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
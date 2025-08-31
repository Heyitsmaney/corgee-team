import React, { useState } from 'react';
import { ArrowLeft, Shield, AlertTriangle, Eye, Brain, Smartphone, Mail, Phone, Users, DollarSign, Briefcase, Lock, Wifi, CreditCard, Globe, Camera, FileText, Download, Zap, Target, Award, CheckCircle, XCircle, Star, Gift } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

interface ScamAlleyProps {
  onBack: () => void;
}

interface ScamCase {
  id: string;
  title: string;
  type: 'phishing' | 'ransomware' | 'social' | 'investment' | 'job' | 'fomo' | 'malware' | 'romance' | 'tech_support' | 'fake_app';
  difficulty: 'basic' | 'intermediate' | 'advanced';
  scenario: string;
  context: string;
  redFlags: string[];
  correctAction: string;
  consequences: {
    correct: string;
    incorrect: string;
  };
  prevention: string[];
  realExample: string;
  financialImpact: string;
  psychologicalTactics: string[];
  targetDemographic: string;
  reportingSteps: string[];
  reward: number;
  completed: boolean;
}

interface CybersecurityLesson {
  id: string;
  title: string;
  category: 'basics' | 'advanced' | 'tools' | 'prevention';
  difficulty: 'beginner' | 'intermediate' | 'expert';
  content: string;
  keyPoints: string[];
  practicalSteps: string[];
  tools: string[];
  realWorldExample: string;
  commonMistakes: string[];
  advancedTips: string[];
  reward: number;
  completed: boolean;
}

export const ScamAlley: React.FC<ScamAlleyProps> = ({ onBack }) => {
  const { progress, addCoins, updateProgress } = useUser();
  const [activeGame, setActiveGame] = useState<'overview' | 'detector' | 'database' | 'training' | 'quiz' | 'lessons' | 'wheel'>('overview');
  const [selectedCase, setSelectedCase] = useState<ScamCase | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<CybersecurityLesson | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const comprehensiveScamDatabase: ScamCase[] = [
    {
      id: '1',
      title: 'TikTok FOMO Investment Scam - "AI MegaCoin"',
      type: 'fomo',
      difficulty: 'basic',
      scenario: 'You see a viral TikTok ad with flashy graphics and urgent music',
      context: '🚀 LAST 24 HOURS! Invest in AI-MegaCoin and get 10% MONTHLY returns with ZERO risk! My students made $50,000 in 30 days! Government approved! Only 100 spots left! Click link in bio - expires tonight! Don\'t miss out! 💰💰💰',
      redFlags: [
        'Unrealistic returns (10% monthly = 214% annually)',
        'Time pressure and urgency ("LAST 24 HOURS")',
        'Claims of zero risk (impossible in investing)',
        'Fake government approval claims',
        'Limited spots availability pressure',
        'Testimonials without verification',
        'Social media advertising for investments',
        'Excessive use of money emojis and hype language'
      ],
      correctAction: 'Ignore the ad completely, research legitimate investment platforms through official financial authorities, and report the scam to TikTok',
      consequences: {
        correct: 'You avoid losing money to a Ponzi scheme and protect your financial future. You also help protect others by reporting.',
        incorrect: 'You lose your investment money (average $2,000), personal information is stolen, and you may be pressured to recruit friends and family.'
      },
      prevention: [
        'Real investments always carry risk - no guarantees exist',
        'Research investment platforms through State Securities Commission',
        'Be extremely skeptical of social media investment ads',
        'Consult licensed financial advisors for major investments',
        'If it sounds too good to be true, it definitely is',
        'Never invest under time pressure',
        'Verify all claims through independent sources'
      ],
      realExample: 'In 2023, Vietnamese investors lost over $50M to TikTok crypto scams. The "VietGold Pro" scheme promised 15% monthly returns and disappeared with $8M from 3,000 investors.',
      financialImpact: 'Average loss: $2,000 per victim. Total Vietnamese losses: $50M in 2023. Many victims borrowed money or used credit cards to invest.',
      psychologicalTactics: [
        'FOMO (Fear of Missing Out) with countdown timers',
        'Social proof with fake testimonials and success stories',
        'Authority bias claiming government or celebrity endorsement',
        'Scarcity principle with limited spots available',
        'Greed appeal with unrealistic profit promises'
      ],
      targetDemographic: 'Young adults aged 18-30, students, people with limited investment knowledge, social media users',
      reportingSteps: [
        'Screenshot the scam advertisement',
        'Report to TikTok through their scam reporting feature',
        'Report to State Securities Commission of Vietnam',
        'Warn friends and family about the specific scam',
        'Share information with cybersecurity communities'
      ],
      reward: 150,
      completed: false
    },
    {
      id: '2',
      title: 'Advanced Ransomware Email Attack - "CryptoLocker 4.0"',
      type: 'ransomware',
      difficulty: 'advanced',
      scenario: 'You receive a sophisticated email that appears to be from your company\'s IT department',
      context: 'Subject: URGENT - Security Update Required. From: it-security@yourcompany-update.com. "Critical security vulnerability detected in your system. Download and install this security patch immediately: company-security-update.exe. Failure to update within 2 hours will result in system lockdown and data loss. This is an automated security protocol. -IT Security Team"',
      redFlags: [
        'Urgent time pressure (2 hours)',
        'Slightly different domain (yourcompany-update.com vs yourcompany.com)',
        'Executable file attachment (.exe)',
        'Threatening consequences for non-compliance',
        'Generic greeting without personal details',
        'Claims of automated security protocol',
        'No official company letterhead or signatures',
        'Requests to download software via email'
      ],
      correctAction: 'Do not download anything. Contact IT department directly through official channels. Disconnect from network if already downloaded. Report to cybersecurity team.',
      consequences: {
        correct: 'You avoid ransomware infection and protect company data. IT team can warn other employees and strengthen security.',
        incorrect: 'Ransomware encrypts all files on your computer and network drives. Company pays $50,000 ransom or loses critical business data.'
      },
      prevention: [
        'Never download software from email attachments',
        'Verify IT requests through official channels (phone, in-person)',
        'Keep operating system and antivirus updated',
        'Use email filtering and security software',
        'Regular automated backups to offline storage',
        'Employee cybersecurity training programs',
        'Multi-factor authentication on all accounts',
        'Network segmentation to limit damage'
      ],
      realExample: 'WannaCry ransomware (2017) infected 300,000+ computers worldwide, including Vietnam\'s hospitals and businesses. Damages exceeded $4 billion globally.',
      financialImpact: 'Average ransom demand: $50,000. Business downtime costs: $200,000. Data recovery: $100,000. Total average impact: $350,000 per incident.',
      psychologicalTactics: [
        'Authority impersonation (IT department)',
        'Urgency and time pressure',
        'Fear of consequences (system lockdown)',
        'Technical jargon to appear legitimate',
        'Automated process claims to avoid questioning'
      ],
      targetDemographic: 'Business employees, remote workers, people with limited IT knowledge, companies with weak cybersecurity',
      reportingSteps: [
        'Forward suspicious email to IT security team',
        'Report to company cybersecurity incident response',
        'Contact local cybersecurity authorities',
        'Document all details for investigation',
        'Warn colleagues through official channels'
      ],
      reward: 250,
      completed: false
    },
    {
      id: '3',
      title: 'Sophisticated Job Scam - "Remote Marketing Manager"',
      type: 'job',
      difficulty: 'intermediate',
      scenario: 'You receive a professional-looking job offer email after applying to multiple positions',
      context: 'Subject: Job Offer - Marketing Manager Position. "Congratulations! You have been selected for our Remote Marketing Manager position at Digital Solutions Asia. Salary: $5,000/month. Benefits: Health insurance, flexible hours. To secure your position, please pay $800 for equipment, training materials, and background check processing. Start date: Next Monday. Please confirm by sending payment to secure your spot."',
      redFlags: [
        'Upfront payment required from employee',
        'No interview process mentioned',
        'Salary seems too high for requirements',
        'Immediate start date pressure',
        'Payment for background check (employer responsibility)',
        'Generic company name without specific details',
        'No official company email domain',
        'Equipment costs charged to employee'
      ],
      correctAction: 'Research the company thoroughly through official websites and business registries. Never pay upfront fees for employment. Contact company directly through verified channels.',
      consequences: {
        correct: 'You avoid losing $800 and continue legitimate job searching. You also help others by reporting the scam.',
        incorrect: 'You lose $800, the job doesn\'t exist, and scammers may use your personal information for identity theft.'
      },
      prevention: [
        'Legitimate employers never ask employees to pay upfront fees',
        'Research companies through official websites and business registries',
        'Verify job offers through official company HR departments',
        'Be suspicious of unsolicited high-paying job offers',
        'Check company reviews from current and former employees',
        'Ensure proper interview process and documentation',
        'Verify company physical address and contact information'
      ],
      realExample: 'Vietnamese job seekers lost $8M in 2023 to fake remote work scams. "Asia Digital Marketing" collected $600 from 2,000 victims before disappearing.',
      financialImpact: 'Average loss: $400 per victim. Additional costs: Identity theft recovery ($2,000), credit monitoring ($200/year).',
      psychologicalTactics: [
        'Professional appearance with company logos',
        'High salary offers to trigger greed',
        'Urgency to secure position quickly',
        'Legitimate-sounding fees (background check, equipment)',
        'Targeting unemployed or underemployed individuals'
      ],
      targetDemographic: 'Job seekers, recent graduates, unemployed individuals, people seeking remote work, career changers',
      reportingSteps: [
        'Report to job posting website (LinkedIn, Indeed)',
        'Contact local employment authorities',
        'Report to cybercrime police',
        'Share experience on job seeker forums',
        'Document all communications for evidence'
      ],
      reward: 180,
      completed: false
    },
    {
      id: '4',
      title: 'Facebook Marketplace Purchase Scam - "iPhone 15 Pro Max"',
      type: 'social',
      difficulty: 'basic',
      scenario: 'You\'re browsing Facebook Marketplace for a new phone and find an incredible deal',
      context: 'Post: "iPhone 15 Pro Max 256GB - Brand new, sealed box - Only $300! Original price $1,200. Must sell today due to family emergency. Bank transfer only, will ship immediately after payment. No meetups, no returns. Serious buyers only! Message me now!"',
      redFlags: [
        'Price 75% below retail value',
        'Emergency sale story to create urgency',
        'Bank transfer only payment (no buyer protection)',
        'No in-person inspection allowed',
        'No returns policy',
        'Pressure to buy immediately',
        'Seller avoids meeting in person',
        'New Facebook account with no history'
      ],
      correctAction: 'Insist on meeting in person at safe public location to inspect item. Use secure payment methods with buyer protection. Walk away if seller refuses.',
      consequences: {
        correct: 'You avoid losing $300 and find legitimate sellers who allow inspection and secure payment methods.',
        incorrect: 'You lose $300, receive nothing, and your banking information may be compromised for future scams.'
      },
      prevention: [
        'Always meet sellers in safe, public locations (police stations, malls)',
        'Inspect items thoroughly before any payment',
        'Use secure payment methods with buyer protection (PayPal, credit cards)',
        'Research market prices before purchasing',
        'Check seller\'s profile history and reviews',
        'Trust your instincts if something feels wrong',
        'Bring a knowledgeable friend for expensive purchases'
      ],
      realExample: 'Vietnamese consumers lost $15M in 2023 to fake online marketplace sellers. "iPhone scams" accounted for 30% of electronics fraud cases.',
      financialImpact: 'Average loss: $250 per victim. Additional costs: Bank fees for fraudulent transfers ($50), time lost searching for legitimate sellers.',
      psychologicalTactics: [
        'Greed appeal with extremely low prices',
        'Urgency with emergency sale stories',
        'Social proof with fake positive reviews',
        'Authority bias with professional-looking posts',
        'Commitment escalation once initial contact is made'
      ],
      targetDemographic: 'Online shoppers, bargain hunters, students with limited budgets, people unfamiliar with market prices',
      reportingSteps: [
        'Report seller to Facebook Marketplace',
        'Contact local consumer protection agency',
        'Report to cybercrime police if money was lost',
        'Share experience in consumer protection groups',
        'Help others by posting warnings about specific scams'
      ],
      reward: 120,
      completed: false
    },
    {
      id: '5',
      title: 'Advanced Phishing Email - "Vietcombank Security Alert"',
      type: 'phishing',
      difficulty: 'intermediate',
      scenario: 'You receive an urgent email that looks exactly like official bank communication',
      context: 'From: security@vietcombank-verify.com. Subject: URGENT - Account Security Breach Detected. "Dear Valued Customer, We detected suspicious login attempts from China and Russia on your account. Your account will be temporarily suspended in 2 hours for security. Click here to verify your identity immediately: http://vcb-security-check.net/verify. Enter your login credentials and SMS OTP to confirm account ownership. Failure to verify will result in permanent account closure. -Vietcombank Security Team"',
      redFlags: [
        'Fake domain (vietcombank-verify.com vs official vietcombank.com.vn)',
        'Urgent time pressure (2 hours)',
        'Suspicious login claims from foreign countries',
        'External verification link instead of official app',
        'Requests for login credentials and OTP',
        'Threats of permanent account closure',
        'Generic greeting without account-specific details',
        'Poor grammar and formatting inconsistencies'
      ],
      correctAction: 'Delete email immediately. Log into official Vietcombank app or website directly. Call official Vietcombank hotline to verify account status.',
      consequences: {
        correct: 'You protect your banking credentials and avoid account compromise. Your account remains secure.',
        incorrect: 'Hackers steal your login details and OTP, drain your bank account, and may use your information for additional fraud.'
      },
      prevention: [
        'Always check sender email domains carefully (.com.vn for Vietnamese banks)',
        'Banks never ask for credentials via email or SMS',
        'Contact institutions directly through official phone numbers',
        'Use official banking apps instead of email links',
        'Enable two-factor authentication on all accounts',
        'Keep banking apps updated with latest security features',
        'Never share OTP codes with anyone',
        'Set up account alerts for all transactions'
      ],
      realExample: 'Vietnamese banks blocked 75,000+ phishing emails in 2023. Vietcombank customers lost average $3,000 each to credential theft.',
      financialImpact: 'Average account drainage: $3,000. Bank recovery process: 2-4 weeks. Credit monitoring costs: $200/year.',
      psychologicalTactics: [
        'Fear of account closure',
        'Urgency with specific time limits',
        'Authority impersonation with official logos',
        'Technical jargon to appear legitimate',
        'Social proof with security team signatures'
      ],
      targetDemographic: 'Bank customers, elderly users, people with limited digital literacy, busy professionals who don\'t read carefully',
      reportingSteps: [
        'Forward phishing email to bank\'s security team',
        'Report to Vietnam Computer Emergency Response Team (VNCERT)',
        'Block sender and mark as spam',
        'Warn family and friends about the specific scam',
        'Report to local cybercrime police if money was lost'
      ],
      reward: 180,
      completed: false
    },
    {
      id: '6',
      title: 'Romance Scam with Crypto Investment Twist',
      type: 'romance',
      difficulty: 'advanced',
      scenario: 'You\'ve been chatting with someone on a dating app for 3 weeks who seems perfect',
      context: 'Match message: "I\'ve really enjoyed getting to know you these past weeks. I care about your future and want to help you financially. I work in cryptocurrency trading and have a proven strategy that makes 5% daily returns. If you trust me with $5,000, I can trade it for you and we\'ll split the profits 50/50. This could be the start of our financial future together! My trading platform requires bank transfer for security. What do you think, my love?"',
      redFlags: [
        'Mixing romance with financial requests',
        'Claims of 5% daily returns (1,825% annually - impossible)',
        'Requests for large sum of money ($5,000)',
        'Bank transfer payment method (no protection)',
        'Emotional manipulation ("my love", "our future")',
        'Pressure to trust without meeting in person',
        'Vague trading strategy without details',
        'No verifiable trading credentials or licenses'
      ],
      correctAction: 'Refuse any financial involvement. Suggest meeting in person first. If they make excuses or pressure you, block and report them immediately.',
      consequences: {
        correct: 'You avoid losing money and emotional trauma. The scammer reveals their true intentions and disappears.',
        incorrect: 'You lose $5,000, suffer emotional trauma from betrayal, and may be targeted for additional scams.'
      },
      prevention: [
        'Never send money to people you\'ve only met online',
        'Be suspicious if they quickly turn conversations to money',
        'Video chat to verify they are who they claim to be',
        'Research their photos using reverse image search',
        'Keep financial and romantic relationships completely separate',
        'Meet in person before any financial discussions',
        'Trust friends and family who express concerns'
      ],
      realExample: 'Vietnamese victims lost $30M to romance scams in 2023. "Investment romance scams" averaged $8,000 loss per victim, with some losing over $50,000.',
      financialImpact: 'Average loss: $8,000. Emotional therapy costs: $2,000. Credit damage from borrowed money: Long-term impact on financial health.',
      psychologicalTactics: [
        'Love bombing with excessive affection',
        'Building emotional dependency over weeks',
        'Financial opportunity mixed with romance',
        'Urgency to act on "exclusive" trading opportunity',
        'Isolation from friends and family who might object'
      ],
      targetDemographic: 'Lonely individuals, recent divorcees, people seeking relationships online, financially struggling individuals',
      reportingSteps: [
        'Report profile to dating app immediately',
        'Contact local police cybercrime unit',
        'Report to Federal Trade Commission',
        'Share experience on scam awareness websites',
        'Help others by posting warnings with scammer details'
      ],
      reward: 220,
      completed: false
    },
    {
      id: '7',
      title: 'Fake Tech Support Call - "Apple Security Vietnam"',
      type: 'tech_support',
      difficulty: 'intermediate',
      scenario: 'You receive an unexpected phone call while using your iPhone',
      context: 'Caller: "Hello, this is John from Apple Security Vietnam. We detected that your iPhone has been compromised by hackers from Russia. They are accessing your photos, banking apps, and personal information right now. We need to install our security software remotely to protect you immediately. Please download TeamViewer and give me the access code so I can secure your device before more damage occurs. This is urgent - every minute counts."',
      redFlags: [
        'Unsolicited call claiming security breach',
        'Claims of active hacking in progress',
        'Requests for remote access to device',
        'Pressure with urgency ("every minute counts")',
        'Generic foreign name (John) for Vietnamese support',
        'Requests to download third-party software',
        'No verification of your identity or account',
        'Apple doesn\'t make proactive security calls'
      ],
      correctAction: 'Hang up immediately. Contact Apple through official support app or website. Never allow remote access to unknown callers.',
      consequences: {
        correct: 'You protect your device and personal information. Your iPhone remains secure.',
        incorrect: 'Scammers install malware, steal banking credentials, access personal photos, and may demand ransom for "fixing" the device.'
      },
      prevention: [
        'Major tech companies never make unsolicited support calls',
        'Never allow remote access to unknown callers',
        'Hang up and contact official support through verified channels',
        'Use official company apps for support requests',
        'Be especially cautious with elderly family members',
        'Educate family about tech support scam tactics',
        'Keep devices updated with official security patches'
      ],
      realExample: 'Tech support scams cost Vietnamese consumers $12M in 2023. Elderly victims lost average $800 each to fake Apple, Microsoft, and Google support calls.',
      financialImpact: 'Average loss: $800. Identity theft recovery: $2,000. Device replacement: $1,000. Credit monitoring: $200/year.',
      psychologicalTactics: [
        'Fear of immediate security threat',
        'Authority impersonation with tech company names',
        'Technical jargon to appear knowledgeable',
        'Urgency to prevent further "damage"',
        'Helpful persona offering to "fix" problems'
      ],
      targetDemographic: 'Elderly users, people with limited tech knowledge, iPhone users, individuals who trust authority figures',
      reportingSteps: [
        'Report to Apple through official support channels',
        'Contact local consumer protection agency',
        'Report to Federal Trade Commission',
        'Warn elderly family members about this specific scam',
        'Share experience on tech support scam awareness sites'
      ],
      reward: 200,
      completed: false
    },
    {
      id: '8',
      title: 'Fake Banking App Download Scam',
      type: 'fake_app',
      difficulty: 'advanced',
      scenario: 'You search for your bank\'s mobile app and find multiple similar-looking options',
      context: 'Google Play Store search results: 1) "Vietcombank Mobile Banking" (official), 2) "VietcomBank - Mobile Bank" (fake), 3) "Vietcombank Banking App" (fake). The fake apps have similar logos, 4.5-star ratings, and descriptions claiming "faster transactions" and "enhanced security features". They require extensive permissions including SMS, contacts, and device admin access.',
      redFlags: [
        'Multiple apps with similar names and logos',
        'Slight spelling differences in app names',
        'Requests for excessive permissions',
        'Developer name doesn\'t match official bank',
        'Recent publication date for "established" bank',
        'Reviews seem generic or fake',
        'App not linked from official bank website',
        'Requests for device administrator access'
      ],
      correctAction: 'Only download apps directly from official bank website links. Verify developer name matches bank exactly. Check app permissions carefully.',
      consequences: {
        correct: 'You download the legitimate app and keep your banking information secure.',
        incorrect: 'Fake app steals all your banking credentials, SMS codes, and personal information. Hackers drain your accounts.'
      },
      prevention: [
        'Always download banking apps from official bank website links',
        'Verify developer name matches bank exactly',
        'Check app permissions - banks don\'t need access to photos/contacts',
        'Read recent reviews carefully for warning signs',
        'Contact bank if unsure which app is official',
        'Keep official banking apps updated',
        'Use app store security features and warnings'
      ],
      realExample: 'Fake banking apps infected 50,000+ Vietnamese phones in 2023. Victims lost average $2,500 each when credentials were stolen.',
      financialImpact: 'Average account drainage: $2,500. Bank recovery process: 3-6 weeks. New device costs: $500. Credit monitoring: $200/year.',
      psychologicalTactics: [
        'Visual mimicry of official bank branding',
        'Social proof with fake positive reviews',
        'Authority bias with professional app descriptions',
        'Convenience appeal with "enhanced features"',
        'Trust exploitation of banking relationships'
      ],
      targetDemographic: 'Mobile banking users, people downloading apps frequently, users who don\'t verify app sources, elderly smartphone users',
      reportingSteps: [
        'Report fake apps to Google Play Store',
        'Contact your bank\'s security team immediately',
        'Report to Vietnam Computer Emergency Response Team',
        'Warn others on social media about specific fake apps',
        'Help others identify legitimate vs fake banking apps'
      ],
      reward: 240,
      completed: false
    },
    {
      id: '9',
      title: 'Multi-Level Marketing Job Scam - "Health Products Empire"',
      type: 'job',
      difficulty: 'intermediate',
      scenario: 'A friend invites you to a "business opportunity presentation" at a hotel',
      context: 'Presentation: "Join Health Products Empire and earn $3,000-$8,000 monthly working from home! No experience needed! Just recruit 5 friends and sell our premium health products. Our top earners make $50,000 monthly! Registration fee: $500 for starter kit and training. You\'ll get your money back in the first month! This is your chance for financial freedom!"',
      redFlags: [
        'Focus on recruiting others rather than selling products',
        'Unrealistic income claims without proof',
        'Upfront payment required to start "job"',
        'Emphasis on recruiting friends and family',
        'Vague product details but clear recruitment structure',
        'High-pressure sales environment',
        'Claims of easy money with minimal work',
        'No base salary, only commission-based income'
      ],
      correctAction: 'Research the company\'s income disclosure statements. Understand that 99% of MLM participants lose money. Decline politely and look for legitimate employment.',
      consequences: {
        correct: 'You avoid losing $500 and damaging relationships with friends and family through recruitment pressure.',
        incorrect: 'You lose $500, struggle to make money, damage relationships by recruiting others, and may lose more money buying products.'
      },
      prevention: [
        'Research MLM company income disclosures (usually 99% lose money)',
        'Understand that legitimate jobs pay you, not the other way around',
        'Be wary when friends pressure you to join "opportunities"',
        'Focus on jobs that pay for your skills, not recruitment',
        'Check if company has physical offices and real employees',
        'Understand the difference between jobs and business opportunities',
        'Research company reviews from former participants'
      ],
      realExample: 'Vietnamese MLM participants lost average $1,200 each in 2023. "Health Empire VN" collected $5M from 4,000 participants before regulatory shutdown.',
      financialImpact: 'Average loss: $1,200. Relationship damage: Priceless. Time wasted: 6-12 months. Opportunity cost of legitimate employment.',
      psychologicalTactics: [
        'Social proof with friend recommendations',
        'Greed appeal with high income claims',
        'Authority bias with successful "mentors"',
        'Scarcity with limited-time offers',
        'Community belonging with team meetings'
      ],
      targetDemographic: 'Job seekers, stay-at-home parents, students, people seeking additional income, individuals influenced by friends',
      reportingSteps: [
        'Report to local business licensing authorities',
        'Contact consumer protection agencies',
        'Share experience on MLM awareness websites',
        'Warn friends and family about recruitment tactics',
        'Report to Better Business Bureau equivalent'
      ],
      reward: 190,
      completed: false
    },
    {
      id: '10',
      title: 'Sophisticated Investment Ponzi Scheme - "VietGold Pro"',
      type: 'investment',
      difficulty: 'advanced',
      scenario: 'A colleague shows you their impressive investment returns and invites you to join their platform',
      context: 'Colleague: "Look at my VietGold Pro account - I made $15,000 in 3 months! They guarantee 12% monthly returns with government backing and insurance. The platform uses AI trading algorithms and gold reserves. Minimum investment is $10,000 but I can get you a referral bonus. Here\'s my withdrawal proof and the official-looking website. You should invest before they close new registrations next week!"',
      redFlags: [
        'Guaranteed 12% monthly returns (impossible without extreme risk)',
        'Claims of government backing without verification',
        'Referral bonuses for bringing new investors',
        'Pressure to invest before "registration closes"',
        'Withdrawal proof can be easily faked',
        'Vague explanation of investment strategy',
        'Minimum investment requirement',
        'Professional website doesn\'t guarantee legitimacy'
      ],
      correctAction: 'Research the platform through State Securities Commission. Understand that 12% monthly returns are impossible without extreme risk. Decline and report if unlicensed.',
      consequences: {
        correct: 'You avoid losing $10,000 and help protect others by reporting the scheme to authorities.',
        incorrect: 'You lose $10,000 when the Ponzi scheme collapses. You may also recruit others and feel guilty when they lose money too.'
      },
      prevention: [
        'Check investment platforms with State Securities Commission of Vietnam',
        'Understand that guaranteed high returns don\'t exist',
        'Be wary when friends pressure you to invest',
        'Research company licenses and registration',
        'Understand that legitimate investments carry risk',
        'Consult licensed financial advisors for major investments',
        'Start with small amounts in regulated platforms'
      ],
      realExample: 'Pincoin and iFan Ponzi schemes in Vietnam (2018) stole $660M from 32,000 investors. VietGold Pro (2023) collected $25M before collapse.',
      financialImpact: 'Average loss: $8,000. Many victims borrowed money or used retirement savings. Recovery rate: Less than 10% of invested funds.',
      psychologicalTactics: [
        'Social proof from trusted colleagues',
        'Greed appeal with high guaranteed returns',
        'Authority bias with government backing claims',
        'Scarcity with limited registration periods',
        'Trust exploitation through personal relationships'
      ],
      targetDemographic: 'Working professionals, people with savings to invest, individuals influenced by colleagues, people seeking passive income',
      reportingSteps: [
        'Report to State Securities Commission of Vietnam',
        'Contact local financial crimes police',
        'Report to Vietnam Computer Emergency Response Team',
        'Warn colleagues and friends about the specific scheme',
        'Share experience on investment fraud awareness sites'
      ],
      reward: 280,
      completed: false
    },
    {
      id: '11',
      title: 'Fake Antivirus Malware - "PC Security Pro"',
      type: 'malware',
      difficulty: 'intermediate',
      scenario: 'A pop-up appears while browsing claiming your computer is infected',
      context: 'Pop-up: "WARNING! Your computer is infected with 47 viruses and 12 malware threats! Your personal information and banking data are at risk! Download PC Security Pro now to remove threats immediately. Free scan available - click here to download: pc-security-pro.exe. Don\'t wait - hackers are accessing your files right now!"',
      redFlags: [
        'Specific number of threats claimed (47 viruses)',
        'Pop-up advertisement for security software',
        'Immediate download pressure',
        'Claims of active hacking in progress',
        'Free software solving expensive problems',
        'Executable file download (.exe)',
        'No legitimate antivirus company uses pop-up ads',
        'Scare tactics about banking data theft'
      ],
      correctAction: 'Close browser immediately without clicking anything. Run legitimate antivirus scan. Never download software from pop-up advertisements.',
      consequences: {
        correct: 'You avoid installing malware and keep your computer secure. Your personal and financial information remains protected.',
        incorrect: 'You install malware that steals banking credentials, personal information, and may demand ransom for "fixing" your computer.'
      },
      prevention: [
        'Use reputable antivirus software from known companies',
        'Never download software from pop-up advertisements',
        'Keep browser and operating system updated',
        'Use ad blockers and pop-up blockers',
        'Only download software from official company websites',
        'Enable automatic security updates',
        'Regular system scans with legitimate antivirus'
      ],
      realExample: 'Fake antivirus malware infected 2M+ computers globally in 2023. Vietnamese victims lost average $300 each to fake security software.',
      financialImpact: 'Fake software cost: $300. Identity theft recovery: $2,000. Computer repair/replacement: $800. Banking fraud losses: $1,500.',
      psychologicalTactics: [
        'Fear of immediate security threats',
        'Urgency with active hacking claims',
        'Authority bias with security company branding',
        'Problem-solution presentation',
        'Technical intimidation with virus counts'
      ],
      targetDemographic: 'Computer users with limited technical knowledge, elderly users, people who panic at security warnings',
      reportingSteps: [
        'Report malicious website to browser security teams',
        'Contact antivirus company to report fake software',
        'Report to cybersecurity authorities',
        'Warn others about specific fake antivirus names',
        'Share experience on computer security forums'
      ],
      reward: 160,
      completed: false
    },
    {
      id: '12',
      title: 'Social Media Investment Group Scam - "Crypto Millionaires VN"',
      type: 'investment',
      difficulty: 'advanced',
      scenario: 'You\'re added to a WhatsApp group with 200+ members discussing cryptocurrency investments',
      context: 'Group messages: "Welcome to Crypto Millionaires VN! Our AI trading bot guarantees 3% daily profits. See our live trading results! Minimum investment $2,000. Current members made $100,000+ this year! Join our exclusive trading platform: crypto-profits-vn.com. Limited spots available - only serious investors! Admin will contact you privately for VIP access."',
      redFlags: [
        'Guaranteed daily profits (3% daily = 2,922% annually)',
        'Fake trading results and screenshots',
        'Minimum investment requirements',
        'Exclusive group with limited access',
        'Admin contacting privately for "VIP" treatment',
        'Pressure from multiple group members',
        'Unregulated trading platform',
        'Claims of AI trading bot success'
      ],
      correctAction: 'Leave the group immediately. Report to authorities. Research legitimate cryptocurrency exchanges through official financial regulators.',
      consequences: {
        correct: 'You avoid losing money to a sophisticated Ponzi scheme and help protect others by reporting.',
        incorrect: 'You lose $2,000+ and may recruit others into the scam, damaging relationships when the scheme collapses.'
      },
      prevention: [
        'No investment can guarantee daily profits',
        'Research crypto exchanges through State Securities Commission',
        'Be extremely wary of investment groups on social media',
        'Understand that cryptocurrency is high-risk, high-volatility',
        'Only invest what you can afford to lose completely',
        'Use only regulated exchanges with proper licenses',
        'Be suspicious of "exclusive" investment opportunities'
      ],
      realExample: 'Vietnamese investors lost $30M to fake crypto trading groups in 2023. "Crypto Millionaires VN" collected $12M from 6,000 victims before disappearing.',
      financialImpact: 'Average loss: $2,000. Many victims borrowed money or used credit cards. Recovery rate: Less than 5% of invested funds.',
      psychologicalTactics: [
        'Social proof with large group membership',
        'FOMO with exclusive access claims',
        'Greed appeal with high profit promises',
        'Authority bias with AI trading technology',
        'Community pressure from multiple members'
      ],
      targetDemographic: 'Cryptocurrency enthusiasts, young investors, people seeking passive income, individuals influenced by social media',
      reportingSteps: [
        'Report WhatsApp group to platform',
        'Contact State Securities Commission of Vietnam',
        'Report to cybercrime police',
        'Warn others on cryptocurrency forums',
        'Share details with financial fraud awareness groups'
      ],
      reward: 300,
      completed: false
    }
  ];

  const cybersecurityLessons: CybersecurityLesson[] = [
    {
      id: '1',
      title: 'Password Security and Multi-Factor Authentication',
      category: 'basics',
      difficulty: 'beginner',
      content: 'Strong passwords and multi-factor authentication (MFA) are your first line of defense against cybercriminals. Most data breaches involve weak or stolen passwords.',
      keyPoints: [
        'Use unique passwords for every account (especially banking and email)',
        'Passwords should be 12+ characters with mix of letters, numbers, symbols',
        'Enable two-factor authentication on all important accounts',
        'Use password managers to generate and store strong passwords',
        'Never share passwords or write them down in obvious places'
      ],
      practicalSteps: [
        'Install a reputable password manager (Bitwarden, 1Password)',
        'Generate unique 16+ character passwords for all accounts',
        'Enable 2FA on banking, email, and social media accounts',
        'Use authenticator apps instead of SMS when possible',
        'Regularly review and update passwords for old accounts'
      ],
      tools: [
        'Bitwarden (free password manager)',
        'Google Authenticator (2FA app)',
        'Microsoft Authenticator (2FA app)',
        'Have I Been Pwned (check for data breaches)',
        'Password strength checkers'
      ],
      realWorldExample: 'In 2023, 80% of data breaches involved weak passwords. Vietnamese users with strong passwords and 2FA had 99.9% lower chance of account compromise.',
      commonMistakes: [
        'Using the same password for multiple accounts',
        'Using personal information in passwords (birthdate, name)',
        'Sharing passwords with family or friends',
        'Not enabling 2FA on important accounts',
        'Using SMS for 2FA instead of authenticator apps'
      ],
      advancedTips: [
        'Use hardware security keys for maximum protection',
        'Enable account monitoring and alerts',
        'Regularly audit account access and permissions',
        'Use different email addresses for different purposes',
        'Consider using VPN for additional privacy'
      ],
      reward: 150,
      completed: false
    },
    {
      id: '2',
      title: 'Email Security and Phishing Detection',
      category: 'advanced',
      difficulty: 'intermediate',
      content: 'Email is the most common attack vector for cybercriminals. Learning to identify and handle suspicious emails protects your personal and financial information.',
      keyPoints: [
        'Check sender email addresses carefully for misspellings',
        'Hover over links to see actual destinations before clicking',
        'Be suspicious of urgent requests for personal information',
        'Verify requests through independent channels',
        'Use email filtering and security features'
      ],
      practicalSteps: [
        'Enable email filtering and spam protection',
        'Set up email rules to flag suspicious messages',
        'Practice identifying phishing emails with training tools',
        'Report phishing attempts to email provider',
        'Educate family members about email security'
      ],
      tools: [
        'Gmail Advanced Protection Program',
        'Microsoft Defender for Office 365',
        'PhishMe training platform',
        'Email header analyzers',
        'URL reputation checkers'
      ],
      realWorldExample: 'Vietnamese banks blocked 75,000+ phishing emails in 2023. Users who completed email security training had 95% lower phishing success rate.',
      commonMistakes: [
        'Clicking links in suspicious emails',
        'Downloading attachments from unknown senders',
        'Providing personal information via email',
        'Not verifying urgent requests independently',
        'Forwarding suspicious emails to others'
      ],
      advancedTips: [
        'Analyze email headers for authenticity',
        'Use email encryption for sensitive communications',
        'Set up email aliases for different purposes',
        'Implement DMARC and SPF records for business emails',
        'Use secure email providers for sensitive communications'
      ],
      reward: 200,
      completed: false
    },
    {
      id: '3',
      title: 'Social Engineering Psychology and Defense',
      category: 'advanced',
      difficulty: 'expert',
      content: 'Social engineering exploits human psychology rather than technical vulnerabilities. Understanding these tactics helps you recognize and resist manipulation attempts.',
      keyPoints: [
        'Scammers exploit emotions: fear, greed, urgency, trust, authority',
        'They research victims through social media and public information',
        'Pretexting involves creating fake scenarios to gain trust',
        'Authority impersonation leverages respect for institutions',
        'Social proof uses fake testimonials and group pressure'
      ],
      practicalSteps: [
        'Limit personal information shared on social media',
        'Verify identity of anyone requesting sensitive information',
        'Take time to think before responding to urgent requests',
        'Consult trusted friends or family for major decisions',
        'Document and report social engineering attempts'
      ],
      tools: [
        'Privacy settings on social media platforms',
        'Caller ID and call blocking apps',
        'Social media monitoring tools',
        'Identity monitoring services',
        'Secure communication apps'
      ],
      realWorldExample: 'Vietnamese authorities reported 15,000+ social engineering attacks in 2023. Victims who understood psychological tactics had 80% lower success rate.',
      commonMistakes: [
        'Trusting callers who claim authority without verification',
        'Sharing too much personal information online',
        'Making quick decisions under pressure',
        'Not questioning unusual requests from "trusted" sources',
        'Ignoring gut feelings about suspicious interactions'
      ],
      advancedTips: [
        'Develop verification protocols for sensitive requests',
        'Use code words with family for emergency situations',
        'Implement information sharing policies in organizations',
        'Train employees on social engineering recognition',
        'Create incident response plans for social engineering attacks'
      ],
      reward: 250,
      completed: false
    },
    {
      id: '4',
      title: 'Ransomware Prevention and Response',
      category: 'advanced',
      difficulty: 'expert',
      content: 'Ransomware encrypts your files and demands payment for decryption. Prevention is critical because paying ransoms doesn\'t guarantee file recovery and encourages more attacks.',
      keyPoints: [
        'Regular automated backups to offline storage are essential',
        'Keep operating systems and software updated',
        'Use reputable antivirus with real-time protection',
        'Train users to recognize ransomware delivery methods',
        'Implement network segmentation to limit damage'
      ],
      practicalSteps: [
        'Set up automated daily backups to external drive',
        'Test backup restoration process monthly',
        'Enable automatic security updates',
        'Use business-grade antivirus with behavior monitoring',
        'Create incident response plan for ransomware attacks'
      ],
      tools: [
        'Windows Backup and Restore',
        'Time Machine (Mac)',
        'Cloud backup services (Google Drive, OneDrive)',
        'Business backup solutions (Acronis, Carbonite)',
        'Network monitoring tools'
      ],
      realWorldExample: 'Vietnamese businesses lost $50M to ransomware in 2023. Companies with proper backups recovered in hours vs weeks for those without.',
      commonMistakes: [
        'Not having offline backups',
        'Clicking suspicious email attachments',
        'Not updating software regularly',
        'Paying ransoms (only 65% get files back)',
        'Not having incident response plans'
      ],
      advancedTips: [
        'Implement zero-trust network architecture',
        'Use application whitelisting',
        'Deploy endpoint detection and response (EDR)',
        'Conduct regular security awareness training',
        'Maintain offline backup copies in different locations'
      ],
      reward: 300,
      completed: false
    },
    {
      id: '5',
      title: 'Mobile Security and App Safety',
      category: 'tools',
      difficulty: 'intermediate',
      content: 'Mobile devices contain vast amounts of personal and financial information. Securing your smartphone and being cautious with app downloads protects your digital life.',
      keyPoints: [
        'Only download apps from official app stores',
        'Review app permissions carefully before installing',
        'Keep mobile operating system updated',
        'Use screen locks and biometric authentication',
        'Be cautious with public Wi-Fi for sensitive activities'
      ],
      practicalSteps: [
        'Enable automatic OS updates',
        'Review and revoke unnecessary app permissions',
        'Set up remote wipe capability for lost devices',
        'Use VPN for public Wi-Fi connections',
        'Regularly review installed apps and remove unused ones'
      ],
      tools: [
        'Official app stores (Google Play, Apple App Store)',
        'Mobile antivirus apps (Bitdefender, Norton)',
        'VPN services (NordVPN, ExpressVPN)',
        'Find My Device / Find My iPhone',
        'Mobile device management (MDM) solutions'
      ],
      realWorldExample: 'Fake banking apps infected 50,000+ Vietnamese phones in 2023. Users who verified app sources had 99% lower infection rate.',
      commonMistakes: [
        'Downloading apps from unofficial sources',
        'Granting excessive permissions to apps',
        'Using public Wi-Fi for banking',
        'Not using screen locks or biometric security',
        'Ignoring app update notifications'
      ],
      advancedTips: [
        'Use separate devices for banking and general use',
        'Implement mobile threat defense solutions',
        'Regular security audits of installed apps',
        'Use encrypted messaging for sensitive communications',
        'Consider using dedicated banking apps only'
      ],
      reward: 180,
      completed: false
    },
    {
      id: '6',
      title: 'Advanced Threat Detection and Incident Response',
      category: 'advanced',
      difficulty: 'expert',
      content: 'Advanced cybersecurity involves proactive threat detection and having comprehensive incident response plans when security breaches occur.',
      keyPoints: [
        'Monitor accounts regularly for unauthorized activity',
        'Set up alerts for all financial transactions',
        'Understand indicators of compromise (IOCs)',
        'Have incident response plan ready',
        'Know who to contact when security incidents occur'
      ],
      practicalSteps: [
        'Set up account monitoring and alerts',
        'Create incident response contact list',
        'Practice incident response procedures',
        'Document security incidents for learning',
        'Regularly review and update security measures'
      ],
      tools: [
        'Account monitoring services',
        'Credit monitoring and alerts',
        'Security information and event management (SIEM)',
        'Incident response platforms',
        'Threat intelligence feeds'
      ],
      realWorldExample: 'Companies with incident response plans recovered from cyberattacks 50% faster and with 60% lower costs than those without plans.',
      commonMistakes: [
        'Not monitoring accounts regularly',
        'Delayed response to security incidents',
        'Not having emergency contact information',
        'Failing to document incidents for learning',
        'Not updating security measures after incidents'
      ],
      advancedTips: [
        'Implement continuous security monitoring',
        'Use threat hunting techniques',
        'Participate in cybersecurity information sharing',
        'Conduct regular security assessments',
        'Maintain relationships with cybersecurity experts'
      ],
      reward: 350,
      completed: false
    }
  ];

  const scamTypes = [
    { type: 'phishing', name: 'Phishing', icon: Mail, color: 'from-red-500 to-pink-500', count: 15, description: 'Email and SMS credential theft' },
    { type: 'ransomware', name: 'Ransomware', icon: Lock, color: 'from-orange-500 to-red-500', count: 8, description: 'File encryption and payment demands' },
    { type: 'social', name: 'Social Engineering', icon: Users, color: 'from-purple-500 to-indigo-500', count: 12, description: 'Psychological manipulation tactics' },
    { type: 'investment', name: 'Investment Scams', icon: DollarSign, color: 'from-green-500 to-blue-500', count: 10, description: 'Ponzi schemes and fake opportunities' },
    { type: 'job', name: 'Job Scams', icon: Briefcase, color: 'from-blue-500 to-cyan-500', count: 9, description: 'Fake employment opportunities' },
    { type: 'fomo', name: 'FOMO Scams', icon: Zap, color: 'from-yellow-500 to-orange-500', count: 11, description: 'Urgency and limited-time offers' },
    { type: 'malware', name: 'Malware', icon: Wifi, color: 'from-pink-500 to-purple-500', count: 7, description: 'Malicious software and fake antivirus' },
    { type: 'romance', name: 'Romance Scams', icon: Users, color: 'from-rose-500 to-pink-500', count: 6, description: 'Dating app financial manipulation' }
  ];

  const handleScamDetection = (caseItem: ScamCase, detected: boolean) => {
    const isCorrect = detected;
    setShowFeedback(true);
    
    if (isCorrect) {
      addCoins(caseItem.reward);
      updateProgress({
        milSkillScore: progress.milSkillScore + (caseItem.difficulty === 'advanced' ? 25 : caseItem.difficulty === 'intermediate' ? 15 : 10)
      });
    } else {
      addCoins(-30);
      updateProgress({
        milSkillScore: Math.max(0, progress.milSkillScore - 5)
      });
    }
  };

  const completeLesson = (lesson: CybersecurityLesson) => {
    addCoins(lesson.reward);
    updateProgress({ 
      milSkillScore: progress.milSkillScore + (lesson.difficulty === 'expert' ? 30 : lesson.difficulty === 'intermediate' ? 20 : 15)
    });
    
    setSelectedLesson(null);
  };

  const renderScamDetector = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Eye className="mx-auto mb-4 text-red-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Advanced Scam Detection Training</h2>
        <p className="text-red-200">Test your ability to identify sophisticated real-world scams</p>
      </div>

      {selectedCase ? (
        <div className="bg-white/10 rounded-xl p-8 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-bold text-2xl">{selectedCase.title}</h3>
              <div className="flex items-center space-x-3 mt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedCase.difficulty === 'basic' ? 'bg-green-500/30 text-green-200' :
                  selectedCase.difficulty === 'intermediate' ? 'bg-yellow-500/30 text-yellow-200' :
                  'bg-red-500/30 text-red-200'
                }`}>
                  {selectedCase.difficulty.toUpperCase()}
                </span>
                <span className="text-yellow-400 font-semibold">+{selectedCase.reward} coins</span>
                <span className="text-purple-300 text-sm capitalize">{selectedCase.type.replace('_', ' ')}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedCase(null);
                setShowFeedback(false);
              }}
              className="text-purple-300 hover:text-white"
            >
              <ArrowLeft size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-4 border-l-4 border-red-500">
              <h4 className="text-white font-semibold mb-2">📱 Scenario:</h4>
              <p className="text-purple-200 mb-3">{selectedCase.scenario}</p>
              <div className="bg-gray-800/50 rounded p-3 border border-gray-600">
                <p className="text-white italic font-mono text-sm">"{selectedCase.context}"</p>
              </div>
            </div>

            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-3 flex items-center">
                <AlertTriangle className="mr-2" size={16} />
                🚩 Critical Red Flags:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedCase.redFlags.map((flag, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <AlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={12} />
                    <span className="text-red-200 text-sm">{flag}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-300 font-semibold mb-3">🧠 Psychological Tactics Used:</h4>
              <ul className="text-purple-200 text-sm space-y-1">
                {selectedCase.psychologicalTactics.map((tactic, index) => (
                  <li key={index}>• {tactic}</li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-3">🎯 Target Demographic:</h4>
              <p className="text-blue-200 text-sm">{selectedCase.targetDemographic}</p>
            </div>

            {!showFeedback ? (
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-lg">Is this a scam? What should you do?</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleScamDetection(selectedCase, true)}
                    className="bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <Shield size={20} />
                    <span>🚨 YES - This is a SCAM</span>
                  </button>
                  <button
                    onClick={() => handleScamDetection(selectedCase, false)}
                    className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <CheckCircle size={20} />
                    <span>✅ NO - This is legitimate</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <h4 className="text-green-300 font-semibold mb-3 flex items-center">
                    <CheckCircle className="mr-2" size={16} />
                    ✅ Correct Action:
                  </h4>
                  <p className="text-green-200">{selectedCase.correctAction}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h4 className="text-green-300 font-semibold mb-2">✅ If You Act Correctly:</h4>
                    <p className="text-green-200 text-sm">{selectedCase.consequences.correct}</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <h4 className="text-red-300 font-semibold mb-2">❌ If You Fall for It:</h4>
                    <p className="text-red-200 text-sm">{selectedCase.consequences.incorrect}</p>
                  </div>
                </div>

                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="text-blue-300 font-semibold mb-3">🛡️ Prevention Strategies:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedCase.prevention.map((tip, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Shield className="text-blue-400 mt-0.5 flex-shrink-0" size={12} />
                        <span className="text-blue-200 text-sm">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                  <h4 className="text-yellow-300 font-semibold mb-3">📊 Real-World Impact:</h4>
                  <p className="text-yellow-200 text-sm mb-2">{selectedCase.realExample}</p>
                  <p className="text-yellow-200 text-sm font-medium">💰 Financial Impact: {selectedCase.financialImpact}</p>
                </div>

                <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4">
                  <h4 className="text-orange-300 font-semibold mb-3">📞 How to Report This Scam:</h4>
                  <ol className="text-orange-200 text-sm space-y-1">
                    {selectedCase.reportingSteps.map((step, index) => (
                      <li key={index}>{index + 1}. {step}</li>
                    ))}
                  </ol>
                </div>

                <button
                  onClick={() => {
                    setSelectedCase(null);
                    setShowFeedback(false);
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors"
                >
                  Study Another Case
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {comprehensiveScamDatabase.map(scamCase => (
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
                  scamCase.type === 'malware' ? 'from-pink-500/20 to-purple-500/20' :
                  scamCase.type === 'romance' ? 'from-rose-500/20 to-pink-500/20' :
                  scamCase.type === 'tech_support' ? 'from-indigo-500/20 to-blue-500/20' :
                  'from-gray-500/20 to-slate-500/20'
                }`}>
                  {scamCase.type === 'phishing' ? <Mail className="text-red-400" size={20} /> :
                   scamCase.type === 'ransomware' ? <Lock className="text-orange-400" size={20} /> :
                   scamCase.type === 'social' ? <Users className="text-purple-400" size={20} /> :
                   scamCase.type === 'investment' ? <DollarSign className="text-green-400" size={20} /> :
                   scamCase.type === 'job' ? <Briefcase className="text-blue-400" size={20} /> :
                   scamCase.type === 'fomo' ? <Zap className="text-yellow-400" size={20} /> :
                   scamCase.type === 'malware' ? <Wifi className="text-pink-400" size={20} /> :
                   scamCase.type === 'romance' ? <Users className="text-rose-400" size={20} /> :
                   scamCase.type === 'tech_support' ? <Phone className="text-indigo-400" size={20} /> :
                   <Globe className="text-gray-400" size={20} />}
                </div>
                <span className="text-yellow-400 font-semibold text-sm">+{scamCase.reward}</span>
              </div>
              
              <h3 className="text-white font-semibold text-lg mb-2">{scamCase.title}</h3>
              <p className="text-purple-200 text-sm mb-3">{scamCase.scenario}</p>
              
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  scamCase.difficulty === 'basic' ? 'bg-green-500/30 text-green-200' :
                  scamCase.difficulty === 'intermediate' ? 'bg-yellow-500/30 text-yellow-200' :
                  'bg-red-500/30 text-red-200'
                }`}>
                  {scamCase.difficulty.toUpperCase()}
                </span>
                <span className="text-purple-300 text-xs capitalize">{scamCase.type.replace('_', ' ')}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const renderCybersecurityLessons = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Brain className="mx-auto mb-4 text-cyan-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Cybersecurity Academy</h2>
        <p className="text-cyan-200">Master advanced cybersecurity concepts and protection strategies</p>
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
              <h4 className="text-green-300 font-semibold mb-3">🔧 Practical Implementation Steps:</h4>
              <ol className="text-green-200 space-y-1">
                {selectedLesson.practicalSteps.map((step, index) => (
                  <li key={index}>{index + 1}. {step}</li>
                ))}
              </ol>
            </div>

            <div className="bg-cyan-500/20 border border-cyan-500/30 rounded-lg p-4">
              <h4 className="text-cyan-300 font-semibold mb-3">🛠️ Recommended Tools:</h4>
              <ul className="text-cyan-200 text-sm space-y-1">
                {selectedLesson.tools.map((tool, index) => (
                  <li key={index}>• {tool}</li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
              <h4 className="text-yellow-300 font-semibold mb-3">📊 Real-World Success:</h4>
              <p className="text-yellow-200 text-sm">{selectedLesson.realWorldExample}</p>
            </div>

            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-3">⚠️ Common Mistakes to Avoid:</h4>
              <ul className="text-red-200 text-sm space-y-1">
                {selectedLesson.commonMistakes.map((mistake, index) => (
                  <li key={index}>• {mistake}</li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-300 font-semibold mb-3">🚀 Advanced Tips:</h4>
              <ul className="text-purple-200 text-sm space-y-1">
                {selectedLesson.advancedTips.map((tip, index) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => completeLesson(selectedLesson)}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-colors"
            >
              Complete Lesson (+{selectedLesson.reward} coins)
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cybersecurityLessons.map(lesson => (
            <button
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className="text-left bg-white/10 rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${
                  lesson.category === 'basics' ? 'bg-green-500/20' :
                  lesson.category === 'advanced' ? 'bg-red-500/20' :
                  lesson.category === 'tools' ? 'bg-blue-500/20' :
                  'bg-purple-500/20'
                }`}>
                  {lesson.category === 'basics' ? <Shield className="text-green-400" size={20} /> :
                   lesson.category === 'advanced' ? <Brain className="text-red-400" size={20} /> :
                   lesson.category === 'tools' ? <Smartphone className="text-blue-400" size={20} /> :
                   <Eye className="text-purple-400" size={20} />}
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

  const renderScamDatabase = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Brain className="mx-auto mb-4 text-purple-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Comprehensive Scam Knowledge Database</h2>
        <p className="text-purple-200">Extensive library of scam types with real-world cases and prevention strategies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {scamTypes.map(type => (
          <div key={type.type} className="bg-white/10 rounded-xl p-6 border border-white/20">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${type.color} p-3 mb-4`}>
              <type.icon className="text-white" size={24} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">{type.name}</h3>
            <p className="text-purple-200 text-sm mb-2">{type.description}</p>
            <p className="text-purple-300 text-xs mb-4">{type.count} documented cases</p>
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
        <h2 className="text-xl font-bold text-white mb-4">Latest Scam Alerts & Trends</h2>
        <div className="space-y-4">
          {[
            {
              title: 'New TikTok Crypto Scam Wave - "AI Trading Bots"',
              description: 'Fake influencers promoting automated trading systems with 10%+ daily returns',
              severity: 'critical',
              date: '2 hours ago',
              impact: '$2M stolen from 1,000+ victims this week',
              prevention: 'Avoid any investment promising guaranteed daily returns'
            },
            {
              title: 'Fake Banking App Surge on Play Store',
              description: 'Malicious apps mimicking Vietcombank, BIDV, and Techcombank with credential theft',
              severity: 'high',
              date: '6 hours ago',
              impact: '50,000+ downloads before removal',
              prevention: 'Only download banking apps from official bank websites'
            },
            {
              title: 'Romance Scam Targeting Young Professionals',
              description: 'Dating app scammers using investment opportunities to steal money',
              severity: 'high',
              date: '1 day ago',
              impact: 'Average loss $8,000 per victim',
              prevention: 'Never mix romance with financial requests'
            },
            {
              title: 'Ransomware Targeting Small Businesses',
              description: 'Email-based ransomware specifically targeting Vietnamese SMEs',
              severity: 'critical',
              date: '2 days ago',
              impact: '$50,000 average ransom demand',
              prevention: 'Regular offline backups and employee training'
            }
          ].map((alert, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4 border-l-4 border-red-500">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-semibold">{alert.title}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  alert.severity === 'critical' ? 'bg-red-500/30 text-red-200' :
                  'bg-orange-500/30 text-orange-200'
                }`}>
                  {alert.severity.toUpperCase()}
                </span>
              </div>
              <p className="text-purple-200 text-sm mb-2">{alert.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-purple-400">Impact: </span>
                  <span className="text-red-300">{alert.impact}</span>
                </div>
                <div>
                  <span className="text-purple-400">Prevention: </span>
                  <span className="text-green-300">{alert.prevention}</span>
                </div>
                <div>
                  <span className="text-purple-400">Reported: </span>
                  <span className="text-purple-300">{alert.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderQuickQuiz = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Zap className="mx-auto mb-4 text-yellow-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Rapid Scam Detection Quiz</h2>
        <p className="text-yellow-200">Fast-paced scam identification challenge</p>
      </div>

      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
        <div className="text-center">
          <div className="text-4xl font-bold text-yellow-400 mb-2">{quizScore}</div>
          <p className="text-yellow-200 mb-4">Current Score</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              'SMS: "Bank account locked, click link"',
              'Email: "You won $10,000 lottery"',
              'Call: "Microsoft tech support here"',
              'Ad: "Invest $1000, get $5000 back"'
            ].map((scenario, index) => (
              <button
                key={index}
                onClick={() => {
                  setQuizScore(prev => prev + (index % 2 === 0 ? 10 : -5));
                  addCoins(index % 2 === 0 ? 25 : -10);
                }}
                className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-lg transition-colors text-sm"
              >
                {scenario}
                <div className="mt-2 text-xs text-purple-300">
                  {index % 2 === 0 ? 'SCAM' : 'MAYBE LEGIT'}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setQuizScore(0);
              addCoins(50);
              updateProgress({ milSkillScore: progress.milSkillScore + 10 });
            }}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-700 hover:to-orange-700 transition-colors"
          >
            New Quiz Round (+50 coins)
          </button>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Shield className="mx-auto mb-4 text-red-400" size={64} />
        <h1 className="text-3xl font-bold text-white mb-2">Scam Alley</h1>
        <p className="text-red-200">Master cybersecurity and advanced scam detection skills</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { id: 'detector', name: 'Scam Detector', icon: Eye, color: 'from-red-500 to-orange-500', description: 'Advanced scam detection training' },
          { id: 'database', name: 'Scam Database', icon: Brain, color: 'from-purple-500 to-pink-500', description: 'Comprehensive scam library' },
          { id: 'lessons', name: 'Cybersecurity Academy', icon: BookOpen, color: 'from-cyan-500 to-blue-500', description: 'Master security fundamentals' },
          { id: 'quiz', name: 'Rapid Quiz', icon: Zap, color: 'from-yellow-500 to-orange-500', description: 'Fast-paced scam identification' },
          { id: 'training', name: 'Security Training', icon: Shield, color: 'from-blue-500 to-indigo-500', description: 'Interactive security exercises' },
          { id: 'wheel', name: 'Security Rewards', icon: Gift, color: 'from-green-500 to-emerald-500', description: 'Spin for cybersecurity bonuses' }
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
        <h2 className="text-xl font-bold text-white mb-4">Your Cybersecurity Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{progress.milSkillScore}</div>
            <p className="text-red-200 text-sm">Security Score</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {comprehensiveScamDatabase.filter(s => s.completed).length}
            </div>
            <p className="text-green-200 text-sm">Scams Studied</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {cybersecurityLessons.filter(l => l.completed).length}
            </div>
            <p className="text-blue-200 text-sm">Lessons Completed</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">$12,400</div>
            <p className="text-purple-200 text-sm">Money Protected</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl p-6 border border-red-500/30">
        <h2 className="text-xl font-bold text-white mb-4">🚨 Current Threat Level: HIGH</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-red-300 font-semibold mb-2">Active Threats</h3>
            <ul className="text-red-200 text-sm space-y-1">
              <li>• TikTok investment scams</li>
              <li>• Fake banking apps</li>
              <li>• Romance crypto scams</li>
              <li>• Job payment scams</li>
            </ul>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-yellow-300 font-semibold mb-2">Protection Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-yellow-200">Email Security:</span>
                <span className="text-green-400">PROTECTED</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-yellow-200">Mobile Security:</span>
                <span className="text-green-400">PROTECTED</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-yellow-200">Investment Knowledge:</span>
                <span className="text-yellow-400">LEARNING</span>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-green-300 font-semibold mb-2">Recommended Actions</h3>
            <ul className="text-green-200 text-sm space-y-1">
              <li>• Complete phishing training</li>
              <li>• Study investment scams</li>
              <li>• Practice scam detection</li>
              <li>• Share knowledge with family</li>
            </ul>
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
      case 'lessons':
        return renderCybersecurityLessons();
      case 'quiz':
        return renderQuickQuiz();
      case 'wheel':
        return (
          <div className="text-center py-12">
            <Gift className="mx-auto mb-4 text-red-400" size={64} />
            <h2 className="text-2xl font-bold text-white mb-2">Cybersecurity Reward Wheel</h2>
            <p className="text-red-200 mb-6">Spin for security tools, training bonuses, and protection rewards!</p>
            <button
              onClick={() => {
                const rewards = ['Antivirus License', 'VPN Subscription', 'Security Training', 'Bonus Coins'];
                const reward = rewards[Math.floor(Math.random() * rewards.length)];
                addCoins(Math.floor(Math.random() * 300) + 100);
                updateProgress({ milSkillScore: progress.milSkillScore + 10 });
                alert(`You won: ${reward}!`);
              }}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-red-600 hover:to-orange-600 transition-colors"
            >
              Spin Security Wheel (150 coins)
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
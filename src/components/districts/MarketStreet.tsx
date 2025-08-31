import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Search, AlertTriangle, CheckCircle, Star, MapPin, Clock, CreditCard, Shield, TrendingDown, TrendingUp, Scale, Eye, Brain, Target, Award, Coins, Calculator, Percent } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

interface MarketStreetProps {
  onBack: () => void;
}

interface Product {
  id: string;
  name: string;
  category: 'food' | 'travel' | 'electronics' | 'clothing' | 'services';
  normalPrice: number;
  currentPrice: number;
  quality: 'low' | 'medium' | 'high';
  seller: string;
  location: string;
  scamRisk: 'none' | 'low' | 'medium' | 'high';
  scamIndicators?: string[];
  bargainTips: string[];
  reviews: number;
  rating: number;
  description: string;
  realWorldContext: string;
}

interface ShoppingScam {
  id: string;
  title: string;
  type: 'weight' | 'price' | 'quality' | 'fake' | 'online' | 'tourist_trap' | 'bait_switch';
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

interface BargainLesson {
  id: string;
  title: string;
  category: 'negotiation' | 'quality' | 'timing' | 'research';
  content: string;
  techniques: string[];
  examples: string[];
  culturalTips: string[];
  mistakes: string[];
  reward: number;
  completed: boolean;
}

interface MarketPrice {
  item: string;
  category: string;
  locations: {
    name: string;
    price: number;
    quality: string;
    tips: string[];
    scamRisk: 'none' | 'low' | 'medium' | 'high';
  }[];
  seasonalFactors: string[];
  bargainTips: string[];
}

export const MarketStreet: React.FC<MarketStreetProps> = ({ onBack }) => {
  const { progress, addCoins, updateProgress } = useUser();
  const [activeGame, setActiveGame] = useState<'overview' | 'shopping' | 'bargain' | 'scams' | 'comparison' | 'lessons'>('overview');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [budget, setBudget] = useState(2000000); // 2M VND
  const [cart, setCart] = useState<Product[]>([]);
  const [shoppingScore, setShoppingScore] = useState(0);

  const products: Product[] = [
    {
      id: '1',
      name: 'Fresh Dragon Fruit (1kg)',
      category: 'food',
      normalPrice: 80000,
      currentPrice: 120000,
      quality: 'medium',
      seller: 'Ben Thanh Market Vendor',
      location: 'Ho Chi Minh City',
      scamRisk: 'medium',
      scamIndicators: ['Price 50% above normal market rate', 'Vendor claims "premium imported quality"', 'Scale not visible to customer'],
      bargainTips: ['Check multiple vendors for price comparison', 'Ask for bulk discount on 2+ kg', 'Inspect fruit ripeness and quality', 'Negotiate in Vietnamese for better prices'],
      reviews: 45,
      rating: 3.2,
      description: 'Sweet dragon fruit from Binh Thuan province',
      realWorldContext: 'Dragon fruit typically costs 60-80k VND per kg at wholesale markets. Tourist areas often charge 100-150k VND.'
    },
    {
      id: '2',
      name: 'iPhone 15 Pro Max 256GB',
      category: 'electronics',
      normalPrice: 30000000,
      currentPrice: 8000000,
      quality: 'low',
      seller: 'QuickTech Online Store',
      location: 'Facebook Marketplace',
      scamRisk: 'high',
      scamIndicators: ['Price 73% below retail', 'No warranty offered', 'Bank transfer only', 'Seller profile created last week', 'No phone contact available'],
      bargainTips: ['Buy from authorized Apple dealers only', 'Check IMEI numbers with Apple', 'Verify warranty coverage', 'Use secure payment methods'],
      reviews: 2,
      rating: 1.5,
      description: 'Brand new iPhone 15 Pro Max, urgent sale',
      realWorldContext: 'New iPhone 15 Pro Max costs 28-32M VND at authorized dealers. Prices below 25M VND are suspicious.'
    },
    {
      id: '3',
      name: 'Pho Bo Bowl',
      category: 'food',
      normalPrice: 45000,
      currentPrice: 40000,
      quality: 'high',
      seller: 'Pho Gia Truyen Restaurant',
      location: 'District 1, HCMC',
      scamRisk: 'none',
      bargainTips: ['Order during lunch hours for freshest ingredients', 'Ask for extra herbs and lime', 'Check meat quality and broth clarity'],
      reviews: 1250,
      rating: 4.8,
      description: 'Traditional beef pho with 20-year family recipe',
      realWorldContext: 'Quality pho costs 35-50k VND in HCMC. Tourist areas may charge 60-80k VND for same quality.'
    },
    {
      id: '4',
      name: 'Ha Long Bay 2D1N Tour',
      category: 'travel',
      normalPrice: 1500000,
      currentPrice: 500000,
      quality: 'low',
      seller: 'Budget Tours Vietnam',
      location: 'Online Travel Agency',
      scamRisk: 'high',
      scamIndicators: ['Price 67% below market rate', 'No tourism license displayed', 'Hidden fees likely', 'Poor customer reviews', 'No insurance coverage'],
      bargainTips: ['Book through licensed tour operators', 'Read all terms and conditions', 'Check insurance coverage', 'Verify boat safety certificates'],
      reviews: 23,
      rating: 2.1,
      description: 'Budget Ha Long Bay cruise with meals included',
      realWorldContext: 'Quality 2D1N Ha Long tours cost 1.2-2M VND. Tours under 800k VND often have hidden fees or poor service.'
    },
    {
      id: '5',
      name: 'Nike Air Max Shoes',
      category: 'clothing',
      normalPrice: 2500000,
      currentPrice: 2200000,
      quality: 'high',
      seller: 'Nike Official Store',
      location: 'Saigon Centre Mall',
      scamRisk: 'none',
      bargainTips: ['Check for seasonal sales and promotions', 'Verify authenticity with Nike app', 'Try shoes on for proper fit', 'Ask about return policy'],
      reviews: 890,
      rating: 4.6,
      description: 'Authentic Nike Air Max with official warranty',
      realWorldContext: 'Nike shoes cost 2-4M VND at official stores. Prices below 1.5M VND are likely counterfeit.'
    },
    {
      id: '6',
      name: 'Motorbike Repair Service',
      category: 'services',
      normalPrice: 300000,
      currentPrice: 150000,
      quality: 'low',
      seller: 'Quick Fix Garage',
      location: 'District 7, HCMC',
      scamRisk: 'medium',
      scamIndicators: ['Price 50% below normal rate', 'No written estimate provided', 'Cash only payment', 'No warranty on repairs'],
      bargainTips: ['Get written estimates before work begins', 'Ask about warranty on repairs', 'Check mechanic credentials', 'Compare prices at 3+ shops'],
      reviews: 12,
      rating: 2.8,
      description: 'Basic motorbike maintenance and repair',
      realWorldContext: 'Standard motorbike repairs cost 200-400k VND. Very low prices may indicate poor quality parts or hidden fees.'
    },
    {
      id: '7',
      name: 'Banh Mi Sandwich',
      category: 'food',
      normalPrice: 25000,
      currentPrice: 80000,
      quality: 'medium',
      seller: 'Tourist Area Vendor',
      location: 'District 1 Tourist Street',
      scamRisk: 'high',
      scamIndicators: ['Price 220% above normal', 'Located in heavy tourist area', 'No price display', 'Vendor speaks only English'],
      bargainTips: ['Walk 2 blocks away from tourist areas', 'Ask prices in Vietnamese', 'Look where locals eat', 'Check if prices are displayed'],
      reviews: 15,
      rating: 3.0,
      description: 'Standard banh mi with pork and vegetables',
      realWorldContext: 'Local banh mi costs 15-30k VND. Tourist areas charge 50-100k VND for identical sandwiches.'
    },
    {
      id: '8',
      name: 'Grab Ride (Airport to City)',
      category: 'services',
      normalPrice: 200000,
      currentPrice: 120000,
      quality: 'low',
      seller: 'Fake Grab Driver',
      location: 'Tan Son Nhat Airport',
      scamRisk: 'high',
      scamIndicators: ['Price below official Grab rates', 'No official Grab stickers', 'Cash only payment', 'Driver approaches you directly'],
      bargainTips: ['Use official Grab app only', 'Verify license plate matches app', 'Check driver photo and rating', 'Pay through app for protection'],
      reviews: 3,
      rating: 1.2,
      description: 'Airport pickup service claiming to be Grab',
      realWorldContext: 'Official Grab from airport costs 180-250k VND. Fake drivers charge less but may take longer routes or demand extra fees.'
    }
  ];

  const shoppingScams: ShoppingScam[] = [
    {
      id: '1',
      title: 'Ben Thanh Market Weight Manipulation Scam',
      type: 'weight',
      description: 'Vendors use rigged scales or add hidden weights to overcharge customers, especially targeting tourists',
      realStory: 'Tourist bought 2kg of mangoes at Ben Thanh Market. Vendor quickly weighed fruit while blocking scale view, charged 400k VND for what appeared to be 1.5kg. Investigation revealed scale was rigged to show 30% higher weight. Tourist overpaid by 120k VND.',
      scamTactics: [
        'Position scale so customer cannot see display clearly',
        'Add hidden weights under the scale platform',
        'Use rigged scales that display incorrect weights',
        'Rush the weighing process to prevent inspection',
        'Distract customers with conversation during weighing',
        'Claim scales are "certified" without showing proof'
      ],
      redFlags: [
        'Scale display not visible to customer',
        'Vendor blocks view of weighing process',
        'Price seems high for quantity purchased',
        'Vendor rushes through weighing quickly',
        'No official scale certification visible',
        'Different vendors quote very different weights for similar quantities'
      ],
      prevention: [
        'Watch the weighing process carefully and ask to see display',
        'Know approximate weights of common items (1 apple ≈ 200g)',
        'Shop at markets with certified scales',
        'Compare prices and weights at multiple vendors',
        'Bring your own small scale for expensive items',
        'Learn basic Vietnamese numbers for price negotiation'
      ],
      response: [
        'Point out the discrepancy politely but firmly',
        'Ask to reweigh items on different scale',
        'Report rigged scales to market management',
        'Share experience with other tourists',
        'Take photos of scales and prices for evidence'
      ],
      financialImpact: 'Tourists lose 20-40% extra on purchases. Ho Chi Minh City market inspectors found 300+ rigged scales in 2023.',
      victimProfile: 'Foreign tourists and locals unfamiliar with market prices, especially in tourist-heavy areas.',
      difficulty: 'basic',
      reward: 120
    },
    {
      id: '2',
      title: 'Fake Luxury Brand Online Store Scam',
      type: 'online',
      description: 'Sophisticated fake e-commerce websites selling counterfeit luxury goods at slightly discounted prices',
      realStory: 'Vietnamese consumer ordered Louis Vuitton bag from professional-looking website offering 30% discount. Site had SSL certificate, customer reviews, and return policy. After payment of 15M VND, received poor-quality counterfeit. Website disappeared when customer tried to return item.',
      scamTactics: [
        'Created professional websites with SSL certificates',
        'Used stolen product photos from legitimate retailers',
        'Offered moderate discounts (20-40%) to appear realistic',
        'Fake customer reviews and testimonials',
        'Copied return policies from legitimate stores',
        'Used similar domain names to real luxury brands'
      ],
      redFlags: [
        'Domain name slightly different from official brand website',
        'Prices consistently 20-50% below authorized retailers',
        'Limited payment options (usually bank transfer only)',
        'No physical store address or phone contact',
        'Website created recently (check domain age)',
        'Poor grammar or translation errors on website'
      ],
      prevention: [
        'Buy luxury goods only from authorized retailers',
        'Verify website authenticity through brand\'s official site',
        'Check domain registration date and details',
        'Use payment methods with buyer protection',
        'Research seller reputation on multiple platforms',
        'Be suspicious of deals that seem too good to be true'
      ],
      response: [
        'Contact bank to dispute transaction if possible',
        'Report fake website to brand\'s anti-counterfeiting team',
        'File complaint with consumer protection agency',
        'Warn others by sharing scammer information',
        'Keep all evidence for potential legal action'
      ],
      financialImpact: 'Vietnamese consumers lost $25M to fake luxury goods in 2023. Average loss $800 per victim.',
      victimProfile: 'Middle-class consumers seeking discounted luxury goods, often first-time online luxury buyers.',
      difficulty: 'intermediate',
      reward: 180
    },
    {
      id: '3',
      title: 'Tourist Overcharging at Hoan Kiem Lake',
      type: 'tourist_trap',
      description: 'Systematic overcharging of tourists at restaurants and shops near major tourist attractions',
      realStory: 'Foreign tourist ordered simple fried rice at restaurant near Hoan Kiem Lake. Menu showed no prices. When bill came, charged 200k VND for dish that costs 40k VND at local restaurants. When questioned, staff claimed "tourist price" and refused to negotiate.',
      scamTactics: [
        'Menus without prices or prices only in foreign languages',
        'Different pricing for tourists vs locals',
        'Staff quote prices verbally instead of showing menu',
        'Claim "special tourist quality" to justify high prices',
        'Add unexpected service charges and taxes',
        'Pressure customers to order expensive items'
      ],
      redFlags: [
        'No prices displayed on menus or items',
        'Staff reluctant to show price list',
        'Location exclusively serves tourists, no locals visible',
        'Prices quoted verbally vary between customers',
        'Unexpected charges added to final bill',
        'Staff speaks only English, not Vietnamese'
      ],
      prevention: [
        'Research normal prices before visiting tourist areas',
        'Eat where locals eat, away from main tourist streets',
        'Ask for prices in Vietnamese and insist on written menus',
        'Use translation apps to communicate in Vietnamese',
        'Set clear budget limits and stick to them',
        'Walk away if prices seem unreasonable'
      ],
      response: [
        'Politely but firmly question excessive charges',
        'Ask to speak with manager about pricing',
        'Pay only reasonable amount and explain why',
        'Leave reviews warning other tourists',
        'Report to tourist police if harassment occurs'
      ],
      financialImpact: 'Tourists overpay 300-500% for basic items. Hanoi and HCMC tourists lose average $50-100 daily to overcharging.',
      victimProfile: 'Foreign tourists and overseas Vietnamese visiting family, especially first-time visitors unfamiliar with local prices.',
      difficulty: 'basic',
      reward: 100
    },
    {
      id: '4',
      title: 'Counterfeit Electronics at Nguyen Kim',
      type: 'fake',
      description: 'Sophisticated counterfeit electronics sold through seemingly legitimate electronics stores',
      realStory: 'Customer bought Samsung Galaxy phone from electronics store in District 5. Price was 20% below official Samsung stores but not suspiciously low. Phone worked initially but failed after 2 months. Samsung service center confirmed it was counterfeit with inferior components.',
      scamTactics: [
        'Sold through established electronics markets',
        'Priced slightly below official retailers (not obviously fake)',
        'Used high-quality packaging that looked authentic',
        'Provided fake warranty cards and documentation',
        'Staff claimed products were "gray market imports"',
        'Mixed genuine accessories with counterfeit devices'
      ],
      redFlags: [
        'Prices consistently 15-25% below authorized dealers',
        'Seller cannot provide official warranty registration',
        'Packaging has subtle differences from authentic products',
        'Serial numbers don\'t match manufacturer databases',
        'No official retailer certification displayed',
        'Staff vague about product sourcing and warranty'
      ],
      prevention: [
        'Buy electronics only from authorized dealers',
        'Verify serial numbers with manufacturer',
        'Check warranty registration before purchase',
        'Compare packaging with official product images',
        'Use manufacturer apps to verify authenticity',
        'Be wary of "gray market" or "import" claims'
      ],
      response: [
        'Contact manufacturer to report counterfeit product',
        'Return to seller and demand refund',
        'Report store to consumer protection authorities',
        'Warn others through online reviews',
        'Keep all documentation for potential legal action'
      ],
      financialImpact: 'Vietnamese consumers lost $10M to counterfeit electronics in 2023. Products often fail within months with no warranty support.',
      victimProfile: 'Tech-savvy consumers seeking deals on expensive electronics, often young professionals and students.',
      difficulty: 'intermediate',
      reward: 160
    },
    {
      id: '5',
      title: 'Fabric Quality Bait and Switch Scam',
      type: 'bait_switch',
      description: 'Fabric sellers show high-quality samples but deliver inferior materials after payment',
      realStory: 'Customer ordered 10 meters of silk fabric for ao dai. Seller showed beautiful, soft silk sample and quoted reasonable price. After payment, delivered rough, synthetic fabric claiming "same quality, different batch." Refused refund saying "all sales final."',
      scamTactics: [
        'Display high-quality samples to attract customers',
        'Switch to inferior products during packaging',
        'Claim delivered items are "same quality, different batch"',
        'Use "all sales final" policies to prevent returns',
        'Rush customers to make quick decisions',
        'Mix small amounts of quality fabric with inferior materials'
      ],
      redFlags: [
        'Seller won\'t let you inspect actual fabric being purchased',
        'Sample looks perfect but price is unusually low',
        'Claims "all fabric is exactly the same quality"',
        'Rushes you to make decision without proper inspection',
        'No return or exchange policy offered',
        'Packaging prevents inspection of actual product'
      ],
      prevention: [
        'Inspect the actual fabric you\'re buying, not just samples',
        'Ask about return and exchange policies before purchase',
        'Take photos of samples shown during negotiation',
        'Get quality guarantees in writing',
        'Shop at reputable fabric stores with good return policies',
        'Test small quantities before large orders'
      ],
      response: [
        'Document differences between sample and delivered product',
        'Demand refund or exchange for correct quality',
        'Report to market management or consumer protection',
        'Share experience to warn other customers',
        'Consider legal action for significant amounts'
      ],
      financialImpact: 'Customers lose 40-60% of fabric purchase value. Ben Thanh Market fabric sellers caught switching products worth $500k in 2023.',
      victimProfile: 'Customers ordering custom clothing, especially for special occasions like weddings or traditional events.',
      difficulty: 'intermediate',
      reward: 140
    }
  ];

  const bargainLessons: BargainLesson[] = [
    {
      id: '1',
      title: 'Vietnamese Market Negotiation Techniques',
      category: 'negotiation',
      content: 'Successful bargaining in Vietnamese markets requires understanding cultural norms, timing, and effective communication strategies.',
      techniques: [
        'Start at 50-60% of asking price for tourist areas',
        'Use Vietnamese phrases to show cultural respect',
        'Bundle multiple items for better discounts',
        'Show willingness to walk away if price too high',
        'Negotiate during slower business hours',
        'Build rapport before discussing prices'
      ],
      examples: [
        'Tourist area t-shirt: Ask 100k → Start 50k → Settle 70k',
        'Fresh fruit: Ask 80k/kg → Start 50k → Settle 60k',
        'Souvenir items: Buy 3+ items for 20-30% total discount'
      ],
      culturalTips: [
        'Learn basic Vietnamese numbers and phrases',
        'Smile and be respectful during negotiations',
        'Understand that bargaining is expected in markets',
        'Don\'t take initial high prices personally',
        'Show appreciation when vendors give good deals',
        'Tip or buy extra items from helpful vendors'
      ],
      mistakes: [
        'Starting negotiations too aggressively',
        'Not researching normal prices beforehand',
        'Bargaining for items with fixed prices',
        'Getting emotional during price discussions',
        'Not being prepared to walk away',
        'Ignoring quality while focusing only on price'
      ],
      reward: 100,
      completed: false
    },
    {
      id: '2',
      title: 'Quality Assessment for Food and Produce',
      category: 'quality',
      content: 'Learn to identify fresh, high-quality food products and avoid spoiled or low-grade items that may cause health issues.',
      techniques: [
        'Check fruit firmness and skin condition',
        'Smell produce for freshness indicators',
        'Examine meat color and texture',
        'Verify seafood freshness through eyes and gills',
        'Check expiration dates on packaged goods',
        'Assess vendor hygiene and storage conditions'
      ],
      examples: [
        'Fresh fish: Clear eyes, red gills, firm flesh, ocean smell',
        'Ripe mango: Slight give when pressed, sweet aroma, no dark spots',
        'Quality pork: Pink-red color, firm texture, no strong odor'
      ],
      culturalTips: [
        'Ask vendors to let you inspect items before purchase',
        'Learn Vietnamese terms for "fresh" (tươi) and "good quality" (chất lượng tốt)',
        'Observe which items locals choose',
        'Shop early morning for best selection',
        'Build relationships with trusted vendors',
        'Understand seasonal availability affects quality and price'
      ],
      mistakes: [
        'Buying produce without inspection',
        'Choosing items based only on appearance',
        'Not checking expiration dates',
        'Ignoring storage conditions and vendor hygiene',
        'Buying large quantities without testing quality first',
        'Not understanding seasonal quality variations'
      ],
      reward: 120,
      completed: false
    },
    {
      id: '3',
      title: 'Timing Your Purchases for Maximum Savings',
      category: 'timing',
      content: 'Understanding when to buy different products can save 20-50% on purchases through seasonal patterns and market timing.',
      techniques: [
        'Buy seasonal fruits during peak harvest times',
        'Shop for clothes at end of seasons for clearance',
        'Purchase electronics during major sale events',
        'Book travel during off-peak periods',
        'Buy fresh food early morning or late evening',
        'Time major purchases around salary payment dates'
      ],
      examples: [
        'Durian: Cheapest May-August during peak season',
        'Winter clothes: 50% off in March-April',
        'Electronics: Best deals during Tet holiday sales',
        'Hotel rooms: 30-40% cheaper on weekdays'
      ],
      culturalTips: [
        'Understand Vietnamese holiday and festival impact on prices',
        'Learn about regional harvest seasons',
        'Know when vendors need to clear inventory',
        'Understand salary payment cycles affect market demand',
        'Time purchases around weather patterns',
        'Consider lunar calendar for traditional items'
      ],
      mistakes: [
        'Buying seasonal items during peak demand periods',
        'Not planning purchases around sale cycles',
        'Impulse buying without considering timing',
        'Not understanding supply and demand patterns',
        'Buying perishables in large quantities during expensive periods',
        'Not considering weather impact on prices'
      ],
      reward: 110,
      completed: false
    }
  ];

  const marketPrices: MarketPrice[] = [
    {
      item: 'Coffee',
      category: 'Beverages',
      locations: [
        { name: 'Local Cafe', price: 25000, quality: 'Good', tips: ['Try Vietnamese drip coffee', 'Ask for less ice'], scamRisk: 'none' },
        { name: 'Starbucks', price: 85000, quality: 'Premium', tips: ['Use app for discounts', 'Try local flavors'], scamRisk: 'none' },
        { name: 'Tourist Area Cafe', price: 60000, quality: 'Average', tips: ['Walk 2 blocks for better prices', 'Check if prices include service charge'], scamRisk: 'low' },
        { name: 'Street Vendor', price: 15000, quality: 'Basic', tips: ['Best value for authentic taste', 'Bring your own cup'], scamRisk: 'none' }
      ],
      seasonalFactors: ['Prices increase 10-20% during Tet holiday', 'Coffee bean harvest affects prices September-February'],
      bargainTips: ['Order Vietnamese coffee instead of Western styles', 'Buy coffee beans directly from vendors', 'Use loyalty cards at chain stores']
    },
    {
      item: 'Smartphone',
      category: 'Electronics',
      locations: [
        { name: 'Official Store', price: 15000000, quality: 'Authentic', tips: ['Get official warranty', 'Check for promotions'], scamRisk: 'none' },
        { name: 'Electronics Market', price: 12000000, quality: 'Genuine', tips: ['Verify IMEI number', 'Test all functions'], scamRisk: 'low' },
        { name: 'Online Marketplace', price: 8000000, quality: 'Suspicious', tips: ['Meet in person', 'Check authenticity'], scamRisk: 'high' },
        { name: 'Street Vendor', price: 5000000, quality: 'Counterfeit', tips: ['Avoid completely', 'No warranty support'], scamRisk: 'high' }
      ],
      seasonalFactors: ['New model releases cause price drops on older models', 'Back-to-school season increases demand'],
      bargainTips: ['Buy previous generation models for 30-40% savings', 'Compare prices across multiple authorized dealers', 'Consider certified refurbished options']
    },
    {
      item: 'Motorbike Taxi',
      category: 'Transportation',
      locations: [
        { name: 'Grab Bike', price: 25000, quality: 'Standard', tips: ['Use app for fixed pricing', 'Rate drivers'], scamRisk: 'none' },
        { name: 'Traditional Xe Om', price: 20000, quality: 'Variable', tips: ['Negotiate before riding', 'Know approximate distance'], scamRisk: 'low' },
        { name: 'Tourist Area Xe Om', price: 50000, quality: 'Overpriced', tips: ['Walk to main street', 'Use Grab instead'], scamRisk: 'medium' },
        { name: 'Unlicensed Driver', price: 15000, quality: 'Risky', tips: ['Avoid for safety', 'No insurance coverage'], scamRisk: 'high' }
      ],
      seasonalFactors: ['Prices increase during rain season', 'Rush hour surcharges apply'],
      bargainTips: ['Use ride-sharing apps for transparent pricing', 'Learn basic Vietnamese for price negotiation', 'Avoid tourist-heavy areas']
    }
  ];

  const addToCart = (product: Product) => {
    if (budget >= product.currentPrice) {
      setCart(prev => [...prev, product]);
      setBudget(prev => prev - product.currentPrice);
      
      // Calculate shopping score based on decision quality
      let scoreChange = 0;
      if (product.scamRisk === 'none') {
        scoreChange = 20;
      } else if (product.scamRisk === 'low') {
        scoreChange = 10;
      } else if (product.scamRisk === 'medium') {
        scoreChange = -10;
      } else {
        scoreChange = -30;
      }
      
      setShoppingScore(prev => Math.max(0, prev + scoreChange));
      addCoins(scoreChange);
      updateProgress({ 
        financialLiteracyScore: progress.financialLiteracyScore + Math.max(scoreChange / 4, 0)
      });
    }
  };

  const completeLesson = (lessonId: string) => {
    const lesson = bargainLessons.find(l => l.id === lessonId);
    if (lesson && !lesson.completed) {
      addCoins(lesson.reward);
      updateProgress({ 
        financialLiteracyScore: progress.financialLiteracyScore + 15
      });
    }
  };

  const studyScam = (scamId: string) => {
    const scam = shoppingScams.find(s => s.id === scamId);
    if (scam) {
      addCoins(scam.reward);
      updateProgress({ 
        milSkillScore: progress.milSkillScore + (scam.difficulty === 'advanced' ? 25 : scam.difficulty === 'intermediate' ? 15 : 10)
      });
    }
  };

  const getScamRiskColor = (risk: string) => {
    switch (risk) {
      case 'none': return 'text-green-400 bg-green-500/20';
      case 'low': return 'text-yellow-400 bg-yellow-500/20';
      case 'medium': return 'text-orange-400 bg-orange-500/20';
      case 'high': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const renderShopping = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Smart Shopping Challenge</h2>
          <p className="text-green-200">Make wise purchases and avoid scams</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-400">{budget.toLocaleString()} VND</div>
          <p className="text-green-200 text-sm">Remaining Budget</p>
          <div className="text-lg font-bold text-purple-400">Score: {shoppingScore}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">{product.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScamRiskColor(product.scamRisk)}`}>
                {product.scamRisk.toUpperCase()} RISK
              </span>
            </div>

            <p className="text-purple-200 text-sm mb-3">{product.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-purple-200 text-sm">Normal Price:</span>
                <span className="text-gray-400 line-through">{product.normalPrice.toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200 text-sm">Current Price:</span>
                <span className={`font-bold ${
                  product.currentPrice < product.normalPrice ? 'text-green-400' : 'text-red-400'
                }`}>
                  {product.currentPrice.toLocaleString()} VND
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200 text-sm">Seller:</span>
                <span className="text-white text-sm">{product.seller}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="text-yellow-400" size={16} />
                <span className="text-white text-sm">{product.rating}</span>
                <span className="text-purple-300 text-sm">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 mb-4">
              <h4 className="text-blue-300 font-medium text-sm mb-1">🌏 Market Context:</h4>
              <p className="text-blue-200 text-xs">{product.realWorldContext}</p>
            </div>

            {product.scamIndicators && product.scamIndicators.length > 0 && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4">
                <h4 className="text-red-300 font-medium text-sm mb-2">⚠️ Warning Signs:</h4>
                <ul className="text-red-200 text-xs space-y-1">
                  {product.scamIndicators.map((indicator, index) => (
                    <li key={index}>• {indicator}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 mb-4">
              <h4 className="text-green-300 font-medium text-sm mb-2">💡 Bargain Tips:</h4>
              <ul className="text-green-200 text-xs space-y-1">
                {product.bargainTips.map((tip, index) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => addToCart(product)}
              disabled={budget < product.currentPrice}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                budget >= product.currentPrice
                  ? product.scamRisk === 'high'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : product.scamRisk === 'medium'
                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-500/30 text-gray-400 cursor-not-allowed'
              }`}
            >
              {budget >= product.currentPrice ? 'Purchase' : 'Insufficient Budget'}
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4">Shopping Cart Analysis</h3>
          <div className="space-y-3">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <h4 className="text-white font-medium">{item.name}</h4>
                  <p className="text-purple-300 text-sm">{item.seller}</p>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">{item.currentPrice.toLocaleString()} VND</div>
                  <div className={`text-xs px-2 py-1 rounded ${getScamRiskColor(item.scamRisk)}`}>
                    {item.scamRisk.toUpperCase()} RISK
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-white/20 pt-3">
              <div className="flex justify-between font-bold">
                <span className="text-white">Total Spent:</span>
                <span className="text-green-400">{cart.reduce((sum, item) => sum + item.currentPrice, 0).toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-white">Shopping Score:</span>
                <span className={`font-bold ${shoppingScore >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {shoppingScore} points
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderScamDatabase = () => (
    <div className="space-y-6">
      <div className="text-center">
        <AlertTriangle className="mx-auto mb-4 text-red-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Shopping Scam Database</h2>
        <p className="text-red-200">Learn from real shopping scam cases and protect yourself</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shoppingScams.map(scam => (
          <div key={scam.id} className="bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">{scam.title}</h3>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  scam.difficulty === 'basic' ? 'bg-green-500/30 text-green-200' :
                  scam.difficulty === 'intermediate' ? 'bg-yellow-500/30 text-yellow-200' :
                  'bg-red-500/30 text-red-200'
                }`}>
                  {scam.difficulty.toUpperCase()}
                </span>
                <span className="text-yellow-400 text-sm">+{scam.reward}</span>
              </div>
            </div>

            <p className="text-purple-200 mb-4">{scam.description}</p>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border-l-4 border-orange-500">
                <h4 className="text-orange-300 font-semibold mb-2">📖 Real Story:</h4>
                <p className="text-orange-200 text-sm">{scam.realStory}</p>
              </div>

              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <h4 className="text-red-300 font-medium text-sm mb-2">🎯 Scam Tactics:</h4>
                <ul className="text-red-200 text-xs space-y-1">
                  {scam.scamTactics.map((tactic, index) => (
                    <li key={index}>• {tactic}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                <h4 className="text-yellow-300 font-medium text-sm mb-2">🚩 Red Flags:</h4>
                <ul className="text-yellow-200 text-xs space-y-1">
                  {scam.redFlags.map((flag, index) => (
                    <li key={index}>• {flag}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                <h4 className="text-green-300 font-medium text-sm mb-2">✅ Prevention:</h4>
                <ul className="text-green-200 text-xs space-y-1">
                  {scam.prevention.map((tip, index) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                <h4 className="text-blue-300 font-medium text-sm mb-2">💰 Financial Impact:</h4>
                <p className="text-blue-200 text-xs">{scam.financialImpact}</p>
              </div>

              <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3">
                <h4 className="text-purple-300 font-medium text-sm mb-2">👥 Victim Profile:</h4>
                <p className="text-purple-200 text-xs">{scam.victimProfile}</p>
              </div>
            </div>

            <button
              onClick={() => studyScam(scam.id)}
              className="w-full mt-4 bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-colors"
            >
              Study Case (+{scam.reward} coins)
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPriceComparison = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Search className="mx-auto mb-4 text-blue-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Market Price Intelligence</h2>
        <p className="text-blue-200">Master price comparison and market analysis</p>
      </div>

      <div className="space-y-6">
        {marketPrices.map((item, index) => (
          <div key={index} className="bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-xl">{item.item}</h3>
              <span className="bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full text-sm">
                {item.category}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-medium mb-3">Price Comparison</h4>
                <div className="space-y-3">
                  {item.locations.map((location, locIndex) => (
                    <div key={locIndex} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{location.name}</div>
                        <div className="text-purple-300 text-sm">{location.quality} quality</div>
                        <div className={`text-xs px-2 py-1 rounded mt-1 ${getScamRiskColor(location.scamRisk)}`}>
                          {location.scamRisk.toUpperCase()} RISK
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">{location.price.toLocaleString()} VND</div>
                        <div className="text-purple-300 text-xs">
                          {Math.round((location.price / Math.min(...item.locations.map(l => l.price)) - 1) * 100)}% vs cheapest
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                  <h4 className="text-yellow-300 font-medium text-sm mb-2">📊 Seasonal Factors:</h4>
                  <ul className="text-yellow-200 text-xs space-y-1">
                    {item.seasonalFactors.map((factor, factorIndex) => (
                      <li key={factorIndex}>• {factor}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                  <h4 className="text-green-300 font-medium text-sm mb-2">💡 Bargain Tips:</h4>
                  <ul className="text-green-200 text-xs space-y-1">
                    {item.bargainTips.map((tip, tipIndex) => (
                      <li key={tipIndex}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-semibold text-xl mb-4">Smart Shopping Calculator</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">Price Per Unit Calculator</h4>
            <div className="space-y-3">
              <input
                type="number"
                placeholder="Total price (VND)"
                className="w-full px-3 py-2 rounded bg-white/20 text-white placeholder-purple-300 border border-white/30"
              />
              <input
                type="number"
                placeholder="Quantity (kg, pieces, etc.)"
                className="w-full px-3 py-2 rounded bg-white/20 text-white placeholder-purple-300 border border-white/30"
              />
              <div className="text-green-400 font-semibold">Price per unit: Calculate</div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">Discount Calculator</h4>
            <div className="space-y-3">
              <input
                type="number"
                placeholder="Original price (VND)"
                className="w-full px-3 py-2 rounded bg-white/20 text-white placeholder-purple-300 border border-white/30"
              />
              <input
                type="number"
                placeholder="Discount percentage (%)"
                className="w-full px-3 py-2 rounded bg-white/20 text-white placeholder-purple-300 border border-white/30"
              />
              <div className="text-green-400 font-semibold">Final price: Calculate</div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">Budget Tracker</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Budget:</span>
                <span className="text-white">{budget.toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Spent:</span>
                <span className="text-red-400">{cart.reduce((sum, item) => sum + item.currentPrice, 0).toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-purple-200">Remaining:</span>
                <span className="text-green-400">{budget.toLocaleString()} VND</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBargainLessons = () => (
    <div className="space-y-6">
      <div className="text-center">
        <TrendingDown className="mx-auto mb-4 text-green-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Bargain Mastery Academy</h2>
        <p className="text-green-200">Learn professional negotiation and quality assessment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bargainLessons.map(lesson => (
          <div key={lesson.id} className="bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">{lesson.title}</h3>
              <span className="bg-yellow-500/30 text-yellow-200 px-3 py-1 rounded-full text-sm">
                +{lesson.reward} coins
              </span>
            </div>
            
            <p className="text-purple-200 mb-4">{lesson.content}</p>
            
            <div className="space-y-4">
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                <h4 className="text-blue-300 font-medium text-sm mb-2">🎯 Techniques:</h4>
                <ul className="text-blue-200 text-xs space-y-1">
                  {lesson.techniques.map((technique, index) => (
                    <li key={index}>• {technique}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                <h4 className="text-green-300 font-medium text-sm mb-2">📊 Examples:</h4>
                <ul className="text-green-200 text-xs space-y-1">
                  {lesson.examples.map((example, index) => (
                    <li key={index}>• {example}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3">
                <h4 className="text-purple-300 font-medium text-sm mb-2">🇻🇳 Cultural Tips:</h4>
                <ul className="text-purple-200 text-xs space-y-1">
                  {lesson.culturalTips.map((tip, index) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <h4 className="text-red-300 font-medium text-sm mb-2">⚠️ Common Mistakes:</h4>
                <ul className="text-red-200 text-xs space-y-1">
                  {lesson.mistakes.map((mistake, index) => (
                    <li key={index}>• {mistake}</li>
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
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
              }`}
            >
              {lesson.completed ? 'Completed ✓' : `Complete Lesson (+${lesson.reward} coins)`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="text-center">
        <ShoppingCart className="mx-auto mb-4 text-green-400" size={64} />
        <h1 className="text-3xl font-bold text-white mb-2">Market Street</h1>
        <p className="text-green-200">Master smart shopping, bargaining, and scam detection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { id: 'shopping', name: 'Smart Shopping', icon: ShoppingCart, color: 'from-green-500 to-emerald-500', description: 'Practice making wise purchases' },
          { id: 'bargain', name: 'Bargain Academy', icon: TrendingDown, color: 'from-blue-500 to-cyan-500', description: 'Learn negotiation skills' },
          { id: 'scams', name: 'Scam Database', icon: AlertTriangle, color: 'from-red-500 to-orange-500', description: 'Study shopping scams' },
          { id: 'comparison', name: 'Price Intelligence', icon: Search, color: 'from-purple-500 to-pink-500', description: 'Master price comparison' }
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
        <h2 className="text-xl font-bold text-white mb-4">Shopping Skills Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{shoppingScore}</div>
            <p className="text-green-200 text-sm">Shopping Score</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{cart.length}</div>
            <p className="text-blue-200 text-sm">Items Purchased</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {Math.round((cart.filter(item => item.scamRisk === 'none' || item.scamRisk === 'low').length / Math.max(cart.length, 1)) * 100)}%
            </div>
            <p className="text-purple-200 text-sm">Safe Purchases</p>
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
      case 'shopping':
        return renderShopping();
      case 'bargain':
        return renderBargainLessons();
      case 'scams':
        return renderScamDatabase();
      case 'comparison':
        return renderPriceComparison();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="space-y-6">
      {activeGame !== 'overview' && (
        <button
          onClick={() => setActiveGame('overview')}
          className="flex items-center space-x-2 text-green-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Market Street</span>
        </button>
      )}

      {renderContent()}
    </div>
  );
};
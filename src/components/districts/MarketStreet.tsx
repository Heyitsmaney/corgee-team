import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Search, AlertTriangle, CheckCircle, Star, MapPin, Clock, CreditCard, Shield, TrendingDown, TrendingUp } from 'lucide-react';
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
}

interface ShoppingScam {
  id: string;
  title: string;
  type: 'weight' | 'price' | 'quality' | 'fake' | 'online';
  description: string;
  redFlags: string[];
  prevention: string[];
  realCase: string;
  impact: string;
}

export const MarketStreet: React.FC<MarketStreetProps> = ({ onBack }) => {
  const { progress, addCoins, updateProgress } = useUser();
  const [activeGame, setActiveGame] = useState<'overview' | 'shopping' | 'bargain' | 'scams' | 'comparison'>('overview');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [budget, setBudget] = useState(1000);
  const [cart, setCart] = useState<Product[]>([]);

  const products: Product[] = [
    {
      id: '1',
      name: 'Fresh Dragon Fruit',
      category: 'food',
      normalPrice: 80,
      currentPrice: 120,
      quality: 'medium',
      seller: 'Ben Thanh Market',
      location: 'Ho Chi Minh City',
      scamRisk: 'medium',
      scamIndicators: ['Price 50% above normal', 'Seller claims "premium quality"'],
      bargainTips: ['Check multiple vendors', 'Ask for bulk discount', 'Inspect fruit quality'],
      reviews: 45,
      rating: 3.2
    },
    {
      id: '2',
      name: 'iPhone 15 Pro Max',
      category: 'electronics',
      normalPrice: 30000000,
      currentPrice: 8000000,
      quality: 'low',
      seller: 'QuickTech Store',
      location: 'Online',
      scamRisk: 'high',
      scamIndicators: ['Price 73% below retail', 'No warranty offered', 'Bank transfer only', 'Seller has no reviews'],
      bargainTips: ['Buy from authorized dealers only', 'Check IMEI numbers', 'Verify warranty'],
      reviews: 2,
      rating: 1.5
    },
    {
      id: '3',
      name: 'Pho Bo Bowl',
      category: 'food',
      normalPrice: 45,
      currentPrice: 40,
      quality: 'high',
      seller: 'Pho Gia Truyen',
      location: 'District 1',
      scamRisk: 'none',
      bargainTips: ['Order during lunch hours for freshness', 'Ask for extra herbs', 'Check meat quality'],
      reviews: 1250,
      rating: 4.8
    },
    {
      id: '4',
      name: 'Ha Long Bay Tour',
      category: 'travel',
      normalPrice: 1500000,
      currentPrice: 500000,
      quality: 'low',
      seller: 'Budget Tours VN',
      location: 'Online',
      scamRisk: 'high',
      scamIndicators: ['Price 67% below market', 'No license displayed', 'Hidden fees likely', 'Poor reviews'],
      bargainTips: ['Book through licensed operators', 'Read all terms carefully', 'Check insurance coverage'],
      reviews: 23,
      rating: 2.1
    },
    {
      id: '5',
      name: 'Nike Air Max Shoes',
      category: 'clothing',
      normalPrice: 2500000,
      currentPrice: 2200000,
      quality: 'high',
      seller: 'Nike Official Store',
      location: 'Saigon Centre',
      scamRisk: 'none',
      bargainTips: ['Check for seasonal sales', 'Verify authenticity', 'Try before buying'],
      reviews: 890,
      rating: 4.6
    },
    {
      id: '6',
      name: 'Motorbike Repair',
      category: 'services',
      normalPrice: 300000,
      currentPrice: 150000,
      quality: 'low',
      seller: 'Quick Fix Garage',
      location: 'District 7',
      scamRisk: 'medium',
      scamIndicators: ['Price 50% below normal', 'No written estimate', 'Cash only payment'],
      bargainTips: ['Get written estimates', 'Ask about warranty', 'Check mechanic credentials'],
      reviews: 12,
      rating: 2.8
    }
  ];

  const shoppingScams: ShoppingScam[] = [
    {
      id: '1',
      title: 'Weight Manipulation at Markets',
      type: 'weight',
      description: 'Vendors use rigged scales or add hidden weights to overcharge customers',
      redFlags: [
        'Scale not visible to customer',
        'Vendor blocks view of weight display',
        'Price seems high for quantity',
        'Vendor rushes the weighing process',
        'No official scale certification visible'
      ],
      prevention: [
        'Watch the weighing process carefully',
        'Ask to see the scale display',
        'Know approximate weights of common items',
        'Shop at markets with certified scales',
        'Compare prices at multiple vendors'
      ],
      realCase: 'In 2023, Ho Chi Minh City market inspectors found 200+ rigged scales, overcharging customers by 20-30%.',
      impact: 'Customers lose 20-30% extra on purchases, affecting household budgets significantly.'
    },
    {
      id: '2',
      title: 'Fake Online Store Scams',
      type: 'online',
      description: 'Fraudulent websites selling non-existent products at attractive prices',
      redFlags: [
        'Prices significantly below market rate',
        'Website created recently',
        'No physical address or phone contact',
        'Only accepts bank transfers or crypto',
        'Poor website design and grammar errors'
      ],
      prevention: [
        'Research seller reputation and reviews',
        'Use secure payment methods with buyer protection',
        'Verify business registration and licenses',
        'Check website age and SSL certificates',
        'Start with small test purchases'
      ],
      realCase: 'Vietnamese consumers lost $25M in 2023 to fake e-commerce sites selling electronics and fashion.',
      impact: 'Average loss of $200 per victim, with no product delivery and stolen payment information.'
    },
    {
      id: '3',
      title: 'Counterfeit Product Sales',
      type: 'fake',
      description: 'Fake branded products sold as authentic at slightly discounted prices',
      redFlags: [
        'Price slightly below retail (not suspiciously low)',
        'Seller claims "factory overstock"',
        'No official warranty or receipt',
        'Quality feels different from authentic',
        'Packaging has minor differences'
      ],
      prevention: [
        'Buy from authorized retailers only',
        'Check product authentication features',
        'Verify serial numbers with manufacturer',
        'Compare packaging with official images',
        'Be wary of "too good to be true" deals'
      ],
      realCase: 'Counterfeit electronics worth $10M seized in Vietnam in 2023, sold through social media.',
      impact: 'Products often break quickly, no warranty support, potential safety hazards.'
    },
    {
      id: '4',
      title: 'Overpriced Tourist Traps',
      type: 'price',
      description: 'Vendors charge tourists 5-10x normal prices for common items',
      redFlags: [
        'Prices not displayed clearly',
        'Vendor quotes different prices to different customers',
        'Location near major tourist attractions',
        'No local customers visible',
        'Vendor speaks only English, not Vietnamese'
      ],
      prevention: [
        'Research normal prices before traveling',
        'Shop where locals shop',
        'Ask for prices in Vietnamese',
        'Compare prices at multiple locations',
        'Use price comparison apps'
      ],
      realCase: 'Tourists in Hanoi Old Quarter reported paying $20 for $2 items in 2023.',
      impact: 'Travel budgets depleted quickly, negative tourism experience, financial stress.'
    },
    {
      id: '5',
      title: 'Quality Bait and Switch',
      type: 'quality',
      description: 'Sellers show high-quality samples but deliver inferior products',
      redFlags: [
        'Sample looks perfect but price is very low',
        'Seller won\'t let you inspect actual product',
        'Claims "all items are exactly the same"',
        'Rushes you to make decision',
        'No return or exchange policy'
      ],
      prevention: [
        'Inspect the actual item you\'re buying',
        'Ask about return/exchange policies',
        'Take photos of the sample shown',
        'Get quality guarantees in writing',
        'Shop at reputable stores with good return policies'
      ],
      realCase: 'Fabric sellers in Ben Thanh Market caught switching high-quality samples with inferior cloth in 2023.',
      impact: 'Customers receive poor quality products, wasted money, no recourse for returns.'
    }
  ];

  const addToCart = (product: Product) => {
    if (budget >= product.currentPrice) {
      setCart(prev => [...prev, product]);
      setBudget(prev => prev - product.currentPrice);
      
      if (product.scamRisk === 'none' || product.scamRisk === 'low') {
        addCoins(20);
        updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 5 });
      } else {
        addCoins(-50);
        updateProgress({ milSkillScore: Math.max(0, progress.milSkillScore - 10) });
      }
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
          <div className="text-2xl font-bold text-green-400">${budget.toLocaleString()}</div>
          <p className="text-green-200 text-sm">Remaining Budget</p>
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

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-purple-200">Normal Price:</span>
                <span className="text-gray-400 line-through">${product.normalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Current Price:</span>
                <span className={`font-bold ${
                  product.currentPrice < product.normalPrice ? 'text-green-400' : 'text-red-400'
                }`}>
                  ${product.currentPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Seller:</span>
                <span className="text-white text-sm">{product.seller}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="text-yellow-400" size={16} />
                <span className="text-white text-sm">{product.rating}</span>
                <span className="text-purple-300 text-sm">({product.reviews} reviews)</span>
              </div>
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

            <div className="bg-white/5 rounded-lg p-3 mb-4">
              <h4 className="text-blue-300 font-medium text-sm mb-2">💡 Bargain Tips:</h4>
              <ul className="text-blue-200 text-xs space-y-1">
                {product.bargainTips.map((tip, index) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => addToCart(product)}
              disabled={budget < product.currentPrice}
              className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                budget >= product.currentPrice
                  ? product.scamRisk === 'high'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
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
                  <div className="text-white font-semibold">${item.currentPrice.toLocaleString()}</div>
                  <div className={`text-xs ${getScamRiskColor(item.scamRisk)}`}>
                    {item.scamRisk.toUpperCase()} RISK
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-white/20 pt-3">
              <div className="flex justify-between font-bold">
                <span className="text-white">Total Spent:</span>
                <span className="text-green-400">${cart.reduce((sum, item) => sum + item.currentPrice, 0).toLocaleString()}</span>
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
        <p className="text-red-200">Learn about common shopping scams and how to avoid them</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shoppingScams.map(scam => (
          <div key={scam.id} className="bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">{scam.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                scam.type === 'weight' ? 'bg-orange-500/30 text-orange-200' :
                scam.type === 'price' ? 'bg-red-500/30 text-red-200' :
                scam.type === 'quality' ? 'bg-yellow-500/30 text-yellow-200' :
                scam.type === 'fake' ? 'bg-purple-500/30 text-purple-200' :
                'bg-blue-500/30 text-blue-200'
              }`}>
                {scam.type.toUpperCase()}
              </span>
            </div>

            <p className="text-purple-200 mb-4">{scam.description}</p>

            <div className="space-y-4">
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <h4 className="text-red-300 font-medium text-sm mb-2">🚩 Red Flags:</h4>
                <ul className="text-red-200 text-xs space-y-1">
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

              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                <h4 className="text-yellow-300 font-medium text-sm mb-2">📊 Real Case:</h4>
                <p className="text-yellow-200 text-xs">{scam.realCase}</p>
              </div>

              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                <h4 className="text-blue-300 font-medium text-sm mb-2">💰 Financial Impact:</h4>
                <p className="text-blue-200 text-xs">{scam.impact}</p>
              </div>
            </div>

            <button
              onClick={() => {
                addCoins(50);
                updateProgress({ milSkillScore: progress.milSkillScore + 10 });
              }}
              className="w-full mt-4 bg-gradient-to-r from-red-600 to-orange-600 text-white py-2 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-colors"
            >
              Study Case (+50 coins)
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
        <h2 className="text-2xl font-bold text-white mb-2">Price Comparison Tool</h2>
        <p className="text-blue-200">Learn to find the best deals and avoid overpricing</p>
      </div>

      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-semibold mb-4">Market Price Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              item: 'Coffee (Cafe)',
              locations: [
                { name: 'Local Cafe', price: 25000, quality: 'Good', risk: 'none' },
                { name: 'Starbucks', price: 85000, quality: 'Premium', risk: 'none' },
                { name: 'Street Vendor', price: 15000, quality: 'Basic', risk: 'low' }
              ]
            },
            {
              item: 'Grab Ride (10km)',
              locations: [
                { name: 'GrabCar', price: 120000, quality: 'Standard', risk: 'none' },
                { name: 'Fake Grab Driver', price: 80000, quality: 'Unknown', risk: 'high' },
                { name: 'Traditional Taxi', price: 150000, quality: 'Standard', risk: 'low' }
              ]
            },
            {
              item: 'Smartphone Case',
              locations: [
                { name: 'Official Store', price: 500000, quality: 'Authentic', risk: 'none' },
                { name: 'Online Seller', price: 100000, quality: 'Fake', risk: 'high' },
                { name: 'Electronics Market', price: 300000, quality: 'Good', risk: 'low' }
              ]
            }
          ].map((comparison, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">{comparison.item}</h4>
              <div className="space-y-2">
                {comparison.locations.map((location, locIndex) => (
                  <div key={locIndex} className="flex items-center justify-between p-2 bg-white/5 rounded">
                    <div>
                      <div className="text-white text-sm font-medium">{location.name}</div>
                      <div className="text-purple-300 text-xs">{location.quality} quality</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{location.price.toLocaleString()}đ</div>
                      <div className={`text-xs ${getScamRiskColor(location.risk)}`}>
                        {location.risk.toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-blue-300 font-semibold mb-3">💡 Smart Shopping Tips:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <ul className="text-blue-200 space-y-1">
              <li>• Compare prices across 3+ vendors</li>
              <li>• Check reviews and ratings</li>
              <li>• Verify seller authenticity</li>
              <li>• Understand return policies</li>
            </ul>
            <ul className="text-blue-200 space-y-1">
              <li>• Use secure payment methods</li>
              <li>• Be wary of pressure tactics</li>
              <li>• Research market prices beforehand</li>
              <li>• Trust your instincts about deals</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="text-center">
        <ShoppingCart className="mx-auto mb-4 text-green-400" size={64} />
        <h1 className="text-3xl font-bold text-white mb-2">Market Street</h1>
        <p className="text-green-200">Master smart shopping and scam detection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { id: 'shopping', name: 'Smart Shopping', icon: ShoppingCart, color: 'from-green-500 to-emerald-500', description: 'Practice making wise purchases' },
          { id: 'bargain', name: 'Bargain Hunter', icon: TrendingDown, color: 'from-blue-500 to-cyan-500', description: 'Learn negotiation skills' },
          { id: 'scams', name: 'Scam Database', icon: AlertTriangle, color: 'from-red-500 to-orange-500', description: 'Study shopping scams' },
          { id: 'comparison', name: 'Price Comparison', icon: Search, color: 'from-purple-500 to-pink-500', description: 'Compare market prices' }
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
        <h2 className="text-xl font-bold text-white mb-4">Shopping Safety Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">${(1000 - budget).toLocaleString()}</div>
            <p className="text-green-200 text-sm">Money Spent</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{cart.length}</div>
            <p className="text-blue-200 text-sm">Items Purchased</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">
              {cart.filter(item => item.scamRisk === 'high').length}
            </div>
            <p className="text-red-200 text-sm">Scam Risks Taken</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {Math.round((cart.filter(item => item.scamRisk === 'none' || item.scamRisk === 'low').length / Math.max(cart.length, 1)) * 100)}%
            </div>
            <p className="text-yellow-200 text-sm">Safe Purchases</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeGame) {
      case 'shopping':
        return renderShopping();
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
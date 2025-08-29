import React, { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, BarChart3, PieChart, DollarSign, AlertTriangle, Shield, Brain, Target, Zap, Award, Activity, Percent, Calculator, Eye, BookOpen, Play, Star, Coins } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

interface InvestmentParkProps {
  onBack: () => void;
}

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  pe: number;
  dividend: number;
  sector: string;
  risk: 'low' | 'medium' | 'high';
  ohlc: {
    open: number;
    high: number;
    low: number;
    close: number;
  };
  chartData: number[];
  news: string[];
}

interface InvestmentScam {
  id: string;
  title: string;
  type: 'ponzi' | 'pump_dump' | 'fake_ipo' | 'bond_scam' | 'forex_scam' | 'crypto_scam';
  description: string;
  promise: string;
  redFlags: string[];
  realExample: string;
  prevention: string[];
  impact: string;
  reward: number;
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

interface TradingLesson {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
  practicalTips: string[];
  commonMistakes: string[];
  reward: number;
  completed: boolean;
}

export const InvestmentPark: React.FC<InvestmentParkProps> = ({ onBack }) => {
  const { progress, addCoins, updateProgress } = useUser();
  const [activeGame, setActiveGame] = useState<'overview' | 'trading' | 'portfolio' | 'scams' | 'analysis' | 'lessons'>('overview');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [portfolio, setPortfolio] = useState({
    cash: 50000,
    holdings: [
      { symbol: 'VCB', shares: 10, avgPrice: 90000 },
      { symbol: 'VNM', shares: 5, avgPrice: 80000 }
    ] as { symbol: string; shares: number; avgPrice: number }[],
    totalValue: 0
  });

  const [stocks, setStocks] = useState<Stock[]>([
    {
      symbol: 'VCB',
      name: 'Vietcombank',
      price: 92500,
      change: 1500,
      changePercent: 1.65,
      volume: 2500000,
      marketCap: '425B VND',
      pe: 12.5,
      dividend: 3.2,
      sector: 'Banking',
      risk: 'low',
      ohlc: { open: 91000, high: 93000, low: 90500, close: 92500 },
      chartData: [89000, 90500, 91200, 92000, 91500, 92500],
      news: ['Q4 profit up 15%', 'New digital banking services', 'Dividend announcement next week']
    },
    {
      symbol: 'VNM',
      name: 'Vinamilk',
      price: 78000,
      change: -2000,
      changePercent: -2.5,
      volume: 1800000,
      marketCap: '185B VND',
      pe: 15.8,
      dividend: 4.1,
      sector: 'Consumer Goods',
      risk: 'medium',
      ohlc: { open: 80000, high: 80500, low: 77500, close: 78000 },
      chartData: [82000, 81000, 80000, 79000, 78500, 78000],
      news: ['Expanding to Southeast Asia', 'New organic product line', 'Supply chain optimization']
    },
    {
      symbol: 'SCAM',
      name: 'MoonCoin Pro (SCAM)',
      price: 0.001,
      change: 0.0005,
      changePercent: 100,
      volume: 999999999,
      marketCap: 'Unknown',
      pe: 0,
      dividend: 0,
      sector: 'Cryptocurrency',
      risk: 'high',
      ohlc: { open: 0.0005, high: 0.002, low: 0.0003, close: 0.001 },
      chartData: [0.0005, 0.001, 0.002, 0.0015, 0.0008, 0.001],
      news: ['⚠️ SCAM ALERT', '⚠️ Unregistered security', '⚠️ Pump and dump scheme']
    }
  ]);

  const investmentScams: InvestmentScam[] = [
    {
      id: '1',
      title: 'Ponzi Scheme - "Guaranteed Returns"',
      type: 'ponzi',
      description: 'Investment scheme that pays existing investors with money from new investors, creating illusion of legitimate returns',
      promise: '"Invest $10,000 and get $2,000 monthly returns guaranteed! No risk, government backed! Join 50,000+ successful investors!"',
      redFlags: [
        'Guaranteed high returns (>15% annually) with no risk',
        'Consistent returns regardless of market conditions',
        'Pressure to recruit new investors for bonuses',
        'Difficulty withdrawing money or delayed payments',
        'Vague or overly complex investment strategy',
        'Unregistered investment advisors or companies',
        'Testimonials that seem too good to be true'
      ],
      realExample: 'Pincoin and iFan scams in Vietnam (2018) stole $660M from 32,000 investors by promising 48% monthly returns through "blockchain technology".',
      prevention: [
        'Research investment company licenses with State Securities Commission',
        'Understand that all legitimate investments carry risk',
        'Be skeptical of returns above 10-12% annually',
        'Verify company registration and physical address',
        'Start with small test investments',
        'Diversify across multiple legitimate platforms',
        'Consult licensed financial advisors'
      ],
      impact: 'Average investor lost $20,000, many lost entire life savings and retirement funds. Some victims took loans to invest more.',
      reward: 200,
      difficulty: 'intermediate'
    },
    {
      id: '2',
      title: 'Pump and Dump Stock Schemes',
      type: 'pump_dump',
      description: 'Artificially inflating stock prices through false marketing, then selling at peak while others lose money',
      promise: '"This penny stock will 10x in 30 days! Insider information says major partnership announcement coming! Buy now before it explodes!"',
      redFlags: [
        'Pressure to buy immediately before "announcement"',
        'Claims of insider or confidential information',
        'Unrealistic price predictions (10x, 100x returns)',
        'Heavy promotion on social media and forums',
        'Low-priced stocks with sudden unexplained interest',
        'Anonymous tips and "hot stock" recommendations',
        'Promises of guaranteed profits'
      ],
      realExample: 'Vietnamese penny stock manipulation in 2022 caused $15M in losses when heavily promoted stocks crashed 80% after orchestrated selling.',
      prevention: [
        'Research company fundamentals and financial statements',
        'Be extremely skeptical of stock tips from strangers',
        'Avoid stocks heavily promoted on social media',
        'Check unusual trading volume and price patterns',
        'Only invest in companies you thoroughly understand',
        'Use only licensed brokers and official exchanges',
        'Never invest based on "insider tips"'
      ],
      impact: 'Investors lost 60-90% of investment when stock prices collapsed. Many borrowed money to invest more.',
      reward: 180,
      difficulty: 'advanced'
    },
    {
      id: '3',
      title: 'Fake Government Bond Scams',
      type: 'bond_scam',
      description: 'Fraudulent bonds claiming government backing with impossibly high interest rates',
      promise: '"Government-backed bonds paying 20% annual interest! Safer than banks, guaranteed by Ministry of Finance! Limited time offer!"',
      redFlags: [
        'Interest rates far above official government bonds (>8%)',
        'Sold through unofficial channels or agents',
        'No official government documentation',
        'Pressure to invest quickly before "offer expires"',
        'Payment to personal accounts instead of institutions',
        'Claims of exclusive or limited availability',
        'No proper bond certificates or registration'
      ],
      realExample: 'Fake government bond scam in Ho Chi Minh City (2023) defrauded 500+ investors of $8M by selling fake bonds at 18% interest.',
      prevention: [
        'Buy government bonds only through licensed banks',
        'Verify bond authenticity with Ministry of Finance',
        'Check current official government bond rates',
        'Ensure proper documentation and certificates',
        'Use only authorized financial institutions',
        'Be suspicious of rates above market standards',
        'Verify seller credentials and licenses'
      ],
      impact: 'Investors lost average $16,000 each, with elderly victims losing retirement savings.',
      reward: 220,
      difficulty: 'intermediate'
    },
    {
      id: '4',
      title: 'Fake IPO Investment Scams',
      type: 'fake_ipo',
      description: 'Fraudulent Initial Public Offerings for non-existent companies or unauthorized stock sales',
      promise: '"Pre-IPO investment opportunity! Get shares before public listing at 50% discount! Company going public next month!"',
      redFlags: [
        'Pre-IPO offers to general public (usually restricted)',
        'Significant discounts on "future" stock prices',
        'No official prospectus or SEC filings',
        'Pressure to invest before "IPO date"',
        'Company not listed on official exchange calendars',
        'Payment to individuals rather than institutions',
        'Promises of immediate profits after listing'
      ],
      realExample: 'Fake tech company IPO scam in Vietnam (2023) collected $12M from investors for non-existent company claiming to go public.',
      prevention: [
        'Verify IPO announcements through official exchanges',
        'Check company registration and financial filings',
        'Use only licensed investment banks for IPO participation',
        'Research company business model and financials',
        'Be wary of unsolicited IPO investment offers',
        'Understand that real IPOs have strict regulations',
        'Consult financial advisors for major investments'
      ],
      impact: 'Investors lost 100% of investment as company never existed. Average loss $24,000 per victim.',
      reward: 250,
      difficulty: 'advanced'
    },
    {
      id: '5',
      title: 'Forex Trading Scam Platforms',
      type: 'forex_scam',
      description: 'Fake forex trading platforms that manipulate prices and prevent withdrawals',
      promise: '"Trade forex with our AI system! 80% win rate guaranteed! Start with $500 and make $200 daily! No experience needed!"',
      redFlags: [
        'Guaranteed win rates above 70%',
        'Promises of daily profits from trading',
        'Unregulated trading platforms',
        'Difficulty withdrawing profits',
        'Pressure to deposit more money',
        'Fake trading results and testimonials',
        'No proper financial licenses'
      ],
      realExample: 'Fake forex platform "ForexVN Pro" scammed 2,000+ Vietnamese traders of $25M in 2023 by manipulating prices.',
      prevention: [
        'Use only regulated forex brokers',
        'Check broker licenses with financial authorities',
        'Test withdrawal process with small amounts',
        'Understand forex trading risks (80% lose money)',
        'Never trust guaranteed profit claims',
        'Research broker reviews from multiple sources',
        'Start with demo accounts to learn'
      ],
      impact: 'Average loss $12,500 per trader. Many borrowed money or used credit cards to trade more.',
      reward: 190,
      difficulty: 'advanced'
    },
    {
      id: '6',
      title: 'Cryptocurrency Exit Scams',
      type: 'crypto_scam',
      description: 'Fake cryptocurrency projects that disappear with investor funds after raising money',
      promise: '"Revolutionary new crypto token! Early investors get 1000% returns! Backed by famous celebrities! ICO ends in 48 hours!"',
      redFlags: [
        'Celebrity endorsements without verification',
        'Promises of 100x or 1000x returns',
        'Pressure to invest before ICO deadline',
        'Anonymous development team',
        'No clear use case or technology explanation',
        'Heavy marketing but no working product',
        'Requests for direct crypto transfers'
      ],
      realExample: 'Vietnamese crypto project "VietCoin" raised $30M in 2022 then disappeared overnight, leaving 15,000 investors with worthless tokens.',
      prevention: [
        'Research development team backgrounds',
        'Understand the technology and use case',
        'Check if project has working product or prototype',
        'Verify celebrity endorsements independently',
        'Only invest through regulated exchanges',
        'Be extremely cautious with new cryptocurrencies',
        'Never invest more than you can afford to lose'
      ],
      impact: 'Investors lost average $2,000 each. Many young investors lost university tuition money.',
      reward: 170,
      difficulty: 'intermediate'
    }
  ];

  const tradingLessons: TradingLesson[] = [
    {
      id: '1',
      title: 'Understanding Stock Market Basics',
      content: 'The stock market is where shares of publicly traded companies are bought and sold. When you buy a stock, you own a small piece of that company.',
      keyPoints: [
        'Stocks represent ownership in companies',
        'Stock prices fluctuate based on supply and demand',
        'Market cap = share price × total shares outstanding',
        'Dividends are payments to shareholders from company profits',
        'P/E ratio shows how much investors pay per dollar of earnings'
      ],
      practicalTips: [
        'Start with blue-chip stocks from established companies',
        'Diversify across different sectors and industries',
        'Invest regularly rather than trying to time the market',
        'Focus on long-term growth rather than quick profits',
        'Use dollar-cost averaging to reduce risk'
      ],
      commonMistakes: [
        'Putting all money in one stock',
        'Panic selling during market downturns',
        'Following hot tips without research',
        'Trying to time market peaks and bottoms',
        'Investing borrowed money or emergency funds'
      ],
      reward: 100,
      completed: false
    },
    {
      id: '2',
      title: 'Reading Financial Statements',
      content: 'Financial statements show a company\'s financial health. The three main statements are Income Statement, Balance Sheet, and Cash Flow Statement.',
      keyPoints: [
        'Income Statement shows revenue, expenses, and profit',
        'Balance Sheet shows assets, liabilities, and equity',
        'Cash Flow Statement tracks money in and out',
        'Revenue growth indicates business expansion',
        'Debt-to-equity ratio shows financial leverage'
      ],
      practicalTips: [
        'Look for consistent revenue growth over 3-5 years',
        'Check if company generates positive cash flow',
        'Compare financial ratios with industry averages',
        'Watch for unusual changes in accounting methods',
        'Focus on trends rather than single quarter results'
      ],
      commonMistakes: [
        'Ignoring cash flow while focusing only on profits',
        'Not comparing with industry competitors',
        'Overlooking debt levels and interest payments',
        'Trusting only company-provided summaries',
        'Making decisions based on single quarter data'
      ],
      reward: 150,
      completed: false
    },
    {
      id: '3',
      title: 'Risk Management and Diversification',
      content: 'Risk management involves protecting your investments from significant losses through diversification and position sizing.',
      keyPoints: [
        'Diversification reduces portfolio risk',
        'Don\'t put more than 5-10% in any single stock',
        'Spread investments across different sectors',
        'Consider geographic diversification',
        'Balance growth and value stocks'
      ],
      practicalTips: [
        'Use the 5% rule: never more than 5% in one stock',
        'Rebalance portfolio quarterly',
        'Set stop-loss orders to limit downside',
        'Keep 3-6 months emergency fund separate',
        'Consider index funds for instant diversification'
      ],
      commonMistakes: [
        'Concentrating too much in one sector',
        'Chasing last year\'s best performers',
        'Ignoring correlation between investments',
        'Not having an exit strategy',
        'Emotional decision making during volatility'
      ],
      reward: 120,
      completed: false
    },
    {
      id: '4',
      title: 'Technical Analysis Fundamentals',
      content: 'Technical analysis uses price charts and trading volume to predict future price movements and identify entry/exit points.',
      keyPoints: [
        'Support levels are prices where stocks tend to stop falling',
        'Resistance levels are prices where stocks struggle to break above',
        'Moving averages smooth out price data to show trends',
        'Volume confirms price movements',
        'Chart patterns can indicate future direction'
      ],
      practicalTips: [
        'Use 50-day and 200-day moving averages for trend direction',
        'Look for volume spikes during price breakouts',
        'Identify key support and resistance levels',
        'Use multiple timeframes for better perspective',
        'Combine technical with fundamental analysis'
      ],
      commonMistakes: [
        'Relying only on technical analysis',
        'Overcomplicating with too many indicators',
        'Ignoring fundamental company health',
        'Trading against major trends',
        'Not considering market-wide conditions'
      ],
      reward: 130,
      completed: false
    }
  ];

  // Calculate portfolio value
  useEffect(() => {
    const holdingsValue = portfolio.holdings.reduce((total, holding) => {
      const stock = stocks.find(s => s.symbol === holding.symbol);
      return total + (stock ? stock.price * holding.shares : 0);
    }, 0);
    
    setPortfolio(prev => ({
      ...prev,
      totalValue: prev.cash + holdingsValue
    }));
  }, [stocks, portfolio.holdings, portfolio.cash]);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev => prev.map(stock => {
        if (stock.symbol === 'SCAM') return stock; // Don't update scam stock
        
        const volatility = stock.risk === 'high' ? 0.05 : stock.risk === 'medium' ? 0.03 : 0.02;
        const change = (Math.random() - 0.5) * volatility * stock.price;
        const newPrice = Math.max(stock.price + change, stock.price * 0.9);
        
        return {
          ...stock,
          price: Math.round(newPrice),
          change: Math.round(newPrice - stock.price),
          changePercent: Number(((newPrice - stock.price) / stock.price * 100).toFixed(2)),
          chartData: [...stock.chartData.slice(1), Math.round(newPrice)]
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const buyStock = (symbol: string, shares: number) => {
    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock || portfolio.cash < stock.price * shares) return;

    const cost = stock.price * shares;
    setPortfolio(prev => ({
      ...prev,
      cash: prev.cash - cost,
      holdings: [
        ...prev.holdings.filter(h => h.symbol !== symbol),
        {
          symbol,
          shares: (prev.holdings.find(h => h.symbol === symbol)?.shares || 0) + shares,
          avgPrice: stock.price
        }
      ]
    }));

    if (symbol === 'SCAM') {
      addCoins(-100);
      updateProgress({ milSkillScore: Math.max(0, progress.milSkillScore - 20) });
    } else {
      addCoins(20);
      updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 5 });
    }
  };

  const sellStock = (symbol: string, shares: number) => {
    const stock = stocks.find(s => s.symbol === symbol);
    const holding = portfolio.holdings.find(h => h.symbol === symbol);
    if (!stock || !holding || holding.shares < shares) return;

    const revenue = stock.price * shares;
    setPortfolio(prev => ({
      ...prev,
      cash: prev.cash + revenue,
      holdings: prev.holdings.map(h => 
        h.symbol === symbol 
          ? { ...h, shares: h.shares - shares }
          : h
      ).filter(h => h.shares > 0)
    }));

    addCoins(30);
  };

  const renderTradingInterface = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Live Trading Simulator</h2>
          <p className="text-purple-200">Practice trading with real market mechanics</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-400">${portfolio.totalValue.toLocaleString()}</div>
          <p className="text-green-200 text-sm">Portfolio Value</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stock List */}
        <div className="lg:col-span-2 space-y-4">
          {stocks.map(stock => (
            <div
              key={stock.symbol}
              className={`bg-white/10 rounded-xl p-6 border cursor-pointer transition-all ${
                selectedStock?.symbol === stock.symbol 
                  ? 'border-purple-500/50 bg-purple-500/10' 
                  : 'border-white/20 hover:border-white/40'
              } ${stock.symbol === 'SCAM' ? 'border-red-500/50 bg-red-500/10' : ''}`}
              onClick={() => setSelectedStock(stock)}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-bold text-lg flex items-center">
                    {stock.name}
                    {stock.symbol === 'SCAM' && (
                      <AlertTriangle className="ml-2 text-red-400" size={20} />
                    )}
                  </h3>
                  <p className="text-purple-300">{stock.symbol} • {stock.sector}</p>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-xl">${stock.price.toLocaleString()}</div>
                  <div className={`flex items-center space-x-1 ${
                    stock.change >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stock.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span className="text-sm">{stock.changePercent}%</span>
                  </div>
                </div>
              </div>

              {/* Mini Chart */}
              <div className="h-16 mb-4">
                <div className="flex items-end justify-between h-full">
                  {stock.chartData.map((price, index) => (
                    <div
                      key={index}
                      className={`w-2 rounded-t ${
                        price >= stock.chartData[0] ? 'bg-green-400' : 'bg-red-400'
                      }`}
                      style={{
                        height: `${((price - Math.min(...stock.chartData)) / 
                                  (Math.max(...stock.chartData) - Math.min(...stock.chartData))) * 100}%`
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-purple-300">P/E:</span>
                  <span className="text-white ml-1">{stock.pe}</span>
                </div>
                <div>
                  <span className="text-purple-300">Dividend:</span>
                  <span className="text-white ml-1">{stock.dividend}%</span>
                </div>
                <div>
                  <span className="text-purple-300">Volume:</span>
                  <span className="text-white ml-1">{(stock.volume / 1000000).toFixed(1)}M</span>
                </div>
                <div>
                  <span className="text-purple-300">Cap:</span>
                  <span className="text-white ml-1">{stock.marketCap}</span>
                </div>
              </div>

              {stock.symbol === 'SCAM' && (
                <div className="mt-4 bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="text-red-400" size={16} />
                    <span className="text-red-300 font-semibold text-sm">SCAM ALERT</span>
                  </div>
                  <ul className="text-red-200 text-xs space-y-1">
                    <li>• Unregistered security</li>
                    <li>• Impossible 100% daily gains</li>
                    <li>• No real company behind token</li>
                    <li>• Pump and dump scheme</li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Trading Panel */}
        <div className="space-y-4">
          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h3 className="text-white font-semibold mb-4">Portfolio Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-purple-200">Cash:</span>
                <span className="text-green-400">${portfolio.cash.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Holdings:</span>
                <span className="text-white">${(portfolio.totalValue - portfolio.cash).toLocaleString()}</span>
              </div>
              <div className="border-t border-white/20 pt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-purple-200">Total Value:</span>
                  <span className="text-white">${portfolio.totalValue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {portfolio.holdings.length > 0 && (
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4">Your Holdings</h3>
              <div className="space-y-3">
                {portfolio.holdings.map(holding => {
                  const stock = stocks.find(s => s.symbol === holding.symbol);
                  const currentValue = stock ? stock.price * holding.shares : 0;
                  const costBasis = holding.avgPrice * holding.shares;
                  const gainLoss = currentValue - costBasis;
                  const gainLossPercent = (gainLoss / costBasis) * 100;

                  return (
                    <div key={holding.symbol} className="bg-white/5 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">{holding.symbol}</span>
                        <span className="text-purple-300 text-sm">{holding.shares} shares</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-200">Value:</span>
                        <span className="text-white">${currentValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-200">Gain/Loss:</span>
                        <span className={gainLoss >= 0 ? 'text-green-400' : 'text-red-400'}>
                          ${gainLoss.toLocaleString()} ({gainLossPercent.toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {selectedStock && (
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4">Trade {selectedStock.symbol}</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => buyStock(selectedStock.symbol, 1)}
                    disabled={portfolio.cash < selectedStock.price}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
                  >
                    Buy 1 Share
                  </button>
                  <button
                    onClick={() => sellStock(selectedStock.symbol, 1)}
                    disabled={!portfolio.holdings.find(h => h.symbol === selectedStock.symbol && h.shares > 0)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
                  >
                    Sell 1 Share
                  </button>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                  <h4 className="text-white font-medium mb-2">Stock Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-purple-200">Open:</span>
                      <span className="text-white">${selectedStock.ohlc.open.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-200">High:</span>
                      <span className="text-white">${selectedStock.ohlc.high.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-200">Low:</span>
                      <span className="text-white">${selectedStock.ohlc.low.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-200">Volume:</span>
                      <span className="text-white">{(selectedStock.volume / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                </div>

                {selectedStock.news.length > 0 && (
                  <div className="bg-white/5 rounded-lg p-3">
                    <h4 className="text-white font-medium mb-2">Recent News</h4>
                    <ul className="text-purple-200 text-sm space-y-1">
                      {selectedStock.news.map((news, index) => (
                        <li key={index}>• {news}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderScamDatabase = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Shield className="mx-auto mb-4 text-red-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Investment Scam Database</h2>
        <p className="text-red-200">Learn about real investment scams and how to protect yourself</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {investmentScams.map(scam => (
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

            <div className="bg-white/5 rounded-lg p-4 mb-4 border-l-4 border-yellow-500">
              <h4 className="text-yellow-300 font-semibold mb-2">Typical Promise:</h4>
              <p className="text-yellow-200 text-sm italic">"{scam.promise}"</p>
            </div>

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

              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                <h4 className="text-blue-300 font-medium text-sm mb-2">📊 Real Case:</h4>
                <p className="text-blue-200 text-xs">{scam.realExample}</p>
              </div>

              <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-3">
                <h4 className="text-orange-300 font-medium text-sm mb-2">💰 Impact:</h4>
                <p className="text-orange-200 text-xs">{scam.impact}</p>
              </div>
            </div>

            <button
              onClick={() => {
                addCoins(scam.reward);
                updateProgress({ milSkillScore: progress.milSkillScore + 20 });
              }}
              className="w-full mt-4 bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-colors"
            >
              Study Case (+{scam.reward} coins)
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLessons = () => (
    <div className="space-y-6">
      <div className="text-center">
        <BookOpen className="mx-auto mb-4 text-indigo-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Investment Education Center</h2>
        <p className="text-indigo-200">Master essential investment and trading concepts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tradingLessons.map(lesson => (
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
                <h4 className="text-blue-300 font-medium text-sm mb-2">📚 Key Points:</h4>
                <ul className="text-blue-200 text-xs space-y-1">
                  {lesson.keyPoints.map((point, index) => (
                    <li key={index}>• {point}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                <h4 className="text-green-300 font-medium text-sm mb-2">💡 Practical Tips:</h4>
                <ul className="text-green-200 text-xs space-y-1">
                  {lesson.practicalTips.map((tip, index) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <h4 className="text-red-300 font-medium text-sm mb-2">⚠️ Common Mistakes:</h4>
                <ul className="text-red-200 text-xs space-y-1">
                  {lesson.commonMistakes.map((mistake, index) => (
                    <li key={index}>• {mistake}</li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => {
                addCoins(lesson.reward);
                updateProgress({ financialLiteracyScore: progress.financialLiteracyScore + 25 });
              }}
              disabled={lesson.completed}
              className={`w-full mt-4 py-3 rounded-lg font-semibold transition-colors ${
                lesson.completed
                  ? 'bg-green-500/30 text-green-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
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
        <TrendingUp className="mx-auto mb-4 text-purple-400" size={64} />
        <h1 className="text-3xl font-bold text-white mb-2">Investment Park</h1>
        <p className="text-purple-200">Master trading, investing, and portfolio management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { id: 'trading', name: 'Live Trading', icon: BarChart3, color: 'from-green-500 to-emerald-500', description: 'Practice with real market data' },
          { id: 'portfolio', name: 'Portfolio Manager', icon: PieChart, color: 'from-blue-500 to-cyan-500', description: 'Track your investments' },
          { id: 'scams', name: 'Investment Scams', icon: Shield, color: 'from-red-500 to-orange-500', description: 'Learn to avoid fraud' },
          { id: 'lessons', name: 'Trading Academy', icon: BookOpen, color: 'from-purple-500 to-pink-500', description: 'Master investment concepts' }
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
        <h2 className="text-xl font-bold text-white mb-4">Investment Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">${portfolio.totalValue.toLocaleString()}</div>
            <p className="text-green-200 text-sm">Portfolio Value</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{portfolio.holdings.length}</div>
            <p className="text-blue-200 text-sm">Holdings</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{progress.financialLiteracyScore}</div>
            <p className="text-purple-200 text-sm">Investment Knowledge</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {((portfolio.totalValue - 50000) / 50000 * 100).toFixed(1)}%
            </div>
            <p className="text-yellow-200 text-sm">Total Return</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeGame) {
      case 'trading':
        return renderTradingInterface();
      case 'scams':
        return renderScamDatabase();
      case 'lessons':
        return renderLessons();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="space-y-6">
      {activeGame !== 'overview' && (
        <button
          onClick={() => setActiveGame('overview')}
          className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Investment Park</span>
        </button>
      )}

      {renderContent()}
    </div>
  );
};
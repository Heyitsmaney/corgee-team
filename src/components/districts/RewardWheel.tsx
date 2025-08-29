import React, { useState, useEffect } from 'react';
import { ArrowLeft, Gift, Coins, Star, Award, Gem, Ticket, Zap, Crown, Sparkles } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

interface RewardWheelProps {
  onBack: () => void;
}

interface WheelReward {
  id: string;
  type: 'coins' | 'nft' | 'voucher' | 'badge' | 'multiplier' | 'asset';
  name: string;
  value: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

interface NFTAsset {
  id: string;
  name: string;
  type: 'avatar' | 'building' | 'decoration' | 'tool';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  image: string;
  description: string;
  owned: boolean;
  tradeable: boolean;
}

export const RewardWheel: React.FC<RewardWheelProps> = ({ onBack }) => {
  const { progress, addCoins, updateProgress, addBadge } = useUser();
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastReward, setLastReward] = useState<WheelReward | null>(null);
  const [spinCost, setSpinCost] = useState(100);
  const [nftCollection, setNftCollection] = useState<NFTAsset[]>([
    {
      id: '1',
      name: 'Golden Calculator',
      type: 'tool',
      rarity: 'rare',
      image: '🧮',
      description: 'Increases financial literacy gains by 25%',
      owned: false,
      tradeable: true
    },
    {
      id: '2',
      name: 'Cyber Shield Avatar',
      type: 'avatar',
      rarity: 'epic',
      image: '🛡️',
      description: 'Exclusive cybersecurity expert avatar skin',
      owned: false,
      tradeable: true
    },
    {
      id: '3',
      name: 'Diamond Bank Building',
      type: 'building',
      rarity: 'legendary',
      image: '🏦',
      description: 'Premium bank building for your city',
      owned: false,
      tradeable: false
    }
  ]);

  const wheelRewards: WheelReward[] = [
    {
      id: '1',
      type: 'coins',
      name: '50 Coins',
      value: '50',
      rarity: 'common',
      icon: Coins,
      color: 'text-yellow-400',
      description: 'Basic coin reward'
    },
    {
      id: '2',
      type: 'coins',
      name: '100 Coins',
      value: '100',
      rarity: 'common',
      icon: Coins,
      color: 'text-yellow-400',
      description: 'Standard coin reward'
    },
    {
      id: '3',
      type: 'coins',
      name: '250 Coins',
      value: '250',
      rarity: 'uncommon',
      icon: Coins,
      color: 'text-green-400',
      description: 'Good coin reward'
    },
    {
      id: '4',
      type: 'multiplier',
      name: '2x XP Boost',
      value: '24h',
      rarity: 'rare',
      icon: Zap,
      color: 'text-blue-400',
      description: 'Double experience for 24 hours'
    },
    {
      id: '5',
      type: 'nft',
      name: 'Random NFT',
      value: 'nft',
      rarity: 'rare',
      icon: Gem,
      color: 'text-purple-400',
      description: 'Collectible digital asset'
    },
    {
      id: '6',
      type: 'voucher',
      name: 'Shopping Voucher',
      value: '500',
      rarity: 'uncommon',
      icon: Ticket,
      color: 'text-pink-400',
      description: '500 coin shopping discount'
    },
    {
      id: '7',
      type: 'badge',
      name: 'Lucky Spinner',
      value: 'badge',
      rarity: 'epic',
      icon: Award,
      color: 'text-orange-400',
      description: 'Exclusive achievement badge'
    },
    {
      id: '8',
      type: 'coins',
      name: '1000 Coins',
      value: '1000',
      rarity: 'epic',
      icon: Crown,
      color: 'text-gold-400',
      description: 'Massive coin jackpot'
    }
  ];

  const spinWheel = () => {
    if (progress.coins < spinCost || isSpinning) return;

    setIsSpinning(true);
    addCoins(-spinCost);

    // Simulate spinning animation
    setTimeout(() => {
      const randomReward = wheelRewards[Math.floor(Math.random() * wheelRewards.length)];
      setLastReward(randomReward);
      
      // Apply reward
      switch (randomReward.type) {
        case 'coins':
          addCoins(parseInt(randomReward.value));
          break;
        case 'badge':
          addBadge(randomReward.name);
          break;
        case 'multiplier':
          // Store multiplier in localStorage for 24h
          localStorage.setItem('xp-multiplier', JSON.stringify({
            multiplier: 2,
            expires: Date.now() + 24 * 60 * 60 * 1000
          }));
          break;
        case 'nft':
          // Award random NFT
          const availableNFTs = nftCollection.filter(nft => !nft.owned);
          if (availableNFTs.length > 0) {
            const randomNFT = availableNFTs[Math.floor(Math.random() * availableNFTs.length)];
            setNftCollection(prev => prev.map(nft => 
              nft.id === randomNFT.id ? { ...nft, owned: true } : nft
            ));
          }
          break;
      }

      setIsSpinning(false);
      setSpinCost(prev => Math.min(prev + 25, 500)); // Increase cost each spin
    }, 3000);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 text-gray-300 bg-gray-500/20';
      case 'uncommon': return 'border-green-400 text-green-300 bg-green-500/20';
      case 'rare': return 'border-blue-400 text-blue-300 bg-blue-500/20';
      case 'epic': return 'border-purple-400 text-purple-300 bg-purple-500/20';
      case 'legendary': return 'border-yellow-400 text-yellow-300 bg-yellow-500/20';
      default: return 'border-gray-400 text-gray-300 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Gift className="mx-auto mb-4 text-yellow-400" size={64} />
        <h1 className="text-3xl font-bold text-white mb-2">Reward Wheel</h1>
        <p className="text-yellow-200">Spin for coins, NFTs, vouchers, and exclusive rewards!</p>
      </div>

      {/* Wheel Interface */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
        <div className="flex flex-col items-center space-y-6">
          {/* Wheel Visual */}
          <div className="relative">
            <div className={`w-64 h-64 rounded-full border-8 border-yellow-400 bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 flex items-center justify-center ${
              isSpinning ? 'animate-spin' : ''
            }`}>
              <div className="w-48 h-48 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center">
                <div className="text-center">
                  <Gift className="mx-auto mb-2 text-yellow-400" size={32} />
                  <div className="text-white font-bold">SPIN</div>
                  <div className="text-yellow-200 text-sm">FOR REWARDS</div>
                </div>
              </div>
            </div>
            
            {/* Wheel Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-yellow-400"></div>
            </div>
          </div>

          {/* Spin Button */}
          <button
            onClick={spinWheel}
            disabled={progress.coins < spinCost || isSpinning}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
              progress.coins >= spinCost && !isSpinning
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105'
                : 'bg-gray-500/30 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSpinning ? 'Spinning...' : `Spin Wheel (${spinCost} coins)`}
          </button>

          {/* Last Reward */}
          {lastReward && (
            <div className={`p-4 rounded-lg border-2 ${getRarityColor(lastReward.rarity)}`}>
              <div className="flex items-center space-x-3">
                <lastReward.icon className={lastReward.color} size={24} />
                <div>
                  <h3 className="text-white font-semibold">{lastReward.name}</h3>
                  <p className="text-purple-200 text-sm">{lastReward.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Possible Rewards */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-4">Possible Rewards</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wheelRewards.map(reward => (
            <div key={reward.id} className={`p-4 rounded-lg border ${getRarityColor(reward.rarity)}`}>
              <div className="text-center">
                <reward.icon className={`mx-auto mb-2 ${reward.color}`} size={24} />
                <h3 className="text-white font-semibold text-sm">{reward.name}</h3>
                <p className="text-purple-300 text-xs">{reward.rarity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NFT Collection */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-4">Your NFT Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nftCollection.map(nft => (
            <div key={nft.id} className={`p-4 rounded-lg border-2 ${
              nft.owned ? getRarityColor(nft.rarity) : 'border-gray-500/30 opacity-50'
            }`}>
              <div className="text-center">
                <div className="text-4xl mb-2">{nft.image}</div>
                <h3 className="text-white font-semibold">{nft.name}</h3>
                <p className="text-purple-300 text-sm mb-2">{nft.type} • {nft.rarity}</p>
                <p className="text-purple-200 text-xs">{nft.description}</p>
                {nft.owned && (
                  <div className="mt-2">
                    <span className="bg-green-500/30 text-green-200 px-2 py-1 rounded text-xs">OWNED</span>
                    {nft.tradeable && (
                      <span className="ml-2 bg-blue-500/30 text-blue-200 px-2 py-1 rounded text-xs">TRADEABLE</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spin Statistics */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-4">Spin Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">23</div>
            <p className="text-yellow-200 text-sm">Total Spins</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">5</div>
            <p className="text-purple-200 text-sm">NFTs Collected</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">2,450</div>
            <p className="text-green-200 text-sm">Coins Won</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">3</div>
            <p className="text-blue-200 text-sm">Rare Items</p>
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { ArrowLeft, Users, Upload, Flag, MessageCircle, ThumbsUp, Camera, AlertTriangle, CheckCircle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface CommunityProps {
  onNavigate: (screen: 'dashboard' | 'game' | 'challenge' | 'community' | 'settings') => void;
}

interface ScamReport {
  id: string;
  title: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  category: 'phishing' | 'investment' | 'romance' | 'tech_support' | 'other';
  reportedBy: string;
  timestamp: string;
  likes: number;
  comments: number;
  verified: boolean;
}

interface CommunityPost {
  id: string;
  author: string;
  title: string;
  content: string;
  category: 'success' | 'question' | 'warning' | 'tip';
  timestamp: string;
  likes: number;
  comments: number;
}

export const Community: React.FC<CommunityProps> = ({ onNavigate }) => {
  const { profile } = useUser();
  const [activeTab, setActiveTab] = useState<'feed' | 'reports' | 'upload'>('feed');
  const [newReport, setNewReport] = useState({
    title: '',
    description: '',
    category: 'other' as ScamReport['category']
  });

  const scamReports: ScamReport[] = [
    {
      id: '1',
      title: 'Fake Netflix Renewal Email',
      description: 'Received email claiming my Netflix account was suspended. Link led to fake login page.',
      riskLevel: 'high',
      category: 'phishing',
      reportedBy: 'SafeUser123',
      timestamp: '2 hours ago',
      likes: 15,
      comments: 3,
      verified: true
    },
    {
      id: '2',
      title: 'Romance Scammer on Dating App',
      description: 'Profile claimed to be military overseas, asked for money for "emergency".',
      riskLevel: 'high',
      category: 'romance',
      reportedBy: 'WiseSpender',
      timestamp: '5 hours ago',
      likes: 23,
      comments: 8,
      verified: true
    },
    {
      id: '3',
      title: 'Suspicious Investment Text',
      description: 'Text offering 300% returns on cryptocurrency investment with "limited time" pressure.',
      riskLevel: 'medium',
      category: 'investment',
      reportedBy: 'CryptoCareful',
      timestamp: '1 day ago',
      likes: 12,
      comments: 5,
      verified: false
    }
  ];

  const communityPosts: CommunityPost[] = [
    {
      id: '1',
      author: 'FinanceNewbie',
      title: 'Successfully avoided a phone scam!',
      content: 'Thanks to this community, I recognized the red flags when someone called claiming to be from my bank. I hung up and called the official number instead!',
      category: 'success',
      timestamp: '3 hours ago',
      likes: 42,
      comments: 12
    },
    {
      id: '2',
      author: 'BudgetMaster',
      title: 'Tip: Use the 24-hour rule for big purchases',
      content: 'Before making any purchase over $100, I wait 24 hours. This simple rule has saved me from many impulse buys and potential scams.',
      category: 'tip',
      timestamp: '6 hours ago',
      likes: 38,
      comments: 15
    },
    {
      id: '3',
      author: 'ScamFighter',
      title: 'Warning: New WhatsApp investment scam',
      content: 'Friends are getting added to WhatsApp groups promising quick crypto profits. Remember: if it sounds too good to be true, it probably is!',
      category: 'warning',
      timestamp: '8 hours ago',
      likes: 67,
      comments: 24
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'high': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'success': return 'text-green-400 bg-green-500/20';
      case 'warning': return 'text-red-400 bg-red-500/20';
      case 'tip': return 'text-blue-400 bg-blue-500/20';
      case 'question': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const handleReportSubmit = () => {
    if (!newReport.title || !newReport.description) return;
    
    // Simulate report submission
    alert('Report submitted successfully! Our AI will analyze it and add it to the community feed.');
    setNewReport({ title: '', description: '', category: 'other' });
    setActiveTab('reports');
  };

  const renderFeed = () => (
    <div className="space-y-6">
      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-500/20 backdrop-blur-lg rounded-xl p-6 border border-blue-500/30 text-center">
          <Users className="mx-auto mb-2 text-blue-400" size={32} />
          <div className="text-2xl font-bold text-white">2,847</div>
          <div className="text-blue-200 text-sm">Active Members</div>
        </div>
        
        <div className="bg-red-500/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30 text-center">
          <Flag className="mx-auto mb-2 text-red-400" size={32} />
          <div className="text-2xl font-bold text-white">156</div>
          <div className="text-red-200 text-sm">Scams Reported</div>
        </div>
        
        <div className="bg-green-500/20 backdrop-blur-lg rounded-xl p-6 border border-green-500/30 text-center">
          <CheckCircle className="mx-auto mb-2 text-green-400" size={32} />
          <div className="text-2xl font-bold text-white">$2.4M</div>
          <div className="text-green-200 text-sm">Money Saved</div>
        </div>
      </div>

      {/* Community Posts */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Community Feed</h2>
        {communityPosts.map(post => (
          <div key={post.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{post.author.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{post.author}</h3>
                  <p className="text-purple-300 text-sm">{post.timestamp}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                {post.category.toUpperCase()}
              </span>
            </div>
            
            <h4 className="text-white font-medium text-lg mb-2">{post.title}</h4>
            <p className="text-purple-200 mb-4">{post.content}</p>
            
            <div className="flex items-center space-x-6 text-sm text-purple-300">
              <button className="flex items-center space-x-2 hover:text-purple-100 transition-colors">
                <ThumbsUp size={16} />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-purple-100 transition-colors">
                <MessageCircle size={16} />
                <span>{post.comments}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Scam Reports</h2>
      <p className="text-purple-200">Community-verified scam reports analyzed by AI</p>
      
      <div className="space-y-4">
        {scamReports.map(report => (
          <div key={report.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-white font-semibold text-lg">{report.title}</h3>
                  {report.verified && (
                    <CheckCircle className="text-green-400" size={20} />
                  )}
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <span className="text-purple-300">by {report.reportedBy}</span>
                  <span className="text-purple-400">{report.timestamp}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(report.riskLevel)}`}>
                  {report.riskLevel.toUpperCase()} RISK
                </span>
                <span className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-xs font-medium">
                  {report.category.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>
            
            <p className="text-purple-200 mb-4">{report.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 text-sm text-purple-300">
                <button className="flex items-center space-x-2 hover:text-purple-100 transition-colors">
                  <ThumbsUp size={16} />
                  <span>{report.likes}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-purple-100 transition-colors">
                  <MessageCircle size={16} />
                  <span>{report.comments}</span>
                </button>
              </div>
              
              {report.riskLevel === 'high' && (
                <div className="flex items-center space-x-2 text-red-400">
                  <AlertTriangle size={16} />
                  <span className="text-sm font-medium">High Priority</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUpload = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Upload className="mx-auto mb-4 text-purple-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Report a Scam</h2>
        <p className="text-purple-200">Help protect the community by sharing suspicious activity</p>
      </div>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="space-y-6">
          <div>
            <label className="block text-white font-semibold mb-2">Scam Title</label>
            <input
              type="text"
              value={newReport.title}
              onChange={(e) => setNewReport(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Fake Amazon security alert"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-purple-300 border border-white/30 focus:border-purple-400 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-2">Category</label>
            <select
              value={newReport.category}
              onChange={(e) => setNewReport(prev => ({ ...prev, category: e.target.value as ScamReport['category'] }))}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-purple-400 focus:outline-none"
            >
              <option value="phishing">Phishing</option>
              <option value="investment">Investment Scam</option>
              <option value="romance">Romance Scam</option>
              <option value="tech_support">Tech Support Scam</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-2">Description</label>
            <textarea
              value={newReport.description}
              onChange={(e) => setNewReport(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the scam attempt, including any suspicious messages, websites, or contact information..."
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-purple-300 border border-white/30 focus:border-purple-400 focus:outline-none"
              rows={6}
            />
          </div>
          
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <AlertTriangle className="text-yellow-400" size={20} />
              <h3 className="text-yellow-200 font-semibold">Privacy Notice</h3>
            </div>
            <p className="text-yellow-200/80 text-sm">
              Your report will be analyzed by AI and shared anonymously with the community. 
              Please don't include personal information like real names, phone numbers, or addresses.
            </p>
          </div>
          
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Camera className="text-blue-400" size={20} />
              <h3 className="text-blue-200 font-semibold">Optional: Add Screenshots</h3>
            </div>
            <p className="text-blue-200/80 text-sm mb-3">
              Screenshots can help others recognize similar scams. Make sure to blur any personal information.
            </p>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600/30 text-blue-200 rounded-lg hover:bg-blue-600/50 transition-colors">
              <Camera size={16} />
              <span>Upload Screenshot</span>
            </button>
          </div>
          
          <button
            onClick={handleReportSubmit}
            disabled={!newReport.title || !newReport.description}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'feed':
        return renderFeed();
      case 'reports':
        return renderReports();
      case 'upload':
        return renderUpload();
      default:
        return renderFeed();
    }
  };

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
          
          <div className="flex items-center space-x-2">
            <Users className="text-purple-400" size={20} />
            <span className="text-white font-semibold">FinVerse Community</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          {[
            { id: 'feed', label: 'Community Feed', icon: Users },
            { id: 'reports', label: 'Scam Reports', icon: Flag },
            { id: 'upload', label: 'Report Scam', icon: Upload }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};
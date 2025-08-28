import React, { useState } from 'react';
import { ArrowLeft, Settings as SettingsIcon, Globe, Shield, Bell, User, Download, Trash2, RefreshCw, Volume2, VolumeX } from 'lucide-react';

interface SettingsProps {
  onNavigate: (screen: 'dashboard' | 'game' | 'challenge' | 'community' | 'settings') => void;
}

export const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  const [settings, setSettings] = useState({
    language: 'english',
    difficulty: 'intermediate',
    privacy: 'normal',
    notifications: {
      dailyChallenges: true,
      achievements: true,
      communityUpdates: false,
      marketingEmails: false
    },
    audio: {
      soundEffects: true,
      backgroundMusic: false,
      voiceNarration: false
    },
    display: {
      theme: 'dark',
      animations: true,
      reducedMotion: false
    }
  });

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const updateDirectSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const exportProgress = () => {
    const progressData = {
      settings,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const dataStr = JSON.stringify(progressData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'finverse-progress.json';
    link.click();
    
    URL.revokeObjectURL(url);
    alert('Progress exported successfully!');
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
      localStorage.clear();
      alert('Progress reset successfully! Please refresh the page.');
    }
  };

  const deleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? All data will be permanently lost.')) {
      if (confirm('This is your final warning. Delete account permanently?')) {
        localStorage.clear();
        alert('Account deleted successfully!');
        window.location.reload();
      }
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
            <SettingsIcon className="text-purple-400" size={20} />
            <span className="text-white font-semibold">Settings</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Language & Localization */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="text-blue-400" size={24} />
            <h2 className="text-xl font-bold text-white">Language & Region</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">Language</label>
              <select
                value={settings.language}
                onChange={(e) => updateDirectSetting('language', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-purple-400 focus:outline-none"
              >
                <option value="english">English</option>
                <option value="vietnamese">Tiếng Việt</option>
                <option value="thai">ไทย</option>
                <option value="malay">Bahasa Melayu</option>
                <option value="indonesian">Bahasa Indonesia</option>
              </select>
            </div>
            
            <div>
              <label className="block text-white font-semibold mb-2">Difficulty Level</label>
              <select
                value={settings.difficulty}
                onChange={(e) => updateDirectSetting('difficulty', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-purple-400 focus:outline-none"
              >
                <option value="basic">Basic - Simple scenarios</option>
                <option value="intermediate">Intermediate - Moderate complexity</option>
                <option value="advanced">Advanced - Complex real-world cases</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="text-green-400" size={24} />
            <h2 className="text-xl font-bold text-white">Privacy & Security</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">Privacy Level</label>
              <select
                value={settings.privacy}
                onChange={(e) => updateDirectSetting('privacy', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-purple-400 focus:outline-none"
              >
                <option value="strict">Strict - Minimal data collection</option>
                <option value="normal">Normal - Standard privacy</option>
                <option value="relaxed">Relaxed - Enhanced features</option>
              </select>
            </div>
            
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
              <h3 className="text-yellow-200 font-semibold mb-2">Data Usage</h3>
              <ul className="text-yellow-200/80 text-sm space-y-1">
                <li>• Progress and scores are stored locally</li>
                <li>• Anonymous usage analytics help improve the game</li>
                <li>• No personal information is shared with third parties</li>
                <li>• You can export or delete your data anytime</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="text-orange-400" size={24} />
            <h2 className="text-xl font-bold text-white">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
                <button
                  onClick={() => updateSetting('notifications', key, !value)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Audio Settings */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-4">
            {settings.audio.soundEffects ? (
              <Volume2 className="text-purple-400" size={24} />
            ) : (
              <VolumeX className="text-gray-400" size={24} />
            )}
            <h2 className="text-xl font-bold text-white">Audio Settings</h2>
          </div>
          
          <div className="space-y-4">
            {Object.entries(settings.audio).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
                <button
                  onClick={() => updateSetting('audio', key, !value)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Account Management */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-4">
            <User className="text-cyan-400" size={24} />
            <h2 className="text-xl font-bold text-white">Account Management</h2>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={exportProgress}
              className="w-full flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              <Download size={20} />
              <span>Export Progress Data</span>
            </button>
            
            <button
              onClick={resetProgress}
              className="w-full flex items-center justify-center space-x-3 bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              <RefreshCw size={20} />
              <span>Reset All Progress</span>
            </button>
            
            <button
              onClick={deleteAccount}
              className="w-full flex items-center justify-center space-x-3 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              <Trash2 size={20} />
              <span>Delete Account</span>
            </button>
          </div>
          
          <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
            <h3 className="text-red-200 font-semibold mb-2">⚠️ Warning</h3>
            <p className="text-red-200/80 text-sm">
              Resetting progress or deleting your account will permanently remove all your data, 
              including coins, achievements, and learning progress. This action cannot be undone.
            </p>
          </div>
        </div>

        {/* App Information */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4">App Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-purple-300">Version:</span>
              <span className="text-white ml-2">1.0.0</span>
            </div>
            <div>
              <span className="text-purple-300">Last Updated:</span>
              <span className="text-white ml-2">January 2024</span>
            </div>
            <div>
              <span className="text-purple-300">Platform:</span>
              <span className="text-white ml-2">Web Application</span>
            </div>
            <div>
              <span className="text-purple-300">Developer:</span>
              <span className="text-white ml-2">FinVerse Team</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-purple-200 text-sm">
              FinVerse is designed to help young adults learn financial literacy and cybersecurity 
              through interactive gaming experiences. Your privacy and security are our top priorities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
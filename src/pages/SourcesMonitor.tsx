import React from 'react';
import { Radio, Activity, Clock, Settings, Play, Pause, AlertCircle, CheckCircle } from 'lucide-react';

interface Source {
  id: string;
  name: string;
  type: 'darkweb' | 'telegram' | 'discord' | 'forum' | 'market' | 'social';
  description: string;
  status: 'active' | 'inactive' | 'error';
  scraperCount: number;
  lastScrape: string;
  enabled: boolean;
  dataPoints: number;
  threatCount: number;
}

const mockSources: Source[] = [
  {
    id: '1',
    name: 'Dark Web Forums',
    type: 'darkweb',
    description: 'Monitoring cybercriminal forums and underground marketplaces',
    status: 'active',
    scraperCount: 12,
    lastScrape: '2 minutes ago',
    enabled: true,
    dataPoints: 1247,
    threatCount: 23
  },
  {
    id: '2',
    name: 'Telegram Channels',
    type: 'telegram',
    description: 'Real-time monitoring of threat actor Telegram channels',
    status: 'active',
    scraperCount: 45,
    lastScrape: '30 seconds ago',
    enabled: true,
    dataPoints: 3892,
    threatCount: 67
  },
  {
    id: '3',
    name: 'Ransomware Sites',
    type: 'darkweb',
    description: 'Tracking ransomware gang leak sites and victim listings',
    status: 'active',
    scraperCount: 8,
    lastScrape: '5 minutes ago',
    enabled: true,
    dataPoints: 456,
    threatCount: 12
  },
  {
    id: '4',
    name: 'Discord Servers',
    type: 'discord',
    description: 'Monitoring cybercriminal Discord communities',
    status: 'error',
    scraperCount: 3,
    lastScrape: '2 hours ago',
    enabled: true,
    dataPoints: 234,
    threatCount: 4
  },
  {
    id: '5',
    name: 'Hacker Forums',
    type: 'forum',
    description: 'Traditional hacker forums and bulletin boards',
    status: 'active',
    scraperCount: 15,
    lastScrape: '1 minute ago',
    enabled: true,
    dataPoints: 2156,
    threatCount: 34
  },
  {
    id: '6',
    name: 'Paste Sites',
    type: 'social',
    description: 'Monitoring paste sites for leaked credentials and data',
    status: 'inactive',
    scraperCount: 0,
    lastScrape: '6 hours ago',
    enabled: false,
    dataPoints: 89,
    threatCount: 2
  }
];

export const SourcesMonitor: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-400" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      case 'error': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'darkweb': return '🌐';
      case 'telegram': return '📱';
      case 'discord': return '🎮';
      case 'forum': return '💬';
      case 'market': return '🛒';
      case 'social': return '📝';
      default: return '📡';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'darkweb': return 'from-purple-500/20 to-indigo-600/20 border-purple-500/30';
      case 'telegram': return 'from-blue-500/20 to-cyan-600/20 border-blue-500/30';
      case 'discord': return 'from-indigo-500/20 to-purple-600/20 border-indigo-500/30';
      case 'forum': return 'from-amber-500/20 to-orange-600/20 border-amber-500/30';
      case 'market': return 'from-red-500/20 to-pink-600/20 border-red-500/30';
      case 'social': return 'from-emerald-500/20 to-green-600/20 border-emerald-500/30';
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
    }
  };

  const totalScrapers = mockSources.reduce((sum, source) => sum + source.scraperCount, 0);
  const activeScrapers = mockSources.filter(s => s.status === 'active').reduce((sum, source) => sum + source.scraperCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Sources Monitor
          </h1>
          <p className="text-gray-400 mt-1">Monitor data collection across all intelligence sources</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-400 font-medium">{activeScrapers}/{totalScrapers} Active</span>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-cyan-400">{totalScrapers}</div>
          <div className="text-sm text-gray-400">Total Scrapers</div>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">{activeScrapers}</div>
          <div className="text-sm text-gray-400">Active Now</div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-amber-400">8.2K</div>
          <div className="text-sm text-gray-400">Data Points Today</div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-400">142</div>
          <div className="text-sm text-gray-400">Threats Detected</div>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockSources.map((source) => (
          <div
            key={source.id}
            className={`bg-gradient-to-br ${getTypeColor(source.type)} backdrop-blur-xl border rounded-xl p-6 relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getTypeIcon(source.type)}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{source.name}</h3>
                    <p className="text-sm text-gray-400 capitalize">{source.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(source.status)}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(source.status)}`}>
                    {source.status}
                  </span>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4">
                {source.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-800/30 rounded-lg p-3">
                  <div className="text-lg font-bold text-white">{source.scraperCount}</div>
                  <div className="text-xs text-gray-400">Active Scrapers</div>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-3">
                  <div className="text-lg font-bold text-cyan-400">{source.dataPoints}</div>
                  <div className="text-xs text-gray-400">Data Points</div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-400">
                  Last scrape: <span className="text-white">{source.lastScrape}</span>
                </div>
                <div className="text-sm">
                  <span className="text-red-400 font-medium">{source.threatCount}</span>
                  <span className="text-gray-400"> threats</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${source.enabled ? 'bg-emerald-500' : 'bg-gray-600'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${source.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                  <span className="text-sm text-gray-400">
                    {source.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                    {source.status === 'active' ? 
                      <Pause className="w-4 h-4 text-gray-400 hover:text-white" /> :
                      <Play className="w-4 h-4 text-gray-400 hover:text-emerald-400" />
                    }
                  </button>
                  <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                    <Settings className="w-4 h-4 text-gray-400 hover:text-cyan-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Health Check Status */}
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Radio className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-semibold text-white">System Health</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">API Health</span>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            </div>
            <div className="text-white font-medium">Operational</div>
            <div className="text-xs text-gray-400">99.9% uptime</div>
          </div>
          
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Data Processing</span>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            </div>
            <div className="text-white font-medium">Normal</div>
            <div className="text-xs text-gray-400">2.3s avg latency</div>
          </div>
          
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Storage</span>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            </div>
            <div className="text-white font-medium">78% Used</div>
            <div className="text-xs text-gray-400">156GB available</div>
          </div>
        </div>
      </div>
    </div>
  );
};
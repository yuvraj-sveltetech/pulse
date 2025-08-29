import React, { useState } from 'react';
import { Shield, Filter, Search, Eye, Clock, AlertTriangle, ExternalLink, BookmarkPlus } from 'lucide-react';

interface Threat {
  id: string;
  title: string;
  source: string;
  sourceType: 'telegram' | 'darkweb' | 'forum' | 'market' | 'discord';
  timestamp: string;
  preview: string;
  riskScore: number;
  tags: string[];
  iocs: string[];
}

const mockThreats: Threat[] = [
  {
    id: '1',
    title: 'LockBit Ransomware Group Claims Major Healthcare Breach',
    source: 'lockbitsupp Telegram Channel',
    sourceType: 'telegram',
    timestamp: '3 minutes ago',
    preview: 'The LockBit ransomware group has published a new victim on their leak site, claiming to have breached a major healthcare provider. The group threatens to release patient data if ransom demands are not met within 72 hours...',
    riskScore: 9.2,
    tags: ['ransomware', 'healthcare', 'data breach', 'lockbit'],
    iocs: ['lockbitsupp.onion', '192.168.1.100']
  },
  {
    id: '2',
    title: 'New Stealer Malware "DataHarvester" Advertised on Underground Forum',
    source: 'XSS.is Forum',
    sourceType: 'forum',
    timestamp: '12 minutes ago',
    preview: 'A sophisticated new information stealer called DataHarvester is being advertised on a prominent underground forum. The malware claims to have advanced evasion capabilities and targets cryptocurrency wallets, browser credentials, and 2FA codes...',
    riskScore: 8.5,
    tags: ['malware', 'stealer', 'cryptocurrency', 'credentials'],
    iocs: ['dataharvester.exe', 'c2.darkserver.onion']
  },
  {
    id: '3',
    title: 'Corporate Database Dump: 150K Employee Records',
    source: 'RaidForums Mirror',
    sourceType: 'forum',
    timestamp: '28 minutes ago',
    preview: 'A database containing personal information of 150,000 employees from a Fortune 500 company has been leaked on a cybercriminal forum. The data includes names, emails, phone numbers, and internal employee IDs...',
    riskScore: 7.8,
    tags: ['data leak', 'corporate', 'pii', 'employee data'],
    iocs: ['company_employees.sql', 'leaked_db.zip']
  },
  {
    id: '4',
    title: 'Zero-Day Exploit for Enterprise VPN Software Available',
    source: 'Exploit Market',
    sourceType: 'market',
    timestamp: '45 minutes ago',
    preview: 'A zero-day exploit targeting a popular enterprise VPN solution is being sold on a dark web marketplace. The seller claims the exploit provides remote code execution capabilities and affects over 10,000 installations worldwide...',
    riskScore: 9.5,
    tags: ['zero-day', 'vpn', 'rce', 'enterprise'],
    iocs: ['vpn_exploit.py', 'exploit-vendor.onion']
  },
  {
    id: '5',
    title: 'Phishing Kit Targeting Banking Customers Distributed',
    source: 'Criminal Discord Server',
    sourceType: 'discord',
    timestamp: '1 hour ago',
    preview: 'A comprehensive phishing kit designed to target customers of major banks is being distributed through private Discord channels. The kit includes realistic login pages, SMS bypasses, and credential harvesting capabilities...',
    riskScore: 6.9,
    tags: ['phishing', 'banking', 'fraud', 'discord'],
    iocs: ['banking_phish.zip', 'fake-bank-login.com']
  }
];

export const ThreatFeed: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);

  const filteredThreats = mockThreats.filter(threat => {
    const matchesFilter = selectedFilter === 'all' || threat.sourceType === selectedFilter;
    const matchesSearch = threat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         threat.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getSeverityColor = (score: number) => {
    if (score >= 9) return 'text-red-400 bg-red-500/20 border-red-500/30';
    if (score >= 7) return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
    if (score >= 5) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
  };

  const getSourceIcon = (sourceType: string) => {
    switch (sourceType) {
      case 'telegram': return '📱';
      case 'darkweb': return '🌐';
      case 'forum': return '💬';
      case 'market': return '🛒';
      case 'discord': return '🎮';
      default: return '📡';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Threat Intelligence Feed
          </h1>
          <p className="text-gray-400 mt-1">Real-time threats from dark web sources</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Auto-refresh:</span>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm text-emerald-400">Active</span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search threats, IOCs, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Sources</option>
            <option value="telegram">Telegram</option>
            <option value="darkweb">Dark Web</option>
            <option value="forum">Forums</option>
            <option value="market">Markets</option>
            <option value="discord">Discord</option>
          </select>
        </div>
      </div>

      {/* Threat Cards */}
      <div className="space-y-4">
        {filteredThreats.map((threat) => (
          <div
            key={threat.id}
            className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-300 cursor-pointer group"
            onClick={() => setSelectedThreat(threat)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-lg">{getSourceIcon(threat.sourceType)}</span>
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {threat.title}
                  </h3>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                  <span>Source: {threat.source}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{threat.timestamp}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getSeverityColor(threat.riskScore)}`}>
                  Risk: {threat.riskScore}/10
                </span>
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  <BookmarkPlus className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
                </button>
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  <ExternalLink className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
                </button>
              </div>
            </div>

            <p className="text-gray-300 mb-4 line-clamp-3">
              {threat.preview}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {threat.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-md border border-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>IOCs: {threat.iocs.length}</span>
                <Eye className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Threat Detail Modal */}
      {selectedThreat && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{selectedThreat.title}</h2>
                <button
                  onClick={() => setSelectedThreat(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Threat Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Source:</span>
                      <span className="text-white">{selectedThreat.source}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Risk Score:</span>
                      <span className={`font-medium ${selectedThreat.riskScore >= 9 ? 'text-red-400' : selectedThreat.riskScore >= 7 ? 'text-amber-400' : 'text-yellow-400'}`}>
                        {selectedThreat.riskScore}/10
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Detected:</span>
                      <span className="text-white">{selectedThreat.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">IOCs</h3>
                  <div className="space-y-1">
                    {selectedThreat.iocs.map((ioc) => (
                      <div key={ioc} className="px-3 py-1 bg-gray-800/50 rounded-md font-mono text-sm text-cyan-400">
                        {ioc}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Full Content</h3>
                <div className="bg-gray-800/30 rounded-lg p-4 text-gray-300">
                  {selectedThreat.preview}
                </div>
              </div>
              
              <div className="flex justify-between">
                <div className="flex flex-wrap gap-2">
                  {selectedThreat.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-md border border-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors">
                    Add to Watchlist
                  </button>
                  <button className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg transition-colors">
                    Create Alert
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
import React from 'react';
import { Shield, Clock, AlertTriangle, ExternalLink } from 'lucide-react';

interface ThreatItem {
  id: string;
  title: string;
  source: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  preview: string;
}

const mockThreats: ThreatItem[] = [
  {
    id: '1',
    title: 'Ransomware Gang Claims Breach of Healthcare Provider',
    source: 'Dark Web Forum',
    timestamp: '2 minutes ago',
    severity: 'critical',
    preview: 'Major healthcare provider data allegedly compromised, patient records at risk...'
  },
  {
    id: '2',
    title: 'New Stealer Malware Targeting Cryptocurrency Wallets',
    source: 'Telegram Channel',
    timestamp: '15 minutes ago',
    severity: 'high',
    preview: 'Advanced stealer identified with capabilities to extract wallet credentials...'
  },
  {
    id: '3',
    title: 'Corporate Email Database Leaked on Underground Market',
    source: 'Dark Market',
    timestamp: '32 minutes ago',
    severity: 'medium',
    preview: 'Database containing 50K+ corporate email addresses discovered for sale...'
  },
  {
    id: '4',
    title: 'Zero-Day Exploit Advertised on Hacker Forum',
    source: 'Hacker Forum',
    timestamp: '1 hour ago',
    severity: 'high',
    preview: 'Unpatched vulnerability in popular enterprise software being sold...'
  },
  {
    id: '5',
    title: 'Credential Stuffing Campaign Targets Banking Sector',
    source: 'Intelligence Feed',
    timestamp: '2 hours ago',
    severity: 'medium',
    preview: 'Large-scale automated login attempts detected across multiple banks...'
  }
];

export const ThreatFeedWidget: React.FC = () => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default: return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-semibold text-white">Live Threat Feed</h3>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </div>
        <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {mockThreats.map((threat) => (
          <div
            key={threat.id}
            className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 hover:bg-gray-800/50 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors">
                  {threat.title}
                </h4>
                <div className="flex items-center space-x-3 mt-2 text-xs text-gray-400">
                  <span>{threat.source}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{threat.timestamp}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(threat.severity)}`}>
                  {threat.severity.toUpperCase()}
                </span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </div>
            </div>
            <p className="text-gray-400 text-sm line-clamp-2">
              {threat.preview}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Sources monitored: 847</span>
          <span className="text-emerald-400">Real-time updates active</span>
        </div>
      </div>
    </div>
  );
};
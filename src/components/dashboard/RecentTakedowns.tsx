import React from 'react';
import { Shield, Calendar, ExternalLink } from 'lucide-react';

export const RecentTakedowns: React.FC = () => {
  const takedowns = [
    {
      title: 'DarkMarket Seized',
      description: 'International law enforcement operation shuts down major dark web marketplace',
      date: '2 days ago',
      impact: 'High',
      type: 'Marketplace'
    },
    {
      title: 'Ransomware Infrastructure Disrupted',
      description: 'Multiple C2 servers taken offline, affecting REvil operations',
      date: '5 days ago',
      impact: 'Critical',
      type: 'Ransomware'
    },
    {
      title: 'Phishing Campaign Neutralized',
      description: 'Banking trojan distribution network dismantled by cybersecurity firms',
      date: '1 week ago',
      impact: 'Medium',
      type: 'Phishing'
    },
    {
      title: 'Credential Marketplace Shutdown',
      description: 'Popular forum selling stolen credentials taken down',
      date: '2 weeks ago',
      impact: 'High',
      type: 'Forum'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical': return 'text-red-400 bg-red-500/20';
      case 'High': return 'text-amber-400 bg-amber-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-emerald-400 bg-emerald-500/20';
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="w-6 h-6 text-cyan-400" />
        <h3 className="text-xl font-semibold text-white">Recent Takedowns</h3>
      </div>

      <div className="space-y-4">
        {takedowns.map((takedown, index) => (
          <div
            key={index}
            className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 hover:bg-gray-800/50 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors mb-1">
                  {takedown.title}
                </h4>
                <p className="text-gray-400 text-xs mb-2">
                  {takedown.description}
                </p>
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span>{takedown.date}</span>
                  </div>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">{takedown.type}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(takedown.impact)}`}>
                  {takedown.impact}
                </span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700 text-center">
        <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
          View All Takedown Reports
        </button>
      </div>
    </div>
  );
};
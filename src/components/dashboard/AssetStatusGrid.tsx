import React from 'react';
import { Eye, CheckCircle, AlertTriangle, XCircle, Plus } from 'lucide-react';

export const AssetStatusGrid: React.FC = () => {
  const assets = [
    { name: 'company.com', type: 'Domain', status: 'safe', lastCheck: '2 min ago' },
    { name: 'admin@company.com', type: 'Email', status: 'at_risk', lastCheck: '5 min ago' },
    { name: 'CompanyBrand', type: 'Brand', status: 'safe', lastCheck: '1 min ago' },
    { name: 'ceo@company.com', type: 'Email', status: 'compromised', lastCheck: '12 min ago' },
    { name: 'api.company.com', type: 'Domain', status: 'safe', lastCheck: '3 min ago' },
    { name: 'CompanyName', type: 'Keyword', status: 'at_risk', lastCheck: '8 min ago' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'at_risk': return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'compromised': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'from-emerald-500/20 to-green-600/20 border-emerald-500/30';
      case 'at_risk': return 'from-amber-500/20 to-orange-600/20 border-amber-500/30';
      case 'compromised': return 'from-red-500/20 to-red-600/20 border-red-500/30';
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Eye className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-semibold text-white">Asset Status</h3>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors text-sm">
          <Plus className="w-4 h-4" />
          <span>Add Asset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {assets.map((asset, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${getStatusColor(asset.status)} backdrop-blur-xl border rounded-lg p-4 hover:shadow-lg transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getStatusIcon(asset.status)}
                <span className="text-gray-400 text-xs uppercase tracking-wide">
                  {asset.type}
                </span>
              </div>
              <span className="text-xs text-gray-400">{asset.lastCheck}</span>
            </div>
            
            <div className="mb-2">
              <h4 className="text-white font-medium text-sm truncate">
                {asset.name}
              </h4>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium capitalize ${
                asset.status === 'safe' ? 'text-emerald-400' :
                asset.status === 'at_risk' ? 'text-amber-400' :
                'text-red-400'
              }`}>
                {asset.status.replace('_', ' ')}
              </span>
              <button className="text-cyan-400 hover:text-cyan-300 text-xs">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-emerald-400 font-bold text-lg">12</div>
            <div className="text-gray-400 text-xs">Safe</div>
          </div>
          <div>
            <div className="text-amber-400 font-bold text-lg">3</div>
            <div className="text-gray-400 text-xs">At Risk</div>
          </div>
          <div>
            <div className="text-red-400 font-bold text-lg">1</div>
            <div className="text-gray-400 text-xs">Compromised</div>
          </div>
        </div>
      </div>
    </div>
  );
};
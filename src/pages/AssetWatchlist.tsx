import React, { useState } from 'react';
import { Eye, Plus, Trash2, Edit3, CheckCircle, AlertTriangle, XCircle, Shield } from 'lucide-react';

interface Asset {
  id: string;
  type: 'domain' | 'email' | 'keyword' | 'brand' | 'ip';
  value: string;
  status: 'safe' | 'at_risk' | 'compromised';
  lastSeen?: string;
  alertCount: number;
  tags: string[];
  watchEnabled: boolean;
  dateAdded: string;
}

const mockAssets: Asset[] = [
  {
    id: '1',
    type: 'domain',
    value: 'company.com',
    status: 'safe',
    lastSeen: '2 hours ago',
    alertCount: 0,
    tags: ['primary', 'production'],
    watchEnabled: true,
    dateAdded: '2024-01-15'
  },
  {
    id: '2',
    type: 'email',
    value: 'ceo@company.com',
    status: 'compromised',
    lastSeen: '12 minutes ago',
    alertCount: 3,
    tags: ['executive', 'high-value'],
    watchEnabled: true,
    dateAdded: '2024-01-10'
  },
  {
    id: '3',
    type: 'keyword',
    value: 'CompanySecrets',
    status: 'at_risk',
    lastSeen: '45 minutes ago',
    alertCount: 1,
    tags: ['confidential', 'internal'],
    watchEnabled: true,
    dateAdded: '2024-01-12'
  },
  {
    id: '4',
    type: 'brand',
    value: 'CompanyBrand',
    status: 'safe',
    alertCount: 0,
    tags: ['trademark', 'brand'],
    watchEnabled: false,
    dateAdded: '2024-01-08'
  }
];

export const AssetWatchlist: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedType, setSelectedType] = useState('domain');
  const [assetValue, setAssetValue] = useState('');
  const [assetTags, setAssetTags] = useState('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'at_risk': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'compromised': return <XCircle className="w-5 h-5 text-red-400" />;
      default: return <Shield className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      case 'at_risk': return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
      case 'compromised': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'domain': return '🌐';
      case 'email': return '📧';
      case 'keyword': return '🔍';
      case 'brand': return '🏷️';
      case 'ip': return '🖥️';
      default: return '📋';
    }
  };

  const handleAddAsset = () => {
    // Handle adding new asset
    setShowAddModal(false);
    setAssetValue('');
    setAssetTags('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Asset Watchlist
          </h1>
          <p className="text-gray-400 mt-1">Monitor your critical assets across the dark web</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
        >
          <Plus className="w-4 h-4" />
          <span>Add Asset</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">{mockAssets.length}</div>
          <div className="text-sm text-gray-400">Total Assets</div>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">{mockAssets.filter(a => a.status === 'safe').length}</div>
          <div className="text-sm text-gray-400">Safe</div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-amber-400">{mockAssets.filter(a => a.status === 'at_risk').length}</div>
          <div className="text-sm text-gray-400">At Risk</div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-400">{mockAssets.filter(a => a.status === 'compromised').length}</div>
          <div className="text-sm text-gray-400">Compromised</div>
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h3 className="text-xl font-semibold text-white">Monitored Assets</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Asset</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Type</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Last Seen</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Alerts</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Watch</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockAssets.map((asset) => (
                <tr key={asset.id} className="border-t border-gray-800 hover:bg-gray-800/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getTypeIcon(asset.type)}</span>
                      <div>
                        <div className="text-white font-medium">{asset.value}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {asset.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-300 capitalize">{asset.type}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(asset.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(asset.status)}`}>
                        {asset.status.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-400 text-sm">
                    {asset.lastSeen || 'Never'}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-medium ${asset.alertCount > 0 ? 'text-red-400' : 'text-gray-400'}`}>
                      {asset.alertCount}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${asset.watchEnabled ? 'bg-emerald-500' : 'bg-gray-600'}`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${asset.watchEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-700 rounded">
                        <Edit3 className="w-4 h-4 text-gray-400 hover:text-cyan-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-700 rounded">
                        <Eye className="w-4 h-4 text-gray-400 hover:text-cyan-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-700 rounded">
                        <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Add New Asset</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Asset Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="domain">Domain</option>
                  <option value="email">Email</option>
                  <option value="keyword">Keyword</option>
                  <option value="brand">Brand</option>
                  <option value="ip">IP Address</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Asset Value</label>
                <input
                  type="text"
                  value={assetValue}
                  onChange={(e) => setAssetValue(e.target.value)}
                  placeholder="Enter the asset to monitor..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={assetTags}
                  onChange={(e) => setAssetTags(e.target.value)}
                  placeholder="production, critical, etc."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-700 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAsset}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-semibold rounded-lg transition-all duration-300"
              >
                Add Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
import React, { useState } from 'react';
import { AlertTriangle, Clock, User, CheckCircle, XCircle, Eye, Filter } from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  asset: string;
  source: string;
  status: 'open' | 'investigating' | 'resolved';
  assignee?: string;
  timestamp: string;
  description: string;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Domain mentioned in ransomware leak site',
    severity: 'critical',
    asset: 'company.com',
    source: 'LockBit Leak Site',
    status: 'open',
    timestamp: '5 minutes ago',
    description: 'Your domain was mentioned as a victim on the LockBit ransomware leak site'
  },
  {
    id: '2',
    title: 'Employee credentials found in data dump',
    severity: 'high',
    asset: 'john.doe@company.com',
    source: 'Underground Forum',
    status: 'investigating',
    assignee: 'Sarah Chen',
    timestamp: '2 hours ago',
    description: 'Employee email and password hash discovered in leaked database'
  },
  {
    id: '3',
    title: 'Brand impersonation detected',
    severity: 'medium',
    asset: 'CompanyBrand',
    source: 'Phishing Site',
    status: 'resolved',
    assignee: 'Mike Johnson',
    timestamp: '1 day ago',
    description: 'Fake website using company branding for phishing campaign'
  },
  {
    id: '4',
    title: 'API endpoint exposed in paste site',
    severity: 'high',
    asset: 'api.company.com',
    source: 'Pastebin',
    status: 'open',
    timestamp: '3 hours ago',
    description: 'Internal API endpoints and potential access tokens found in public paste'
  }
];

export const Alerts: React.FC = () => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'all' || alert.status === selectedStatus;
    return matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default: return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-400 bg-red-500/20';
      case 'investigating': return 'text-amber-400 bg-amber-500/20';
      case 'resolved': return 'text-emerald-400 bg-emerald-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertTriangle className="w-4 h-4" />;
      case 'investigating': return <Eye className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <XCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Security Alerts
          </h1>
          <p className="text-gray-400 mt-1">Monitor and manage security incidents</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm text-red-400 font-medium">{mockAlerts.filter(a => a.status === 'open').length} Open</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-sm text-amber-400 font-medium">{mockAlerts.filter(a => a.status === 'investigating').length} Investigating</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400 text-sm">Severity:</span>
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-gray-400 text-sm">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getSeverityColor(alert.severity)}`}>
                    {alert.severity.toUpperCase()}
                  </span>
                  <h3 className="text-lg font-semibold text-white">
                    {alert.title}
                  </h3>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                  <span>Asset: <span className="text-cyan-400 font-medium">{alert.asset}</span></span>
                  <span>Source: {alert.source}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(alert.status)}`}>
                  {getStatusIcon(alert.status)}
                  <span className="text-sm font-medium capitalize">{alert.status}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 mb-4">
              {alert.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {alert.assignee && (
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <User className="w-4 h-4" />
                    <span>Assigned to: <span className="text-white">{alert.assignee}</span></span>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                {alert.status === 'open' && (
                  <>
                    <button className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg transition-colors text-sm">
                      Investigate
                    </button>
                    <button className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors text-sm">
                      Assign
                    </button>
                  </>
                )}
                {alert.status === 'investigating' && (
                  <button className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors text-sm">
                    Resolve
                  </button>
                )}
                <button className="px-4 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-400 rounded-lg transition-colors text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-400">2</div>
          <div className="text-sm text-gray-400">Critical Alerts</div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-amber-400">3</div>
          <div className="text-sm text-gray-400">High Priority</div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">1</div>
          <div className="text-sm text-gray-400">Medium Priority</div>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">12</div>
          <div className="text-sm text-gray-400">Resolved Today</div>
        </div>
      </div>
    </div>
  );
};
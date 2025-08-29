import React from 'react';
import { AlertTriangle, Shield, Activity } from 'lucide-react';

interface ThreatLevelGaugeProps {
  currentLevel: number; // 0-100
}

export const ThreatLevelGauge: React.FC<ThreatLevelGaugeProps> = ({ currentLevel }) => {
  const getStatusColor = (level: number) => {
    if (level >= 80) return { color: 'text-red-400', bg: 'from-red-500/20 to-red-600/20', border: 'border-red-500/30' };
    if (level >= 60) return { color: 'text-amber-400', bg: 'from-amber-500/20 to-orange-600/20', border: 'border-amber-500/30' };
    if (level >= 40) return { color: 'text-yellow-400', bg: 'from-yellow-500/20 to-amber-600/20', border: 'border-yellow-500/30' };
    return { color: 'text-emerald-400', bg: 'from-emerald-500/20 to-green-600/20', border: 'border-emerald-500/30' };
  };

  const getStatusText = (level: number) => {
    if (level >= 80) return 'CRITICAL';
    if (level >= 60) return 'HIGH';
    if (level >= 40) return 'MEDIUM';
    return 'LOW';
  };

  const status = getStatusColor(currentLevel);
  const statusText = getStatusText(currentLevel);

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (currentLevel / 100) * circumference;

  return (
    <div className={`bg-gradient-to-br ${status.bg} backdrop-blur-xl border ${status.border} rounded-xl p-6 relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Threat Level</h3>
          <Activity className={`w-5 h-5 ${status.color}`} />
        </div>

        <div className="flex items-center justify-center">
          <div className="relative w-40 h-40">
            {/* Background circle */}
            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-700"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className={`${status.color} transition-all duration-1000 ease-out drop-shadow-[0_0_8px_currentColor]`}
                strokeLinecap="round"
              />
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`text-3xl font-bold ${status.color} mb-1`}>
                {currentLevel}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                {statusText}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Last Updated</span>
            <span className="text-white">2 minutes ago</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Trend</span>
            <span className="text-red-400 flex items-center">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Increasing
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Sources Active</span>
            <span className="text-emerald-400">847</span>
          </div>
        </div>
      </div>
    </div>
  );
};
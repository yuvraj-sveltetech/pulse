import React from 'react';
import { Radio, Zap } from 'lucide-react';

export const SourceDistribution: React.FC = () => {
  const sources = [
    { name: 'Telegram', count: 342, percentage: 35, color: 'from-blue-500 to-blue-600' },
    { name: 'Dark Web Forums', count: 267, percentage: 27, color: 'from-purple-500 to-purple-600' },
    { name: 'Ransomware Sites', count: 198, percentage: 20, color: 'from-red-500 to-red-600' },
    { name: 'Marketplaces', count: 124, percentage: 13, color: 'from-amber-500 to-amber-600' },
    { name: 'Discord', count: 49, percentage: 5, color: 'from-emerald-500 to-emerald-600' }
  ];

  const total = sources.reduce((sum, source) => sum + source.count, 0);

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Radio className="w-6 h-6 text-cyan-400" />
        <h3 className="text-xl font-semibold text-white">Source Distribution</h3>
      </div>

      {/* Donut Chart */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-40 h-40">
          <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
            {sources.map((source, index) => {
              const prevPercentages = sources.slice(0, index).reduce((sum, s) => sum + s.percentage, 0);
              const circumference = 2 * Math.PI * 30;
              const strokeDasharray = `${(source.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((prevPercentages / 100) * circumference);
              
              return (
                <circle
                  key={source.name}
                  cx="50"
                  cy="50"
                  r="30"
                  fill="none"
                  strokeWidth="12"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className={`stroke-current text-blue-500`}
                  style={{
                    stroke: index === 0 ? '#3b82f6' : 
                           index === 1 ? '#8b5cf6' :
                           index === 2 ? '#ef4444' :
                           index === 3 ? '#f59e0b' : '#10b981'
                  }}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-white">{total}</div>
            <div className="text-xs text-gray-400">Total Sources</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {sources.map((source) => (
          <div key={source.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 bg-gradient-to-r ${source.color} rounded-full`} />
              <span className="text-gray-300 text-sm">{source.name}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-gray-400 text-sm">{source.percentage}%</span>
              <span className="text-white font-medium text-sm">{source.count}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700 flex items-center justify-between text-sm">
        <span className="text-gray-400">Active monitors</span>
        <span className="text-emerald-400 font-medium flex items-center">
          <Zap className="w-4 h-4 mr-1" />
          847 sources
        </span>
      </div>
    </div>
  );
};
import React from 'react';
import { Globe, Activity } from 'lucide-react';

export const ThreatHeatmap: React.FC = () => {
  const regions = [
    { name: 'North America', threats: 45, color: 'bg-red-500', percentage: 35 },
    { name: 'Europe', threats: 38, color: 'bg-amber-500', percentage: 29 },
    { name: 'Asia Pacific', threats: 32, color: 'bg-yellow-500', percentage: 25 },
    { name: 'South America', threats: 8, color: 'bg-emerald-500', percentage: 6 },
    { name: 'Africa', threats: 5, color: 'bg-blue-500', percentage: 4 },
    { name: 'Middle East', threats: 2, color: 'bg-purple-500', percentage: 1 }
  ];

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Globe className="w-6 h-6 text-cyan-400" />
        <h3 className="text-xl font-semibold text-white">Threat Origins</h3>
      </div>

      {/* World Map Visualization */}
      <div className="relative bg-gray-800/30 rounded-lg p-6 mb-6 h-48 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-20 mx-auto mb-4 relative">
            {/* Simplified world map representation */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-500 rounded-lg opacity-30" />
            <div className="absolute top-2 left-4 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <div className="absolute top-4 left-8 w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
            <div className="absolute top-6 right-6 w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            <div className="absolute bottom-4 left-6 w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
          </div>
          <p className="text-gray-400 text-sm">Interactive threat origin visualization</p>
        </div>
      </div>

      {/* Regional Breakdown */}
      <div className="space-y-3">
        {regions.map((region) => (
          <div key={region.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 ${region.color} rounded-full`} />
              <span className="text-gray-300 text-sm">{region.name}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-1 w-16 bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full ${region.color} transition-all duration-1000`}
                  style={{ width: `${region.percentage}%` }}
                />
              </div>
              <span className="text-white font-medium text-sm w-8 text-right">{region.threats}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700 flex items-center justify-between text-sm">
        <span className="text-gray-400">Total active threats</span>
        <span className="text-red-400 font-medium flex items-center">
          <Activity className="w-4 h-4 mr-1" />
          130 threats
        </span>
      </div>
    </div>
  );
};
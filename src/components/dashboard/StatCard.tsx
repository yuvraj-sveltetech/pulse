import React from 'react';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
  color: 'red' | 'emerald' | 'amber' | 'cyan';
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, trend, color }) => {
  const colorClasses = {
    red: {
      bg: 'from-red-500/20 to-red-600/20',
      border: 'border-red-500/30',
      icon: 'text-red-400',
      glow: 'shadow-red-500/10'
    },
    emerald: {
      bg: 'from-emerald-500/20 to-green-600/20',
      border: 'border-emerald-500/30',
      icon: 'text-emerald-400',
      glow: 'shadow-emerald-500/10'
    },
    amber: {
      bg: 'from-amber-500/20 to-orange-600/20',
      border: 'border-amber-500/30',
      icon: 'text-amber-400',
      glow: 'shadow-amber-500/10'
    },
    cyan: {
      bg: 'from-cyan-500/20 to-blue-600/20',
      border: 'border-cyan-500/30',
      icon: 'text-cyan-400',
      glow: 'shadow-cyan-500/10'
    }
  };

  const classes = colorClasses[color];

  return (
    <div className={`bg-gradient-to-br ${classes.bg} backdrop-blur-xl border ${classes.border} rounded-xl p-6 hover:shadow-lg ${classes.glow} transition-all duration-300 relative overflow-hidden group`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <Icon className={`w-8 h-8 ${classes.icon} drop-shadow-[0_0_6px_currentColor]`} />
          <div className="flex items-center space-x-1 text-sm">
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <span className={trend === 'up' ? 'text-emerald-400' : 'text-red-400'}>
              {change}
            </span>
          </div>
        </div>
        
        <div>
          <div className="text-2xl font-bold text-white mb-1">
            {value}
          </div>
          <div className="text-gray-400 text-sm">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
};
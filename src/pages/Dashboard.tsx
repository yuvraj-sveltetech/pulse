import React from 'react';
import { ThreatLevelGauge } from '../components/dashboard/ThreatLevelGauge';
import { StatCard } from '../components/dashboard/StatCard';
import { ThreatFeedWidget } from '../components/dashboard/ThreatFeedWidget';
import { ThreatHeatmap } from '../components/dashboard/ThreatHeatmap';
import { AssetStatusGrid } from '../components/dashboard/AssetStatusGrid';
import { RecentTakedowns } from '../components/dashboard/RecentTakedowns';
import { SourceDistribution } from '../components/dashboard/SourceDistribution';
import { Shield, Eye, AlertTriangle, Activity, Plus } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Threat Intelligence Dashboard
          </h1>
          <p className="text-gray-400 mt-1">Real-time dark web monitoring and threat detection</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
          <Plus className="w-4 h-4" />
          <span>Add Asset</span>
        </button>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Threats"
          value="247"
          change="+12%"
          icon={Shield}
          trend="up"
          color="red"
        />
        <StatCard
          title="Monitored Assets"
          value="156"
          change="+3"
          icon={Eye}
          trend="up"
          color="emerald"
        />
        <StatCard
          title="Critical Alerts"
          value="23"
          change="-8%"
          icon={AlertTriangle}
          trend="down"
          color="amber"
        />
        <StatCard
          title="Risk Score"
          value="7.2"
          change="+0.3"
          icon={Activity}
          trend="up"
          color="cyan"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Level Gauge */}
        <div className="lg:col-span-1">
          <ThreatLevelGauge currentLevel={72} />
        </div>

        {/* Live Threat Feed */}
        <div className="lg:col-span-2">
          <ThreatFeedWidget />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Heatmap */}
        <ThreatHeatmap />
        
        {/* Source Distribution */}
        <SourceDistribution />
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Status Grid */}
        <AssetStatusGrid />
        
        {/* Recent Takedowns */}
        <RecentTakedowns />
      </div>
    </div>
  );
};
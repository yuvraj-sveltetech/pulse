import React, { useState } from 'react';
import { BarChart3, Download, Calendar, Filter, PieChart, TrendingUp, FileText, Mail } from 'lucide-react';

export const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const [reportType, setReportType] = useState('all');

  const reportTemplates = [
    {
      id: 'executive',
      name: 'Executive Summary',
      description: 'High-level overview of threats and security posture',
      icon: FileText,
      frequency: 'Weekly'
    },
    {
      id: 'technical',
      name: 'Technical Analysis',
      description: 'Detailed IOCs, attack patterns, and technical indicators',
      icon: BarChart3,
      frequency: 'Daily'
    },
    {
      id: 'asset',
      name: 'Asset Risk Report',
      description: 'Risk assessment for monitored assets and domains',
      icon: PieChart,
      frequency: 'Monthly'
    },
    {
      id: 'trends',
      name: 'Threat Trends',
      description: 'Analysis of emerging threats and attack trends',
      icon: TrendingUp,
      frequency: 'Weekly'
    }
  ];

  const recentReports = [
    {
      name: 'Q1 2024 Threat Intelligence Report',
      type: 'Executive Summary',
      date: '2024-03-31',
      size: '2.4 MB',
      status: 'completed'
    },
    {
      name: 'Weekly Technical Analysis - Week 13',
      type: 'Technical Analysis',
      date: '2024-03-29',
      size: '1.8 MB',
      status: 'completed'
    },
    {
      name: 'Asset Risk Assessment - March',
      type: 'Asset Risk Report',
      date: '2024-03-28',
      size: '956 KB',
      status: 'completed'
    },
    {
      name: 'Ransomware Trend Analysis',
      type: 'Threat Trends',
      date: '2024-03-25',
      size: '3.1 MB',
      status: 'completed'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Reports & Analytics
          </h1>
          <p className="text-gray-400 mt-1">Generate and schedule threat intelligence reports</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
          <FileText className="w-4 h-4" />
          <span>Generate Report</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400 text-sm">Date Range:</span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="custom">Custom range</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400 text-sm">Report Type:</span>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Reports</option>
            <option value="executive">Executive</option>
            <option value="technical">Technical</option>
            <option value="asset">Asset Reports</option>
            <option value="trends">Trend Analysis</option>
          </select>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-cyan-400">156</div>
          <div className="text-sm text-gray-400">Reports Generated</div>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">12</div>
          <div className="text-sm text-gray-400">Scheduled Reports</div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-amber-400">2.3K</div>
          <div className="text-sm text-gray-400">IOCs Analyzed</div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-400">89</div>
          <div className="text-sm text-gray-400">Critical Findings</div>
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Report Templates</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {reportTemplates.map((template) => (
            <div key={template.id} className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 hover:bg-gray-800/50 transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <template.icon className="w-6 h-6 text-cyan-400" />
                  <div>
                    <h4 className="text-white font-medium">{template.name}</h4>
                    <p className="text-gray-400 text-sm">{template.description}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">
                  {template.frequency}
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors text-sm">
                  Generate Now
                </button>
                <button className="px-3 py-2 bg-gray-600/20 hover:bg-gray-600/30 text-gray-400 rounded-lg transition-colors text-sm">
                  Schedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h3 className="text-xl font-semibold text-white">Recent Reports</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Report Name</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Type</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Date</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Size</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report, index) => (
                <tr key={index} className="border-t border-gray-800 hover:bg-gray-800/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span className="text-white font-medium">{report.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-300">{report.type}</td>
                  <td className="py-4 px-6 text-gray-400">{report.date}</td>
                  <td className="py-4 px-6 text-gray-400">{report.size}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-700 rounded">
                        <Download className="w-4 h-4 text-gray-400 hover:text-cyan-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-700 rounded">
                        <Mail className="w-4 h-4 text-gray-400 hover:text-cyan-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Distribution */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Threat Type Distribution</h3>
          
          <div className="space-y-4">
            {[
              { name: 'Ransomware', value: 35, color: 'bg-red-500' },
              { name: 'Data Breach', value: 28, color: 'bg-amber-500' },
              { name: 'Malware', value: 22, color: 'bg-purple-500' },
              { name: 'Phishing', value: 15, color: 'bg-cyan-500' }
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${item.color} rounded-full`} />
                  <span className="text-gray-300">{item.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full ${item.color} transition-all duration-1000`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                  <span className="text-white font-medium w-8 text-right">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Monthly Threat Trends</h3>
          
          <div className="h-48 flex items-end justify-between space-x-2">
            {[
              { month: 'Jan', threats: 45 },
              { month: 'Feb', threats: 62 },
              { month: 'Mar', threats: 58 },
              { month: 'Apr', threats: 73 },
              { month: 'May', threats: 89 },
              { month: 'Jun', threats: 94 }
            ].map((data) => (
              <div key={data.month} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-cyan-500 to-emerald-500 rounded-t transition-all duration-1000"
                  style={{ height: `${(data.threats / 100) * 100}%` }}
                />
                <span className="text-gray-400 text-xs mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Scheduled Reports</h3>
          <button className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors">
            Add Schedule
          </button>
        </div>

        <div className="space-y-3">
          {[
            { name: 'Weekly Executive Summary', frequency: 'Every Monday 9:00 AM', next: 'March 25, 2024', recipients: '3 recipients' },
            { name: 'Daily Threat Feed', frequency: 'Daily 6:00 AM', next: 'March 22, 2024', recipients: '7 recipients' },
            { name: 'Monthly Asset Report', frequency: 'First day of month', next: 'April 1, 2024', recipients: '2 recipients' }
          ].map((schedule, index) => (
            <div key={index} className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">{schedule.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                    <span>{schedule.frequency}</span>
                    <span>Next: {schedule.next}</span>
                    <span>{schedule.recipients}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded">
                    Active
                  </button>
                  <button className="px-3 py-1 bg-gray-600/20 text-gray-400 text-sm rounded hover:bg-gray-600/30">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
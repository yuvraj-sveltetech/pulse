import React, { useState } from 'react';
import { Settings as SettingsIcon, Key, Bell, Palette, Shield, Globe, Download, Upload } from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'General', icon: SettingsIcon },
    { id: 'api', name: 'API Keys', icon: Key },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'integrations', name: 'Integrations', icon: Globe },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-gray-400 mt-1">Configure your SecPulse Intelligence platform</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">General Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Organization Name</label>
                    <input
                      type="text"
                      defaultValue="CyberSecure Corp"
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Time Zone</label>
                    <select className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500">
                      <option>UTC-8 (Pacific Time)</option>
                      <option>UTC-5 (Eastern Time)</option>
                      <option>UTC+0 (GMT)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Data Retention Period</label>
                  <select className="w-full md:w-64 bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500">
                    <option>90 days</option>
                    <option>180 days</option>
                    <option>1 year</option>
                    <option>Custom</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-700 text-cyan-500 focus:ring-cyan-500" defaultChecked />
                  <label className="text-sm text-gray-300">Enable automatic threat scoring</label>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">API Keys</h2>
                  <button className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors">
                    Generate New Key
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Production API Key</span>
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded">Active</span>
                    </div>
                    <div className="font-mono text-sm text-gray-300 bg-gray-900/50 p-2 rounded border">
                      sp_live_7k8j9m2n4p5q6r7s8t9u0v1w2x3y4z5a
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Created: Jan 15, 2024 • Last used: 2 hours ago
                    </div>
                  </div>

                  <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Development API Key</span>
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded">Limited</span>
                    </div>
                    <div className="font-mono text-sm text-gray-300 bg-gray-900/50 p-2 rounded border">
                      sp_test_3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Created: Jan 10, 2024 • Last used: 1 day ago
                    </div>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                  <h3 className="text-amber-400 font-medium mb-2">API Usage Guidelines</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Rate limit: 1000 requests per minute</li>
                    <li>• Keep your API keys secure and never expose them in client-side code</li>
                    <li>• Use environment variables to store API keys</li>
                    <li>• Rotate keys regularly for better security</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Notification Preferences</h2>

                <div className="space-y-4">
                  <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-3">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Critical alerts</span>
                        <input type="checkbox" className="rounded border-gray-700 text-cyan-500 focus:ring-cyan-500" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Daily summary reports</span>
                        <input type="checkbox" className="rounded border-gray-700 text-cyan-500 focus:ring-cyan-500" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Asset monitoring alerts</span>
                        <input type="checkbox" className="rounded border-gray-700 text-cyan-500 focus:ring-cyan-500" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-3">Slack Integration</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-300">Enable Slack notifications</span>
                      <input type="checkbox" className="rounded border-gray-700 text-cyan-500 focus:ring-cyan-500" />
                    </div>
                    <input
                      type="text"
                      placeholder="Webhook URL"
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-3">Alert Thresholds</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Risk Score Threshold</label>
                        <select className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500">
                          <option>7.0 (High)</option>
                          <option>8.0 (Critical)</option>
                          <option>9.0 (Severe)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Alert Frequency</label>
                        <select className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500">
                          <option>Immediate</option>
                          <option>Every 15 minutes</option>
                          <option>Hourly</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Appearance Settings</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-3">Theme</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-gray-800/30 border-2 border-cyan-500 rounded-lg p-4 cursor-pointer">
                        <div className="w-full h-12 bg-gradient-to-r from-gray-900 to-black rounded mb-2"></div>
                        <span className="text-cyan-400 font-medium">Dark (Current)</span>
                      </div>
                      <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 cursor-pointer opacity-50">
                        <div className="w-full h-12 bg-gradient-to-r from-gray-100 to-white rounded mb-2"></div>
                        <span className="text-gray-400">Light (Coming Soon)</span>
                      </div>
                      <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 cursor-pointer opacity-50">
                        <div className="w-full h-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded mb-2"></div>
                        <span className="text-gray-400">Auto (Coming Soon)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-3">Accent Color</label>
                    <div className="flex space-x-3">
                      <div className="w-8 h-8 bg-cyan-500 rounded-full border-2 border-white cursor-pointer"></div>
                      <div className="w-8 h-8 bg-emerald-500 rounded-full border border-gray-600 cursor-pointer"></div>
                      <div className="w-8 h-8 bg-purple-500 rounded-full border border-gray-600 cursor-pointer"></div>
                      <div className="w-8 h-8 bg-amber-500 rounded-full border border-gray-600 cursor-pointer"></div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-700 text-cyan-500 focus:ring-cyan-500" defaultChecked />
                    <label className="text-sm text-gray-300">Enable animations</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-700 text-cyan-500 focus:ring-cyan-500" />
                    <label className="text-sm text-gray-300">High contrast mode</label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Security Settings</h2>

                <div className="space-y-4">
                  <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-3">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-300">2FA Status</span>
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded">Enabled</span>
                    </div>
                    <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors">
                      Disable 2FA
                    </button>
                  </div>

                  <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-3">Session Management</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Session Timeout</label>
                        <select className="w-full md:w-48 bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500">
                          <option>30 minutes</option>
                          <option>1 hour</option>
                          <option>4 hours</option>
                          <option>8 hours</option>
                        </select>
                      </div>
                      <button className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg transition-colors">
                        Revoke All Sessions
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-3">Password Policy</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Minimum 12 characters</li>
                      <li>• Must include uppercase and lowercase letters</li>
                      <li>• Must include numbers and special characters</li>
                      <li>• Cannot reuse last 5 passwords</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Integrations</h2>

                <div className="space-y-4">
                  <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-white font-medium">Splunk SIEM</h3>
                        <p className="text-gray-400 text-sm">Export threat data to Splunk</p>
                      </div>
                      <button className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors">
                        Configure
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-white font-medium">Microsoft Sentinel</h3>
                        <p className="text-gray-400 text-sm">Forward alerts to Microsoft Sentinel</p>
                      </div>
                      <button className="px-4 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-400 rounded-lg transition-colors">
                        Setup
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-white font-medium">Webhook Endpoints</h3>
                        <p className="text-gray-400 text-sm">Custom webhook integrations</p>
                      </div>
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded">Active</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      <span className="font-mono bg-gray-900/50 p-1 rounded">https://api.company.com/webhooks/threats</span>
                    </div>
                  </div>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                  <h3 className="text-cyan-400 font-medium mb-2">Need a Custom Integration?</h3>
                  <p className="text-sm text-gray-300 mb-3">
                    Contact our team to discuss custom integrations with your existing security tools.
                  </p>
                  <button className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors">
                    Contact Sales
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-700 flex justify-end space-x-3">
              <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
                Reset to Defaults
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-semibold rounded-lg transition-all duration-300">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
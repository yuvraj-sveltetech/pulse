import React, { useState } from 'react';
import { Users, Plus, Edit3, Trash2, Shield, Eye, Clock, Mail, Key } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'analyst' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  twoFactorEnabled: boolean;
  createdAt: string;
  permissions: string[];
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Chen',
    email: 'alex.chen@company.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2 minutes ago',
    twoFactorEnabled: true,
    createdAt: '2024-01-01',
    permissions: ['all']
  },
  {
    id: '2',
    name: 'Sarah Martinez',
    email: 'sarah.martinez@company.com',
    role: 'analyst',
    status: 'active',
    lastLogin: '1 hour ago',
    twoFactorEnabled: true,
    createdAt: '2024-01-15',
    permissions: ['threats.read', 'alerts.manage', 'assets.read']
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    role: 'analyst',
    status: 'active',
    lastLogin: '3 hours ago',
    twoFactorEnabled: false,
    createdAt: '2024-01-20',
    permissions: ['threats.read', 'alerts.read', 'assets.read']
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma.wilson@company.com',
    role: 'viewer',
    status: 'inactive',
    lastLogin: '2 days ago',
    twoFactorEnabled: false,
    createdAt: '2024-02-01',
    permissions: ['threats.read', 'assets.read']
  }
];

export const UserManagement: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'analyst': return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
      default: return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-400 bg-emerald-500/20';
      case 'inactive': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-amber-400 bg-amber-500/20';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'analyst': return <Eye className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-gray-400 mt-1">Manage team access and permissions</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">{mockUsers.length}</div>
          <div className="text-sm text-gray-400">Total Users</div>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">{mockUsers.filter(u => u.status === 'active').length}</div>
          <div className="text-sm text-gray-400">Active</div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-400">{mockUsers.filter(u => u.role === 'admin').length}</div>
          <div className="text-sm text-gray-400">Admins</div>
        </div>
        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-cyan-400">{mockUsers.filter(u => u.twoFactorEnabled).length}</div>
          <div className="text-sm text-gray-400">2FA Enabled</div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h3 className="text-xl font-semibold text-white">Team Members</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">User</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Role</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Last Login</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">2FA</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-t border-gray-800 hover:bg-gray-800/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-full flex items-center justify-center">
                        <span className="text-black font-semibold text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{user.name}</div>
                        <div className="text-gray-400 text-sm flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <div className={`flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full border ${getRoleColor(user.role)}`}>
                        {getRoleIcon(user.role)}
                        <span className="capitalize">{user.role}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-400 text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{user.lastLogin}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Key className={`w-4 h-4 ${user.twoFactorEnabled ? 'text-emerald-400' : 'text-gray-400'}`} />
                      <span className={`text-sm ${user.twoFactorEnabled ? 'text-emerald-400' : 'text-gray-400'}`}>
                        {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
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

      {/* Role Permissions */}
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Role Permissions</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Shield className="w-5 h-5 text-red-400" />
              <h4 className="text-lg font-semibold text-red-400">Admin</h4>
            </div>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Full system access</li>
              <li>• User management</li>
              <li>• System configuration</li>
              <li>• Data export</li>
              <li>• Billing management</li>
            </ul>
          </div>
          
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Eye className="w-5 h-5 text-amber-400" />
              <h4 className="text-lg font-semibold text-amber-400">Analyst</h4>
            </div>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• View threats & alerts</li>
              <li>• Manage investigations</li>
              <li>• Asset monitoring</li>
              <li>• Create reports</li>
              <li>• Comment on incidents</li>
            </ul>
          </div>
          
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Users className="w-5 h-5 text-emerald-400" />
              <h4 className="text-lg font-semibold text-emerald-400">Viewer</h4>
            </div>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Read-only access</li>
              <li>• View dashboards</li>
              <li>• View threat feed</li>
              <li>• Download reports</li>
              <li>• Basic search</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Add New User</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email address..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
                <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500">
                  <option value="viewer">Viewer</option>
                  <option value="analyst">Analyst</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-700 text-cyan-500 focus:ring-cyan-500" />
                <label className="text-sm text-gray-400">Send invitation email</label>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-700 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-semibold rounded-lg transition-all duration-300">
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
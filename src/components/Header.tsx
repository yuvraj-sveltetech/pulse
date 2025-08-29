import React, { useState } from 'react';
import { Search, Bell, Menu, ChevronDown, Command, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuthStore();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Global Search */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group"
            >
              <Search className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
              <span className="text-gray-400 text-sm">Search threats, assets...</span>
              <div className="flex items-center space-x-1 ml-8">
                <Command className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-500">K</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Tenant Selector */}
          <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800/30 rounded-lg border border-gray-700">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium">{user?.tenantName}</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors group">
            <Bell className="w-5 h-5 text-gray-400 group-hover:text-gray-300" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-800/50 rounded-lg transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-black" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.role}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-2xl mx-4 shadow-2xl">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for threats, IOCs, assets..."
                  className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <span className="text-sm">ESC</span>
                </button>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-400 text-sm">Start typing to search across all threat intelligence data...</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
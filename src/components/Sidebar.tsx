import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Shield,
  AlertTriangle,
  Eye,
  Radio,
  Users,
  Settings,
  BarChart3,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Threat Feed', href: '/threats', icon: Shield },
  { name: 'Alerts', href: '/alerts', icon: AlertTriangle },
  { name: 'Asset Watchlist', href: '/assets', icon: Eye },
  { name: 'Sources Monitor', href: '/sources', icon: Radio },
  { name: 'User Management', href: '/users', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Reports & Analytics', href: '/reports', icon: BarChart3 },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { logout } = useAuthStore();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-gray-900/95 backdrop-blur-xl
        border-r border-gray-800 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-black" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  SecPulse
                </h1>
                <p className="text-xs text-gray-400">Intelligence</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden p-1 rounded-md hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg
                    transition-all duration-200 relative overflow-hidden
                    ${isActive 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-400 shadow-lg shadow-cyan-500/10' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }
                  `}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-emerald-400 rounded-r-full" />
                  )}
                  <item.icon className={`
                    mr-3 h-5 w-5 transition-all duration-200
                    ${isActive ? 'text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]' : 'text-gray-400 group-hover:text-gray-300'}
                  `} />
                  {item.name}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-emerald-500/5 rounded-lg" />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={logout}
              className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-gray-300 rounded-lg hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
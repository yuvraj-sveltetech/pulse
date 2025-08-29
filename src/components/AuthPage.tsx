import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, User, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const AuthPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);

  const { login } = useAuthStore();

  // Security constants
  const MAX_ATTEMPTS = 3;
  const LOCKOUT_DURATION = 300000; // 5 minutes in milliseconds
  const VALID_CREDENTIALS = {
    username: 'secpulse',
    password: '&678ioJKGHJGghgjklfytryt67%^%4576'
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLocked && lockoutTime > 0) {
      interval = setInterval(() => {
        setLockoutTime(prev => {
          if (prev <= 1000) {
            setIsLocked(false);
            setAttempts(0);
            setError('');
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLocked, lockoutTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      setError(`Account locked. Try again in ${Math.ceil(lockoutTime / 1000)} seconds.`);
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate network delay for security
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validate credentials
    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
      // Successful login
      login();
      setAttempts(0);
    } else {
      // Failed login
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= MAX_ATTEMPTS) {
        setIsLocked(true);
        setLockoutTime(LOCKOUT_DURATION);
        setError(`Too many failed attempts. Account locked for ${LOCKOUT_DURATION / 60000} minutes.`);
      } else {
        setError(`Invalid credentials. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`);
      }
      
      // Clear form on failed attempt
      setPassword('');
    }

    setIsLoading(false);
  };

  const formatLockoutTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Matrix-style falling characters */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-cyan-500/20 text-sm font-mono animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            {Math.random().toString(36).substring(2, 8)}
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-2xl mb-6 shadow-2xl shadow-cyan-500/25">
            <Shield className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            SecPulse Intelligence
          </h1>
          <p className="text-gray-400 text-lg">Advanced Dark Web Threat Monitoring</p>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-400 text-sm font-medium">Secure Access Portal</span>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLocked || isLoading}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your username"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLocked || isLoading}
                  className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLocked || isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}

            {/* Lockout Timer */}
            {isLocked && (
              <div className="text-center p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <div className="text-amber-400 font-mono text-2xl mb-2">
                  {formatLockoutTime(lockoutTime)}
                </div>
                <div className="text-amber-400 text-sm">
                  Account temporarily locked for security
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLocked || isLoading || !username || !password}
              className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 disabled:from-gray-600 disabled:to-gray-700 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/25 disabled:shadow-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                'Access Platform'
              )}
            </button>
          </form>

          {/* Security Info */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Attempts: {attempts}/{MAX_ATTEMPTS}</span>
              <span>Secure Connection</span>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800/30 border border-gray-700 rounded-lg">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-gray-400 text-sm">
              Protected by enterprise-grade security
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>© 2024 SecPulse Intelligence. All rights reserved.</p>
          <p className="mt-1">Unauthorized access is strictly prohibited.</p>
        </div>
      </div>
    </div>
  );
};
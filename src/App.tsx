import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthPage } from './components/AuthPage';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { ThreatFeed } from './pages/ThreatFeed';
import { Alerts } from './pages/Alerts';
import { AssetWatchlist } from './pages/AssetWatchlist';
import { SourcesMonitor } from './pages/SourcesMonitor';
import { UserManagement } from './pages/UserManagement';
import { Settings } from './pages/Settings';
import { Reports } from './pages/Reports';
import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        {isAuthenticated ? (
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/threats" element={<ThreatFeed />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/assets" element={<AssetWatchlist />} />
              <Route path="/sources" element={<SourcesMonitor />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Layout>
        ) : (
          <AuthPage />
        )}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1f2937',
              color: '#ffffff',
              border: '1px solid #374151',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    tenantId: string;
    tenantName: string;
  } | null;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false, // Changed to false for security
      user: null,
      login: () => set({ 
        isAuthenticated: true,
        user: {
          id: '1',
          name: 'SecPulse Admin',
          email: 'secpulse@company.com',
          role: 'Admin',
          tenantId: 'tenant-1',
          tenantName: 'CyberSecure Corp'
        }
      }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated,
        user: state.user 
      }),
    }
  )
);
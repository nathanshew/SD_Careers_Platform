"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import getCookie from '@/utils/getCookie';

// Auth context type
type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for token in cookies
    const token = getCookie('token');
    setIsAuthenticated(!!token);
    setLoading(false);
    
    // Handle redirect URL if coming from middleware redirect
    const redirectUrl = searchParams.get('redirectUrl');
    if (isAuthenticated && redirectUrl) {
      router.push(redirectUrl);
    }
    
    // Protect routes (optional, can also be done with middleware)
    if (!loading && !isAuthenticated && pathname.startsWith('/positions')) {
      router.push(`/signin?redirectUrl=${pathname}`);
    }
  }, [isAuthenticated, loading, pathname, router, searchParams]);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
}
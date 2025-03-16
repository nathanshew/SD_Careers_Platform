"use client"; // Important: mark as client component

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// Auth context type
type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// You already have this function in your layout.tsx
function getCookie(name: string) {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
}

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
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
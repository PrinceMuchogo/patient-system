"use client";

import { useCallback, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MOCK_CURRENT_DOCTOR } from '@/data/mockData';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Simulate fetching the authenticated user
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would be an API call to check auth
        // For our demo, we'll always return the current doctor
        setUser({
          id: MOCK_CURRENT_DOCTOR.id,
          name: MOCK_CURRENT_DOCTOR.name,
          email: MOCK_CURRENT_DOCTOR.email,
          role: MOCK_CURRENT_DOCTOR.role
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Authentication error:", error);
        setUser(null);
        setIsLoading(false);
        
        // Redirect to login if not on login page
        if (pathname !== '/login') {
          router.push('/login');
        }
      }
    };
    
    checkAuth();
  }, [pathname, router]);

  const login = useCallback(async (email: string, password: string) => {
    // In a real app, this would make an API call to authenticate
    setIsLoading(true);
    
    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser({
        id: MOCK_CURRENT_DOCTOR.id,
        name: MOCK_CURRENT_DOCTOR.name,
        email: MOCK_CURRENT_DOCTOR.email,
        role: MOCK_CURRENT_DOCTOR.role
      });
      
      router.push('/dashboard');
    } catch (error) {
      console.error("Login error:", error);
      throw new Error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const logout = useCallback(async () => {
    // In a real app, this would make an API call to log out
    setIsLoading(true);
    
    try {
      // Simulate logout delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout
  };
}
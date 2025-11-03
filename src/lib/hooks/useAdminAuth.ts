import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminUser {
  authenticated: boolean;
  expiresAt?: number;
}

interface UseAdminAuthReturn {
  isAuthenticated: boolean;
  loading: boolean;
  user: AdminUser | null;
  checkAuth: () => Promise<void>;
}

/**
 * useAdminAuth - Hook for managing admin authentication state
 * Centralizes auth checks and auto-redirects
 */
export function useAdminAuth(redirectOnFail = false): UseAdminAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AdminUser | null>(null);
  const navigate = useNavigate();

  const checkAuth = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
        setUser(data);
      } else {
        setIsAuthenticated(false);
        setUser(null);

        if (redirectOnFail) {
          navigate('/admin/login');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);

      if (redirectOnFail) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    isAuthenticated,
    loading,
    user,
    checkAuth,
  };
}

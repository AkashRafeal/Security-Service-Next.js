'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('security_user');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {
      // ignore parse/storage error
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('security_token') : null;
    if (token) {
      authService.getCurrentUser()
        .then((res) => {
          if (res?.data) {
            setUser(res.data);
            localStorage.setItem('security_user', JSON.stringify(res.data));
          }
        })
        .catch(() => {
          if (token.startsWith('demo-jwt')) {
            const saved = localStorage.getItem('security_user');
            if (saved) {
              try {
                setUser(JSON.parse(saved));
                return;
              } catch {}
            }
          }
          localStorage.removeItem('security_token');
          localStorage.removeItem('security_user');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    const res = await authService.login({ username, password });
    if (res.success && res.data?.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('security_token', res.data.token);
        localStorage.setItem('security_user', JSON.stringify(res.data));
      }
      setUser(res.data);
      return res.data;
    }
    throw new Error(res.message || 'Login failed');
  };

  const register = async (userData) => {
    const res = await authService.register(userData);
    if (res.success && res.data?.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('security_token', res.data.token);
        localStorage.setItem('security_user', JSON.stringify(res.data));
      }
      setUser(res.data);
      return res.data;
    }
    throw new Error(res.message || 'Registration failed');
  };

  const logout = (redirectUrl = '/') => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('security_token');
      localStorage.removeItem('security_user');
      setUser(null);
      window.location.href = redirectUrl;
    }
  };

  const hasRole = (role) => {
    if (!user || !user.roles) return false;
    const target = role.startsWith('ROLE_') ? role : `ROLE_${role}`;
    return user.roles.includes(target) || (Array.isArray(user.roles) && user.roles.some((r) => (r.name || r) === target));
  };

  const isAdmin = hasRole('ROLE_ADMIN');
  const isManager = hasRole('ROLE_MANAGER') || isAdmin;
  const isStaff = hasRole('ROLE_STAFF');
  const isClient = hasRole('ROLE_USER') || hasRole('ROLE_CLIENT');

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin,
        isManager,
        isStaff,
        isClient,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

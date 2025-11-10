'use client';

import { useState, useEffect } from 'react';
import { UserRole } from '@prisma/client';

interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      setUser(data.user || null);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const signup = async (
    username: string,
    password: string,
    name: string,
    expertInfo?: { expertise: string; experience: string; certificate: string }
  ) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, name, expertInfo }),
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
      }

      return data;
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: '회원가입 중 오류가 발생했습니다.' };
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: '로그인 중 오류가 발생했습니다.' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });

      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    user,
    loading,
    signup,
    login,
    logout,
    isLoggedIn: !!user,
    isExpert: user?.role === UserRole.EXPERT || user?.role === UserRole.ADMIN,
    isAdmin: user?.role === UserRole.ADMIN,
  };
}

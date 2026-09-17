import api from './api';
import { DEMO_USERS } from '../utils/mockData';

export const authService = {
  login: async (credentials) => {
    const username = credentials.username?.trim();
    const password = credentials.password?.trim();

    try {
      const response = await api.post('/auth/login', { username, password });
      return response.data;
    } catch (err) {
      // If demo credentials are provided OR if backend returns 404 (or network down)
      const unameLower = username?.toLowerCase();
      const isDemoAdmin = unameLower === 'admin';
      const isDemoUser = unameLower === 'user';

      if (
        (isDemoAdmin && (password === 'Admin@123456' || err.response?.status === 404 || !err.response)) ||
        (isDemoUser && (password === 'User@123456' || err.response?.status === 404 || !err.response))
      ) {
        const demoTemplate = isDemoAdmin ? DEMO_USERS.admin : DEMO_USERS.user;
        return {
          success: true,
          message: 'Authenticated successfully in demo mode',
          data: {
            ...demoTemplate,
            token: `demo-jwt-token-${unameLower}-${Date.now()}`
          }
        };
      }

      // If backend is not running/returns 404 and credentials do not match demo
      if (err.response?.status === 404 || !err.response) {
        throw new Error('Backend server is offline. Please use the Quick One-Click Demo Logins below.');
      }

      throw new Error(err.response?.data?.message || err.message || 'Authentication failed');
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (err) {
      if (err.response?.status === 404 || !err.response) {
        return {
          success: true,
          message: 'Client account registered in demo mode',
          data: {
            id: Date.now(),
            username: userData.username,
            email: userData.email,
            fullName: userData.fullName || userData.username,
            roles: ['ROLE_USER', 'ROLE_CLIENT'],
            token: `demo-jwt-token-client-${Date.now()}`
          }
        };
      }
      throw new Error(err.response?.data?.message || err.message || 'Registration failed');
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (err) {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('security_user');
        if (saved) {
          try {
            return { success: true, data: JSON.parse(saved) };
          } catch {}
        }
      }
      throw err;
    }
  },
};

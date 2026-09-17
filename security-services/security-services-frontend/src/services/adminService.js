import api from './api';
import {
  MOCK_ADMIN_STATS,
  MOCK_ADMIN_QUOTES,
  MOCK_ADMIN_ENQUIRIES,
  MOCK_ADMIN_APPLICATIONS,
  MOCK_ADMIN_NOTIFICATIONS,
  MOCK_AUDIT_LOGS,
  MOCK_SERVICES,
  MOCK_PROJECTS,
  MOCK_TESTIMONIALS,
  MOCK_FAQS,
  MOCK_JOBS,
  MOCK_USERS,
  MOCK_CLIENTS,
  MOCK_SERVICE_CATEGORIES
} from '../utils/mockData';

export const adminService = {
  // Dashboard & Metrics
  getDashboardStats: async () => {
    try {
      const res = await api.get('/admin/dashboard/stats');
      if (res.data?.data) return res.data.data;
      return MOCK_ADMIN_STATS;
    } catch {
      return MOCK_ADMIN_STATS;
    }
  },

  getAuditLogs: async () => {
    try {
      const res = await api.get('/admin/audit-logs');
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
      return MOCK_AUDIT_LOGS;
    } catch {
      return MOCK_AUDIT_LOGS;
    }
  },

  getNotifications: async () => {
    try {
      const res = await api.get('/admin/notifications');
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
      return MOCK_ADMIN_NOTIFICATIONS;
    } catch {
      return MOCK_ADMIN_NOTIFICATIONS;
    }
  },

  markNotificationRead: async (id) => {
    try {
      const res = await api.patch(`/admin/notifications/${id}/read`);
      return res.data;
    } catch {
      return { success: true };
    }
  },

  markAllNotificationsRead: async () => {
    try {
      const res = await api.patch('/admin/notifications/read-all');
      return res.data;
    } catch {
      return { success: true };
    }
  },

  getSettings: async () => {
    try {
      const res = await api.get('/admin/settings');
      return res.data.data;
    } catch {
      return { companyName: 'ABC Security Services', email: 'dispatch@abcsecurity.com', phone: '+1 (800) 826-4827' };
    }
  },

  updateSettings: async (settings) => {
    try {
      const res = await api.put('/admin/settings', settings);
      return res.data;
    } catch {
      return { success: true, data: settings };
    }
  },

  // Quotes
  getQuotes: async (status) => {
    try {
      const params = status ? { status } : {};
      const res = await api.get('/admin/quotes', { params });
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
      return MOCK_ADMIN_QUOTES;
    } catch {
      return MOCK_ADMIN_QUOTES;
    }
  },

  getQuoteById: async (id) => {
    const res = await api.get(`/admin/quotes/${id}`);
    return res.data.data;
  },

  updateQuoteStatus: async (id, data) => {
    const res = await api.patch(`/admin/quotes/${id}/status`, data);
    return res.data;
  },

  // Enquiries
  getEnquiries: async (status) => {
    try {
      const params = status ? { status } : {};
      const res = await api.get('/admin/enquiries', { params });
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
      return MOCK_ADMIN_ENQUIRIES;
    } catch {
      return MOCK_ADMIN_ENQUIRIES;
    }
  },

  updateEnquiryStatus: async (id, data) => {
    try {
      const res = await api.patch(`/admin/enquiries/${id}/status`, data);
      return res.data;
    } catch {
      return { success: true };
    }
  },

  deleteEnquiry: async (id) => {
    try {
      const res = await api.delete(`/admin/enquiries/${id}`);
      return res.data;
    } catch {
      return { success: true };
    }
  },

  // Jobs
  getJobs: async () => {
    try {
      const res = await api.get('/admin/jobs');
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
      return MOCK_JOBS;
    } catch {
      return MOCK_JOBS;
    }
  },

  createJob: async (data) => {
    const res = await api.post('/admin/jobs', data);
    return res.data.data;
  },

  updateJob: async (id, data) => {
    const res = await api.put(`/admin/jobs/${id}`, data);
    return res.data.data;
  },

  toggleJobStatus: async (id) => {
    const res = await api.patch(`/admin/jobs/${id}/toggle-status`);
    return res.data;
  },

  deleteJob: async (id) => {
    const res = await api.delete(`/admin/jobs/${id}`);
    return res.data;
  },

  // Applications
  getApplications: async (status) => {
    try {
      const params = status ? { status } : {};
      const res = await api.get('/admin/applications', { params });
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
      return MOCK_ADMIN_APPLICATIONS;
    } catch {
      return MOCK_ADMIN_APPLICATIONS;
    }
  },

  updateApplicationStatus: async (id, data) => {
    try {
      const res = await api.patch(`/admin/applications/${id}/status`, data);
      return res.data;
    } catch {
      return { success: true };
    }
  },

  // Services
  getServices: async () => {
    try {
      const res = await api.get('/admin/services');
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
      return MOCK_SERVICES;
    } catch {
      return MOCK_SERVICES;
    }
  },

  createService: async (data) => {
    try {
      const res = await api.post('/admin/services', data);
      return res.data.data;
    } catch {
      return { id: Date.now(), ...data };
    }
  },

  updateService: async (id, data) => {
    try {
      const res = await api.put(`/admin/services/${id}`, data);
      return res.data.data;
    } catch {
      return { id, ...data };
    }
  },

  toggleServiceStatus: async (id) => {
    try {
      const res = await api.patch(`/admin/services/${id}/toggle-status`);
      return res.data;
    } catch {
      return { success: true };
    }
  },

  deleteService: async (id) => {
    try {
      const res = await api.delete(`/admin/services/${id}`);
      return res.data;
    } catch {
      return { success: true };
    }
  },

  // Service Categories
  getCategories: async () => {
    try {
      const res = await api.get('/admin/service-categories');
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
      return MOCK_SERVICE_CATEGORIES;
    } catch {
      return MOCK_SERVICE_CATEGORIES;
    }
  },

  createCategory: async (data) => {
    try {
      const res = await api.post('/admin/service-categories', data);
      return res.data.data;
    } catch {
      return { id: Date.now(), ...data, slug: data.name?.toLowerCase().replace(/\s+/g, '-') };
    }
  },

  updateCategory: async (id, data) => {
    try {
      const res = await api.put(`/admin/service-categories/${id}`, data);
      return res.data.data;
    } catch {
      return { id, ...data, slug: data.name?.toLowerCase().replace(/\s+/g, '-') };
    }
  },

  deleteCategory: async (id) => {
    try {
      const res = await api.delete(`/admin/service-categories/${id}`);
      return res.data;
    } catch {
      return { success: true };
    }
  },

  // Industries
  getIndustries: async () => {
    const res = await api.get('/admin/industries');
    return res.data.data;
  },

  createIndustry: async (data) => {
    const res = await api.post('/admin/industries', data);
    return res.data.data;
  },

  updateIndustry: async (id, data) => {
    const res = await api.put(`/admin/industries/${id}`, data);
    return res.data.data;
  },

  deleteIndustry: async (id) => {
    const res = await api.delete(`/admin/industries/${id}`);
    return res.data;
  },

  // Clients
  getClients: async () => {
    try {
      const res = await api.get('/admin/clients');
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
      return MOCK_CLIENTS;
    } catch {
      return MOCK_CLIENTS;
    }
  },

  createClient: async (data) => {
    const res = await api.post('/admin/clients', data);
    return res.data.data;
  },

  updateClient: async (id, data) => {
    const res = await api.put(`/admin/clients/${id}`, data);
    return res.data.data;
  },

  deleteClient: async (id) => {
    const res = await api.delete(`/admin/clients/${id}`);
    return res.data;
  },

  // Projects
  getProjects: async () => {
    try {
      const res = await api.get('/admin/projects');
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
      return MOCK_PROJECTS;
    } catch {
      return MOCK_PROJECTS;
    }
  },

  createProject: async (data) => {
    const res = await api.post('/admin/projects', data);
    return res.data.data;
  },

  updateProject: async (id, data) => {
    const res = await api.put(`/admin/projects/${id}`, data);
    return res.data.data;
  },

  deleteProject: async (id) => {
    const res = await api.delete(`/admin/projects/${id}`);
    return res.data;
  },

  // Team
  getTeam: async () => {
    const res = await api.get('/admin/team');
    return res.data.data;
  },

  createTeamMember: async (data) => {
    const res = await api.post('/admin/team', data);
    return res.data.data;
  },

  updateTeamMember: async (id, data) => {
    const res = await api.put(`/admin/team/${id}`, data);
    return res.data.data;
  },

  deleteTeamMember: async (id) => {
    const res = await api.delete(`/admin/team/${id}`);
    return res.data;
  },

  // Testimonials
  getTestimonials: async () => {
    try {
      const res = await api.get('/admin/testimonials');
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
      return MOCK_TESTIMONIALS;
    } catch {
      return MOCK_TESTIMONIALS;
    }
  },

  createTestimonial: async (data) => {
    const res = await api.post('/admin/testimonials', data);
    return res.data.data;
  },

  updateTestimonial: async (id, data) => {
    const res = await api.put(`/admin/testimonials/${id}`, data);
    return res.data.data;
  },

  deleteTestimonial: async (id) => {
    const res = await api.delete(`/admin/testimonials/${id}`);
    return res.data;
  },

  // Gallery
  getGallery: async () => {
    const res = await api.get('/admin/gallery');
    return res.data.data;
  },

  createGalleryImage: async (data) => {
    const res = await api.post('/admin/gallery', data);
    return res.data.data;
  },

  updateGalleryImage: async (id, data) => {
    const res = await api.put(`/admin/gallery/${id}`, data);
    return res.data.data;
  },

  deleteGalleryImage: async (id) => {
    const res = await api.delete(`/admin/gallery/${id}`);
    return res.data;
  },

  // Blogs
  getBlogs: async () => {
    const res = await api.get('/admin/blogs');
    return res.data.data;
  },

  createBlog: async (data) => {
    const res = await api.post('/admin/blogs', data);
    return res.data.data;
  },

  updateBlog: async (id, data) => {
    const res = await api.put(`/admin/blogs/${id}`, data);
    return res.data.data;
  },

  deleteBlog: async (id) => {
    const res = await api.delete(`/admin/blogs/${id}`);
    return res.data;
  },

  // Blog Categories
  getBlogCategories: async () => {
    const res = await api.get('/admin/blog-categories');
    return res.data.data;
  },

  createBlogCategory: async (data) => {
    const res = await api.post('/admin/blog-categories', data);
    return res.data.data;
  },

  // FAQs
  getFaqs: async () => {
    try {
      const res = await api.get('/admin/faqs');
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
      return MOCK_FAQS;
    } catch {
      return MOCK_FAQS;
    }
  },

  createFaq: async (data) => {
    const res = await api.post('/admin/faqs', data);
    return res.data.data;
  },

  updateFaq: async (id, data) => {
    const res = await api.put(`/admin/faqs/${id}`, data);
    return res.data.data;
  },

  deleteFaq: async (id) => {
    const res = await api.delete(`/admin/faqs/${id}`);
    return res.data;
  },

  // Users (Admin Only)
  getUsers: async () => {
    try {
      const res = await api.get('/admin/users');
      if (res.data?.data && res.data.data.length > 0) return res.data.data;
      return MOCK_USERS;
    } catch {
      return MOCK_USERS;
    }
  },

  createUser: async (data) => {
    const res = await api.post('/admin/users', data);
    return res.data.data;
  },

  updateUser: async (id, data) => {
    const res = await api.put(`/admin/users/${id}`, data);
    return res.data.data;
  },

  toggleUserActive: async (id) => {
    const res = await api.patch(`/admin/users/${id}/toggle-active`);
    return res.data;
  },

  resetUserPassword: async (id, newPassword) => {
    const res = await api.post(`/admin/users/${id}/reset-password`, { newPassword });
    return res.data;
  },

  deleteUser: async (id) => {
    const res = await api.delete(`/admin/users/${id}`);
    return res.data;
  },

  // Image Upload
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api.post('/admin/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.data.url;
  },
};

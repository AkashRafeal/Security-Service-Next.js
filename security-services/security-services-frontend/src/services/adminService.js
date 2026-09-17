import api from './api';

export const adminService = {
  // Dashboard & Metrics
  getDashboardStats: async () => {
    const res = await api.get('/admin/dashboard/stats');
    return res.data.data;
  },

  getAuditLogs: async () => {
    const res = await api.get('/admin/audit-logs');
    return res.data.data;
  },

  getNotifications: async () => {
    const res = await api.get('/admin/notifications');
    return res.data.data;
  },

  markNotificationRead: async (id) => {
    const res = await api.patch(`/admin/notifications/${id}/read`);
    return res.data;
  },

  markAllNotificationsRead: async () => {
    const res = await api.patch('/admin/notifications/read-all');
    return res.data;
  },

  getSettings: async () => {
    const res = await api.get('/admin/settings');
    return res.data.data;
  },

  updateSettings: async (settings) => {
    const res = await api.put('/admin/settings', settings);
    return res.data;
  },

  // Quotes
  getQuotes: async (status) => {
    const params = status ? { status } : {};
    const res = await api.get('/admin/quotes', { params });
    return res.data.data;
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
    const params = status ? { status } : {};
    const res = await api.get('/admin/enquiries', { params });
    return res.data.data;
  },

  updateEnquiryStatus: async (id, data) => {
    const res = await api.patch(`/admin/enquiries/${id}/status`, data);
    return res.data;
  },

  deleteEnquiry: async (id) => {
    const res = await api.delete(`/admin/enquiries/${id}`);
    return res.data;
  },

  // Jobs
  getJobs: async () => {
    const res = await api.get('/admin/jobs');
    return res.data.data;
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
    const params = status ? { status } : {};
    const res = await api.get('/admin/applications', { params });
    return res.data.data;
  },

  updateApplicationStatus: async (id, data) => {
    const res = await api.patch(`/admin/applications/${id}/status`, data);
    return res.data;
  },

  // Services
  getServices: async () => {
    const res = await api.get('/admin/services');
    return res.data.data;
  },

  createService: async (data) => {
    const res = await api.post('/admin/services', data);
    return res.data.data;
  },

  updateService: async (id, data) => {
    const res = await api.put(`/admin/services/${id}`, data);
    return res.data.data;
  },

  toggleServiceStatus: async (id) => {
    const res = await api.patch(`/admin/services/${id}/toggle-status`);
    return res.data;
  },

  deleteService: async (id) => {
    const res = await api.delete(`/admin/services/${id}`);
    return res.data;
  },

  // Service Categories
  getCategories: async () => {
    const res = await api.get('/admin/service-categories');
    return res.data.data;
  },

  createCategory: async (data) => {
    const res = await api.post('/admin/service-categories', data);
    return res.data.data;
  },

  updateCategory: async (id, data) => {
    const res = await api.put(`/admin/service-categories/${id}`, data);
    return res.data.data;
  },

  deleteCategory: async (id) => {
    const res = await api.delete(`/admin/service-categories/${id}`);
    return res.data;
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
    const res = await api.get('/admin/clients');
    return res.data.data;
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
    const res = await api.get('/admin/projects');
    return res.data.data;
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
    const res = await api.get('/admin/testimonials');
    return res.data.data;
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
    const res = await api.get('/admin/faqs');
    return res.data.data;
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
    const res = await api.get('/admin/users');
    return res.data.data;
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

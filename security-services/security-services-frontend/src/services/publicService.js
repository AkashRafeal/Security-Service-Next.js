import api from './api';

export const publicService = {
  getServices: async () => {
    const res = await api.get('/public/services');
    return res.data.data;
  },

  getFeaturedServices: async () => {
    const res = await api.get('/public/services/featured');
    return res.data.data;
  },

  getServiceBySlug: async (slug) => {
    const res = await api.get(`/public/services/${slug}`);
    return res.data.data;
  },

  getIndustries: async () => {
    const res = await api.get('/public/industries');
    return res.data.data;
  },

  getIndustryBySlug: async (slug) => {
    const res = await api.get(`/public/industries/${slug}`);
    return res.data.data;
  },

  getClients: async () => {
    const res = await api.get('/public/clients');
    return res.data.data;
  },

  getProjects: async () => {
    const res = await api.get('/public/projects');
    return res.data.data;
  },

  getProject: async (idOrSlug) => {
    const res = await api.get(`/public/projects/${idOrSlug}`);
    return res.data.data;
  },

  getTeam: async () => {
    const res = await api.get('/public/team');
    return res.data.data;
  },

  getTestimonials: async () => {
    const res = await api.get('/public/testimonials');
    return res.data.data;
  },

  getGallery: async (category) => {
    const params = category ? { category } : {};
    const res = await api.get('/public/gallery', { params });
    return res.data.data;
  },

  getBlogs: async () => {
    const res = await api.get('/public/blogs');
    return res.data.data;
  },

  getRecentBlogs: async () => {
    const res = await api.get('/public/blogs/recent');
    return res.data.data;
  },

  getBlogBySlug: async (slug) => {
    const res = await api.get(`/public/blogs/${slug}`);
    return res.data.data;
  },

  getFaqs: async (category) => {
    const params = category ? { category } : {};
    const res = await api.get('/public/faqs', { params });
    return res.data.data;
  },

  getJobs: async () => {
    const res = await api.get('/public/jobs');
    return res.data.data;
  },

  getJobById: async (id) => {
    const res = await api.get(`/public/jobs/${id}`);
    return res.data.data;
  },

  submitQuote: async (data) => {
    const res = await api.post('/public/quotes', data);
    return res.data;
  },

  submitContact: async (data) => {
    const res = await api.post('/public/contact', data);
    return res.data;
  },

  applyForJob: async (formData) => {
    const res = await api.post('/public/careers/apply', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },

  getSettings: async () => {
    const res = await api.get('/public/settings');
    return res.data.data;
  },
};

import api from './api';
import { MOCK_SERVICES, MOCK_FAQS, MOCK_TESTIMONIALS } from '../utils/mockData';

export const publicService = {
  getServices: async () => {
    try {
      const res = await api.get('/public/services');
      if (res.data?.data && res.data.data.length > 0) {
        return res.data.data;
      }
      return MOCK_SERVICES;
    } catch {
      return MOCK_SERVICES;
    }
  },

  getFeaturedServices: async () => {
    try {
      const res = await api.get('/public/services/featured');
      if (res.data?.data && res.data.data.length > 0) {
        return res.data.data;
      }
      return MOCK_SERVICES.slice(0, 3);
    } catch {
      return MOCK_SERVICES.slice(0, 3);
    }
  },

  getServiceBySlug: async (slug) => {
    try {
      const res = await api.get(`/public/services/${slug}`);
      if (res.data?.data) {
        return res.data.data;
      }
      return MOCK_SERVICES.find((s) => s.slug === slug || s.id.toString() === slug) || MOCK_SERVICES[0];
    } catch {
      return MOCK_SERVICES.find((s) => s.slug === slug || s.id.toString() === slug) || MOCK_SERVICES[0];
    }
  },

  getIndustries: async () => {
    try {
      const res = await api.get('/public/industries');
      return res.data.data;
    } catch {
      return [];
    }
  },

  getIndustryBySlug: async (slug) => {
    try {
      const res = await api.get(`/public/industries/${slug}`);
      return res.data.data;
    } catch {
      return null;
    }
  },

  getClients: async () => {
    try {
      const res = await api.get('/public/clients');
      return res.data.data;
    } catch {
      return [];
    }
  },

  getProjects: async () => {
    try {
      const res = await api.get('/public/projects');
      return res.data.data;
    } catch {
      return [];
    }
  },

  getProject: async (idOrSlug) => {
    try {
      const res = await api.get(`/public/projects/${idOrSlug}`);
      return res.data.data;
    } catch {
      return null;
    }
  },

  getTeam: async () => {
    try {
      const res = await api.get('/public/team');
      return res.data.data;
    } catch {
      return [];
    }
  },

  getTestimonials: async () => {
    try {
      const res = await api.get('/public/testimonials');
      if (res.data?.data && res.data.data.length > 0) {
        return res.data.data;
      }
      return MOCK_TESTIMONIALS;
    } catch {
      return MOCK_TESTIMONIALS;
    }
  },

  getGallery: async (category) => {
    try {
      const params = category ? { category } : {};
      const res = await api.get('/public/gallery', { params });
      return res.data.data;
    } catch {
      return [];
    }
  },

  getBlogs: async () => {
    try {
      const res = await api.get('/public/blogs');
      return res.data.data;
    } catch {
      return [];
    }
  },

  getRecentBlogs: async () => {
    try {
      const res = await api.get('/public/blogs/recent');
      return res.data.data;
    } catch {
      return [];
    }
  },

  getBlogBySlug: async (slug) => {
    try {
      const res = await api.get(`/public/blogs/${slug}`);
      return res.data.data;
    } catch {
      return null;
    }
  },

  getFaqs: async (category) => {
    try {
      const params = category ? { category } : {};
      const res = await api.get('/public/faqs', { params });
      if (res.data?.data && res.data.data.length > 0) {
        return res.data.data;
      }
      return MOCK_FAQS;
    } catch {
      return MOCK_FAQS;
    }
  },

  getJobs: async () => {
    try {
      const res = await api.get('/public/jobs');
      return res.data.data;
    } catch {
      return [];
    }
  },

  getJobById: async (id) => {
    try {
      const res = await api.get(`/public/jobs/${id}`);
      return res.data.data;
    } catch {
      return null;
    }
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
    try {
      const res = await api.get('/public/settings');
      return res.data.data;
    } catch {
      return null;
    }
  },
};

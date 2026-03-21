// Mock base44 SDK for local backend
import { experienceService } from '../api/experienceService.js';

export const base44Local = {
  entities: {
    Experience: {
      list: (sortBy = 'sort_order', limit = 50) => experienceService.list(sortBy, limit),
      filter: (query, sortBy = 'sort_order', limit = 50) => experienceService.filter(query, sortBy, limit),
      create: (data) => experienceService.create(data),
      update: (id, data) => experienceService.update(id, data),
      delete: (id) => experienceService.delete(id),
      schema: () => ({
        title: { type: 'string' },
        company: { type: 'string' },
        date: { type: 'string' },
        logo: { type: 'string' },
        logo_bg: { type: 'string' },
        points: { type: 'array', items: { type: 'string' } },
        sort_order: { type: 'number' }
      })
    }
  },
  integrations: {
    Core: {
      UploadFile: async ({ file }) => {
        // For local setup, you'd need to handle file uploads differently
        // For now, just return a placeholder
        console.warn('File uploads not configured for local backend');
        return { file_url: '' };
      },
      SendEmail: async (params) => {
        // For local setup, log emails instead of sending
        console.log('Email (not sent in local mode):', params);
        return { success: true };
      }
    }
  },
  auth: {
    me: async () => {
      // Mock user for local backend
      return { email: 'admin@local', full_name: 'Admin', role: 'admin' };
    },
    logout: () => window.location.href = '/',
    redirectToLogin: () => window.location.href = '/admin-login',
    isAuthenticated: async () => true,
    updateMe: async (data) => ({ ...data })
  },
  analytics: {
    track: (event) => console.log('Analytics:', event)
  }
};
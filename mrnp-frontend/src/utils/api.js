const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiClient = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers = {
      ...options.headers,
    };

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API request failed');
    }

    return response.json();
  },

  auth: {
    register: (email, password, name) =>
      apiClient.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      }),

    login: (email, password) =>
      apiClient.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
  },

  user: {
    getProfile: () =>
      apiClient.request('/user/profile', { method: 'GET' }),

    updateProfile: (profileData) =>
      apiClient.request('/user/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      }),

    changePassword: (currentPassword, newPassword) =>
      apiClient.request('/user/change-password', {
        method: 'PUT',
        body: JSON.stringify({ currentPassword, newPassword }),
      }),

    getAllowedEmails: () =>
      apiClient.request('/user/allowed-emails', { method: 'GET' }),

    addAllowedEmail: (email) =>
      apiClient.request('/user/allowed-emails', {
        method: 'POST',
        body: JSON.stringify({ email }),
      }),

    deleteAllowedEmail: (id) =>
      apiClient.request(`/user/allowed-emails/${id}`, { method: 'DELETE' }),
  },

  careers: {
    apply: (formData) =>
      apiClient.request('/careers/apply', {
        method: 'POST',
        body: formData,
      }),

    getApplications: () =>
      apiClient.request('/careers/applications', {
        method: 'GET',
      }),

    getContent: () =>
      apiClient.request('/careers/content', {
        method: 'GET',
      }),

    updateContent: (contentData) =>
      apiClient.request('/careers/content', {
        method: 'PUT',
        body: contentData,
      }),

    uploadImage: (formData) =>
      apiClient.request('/careers/upload', {
        method: 'POST',
        body: formData,
      }),
  },

  jobs: {
    getAll: () =>
      apiClient.request('/jobs', { method: 'GET' }),
    create: (jobData) =>
      apiClient.request('/jobs', {
        method: 'POST',
        body: JSON.stringify(jobData),
      }),
    delete: (id) =>
      apiClient.request(`/jobs/${id}`, { method: 'DELETE' }),
  },

  emails: {
    getAll: () =>
      apiClient.request('/emails', { method: 'GET' }),
    send: (emailData) =>
      apiClient.request('/emails/send', {
        method: 'POST',
        body: JSON.stringify(emailData),
      }),
    getHistory: (applicantId) =>
      apiClient.request(`/emails/history/${applicantId}`, {
        method: 'GET',
      }),
  },

  notifications: {
    getAll: () =>
      apiClient.request('/notifications', { method: 'GET' }),
    markRead: (id) =>
      apiClient.request(`/notifications/${id}/read`, { method: 'PUT' }),
    markAllRead: () =>
      apiClient.request('/notifications/read-all', { method: 'PUT' }),
    delete: (id) =>
      apiClient.request(`/notifications/${id}`, { method: 'DELETE' }),
  },

  interviews: {
    getAll: () =>
      apiClient.request('/interviews', { method: 'GET' }),
    create: (interviewData) =>
      apiClient.request('/interviews', {
        method: 'POST',
        body: JSON.stringify(interviewData),
      }),
    update: (id, interviewData) =>
      apiClient.request(`/interviews/${id}`, {
        method: 'PUT',
        body: JSON.stringify(interviewData),
      }),
    delete: (id) =>
      apiClient.request(`/interviews/${id}`, { method: 'DELETE' }),
  },

  services: {
    getAll: () =>
      apiClient.request('/services', { method: 'GET' }),
    getBySlug: (slug) =>
      apiClient.request(`/services/slug/${slug}`, { method: 'GET' }),
    create: (formData) =>
      apiClient.request('/services', {
        method: 'POST',
        body: formData,
      }),
    update: (id, formData) =>
      apiClient.request(`/services/${id}`, {
        method: 'PUT',
        body: formData,
      }),
    delete: (id) =>
      apiClient.request(`/services/${id}`, { method: 'DELETE' }),
    uploadImage: (formData) =>
      apiClient.request('/services/upload', {
        method: 'POST',
        body: formData,
      }),
  },

  about: {
    get: () =>
      apiClient.request('/about', { method: 'GET' }),
    update: (aboutData) =>
      apiClient.request('/about', {
        method: 'PUT',
        body: aboutData,
      }),
    uploadImage: (formData) =>
      apiClient.request('/about/upload', {
        method: 'POST',
        body: formData,
      }),
  },

};

export const authService = {
  setToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  },

  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },

  removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },

  isAuthenticated() {
    return this.getToken() !== null;
  },
};

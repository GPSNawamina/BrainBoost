import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Course related API calls
export const courseService = {
  getAllCourses: () => api.get('/courses'),
  getCourseById: (id) => api.get(`/courses/${id}`),
  createCourse: (courseData) => api.post('/courses', courseData),
  updateCourse: (id, courseData) => api.put(`/courses/${id}`, courseData),
  deleteCourse: (id) => api.delete(`/courses/${id}`),
  enrollInCourse: async (courseId) => {
    try {
      const response = await api.post(`/courses/${courseId}/enroll`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new Error(error.response.data || 'Already enrolled in this course');
      }
      throw error;
    }
  },
};

// Achievement related API calls
export const achievementService = {
  getAllAchievements: () => api.get('/achievements'),
  getAchievementById: (id) => api.get(`/achievements/${id}`),
  updateAchievementProgress: (id, progress) => api.put(`/achievements/${id}/progress`, { progress }),
};

// Progress related API calls
export const progressService = {
  getLearningProgress: () => api.get('/progress'),
  getWeeklyProgress: () => api.get('/progress/weekly'),
  getCourseProgress: (courseId) => api.get(`/progress/courses/${courseId}`),
  updateProgress: (data) => api.post('/progress', data),
  getRecentProgress: () => api.get('/progress/recent'),
  addProgress: (data) => api.post('/progress/entries', data),
  updateProgressEntry: (id, data) => api.put(`/progress/entries/${id}`, data),
  deleteProgress: (id) => api.delete(`/progress/entries/${id}`),
};

// User related API calls
export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getStats: () => api.get('/users/stats'),
};

export default api; 
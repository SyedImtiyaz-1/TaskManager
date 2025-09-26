// Use relative URL in development, absolute in production
const isDevelopment = import.meta.env.DEV;
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000/api' 
  : 'https://server-731g65eiq-syedimtiyaz1s-projects.vercel.app/api';

export default {
  TASKS: {
    BASE: `${API_BASE_URL}/tasks`,
    BY_ID: (id) => `${API_BASE_URL}/tasks/${id}`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/tasks/${id}/status`,
  },
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    ME: `${API_BASE_URL}/auth/profile`,
  },
  USERS: {
    BASE: `${API_BASE_URL}/users`,
  },
};

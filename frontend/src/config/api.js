const API_BASE_URL = 'https://taskmanager-backend-favqg39nk-syedimtiyaz1s-projects.vercel.app/api';

export default {
  TASKS: {
    BASE: `${API_BASE_URL}/tasks`,
    BY_ID: (id) => `${API_BASE_URL}/tasks/${id}`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/tasks/${id}/status`,
  },
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    ME: `${API_BASE_URL}/auth/me`,
  },
  USERS: {
    BASE: `${API_BASE_URL}/users`,
  },
};

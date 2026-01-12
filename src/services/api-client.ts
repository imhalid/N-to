 
import ky from 'ky';

const API_BASE_URL = 'http://localhost:8080/api';

// API client instance
export const apiClient = ky.create({
  prefixUrl: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      (request) => {
        // Her istekte userId'yi header'a ekle (localStorage'dan al)
        const userId = localStorage.getItem('userId');
        if (userId) {
          request.headers.set('X-User-Id', userId);
        }
      },
    ],
  },
});

// Error handler helper
export const handleApiError = async (error: unknown) => {
  if (error instanceof Error) {
    try {
      const errorResponse = await (error as any).response?.json();
      return {
        message: errorResponse?.message || 'An error occurred',
        status: errorResponse?.status,
        timestamp: errorResponse?.timestamp,
      };
    } catch {
      return {
        message: error.message || 'Network error',
        status: 500,
      };
    }
  }
  return {
    message: 'Unknown error occurred',
    status: 500,
  };
};

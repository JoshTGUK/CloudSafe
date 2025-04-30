import { getAuthHeader, clearToken } from './auth';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3006';

export const apiRequest = async (endpoint, options = {}) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...options.headers
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (response.status === 401) {
      clearToken();
      window.location.href = '/login';
      throw new Error('Authentication failed');
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}; 
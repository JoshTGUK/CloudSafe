import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3006/api';

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
    });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const register = async (formData) => {
    const response = await axios.post(`${API_URL}/auth/register`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: 'viewer' // Default role
    });
    return response.data;
}; 
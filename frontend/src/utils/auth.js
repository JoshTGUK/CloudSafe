export const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  // Make sure token is properly formatted
  return token.trim();
};

export const setToken = (token) => {
  if (!token) {
    localStorage.removeItem('token');
    return;
  }
  localStorage.setItem('token', token.trim());
};

export const clearToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
};

export const getAuthHeader = () => {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}; 
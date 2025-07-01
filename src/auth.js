import axios from 'axios';

const API_URL = 'http://localhost:8000/'; // Your Django backend URL

const authService = {
  // Login function
  async login(username, password) {
    try {
      const response = await axios.post(`${API_URL}login/`, {
        username,
        password
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Signup function
  async signup(username, email, password) {
    try {
      const response = await axios.post(`${API_URL}signup/`, {
        username,
        email,
        password
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Signup failed' };
    }
  },

  // Test token (protected endpoint)
  async testToken() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}test_token/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Logout function
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get auth token
  getToken() {
    return localStorage.getItem('token');
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};

export default authService;
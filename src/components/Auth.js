import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

function Auth({ setToken }) {
  const [regData, setRegData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [regMessage, setRegMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, regData);
      setRegMessage({ text: 'Registration successful! Please login.', type: 'success' });
      setRegData({ name: '', email: '', password: '', password_confirmation: '' });
    } catch (error) {
      setRegMessage({ text: error.response?.data.message || 'Registration failed', type: 'error' });
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, loginData);
      setToken(response.data.token);
      setLoginMessage({ text: 'Login successful!', type: 'success' });
      setLoginData({ email: '', password: '' });
    } catch (error) {
      setLoginMessage({ text: error.response?.data.message || 'Login failed', type: 'error' });
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Authentication</h2>
      <form className="form-group" onSubmit={handleRegister}>
        <h3>Register</h3>
        <input
          type="text"
          placeholder="Name"
          value={regData.name}
          onChange={(e) => setRegData({ ...regData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={regData.email}
          onChange={(e) => setRegData({ ...regData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={regData.password}
          onChange={(e) => setRegData({ ...regData, password: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={regData.password_confirmation}
          onChange={(e) => setRegData({ ...regData, password_confirmation: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {regMessage && <p className={`message ${regMessage.type}`}>{regMessage.text}</p>}
      </form>
      <form className="form-group" onSubmit={handleLogin}>
        <h3>Login</h3>
        <input
          type="email"
          placeholder="Email"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {loginMessage && <p className={`message ${loginMessage.type}`}>{loginMessage.text}</p>}
      </form>
    </div>
  );
}

export default Auth;
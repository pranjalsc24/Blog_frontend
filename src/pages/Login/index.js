// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./style.css";  // Import the CSS file

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/user/login', formData);
      console.log('API response:', response.data);
      setMessage(response.data.message);

      if (response.data.success) {
        console.log('Login successful, token:', response.data.token); // Confirm success in console
        localStorage.setItem('token', response.data.token);
        navigate('/blogs'); // Navigate to /blogs on success
      } else {
        console.log('Login failed: success field is not true');
        setMessage('Login failed');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage('User not registered. Redirecting to create an account.');
        setTimeout(() => navigate('/register'), 2000);
      } else {
        console.error('Error during login:', error);
        setMessage('Login failed');
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit">Login</button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="register-link">
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')}>Register Here</span>
        </p>
      </div>
    </div>
  );
};

export default Login;



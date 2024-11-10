// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/auth.css';  // Import the CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/user/register', formData);
      setMessage(response.data.message);

      // Navigate to login page after registration
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Error details:', error);
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred');
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>User Registration</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="register-link">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')}>Login Here</span>
        </p>
      </div>
    </div>
  );
};

export default Register;




// import React, { useState } from 'react';
// import '../css/register.css'; // Import the CSS file
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import toast from 'react-hot-toast';

// function RegisterPage() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         age: '',
//         password: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             console.log('Form submitted:', formData);
//             const res = await axios.post('/api/v1/user/register', formData);

//             if (res.data?.suceess) {
//                 toast.success('User registered successfully');
//                 navigate('/login');
//             } else {
//                 toast.error(res.data.message || 'Registration failed');
//             }
//         } catch (error) {
//             console.error('Error submitting form:', error);
//             toast.error(error.response?.data?.message || 'Registration failed');
//         }
//     };

//     return (
//         <>
//             <div className="register-page">
//                 <h1>Register</h1>
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label htmlFor="name">Name:</label>
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="email">Email:</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="age">Age:</label>
//                         <input
//                             type="number"
//                             id="age"
//                             name="age"
//                             value={formData.age}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="password">Password:</label>
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <button type="submit">Register</button>
//                 </form>
//                 <div>
//                     Already registered? <a href="/login">Sign in</a>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default RegisterPage;

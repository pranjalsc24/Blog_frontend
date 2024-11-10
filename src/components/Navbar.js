// Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css'; // Optional: Create a CSS file for Navbar styling

const Navbar = () => {
    const navigate = useNavigate();

    // const handleLogout = () => {
    //     // Add your logout logic here, e.g., clearing tokens or user data
    //     navigate('/login'); // Redirect to login page after logout
    // };

    const handleLogout = () => {
        try {
           
            localStorage.clear()
            navigate('/login')
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <nav className="navbar">
            <button onClick={() => navigate('/my-blog')}>My Blogs</button>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;

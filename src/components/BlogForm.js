// BlogForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../css/BlogForm.css'; // Optional: Create a separate CSS file for styling

const BlogForm = ({ onClose, onBlogCreated }) => {
    const [formData, setFormData] = useState({ title: '', content: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();   
        try {
            const response = await axios.post('http://localhost:8000/api/blog/create', formData, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`, // Add your authorization token if required
                },
            });
            onBlogCreated(response.data.blog); // Pass the created blog to the parent component
            onClose(); // Close the form
        } catch (err) {
            console.error('Error creating blog:', err);
            setError('Failed to create blog');
        }
    };

    return (
        <div className="blog-form">
            <h3>Create Blog</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Create Blog</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <button className="close-button" onClick={onClose}>Close</button>
        </div>
    );
};

export default BlogForm;

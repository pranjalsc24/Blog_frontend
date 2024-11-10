import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import '../css/MyBlogs.css';

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyBlogs = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from localStorage

                const response = await axios.get(`http://localhost:8000/api/blog/my-blogs`, {
                    headers: {
                        Authorization: token, // Pass the token in the Authorization header
                    },
                });

                setBlogs(response.data.blogs);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching blogs:', err);
                setError('Error fetching blogs');
                setLoading(false);
            }
        };

        fetchMyBlogs();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="my-blogs-container">
           
            <button onClick={() => navigate('/create-blog')}>Create New Blog</button> {/* Button to navigate to Create Blog page */}
            <div className="my-blogs-list">
                {blogs.map((blog) => (
                    <BlogCard 
                        key={blog._id} 
                        title={blog.title} 
                        content={blog.content} 
                        author={blog.author} 
                    />
                ))}
            </div>
        </div>
    );
};

export default MyBlogs;

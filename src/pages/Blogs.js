// Blogs.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard.js';
import BlogForm from '../components/BlogForm.js';
import Navbar from '../components/Navbar.js'; // Import Navbar component
import '../css/Blogs.css';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/blog/blogs');
                setBlogs(response.data.blogs);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching blogs:', err);
                setError('Error fetching blogs');
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleBlogCreated = (newBlog) => {
        setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="blogs-container">
            <Navbar /> {/* Add Navbar at the top */}
            {/* <button className="create-blog-button" onClick={() => setShowForm(true)}>Create Blog</button> */}
            {/* {showForm && <BlogForm onClose={() => setShowForm(false)} onBlogCreated={handleBlogCreated} />} */}
            <div className="blogs-list">
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

export default Blogs;

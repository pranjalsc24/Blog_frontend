import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');  // Get token from localStorage

  // Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/blog/blogs');
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  // Handle redirection to Create Blog page
  const handleCreateBlog = () => {
    if (token) {
      navigate('/create-blog');
    } else {
      navigate('/login');
    }
  };

  // Handle deleting a blog
  const handleDeleteBlog = async (blogId) => {
    try {
      if (!token) {
        navigate('/login');
        return;
      }
      await axios.delete(`http://localhost:8000/api/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(blogs.filter(blog => blog._id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  // Handle redirection to Update Blog page
  const handleUpdateBlog = (blogId) => {
    navigate(`/update-blog/${blogId}`);
  };

  return (
    <div>
      <h2>All Blogs</h2>
      <div className="blog-list">
        {blogs.length === 0 ? (
          <p>No blogs available</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <h3>{blog.title}</h3>
              <p>{blog.content.substring(0, 100)}...</p>  {/* Shorten content */}
              <button onClick={() => alert(`Viewing blog ${blog.title}`)}>Read More</button>

              {/* Display Edit/Delete options only for logged-in users */}
              {token && (
                <div>
                  <button onClick={() => handleUpdateBlog(blog._id)}>Update</button>
                  <button onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Show the Create Blog button only if the user is logged in */}
      {token && <button onClick={handleCreateBlog}>Create Blog</button>}
    </div>
  );
};

export default Home;

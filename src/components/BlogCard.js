// BlogCard.js
import React from 'react';
import '../css/blogCard.css'; // Optional: Create a separate CSS file for styling

const BlogCard = ({ title, content, author }) => {
    return (
        <div className="blog-card">
            <h3>{title}</h3>
            <p>{content}</p>
            <p className="author">By: {author.name}</p>
        </div>
    );
};

export default BlogCard;

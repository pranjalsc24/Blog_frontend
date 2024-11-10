import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const BlogDetails = () => {
    const [blog, setBlog] = useState({})
    const id = useParams().id
    const navigate = useNavigate()
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const getBlogDetail = async () => {
            try {
                const { data } = await axios.get(`/api/blog/blogs/${id}`)
                if (data?.success) {
                    setBlog(data?.blog)
                    setFormData({
                        title: data?.blog.title,
                        content: data?.blog.content,
                       
                    })
                }
            } catch (err) {
                console.log(err);
            }
        };

        getBlogDetail();
    }, [id]);


   const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          
            console.log('Blog created:', formData);
            const res = await axios.put(`/api/blog/update/${id}`, formData)
            if (res.data?.success) {
                console.log(res.data)
                toast.success('blog updated successfully')
                navigate('/my-blogs')
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    console.log(blog);
    return (
        <>
            <div className="register-page">
                <h1>Update Blog</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Content:</label>
                        <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} required />
                    </div>
                   
                    <button type="submit">Update Blog</button>
                </form>
            </div>
        </>
    )
}

export default BlogDetails
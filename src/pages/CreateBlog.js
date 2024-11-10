import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const CreateBlog = () => {
    const id = localStorage.getItem('token')
    console.log(id);
    
    const navigate = useNavigate()
    console.log(localStorage.getItem('token'));

    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });

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
            const res = await axios.post('/api/blog/create', formData)
            if (res.data?.success) {
                console.log(res.data)
                toast.success('blog creted successfully')
                navigate('/my-blogs')
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    return (
        <>
            <div className="register-page">
                <h1>Create Blog</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                    </div>


                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" name="description" value={formData.content} onChange={handleChange} required />
                    </div>
                   
                    <button type="submit">Create Blog</button>
                </form>
            </div>
        </>
    )
}

export default CreateBlog
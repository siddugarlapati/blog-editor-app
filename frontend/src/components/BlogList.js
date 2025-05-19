import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BlogList.css';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/blogs/');
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="blog-list-container">
            <h2>Your Blogs</h2>
            <div className="blog-section">
                <h3>Drafts</h3>
                {blogs.filter(blog => blog.status === 'draft').length === 0 ? (
                    <p className="no-blogs">No drafts available.</p>
                ) : (
                    blogs.filter(blog => blog.status === 'draft').map(blog => (
                        <div key={blog.id} className="blog-card">
                            <h4>{blog.title}</h4>
                            <p>{blog.content.replace(/<[^>]+>/g, '').substring(0, 150)}...</p>
                            <p className="blog-tags">Tags: {blog.tags}</p>
                        </div>
                    ))
                )}
            </div>
            <div className="blog-section">
                <h3>Published</h3>
                {blogs.filter(blog => blog.status === 'published').length === 0 ? (
                    <p className="no-blogs">No published blogs yet.</p>
                ) : (
                    blogs.filter(blog => blog.status === 'published').map(blog => (
                        <div key={blog.id} className="blog-card">
                            <h4>{blog.title}</h4>
                            <p>{blog.content.replace(/<[^>]+>/g, '').substring(0, 150)}...</p>
                            <p className="blog-tags">Tags: {blog.tags}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BlogList;
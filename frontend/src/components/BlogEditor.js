import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BlogEditor.css';

const BlogEditor = ({ onBlogSaved }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [currentBlogId, setCurrentBlogId] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (title || content || tags) {
                handleSaveDraft(true);
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [title, content, tags]);

    const handleSaveDraft = async (isAutoSave = false) => {
        const blogData = {
            id: currentBlogId,
            title,
            content,
            tags,
            status: 'draft',
        };
        try {
            const response = await axios.post('http://localhost:8000/api/blogs/save-draft/', blogData);
            setCurrentBlogId(response.data.id);
            if (isAutoSave) {
                toast.info('Draft auto-saved!');
            } else {
                toast.success('Draft saved!');
            }
            if (onBlogSaved) onBlogSaved();
        } catch (error) {
            toast.error('Error saving draft');
            console.error(error);
        }
    };

    const handlePublish = async () => {
        if (!currentBlogId) {
            await handleSaveDraft();
        }
        try {
            await axios.post('http://localhost:8000/api/blogs/publish/', { id: currentBlogId });
            toast.success('Blog published!');
            setTitle('');
            setContent('');
            setTags('');
            setCurrentBlogId(null);
            if (onBlogSaved) onBlogSaved();
        } catch (error) {
            toast.error('Error publishing blog');
            console.error(error);
        }
    };

    return (
        <div className="blog-editor-container">
            <ToastContainer />
            <h2>Create a New Blog Post</h2>
            <div className="blog-editor-form">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your blog title..."
                    className="blog-editor-input blog-editor-title"
                />
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    className="blog-editor-quill"
                    placeholder="Write your blog content here..."
                />
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Tags (e.g., travel, tech, lifestyle)"
                    className="blog-editor-input blog-editor-tags"
                />
                <div className="blog-editor-buttons">
                    <button onClick={() => handleSaveDraft()} className="save-draft-button">
                        Save as Draft
                    </button>
                    <button onClick={handlePublish} className="publish-button">
                        Publish Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogEditor;
import React from 'react';
import BlogEditor from './components/BlogEditor';
import BlogList from './components/BlogList';
import './App.css';

function App() {
    const [refreshBlogs, setRefreshBlogs] = React.useState(false);

    const handleBlogSaved = () => {
        setRefreshBlogs(!refreshBlogs);
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Blog Editor </h1>
            </header>
            <main className="app-main">
                <BlogEditor onBlogSaved={handleBlogSaved} />
                <BlogList key={refreshBlogs} />
            </main>
        </div>
    );
}

export default App;
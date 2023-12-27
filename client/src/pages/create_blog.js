import React, { useState } from 'react';
import '../css/create_blog.css';
import axios from 'axios';
import Header from '../components/header';

const CreateBlogPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const username = localStorage.getItem('username');

  const createBlog = () => {
    const timestamp = new Date(); 
    const blog_content = { username, title, content, timestamp };

    axios.post('http://localhost:5000/blog/create', blog_content)
      .then(response => {
        console.log(response.data);
        setTitle('');
        setContent('');
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className="create-blog-page">
      <Header />
      <div className="create-blog-container">
        <h2>Create a Blog</h2>
        <form>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Content:</label>
          <textarea
            rows="7"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <button type="button" onClick={createBlog}>
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPage;

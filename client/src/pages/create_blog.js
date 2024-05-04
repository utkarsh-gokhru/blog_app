import React, { useState } from 'react';
import '../css/create_blog.css';
import axios from 'axios';
import Header from '../components/header';

const CreateBlogPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // State to store the selected image file
  const username = localStorage.getItem('username');

  const createBlog = () => {
    const timestamp = new Date();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('timestamp', timestamp);
    if (image) {
      formData.append('image', image);
    }

    axios.post('https://blogapp-qmqx.onrender.com/blog/create', formData)
      .then(response => {
        console.log(response.data);
        setTitle('');
        setContent('');
        setImage(null);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); 
  };

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

          <label>Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*" // Accept only image files
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

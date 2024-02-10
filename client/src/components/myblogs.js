import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/myblogs.css';
import Header from './header';
import { BallTriangle } from 'react-loader-spinner';

const MyBlogs = () => {
  const username = localStorage.getItem('username');
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.post('https://blogapp-qmqx.onrender.com/blog/myblogs', { username })
      .then(response => {
        setMyBlogs(response.data.reverse());
        setLoading(false); // Set loading to false after fetching the data
      })
      .catch(error => {
        console.log(error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [username]);

  return (
    <section className="my-blogs">
      <Header />
      <h2>My Blogs</h2>

      {loading && (
        <div className="loader-container">
          <BallTriangle type="TailSpin" color="#00BFFF" height={80} width={80} />
        </div>
      )}

      {myBlogs.map((blog, index) => (
        <article key={blog._id} className="blog-post">
          <h4>{blog.title}</h4>
          <p style={{ whiteSpace: 'pre-line' }}>{blog.content}</p>
          <p>{`Posted on ${new Date(blog.timestamp).toLocaleDateString()} at ${new Date(blog.timestamp).toLocaleTimeString()}`}</p>
          {index !== myBlogs.length - 1 && <hr />}
        </article>
      ))}
    </section>
  );
};

export default MyBlogs;

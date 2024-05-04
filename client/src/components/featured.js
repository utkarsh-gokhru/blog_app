import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/featured.css';
import { BallTriangle } from 'react-loader-spinner';


const FeaturedPost = ({ searchQuery }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://blogapp-qmqx.onrender.com/blog/get')
      .then(response => {
        setBlogs(response.data.reverse());
        setLoading(false); // Set loading to false after fetching the data
      })
      .catch(error => {
        console.log(error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  const highlightText = (text, query) => {
    if (!text) {
      return { __html: '' };
    }

    const regex = new RegExp(`(${query})`, 'gi');
    const highlightedText = text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
    return { __html: highlightedText };
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="featured-post">
      <h2>Blogs</h2>

      {loading && (
        <div className="loader-container">
          <BallTriangle type="TailSpin" color="#00BFFF" height={80} width={80} />
        </div>
      )}

      {!loading &&
        filteredBlogs.map((blog, index) => (
          <article key={blog._id} className="blog-post">
            <div className='content-class'>
                <div className="blog-user">
                  <h3 dangerouslySetInnerHTML={highlightText(blog.username, searchQuery)} />
                </div>
              <div className='content'>
                <div className='blog-txt'>
                  <div className="blog-title">
                    <h4 dangerouslySetInnerHTML={highlightText(blog.title, searchQuery)} />
                  </div>
                  <div className="blog-content">
                    <p style={{ whiteSpace: 'pre-line' }}>{blog.content}</p>
                  </div>
                </div>
                <div className='img-cont'>
                  {blog.image && <img src={'https://blogapp-qmqx.onrender.com/images/' + blog.image} alt="Blog" className='img' />}
                </div>
              </div>
            </div>
            <p>{`Posted on ${new Date(blog.timestamp).toLocaleDateString()} at ${new Date(blog.timestamp).toLocaleTimeString()}`}</p>
            {index !== filteredBlogs.length - 1 && <hr />}
          </article>
        ))
      }
    </section>
  );
};

export default FeaturedPost;

import React from 'react';
import '../css/landing.css';

const LandingPage = () => {

    return (
        <div className="landing-page">
            <header>
                <h1>BlogSphere</h1>
                <p>Discover the latest insights on technology, lifestyle, and more.</p>
                <a href="/signup" className="cta-button">
                Explore Now
                </a>
            </header>
            <section id="explore" className="features">
                <div className="feature">
                <h2>Latest Posts</h2>
                <p>Stay updated with our most recent and exciting blog posts.</p>
                </div>
                <div className="feature">
                <h2>Categories</h2>
                <p>Explore a variety of topics, organized for your convenience.</p>
                </div>
                <div className="feature">
                <h2>Join Us</h2>
                <p>Sign up now and become part of our growing community.</p>
                </div>
            </section>
            <footer>
                <p>&copy; 2023 Your Awesome Blog. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;

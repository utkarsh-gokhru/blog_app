import React from 'react';
import { Link } from 'react-router-dom';
import '../css/featured.css'

const Header = () => {

  const handleLogout = () => {
    localStorage.clear();

  }

  return (
    <header className='home_header'>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/create">Create Blog</Link>
        <Link to="/myblogs">My Blogs</Link>
        <Link to="/" onClick={handleLogout}>LogOut</Link>
      </nav>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import Header from "../components/header";
import FeaturedPost from "../components/featured";
import '../css/home.css';

const HomePage =() => {

    const [searchQuery, setSearchQuery] = useState('');

    return(
        <div className="homePage">
            <Header />
            <div className="search-bar">
                <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="hp">
                <main>
                    <FeaturedPost searchQuery={searchQuery} />
                </main>
            </div>
        </div>
    )
}

export default HomePage;

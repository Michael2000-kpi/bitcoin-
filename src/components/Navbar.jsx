import React from "react";
import "./Navbar.css";
import Search from "./Search";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="list">
        {/* Navigation links */}
        {/*Елементи на майбутнє*/ }
        <li>
          <a href="#" className="link">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="link">
            Blogs
          </a>
        </li>
        <li>
          <a href="#" className="link">
            Services
          </a>
        </li>
        {/* Filter button */}
        <li>
          <a href="#" className="link">
            Filter
          </a>
        </li>
        {/* Search component */}
        <li>
          <div className="search-link">
            <Search />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

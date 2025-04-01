import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/courses">Major and Minor Courses</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/check-prerequisites">Check Prerequisites</Link></li>
          <li><Link to="/next-classes">Next Classes</Link></li>
          <li><Link to="/graduation-requirements">Graduation Requirements</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

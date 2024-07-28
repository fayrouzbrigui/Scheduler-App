import React from 'react'
import {Link} from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1 className="title">Scheduler</h1>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="signup">Signup</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
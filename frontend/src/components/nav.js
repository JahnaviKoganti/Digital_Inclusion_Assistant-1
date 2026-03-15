import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const { pathname } = useLocation();
  const active = (path) => pathname === path ? 'active' : '';
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="logo">
          <div className="logo-mark">🧭</div>
          CoPilot
        </Link>
        <ul className="nav-links">
          <li><Link to="/"             className={active('/')}>Home</Link></li>
          <li><Link to="/how-it-works" className={active('/how-it-works')}>How It Works</Link></li>
          <li><Link to="/about"        className={active('/about')}>About</Link></li>
          <li><Link to="/assistant"    className={`nav-cta ${active('/assistant')}`}>Try It Free →</Link></li>
        </ul>
      </div>
    </nav>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div className="logo-mark" style={{ width:28, height:28, fontSize:14, borderRadius:8 }}>🧭</div>
          <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, color:'var(--text-dim)' }}>CoPilot</span>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/about">About</Link>
          <Link to="/assistant">Try It</Link>
        </div>
        <span>Powered by Gemini 2.5 Flash</span>
      </div>
    </footer>
  );
}
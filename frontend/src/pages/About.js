import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      <div className="page-hero">
        <h1>🌍 About CoPilot</h1>
        <p>Built to bridge the digital divide — making the web accessible to everyone, regardless of age or experience.</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div>
              <span className="badge badge-blue" style={{ marginBottom:16 }}>Our Mission</span>
              <h2>The web shouldn't leave anyone behind.</h2>
              <p style={{ margin:'16px 0' }}>Modern websites are full of jargon, dark patterns, and confusing navigation. For elderly users and those with low digital literacy, this creates real barriers to essential services like banking, healthcare, and government support.</p>
              <p style={{ marginBottom:28 }}>CoPilot acts as a translator — sitting between the user and any website, making it understandable in real time.</p>
              <Link to="/assistant" className="btn btn-primary">Try CoPilot →</Link>
            </div>
            <div>
              {[
                { icon:'📊', title:'The Problem Is Real',  desc:'Millions struggle with digital services daily. Banking apps, government portals, and e-commerce sites assume a level of digital literacy that many simply don\'t have.' },
                { icon:'🤖', title:'AI as a Bridge',       desc:'Rather than simplifying every website (impossible), CoPilot translates any website into plain language in real time.' },
                { icon:'🔒', title:'Safety First',         desc:'Elderly users are disproportionately targeted by online scams. The Security Agent provides protection against manipulation and fraud.' },
              ].map((c,i) => (
                <div key={i} className="about-card">
                  <div className="about-card-icon">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p style={{ fontSize:'0.92rem', marginTop:6 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop:0 }}>
        <div className="container">
          <div className="section-head fade-in" style={{ marginBottom:48 }}>
            <span className="badge badge-teal" style={{ marginBottom:16 }}>Meet the Agents</span>
            <h2>Three specialists working as one</h2>
            <p>Each agent is a separate AI prompt optimised for its specific role.</p>
          </div>
          {[
            { cls:'v', icon:'👁️', badge:'badge-blue', label:'Agent 1', title:'Vision Agent',      desc:'The "eyes" of CoPilot. Systematically identifies every interactive and informational element on the page. Answers: "What is actually on this page?"' },
            { cls:'i', icon:'💬', badge:'badge-teal', label:'Agent 2', title:'Instruction Agent', desc:'The "voice" of CoPilot. Rewrites the element map as warm, numbered, plain-English steps. Answers: "How do I actually use this page?"' },
            { cls:'s', icon:'🛡️', badge:'badge-red',  label:'Agent 3', title:'Security Agent',    desc:'The "guardian" of CoPilot. Analyses for dark patterns, scam indicators, and trust signals. Answers: "Is it safe to interact with this page?"' },
          ].map((a,i) => (
            <div key={i} className="agent-profile">
              <div className={`agent-avatar ${a.cls}`}>{a.icon}</div>
              <div>
                <span className={`badge ${a.badge}`} style={{ marginBottom:8 }}>{a.label}</span>
                <h3 style={{ marginBottom:8 }}>{a.title}</h3>
                <p style={{ fontSize:'0.92rem' }}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop:0 }}>
        <div className="container">
          <div className="section-head fade-in" style={{ marginBottom:48 }}>
            <span className="badge badge-blue" style={{ marginBottom:16 }}>Under the Hood</span>
            <h2>Built on modern tech</h2>
            <p>React frontend, FastAPI Python backend, and Gemini 2.5 Flash.</p>
          </div>
          <div className="tech-grid">
            {[
              { icon:'⚛️', title:'React Frontend',    desc:'A fast, modern UI with smooth animations and a premium dark glassmorphism design.' },
              { icon:'🐍', title:'FastAPI Backend',   desc:'Python server that handles all Gemini API calls securely. Your API key never touches the browser.' },
              { icon:'✨', title:'Gemini 2.5 Flash',  desc:'Google\'s multimodal AI — sees images and understands text. Perfect for screenshot analysis.' },
              { icon:'⚡', title:'Fast',               desc:'All three agents complete in under 30 seconds.' },
              { icon:'👁️', title:'Multimodal Vision', desc:'Gemini natively understands images — no third-party OCR or processing needed.' },
              { icon:'🔑', title:'Secure by Design',  desc:'API key lives in a .env file on your machine. Nothing sensitive ever reaches the browser.' },
            ].map((t,i) => (
              <div key={i} className="tech-card">
                <div className="tech-card-icon">{t.icon}</div>
                <h3>{t.title}</h3>
                <p style={{ fontSize:'0.88rem' }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="cta-band">
          <h2>Try CoPilot today</h2>
          <p>Run the Python backend, open the React app, upload your first screenshot.</p>
          <Link to="/assistant" className="btn btn-primary btn-lg">Open CoPilot →</Link>
        </div>
      </div>
    </>
  );
}
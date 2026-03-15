import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">
              <span className="badge badge-blue">♿ Digital Inclusion Assistant</span>
            </div>
            <h1>
              The web,<br/>
              made <span className="highlight">simple</span><br/>
              for everyone.
            </h1>
            <p className="hero-desc">
              CoPilot uses three AI agents to look at any website, explain it in plain language,
              and warn you about scams — all in seconds.
            </p>
            <div className="hero-btns">
              <Link to="/assistant" className="btn btn-primary btn-lg">Try CoPilot →</Link>
              <Link to="/how-it-works" className="btn btn-ghost btn-lg">How It Works</Link>
            </div>
          </div>
          <div className="agent-preview">
            <div className="agent-preview-card">
              <div className="agent-icon v">👁️</div>
              <div>
                <div className="agent-name">Agent 1 — Vision</div>
                <div className="agent-desc">Scans your screenshot and identifies every button, form, link and piece of text.</div>
              </div>
            </div>
            <div className="agent-preview-card">
              <div className="agent-icon i">💬</div>
              <div>
                <div className="agent-name">Agent 2 — Instruction</div>
                <div className="agent-desc">Turns confusing tech language into friendly, step-by-step plain-English guidance.</div>
              </div>
            </div>
            <div className="agent-preview-card">
              <div className="agent-icon s">🛡️</div>
              <div>
                <div className="agent-name">Agent 3 — Security</div>
                <div className="agent-desc">Flags scam indicators, dark patterns, and hidden traps before you click anything.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head fade-in">
            <span className="badge badge-blue" style={{ marginBottom:16 }}>Simple Process</span>
            <h2>Three steps to understanding any website</h2>
            <p>Upload a screenshot, let the agents analyse it, and get clear guidance in seconds.</p>
          </div>
          <div className="steps-grid">
            <div className="step-card fade-in">
              <div className="step-num">1</div>
              <div className="step-icon">📸</div>
              <h3>Take a Screenshot</h3>
              <p>Confused by a banking site, a government portal, or a shopping page? Screenshot it and upload to CoPilot.</p>
            </div>
            <div className="step-card fade-in-2">
              <div className="step-num">2</div>
              <div className="step-icon">🤖</div>
              <h3>AI Agents Analyse It</h3>
              <p>Three specialist agents powered by Gemini run in sequence — scanning, explaining, and checking safety.</p>
            </div>
            <div className="step-card fade-in-3">
              <div className="step-num">3</div>
              <div className="step-icon">✅</div>
              <h3>Get Clear Guidance</h3>
              <p>Receive a plain-English breakdown, simple action steps, and any red flags or warnings.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop:0 }}>
        <div className="container">
          <div className="section-head fade-in">
            <span className="badge badge-teal" style={{ marginBottom:16 }}>Built for Real People</span>
            <h2>Designed for those who need it most</h2>
            <p>Built for elderly users, those with low digital literacy, and anyone who finds modern websites overwhelming.</p>
          </div>
          <div className="features-grid">
            {[
              { icon:'👴', title:'Elderly-Friendly',         desc:'Plain language, no jargon. Guidance like a patient family member explaining things step by step.' },
              { icon:'🔍', title:'Sees What You See',        desc:'Upload any screenshot — banking, shopping, government forms — and Agent 1 maps every element.' },
              { icon:'⚠️', title:'Scam Detection',           desc:'Hidden subscriptions, pre-ticked boxes, fake urgency, phishing links — Agent 3 catches them all.' },
              { icon:'🌐', title:'Works on Any Website',     desc:'Banking portals, government sites, e-commerce, health services — any screenshot works.' },
              { icon:'💡', title:'Step-by-Step Instructions',desc:'"Press the big green button to send money." Simple, numbered steps anyone can follow.' },
              { icon:'⚡', title:'Instant Results',           desc:'Three agents run in sequence and deliver a complete analysis in under 30 seconds.' },
            ].map((f,i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="cta-band">
          <span className="badge badge-blue" style={{ marginBottom:20 }}>Get Started Free</span>
          <h2>Ready to navigate the web<br/>with confidence?</h2>
          <p>Add your Gemini API key to the backend and upload your first screenshot.</p>
          <Link to="/assistant" className="btn btn-primary btn-lg">Open CoPilot →</Link>
        </div>
      </div>
    </>
  );
}
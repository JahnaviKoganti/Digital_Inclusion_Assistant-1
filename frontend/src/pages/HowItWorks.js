import React from 'react';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  return (
    <>
      <div className="page-hero">
        <h1>⚙️ How CoPilot Works</h1>
        <p>Three AI agents run in sequence to give you a complete, safe picture of any website.</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head fade-in">
            <span className="badge badge-blue" style={{ marginBottom:16 }}>The Pipeline</span>
            <h2>Each agent has one job.<br/>Together they cover everything.</h2>
            <p>Rather than one AI doing everything, CoPilot uses three specialist agents — each optimised for its role.</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, marginTop:56 }}>
            {[
              { cls:'v', icon:'👁️', badge:'badge-blue', label:'Agent 1', title:'Vision Agent',
                glow:'var(--blue-glow)',
                desc:'Receives your screenshot and identifies every visible element — buttons, text fields, links, checkboxes — and produces a structured map for the other agents.',
                output:'Structured JSON list of all UI elements with type, label and position.' },
              { cls:'i', icon:'💬', badge:'badge-teal', label:'Agent 2', title:'Instruction Agent',
                glow:'var(--teal-glow)',
                desc:'Takes Agent 1\'s element map and rewrites it as warm, friendly, numbered steps — like a patient family member explaining things. No jargon.',
                output:'Numbered plain-text steps like "Press the big green button that says Pay Now."' },
              { cls:'s', icon:'🛡️', badge:'badge-red',  label:'Agent 3', title:'Security Agent',
                glow:'var(--red-glow)',
                desc:'Analyses the element map for red flags: hidden subscription checkboxes, fake urgency messages, confusing opt-outs, phishing signs — and spots trust signals.',
                output:'Risk level (Safe → High), list of flags, plain-English safety verdict.' },
            ].map((a,i) => (
              <div key={i} className="glass" style={{ borderRadius:'var(--radius-xl)', overflow:'hidden', transition:'all 0.3s' }}
                   onMouseEnter={e => e.currentTarget.style.transform='translateY(-6px)'}
                   onMouseLeave={e => e.currentTarget.style.transform=''}>
                <div style={{ background:`linear-gradient(135deg, ${a.glow}, transparent)`, padding:'32px 28px 24px', borderBottom:'1px solid var(--border)' }}>
                  <div style={{ fontSize:'3rem', marginBottom:14 }}>{a.icon}</div>
                  <span className={`badge ${a.badge}`} style={{ marginBottom:10 }}>{a.label}</span>
                  <h3>{a.title}</h3>
                </div>
                <div style={{ padding:'24px 28px' }}>
                  <p style={{ marginBottom:18, fontSize:'0.92rem' }}>{a.desc}</p>
                  <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid var(--border)', borderRadius:10, padding:'12px 16px', fontSize:'0.8rem', color:'var(--text-dimmer)' }}>
                    <strong style={{ color:'var(--text-dim)' }}>Output: </strong>{a.output}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pipeline">
            <h3>The Analysis Pipeline</h3>
            <div className="pipeline-flow">
              {[
                { emoji:'🖼️', label:'Your Input',   name:'Screenshot',  cls:'' },
                null,
                { emoji:'👁️', label:'Agent 1',      name:'Vision',      cls:'blue' },
                null,
                { emoji:'💬', label:'Agent 2',      name:'Instruction', cls:'teal' },
                null,
                { emoji:'🛡️', label:'Agent 3',      name:'Security',    cls:'red' },
                null,
                { emoji:'✅', label:'Your Result',  name:'Full Report', cls:'' },
              ].map((node,i) => node
                ? <div key={i} className={`pipeline-node ${node.cls}`}>
                    <div className="pipeline-node-emoji">{node.emoji}</div>
                    <div className="pipeline-node-label">{node.label}</div>
                    <div className="pipeline-node-name">{node.name}</div>
                  </div>
                : <div key={i} className="pipeline-arrow">→</div>
              )}
            </div>
            <p style={{ textAlign:'center', color:'var(--text-dimmer)', fontSize:'0.85rem', marginTop:24 }}>
              Each agent passes its output to the next. The whole pipeline runs in under 30 seconds.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop:0 }}>
        <div className="container">
          <div className="section-head fade-in">
            <span className="badge badge-red" style={{ marginBottom:16 }}>Security Agent Detail</span>
            <h2>What does the Security Agent look for?</h2>
            <p>Many websites use deliberate tricks to confuse users into spending money or sharing data.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16, marginTop:48 }}>
            {[
              { icon:'☑️', title:'Pre-ticked Subscription Boxes', color:'var(--red)',   desc:'Checkboxes already ticked to sign you up to newsletters or paid services without you noticing.' },
              { icon:'⏱️', title:'Fake Urgency Timers',           color:'var(--red)',   desc:'"Only 2 left!" or countdown timers designed to panic you into quick decisions.' },
              { icon:'🚪', title:'Roach Motels',                  color:'var(--amber)', desc:'Easy to sign up, near-impossible to cancel. Flagged when no cancellation option exists.' },
              { icon:'🎭', title:'Disguised Ads',                 color:'var(--amber)', desc:'Buttons that look like official content but are actually paid ads or scam redirects.' },
              { icon:'🪤', title:'Confirm-shaming',               color:'var(--red)',   desc:'Opt-out buttons that say "No thanks, I don\'t want to save money" to guilt you.' },
              { icon:'🎣', title:'Phishing Signs',                color:'var(--red)',   desc:'Pages impersonating banks or government sites to steal your login details.' },
            ].map((f,i) => (
              <div key={i} className="glass" style={{ borderRadius:'var(--radius-lg)', padding:'24px', borderLeft:`3px solid ${f.color}`, transition:'all 0.3s' }}
                   onMouseEnter={e => e.currentTarget.style.transform='translateX(4px)'}
                   onMouseLeave={e => e.currentTarget.style.transform=''}>
                <div style={{ fontSize:'1.5rem', marginBottom:10 }}>{f.icon}</div>
                <h3 style={{ fontSize:'1rem', marginBottom:6 }}>{f.title}</h3>
                <p style={{ fontSize:'0.88rem' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="cta-band">
          <h2>See it in action</h2>
          <p>Take a screenshot of any website and let the three agents guide you through it safely.</p>
          <Link to="/assistant" className="btn btn-primary btn-lg">Open CoPilot →</Link>
        </div>
      </div>
    </>
  );
}
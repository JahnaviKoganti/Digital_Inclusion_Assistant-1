import React, { useState, useRef, useCallback } from 'react';

function safeJson(text) {
  try { return JSON.parse(text.replace(/```json|```/g, '').trim()); }
  catch { return null; }
}
function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }
function iconFor(type) {
  return { button:'🟢', input:'✏️', link:'🔗', text:'📄', checkbox:'☑️', dropdown:'▼', image:'🖼️' }[type] || '•';
}

function VisionResult({ text }) {
  const data = safeJson(text);
  if (!data) return <p style={{ whiteSpace:'pre-wrap' }}>{text}</p>;
  const typeClass = { button:'button', input:'input', link:'link', text:'text', checkbox:'checkbox', dropdown:'input' };
  return (
    <>
      <p><strong style={{ color:'var(--text)' }}>Page identified as:</strong> {data.pageTitle}</p>
      <p style={{ margin:'10px 0 18px' }}>{data.summary}</p>
      <h4>Elements Found</h4>
      <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:12 }}>
        {(data.elements || []).map((el, i) => (
          <span key={i} className={`el-tag ${typeClass[el.type] || ''}`}>
            {iconFor(el.type)} {el.label}
          </span>
        ))}
      </div>
      <p style={{ fontSize:'0.8rem', color:'var(--text-dimmer)' }}>{(data.elements||[]).length} elements identified</p>
    </>
  );
}

function InstructionResult({ text }) {
  const lines = text.split('\n').filter(l => l.trim());
  let stepNum = 0;
  let inSteps = false;
  return (
    <>
      {lines.map((line, i) => {
        const trimmed = line.trim();
        const match = trimmed.match(/^(\d+)[.)]\s+(.+)/);
        if (match) {
          inSteps = true; stepNum++;
          return (
            <div key={i} className="step-item">
              <div className="step-circle">{stepNum}</div>
              <div className="step-text">{match[2]}</div>
            </div>
          );
        }
        if (trimmed && !inSteps) return <p key={i} style={{ marginBottom:14 }}>{trimmed}</p>;
        if (trimmed && inSteps) return (
          <p key={i} style={{ marginTop:16, padding:'12px 16px', background:'var(--blue-glow)', border:'1px solid rgba(59,158,255,0.15)', borderRadius:10, fontSize:'0.9rem', color:'var(--blue)' }}>
            💙 {trimmed}
          </p>
        );
        return null;
      })}
    </>
  );
}

function SecurityResult({ text }) {
  const data = safeJson(text);
  if (!data) return <p style={{ whiteSpace:'pre-wrap' }}>{text}</p>;
  const riskMap = {
    safe:   { bg:'rgba(0,217,126,0.10)',  border:'rgba(0,217,126,0.25)',  color:'var(--green)',  label:'✅ Safe' },
    low:    { bg:'rgba(255,184,48,0.10)', border:'rgba(255,184,48,0.25)', color:'var(--amber)',  label:'⚠️ Low Risk' },
    medium: { bg:'rgba(255,130,0,0.10)',  border:'rgba(255,130,0,0.25)',  color:'#ff8200',       label:'⚠️ Medium Risk' },
    high:   { bg:'rgba(255,92,92,0.10)',  border:'rgba(255,92,92,0.25)',  color:'var(--red)',    label:'🚨 High Risk' },
  };
  const risk = riskMap[data.riskLevel] || riskMap.safe;
  return (
    <>
      <div className="risk-badge" style={{ background:risk.bg, border:`1px solid ${risk.border}`, color:risk.color }}>
        Risk Level: {risk.label}
      </div>
      <p style={{ marginBottom:18 }}>{data.verdict}</p>
      {data.flags && data.flags.length > 0 ? (
        <>
          <h4>⚠️ Issues Found</h4>
          {data.flags.map((f,i) => (
            <div key={i} className="flag-item">
              <span className="flag-dot">●</span>
              <span><strong>{capitalize(f.type.replace('_',' '))}: </strong>{f.description}</span>
            </div>
          ))}
        </>
      ) : (
        <div className="safe-notice">✅ No scam indicators or dark patterns detected.</div>
      )}
      {data.trustSignals && data.trustSignals.length > 0 && (
        <>
          <h4 style={{ marginTop:18 }}>✅ Trust Signals</h4>
          {data.trustSignals.map((s,i) => <div key={i} className="trust-item">✔ {s}</div>)}
        </>
      )}
    </>
  );
}

export default function Assistant() {
  const [image, setImage]       = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(null);
  const [results, setResults]   = useState(null);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const fileInputRef = useRef();

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setImage({ file, preview: URL.createObjectURL(file) });
    setResults(null); setError('');
  }, []);

  const onDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const reset = () => {
    setImage(null); setResults(null);
    setError(''); setProgress(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const runAnalysis = async () => {
    if (!image) return;
    setError(''); setResults(null); setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', image.file);
      setProgress('step1');
      await new Promise(r => setTimeout(r, 400));
      setProgress('step2');
      await new Promise(r => setTimeout(r, 400));
      setProgress('step3');
      const res = await fetch('/analyse', { method:'POST', body:formData });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `Server error ${res.status}`);
      }
      const data = await res.json();
      setProgress('done');
      setResults(data);
    } catch (err) {
      setProgress(null);
      setError(`Analysis failed: ${err.message}. Make sure the Python backend is running on port 8000.`);
    } finally {
      setLoading(false);
    }
  };

  const stepStatus = (step) => {
    const order = ['step1','step2','step3','done'];
    const cur = order.indexOf(progress);
    const s   = order.indexOf(step);
    if (progress === 'done') return 'done';
    if (cur === s) return 'active';
    if (cur > s)  return 'done';
    return '';
  };

  return (
    <>
      <div className="page-hero">
        <h1>🧭 Your Digital Co-Pilot</h1>
        <p>Upload a website screenshot. Three AI agents will analyse it and guide you through it safely.</p>
      </div>

      <div className="assistant-wrap">

        <div
          className={`upload-zone ${dragOver ? 'drag-over' : ''} ${image ? 'has-image' : ''}`}
          onClick={() => !image && fileInputRef.current.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
        >
          {image ? (
            <>
              <img src={image.preview} className="upload-preview visible" alt="Screenshot" />
              <button className="upload-change-btn" onClick={(e) => { e.stopPropagation(); reset(); }}>
                🔄 Change image
              </button>
            </>
          ) : (
            <>
              <div className="upload-icon">🖼️</div>
              <h3>Upload a website screenshot</h3>
              <p>Click here or drag &amp; drop a PNG, JPG, or WEBP image</p>
            </>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display:'none' }} onChange={(e) => handleFile(e.target.files[0])} />
        </div>

        <button className="analyse-btn" onClick={runAnalysis} disabled={!image || loading}>
          {loading ? '⏳ Analysing…' : '🔍 Analyse This Page'}
        </button>

        {error && (
          <div className="error-banner visible">
            <span>⚠️</span><span>{error}</span>
          </div>
        )}

        {progress && (
          <div className="progress-bar visible">
            <div className="progress-steps">
              {[
                { id:'step1', icon:'👁️', label:'Agent 1 — Vision\nScanning elements…' },
                { id:'step2', icon:'💬', label:'Agent 2 — Instruction\nWriting guidance…' },
                { id:'step3', icon:'🛡️', label:'Agent 3 — Security\nChecking for risks…' },
              ].map(s => {
                const status = stepStatus(s.id);
                return (
                  <div key={s.id} className={`progress-step ${status}`}>
                    <span className="progress-step-icon">{s.icon}</span>
                    <div className="progress-step-label" style={{ whiteSpace:'pre-line' }}>{s.label}</div>
                    {status === 'active' && <div className="spinner" />}
                    {status === 'done'   && <span style={{ marginLeft:'auto', color:'var(--teal)', fontSize:'1rem' }}>✓</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {results && (
          <div className="results visible">
            <div className="result-block">
              <div className="result-header vision">
                <div className="result-icon vision">👁️</div>
                <div>
                  <div className="result-title">Agent 1 — Vision Analysis</div>
                  <div className="result-sub">What's on this page</div>
                </div>
              </div>
              <div className="result-body"><VisionResult text={results.vision} /></div>
            </div>

            <div className="result-block">
              <div className="result-header instruct">
                <div className="result-icon instruct">💬</div>
                <div>
                  <div className="result-title">Agent 2 — Plain English Guide</div>
                  <div className="result-sub">Step-by-step instructions</div>
                </div>
              </div>
              <div className="result-body"><InstructionResult text={results.instruction} /></div>
            </div>

            <div className="result-block">
              <div className="result-header security">
                <div className="result-icon security">🛡️</div>
                <div>
                  <div className="result-title">Agent 3 — Security Check</div>
                  <div className="result-sub">Scam indicators &amp; dark patterns</div>
                </div>
              </div>
              <div className="result-body"><SecurityResult text={results.security} /></div>
            </div>

            <button className="btn btn-ghost" style={{ width:'100%', justifyContent:'center', marginTop:4 }} onClick={reset}>
              🔄 Analyse Another Page
            </button>
          </div>
        )}

      </div>
    </>
  );
}
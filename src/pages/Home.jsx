import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, 
  ArrowRight, 
  Check, 
  Copy, 
  GitCommit, 
  Server, 
  Shield, 
  Cpu, 
  Activity,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useToast } from '../context/ToastContext';

export default function Home() {
  const { showToast } = useToast();
  const [copiedCli, setCopiedCli] = useState(false);
  const [activeTab, setActiveTab] = useState('pipeline');

  const cliCommand = 'git clone https://github.com/Monitorcharan/react_project.git && cd react_project && npm run dev';

  const handleCopyCli = () => {
    navigator.clipboard.writeText(cliCommand);
    setCopiedCli(true);
    showToast('Copied repository setup command to clipboard', 'info');
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* Asymmetrical, High-Density Technical Hero Section */}
        <section style={{ borderBottom: '1px solid var(--border-default)', padding: '56px 0 48px' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)', gap: '40px', alignItems: 'center' }}>
              
              {/* Left Column: Concrete, Technical Proposition */}
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span className="chip chip-accent">ENGINEERING OPERATIONS &amp; TELEMETRY</span>
                </div>

                <h1 style={{ fontSize: '2.5rem', lineHeight: '1.15', marginBottom: '16px', letterSpacing: '-0.03em' }}>
                  Continuous delivery &amp; sprint tracking without the SaaS bloat.
                </h1>

                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
                  NexusFlow unifies task coordination, team velocity telemetry, and automated deployment pipelines into a single high-contrast workspace. Zero ambient noise. Zero decorative fluff.
                </p>

                {/* Primary Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
                  <Link to="/dashboard" className="btn btn-primary btn-lg" id="hero-enter-workspace-btn">
                    <span>Enter Workspace</span>
                    <ArrowRight size={15} />
                  </Link>
                  <Link to="/login" className="btn btn-secondary btn-lg" id="hero-quick-login-btn">
                    <span>Quick Demo Sign In</span>
                  </Link>
                </div>

                {/* Direct CLI Setup Box */}
                <div className="panel" style={{ padding: '12px 14px', background: 'var(--bg-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="label-caps">QUICKSTART VIA CLI</span>
                    <button
                      onClick={handleCopyCli}
                      className="btn btn-ghost btn-sm"
                      style={{ padding: '2px 8px', fontSize: '0.72rem', height: 'auto' }}
                      title="Copy command"
                    >
                      {copiedCli ? <Check size={12} color="var(--status-success)" /> : <Copy size={12} />}
                      <span style={{ fontFamily: 'var(--font-mono)' }}>{copiedCli ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)', wordBreak: 'break-all' }}>
                    $ {cliCommand}
                  </div>
                </div>

                {/* Concrete Operational Metrics */}
                <div style={{ display: 'flex', gap: '24px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>14ms</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>EDGE P99 LATENCY</div>
                  </div>
                  <div style={{ borderLeft: '1px solid var(--border-default)' }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>0.00%</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>RUNTIME CRASHES</div>
                  </div>
                  <div style={{ borderLeft: '1px solid var(--border-default)' }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>854ms</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>PRODUCTION BUILD</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Terminal Pipeline Inspector */}
              <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ background: 'var(--bg-subtle)', padding: '10px 14px', borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="indicator-dot online" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600 }}>pipeline-watcher // release-candidate-v2.4</span>
                  </div>
                  <span className="chip chip-success" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>PASSED</span>
                </div>

                <div style={{ padding: '16px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '8px', background: 'var(--bg-canvas)' }}>
                  <div style={{ color: 'var(--text-muted)' }}>[15:24:02] Initializing workspace build context:</div>
                  <div style={{ color: 'var(--text-secondary)' }}>&gt; git rev-parse --short HEAD &rarr; <span style={{ color: 'var(--text-primary)' }}>03f1e83</span></div>
                  <div style={{ color: 'var(--text-secondary)' }}>&gt; node environment: Node v20 LTS / Vite 8.3</div>
                  
                  <div style={{ margin: '8px 0', padding: '8px 12px', background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-xs)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-primary)', marginBottom: '4px' }}>
                      <span>Build &amp; Static Compilation</span>
                      <span style={{ color: 'var(--status-success)' }}>0 errors (854ms)</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'var(--bg-muted)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: '100%', height: '100%', background: 'var(--accent)' }} />
                    </div>
                  </div>

                  <div style={{ color: 'var(--text-secondary)' }}>&gt; dist/index.html ................ 1.45 kB (gzip: 0.74 kB)</div>
                  <div style={{ color: 'var(--text-secondary)' }}>&gt; dist/assets/index.js ......... 386.53 kB (gzip: 110.0 kB)</div>
                  <div style={{ color: 'var(--status-success)' }}>&gt; Render static CDN push completed: 28 global regions verified</div>
                  
                  <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-muted)' }}>STATUS: READY FOR TRAFFIC</span>
                    <Link to="/dashboard" className="chip chip-accent" style={{ textDecoration: 'none' }}>
                      <span>Open Workspace</span>
                      <ArrowUpRight size={11} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Concrete Technical Specification Matrix */}
        <section id="pipeline" style={{ padding: '48px 0', borderBottom: '1px solid var(--border-default)' }}>
          <div className="container">
            <div style={{ maxWidth: '640px', marginBottom: '32px' }}>
              <div className="label-caps" style={{ marginBottom: '8px' }}>CORE ARCHITECTURAL ATTRIBUTES</div>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>
                Engineered for operational clarity, not decorative trends.
              </h2>
              <p>
                Every component is structured around real engineering workflows: branch-level status, sub-millisecond route transitions, and strict access governance.
              </p>
            </div>

            <div className="table-wrap">
              <table className="dense-table">
                <thead>
                  <tr>
                    <th>Capability</th>
                    <th>Implementation Spec</th>
                    <th>Operational Benefit</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Single-Page App Routing</td>
                    <td>React Router v7 + <code>HashRouter</code> &amp; <code>_redirects</code></td>
                    <td>Zero 404s on page refresh across GitHub Pages &amp; Render Cloud</td>
                    <td><span className="chip chip-success">Verified</span></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Interactive Task Matrix</td>
                    <td>Kanban lanes with optimistic state transitions</td>
                    <td>Move tasks across Backlog, In Progress, Review, and Done instantaneously</td>
                    <td><span className="chip chip-success">Verified</span></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Edge Telemetry Charts</td>
                    <td>Pure SVG coordinate path algorithms (zero chart library overhead)</td>
                    <td>Sub-second render time with responsive area &amp; bar visualizations</td>
                    <td><span className="chip chip-success">Verified</span></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Zero-Bloat CSS Architecture</td>
                    <td>Strict CSS Custom Property tokens + 8px grid system</td>
                    <td>Total bundle footprint under 20KB of unminified styles</td>
                    <td><span className="chip chip-success">Verified</span></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Zero-Setup CI/CD Action</td>
                    <td>Standard GitHub Actions workflow (<code>deploy.yml</code>)</td>
                    <td>Automated build and artifact deployment on every push to <code>main</code></td>
                    <td><span className="chip chip-success">Verified</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 3: Before vs After Comparison */}
        <section id="benchmarks" style={{ padding: '48px 0', borderBottom: '1px solid var(--border-default)', background: 'var(--bg-subtle)' }}>
          <div className="container">
            <div style={{ maxWidth: '640px', marginBottom: '32px' }}>
              <div className="label-caps" style={{ marginBottom: '8px' }}>WORKFLOW IMPACT ANALYSIS</div>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
                Reclaiming team velocity from disconnected tooling.
              </h2>
            </div>

            <div className="grid-2">
              <div className="panel" style={{ padding: '24px', borderColor: 'var(--border-default)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span className="chip chip-danger" style={{ fontWeight: 600 }}>BEFORE NEXUSFLOW</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
                  <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--status-danger)', fontWeight: 700 }}>&times;</span>
                    <span>Stale sprint tickets scattered across multiple Jira, Trello, and Notion tabs.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--status-danger)', fontWeight: 700 }}>&times;</span>
                    <span>Manual deployment verification with no immediate visibility into CDN latency.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--status-danger)', fontWeight: 700 }}>&times;</span>
                    <span>Heavy SaaS interfaces overloaded with animations that lag during standups.</span>
                  </li>
                </ul>
              </div>

              <div className="panel" style={{ padding: '24px', borderColor: 'var(--accent)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span className="chip chip-accent" style={{ fontWeight: 600 }}>WITH NEXUSFLOW</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
                  <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: 'var(--text-primary)' }}>
                    <Check size={16} color="var(--status-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Single high-contrast dashboard connecting active tasks, git branches, and assignees.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: 'var(--text-primary)' }}>
                    <Check size={16} color="var(--status-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Direct telemetry graphs and continuous edge latency measurements refreshed on demand.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: 'var(--text-primary)' }}>
                    <Check size={16} color="var(--status-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Pure, deterministic React 19 performance running 60 FPS on any hardware.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Straightforward Deployment CTA */}
        <section id="deployment" style={{ padding: '48px 0' }}>
          <div className="container">
            <div className="panel" style={{ padding: '36px', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                  <div className="label-caps" style={{ marginBottom: '8px' }}>PRODUCTION-READY DEPLOYMENT</div>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '6px' }}>Deploy to GitHub Pages or Render in 60 seconds</h2>
                  <p style={{ maxWidth: '540px' }}>
                    Zero manual server configuration. Simply clone, configure your git remote, and push to <code>main</code>.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Link to="/signup" className="btn btn-primary btn-lg">
                    <span>Deploy Workspace</span>
                    <ArrowRight size={15} />
                  </Link>
                  <Link to="/dashboard" className="btn btn-outline btn-lg">
                    <span>Explore Live UI</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

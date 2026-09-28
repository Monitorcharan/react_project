import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { GitHubIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="public-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div className="brand-icon-box" style={{ width: '22px', height: '22px' }}>
                <Terminal size={13} />
              </div>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>NexusFlow</span>
            </div>
            <p style={{ fontSize: '0.84rem', lineHeight: '1.5', maxWidth: '300px', marginBottom: '16px' }}>
              Engineering operations and continuous delivery telemetry. Purpose-built for agile software teams deploying multiple times daily.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="chip chip-success" style={{ fontSize: '0.7rem' }}>
                <CheckCircle2 size={11} />
                <span>All 28 Edge Nodes Operational</span>
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <div className="label-caps" style={{ marginBottom: '12px' }}>Workspace</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
              <li><Link to="/dashboard" className="nav-link">Sprint Dashboard</Link></li>
              <li><Link to="/projects" className="nav-link">Kanban Issue Tracker</Link></li>
              <li><Link to="/analytics" className="nav-link">P99 Latency Telemetry</Link></li>
              <li><Link to="/team" className="nav-link">RBAC Access Control</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <div className="label-caps" style={{ marginBottom: '12px' }}>Deployment</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
              <li><a href="https://render.com" target="_blank" rel="noopener noreferrer" className="nav-link">Render Blueprint Spec</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="nav-link">GitHub Actions CI/CD</a></li>
              <li><Link to="/settings" className="nav-link">API Token Rotation</Link></li>
              <li><Link to="/login" className="nav-link">Demo Quick Login</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <div className="label-caps" style={{ marginBottom: '12px' }}>System Info</div>
            <div className="panel" style={{ padding: '12px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
              <div style={{ color: 'var(--text-muted)' }}>RUNNING BUILD:</div>
              <div style={{ color: 'var(--text-primary)', marginTop: '2px' }}>v2.4.0-edge (rev 03f1e83)</div>
              <div style={{ marginTop: '8px', color: 'var(--text-muted)' }}>HOST ENVIRONMENT:</div>
              <div style={{ color: 'var(--accent)', marginTop: '2px' }}>Render Edge &amp; GitHub Pages</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} NexusFlow Project. Standard MIT License.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Target: SPA React 19 + Vite 8</span>
            <span>Zero Runtime Dependencies Bloat</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

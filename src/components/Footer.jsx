import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Heart } from 'lucide-react';
import { GitHubIcon, TwitterIcon, LinkedInIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="public-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand */}
          <div>
            <div className="brand-logo" style={{ marginBottom: '1rem' }}>
              <div className="brand-icon-box" style={{ width: '32px', height: '32px' }}>
                <Layers size={18} />
              </div>
              <span style={{ fontSize: '1.2rem' }}>Nexus<span style={{ color: 'var(--primary)' }}>Flow</span></span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '320px', marginBottom: '1.25rem' }}>
              The unified Work Operating System designed for high-velocity software engineering, design, and product organizations.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="action-icon-btn" style={{ width: '34px', height: '34px' }} aria-label="GitHub">
                <GitHubIcon size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="action-icon-btn" style={{ width: '34px', height: '34px' }} aria-label="Twitter">
                <TwitterIcon size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="action-icon-btn" style={{ width: '34px', height: '34px' }} aria-label="LinkedIn">
                <LinkedInIcon size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Product */}
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1.2rem', color: 'var(--text-primary)' }}>Product</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li><Link to="/dashboard" style={{ transition: 'color 0.2s' }}>Dashboard Suite</Link></li>
              <li><Link to="/projects" style={{ transition: 'color 0.2s' }}>Kanban & Sprints</Link></li>
              <li><Link to="/analytics" style={{ transition: 'color 0.2s' }}>Telemetry & Charts</Link></li>
              <li><Link to="/team" style={{ transition: 'color 0.2s' }}>Collaboration Matrix</Link></li>
              <li><Link to="/settings" style={{ transition: 'color 0.2s' }}>Integrations & API</Link></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1.2rem', color: 'var(--text-primary)' }}>Platform</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li><span style={{ cursor: 'pointer' }}>Documentation</span></li>
              <li><span style={{ cursor: 'pointer' }}>Render Deployment</span></li>
              <li><span style={{ cursor: 'pointer' }}>GitHub Actions CI/CD</span></li>
              <li><span style={{ cursor: 'pointer' }}>Security Whitepaper</span></li>
              <li><span style={{ cursor: 'pointer' }}>API Reference</span></li>
            </ul>
          </div>

          {/* Col 4: Status & Deploy */}
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1.2rem', color: 'var(--text-primary)' }}>Cloud Health</h4>
            <div className="glass-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <span className="status-dot online"></span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>All Systems Nominal</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Render Edge CDN: 99.99% Uptime across 28 global regions.
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} NexusFlow Inc. Built with modern React &amp; Vite.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
            <span>Engineered with passion for high performance</span>
            <Heart size={14} color="var(--accent-rose)" fill="var(--accent-rose)" />
          </div>
        </div>
      </div>
    </footer>
  );
}

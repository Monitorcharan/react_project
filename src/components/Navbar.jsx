import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Sun, Moon, ArrowRight, Menu, X, LayoutDashboard } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="public-navbar">
      <div className="container nav-wrapper">
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to="/" className="brand-logo" id="nav-brand-logo">
            <div className="brand-icon-box">
              <Terminal size={15} />
            </div>
            <span>NexusFlow</span>
          </Link>
          <span className="chip" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>v2.4-edge</span>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links" style={{ display: window.innerWidth < 768 ? 'none' : 'flex' }}>
          <li>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Overview
            </Link>
          </li>
          <li>
            <a href="#pipeline" className="nav-link">Pipeline Spec</a>
          </li>
          <li>
            <a href="#benchmarks" className="nav-link">Benchmarks</a>
          </li>
          <li>
            <a href="#deployment" className="nav-link">Deployment</a>
          </li>
        </ul>

        {/* Actions */}
        <div className="nav-actions">
          <button
            onClick={toggleTheme}
            className="action-icon-btn"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            id="nav-theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {isAuthenticated ? (
            <Link to="/dashboard" className="btn btn-primary btn-sm" id="nav-dashboard-btn">
              <LayoutDashboard size={14} />
              <span>Workspace</span>
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm" id="nav-login-btn">
                Sign in
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm" id="nav-signup-btn">
                <span>Deploy Free</span>
                <ArrowRight size={13} />
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            className="action-icon-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: window.innerWidth < 768 ? 'flex' : 'none' }}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="panel"
          style={{
            margin: '8px 16px 0',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <Link to="/" onClick={() => setMobileOpen(false)} className="nav-link">Overview</Link>
          <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="nav-link">Workspace</Link>
          {!isAuthenticated && (
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <Link to="/login" onClick={() => setMobileOpen(false)} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>Sign in</Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)} className="btn btn-primary btn-sm" style={{ flex: 1 }}>Deploy Free</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

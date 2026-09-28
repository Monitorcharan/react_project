import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layers, Sun, Moon, ArrowRight, Menu, X, LayoutDashboard } from 'lucide-react';
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
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" id="nav-brand-logo">
          <div className="brand-icon-box">
            <Layers size={22} />
          </div>
          <span>Nexus<span style={{ color: 'var(--primary)' }}>Flow</span></span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav" style={{ display: 'none' }}>
          {/* Will show via CSS on desktop */}
        </nav>

        <ul className="nav-links" style={{ display: window.innerWidth < 768 ? 'none' : 'flex' }}>
          <li>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Overview
            </Link>
          </li>
          <li>
            <a href="#features" className="nav-link">Features</a>
          </li>
          <li>
            <a href="#solutions" className="nav-link">Solutions</a>
          </li>
          <li>
            <a href="#pricing" className="nav-link">Pricing</a>
          </li>
        </ul>

        {/* Nav Actions */}
        <div className="nav-actions">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="action-icon-btn"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            id="nav-theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {isAuthenticated ? (
            <Link to="/dashboard" className="btn btn-primary btn-sm" id="nav-dashboard-btn">
              <LayoutDashboard size={16} />
              <span>Workspace</span>
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm" id="nav-login-btn">
                Log in
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm" id="nav-signup-btn">
                <span>Start Free</span>
                <ArrowRight size={15} />
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            className="action-icon-btn mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: window.innerWidth < 768 ? 'flex' : 'none' }}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="glass-panel"
          style={{
            margin: '0.75rem 1rem',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="nav-link"
            style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}
          >
            Overview
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="nav-link"
            style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}
          >
            Workspace Dashboard
          </Link>
          {!isAuthenticated && (
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
              >
                Log In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

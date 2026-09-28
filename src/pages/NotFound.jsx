import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowLeft, Home, LayoutDashboard } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
      <div className="glass-card" style={{ maxWidth: '480px', padding: '3rem 2rem' }}>
        <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: 'var(--radius-xl)', background: 'var(--primary-light)', color: '#818cf8', marginBottom: '1.5rem' }}>
          <Layers size={40} />
        </div>
        <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.04em' }} className="gradient-text">
          404
        </h1>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>Route Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: '1.6' }}>
          The requested coordinate does not exist in the NexusFlow cluster, or has been relocated to another workspace node.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-secondary btn-sm">
            <Home size={16} />
            <span>Public Home</span>
          </Link>
          <Link to="/dashboard" className="btn btn-primary btn-sm">
            <LayoutDashboard size={16} />
            <span>Return to Workspace</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

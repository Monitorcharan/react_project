import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Layers, 
  LayoutDashboard, 
  CheckSquare, 
  BarChart3, 
  Users, 
  Settings, 
  ExternalLink, 
  LogOut, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast('Signed out of workspace', 'info');
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { to: '/projects', label: 'Projects & Tasks', icon: CheckSquare, badge: '6' },
    { to: '/analytics', label: 'Analytics Hub', icon: BarChart3, badge: 'Live' },
    { to: '/team', label: 'Team Directory', icon: Users, badge: null },
    { to: '/settings', label: 'Settings & Security', icon: Settings, badge: null },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 90,
            backdropFilter: 'blur(3px)',
          }}
          className="mobile-backdrop"
        />
      )}

      <aside
        className="app-sidebar"
        style={{
          position: window.innerWidth < 1024 ? 'fixed' : 'relative',
          top: 0,
          bottom: 0,
          left: 0,
          transform: window.innerWidth < 1024 && !isOpen ? 'translateX(-100%)' : 'translateX(0)',
          zIndex: 100,
          minHeight: '100vh',
          boxShadow: isOpen ? 'var(--shadow-lg)' : 'none',
        }}
      >
        {/* Brand Header */}
        <div className="sidebar-header">
          <Link to="/" className="brand-logo" style={{ fontSize: '1.2rem' }}>
            <div className="brand-icon-box" style={{ width: '32px', height: '32px' }}>
              <Layers size={18} />
            </div>
            <span>Nexus<span style={{ color: 'var(--primary)' }}>Flow</span></span>
          </Link>
        </div>

        {/* Navigation Section */}
        <div className="sidebar-nav">
          <span className="sidebar-section-title">Core Workspace</span>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => {
                  if (window.innerWidth < 1024 && onClose) onClose();
                }}
                className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                id={`sidebar-link-${item.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                <Icon size={19} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`item-badge ${item.badge === 'Live' ? 'badge-success' : ''}`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          <span className="sidebar-section-title" style={{ marginTop: '1.5rem' }}>Portals</span>
          <Link to="/" className="sidebar-item" target="_blank" rel="noopener noreferrer">
            <ExternalLink size={17} />
            <span>Public Showcase</span>
            <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
          </Link>

          {/* Pro Workspace Badge / Banner */}
          <div
            className="glass-card"
            style={{
              marginTop: 'auto',
              marginBottom: '1rem',
              padding: '1rem',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(6, 182, 212, 0.12) 100%)',
              borderColor: 'rgba(99, 102, 241, 0.25)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#818cf8', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.35rem' }}>
              <Sparkles size={14} />
              <span>{user?.plan || 'Enterprise Pro'}</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              Unlimited collaborative sprints &amp; real-time cloud analytics enabled.
            </p>
            <div style={{ width: '100%', height: '4px', background: 'var(--bg-tertiary)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: '74%', height: '100%', background: 'linear-gradient(90deg, #6366f1, #06b6d4)' }} />
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.35rem' }}>74% cloud storage used</span>
          </div>
        </div>

        {/* User Mini Card in Footer */}
        <div className="sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
            <Link
              to="/settings"
              style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', overflow: 'hidden', flex: 1 }}
              title="View Profile Settings"
            >
              <div className="avatar-img">
                {user?.avatar || 'NU'}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {user?.name || 'Nexus User'}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {user?.role || 'Developer'}
                </div>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="action-icon-btn"
              title="Sign Out"
              style={{ width: '32px', height: '32px', flexShrink: 0 }}
              aria-label="Sign out"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

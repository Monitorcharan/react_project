import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Terminal, 
  LayoutDashboard, 
  CheckSquare, 
  BarChart3, 
  Users, 
  Settings, 
  ExternalLink, 
  LogOut, 
  Server
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
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, kbd: 'G D', badge: null },
    { to: '/projects', label: 'Issues & Tasks', icon: CheckSquare, kbd: 'G P', badge: '6' },
    { to: '/analytics', label: 'Edge Telemetry', icon: BarChart3, kbd: 'G A', badge: '14ms' },
    { to: '/team', label: 'Team & RBAC', icon: Users, kbd: 'G T', badge: null },
    { to: '/settings', label: 'Settings & Keys', icon: Settings, kbd: 'G S', badge: null },
  ];

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 90,
          }}
          className="mobile-backdrop"
        />
      )}

      <aside className={`app-sidebar ${isOpen ? 'open' : ''}`}>

        {/* Workspace Brand / Selector */}
        <div className="sidebar-header">
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="brand-icon-box">
              <Terminal size={14} />
            </div>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>NexusFlow</div>
              <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>prod-cluster // us-east</div>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="sidebar-nav">
          <span className="sidebar-section-title">OPERATIONS</span>
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
                <Icon size={16} />
                <span>{item.label}</span>
                {item.badge ? (
                  <span className="item-badge">{item.badge}</span>
                ) : (
                  <span className="item-badge" style={{ opacity: 0.6 }}>{item.kbd}</span>
                )}
              </NavLink>
            );
          })}

          <span className="sidebar-section-title" style={{ marginTop: '16px' }}>PORTALS</span>
          <Link to="/" className="sidebar-item" target="_blank" rel="noopener noreferrer">
            <ExternalLink size={15} />
            <span>Public Home</span>
          </Link>

          {/* System Telemetry Spec Panel */}
          <div
            className="panel"
            style={{
              marginTop: 'auto',
              marginBottom: '12px',
              padding: '10px',
              background: 'var(--bg-canvas)',
              fontSize: '0.74rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>RENDER EDGE:</span>
              <span style={{ color: 'var(--status-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="indicator-dot online" /> 28 POPs
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>BUILD REV:</span>
              <span style={{ color: 'var(--text-secondary)' }}>03f1e83</span>
            </div>
          </div>
        </div>

        {/* User Mini Row */}
        <div className="sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <Link
              to="/settings"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', flex: 1 }}
              title="Account settings"
            >
              <div className="avatar-img">
                {user?.avatar || 'NU'}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {user?.name || 'Engineer'}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {user?.role || 'Staff Lead'}
                </div>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="action-icon-btn"
              title="Terminate session"
              style={{ width: '28px', height: '28px' }}
              aria-label="Sign out"
            >
              <LogOut size={13} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

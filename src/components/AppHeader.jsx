import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  Plus, 
  User, 
  Settings, 
  LogOut, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import NotificationDropdown from './NotificationDropdown';

export default function AppHeader({ onToggleSidebar, onOpenNewTask }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'deploy', title: 'Render static build v2.4.0 active on edge', time: '5m ago', unread: true },
    { id: 2, type: 'pr', title: 'Sarah Chen merged #418: Auth flow verification', time: '32m ago', unread: true },
    { id: 3, type: 'security', title: 'Zero-trust RBAC policy audit passed', time: '2h ago', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;
  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    showToast('Activity stream marked as read', 'info');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    showToast(`Filtering workspace for: "${searchQuery}"`, 'info');
    navigate('/projects');
  };

  return (
    <header className="app-header">
      {/* Left: Mobile hamburger & search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          className="action-icon-btn mobile-nav-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation drawer"
        >
          <Menu size={16} />
        </button>

        <form onSubmit={handleSearchSubmit} className="header-search">
          <Search size={14} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search issues, branches, telemetry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="app-global-search"
          />
          <span className="kbd-shortcut">/</span>
        </form>
      </div>

      {/* Right: Actions */}
      <div className="header-actions">
        {onOpenNewTask && (
          <button
            onClick={onOpenNewTask}
            className="btn btn-primary btn-sm"
            id="header-create-btn"
          >
            <Plus size={14} />
            <span style={{ display: window.innerWidth < 640 ? 'none' : 'inline' }}>New Issue</span>
          </button>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="action-icon-btn"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          id="header-theme-toggle"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Activity Bell */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="action-icon-btn"
            title="Activity Feed"
            id="header-notif-btn"
            aria-label="View activity"
          >
            <Bell size={15} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>

          {showNotifications && (
            <NotificationDropdown
              notifications={notifications}
              onMarkAllRead={handleMarkAllRead}
              onClose={() => setShowNotifications(false)}
            />
          )}
        </div>

        {/* User Mini Avatar */}
        <div style={{ position: 'relative' }} ref={userMenuRef}>
          <div
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            id="header-user-avatar"
          >
            <div className="avatar-img">
              {user?.avatar || 'NU'}
            </div>
          </div>

          {showUserMenu && (
            <div className="dropdown-menu">
              <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-default)', marginBottom: '4px' }}>
                <div style={{ fontWeight: 600, fontSize: '0.84rem', color: 'var(--text-primary)' }}>{user?.name}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{user?.email}</div>
              </div>

              <Link to="/settings" onClick={() => setShowUserMenu(false)} className="dropdown-item">
                <User size={14} />
                <span>Profile Settings</span>
              </Link>
              <Link to="/team" onClick={() => setShowUserMenu(false)} className="dropdown-item">
                <ShieldCheck size={14} />
                <span>Team &amp; Access</span>
              </Link>
              <Link to="/settings" onClick={() => setShowUserMenu(false)} className="dropdown-item">
                <Settings size={14} />
                <span>API Keys &amp; Deploy</span>
              </Link>

              <div className="dropdown-divider" />

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  logout();
                  showToast('Signed out of workspace', 'info');
                  navigate('/login');
                }}
                className="dropdown-item"
                style={{ color: 'var(--status-danger)' }}
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

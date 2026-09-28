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
  HelpCircle,
  ShieldCheck
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
    { id: 1, type: 'deploy', title: 'Render static build v2.4.0 successfully deployed to edge', time: '5m ago', unread: true },
    { id: 2, type: 'pr', title: 'Sarah Chen requested review on #418 - Auth Flow enhancement', time: '32m ago', unread: true },
    { id: 3, type: 'security', title: 'Security policy audit passed with 100% compliance', time: '2h ago', unread: false },
    { id: 4, type: 'general', title: 'Sprint velocity increased by +18.4% this week', time: '1d ago', unread: false },
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
    showToast('All notifications marked as read', 'info');
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
      <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center', gap: '1rem' }}>
        <button
          className="action-icon-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation drawer"
          style={{ display: window.innerWidth < 1024 ? 'flex' : 'none' }}
        >
          <Menu size={19} />
        </button>

        <form onSubmit={handleSearchSubmit} className="header-search">
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search projects, tasks, team (Press Enter)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="app-global-search"
          />
        </form>
      </div>

      {/* Right: Actions, Theme, Notifs, Profile */}
      <div className="header-actions">
        {/* Quick Action Button */}
        {onOpenNewTask && (
          <button
            onClick={onOpenNewTask}
            className="btn btn-primary btn-sm"
            id="header-create-btn"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Plus size={16} />
            <span style={{ display: window.innerWidth < 640 ? 'none' : 'inline' }}>New Task</span>
          </button>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="action-icon-btn"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          id="header-theme-toggle"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="action-icon-btn"
            title="Notifications"
            id="header-notif-btn"
            aria-label="View notifications"
          >
            <Bell size={17} />
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

        {/* User Avatar Menu */}
        <div style={{ position: 'relative' }} ref={userMenuRef}>
          <div
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              cursor: 'pointer',
              padding: '0.2rem 0.4rem',
              borderRadius: 'var(--radius-md)',
              transition: 'background 0.2s',
            }}
            id="header-user-avatar"
          >
            <div className="avatar-img" style={{ width: '34px', height: '34px', fontSize: '0.8rem' }}>
              {user?.avatar || 'NU'}
            </div>
            <div style={{ display: window.innerWidth < 768 ? 'none' : 'block', textAlign: 'left' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                {user?.name || 'Nexus User'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {user?.plan || 'Pro Tier'}
              </div>
            </div>
          </div>

          {showUserMenu && (
            <div className="dropdown-menu">
              <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.3rem' }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{user?.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.email}</div>
              </div>

              <Link to="/settings" onClick={() => setShowUserMenu(false)} className="dropdown-item">
                <User size={15} />
                <span>My Profile</span>
              </Link>
              <Link to="/team" onClick={() => setShowUserMenu(false)} className="dropdown-item">
                <ShieldCheck size={15} />
                <span>Team &amp; Access</span>
              </Link>
              <Link to="/settings" onClick={() => setShowUserMenu(false)} className="dropdown-item">
                <Settings size={15} />
                <span>Workspace Settings</span>
              </Link>

              <div className="dropdown-divider" />

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  logout();
                  showToast('Logged out successfully', 'info');
                  navigate('/login');
                }}
                className="dropdown-item"
                style={{ color: 'var(--accent-rose)' }}
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

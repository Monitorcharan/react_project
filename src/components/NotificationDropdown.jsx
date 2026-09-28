import React from 'react';
import { Check, Bell, GitPullRequest, Zap, ShieldCheck } from 'lucide-react';

export default function NotificationDropdown({ notifications, onMarkAllRead, onClose }) {
  const getIcon = (type) => {
    switch (type) {
      case 'pr':
        return <GitPullRequest size={15} color="var(--primary)" />;
      case 'deploy':
        return <Zap size={15} color="var(--accent-cyan)" />;
      case 'security':
        return <ShieldCheck size={15} color="var(--accent-emerald)" />;
      default:
        return <Bell size={15} color="var(--accent-amber)" />;
    }
  };

  return (
    <div className="dropdown-menu" style={{ width: '340px', padding: '0.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.5rem' }}>
        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Workspace Activity</span>
        <button
          onClick={onMarkAllRead}
          style={{ background: 'transparent', border: 'none', color: '#818cf8', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
        >
          <Check size={13} />
          <span>Mark read</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '280px', overflowY: 'auto' }}>
        {notifications.map((item) => (
          <div
            key={item.id}
            style={{
              padding: '0.6rem',
              borderRadius: 'var(--radius-sm)',
              background: item.unread ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
              display: 'flex',
              gap: '0.65rem',
              alignItems: 'flex-start',
              transition: 'background 0.2s',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              {getIcon(item.type)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: item.unread ? 600 : 500, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                {item.title}
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {item.time}
              </div>
            </div>
            {item.unread && (
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', marginTop: '6px' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

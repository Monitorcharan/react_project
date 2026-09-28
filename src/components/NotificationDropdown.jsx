import React from 'react';
import { Check, Bell, GitPullRequest, Zap, ShieldCheck } from 'lucide-react';

export default function NotificationDropdown({ notifications, onMarkAllRead, onClose }) {
  const getIcon = (type) => {
    switch (type) {
      case 'pr':
        return <GitPullRequest size={13} color="var(--accent)" />;
      case 'deploy':
        return <Zap size={13} color="var(--status-success)" />;
      case 'security':
        return <ShieldCheck size={13} color="var(--status-warning)" />;
      default:
        return <Bell size={13} color="var(--text-muted)" />;
    }
  };

  return (
    <div className="dropdown-menu" style={{ width: '320px', padding: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-default)', marginBottom: '6px' }}>
        <span style={{ fontWeight: 600, fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>SYSTEM EVENTS</span>
        <button
          onClick={onMarkAllRead}
          style={{ background: 'transparent', border: 'none', color: 'var(--accent)', fontSize: '0.74rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
        >
          <Check size={12} />
          <span>Mark Read</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '260px', overflowY: 'auto' }}>
        {notifications.map((item) => (
          <div
            key={item.id}
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-xs)',
              background: item.unread ? 'var(--bg-subtle)' : 'transparent',
              border: item.unread ? '1px solid var(--border-default)' : '1px solid transparent',
              display: 'flex',
              gap: '8px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: 'var(--radius-xs)',
                background: 'var(--bg-canvas)',
                border: '1px solid var(--border-default)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '1px',
              }}
            >
              {getIcon(item.type)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.78rem', fontWeight: item.unread ? 600 : 400, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                {item.title}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                {item.time}
              </div>
            </div>
            {item.unread && (
              <span className="indicator-dot online" style={{ marginTop: '5px' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

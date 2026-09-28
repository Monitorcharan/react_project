import React, { useState } from 'react';
import { X, Send, Mail, Shield } from 'lucide-react';

export default function InviteModal({ isOpen, onClose, onInvite }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Senior Engineer');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    onInvite({
      email: email.trim(),
      role,
    });

    setEmail('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.25rem' }}>Invite Team Collaborator</h3>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
          Send an invitation link to collaborate on projects, sprints, and telemetry.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              <Mail size={13} style={{ display: 'inline', marginRight: '4px' }} />
              Teammate Work Email
            </label>
            <input
              type="email"
              required
              placeholder="colleague@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Shield size={13} style={{ display: 'inline', marginRight: '4px' }} />
              Workspace Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-input"
            >
              <option value="Senior Engineer">Senior Engineer</option>
              <option value="Product Designer">Product Designer</option>
              <option value="DevOps Lead">DevOps Lead</option>
              <option value="Admin">Workspace Admin</option>
              <option value="Viewer">Viewer (Read Only)</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              <Send size={15} />
              <span>Send Invite</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

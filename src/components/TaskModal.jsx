import React, { useState } from 'react';
import { X, Check, Flag, Calendar, Tag, User } from 'lucide-react';

export default function TaskModal({ isOpen, onClose, onAddTask }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Frontend');
  const [priority, setPriority] = useState('High');
  const [assignee, setAssignee] = useState('Alex Morgan');
  const [dueDate, setDueDate] = useState('Tomorrow');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      category,
      priority,
      assignee,
      dueDate,
      status: 'In Progress',
      progress: 10,
    });

    setTitle('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid var(--border-default)' }}>
          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Create Workspace Issue</div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Issue Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Implement OAuth 2.0 PKCE flow"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              autoFocus
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
              >
                <option value="Frontend">Frontend UI</option>
                <option value="Backend">API &amp; Backend</option>
                <option value="DevOps">CI/CD &amp; Cloud</option>
                <option value="Security">Security &amp; Auth</option>
                <option value="Design">Design Systems</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="form-input"
              >
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Assignee</label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="form-input"
              >
                <option value="Alex Morgan">Alex Morgan</option>
                <option value="Sarah Chen">Sarah Chen</option>
                <option value="Marcus Vance">Marcus Vance</option>
                <option value="Elena Rostova">Elena Rostova</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Target Due Date</label>
              <input
                type="text"
                placeholder="e.g. In 2 days"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              <Check size={14} />
              <span>Register Issue</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

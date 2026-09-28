import React, { useState } from 'react';
import { X, CheckCircle2, Flag, Calendar, Tag, User } from 'lucide-react';

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
      id: 'task_' + Date.now().toString(36),
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.25rem' }}>Create Workspace Task</h3>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Task Title</label>
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">
                <Tag size={13} style={{ display: 'inline', marginRight: '4px' }} />
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
              >
                <option value="Frontend">Frontend UI</option>
                <option value="Backend">API &amp; Backend</option>
                <option value="DevOps">CI/CD &amp; Cloud</option>
                <option value="Design">Product Design</option>
                <option value="QA">Quality Assurance</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Flag size={13} style={{ display: 'inline', marginRight: '4px' }} />
                Priority
              </label>
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">
                <User size={13} style={{ display: 'inline', marginRight: '4px' }} />
                Assignee
              </label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="form-input"
              >
                <option value="Alex Morgan">Alex Morgan (You)</option>
                <option value="Sarah Chen">Sarah Chen (Lead)</option>
                <option value="Marcus Vance">Marcus Vance</option>
                <option value="Elena Rostova">Elena Rostova</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} />
                Target Due Date
              </label>
              <input
                type="text"
                placeholder="e.g. In 2 days"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              <CheckCircle2 size={16} />
              <span>Create Task</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

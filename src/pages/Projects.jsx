import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Kanban, 
  List, 
  Calendar,
  GitBranch,
  Filter
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import TaskModal from '../components/TaskModal';

export default function Projects() {
  const { showToast } = useToast();
  const [viewMode, setViewMode] = useState('kanban');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [tasks, setTasks] = useState([
    {
      id: 'NX-101',
      title: 'Vite 6 & React 19 Core Framework Upgrade',
      category: 'Frontend',
      priority: 'Urgent',
      status: 'In Progress',
      assignee: 'Alex Morgan',
      avatar: 'AM',
      dueDate: 'Tomorrow',
    },
    {
      id: 'NX-102',
      title: 'Render Static Edge CI/CD Action Pipeline',
      category: 'DevOps',
      priority: 'High',
      status: 'In Review',
      assignee: 'Sarah Chen',
      avatar: 'SC',
      dueDate: 'Oct 2',
    },
    {
      id: 'NX-103',
      title: 'Zero-Trust RBAC & JWT Session Rotation',
      category: 'Security',
      priority: 'High',
      status: 'In Progress',
      assignee: 'Marcus Vance',
      avatar: 'MV',
      dueDate: 'Oct 5',
    },
    {
      id: 'NX-104',
      title: 'Deterministic SVG Performance Visualizers',
      category: 'Analytics',
      priority: 'Medium',
      status: 'Done',
      assignee: 'Elena Rostova',
      avatar: 'ER',
      dueDate: 'Closed',
    },
    {
      id: 'NX-105',
      title: 'High-Contrast 8px Grid Design Tokens',
      category: 'Design',
      priority: 'Medium',
      status: 'Done',
      assignee: 'Alex Morgan',
      avatar: 'AM',
      dueDate: 'Closed',
    },
    {
      id: 'NX-106',
      title: 'Verify Client-Side Bundle Budget Under 150KB',
      category: 'DevOps',
      priority: 'Low',
      status: 'Backlog',
      assignee: 'Alex Morgan',
      avatar: 'AM',
      dueDate: 'Sprint 43',
    },
  ]);

  const handleAddTask = (newTask) => {
    const formattedTask = {
      ...newTask,
      id: 'NX-' + (tasks.length + 101),
      status: 'In Progress',
      avatar: newTask.assignee.split(' ').map(n => n[0]).join('').substring(0, 2),
    };
    setTasks(prev => [formattedTask, ...prev]);
    showToast(`Registered issue ${formattedTask.id}`, 'success');
  };

  const handleMoveStatus = (taskId, newStatus) => {
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    showToast(`Issue ${taskId} &rarr; ${newStatus}`, 'info');
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.assignee.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'All' || t.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const columns = [
    { id: 'Backlog', title: 'BACKLOG' },
    { id: 'In Progress', title: 'IN PROGRESS' },
    { id: 'In Review', title: 'IN REVIEW' },
    { id: 'Done', title: 'DONE' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <span>WORKSPACE</span>
            <span>/</span>
            <span>ISSUES</span>
          </div>
          <h1 style={{ fontSize: '1.6rem', letterSpacing: '-0.02em' }}>
            Sprint Issue Tracker
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', background: 'var(--bg-canvas)', border: '1px solid var(--border-default)', padding: '2px', borderRadius: 'var(--radius-sm)' }}>
            <button
              onClick={() => setViewMode('kanban')}
              className={`btn-sm ${viewMode === 'kanban' ? 'btn-secondary' : 'btn-ghost'}`}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', padding: '3px 8px' }}
            >
              <Kanban size={13} />
              <span>Board</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`btn-sm ${viewMode === 'list' ? 'btn-secondary' : 'btn-ghost'}`}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', padding: '3px 8px' }}
            >
              <List size={13} />
              <span>List</span>
            </button>
          </div>

          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="btn btn-primary btn-sm"
            id="projects-create-task-btn"
          >
            <Plus size={14} />
            <span>Create Issue</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
        <div className="input-with-icon" style={{ minWidth: '260px', maxWidth: '360px', flex: 1 }}>
          <Search size={14} className="input-icon" />
          <input
            type="text"
            placeholder="Search by key, title or assignee..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '32px', fontSize: '0.82rem', paddingBlock: '6px' }}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {['All', 'Frontend', 'Backend', 'DevOps', 'Security', 'Design'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`btn-sm ${categoryFilter === cat ? 'btn-secondary' : 'btn-ghost'}`}
              style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: 'var(--radius-xs)' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board */}
      {viewMode === 'kanban' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', alignItems: 'start' }}>
          {columns.map((col) => {
            const colTasks = filteredTasks.filter(t => t.status === col.id);
            return (
              <div
                key={col.id}
                className="panel"
                style={{
                  padding: '12px',
                  minHeight: '440px',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--bg-subtle)',
                }}
              >
                {/* Column Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid var(--border-default)', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {col.title}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      ({colTasks.length})
                    </span>
                  </div>
                  <button
                    onClick={() => setIsTaskModalOpen(true)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    title="Add issue"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  {colTasks.map((t) => (
                    <div
                      key={t.id}
                      className="panel"
                      style={{
                        padding: '12px',
                        background: 'var(--bg-surface)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {t.id}
                        </span>
                        <span className={`chip ${
                          t.priority === 'Urgent' ? 'chip-danger' : t.priority === 'High' ? 'chip-warning' : 'chip-accent'
                        }`} style={{ fontSize: '0.68rem', padding: '0px 5px' }}>
                          {t.priority}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                        {t.title}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', paddingTop: '6px', borderTop: '1px solid var(--border-subtle)' }}>
                        <span>{t.dueDate}</span>
                        <div className="avatar-img" style={{ width: '22px', height: '22px', fontSize: '0.64rem' }}>
                          {t.avatar}
                        </div>
                      </div>

                      {/* State transition selector */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>STATE:</span>
                        <select
                          value={t.status}
                          onChange={(e) => handleMoveStatus(t.id, e.target.value)}
                          style={{
                            background: 'var(--bg-subtle)',
                            border: '1px solid var(--border-default)',
                            color: 'var(--text-secondary)',
                            fontSize: '0.72rem',
                            fontFamily: 'var(--font-mono)',
                            borderRadius: 'var(--radius-xs)',
                            padding: '2px 4px',
                            outline: 'none',
                            flex: 1,
                          }}
                        >
                          <option value="Backlog">Backlog</option>
                          <option value="In Progress">In Progress</option>
                          <option value="In Review">In Review</option>
                          <option value="Done">Done</option>
                        </select>
                      </div>
                    </div>
                  ))}

                  {colTasks.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '24px 8px', color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                      EMPTY LANE
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="table-wrap">
          <table className="dense-table">
            <thead>
              <tr>
                <th>Key</th>
                <th>Title</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Assignee</th>
                <th>Due</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((t) => (
                <tr key={t.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--text-muted)' }}>{t.id}</td>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.title}</td>
                  <td><span className="chip">{t.category}</span></td>
                  <td>
                    <span className={`chip ${
                      t.priority === 'Urgent' ? 'chip-danger' : t.priority === 'High' ? 'chip-warning' : 'chip-accent'
                    }`}>
                      {t.priority}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div className="avatar-img" style={{ width: '20px', height: '20px', fontSize: '0.62rem' }}>{t.avatar}</div>
                      <span style={{ fontSize: '0.82rem' }}>{t.assignee}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>{t.dueDate}</td>
                  <td>
                    <select
                      value={t.status}
                      onChange={(e) => handleMoveStatus(t.id, e.target.value)}
                      style={{
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-default)',
                        color: 'var(--text-primary)',
                        padding: '3px 6px',
                        borderRadius: 'var(--radius-xs)',
                        fontSize: '0.78rem',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      <option value="Backlog">Backlog</option>
                      <option value="In Progress">In Progress</option>
                      <option value="In Review">In Review</option>
                      <option value="Done">Done</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}

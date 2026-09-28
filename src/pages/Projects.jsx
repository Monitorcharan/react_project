import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Kanban, 
  List, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  MoreHorizontal, 
  ArrowRight,
  Flag,
  Calendar,
  Layers
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import TaskModal from '../components/TaskModal';

export default function Projects() {
  const { showToast } = useToast();
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'list'
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [tasks, setTasks] = useState([
    {
      id: 'task-1',
      title: 'Vite 6 & React 19 Upgrade with strict types',
      category: 'Frontend',
      priority: 'Urgent',
      status: 'In Progress',
      assignee: 'Alex Morgan',
      avatar: 'AM',
      dueDate: 'Tomorrow',
    },
    {
      id: 'task-2',
      title: 'Integrate Render SPA rewrites and edge caching',
      category: 'DevOps',
      priority: 'High',
      status: 'In Review',
      assignee: 'Sarah Chen',
      avatar: 'SC',
      dueDate: 'Oct 2',
    },
    {
      id: 'task-3',
      title: 'Design Dark Mode Glassmorphism Tokens',
      category: 'Design',
      priority: 'Medium',
      status: 'Done',
      assignee: 'Elena Rostova',
      avatar: 'ER',
      dueDate: 'Completed',
    },
    {
      id: 'task-4',
      title: 'Implement PKCE OAuth flow for Google & GitHub',
      category: 'Backend',
      priority: 'High',
      status: 'In Progress',
      assignee: 'Marcus Vance',
      avatar: 'MV',
      dueDate: 'Oct 5',
    },
    {
      id: 'task-5',
      title: 'Benchmark client-side bundle size under 150KB',
      category: 'DevOps',
      priority: 'Low',
      status: 'Backlog',
      assignee: 'Alex Morgan',
      avatar: 'AM',
      dueDate: 'Next Sprint',
    },
    {
      id: 'task-6',
      title: 'Automated GitHub Actions Pages workflow',
      category: 'DevOps',
      priority: 'High',
      status: 'Done',
      assignee: 'Sarah Chen',
      avatar: 'SC',
      dueDate: 'Completed',
    },
  ]);

  const handleAddTask = (newTask) => {
    const formattedTask = {
      ...newTask,
      status: 'In Progress',
      avatar: newTask.assignee.split(' ').map(n => n[0]).join('').substring(0, 2),
    };
    setTasks(prev => [formattedTask, ...prev]);
    showToast(`Task "${newTask.title}" added to sprint board`, 'success');
  };

  const handleMoveStatus = (taskId, newStatus) => {
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    showToast(`Moved task to "${newStatus}"`, 'info');
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.assignee.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'All' || t.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const columns = [
    { id: 'Backlog', title: 'Backlog', color: 'var(--text-muted)' },
    { id: 'In Progress', title: 'In Progress', color: 'var(--primary)' },
    { id: 'In Review', title: 'In Review', color: 'var(--accent-purple)' },
    { id: 'Done', title: 'Completed', color: 'var(--accent-emerald)' },
  ];

  const getPriorityBadge = (p) => {
    switch (p) {
      case 'Urgent': return <span className="badge badge-danger">Urgent</span>;
      case 'High': return <span className="badge badge-warning">High</span>;
      case 'Medium': return <span className="badge badge-primary">Medium</span>;
      default: return <span className="badge badge-info">Low</span>;
    }
  };

  return (
    <div>
      {/* Header & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.9rem', marginBottom: '0.3rem' }}>
            Sprint Projects &amp; Tasks
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Organize team deliverables with interactive boards and status workflows.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* View Toggle */}
          <div style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '0.2rem', borderRadius: 'var(--radius-md)' }}>
            <button
              onClick={() => setViewMode('kanban')}
              className={`btn-sm ${viewMode === 'kanban' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              <Kanban size={15} />
              <span>Board</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              <List size={15} />
              <span>List</span>
            </button>
          </div>

          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="btn btn-primary btn-sm"
            id="projects-create-task-btn"
          >
            <Plus size={16} />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '260px', maxWidth: '400px' }}>
          <div className="input-with-icon" style={{ width: '100%' }}>
            <Search size={15} className="input-icon" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ padding: '0.55rem 0.75rem 0.55rem 2.4rem', fontSize: '0.88rem' }}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', overflowX: 'auto', paddingBottom: '4px' }}>
          {['All', 'Frontend', 'Backend', 'DevOps', 'Design'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`btn-sm ${categoryFilter === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.8rem' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', alignItems: 'start' }}>
          {columns.map((col) => {
            const colTasks = filteredTasks.filter(t => t.status === col.id);
            return (
              <div
                key={col.id}
                style={{
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  padding: '1.1rem',
                  minHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Column Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: col.color }} />
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{col.title}</span>
                    <span style={{ fontSize: '0.75rem', background: 'var(--bg-tertiary)', padding: '0.1rem 0.45rem', borderRadius: 'var(--radius-full)', color: 'var(--text-secondary)' }}>
                      {colTasks.length}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsTaskModalOpen(true)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    title="Add task to this column"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                {/* Task Cards Container */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
                  {colTasks.map((t) => (
                    <div
                      key={t.id}
                      className="glass-card"
                      style={{
                        padding: '1rem',
                        cursor: 'default',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.65rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                          {t.category}
                        </span>
                        {getPriorityBadge(t.priority)}
                      </div>

                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                        {t.title}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.4rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Calendar size={13} />
                          <span>{t.dueDate}</span>
                        </div>
                        <div className="avatar-img" style={{ width: '24px', height: '24px', fontSize: '0.68rem' }} title={`Assigned to ${t.assignee}`}>
                          {t.avatar}
                        </div>
                      </div>

                      {/* Status Transition Quick Selector */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Move to:</span>
                        <select
                          value={t.status}
                          onChange={(e) => handleMoveStatus(t.id, e.target.value)}
                          style={{
                            background: 'var(--bg-primary)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-secondary)',
                            fontSize: '0.72rem',
                            borderRadius: '4px',
                            padding: '2px 4px',
                            outline: 'none',
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
                    <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.8rem', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                      No tasks in this lane
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="glass-card" style={{ padding: '1rem' }}>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Assignee</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((t) => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.title}</td>
                    <td><span className="badge badge-info">{t.category}</span></td>
                    <td>{getPriorityBadge(t.priority)}</td>
                    <td style={{ fontSize: '0.82rem' }}>{t.dueDate}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div className="avatar-img" style={{ width: '24px', height: '24px', fontSize: '0.65rem' }}>
                          {t.avatar}
                        </div>
                        <span style={{ fontSize: '0.85rem' }}>{t.assignee}</span>
                      </div>
                    </td>
                    <td>
                      <select
                        value={t.status}
                        onChange={(e) => handleMoveStatus(t.id, e.target.value)}
                        style={{
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                          padding: '4px 8px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.8rem',
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
        </div>
      )}

      {/* Task Creation Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}

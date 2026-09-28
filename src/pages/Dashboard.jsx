import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  CheckCircle, 
  Clock, 
  FolderKanban, 
  Users, 
  Plus, 
  Search, 
  ExternalLink, 
  MoreVertical, 
  Zap, 
  ArrowUpRight,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import TaskModal from '../components/TaskModal';
import InviteModal from '../components/InviteModal';

export default function Dashboard() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [projects, setProjects] = useState([
    {
      id: 'prj-1',
      name: 'Vite 6 + React 19 Frontend Overhaul',
      category: 'Core Web',
      lead: 'Alex Morgan',
      priority: 'Urgent',
      status: 'Active',
      progress: 92,
      dueDate: 'Today',
      branch: 'feature/v19-core',
    },
    {
      id: 'prj-2',
      name: 'Render Static Edge CI/CD Pipeline',
      category: 'Cloud DevOps',
      lead: 'Sarah Chen',
      priority: 'High',
      status: 'In Review',
      progress: 78,
      dueDate: 'Tomorrow',
      branch: 'deploy/render-actions',
    },
    {
      id: 'prj-3',
      name: 'Zero-Trust Role-Based Auth Gates',
      category: 'Security',
      lead: 'Marcus Vance',
      priority: 'High',
      status: 'Active',
      progress: 64,
      dueDate: 'In 3 days',
      branch: 'auth/jwt-rotation',
    },
    {
      id: 'prj-4',
      name: 'Real-time WebSocket Telemetry Visualizer',
      category: 'Analytics',
      lead: 'Elena Rostova',
      priority: 'Medium',
      status: 'Completed',
      progress: 100,
      dueDate: 'Completed',
      branch: 'analytics/socket-stream',
    },
    {
      id: 'prj-5',
      name: 'Design System & Dark Mode Tokens',
      category: 'Design Systems',
      lead: 'Alex Morgan',
      priority: 'Medium',
      status: 'Completed',
      progress: 100,
      dueDate: 'Completed',
      branch: 'styles/glassmorphic-tokens',
    },
  ]);

  const handleAddTask = (newTask) => {
    const projectItem = {
      id: 'prj-' + (projects.length + 1),
      name: newTask.title,
      category: newTask.category,
      lead: newTask.assignee,
      priority: newTask.priority,
      status: 'Active',
      progress: 20,
      dueDate: newTask.dueDate,
      branch: 'feature/' + newTask.title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 15),
    };
    setProjects([projectItem, ...projects]);
    showToast(`Task "${newTask.title}" added to active sprint!`, 'success');
  };

  const handleInvite = (inviteData) => {
    showToast(`Invitation dispatched to ${inviteData.email} as ${inviteData.role}`, 'success');
  };

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = filterStatus === 'All' || p.status === filterStatus;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.lead.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Urgent':
        return <span className="badge badge-danger">Urgent</span>;
      case 'High':
        return <span className="badge badge-warning">High</span>;
      case 'Medium':
        return <span className="badge badge-primary">Medium</span>;
      default:
        return <span className="badge badge-info">Low</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <span className="badge badge-success">Completed</span>;
      case 'In Review':
        return <span className="badge badge-purple">In Review</span>;
      default:
        return <span className="badge badge-info">Active</span>;
    }
  };

  return (
    <div>
      {/* Top Banner / Welcome */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.9rem', marginBottom: '0.3rem' }}>
            Welcome back, <span className="gradient-text">{user?.name || 'Engineer'}</span> 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Here is your workspace overview for sprint 42. All automated builds are passing.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="btn btn-secondary btn-sm"
            id="dash-invite-btn"
          >
            <Users size={16} />
            <span>Invite Team</span>
          </button>
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="btn btn-primary btn-sm"
            id="dash-new-task-btn"
          >
            <Plus size={16} />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Stat Cards */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">ACTIVE INITIATIVES</span>
            <div className="stat-icon" style={{ background: 'var(--primary-light)', color: '#818cf8' }}>
              <FolderKanban size={18} />
            </div>
          </div>
          <div className="stat-value">{projects.length}</div>
          <div className="stat-footer">
            <span className="stat-trend up">
              <TrendingUp size={14} />
              +18.5%
            </span>
            <span style={{ color: 'var(--text-muted)' }}>vs previous cycle</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">SPRINT VELOCITY</span>
            <div className="stat-icon" style={{ background: 'var(--accent-cyan-light)', color: '#38bdf8' }}>
              <Zap size={18} />
            </div>
          </div>
          <div className="stat-value">94.8 <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>pts</span></div>
          <div className="stat-footer">
            <span className="stat-trend up">
              <TrendingUp size={14} />
              +12.4%
            </span>
            <span style={{ color: 'var(--text-muted)' }}>team high record</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">TASK COMPLETION</span>
            <div className="stat-icon" style={{ background: 'var(--accent-emerald-light)', color: '#34d399' }}>
              <CheckCircle size={18} />
            </div>
          </div>
          <div className="stat-value">86.2%</div>
          <div className="stat-footer">
            <span className="stat-trend up">
              <TrendingUp size={14} />
              +6.1%
            </span>
            <span style={{ color: 'var(--text-muted)' }}>24/28 tasks cleared</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">EDGE DEPLOY HEALTH</span>
            <div className="stat-icon" style={{ background: 'var(--accent-purple-light)', color: '#c084fc' }}>
              <Activity size={18} />
            </div>
          </div>
          <div className="stat-value">99.98%</div>
          <div className="stat-footer">
            <span className="stat-trend up">
              <ShieldCheck size={14} />
              Render &amp; GH
            </span>
            <span style={{ color: 'var(--text-muted)' }}>14ms p99 latency</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Projects Table + Live Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2.2fr) minmax(0, 1fr)', gap: '1.75rem', alignItems: 'start' }}>
        {/* Left Column: Projects Data Table */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.2rem' }}>Sprint Work Breakdown</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Track deliverables, code branches, and assigned leads.
              </p>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.4rem', background: 'var(--bg-secondary)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
              {['All', 'Active', 'In Review', 'Completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`btn-sm ${filterStatus === status ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ borderRadius: 'var(--radius-sm)', fontSize: '0.78rem' }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Search Table Filter */}
          <div style={{ marginBottom: '1rem', position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Filter tasks by name, category or assignee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.5rem', fontSize: '0.85rem' }}
            />
          </div>

          {/* Data Table */}
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Task &amp; Branch</th>
                  <th>Assignee</th>
                  <th>Priority</th>
                  <th>Progress</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.88rem' }}>
                        {item.name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        <span>{item.category}</span>
                        <span>•</span>
                        <code style={{ fontSize: '0.72rem', background: 'var(--bg-secondary)', padding: '1px 5px', borderRadius: '3px' }}>{item.branch}</code>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem' }}>{item.lead}</span>
                    </td>
                    <td>{getPriorityBadge(item.priority)}</td>
                    <td style={{ minWidth: '120px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ flex: 1, height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div
                            style={{
                              width: `${item.progress}%`,
                              height: '100%',
                              background: item.progress === 100 ? 'var(--accent-emerald)' : 'var(--primary)',
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.progress}%</span>
                      </div>
                    </td>
                    <td>{getStatusBadge(item.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Real-Time Stream & Cloud Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Edge Deployment Card */}
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="status-dot online"></span>
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Render Edge CDN</span>
              </div>
              <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Live Production</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '0.75rem' }}>
              Latest release pushed from <code>main</code> branch. Automated GitHub Actions verified.
            </p>
            <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <div>Domain: <code>nexusflow-app.onrender.com</code></div>
              <div style={{ marginTop: '0.25rem' }}>SSL Certificate: Auto-Renewing (Let's Encrypt)</div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} color="var(--primary)" />
              <span>Live Workspace Stream</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.82rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', marginTop: '5px', flexShrink: 0 }} />
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Alex Morgan</span> merged PR #419 into main
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '1px' }}>12 minutes ago</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.82rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-emerald)', marginTop: '5px', flexShrink: 0 }} />
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Sarah Chen</span> closed task "Audit API Latencies"
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '1px' }}>45 minutes ago</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.82rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)', marginTop: '5px', flexShrink: 0 }} />
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Render Bot</span> finished static build in 14.2s
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '1px' }}>2 hours ago</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.82rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-purple)', marginTop: '5px', flexShrink: 0 }} />
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Marcus Vance</span> created new branch <code>security/audit</code>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '1px' }}>5 hours ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task & Invite Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onAddTask={handleAddTask}
      />

      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInvite}
      />
    </div>
  );
}

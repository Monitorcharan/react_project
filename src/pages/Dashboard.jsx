import React, { useState } from 'react';
import { 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  FolderKanban, 
  Users, 
  Plus, 
  Search, 
  Zap, 
  ShieldCheck, 
  Activity,
  GitBranch,
  Terminal
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
      id: 'NX-101',
      name: 'Vite 6 + React 19 Frontend Architecture',
      category: 'Frontend',
      lead: 'Alex Morgan',
      priority: 'Urgent',
      status: 'Active',
      progress: 92,
      dueDate: 'Today',
      branch: 'core/v19-framework',
    },
    {
      id: 'NX-102',
      name: 'Render Static Edge CI/CD Pipeline Action',
      category: 'DevOps',
      lead: 'Sarah Chen',
      priority: 'High',
      status: 'In Review',
      progress: 78,
      dueDate: 'Tomorrow',
      branch: 'deploy/render-actions',
    },
    {
      id: 'NX-103',
      name: 'Zero-Trust RBAC & Session Rotation',
      category: 'Security',
      lead: 'Marcus Vance',
      priority: 'High',
      status: 'Active',
      progress: 64,
      dueDate: 'In 3 days',
      branch: 'auth/jwt-rotation',
    },
    {
      id: 'NX-104',
      name: 'Deterministic SVG Performance Charts',
      category: 'Analytics',
      lead: 'Elena Rostova',
      priority: 'Medium',
      status: 'Completed',
      progress: 100,
      dueDate: 'Closed',
      branch: 'charts/svg-paths',
    },
    {
      id: 'NX-105',
      name: 'High-Contrast 8px Grid Design Tokens',
      category: 'Design Systems',
      lead: 'Alex Morgan',
      priority: 'Medium',
      status: 'Completed',
      progress: 100,
      dueDate: 'Closed',
      branch: 'tokens/hairline-grid',
    },
  ]);

  const handleAddTask = (newTask) => {
    const projectItem = {
      id: 'NX-' + (projects.length + 101),
      name: newTask.title,
      category: newTask.category,
      lead: newTask.assignee,
      priority: newTask.priority,
      status: 'Active',
      progress: 20,
      dueDate: newTask.dueDate,
      branch: 'feat/' + newTask.title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 14),
    };
    setProjects([projectItem, ...projects]);
    showToast(`Registered issue ${projectItem.id}: "${newTask.title}"`, 'success');
  };

  const handleInvite = (inviteData) => {
    showToast(`Access invitation dispatched to ${inviteData.email}`, 'success');
  };

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = filterStatus === 'All' || p.status === filterStatus;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.lead.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      {/* Top Breadcrumb & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <span>WORKSPACE</span>
            <span>/</span>
            <span>OVERVIEW</span>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)' }}>SPRINT-42</span>
          </div>
          <h1 style={{ fontSize: '1.6rem', letterSpacing: '-0.02em' }}>
            Active Sprint Overview
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="btn btn-secondary btn-sm"
            id="dash-invite-btn"
          >
            <Users size={14} />
            <span>Invite Team</span>
          </button>
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="btn btn-primary btn-sm"
            id="dash-new-task-btn"
          >
            <Plus size={14} />
            <span>New Issue</span>
          </button>
        </div>
      </div>

      {/* 4 Crisp KPI Stat Cards */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">ACTIVE ISSUES</span>
            <FolderKanban size={15} color="var(--text-muted)" />
          </div>
          <div className="stat-value">{projects.length}</div>
          <div className="stat-footer">
            <span className="stat-trend up">
              <TrendingUp size={13} />
              +18.5%
            </span>
            <span style={{ color: 'var(--text-muted)' }}>sprint cadence</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">SPRINT VELOCITY</span>
            <Zap size={15} color="var(--accent)" />
          </div>
          <div className="stat-value">94.8 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>pts</span></div>
          <div className="stat-footer">
            <span className="stat-trend up">
              <TrendingUp size={13} />
              +12.4%
            </span>
            <span style={{ color: 'var(--text-muted)' }}>ahead of curve</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">COMPLETION RATE</span>
            <CheckCircle size={15} color="var(--status-success)" />
          </div>
          <div className="stat-value">86.2%</div>
          <div className="stat-footer">
            <span className="stat-trend up">
              <TrendingUp size={13} />
              24/28
            </span>
            <span style={{ color: 'var(--text-muted)' }}>closed deliverables</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">P99 EDGE LATENCY</span>
            <Activity size={15} color="var(--accent)" />
          </div>
          <div className="stat-value">14.2 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>ms</span></div>
          <div className="stat-footer">
            <span style={{ color: 'var(--status-success)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              Render CDN
            </span>
            <span style={{ color: 'var(--text-muted)' }}>28 global POPs</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Data Table + Live Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2.3fr) minmax(0, 1fr)', gap: '20px', alignItems: 'start' }}>
        
        {/* Left: Deliverables Table */}
        <div className="panel" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h3 style={{ fontSize: '1rem', marginBottom: '2px' }}>Sprint Deliverables Matrix</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                TRACKING REVISION: HEAD -&gt; main (03f1e83)
              </p>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '2px', background: 'var(--bg-canvas)', padding: '2px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)' }}>
              {['All', 'Active', 'In Review', 'Completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`btn-sm ${filterStatus === status ? 'btn-secondary' : 'btn-ghost'}`}
                  style={{ borderRadius: 'var(--radius-xs)', fontSize: '0.75rem', padding: '3px 8px' }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Search Table Filter */}
          <div style={{ marginBottom: '12px', position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Filter by issue key, branch or engineer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '32px', fontSize: '0.82rem', paddingBlock: '6px' }}
            />
          </div>

          {/* Data Table */}
          <div className="table-wrap">
            <table className="dense-table">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Deliverable &amp; Branch</th>
                  <th>Lead</th>
                  <th>Priority</th>
                  <th>Progress</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      {item.id}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.86rem' }}>
                        {item.name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                        <GitBranch size={11} />
                        <span>{item.branch}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.82rem' }}>{item.lead}</td>
                    <td>
                      <span className={`chip ${
                        item.priority === 'Urgent' ? 'chip-danger' : item.priority === 'High' ? 'chip-warning' : 'chip-accent'
                      }`}>
                        {item.priority}
                      </span>
                    </td>
                    <td style={{ minWidth: '100px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ flex: 1, height: '4px', background: 'var(--bg-muted)', borderRadius: '2px', overflow: 'hidden' }}>
                          <div
                            style={{
                              width: `${item.progress}%`,
                              height: '100%',
                              background: item.progress === 100 ? 'var(--status-success)' : 'var(--accent)',
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{item.progress}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`chip ${
                        item.status === 'Completed' ? 'chip-success' : item.status === 'In Review' ? 'chip-warning' : 'chip-accent'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Real-Time Stream & Cloud Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Edge Deployment Card */}
          <div className="panel" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div className="indicator-dot online" />
                <span style={{ fontWeight: 600, fontSize: '0.84rem' }}>Render Edge Environment</span>
              </div>
              <span className="chip chip-success">LIVE</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.45', marginBottom: '10px' }}>
              Clean production build verified from <code>main</code> branch.
            </p>
            <div style={{ background: 'var(--bg-canvas)', borderRadius: 'var(--radius-xs)', padding: '8px 10px', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', border: '1px solid var(--border-default)' }}>
              <div style={{ color: 'var(--text-muted)' }}>HOST: <code>nexusflow-app.onrender.com</code></div>
              <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>ROUTING: <code>SPA Rewrites Enabled (200)</code></div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="panel" style={{ padding: '16px' }}>
            <div className="label-caps" style={{ marginBottom: '12px' }}>OPERATIONAL ACTIVITY STREAM</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.76rem' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>15:32</span>
                <div>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>alex.morgan</span> merged PR #419
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>feat: production bundle verification</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>14:50</span>
                <div>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>sarah.chen</span> closed issue NX-102
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>deploy/render-actions passing</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>12:15</span>
                <div>
                  <span style={{ color: 'var(--accent)', fontWeight: 600 }}>render-agent</span> finished build
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>exit-code: 0 (duration: 854ms)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

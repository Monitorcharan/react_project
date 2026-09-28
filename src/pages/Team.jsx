import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Mail, 
  ShieldCheck, 
  MoreHorizontal,
  FolderGit2,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import InviteModal from '../components/InviteModal';

export default function Team() {
  const { showToast } = useToast();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  const [members, setMembers] = useState([
    {
      id: 'mem-1',
      name: 'Alex Morgan',
      role: 'Staff Product Engineer',
      dept: 'Engineering',
      avatar: 'AM',
      color: 'linear-gradient(135deg, #6366f1, #06b6d4)',
      status: 'online',
      email: 'alex.morgan@nexusflow.io',
      activeTasks: 4,
      accessLevel: 'Admin',
    },
    {
      id: 'mem-2',
      name: 'Sarah Chen',
      role: 'Principal Cloud Architect',
      dept: 'DevOps & Cloud',
      avatar: 'SC',
      color: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
      status: 'online',
      email: 'sarah.chen@nexusflow.io',
      activeTasks: 5,
      accessLevel: 'Admin',
    },
    {
      id: 'mem-3',
      name: 'Marcus Vance',
      role: 'Senior Backend Developer',
      dept: 'Engineering',
      avatar: 'MV',
      color: 'linear-gradient(135deg, #3b82f6, #10b981)',
      status: 'busy',
      email: 'marcus.v@nexusflow.io',
      activeTasks: 3,
      accessLevel: 'Contributor',
    },
    {
      id: 'mem-4',
      name: 'Elena Rostova',
      role: 'Lead UX / Systems Designer',
      dept: 'Product Design',
      avatar: 'ER',
      color: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      status: 'online',
      email: 'elena.r@nexusflow.io',
      activeTasks: 2,
      accessLevel: 'Contributor',
    },
    {
      id: 'mem-5',
      name: 'Darius Thorne',
      role: 'Quality & Test Automation Engineer',
      dept: 'Engineering',
      avatar: 'DT',
      color: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
      status: 'offline',
      email: 'darius.t@nexusflow.io',
      activeTasks: 1,
      accessLevel: 'Contributor',
    },
    {
      id: 'mem-6',
      name: 'Kavita Patel',
      role: 'VP of Product Innovation',
      dept: 'Leadership',
      avatar: 'KP',
      color: 'linear-gradient(135deg, #10b981, #06b6d4)',
      status: 'online',
      email: 'kavita.p@nexusflow.io',
      activeTasks: 6,
      accessLevel: 'Owner',
    },
  ]);

  const handleInviteSubmit = (inviteData) => {
    const newMember = {
      id: 'mem-' + (members.length + 1),
      name: inviteData.email.split('@')[0],
      role: inviteData.role,
      dept: 'Engineering',
      avatar: inviteData.email.substring(0, 2).toUpperCase(),
      color: 'linear-gradient(135deg, #6366f1, #a855f7)',
      status: 'online',
      email: inviteData.email,
      activeTasks: 0,
      accessLevel: 'Contributor',
    };
    setMembers(prev => [newMember, ...prev]);
    showToast(`Invite dispatched and member added to directory!`, 'success');
  };

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === 'All' || m.dept === deptFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.9rem', marginBottom: '0.3rem' }}>
            Team Directory &amp; Permissions
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Manage {members.length} active collaborators, access controls, and active workload.
          </p>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="btn btn-primary btn-sm"
          id="team-invite-btn"
        >
          <UserPlus size={16} />
          <span>Invite Teammate</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="input-with-icon" style={{ minWidth: '260px', maxWidth: '380px', flex: 1 }}>
          <Search size={15} className="input-icon" />
          <input
            type="text"
            placeholder="Search by name, role or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ padding: '0.55rem 0.75rem 0.55rem 2.4rem', fontSize: '0.88rem' }}
          />
        </div>

        {/* Dept Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', overflowX: 'auto', paddingBottom: '4px' }}>
          {['All', 'Engineering', 'Product Design', 'DevOps & Cloud', 'Leadership'].map((dept) => (
            <button
              key={dept}
              onClick={() => setDeptFilter(dept)}
              className={`btn-sm ${deptFilter === dept ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.8rem' }}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Team Member Cards Grid */}
      <div className="grid-3">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="glass-card"
            style={{
              padding: '1.4rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            {/* Top row: Avatar & Status & Role */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ position: 'relative' }}>
                <div
                  className="avatar-img"
                  style={{
                    width: '52px',
                    height: '52px',
                    fontSize: '1.1rem',
                    background: member.color,
                  }}
                >
                  {member.avatar}
                </div>
                <span
                  className={`status-dot ${member.status}`}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    border: '2px solid var(--bg-card)',
                    width: '12px',
                    height: '12px',
                  }}
                  title={`Status: ${member.status}`}
                />
              </div>

              <span
                className={`badge ${
                  member.accessLevel === 'Owner'
                    ? 'badge-warning'
                    : member.accessLevel === 'Admin'
                    ? 'badge-primary'
                    : 'badge-info'
                }`}
              >
                {member.accessLevel}
              </span>
            </div>

            {/* Member Details */}
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', color: 'var(--text-primary)' }}>
                {member.name}
              </h3>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                {member.role}
              </div>
              <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>
                {member.dept}
              </span>
            </div>

            {/* Contact & Tasks count */}
            <div
              style={{
                marginTop: 'auto',
                paddingTop: '0.85rem',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
                <FolderGit2 size={14} />
                <span>{member.activeTasks} Active Tasks</span>
              </div>

              <a
                href={`mailto:${member.email}`}
                className="action-icon-btn"
                style={{ width: '30px', height: '30px' }}
                title={`Email ${member.name}`}
              >
                <Mail size={13} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Modal */}
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInviteSubmit}
      />
    </div>
  );
}

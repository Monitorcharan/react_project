import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Mail, 
  ShieldCheck, 
  FolderGit2
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
      status: 'online',
      email: 'alex.morgan@nexusflow.io',
      activeTasks: 4,
      accessLevel: 'Admin',
      lastActive: 'Active now',
    },
    {
      id: 'mem-2',
      name: 'Sarah Chen',
      role: 'Principal Cloud Architect',
      dept: 'DevOps & Cloud',
      avatar: 'SC',
      status: 'online',
      email: 'sarah.chen@nexusflow.io',
      activeTasks: 5,
      accessLevel: 'Admin',
      lastActive: 'Active now',
    },
    {
      id: 'mem-3',
      name: 'Marcus Vance',
      role: 'Senior Backend Developer',
      dept: 'Engineering',
      avatar: 'MV',
      status: 'busy',
      email: 'marcus.v@nexusflow.io',
      activeTasks: 3,
      accessLevel: 'Contributor',
      lastActive: '45m ago',
    },
    {
      id: 'mem-4',
      name: 'Elena Rostova',
      role: 'Lead UX / Systems Designer',
      dept: 'Product Design',
      avatar: 'ER',
      status: 'online',
      email: 'elena.r@nexusflow.io',
      activeTasks: 2,
      accessLevel: 'Contributor',
      lastActive: '12m ago',
    },
    {
      id: 'mem-5',
      name: 'Darius Thorne',
      role: 'QA Automation Engineer',
      dept: 'Engineering',
      avatar: 'DT',
      status: 'offline',
      email: 'darius.t@nexusflow.io',
      activeTasks: 1,
      accessLevel: 'Contributor',
      lastActive: '2d ago',
    },
    {
      id: 'mem-6',
      name: 'Kavita Patel',
      role: 'VP of Engineering',
      dept: 'Leadership',
      avatar: 'KP',
      status: 'online',
      email: 'kavita.p@nexusflow.io',
      activeTasks: 6,
      accessLevel: 'Owner',
      lastActive: 'Active now',
    },
  ]);

  const handleInviteSubmit = (inviteData) => {
    const newMember = {
      id: 'mem-' + (members.length + 1),
      name: inviteData.email.split('@')[0],
      role: inviteData.role,
      dept: 'Engineering',
      avatar: inviteData.email.substring(0, 2).toUpperCase(),
      status: 'online',
      email: inviteData.email,
      activeTasks: 0,
      accessLevel: 'Contributor',
      lastActive: 'Just invited',
    };
    setMembers(prev => [newMember, ...prev]);
    showToast(`Access invitation dispatched to ${inviteData.email}`, 'success');
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <span>WORKSPACE</span>
            <span>/</span>
            <span>RBAC &amp; ACCESS</span>
          </div>
          <h1 style={{ fontSize: '1.6rem', letterSpacing: '-0.02em' }}>
            Collaborator Directory &amp; Permissions
          </h1>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="btn btn-primary btn-sm"
          id="team-invite-btn"
        >
          <UserPlus size={14} />
          <span>Invite Engineer</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
        <div className="input-with-icon" style={{ minWidth: '260px', maxWidth: '360px', flex: 1 }}>
          <Search size={14} className="input-icon" />
          <input
            type="text"
            placeholder="Search by engineer, role or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '32px', fontSize: '0.82rem', paddingBlock: '6px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {['All', 'Engineering', 'Product Design', 'DevOps & Cloud', 'Leadership'].map((dept) => (
            <button
              key={dept}
              onClick={() => setDeptFilter(dept)}
              className={`btn-sm ${deptFilter === dept ? 'btn-secondary' : 'btn-ghost'}`}
              style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: 'var(--radius-xs)' }}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Structured Directory Grid */}
      <div className="grid-3">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="panel"
            style={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ position: 'relative' }}>
                  <div className="avatar-img" style={{ width: '36px', height: '36px', fontSize: '0.82rem' }}>
                    {member.avatar}
                  </div>
                  <span
                    className={`indicator-dot ${member.status}`}
                    style={{ position: 'absolute', bottom: '-1px', right: '-1px', border: '2px solid var(--bg-surface)' }}
                  />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    {member.name}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {member.dept}
                  </div>
                </div>
              </div>

              <span className={`chip ${
                member.accessLevel === 'Owner' ? 'chip-warning' : member.accessLevel === 'Admin' ? 'chip-accent' : ''
              }`} style={{ fontSize: '0.7rem' }}>
                {member.accessLevel}
              </span>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {member.role}
            </div>

            <div
              style={{
                marginTop: 'auto',
                paddingTop: '10px',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
              }}
            >
              <span>{member.activeTasks} Active Issues</span>
              <span>{member.lastActive}</span>
            </div>
          </div>
        ))}
      </div>

      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInviteSubmit}
      />
    </div>
  );
}

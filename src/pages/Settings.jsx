import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Bell, 
  Key, 
  Globe, 
  Save, 
  RotateCcw, 
  Check, 
  Copy, 
  Sun,
  Moon,
  Terminal
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

export default function Settings() {
  const { user, updateUser, resetToDemoUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('profile');

  const [name, setName] = useState(user?.name || 'Alex Morgan');
  const [email, setEmail] = useState(user?.email || 'alex.morgan@nexusflow.io');
  const [role, setRole] = useState(user?.role || 'Staff Product Engineer');
  const [company, setCompany] = useState(user?.company || 'Synthetix AI Labs');
  const [bio, setBio] = useState(user?.bio || 'Building high-velocity digital infrastructure & telemetry.');

  const [emailDigest, setEmailDigest] = useState(user?.notifications?.emailDigest ?? true);
  const [taskAlerts, setTaskAlerts] = useState(user?.notifications?.taskAlerts ?? true);
  const [weeklyReport, setWeeklyReport] = useState(user?.notifications?.weeklyReport ?? false);

  const [apiKey, setApiKey] = useState('nxf_live_9488a7c2e391b4f1790ac38b');
  const [copiedKey, setCopiedKey] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const initials = name
      .split(' ')
      .map(part => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'NU';

    updateUser({
      name,
      email,
      role,
      company,
      bio,
      avatar: initials,
      notifications: {
        emailDigest,
        taskAlerts,
        weeklyReport,
        securityAlerts: true,
      },
    });

    showToast('Organization settings updated', 'success');
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    showToast('Copied bearer API token', 'info');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleRegenerateKey = () => {
    const newKey = 'nxf_live_' + Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setApiKey(newKey);
    showToast('Rotated API bearer token', 'success');
  };

  const handleResetData = () => {
    const defaultUser = resetToDemoUser();
    setName(defaultUser.name);
    setEmail(defaultUser.email);
    setRole(defaultUser.role);
    setCompany(defaultUser.company);
    setBio(defaultUser.bio);
    showToast('Reset configuration to default state', 'info');
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <span>WORKSPACE</span>
            <span>/</span>
            <span>SETTINGS &amp; AUDIT</span>
          </div>
          <h1 style={{ fontSize: '1.6rem', letterSpacing: '-0.02em' }}>
            System Settings &amp; Configuration
          </h1>
        </div>

        <button
          onClick={handleResetData}
          className="btn btn-outline btn-sm"
          id="settings-reset-demo-btn"
        >
          <RotateCcw size={13} />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--border-default)', marginBottom: '24px', overflowX: 'auto' }}>
        <button
          onClick={() => setActiveTab('profile')}
          className={`btn-sm ${activeTab === 'profile' ? 'btn-secondary' : 'btn-ghost'}`}
          style={{ borderBottom: activeTab === 'profile' ? '2px solid var(--accent)' : 'none', borderRadius: 'var(--radius-xs) var(--radius-xs) 0 0' }}
        >
          <User size={14} />
          <span>Account Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`btn-sm ${activeTab === 'preferences' ? 'btn-secondary' : 'btn-ghost'}`}
          style={{ borderBottom: activeTab === 'preferences' ? '2px solid var(--accent)' : 'none', borderRadius: 'var(--radius-xs) var(--radius-xs) 0 0' }}
        >
          <Sun size={14} />
          <span>Theme &amp; Notifications</span>
        </button>

        <button
          onClick={() => setActiveTab('api')}
          className={`btn-sm ${activeTab === 'api' ? 'btn-secondary' : 'btn-ghost'}`}
          style={{ borderBottom: activeTab === 'api' ? '2px solid var(--accent)' : 'none', borderRadius: 'var(--radius-xs) var(--radius-xs) 0 0' }}
        >
          <Key size={14} />
          <span>API Credentials</span>
        </button>

        <button
          onClick={() => setActiveTab('deployment')}
          className={`btn-sm ${activeTab === 'deployment' ? 'btn-secondary' : 'btn-ghost'}`}
          style={{ borderBottom: activeTab === 'deployment' ? '2px solid var(--accent)' : 'none', borderRadius: 'var(--radius-xs) var(--radius-xs) 0 0' }}
        >
          <Globe size={14} />
          <span>Render &amp; CI/CD</span>
        </button>
      </div>

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="panel" style={{ maxWidth: '640px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div className="avatar-img" style={{ width: '48px', height: '48px', fontSize: '1.1rem' }}>
              {user?.avatar || 'AM'}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{name}</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {role} • {user?.plan || 'Enterprise Pro'}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Professional Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Organization</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Operational Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="form-input"
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button type="submit" className="btn btn-primary" id="save-profile-btn">
              <Save size={14} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Theme & Notifications */}
      {activeTab === 'preferences' && (
        <div className="panel" style={{ maxWidth: '640px', padding: '24px' }}>
          <div className="label-caps" style={{ marginBottom: '8px' }}>COLOR THEME SPECIFICATION</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            <div
              onClick={() => { if (theme !== 'dark') toggleTheme(); }}
              className="panel"
              style={{
                padding: '16px',
                borderColor: theme === 'dark' ? 'var(--accent)' : 'var(--border-default)',
                background: '#09090b',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Moon size={15} color="var(--accent)" />
                <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>Dark Canvas (Default)</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#a1a1aa' }}>High contrast #09090b with strict hairline dividers.</p>
            </div>

            <div
              onClick={() => { if (theme !== 'light') toggleTheme(); }}
              className="panel"
              style={{
                padding: '16px',
                borderColor: theme === 'light' ? 'var(--accent)' : 'var(--border-default)',
                background: '#ffffff',
                color: '#09090b',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Sun size={15} color="#f59e0b" />
                <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>Pure White</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#52525b' }}>Utilitarian light theme for high-illumination environments.</p>
            </div>
          </div>

          <div className="label-caps" style={{ marginBottom: '8px' }}>DELIVERY NOTIFICATIONS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-subtle)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.84rem' }}>Daily Sprint Summary</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Automated morning digest of merged PRs and closed tasks</div>
              </div>
              <input
                type="checkbox"
                checked={emailDigest}
                onChange={(e) => setEmailDigest(e.target.checked)}
                style={{ accentColor: 'var(--accent)' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-subtle)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.84rem' }}>Issue Mentions &amp; Reassignments</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Immediate notification when assigned an issue</div>
              </div>
              <input
                type="checkbox"
                checked={taskAlerts}
                onChange={(e) => setTaskAlerts(e.target.checked)}
                style={{ accentColor: 'var(--accent)' }}
              />
            </label>
          </div>

          <button onClick={handleSaveProfile} className="btn btn-primary" id="save-prefs-btn">
            <Save size={14} />
            <span>Update Notification Rules</span>
          </button>
        </div>
      )}

      {/* Tab 3: API & Security */}
      {activeTab === 'api' && (
        <div className="panel" style={{ maxWidth: '640px', padding: '24px' }}>
          <div className="label-caps" style={{ marginBottom: '6px' }}>PROGRAMMATIC ACCESS</div>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '8px' }}>Bearer API Token</h3>
          <p style={{ fontSize: '0.82rem', marginBottom: '16px' }}>
            Used for authenticating webhooks, CLI triggers, and CI deployment monitors.
          </p>

          <div className="form-group">
            <label className="form-label">Active API Key</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                readOnly
                value={apiKey}
                className="form-input"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}
              />
              <button onClick={handleCopyKey} className="btn btn-secondary" style={{ flexShrink: 0 }}>
                {copiedKey ? <Check size={14} color="var(--status-success)" /> : <Copy size={14} />}
                <span>{copiedKey ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button onClick={handleRegenerateKey} className="btn btn-secondary btn-sm">
              Rotate Key
            </button>
          </div>

          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <div className="label-caps" style={{ marginBottom: '6px' }}>AUTHENTICATION SECURITY</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.86rem' }}>Hardware Two-Factor Authentication</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>FIDO2 / WebAuthn security keys enforced</div>
              </div>
              <span className="chip chip-success">2FA ENFORCED</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Deployment Specs */}
      {activeTab === 'deployment' && (
        <div className="panel" style={{ maxWidth: '640px', padding: '24px' }}>
          <div className="label-caps" style={{ marginBottom: '6px' }}>CONTINUOUS DELIVERY TARGETS</div>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '8px' }}>Render &amp; GitHub Actions Configuration</h3>
          <p style={{ fontSize: '0.82rem', marginBottom: '20px' }}>
            Target deployment specifications for zero-config automated static site hosting.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="panel" style={{ padding: '14px', background: 'var(--bg-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>Render Static Site</span>
                <span className="chip chip-success">CONFIGURED</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Build Command: <code>npm run build</code><br />
                Publish Directory: <code>dist</code><br />
                Rewrite: <code>/* -&gt; /index.html 200</code> (via <code>public/_redirects</code>)
              </div>
            </div>

            <div className="panel" style={{ padding: '14px', background: 'var(--bg-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>GitHub Actions CI/CD</span>
                <span className="chip chip-success">CONFIGURED</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Workflow: <code>.github/workflows/deploy.yml</code><br />
                Router: <code>HashRouter</code> (Eliminates 404 on page refresh)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

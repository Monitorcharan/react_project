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
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

export default function Settings() {
  const { user, updateUser, resetToDemoUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('profile');

  // Form states initialized with user context
  const [name, setName] = useState(user?.name || 'Alex Morgan');
  const [email, setEmail] = useState(user?.email || 'alex.morgan@nexusflow.io');
  const [role, setRole] = useState(user?.role || 'Staff Product Engineer');
  const [company, setCompany] = useState(user?.company || 'Synthetix AI Labs');
  const [bio, setBio] = useState(user?.bio || 'Building next-gen digital infrastructure.');

  // Preference states
  const [emailDigest, setEmailDigest] = useState(user?.notifications?.emailDigest ?? true);
  const [taskAlerts, setTaskAlerts] = useState(user?.notifications?.taskAlerts ?? true);
  const [weeklyReport, setWeeklyReport] = useState(user?.notifications?.weeklyReport ?? false);

  // API Key state
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

    showToast('Workspace settings saved successfully!', 'success');
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    showToast('API Key copied to clipboard', 'info');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleRegenerateKey = () => {
    const newKey = 'nxf_live_' + Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setApiKey(newKey);
    showToast('Generated fresh API token', 'success');
  };

  const handleResetData = () => {
    const defaultUser = resetToDemoUser();
    setName(defaultUser.name);
    setEmail(defaultUser.email);
    setRole(defaultUser.role);
    setCompany(defaultUser.company);
    setBio(defaultUser.bio);
    showToast('Reset configuration to default demo state', 'info');
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.9rem', marginBottom: '0.3rem' }}>
            Workspace Settings &amp; Profile
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Manage identity, notifications, API credentials, and cloud deployment targets.
          </p>
        </div>

        <button
          onClick={handleResetData}
          className="btn btn-outline btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          id="settings-reset-demo-btn"
        >
          <RotateCcw size={14} />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem', overflowX: 'auto' }}>
        <button
          onClick={() => setActiveTab('profile')}
          className={`btn-sm ${activeTab === 'profile' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <User size={15} />
          <span>My Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`btn-sm ${activeTab === 'preferences' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Bell size={15} />
          <span>Theme &amp; Notifications</span>
        </button>

        <button
          onClick={() => setActiveTab('api')}
          className={`btn-sm ${activeTab === 'api' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Key size={15} />
          <span>API Keys &amp; Security</span>
        </button>

        <button
          onClick={() => setActiveTab('deployment')}
          className={`btn-sm ${activeTab === 'deployment' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Globe size={15} />
          <span>Render &amp; GitHub Setup</span>
        </button>
      </div>

      {/* Tab 1: Profile Settings */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="glass-card" style={{ maxWidth: '720px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <div className="avatar-img" style={{ width: '64px', height: '64px', fontSize: '1.5rem' }}>
              {user?.avatar || 'AM'}
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.2rem' }}>{name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{role} • {user?.plan || 'Pro Workspace'}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
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
              <label className="form-label">Organization / Team</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Bio / Workspace Status</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="form-input"
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button type="submit" className="btn btn-primary" id="save-profile-btn">
              <Save size={16} />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Theme & Notifications */}
      {activeTab === 'preferences' && (
        <div className="glass-card" style={{ maxWidth: '720px' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Display Theme</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            <div
              onClick={() => { if (theme !== 'dark') toggleTheme(); }}
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                background: '#0d121f',
                color: '#fff',
                border: theme === 'dark' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Moon size={18} color="#818cf8" />
                <span style={{ fontWeight: 600 }}>Dark Slate (Default)</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>High contrast, glowing glassmorphic elements.</p>
            </div>

            <div
              onClick={() => { if (theme !== 'light') toggleTheme(); }}
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                background: '#f8fafc',
                color: '#0f172a',
                border: theme === 'light' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Sun size={18} color="#f59e0b" />
                <span style={{ fontWeight: 600 }}>Clean Light</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Crisp paper white palette for high-light environments.</p>
            </div>
          </div>

          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Notification Preferences</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Daily Sprint Digest</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Summary of PRs and task status sent every morning</div>
              </div>
              <input
                type="checkbox"
                checked={emailDigest}
                onChange={(e) => setEmailDigest(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Task Assignment Alerts</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Real-time push notifications when you are mentioned</div>
              </div>
              <input
                type="checkbox"
                checked={taskAlerts}
                onChange={(e) => setTaskAlerts(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Weekly Telemetry Performance Report</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>PDF export with sprint velocity curves and deploy times</div>
              </div>
              <input
                type="checkbox"
                checked={weeklyReport}
                onChange={(e) => setWeeklyReport(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
              />
            </label>
          </div>

          <button onClick={handleSaveProfile} className="btn btn-primary" id="save-prefs-btn">
            <Save size={16} />
            <span>Update Notification Rules</span>
          </button>
        </div>
      )}

      {/* Tab 3: API & Security */}
      {activeTab === 'api' && (
        <div className="glass-card" style={{ maxWidth: '720px' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>REST API Authentication</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Use this bearer token to interact with the NexusFlow CLI, webhook hooks, and CI/CD triggers.
          </p>

          <div className="form-group">
            <label className="form-label">Live Workspace Key</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                readOnly
                value={apiKey}
                className="form-input"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }}
              />
              <button onClick={handleCopyKey} className="btn btn-secondary" style={{ flexShrink: 0 }}>
                {copiedKey ? <Check size={16} color="var(--accent-emerald)" /> : <Copy size={16} />}
                <span>{copiedKey ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button onClick={handleRegenerateKey} className="btn btn-secondary btn-sm">
              Regenerate API Token
            </button>
          </div>

          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Shield size={16} color="var(--accent-emerald)" />
              <span>Two-Factor Authentication (2FA)</span>
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Hardware security key (WebAuthn/FIDO2) and authenticator app backup configured.
            </p>
            <span className="badge badge-success">2FA Active</span>
          </div>
        </div>
      )}

      {/* Tab 4: Deployment Setup Guide */}
      {activeTab === 'deployment' && (
        <div className="glass-card" style={{ maxWidth: '720px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Zero-Config Cloud Deployments</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            NexusFlow is configured and ready to be deployed directly to <strong>Render</strong> and <strong>GitHub Pages</strong>.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Render Box */}
            <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>🚀 Option 1: Render Static Site</span>
                <span className="badge badge-primary">Recommended</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                1. Push this repository to your GitHub account.<br />
                2. On Render Dashboard, click <strong>New +</strong> &rarr; <strong>Static Site</strong>.<br />
                3. Connect your repository and configure:
              </p>
              <div style={{ background: 'var(--bg-primary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#818cf8' }}>
                Build Command: npm run build<br />
                Publish Directory: dist
              </div>
            </div>

            {/* GitHub Pages Box */}
            <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>🐙 Option 2: GitHub Pages (Automated Actions)</span>
                <span className="badge badge-success">Free Hosting</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                Included <code>.github/workflows/deploy.yml</code> automatically builds and publishes every push to <code>main</code>:
              </p>
              <div style={{ background: 'var(--bg-primary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>
                Repository &rarr; Settings &rarr; Pages &rarr; Source: GitHub Actions
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Terminal, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Check 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/Navbar';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [plan, setPlan] = useState('Pro Tier');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showToast('Please complete all required fields', 'warning');
      return;
    }

    if (!agreeTerms) {
      showToast('Please accept the service policy to proceed', 'warning');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      signup(name, email, password, plan);
      setIsLoading(false);
      showToast(`Workspace initialized for ${name}`, 'success');
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main className="auth-page">
        <div className="auth-container" style={{ maxWidth: '460px' }}>
          <div className="auth-header">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div className="brand-icon-box" style={{ width: '24px', height: '24px' }}>
                <Terminal size={14} />
              </div>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>NexusFlow Workspace</span>
            </div>
            <h2>Initialize Organization Account</h2>
            <p style={{ fontSize: '0.86rem' }}>Configure team access controls, git repositories, and edge telemetry.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="signup-name">Engineer Name</label>
              <div className="input-with-icon">
                <User size={15} className="input-icon" />
                <input
                  id="signup-name"
                  type="text"
                  placeholder="e.g. Jordan Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="signup-email">Work Email</label>
              <div className="input-with-icon">
                <Mail size={15} className="input-icon" />
                <input
                  id="signup-email"
                  type="email"
                  placeholder="jordan.rivera@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="signup-password">Master Password</label>
              <div className="input-with-icon">
                <Lock size={15} className="input-icon" />
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="input-action"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {/* Password strength checklist */}
              <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                <div style={{ height: '3px', flex: 1, background: strength >= 1 ? 'var(--status-danger)' : 'var(--border-default)', borderRadius: '1px' }} />
                <div style={{ height: '3px', flex: 1, background: strength >= 2 ? 'var(--status-warning)' : 'var(--border-default)', borderRadius: '1px' }} />
                <div style={{ height: '3px', flex: 1, background: strength >= 3 ? 'var(--status-success)' : 'var(--border-default)', borderRadius: '1px' }} />
                <div style={{ height: '3px', flex: 1, background: strength >= 4 ? 'var(--accent)' : 'var(--border-default)', borderRadius: '1px' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                <span>Complexity: {strength === 0 ? 'Empty' : strength <= 2 ? 'Weak' : strength === 3 ? 'Good' : 'Strong'}</span>
                <span>Requires 8+ chars</span>
              </div>
            </div>

            {/* Plan Tier Selector */}
            <div className="form-group" style={{ marginTop: '16px' }}>
              <label className="form-label">Deployment Architecture</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div
                  onClick={() => setPlan('Starter Free')}
                  className="panel"
                  style={{
                    padding: '10px 12px',
                    borderColor: plan === 'Starter Free' ? 'var(--accent)' : 'var(--border-default)',
                    background: plan === 'Starter Free' ? 'var(--accent-subtle)' : 'var(--bg-subtle)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>Standard</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Single Team</div>
                </div>

                <div
                  onClick={() => setPlan('Pro Tier')}
                  className="panel"
                  style={{
                    padding: '10px 12px',
                    borderColor: plan === 'Pro Tier' ? 'var(--accent)' : 'var(--border-default)',
                    background: plan === 'Pro Tier' ? 'var(--accent-subtle)' : 'var(--bg-subtle)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>Enterprise</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>Multi-Region Edge</div>
                </div>
              </div>
            </div>

            <div style={{ margin: '14px 0 20px', fontSize: '0.8rem' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  style={{ accentColor: 'var(--accent)', marginTop: '2px' }}
                />
                <span>
                  I accept the developer terms of use and operational privacy policy.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '9px' }}
              id="signup-submit-btn"
            >
              {isLoading ? (
                <span>Provisioning Environment...</span>
              ) : (
                <>
                  <span>Initialize Account</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Already have an active workspace?{' '}
            <Link to="/login" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Terminal, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Key 
} from 'lucide-react';
import { GitHubIcon, GoogleIcon } from '../components/Icons';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/Navbar';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { login, resetToDemoUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password', 'warning');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
      showToast('Authenticated session active', 'success');
      navigate('/dashboard');
    }, 400);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      resetToDemoUser();
      setIsLoading(false);
      showToast('Authenticated as Alex Morgan (Staff Product Engineer)', 'success');
      navigate('/dashboard');
    }, 300);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main className="auth-page">
        <div className="auth-container">
          <div className="auth-header">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div className="brand-icon-box" style={{ width: '24px', height: '24px' }}>
                <Terminal size={14} />
              </div>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>NexusFlow Auth</span>
            </div>
            <h2>Sign In to Workspace</h2>
            <p style={{ fontSize: '0.86rem' }}>Access your team sprint board and edge deployment monitors.</p>
          </div>

          {/* Quick Demo Access */}
          <button
            onClick={handleDemoLogin}
            type="button"
            className="btn btn-secondary btn-sm"
            style={{
              width: '100%',
              marginBottom: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
            id="login-demo-btn"
          >
            <Key size={14} />
            <span>One-Click Demo Session (Staff Lead)</span>
          </button>

          {/* Social Logins */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                login('alex.github@nexusflow.io', 'password123');
                showToast('Authenticated via GitHub OAuth', 'success');
                navigate('/dashboard');
              }}
            >
              <GitHubIcon size={15} />
              <span>GitHub</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                login('alex.google@nexusflow.io', 'password123');
                showToast('Authenticated via Google OAuth', 'success');
                navigate('/dashboard');
              }}
            >
              <GoogleIcon size={15} />
              <span>Google</span>
            </button>
          </div>

          <div className="auth-divider">
            <span>OR EMAIL CREDENTIALS</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">Work Email</label>
              <div className="input-with-icon">
                <Mail size={15} className="input-icon" />
                <input
                  id="login-email"
                  type="email"
                  placeholder="alex.morgan@company.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label" htmlFor="login-password">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast('Reset instructions dispatched to email', 'info'); }} style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Forgot?
                </a>
              </div>
              <div className="input-with-icon">
                <Lock size={15} className="input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
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
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '14px 0 20px', fontSize: '0.82rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: 'var(--accent)' }}
                />
                <span>Persist authentication token</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '9px' }}
              id="login-submit-btn"
            >
              {isLoading ? (
                <span>Validating Session...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Need an organization workspace?{' '}
            <Link to="/signup" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              Deploy Account
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

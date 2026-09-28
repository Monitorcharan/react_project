import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Layers, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles 
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
      showToast('Welcome back! Successfully logged into workspace', 'success');
      navigate('/dashboard');
    }, 600);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      resetToDemoUser();
      setIsLoading(false);
      showToast('Logged in as Alex Morgan (Demo Lead)', 'success');
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main className="auth-page">
        {/* Ambient background glow */}
        <div 
          style={{
            position: 'absolute',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.05) 50%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div className="auth-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="auth-header">
            <div style={{ display: 'inline-flex', padding: '0.6rem', borderRadius: 'var(--radius-lg)', background: 'var(--primary-light)', color: '#818cf8', marginBottom: '1rem' }}>
              <Layers size={28} />
            </div>
            <h2>Sign in to NexusFlow</h2>
            <p>Welcome back! Enter your credentials to access your team workspace.</p>
          </div>

          {/* Quick Demo Button */}
          <button
            onClick={handleDemoLogin}
            type="button"
            className="btn btn-secondary btn-sm"
            style={{
              width: '100%',
              marginBottom: '1.25rem',
              borderColor: 'rgba(99, 102, 241, 0.35)',
              background: 'rgba(99, 102, 241, 0.1)',
              color: '#a5b4fc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
            id="login-demo-btn"
          >
            <Sparkles size={16} />
            <span>⚡ Instant One-Click Demo Login</span>
          </button>

          {/* Social Logins */}
          <div className="oauth-buttons">
            <button
              type="button"
              className="oauth-btn"
              onClick={() => {
                login('alex.github@nexusflow.io', 'password123');
                showToast('Signed in via GitHub OAuth', 'success');
                navigate('/dashboard');
              }}
            >
              <GitHubIcon size={17} />
              <span>GitHub</span>
            </button>
            <button
              type="button"
              className="oauth-btn"
              onClick={() => {
                login('alex.google@nexusflow.io', 'password123');
                showToast('Signed in via Google OAuth', 'success');
                navigate('/dashboard');
              }}
            >
              <GoogleIcon size={17} />
              <span>Google</span>
            </button>
          </div>

          <div className="auth-divider">
            <span>or continue with email</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">Work Email</label>
              <div className="input-with-icon">
                <Mail size={17} className="input-icon" />
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
                <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast('Password reset link sent to demo email', 'info'); }} style={{ fontSize: '0.78rem', color: '#818cf8' }}>
                  Forgot password?
                </a>
              </div>
              <div className="input-with-icon">
                <Lock size={17} className="input-icon" />
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
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '1rem 0 1.5rem', fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: 'var(--primary)' }}
                />
                <span>Remember for 30 days</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.8rem' }}
              id="login-submit-btn"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Workspace</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          <p style={{ marginTop: '1.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#818cf8', fontWeight: 600 }}>
              Create an account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

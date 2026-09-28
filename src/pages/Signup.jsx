import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Layers, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Check, 
  ShieldCheck 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/Navbar';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [plan, setPlan] = useState('Pro Workspace');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Dynamic Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score; // 0 to 4
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showToast('Please fill out all required fields', 'warning');
      return;
    }

    if (!agreeTerms) {
      showToast('Please agree to the Terms of Service to continue', 'warning');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      signup(name, email, password, plan);
      setIsLoading(false);
      showToast(`Welcome aboard, ${name}! Your workspace is active.`, 'success');
      navigate('/dashboard');
    }, 600);
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
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div className="auth-container" style={{ maxWidth: '520px', position: 'relative', zIndex: 1 }}>
          <div className="auth-header">
            <div style={{ display: 'inline-flex', padding: '0.6rem', borderRadius: 'var(--radius-lg)', background: 'var(--accent-cyan-light)', color: '#38bdf8', marginBottom: '1rem' }}>
              <Layers size={28} />
            </div>
            <h2>Create Your Workspace</h2>
            <p>Start your 14-day free trial. No credit card required.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="signup-name">Full Name</label>
              <div className="input-with-icon">
                <User size={17} className="input-icon" />
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
                <Mail size={17} className="input-icon" />
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
              <label className="form-label" htmlFor="signup-password">Choose Password</label>
              <div className="input-with-icon">
                <Lock size={17} className="input-icon" />
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 8 characters..."
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

              {/* Password strength indicators */}
              <div className="password-strength-bar">
                <div className={`strength-segment ${strength >= 1 ? (strength <= 2 ? 'active-weak' : strength === 3 ? 'active-medium' : 'active-strong') : ''}`} />
                <div className={`strength-segment ${strength >= 2 ? (strength <= 2 ? 'active-weak' : strength === 3 ? 'active-medium' : 'active-strong') : ''}`} />
                <div className={`strength-segment ${strength >= 3 ? (strength === 3 ? 'active-medium' : 'active-strong') : ''}`} />
                <div className={`strength-segment ${strength >= 4 ? 'active-strong' : ''}`} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                <span>Strength: {strength === 0 ? 'Empty' : strength <= 2 ? 'Weak' : strength === 3 ? 'Good' : 'Very Strong'}</span>
                <span>Use letters, numbers &amp; symbols</span>
              </div>
            </div>

            {/* Plan Tier Selector */}
            <div className="form-group" style={{ marginTop: '1.25rem' }}>
              <label className="form-label">Select Workspace Tier</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div
                  onClick={() => setPlan('Starter Free')}
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: plan === 'Starter Free' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    background: plan === 'Starter Free' ? 'var(--primary-light)' : 'var(--bg-secondary)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Starter</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Free Forever</div>
                </div>

                <div
                  onClick={() => setPlan('Pro Workspace')}
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: plan === 'Pro Workspace' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    background: plan === 'Pro Workspace' ? 'var(--primary-light)' : 'var(--bg-secondary)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    position: 'relative',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#818cf8' }}>Pro Trial</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>14 Days Included</div>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div style={{ margin: '1rem 0 1.5rem', textAlign: 'left', fontSize: '0.82rem' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  style={{ accentColor: 'var(--primary)', marginTop: '2px' }}
                />
                <span>
                  I agree to the NexusFlow Terms of Service and Privacy Policy, and consent to essential service communications.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.8rem' }}
              id="signup-submit-btn"
            >
              {isLoading ? (
                <span>Configuring Workspace...</span>
              ) : (
                <>
                  <span>Create Workspace Account</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          <p style={{ marginTop: '1.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#818cf8', fontWeight: 600 }}>
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

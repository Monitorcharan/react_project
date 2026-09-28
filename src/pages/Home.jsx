import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Shield, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  GitBranch, 
  Layers, 
  Star,
  Users,
  Check
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  const [activeTab, setActiveTab] = useState('collaboration');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-glow-bg" />
          <div className="container">
            <div className="hero-content">
              <div className="hero-pill">
                <Sparkles size={14} />
                <span>Next-Gen Work OS for Modern High-Growth Teams</span>
              </div>

              <h1 className="hero-title">
                Orchestrate projects with <br />
                <span className="gradient-text">hyper-velocity &amp; precision.</span>
              </h1>

              <p className="hero-subtitle">
                NexusFlow unifies task coordination, team velocity telemetry, and automated delivery pipelines into one seamless, blazingly fast workspace.
              </p>

              <div className="hero-cta-group">
                <Link to="/signup" className="btn btn-primary btn-lg" id="hero-get-started-btn">
                  <span>Start Free Workspace</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/dashboard" className="btn btn-secondary btn-lg" id="hero-live-demo-btn">
                  <span>Explore Live Demo</span>
                </Link>
              </div>

              {/* Social Proof */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', opacity: 0.85, marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-amber)' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginLeft: '0.4rem' }}>
                    4.9/5 by 12,000+ engineers
                  </span>
                </div>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-muted)' }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Ready for GitHub Pages &amp; Render Cloud
                </span>
              </div>

              {/* Interactive Mock Window */}
              <div className="preview-window">
                <div className="window-header">
                  <div className="window-controls">
                    <span className="window-dot red"></span>
                    <span className="window-dot yellow"></span>
                    <span className="window-dot green"></span>
                  </div>
                  <div className="window-title">nexusflow-terminal // workspace-v3.4-live</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>
                    <span className="status-dot online"></span>
                    <span>Synchronized</span>
                  </div>
                </div>

                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Top Stats Banner */}
                  <div className="grid-3" style={{ gap: '1rem' }}>
                    <div style={{ background: 'var(--bg-secondary)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>ACTIVE SPRINT PROGRESS</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>88.4% Completed</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>+12% ahead of schedule</div>
                    </div>
                    <div style={{ background: 'var(--bg-secondary)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>EDGE CDN LATENCY</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8' }}>14ms Global</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>28 Render POP regions</div>
                    </div>
                    <div style={{ background: 'var(--bg-secondary)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>COLLABORATORS</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#c084fc' }}>38 Online</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Real-time state sync</div>
                    </div>
                  </div>

                  {/* Visual Task Bar Simulation */}
                  <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '1rem', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.85rem' }}>
                      <span style={{ fontWeight: 600 }}>Sprint 42: Production Release Candidate</span>
                      <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>24 / 28 Tasks Done</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #6366f1, #06b6d4, #10b981)' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" style={{ padding: '5rem 0', background: 'var(--bg-primary)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem' }}>
              <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>Engineered For Scale</div>
              <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>
                Everything your engineering &amp; design team needs.
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Say goodbye to fragmented tools. NexusFlow combines project management, team metrics, and developer experience into one cohesive interface.
              </p>
            </div>

            <div className="grid-3">
              <div className="glass-card">
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Zap size={22} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>Instant State Sync</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Real-time updates across team boards with zero latency. Every status shift is instantly visible to all teammates.
                </p>
              </div>

              <div className="glass-card">
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--accent-cyan-light)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <BarChart3 size={22} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>Live Telemetry &amp; KPIs</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Integrated graphs, sprint velocity indicators, and deployment latency monitors built directly into your daily workflow.
                </p>
              </div>

              <div className="glass-card">
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--accent-emerald-light)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Shield size={22} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>Enterprise Security</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Role-based access control, encrypted local session storage, and automated audit logs for comprehensive compliance.
                </p>
              </div>

              <div className="glass-card">
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--accent-purple-light)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <GitBranch size={22} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>CI/CD Ready</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Configured out of the box with GitHub Actions and Render static deployment blueprints for zero-stress publishing.
                </p>
              </div>

              <div className="glass-card">
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--accent-amber-light)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Users size={22} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>Team Collaboration</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Collaborator rosters with presence indicators, role management, and instant invitation links for quick onboarding.
                </p>
              </div>

              <div className="glass-card">
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--accent-rose-light)', color: '#fb7185', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Cpu size={22} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>Lightweight &amp; Fast</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Zero bundle bloat. Pure Vite and optimized React architecture delivering sub-second initial loads and 60 FPS transitions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Preview Section */}
        <section id="pricing" style={{ padding: '5rem 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem' }}>
              <div className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>Transparent Pricing</div>
              <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>
                Simple, straightforward plans for every team size.
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Start free today and upgrade as your team scales. No surprise charges.
              </p>
            </div>

            <div className="grid-3" style={{ alignItems: 'stretch' }}>
              {/* Starter Plan */}
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Starter</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  For solo developers and freelance creators.
                </p>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                  $0 <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>/ month</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem', flex: 1, fontSize: '0.88rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="var(--accent-emerald)" /> Up to 3 active projects</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="var(--accent-emerald)" /> 7-day metric history</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="var(--accent-emerald)" /> Community support</li>
                </ul>
                <Link to="/signup" className="btn btn-secondary" style={{ width: '100%' }}>Get Started Free</Link>
              </div>

              {/* Pro Plan */}
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', borderColor: 'var(--primary)', position: 'relative', background: 'var(--bg-secondary)' }}>
                <div style={{ position: 'absolute', top: '-12px', right: '20px', background: 'var(--primary)', color: '#fff', fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
                  MOST POPULAR
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Pro Workspace</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  For fast-growing startups and agile squads.
                </p>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#818cf8' }}>
                  $24 <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>/ month</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem', flex: 1, fontSize: '0.88rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="var(--accent-emerald)" /> Unlimited projects &amp; tasks</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="var(--accent-emerald)" /> Real-time telemetry &amp; analytics</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="var(--accent-emerald)" /> Up to 15 team collaborators</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="var(--accent-emerald)" /> Priority 24/7 support</li>
                </ul>
                <Link to="/signup" className="btn btn-primary" style={{ width: '100%' }}>Start 14-Day Pro Trial</Link>
              </div>

              {/* Enterprise */}
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Enterprise</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Dedicated infrastructure and custom governance.
                </p>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                  $99 <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>/ month</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem', flex: 1, fontSize: '0.88rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="var(--accent-emerald)" /> Custom SLA &amp; 99.99% uptime</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="var(--accent-emerald)" /> Dedicated customer architect</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="var(--accent-emerald)" /> SSO, SAML, &amp; SCIM provisioning</li>
                </ul>
                <Link to="/signup" className="btn btn-secondary" style={{ width: '100%' }}>Contact Sales</Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section style={{ padding: '4rem 0', background: 'linear-gradient(180deg, var(--bg-app) 0%, var(--bg-primary) 100%)' }}>
          <div className="container">
            <div
              className="glass-panel"
              style={{
                padding: '3.5rem 2rem',
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
                borderColor: 'rgba(99, 102, 241, 0.3)',
              }}
            >
              <h2 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>
                Ready to elevate your team's workflow?
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto 2rem', fontSize: '1.05rem' }}>
                Join thousands of creators and engineering teams building the future with NexusFlow.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/signup" className="btn btn-primary btn-lg">
                  <span>Create Account</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/dashboard" className="btn btn-outline btn-lg">
                  <span>Enter Workspace</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

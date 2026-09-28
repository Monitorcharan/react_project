import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Zap, 
  Globe, 
  Server, 
  ShieldCheck, 
  Activity,
  ArrowUpRight,
  Download
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Analytics() {
  const { showToast } = useToast();
  const [timeRange, setTimeRange] = useState('30D');

  const performanceMetrics = [
    { label: 'Edge Cache Hit Rate', value: '98.6%', change: '+1.2%', positive: true, icon: Zap, color: '#38bdf8' },
    { label: 'Avg Build Time', value: '14.2s', change: '-3.4s', positive: true, icon: Clock, color: '#818cf8' },
    { label: 'Global p99 Latency', value: '18ms', change: '-4ms', positive: true, icon: Activity, color: '#34d399' },
    { label: 'Error Rate (5xx)', value: '0.001%', change: '0.0%', positive: true, icon: ShieldCheck, color: '#c084fc' },
  ];

  const handleExport = () => {
    showToast('Analytics summary exported as JSON report', 'success');
  };

  // SVG Area points for 30D / 7D / 90D
  const points = timeRange === '7D'
    ? [20, 45, 30, 60, 50, 75, 90]
    : timeRange === '90D'
    ? [15, 25, 30, 45, 40, 60, 55, 70, 65, 80, 85, 95]
    : [25, 35, 28, 52, 48, 65, 58, 72, 80, 75, 88, 94];

  // Generate SVG path for smoothed line chart
  const width = 600;
  const height = 180;
  const stepX = width / (points.length - 1);
  const pathD = points.reduce((acc, val, idx) => {
    const x = idx * stepX;
    const y = height - (val / 100) * (height - 30) - 15;
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
  }, '');

  const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

  const barData = [
    { day: 'Mon', deploys: 12, prs: 18 },
    { day: 'Tue', deploys: 19, prs: 24 },
    { day: 'Wed', deploys: 15, prs: 29 },
    { day: 'Thu', deploys: 22, prs: 31 },
    { day: 'Fri', deploys: 28, prs: 35 },
    { day: 'Sat', deploys: 8, prs: 10 },
    { day: 'Sun', deploys: 5, prs: 7 },
  ];

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.9rem', marginBottom: '0.3rem' }}>
            System Telemetry &amp; Velocity
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Real-time performance metrics, sprint output, and edge deployment latency.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Time range pills */}
          <div style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '0.2rem', borderRadius: 'var(--radius-md)' }}>
            {['7D', '30D', '90D'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`btn-sm ${timeRange === range ? 'btn-primary' : 'btn-ghost'}`}
                style={{ fontSize: '0.78rem' }}
              >
                {range}
              </button>
            ))}
          </div>

          <button onClick={handleExport} className="btn btn-secondary btn-sm" id="export-metrics-btn">
            <Download size={15} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        {performanceMetrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} className="stat-card">
              <div className="stat-card-header">
                <span className="stat-card-title">{metric.label}</span>
                <div className="stat-icon" style={{ background: 'rgba(255,255,255,0.05)', color: metric.color }}>
                  <Icon size={18} />
                </div>
              </div>
              <div className="stat-value">{metric.value}</div>
              <div className="stat-footer">
                <span className="stat-trend up">
                  <TrendingUp size={14} />
                  {metric.change}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>over period</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts Grid */}
      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        {/* Chart 1: Sprint Velocity & Delivery Trend */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Sprint Delivery Velocity</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Story points cleared per deploy cycle</p>
            </div>
            <span className="badge badge-success">+24% vs baseline</span>
          </div>

          {/* SVG Area Chart */}
          <div style={{ width: '100%', height: '200px', position: 'relative', marginTop: 'auto' }}>
            <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Horizontal Grid lines */}
              <line x1="0" y1={height * 0.25} x2={width} y2={height * 0.25} stroke="var(--border-subtle)" strokeDasharray="3 3" />
              <line x1="0" y1={height * 0.5} x2={width} y2={height * 0.5} stroke="var(--border-subtle)" strokeDasharray="3 3" />
              <line x1="0" y1={height * 0.75} x2={width} y2={height * 0.75} stroke="var(--border-subtle)" strokeDasharray="3 3" />

              {/* Gradient Area Fill */}
              <path d={areaD} fill="url(#areaGradient)" />
              {/* Line Stroke */}
              <path d={pathD} fill="none" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

              {/* Data point dots */}
              {points.map((val, idx) => {
                const cx = idx * stepX;
                const cy = height - (val / 100) * (height - 30) - 15;
                return (
                  <circle
                    key={idx}
                    cx={cx}
                    cy={cy}
                    r="4"
                    fill="#0d121f"
                    stroke="#818cf8"
                    strokeWidth="2.5"
                  />
                );
              })}
            </svg>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
            <span>Cycle Start</span>
            <span>Mid-Sprint Peak</span>
            <span>Current Release</span>
          </div>
        </div>

        {/* Chart 2: Deploys vs PRs Bar Distribution */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Deployment Frequency</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Daily production builds vs pull requests</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: '8px', height: '8px', background: '#38bdf8', borderRadius: '2px' }} />
                <span>Deploys</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: '8px', height: '8px', background: '#a855f7', borderRadius: '2px' }} />
                <span>PRs Merged</span>
              </div>
            </div>
          </div>

          {/* Custom SVG Bar Chart */}
          <div style={{ width: '100%', height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
            {barData.map((item, idx) => {
              const maxVal = 40;
              const deployHeight = (item.deploys / maxVal) * 160;
              const prHeight = (item.prs / maxVal) * 160;

              return (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', width: '100%', justifyContent: 'center' }}>
                    <div
                      style={{
                        width: '45%',
                        height: `${deployHeight}px`,
                        background: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)',
                        borderRadius: '3px 3px 0 0',
                        transition: 'height 0.3s ease',
                      }}
                      title={`${item.day} Deploys: ${item.deploys}`}
                    />
                    <div
                      style={{
                        width: '45%',
                        height: `${prHeight}px`,
                        background: 'linear-gradient(180deg, #c084fc 0%, #7c3aed 100%)',
                        borderRadius: '3px 3px 0 0',
                        transition: 'height 0.3s ease',
                      }}
                      title={`${item.day} PRs: ${item.prs}`}
                    />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>{item.day}</span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
            <span>Weekly Total: 109 Deploys</span>
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>100% CI Pipeline Success</span>
          </div>
        </div>
      </div>

      {/* Regional Edge Infrastructure Table */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Globe size={18} color="var(--primary)" />
          <span>Render &amp; GitHub Global Edge CDN Performance</span>
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Continuous synthetic latency tests executed every 60 seconds from distributed nodes.
        </p>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Region / Edge Node</th>
                <th>Provider</th>
                <th>Avg Latency</th>
                <th>P99 Response</th>
                <th>Availability</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>US East (N. Virginia)</td>
                <td>Render Cloud</td>
                <td>12 ms</td>
                <td>18 ms</td>
                <td>100.0%</td>
                <td><span className="badge badge-success">Optimal</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Europe (Frankfurt)</td>
                <td>Render Cloud</td>
                <td>16 ms</td>
                <td>22 ms</td>
                <td>99.99%</td>
                <td><span className="badge badge-success">Optimal</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Asia Pacific (Singapore)</td>
                <td>Render Cloud</td>
                <td>24 ms</td>
                <td>31 ms</td>
                <td>99.98%</td>
                <td><span className="badge badge-success">Optimal</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Global Fastly / GH Edge</td>
                <td>GitHub Pages CDN</td>
                <td>14 ms</td>
                <td>19 ms</td>
                <td>100.0%</td>
                <td><span className="badge badge-info">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Zap, 
  Globe, 
  Activity,
  Download
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Analytics() {
  const { showToast } = useToast();
  const [timeRange, setTimeRange] = useState('30D');

  const performanceMetrics = [
    { label: 'EDGE CACHE HIT RATIO', value: '98.6%', change: '+1.2%', positive: true },
    { label: 'AVG BUILD COMPILATION', value: '854ms', change: '-240ms', positive: true },
    { label: 'P99 NETWORK LATENCY', value: '14.2ms', change: '-3.1ms', positive: true },
    { label: 'CRASH / ERROR RATE (5XX)', value: '0.001%', change: '0.0%', positive: true },
  ];

  const handleExport = () => {
    showToast('Exported telemetry metrics as JSON dataset', 'success');
  };

  const points = timeRange === '7D'
    ? [20, 45, 30, 60, 50, 75, 90]
    : timeRange === '90D'
    ? [15, 25, 30, 45, 40, 60, 55, 70, 65, 80, 85, 95]
    : [25, 35, 28, 52, 48, 65, 58, 72, 80, 75, 88, 94];

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
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <span>WORKSPACE</span>
            <span>/</span>
            <span>TELEMETRY</span>
          </div>
          <h1 style={{ fontSize: '1.6rem', letterSpacing: '-0.02em' }}>
            System Telemetry &amp; Delivery Cadence
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', background: 'var(--bg-canvas)', border: '1px solid var(--border-default)', padding: '2px', borderRadius: 'var(--radius-sm)' }}>
            {['7D', '30D', '90D'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`btn-sm ${timeRange === range ? 'btn-secondary' : 'btn-ghost'}`}
                style={{ fontSize: '0.74rem', padding: '3px 8px', borderRadius: 'var(--radius-xs)', fontFamily: 'var(--font-mono)' }}
              >
                {range}
              </button>
            ))}
          </div>

          <button onClick={handleExport} className="btn btn-secondary btn-sm" id="export-metrics-btn">
            <Download size={13} />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        {performanceMetrics.map((metric, i) => (
          <div key={i} className="stat-card">
            <div className="stat-card-title">{metric.label}</div>
            <div className="stat-value">{metric.value}</div>
            <div className="stat-footer">
              <span className="stat-trend up">
                <TrendingUp size={13} />
                {metric.change}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>period shift</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid-2" style={{ marginBottom: '24px' }}>
        {/* Chart 1: Velocity Curve */}
        <div className="panel" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', marginBottom: '2px' }}>Sprint Story Velocity</h3>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>STORY POINTS CLEARED / SPRINT CYCLE</p>
            </div>
            <span className="chip chip-success">+24% vs Q2 Baseline</span>
          </div>

          <div style={{ width: '100%', height: '180px', position: 'relative' }}>
            <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="0" y1={height * 0.25} x2={width} y2={height * 0.25} stroke="var(--border-subtle)" strokeDasharray="2 2" />
              <line x1="0" y1={height * 0.5} x2={width} y2={height * 0.5} stroke="var(--border-subtle)" strokeDasharray="2 2" />
              <line x1="0" y1={height * 0.75} x2={width} y2={height * 0.75} stroke="var(--border-subtle)" strokeDasharray="2 2" />

              <path d={areaD} fill="url(#areaGradient)" />
              <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

              {points.map((val, idx) => {
                const cx = idx * stepX;
                const cy = height - (val / 100) * (height - 30) - 15;
                return (
                  <circle
                    key={idx}
                    cx={cx}
                    cy={cy}
                    r="3"
                    fill="var(--bg-canvas)"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
            <span>CYCLE START (T-0)</span>
            <span>MID-CYCLE (T-14)</span>
            <span>STABLE RELEASE</span>
          </div>
        </div>

        {/* Chart 2: Deploys vs PRs */}
        <div className="panel" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', marginBottom: '2px' }}>Production Deploys vs PR Merges</h3>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>7-DAY ROLLING CI RUNS</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.74rem', fontFamily: 'var(--font-mono)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '1px' }} />
                <span>Deploys</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', background: 'var(--text-muted)', borderRadius: '1px' }} />
                <span>PRs</span>
              </div>
            </div>
          </div>

          <div style={{ width: '100%', height: '180px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px', paddingBottom: '4px', borderBottom: '1px solid var(--border-default)' }}>
            {barData.map((item, idx) => {
              const maxVal = 40;
              const deployHeight = (item.deploys / maxVal) * 140;
              const prHeight = (item.prs / maxVal) * 140;

              return (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', width: '100%', justifyContent: 'center' }}>
                    <div
                      style={{
                        width: '45%',
                        height: `${deployHeight}px`,
                        background: 'var(--accent)',
                        borderRadius: '1px 1px 0 0',
                      }}
                      title={`${item.day} Deploys: ${item.deploys}`}
                    />
                    <div
                      style={{
                        width: '45%',
                        height: `${prHeight}px`,
                        background: 'var(--text-muted)',
                        borderRadius: '1px 1px 0 0',
                      }}
                      title={`${item.day} PRs: ${item.prs}`}
                    />
                  </div>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '6px' }}>{item.day}</span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>
            <span>TOTAL: 109 DEPLOYS</span>
            <span style={{ color: 'var(--status-success)' }}>100% PIPELINE STABILITY</span>
          </div>
        </div>
      </div>

      {/* Regional Edge Infrastructure Table */}
      <div className="panel" style={{ padding: '16px' }}>
        <div className="label-caps" style={{ marginBottom: '4px' }}>GLOBAL ROUTING NODES</div>
        <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>Render Edge &amp; GitHub Pages Point-of-Presence (POP)</h3>

        <div className="table-wrap">
          <table className="dense-table">
            <thead>
              <tr>
                <th>Region Node</th>
                <th>Provider Target</th>
                <th>Avg Latency</th>
                <th>P99 Response</th>
                <th>Availability</th>
                <th>Health</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>US East (N. Virginia)</td>
                <td>Render Cloud</td>
                <td>12.1 ms</td>
                <td>16.4 ms</td>
                <td>100.0%</td>
                <td><span className="chip chip-success">OPTIMAL</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Europe (Frankfurt)</td>
                <td>Render Cloud</td>
                <td>15.8 ms</td>
                <td>20.2 ms</td>
                <td>99.99%</td>
                <td><span className="chip chip-success">OPTIMAL</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Asia Pacific (Singapore)</td>
                <td>Render Cloud</td>
                <td>23.4 ms</td>
                <td>29.1 ms</td>
                <td>99.98%</td>
                <td><span className="chip chip-success">OPTIMAL</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Global Fastly / GH Edge</td>
                <td>GitHub Pages CDN</td>
                <td>14.0 ms</td>
                <td>18.5 ms</td>
                <td>100.0%</td>
                <td><span className="chip chip-success">OPTIMAL</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

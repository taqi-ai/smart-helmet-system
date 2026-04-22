import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, ShieldCheck, Users, Camera, AlertTriangle } from 'lucide-react';
import './index.css';
import heroImage from './assets/helmet-logo.png';

const API_URL = 'http://localhost:5000';

function App() {
  const [stats, setStats] = useState({
    total_detected: 0,
    helmets: 0,
    no_helmets: 0,
    status: 'Connecting...',
    alert_active: false
  });
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval;
    if (!showSplash) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`${API_URL}/api/stats`);
          const data = await res.json();
          setStats(data);
        } catch (error) {
          console.error("Failed to fetch stats:", error);
          setStats(s => ({ ...s, status: 'Disconnected' }));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showSplash]);

  if (showSplash) {
    return (
      <div style={{
        height: '100vh', display: 'flex', flexDirection: 'column', 
        alignItems: 'center', justifyContent: 'center',
        background: '#0f172a', zIndex: 9999
      }}>
        <div style={{
          animation: 'float 3s ease-in-out infinite',
          display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <img src={heroImage} alt="Helmet Logo" style={{ 
              maxWidth: '300px', maxHeight: '300px', objectFit: 'contain',
              animation: 'helmet-rotate 4s infinite ease-in-out'
            }} />
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '2px', margin: 0, background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            SMART HELMET
          </h1>
          <p style={{ color: '#94a3b8', marginTop: '1rem', fontSize: '1.2rem', letterSpacing: '1px' }}>
            AI-Powered Safety Detection System
          </p>
          <div style={{
            marginTop: '3rem', width: '200px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden'
          }}>
            <div style={{
              width: '50%', height: '100%', background: '#6366f1',
              animation: 'loading 2s infinite ease-in-out'
            }}></div>
          </div>
        </div>
        <style>{`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <header className="glass" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={heroImage} alt="Helmet" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>Smart Helmet Monitor</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Real-time Safety Compliance</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: '0.5rem', 
            padding: '0.5rem 1rem', borderRadius: '20px',
            background: stats.status === 'Running' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${stats.status === 'Running' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
          }}>
            <Activity size={18} color={stats.status === 'Running' ? 'var(--success)' : 'var(--danger)'} />
            <span style={{ color: stats.status === 'Running' ? 'var(--success)' : 'var(--danger)', fontWeight: 500, fontSize: '0.9rem' }}>
              {stats.status}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        
        {/* Video Feed */}
        <div className="glass" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.5rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Camera size={20} /> Live Camera Feed
            </h2>
            {stats.alert_active && (
              <div style={{ 
                background: 'var(--danger)', color: 'white', padding: '0.4rem 1rem', 
                borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                animation: 'pulse-danger 2s infinite'
              }}>
                <AlertTriangle size={16} /> NO HELMET DETECTED
              </div>
            )}
          </div>
          
          <div style={{ 
            width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '12px', 
            overflow: 'hidden', position: 'relative', border: stats.alert_active ? '2px solid var(--danger)' : '1px solid rgba(255,255,255,0.1)',
            transition: 'border 0.3s ease'
          }}>
            <img 
              src={`${API_URL}/video_feed`} 
              alt="Video Feed" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{ 
              display: 'none', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'var(--text-muted)'
            }}>
              <Activity size={48} style={{ opacity: 0.5 }} />
              <p>Waiting for camera feed...</p>
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Stat Card 1 */}
          <div className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '16px', color: '#818cf8' }}>
              <Users size={32} />
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Total People</p>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>{stats.total_detected}</h3>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '16px', color: '#4ade80' }}>
              <ShieldCheck size={32} />
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>With Helmet</p>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0, color: '#4ade80' }}>{stats.helmets}</h3>
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '16px', color: '#f87171' }}>
              <ShieldAlert size={32} />
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Without Helmet</p>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0, color: '#f87171' }}>{stats.no_helmets}</h3>
            </div>
          </div>

          {/* Log / Alert Box */}
          <div className="glass" style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
              System Alerts
            </h3>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {stats.alert_active ? (
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', borderLeft: '3px solid var(--danger)', padding: '0.8rem', borderRadius: '4px' }}>
                  <p style={{ color: '#fca5a5', fontSize: '0.85rem', marginBottom: '0.2rem' }}>{new Date().toLocaleTimeString()}</p>
                  <p style={{ margin: 0, fontSize: '0.95rem' }}>Safety Violation: No helmet detected</p>
                </div>
              ) : (
                <div style={{ padding: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem' }}>
                  <ShieldCheck size={32} style={{ opacity: 0.5, marginBottom: '0.5rem' }} />
                  <p>All clear. No recent violations.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;

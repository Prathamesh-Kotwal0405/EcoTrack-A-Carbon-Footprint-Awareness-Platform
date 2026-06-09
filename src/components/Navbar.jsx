import React from 'react';
import { Leaf, Globe, Calculator, CheckSquare, BookOpen } from 'lucide-react';

export default function Navbar({ activeView, setActiveView, carbonSavings, carbonFootprint }) {
  return (
    <nav className="glass-nav" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 50,
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem'
    }}>
      {/* Brand logo */}
      <div 
        onClick={() => setActiveView('home')} 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: '1.4rem',
          letterSpacing: '-0.03em',
          background: 'linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        <Leaf size={24} style={{ stroke: 'url(#green-teal-gradient)', fill: 'rgba(34, 197, 94, 0.1)' }} />
        <span>EcoTrack</span>
      </div>

      {/* SVG Gradient definition for Lucide icons */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <linearGradient id="green-teal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
      </svg>

      {/* Navigation links */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
      }}>
        <button
          onClick={() => setActiveView('home')}
          style={{
            background: 'none',
            border: 'none',
            color: activeView === 'home' ? '#22c55e' : 'hsl(var(--text-secondary))',
            fontWeight: activeView === 'home' ? '600' : '400',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.5rem 0.8rem',
            borderRadius: '8px',
            fontSize: '0.95rem',
            transition: 'var(--transition-fast)',
            background: activeView === 'home' ? 'rgba(34, 197, 94, 0.08)' : 'transparent'
          }}
        >
          <Globe size={18} />
          <span>Terrains</span>
        </button>

        <button
          onClick={() => setActiveView('calculator')}
          style={{
            background: 'none',
            border: 'none',
            color: activeView === 'calculator' ? '#38bdf8' : 'hsl(var(--text-secondary))',
            fontWeight: activeView === 'calculator' ? '600' : '400',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.5rem 0.8rem',
            borderRadius: '8px',
            fontSize: '0.95rem',
            transition: 'var(--transition-fast)',
            background: activeView === 'calculator' ? 'rgba(56, 189, 248, 0.08)' : 'transparent'
          }}
        >
          <Calculator size={18} />
          <span>Calculator</span>
        </button>

        <button
          onClick={() => setActiveView('dashboard')}
          style={{
            background: 'none',
            border: 'none',
            color: activeView === 'dashboard' ? '#f59e0b' : 'hsl(var(--text-secondary))',
            fontWeight: activeView === 'dashboard' ? '600' : '400',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.5rem 0.8rem',
            borderRadius: '8px',
            fontSize: '0.95rem',
            transition: 'var(--transition-fast)',
            background: activeView === 'dashboard' ? 'rgba(245, 158, 11, 0.08)' : 'transparent'
          }}
        >
          <CheckSquare size={18} />
          <span>Tracker</span>
        </button>

        <button
          onClick={() => setActiveView('insights')}
          style={{
            background: 'none',
            border: 'none',
            color: activeView === 'insights' ? '#a78bfa' : 'hsl(var(--text-secondary))',
            fontWeight: activeView === 'insights' ? '600' : '400',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.5rem 0.8rem',
            borderRadius: '8px',
            fontSize: '0.95rem',
            transition: 'var(--transition-fast)',
            background: activeView === 'insights' ? 'rgba(167, 139, 250, 0.08)' : 'transparent'
          }}
        >
          <BookOpen size={18} />
          <span>Insights</span>
        </button>
      </div>

      {/* Carbon Tally Badges */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem'
      }}>
        {carbonFootprint !== null && (
          <div className="glass-panel" style={{
            padding: '0.4rem 0.8rem',
            borderRadius: '12px',
            fontSize: '0.85rem',
            borderColor: 'hsl(var(--card-border))',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            lineHeight: 1.2
          }}>
            <span style={{ color: 'hsl(var(--text-muted))', fontSize: '0.7rem' }}>MY FOOTPRINT</span>
            <span style={{ fontWeight: 700, color: '#f87171' }}>{carbonFootprint.toFixed(1)}t CO₂e/yr</span>
          </div>
        )}
        
        <div className="glass-panel" style={{
          padding: '0.4rem 0.8rem',
          borderRadius: '12px',
          fontSize: '0.85rem',
          borderColor: 'rgba(34, 197, 94, 0.35)',
          background: 'rgba(34, 197, 94, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          lineHeight: 1.2
        }}>
          <span style={{ color: 'hsl(var(--text-muted))', fontSize: '0.7rem' }}>TODAY'S SAVINGS</span>
          <span style={{ fontWeight: 700, color: '#4ade80' }}>+{carbonSavings.toFixed(1)} kg</span>
        </div>
      </div>
    </nav>
  );
}

import React, { useState, useEffect } from 'react';
import { HelpCircle, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TerrainSection({ terrain, value, onChange }) {
  const [showFact, setShowFact] = useState(false);

  // Helper to check if the current state is considered "healthy"
  const isHealthy = () => {
    if (terrain.controlType === 'toggle') {
      return value === true; // true means active protection (healthy)
    } else {
      // For canopy: lower deforestation is healthy
      if (terrain.id === 'canopy') return value <= 30;
      // For cryosphere: lower temperature rise is healthy
      if (terrain.id === 'cryosphere') return value <= 15; // <= 1.5°C
      return true;
    }
  };

  // Interpolate filters based on control values
  const getFilterStyle = () => {
    if (terrain.controlType === 'toggle') {
      return value ? terrain.states.healthy.filterStyle : terrain.states.unhealthy.filterStyle;
    }

    const percentage = (value - terrain.controlMin) / (terrain.controlMax - terrain.controlMin);
    
    if (terrain.id === 'canopy') {
      // Interpolate forest degradation: 0% deforestation is green, 100% is dark brown-grey
      // healthy: contrast(1.1) saturate(1.2) brightness(1.0) grayscale(0)
      // unhealthy: contrast(0.9) saturate(0.5) brightness(0.65) grayscale(0.5) sepia(0.3)
      const contrast = 1.1 - 0.2 * percentage;
      const saturate = 1.2 - 0.7 * percentage;
      const brightness = 1.0 - 0.35 * percentage;
      const grayscale = 0.5 * percentage;
      const sepia = 0.3 * percentage;
      return `contrast(${contrast}) saturate(${saturate}) brightness(${brightness}) grayscale(${grayscale}) sepia(${sepia})`;
    }

    if (terrain.id === 'cryosphere') {
      // Interpolate glacier melting: 0.0°C is bright/blue, 4.0°C is dark/melted/barren
      // healthy: contrast(1.15) saturate(1.2) brightness(1.0) grayscale(0)
      // unhealthy: contrast(0.9) saturate(0.6) brightness(0.8) hue-rotate(20deg) sepia(0.1)
      const contrast = 1.15 - 0.25 * percentage;
      const saturate = 1.2 - 0.6 * percentage;
      const brightness = 1.0 - 0.2 * percentage;
      const hueRotate = 20 * percentage;
      const sepia = 0.1 * percentage;
      return `contrast(${contrast}) saturate(${saturate}) brightness(${brightness}) hue-rotate(${hueRotate}deg) sepia(${sepia})`;
    }

    return '';
  };

  // Render SVG particle layer depending on terrain state
  const renderParticles = () => {
    const particles = [];
    
    if (terrain.id === 'canopy') {
      // Green/brown leaves drifting or smoke rising if deforestation is high
      const leafCount = Math.max(0, 15 - Math.floor(value / 6)); // fewer leaves as forest decreases
      const smokeCount = Math.max(0, Math.floor((value - 20) / 6)); // smoke appears above 20% deforestation

      for (let i = 0; i < leafCount; i++) {
        const left = Math.random() * 90;
        const delay = Math.random() * 10;
        const duration = 8 + Math.random() * 8;
        const size = 12 + Math.random() * 15;
        // Turn leaves brown/yellow as deforestation rises
        const color = value > 50 ? 'rgba(161, 98, 7, 0.6)' : 'rgba(34, 197, 94, 0.6)';
        
        particles.push(
          <div 
            key={`leaf-${i}`}
            className="leaf-particle"
            style={{
              left: `${left}%`,
              top: `-20px`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            <svg viewBox="0 0 24 24" fill={color}>
              <path d="M17 8C8 10 4 17 4 17C4 17 9 20 18 14C21 12 21 8 21 8C21 8 20 7 17 8Z" />
            </svg>
          </div>
        );
      }

      for (let i = 0; i < smokeCount; i++) {
        const left = 20 + Math.random() * 60;
        const delay = Math.random() * 8;
        const duration = 6 + Math.random() * 5;
        const size = 40 + Math.random() * 60;

        particles.push(
          <div 
            key={`smoke-${i}`}
            className="smoke-particle"
            style={{
              left: `${left}%`,
              bottom: `-50px`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      }
    }

    if (terrain.id === 'deep') {
      // Bubbles if clean (true), floating debris/trash if polluted (false)
      if (value) {
        // Clean: Bubbles!
        for (let i = 0; i < 20; i++) {
          const left = Math.random() * 95;
          const delay = Math.random() * 10;
          const duration = 5 + Math.random() * 8;
          const size = 5 + Math.random() * 15;

          particles.push(
            <div 
              key={`bubble-${i}`}
              className="bubble-particle"
              style={{
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          );
        }
      } else {
        // Polluted: Plastic wrappers/bottles floating
        for (let i = 0; i < 10; i++) {
          const left = 5 + Math.random() * 90;
          const delay = Math.random() * 12;
          const duration = 12 + Math.random() * 10;
          const size = 15 + Math.random() * 20;
          
          particles.push(
            <div 
              key={`trash-${i}`}
              style={{
                position: 'absolute',
                left: `${left}%`,
                top: `-40px`,
                width: `${size}px`,
                height: `${size}px`,
                animation: 'driftLeaves 18s linear infinite',
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                opacity: 0.5,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            >
              {/* Simple inline plastic bottle SVG */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#cbd5e1' }}>
                <path d="M6 18V9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v9M9 8V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4M8 12h8M8 15h8M7 21h10a1 1 0 0 0 1-1v-2H6v2a1 1 0 0 0 1 1z" />
              </svg>
            </div>
          );
        }
      }
    }

    if (terrain.id === 'grid') {
      // Solar grid active (true) -> show rotating wind turbine outlines
      // Fossil grid active (false) -> show soot particles/smoke rising
      if (value) {
        // Render stylized spinning wind turbines on the side
        return (
          <div style={{ position: 'absolute', right: '5%', bottom: '5%', zIndex: 2, display: 'flex', gap: '2rem', opacity: 0.35, pointerEvents: 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Rotating Blades */}
              <div style={{
                width: '80px',
                height: '80px',
                border: '2px solid transparent',
                borderRadius: '50%',
                position: 'relative',
                animation: 'rotateEarth 4s linear infinite'
              }}>
                <div style={{ width: '4px', height: '40px', background: '#fff', position: 'absolute', top: '0', left: '38px' }} />
                <div style={{ width: '40px', height: '4px', background: '#fff', position: 'absolute', top: '38px', left: '40px' }} />
                <div style={{ width: '4px', height: '40px', background: '#fff', position: 'absolute', bottom: '0', left: '38px' }} />
              </div>
              {/* Pole */}
              <div style={{ width: '6px', height: '90px', background: '#fff' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'scale(0.7)' }}>
              {/* Rotating Blades */}
              <div style={{
                width: '80px',
                height: '80px',
                border: '2px solid transparent',
                borderRadius: '50%',
                position: 'relative',
                animation: 'rotateEarth 3s linear infinite'
              }}>
                <div style={{ width: '4px', height: '40px', background: '#fff', position: 'absolute', top: '0', left: '38px' }} />
                <div style={{ width: '40px', height: '4px', background: '#fff', position: 'absolute', top: '38px', left: '40px' }} />
                <div style={{ width: '4px', height: '40px', background: '#fff', position: 'absolute', bottom: '0', left: '38px' }} />
              </div>
              {/* Pole */}
              <div style={{ width: '6px', height: '90px', background: '#fff' }} />
            </div>
          </div>
        );
      } else {
        // Smog particles rising
        for (let i = 0; i < 15; i++) {
          const left = Math.random() * 95;
          const delay = Math.random() * 10;
          const duration = 6 + Math.random() * 8;
          const size = 30 + Math.random() * 40;

          particles.push(
            <div 
              key={`smoke-grid-${i}`}
              className="smoke-particle"
              style={{
                left: `${left}%`,
                bottom: `-40px`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                background: 'rgba(120, 110, 100, 0.35)'
              }}
            />
          );
        }
      }
    }

    if (terrain.id === 'cryosphere') {
      // Ice crystals falling, and rising sea water overlay at the bottom if temperature is high
      const snowCount = Math.max(0, 30 - Math.floor(value * 0.7)); // less snow as it gets warmer
      const seaLevelRisePercent = (value / 40) * 100; // 0 to 4.0 °C translates to 0-100% of maximum visual rise
      
      for (let i = 0; i < snowCount; i++) {
        const left = Math.random() * 95;
        const delay = Math.random() * 8;
        const duration = 6 + Math.random() * 6;
        const size = 3 + Math.random() * 6;

        particles.push(
          <div 
            key={`snow-${i}`}
            className="snow-particle"
            style={{
              left: `${left}%`,
              top: `-10px`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      }

      // Add a rising water level element at the bottom if temperatures are rising
      if (value > 0) {
        particles.push(
          <div 
            key="sea-level-overlay"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: `${10 + (value / 40) * 150}px`, // visual height in pixels
              background: 'rgba(14, 165, 233, 0.65)',
              zIndex: 3,
              pointerEvents: 'none',
              transition: 'height 1s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(1px)'
            }}
          >
            {/* Waves Container at the top boundary */}
            <div style={{
              position: 'absolute',
              top: '-39px',
              left: 0,
              width: '100%',
              height: '40px',
              overflow: 'hidden',
              pointerEvents: 'none'
            }}>
              {/* Back Wave */}
              <svg 
                className="wave-back"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '200%',
                  height: '100%',
                  opacity: 0.5,
                  fill: 'rgba(14, 165, 233, 0.65)'
                }}
              >
                <path d="M0,60 C100,95 100,25 200,60 C300,95 300,25 400,60 C500,95 500,25 600,60 C700,95 700,25 800,60 C900,95 900,25 1000,60 C1100,95 1100,25 1200,60 L1200,120 L0,120 Z" />
              </svg>
              {/* Front Wave */}
              <svg 
                className="wave-front"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '200%',
                  height: '100%',
                  fill: 'rgba(14, 165, 233, 0.85)'
                }}
              >
                <path d="M0,60 C100,95 100,25 200,60 C300,95 300,25 400,60 C500,95 500,25 600,60 C700,95 700,25 800,60 C900,95 900,25 1000,60 C1100,95 1100,25 1200,60 L1200,120 L0,120 Z" />
              </svg>
            </div>
            
            <span style={{
              color: 'rgba(255, 255, 255, 0.95)',
              fontSize: '0.85rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              zIndex: 4,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              Sea Level Rise: +{((value / 10) * 25).toFixed(0)}cm
            </span>
          </div>
        );
      }
    }

    return particles;
  };

  // Get metrics details to display dynamically
  const getMetricDisplay = () => {
    if (terrain.id === 'canopy') {
      const remaining = 100 - value;
      return {
        label: "Forest Cover Remaining",
        value: `${remaining}%`,
        color: remaining > 70 ? '#4ade80' : remaining > 40 ? '#f59e0b' : '#f87171'
      };
    }
    if (terrain.id === 'deep') {
      return {
        label: "Reef Health Status",
        value: value ? "Thriving (100%)" : "Severely Bleached (15%)",
        color: value ? '#4ade80' : '#f87171'
      };
    }
    if (terrain.id === 'grid') {
      return {
        label: "Grid Renewables Share",
        value: value ? "85% Solar/Wind" : "15% Coal/Gas",
        color: value ? '#4ade80' : '#f59e0b'
      };
    }
    if (terrain.id === 'cryosphere') {
      const temp = (value / 10).toFixed(1);
      const isCritical = value > 15;
      return {
        label: "Global Temp Rise",
        value: `+${temp}°C`,
        color: isCritical ? '#f87171' : '#f59e0b'
      };
    }
    return null;
  };

  const metric = getMetricDisplay();
  const healthy = isHealthy();

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* Background Visual */}
      <div className="terrain-bg" style={{ filter: getFilterStyle() }}>
        {terrain.videoUrl ? (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              // If video fails, hide video and show image fallback
              e.target.style.display = 'none';
            }}
          >
            <source src={terrain.videoUrl} type="video/mp4" />
            <img src={terrain.imageUrl} alt={terrain.title} />
          </video>
        ) : (
          <img src={terrain.imageUrl} alt={terrain.title} />
        )}
        <div className="terrain-overlay" />
      </div>

      {/* Interactive Particles Layer */}
      <div className="particle-layer">
        {renderParticles()}
      </div>

      {/* Main Content Layout */}
      <div className="terrain-content">
        {/* Left Side: Educational details & Narrative */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.85)'
          }}
        >
          <span style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: terrain.themeColor
          }} id={`${terrain.id}-sub`}>
            {terrain.subtitle}
          </span>
          <h2 style={{
            fontSize: 'calc(1.8rem + 1vw)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'hsl(var(--text-primary))'
          }} id={`${terrain.id}-title`}>
            {terrain.title}
          </h2>
          <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '1.05rem', lineHeight: 1.6 }}>
            {terrain.description}
          </p>

          {/* Quick Metrics */}
          {metric && (
            <div className="glass-panel" style={{
              padding: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'hsl(var(--card-bg))',
              borderColor: 'hsl(var(--card-border))',
              marginTop: '0.5rem'
            }}>
              <span style={{ fontSize: '0.9rem', color: 'hsl(var(--text-secondary))', fontWeight: 500 }}>{metric.label}</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: metric.color }}>{metric.value}</span>
            </div>
          )}
        </motion.div>

        {/* Right Side: Glassmorphic Interactive Controller Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="glass-panel"
          style={{
            padding: '2rem',
            background: 'hsl(var(--card-bg))',
            borderColor: healthy ? 'rgba(34, 197, 94, 0.25)' : 'rgba(248, 113, 113, 0.25)',
            boxShadow: healthy ? '0 10px 40px rgba(34, 197, 94, 0.06)' : '0 10px 40px rgba(248, 113, 113, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            position: 'relative',
            zIndex: 10
          }}
        >
          {/* Header indicator inside card */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: healthy ? '#4ade80' : '#f87171',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              {healthy ? (
                <>
                  <CheckCircle size={14} />
                  Balanced State
                </>
              ) : (
                <>
                  <AlertTriangle size={14} />
                  Ecological Risk
                </>
              )}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>CONTROL MODULE</span>
          </div>

          <div>
            <h3 style={{ fontSize: '1.2rem', color: 'hsl(var(--text-primary))', marginBottom: '0.3rem' }}>
              {healthy ? terrain.states.healthy.title : terrain.states.unhealthy.title}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'hsl(var(--text-secondary))', lineHeight: 1.5 }}>
              {healthy ? terrain.states.healthy.description : terrain.states.unhealthy.description}
            </p>
          </div>

          {/* Interactive Input rendering */}
          <div className="input-group" style={{ margin: '0.5rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'hsl(var(--text-secondary))' }}>
                {terrain.controlLabel}
              </label>
              {terrain.controlType === 'slider' && (
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: terrain.themeColor }}>
                  {terrain.id === 'cryosphere' ? (value / 10).toFixed(1) : value}
                  {terrain.controlUnit}
                </span>
              )}
            </div>

            {terrain.controlType === 'slider' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                <input 
                  type="range"
                  min={terrain.controlMin}
                  max={terrain.controlMax}
                  step={terrain.controlStep}
                  value={value}
                  id={`control-${terrain.id}`}
                  onChange={(e) => onChange(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, ${terrain.themeColor} 0%, ${terrain.themeColor} ${((value - terrain.controlMin) / (terrain.controlMax - terrain.controlMin)) * 100}%, rgba(255, 255, 255, 0.15) ${((value - terrain.controlMin) / (terrain.controlMax - terrain.controlMin)) * 100}%, rgba(255, 255, 255, 0.15) 100%)`,
                    margin: '1rem 0 0.5rem 0'
                  }}
                />
                
                {/* Visual Scale / Ticks */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0 6px',
                  position: 'relative'
                }}>
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                    const tickVal = terrain.controlMin + (terrain.controlMax - terrain.controlMin) * ratio;
                    const displayVal = terrain.id === 'cryosphere' ? (tickVal / 10).toFixed(1) : tickVal.toFixed(0);
                    
                    return (
                      <div key={index} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        {/* Tick Line */}
                        <div style={{
                          width: '2px',
                          height: '6px',
                          background: 'rgba(255, 255, 255, 0.35)',
                          borderRadius: '1px'
                        }} />
                        {/* Tick Label */}
                        <span style={{
                          fontSize: '0.7rem',
                          color: 'hsl(var(--text-muted))',
                          fontWeight: 600
                        }}>
                          {displayVal}{terrain.controlUnit}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.8rem' }}>
                <label className="switch">
                  <input 
                    type="checkbox"
                    checked={value}
                    id={`control-${terrain.id}`}
                    onChange={(e) => onChange(e.target.checked)}
                  />
                  <span className="slider-round" />
                </label>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: value ? '#4ade80' : '#f87171' }}>
                  {value ? "ACTIVE PROTECTION" : "DISABLED"}
                </span>
              </div>
            )}
          </div>

          {/* Toggleable Did-you-know fact section */}
          <div style={{ borderTop: '1px solid hsl(var(--card-border))', paddingTop: '1rem' }}>
            <button 
              onClick={() => setShowFact(!showFact)}
              style={{
                background: 'none',
                border: 'none',
                color: 'hsl(var(--text-secondary))',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                outline: 'none',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = 'hsl(var(--text-primary))'}
              onMouseLeave={(e) => e.target.style.color = 'hsl(var(--text-secondary))'}
            >
              <Lightbulb size={16} style={{ color: '#f59e0b' }} />
              <span>{showFact ? "Hide Environmental Fact" : "Show Environmental Fact"}</span>
            </button>
            
            <AnimatePresence>
              {showFact && (
                <motion.div 
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: 'auto', opacity: 1, marginTop: 10 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{
                    padding: '0.8rem 1rem',
                    borderRadius: '10px',
                    background: 'rgba(180, 83, 9, 0.08)',
                    border: '1px solid rgba(180, 83, 9, 0.2)',
                    fontSize: '0.85rem',
                    color: '#9a3412',
                    lineHeight: 1.5
                  }}>
                    {healthy ? terrain.healthyFact : terrain.unhealthyFact}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import Hero from './Hero';
import TerrainSection from './TerrainSection';
import { TERRAINS } from '../utils/media';

export default function TerrainViewer({ terrainValues, setTerrainValues, onGoToCalculator }) {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('intro');

  // Set up intersection observer to detect current visible section
  useEffect(() => {
    const sections = ['intro', ...TERRAINS.map(t => t.id)];
    const observerOptions = {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: 0.5, // Trigger when 50% of the section is visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll to a specific section programmatically
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartScroll = () => {
    scrollToSection('canopy');
  };

  const handleValueChange = (terrainId, newValue) => {
    setTerrainValues(prev => ({
      ...prev,
      [terrainId]: newValue
    }));
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      {/* Scroll-Snap Container */}
      <div 
        ref={containerRef}
        className="snap-container" 
        style={{ height: '100%', width: '100%' }}
      >
        {/* Hero Section */}
        <div id="intro" className="snap-section" style={{ height: '100%', width: '100%' }}>
          <Hero 
            onStartScroll={handleStartScroll} 
            onGoToCalculator={onGoToCalculator} 
          />
        </div>

        {/* Terrains */}
        {TERRAINS.map((terrain) => (
          <div 
            key={terrain.id} 
            id={terrain.id} 
            className="snap-section"
            style={{ height: '100%', width: '100%' }}
          >
            <TerrainSection
              terrain={terrain}
              value={terrainValues[terrain.id]}
              onChange={(val) => handleValueChange(terrain.id, val)}
            />
          </div>
        ))}
      </div>

      {/* Floating Vertical Sidebar Navigation Dots */}
      <div style={{
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        alignItems: 'center',
        padding: '0.8rem 0.5rem',
        borderRadius: '20px',
        background: 'rgba(10, 12, 18, 0.4)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        {/* Intro Dot */}
        <button
          onClick={() => scrollToSection('intro')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
          title="Home"
        >
          <div style={{
            width: activeSection === 'intro' ? '12px' : '8px',
            height: activeSection === 'intro' ? '12px' : '8px',
            borderRadius: '50%',
            backgroundColor: activeSection === 'intro' ? '#fff' : 'rgba(255, 255, 255, 0.3)',
            boxShadow: activeSection === 'intro' ? '0 0 10px #fff' : 'none',
            transition: 'var(--transition-fast)'
          }} />
        </button>

        {/* Terrain Dots */}
        {TERRAINS.map((t) => {
          const isActive = activeSection === t.id;
          return (
            <button
              key={`dot-${t.id}`}
              onClick={() => scrollToSection(t.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
              title={t.title}
            >
              <div style={{
                width: isActive ? '12px' : '8px',
                height: isActive ? '12px' : '8px',
                borderRadius: '50%',
                backgroundColor: isActive ? t.themeColor : 'rgba(255, 255, 255, 0.3)',
                boxShadow: isActive ? `0 0 10px ${t.themeColor}` : 'none',
                transition: 'var(--transition-fast)'
              }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

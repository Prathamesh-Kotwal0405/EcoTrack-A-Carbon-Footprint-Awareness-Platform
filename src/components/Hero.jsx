import React, { useEffect, useState } from 'react';
import { ChevronDown, ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ onStartScroll, onGoToCalculator }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 40,
        y: (e.clientY - window.innerHeight / 2) / 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{
      position: 'relative',
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      background: 'radial-gradient(circle at center, #0b0c12 0%, #030406 100%)',
    }}>
      {/* Starry Parallax Layer */}
      <div 
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '120%',
          height: '120%',
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 0), radial-gradient(rgba(255, 255, 255, 0.08) 2px, transparent 0)',
          backgroundSize: '150px 150px, 300px 300px',
          backgroundPosition: '0 0, 75px 75px',
          opacity: 0.8,
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: 'transform 0.2s ease-out',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Floating Nebula / Colored Glows */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.06) 0%, rgba(20, 184, 166, 0.02) 50%, transparent 100%)',
        top: '20%',
        left: '15%',
        filter: 'blur(40px)',
        zIndex: 2,
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, rgba(167, 139, 250, 0.02) 60%, transparent 100%)',
        bottom: '10%',
        right: '10%',
        filter: 'blur(50px)',
        zIndex: 2,
        pointerEvents: 'none'
      }} />

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        maxWidth: '850px',
        padding: '0 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
      }}>
        {/* Animated Pill Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="glass-panel"
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '50px',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: '#4ade80',
            borderColor: 'rgba(34, 197, 94, 0.25)',
            background: 'rgba(34, 197, 94, 0.08)',
            marginBottom: '1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#16a34a',
            display: 'inline-block',
            boxShadow: '0 0 8px #16a34a'
          }} />
          Protecting Our Common Home
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          style={{
            fontSize: 'calc(2.5rem + 2vw)',
            fontWeight: 800,
            lineHeight: 1.1,
            background: 'linear-gradient(to right, #ffffff, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em',
            margin: '0.5rem 0'
          }}
        >
          One Planet. <br/>
          One Shared Impact.
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            fontSize: 'calc(1rem + 0.3vw)',
            color: 'hsl(var(--text-secondary))',
            maxWidth: '650px',
            margin: '0 auto 1.5rem auto',
            lineHeight: 1.6
          }}
        >
          Our choices write the story of the Earth's ecosystems. Scroll to witness how carbon footprints change our landscapes, calculate your footprint, and build a personalized plan to heal the planet.
        </motion.p>

        {/* Interactive glowing Earth illustration in background */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'url(https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=800&q=80) center/cover no-repeat',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 100px rgba(56, 189, 248, 0.2), inset 0 0 80px rgba(255,255,255,0.4)',
            zIndex: -1,
            filter: 'hue-rotate(20deg) brightness(0.8)',
            pointerEvents: 'none',
            animation: 'rotateEarth 120s linear infinite'
          }}
        />

        {/* Rotate earth keyframe inline */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes rotateEarth {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `}} />

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <button 
            onClick={onStartScroll}
            className="btn-primary"
            style={{
              background: 'linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)',
              color: '#ffffff',
              boxShadow: '0 4px 20px rgba(34, 197, 94, 0.2)',
              padding: '0.9rem 1.8rem',
              fontSize: '1rem'
            }}
          >
            Explore Terrains
            <ArrowRight size={18} />
          </button>
          
          <button 
            onClick={onGoToCalculator}
            className="btn-outline"
            style={{
              padding: '0.9rem 1.8rem',
              fontSize: '1rem',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#fff'
            }}
          >
            Calculate Footprint
          </button>
        </motion.div>
      </div>

      {/* Floating indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={onStartScroll}
        style={{
          position: 'absolute',
          bottom: '2rem',
          zIndex: 10,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'hsl(var(--text-muted))',
          fontSize: '0.8rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}
      >
        <span>Scroll to witness</span>
        <ChevronDown size={18} />
      </motion.div>
    </div>
  );
}

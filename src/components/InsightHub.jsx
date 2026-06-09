import React, { useState } from 'react';
import { BookOpen, Clock, ChevronDown, ChevronUp, Lightbulb, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { INSIGHTS } from '../utils/media';

export default function InsightHub({ onGoToTracker }) {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'food':
        return { text: '#4ade80', bg: 'rgba(34, 197, 94, 0.08)', border: 'rgba(34, 197, 94, 0.15)' };
      case 'energy':
        return { text: '#38bdf8', bg: 'rgba(56, 189, 248, 0.08)', border: 'rgba(56, 189, 248, 0.15)' };
      case 'transport':
        return { text: '#f59e0b', bg: 'rgba(245, 158, 11, 0.08)', border: 'rgba(245, 158, 11, 0.15)' };
      default:
        return { text: '#fff', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)' };
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      padding: '100px 2rem 50px 2rem',
      background: 'radial-gradient(circle at top, #0f1016 0%, #030406 100%)',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        {/* Hub Header */}
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: '#a78bfa', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Knowledge is Power
          </span>
          <h1 style={{ fontSize: '2.2rem', color: 'hsl(var(--text-primary))', marginTop: '0.3rem' }}>Eco-Insight Hub</h1>
          <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem', marginTop: '0.4rem', maxWidth: '600px', margin: '0.4rem auto 0 auto' }}>
            Deepen your understanding of carbon emissions. Explore statistics and simple habits to systematically reduce your environmental impact.
          </p>
        </div>

        {/* Insight Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {INSIGHTS.map((insight) => {
            const isExpanded = expandedCard === insight.id;
            const colors = getCategoryColor(insight.category);
            
            return (
              <div 
                key={insight.id}
                className="glass-panel"
                style={{
                  padding: '2rem',
                  background: 'hsl(var(--card-bg))',
                  borderColor: isExpanded ? colors.border : 'hsl(var(--card-border))',
                  boxShadow: isExpanded ? `0 10px 30px ${colors.bg}` : '0 4px 20px rgba(15, 23, 42, 0.05)',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {/* Card Header info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: colors.text,
                      background: colors.bg,
                      border: `1px solid ${colors.border}`,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px'
                    }}>
                      {insight.category}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={12} />
                      {insight.readTime}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => toggleExpand(insight.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'hsl(var(--text-secondary))',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  >
                    <span>{isExpanded ? "Collapse" : "Read Tips"}</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>

                {/* Main Content */}
                <div style={{ marginTop: '1.2rem' }}>
                  <h3 style={{ fontSize: '1.4rem', color: 'hsl(var(--text-primary))', marginBottom: '0.8rem' }}>{insight.title}</h3>
                  <div style={{
                    display: 'flex',
                    gap: '0.8rem',
                    alignItems: 'flex-start',
                    padding: '1rem',
                    borderRadius: '12px',
                    background: 'rgba(0,0,0,0.02)',
                    borderLeft: `3px solid ${colors.text}`
                  }}>
                    <BookOpen size={18} style={{ color: colors.text, marginTop: '2px', flexShrink: 0 }} />
                    <p style={{ fontSize: '0.95rem', color: 'hsl(var(--text-secondary))', fontStyle: 'italic', lineHeight: 1.5 }}>
                      "{insight.highlight}"
                    </p>
                  </div>
                </div>

                {/* Expandable Tips Panel */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ borderTop: '1px solid hsl(var(--card-border))', marginTop: '1.5rem', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h4 style={{ fontSize: '1.05rem', color: 'hsl(var(--text-primary))', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Lightbulb size={16} style={{ color: '#eab308' }} />
                          <span>Actionable Habit Changes</span>
                        </h4>

                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', listStyle: 'none', paddingLeft: 0 }}>
                          {insight.tips.map((tip, idx) => (
                            <li 
                              key={idx}
                              style={{
                                fontSize: '0.9rem',
                                color: 'hsl(var(--text-secondary))',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.6rem',
                                lineHeight: 1.5
                              }}
                            >
                              <span style={{ color: colors.text, fontWeight: 700 }}>•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.8rem' }}>
                          <button
                            onClick={onGoToTracker}
                            className="btn-outline"
                            style={{
                              fontSize: '0.85rem',
                              padding: '0.5rem 1.2rem',
                              borderColor: colors.border,
                              color: colors.text,
                              background: 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.4rem'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = colors.bg;
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'transparent';
                            }}
                          >
                            <span>Open Tracker Checklist</span>
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

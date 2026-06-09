import React from 'react';
import { Check, Flame, Trophy, Leaf, Calculator, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { DAILY_CHALLENGES } from '../utils/media';

export default function Dashboard({ 
  completedActions, 
  setCompletedActions, 
  carbonFootprint, 
  carbonSavings,
  onGoToCalculator,
  onHealTerrain
}) {

  // Trigger celebration on completing a task
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#22c55e', '#10b981', '#34d399', '#6ee7b7', '#38bdf8']
    });
  };

  const handleToggleAction = (actionId, carbonSaved, category) => {
    const isCompleted = completedActions.includes(actionId);
    
    if (!isCompleted) {
      // Add action
      setCompletedActions(prev => [...prev, actionId]);
      triggerConfetti();
      
      // Heal the corresponding terrain!
      if (category === 'energy') {
        // Heal grid grid (renewable grid true)
        onHealTerrain('grid', true);
        // Decrease temperature rise slightly
        onHealTerrain('cryosphere', (prev) => Math.max(0, prev - 2));
      } else if (category === 'waste') {
        // Heal ocean terrain
        onHealTerrain('deep', true);
      } else if (category === 'food') {
        // Heal canopy deforestation slightly (decrease deforestation)
        onHealTerrain('canopy', (prev) => Math.max(0, prev - 15));
      } else if (category === 'transport') {
        // Decrease deforestation and temperature
        onHealTerrain('canopy', (prev) => Math.max(0, prev - 10));
        onHealTerrain('cryosphere', (prev) => Math.max(0, prev - 3));
      }
    } else {
      // Remove action
      setCompletedActions(prev => prev.filter(id => id !== actionId));
    }
  };

  // Determine plant growth stage based on savings
  const getPlantStage = () => {
    if (carbonSavings === 0) return { stage: "Seedling", desc: "Start saving carbon to sprout your seed!", icon: "🌱", color: "#64748b" };
    if (carbonSavings < 2.0) return { stage: "Sprout", desc: "Great start! Your plant is breaking the soil.", icon: "🌿", color: "#86efac" };
    if (carbonSavings < 5.0) return { stage: "Sapling", desc: "Steady action is helping your plant grow branches.", icon: "🌳", color: "#4ade80" };
    return { stage: "Oak Tree", desc: "Incredible! Your actions created a mature forest guardian.", icon: "🌲", color: "#22c55e" };
  };

  const plant = getPlantStage();
  const progressPercent = Math.min(100, (carbonSavings / 7.7) * 100); // Max savings sum is 7.7kg

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      padding: '100px 2rem 50px 2rem',
      background: 'radial-gradient(circle at top, #0c121e 0%, #030508 100%)',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '2.5rem'
      }}>
        {/* Left Column: Daily Actions CheckList */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: '#4ade80', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              ACT LOCAL, THINK GLOBAL
            </span>
            <h1 style={{ fontSize: '2.2rem', color: 'hsl(var(--text-primary))', marginTop: '0.3rem' }}>Daily Actions Tracker</h1>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem', marginTop: '0.4rem' }}>
              Check off tasks as you complete them. These choices decrease carbon emissions and heal the virtual terrains of the Earth in real-time!
            </p>
          </div>

          {/* List of Challenges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {DAILY_CHALLENGES.map((challenge) => {
              const checked = completedActions.includes(challenge.id);
              return (
                <div 
                  key={challenge.id}
                  className="tracker-item"
                  style={{
                    borderColor: checked ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.05)',
                    background: checked ? 'rgba(34, 197, 94, 0.03)' : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div 
                      onClick={() => handleToggleAction(challenge.id, challenge.carbonSaved, challenge.category)}
                      className={`tracker-checkbox ${checked ? 'checked' : ''}`}
                      id={`check-${challenge.id}`}
                    >
                      {checked && <Check size={14} strokeWidth={3} style={{ color: '#fff' }} />}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', color: 'hsl(var(--text-primary))', textDecoration: checked ? 'line-through' : 'none', opacity: checked ? 0.7 : 1 }}>
                        {challenge.title}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))', marginTop: '0.2rem' }}>
                        {challenge.description}
                      </p>
                    </div>
                  </div>

                  <span style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#4ade80',
                    background: 'rgba(34, 197, 94, 0.08)',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(34, 197, 94, 0.25)'
                  }}>
                    -{challenge.carbonSaved.toFixed(1)} kg CO₂e
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Widgets / Growth & Overview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Carbon Footprint Baseline Widget */}
          {carbonFootprint === null ? (
            <div className="glass-panel" style={{
              padding: '2rem',
              textAlign: 'center',
              background: 'rgba(56, 189, 248, 0.03)',
              borderColor: 'rgba(56, 189, 248, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <Calculator size={36} style={{ color: '#38bdf8' }} />
              <div>
                <h3 style={{ color: 'hsl(var(--text-primary))', fontSize: '1.2rem', marginBottom: '0.4rem' }}>Baseline Footprint Missing</h3>
                <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', lineHeight: 1.5 }}>
                  Calculate your baseline yearly footprint to get more customized insights and tracking benchmarks.
                </p>
              </div>
              <button 
                onClick={onGoToCalculator}
                className="btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  padding: '0.6rem 1.5rem'
                }}
              >
                Go to Calculator
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="glass-panel" style={{
              padding: '1.5rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'hsl(var(--card-bg))'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Current Profile
                </span>
                <h3 style={{ color: 'hsl(var(--text-primary))', fontSize: '1.3rem', marginTop: '0.2rem' }}>Baseline Footprint</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f87171' }}>{carbonFootprint.toFixed(1)}</span>
                <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', marginLeft: '0.2rem' }}>tonnes CO₂e/yr</span>
              </div>
            </div>
          )}

          {/* Plant Growth Garden Widget */}
          <div className="glass-panel" style={{
            padding: '2rem',
            background: 'hsl(var(--card-bg))',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.2rem', color: 'hsl(var(--text-primary))', alignSelf: 'flex-start' }}>Your Savings Garden</h3>
            
            {/* Visual representation */}
            <div style={{
              position: 'relative',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(34, 197, 94, 0.05)',
              border: `2px dashed rgba(34, 197, 94, 0.25)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4.5rem',
              boxShadow: `0 0 20px rgba(34, 197, 94, 0.04)`
            }}>
              <motion.span 
                key={plant.stage}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                {plant.icon}
              </motion.span>
            </div>

            <div>
              <h4 style={{ fontSize: '1.1rem', color: plant.color, fontWeight: 700 }}>
                {plant.stage} Stage
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', marginTop: '0.3rem', maxWidth: '300px' }}>
                {plant.desc}
              </p>
            </div>

            {/* Progress Gauge */}
            <div style={{ width: '100%', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'hsl(var(--text-muted))', marginBottom: '0.4rem' }}>
                <span>Daily Savings: {carbonSavings.toFixed(1)} kg</span>
                <span>Goal: 7.7 kg</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #10b981 0%, #22c55e 100%)',
                  borderRadius: '4px',
                  transition: 'width 0.4s ease'
                }} />
              </div>
            </div>
          </div>

          {/* Gamified Achievements / Trophies */}
          <div className="glass-panel" style={{
            padding: '2rem',
            background: 'hsl(var(--card-bg))',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem'
          }}>
            <h3 style={{ fontSize: '1.2rem', color: 'hsl(var(--text-primary))', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Trophy size={18} style={{ color: '#f59e0b' }} />
              <span>Achievements</span>
            </h3>

            {/* Streak achievement */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: completedActions.length > 0 ? 'rgba(239, 68, 68, 0.08)' : 'rgba(0,0,0,0.02)',
                border: `1px solid ${completedActions.length > 0 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0,0,0,0.05)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: completedActions.length > 0 ? '#dc2626' : 'hsl(var(--text-muted))'
              }}>
                <Flame size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'hsl(var(--text-primary))', fontWeight: 600 }}>Active Catalyst</h4>
                <p style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>
                  {completedActions.length > 0 ? "Completed actions today. Streak: 1 day!" : "Complete an action to start your streak."}
                </p>
              </div>
            </div>

            {/* First savings achievement */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: carbonSavings >= 2.0 ? 'rgba(34, 197, 94, 0.08)' : 'rgba(0,0,0,0.02)',
                border: `1px solid ${carbonSavings >= 2.0 ? 'rgba(34, 197, 94, 0.25)' : 'rgba(0,0,0,0.05)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: carbonSavings >= 2.0 ? '#16a34a' : 'hsl(var(--text-muted))'
              }}>
                <Leaf size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'hsl(var(--text-primary))', fontWeight: 600 }}>Green Sprout</h4>
                <p style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>
                  {carbonSavings >= 2.0 ? "Unlocked: Saved more than 2.0kg CO2!" : "Save 2.0kg or more carbon in a single day."}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

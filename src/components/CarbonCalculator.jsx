import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Home, Car, Utensils, Info, Check, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CarbonCalculator({ onCalculatorComplete, savedScore }) {
  const [step, setStep] = useState(1);
  
  // Input fields state
  const [electricity, setElectricity] = useState('250'); // kWh/month
  const [heatingSource, setHeatingSource] = useState('gas'); // gas, electric, none
  const [heatingUsage, setHeatingUsage] = useState('100'); // m3/month or kWh/month
  
  const [carType, setCarType] = useState('petrol'); // petrol, diesel, electric, none
  const [carDistance, setCarDistance] = useState('12000'); // km/year
  const [publicTransit, setPublicTransit] = useState('50'); // km/week
  const [flightHours, setFlightHours] = useState('10'); // hours/year
  
  const [diet, setDiet] = useState('average'); // meat-heavy, average, vegetarian, vegan
  const [wasteHabit, setWasteHabit] = useState('average'); // low-recycle, average, zero-waste

  const [result, setResult] = useState(null);

  // Initialize form if there is a saved score in local storage or app state
  useEffect(() => {
    if (savedScore) {
      setResult(savedScore);
      setStep(4);
    }
  }, [savedScore]);

  const calculateFootprint = () => {
    // 1. Home Energy (tonnes CO2e/year)
    const electCoeff = 0.38; // kg CO2e / kWh
    const electEmissions = (Number(electricity) * 12 * electCoeff) / 1000;
    
    let heatingEmissions = 0;
    if (heatingSource === 'gas') {
      heatingEmissions = (Number(heatingUsage) * 12 * 2.0) / 1000; // 2.0 kg per m3
    } else if (heatingSource === 'electric') {
      heatingEmissions = (Number(heatingUsage) * 12 * 0.38) / 1000; // electric heating grid coeff
    }
    const energyTotal = electEmissions + heatingEmissions;

    // 2. Transportation (tonnes CO2e/year)
    let carCoeff = 0;
    if (carType === 'petrol') carCoeff = 0.20; // kg CO2e / km
    else if (carType === 'diesel') carCoeff = 0.17;
    else if (carType === 'electric') carCoeff = 0.05; // EV grid charging
    
    const carEmissions = carType === 'none' ? 0 : (Number(carDistance) * carCoeff) / 1000;
    const transitEmissions = (Number(publicTransit) * 52 * 0.06) / 1000; // 0.06 kg / km
    const flightEmissions = (Number(flightHours) * 130) / 1000; // ~130 kg per flight hour average
    const transportTotal = carEmissions + transitEmissions + flightEmissions;

    // 3. Diet & Waste (tonnes CO2e/year)
    let dietTotal = 2.1; // average
    if (diet === 'meat-heavy') dietTotal = 2.8;
    else if (diet === 'vegetarian') dietTotal = 1.5;
    else if (diet === 'vegan') dietTotal = 1.0;

    let wasteTotal = 0.7; // average
    if (wasteHabit === 'low-recycle') wasteTotal = 1.2;
    else if (wasteHabit === 'zero-waste') wasteTotal = 0.3;

    const lifestyleTotal = dietTotal + wasteTotal;
    const overallTotal = energyTotal + transportTotal + lifestyleTotal;

    const newResult = {
      overall: overallTotal,
      energy: energyTotal,
      transport: transportTotal,
      lifestyle: lifestyleTotal,
      breakdown: {
        electricity: electEmissions,
        heating: heatingEmissions,
        car: carEmissions,
        transit: transitEmissions,
        flights: flightEmissions,
        diet: dietTotal,
        waste: wasteTotal
      }
    };

    setResult(newResult);
    onCalculatorComplete(newResult);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setResult(null);
  };

  // SVG Donut calculation helpers
  const getSvgCoordinates = (percent) => {
    const angle = percent * 360 * (Math.PI / 180);
    const x = 50 + 40 * Math.sin(angle);
    const y = 50 - 40 * Math.cos(angle);
    return { x, y };
  };

  const renderDonutChart = () => {
    if (!result) return null;
    
    const total = result.overall;
    const energyPct = result.energy / total;
    const transportPct = result.transport / total;
    const lifestylePct = result.lifestyle / total;

    // SVG parameters
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    
    const energyStroke = circumference * energyPct;
    const transportStroke = circumference * transportPct;
    const lifestyleStroke = circumference * lifestylePct;

    return (
      <svg width="220" height="220" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
        {/* Empty track */}
        <circle cx="50" cy="50" r={radius} fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
        
        {/* Energy Slice (Blue) */}
        <circle 
          cx="50" 
          cy="50" 
          r={radius} 
          fill="transparent" 
          stroke="#38bdf8" 
          strokeWidth="10" 
          strokeDasharray={`${energyStroke} ${circumference}`}
          strokeDashoffset={0}
        />
        
        {/* Transport Slice (Gold) */}
        <circle 
          cx="50" 
          cy="50" 
          r={radius} 
          fill="transparent" 
          stroke="#f59e0b" 
          strokeWidth="10" 
          strokeDasharray={`${transportStroke} ${circumference}`}
          strokeDashoffset={-energyStroke}
        />
        
        {/* Lifestyle Slice (Green) */}
        <circle 
          cx="50" 
          cy="50" 
          r={radius} 
          fill="transparent" 
          stroke="#22c55e" 
          strokeWidth="10" 
          strokeDasharray={`${lifestyleStroke} ${circumference}`}
          strokeDashoffset={-(energyStroke + transportStroke)}
        />

        {/* Center label (requires counter-rotation to look upright) */}
        <g style={{ transform: 'rotate(90deg) translate(0px, -100px)' }}>
          <text x="50" y="47" textAnchor="middle" fill="hsl(var(--text-primary))" fontSize="10" fontWeight="800" fontFamily="var(--font-heading)">
            {total.toFixed(1)}
          </text>
          <text x="50" y="58" textAnchor="middle" fill="hsl(var(--text-secondary))" fontSize="4.5" fontWeight="500" letterSpacing="0.05em">
            TONNES/YR
          </text>
        </g>
      </svg>
    );
  };

  const currentWarmingFeedback = () => {
    if (!result) return "";
    const total = result.overall;
    if (total <= 3.0) return { text: "Excellent, low-carbon lifestyle!", color: "#4ade80", rating: "Eco-Guardian" };
    if (total <= 6.0) return { text: "Moderate impact. Near the global average, but room to optimize.", color: "#38bdf8", rating: "Earth-Citizen" };
    if (total <= 12.0) return { text: "High impact. Significantly above the sustainable budget.", color: "#f59e0b", rating: "Carbon-Heavy" };
    return { text: "Severe impact. Your footprint is contributing heavily to warming.", color: "#f87171", rating: "Climate-Crisis" };
  };

  const feedback = currentWarmingFeedback();

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      padding: '100px 2rem 50px 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at bottom, #090b11 0%, #030407 100%)',
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '800px',
        padding: '3rem',
        background: 'hsl(var(--card-bg))',
        borderColor: 'hsl(var(--card-border))',
        boxShadow: '0 20px 50px rgba(15, 23, 42, 0.05)'
      }}>
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.2rem', color: 'hsl(var(--text-primary))', marginBottom: '0.5rem' }}>Carbon Calculator</h1>
          <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem' }}>
            {step < 4 ? `Step ${step} of 3: Complete details to estimate your footprint` : "Your Ecological Footprint Results"}
          </p>
          
          {/* Visual Step Bar */}
          {step < 4 && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '300px',
              margin: '1.5rem auto 0 auto',
              position: 'relative'
            }}>
              {/* Backing bar */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: '100%',
                height: '2px',
                background: 'rgba(255,255,255,0.1)',
                transform: 'translateY(-50%)',
                zIndex: 1
              }} />
              {/* Active fill bar */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: `${((step - 1) / 2) * 100}%`,
                height: '2px',
                background: 'linear-gradient(90deg, #38bdf8 0%, #22c55e 100%)',
                transform: 'translateY(-50%)',
                zIndex: 2,
                transition: 'width 0.4s ease'
              }} />
              
              {/* Step Dots */}
              {[1, 2, 3].map((s) => (
                <div 
                  key={s}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: step === s ? '#fff' : step > s ? '#22c55e' : 'hsl(var(--bg-dark))',
                    border: `2px solid ${step === s ? '#38bdf8' : step > s ? '#22c55e' : 'rgba(255,255,255,0.2)'}`,
                    color: step > s ? '#fff' : step === s ? '#0f172a' : 'hsl(var(--text-muted))',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  {step > s ? <Check size={12} strokeWidth={3} /> : s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Content / Stepped Screens */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="calc-step"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', borderBottom: '1px solid hsl(var(--card-border))', paddingBottom: '1rem' }}>
                <Home style={{ color: '#38bdf8' }} size={24} />
                <h2 style={{ fontSize: '1.4rem', color: 'hsl(var(--text-primary))' }}>Home Energy Consumption</h2>
              </div>

              {/* Electricity Field */}
              <div className="input-group">
                <label htmlFor="electricity-usage">Monthly Electricity Bill (in kWh)</label>
                <input 
                  type="number" 
                  id="electricity-usage"
                  className="input-field" 
                  value={electricity}
                  onChange={(e) => setElectricity(e.target.value)}
                  placeholder="e.g. 250"
                  min="0"
                />
                <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>Average household usage is approx. 200 - 450 kWh.</span>
              </div>

              {/* Heating Source Select */}
              <div className="input-group">
                <label>Primary Heating Energy Source</label>
                <div className="radio-group">
                  <label className="radio-card">
                    <input 
                      type="radio" 
                      name="heatingSource" 
                      value="gas" 
                      checked={heatingSource === 'gas'}
                      onChange={() => setHeatingSource('gas')}
                    />
                    <div className="radio-card-content">
                      <span style={{ fontWeight: 600 }}>Natural Gas</span>
                      <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>Piped Gas</span>
                    </div>
                  </label>

                  <label className="radio-card">
                    <input 
                      type="radio" 
                      name="heatingSource" 
                      value="electric" 
                      checked={heatingSource === 'electric'}
                      onChange={() => setHeatingSource('electric')}
                    />
                    <div className="radio-card-content">
                      <span style={{ fontWeight: 600 }}>Electricity</span>
                      <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>Heat Pump/Radiator</span>
                    </div>
                  </label>

                  <label className="radio-card">
                    <input 
                      type="radio" 
                      name="heatingSource" 
                      value="none" 
                      checked={heatingSource === 'none'}
                      onChange={() => setHeatingSource('none')}
                    />
                    <div className="radio-card-content">
                      <span style={{ fontWeight: 600 }}>None</span>
                      <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>No added heat</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Heating Source Input (if source is not none) */}
              {heatingSource !== 'none' && (
                <div className="input-group">
                  <label htmlFor="heating-usage">
                    Average Monthly Heating Fuel ({heatingSource === 'gas' ? 'm³' : 'kWh'})
                  </label>
                  <input 
                    type="number" 
                    id="heating-usage"
                    className="input-field" 
                    value={heatingUsage}
                    onChange={(e) => setHeatingUsage(e.target.value)}
                    placeholder="e.g. 100"
                    min="0"
                  />
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button 
                  onClick={() => setStep(2)}
                  className="btn-primary"
                  style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)', color: '#fff', padding: '0.8rem 2rem' }}
                >
                  Next: Travel
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="calc-step"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', borderBottom: '1px solid hsl(var(--card-border))', paddingBottom: '1rem' }}>
                <Car style={{ color: '#f59e0b' }} size={24} />
                <h2 style={{ fontSize: '1.4rem', color: 'hsl(var(--text-primary))' }}>Transportation Habits</h2>
              </div>

              {/* Vehicle Type */}
              <div className="input-group">
                <label>Personal Vehicle Engine Type</label>
                <div className="radio-group">
                  <label className="radio-card">
                    <input 
                      type="radio" 
                      name="carType" 
                      value="petrol" 
                      checked={carType === 'petrol'}
                      onChange={() => setCarType('petrol')}
                    />
                    <div className="radio-card-content">
                      <span style={{ fontWeight: 600 }}>Petrol / Gas</span>
                      <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>Combustion</span>
                    </div>
                  </label>

                  <label className="radio-card">
                    <input 
                      type="radio" 
                      name="carType" 
                      value="diesel" 
                      checked={carType === 'diesel'}
                      onChange={() => setCarType('diesel')}
                    />
                    <div className="radio-card-content">
                      <span style={{ fontWeight: 600 }}>Diesel</span>
                      <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>High Torque</span>
                    </div>
                  </label>

                  <label className="radio-card">
                    <input 
                      type="radio" 
                      name="carType" 
                      value="electric" 
                      checked={carType === 'electric'}
                      onChange={() => setCarType('electric')}
                    />
                    <div className="radio-card-content">
                      <span style={{ fontWeight: 600 }}>Electric (EV)</span>
                      <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>Zero exhaust</span>
                    </div>
                  </label>

                  <label className="radio-card">
                    <input 
                      type="radio" 
                      name="carType" 
                      value="none" 
                      checked={carType === 'none'}
                      onChange={() => setCarType('none')}
                    />
                    <div className="radio-card-content">
                      <span style={{ fontWeight: 600 }}>No Car</span>
                      <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>Walk/Transit</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Car Distance */}
              {carType !== 'none' && (
                <div className="input-group">
                  <label htmlFor="car-distance">Annual Mileage (in km/year)</label>
                  <input 
                    type="number" 
                    id="car-distance"
                    className="input-field" 
                    value={carDistance}
                    onChange={(e) => setCarDistance(e.target.value)}
                    placeholder="e.g. 12000"
                    min="0"
                  />
                </div>
              )}

              {/* Public Transport */}
              <div className="input-group">
                <label htmlFor="transit-distance">Weekly Public Transport Travel (Bus/Train/Metro in km/week)</label>
                <input 
                  type="number" 
                  id="transit-distance"
                  className="input-field" 
                  value={publicTransit}
                  onChange={(e) => setPublicTransit(e.target.value)}
                  placeholder="e.g. 50"
                  min="0"
                />
              </div>

              {/* Flights */}
              <div className="input-group">
                <label htmlFor="flight-hours">Annual Flying Time (in flight hours/year)</label>
                <input 
                  type="number" 
                  id="flight-hours"
                  className="input-field" 
                  value={flightHours}
                  onChange={(e) => setFlightHours(e.target.value)}
                  placeholder="e.g. 10"
                  min="0"
                />
                <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>A single short round-trip is roughly 3-5 flight hours. Intercontinental is 10-25 hours.</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button 
                  onClick={() => setStep(1)}
                  className="btn-outline"
                  style={{ padding: '0.8rem 2rem' }}
                >
                  Back
                </button>
                <button 
                  onClick={() => setStep(3)}
                  className="btn-primary"
                  style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#fff', padding: '0.8rem 2rem' }}
                >
                  Next: Lifestyle
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="calc-step"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', borderBottom: '1px solid hsl(var(--card-border))', paddingBottom: '1rem' }}>
                <Utensils style={{ color: '#22c55e' }} size={24} />
                <h2 style={{ fontSize: '1.4rem', color: 'hsl(var(--text-primary))' }}>Dietary & Waste Lifestyle</h2>
              </div>

              {/* Diet selection */}
              <div className="input-group">
                <label>Dietary Style</label>
                <div className="radio-group">
                  <label className="radio-card">
                    <input 
                      type="radio" 
                      name="diet" 
                      value="meat-heavy" 
                      checked={diet === 'meat-heavy'}
                      onChange={() => setDiet('meat-heavy')}
                    />
                    <div className="radio-card-content">
                      <span style={{ fontWeight: 600 }}>Meat Lover</span>
                      <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>Red meat often</span>
                    </div>
                  </label>

                  <label className="radio-card">
                    <input 
                      type="radio" 
                      name="diet" 
                      value="average" 
                      checked={diet === 'average'}
                      onChange={() => setDiet('average')}
                    />
                    <div className="radio-card-content">
                      <span style={{ fontWeight: 600 }}>Balanced</span>
                      <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>Poultry/fish/veg</span>
                    </div>
                  </label>

                  <label className="radio-card">
                    <input 
                      type="radio" 
                      name="diet" 
                      value="vegetarian" 
                      checked={diet === 'vegetarian'}
                      onChange={() => setDiet('vegetarian')}
                    />
                    <div className="radio-card-content">
                      <span style={{ fontWeight: 600 }}>Vegetarian</span>
                      <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>No meat, eats dairy</span>
                    </div>
                  </label>

                  <label className="radio-card">
                    <input 
                      type="radio" 
                      name="diet" 
                      value="vegan" 
                      checked={diet === 'vegan'}
                      onChange={() => setDiet('vegan')}
                    />
                    <div className="radio-card-content">
                      <span style={{ fontWeight: 600 }}>Vegan</span>
                      <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>100% Plant-based</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Recycling Habits */}
              <div className="input-group">
                <label>Recycling & Waste Habits</label>
                <div className="radio-group">
                  <label className="radio-card">
                    <input 
                      type="radio" 
                      name="waste" 
                      value="low-recycle" 
                      checked={wasteHabit === 'low-recycle'}
                      onChange={() => setWasteHabit('low-recycle')}
                    />
                    <div className="radio-card-content">
                      <span style={{ fontWeight: 600 }}>Minimalist</span>
                      <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>Rarely recycle</span>
                    </div>
                  </label>

                  <label className="radio-card">
                    <input 
                      type="radio" 
                      name="waste" 
                      value="average" 
                      checked={wasteHabit === 'average'}
                      onChange={() => setWasteHabit('average')}
                    />
                    <div className="radio-card-content">
                      <span style={{ fontWeight: 600 }}>Standard</span>
                      <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>Recycle paper/cans</span>
                    </div>
                  </label>

                  <label className="radio-card">
                    <input 
                      type="radio" 
                      name="waste" 
                      value="zero-waste" 
                      checked={wasteHabit === 'zero-waste'}
                      onChange={() => setWasteHabit('zero-waste')}
                    />
                    <div className="radio-card-content">
                      <span style={{ fontWeight: 600 }}>Zero Waste</span>
                      <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>Compost & Reuse</span>
                    </div>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button 
                  onClick={() => setStep(2)}
                  className="btn-outline"
                  style={{ padding: '0.8rem 2rem' }}
                >
                  Back
                </button>
                <button 
                  onClick={calculateFootprint}
                  className="btn-primary"
                  style={{ background: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)', color: '#fff', padding: '0.8rem 2.5rem' }}
                  id="btn-calculate"
                >
                  Calculate Footprint
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && result && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              {/* Graphic breakdown */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.2fr',
                gap: '2.5rem',
                alignItems: 'center'
              }}>
                {/* Visual Chart */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  {renderDonutChart()}
                  <div style={{
                    marginTop: '1.2rem',
                    textAlign: 'center',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '8px',
                    background: 'rgba(0,0,0,0.02)',
                    border: '1px solid rgba(0,0,0,0.06)',
                  }}>
                    <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', marginRight: '0.5rem' }}>ECOLOGICAL STATUS:</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: feedback.color }}>{feedback.rating}</span>
                  </div>
                </div>

                {/* Categorized Stats Legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <h3 style={{ fontSize: '1.4rem', color: 'hsl(var(--text-primary))', borderBottom: '1px solid hsl(var(--card-border))', paddingBottom: '0.5rem' }}>Breakdown By Category</h3>
                  
                  {/* Energy (Blue) */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#38bdf8' }} />
                      <span style={{ fontSize: '0.95rem', color: 'hsl(var(--text-secondary))' }}>Home Energy</span>
                    </div>
                    <span style={{ fontWeight: 700, color: 'hsl(var(--text-primary))' }}>{result.energy.toFixed(2)} t CO₂e</span>
                  </div>

                  {/* Transport (Gold) */}
                  <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                      <span style={{ fontSize: '0.95rem', color: 'hsl(var(--text-secondary))' }}>Transportation</span>
                    </div>
                    <span style={{ fontWeight: 700, color: 'hsl(var(--text-primary))' }}>{result.transport.toFixed(2)} t CO₂e</span>
                  </div>

                  {/* Lifestyle (Green) */}
                  <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                      <span style={{ fontSize: '0.95rem', color: 'hsl(var(--text-secondary))' }}>Diet & Lifestyle</span>
                    </div>
                    <span style={{ fontWeight: 700, color: 'hsl(var(--text-primary))' }}>{result.lifestyle.toFixed(2)} t CO₂e</span>
                  </div>
                </div>
              </div>

              {/* Comparison & Benchmarks Card */}
              <div className="glass-panel" style={{
                padding: '1.5rem',
                background: 'rgba(0, 0, 0, 0.01)',
                borderColor: 'hsl(var(--card-border))',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginTop: '0.5rem'
              }}>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                  <Info style={{ color: '#38bdf8', flexShrink: 0, marginTop: '2px' }} size={18} />
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'hsl(var(--text-primary))', marginBottom: '0.3rem' }}>How do you compare?</h4>
                    <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', lineHeight: 1.5 }}>
                      Your total emissions of <strong style={{ color: 'hsl(var(--text-primary))' }}>{result.overall.toFixed(1)} tonnes per year</strong> are {result.overall > 4.5 ? 'above' : 'below'} the global carbon average of <strong>4.5 tonnes</strong>. To limit global warming to 1.5°C, the UN guidelines target reducing personal impact to under <strong>2.0 tonnes</strong> per year by 2030.
                    </p>
                  </div>
                </div>

                {/* Progress bar comparison */}
                <div style={{ marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'hsl(var(--text-muted))', marginBottom: '0.3rem' }}>
                    <span>Target: &lt;2.0t</span>
                    <span>Global Avg: 4.5t</span>
                    <span>You: {result.overall.toFixed(1)}t</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
                    {/* Sustainable Target Marker (Green) */}
                    <div style={{ position: 'absolute', left: 0, width: '20%', height: '100%', background: '#22c55e' }} />
                    {/* Global average marker */}
                    <div style={{ position: 'absolute', left: '20%', width: '25%', height: '100%', background: '#64748b', opacity: 0.15 }} />
                    {/* User bar marker */}
                    <div style={{
                      position: 'absolute',
                      left: '0',
                      width: `${Math.min(100, (result.overall / 15) * 100)}%`,
                      height: '100%',
                      background: 'rgba(239, 68, 68, 0.25)',
                      borderRight: '2px solid #dc2626'
                    }} />
                  </div>
                </div>
              </div>

              {/* Bottom CTAs */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', gap: '1rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={handleReset}
                  className="btn-outline"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <RefreshCw size={16} />
                  Recalculate
                </button>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    color: '#16a34a',
                    background: 'rgba(34, 197, 94, 0.08)',
                    border: '1px solid rgba(34, 197, 94, 0.25)',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px'
                  }}>
                    <Shield size={16} />
                    <span>Baseline Score Saved</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

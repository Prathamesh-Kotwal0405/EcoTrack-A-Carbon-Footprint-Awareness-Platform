import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TerrainViewer from './components/TerrainViewer';
import CarbonCalculator from './components/CarbonCalculator';
import Dashboard from './components/Dashboard';
import InsightHub from './components/InsightHub';
import { DAILY_CHALLENGES } from './utils/media';

export default function App() {
  const [activeView, setActiveView] = useState('home'); // home (terrains), calculator, dashboard, insights
  const [completedActions, setCompletedActions] = useState([]);
  const [carbonScore, setCarbonScore] = useState(null);

  // Terrain states - managed globally so changes persist between view switches
  const [terrainValues, setTerrainValues] = useState({
    canopy: 20,       // deforestation rate % (0-100)
    deep: true,       // clean oceans initiative (true/false)
    grid: false,      // renewable power grid (true/false)
    cryosphere: 12    // global temperature rise (0-40, representing 0.0 - 4.0 °C)
  });

  // Load baseline score and completed actions from localStorage on mount
  useEffect(() => {
    const savedBaseline = localStorage.getItem('ecotrack_baseline');
    if (savedBaseline) {
      try {
        setCarbonScore(JSON.parse(savedBaseline));
      } catch (e) {
        console.error("Error loading baseline from storage", e);
      }
    }

    const savedActions = localStorage.getItem('ecotrack_actions');
    if (savedActions) {
      try {
        setCompletedActions(JSON.parse(savedActions));
      } catch (e) {
        console.error("Error loading actions from storage", e);
      }
    }
  }, []);

  // Save completed actions to localStorage when they change
  useEffect(() => {
    localStorage.setItem('ecotrack_actions', JSON.stringify(completedActions));
  }, [completedActions]);

  // Handle calculator completion
  const handleCalculatorComplete = (newScore) => {
    setCarbonScore(newScore);
    localStorage.setItem('ecotrack_baseline', JSON.stringify(newScore));
  };

  // Callback to allow other components (like Dashboard) to change terrain values
  const handleHealTerrain = (terrainId, valueOrFn) => {
    setTerrainValues(prev => {
      const oldValue = prev[terrainId];
      const newValue = typeof valueOrFn === 'function' ? valueOrFn(oldValue) : valueOrFn;
      return {
        ...prev,
        [terrainId]: newValue
      };
    });
  };

  // Calculate daily carbon savings sum in kg CO2
  const calculateDailySavings = () => {
    return completedActions.reduce((total, actionId) => {
      const challenge = DAILY_CHALLENGES.find(c => c.id === actionId);
      return total + (challenge ? challenge.carbonSaved : 0);
    }, 0);
  };

  const carbonSavings = calculateDailySavings();
  const carbonFootprint = carbonScore ? carbonScore.overall : null;

  return (
    <div className="app-container" style={{ 
      height: activeView === 'home' ? '100vh' : 'auto', 
      overflow: activeView === 'home' ? 'hidden' : 'visible' 
    }}>
      {/* Sticky Global Navbar */}
      <Navbar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        carbonSavings={carbonSavings}
        carbonFootprint={carbonFootprint}
      />

      {/* Main View Router */}
      <main style={{ 
        height: activeView === 'home' ? 'calc(100vh - 70px)' : 'auto', 
        marginTop: '70px',
        width: '100%',
        overflow: activeView === 'home' ? 'hidden' : 'visible'
      }}>
        {activeView === 'home' && (
          <TerrainViewer 
            terrainValues={terrainValues}
            setTerrainValues={setTerrainValues}
            onGoToCalculator={() => setActiveView('calculator')}
          />
        )}

        {activeView === 'calculator' && (
          <CarbonCalculator 
            onCalculatorComplete={handleCalculatorComplete}
            savedScore={carbonScore}
          />
        )}

        {activeView === 'dashboard' && (
          <Dashboard 
            completedActions={completedActions}
            setCompletedActions={setCompletedActions}
            carbonFootprint={carbonFootprint}
            carbonSavings={carbonSavings}
            onGoToCalculator={() => setActiveView('calculator')}
            onHealTerrain={handleHealTerrain}
          />
        )}

        {activeView === 'insights' && (
          <InsightHub 
            onGoToTracker={() => setActiveView('dashboard')}
          />
        )}
      </main>
    </div>
  );
}

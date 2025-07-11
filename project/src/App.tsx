import React, { useState, useCallback } from 'react';
import { Atom, Zap, Activity, Settings } from 'lucide-react';
import { useQuantumSimulation } from './hooks/useQuantumSimulation';
import { WaveFunctionVisualizer } from './components/WaveFunctionVisualizer';
import { QuantumStateDisplay } from './components/QuantumStateDisplay';
import { QuantumGatePanel } from './components/QuantumGatePanel';
import { TunnelingSimulation } from './components/TunnelingSimulation';
import { SimulationControls } from './components/SimulationControls';
import { QuantumGate, SimulationParams } from './types/quantum';

function App() {
  const [activeTab, setActiveTab] = useState<'states' | 'tunneling' | 'superposition'>('states');
  const [tunnelingParams, setTunnelingParams] = useState<SimulationParams>({
    width: 600,
    height: 300,
    barrierHeight: 5.0,
    barrierWidth: 50,
    energy: 3.0,
    mass: 1.0
  });

  const {
    quantumState,
    waveFunction,
    isRunning,
    time,
    setIsRunning,
    updateWaveFunction,
    applyGate,
    measureState,
    resetState
  } = useQuantumSimulation();

  const handleApplyGate = useCallback((gate: QuantumGate) => {
    applyGate(gate.matrix);
  }, [applyGate]);

  const handleMeasure = useCallback(() => {
    const result = measureState();
    // You could add a notification system here
    console.log(`Measured state: |${result}⟩`);
  }, [measureState]);

  const handleParamChange = useCallback((param: string, value: number) => {
    setTunnelingParams(prev => ({
      ...prev,
      [param]: value
    }));
  }, []);

  const toggleSimulation = useCallback(() => {
    setIsRunning(!isRunning);
  }, [isRunning, setIsRunning]);

  React.useEffect(() => {
    updateWaveFunction(400, 200, tunnelingParams.energy);
  }, [updateWaveFunction, tunnelingParams.energy, time]);

  const tabs = [
    { id: 'states', label: 'Quantum States', icon: Atom },
    { id: 'tunneling', label: 'Tunneling', icon: Zap },
    { id: 'superposition', label: 'Superposition', icon: Activity }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg">
                <Atom className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Quantum Physics Simulation</h1>
                <p className="text-slate-400 text-sm">Interactive quantum mechanics visualization</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">Runtime</div>
              <div className="text-white font-mono">{time.toFixed(2)}s</div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-400'
                      : 'border-transparent text-slate-400 hover:text-white hover:border-slate-600'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'states' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Wave Function</h2>
                <WaveFunctionVisualizer
                  waveFunction={waveFunction}
                  width={500}
                  height={200}
                  showProbability={false}
                />
              </div>
              
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Probability Distribution</h2>
                <WaveFunctionVisualizer
                  waveFunction={waveFunction}
                  width={500}
                  height={200}
                  showProbability={true}
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <QuantumStateDisplay quantumState={quantumState} />
              <QuantumGatePanel
                onApplyGate={handleApplyGate}
                onMeasure={handleMeasure}
                onReset={resetState}
              />
            </div>
          </div>
        )}

        {activeTab === 'tunneling' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <TunnelingSimulation
                params={tunnelingParams}
                isRunning={isRunning}
                time={time}
              />
            </div>
            
            <div>
              <SimulationControls
                isRunning={isRunning}
                onToggleRunning={toggleSimulation}
                onReset={() => {
                  resetState();
                  setTunnelingParams(prev => ({ ...prev }));
                }}
                params={tunnelingParams}
                onParamChange={handleParamChange}
              />
            </div>
          </div>
        )}

        {activeTab === 'superposition' && (
          <div className="text-center py-16">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 max-w-2xl mx-auto">
              <Activity className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-4">Superposition States</h2>
              <p className="text-slate-300 mb-6">
                Explore quantum superposition and entanglement phenomena. This section demonstrates
                how quantum particles can exist in multiple states simultaneously until measured.
              </p>
              <div className="text-sm text-slate-400">
                Advanced superposition visualization coming soon...
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-800/50 backdrop-blur-sm border-t border-slate-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-slate-400 text-sm">
            <p>Quantum Physics Simulation • Built with React, TypeScript & Advanced Mathematics</p>
            <p className="mt-1">Explore the fascinating world of quantum mechanics through interactive visualizations</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
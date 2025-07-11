import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface SimulationControlsProps {
  isRunning: boolean;
  onToggleRunning: () => void;
  onReset: () => void;
  params: {
    energy: number;
    barrierHeight: number;
    barrierWidth: number;
    mass: number;
  };
  onParamChange: (param: string, value: number) => void;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  isRunning,
  onToggleRunning,
  onReset,
  params,
  onParamChange
}) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Simulation Controls</h3>
        <div className="flex gap-2">
          <button
            onClick={onToggleRunning}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors duration-200"
          >
            {isRunning ? <Pause size={18} /> : <Play size={18} />}
            {isRunning ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-600 transition-colors duration-200"
          >
            <RotateCcw size={18} />
            Reset
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Particle Energy: {params.energy.toFixed(1)} eV
          </label>
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={params.energy}
            onChange={(e) => onParamChange('energy', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Barrier Height: {params.barrierHeight.toFixed(1)} eV
          </label>
          <input
            type="range"
            min="1"
            max="15"
            step="0.1"
            value={params.barrierHeight}
            onChange={(e) => onParamChange('barrierHeight', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Barrier Width: {params.barrierWidth.toFixed(0)} nm
          </label>
          <input
            type="range"
            min="20"
            max="100"
            step="5"
            value={params.barrierWidth}
            onChange={(e) => onParamChange('barrierWidth', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Particle Mass: {params.mass.toFixed(2)} m₀
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.05"
            value={params.mass}
            onChange={(e) => onParamChange('mass', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
    </div>
  );
};
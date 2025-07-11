import React from 'react';
import { quantumGates } from '../utils/quantumGates.js';

export const QuantumGatePanel = ({
  onApplyGate,
  onMeasure,
  onReset
}) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Quantum Gates</h3>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        {quantumGates.map((gate, index) => (
          <button
            key={index}
            onClick={() => onApplyGate(gate)}
            className="p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{
              borderColor: gate.color,
              backgroundColor: `${gate.color}20`,
              color: gate.color
            }}
          >
            <div className="font-semibold text-sm">{gate.name}</div>
            <div className="text-xs mt-1 opacity-75">{gate.description}</div>
          </button>
        ))}
      </div>
      
      <div className="space-y-3">
        <button
          onClick={onMeasure}
          className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105"
        >
          Measure State
        </button>
        
        <button
          onClick={onReset}
          className="w-full py-3 px-4 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-600 transition-colors duration-200"
        >
          Reset to |0⟩
        </button>
      </div>
    </div>
  );
};
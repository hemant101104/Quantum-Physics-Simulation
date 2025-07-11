import React from 'react';
import { Complex } from '../utils/complex.js';

export const QuantumStateDisplay = ({ quantumState }) => {
  const probabilities = quantumState.amplitudes.map(amp => Complex.modulus(amp) ** 2);
  
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Quantum State</h3>
      
      <div className="space-y-4">
        {quantumState.amplitudes.map((amplitude, index) => {
          const probability = probabilities[index];
          const phase = Complex.phase(amplitude);
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">|{index}⟩</span>
                <span className="text-sm text-slate-400">
                  {(probability * 100).toFixed(1)}%
                </span>
              </div>
              
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${probability * 100}%` }}
                />
              </div>
              
              <div className="text-xs text-slate-400 grid grid-cols-2 gap-2">
                <div>
                  Amplitude: {amplitude.real.toFixed(3)} + {amplitude.imag.toFixed(3)}i
                </div>
                <div>
                  Phase: {(phase * 180 / Math.PI).toFixed(1)}°
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
        <div className="text-sm text-slate-300">
          <div>Superposition: {probabilities.filter(p => p > 0.01).length > 1 ? 'Yes' : 'No'}</div>
          <div>Normalization: {probabilities.reduce((sum, p) => sum + p, 0).toFixed(3)}</div>
        </div>
      </div>
    </div>
  );
};
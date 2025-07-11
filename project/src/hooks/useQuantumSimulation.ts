import { useState, useEffect, useCallback } from 'react';
import { ComplexNumber, QuantumState, WaveFunction } from '../types/quantum';
import { Complex } from '../utils/complex';

export const useQuantumSimulation = () => {
  const [quantumState, setQuantumState] = useState<QuantumState>({
    amplitudes: [Complex.create(1, 0), Complex.create(0, 0)],
    numQubits: 1
  });

  const [waveFunction, setWaveFunction] = useState<WaveFunction>({
    position: [],
    amplitude: [],
    probability: []
  });

  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  const updateWaveFunction = useCallback((width: number, height: number, energy: number) => {
    const positions = Array.from({ length: 200 }, (_, i) => (i / 199) * width);
    const amplitudes = positions.map(x => {
      const k = Math.sqrt(2 * 0.5 * energy) / 1; // Simplified for visualization
      const phase = k * x - energy * time;
      const envelope = Math.exp(-Math.pow((x - width/2) / (width/8), 2));
      return Complex.create(
        envelope * Math.cos(phase),
        envelope * Math.sin(phase)
      );
    });
    
    const probabilities = amplitudes.map(amp => Complex.modulus(amp) ** 2);
    
    setWaveFunction({
      position: positions,
      amplitude: amplitudes,
      probability: probabilities
    });
  }, [time]);

  const applyGate = useCallback((gateMatrix: ComplexNumber[][]) => {
    const newAmplitudes = gateMatrix.map(row =>
      row.reduce((sum, val, idx) =>
        Complex.add(sum, Complex.multiply(val, quantumState.amplitudes[idx])),
        Complex.create(0, 0)
      )
    );
    
    setQuantumState(prev => ({
      ...prev,
      amplitudes: Complex.normalize(newAmplitudes)
    }));
  }, [quantumState.amplitudes]);

  const measureState = useCallback(() => {
    const probabilities = quantumState.amplitudes.map(amp => Complex.modulus(amp) ** 2);
    const random = Math.random();
    let cumulativeProb = 0;
    
    for (let i = 0; i < probabilities.length; i++) {
      cumulativeProb += probabilities[i];
      if (random <= cumulativeProb) {
        const newAmplitudes = quantumState.amplitudes.map((_, idx) =>
          Complex.create(idx === i ? 1 : 0, 0)
        );
        setQuantumState(prev => ({
          ...prev,
          amplitudes: newAmplitudes
        }));
        return i;
      }
    }
    return 0;
  }, [quantumState.amplitudes]);

  const resetState = useCallback(() => {
    setQuantumState({
      amplitudes: [Complex.create(1, 0), Complex.create(0, 0)],
      numQubits: 1
    });
    setTime(0);
  }, []);

  useEffect(() => {
    let animationFrame: number;
    
    if (isRunning) {
      const animate = () => {
        setTime(prev => prev + 0.016);
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isRunning]);

  return {
    quantumState,
    waveFunction,
    isRunning,
    time,
    setIsRunning,
    updateWaveFunction,
    applyGate,
    measureState,
    resetState
  };
};
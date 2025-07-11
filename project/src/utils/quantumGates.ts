import { QuantumGate, ComplexNumber } from '../types/quantum';
import { Complex } from './complex';

export const quantumGates: QuantumGate[] = [
  {
    name: 'X (Pauli-X)',
    matrix: [
      [Complex.create(0, 0), Complex.create(1, 0)],
      [Complex.create(1, 0), Complex.create(0, 0)]
    ],
    description: 'Bit flip gate - flips |0⟩ to |1⟩ and vice versa',
    color: '#ef4444'
  },
  {
    name: 'Y (Pauli-Y)',
    matrix: [
      [Complex.create(0, 0), Complex.create(0, -1)],
      [Complex.create(0, 1), Complex.create(0, 0)]
    ],
    description: 'Y rotation gate - combines bit flip and phase flip',
    color: '#f59e0b'
  },
  {
    name: 'Z (Pauli-Z)',
    matrix: [
      [Complex.create(1, 0), Complex.create(0, 0)],
      [Complex.create(0, 0), Complex.create(-1, 0)]
    ],
    description: 'Phase flip gate - flips the phase of |1⟩',
    color: '#3b82f6'
  },
  {
    name: 'H (Hadamard)',
    matrix: [
      [Complex.create(1/Math.sqrt(2), 0), Complex.create(1/Math.sqrt(2), 0)],
      [Complex.create(1/Math.sqrt(2), 0), Complex.create(-1/Math.sqrt(2), 0)]
    ],
    description: 'Creates superposition - puts qubit in equal superposition',
    color: '#8b5cf6'
  },
  {
    name: 'S (Phase)',
    matrix: [
      [Complex.create(1, 0), Complex.create(0, 0)],
      [Complex.create(0, 0), Complex.create(0, 1)]
    ],
    description: 'Phase gate - adds π/2 phase to |1⟩ state',
    color: '#10b981'
  },
  {
    name: 'T (π/8)',
    matrix: [
      [Complex.create(1, 0), Complex.create(0, 0)],
      [Complex.create(0, 0), Complex.exp(Math.PI/4)]
    ],
    description: 'T gate - adds π/4 phase to |1⟩ state',
    color: '#f97316'
  }
];
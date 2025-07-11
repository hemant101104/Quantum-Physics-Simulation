import { ComplexNumber } from '../types/quantum';

export class Complex {
  static create(real: number, imag: number = 0): ComplexNumber {
    return { real, imag };
  }

  static add(a: ComplexNumber, b: ComplexNumber): ComplexNumber {
    return { real: a.real + b.real, imag: a.imag + b.imag };
  }

  static multiply(a: ComplexNumber, b: ComplexNumber): ComplexNumber {
    return {
      real: a.real * b.real - a.imag * b.imag,
      imag: a.real * b.imag + a.imag * b.real
    };
  }

  static conjugate(z: ComplexNumber): ComplexNumber {
    return { real: z.real, imag: -z.imag };
  }

  static modulus(z: ComplexNumber): number {
    return Math.sqrt(z.real * z.real + z.imag * z.imag);
  }

  static phase(z: ComplexNumber): number {
    return Math.atan2(z.imag, z.real);
  }

  static exp(angle: number): ComplexNumber {
    return { real: Math.cos(angle), imag: Math.sin(angle) };
  }

  static normalize(amplitudes: ComplexNumber[]): ComplexNumber[] {
    const norm = Math.sqrt(amplitudes.reduce((sum, amp) => 
      sum + Complex.modulus(amp) ** 2, 0));
    return amplitudes.map(amp => ({
      real: amp.real / norm,
      imag: amp.imag / norm
    }));
  }
}
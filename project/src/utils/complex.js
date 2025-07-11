export class Complex {
  static create(real, imag = 0) {
    return { real, imag };
  }

  static add(a, b) {
    return { real: a.real + b.real, imag: a.imag + b.imag };
  }

  static multiply(a, b) {
    return {
      real: a.real * b.real - a.imag * b.imag,
      imag: a.real * b.imag + a.imag * b.real
    };
  }

  static conjugate(z) {
    return { real: z.real, imag: -z.imag };
  }

  static modulus(z) {
    return Math.sqrt(z.real * z.real + z.imag * z.imag);
  }

  static phase(z) {
    return Math.atan2(z.imag, z.real);
  }

  static exp(angle) {
    return { real: Math.cos(angle), imag: Math.sin(angle) };
  }

  static normalize(amplitudes) {
    const norm = Math.sqrt(amplitudes.reduce((sum, amp) => 
      sum + Complex.modulus(amp) ** 2, 0));
    return amplitudes.map(amp => ({
      real: amp.real / norm,
      imag: amp.imag / norm
    }));
  }
}
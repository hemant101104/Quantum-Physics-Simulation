import { ComplexNumber } from '../types/quantum';
import { Complex } from './complex';

export class Matrix {
  static multiply(A: ComplexNumber[][], B: ComplexNumber[][]): ComplexNumber[][] {
    const result: ComplexNumber[][] = [];
    for (let i = 0; i < A.length; i++) {
      result[i] = [];
      for (let j = 0; j < B[0].length; j++) {
        result[i][j] = Complex.create(0, 0);
        for (let k = 0; k < B.length; k++) {
          result[i][j] = Complex.add(result[i][j], Complex.multiply(A[i][k], B[k][j]));
        }
      }
    }
    return result;
  }

  static multiplyVector(matrix: ComplexNumber[][], vector: ComplexNumber[]): ComplexNumber[] {
    return matrix.map(row => 
      row.reduce((sum, val, idx) => 
        Complex.add(sum, Complex.multiply(val, vector[idx])), 
        Complex.create(0, 0)
      )
    );
  }

  static tensor(A: ComplexNumber[][], B: ComplexNumber[][]): ComplexNumber[][] {
    const result: ComplexNumber[][] = [];
    for (let i = 0; i < A.length; i++) {
      for (let k = 0; k < B.length; k++) {
        const row: ComplexNumber[] = [];
        for (let j = 0; j < A[0].length; j++) {
          for (let l = 0; l < B[0].length; l++) {
            row.push(Complex.multiply(A[i][j], B[k][l]));
          }
        }
        result.push(row);
      }
    }
    return result;
  }

  static identity(size: number): ComplexNumber[][] {
    return Array(size).fill(null).map((_, i) =>
      Array(size).fill(null).map((_, j) =>
        Complex.create(i === j ? 1 : 0, 0)
      )
    );
  }
}
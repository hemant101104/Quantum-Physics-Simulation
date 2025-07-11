import React, { useRef, useEffect } from 'react';
import { WaveFunction } from '../types/quantum';
import { Complex } from '../utils/complex';

interface WaveFunctionVisualizerProps {
  waveFunction: WaveFunction;
  width: number;
  height: number;
  showProbability?: boolean;
}

export const WaveFunctionVisualizer: React.FC<WaveFunctionVisualizerProps> = ({
  waveFunction,
  width,
  height,
  showProbability = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set up gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(15, 23, 42, 0.9)');
    gradient.addColorStop(1, 'rgba(30, 41, 59, 0.9)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    if (waveFunction.position.length === 0) return;

    const scaleX = width / (waveFunction.position[waveFunction.position.length - 1] || 1);
    const centerY = height / 2;
    const scaleY = height / 4;

    // Draw wave function
    ctx.beginPath();
    ctx.strokeStyle = showProbability ? '#06b6d4' : '#8b5cf6';
    ctx.lineWidth = 2;
    ctx.shadowColor = showProbability ? '#06b6d4' : '#8b5cf6';
    ctx.shadowBlur = 10;

    waveFunction.position.forEach((pos, i) => {
      const x = pos * scaleX;
      const y = showProbability 
        ? centerY - (waveFunction.probability[i] || 0) * scaleY
        : centerY - (waveFunction.amplitude[i]?.real || 0) * scaleY;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw zero line
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
    ctx.lineWidth = 1;
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // Draw axes labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Position', width / 2, height - 10);
    
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(showProbability ? 'Probability' : 'Amplitude', 0, 0);
    ctx.restore();

  }, [waveFunction, width, height, showProbability]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-slate-700 rounded-lg bg-slate-800/50"
      />
    </div>
  );
};
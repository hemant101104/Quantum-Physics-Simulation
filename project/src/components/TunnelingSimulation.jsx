import React, { useRef, useEffect, useState } from 'react';

export const TunnelingSimulation = ({
  params,
  isRunning,
  time
}) => {
  const canvasRef = useRef(null);
  const [transmissionProb, setTransmissionProb] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, params.width, params.height);
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, params.height);
    gradient.addColorStop(0, 'rgba(15, 23, 42, 0.9)');
    gradient.addColorStop(1, 'rgba(30, 41, 59, 0.9)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, params.width, params.height);

    // Draw potential barrier
    const barrierStart = params.width * 0.4;
    const barrierEnd = barrierStart + params.barrierWidth;
    const barrierTop = params.height * 0.3;
    
    ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
    ctx.fillRect(barrierStart, barrierTop, params.barrierWidth, params.height - barrierTop);
    
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.strokeRect(barrierStart, barrierTop, params.barrierWidth, params.height - barrierTop);

    // Draw wave packet
    const waveCenter = (params.width * 0.2) + (time * 50) % (params.width * 0.8);
    const waveLength = 20;
    const amplitude = 30;
    
    // Calculate transmission probability (simplified)
    const k = Math.sqrt(2 * params.mass * params.energy);
    const kappa = Math.sqrt(2 * params.mass * (params.barrierHeight - params.energy));
    const transmissionCoeff = 1 / (1 + Math.pow(params.barrierHeight / (4 * params.energy * (params.barrierHeight - params.energy)), 2) * Math.sinh(kappa * params.barrierWidth) ** 2);
    setTransmissionProb(transmissionCoeff);

    // Draw incident wave
    ctx.beginPath();
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 10;
    
    for (let x = 0; x < barrierStart; x += 2) {
      const phase = (x - waveCenter) / waveLength;
      const y = params.height * 0.7 + amplitude * Math.sin(phase) * Math.exp(-Math.pow((x - waveCenter) / 50, 2));
      
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw transmitted wave (if energy allows)
    if (params.energy > params.barrierHeight * 0.5) {
      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 8;
      
      const transmittedAmplitude = amplitude * Math.sqrt(transmissionCoeff);
      
      for (let x = barrierEnd; x < params.width; x += 2) {
        const phase = (x - waveCenter - params.barrierWidth) / waveLength;
        const y = params.height * 0.7 + transmittedAmplitude * Math.sin(phase) * Math.exp(-Math.pow((x - waveCenter - params.barrierWidth) / 50, 2));
        
        if (x === barrierEnd) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }

    ctx.shadowBlur = 0;

    // Draw energy level
    const energyY = params.height * (1 - params.energy / params.barrierHeight);
    ctx.beginPath();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.moveTo(0, energyY);
    ctx.lineTo(params.width, energyY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText('Incident Wave', 20, 30);
    ctx.fillText('Barrier', barrierStart + 10, barrierTop - 10);
    ctx.fillText('Transmitted Wave', barrierEnd + 10, 30);
    ctx.fillText(`Energy Level (E = ${params.energy.toFixed(1)})`, 20, energyY - 10);

  }, [params, time]);

  return (
    <div className="space-y-4">
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-2">Quantum Tunneling</h3>
        <p className="text-slate-300 text-sm">
          Particles can tunnel through energy barriers even when classically forbidden
        </p>
      </div>
      
      <canvas
        ref={canvasRef}
        width={params.width}
        height={params.height}
        className="border border-slate-700 rounded-lg bg-slate-800/50"
      />
      
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-slate-300">
            <div>Transmission Probability:</div>
            <div className="text-xl font-bold text-green-400">
              {(transmissionProb * 100).toFixed(2)}%
            </div>
          </div>
          <div className="text-slate-300">
            <div>Barrier Height:</div>
            <div className="text-xl font-bold text-red-400">
              {params.barrierHeight.toFixed(1)} eV
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
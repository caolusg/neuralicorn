import React, { useEffect, useRef } from 'react';

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    // Configuration for neural network simulation
    // Using a slightly higher node count for better density
    const nodeCount = Math.min(80, Math.floor((width * height) / 15000)); 
    const connectionDistance = Math.min(width, height) * 0.25;
    
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      activation: number; // 0 to 1, represents firing intensity
      refractory: number; // Cooldown after firing
    }

    interface Pulse {
      sourceIdx: number;
      targetIdx: number;
      progress: number; // 0 to 1
      speed: number;
    }

    const nodes: Node[] = [];
    let pulses: Pulse[] = [];

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2, // Slow drift
        vy: (Math.random() - 0.5) * 0.2,
        activation: 0,
        refractory: 0
      });
    }

    const draw = () => {
      // Clear with base color (fading trails could be nice, but let's keep it clean for now)
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      // Pre-calculate connections to avoid N^2 in loop
      // But N is small (~80), so N^2 is fine.
      const connections: { a: number; b: number; dist: number }[] = [];
      const neighbors: number[][] = Array(nodeCount).fill(null).map(() => []);

      // 1. Update Nodes & Activation
      nodes.forEach((node) => {
        // Physics update
        node.x += node.vx;
        node.y += node.vy;

        // Bounce
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Activation decay
        if (node.activation > 0) {
          node.activation *= 0.92; // Fast decay
          if (node.activation < 0.01) node.activation = 0;
        }

        // Refractory period recovery
        if (node.refractory > 0) {
          node.refractory -= 1;
        }

        // Spontaneous firing (random brain activity)
        if (node.refractory <= 0 && Math.random() < 0.002) {
          node.activation = 1;
          node.refractory = 50; // frames cooldown
        }
      });

      // 2. Identify Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            connections.push({ a: i, b: j, dist });
            neighbors[i].push(j);
            neighbors[j].push(i);
          }
        }
      }

      // 3. Signal Propagation (Spawning Pulses)
      nodes.forEach((node, idx) => {
        // If node is highly active and just fired (implied by high activation), trigger neighbors
        // To prevent spam, we only trigger if activation is high and we haven't flooded.
        // Simple logic: if activation > 0.8 and random chance, send pulse to random neighbor
        if (node.activation > 0.8 && neighbors[idx].length > 0) {
           // Limit output connections to simulate sparsity
           const numFires = Math.floor(Math.random() * 2) + 1; 
           for(let k=0; k<numFires; k++) {
             if (Math.random() < 0.1) { // 10% chance per frame while active
               const targetIdx = neighbors[idx][Math.floor(Math.random() * neighbors[idx].length)];
               pulses.push({
                 sourceIdx: idx,
                 targetIdx: targetIdx,
                 progress: 0,
                 speed: 0.02 + Math.random() * 0.02
               });
             }
           }
        }
      });

      // 4. Draw Connections
      ctx.lineWidth = 1;
      connections.forEach(conn => {
        const nA = nodes[conn.a];
        const nB = nodes[conn.b];
        
        // Base opacity from distance
        let opacity = (1 - conn.dist / connectionDistance) * 0.1;
        
        // Boost opacity if connected nodes are active
        const activitySum = nA.activation + nB.activation;
        if (activitySum > 0) {
          opacity += activitySum * 0.2;
          ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(opacity, 0.8)})`;
          ctx.lineWidth = 1 + activitySum; // Thicker lines for active connections
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 1;
        }

        ctx.beginPath();
        ctx.moveTo(nA.x, nA.y);
        ctx.lineTo(nB.x, nB.y);
        ctx.stroke();
      });

      // 5. Update & Draw Pulses
      const survivedPulses: Pulse[] = [];
      pulses.forEach(p => {
        const nA = nodes[p.sourceIdx];
        const nB = nodes[p.targetIdx];
        
        // Validate connection still exists (approximate by distance)
        const dx = nA.x - nB.x;
        const dy = nA.y - nB.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > connectionDistance) return; // Drop pulse if connection broke

        p.progress += p.speed;
        
        if (p.progress >= 1) {
          // Pulse arrived! Trigger target node
          if (nB.refractory <= 0) {
             nB.activation = 1;
             nB.refractory = 40;
          }
        } else {
          survivedPulses.push(p);
          
          // Draw Pulse
          const currX = nA.x + (nB.x - nA.x) * p.progress;
          const currY = nA.y + (nB.y - nA.y) * p.progress;

          // Pulse size grows with speed/intensity
          const size = 1.5;
          
          ctx.fillStyle = `rgba(255, 255, 255, ${0.8})`;
          ctx.beginPath();
          ctx.arc(currX, currY, size, 0, Math.PI * 2);
          ctx.fill();

          // Pulse Glow
          ctx.shadowBlur = 6;
          ctx.shadowColor = "rgba(255, 255, 255, 1)";
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
      pulses = survivedPulses;

      // 6. Draw Nodes (Somas)
      nodes.forEach(node => {
        const baseSize = 1.5;
        const size = baseSize + node.activation * 3; // Expands when firing
        const alpha = 0.15 + node.activation * 0.85; // Bright white when firing

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        
        if (node.activation > 0.1) {
          ctx.shadowBlur = 15 * node.activation;
          ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: '#050505' }}
    />
  );
};

export default NeuralBackground;
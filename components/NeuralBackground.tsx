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
        ctx.lineCap = 'round';
        connections.forEach(conn => {
          const nA = nodes[conn.a];
          const nB = nodes[conn.b];
          
          let opacity = (1 - conn.dist / connectionDistance) * 0.15;
          const activitySum = nA.activation + nB.activation;
          if (activitySum > 0) {
            opacity += activitySum * 0.3;
          }

          // Generate organic path points
          const segments = 8;
          const points: {x: number, y: number}[] = [{x: nA.x, y: nA.y}];
          
          const dx = nB.x - nA.x;
          const dy = nB.y - nA.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const nx = -dy / dist;
          const ny = dx / dist;

          for (let i = 1; i < segments; i++) {
            const t = i / segments;
            const lx = nA.x + dx * t;
            const ly = nA.y + dy * t;
            
            // Organic wobble using multiple sine waves
            const seed = conn.a * 3 + conn.b * 7 + i;
            const wobble = (Math.sin(seed * 0.5) * 0.6 + Math.sin(seed * 1.2) * 0.4) * dist * 0.08;
            
            points.push({
              x: lx + nx * wobble,
              y: ly + ny * wobble
            });
          }
          points.push({x: nB.x, y: nB.y});

          // Draw the main process (tapered)
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          
          for (let i = 1; i < points.length; i++) {
            // Tapering effect: thicker near nodes, thinner in middle
            const t = i / segments;
            const taper = 1.5 - Math.sin(t * Math.PI) * 0.8;
            ctx.lineWidth = taper * (1 + activitySum);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * (1.2 - taper * 0.2)})`;
            
            ctx.lineTo(points[i].x, points[i].y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
          }

          // Add "Dendritic Spines" (small protrusions)
          if (dist > 40) {
            for (let i = 1; i < points.length - 1; i++) {
              const seed = conn.a + conn.b + i;
              if ((seed % 5) === 0) { // Only some segments
                const p = points[i];
                const spineLen = 3 + (seed % 4);
                const angle = (seed % 10) * Math.PI * 0.2;
                ctx.lineWidth = 0.5;
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + Math.cos(angle) * spineLen, p.y + Math.sin(angle) * spineLen);
                ctx.stroke();
              }
            }
          }
        });

        // 5. Update & Draw Pulses
        const survivedPulses: Pulse[] = [];
        pulses.forEach(p => {
          const nA = nodes[p.sourceIdx];
          const nB = nodes[p.targetIdx];
          
          const dx = nB.x - nA.x;
          const dy = nB.y - nA.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > connectionDistance) return;

          p.progress += p.speed;
          
          if (p.progress >= 1) {
            if (nB.refractory <= 0) {
               nB.activation = 1;
               nB.refractory = 40;
            }
          } else {
            survivedPulses.push(p);
            
            // Calculate position on organic path
            const segments = 8;
            
            const nx = -dy / dist;
            const ny = dx / dist;

            // Draw Pulse "Cloud" (a cluster of particles)
            const particleCount = 6;
            for (let i = 0; i < particleCount; i++) {
              // Each particle has a slight offset in progress and lateral position
              const pOffset = (i / particleCount) * 0.03; // Trail offset
              const t = Math.max(0, p.progress - pOffset);
              
              const sIdx = Math.floor(t * segments);
              const sT = (t * segments) % 1;
              
              const getPt = (idx: number) => {
                if (idx <= 0) return {x: nA.x, y: nA.y};
                if (idx >= segments) return {x: nB.x, y: nB.y};
                const tt = idx / segments;
                const lx = nA.x + dx * tt;
                const ly = nA.y + dy * tt;
                const seed = p.sourceIdx * 3 + p.targetIdx * 7 + idx;
                const wobble = (Math.sin(seed * 0.5) * 0.6 + Math.sin(seed * 1.2) * 0.4) * dist * 0.08;
                return { x: lx + nx * wobble, y: ly + ny * wobble };
              };

              const pt1 = getPt(sIdx);
              const pt2 = getPt(sIdx + 1);

              // Base position on path
              let cx = pt1.x + (pt2.x - pt1.x) * sT;
              let cy = pt1.y + (pt2.y - pt1.y) * sT;

              // Add random cloud jitter
              const jitterX = (Math.sin(i * 1.5 + Date.now() * 0.01) * 2);
              const jitterY = (Math.cos(i * 1.5 + Date.now() * 0.01) * 2);
              
              const size = 0.8 + Math.random() * 0.8;
              const alpha = 0.4 + (1 - i / particleCount) * 0.5;

              ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
              ctx.beginPath();
              ctx.arc(cx + jitterX, cy + jitterY, size, 0, Math.PI * 2);
              ctx.fill();

              // Only add glow to the head particle
              if (i === 0) {
                ctx.shadowBlur = 12;
                ctx.shadowColor = "rgba(255, 255, 255, 1)";
                ctx.fill();
                ctx.shadowBlur = 0;
              }
            }
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
          ctx.shadowColor = `rgba(255, 255, 255, 0.9)`;
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
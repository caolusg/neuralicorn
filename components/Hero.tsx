import React, { useEffect, useRef } from 'react';
import { ChevronRight, Activity } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Pulse {
  pathIndex: number; // Index in the connections array
  progress: number; // 0 to 1
  speed: number;
}

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Configuration
    const nodeCount = Math.floor((width * height) / 12000); // Density
    const connectionDistance = 150;
    const nodes: Node[] = [];
    const pulses: Pulse[] = [];
    const connections: { a: number; b: number; dist: number }[] = [];

    // Initialize Nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update Nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      });

      // Find Connections (recalculate periodically or frame-by-frame for dynamic feeling)
      // For performance, we calculate every frame but optimized
      connections.length = 0;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            connections.push({ a: i, b: j, dist });
          }
        }
      }

      // Draw Connections (Synapses)
      ctx.lineWidth = 1;
      connections.forEach(conn => {
        const opacity = 1 - (conn.dist / connectionDistance);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
        ctx.beginPath();
        ctx.moveTo(nodes[conn.a].x, nodes[conn.a].y);
        ctx.lineTo(nodes[conn.b].x, nodes[conn.b].y);
        ctx.stroke();
      });

      // Spawn Pulses (Action Potentials)
      if (Math.random() < 0.05 && connections.length > 0) { // Firing rate
        const randomConnIndex = Math.floor(Math.random() * connections.length);
        pulses.push({
          pathIndex: randomConnIndex,
          progress: 0,
          speed: 0.02 + Math.random() * 0.03
        });
      }

      // Draw & Update Pulses
      ctx.fillStyle = '#fff';
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const conn = connections[p.pathIndex];
        
        // If connection broke due to movement, remove pulse
        if (!conn) {
          pulses.splice(i, 1);
          continue;
        }

        const nodeA = nodes[conn.a];
        const nodeB = nodes[conn.b];

        p.progress += p.speed;

        if (p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const x = nodeA.x + (nodeB.x - nodeA.x) * p.progress;
        const y = nodeA.y + (nodeB.y - nodeA.y) * p.progress;

        // Draw pulse glow
        const size = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Pulse trail
        ctx.shadowBlur = 10;
        ctx.shadowColor = "white";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw Nodes (Neurons)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scrollToProblem = () => {
    document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-neural-black">
      {/* Background Animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-60 pointer-events-none"
      />
      
      {/* Vignette & Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neural-black/20 to-neural-black z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80 z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs text-neutral-400 mb-8 animate-fade-in-up font-mono uppercase tracking-wider">
          <Activity size={12} className="text-white" />
          <span>Neural Interface v2.0 Live</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] mb-8 animate-fade-in-up font-sans">
          {t.hero.titlePrefix} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500 font-mono italic pr-3">
            {t.hero.titleSuffix}
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {t.hero.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <button 
            onClick={scrollToProblem} 
            className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto font-mono tracking-tight"
          >
            {t.hero.learnMore}
          </button>
          <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-colors flex items-center justify-center gap-2 group w-full sm:w-auto font-mono">
            {t.hero.clinical}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
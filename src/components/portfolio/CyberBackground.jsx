import React, { useEffect, useRef } from 'react';

const NODE_COUNT = 80;
const CONNECTION_DIST = 150;
const CURSOR_DIST = 220;

function rand(a, b) {
  return a + Math.random() * (b - a);
}

export default function CyberBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const nodesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initNodes() {
      nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
        x: rand(0, canvas.width),
        y: rand(0, canvas.height),
        vx: rand(-0.25, 0.25),
        vy: rand(-0.25, 0.25),
        r: rand(1.5, 3),
        pulse: rand(0, Math.PI * 2),
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hasMousee = mx > 0 && mx < canvas.width;

      // Update nodes
      for (const n of nodesRef.current) {
        const dx = mx - n.x;
        const dy = my - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (hasMousee && dist < CURSOR_DIST && dist > 0) {
          const force = ((CURSOR_DIST - dist) / CURSOR_DIST) * 0.02;
          n.vx += (dx / dist) * force;
          n.vy += (dy / dist) * force;
        }

        n.vx *= 0.97;
        n.vy *= 0.97;
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.025;

        if (n.x < 0) n.x = canvas.width;
        if (n.x > canvas.width) n.x = 0;
        if (n.y < 0) n.y = canvas.height;
        if (n.y > canvas.height) n.y = 0;
      }

      const all = nodesRef.current;

      // Draw connections between nodes
      for (let i = 0; i < all.length; i++) {
        for (let j = i + 1; j < all.length; j++) {
          const a = all[i], b = all[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0, 160, 220, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw connections from mouse to nearby nodes
      if (hasMousee) {
        for (const n of all) {
          const dx = mx - n.x, dy = my - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_DIST) {
            const alpha = (1 - dist / CURSOR_DIST) * 0.8;
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(n.x, n.y);
            ctx.strokeStyle = `rgba(0, 220, 255, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.shadowColor = '#00dcff';
            ctx.shadowBlur = 6;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }

        // Mouse glow
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 60);
        grad.addColorStop(0, 'rgba(0,200,255,0.15)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(mx, my, 60, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Draw nodes
      for (const n of all) {
        const dx = mx - n.x, dy = my - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const near = hasMousee && dist < CURSOR_DIST;
        const glow = Math.sin(n.pulse) * 0.5 + 0.5;

        // Glow halo
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * (near ? 6 : 3.5));
        g.addColorStop(0, near ? `rgba(0,230,255,${0.5 + glow * 0.3})` : `rgba(0,160,220,${0.3 + glow * 0.2})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (near ? 6 : 3.5), 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? n.r * 1.5 : n.r, 0, Math.PI * 2);
        ctx.fillStyle = near ? `rgba(180,245,255,0.95)` : `rgba(0,200,255,${0.7 + glow * 0.3})`;
        ctx.shadowColor = '#00d8ff';
        ctx.shadowBlur = near ? 14 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    initNodes();
    draw();

    // Track mouse position directly in viewport coords (canvas is fixed)
    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', () => { resize(); initNodes(); });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1, opacity: 0.6 }}
    />
  );
}
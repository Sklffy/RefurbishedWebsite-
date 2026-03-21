import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const skills = [
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'PowerShell', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powershell/powershell-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Bash', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
];

// Hex shape path helper
function hexPath(ctx, x, y, r) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const px = x + r * Math.cos(angle);
    const py = y + r * Math.sin(angle);
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
}

// Fill a dense circular area with all nodes
function getJGPositions(count) {
  const positions = [];
  const centerX = 0.5;
  const centerY = 0.4;
  const radius = 0.25;
  const spacing = (2 * Math.PI) / Math.ceil(Math.sqrt(count));
  
  let idx = 0;
  for (let layer = 0; layer < Math.sqrt(count); layer++) {
    const layerRadius = (layer / Math.sqrt(count)) * radius;
    const nodesInLayer = Math.max(1, Math.round(layer * 4));
    
    for (let i = 0; i < nodesInLayer && idx < count; i++) {
      const angle = (i / nodesInLayer) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * layerRadius;
      const y = centerY + Math.sin(angle) * layerRadius;
      positions.push([x, y]);
      idx++;
    }
  }
  
  return positions;
}

function makeBall(i, canvasW, canvasH, r, positions) {
  const [nx, ny] = positions[i];
  const px = nx * canvasW;
  const py = ny * canvasH;
  return {
    x: px + (Math.random() - 0.5) * 20,
    y: py + (Math.random() - 0.5) * 20,
    targetX: px,
    targetY: py,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r,
    name: skills[i].name,
    imgIdx: i,
    hovered: false,
    pulsePhase: Math.random() * Math.PI * 2,
    glitchTimer: Math.random() * 120,
    glitching: false,
  };
}

export default function SkillsSection() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const ballsRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const imagesRef = useRef([]);
  const animFrameRef = useRef(null);
  const tickRef = useRef(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;

    let loaded = 0;
    const imgs = skills.map((s) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = s.icon;
      img.onload = () => { loaded++; if (loaded === skills.length) init(); };
      img.onerror = () => { loaded++; if (loaded === skills.length) init(); };
      return img;
    });
    imagesRef.current = imgs;

    function resize() {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); init(); });


    function init() {
      const R = Math.min(canvas.width / 10, canvas.height / 5, 44);
      const positions = getJGPositions(skills.length);
      ballsRef.current = skills.map((_, i) => makeBall(i, canvas.width, canvas.height, R, positions));
    }

    function drawHexBall(ball, img, t) {
      const { x, y, r, hovered, pulsePhase, glitching } = ball;
      ctx.save();

      const pulse = Math.sin(t * 0.04 + pulsePhase) * 0.5 + 0.5;

      // Outer glow ring (hex)
      const glowR = r + (hovered ? 10 + pulse * 6 : 4 + pulse * 3);
      ctx.save();
      hexPath(ctx, x, y, glowR);
      ctx.strokeStyle = hovered
        ? `rgba(0,255,180,${0.5 + pulse * 0.4})`
        : `rgba(0,230,255,${0.12 + pulse * 0.1})`;
      ctx.lineWidth = hovered ? 2.5 : 1;
      ctx.shadowColor = hovered ? '#00ffb4' : '#00e5ff';
      ctx.shadowBlur = hovered ? 18 : 8;
      ctx.stroke();
      ctx.restore();

      // Second outer ring (rotating dashes effect)
      if (hovered) {
        ctx.save();
        hexPath(ctx, x, y, r + 16 + pulse * 4);
        ctx.strokeStyle = `rgba(0,255,180,0.2)`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.lineDashOffset = -t * 0.3;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      // Main hex body
      hexPath(ctx, x, y, r);
      // Dark panel fill
      const bg = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
      if (hovered) {
        bg.addColorStop(0, '#0a2a2a');
        bg.addColorStop(0.5, '#0d1f2d');
        bg.addColorStop(1, '#071520');
      } else {
        bg.addColorStop(0, '#0c1824');
        bg.addColorStop(1, '#060e16');
      }
      ctx.fillStyle = bg;
      ctx.shadowColor = hovered ? '#00ffb4' : '#00e5ff';
      ctx.shadowBlur = hovered ? 22 : 6;
      ctx.fill();

      // Hex border
      hexPath(ctx, x, y, r);
      ctx.strokeStyle = hovered
        ? `rgba(0,255,180,${0.7 + pulse * 0.3})`
        : `rgba(0,200,255,${0.2 + pulse * 0.1})`;
      ctx.lineWidth = hovered ? 2 : 1.2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Inner hex accent line
      hexPath(ctx, x, y, r * 0.88);
      ctx.strokeStyle = hovered
        ? `rgba(0,255,180,0.15)`
        : `rgba(0,200,255,0.06)`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Scanline overlay inside hex
      ctx.save();
      hexPath(ctx, x, y, r - 1);
      ctx.clip();
      for (let sy = y - r; sy < y + r; sy += 4) {
        ctx.fillStyle = 'rgba(0,0,0,0.18)';
        ctx.fillRect(x - r, sy, r * 2, 1.5);
      }
      // Glitch horizontal bar
      if (glitching) {
        const gy = y - r + Math.random() * r * 2;
        ctx.fillStyle = `rgba(0,255,180,0.12)`;
        ctx.fillRect(x - r, gy, r * 2, 3 + Math.random() * 6);
      }
      ctx.restore();

      // Icon clipped inside inner hex
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.save();
        hexPath(ctx, x, y, r * 0.58);
        ctx.clip();
        const s = r * 1.05;
        // Glitch offset
        const gx = glitching ? (Math.random() - 0.5) * 4 : 0;
        const gy2 = glitching ? (Math.random() - 0.5) * 3 : 0;
        ctx.drawImage(img, x - s / 2 + gx, y - s / 2 + gy2, s, s);
        ctx.restore();
      }

      // Corner dots on hex vertices
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const vx = x + r * Math.cos(angle);
        const vy = y + r * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(vx, vy, hovered ? 2.5 : 1.5, 0, Math.PI * 2);
        ctx.fillStyle = hovered
          ? `rgba(0,255,180,${0.7 + pulse * 0.3})`
          : `rgba(0,200,255,${0.25 + pulse * 0.15})`;
        ctx.fill();
      }

      // Label
      if (hovered) {
        ctx.font = `bold ${Math.max(10, r * 0.28)}px "JetBrains Mono", monospace`;
        ctx.fillStyle = '#00ffb4';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = '#00ffb4';
        ctx.shadowBlur = 8;
        ctx.fillText(ball.name, x, y + r + r * 0.38);
        ctx.shadowBlur = 0;
      }

      ctx.restore();
    }

    function drawBackground(t) {
      // Subtle grid
      ctx.save();
      ctx.strokeStyle = 'rgba(0,200,255,0.04)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let gx = 0; gx < canvas.width; gx += gridSize) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, canvas.height); ctx.stroke();
      }
      for (let gy = 0; gy < canvas.height; gy += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(canvas.width, gy); ctx.stroke();
      }
      ctx.restore();
    }

    function tick() {
      tickRef.current++;
      const t = tickRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground(t);

      const balls = ballsRef.current;

      // Connection lines (cyber network style)
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const dx = balls[i].x - balls[j].x;
          const dy = balls[i].y - balls[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = canvas.width * 0.28;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (balls[i].hovered || balls[j].hovered ? 0.5 : 0.12);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(balls[i].x, balls[i].y);
            ctx.lineTo(balls[j].x, balls[j].y);
            ctx.strokeStyle = balls[i].hovered || balls[j].hovered
              ? `rgba(0,255,180,${alpha})`
              : `rgba(0,200,255,${alpha})`;
            ctx.lineWidth = balls[i].hovered || balls[j].hovered ? 1.5 : 0.8;
            ctx.stroke();
            // Node dot at midpoint
            if (dist < maxDist * 0.5) {
              const mx = (balls[i].x + balls[j].x) / 2;
              const my = (balls[i].y + balls[j].y) / 2;
              ctx.beginPath();
              ctx.arc(mx, my, 1.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(0,230,255,${alpha * 1.5})`;
              ctx.fill();
            }
            ctx.restore();
          }
        }
      }

      for (const ball of balls) {
        // Glitch timer
        ball.glitchTimer--;
        if (ball.glitchTimer <= 0) {
          ball.glitching = true;
          ball.glitchTimer = 80 + Math.random() * 200;
          setTimeout(() => { ball.glitching = false; }, 80 + Math.random() * 120);
        }

        // Mouse repulsion
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const dx = ball.x - mx;
        const dy = ball.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = ball.r * 4;
        ball.hovered = dist < ball.r * 1.3;

        if (dist < repelRadius && dist > 0) {
          const force = (repelRadius - dist) / repelRadius;
          ball.vx += (dx / dist) * force * 1.0;
          ball.vy += (dy / dist) * force * 1.0;
        }

        // Return to JG target position
        ball.vx += (ball.targetX - ball.x) * 0.008;
        ball.vy += (ball.targetY - ball.y) * 0.008;

        ball.vx *= 0.97;
        ball.vy *= 0.97;

        const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        if (speed > 5) { ball.vx = (ball.vx / speed) * 5; ball.vy = (ball.vy / speed) * 5; }

        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x - ball.r < 0) { ball.x = ball.r; ball.vx = Math.abs(ball.vx); }
        if (ball.x + ball.r > canvas.width) { ball.x = canvas.width - ball.r; ball.vx = -Math.abs(ball.vx); }
        if (ball.y - ball.r < 0) { ball.y = ball.r; ball.vy = Math.abs(ball.vy); }
        if (ball.y + ball.r > canvas.height) { ball.y = canvas.height - ball.r; ball.vy = -Math.abs(ball.vy); }

        // Ball-ball collision
        for (const other of balls) {
          if (other === ball) continue;
          const cdx = ball.x - other.x;
          const cdy = ball.y - other.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          const minDist = ball.r + other.r + 6;
          if (cdist < minDist && cdist > 0) {
            const overlap = (minDist - cdist) / 2;
            ball.x += (cdx / cdist) * overlap;
            ball.y += (cdy / cdist) * overlap;
            const nx = cdx / cdist;
            const ny = cdy / cdist;
            const relVx = ball.vx - other.vx;
            const relVy = ball.vy - other.vy;
            const dot = relVx * nx + relVy * ny;
            if (dot < 0) {
              ball.vx -= dot * nx * 0.5;
              ball.vy -= dot * ny * 0.5;
              other.vx += dot * nx * 0.5;
              other.vy += dot * ny * 0.5;
            }
          }
        }

        drawHexBall(ball, imagesRef.current[ball.imgIdx], t);
      }

      animFrameRef.current = requestAnimationFrame(tick);
    }

    const startTimer = setTimeout(() => {
      if (ballsRef.current.length === 0) init();
      tick();
    }, 300);

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      clearTimeout(startTimer);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          badge="My Toolkit"
          title="Technical Expertise"
          description="Technologies and tools I use to build secure, high-performance applications and infrastructure."
        />
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="relative w-full rounded-2xl border border-primary/20 bg-background/80 overflow-hidden transition-all duration-300"
          style={{
            height: '380px',
            boxShadow: hovering
              ? '0 0 40px rgba(0,200,255,0.25) inset, 0 0 30px rgba(0,200,255,0.15)'
              : '0 0 10px rgba(0,200,255,0.03) inset',
            opacity: hovering ? 1 : 0.4,
          }}
        >
          <canvas ref={canvasRef} className="w-full h-full" />
          {/* Corner decorations */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-primary/40" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-primary/40" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-primary/40" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-primary/40" />
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] text-primary/30 pointer-events-none tracking-widest">
            // HOVER TO INTERACT
          </p>
        </motion.div>
      </div>
    </section>
  );
}
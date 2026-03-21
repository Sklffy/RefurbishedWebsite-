import React, { useEffect, useRef, useState } from 'react';

export default function CyberCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState([]);
  const [clicking, setClicking] = useState(false);
  const trailRef = useRef([]);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      trailRef.current = [{ x: e.clientX, y: e.clientY, t: Date.now() }, ...trailRef.current.slice(0, 8)];
      setTrail([...trailRef.current]);
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Trail dots */}
      {trail.map((p, i) => (
        <div
          key={i}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: p.x,
            top: p.y,
            width: Math.max(2, 6 - i),
            height: Math.max(2, 6 - i),
            borderRadius: '50%',
            background: `rgba(0, 220, 255, ${(0.5 - i * 0.055).toFixed(2)})`,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${6 - i}px rgba(0,220,255,0.6)`,
            transition: 'none',
          }}
        />
      ))}

      {/* Outer ring */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: pos.x,
          top: pos.y,
          width: clicking ? 28 : 36,
          height: clicking ? 28 : 36,
          border: '1.5px solid rgba(0,220,255,0.7)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px rgba(0,220,255,0.4), inset 0 0 6px rgba(0,220,255,0.1)',
          transition: 'width 0.12s, height 0.12s',
        }}
      >
        {/* Corner ticks */}
        <span style={{ position: 'absolute', top: -1, left: -1, width: 6, height: 6, borderTop: '1.5px solid #00dcff', borderLeft: '1.5px solid #00dcff' }} />
        <span style={{ position: 'absolute', top: -1, right: -1, width: 6, height: 6, borderTop: '1.5px solid #00dcff', borderRight: '1.5px solid #00dcff' }} />
        <span style={{ position: 'absolute', bottom: -1, left: -1, width: 6, height: 6, borderBottom: '1.5px solid #00dcff', borderLeft: '1.5px solid #00dcff' }} />
        <span style={{ position: 'absolute', bottom: -1, right: -1, width: 6, height: 6, borderBottom: '1.5px solid #00dcff', borderRight: '1.5px solid #00dcff' }} />
      </div>

      {/* Inner dot */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: pos.x,
          top: pos.y,
          width: clicking ? 6 : 4,
          height: clicking ? 6 : 4,
          background: '#00f0ff',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 8px #00f0ff, 0 0 16px rgba(0,240,255,0.5)',
          transition: 'width 0.1s, height 0.1s',
        }}
      />
    </>
  );
}
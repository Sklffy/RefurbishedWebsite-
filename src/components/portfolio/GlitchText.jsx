import React, { useEffect, useState } from 'react';

const glitchChars = 'X$#@!%&?01<>';

export default function GlitchText({ text, className = '', style }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const triggerGlitch = () => {
      let iterations = 0;
      const interval = setInterval(() => {
        setDisplay(
          text.split('').map((char, i) =>
            i < iterations ? char : char === ' ' ? ' ' : glitchChars[Math.floor(Math.random() * glitchChars.length)]
          ).join('')
        );
        iterations += 1;
        if (iterations > text.length) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, 40);
    };

    const initial = setTimeout(triggerGlitch, 800);
    const loop = setInterval(triggerGlitch, 6000);
    return () => { clearTimeout(initial); clearInterval(loop); };
  }, [text]);

  return <span className={className} style={style}>{display}</span>;
}
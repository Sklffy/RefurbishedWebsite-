import React from 'react';

export default function SectionWrapper({ children, className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="relative z-20">{children}</div>
    </div>
  );
}
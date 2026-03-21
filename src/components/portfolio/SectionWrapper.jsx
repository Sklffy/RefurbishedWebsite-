import React from 'react';

// Each variant has a distinct but cyber-themed pattern
const patterns = {
  grid: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300e5ff' stroke-opacity='0.07' stroke-width='1'%3E%3Cpath d='M60 0L0 0 0 60'/%3E%3C/g%3E%3C/svg%3E")`,
  stripes: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300e5ff' stroke-opacity='0.05' stroke-width='1'%3E%3Cpath d='M0 40L40 0'/%3E%3C/g%3E%3C/svg%3E")`,
  dots: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='15' cy='15' r='1.5' fill='%2300e5ff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
  hex: `url("data:image/svg+xml,%3Csvg width='56' height='100' viewBox='0 0 56 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 2 L54 17 L54 47 L28 62 L2 47 L2 17 Z' fill='none' stroke='%2300e5ff' stroke-opacity='0.07' stroke-width='1'/%3E%3Cpath d='M28 52 L54 67 L54 97 L28 112 L2 97 L2 67 Z' fill='none' stroke='%2300e5ff' stroke-opacity='0.07' stroke-width='1'/%3E%3C/svg%3E")`,
  circuit: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300e5ff' stroke-opacity='0.07' stroke-width='1'%3E%3Cpath d='M10 10 L10 40 L40 40'/%3E%3Cpath d='M70 10 L70 40 L40 40'/%3E%3Cpath d='M10 70 L10 40'/%3E%3Cpath d='M70 70 L70 40'/%3E%3Ccircle cx='10' cy='10' r='2' fill='%2300e5ff' fill-opacity='0.1'/%3E%3Ccircle cx='70' cy='10' r='2' fill='%2300e5ff' fill-opacity='0.1'/%3E%3Ccircle cx='40' cy='40' r='2.5' fill='%2300e5ff' fill-opacity='0.15'/%3E%3Ccircle cx='10' cy='70' r='2' fill='%2300e5ff' fill-opacity='0.1'/%3E%3Ccircle cx='70' cy='70' r='2' fill='%2300e5ff' fill-opacity='0.1'/%3E%3C/g%3E%3C/svg%3E")`,
};

export default function SectionWrapper({ children, variant = 'grid', className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="relative z-20">{children}</div>
    </div>
  );
}
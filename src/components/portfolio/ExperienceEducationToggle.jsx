import React, { useState } from 'react';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';

export default function ExperienceEducationToggle() {
  const [active, setActive] = useState('experience');

  return (
    <div id="experience">
      {/* Toggle buttons */}
      <div className="flex justify-center pt-24 pb-0 px-6">
        <div className="flex items-center bg-background border border-primary/30 rounded p-1 gap-1 shadow-lg shadow-primary/10 relative overflow-hidden">
          {/* scan line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none" />

          {['experience', 'education'].map((tab) => {
            const isActive = active === tab;
            return (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`relative px-7 py-2 text-sm font-mono font-bold tracking-widest uppercase transition-all duration-200 rounded-sm ${
                  isActive
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {isActive && (
                  <>
                    <span className="absolute inset-0 bg-primary/90 rounded-sm" />
                    <span className="absolute inset-0 rounded-sm shadow-[0_0_12px_2px_hsl(187_92%_52%/0.5)]" />
                    {/* corner brackets */}
                    <span className="absolute top-0.5 left-0.5 w-2 h-2 border-t border-l border-primary-foreground/40 pointer-events-none" />
                    <span className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b border-r border-primary-foreground/40 pointer-events-none" />
                  </>
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {isActive && <span className="text-primary-foreground/60 text-xs">&gt;</span>}
                  {tab}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {active === 'experience' ? (
        <ExperienceSection hidePadding />
      ) : (
        <EducationSection hidePadding />
      )}
    </div>
  );
}
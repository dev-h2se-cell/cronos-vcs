import React from 'react';

interface HydroLockTabsProps {
  sectionIds: string[];
  activeSection: string;
  scrollToSection: (id: string) => void;
}

const tabDisplayNames: { [key: string]: string } = {
  overview: 'Resumen',
  science: 'Ciencia',
  routine: 'Rutina',
  offers: 'Ofertas',
};

export const HydroLockTabs: React.FC<HydroLockTabsProps> = ({ sectionIds, activeSection, scrollToSection }) => {
  return (
    <div className="sticky top-[60px] md:top-[72px] z-40 bg-white/80 backdrop-blur-md border-y border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex overflow-x-auto no-scrollbar gap-8 md:gap-12 text-sm font-bold tracking-widest uppercase justify-start md:justify-center">
        {sectionIds.map((tab) => (
          <button
            key={tab}
            onClick={() => scrollToSection(tab)}
            className={`py-4 border-b-2 transition-colors whitespace-nowrap ${
              activeSection === tab
                ? 'border-cyan-500 text-cyan-600'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {tabDisplayNames[tab] || tab}
          </button>
        ))}
      </div>
    </div>
  );
};

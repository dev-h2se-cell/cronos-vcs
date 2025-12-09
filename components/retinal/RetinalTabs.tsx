import React from 'react';

interface RetinalTabsProps {
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

export const RetinalTabs: React.FC<RetinalTabsProps> = ({ sectionIds, activeSection, scrollToSection }) => {
  return (
    <div className="sticky top-[60px] md:top-[72px] z-40 bg-slate-950/90 backdrop-blur-md border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex overflow-x-auto no-scrollbar gap-8 md:gap-12 text-sm font-bold tracking-widest uppercase justify-start md:justify-center">
        {sectionIds.map((tab) => (
          <button
            key={tab}
            onClick={() => scrollToSection(tab)}
            className={`py-4 border-b-2 transition-colors whitespace-nowrap ${
              activeSection === tab
                ? 'border-purple-500 text-white'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {tabDisplayNames[tab] || tab}
          </button>
        ))}
      </div>
    </div>
  );
};

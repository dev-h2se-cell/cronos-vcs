import React from 'react';
import { useScrollToSection } from '../hooks/useScrollToSection';

import { RetinalHero } from './retinal/RetinalHero';
import { RetinalTabs } from './retinal/RetinalTabs';
import { RetinalOverview } from './retinal/RetinalOverview';
import { RetinalScience } from './retinal/RetinalScience';
import { RetinalRoutine } from './retinal/RetinalRoutine';
import { RetinalOffers } from './retinal/RetinalOffers';
import { RetinalMobileCta } from './retinal/RetinalMobileCta';

import { ProductData } from '../types'; // Import ProductData

interface Props {
  onAddToCart: () => void;
  onNavigateToProtocol: () => void;
  onNavigateToProtocols: () => void;
  productsData: ProductData; // Added
}

const SECTION_IDS = ['overview', 'science', 'routine', 'offers'];

const RetinalProductPage: React.FC<Props> = ({ onAddToCart, onNavigateToProtocol, onNavigateToProtocols, productsData }) => {
  const { activeSection, scrollToSection } = useScrollToSection({
    sectionIds: SECTION_IDS,
  });

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans animate-fade-in pb-24">
      <RetinalHero productsData={productsData} />
      <RetinalTabs
        sectionIds={SECTION_IDS}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-24">
        <RetinalOverview />
        <RetinalScience productsData={productsData} />
        <RetinalRoutine productsData={productsData} />
        <RetinalOffers
          onNavigateToProtocol={onNavigateToProtocol}
          onNavigateToProtocols={onNavigateToProtocols}
          productsData={productsData}
        />
      </main>

      <RetinalMobileCta onAddToCart={onAddToCart} productsData={productsData} />
    </div>
  );
};

export default RetinalProductPage;
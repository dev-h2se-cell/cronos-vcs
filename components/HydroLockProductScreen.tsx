import React from 'react';
import { useScrollToSection } from '../hooks/useScrollToSection';

import { HydroLockHero } from './hydrolock/HydroLockHero';
import { HydroLockTabs } from './hydrolock/HydroLockTabs';
import { HydroLockOverview } from './hydrolock/HydroLockOverview';
import { HydroLockScience } from './hydrolock/HydroLockScience';
import { HydroLockRoutine } from './hydrolock/HydroLockRoutine';
import { HydroLockOffers } from './hydrolock/HydroLockOffers';
import { HydroLockMobileCta } from './hydrolock/HydroLockMobileCta';

import { ProductData } from '../types'; // Import ProductData

interface Props {
  onAddToCart: () => void;
  onNavigateToProtocols: () => void;
  productsData: ProductData; // Added
}

const SECTION_IDS = ['overview', 'science', 'routine', 'offers'];

const HydroLockProductScreen: React.FC<Props> = ({ onAddToCart, onNavigateToProtocols, productsData }) => {
  const { activeSection, scrollToSection } = useScrollToSection({
    sectionIds: SECTION_IDS,
  });

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans animate-fade-in pb-24">
      <HydroLockHero productsData={productsData} />
      <HydroLockTabs
        sectionIds={SECTION_IDS}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-24">
        <HydroLockOverview />
        <HydroLockScience />
        <HydroLockRoutine />
        <HydroLockOffers onAddToCart={onAddToCart} onNavigateToProtocols={onNavigateToProtocols} productsData={productsData} />
      </main>

      <HydroLockMobileCta onAddToCart={onAddToCart} productsData={productsData} />
    </div>
  );
};

export default HydroLockProductScreen;
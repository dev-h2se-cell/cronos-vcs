import React from 'react';
import { useScrollToSection } from '../hooks/useScrollToSection';

import { InvisibleShieldHero } from './invisibleshield/InvisibleShieldHero';
import { InvisibleShieldTabs } from './invisibleshield/InvisibleShieldTabs';
import { InvisibleShieldOverview } from './invisibleshield/InvisibleShieldOverview';
import { InvisibleShieldScience } from './invisibleshield/InvisibleShieldScience';
import { InvisibleShieldRoutine } from './invisibleshield/InvisibleShieldRoutine';
import { InvisibleShieldOffers } from './invisibleshield/InvisibleShieldOffers';
import { InvisibleShieldMobileCta } from './invisibleshield/InvisibleShieldMobileCta';

import { ProductData } from '../types'; // Import ProductData

interface Props {
  onAddToCart: () => void;
  onNavigateToProtocols: () => void;
  productsData: ProductData; // Added
}

const SECTION_IDS = ['overview', 'science', 'routine', 'offers'];

const InvisibleShieldProductScreen: React.FC<Props> = ({ onAddToCart, onNavigateToProtocols, productsData }) => {
  const { activeSection, scrollToSection } = useScrollToSection({
    sectionIds: SECTION_IDS,
  });

  return (
    <div className="bg-[#FFFBF0] min-h-screen text-slate-900 font-sans animate-fade-in pb-24">
      <InvisibleShieldHero productsData={productsData} />
      <InvisibleShieldTabs
        sectionIds={SECTION_IDS}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-24">
        <InvisibleShieldOverview />
        <InvisibleShieldScience />
        <InvisibleShieldRoutine />
        <InvisibleShieldOffers onNavigateToProtocols={onNavigateToProtocols} productsData={productsData} />
      </main>

      <InvisibleShieldMobileCta onAddToCart={onAddToCart} productsData={productsData} />
    </div>
  );
};

export default InvisibleShieldProductScreen;
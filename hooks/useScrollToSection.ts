import { useState, useEffect, useCallback } from 'react';

interface UseScrollToSectionOptions {
  sectionIds: string[];
  scrollSpyOffset?: number;
  scrollToOffset?: number;
}

export const useScrollToSection = ({
  sectionIds,
  scrollSpyOffset = 200,
  scrollToOffset = 120,
}: UseScrollToSectionOptions) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + scrollSpyOffset;
    let currentSection = activeSection;

    for (const sectionId of sectionIds) {
      const element = document.getElementById(sectionId);
      if (element && element.offsetTop <= scrollPosition) {
        currentSection = sectionId;
      }
    }
    setActiveSection(currentSection);
  }, [sectionIds, scrollSpyOffset]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - scrollToOffset,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return { activeSection, scrollToSection };
};

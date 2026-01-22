import { renderHook, act } from '@testing-library/react'; // Changed import
import { useScrollToSection } from './useScrollToSection';

// Mock DOM elements and scroll behavior
const mockElements: { [key: string]: { offsetTop: number } } = {
  'section-1': { offsetTop: 0 },
  'section-2': { offsetTop: 500 },
  'section-3': { offsetTop: 1000 },
};

const mockGetElementById = (id: string) => {
  return mockElements[id] as HTMLElement | null;
};

// Mock window.scrollTo
const mockScrollTo = vi.fn();
Object.defineProperty(window, 'scrollTo', { value: mockScrollTo, writable: true });

describe('useScrollToSection', () => {
  const sectionIds = ['section-1', 'section-2', 'section-3'];
  const scrollSpyOffset = 200;
  const scrollToOffset = 120;

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset window.scrollY for each test
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    // Mock document.getElementById
    vi.spyOn(document, 'getElementById').mockImplementation(mockGetElementById);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should initialize with the first section as active', () => {
    const { result } = renderHook(() => useScrollToSection({ sectionIds, scrollSpyOffset }));
    expect(result.current.activeSection).toBe('section-1');
  });

  test('scrollToSection should scroll to the correct element and set it as active', () => {
    const { result } = renderHook(() => useScrollToSection({ sectionIds, scrollToOffset }));

    act(() => {
      result.current.scrollToSection('section-2');
    });

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: mockElements['section-2'].offsetTop - scrollToOffset,
      behavior: 'smooth',
    });
    expect(result.current.activeSection).toBe('section-2');
  });

  test('handleScroll should update activeSection based on scroll position', () => {
    const { result } = renderHook(() => useScrollToSection({ sectionIds, scrollSpyOffset }));

    // Simulate scrolling to a position within section-1
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current.activeSection).toBe('section-1'); // Still section-1

    // Simulate scrolling to a position within section-2
    Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current.activeSection).toBe('section-2');

    // Simulate scrolling to a position within section-3
    Object.defineProperty(window, 'scrollY', { value: 1100, writable: true });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current.activeSection).toBe('section-3');
  });

  test('handleScroll should not update activeSection if scroll position is before any section', () => {
    const { result } = renderHook(() => useScrollToSection({ sectionIds, scrollSpyOffset }));
    
    Object.defineProperty(window, 'scrollY', { value: -50, writable: true }); // Before first section
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current.activeSection).toBe('section-1'); // Should remain initial or first section
  });

  test('should handle empty sectionIds gracefully', () => {
    const { result } = renderHook(() => useScrollToSection({ sectionIds: [], scrollSpyOffset }));
    expect(result.current.activeSection).toBeUndefined(); // Or initial default if any
  });
});

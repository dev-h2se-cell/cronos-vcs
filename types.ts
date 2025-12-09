export interface ProductBundle {
  id: string;
  title: string;
  subtitle?: string;
  products: string[];
  price: number;
  originalPrice?: number;
  isBestSeller: boolean;
  features: string[];
  ctaText: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Interface for individual product items.
 */
export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  type: "individual";
  price: string; // Stored as string for formatting flexibility (e.g., "110.000")
  currency: string;
  description: string;
  longDescription: string;
  benefits: string[];
  mobileCtaPrice?: string; // Optional, for specific mobile CTA pricing
  heroCtaPrice?: string; // Optional, for specific Hero section CTA pricing
  subscriptionPrice?: string; // Optional, for subscription model pricing
  subscriptionOriginalPrice?: string; // Optional, for subscription model original price
  size?: string; // Optional, for product size/volume
  image?: string; // Optional, for product image path
  image400w?: string; // Added for responsive images
  image800w?: string; // Added for responsive images
}

/**
 * Interface for product protocols or bundles.
 */
export interface ProtocolItem {
  id: string;
  name: string;
  tagline: string;
  type: "bundle";
  price: string; // Stored as string
  originalPrice?: string; // Optional, for strike-through original price
  currency: string;
  description: string;
  productsIncluded: string[]; // IDs of products/items included in the bundle
  ctaText: string;
  image?: string; // Optional
}

/**
 * Interface for other miscellaneous items like shipping details or digital products.
 */
export interface OtherItem {
  id: string;
  name: string;
  details: string; // General details or description
  threshold?: string; // Optional, for shipping thresholds
  currency?: string; // Optional
  type?: string; // Optional, e.g., "digital"
  price?: string; // Optional, for items like guides that have a price
}

/**
 * Main interface for the entire products.json data structure.
 */
export interface ProductData {
  products: ProductItem[];
  protocols: ProtocolItem[];
  others: OtherItem[];
}
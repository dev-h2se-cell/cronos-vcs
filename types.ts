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

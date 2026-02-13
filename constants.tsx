
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    external_id: 'printful_123',
    source: 'printful',
    name: 'The Zenith Signature Tee',
    category: 'Essential',
    price: 85,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-heavyweight 300GSM organic cotton.',
    colors: ['Black', 'Ivory'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'p2',
    external_id: 'gelato_456',
    source: 'gelato',
    name: 'Peak Performance Hoodie',
    category: 'Outerwear',
    price: 145,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
    description: 'Structured fit with brushed gold hardware.',
    colors: ['Navy', 'Charcoal'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'p3',
    external_id: 'gelato_789',
    source: 'gelato',
    name: 'Luxe Oversized Sweater',
    category: 'Outerwear',
    price: 120,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800',
    description: 'Soft-touch French Terry fabric.',
    colors: ['Oatmeal', 'Black'],
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 'p4',
    external_id: 'printful_999',
    source: 'printful',
    name: 'Zenith Crest Polo',
    category: 'Essential',
    price: 95,
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&q=80&w=800',
    description: 'Fine-pique knit with discreet Zenith crest.',
    colors: ['Green', 'Black'],
    sizes: ['S', 'M', 'L']
  }
];

export const NAV_LINKS = [
  { label: 'Collections', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
];

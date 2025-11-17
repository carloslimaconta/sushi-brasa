// Menu de produtos do restaurante de sushi

import { Product } from './types';

export const MENU_PRODUCTS: Product[] = [
  // Rolls
  {
    id: 'roll-1',
    name: 'California Roll',
    description: 'Crab stick, avocado, cucumber, sesame seeds',
    price: 8.50,
    category: 'rolls',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'roll-2',
    name: 'Spicy Tuna Roll',
    description: 'Fresh tuna, spicy mayo, cucumber, spring onion',
    price: 10.50,
    category: 'rolls',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'roll-3',
    name: 'Dragon Roll',
    description: 'Eel, cucumber, avocado, eel sauce',
    price: 12.50,
    category: 'rolls',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'roll-4',
    name: 'Rainbow Roll',
    description: 'California roll topped with assorted fish',
    price: 13.50,
    category: 'rolls',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=300&fit=crop',
    available: true,
  },
  
  // Nigiri
  {
    id: 'nigiri-1',
    name: 'Salmon Nigiri',
    description: 'Fresh Scottish salmon on sushi rice (2 pieces)',
    price: 5.50,
    category: 'nigiri',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'nigiri-2',
    name: 'Tuna Nigiri',
    description: 'Premium tuna on sushi rice (2 pieces)',
    price: 6.50,
    category: 'nigiri',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'nigiri-3',
    name: 'Eel Nigiri',
    description: 'Grilled eel with eel sauce (2 pieces)',
    price: 7.00,
    category: 'nigiri',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    available: true,
  },
  
  // Sashimi
  {
    id: 'sashimi-1',
    name: 'Salmon Sashimi',
    description: 'Fresh Scottish salmon slices (5 pieces)',
    price: 9.50,
    category: 'sashimi',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'sashimi-2',
    name: 'Tuna Sashimi',
    description: 'Premium tuna slices (5 pieces)',
    price: 11.50,
    category: 'sashimi',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=300&fit=crop',
    available: true,
  },
  
  // Combos
  {
    id: 'combo-1',
    name: 'Sushi Platter',
    description: '12 pieces of assorted nigiri and rolls',
    price: 24.50,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'combo-2',
    name: 'Deluxe Platter',
    description: '20 pieces of premium sushi selection',
    price: 38.50,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=300&fit=crop',
    available: true,
  },
  
  // Drinks
  {
    id: 'drink-1',
    name: 'Green Tea',
    description: 'Traditional Japanese green tea',
    price: 2.50,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'drink-2',
    name: 'Sake',
    description: 'Premium Japanese rice wine',
    price: 8.00,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop',
    available: true,
  },
  
  // Extras
  {
    id: 'extra-1',
    name: 'Wasabi',
    description: 'Extra portion of wasabi',
    price: 0.50,
    category: 'extras',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'extra-2',
    name: 'Ginger',
    description: 'Pickled ginger',
    price: 0.50,
    category: 'extras',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=300&fit=crop',
    available: true,
  },
];

export const CATEGORIES = [
  { id: 'all', name: 'All', icon: '🍱' },
  { id: 'rolls', name: 'Rolls', icon: '🍣' },
  { id: 'nigiri', name: 'Nigiri', icon: '🍤' },
  { id: 'sashimi', name: 'Sashimi', icon: '🐟' },
  { id: 'combos', name: 'Combos', icon: '🎁' },
  { id: 'drinks', name: 'Drinks', icon: '🍵' },
  { id: 'extras', name: 'Extras', icon: '🥢' },
] as const;

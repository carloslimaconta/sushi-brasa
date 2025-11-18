// Sushi Brasa - Constants and Mock Data
import { Category, Product, Addon, Promotion, LoyaltyReward } from './types-sushi-brasa';

// Categories
export const CATEGORIES: Category[] = [
  { id: 'all', name: 'Todos', icon: '🍱' },
  { id: 'combos', name: 'Combos Brasa', icon: '🔥' },
  { id: 'hot-rolls', name: 'Hot Rolls', icon: '🌶️' },
  { id: 'temaki', name: 'Temaki', icon: '🍙' },
  { id: 'sashimi', name: 'Sashimi', icon: '🐟' },
  { id: 'sushi', name: 'Sushi Tradicional', icon: '🍣' },
  { id: 'yakisoba', name: 'Yakisoba/Lamen', icon: '🍜' },
  { id: 'sobremesas', name: 'Sobremesas', icon: '🍮' },
  { id: 'bebidas', name: 'Bebidas', icon: '🥤' },
  { id: 'novidades', name: 'Novidades', icon: '✨' },
];

// Common Addons
export const COMMON_ADDONS: Addon[] = [
  { id: 'cream-cheese', name: 'Cream Cheese Extra', price: 1.5 },
  { id: 'molho-extra', name: 'Molho Extra', price: 0.5 },
  { id: 'gengibre', name: 'Gengibre', price: 0.5 },
  { id: 'wasabi', name: 'Wasabi', price: 0.5 },
  { id: 'cebolinha', name: 'Cebolinha', price: 0.5 },
];

// Products
export const PRODUCTS: Product[] = [
  // Combos Brasa
  {
    id: 'combo-brasa-1',
    name: 'Combo Brasa Especial',
    description: '20 peças: 10 hot rolls flambados, 5 sashimis, 5 nigiris',
    price: 35.99,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    ingredients: ['Salmão', 'Atum', 'Cream cheese', 'Cebolinha'],
    allergens: ['Peixe', 'Laticínios'],
    calories: 850,
    variations: {
      styles: ['brasa', 'tradicional'],
    },
    addons: COMMON_ADDONS,
    isPromo: true,
    promoPrice: 29.99,
  },
  {
    id: 'combo-brasa-2',
    name: 'Combo Executivo',
    description: '15 peças: 8 hot rolls, 4 nigiris, 3 sashimis',
    price: 24.99,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=300&fit=crop',
    variations: {
      styles: ['brasa', 'tradicional'],
    },
    addons: COMMON_ADDONS,
  },
  
  // Hot Rolls
  {
    id: 'hot-salmao',
    name: 'Hot Roll Salmão Brasa',
    description: 'Salmão flambado com cream cheese e cebolinha',
    price: 18.99,
    category: 'hot-rolls',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    ingredients: ['Salmão', 'Cream cheese', 'Cebolinha', 'Arroz', 'Alga nori'],
    allergens: ['Peixe', 'Laticínios'],
    calories: 420,
    variations: {
      sizes: ['P', 'M', 'G'],
      styles: ['brasa', 'tradicional'],
    },
    addons: COMMON_ADDONS,
    isNew: true,
  },
  {
    id: 'hot-atum',
    name: 'Hot Roll Atum Picante',
    description: 'Atum selado com molho picante e gergelim',
    price: 19.99,
    category: 'hot-rolls',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=300&fit=crop',
    variations: {
      sizes: ['P', 'M', 'G'],
      styles: ['brasa', 'tradicional'],
    },
    addons: COMMON_ADDONS,
  },
  
  // Temaki
  {
    id: 'temaki-salmao',
    name: 'Temaki Salmão',
    description: 'Cone de alga com salmão fresco e cream cheese',
    price: 12.99,
    category: 'temaki',
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&h=300&fit=crop',
    variations: {
      styles: ['brasa', 'tradicional'],
    },
    addons: COMMON_ADDONS,
  },
  {
    id: 'temaki-atum',
    name: 'Temaki Atum',
    description: 'Cone de alga com atum fresco e cebolinha',
    price: 13.99,
    category: 'temaki',
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&h=300&fit=crop',
    variations: {
      styles: ['brasa', 'tradicional'],
    },
    addons: COMMON_ADDONS,
  },
  
  // Sashimi
  {
    id: 'sashimi-salmao',
    name: 'Sashimi Salmão (10 peças)',
    description: 'Fatias frescas de salmão premium',
    price: 22.99,
    category: 'sashimi',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    allergens: ['Peixe'],
    calories: 280,
  },
  {
    id: 'sashimi-atum',
    name: 'Sashimi Atum (10 peças)',
    description: 'Fatias frescas de atum premium',
    price: 24.99,
    category: 'sashimi',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=300&fit=crop',
    allergens: ['Peixe'],
    calories: 250,
  },
  
  // Sushi Tradicional
  {
    id: 'nigiri-salmao',
    name: 'Nigiri Salmão (8 peças)',
    description: 'Arroz prensado com fatia de salmão',
    price: 16.99,
    category: 'sushi',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    allergens: ['Peixe'],
  },
  {
    id: 'nigiri-atum',
    name: 'Nigiri Atum (8 peças)',
    description: 'Arroz prensado com fatia de atum',
    price: 17.99,
    category: 'sushi',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=300&fit=crop',
    allergens: ['Peixe'],
  },
  
  // Yakisoba/Lamen
  {
    id: 'yakisoba-frango',
    name: 'Yakisoba de Frango',
    description: 'Macarrão oriental com frango e legumes',
    price: 15.99,
    category: 'yakisoba',
    image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=300&fit=crop',
    variations: {
      sizes: ['P', 'M', 'G'],
    },
  },
  {
    id: 'lamen-tradicional',
    name: 'Lamen Tradicional',
    description: 'Sopa de macarrão com caldo especial',
    price: 16.99,
    category: 'yakisoba',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
    variations: {
      sizes: ['P', 'M', 'G'],
    },
  },
  
  // Sobremesas
  {
    id: 'mochi-morango',
    name: 'Mochi de Morango',
    description: 'Bolinho de arroz recheado com sorvete de morango',
    price: 6.99,
    category: 'sobremesas',
    image: 'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=400&h=300&fit=crop',
  },
  {
    id: 'dorayaki',
    name: 'Dorayaki',
    description: 'Panqueca japonesa recheada com doce de feijão',
    price: 5.99,
    category: 'sobremesas',
    image: 'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=400&h=300&fit=crop',
  },
  
  // Bebidas
  {
    id: 'coca-cola',
    name: 'Coca-Cola',
    description: 'Lata 350ml',
    price: 2.99,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop',
  },
  {
    id: 'suco-laranja',
    name: 'Suco de Laranja',
    description: 'Natural 300ml',
    price: 4.99,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop',
  },
];

// Promotions
export const PROMOTIONS: Promotion[] = [
  {
    id: 'promo-1',
    title: '10% OFF na Primeira Compra',
    description: 'Cadastre-se e ganhe 10% de desconto no seu primeiro pedido',
    discount: 10,
    code: 'BEMVINDO10',
    validUntil: '2024-12-31',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=400&fit=crop',
  },
  {
    id: 'promo-2',
    title: 'Combo Brasa Especial',
    description: 'De £35.99 por apenas £29.99',
    discount: 17,
    validUntil: '2024-12-31',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800&h=400&fit=crop',
  },
];

// Loyalty Rewards
export const LOYALTY_REWARDS: LoyaltyReward[] = [
  {
    id: 'reward-1',
    name: 'Temaki Grátis',
    pointsRequired: 100,
    description: 'Ganhe um temaki grátis',
    type: 'free-item',
    value: 12.99,
  },
  {
    id: 'reward-2',
    name: '15% de Desconto',
    pointsRequired: 200,
    description: 'Desconto de 15% no próximo pedido',
    type: 'discount',
    value: 15,
  },
  {
    id: 'reward-3',
    name: 'Cashback £10',
    pointsRequired: 300,
    description: 'Receba £10 de volta',
    type: 'cashback',
    value: 10,
  },
];

// WhatsApp Configuration
export const WHATSAPP_CONFIG = {
  phoneNumber: '+447123456789', // Replace with actual number
  businessName: 'Sushi Brasa',
  defaultMessage: 'Olá! Gostaria de fazer um pedido.',
};

// Delivery Configuration
export const DELIVERY_CONFIG = {
  freeDeliveryMinimum: 25,
  deliveryFee: 2.5,
  estimatedTime: 45, // minutes
  maxDistance: 5, // km
};

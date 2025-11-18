// Sushi Brasa - Types and Interfaces

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  ingredients?: string[];
  allergens?: string[];
  calories?: number;
  variations?: {
    sizes?: ('P' | 'M' | 'G')[];
    styles?: ('brasa' | 'tradicional')[];
  };
  addons?: Addon[];
  isPromo?: boolean;
  promoPrice?: number;
  isNew?: boolean;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: 'P' | 'M' | 'G';
  selectedStyle?: 'brasa' | 'tradicional';
  selectedAddons?: Addon[];
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  preferences?: string[];
  loyaltyPoints: number;
  totalOrders: number;
  createdAt: string;
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  deliveryType: 'delivery' | 'pickup';
  paymentMethod: 'card' | 'apple-pay' | 'google-pay' | 'cash' | 'bank-transfer';
  status: 'pending' | 'confirmed' | 'preparing' | 'on-the-way' | 'delivered' | 'cancelled';
  estimatedTime?: number;
  address?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  code?: string;
  validUntil: string;
  image?: string;
}

export interface LoyaltyReward {
  id: string;
  name: string;
  pointsRequired: number;
  description: string;
  type: 'discount' | 'free-item' | 'cashback';
  value: number;
}

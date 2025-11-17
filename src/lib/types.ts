// Types para o sistema de vendas de sushi

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'rolls' | 'nigiri' | 'sashimi' | 'combos' | 'drinks' | 'extras';
  image: string;
  available: boolean;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  customer: {
    name: string;
    phone: string;
    address?: string;
  };
  deliveryType: 'delivery' | 'pickup';
  paymentMethod: 'revolut' | 'cash';
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  total: number;
  createdAt: string;
  startTime?: string;
  endTime?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  orders: string[]; // Order IDs
  createdAt: string;
}

export interface StockItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  minQuantity: number;
  lastUpdated: string;
}

export interface StockMovement {
  id: string;
  itemId: string;
  type: 'in' | 'out';
  quantity: number;
  reason: string;
  date: string;
}

// Sushi Brasa - LocalStorage Helpers
import { CartItem, Customer, Order } from './types-sushi-brasa';

// Cart Management
export const saveCart = (cart: CartItem[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('sushi-brasa-cart', JSON.stringify(cart));
  }
};

export const getCart = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const cart = localStorage.getItem('sushi-brasa-cart');
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

export const clearCart = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('sushi-brasa-cart');
  }
};

// Customer Management
export const saveCustomer = (customer: Customer): void => {
  if (typeof window !== 'undefined') {
    const customers = getCustomers();
    const existingIndex = customers.findIndex(c => c.id === customer.id);
    
    if (existingIndex >= 0) {
      customers[existingIndex] = customer;
    } else {
      customers.push(customer);
    }
    
    localStorage.setItem('sushi-brasa-customers', JSON.stringify(customers));
  }
};

export const getCustomers = (): Customer[] => {
  if (typeof window !== 'undefined') {
    const customers = localStorage.getItem('sushi-brasa-customers');
    return customers ? JSON.parse(customers) : [];
  }
  return [];
};

export const getCustomerByPhone = (phone: string): Customer | null => {
  const customers = getCustomers();
  return customers.find(c => c.phone === phone) || null;
};

// Order Management
export const saveOrder = (order: Order): void => {
  if (typeof window !== 'undefined') {
    const orders = getOrders();
    orders.push(order);
    localStorage.setItem('sushi-brasa-orders', JSON.stringify(orders));
  }
};

export const getOrders = (): Order[] => {
  if (typeof window !== 'undefined') {
    const orders = localStorage.getItem('sushi-brasa-orders');
    return orders ? JSON.parse(orders) : [];
  }
  return [];
};

export const updateOrderStatus = (orderId: string, status: Order['status']): void => {
  if (typeof window !== 'undefined') {
    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex >= 0) {
      orders[orderIndex].status = status;
      orders[orderIndex].updatedAt = new Date().toISOString();
      localStorage.setItem('sushi-brasa-orders', JSON.stringify(orders));
    }
  }
};

export const getOrdersByCustomer = (customerId: string): Order[] => {
  const orders = getOrders();
  return orders.filter(o => o.customer.id === customerId);
};

// Current User Management
export const saveCurrentUser = (customer: Customer): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('sushi-brasa-current-user', JSON.stringify(customer));
  }
};

export const getCurrentUser = (): Customer | null => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('sushi-brasa-current-user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const clearCurrentUser = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('sushi-brasa-current-user');
  }
};

// Promo Code Management
export const saveUsedPromoCode = (code: string, customerId: string): void => {
  if (typeof window !== 'undefined') {
    const usedCodes = getUsedPromoCodes();
    usedCodes.push({ code, customerId, usedAt: new Date().toISOString() });
    localStorage.setItem('sushi-brasa-used-promos', JSON.stringify(usedCodes));
  }
};

export const getUsedPromoCodes = (): Array<{ code: string; customerId: string; usedAt: string }> => {
  if (typeof window !== 'undefined') {
    const codes = localStorage.getItem('sushi-brasa-used-promos');
    return codes ? JSON.parse(codes) : [];
  }
  return [];
};

export const hasUsedPromoCode = (code: string, customerId: string): boolean => {
  const usedCodes = getUsedPromoCodes();
  return usedCodes.some(uc => uc.code === code && uc.customerId === customerId);
};

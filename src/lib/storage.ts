// Local Storage utilities para persistência de dados

import { Order, Customer, StockItem, StockMovement } from './types';

const STORAGE_KEYS = {
  ORDERS: 'sushi_orders',
  CUSTOMERS: 'sushi_customers',
  STOCK: 'sushi_stock',
  STOCK_MOVEMENTS: 'sushi_stock_movements',
} as const;

// Orders
export const getOrders = (): Order[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
  return data ? JSON.parse(data) : [];
};

export const saveOrder = (order: Order): void => {
  const orders = getOrders();
  const existingIndex = orders.findIndex(o => o.id === order.id);
  
  if (existingIndex >= 0) {
    orders[existingIndex] = order;
  } else {
    orders.push(order);
  }
  
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
};

export const deleteOrder = (orderId: string): void => {
  const orders = getOrders().filter(o => o.id !== orderId);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
};

// Customers
export const getCustomers = (): Customer[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
  return data ? JSON.parse(data) : [];
};

export const saveCustomer = (customer: Customer): void => {
  const customers = getCustomers();
  const existingIndex = customers.findIndex(c => c.id === customer.id);
  
  if (existingIndex >= 0) {
    customers[existingIndex] = customer;
  } else {
    customers.push(customer);
  }
  
  localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
};

export const findCustomerByPhone = (phone: string): Customer | undefined => {
  return getCustomers().find(c => c.phone === phone);
};

// Stock
export const getStock = (): StockItem[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.STOCK);
  return data ? JSON.parse(data) : [];
};

export const saveStockItem = (item: StockItem): void => {
  const stock = getStock();
  const existingIndex = stock.findIndex(s => s.id === item.id);
  
  if (existingIndex >= 0) {
    stock[existingIndex] = item;
  } else {
    stock.push(item);
  }
  
  localStorage.setItem(STORAGE_KEYS.STOCK, JSON.stringify(stock));
};

// Stock Movements
export const getStockMovements = (): StockMovement[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.STOCK_MOVEMENTS);
  return data ? JSON.parse(data) : [];
};

export const saveStockMovement = (movement: StockMovement): void => {
  const movements = getStockMovements();
  movements.push(movement);
  localStorage.setItem(STORAGE_KEYS.STOCK_MOVEMENTS, JSON.stringify(movements));
};

// Analytics helpers
export const getOrdersByDateRange = (startDate: Date, endDate: Date): Order[] => {
  return getOrders().filter(order => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= startDate && orderDate <= endDate;
  });
};

export const getTotalSales = (orders: Order[]): number => {
  return orders.reduce((sum, order) => sum + order.total, 0);
};

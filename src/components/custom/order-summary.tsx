'use client';

import { OrderItem } from '@/lib/types';
import { X, ShoppingBag, MessageCircle } from 'lucide-react';

interface OrderSummaryProps {
  items: OrderItem[];
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function OrderSummary({ items, onRemoveItem, onCheckout }: OrderSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = 2.50;
  const total = subtotal + deliveryFee;

  const generateWhatsAppMessage = () => {
    const itemsList = items
      .map(item => `${item.quantity}x ${item.product.name} - £${(item.product.price * item.quantity).toFixed(2)}`)
      .join('\n');
    
    const message = `🍣 *New Order - Sushi Express*\n\n${itemsList}\n\n*Subtotal:* £${subtotal.toFixed(2)}\n*Delivery:* £${deliveryFee.toFixed(2)}\n*Total:* £${total.toFixed(2)}\n\nPlease confirm your delivery address and payment method (Revolut transfer).`;
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = () => {
    const message = generateWhatsAppMessage();
    // Replace with your WhatsApp Business number
    const whatsappNumber = '447123456789'; // UK format without +
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-600">Add some delicious sushi to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <ShoppingBag className="w-6 h-6 mr-2" />
          Your Order
        </h2>
      </div>

      {/* Items */}
      <div className="p-6 max-h-96 overflow-y-auto">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex items-start justify-between pb-4 border-b border-gray-100 last:border-0">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{item.product.name}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {item.quantity} × £{item.product.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-gray-900">
                  £{(item.product.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Delivery Fee</span>
            <span>£{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-300">
            <span>Total</span>
            <span>£{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout Buttons */}
        <div className="space-y-3">
          <button
            onClick={onCheckout}
            className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            Proceed to Checkout
          </button>
          
          <button
            onClick={handleWhatsAppOrder}
            className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Order via WhatsApp</span>
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          Payment via Revolut bank transfer
        </p>
      </div>
    </div>
  );
}

'use client';

import { useState, useMemo, useEffect } from 'react';
import { CATEGORIES, PRODUCTS, PROMOTIONS } from '@/lib/constants-sushi-brasa';
import { CartItem } from '@/lib/types-sushi-brasa';
import { saveCart, getCart } from '@/lib/storage-sushi-brasa';
import ProductCard from '@/components/custom/product-card-brasa';
import { Search, Flame, Sparkles, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = getCart();
    setCart(savedCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Cart operations
  const addToCart = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === productId);
      if (!existingItem) return prevCart;

      if (existingItem.quantity === 1) {
        return prevCart.filter(item => item.product.id !== productId);
      }

      return prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const getProductQuantity = (productId: string): number => {
    const item = cart.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const cartTotal = cart.reduce((sum, item) => {
    const price = item.product.isPromo && item.product.promoPrice 
      ? item.product.promoPrice 
      : item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src={PROMOTIONS[0].image || 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&h=500&fit=crop'}
          alt="Sushi Brasa Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-8 h-8 text-red-500" />
                <span className="text-[#D4AF37] font-bold text-lg">PROMOÇÃO DO DIA</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Sushi com Toque de <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">Brasa</span>
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                {PROMOTIONS[0].description}
              </p>
              <button 
                onClick={() => setSelectedCategory('combos')}
                className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-2xl"
              >
                Fazer Pedido Agora
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Access Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { name: 'Promoções', icon: '🔥', color: 'from-red-500 to-red-600' },
            { name: 'Combos', icon: '🍱', color: 'from-[#D4AF37] to-[#FFD700]' },
            { name: 'Bebidas', icon: '🥤', color: 'from-blue-500 to-blue-600' },
            { name: 'Sobremesas', icon: '🍮', color: 'from-pink-500 to-pink-600' },
            { name: 'Novidades', icon: '✨', color: 'from-purple-500 to-purple-600' },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setSelectedCategory(item.name.toLowerCase())}
              className={`bg-gradient-to-br ${item.color} p-4 rounded-2xl hover:scale-105 transition-transform duration-200 shadow-xl`}
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-white font-bold text-sm">{item.name}</div>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar sushi, temaki, yakisoba..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-900 border border-[#D4AF37]/20 text-white placeholder-gray-500 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all outline-none"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex space-x-3 min-w-max">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-lg shadow-[#D4AF37]/30'
                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800 border border-[#D4AF37]/20'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={getProductQuantity(product.id)}
              onAdd={() => addToCart(product.id)}
              onRemove={() => removeFromCart(product.id)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Sparkles className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      {cartItemsCount > 0 && (
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-6 left-6 z-40 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black px-6 py-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-3 font-bold"
        >
          <ShoppingBag className="w-6 h-6" />
          <span>{cartItemsCount} {cartItemsCount === 1 ? 'item' : 'itens'}</span>
          <span className="ml-2">£{cartTotal.toFixed(2)}</span>
        </button>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-gray-900 rounded-t-3xl md:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-[#D4AF37]/20">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#D4AF37]/20">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-[#D4AF37]" />
                Seu Carrinho
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="overflow-y-auto max-h-[50vh] p-6 space-y-4">
              {cart.map((item) => {
                const price = item.product.isPromo && item.product.promoPrice 
                  ? item.product.promoPrice 
                  : item.product.price;
                
                return (
                  <div key={item.product.id} className="flex items-center gap-4 bg-black/50 p-4 rounded-xl border border-[#D4AF37]/10">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold">{item.product.name}</h3>
                      <p className="text-[#D4AF37] font-bold">£{price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="w-8 h-8 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item.product.id)}
                        className="w-8 h-8 bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/30 transition-colors flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#D4AF37]/20 space-y-4">
              <div className="flex justify-between text-lg">
                <span className="text-gray-400">Subtotal:</span>
                <span className="text-white font-bold">£{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-400">Taxa de entrega:</span>
                <span className="text-white font-bold">£2.50</span>
              </div>
              <div className="flex justify-between text-2xl border-t border-[#D4AF37]/20 pt-4">
                <span className="text-white font-bold">Total:</span>
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent font-bold">
                  £{(cartTotal + 2.5).toFixed(2)}
                </span>
              </div>
              <button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-2xl">
                Finalizar Pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

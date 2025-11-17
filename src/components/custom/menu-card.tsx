'use client';

import { Product } from '@/lib/types';
import { Plus, Minus } from 'lucide-react';
import Image from 'next/image';

interface MenuCardProps {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export default function MenuCard({ product, quantity, onAdd, onRemove }: MenuCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Unavailable</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-emerald-600">
            £{product.price.toFixed(2)}
          </span>

          {/* Quantity Controls */}
          {product.available && (
            <div className="flex items-center space-x-2">
              {quantity > 0 ? (
                <>
                  <button
                    onClick={onRemove}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-700" />
                  </button>
                  <span className="w-8 text-center font-semibold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={onAdd}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 flex items-center justify-center transition-all shadow-md"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                </>
              ) : (
                <button
                  onClick={onAdd}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium transition-all shadow-md hover:shadow-lg"
                >
                  Add
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

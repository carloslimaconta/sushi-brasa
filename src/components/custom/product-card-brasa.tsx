'use client';

import { Product } from '@/lib/types-sushi-brasa';
import { Plus, Minus, Flame, Star } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export default function ProductCard({ product, quantity, onAdd, onRemove }: ProductCardProps) {
  const displayPrice = product.isPromo && product.promoPrice ? product.promoPrice : product.price;
  const hasDiscount = product.isPromo && product.promoPrice;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-[#D4AF37]/20 rounded-2xl overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4AF37]/10 group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3" />
              NOVO
            </span>
          )}
          {hasDiscount && (
            <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              PROMOÇÃO
            </span>
          )}
        </div>

        {/* Brasa Icon */}
        {product.variations?.styles?.includes('brasa') && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm p-2 rounded-full">
            <Flame className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-gray-400 text-sm mb-3 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        {/* Ingredients */}
        {product.ingredients && product.ingredients.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.ingredients.slice(0, 3).map((ingredient, index) => (
              <span
                key={index}
                className="text-xs bg-white/5 text-gray-400 px-2 py-1 rounded-full"
              >
                {ingredient}
              </span>
            ))}
            {product.ingredients.length > 3 && (
              <span className="text-xs text-[#D4AF37]">
                +{product.ingredients.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div>
            {hasDiscount && (
              <span className="text-gray-500 text-sm line-through mr-2">
                £{product.price.toFixed(2)}
              </span>
            )}
            <span className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
              £{displayPrice.toFixed(2)}
            </span>
          </div>

          {/* Add/Remove Buttons */}
          {quantity === 0 ? (
            <button
              onClick={onAdd}
              className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black px-4 py-2 rounded-xl font-bold hover:scale-105 transition-transform duration-200 shadow-lg"
            >
              <Plus className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1">
              <button
                onClick={onRemove}
                className="bg-red-500/20 text-red-400 p-2 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-white font-bold w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={onAdd}
                className="bg-[#D4AF37]/20 text-[#D4AF37] p-2 rounded-lg hover:bg-[#D4AF37]/30 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Calories */}
        {product.calories && (
          <div className="mt-3 text-xs text-gray-500">
            {product.calories} cal
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarBrasaProps {
  cartItemsCount?: number;
}

export default function NavbarBrasa({ cartItemsCount = 0 }: NavbarBrasaProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-[#D4AF37]/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-white">Sushi</span>
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent"> Brasa</span>
            </div>
            <span className="text-2xl">🔥</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-[#D4AF37] transition-colors font-medium">
              Cardápio
            </Link>
            <Link href="/promocoes" className="text-gray-300 hover:text-[#D4AF37] transition-colors font-medium">
              Promoções
            </Link>
            <Link href="/fidelidade" className="text-gray-300 hover:text-[#D4AF37] transition-colors font-medium">
              Fidelidade
            </Link>
            <Link href="/pedidos" className="text-gray-300 hover:text-[#D4AF37] transition-colors font-medium">
              Meus Pedidos
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button className="relative p-2 text-gray-300 hover:text-[#D4AF37] transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* User Button */}
            <Link href="/perfil" className="p-2 text-gray-300 hover:text-[#D4AF37] transition-colors">
              <User className="w-6 h-6" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-[#D4AF37] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-[#D4AF37]/20">
            <Link
              href="/"
              className="block px-4 py-2 text-gray-300 hover:text-[#D4AF37] hover:bg-white/5 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cardápio
            </Link>
            <Link
              href="/promocoes"
              className="block px-4 py-2 text-gray-300 hover:text-[#D4AF37] hover:bg-white/5 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Promoções
            </Link>
            <Link
              href="/fidelidade"
              className="block px-4 py-2 text-gray-300 hover:text-[#D4AF37] hover:bg-white/5 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Fidelidade
            </Link>
            <Link
              href="/pedidos"
              className="block px-4 py-2 text-gray-300 hover:text-[#D4AF37] hover:bg-white/5 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Meus Pedidos
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

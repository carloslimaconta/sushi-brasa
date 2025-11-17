'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, ShoppingCart, Users, Package, ChefHat, Phone, Trash2 } from 'lucide-react'

interface SushiItem {
  id: string
  name: string
  price: number
  description: string
  image: string
}

const sushiMenu: SushiItem[] = [
  { 
    id: '1', 
    name: 'Sushi Hot Dog', 
    price: 9.50, 
    description: 'Crispy roll with salmon, spring onion & special sauce', 
    image: 'https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/1797540b-aebd-4d27-adc2-8e8ae0a91288.jpg' 
  },
  { id: '2', name: 'California Roll', price: 8.50, description: 'Crab, avocado, cucumber', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop' },
  { id: '3', name: 'Salmon Nigiri', price: 6.00, description: 'Fresh salmon over rice', image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=300&fit=crop' },
  { id: '4', name: 'Tuna Sashimi', price: 12.00, description: 'Premium tuna slices', image: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&h=300&fit=crop' },
  { id: '5', name: 'Vegetarian Roll', price: 7.00, description: 'Avocado, cucumber, carrot', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop' },
  { id: '6', name: 'Dragon Roll', price: 10.00, description: 'Eel, avocado, cucumber', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop' },
]

export default function Home() {
  const [cart, setCart] = useState<SushiItem[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: SushiItem) => {
    setCart([...cart, item])
  }

  const removeFromCart = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index)
    setCart(newCart)
  }

  const clearCart = () => {
    setCart([])
  }

  const openWhatsApp = () => {
    const message = `Hello! I'd like to order:\n${cart.map(item => `- ${item.name} (£${item.price.toFixed(2)})`).join('\n')}\n\nTotal: £${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`
    const whatsappUrl = `https://wa.me/447123456789?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <ChefHat className="h-8 w-8 text-emerald-600 mr-2" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">Sushi Delights UK</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Menu</Link>
              <Link href="/kitchen" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Kitchen</Link>
              <Link href="/inventory" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Inventory</Link>
              <Link href="/customers" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Customers</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden pb-4 border-t">
              <nav className="flex flex-col space-y-2 pt-4">
                <Link href="/" className="text-gray-700 hover:text-emerald-600 transition-colors py-2">Menu</Link>
                <Link href="/kitchen" className="text-gray-700 hover:text-emerald-600 transition-colors py-2">Kitchen</Link>
                <Link href="/inventory" className="text-gray-700 hover:text-emerald-600 transition-colors py-2">Inventory</Link>
                <Link href="/customers" className="text-gray-700 hover:text-emerald-600 transition-colors py-2">Customers</Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Fresh Sushi, Fast Delivery</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Order your favourite sushi rolls and enjoy authentic Japanese cuisine delivered to your door across the UK.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={openWhatsApp}
              disabled={cart.length === 0}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-3 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold"
            >
              <Phone className="h-5 w-5 mr-2" />
              Order via WhatsApp
            </button>
            <button 
              disabled={cart.length === 0}
              className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-8 py-3 rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              Pay via Revolut
            </button>
          </div>
        </section>

        {/* Menu */}
        <section>
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Menu</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sushiMenu.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h4>
                  <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-emerald-600">£{item.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-semibold shadow-md hover:shadow-lg"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <section className="mt-12 bg-white rounded-xl shadow-lg p-6 border-2 border-emerald-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Your Cart</h3>
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear Cart
              </button>
            </div>
            <div className="space-y-3">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0">
                  <div className="flex-1">
                    <span className="text-gray-800 font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-emerald-600 font-bold">£{item.price.toFixed(2)}</span>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="border-t-2 pt-4 mt-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-emerald-600 text-2xl">£{cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={openWhatsApp}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center font-semibold"
              >
                <Phone className="h-5 w-5 mr-2" />
                Order via WhatsApp
              </button>
              <button className="flex-1 bg-gradient-to-r from-sky-500 to-sky-600 text-white px-6 py-3 rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all shadow-lg hover:shadow-xl font-semibold">
                Pay via Revolut
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 Sushi Delights UK. Fresh sushi delivered across England.</p>
          <p className="text-gray-500 text-sm mt-2">Payment via Revolut | Order via WhatsApp Business</p>
        </div>
      </footer>
    </div>
  )
}

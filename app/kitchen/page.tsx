'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChefHat, Clock, Truck, Store, ArrowLeft } from 'lucide-react'

interface Order {
  id: string
  items: string[]
  total: number
  customerName: string
  customerPhone: string
  type: 'delivery' | 'pickup'
  status: 'pending' | 'preparing' | 'ready' | 'completed'
  startTime?: Date
  endTime?: Date
}

export default function Kitchen() {
  const [orders, setOrders] = useState<Order[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders')
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders).map((order: any) => ({
        ...order,
        startTime: order.startTime ? new Date(order.startTime) : undefined,
        endTime: order.endTime ? new Date(order.endTime) : undefined,
      }))
      setOrders(parsedOrders)
    }

    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders))
  }, [orders])

  const startOrder = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'preparing', startTime: new Date() }
        : order
    ))
  }

  const completeOrder = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'ready', endTime: new Date() }
        : order
    ))
  }

  const deliverOrder = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'completed' }
        : order
    ))
  }

  const getOrderDuration = (order: Order) => {
    if (!order.startTime) return 'Not started'
    if (!order.endTime) return 'In progress'
    const duration = Math.floor((order.endTime.getTime() - order.startTime.getTime()) / 60000)
    return `${duration} min`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <ChefHat className="h-8 w-8 text-emerald-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Kitchen Dashboard</h1>
            </div>
            <Link href="/" className="text-gray-700 hover:text-emerald-600 transition-colors flex items-center">
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Menu
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Current Time: {currentTime.toLocaleTimeString()}</h2>
          <p className="text-gray-600">Manage incoming orders and track preparation times</p>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">{order.customerName}</p>
                  <p className="text-sm text-gray-600">{order.customerPhone}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.type === 'delivery' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {order.type === 'delivery' ? <Truck className="h-4 w-4 inline mr-1" /> : <Store className="h-4 w-4 inline mr-1" />}
                  {order.type}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-2">Items:</p>
                <ul className="text-sm text-gray-600">
                  {order.items.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
                <p className="text-lg font-bold text-emerald-600 mt-2">£{order.total.toFixed(2)}</p>
              </div>

              <div className="mb-4">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Clock className="h-4 w-4 mr-1" />
                  Duration: {getOrderDuration(order)}
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'preparing' ? 'bg-orange-100 text-orange-800' :
                  order.status === 'ready' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status}
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                {order.status === 'pending' && (
                  <button
                    onClick={() => startOrder(order.id)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Start Preparing
                  </button>
                )}
                {order.status === 'preparing' && (
                  <button
                    onClick={() => completeOrder(order.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Mark as Ready
                  </button>
                )}
                {order.status === 'ready' && order.type === 'delivery' && (
                  <button
                    onClick={() => deliverOrder(order.id)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Mark as Delivered
                  </button>
                )}
                {order.status === 'ready' && order.type === 'pickup' && (
                  <button
                    onClick={() => deliverOrder(order.id)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Mark as Picked Up
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600">Orders will appear here when customers place them.</p>
          </div>
        )}
      </main>
    </div>
  )
}
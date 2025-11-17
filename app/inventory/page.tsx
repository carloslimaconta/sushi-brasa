'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Package, TrendingUp, ArrowLeft, Plus, BarChart3 } from 'lucide-react'

interface InventoryItem {
  id: string
  name: string
  quantity: number
  unit: string
  minStock: number
}

interface SaleRecord {
  id: string
  date: Date
  item: string
  quantity: number
  revenue: number
}

export default function Inventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: '1', name: 'Salmon', quantity: 50, unit: 'pieces', minStock: 20 },
    { id: '2', name: 'Tuna', quantity: 30, unit: 'pieces', minStock: 15 },
    { id: '3', name: 'Rice', quantity: 100, unit: 'kg', minStock: 25 },
    { id: '4', name: 'Nori', quantity: 200, unit: 'sheets', minStock: 50 },
    { id: '5', name: 'Avocado', quantity: 40, unit: 'pieces', minStock: 10 },
  ])

  const [sales, setSales] = useState<SaleRecord[]>([])
  const [newItem, setNewItem] = useState({ name: '', quantity: 0, unit: '', minStock: 0 })
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily')

  useEffect(() => {
    const savedInventory = localStorage.getItem('inventory')
    const savedSales = localStorage.getItem('sales')
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory))
    }
    if (savedSales) {
      setSales(JSON.parse(savedSales).map((sale: any) => ({ ...sale, date: new Date(sale.date) })))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory))
  }, [inventory])

  useEffect(() => {
    localStorage.setItem('sales', JSON.stringify(sales))
  }, [sales])

  const addInventoryItem = () => {
    if (newItem.name && newItem.unit) {
      const item: InventoryItem = {
        id: Date.now().toString(),
        ...newItem
      }
      setInventory([...inventory, item])
      setNewItem({ name: '', quantity: 0, unit: '', minStock: 0 })
    }
  }

  const updateStock = (id: string, quantity: number) => {
    setInventory(inventory.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + quantity } : item
    ))
  }

  const getSalesData = () => {
    const now = new Date()
    let startDate: Date

    switch (selectedPeriod) {
      case 'daily':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        break
      case 'weekly':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'monthly':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        break
      case 'yearly':
        startDate = new Date(now.getFullYear(), 0, 1)
        break
    }

    const filteredSales = sales.filter(sale => sale.date >= startDate)
    const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.revenue, 0)
    const totalItems = filteredSales.reduce((sum, sale) => sum + sale.quantity, 0)

    return { totalRevenue, totalItems, sales: filteredSales }
  }

  const salesData = getSalesData()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-emerald-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inventory Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Stock Management</h2>

            {/* Add New Item */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Item</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Item name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="text"
                  placeholder="Unit (kg, pieces, etc.)"
                  value={newItem.unit}
                  onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="number"
                  placeholder="Initial quantity"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="number"
                  placeholder="Min stock level"
                  value={newItem.minStock}
                  onChange={(e) => setNewItem({ ...newItem, minStock: Number(e.target.value) })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                onClick={addInventoryItem}
                className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </button>
            </div>

            {/* Current Inventory */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Stock</h3>
              <div className="space-y-4">
                {inventory.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        {item.quantity} {item.unit} (Min: {item.minStock})
                      </p>
                      {item.quantity <= item.minStock && (
                        <p className="text-sm text-red-600 font-medium">Low stock!</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateStock(item.id, 10)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors text-sm"
                      >
                        +10
                      </button>
                      <button
                        onClick={() => updateStock(item.id, -1)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-sm"
                        disabled={item.quantity <= 0}
                      >
                        -1
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sales Analytics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sales Analytics</h2>

            {/* Period Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-emerald-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-emerald-600">£{salesData.totalRevenue.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-blue-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Items Sold</p>
                    <p className="text-2xl font-bold text-blue-600">{salesData.totalItems}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Sales */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sales</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {salesData.sales.slice(-10).reverse().map((sale) => (
                  <div key={sale.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{sale.item}</p>
                      <p className="text-sm text-gray-600">{sale.date.toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-emerald-600">£{sale.revenue.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Qty: {sale.quantity}</p>
                    </div>
                  </div>
                ))}
                {salesData.sales.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No sales data for this period</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
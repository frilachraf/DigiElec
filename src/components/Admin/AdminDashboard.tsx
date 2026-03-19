'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import ProductTable from './ProductTable'
import AddProductForm from './AddProductForm'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [showForm, setShowForm] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  const handleProductAdded = () => {
    setShowForm(false)
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-dark">Admin Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your products and inventory</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">Welcome, {user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Product Section */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-2.5 bg-blue text-white rounded-md hover:bg-blue/90 transition-colors font-medium"
          >
            {showForm ? 'Cancel' : '+ Add New Product'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
            <h2 className="text-lg font-semibold text-dark mb-6">Add New Product</h2>
            <AddProductForm onSuccess={handleProductAdded} />
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-dark">Products</h2>
          </div>
          <ProductTable refreshTrigger={refreshTrigger} onRefresh={() => setRefreshTrigger((prev) => prev + 1)} />
        </div>
      </main>
    </div>
  )
}

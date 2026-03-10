'use client'

import React from 'react'
import { Product, deleteProduct } from '@/lib/supabase/products'
import toast from 'react-hot-toast'

interface ProductsListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
  isLoading: boolean
}

export default function ProductsList({ products, onEdit, onDelete, isLoading }: ProductsListProps) {
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    
    try {
      const { error } = await deleteProduct(id)
      if (error) {
        toast.error('Failed to delete product')
        return
      }
      toast.success('Product deleted')
      onDelete(id)
    } catch (err) {
      toast.error('An error occurred')
    }
  }

  if (products.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-1 text-center">
        <p className="text-gray-4">No products yet. Create your first product!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-1 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-2 border-b border-gray-3">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Rating</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-dark">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-3 hover:bg-gray-1">
                <td className="px-6 py-4 text-sm text-dark">{product.title}</td>
                <td className="px-6 py-4 text-sm text-dark">{product.category}</td>
                <td className="px-6 py-4 text-sm font-medium text-blue">${product.price}</td>
                <td className="px-6 py-4 text-sm text-dark">{product.rating || 'N/A'}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => onEdit(product)}
                      disabled={isLoading}
                      className="px-3 py-1 bg-blue text-white rounded hover:bg-dark ease-out duration-200 disabled:opacity-50 text-xs font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => product.id && handleDelete(product.id)}
                      disabled={isLoading}
                      className="px-3 py-1 bg-red text-white rounded hover:bg-dark ease-out duration-200 disabled:opacity-50 text-xs font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

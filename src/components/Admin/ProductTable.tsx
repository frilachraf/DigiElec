'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, deleteProduct } from '@/redux/features/products-slice'
import { AppDispatch, RootState } from '@/redux/store'
import toast from 'react-hot-toast'

interface ProductTableProps {
  refreshTrigger: number
  onRefresh: () => void
}

export default function ProductTable({ refreshTrigger, onRefresh }: ProductTableProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { items: products, loading } = useSelector((state: RootState) => state.products)
  const [deleting, setDeleting] = useState<number | null>(null)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch, refreshTrigger])

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setDeleting(id)
      try {
        const result = await dispatch(deleteProduct(id))
        if (result.payload !== undefined) {
          toast.success('Product deleted successfully!')
          onRefresh()
        } else {
          toast.error('Failed to delete product')
        }
      } catch (error) {
        console.error('Error deleting product:', error)
        toast.error('An error occurred while deleting the product')
      } finally {
        setDeleting(null)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">No products found. Add your first product to get started.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Regular Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Discounted Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Reviews
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-medium text-dark">{product.title}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-600">${product.price.toFixed(2)}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-600">${product.discountedPrice.toFixed(2)}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-600">{product.reviews}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    disabled={deleting === product.id}
                    className="px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium"
                  >
                    {deleting === product.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

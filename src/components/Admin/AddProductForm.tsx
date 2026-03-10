'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createProduct } from '@/redux/features/products-slice'
import { AppDispatch } from '@/redux/store'
import toast from 'react-hot-toast'

interface AddProductFormProps {
  onSuccess: () => void
}

export default function AddProductForm({ onSuccess }: AddProductFormProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    discountedPrice: '',
    reviews: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate form data
      if (!formData.title || !formData.price) {
        toast.error('Please fill in all required fields')
        setLoading(false)
        return
      }

      const productData = {
        title: formData.title,
        price: parseFloat(formData.price),
        discountedPrice: formData.discountedPrice ? parseFloat(formData.discountedPrice) : parseFloat(formData.price),
        reviews: formData.reviews ? parseInt(formData.reviews) : 0,
        imgs: {
          previews: [],
          thumbnails: [],
        },
      }

      const result = await dispatch(createProduct(productData))

      if (result.payload) {
        toast.success('Product added successfully!')
        setFormData({
          title: '',
          price: '',
          discountedPrice: '',
          reviews: '',
        })
        onSuccess()
      } else {
        toast.error('Failed to add product')
      }
    } catch (error) {
      console.error('Error adding product:', error)
      toast.error('An error occurred while adding the product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-dark mb-2">
            Product Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter product title"
            className="w-full px-4 py-2.5 border border-gray-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
          />
        </div>

        {/* Regular Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-dark mb-2">
            Regular Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="0.00"
            step="0.01"
            className="w-full px-4 py-2.5 border border-gray-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
          />
        </div>

        {/* Discounted Price */}
        <div>
          <label htmlFor="discountedPrice" className="block text-sm font-medium text-dark mb-2">
            Discounted Price (Optional)
          </label>
          <input
            type="number"
            id="discountedPrice"
            name="discountedPrice"
            value={formData.discountedPrice}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            className="w-full px-4 py-2.5 border border-gray-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
          />
        </div>

        {/* Reviews Count */}
        <div>
          <label htmlFor="reviews" className="block text-sm font-medium text-dark mb-2">
            Number of Reviews (Optional)
          </label>
          <input
            type="number"
            id="reviews"
            name="reviews"
            value={formData.reviews}
            onChange={handleChange}
            placeholder="0"
            min="0"
            className="w-full px-4 py-2.5 border border-gray-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-blue text-white rounded-md hover:bg-blue/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </div>
    </form>
  )
}

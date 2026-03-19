'use client'

import React, { useState, useEffect } from 'react'
import { Product, createProduct, updateProduct } from '@/lib/supabase/products'
import toast from 'react-hot-toast'

interface ProductFormProps {
  product?: Product
  onSubmit: (product: Product) => void
  isLoading: boolean
}

export default function ProductForm({ product, onSubmit, isLoading }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>({
    title: '',
    price: 0,
    oldPrice: 0,
    rating: 0,
    category: '',
    description: '',
    img: '',
    colors: [],
    sizes: [],
  })

  useEffect(() => {
    if (product) {
      setFormData(product)
    }
  }, [product])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('price') || name === 'rating' ? parseFloat(value) || 0 : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.price || !formData.category) {
      toast.error('Please fill in all required fields')
      return
    }
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-dark font-medium mb-2">
            Product Title <span className="text-red">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter product title"
            className="w-full border border-gray-3 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue/20"
          />
        </div>

        <div>
          <label className="block text-dark font-medium mb-2">
            Category <span className="text-red">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-3 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue/20"
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="audio">Audio</option>
            <option value="accessories">Accessories</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-dark font-medium mb-2">
            Price <span className="text-red">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="0.00"
            step="0.01"
            className="w-full border border-gray-3 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue/20"
          />
        </div>

        <div>
          <label className="block text-dark font-medium mb-2">Old Price</label>
          <input
            type="number"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            className="w-full border border-gray-3 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue/20"
          />
        </div>

        <div>
          <label className="block text-dark font-medium mb-2">Rating</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="0"
            min="0"
            max="5"
            step="0.1"
            className="w-full border border-gray-3 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue/20"
          />
        </div>

        <div>
          <label className="block text-dark font-medium mb-2">Image URL</label>
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-3 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue/20"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-dark font-medium mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          rows={4}
          className="w-full border border-gray-3 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue/20"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-dark text-white font-medium py-2 px-4 rounded-lg hover:bg-blue ease-out duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  )
}

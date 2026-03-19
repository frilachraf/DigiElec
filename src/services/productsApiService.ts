/**
 * Products API Service
 * Fetches product data from http://localhost:8000/api/
 */

import { apiClient } from '@/lib/api-client'
import { Product } from '@/types/product'

interface ApiProduct {
  id: string | number
  title: string
  price: number
  discounted_price?: number
  reviews?: number
  preview_images?: string[]
  thumbnail_images?: string[]
  category?: string
  description?: string
  [key: string]: any
}

export const productsApiService = {
  /**
   * Fetch all products from the API
   */
  async getProducts(): Promise<Product[]> {
    const response = await apiClient.get<ApiProduct[]>('/products')

    if (!response.success || !response.data) {
      console.warn('Failed to fetch products from API:', response.error)
      return []
    }

    // Map API response to Product type
    return response.data.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      discountedPrice: product.discounted_price || product.price,
      reviews: product.reviews || 0,
      imgs: {
        previews: product.preview_images || [],
        thumbnails: product.thumbnail_images || [],
      },
    }))
  },

  /**
   * Fetch a single product by ID
   */
  async getProductById(id: string | number): Promise<Product | null> {
    const response = await apiClient.get<ApiProduct>(`/products/${id}`)

    if (!response.success || !response.data) {
      console.warn(`Failed to fetch product ${id} from API:`, response.error)
      return null
    }

    const product = response.data
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      discountedPrice: product.discounted_price || product.price,
      reviews: product.reviews || 0,
      imgs: {
        previews: product.preview_images || [],
        thumbnails: product.thumbnail_images || [],
      },
    }
  },

  /**
   * Search products by query
   */
  async searchProducts(query: string): Promise<Product[]> {
    const response = await apiClient.get<ApiProduct[]>(`/products/search?q=${encodeURIComponent(query)}`)

    if (!response.success || !response.data) {
      console.warn('Failed to search products from API:', response.error)
      return []
    }

    return response.data.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      discountedPrice: product.discounted_price || product.price,
      reviews: product.reviews || 0,
      imgs: {
        previews: product.preview_images || [],
        thumbnails: product.thumbnail_images || [],
      },
    }))
  },

  /**
   * Fetch products by category
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    const response = await apiClient.get<ApiProduct[]>(`/products/category/${category}`)

    if (!response.success || !response.data) {
      console.warn('Failed to fetch products by category from API:', response.error)
      return []
    }

    return response.data.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      discountedPrice: product.discounted_price || product.price,
      reviews: product.reviews || 0,
      imgs: {
        previews: product.preview_images || [],
        thumbnails: product.thumbnail_images || [],
      },
    }))
  },

  /**
   * Create a new product (admin only)
   */
  async createProduct(product: Omit<ApiProduct, 'id'>): Promise<Product | null> {
    const response = await apiClient.post<ApiProduct>('/products', product)

    if (!response.success || !response.data) {
      console.error('Failed to create product:', response.error)
      return null
    }

    const created = response.data
    return {
      id: created.id,
      title: created.title,
      price: created.price,
      discountedPrice: created.discounted_price || created.price,
      reviews: created.reviews || 0,
      imgs: {
        previews: created.preview_images || [],
        thumbnails: created.thumbnail_images || [],
      },
    }
  },

  /**
   * Update an existing product (admin only)
   */
  async updateProduct(id: string | number, updates: Partial<ApiProduct>): Promise<Product | null> {
    const response = await apiClient.put<ApiProduct>(`/products/${id}`, updates)

    if (!response.success || !response.data) {
      console.error('Failed to update product:', response.error)
      return null
    }

    const updated = response.data
    return {
      id: updated.id,
      title: updated.title,
      price: updated.price,
      discountedPrice: updated.discounted_price || updated.price,
      reviews: updated.reviews || 0,
      imgs: {
        previews: updated.preview_images || [],
        thumbnails: updated.thumbnail_images || [],
      },
    }
  },

  /**
   * Delete a product (admin only)
   */
  async deleteProduct(id: string | number): Promise<boolean> {
    const response = await apiClient.delete(`/products/${id}`)

    if (!response.success) {
      console.error('Failed to delete product:', response.error)
      return false
    }

    return true
  },
}

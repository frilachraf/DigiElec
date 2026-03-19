import { createClient } from '@/lib/supabase/client'
import { Product } from '@/types/product'

export const WpProductService = {
  async getProducts(): Promise<Product[]> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching products:', error)
      return []
    }

    // Map database records to Product type
    return (data || []).map((product: any) => ({
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

  async getProductById(id: number): Promise<Product | null> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error || !data) {
      console.error('Error fetching product:', error)
      return null
    }

    return {
      id: data.id,
      title: data.title,
      price: data.price,
      discountedPrice: data.discounted_price || data.price,
      reviews: data.reviews || 0,
      imgs: {
        previews: data.preview_images || [],
        thumbnails: data.thumbnail_images || [],
      },
    }
  },

  async createProduct(product: Omit<Product, 'id'> & { 
    preview_images?: string[]
    thumbnail_images?: string[]
  }): Promise<Product | null> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          title: product.title,
          price: product.price,
          discounted_price: product.discountedPrice,
          reviews: product.reviews,
          preview_images: product.preview_images || product.imgs?.previews || [],
          thumbnail_images: product.thumbnail_images || product.imgs?.thumbnails || [],
        },
      ])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating product:', error)
      return null
    }

    return {
      id: data.id,
      title: data.title,
      price: data.price,
      discountedPrice: data.discounted_price || data.price,
      reviews: data.reviews || 0,
      imgs: {
        previews: data.preview_images || [],
        thumbnails: data.thumbnail_images || [],
      },
    }
  },

  async updateProduct(id: number, updates: Partial<Product>): Promise<Product | null> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('products')
      .update({
        title: updates.title,
        price: updates.price,
        discounted_price: updates.discountedPrice,
        reviews: updates.reviews,
        preview_images: updates.imgs?.previews,
        thumbnail_images: updates.imgs?.thumbnails,
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating product:', error)
      return null
    }

    return {
      id: data.id,
      title: data.title,
      price: data.price,
      discountedPrice: data.discounted_price || data.price,
      reviews: data.reviews || 0,
      imgs: {
        previews: data.preview_images || [],
        thumbnails: data.thumbnail_images || [],
      },
    }
  },

  async deleteProduct(id: number): Promise<boolean> {
    const supabase = createClient()
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting product:', error)
      return false
    }

    return true
  },
}


import { createClient } from './client'

export interface Product {
  id?: string
  title: string
  price: number
  oldPrice?: number
  rating?: number
  category: string
  description?: string
  img?: string
  imgs?: {
    previews: string[]
  }
  colors?: string[]
  sizes?: string[]
  created_at?: string
}

export async function getProducts() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function getProductById(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
}

export async function getProductsByCategory(category: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function createProduct(product: Product) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
  return { data, error }
}

export async function updateProduct(id: string, product: Partial<Product>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
  return { data, error }
}

export async function deleteProduct(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)
  return { data, error }
}

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/types/product'
import { productsApiService } from '@/services/productsApiService'

type ProductsState = {
  items: Product[]
  loading: boolean
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await productsApiService.getProducts()
      return products
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (product: Omit<Product, 'id'>, { rejectWithValue }) => {
    try {
      const newProduct = await productsApiService.createProduct({
        title: product.title,
        price: product.price,
        discounted_price: product.discountedPrice,
        reviews: product.reviews,
        preview_images: product.imgs.previews,
        thumbnail_images: product.imgs.thumbnails,
      })
      return newProduct
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, updates }: { id: string | number; updates: Partial<Product> }, { rejectWithValue }) => {
    try {
      const updatePayload: any = {}
      if (updates.title) updatePayload.title = updates.title
      if (updates.price) updatePayload.price = updates.price
      if (updates.discountedPrice) updatePayload.discounted_price = updates.discountedPrice
      if (updates.reviews) updatePayload.reviews = updates.reviews
      if (updates.imgs?.previews) updatePayload.preview_images = updates.imgs.previews
      if (updates.imgs?.thumbnails) updatePayload.thumbnail_images = updates.imgs.thumbnails

      const updatedProduct = await productsApiService.updateProduct(id, updatePayload)
      return updatedProduct
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string | number, { rejectWithValue }) => {
    try {
      await productsApiService.deleteProduct(id)
      return id
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Create product
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product | null>) => {
        if (action.payload) {
          state.items.unshift(action.payload)
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.payload as string
      })
      // Update product
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product | null>) => {
        if (action.payload) {
          const index = state.items.findIndex((p) => p.id === action.payload!.id)
          if (index !== -1) {
            state.items[index] = action.payload
          }
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload as string
      })
      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string | number>) => {
        state.items = state.items.filter((p) => p.id !== action.payload)
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload as string
      })
  },
})

export const { clearError } = productsSlice.actions
export default productsSlice.reducer

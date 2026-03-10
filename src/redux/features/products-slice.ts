import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/types/product'
import { productService } from '@/services/productService'

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
      const products = await productService.getProducts()
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
      const newProduct = await productService.createProduct(product)
      return newProduct
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, updates }: { id: number; updates: Partial<Product> }, { rejectWithValue }) => {
    try {
      const updatedProduct = await productService.updateProduct(id, updates)
      return updatedProduct
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: number, { rejectWithValue }) => {
    try {
      await productService.deleteProduct(id)
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
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((p) => p.id !== action.payload)
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload as string
      })
  },
})

export const { clearError } = productsSlice.actions
export default productsSlice.reducer

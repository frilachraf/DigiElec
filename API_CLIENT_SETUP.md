# API Client Setup Guide

This guide explains how to use the API client to fetch data from your local backend at `http://localhost:8000/api/`.

## Overview

The application now includes a complete API client infrastructure for communicating with your backend:

- **`src/lib/api-client.ts`**: Generic HTTP client with GET, POST, PUT, DELETE methods
- **`src/services/productsApiService.ts`**: Product-specific API service with CRUD operations
- **`src/redux/features/products-slice.ts`**: Redux integration for centralized product state management

## Configuration

### Environment Variables

Add the following to your `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

If not set, the client defaults to `http://localhost:8000/api`.

## API Client Usage

### Generic HTTP Methods

```typescript
import { apiClient } from '@/lib/api-client'

// GET request
const { data, success, error } = await apiClient.get<T>('/endpoint')

// POST request
const { data, success, error } = await apiClient.post<T>('/endpoint', { body: 'data' })

// PUT request
const { data, success, error } = await apiClient.put<T>('/endpoint', { body: 'data' })

// DELETE request
const { data, success, error } = await apiClient.delete<T>('/endpoint')
```

## Products API Service

The `productsApiService` provides convenient methods for product operations:

### Fetch All Products

```typescript
import { productsApiService } from '@/services/productsApiService'

const products = await productsApiService.getProducts()
```

Expected API endpoint: `GET /api/products`

### Fetch Single Product

```typescript
const product = await productsApiService.getProductById(123)
```

Expected API endpoint: `GET /api/products/123`

### Search Products

```typescript
const results = await productsApiService.searchProducts('laptop')
```

Expected API endpoint: `GET /api/products/search?q=laptop`

### Get Products by Category

```typescript
const electronics = await productsApiService.getProductsByCategory('electronics')
```

Expected API endpoint: `GET /api/products/category/electronics`

### Create Product (Admin)

```typescript
const newProduct = await productsApiService.createProduct({
  title: 'New Product',
  price: 99.99,
  preview_images: ['url1', 'url2'],
  // ... other fields
})
```

Expected API endpoint: `POST /api/products`

### Update Product (Admin)

```typescript
const updated = await productsApiService.updateProduct(123, {
  title: 'Updated Title',
  price: 79.99,
})
```

Expected API endpoint: `PUT /api/products/123`

### Delete Product (Admin)

```typescript
const success = await productsApiService.deleteProduct(123)
```

Expected API endpoint: `DELETE /api/products/123`

## Redux Integration

Products are automatically synced with Redux for global state management:

```typescript
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, createProduct, deleteProduct } from '@/redux/features/products-slice'
import { RootState, AppDispatch } from '@/redux/store'

export function ProductComponent() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, loading, error } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // Create new product
  const handleCreate = async (product) => {
    await dispatch(createProduct(product))
  }

  // Delete product
  const handleDelete = async (id) => {
    await dispatch(deleteProduct(id))
  }

  return (
    // Component JSX
  )
}
```

## Backend API Requirements

Your backend at `http://localhost:8000/api/` should implement the following endpoints:

### Products Endpoints

```
GET    /products              - Get all products
GET    /products/:id          - Get single product
GET    /products/search?q=... - Search products
GET    /products/category/:category - Get by category
POST   /products              - Create product (requires auth)
PUT    /products/:id          - Update product (requires auth)
DELETE /products/:id          - Delete product (requires auth)
```

### Expected Product Response Format

```json
{
  "id": 1,
  "title": "Product Name",
  "price": 99.99,
  "discounted_price": 79.99,
  "reviews": 4,
  "preview_images": ["url1", "url2"],
  "thumbnail_images": ["thumb1", "thumb2"],
  "category": "electronics",
  "description": "Product description"
}
```

## Error Handling

All API calls return a consistent response structure:

```typescript
interface ApiResponse<T> {
  data?: T
  error?: string
  success: boolean
}
```

Example error handling:

```typescript
const { data, success, error } = await apiClient.get<Product[]>('/products')

if (!success) {
  console.error('Failed to fetch products:', error)
  // Handle error
} else {
  // Use data
}
```

## Running Your Backend

Make sure your backend server is running at `http://localhost:8000`:

```bash
# Your backend startup command
python manage.py runserver  # Django
npm start                   # Node.js
# etc.
```

## CORS Configuration

If you encounter CORS errors, ensure your backend is configured to accept requests from your frontend:

**Backend (Django example)**:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

**Backend (Express example)**:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
```

## Troubleshooting

### "Failed to fetch" errors
- Verify backend is running on `http://localhost:8000`
- Check CORS configuration on backend
- Check browser console for detailed error messages

### API returns empty data
- Verify backend endpoints match the expected paths
- Check that the response format matches the expected structure

### Type errors in TypeScript
- Ensure generic types match your backend response structure
- Use the provided `ApiProduct` interface as a reference

## Switching Between API and Supabase

The current implementation uses the API client. To switch back to Supabase, modify `src/redux/features/products-slice.ts` and import from `productService` instead of `productsApiService`.

The original Supabase service is available in `src/services/productService.ts` for reference.

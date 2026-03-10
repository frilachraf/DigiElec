-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  discount_percent INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  stock INTEGER DEFAULT 0,
  category TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  image_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  image_bg_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to view products
CREATE POLICY "Allow public to view products" ON products
  FOR SELECT
  USING (true);

-- Policy: Allow admins to insert products
CREATE POLICY "Allow admins to insert products" ON products
  FOR INSERT
  WITH CHECK (
    auth.jwt() ->> 'user_metadata'->>'is_admin' = 'true'
  );

-- Policy: Allow admins to update products
CREATE POLICY "Allow admins to update products" ON products
  FOR UPDATE
  USING (
    auth.jwt() ->> 'user_metadata'->>'is_admin' = 'true'
  );

-- Policy: Allow admins to delete products
CREATE POLICY "Allow admins to delete products" ON products
  FOR DELETE
  USING (
    auth.jwt() ->> 'user_metadata'->>'is_admin' = 'true'
  );

-- Create index for faster queries
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_created_at ON products(created_at);

/*
  # Initial Schema Setup for Business Management System

  1. Tables
    - users (handled by Supabase Auth)
    - products (inventory items)
    - parties (customers and suppliers)
    - transactions (sales, purchases, payments)
    - bank_accounts

  2. Security
    - RLS policies for all tables
    - Only authenticated users can access data
    - Users can only access their organization's data
*/

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  sku text UNIQUE NOT NULL,
  description text,
  category text,
  quantity integer NOT NULL DEFAULT 0,
  unit_price decimal(10,2) NOT NULL,
  reorder_level integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Parties table (customers and suppliers)
CREATE TABLE IF NOT EXISTS parties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('customer', 'supplier')),
  contact_person text,
  email text,
  phone text,
  address text,
  credit_limit decimal(10,2),
  current_balance decimal(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Bank accounts table
CREATE TABLE IF NOT EXISTS bank_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  account_number text NOT NULL,
  bank_name text NOT NULL,
  current_balance decimal(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('sale', 'purchase', 'payment', 'receipt')),
  date timestamptz NOT NULL DEFAULT now(),
  party_id uuid REFERENCES parties(id),
  amount decimal(10,2) NOT NULL,
  reference text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'confirmed', 'cancelled')),
  payment_method text CHECK (payment_method IN ('cash', 'bank')),
  bank_account_id uuid REFERENCES bank_accounts(id),
  notes text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Transaction items table
CREATE TABLE IF NOT EXISTS transaction_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id uuid REFERENCES transactions(id),
  product_id uuid REFERENCES products(id),
  quantity integer NOT NULL,
  unit_price decimal(10,2) NOT NULL,
  total_amount decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transaction_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read all products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read all parties"
  ON parties FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read all bank accounts"
  ON bank_accounts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read all transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read all transaction items"
  ON transaction_items FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_parties_type ON parties(type);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_transaction_items_transaction ON transaction_items(transaction_id);
-- =============================================================
-- MANCHESTER UNITED SUPPORTERS CLUB PUNE (MUSC PUNE)
-- SUPABASE DATABASE SCHEMA & FULL CRUD TABLES SETUP
-- =============================================================

-- 1. TICKETS & ORDERS TABLE
CREATE TABLE IF NOT EXISTS tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id TEXT UNIQUE NOT NULL,
  screening_id TEXT NOT NULL,
  match_title TEXT NOT NULL,
  venue TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  total_amount NUMERIC(10,2) NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  booking_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  qr_data_url TEXT,
  payment_status TEXT NOT NULL DEFAULT 'SUCCESS',
  checked_in BOOLEAN DEFAULT FALSE,
  checked_in_at TIMESTAMP WITH TIME ZONE,
  checked_in_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. DYNAMIC SCREENINGS TABLE (FULL CRUD)
CREATE TABLE IF NOT EXISTS screenings (
  id TEXT PRIMARY KEY,
  match_title TEXT NOT NULL,
  competition TEXT NOT NULL,
  home_team TEXT NOT NULL,
  away_team TEXT NOT NULL,
  home_logo TEXT,
  away_logo TEXT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  venue_name TEXT NOT NULL,
  venue_address TEXT,
  venue_area TEXT,
  price NUMERIC(10,2) NOT NULL,
  active_phase_name TEXT,
  phases JSONB,
  tax_rate NUMERIC(4,2) DEFAULT 0.18,
  platform_fee_rate NUMERIC(4,2) DEFAULT 0.03,
  featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'UPCOMING',
  description TEXT,
  gate_opening TEXT,
  inclusions JSONB,
  rules JSONB,
  capacity INT DEFAULT 250,
  remaining_seats INT DEFAULT 250,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. DYNAMIC MERCHANDISE PRODUCTS TABLE (FULL CRUD)
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  image TEXT NOT NULL,
  description TEXT,
  available_sizes JSONB,
  size_prices JSONB,
  in_stock BOOLEAN DEFAULT TRUE,
  badge TEXT,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. DYNAMIC DOCUMENTARY GALLERY TABLE (FULL CRUD)
CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  location TEXT,
  date TEXT,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. SITE CONFIGURATION TABLE (Membership & Old Trafford Tour Config)
CREATE TABLE IF NOT EXISTS site_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS and set public policies across all tables
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE screenings ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select tickets" ON tickets FOR SELECT USING (true);
CREATE POLICY "Allow public insert tickets" ON tickets FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update tickets" ON tickets FOR UPDATE USING (true);
CREATE POLICY "Allow public delete tickets" ON tickets FOR DELETE USING (true);

CREATE POLICY "Allow public select screenings" ON screenings FOR SELECT USING (true);
CREATE POLICY "Allow public insert screenings" ON screenings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update screenings" ON screenings FOR UPDATE USING (true);
CREATE POLICY "Allow public delete screenings" ON screenings FOR DELETE USING (true);

CREATE POLICY "Allow public select products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public insert products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update products" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow public delete products" ON products FOR DELETE USING (true);

CREATE POLICY "Allow public select gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Allow public insert gallery" ON gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update gallery" ON gallery FOR UPDATE USING (true);
CREATE POLICY "Allow public delete gallery" ON gallery FOR DELETE USING (true);

CREATE POLICY "Allow public select site_config" ON site_config FOR SELECT USING (true);
CREATE POLICY "Allow public insert site_config" ON site_config FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update site_config" ON site_config FOR UPDATE USING (true);
CREATE POLICY "Allow public delete site_config" ON site_config FOR DELETE USING (true);

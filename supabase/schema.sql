-- =============================================================
-- MANCHESTER UNITED SUPPORTERS CLUB PUNE (MUSC PUNE)
-- SUPABASE DATABASE SCHEMA (100% FREE TIER SETUP)
-- =============================================================

-- 1. TICKETS & ORDERS TABLE
CREATE TABLE IF NOT EXISTS tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id TEXT UNIQUE NOT NULL,               -- e.g. MUSCPUN-739102 or MUSCPUN-FAIL-884920
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
  payment_status TEXT NOT NULL DEFAULT 'SUCCESS', -- 'SUCCESS', 'FAILED', 'DEBIT_VERIFICATION_REQUIRED'
  checked_in BOOLEAN DEFAULT FALSE,
  checked_in_at TIMESTAMP WITH TIME ZONE,
  checked_in_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for instant gate scanner validation by ticket_id or user_phone
CREATE INDEX IF NOT EXISTS idx_tickets_ticket_id ON tickets (ticket_id);
CREATE INDEX IF NOT EXISTS idx_tickets_user_phone ON tickets (user_phone);
CREATE INDEX IF NOT EXISTS idx_tickets_payment_status ON tickets (payment_status);

-- Enable Row Level Security (RLS)
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Allow public inserts & reads (Anon access for ticketing)
CREATE POLICY "Allow public select on tickets" ON tickets FOR SELECT USING (true);
CREATE POLICY "Allow public insert on tickets" ON tickets FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on tickets" ON tickets FOR UPDATE USING (true);

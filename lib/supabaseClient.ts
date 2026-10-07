import { createClient } from '@supabase/supabase-js';

const FALLBACK_URL = 'https://gwffjzmsliqkzffvzfnh.supabase.co';
const FALLBACK_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3ZmZqem1zbGlxa3pmZnZ6Zm5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzMDEyMDMsImV4cCI6MjEwNjg3NzIwM30.xRAS43cPgFrOMqIiUbPUymoGW5pCelMIHdgHvaQUrCU';
const FALLBACK_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3ZmZqem1zbGlxa3pmZnZ6Zm5oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTMwMTIwMywiZXhwIjoyMTA2ODc3MjAzfQ.JYUAAG6cd8QR5yOw_QmEuhD9nu5gEhy2nVRQuuDV8L4';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || FALLBACK_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Public client for anonymous reads
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client using Service Role Key (bypasses RLS to ensure 100% reliable writes on Vercel)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);


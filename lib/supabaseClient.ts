import { createClient } from '@supabase/supabase-js';

const FALLBACK_URL = 'https://gwffjzmsliqkzffvzfnh.supabase.co';
const FALLBACK_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3ZmZqem1zbGlxa3pmZnZ6Zm5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzMDEyMDMsImV4cCI6MjEwNjg3NzIwM30.xRAS43cPgFrOMqIiUbPUymoGW5pCelMIHdgHvaQUrCU';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


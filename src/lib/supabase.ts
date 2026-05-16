import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Order {
  id: string;
  student_name: string;
  track: string;
  restaurant: string;
  items: string;
  delivery_fee?: number;
  session_id: string;
  created_at: string;
}

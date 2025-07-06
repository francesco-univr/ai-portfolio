import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export const getSupabaseClient = () => {
  if (client) return client;

  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

  if (!url || !anonKey) {
    throw new Error('Supabase credentials not provided. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  }

  client = createClient(url, anonKey);
  return client;
};
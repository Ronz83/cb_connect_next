import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://beazuqogozbjltunxjhd.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlYXp1cW9nb3piamx0dW54amhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNzExMzEsImV4cCI6MjA4NTY0NzEzMX0.j3A1WbDylwvmX4Kg3fRDQe6FEP8GH6IjcUoUp1JTlWI';

console.log('Supabase URL:', supabaseUrl);
export const supabase = createBrowserClient(supabaseUrl, supabaseKey);

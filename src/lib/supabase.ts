let supabase: any = null;

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (url && anonKey) {
  const moduleName = '@supabase/supabase-js';
  try {
    const { createClient } = await import(moduleName);
    supabase = createClient(url, anonKey);
  } catch {
    supabase = null;
  }
}

export { supabase };

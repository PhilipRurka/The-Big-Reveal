import { createClient } from "@supabase/supabase-js";

const getSupabase = (access_token: string) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_KEY as string
  );
  
  if (access_token) {
    supabase.auth.session = () => ({
      access_token,
    });
  }

  return supabase;
};

export { getSupabase };
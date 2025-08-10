import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zrdjrbblclnglisykcht.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE;

export const supabase = createClient(supabaseUrl, supabaseKey);

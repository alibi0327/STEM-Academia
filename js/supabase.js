import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY.includes("PASTE_")) {
  console.warn("STEM Academia: укажите Supabase Publishable/anon key в js/config.js");
}
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

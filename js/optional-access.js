import {supabase} from "./supabase.js";
export async function ensureOptionalAccess(slug){
  const {data,error}=await supabase.rpc("ensure_optional_course_access",{p_course_slug:slug});
  if(error) throw error;
  return data;
}

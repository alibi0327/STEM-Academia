import { supabase } from "./supabase.js";
import { LOGIN_DOMAIN } from "./config.js";

export const $ = (id) => document.getElementById(id);
export const esc = (v="") => String(v).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

export function loginToEmail(login) {
  const value = String(login || "").trim().toLowerCase();
  return value.includes("@") ? value : `${value}@${LOGIN_DOMAIN}`;
}

export async function getSessionProfile() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { session:null, profile:null };
  const { data: profile, error } = await supabase.from("profiles")
    .select("id,full_name,username,role,school_id,active,schools(name,city)")
    .eq("id", session.user.id).single();
  if (error) throw error;
  return { session, profile };
}

export async function requireRole(role) {
  try {
    const { session, profile } = await getSessionProfile();
    if (!session || !profile?.active || (role && profile.role !== role)) {
      await supabase.auth.signOut();
      location.replace("index.html");
      return null;
    }
    return { session, profile };
  } catch (e) {
    console.error(e);
    location.replace("index.html");
    return null;
  }
}

export async function logout() {
  await supabase.auth.signOut();
  location.replace("index.html");
}

export function fmtDate(value) {
  return value ? new Date(value).toLocaleDateString("ru-RU") : "—";
}
export function fmtDateTime(value) {
  return value ? new Date(value).toLocaleString("ru-RU") : "—";
}

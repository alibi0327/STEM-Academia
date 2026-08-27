import { supabase } from "./supabase.js";
import { loginToEmail, getSessionProfile, $ } from "./utils.js";

async function route() {
  const { session, profile } = await getSessionProfile();
  if (!session || !profile) return false;
  if (!profile.active) { await supabase.auth.signOut(); return false; }
  location.replace(profile.role === "admin" ? "admin.html" : "teacher.html");
  return true;
}
route().catch(console.error);

$("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  $("loginError").textContent = "";
  const email = loginToEmail($("login").value);
  const password = $("password").value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    $("loginError").textContent = "Неверный логин или пароль.";
    return;
  }
  try { await route(); }
  catch (err) { $("loginError").textContent = "Не удалось загрузить профиль пользователя."; console.error(err); }
});

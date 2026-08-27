import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const authHeader = req.headers.get("Authorization") || "";

    const caller = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
    const { data: { user } } = await caller.auth.getUser();
    if (!user) throw new Error("Не авторизован");

    const admin = createClient(supabaseUrl, serviceRole);
    const { data: profile } = await admin.from("profiles").select("role,active").eq("id", user.id).single();
    if (profile?.role !== "admin" || !profile?.active) throw new Error("Только администратор может создавать учителей");

    const body = await req.json();
    const { full_name, login, password, school_id, course_id } = body;
    if (!full_name || !login || !password || !school_id || !course_id) throw new Error("Заполните все поля");
    if (String(password).length < 6) throw new Error("Пароль должен быть минимум 6 символов");

    const username = String(login).trim().toLowerCase().replace(/[^a-z0-9._-]/g, "");
    if (!username) throw new Error("Некорректный логин");
    const email = `${username}@stem-academia.local`;

    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email, password, email_confirm: true, user_metadata: { full_name, username }
    });
    if (createError) throw createError;

    const uid = created.user.id;
    const { error: profileError } = await admin.from("profiles").insert({
      id: uid, full_name, username, role: "teacher", school_id, active: true
    });
    if (profileError) {
      await admin.auth.admin.deleteUser(uid);
      throw profileError;
    }

    const { error: courseError } = await admin.from("teacher_courses").insert({
      teacher_id: uid, course_id, status: "assigned"
    });
    if (courseError) {
      await admin.from("profiles").delete().eq("id", uid);
      await admin.auth.admin.deleteUser(uid);
      throw courseError;
    }

    return new Response(JSON.stringify({ ok: true, user_id: uid, login: username }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message || String(e) }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});

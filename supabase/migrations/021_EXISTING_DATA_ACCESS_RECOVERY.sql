-- ============================================================
-- STEM ACADEMIA V3 — EXISTING DATA ACCESS RECOVERY
-- SAFE PATCH: does NOT delete users, schools, progress or certificates.
-- Purpose: restore visibility of existing administrator/teachers after V3 RLS.
-- ============================================================

-- Security-definer helpers prevent recursive RLS checks on profiles.
create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select p.role
  from public.profiles p
  where p.id = auth.uid()
  limit 1
$$;

create or replace function public.current_user_school_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select p.school_id
  from public.profiles p
  where p.id = auth.uid()
  limit 1
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
      and p.active = true
  )
$$;

create or replace function public.is_school_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'school_admin'
      and p.active = true
  )
$$;

create or replace function public.can_manage_school(p_school uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.is_admin()
    or (
      public.is_school_admin()
      and public.current_user_school_id() = p_school
    )
$$;

create or replace function public.can_view_teacher(p_teacher uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    p_teacher = auth.uid()
    or public.is_admin()
    or (
      public.is_school_admin()
      and exists(
        select 1
        from public.profiles t
        where t.id = p_teacher
          and t.school_id = public.current_user_school_id()
      )
    )
$$;

grant execute on function public.current_user_role() to authenticated;
grant execute on function public.current_user_school_id() to authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_school_admin() to authenticated;
grant execute on function public.can_manage_school(uuid) to authenticated;
grant execute on function public.can_view_teacher(uuid) to authenticated;

-- Ensure RLS remains enabled.
alter table public.schools enable row level security;
alter table public.profiles enable row level security;
alter table public.teacher_courses enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.test_results enable row level security;
alter table public.certificates enable row level security;

-- Replace ONLY policies for core existing-data tables.
do $$
declare r record;
begin
  for r in
    select policyname, tablename
    from pg_policies
    where schemaname = 'public'
      and tablename in (
        'schools',
        'profiles',
        'teacher_courses',
        'lesson_progress',
        'test_results',
        'certificates'
      )
  loop
    execute format(
      'drop policy if exists %I on public.%I',
      r.policyname,
      r.tablename
    );
  end loop;
end $$;

-- SCHOOLS
create policy schools_access_read
on public.schools
for select
to authenticated
using (
  public.is_admin()
  or id = public.current_user_school_id()
);

create policy schools_admin_insert
on public.schools
for insert
to authenticated
with check (public.is_admin());

create policy schools_admin_update
on public.schools
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy schools_admin_delete
on public.schools
for delete
to authenticated
using (public.is_admin());

-- PROFILES
create policy profiles_access_read
on public.profiles
for select
to authenticated
using (
  id = auth.uid()
  or public.is_admin()
  or (
    public.is_school_admin()
    and school_id = public.current_user_school_id()
  )
);

create policy profiles_self_or_manager_update
on public.profiles
for update
to authenticated
using (
  id = auth.uid()
  or public.is_admin()
  or (
    public.is_school_admin()
    and school_id = public.current_user_school_id()
  )
)
with check (
  id = auth.uid()
  or public.is_admin()
  or (
    public.is_school_admin()
    and school_id = public.current_user_school_id()
  )
);

create policy profiles_admin_insert
on public.profiles
for insert
to authenticated
with check (public.is_admin());

create policy profiles_admin_delete
on public.profiles
for delete
to authenticated
using (public.is_admin());

-- TEACHER COURSE ASSIGNMENTS
create policy teacher_courses_access_read
on public.teacher_courses
for select
to authenticated
using (
  teacher_id = auth.uid()
  or public.is_admin()
  or (
    public.is_school_admin()
    and exists(
      select 1
      from public.profiles t
      where t.id = teacher_id
        and t.school_id = public.current_user_school_id()
    )
  )
);

create policy teacher_courses_manager_insert
on public.teacher_courses
for insert
to authenticated
with check (
  public.is_admin()
  or (
    public.is_school_admin()
    and exists(
      select 1
      from public.profiles t
      where t.id = teacher_id
        and t.school_id = public.current_user_school_id()
    )
  )
);

create policy teacher_courses_manager_update
on public.teacher_courses
for update
to authenticated
using (
  public.is_admin()
  or (
    public.is_school_admin()
    and exists(
      select 1
      from public.profiles t
      where t.id = teacher_id
        and t.school_id = public.current_user_school_id()
    )
  )
)
with check (
  public.is_admin()
  or (
    public.is_school_admin()
    and exists(
      select 1
      from public.profiles t
      where t.id = teacher_id
        and t.school_id = public.current_user_school_id()
    )
  )
);

create policy teacher_courses_manager_delete
on public.teacher_courses
for delete
to authenticated
using (
  public.is_admin()
  or (
    public.is_school_admin()
    and exists(
      select 1
      from public.profiles t
      where t.id = teacher_id
        and t.school_id = public.current_user_school_id()
    )
  )
);

-- LESSON PROGRESS
create policy lesson_progress_access_read
on public.lesson_progress
for select
to authenticated
using (public.can_view_teacher(teacher_id));

create policy lesson_progress_self_insert
on public.lesson_progress
for insert
to authenticated
with check (
  teacher_id = auth.uid()
  or public.is_admin()
);

create policy lesson_progress_self_update
on public.lesson_progress
for update
to authenticated
using (
  teacher_id = auth.uid()
  or public.is_admin()
)
with check (
  teacher_id = auth.uid()
  or public.is_admin()
);

create policy lesson_progress_admin_delete
on public.lesson_progress
for delete
to authenticated
using (public.is_admin());

-- TEST RESULTS
create policy test_results_access_read
on public.test_results
for select
to authenticated
using (public.can_view_teacher(teacher_id));

create policy test_results_self_insert
on public.test_results
for insert
to authenticated
with check (
  teacher_id = auth.uid()
  or public.is_admin()
);

create policy test_results_admin_update
on public.test_results
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy test_results_admin_delete
on public.test_results
for delete
to authenticated
using (public.is_admin());

-- CERTIFICATES
create policy certificates_access_read
on public.certificates
for select
to authenticated
using (public.can_view_teacher(teacher_id));

create policy certificates_admin_insert
on public.certificates
for insert
to authenticated
with check (public.is_admin());

create policy certificates_admin_update
on public.certificates
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy certificates_admin_delete
on public.certificates
for delete
to authenticated
using (public.is_admin());

-- Small diagnostic RPC for checking that the current account sees existing data.
create or replace function public.get_access_health()
returns table(
  user_id uuid,
  role text,
  active boolean,
  school_id uuid,
  visible_profiles bigint,
  visible_teachers bigint,
  visible_schools bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select
    p.id,
    p.role,
    p.active,
    p.school_id,
    case
      when p.role = 'admin' and p.active then
        (select count(*) from public.profiles)
      when p.role = 'school_admin' and p.active then
        (select count(*) from public.profiles x where x.school_id = p.school_id)
      else 1
    end::bigint,
    case
      when p.role = 'admin' and p.active then
        (select count(*) from public.profiles x where x.role = 'teacher')
      when p.role = 'school_admin' and p.active then
        (select count(*) from public.profiles x where x.role = 'teacher' and x.school_id = p.school_id)
      else 0
    end::bigint,
    case
      when p.role = 'admin' and p.active then
        (select count(*) from public.schools)
      when p.school_id is not null then 1
      else 0
    end::bigint
  from public.profiles p
  where p.id = auth.uid()
  limit 1
$$;

grant execute on function public.get_access_health() to authenticated;

-- IMPORTANT:
-- No DELETE/TRUNCATE is executed against user data.
-- Existing rows in profiles, schools, teacher_courses, lesson_progress,
-- test_results and certificates are preserved.

-- 015_optional_courses_free_access.sql
-- Дополнительные курсы доступны активному учителю без назначения администратором.
-- При открытии курса запись teacher_courses создаётся автоматически.

create or replace function public.ensure_optional_course_access(p_course_slug text)
returns uuid
language plpgsql
security definer
set search_path=public
as $$
declare
  tid uuid := auth.uid();
  cid uuid;
begin
  if tid is null then
    raise exception 'Необходим вход в аккаунт';
  end if;

  if not exists (
    select 1 from profiles
    where id=tid and role='teacher' and active=true
  ) then
    raise exception 'Доступ разрешён только активному учителю';
  end if;

  select c.id into cid
  from courses c
  join optional_course_catalog o on o.course_id=c.id
  where c.slug=p_course_slug
    and c.active=true
    and o.active=true;

  if cid is null then
    raise exception 'Дополнительный курс не найден';
  end if;

  insert into teacher_courses(teacher_id,course_id,status,assigned_at)
  values(tid,cid,'assigned',now())
  on conflict(teacher_id,course_id) do nothing;

  return cid;
end;
$$;

grant execute on function public.ensure_optional_course_access(text) to authenticated;

-- Старую функцию оставляем совместимой, но она теперь просто вызывает свободный доступ.
create or replace function public.start_optional_course(p_course_slug text)
returns uuid
language sql
security definer
set search_path=public
as $$
  select public.ensure_optional_course_access(p_course_slug);
$$;

grant execute on function public.start_optional_course(text) to authenticated;

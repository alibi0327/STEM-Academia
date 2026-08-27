-- 003_multi_course.sql
-- Схема teacher_courses уже поддерживает несколько разных курсов одному учителю.
-- Этот файл гарантирует уникальность пары "учитель + курс" и права администратора.

create unique index if not exists teacher_courses_teacher_course_uidx
on public.teacher_courses(teacher_id, course_id);

-- Политики могли быть созданы ранее. Здесь ничего не удаляем.
-- Проверка: администратор должен иметь возможность добавлять назначения.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='teacher_courses'
      and policyname='admin_assign_multiple_courses'
  ) then
    create policy admin_assign_multiple_courses
      on public.teacher_courses
      for insert
      to authenticated
      with check (public.is_admin());
  end if;
end $$;

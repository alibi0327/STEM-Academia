-- STEM Academia FULL schema / migration
-- Можно запускать повторно: основные операции сделаны идемпотентными.

create extension if not exists pgcrypto;

create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text,
  address text,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  username text unique,
  role text not null default 'teacher' check (role in ('admin','teacher')),
  school_id uuid references public.schools(id) on delete set null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  equipment text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  description text,
  lesson_order integer not null,
  duration_minutes integer,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique(course_id,lesson_order)
);

create table if not exists public.teacher_courses (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  started_at timestamptz,
  completed_at timestamptz,
  status text not null default 'assigned' check(status in ('assigned','in_progress','completed')),
  unique(teacher_id,course_id)
);

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  started_at timestamptz,
  completed_at timestamptz,
  score numeric(5,2),
  status text not null default 'not_started' check(status in ('not_started','in_progress','completed')),
  updated_at timestamptz not null default now(),
  unique(teacher_id,lesson_id)
);

create table if not exists public.test_results (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete set null,
  score numeric(5,2),
  answers jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  certificate_number text unique not null,
  issue_date timestamptz not null default now(),
  final_score numeric(5,2),
  created_at timestamptz not null default now(),
  unique(teacher_id,course_id)
);

insert into public.courses(title,slug,description,equipment)
values ('Обучение работе с LabDisc','labdisc','Полный курс по цифровой лаборатории LabDisc: настройка, датчики, эксперименты и анализ данных.','LabDisc')
on conflict(slug) do update set title=excluded.title,description=excluded.description,equipment=excluded.equipment,active=true;

-- 11 записей синхронизированы с порядком учебного интерфейса.
with c as (select id from public.courses where slug='labdisc')
insert into public.lessons(course_id,title,description,lesson_order,duration_minutes)
select c.id,v.title,v.description,v.ord,v.minutes from c cross join (values
 ('Что такое LabDisc','Знакомство с цифровой лабораторией',1,20),
 ('Модели LabDisc','Основные модели и назначение',2,20),
 ('Устройство LabDisc','Основные элементы устройства',3,25),
 ('Подготовка к работе','Заряд, включение и проверка',4,20),
 ('Подключение','USB и беспроводное подключение',5,25),
 ('GlobiLab','Интерфейс программного обеспечения',6,30),
 ('Датчики','Работа со встроенными и внешними датчиками',7,35),
 ('Проведение измерений','Запуск эксперимента и сбор данных',8,35),
 ('Графики и анализ','Визуализация и анализ данных',9,30),
 ('Сохранение результатов','Экспорт и сохранение результатов',10,20),
 ('Практическая работа','Самостоятельный эксперимент и вывод',11,45)
) as v(title,description,ord,minutes)
on conflict(course_id,lesson_order) do update set title=excluded.title,description=excluded.description,duration_minutes=excluded.duration_minutes,active=true;

alter table public.schools enable row level security;
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.teacher_courses enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.test_results enable row level security;
alter table public.certificates enable row level security;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path=public as $$
 select exists(select 1 from public.profiles where id=auth.uid() and role='admin' and active=true)
$$;
grant execute on function public.is_admin() to authenticated;

-- Clean policies so this file can be re-run.
do $$ declare r record; begin
 for r in select policyname,tablename from pg_policies where schemaname='public' and tablename in ('schools','profiles','courses','lessons','teacher_courses','lesson_progress','test_results','certificates')
 loop execute format('drop policy if exists %I on public.%I',r.policyname,r.tablename); end loop;
end $$;

create policy schools_admin_all on public.schools for all to authenticated using(public.is_admin()) with check(public.is_admin());
create policy schools_teacher_read on public.schools for select to authenticated using(id=(select school_id from public.profiles where id=auth.uid()));

create policy profile_self_read on public.profiles for select to authenticated using(id=auth.uid() or public.is_admin());
create policy profile_admin_insert on public.profiles for insert to authenticated with check(public.is_admin());
create policy profile_admin_update on public.profiles for update to authenticated using(public.is_admin()) with check(public.is_admin());

create policy course_read on public.courses for select to authenticated using(active or public.is_admin());
create policy course_admin_write on public.courses for all to authenticated using(public.is_admin()) with check(public.is_admin());

create policy lesson_read on public.lessons for select to authenticated using(active or public.is_admin());
create policy lesson_admin_write on public.lessons for all to authenticated using(public.is_admin()) with check(public.is_admin());

create policy tc_read on public.teacher_courses for select to authenticated using(teacher_id=auth.uid() or public.is_admin());
create policy tc_admin_write on public.teacher_courses for all to authenticated using(public.is_admin()) with check(public.is_admin());

create policy progress_read on public.lesson_progress for select to authenticated using(teacher_id=auth.uid() or public.is_admin());
create policy progress_insert on public.lesson_progress for insert to authenticated with check(teacher_id=auth.uid() or public.is_admin());
create policy progress_update on public.lesson_progress for update to authenticated using(teacher_id=auth.uid() or public.is_admin()) with check(teacher_id=auth.uid() or public.is_admin());

create policy tests_read on public.test_results for select to authenticated using(teacher_id=auth.uid() or public.is_admin());
create policy tests_insert on public.test_results for insert to authenticated with check(teacher_id=auth.uid() or public.is_admin());

create policy cert_read on public.certificates for select to authenticated using(teacher_id=auth.uid() or public.is_admin());
create policy cert_admin_write on public.certificates for all to authenticated using(public.is_admin()) with check(public.is_admin());

-- Сертификат выдается только текущему учителю после всех уроков и теста >=80.
create or replace function public.issue_labdisc_certificate()
returns text
language plpgsql
security definer
set search_path=public
as $$
declare
  v_teacher uuid := auth.uid();
  v_course uuid;
  v_total int;
  v_done int;
  v_score numeric;
  v_number text;
begin
  select id into v_course from courses where slug='labdisc' and active=true;
  if v_course is null then raise exception 'Курс LabDisc не найден'; end if;

  if not exists(select 1 from profiles where id=v_teacher and role='teacher' and active=true) then
    raise exception 'Доступ запрещен';
  end if;
  if not exists(select 1 from teacher_courses where teacher_id=v_teacher and course_id=v_course) then
    raise exception 'Курс не назначен';
  end if;

  select count(*) into v_total from lessons where course_id=v_course and active=true;
  select count(*) into v_done from lesson_progress lp join lessons l on l.id=lp.lesson_id
    where lp.teacher_id=v_teacher and l.course_id=v_course and l.active=true and lp.status='completed';
  if v_done < v_total then raise exception 'Не все занятия завершены'; end if;

  select max(score) into v_score from test_results tr
    join lessons l on l.id=tr.lesson_id
    where tr.teacher_id=v_teacher and l.course_id=v_course;
  if coalesce(v_score,0) < 80 then raise exception 'Итоговый тест не пройден'; end if;

  select certificate_number into v_number from certificates where teacher_id=v_teacher and course_id=v_course;
  if v_number is not null then return v_number; end if;

  v_number := 'STEM-LD-'||to_char(now(),'YYYY')||'-'||upper(substr(replace(v_teacher::text,'-',''),1,8));
  insert into certificates(teacher_id,course_id,certificate_number,final_score)
  values(v_teacher,v_course,v_number,v_score);
  update teacher_courses set status='completed',completed_at=coalesce(completed_at,now()) where teacher_id=v_teacher and course_id=v_course;
  return v_number;
end $$;
grant execute on function public.issue_labdisc_certificate() to authenticated;

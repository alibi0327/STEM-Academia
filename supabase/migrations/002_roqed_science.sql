insert into public.courses(title,slug,description,equipment) values ('Обучение работе с ROQED Science','roqed-science','Курс для учителей: интерфейс, 3D-модели, режимы и применение ROQED Science на уроке.','ROQED Science') on conflict(slug) do update set title=excluded.title,description=excluded.description,equipment=excluded.equipment,active=true;
with c as(select id from public.courses where slug='roqed-science') insert into public.lessons(course_id,title,description,lesson_order,duration_minutes)
select c.id,v.t,v.d,v.o,v.m from c cross join(values
('Знакомство с ROQED Science','Назначение программы',1,20),('Установка, запуск и активация','Подготовка рабочего места',2,20),('Главный экран и библиотека','Категории и поиск',3,20),('Навигация по 3D-модели','Управление моделью',4,25),('Режим Study / Изучение','Исследование структуры',5,30),('Разбор модели и объекты','Составные части',6,30),('Режим Animation / Анимация','Процессы и сцены',7,30),('Режим Slides / Слайды','Последовательная подача',8,25),('Practice и проверка понимания','Интерактивные задания',9,30),('Подготовка интерактивного урока','От цели к модели',10,35),('Проведение урока в классе','Методика',11,35),('Практическая работа','Самостоятельный сценарий',12,45))v(t,d,o,m)
on conflict(course_id,lesson_order) do update set title=excluded.title,description=excluded.description,duration_minutes=excluded.duration_minutes,active=true;

create or replace function public.issue_course_certificate(p_course_slug text) returns text language plpgsql security definer set search_path=public as $$
declare u uuid:=auth.uid();c uuid;total int;done int;score numeric;num text;pref text;
begin
select id into c from courses where slug=p_course_slug and active=true;if c is null then raise exception 'Курс не найден';end if;
if not exists(select 1 from teacher_courses where teacher_id=u and course_id=c) then raise exception 'Курс не назначен';end if;
select count(*) into total from lessons where course_id=c and active=true;
select count(*) into done from lesson_progress p join lessons l on l.id=p.lesson_id where p.teacher_id=u and l.course_id=c and l.active=true and p.status='completed';
if done<total then raise exception 'Не все занятия завершены';end if;
select max(t.score) into score from test_results t join lessons l on l.id=t.lesson_id where t.teacher_id=u and l.course_id=c;
if coalesce(score,0)<80 then raise exception 'Тест не пройден';end if;
select certificate_number into num from certificates where teacher_id=u and course_id=c;if num is not null then return num;end if;
pref:=case when p_course_slug='roqed-science' then 'RQ' else 'CRS' end;num:='STEM-'||pref||'-'||to_char(now(),'YYYY')||'-'||upper(substr(replace(u::text,'-',''),1,8));
insert into certificates(teacher_id,course_id,certificate_number,final_score)values(u,c,num,score);update teacher_courses set status='completed',completed_at=now() where teacher_id=u and course_id=c;return num;end $$;
grant execute on function public.issue_course_certificate(text) to authenticated;
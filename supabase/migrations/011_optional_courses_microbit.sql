-- 011_optional_courses_microbit.sql
create table if not exists public.optional_course_catalog(
 course_id uuid primary key references public.courses(id) on delete cascade,
 sort_order int not null default 100,
 active boolean not null default true,
 created_at timestamptz not null default now()
);

insert into public.courses(title,slug,description,equipment)
values('BBC micro:bit — полный курс','bbc-microbit','Дополнительный курс по micro:bit: MakeCode, матрица, кнопки, датчики, радио, Python, проекты и методика для учителя.','BBC micro:bit')
on conflict(slug) do update set title=excluded.title,description=excluded.description,equipment=excluded.equipment,active=true;

with c as(select id from public.courses where slug='bbc-microbit')
insert into public.lessons(course_id,title,description,lesson_order,duration_minutes)
select c.id,v.t,v.d,v.o,v.m from c cross join(values ('Что такое BBC micro:bit','Мини-компьютер для обучения',1,25),('Матрица 5×5','25 встроенных светодиодов',2,25),('Кнопки A и B','Физический ввод',3,25),('Контакты и разъёмы','Подключение и питание',4,25),('Встроенные датчики','Движение, температура, свет и другие данные',5,25),('Открываем Microsoft MakeCode','Блочное программирование в браузере',6,25),('Симулятор micro:bit','Проверка без платы',7,25),('Блок on start','Команды при запуске',8,25),('Блок forever','Постоянное повторение',9,25),('Загрузка программы на плату','От проекта к micro:bit',10,25),('Последовательность','Команды по порядку',11,25),('Паузы и время','Управление темпом',12,25),('Циклы','Повторение',13,25),('Условия if','Выбор действия',14,25),('Переменные','Хранение данных',15,25),('Случайные числа','Элемент случайности',16,25),('Кнопка A','Событие',17,25),('Кнопка B','Второе событие',18,25),('A+B','Комбинация кнопок',19,25),('Жест shake','Акселерометр',20,25),('Наклон платы','Ориентация',21,25),('Уровень освещённости','Свет как данные',22,25),('Температура','Измеряемые данные',23,25),('Компас','Направление',24,25),('Акселерометр','Ускорение по осям',25,25),('Радиосвязь micro:bit','Плата ↔ плата',26,25),('Передача числа','Сообщения между платами',27,25),('Передача строки','Текстовое сообщение',28,25),('Радио-пульт','Удалённая команда',29,25),('Электронный бейдж','Имя и анимация',30,25),('Счётчик','Кнопки + переменная',31,25),('Камень-ножницы-бумага','Случайность + жест',32,25),('Таймер','Время + события',33,25),('Термометр-индикатор','Данные + условие',34,25),('Индикатор света','Освещённость + условие',35,25),('Python Editor для micro:bit','Переход от блоков к тексту',36,25),('Первая программа Python','Вывод на дисплей',37,25),('Переменные в Python','Данные текстом',38,25),('Условия в Python','Логика текстом',39,25),('Циклы в Python','Повторение текстом',40,25),('micro:bit Classroom','Организация занятия',41,25),('Задание на 20 минут','Мини-урок',42,25),('Дифференциация задания','Базовый и продвинутый уровень',43,25),('Собственный проект','Идея → алгоритм → программа',44,25),('Итоговая практическая демонстрация','Полный цикл micro:bit',45,25))v(t,d,o,m)
on conflict(course_id,lesson_order) do update set title=excluded.title,description=excluded.description,duration_minutes=excluded.duration_minutes,active=true;

insert into public.optional_course_catalog(course_id,sort_order,active)
select id,10,true from public.courses where slug='bbc-microbit'
on conflict(course_id) do update set sort_order=excluded.sort_order,active=true;

create or replace function public.get_optional_courses()
returns table(course_id uuid,title text,slug text,description text,equipment text,lesson_count bigint,is_started boolean)
language sql security definer set search_path=public stable as $$
 select c.id,c.title,c.slug,c.description,c.equipment,
        (select count(*) from lessons l where l.course_id=c.id and l.active=true),
        exists(select 1 from teacher_courses tc where tc.teacher_id=auth.uid() and tc.course_id=c.id)
 from optional_course_catalog o join courses c on c.id=o.course_id
 where o.active=true and c.active=true
   and exists(select 1 from profiles p where p.id=auth.uid() and p.role='teacher' and p.active=true)
 order by o.sort_order,c.title
$$;
grant execute on function public.get_optional_courses() to authenticated;

create or replace function public.start_optional_course(p_course_slug text)
returns uuid language plpgsql security definer set search_path=public as $$
declare cid uuid; tid uuid:=auth.uid();
begin
 if not exists(select 1 from profiles where id=tid and role='teacher' and active=true) then raise exception 'Доступ запрещен'; end if;
 select c.id into cid from courses c join optional_course_catalog o on o.course_id=c.id
 where c.slug=p_course_slug and c.active=true and o.active=true;
 if cid is null then raise exception 'Дополнительный курс не найден'; end if;
 insert into teacher_courses(teacher_id,course_id,status,assigned_at)
 values(tid,cid,'assigned',now()) on conflict(teacher_id,course_id) do nothing;
 return cid;
end $$;
grant execute on function public.start_optional_course(text) to authenticated;

create or replace function public.issue_course_certificate(p_course_slug text)
returns text language plpgsql security definer set search_path=public as $$
declare u uuid:=auth.uid();c uuid;total int;done int;score numeric;num text;pref text;
begin
select id into c from courses where slug=p_course_slug and active=true;if c is null then raise exception 'Курс не найден';end if;
if not exists(select 1 from profiles where id=u and role='teacher' and active=true) then raise exception 'Доступ запрещен';end if;
if not exists(select 1 from teacher_courses where teacher_id=u and course_id=c) then raise exception 'Курс не назначен';end if;
select count(*) into total from lessons where course_id=c and active=true;
select count(*) into done from lesson_progress p join lessons l on l.id=p.lesson_id where p.teacher_id=u and l.course_id=c and l.active=true and p.status='completed';if done<total then raise exception 'Не все занятия завершены';end if;
select max(t.score) into score from test_results t join lessons l on l.id=t.lesson_id where t.teacher_id=u and l.course_id=c;if coalesce(score,0)<80 then raise exception 'Тест не пройден';end if;
select certificate_number into num from certificates where teacher_id=u and course_id=c;if num is not null then return num;end if;
pref:=case when p_course_slug='bbc-microbit' then 'MBIT' when p_course_slug='lego-spike-prime' then 'SPIKE' when p_course_slug='ruida-rdworks8-medium' then 'LASER' when p_course_slug='flashforge-adventurer-5m-pro' then '3DP' when p_course_slug='raspberry-pi-4' then 'RPI' when p_course_slug='arduino' then 'ARD' else 'CRS' end;
num:='STEM-'||pref||'-'||to_char(now(),'YYYY')||'-'||upper(substr(replace(u::text,'-',''),1,8));
insert into certificates(teacher_id,course_id,certificate_number,final_score)values(u,c,num,score);update teacher_courses set status='completed',completed_at=now() where teacher_id=u and course_id=c;return num;
end $$;grant execute on function public.issue_course_certificate(text) to authenticated;

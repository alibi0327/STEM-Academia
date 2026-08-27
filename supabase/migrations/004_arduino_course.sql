-- 004_arduino_course.sql
insert into public.courses(title,slug,description,equipment)
values (
 'Обучение работе с Arduino',
 'arduino',
 'Базовый практический курс для учителей: плата Arduino, Arduino IDE, цифровые и аналоговые входы/выходы, PWM, датчики и Serial Monitor.',
 'Arduino'
)
on conflict(slug) do update set title=excluded.title,description=excluded.description,equipment=excluded.equipment,active=true;

with c as(select id from public.courses where slug='arduino')
insert into public.lessons(course_id,title,description,lesson_order,duration_minutes)
select c.id,v.t,v.d,v.o,v.m from c cross join(values
('Знакомство с Arduino','Назначение платформы',1,20),
('Плата Arduino Uno','Основные элементы и выводы',2,25),
('Питание и безопасность','Правила безопасного подключения',3,20),
('Arduino IDE','Создание и загрузка программы',4,30),
('setup() и loop()','Структура программы Arduino',5,25),
('Цифровой выход и LED','digitalWrite и управление светодиодом',6,30),
('Кнопка и цифровой вход','digitalRead и работа с кнопкой',7,30),
('Аналоговый вход','analogRead и чтение датчиков',8,30),
('PWM и регулировка яркости','analogWrite и PWM',9,30),
('Serial Monitor','Вывод данных и отладка',10,25),
('Подключение датчика','Общий алгоритм работы с сенсорами',11,35),
('Итоговый Arduino-проект','Практическая работа',12,45)
)v(t,d,o,m)
on conflict(course_id,lesson_order) do update
set title=excluded.title,description=excluded.description,duration_minutes=excluded.duration_minutes,active=true;

-- Обновляем универсальную функцию сертификатов, добавляя префикс Arduino.
create or replace function public.issue_course_certificate(p_course_slug text)
returns text language plpgsql security definer set search_path=public as $$
declare u uuid:=auth.uid();c uuid;total int;done int;score numeric;num text;pref text;
begin
 select id into c from courses where slug=p_course_slug and active=true;
 if c is null then raise exception 'Курс не найден';end if;
 if not exists(select 1 from profiles where id=u and role='teacher' and active=true) then raise exception 'Доступ запрещен';end if;
 if not exists(select 1 from teacher_courses where teacher_id=u and course_id=c) then raise exception 'Курс не назначен';end if;
 select count(*) into total from lessons where course_id=c and active=true;
 select count(*) into done from lesson_progress p join lessons l on l.id=p.lesson_id where p.teacher_id=u and l.course_id=c and l.active=true and p.status='completed';
 if done<total then raise exception 'Не все занятия завершены';end if;
 select max(t.score) into score from test_results t join lessons l on l.id=t.lesson_id where t.teacher_id=u and l.course_id=c;
 if coalesce(score,0)<80 then raise exception 'Тест не пройден';end if;
 select certificate_number into num from certificates where teacher_id=u and course_id=c;
 if num is not null then return num;end if;
 pref:=case when p_course_slug='roqed-science' then 'RQ' when p_course_slug='labdisc' then 'LD' when p_course_slug='arduino' then 'ARD' else 'CRS' end;
 num:='STEM-'||pref||'-'||to_char(now(),'YYYY')||'-'||upper(substr(replace(u::text,'-',''),1,8));
 insert into certificates(teacher_id,course_id,certificate_number,final_score)values(u,c,num,score);
 update teacher_courses set status='completed',completed_at=now() where teacher_id=u and course_id=c;
 return num;
end $$;
grant execute on function public.issue_course_certificate(text) to authenticated;

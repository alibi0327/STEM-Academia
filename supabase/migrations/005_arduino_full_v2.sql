-- 005_arduino_full_v2.sql
-- Полная версия курса Arduino. Прогресс старой версии Arduino очищается,
-- чтобы учитель прошёл новую программу последовательно с первого занятия.

delete from public.lesson_progress
where lesson_id in (select id from public.lessons where course_id=(select id from public.courses where slug='arduino'));

delete from public.test_results
where lesson_id in (select id from public.lessons where course_id=(select id from public.courses where slug='arduino'));

delete from public.certificates
where course_id=(select id from public.courses where slug='arduino');

delete from public.lessons
where course_id=(select id from public.courses where slug='arduino');

update public.teacher_courses
set status='assigned',started_at=null,completed_at=null
where course_id=(select id from public.courses where slug='arduino');

update public.courses set
 title='Полный курс Arduino: от установки ПО до первого проекта',
 description='Практический курс для учителей: устройство Arduino Uno, безопасность, установка Arduino IDE, подключение платы, Blink, breadboard, LED, кнопка, аналоговый вход, PWM, Serial Monitor и первый мини-проект.',
 equipment='Arduino Uno'
where slug='arduino';

with c as(select id from public.courses where slug='arduino')
insert into public.lessons(course_id,title,description,lesson_order,duration_minutes)
select c.id,v.t,v.d,v.o,v.m from c cross join(values
('Что такое Arduino','Первое знакомство с платформой',1,20),('Устройство Arduino Uno','Разъёмы, выводы и элементы платы',2,25),('Безопасная работа','Правила перед первым подключением',3,20),('Установка Arduino IDE','Подготовка компьютера',4,30),('Подключение платы к компьютеру','USB, Board и Port',5,25),('Первый запуск: Blink','Загрузка готового примера',6,30),('setup(), loop() и delay()','Как работает первый скетч',7,25),('Макетная плата','Как соединять компоненты без пайки',8,25),('Светодиод и резистор','Подготовка первого внешнего компонента',9,25),('Подключение внешнего LED','Первая схема на breadboard',10,35),('Управление внешним LED','digitalWrite на практике',11,30),('Кнопка как цифровой вход','Управление действием пользователя',12,35),('Аналоговый вход и потенциометр','Чтение изменяющегося значения',13,35),('PWM и яркость LED','Плавное управление',14,30),('Serial Monitor','Наблюдение за программой',15,25),('Первый мини-проект','Вход → логика → выход',16,45),('Проверка навыков','Подготовка к итоговому тесту',17,30)
)v(t,d,o,m);

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

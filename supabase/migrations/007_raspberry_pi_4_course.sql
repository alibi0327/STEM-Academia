-- 007_raspberry_pi_4_course.sql
insert into public.courses(title,slug,description,equipment)
values('Полный курс Raspberry Pi 4','raspberry-pi-4','Практический курс: Raspberry Pi OS, Imager, первый запуск, Linux, Python, GPIO и учебный мини-проект.','Raspberry Pi 4')
on conflict(slug) do update set title=excluded.title,description=excluded.description,equipment=excluded.equipment,active=true;
with c as(select id from public.courses where slug='raspberry-pi-4')
insert into public.lessons(course_id,title,description,lesson_order,duration_minutes)
select c.id,v.t,v.d,v.o,v.m from c cross join(values ('Что такое Raspberry Pi 4','Одноплатный компьютер и его возможности',1,30),('Порты Raspberry Pi 4','USB, Ethernet, micro-HDMI, USB-C, GPIO и microSD',2,30),('Безопасная подготовка','Правильное подключение и выключение',3,30),('Скачать Raspberry Pi Imager','Официальная программа записи ОС',4,30),('Выбор Raspberry Pi OS','64-bit система для Raspberry Pi 4',5,30),('Запись ОС на microSD','Device → OS → Storage → Write',6,30),('Предварительная настройка Imager','Имя пользователя, сеть и параметры системы',7,30),('Сборка рабочего места','Монитор, клавиатура, мышь и питание',8,30),('Первый вход в Raspberry Pi OS','Рабочий стол и базовые настройки',9,30),('Обновление системы','Поддержание ОС в актуальном состоянии',10,30),('Файлы и папки','Работа с файловым менеджером',11,30),('Знакомство с Terminal','Командная строка без страха',12,30),('Первый Python-скрипт','Запуск программы на Raspberry Pi',13,30),('Переменные, условия и циклы','Основы логики программы',14,30),('Что такое GPIO','40-pin разъём и цифровые сигналы',15,30),('Первый LED через GPIO','Управляемый выход',16,30),('Кнопка как вход','Получение цифрового сигнала',17,30),('Мини-проект Raspberry Pi 4','Python + GPIO + пользовательское действие',18,30),('Итоговая практическая демонстрация','От чистого запуска до работающей программы',19,30))v(t,d,o,m)
on conflict(course_id,lesson_order) do update set title=excluded.title,description=excluded.description,duration_minutes=excluded.duration_minutes,active=true;

create or replace function public.issue_course_certificate(p_course_slug text)
returns text language plpgsql security definer set search_path=public as $$
declare u uuid:=auth.uid();c uuid;total int;done int;score numeric;num text;pref text;
begin
 select id into c from courses where slug=p_course_slug and active=true;if c is null then raise exception 'Курс не найден';end if;
 if not exists(select 1 from profiles where id=u and role='teacher' and active=true) then raise exception 'Доступ запрещен';end if;
 if not exists(select 1 from teacher_courses where teacher_id=u and course_id=c) then raise exception 'Курс не назначен';end if;
 select count(*) into total from lessons where course_id=c and active=true;
 select count(*) into done from lesson_progress p join lessons l on l.id=p.lesson_id where p.teacher_id=u and l.course_id=c and l.active=true and p.status='completed';
 if done<total then raise exception 'Не все занятия завершены';end if;
 select max(t.score) into score from test_results t join lessons l on l.id=t.lesson_id where t.teacher_id=u and l.course_id=c;if coalesce(score,0)<80 then raise exception 'Тест не пройден';end if;
 select certificate_number into num from certificates where teacher_id=u and course_id=c;if num is not null then return num;end if;
 pref:=case when p_course_slug='roqed-science' then 'RQ' when p_course_slug='labdisc' then 'LD' when p_course_slug='arduino' then 'ARD' when p_course_slug='raspberry-pi-4' then 'RPI' else 'CRS' end;
 num:='STEM-'||pref||'-'||to_char(now(),'YYYY')||'-'||upper(substr(replace(u::text,'-',''),1,8));
 insert into certificates(teacher_id,course_id,certificate_number,final_score)values(u,c,num,score);
 update teacher_courses set status='completed',completed_at=now() where teacher_id=u and course_id=c;return num;
end $$;grant execute on function public.issue_course_certificate(text) to authenticated;

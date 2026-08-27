-- 012_optional_scratch_course.sql
insert into public.courses(title,slug,description,equipment)
values('Scratch — программирование с нуля','scratch-basics','Дополнительный курс: визуальное программирование, события, циклы, условия, переменные, игры, истории, отладка и методика для учителя.','Компьютер или планшет с доступом к Scratch')
on conflict(slug) do update set title=excluded.title,description=excluded.description,equipment=excluded.equipment,active=true;

with c as(select id from public.courses where slug='scratch-basics')
insert into public.lessons(course_id,title,description,lesson_order,duration_minutes)
select c.id,v.t,v.d,v.o,v.m from c cross join(values ('Что такое Scratch','Визуальное программирование',1,25),('Интерфейс Scratch','Сцена, блоки и спрайты',2,25),('Первый проект','Зелёный флаг',3,25),('Сохранение проекта','Название и версии',4,25),('Координаты X и Y','Положение на сцене',5,25),('Шаги и направление','Базовое движение',6,25),('Перейти в точку','Точное позиционирование',7,25),('Скольжение','Плавное перемещение',8,25),('Костюмы','Анимация персонажа',9,25),('Размер и видимость','Управление внешностью',10,25),('Речь и мысли','Диалог персонажей',11,25),('Фоны сцены','Смена места действия',12,25),('Зелёный флаг','Старт программы',13,25),('Клавиши','Управление с клавиатуры',14,25),('Клик по спрайту','Мышь как событие',15,25),('Сообщения broadcast','Связь между объектами',16,25),('Повторить N раз','Конечный цикл',17,25),('Всегда','Бесконечный цикл',18,25),('Если','Условие',19,25),('Если / иначе','Два варианта',20,25),('Ждать до','Ожидание события',21,25),('Переменные','Хранение чисел и текста',22,25),('Счёт в игре','Начисление очков',23,25),('Таймер','Время в проекте',24,25),('Случайные числа','Непредсказуемость',25,25),('Касание','Столкновения',26,25),('Касание цвета','Цвет как условие',27,25),('Расстояние до указателя','Мышь и координаты',28,25),('Спросить и ждать','Ввод текста',29,25),('Звуки Scratch','Аудио в проекте',30,25),('Музыкальный сценарий','Ритм и последовательность',31,25),('Собственный блок','Повторно используемый код',32,25),('Параметр собственного блока','Гибкая команда',33,25),('Создание клона','Много одинаковых объектов',34,25),('Поведение клонов','Независимые экземпляры',35,25),('Проект «Лабиринт»','Клавиши + касание',36,25),('Проект «Лови объект»','Клоны + счёт',37,25),('Проект «Интерактивная история»','Диалоги + сообщения',38,25),('Проект «Викторина»','Вопросы + переменные',39,25),('Поиск ошибки','Debugging',40,25),('Проверка по шагам','Разбиение задачи',41,25),('Scratch Ideas','Идеи и учебные материалы',42,25),('Scratch для педагогов','Организация обучения',43,25),('План урока Scratch','Цель → практика → результат',44,25),('Собственный Scratch-проект','От идеи до прототипа',45,25),('Презентация проекта','Объяснение алгоритма',46,25),('Итоговая практическая работа','Полный цикл Scratch',47,25))v(t,d,o,m)
on conflict(course_id,lesson_order) do update set title=excluded.title,description=excluded.description,duration_minutes=excluded.duration_minutes,active=true;

insert into public.optional_course_catalog(course_id,sort_order,active)
select id,20,true from public.courses where slug='scratch-basics'
on conflict(course_id) do update set sort_order=excluded.sort_order,active=true;

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
pref:=case when p_course_slug='scratch-basics' then 'SCRATCH' when p_course_slug='bbc-microbit' then 'MBIT' when p_course_slug='lego-spike-prime' then 'SPIKE' when p_course_slug='ruida-rdworks8-medium' then 'LASER' when p_course_slug='flashforge-adventurer-5m-pro' then '3DP' when p_course_slug='raspberry-pi-4' then 'RPI' when p_course_slug='arduino' then 'ARD' else 'CRS' end;
num:='STEM-'||pref||'-'||to_char(now(),'YYYY')||'-'||upper(substr(replace(u::text,'-',''),1,8));
insert into certificates(teacher_id,course_id,certificate_number,final_score)values(u,c,num,score);
update teacher_courses set status='completed',completed_at=now() where teacher_id=u and course_id=c;return num;
end $$;
grant execute on function public.issue_course_certificate(text) to authenticated;

-- LabDisc BioChem FULL 50 lessons
do $$
declare cid uuid;
begin
select id into cid from public.courses where slug='labdisc' limit 1;
if cid is null then raise exception 'Course labdisc not found'; end if;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Что такое LabDisc BioChem',1,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Комплект LabDisc BioChem',2,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Корпус, экран и клавиши',3,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Разъёмы и измерительные каналы',4,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Первое включение и проверка',5,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Датчики BioChem',6,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Открываем GlobiLab X',7,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Подключение по USB',8,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Беспроводное подключение',9,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Logger Setup',10,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Выбор одного датчика',11,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Частота и длительность записи',12,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Первое измерение температуры',13,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Первый график',14,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Сохраняем эксперимент',15,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Таблица данных',16,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Маркеры на графике',17,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Минимум, максимум и изменение',18,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Сравнение двух записей',19,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Экспорт и отчёт',20,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Ambient Temperature',21,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'External Temperature',22,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Relative Humidity',23,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Light',24,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Давление воздуха',25,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'GPS и координаты',26,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'pH: знакомство',27,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'pH: сравнение учебных образцов',28,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Conductivity',29,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Turbidity',30,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Colorimeter',31,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Dissolved Oxygen',32,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Heart Rate',33,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Thermocouple',34,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Universal Input',35,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Два датчика одновременно',36,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Температура и влажность',37,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Свет и температура',38,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Продолжительная регистрация',39,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Автономная запись',40,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Загрузка записанных данных',41,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Map View',42,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Workbook',43,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Если LabDisc не подключается',44,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Если показания выглядят неправильно',45,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Планируем STEM-эксперимент',46,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Самостоятельный STEM-проект',47,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Анализ и вывод STEM-проекта',48,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Практическая аттестация LabDisc',49,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
insert into public.lessons(course_id,title,lesson_order,active,duration_minutes)
values(cid,'Подготовка к итоговому тесту',50,true,35)
on conflict(course_id,lesson_order) do update set title=excluded.title,active=true,duration_minutes=excluded.duration_minutes;
update public.lessons set active=false where course_id=cid and lesson_order>50;
update public.courses set title='LabDisc BioChem — полный курс', updated_at=now() where id=cid;
end $$;
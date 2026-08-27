-- 017_optional_autodesk_fusion_course.sql
insert into public.courses(title,slug,description,equipment)
values('Autodesk Fusion — 3D-моделирование','autodesk-fusion','Дополнительный курс CAD: Sketch, размеры и constraints, параметрическое solid-моделирование, assemblies, проверка, STL/Mesh и STEM-проекты.','Компьютер с Autodesk Fusion')
on conflict(slug) do update set title=excluded.title,description=excluded.description,equipment=excluded.equipment,active=true;

with c as(select id from public.courses where slug='autodesk-fusion')
insert into public.lessons(course_id,title,description,lesson_order,duration_minutes)
select c.id,v.t,v.d,v.o,v.m from c cross join(values ('Что такое Autodesk Fusion','CAD/CAM/CAE-платформа',1,35),('Доступ для образования','Учебная лицензия',2,35),('Первый запуск Fusion','Проект и документ',3,35),('Интерфейс Fusion','Browser, Canvas, Timeline',4,35),('Навигация 3D-вида','Orbit, Pan, Zoom',5,35),('Что такое Sketch','2D-основа 3D-модели',6,35),('Line','Линии и контуры',7,35),('Rectangle','Прямоугольники',8,35),('Circle','Окружности',9,35),('Arc','Дуги',10,35),('Trim','Обрезка геометрии',11,35),('Sketch Dimension','Точные размеры',12,35),('Геометрические Constraints','Связи элементов',13,35),('Equal и Symmetry','Равенство и симметрия',14,35),('Fully Defined Sketch','Полностью определённый эскиз',15,35),('Extrude','Из 2D в 3D',16,35),('Extrude Cut','Вычитание материала',17,35),('Join / New Body / Cut','Режимы операции',18,35),('Fillet','Скругление',19,35),('Chamfer','Фаска',20,35),('Shell','Полая деталь',21,35),('Timeline','История операций',22,35),('Edit Sketch','Изменение основы',23,35),('User Parameters','Именованные размеры',24,35),('Зависимые параметры','Формулы размеров',25,35),('Rectangular Pattern','Линейный массив',26,35),('Circular Pattern','Круговой массив',27,35),('Mirror','Зеркальная геометрия',28,35),('Revolve','Тело вращения',29,35),('Sweep','Профиль по траектории',30,35),('Loft','Переход между профилями',31,35),('Body','Геометрическое тело',32,35),('Component','Компонент изделия',33,35),('Имена компонентов','Организация проекта',34,35),('Основы сборки','Несколько компонентов',35,35),('Joint','Связь компонентов',36,35),('Rigid Joint','Жёсткое соединение',37,35),('Revolute Joint','Вращательное соединение',38,35),('Проверка движения','Motion Preview',39,35),('Параметрическая табличка','Sketch + Extrude + Text',40,35),('Кронштейн','Размеры + Fillet',41,35),('Корпус для учебной электроники','Shell + отверстия',42,35),('Колесо/шкив как CAD-упражнение','Revolve + отверстие',43,35),('Inspect / Measure','Проверка габаритов',44,35),('Section Analysis','Внутреннее устройство',45,35),('Interference на уровне понятия','Пересечения компонентов',46,35),('Подготовка модели к печати','Геометрия и ориентация',47,35),('Экспорт STL / Mesh','Файл для слайсера',48,35),('Fusion → Flashforge','Связь курсов',49,35),('Скриншоты и виды','Презентация проекта',50,35),('Название и версии','Управление проектом',51,35),('Описание параметров','Воспроизводимость',52,35),('Fusion Quick Start','Официальное обучение',53,35),('Autodesk Tutorials','Расширенные уроки',54,35),('Техническое задание ученику','Размеры и критерии',55,35),('Рубрика оценки Fusion','Качество модели',56,35),('Итоговый проект по ТЗ','Полный CAD-цикл',57,35),('Подготовка к 3D-печати','Экспорт результата',58,35),('Презентация итоговой модели','Защита проекта',59,35),('Итоговая практическая работа','Самостоятельное моделирование',60,35))v(t,d,o,m)
on conflict(course_id,lesson_order) do update set title=excluded.title,description=excluded.description,duration_minutes=excluded.duration_minutes,active=true;

insert into public.optional_course_catalog(course_id,sort_order,active)
select id,60,true from public.courses where slug='autodesk-fusion'
on conflict(course_id) do update set sort_order=excluded.sort_order,active=true;

-- сертификат для Fusion и совместимость с текущими курсами
create or replace function public.issue_course_certificate(p_course_slug text)
returns text language plpgsql security definer set search_path=public as $$
declare u uuid:=auth.uid();c uuid;total int;done int;score numeric;num text;pref text;
begin
 select id into c from courses where slug=p_course_slug and active=true;
 if c is null then raise exception 'Курс не найден'; end if;
 if not exists(select 1 from profiles where id=u and role='teacher' and active=true) then raise exception 'Доступ запрещен'; end if;
 if not exists(select 1 from teacher_courses where teacher_id=u and course_id=c) then raise exception 'Курс не назначен'; end if;
 select count(*) into total from lessons where course_id=c and active=true;
 select count(*) into done from lesson_progress p join lessons l on l.id=p.lesson_id where p.teacher_id=u and l.course_id=c and l.active=true and p.status='completed';
 if done<total then raise exception 'Не все занятия завершены'; end if;
 select max(t.score) into score from test_results t join lessons l on l.id=t.lesson_id where t.teacher_id=u and l.course_id=c;
 if coalesce(score,0)<80 then raise exception 'Тест не пройден'; end if;
 select certificate_number into num from certificates where teacher_id=u and course_id=c;
 if num is not null then return num; end if;
 pref:=case
  when p_course_slug='autodesk-fusion' then 'FUSION'
  when p_course_slug='tinkercad-3d' then 'TCAD'
  when p_course_slug='esp32-iot' then 'ESP32'
  when p_course_slug='python-stem' then 'PY'
  when p_course_slug='scratch-basics' then 'SCRATCH'
  when p_course_slug='bbc-microbit' then 'MBIT'
  when p_course_slug='lego-spike-prime' then 'SPIKE'
  when p_course_slug='ruida-rdworks8-medium' then 'LASER'
  when p_course_slug='flashforge-adventurer-5m-pro' then '3DP'
  when p_course_slug='raspberry-pi-4' then 'RPI'
  when p_course_slug='arduino' then 'ARD'
  else 'CRS' end;
 num:='STEM-'||pref||'-'||to_char(now(),'YYYY')||'-'||upper(substr(replace(u::text,'-',''),1,8));
 insert into certificates(teacher_id,course_id,certificate_number,final_score) values(u,c,num,score);
 update teacher_courses set status='completed',completed_at=now() where teacher_id=u and course_id=c;
 return num;
end $$;
grant execute on function public.issue_course_certificate(text) to authenticated;

-- 018_optional_sketchup_course.sql
insert into public.courses(title,slug,description,equipment)
values('SketchUp — 3D-моделирование','sketchup-3d','Дополнительный курс SketchUp: базовая геометрия, Push/Pull, точные размеры, группы, компоненты, материалы, сцены, макеты и подготовка STL.','Компьютер с SketchUp Desktop или SketchUp for Web')
on conflict(slug) do update set title=excluded.title,description=excluded.description,equipment=excluded.equipment,active=true;

with c as(select id from public.courses where slug='sketchup-3d')
insert into public.lessons(course_id,title,description,lesson_order,duration_minutes)
select c.id,v.t,v.d,v.o,v.m from c cross join(values ('Что такое SketchUp','Быстрое 3D-моделирование',1,30),('SketchUp 2026 и способы работы','Desktop и Web',2,30),('SketchUp for Web','Работа без установки',3,30),('SketchUp for Education','Образовательный доступ',4,30),('Интерфейс SketchUp','Toolbar, Drawing Area, Tray',5,30),('Orbit','Вращение камеры',6,30),('Pan','Перемещение вида',7,30),('Zoom','Масштабирование вида',8,30),('Standard Views','Вид сверху и сбоку',9,30),('Line','Линии и поверхности',10,30),('Rectangle','Прямоугольник',11,30),('Circle','Окружность',12,30),('Arc','Дуги',13,30),('Eraser','Удаление и смягчение линий',14,30),('Push/Pull','Из 2D в 3D',15,30),('Push/Pull Cut','Вырезы и отверстия',16,30),('Offset','Параллельный внутренний контур',17,30),('Простой корпус','Offset + Push/Pull',18,30),('Measurements Box','Точные значения',19,30),('Tape Measure','Измерение',20,30),('Guides','Направляющие',21,30),('Inference System','Привязки SketchUp',22,30),('Move','Перемещение',23,30),('Copy через Move','Копирование',24,30),('Rotate','Вращение',25,30),('Scale','Масштабирование',26,30),('Flip / Mirror на уровне задачи','Симметрия',27,30),('Почему геометрия склеивается','Connected Geometry',28,30),('Make Group','Изоляция геометрии',29,30),('Редактирование группы','Контекст модели',30,30),('Что такое Component','Повторно используемый объект',31,30),('Копии компонента','Связанные экземпляры',32,30),('Make Unique','Независимая копия',33,30),('Outliner','Структура модели',34,30),('Tags','Категории отображения',35,30),('Hide / Unhide','Временное скрытие',36,30),('Materials','Цвет и поверхность',37,30),('Редактирование материала','Цвет и масштаб',38,30),('Paint Bucket','Быстрое назначение',39,30),('Scenes','Сохранённые виды',40,30),('Переходы между сценами','Презентация модели',41,30),('Section Plane','Сечение модели',42,30),('Что такое 3D Warehouse','Библиотека моделей',43,30),('Поиск модели','Подбор контента',44,30),('Проверка загруженной модели','Размер и сложность',45,30),('Табличка','Текст + Push/Pull',46,30),('Органайзер','Группы + Offset',47,30),('Подставка','Точные размеры',48,30),('Макет помещения','Стены и проёмы',49,30),('Мебель для макета','Компоненты',50,30),('SketchUp и STL','Подготовка геометрии',51,30),('Проверка Solid на уровне понятия','Корректное тело',52,30),('Экспорт STL','Файл для слайсера',53,30),('SketchUp → Flashforge','Связь курсов',54,30),('Корпус для макета платы','Габаритная модель',55,30),('Деталь робота','Крепёжный макет',56,30),('Макет STEM-кабинета','Пространственное планирование',57,30),('Getting Started','Официальная документация',58,30),('Задание по SketchUp','ТЗ ученику',59,30),('Рубрика оценки','Критерии качества',60,30),('Итоговый проект по ТЗ','Полный цикл моделирования',61,30),('Подготовка к экспорту','Финальная проверка',62,30),('Презентация проекта','Сцены и объяснение',63,30),('Итоговая практическая работа','Самостоятельное моделирование',64,30))v(t,d,o,m)
on conflict(course_id,lesson_order) do update set title=excluded.title,description=excluded.description,duration_minutes=excluded.duration_minutes,active=true;

insert into public.optional_course_catalog(course_id,sort_order,active)
select id,70,true from public.courses where slug='sketchup-3d'
on conflict(course_id) do update set sort_order=excluded.sort_order,active=true;

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
 select certificate_number into num from certificates where teacher_id=u and course_id=c;if num is not null then return num;end if;
 pref:=case when p_course_slug='sketchup-3d' then 'SKP' when p_course_slug='autodesk-fusion' then 'FUSION' when p_course_slug='tinkercad-3d' then 'TCAD' when p_course_slug='esp32-iot' then 'ESP32' when p_course_slug='python-stem' then 'PY' when p_course_slug='scratch-basics' then 'SCRATCH' when p_course_slug='bbc-microbit' then 'MBIT' when p_course_slug='arduino' then 'ARD' else 'CRS' end;
 num:='STEM-'||pref||'-'||to_char(now(),'YYYY')||'-'||upper(substr(replace(u::text,'-',''),1,8));
 insert into certificates(teacher_id,course_id,certificate_number,final_score)values(u,c,num,score);
 update teacher_courses set status='completed',completed_at=now() where teacher_id=u and course_id=c;
 return num;
end $$;
grant execute on function public.issue_course_certificate(text) to authenticated;

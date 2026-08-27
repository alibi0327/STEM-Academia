-- 013_optional_python_stem_course.sql
insert into public.courses(title,slug,description,equipment)
values('Python для STEM — полный курс','python-stem','Дополнительный курс Python: основы языка, данные, условия, циклы, функции, файлы, ошибки, анализ измерений и STEM-проекты.','Компьютер с Python/Thonny')
on conflict(slug) do update set title=excluded.title,description=excluded.description,equipment=excluded.equipment,active=true;

with c as(select id from public.courses where slug='python-stem')
insert into public.lessons(course_id,title,description,lesson_order,duration_minutes)
select c.id,v.t,v.d,v.o,v.m from c cross join(values ('Что такое Python','Язык программирования для STEM',1,30),('Установка Python','Подготовка компьютера',2,30),('Thonny','Простая среда для обучения',3,30),('Первая программа','print()',4,30),('Комментарии','Пояснения в коде',5,30),('Переменные','Хранение значений',6,30),('Числа int и float','Целые и дробные значения',7,30),('Строки str','Текстовые данные',8,30),('Булевы значения','True и False',9,30),('Ввод input()','Данные пользователя',10,30),('Арифметические операции','+, -, *, /',11,30),('Округление','round()',12,30),('Преобразование типов','int(), float(), str()',13,30),('Мини-проект «Калькулятор скорости»','Расстояние и время',14,30),('Операторы сравнения','>, <, ==',15,30),('if','Один вариант действия',16,30),('if / else','Два сценария',17,30),('elif','Несколько диапазонов',18,30),('Логические операторы','and, or, not',19,30),('for','Повторение по последовательности',20,30),('range()','Генерация диапазона',21,30),('while','Повторение по условию',22,30),('break и continue','Управление циклом',23,30),('Мини-проект «Таблица измерений»','Повторные значения',24,30),('Списки list','Набор значений',25,30),('Индексы и срезы','Доступ к элементам',26,30),('Добавление и удаление','Изменяемый список',27,30),('Сумма, минимум и максимум','Быстрый анализ',28,30),('Среднее значение','Обработка измерений',29,30),('Словари dict','Ключ → значение',30,30),('Что такое функция','Повторно используемый код',31,30),('Параметры','Передача данных',32,30),('return','Возврат результата',33,30),('Разбиение программы','Модули логики',34,30),('Запись текста в файл','Сохранение результата',35,30),('Чтение файла','Загрузка данных',36,30),('CSV на базовом уровне','Табличные данные',37,30),('Мини-проект «Журнал измерений»','Сбор результатов',38,30),('SyntaxError','Синтаксическая ошибка',39,30),('NameError и TypeError','Типичные ошибки',40,30),('try / except','Обработка ошибки',41,30),('Debugging','Системный поиск ошибки',42,30),('import','Подключение модулей',43,30),('math','Математические функции',44,30),('random','Случайные значения',45,30),('datetime','Время и дата',46,30),('Подготовка данных','Очистка и проверка',47,30),('Минимум, максимум, среднее','Сводные показатели',48,30),('Текстовый отчёт','Формирование результата',49,30),('Python + Raspberry Pi','Связь с оборудованием',50,30),('Python + micro:bit','Текстовое программирование платы',51,30),('Python + данные датчиков','Серия измерений',52,30),('Python + автоматизация','Условие → действие',53,30),('Официальный Python Tutorial','Документация',54,30),('Задание для учеников','Условие задачи',55,30),('Проверка кода','Критерии оценки',56,30),('Проект «Анализ измерений»','Файл + список + функции',57,30),('Собственный Python-проект','От идеи до программы',58,30),('Итоговая практическая демонстрация','Объяснение кода',59,30))v(t,d,o,m)
on conflict(course_id,lesson_order) do update set title=excluded.title,description=excluded.description,duration_minutes=excluded.duration_minutes,active=true;

insert into public.optional_course_catalog(course_id,sort_order,active)
select id,30,true from public.courses where slug='python-stem'
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
pref:=case when p_course_slug='python-stem' then 'PY' when p_course_slug='scratch-basics' then 'SCRATCH' when p_course_slug='bbc-microbit' then 'MBIT' when p_course_slug='lego-spike-prime' then 'SPIKE' when p_course_slug='arduino' then 'ARD' else 'CRS' end;
num:='STEM-'||pref||'-'||to_char(now(),'YYYY')||'-'||upper(substr(replace(u::text,'-',''),1,8));
insert into certificates(teacher_id,course_id,certificate_number,final_score)values(u,c,num,score);
update teacher_courses set status='completed',completed_at=now() where teacher_id=u and course_id=c;return num;
end $$;
grant execute on function public.issue_course_certificate(text) to authenticated;

/* =====================================================
   STEM TRAINER
   LABDISC COURSE
===================================================== */


/* =====================================================
   АВТОРИЗАЦИЯ
===================================================== */

const currentUser =
    JSON.parse(
        localStorage.getItem(
            "stemCurrentUser"
        )
    );


if (
    !currentUser ||
    currentUser.role !== "teacher"
) {

    window.location.href =
        "index.html";

}


/* =====================================================
   ПРОВЕРКА ДОСТУПА К LABDISC
===================================================== */

const allTeachers =
    JSON.parse(
        localStorage.getItem(
            "stemTeachers"
        )
    ) || [];


const currentTeacher =
    allTeachers.find(
        function(teacher) {

            return (
                String(teacher.id) ===
                String(currentUser.id)
            );

        }
    );


if (!currentTeacher) {

    localStorage.removeItem(
        "stemCurrentUser"
    );

    window.location.href =
        "index.html";

}


if (
    !currentTeacher.courses ||
    !currentTeacher.courses.includes(
        "Labdisc"
    )
) {

    alert(
        "Курс Labdisc не назначен вашему аккаунту."
    );

    window.location.href =
        "teacher.html";

}


/* =====================================================
   УРОКИ
===================================================== */

const lessons = [


/* =====================================================
   1
===================================================== */

{
    module:
        "Модуль 1 · Знакомство",

    title:
        "Что такое Labdisc",

    subtitle:
        "Знакомство с цифровой лабораторией и принципами её использования.",

    html: `

        <div class="visual">

            <div class="visual-content">

                <div class="visual-icon">
                    🔬
                </div>

                <div class="visual-title">
                    Цифровая лаборатория Labdisc
                </div>

                <div class="visual-text">
                    Измерение • Регистрация • Анализ данных
                </div>

            </div>

        </div>


        <div class="block">

            <h2>
                Что такое Labdisc?
            </h2>

            <p>
                Labdisc — компактная цифровая
                лаборатория для проведения
                естественно-научных экспериментов
                и сбора измерительных данных.
            </p>

            <p>
                В устройстве объединяются датчики,
                память, система регистрации данных
                и средства связи с компьютером
                или планшетом.
            </p>

        </div>


        <div class="block">

            <h2>
                Основные возможности
            </h2>

            <ul>

                <li>
                    измерение различных величин;
                </li>

                <li>
                    наблюдение данных
                    в реальном времени;
                </li>

                <li>
                    запись эксперимента;
                </li>

                <li>
                    построение графиков;
                </li>

                <li>
                    работа с таблицами;
                </li>

                <li>
                    анализ результатов.
                </li>

            </ul>

        </div>


        <div class="block info">

            <h2>
                Цель обучения
            </h2>

            <p>
                После курса преподаватель сможет
                самостоятельно подготовить Labdisc,
                выбрать необходимые датчики,
                провести эксперимент и
                проанализировать результаты.
            </p>

        </div>

    `
},


/* =====================================================
   2
===================================================== */

{
    module:
        "Модуль 1 · Знакомство",

    title:
        "Модели Labdisc",

    subtitle:
        "Определяем версию цифровой лаборатории.",

    html: `

        <div class="visual">

            <div class="visual-content">

                <div class="visual-icon">
                    🧪
                </div>

                <div class="visual-title">
                    Модели Labdisc
                </div>

                <div class="visual-text">
                    Gensci • Enviro • Physio • BioChem
                </div>

            </div>

        </div>


        <div class="block">

            <h2>
                Основные модели
            </h2>


            <div class="models">


                <div class="model">

                    <div class="model-icon">
                        🔭
                    </div>

                    <h3>
                        Gensci
                    </h3>

                    <p>
                        Универсальная модель
                        для естественных наук.
                    </p>

                </div>


                <div class="model">

                    <div class="model-icon">
                        🌿
                    </div>

                    <h3>
                        Enviro
                    </h3>

                    <p>
                        Экологические
                        и полевые исследования.
                    </p>

                </div>


                <div class="model">

                    <div class="model-icon">
                        ⚡
                    </div>

                    <h3>
                        Physio
                    </h3>

                    <p>
                        Эксперименты
                        и исследования по физике.
                    </p>

                </div>


                <div class="model">

                    <div class="model-icon">
                        🧬
                    </div>

                    <h3>
                        BioChem
                    </h3>

                    <p>
                        Биологические
                        и химические исследования.
                    </p>

                </div>

            </div>

        </div>


        <div class="block success">

            <h2>
                Практическое задание
            </h2>

            <p>
                Найдите Labdisc в вашем
                STEM-кабинете и определите,
                какая именно модель находится
                в вашем комплекте.
            </p>

        </div>

    `
},


/* =====================================================
   3
===================================================== */

{
    module:
        "Модуль 2 · Оборудование",

    title:
        "Устройство Labdisc",

    subtitle:
        "Изучаем основные элементы устройства.",

    html: `

        <div class="visual">

            <div class="visual-content">

                <div class="visual-icon">
                    🎛️
                </div>

                <div class="visual-title">
                    Устройство Labdisc
                </div>

                <div class="visual-text">
                    Экран • Кнопки • Датчики • Разъёмы
                </div>

            </div>

        </div>


        <div class="block">

            <h2>
                Основные элементы
            </h2>

            <ul>

                <li>
                    дисплей;
                </li>

                <li>
                    кнопки управления;
                </li>

                <li>
                    USB-разъём;
                </li>

                <li>
                    встроенные датчики;
                </li>

                <li>
                    разъёмы внешних датчиков;
                </li>

                <li>
                    система питания.
                </li>

            </ul>

        </div>


        <div class="block info">

            <h2>
                Обратите внимание
            </h2>

            <p>
                Расположение датчиков
                и их количество зависит
                от конкретной модели Labdisc.
            </p>

        </div>

    `
},


/* =====================================================
   4
===================================================== */

{
    module:
        "Модуль 3 · Подготовка",

    title:
        "Подготовка к работе",

    subtitle:
        "Подготавливаем оборудование к занятию.",

    html: `

        <div class="visual">

            <div class="visual-content">

                <div class="visual-icon">
                    🔋
                </div>

                <div class="visual-title">
                    Подготовка оборудования
                </div>

                <div class="visual-text">
                    Проверка → Включение → Подключение
                </div>

            </div>

        </div>


        <div class="block">

            <h2>
                Перед началом занятия
            </h2>


            <div class="steps">

                <div class="step">

                    <div class="step-number">
                        1
                    </div>

                    <div class="step-text">

                        <strong>
                            Проверьте устройство
                        </strong>

                        <span>
                            Осмотрите оборудование
                            перед использованием.
                        </span>

                    </div>

                </div>


                <div class="step">

                    <div class="step-number">
                        2
                    </div>

                    <div class="step-text">

                        <strong>
                            Проверьте заряд
                        </strong>

                        <span>
                            Устройство должно иметь
                            достаточный заряд.
                        </span>

                    </div>

                </div>


                <div class="step">

                    <div class="step-number">
                        3
                    </div>

                    <div class="step-text">

                        <strong>
                            Подготовьте датчики
                        </strong>

                        <span>
                            Выберите необходимое
                            оборудование.
                        </span>

                    </div>

                </div>


                <div class="step">

                    <div class="step-number">
                        4
                    </div>

                    <div class="step-text">

                        <strong>
                            Подготовьте программу
                        </strong>

                        <span>
                            Запустите GlobiLab X.
                        </span>

                    </div>

                </div>

            </div>

        </div>

    `
},


/* =====================================================
   5
===================================================== */

{
    module:
        "Модуль 4 · GlobiLab X",

    title:
        "Подключение к GlobiLab X",

    subtitle:
        "Подключаем Labdisc к компьютеру или планшету.",

    html: `

        <div class="visual">

            <div class="visual-content">

                <div class="visual-icon">
                    💻
                </div>

                <div class="visual-title">
                    Labdisc + GlobiLab X
                </div>

                <div class="visual-text">
                    USB • Bluetooth
                </div>

            </div>

        </div>


        <div class="block">

            <h2>
                GlobiLab X
            </h2>

            <p>
                GlobiLab X используется
                для настройки экспериментов,
                получения данных,
                построения графиков
                и анализа результатов.
            </p>

        </div>


        <div class="block">

            <h2>
                Подключение
            </h2>

            <div class="models">

                <div class="model">

                    <div class="model-icon">
                        🔌
                    </div>

                    <h3>
                        USB
                    </h3>

                    <p>
                        Проводное подключение
                        к компьютеру.
                    </p>

                </div>


                <div class="model">

                    <div class="model-icon">
                        📶
                    </div>

                    <h3>
                        Bluetooth
                    </h3>

                    <p>
                        Беспроводное подключение
                        поддерживаемых устройств.
                    </p>

                </div>

            </div>

        </div>


        <div class="block">

            <div class="resources">

                <a
                    class="resource"
                    href="https://globisens.net/support/downloads/"
                    target="_blank"
                >
                    💻 Открыть GlobiLab X
                </a>

                <a
                    class="resource"
                    href="https://globisens.net/resources/experiment-videos/"
                    target="_blank"
                >
                    ▶ Видеоуроки
                </a>

            </div>

        </div>

    `
},


/* =====================================================
   6
===================================================== */

{
    module:
        "Модуль 5 · Датчики",

    title:
        "Работа с датчиками",

    subtitle:
        "Выбираем подходящий датчик для эксперимента.",

    html: `

        <div class="visual">

            <div class="visual-content">

                <div class="visual-icon">
                    🌡️
                </div>

                <div class="visual-title">
                    Датчики Labdisc
                </div>

                <div class="visual-text">
                    Температура • Свет • Давление • pH
                </div>

            </div>

        </div>


        <div class="block">

            <h2>
                Что делает датчик?
            </h2>

            <p>
                Датчик преобразует
                измеряемую величину
                в цифровые данные,
                которые регистрирует Labdisc.
            </p>

        </div>


        <div class="block">

            <h2>
                Примеры
            </h2>

            <ul>

                <li>
                    температура;
                </li>

                <li>
                    освещённость;
                </li>

                <li>
                    давление;
                </li>

                <li>
                    влажность;
                </li>

                <li>
                    звук;
                </li>

                <li>
                    напряжение;
                </li>

                <li>
                    ток;
                </li>

                <li>
                    движение;
                </li>

                <li>
                    pH.
                </li>

            </ul>

        </div>


        <div class="block success">

            <h2>
                Задание
            </h2>

            <p>
                Найдите и определите
                доступные датчики
                на вашей модели Labdisc.
            </p>

        </div>

    `
},


/* =====================================================
   7
===================================================== */

{
    module:
        "Модуль 6 · Настройка",

    title:
        "Настройка измерений",

    subtitle:
        "Настраиваем сбор экспериментальных данных.",

    html: `

        <div class="visual">

            <div class="visual-content">

                <div class="visual-icon">
                    ⚙️
                </div>

                <div class="visual-title">
                    Настройка измерения
                </div>

                <div class="visual-text">
                    Датчик → Параметры → Запись
                </div>

            </div>

        </div>


        <div class="block">

            <h2>
                Последовательность
            </h2>

            <ol>

                <li>
                    Выберите датчик.
                </li>

                <li>
                    Определите параметры
                    регистрации данных.
                </li>

                <li>
                    Проверьте показания.
                </li>

                <li>
                    Запустите эксперимент.
                </li>

            </ol>

        </div>

    `
},


/* =====================================================
   8
===================================================== */

{
    module:
        "Модуль 7 · Практика",

    title:
        "Первый эксперимент",

    subtitle:
        "Проводим полный цикл эксперимента.",

    html: `

        <div class="visual">

            <div class="visual-content">

                <div class="visual-icon">
                    🧑‍🔬
                </div>

                <div class="visual-title">
                    Первый эксперимент
                </div>

                <div class="visual-text">
                    Вопрос → Измерение → Данные → Вывод
                </div>

            </div>

        </div>


        <div class="block">

            <h2>
                Этапы
            </h2>

            <ol>

                <li>
                    Сформулируйте вопрос.
                </li>

                <li>
                    Определите измеряемую величину.
                </li>

                <li>
                    Выберите датчик.
                </li>

                <li>
                    Настройте Labdisc.
                </li>

                <li>
                    Начните измерение.
                </li>

                <li>
                    Получите данные.
                </li>

                <li>
                    Проанализируйте результаты.
                </li>

                <li>
                    Сделайте вывод.
                </li>

            </ol>

        </div>


        <div class="block info">

            <h2>
                Пример
            </h2>

            <p>
                Для первого эксперимента
                можно исследовать изменение
                температуры с течением времени.
            </p>

        </div>

    `
},


/* =====================================================
   9
===================================================== */

{
    module:
        "Модуль 8 · Анализ",

    title:
        "Анализ результатов",

    subtitle:
        "Работаем с полученными экспериментальными данными.",

    html: `

        <div class="visual">

            <div class="visual-content">

                <div class="visual-icon">
                    📈
                </div>

                <div class="visual-title">
                    Анализ данных
                </div>

                <div class="visual-text">
                    График • Таблица • Вывод
                </div>

            </div>

        </div>


        <div class="block">

            <h2>
                После эксперимента
            </h2>

            <p>
                Полученные значения
                необходимо проанализировать
                и интерпретировать.
            </p>

        </div>


        <div class="block">

            <h2>
                Необходимо уметь
            </h2>

            <ul>

                <li>
                    читать график;
                </li>

                <li>
                    работать с таблицей;
                </li>

                <li>
                    сравнивать результаты;
                </li>

                <li>
                    находить закономерности;
                </li>

                <li>
                    формулировать вывод.
                </li>

            </ul>

        </div>

    `
},


/* =====================================================
   10
===================================================== */

{
    module:
        "Модуль 9 · Методика",

    title:
        "Labdisc на уроке",

    subtitle:
        "Организация исследовательского STEM-занятия.",

    html: `

        <div class="visual">

            <div class="visual-content">

                <div class="visual-icon">
                    👩‍🏫
                </div>

                <div class="visual-title">
                    Labdisc в STEM-обучении
                </div>

                <div class="visual-text">
                    Гипотеза → Эксперимент → Анализ → Вывод
                </div>

            </div>

        </div>


        <div class="block">

            <h2>
                Исследовательское обучение
            </h2>

            <p>
                Ученики могут самостоятельно
                проводить измерения,
                получать реальные данные
                и анализировать результаты.
            </p>

        </div>


        <div class="block">

            <h2>
                Структура занятия
            </h2>

            <ol>

                <li>
                    Исследовательский вопрос.
                </li>

                <li>
                    Гипотеза.
                </li>

                <li>
                    План эксперимента.
                </li>

                <li>
                    Измерения.
                </li>

                <li>
                    Анализ данных.
                </li>

                <li>
                    Вывод.
                </li>

            </ol>

        </div>


        <div id="finalTestBox"></div>

    `
}

];


/* =====================================================
   ЛИЧНЫЙ КЛЮЧ ПРОГРЕССА
===================================================== */

const progressKey =
    "labdiscCompleted_" +
    currentUser.id;


/* =====================================================
   ПРОГРЕСС ТОЛЬКО ЭТОГО УЧИТЕЛЯ
===================================================== */

let completed =
    JSON.parse(
        localStorage.getItem(
            progressKey
        )
    ) || [];


/* Удаляем некорректные значения */

completed =
    completed.filter(
        function(index) {

            return (
                Number.isInteger(index) &&
                index >= 0 &&
                index < lessons.length
            );

        }
    );


let currentLesson =
    0;


/* =====================================================
   НАХОДИМ ПЕРВЫЙ НЕПРОЙДЕННЫЙ УРОК
===================================================== */

function findCurrentLesson() {

    for (
        let i = 0;
        i < lessons.length;
        i++
    ) {

        if (
            !completed.includes(i)
        ) {

            return i;

        }

    }


    return (
        lessons.length - 1
    );

}


currentLesson =
    findCurrentLesson();


/* =====================================================
   СОХРАНЕНИЕ
===================================================== */

function saveProgress() {

    localStorage.setItem(
        progressKey,
        JSON.stringify(completed)
    );


    syncTeacherProgress();

}


/* =====================================================
   ПРОГРЕСС В ПРОФИЛЕ УЧИТЕЛЯ
===================================================== */

function syncTeacherProgress() {

    const teachers =
        JSON.parse(
            localStorage.getItem(
                "stemTeachers"
            )
        ) || [];


    const teacherIndex =
        teachers.findIndex(
            function(teacher) {

                return (
                    String(teacher.id) ===
                    String(currentUser.id)
                );

            }
        );


    if (
        teacherIndex === -1
    ) {

        return;

    }


    const percent =
        Math.round(
            completed.length /
            lessons.length *
            100
        );


    if (
        !teachers[
            teacherIndex
        ].courseProgress
    ) {

        teachers[
            teacherIndex
        ].courseProgress =
            {};

    }


    teachers[
        teacherIndex
    ].courseProgress[
        "Labdisc"
    ] =
        percent;


    localStorage.setItem(
        "stemTeachers",
        JSON.stringify(teachers)
    );

}


/* =====================================================
   МОЖНО ЛИ ОТКРЫТЬ УРОК
===================================================== */

function isLessonUnlocked(
    index
) {

    /*
        Первый урок доступен всегда
    */

    if (
        index === 0
    ) {

        return true;

    }


    /*
        Уже пройденный урок
        можно открыть повторно
    */

    if (
        completed.includes(index)
    ) {

        return true;

    }


    /*
        Новый урок доступен,
        только если предыдущий пройден
    */

    return completed.includes(
        index - 1
    );

}


/* =====================================================
   МЕНЮ
===================================================== */

function renderMenu() {

    const menu =
        document.getElementById(
            "lessonMenu"
        );


    let html =
        "";


    let lastModule =
        "";


    lessons.forEach(
        function(
            lesson,
            index
        ) {


            if (
                lesson.module !==
                lastModule
            ) {

                html += `

                    <div class="module-name">

                        ${lesson.module}

                    </div>

                `;


                lastModule =
                    lesson.module;

            }


            const done =
                completed.includes(
                    index
                );


            const unlocked =
                isLessonUnlocked(
                    index
                );


            let icon =
                "";


            if (done) {

                icon =
                    "✓ ";

            } else if (!unlocked) {

                icon =
                    "🔒 ";

            }


            html += `

                <div
                    class="
                        lesson
                        ${
                            index ===
                            currentLesson
                                ? "active"
                                : ""
                        }

                        ${
                            done
                                ? "done"
                                : ""
                        }

                        ${
                            !unlocked
                                ? "locked"
                                : ""
                        }
                    "

                    onclick="
                        openLesson(
                            ${index}
                        )
                    "
                >

                    ${icon}

                    ${lesson.title}

                </div>

            `;

        }
    );


    menu.innerHTML =
        html;

}


/* =====================================================
   ОТРИСОВКА УРОКА
===================================================== */

function renderLesson() {

    const lesson =
        lessons[
            currentLesson
        ];


    const done =
        completed.includes(
            currentLesson
        );


    document.getElementById(
        "content"
    ).innerHTML = `

        <div class="module-badge">

            ${lesson.module}

        </div>


        <h1>

            ${lesson.title}

        </h1>


        <div class="subtitle">

            ${lesson.subtitle}

        </div>


        ${lesson.html}


        <div class="actions">


            <button
                class="
                    btn
                    btn-back
                "

                onclick="
                    previousLesson()
                "

                ${
                    currentLesson === 0
                        ? "disabled"
                        : ""
                }
            >

                ← Предыдущий урок

            </button>


            <button
                class="
                    btn
                    ${
                        done
                            ? "btn-done"
                            : "btn-primary"
                    }
                "

                onclick="
                    completeLesson()
                "
            >

                ${
                    done
                        ? "✓ Урок пройден"
                        : (
                            currentLesson ===
                            lessons.length - 1
                                ? "Завершить курс ✓"
                                : "Завершить урок →"
                        )
                }

            </button>


        </div>

    `;


    renderFinalTestBox();

}


/* =====================================================
   ОТКРЫТИЕ УРОКА
===================================================== */

function openLesson(
    index
) {

    if (
        !isLessonUnlocked(index)
    ) {

        alert(
            "Сначала завершите предыдущий урок."
        );

        return;

    }


    currentLesson =
        index;


    renderMenu();

    renderLesson();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   ЗАВЕРШИТЬ УРОК
===================================================== */

function completeLesson() {

    if (
        !completed.includes(
            currentLesson
        )
    ) {

        completed.push(
            currentLesson
        );


        completed.sort(
            function(a, b) {

                return a - b;

            }
        );


        saveProgress();

    }


    updateProgress();

    renderMenu();


    if (
        currentLesson <
        lessons.length - 1
    ) {

        currentLesson++;


        renderMenu();

        renderLesson();


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } else {

        renderLesson();

    }

}


/* =====================================================
   ПРЕДЫДУЩИЙ УРОК
===================================================== */

function previousLesson() {

    if (
        currentLesson > 0
    ) {

        currentLesson--;


        renderMenu();

        renderLesson();


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

}


/* =====================================================
   ОБНОВЛЕНИЕ ПРОГРЕССА
===================================================== */

function updateProgress() {

    const percent =
        Math.round(
            completed.length /
            lessons.length *
            100
        );


    document.getElementById(
        "progressNumber"
    ).textContent =
        percent + "%";


    document.getElementById(
        "progressBar"
    ).style.width =
        percent + "%";


    syncTeacherProgress();

}


/* =====================================================
   ИТОГОВЫЙ ТЕСТ
===================================================== */

function renderFinalTestBox() {

    const box =
        document.getElementById(
            "finalTestBox"
        );


    if (!box) {

        return;

    }


    if (
        completed.length ===
        lessons.length
    ) {

        box.innerHTML = `

            <div
                class="
                    block
                    success
                "
            >

                <h2>
                    🎓 Обучение завершено
                </h2>

                <p>
                    Вы прошли все
                    10 уроков курса Labdisc.
                    Теперь доступна
                    итоговая аттестация.
                </p>

                <button
                    class="test-button"
                    onclick="
                        startTest()
                    "
                >

                    Начать итоговый тест →

                </button>

            </div>

        `;

    } else {

        const remaining =
            lessons.length -
            completed.length;


        box.innerHTML = `

            <div
                class="
                    block
                    warning
                "
            >

                <h2>
                    Итоговый тест
                </h2>

                <p>
                    До открытия теста
                    осталось пройти уроков:
                    <strong>
                        ${remaining}
                    </strong>
                </p>

            </div>

        `;

    }

}


/* =====================================================
   ПЕРЕХОД НА ТЕСТ
===================================================== */

function startTest() {

    if (
        completed.length !==
        lessons.length
    ) {

        alert(
            "Сначала завершите все уроки курса."
        );

        return;

    }


    localStorage.setItem(
        "stemTestCourse",
        "Labdisc"
    );


    window.location.href =
        "labdisc-test.html";

}


/* =====================================================
   ЗАПУСК
===================================================== */

saveProgress();

renderMenu();

renderLesson();

updateProgress();

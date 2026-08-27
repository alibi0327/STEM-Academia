export const lessons=[
  {
    "module": "Модуль 1 · Знакомство",
    "title": "Что такое Raspberry Pi 4",
    "subtitle": "Одноплатный компьютер и его возможности",
    "html": "<div class=\"block\"><h2>Цель занятия</h2><p>Понять отличие Raspberry Pi от микроконтроллерной платы.</p></div><div class=\"block info\"><h2>Пошаговая практика</h2><p>Осмотрите комплект без подключения питания: Raspberry Pi 4, microSD, блок питания, micro-HDMI, клавиатура и мышь.</p></div><div class=\"block success\"><h2>Что должно получиться</h2><p>Вы можете объяснить, что Raspberry Pi 4 — полноценный одноплатный компьютер.</p></div>"
  },
  {
    "module": "Модуль 1 · Знакомство",
    "title": "Порты Raspberry Pi 4",
    "subtitle": "USB, Ethernet, micro-HDMI, USB-C, GPIO и microSD",
    "html": "<div class=\"block\"><h2>Цель занятия</h2><p>Научиться ориентироваться на плате.</p></div><div class=\"block info\"><h2>Пошаговая практика</h2><p>Найдите USB, Ethernet, два micro-HDMI, USB-C питания, 40-pin GPIO и слот microSD.</p></div><div class=\"block success\"><h2>Что должно получиться</h2><p>Все основные разъёмы найдены до включения.</p></div>"
  },
  {
    "module": "Модуль 1 · Знакомство",
    "title": "Безопасная подготовка",
    "subtitle": "Правильное подключение и выключение",
    "html": "<div class=\"block\"><h2>Цель занятия</h2><p>Освоить безопасный порядок работы.</p></div><div class=\"block info\"><h2>Пошаговая практика</h2><p>Подключайте периферию при выключенном устройстве. Для учебных GPIO-схем используйте только низковольтные компоненты и проверяйте схему с преподавателем.</p></div><div class=\"block success\"><h2>Что должно получиться</h2><p>Вы знаете порядок подключения и штатного выключения системы.</p></div>"
  },
  {
    "module": "Модуль 2 · Установка ОС",
    "title": "Скачать Raspberry Pi Imager",
    "subtitle": "Официальная программа записи ОС",
    "html": "<div class=\"block\"><h2>Цель занятия</h2><p>Установить официальный Raspberry Pi Imager.</p></div><div class=\"block resource\"><h2>Официальный ресурс</h2><p><a class=\"btn secondary\" href=\"https://www.raspberrypi.com/software/\" target=\"_blank\" rel=\"noopener noreferrer\">Скачать Raspberry Pi Imager</a></p></div><div class=\"block info\"><h2>Пошаговая практика</h2><p>Нажмите кнопку официального сайта, выберите версию для Windows/macOS/Linux, установите и запустите Imager.</p></div><div class=\"block success\"><h2>Что должно получиться</h2><p>Raspberry Pi Imager запускается на компьютере.</p></div>"
  },
  {
    "module": "Модуль 2 · Установка ОС",
    "title": "Выбор Raspberry Pi OS",
    "subtitle": "64-bit система для Raspberry Pi 4",
    "html": "<div class=\"block\"><h2>Цель занятия</h2><p>Выбрать подходящую официальную ОС.</p></div><div class=\"block resource\"><h2>Официальный ресурс</h2><p><a class=\"btn secondary\" href=\"https://www.raspberrypi.com/software/operating-systems/\" target=\"_blank\" rel=\"noopener noreferrer\">Официальные образы Raspberry Pi OS</a></p></div><div class=\"block info\"><h2>Пошаговая практика</h2><p>Для учебного курса с графическим интерфейсом выберите Raspberry Pi OS с Desktop. Raspberry Pi 4 поддерживает 64-bit Raspberry Pi OS.</p></div><div class=\"block success\"><h2>Что должно получиться</h2><p>Вы понимаете различия обычной Desktop, Full и Lite.</p></div>"
  },
  {
    "module": "Модуль 2 · Установка ОС",
    "title": "Запись ОС на microSD",
    "subtitle": "Device → OS → Storage → Write",
    "html": "<div class=\"block\"><h2>Цель занятия</h2><p>Подготовить загрузочную microSD.</p></div><div class=\"block resource\"><h2>Официальный ресурс</h2><p><a class=\"btn secondary\" href=\"https://www.raspberrypi.com/documentation/computers/getting-started.html\" target=\"_blank\" rel=\"noopener noreferrer\">Официальная инструкция Getting Started</a></p></div><div class=\"block info\"><h2>Пошаговая практика</h2><p>В Imager выберите Raspberry Pi 4, Raspberry Pi OS и именно нужную microSD. Перед записью перепроверьте накопитель: запись удалит данные на выбранной карте.</p></div><div class=\"block success\"><h2>Что должно получиться</h2><p>Imager успешно завершает запись и проверку.</p></div>"
  },
  {
    "module": "Модуль 2 · Установка ОС",
    "title": "Предварительная настройка Imager",
    "subtitle": "Имя пользователя, сеть и параметры системы",
    "html": "<div class=\"block\"><h2>Цель занятия</h2><p>Подготовить систему к первому запуску.</p></div><div class=\"block resource\"><h2>Официальный ресурс</h2><p><a class=\"btn secondary\" href=\"https://www.raspberrypi.com/documentation/computers/getting-started.html\" target=\"_blank\" rel=\"noopener noreferrer\">Getting Started</a></p></div><div class=\"block info\"><h2>Пошаговая практика</h2><p>Используйте мастер Imager для необходимых параметров учебной сети и учётной записи. Пароль должен оставаться личным и не публиковаться в учебной платформе.</p></div><div class=\"block success\"><h2>Что должно получиться</h2><p>microSD подготовлена к первому запуску.</p></div>"
  },
  {
    "module": "Модуль 3 · Первый запуск",
    "title": "Сборка рабочего места",
    "subtitle": "Монитор, клавиатура, мышь и питание",
    "html": "<div class=\"block\"><h2>Цель занятия</h2><p>Правильно подготовить рабочее место.</p></div><div class=\"block info\"><h2>Пошаговая практика</h2><p>При выключенном питании вставьте microSD, подключите micro-HDMI к монитору, клавиатуру и мышь, затем штатный блок питания.</p></div><div class=\"block success\"><h2>Что должно получиться</h2><p>Появляется загрузка Raspberry Pi OS.</p></div>"
  },
  {
    "module": "Модуль 3 · Первый запуск",
    "title": "Первый вход в Raspberry Pi OS",
    "subtitle": "Рабочий стол и базовые настройки",
    "html": "<div class=\"block\"><h2>Цель занятия</h2><p>Завершить первоначальную настройку.</p></div><div class=\"block resource\"><h2>Официальный ресурс</h2><p><a class=\"btn secondary\" href=\"https://www.raspberrypi.com/documentation/computers/os.html\" target=\"_blank\" rel=\"noopener noreferrer\">Документация Raspberry Pi OS</a></p></div><div class=\"block info\"><h2>Пошаговая практика</h2><p>Пройдите мастер первого запуска, проверьте язык, раскладку, часовой пояс и подключение к учебной сети.</p></div><div class=\"block success\"><h2>Что должно получиться</h2><p>Открывается рабочий стол Raspberry Pi OS.</p></div>"
  },
  {
    "module": "Модуль 3 · Первый запуск",
    "title": "Обновление системы",
    "subtitle": "Поддержание ОС в актуальном состоянии",
    "html": "<div class=\"block\"><h2>Цель занятия</h2><p>Понять назначение обновлений.</p></div><div class=\"block resource\"><h2>Официальный ресурс</h2><p><a class=\"btn secondary\" href=\"https://www.raspberrypi.com/documentation/computers/os.html\" target=\"_blank\" rel=\"noopener noreferrer\">Документация Raspberry Pi OS</a></p></div><div class=\"block info\"><h2>Пошаговая практика</h2><p>Используйте штатный механизм обновлений Raspberry Pi OS под руководством преподавателя/администратора и дождитесь завершения.</p></div><div class=\"block success\"><h2>Что должно получиться</h2><p>Система сообщает, что обновления обработаны.</p></div>"
  },
  {
    "module": "Модуль 4 · Linux",
    "title": "Файлы и папки",
    "subtitle": "Работа с файловым менеджером",
    "html": "<div class=\"block\"><h2>Цель занятия</h2><p>Научиться создавать и организовывать учебные файлы.</p></div><div class=\"block info\"><h2>Пошаговая практика</h2><p>Создайте папку STEM-Academia, внутри папку raspberry-projects и сохраните тестовый текстовый файл.</p></div><div class=\"block success\"><h2>Что должно получиться</h2><p>Вы умеете найти, создать, переименовать и открыть учебный файл.</p></div>"
  },
  {
    "module": "Модуль 4 · Linux",
    "title": "Знакомство с Terminal",
    "subtitle": "Командная строка без страха",
    "html": "<div class=\"block\"><h2>Цель занятия</h2><p>Понять назначение терминала.</p></div><div class=\"block info\"><h2>Пошаговая практика</h2><p>Откройте Terminal. Выполните безопасные команды навигации pwd, ls и cd в своей учебной папке.</p></div><div class=\"block success\"><h2>Что должно получиться</h2><p>Вы можете определить текущую папку и посмотреть её содержимое.</p></div>"
  },
  {
    "module": "Модуль 4 · Python",
    "title": "Первый Python-скрипт",
    "subtitle": "Запуск программы на Raspberry Pi",
    "html": "<div class=\"block\"><h2>Цель занятия</h2><p>Создать первую простую программу.</p></div><div class=\"block info\"><h2>Пошаговая практика</h2><p>Откройте доступную Python-среду/редактор, создайте скрипт, который выводит приветствие и несколько значений, затем запустите его.</p></div><div class=\"block success\"><h2>Что должно получиться</h2><p>Python-программа запускается и выводит ожидаемый результат.</p></div>"
  },
  {
    "module": "Модуль 4 · Python",
    "title": "Переменные, условия и циклы",
    "subtitle": "Основы логики программы",
    "html": "<div class=\"block\"><h2>Цель занятия</h2><p>Научиться строить простую логику.</p></div><div class=\"block info\"><h2>Пошаговая практика</h2><p>Создайте небольшую программу с переменной, условием if и коротким циклом. Измените входное значение и сравните результат.</p></div><div class=\"block success\"><h2>Что должно получиться</h2><p>Вы понимаете, как программа принимает решение и повторяет действия.</p></div>"
  },
  {
    "module": "Модуль 5 · GPIO",
    "title": "Что такое GPIO",
    "subtitle": "40-pin разъём и цифровые сигналы",
    "html": "<div class=\"block\"><h2>Цель занятия</h2><p>Понять назначение GPIO и отличие номера контакта от его функции.</p></div><div class=\"block resource\"><h2>Официальный ресурс</h2><p><a class=\"btn secondary\" href=\"https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#gpio\" target=\"_blank\" rel=\"noopener noreferrer\">Официальная документация GPIO</a></p></div><div class=\"block info\"><h2>Пошаговая практика</h2><p>Изучите официальную схему GPIO вместе с преподавателем. Найдите несколько GND и GPIO-контактов. Ничего не подключайте до проверки.</p></div><div class=\"block success\"><h2>Что должно получиться</h2><p>Вы умеете читать базовую GPIO-схему.</p></div>"
  },
  {
    "module": "Модуль 5 · GPIO",
    "title": "Первый LED через GPIO",
    "subtitle": "Управляемый выход",
    "html": "<div class=\"block\"><h2>Цель занятия</h2><p>Связать Python с внешним светодиодом.</p></div><div class=\"block resource\"><h2>Официальный ресурс</h2><p><a class=\"btn secondary\" href=\"https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#gpio\" target=\"_blank\" rel=\"noopener noreferrer\">GPIO documentation</a></p></div><div class=\"block info\"><h2>Пошаговая практика</h2><p>Соберите учебную низковольтную LED-схему с токоограничивающим резистором только по схеме набора и после проверки преподавателем. Затем запустите подготовленный Python-пример управления выходом.</p></div><div class=\"block success\"><h2>Что должно получиться</h2><p>LED управляется программой без нагрева или других аномалий.</p></div>"
  },
  {
    "module": "Модуль 5 · GPIO",
    "title": "Кнопка как вход",
    "subtitle": "Получение цифрового сигнала",
    "html": "<div class=\"block\"><h2>Цель занятия</h2><p>Использовать GPIO как вход.</p></div><div class=\"block resource\"><h2>Официальный ресурс</h2><p><a class=\"btn secondary\" href=\"https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#gpio\" target=\"_blank\" rel=\"noopener noreferrer\">GPIO documentation</a></p></div><div class=\"block info\"><h2>Пошаговая практика</h2><p>Под контролем преподавателя соберите учебную схему кнопки и измените Python-программу так, чтобы состояние кнопки влияло на LED.</p></div><div class=\"block success\"><h2>Что должно получиться</h2><p>Нажатие кнопки стабильно меняет поведение программы.</p></div>"
  },
  {
    "module": "Модуль 6 · Проект",
    "title": "Мини-проект Raspberry Pi 4",
    "subtitle": "Python + GPIO + пользовательское действие",
    "html": "<div class=\"block\"><h2>Цель занятия</h2><p>Объединить работу ОС, Python и GPIO.</p></div><div class=\"block info\"><h2>Пошаговая практика</h2><p>Сделайте простой учебный проект: кнопка меняет состояние LED и программа выводит состояние на экран. Схему проверяет преподаватель до включения.</p></div><div class=\"block success\"><h2>Что должно получиться</h2><p>Проект повторно запускается после перезагрузки программы и работает предсказуемо.</p></div>"
  },
  {
    "module": "Модуль 6 · Завершение",
    "title": "Итоговая практическая демонстрация",
    "subtitle": "От чистого запуска до работающей программы",
    "html": "<div class=\"block\"><h2>Цель занятия</h2><p>Подтвердить основные навыки курса.</p></div><div class=\"block info\"><h2>Пошаговая практика</h2><p>Покажите преподавателю: запуск Raspberry Pi OS, поиск учебного файла, Terminal, запуск Python-программы и работу проверенного GPIO-проекта.</p></div><div class=\"block success\"><h2>Что должно получиться</h2><p>Практическая часть подтверждена; можно переходить к итоговому тесту.</p></div>"
  }
];

const visuals={
"Что такое Raspberry Pi 4":new URL("../assets/raspberrypi/board.svg",import.meta.url).href,
"Порты Raspberry Pi 4":new URL("../assets/raspberrypi/board.svg",import.meta.url).href,
"Скачать Raspberry Pi Imager":new URL("../assets/raspberrypi/imager.svg",import.meta.url).href,
"Выбор Raspberry Pi OS":new URL("../assets/raspberrypi/imager.svg",import.meta.url).href,
"Запись ОС на microSD":new URL("../assets/raspberrypi/imager.svg",import.meta.url).href,
"Первый вход в Raspberry Pi OS":new URL("../assets/raspberrypi/os.svg",import.meta.url).href,
"Файлы и папки":new URL("../assets/raspberrypi/os.svg",import.meta.url).href,
"Первый Python-скрипт":new URL("../assets/raspberrypi/os.svg",import.meta.url).href,
"Первый LED через GPIO":new URL("../assets/raspberrypi/flow.svg",import.meta.url).href,
"Кнопка как вход":new URL("../assets/raspberrypi/flow.svg",import.meta.url).href,
"Мини-проект Raspberry Pi 4":new URL("../assets/raspberrypi/flow.svg",import.meta.url).href};
for(const l of lessons){const s=visuals[l.title];if(s)l.html=`<figure class="pi-visual"><img src="${s}" alt="${l.title}" loading="lazy"><figcaption>${l.title}</figcaption></figure>`+l.html;}
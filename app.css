# STEM Academia

Полностью переработанная версия платформы обучения.

## Возможности
- Supabase Auth
- роли `admin` / `teacher`
- школы
- создание учетных записей учителей через Edge Function
- назначение курса
- сохранение прогресса занятий
- итоговый тест LabDisc
- результаты в PostgreSQL
- автоматическая выдача сертификата после 100% занятий + теста от 80%
- печать сертификата в PDF
- адаптивный интерфейс для GitHub Pages

## Перед публикацией — 3 шага

### 1. Supabase SQL
Откройте **SQL Editor** и выполните:
`supabase/migrations/001_full_schema.sql`

### 2. Publishable key
В `js/config.js` замените:
`PASTE_SUPABASE_PUBLISHABLE_KEY_HERE`
на Publishable/anon key проекта.

`service_role` в GitHub НЕ размещать.

### 3. Edge Function
Разверните:
`supabase/functions/create-teacher`

Она использует серверные переменные Supabase:
- SUPABASE_URL
- SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

После этого администратор сможет создавать учителей прямо из платформы.

## Администратор
Существующий admin-профиль в Supabase сохраняется. Его роль должна быть `admin`.

## GitHub Pages
В репозитории:
Settings → Pages → Deploy from a branch → `main` / root.

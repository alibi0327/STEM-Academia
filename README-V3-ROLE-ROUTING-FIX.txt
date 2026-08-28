STEM Academia V3 — Role Routing Fix

Исправлено:
- requireRole теперь принимает и одну роль, и массив ролей.
- Страницы V3 для admin/school_admin больше не выкидывают авторизованного пользователя на экран логина.
- После входа admin -> admin.html.
- После входа school_admin -> school-admin.html.
- После входа teacher -> teacher.html.
- V3 Center теперь явно проверяет роль, не разлогинивая разрешённого пользователя.

SQL повторно запускать НЕ НУЖНО, если RUN_THIS_ONE_SQL_V3_FINAL.sql уже был успешно выполнен.

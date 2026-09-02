# Аренда Сити — сайт агентства недвижимости

Корпоративный сайт агентства коммерческой недвижимости «Аренда Сити» на Next.js.

## Возможности

- Каталог объектов из self-hosted Supabase (только чтение)
- Категории недвижимости
- Раздел наружной рекламы
- AI-чат консультант (OpenAI)
- Формы обратного звонка и заявок
- Абстрактный слой IP-телефонии (mock + заглушки провайдеров)
- Деплой через Docker на Timeweb Cloud App Platform

## Быстрый старт

```bash
npm install
cp .env.example .env.local
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Переменные окружения

| Переменная | Описание |
|------------|----------|
| `OPENAI_API_KEY` | Ключ OpenAI для AI-чата |
| `NEXT_PUBLIC_SITE_URL` | URL сайта для SEO и sitemap |
| `NEXT_PUBLIC_SUPABASE_URL` | URL self-hosted Supabase (Timeweb) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key Supabase (только чтение) |
| `SUPABASE_OBJECTS_TABLE` | Таблица объектов (по умолчанию `properties`) |
| `SUPABASE_AGENCY_NAME` | Фильтр по агентству (по умолчанию `АрендаСити`) |
| `SUPABASE_MANAGER_NAME` | Фильтр по менеджеру в `extras.agent_name` |
| `SUPABASE_AGENCY_ID` | UUID агентства (если поиск по имени не срабатывает) |
| `TELEPHONY_PROVIDER` | Провайдер: `mock`, `mango`, `uis`, `zadarma`, `asterisk` |
| `TELEPHONY_API_KEY` | API-ключ провайдера телефонии |
| `TELEPHONY_WEBHOOK_SECRET` | Секрет для webhook `/api/telephony/webhook` |

## Каталог объектов (Supabase)

Только чтение. Админки на сайте нет — данные берутся из self-hosted Supabase на Timeweb.

1. В `.env.local` укажите:
   - `NEXT_PUBLIC_SUPABASE_URL` — URL API Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon/public key
   - `SUPABASE_OBJECTS_TABLE` — имя таблицы (по умолчанию `properties`)
   - `SUPABASE_AGENCY_NAME` — показывать только объекты агентства (по умолчанию `АрендаСити`)
   - `SUPABASE_MANAGER_NAME` — дополнительный фильтр по менеджеру
2. В Supabase включите RLS с политикой `SELECT` для роли `anon` (или отключите RLS, если так задумано).
3. Откройте `/catalog` — карточки и детальная страница показывают все поля строки таблицы (фото + описание + остальные колонки).

Страницы:
- `/catalog` — список
- `/catalog/[id]` — объект

## Подключение к БД через SSH

Для self-hosted Supabase на Timeweb Postgres обычно закрыт снаружи. Поднимаем туннель:

1. Заполните в `.env.local`:
   - `SSH_HOST`, `SSH_USER`, `SSH_PORT`
   - `SSH_IDENTITY_FILE` (путь к приватному ключу) или используйте пароль по запросу
   - `DATABASE_URL=postgresql://postgres:PASSWORD@127.0.0.1:54322/postgres`
2. В одном терминале: `npm run db:tunnel`
3. В другом: `npm run db:introspect` — покажет таблицы, колонки и 3 строки

Сайт `/catalog` читает через Supabase HTTP API (`NEXT_PUBLIC_SUPABASE_URL` + anon key).
SSH-туннель нужен для доступа к Postgres и проверки схемы.

## IP-телефония

Абстрактный интерфейс в `lib/telephony/`. По умолчанию используется `mock`-адаптер.

### Подключение провайдера

1. Установите `TELEPHONY_PROVIDER` (mango, uis, zadarma, asterisk)
2. Добавьте `TELEPHONY_API_KEY` из личного кабинета провайдера
3. Настройте webhook провайдера на `https://your-domain.ru/api/telephony/webhook`
4. Укажите `TELEPHONY_WEBHOOK_SECRET` и передайте его в заголовке `x-telephony-secret`
5. Реализуйте логику в соответствующем адаптере (`lib/telephony/adapters/`)

### AI-звонки (этап 2)

Webhook endpoint готов для маршрутизации входящих звонков на AI Voice Agent.
Текущая реализация возвращает приветственное сообщение (mock).

## Деплой на Timeweb

1. Push репозитория в GitHub
2. Timeweb Cloud → App Platform → Docker
3. Подключите репозиторий, укажите Dockerfile
4. Добавьте переменные окружения из `.env.example`
5. Привяжите домен

## Структура

```
app/           — страницы и API routes
components/    — UI, секции, формы, AI-чат
content/       — JSON-контент категорий и рекламы
lib/           — утилиты, AI, телефония
data/          — сохранённые заявки (leads.json)
```

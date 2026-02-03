## Prompt Guide — PWA для навчання промпт-інженерії

Next.js 16 застосунок з українським контентом: повний курс «Форматування промптів», 15+ хелперів, локальні збережені промпти, пошук (Fuse.js) і PWA-режим. Усі локальні сервіси — **порт 3004**.

## Технічний стек
- Next.js 16 (App Router), React 19
- TailwindCSS + shadcn/ui + Lucide
- Zustand для стану, Dexie (IndexedDB) для «Мої промпти»
- Fuse.js для пошуку, next-pwa для офлайну

## Скрипти
```bash
npm run dev     # next dev -p 3004
npm run build   # next build (без запуску)
npm run start   # next start -p 3004 (production)
npm run lint    # eslint src/
npm run test    # vitest
```

### Локальний запуск
```bash
cd app
npm install
npm run dev
# http://localhost:3004
```

### Production build + PM2
```bash
cd /path/to/PromptFlow/app
npm install
npm run build

# запуск продакшн-сервера під PM2 (порт 3004)
NODE_ENV=production pm2 start npm --name prompt-guide -- start

# зберегти процеси й налаштувати автозапуск
pm2 save
pm2 startup systemd   # виконай команду, яку виведе PM2
```

Перевірити стан:
```bash
pm2 status
pm2 logs prompt-guide
```

## Корисні нотатки
- Dev/Prod сервер завжди слухає **3004**, змінюється через `package.json`.
- PWA маніфест та SW вже налаштовано (`next-pwa`).
- Весь контент зберігається локально (IndexedDB) — бекенд не потрібен.

# Logo Specifications (Назва TBD)

## Current Status
`logo.svg` — **PLACEHOLDER** (простий SVG з літерою "P")

## Required Files
Після створення фінального логотипу, замініть/додайте:

| Файл | Розмір | Призначення |
|------|--------|-------------|
| `logo.svg` | Vector | Основний логотип (scalable) |
| `icon-192.png` | 192×192 px | PWA icon (Android) |
| `icon-512.png` | 512×512 px | PWA splash screen |
| `icon-maskable.png` | 512×512 px | Maskable icon (safe zone 80%) |
| `apple-touch-icon.png` | 180×180 px | iOS home screen |
| `favicon.ico` | 32×32 px | Browser tab |
| `og-image.png` | 1200×630 px | Social media preview |

## Design Guidelines

### Кольорова палітра (поточна з оригінального дизайну)
- **Primary:** `#7c5cff` (фіолетовий)
- **Accent 1:** `#22d3ee` (cyan)
- **Accent 2:** `#fb923c` (orange)
- **Accent 3:** `#4ade80` (green)
- **Background:** `#0a0a0f` (dark)

### Стиль
- Мінімалістичний
- Добре читається на темному і світлому фоні
- Пов'язаний з "Prompt" та/або українською тематикою
- Технічний/сучасний вигляд

### Safe Zone (для maskable icon)
```
┌────────────────────┐
│                    │
│   ┌──────────┐     │
│   │          │     │
│   │  LOGO    │     │  ← Safe zone: 80% центру
│   │          │     │
│   └──────────┘     │
│                    │
└────────────────────┘
```

## Tools for Generation
- [Figma](https://figma.com) — дизайн
- [RealFaviconGenerator](https://realfavicongenerator.net) — генерація всіх розмірів
- [Maskable.app](https://maskable.app) — перевірка maskable icon

## Notes
- Логотип буде використовуватись в header, PWA install prompt, browser tab
- Має добре виглядати у розмірі 32×32 px (favicon)

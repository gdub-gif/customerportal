# Customer Portal

Een modern, volledig responsive Customer Portal gebouwd met Next.js 15, TypeScript, TailwindCSS en Shadcn UI componenten.

## ✨ Features

- 🎨 Modern UI met TailwindCSS en Shadcn UI
- 📱 Volledig responsive design (mobile-first)
- ♿ Accessibility features (ARIA labels, keyboard navigation)
- 🎯 TypeScript voor type safety
- 🚀 Next.js 15 met App Router
- 🌙 Dark mode support voorbereid
- 📊 Dashboard met statistieken
- 📦 Orders management
- 👤 Profile management met edit functionaliteit

## 🚀 Installatie

### 1. Installeer dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## 📁 Project Structuur

```
customerportal/
├── app/
│   ├── layout.tsx          # Root layout met navbar en sidebar
│   ├── page.tsx            # Homepage (Dashboard)
│   ├── globals.css         # Global styles
│   ├── /orders
│   │   └── page.tsx        # Orders pagina
│   └── /profile
│       └── page.tsx        # Profile pagina
├── components/
│   ├── /ui                 # Shadcn UI componenten
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── table.tsx
│   ├── Navbar.tsx          # Navigatie component
│   ├── Sidebar.tsx         # Sidebar navigatie
│   └── DashboardCard.tsx   # Dashboard stat cards
├── lib/
│   └── utils.ts            # Utility functies
├── types/
│   └── index.ts            # TypeScript types
└── public/                 # Static assets
```

## 🚀 Production Build

```bash
# Build het project
npm run build

# Start production server
npm run start
```

## 📄 License

MIT

---

Gebouwd met ❤️ met Next.js 15, TypeScript, en TailwindCSS
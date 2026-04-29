# 🎨 KETEMU — Figma Design Guide

Panduan untuk merekonstruksi design system di Figma manual. Nilai exact = bisa langsung copy ke Figma color styles.

---

## 1. Color Styles

| Nama | HEX | HSL | Penggunaan |
|---|---|---|---|
| **navy/900** (Primary) | `#1B2C5C` | hsl(220, 65%, 18%) | Tombol utama, heading, navbar |
| **navy/700** (Primary Glow) | `#2D4A8A` | hsl(220, 70%, 30%) | Hover states, gradient |
| **amber/500** (Secondary) | `#F2A93B` | hsl(38, 92%, 55%) | Honesty Points, CTA, accent |
| **teal/600** (Accent) | `#27A69A` | hsl(174, 60%, 38%) | Tag "Ditemukan" |
| **red/500** (Destructive) | `#E04848` | hsl(0, 75%, 55%) | Tag "Hilang" |
| **green/500** (Success) | `#28A36A` | hsl(152, 60%, 40%) | Status resolved, klaim approved |
| **cream/50** (Background) | `#FAF8F2` | hsl(40, 33%, 97%) | Page background |
| **navy/950** (Foreground) | `#0E1A33` | hsl(220, 60%, 12%) | Body text |
| **muted/100** | `#EEF1F5` | hsl(220, 20%, 94%) | Section secondary bg |
| **muted/600** | `#5A6577` | hsl(220, 15%, 40%) | Caption text |
| **border** | `#D8DEE6` | hsl(220, 20%, 88%) | Card border |

### Gradients
- **Hero gradient**: `linear-gradient(135°, #1B2C5C → #2D4A8A → #27A69A)`
- **Amber gradient**: `linear-gradient(135°, #F2A93B → #E88A1A)`

---

## 2. Typography (Google Fonts — gratis)

| Style | Font | Weight | Size | Line height | Letter spacing |
|---|---|---|---|---|---|
| Display H1 | **Space Grotesk** | 700 | 64-80px | 1.05 | -0.02em |
| Display H2 | Space Grotesk | 700 | 40-48px | 1.1 | -0.02em |
| Display H3 | Space Grotesk | 700 | 24-32px | 1.2 | -0.01em |
| Body Large | **Plus Jakarta Sans** | 400 | 18-20px | 1.5 | 0 |
| Body | Plus Jakarta Sans | 400 | 16px | 1.6 | 0 |
| Body Small | Plus Jakarta Sans | 500 | 14px | 1.5 | 0 |
| Caption | Plus Jakarta Sans | 500 | 12px | 1.4 | 0.01em |
| Button | Plus Jakarta Sans | 600 | 14-16px | 1 | 0 |

---

## 3. Effects (Figma drop shadow)

| Nama | X | Y | Blur | Spread | Color |
|---|---|---|---|---|---|
| `shadow-card` | 0 | 4 | 16 | -4 | rgba(27,44,92, 0.08) |
| `shadow-elegant` | 0 | 10 | 40 | -12 | rgba(27,44,92, 0.18) |
| `shadow-glow` | 0 | 0 | 60 | 0 | rgba(242,169,59, 0.35) |

---

## 4. Layout Tokens

- **Border radius**: 6 / 12 / 14 (default) / 24 / 9999 (pill)
- **Spacing scale**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128
- **Container max-width**: 1280px (centered, padding 24px mobile / 32px desktop)
- **Grid**: 12 cols, 24px gutter

---

## 5. Komponen Inti yang Perlu Dibuat di Figma

### 🔘 Button
- **Hero** (primary CTA): bg = amber gradient, text navy, radius 14, padding 12×24, shadow-card → hover shadow-glow
- **Navy**: bg navy/900, text cream
- **Outline**: border 1px navy, transparent bg
- **Ghost**: no bg, hover muted
- Sizes: sm 36h / default 40h / lg 44h

### 🪪 Card
- bg = card (white / cream), border 1px border, radius 14, padding 20-24, shadow-card
- Hover: shadow-elegant + border-primary/30

### 🏷️ Badge (pill, radius 9999)
- **Lost**: bg red/500, text white
- **Found**: bg teal/600, text white
- **Priority**: bg amber/500, text navy/950
- **Resolved**: bg green/500, text white
- **Outline**: border navy, text navy

### 📥 Input / Textarea
- bg input (`#E5E9EF`), border 1px, radius 12, padding 10×14, focus → ring 2px navy

### 👤 Avatar
- Circle, 32/40/48/80, border 2-4px secondary, fallback = initial pada bg navy/900 text cream

### 📑 Tabs
- Underline style: active → border-bottom 2px navy + text navy bold

### 📊 Honesty Points Chip
- Pill: bg amber/15%, icon ✨ Sparkles + angka, text bold

---

## 6. Halaman / Frame yang Perlu Didesain

1. **Home / Landing** — hero gradient + 3 pilar + how it works (4 langkah) + CTA quiz banner
2. **Auth** — Login & Register card (max 480px)
3. **Items List** — search bar + filters + grid 3-col card
4. **Item Detail** — header badge + description + meta + action buttons + claim modal
5. **Report Form** — radio besar lost/found + form fields
6. **Quiz** — soal per card + radio options + result screen
7. **Leaderboard** — list ranking dengan medal di top 3
8. **Profile** — header gradient + tabs (Klaim Masuk / Saya / Riwayat)
9. **Admin Dashboard** — 4 stat cards + tabel moderasi

---

## 7. Logo

Lokasi pin geometris dengan siluet dua tangan berjabat di dalam, warna deep navy + dot amber kecil. File tersedia di `src/assets/ketemu-logo.png`.

---

**Tip**: Buat **page "🎨 Foundations"** di Figma, drop semua color & text styles di sana, baru bikin komponen di **page "🧩 Components"**. Halaman sebagai **page "📱 Screens"**. Done!

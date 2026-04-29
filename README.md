# 🤝 KETEMU — Lost & Found Campus Platform

> **Kelompok 5 IPB University** — Siti Fayza Kamila (CEO), Abiyyurasyiddhiya Ghulmy (CTO), Muhammad Irham Nurhakim (CMO/CFO)

Platform Lost & Found terintegrasi untuk ekosistem kampus modern, lengkap dengan sistem **Honesty Points**, **Kuis Integritas**, **Priority Broadcast**, dan **moderasi admin**.

---

## 📦 Stack Teknologi

| Layer | Teknologi |
|---|---|
| Frontend | React 18 + Vite + TypeScript + TailwindCSS + shadcn/ui |
| Backend  | Node.js + Express + JWT + bcrypt |
| Database | PostgreSQL 16 (via Docker) |
| Tools    | Docker Compose, pgAdmin, DBeaver |

---

## 🚀 CARA MENJALANKAN (LANGKAH DEMI LANGKAH)

### Prasyarat
Install dulu di laptop kamu:
1. **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** ← untuk database
2. **[Node.js v20+](https://nodejs.org/)** ← untuk backend & frontend
3. **[DBeaver](https://dbeaver.io/download/)** ← untuk lihat database
4. **[Git](https://git-scm.com/downloads)** ← untuk push ke GitHub

---

### 1️⃣ Clone project
```bash
git clone https://github.com/USERNAME-KAMU/ketemu.git
cd ketemu
```

### 2️⃣ Jalankan Database PostgreSQL (Docker)
Dari folder root project:
```bash
docker compose up -d
```

Tunggu 10 detik. Database otomatis dibuat dengan **schema + data demo**.
- PostgreSQL: `localhost:5432`
- pgAdmin (opsional): `http://localhost:5050` (login: `admin@ketemu.local` / `admin123`)

Cek container jalan:
```bash
docker ps
```

### 3️⃣ Jalankan Backend API
Buka terminal baru:
```bash
cd backend
npm install
npm start
```
✅ Backend jalan di **http://localhost:4000**

Cek health: buka `http://localhost:4000/health` → harus `{"ok":true}`

### 4️⃣ Jalankan Frontend
Buka terminal **baru lagi** (jangan tutup terminal backend):
```bash
# dari folder root
npm install
npm run dev
```
✅ Frontend jalan di **http://localhost:8080** (atau port yang tertulis di terminal)

---

## 🔌 KONEKSI KE DBeaver

1. Buka DBeaver → **Database → New Database Connection**
2. Pilih **PostgreSQL** → Next
3. Isi:
   - **Host**: `localhost`
   - **Port**: `5432`
   - **Database**: `ketemu_db`
   - **Username**: `ketemu`
   - **Password**: `ketemu123`
4. Klik **Test Connection** → kalau diminta download driver, klik **Download**
5. Klik **Finish**

Sekarang kamu bisa lihat semua tabel di sidebar:
`users`, `items`, `claims`, `quizzes`, `quiz_questions`, `quiz_attempts`, `honesty_logs`, `locations`, `priority_transactions`, `notifications`.

Klik kanan tabel → **View Data** untuk melihat isinya.

---

## 🔐 AKUN DEMO (semua password: `password123`)

| Email | Role | Keterangan |
|---|---|---|
| `admin@ketemu.id` | admin | Akses dashboard admin |
| `fayza@student.ipb.ac.id` | student | Mahasiswa |
| `irham@student.ipb.ac.id` | student | Mahasiswa |
| `abi@student.ipb.ac.id` | student | Top kontributor |
| `budi.kantin@ketemu.id` | vendor | Karyawan kantin |

---

## 📤 PUSH KE GITHUB

```bash
# 1. Buat repo baru di github.com (kosong, jangan centang README)
# 2. Dari folder project:
git init
git add .
git commit -m "feat: initial commit KETEMU"
git branch -M main
git remote add origin https://github.com/USERNAME-KAMU/ketemu.git
git push -u origin main
```

> File `.env` dan `node_modules` sudah di-`.gitignore` jadi aman.

---

## 🧩 Struktur Project

```
ketemu/
├── docker-compose.yml          ← PostgreSQL + pgAdmin
├── backend/
│   ├── src/
│   │   ├── server.js           ← Express entry
│   │   ├── routes.js           ← Semua API endpoint
│   │   ├── auth.js             ← JWT middleware
│   │   └── db.js               ← PG pool
│   ├── sql/
│   │   ├── 01_schema.sql       ← Schema database
│   │   └── 02_seed.sql         ← Data demo
│   └── package.json
├── src/                        ← Frontend React
│   ├── pages/                  ← Home, Login, Items, Quiz, Admin, ...
│   ├── components/             ← Layout, Navbar, ui/
│   ├── contexts/AuthContext.tsx
│   └── lib/api.ts
└── README.md
```

---

## 🎨 FITUR LENGKAP (sesuai proposal)

✅ Auth (register/login JWT)
✅ Lapor barang **Hilang** & **Ditemukan**
✅ Verifikasi lokasi via **QR Code** (kode lokasi disimpan di tabel `locations`)
✅ Sistem **Klaim** dengan bukti detail unik
✅ **Honesty Points** otomatis (lapor temuan = +25, klaim valid = +50, kuis lulus = +20)
✅ **Kuis Integritas** (5 soal, lulus ≥60%)
✅ **Leaderboard** Top 10 paling amanah
✅ **Priority Broadcast** Rp 5.000 (72 jam highlight)
✅ **Admin moderation** (approve/reject laporan + statistik pendapatan)
✅ Notifikasi
✅ Riwayat klaim masuk & keluar
✅ Multi-role: student, staff, vendor (kantin), admin

❌ AI match destinasi — **sengaja diganti** moderasi manual admin sesuai permintaan.

---

## 🎨 Design System (untuk Figma manual)

| Token | Value |
|---|---|
| Primary (Deep Navy) | `hsl(220, 65%, 18%)` — `#1B2C5C` |
| Secondary (Amber Honesty) | `hsl(38, 92%, 55%)` — `#F2A93B` |
| Accent (Teal Found) | `hsl(174, 60%, 38%)` — `#27A69A` |
| Background (Cream) | `hsl(40, 33%, 97%)` — `#FAF8F2` |
| Foreground (Dark Navy) | `hsl(220, 60%, 12%)` — `#0E1A33` |
| Font Display | Space Grotesk (700/600) |
| Font Body | Plus Jakarta Sans (400/500/600) |
| Radius | 0.875rem (14px) |

Komponen utama: Card (shadow-card), Button (variants: hero/navy/outline/ghost), Badge, Avatar, Tabs, Dialog.

---

## 🆘 Troubleshooting

**Port 5432 sudah dipakai** → matikan PostgreSQL lokal kamu, atau ubah port di `docker-compose.yml` (`"5433:5432"`) lalu update `DATABASE_URL` di `backend/.env`.

**Backend error `ECONNREFUSED`** → Database Docker belum jalan. Cek `docker ps`.

**Frontend tidak konek** → Pastikan `VITE_API_URL` di `.env` (root) = `http://localhost:4000/api` dan backend sudah running.

**Reset database dari nol**:
```bash
docker compose down -v
docker compose up -d
```

---

Made with 🤝 by **Kelompok 5 — IPB University 2026**

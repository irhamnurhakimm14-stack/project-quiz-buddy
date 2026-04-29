# 🤝 KETEMU — Lost & Found Campus Platform

> **Kelompok 5 IPB University** — Siti Fayza Kamila (CEO), Abiyyurasyiddhiya Ghulmy (CTO), Muhammad Irham Nurhakim (CMO/CFO)

Platform Lost & Found terintegrasi untuk ekosistem kampus modern, lengkap dengan sistem **Honesty Points**, **Kuis Integritas**, **Priority Broadcast**, dan **moderasi admin**.

---

## 📸 BUKTI PENGERJAAN (Checklist Screenshot untuk Laporan)

> Simpan semua screenshot di folder `docs/screenshots/` lalu rename sesuai nama file di bawah. Placeholder gambar di README ini akan otomatis tampil setelah kamu drop file dengan nama yang sama.

### ✅ 1) Setup Project — Frontend, Backend, GitHub

| # | Yang harus di-screenshot | Nama file |
|---|---|---|
| 1.1 | Terminal saat `docker compose up -d` sukses (container `ketemu_postgres` running) | `01-docker-up.png` |
| 1.2 | Terminal backend running: `API listening on :4000` | `02-backend-running.png` |
| 1.3 | Browser membuka `http://localhost:4000/health` → `{"ok":true}` | `03-backend-health.png` |
| 1.4 | Terminal frontend running: `Local: http://localhost:8080` | `04-frontend-running.png` |
| 1.5 | Halaman repository GitHub kamu (sudah ke-push) | `05-github-repo.png` |
| 1.6 | Struktur folder project di VS Code (sidebar terlihat `/backend`, `/src`, `docker-compose.yml`) | `06-project-structure.png` |

![Docker up](docs/screenshots/01-docker-up.png)
![Backend running](docs/screenshots/02-backend-running.png)
![Backend health](docs/screenshots/03-backend-health.png)
![Frontend running](docs/screenshots/04-frontend-running.png)
![GitHub repo](docs/screenshots/05-github-repo.png)
![Project structure](docs/screenshots/06-project-structure.png)

---

### ✅ 2) UI Sederhana — Tiap Fitur Sesuai Proposal

| # | Halaman / Fitur | URL Lokal | Nama file |
|---|---|---|---|
| 2.1 | Home (Hero + Logo KETEMU) | `/` | `07-home.png` |
| 2.2 | Register akun baru | `/register` | `08-register.png` |
| 2.3 | Login (pakai akun demo) | `/login` | `09-login.png` |
| 2.4 | Daftar Barang Hilang & Ditemukan | `/items` | `10-items-list.png` |
| 2.5 | Detail item + tombol Klaim | `/items/:id` | `11-item-detail.png` |
| 2.6 | Form Lapor barang (pilih lokasi QR + Priority Broadcast) | `/report` | `12-report-form.png` |
| 2.7 | Kuis Integritas (5 soal) | `/quiz` | `13-quiz.png` |
| 2.8 | Hasil Kuis + Honesty Points bertambah | `/quiz` (setelah submit) | `14-quiz-result.png` |
| 2.9 | Leaderboard Top 10 paling amanah | `/leaderboard` | `15-leaderboard.png` |
| 2.10 | Profile + riwayat klaim & poin | `/profile` | `16-profile.png` |
| 2.11 | Admin Dashboard (moderasi laporan) | `/admin` | `17-admin.png` |
| 2.12 | Notifikasi muncul setelah aksi | navbar 🔔 | `18-notification.png` |

![Home](docs/screenshots/07-home.png)
![Register](docs/screenshots/08-register.png)
![Login](docs/screenshots/09-login.png)
![Items list](docs/screenshots/10-items-list.png)
![Item detail](docs/screenshots/11-item-detail.png)
![Report form](docs/screenshots/12-report-form.png)
![Quiz](docs/screenshots/13-quiz.png)
![Quiz result](docs/screenshots/14-quiz-result.png)
![Leaderboard](docs/screenshots/15-leaderboard.png)
![Profile](docs/screenshots/16-profile.png)
![Admin](docs/screenshots/17-admin.png)
![Notification](docs/screenshots/18-notification.png)

---

### ✅ 3) Database Setup — Konfigurasi & Koneksi DBeaver

| # | Yang harus di-screenshot | Nama file |
|---|---|---|
| 3.1 | Form koneksi DBeaver (host, port, db, user terisi) | `19-dbeaver-connect.png` |
| 3.2 | Popup **Connected ✅** saat Test Connection | `20-dbeaver-test-ok.png` |
| 3.3 | Sidebar DBeaver menampilkan 10 tabel di `public.Tables` | `21-dbeaver-tables.png` |
| 3.4 | Hasil query `SELECT COUNT(*)` per tabel (lihat README bagian C.2) | `22-dbeaver-counts.png` |
| 3.5 | Hasil `SELECT * FROM users` — 5 user demo terlihat | `23-dbeaver-users.png` |
| 3.6 | Hasil `SELECT * FROM items` — 5 barang lapor terlihat | `24-dbeaver-items.png` |
| 3.7 | ER Diagram tabel `items` (relasi ke users & locations) | `25-dbeaver-erd.png` |

![DBeaver connect](docs/screenshots/19-dbeaver-connect.png)
![DBeaver test ok](docs/screenshots/20-dbeaver-test-ok.png)
![DBeaver tables](docs/screenshots/21-dbeaver-tables.png)
![DBeaver counts](docs/screenshots/22-dbeaver-counts.png)
![DBeaver users](docs/screenshots/23-dbeaver-users.png)
![DBeaver items](docs/screenshots/24-dbeaver-items.png)
![DBeaver ERD](docs/screenshots/25-dbeaver-erd.png)

> 💡 **Tips screenshot**: Windows = `Win + Shift + S`, Mac = `Cmd + Shift + 4`. Simpan langsung ke `docs/screenshots/` dengan nama persis seperti tabel di atas.

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

## 🔌 KONEKSI KE DBeaver (LENGKAP)

### A. Bikin Connection ke PostgreSQL

1. Buka **DBeaver** → menu **Database → New Database Connection** (atau ikon colokan listrik di kiri atas).
2. Pilih **PostgreSQL** → klik **Next**.
3. Tab **Main**, isi:
   - **Host**: `localhost`
   - **Port**: `5432`
   - **Database**: `ketemu_db`
   - **Username**: `ketemu`
   - **Password**: `ketemu123`
   - Centang **Save password**.
4. Klik **Test Connection…** → kalau muncul popup "Download driver files", klik **Download**, tunggu selesai.
5. Kalau muncul ✅ **Connected** → klik **OK** → **Finish**.
6. Di sidebar kiri (Database Navigator) akan muncul connection baru. Expand:
   `ketemu_db → Schemas → public → Tables`

> Kalau connection error `Connection refused` → pastikan Docker udah jalan: `docker ps` harus ada container `ketemu_postgres`.

---

### B. (Opsional) Import Schema & Seed SQL Secara Manual via DBeaver

> ℹ️ **Kalau kamu pakai `docker compose up -d` dengan volume kosong, schema & seed sudah otomatis ke-load** (lihat `docker-compose.yml` baris `docker-entrypoint-initdb.d`). Jadi langkah ini hanya kamu butuhkan kalau:
> - Kamu **tidak pakai Docker** dan punya PostgreSQL lokal sendiri, ATAU
> - Database sudah ada tapi **kosong** / mau **reset & re-seed manual**.

#### B.1 — Bikin Database `ketemu_db` (skip kalau pakai Docker)

Kalau PostgreSQL kamu lokal (bukan Docker), bikin database dulu:

1. Connect ke connection PostgreSQL kamu di DBeaver.
2. Klik kanan **Databases** → **Create New Database** → nama: `ketemu_db` → OK.
3. Disconnect, lalu **edit connection** → ubah Database jadi `ketemu_db` → reconnect.

#### B.2 — Reset Database (kalau mau mulai bersih)

Klik kanan connection `ketemu_db` → **SQL Editor → Open SQL Script**, jalankan:
```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```
Tekan **Ctrl+Enter** (atau Alt+X) untuk eksekusi.

#### B.3 — Import `01_schema.sql` (bikin tabel)

**Cara cepat (Execute SQL Script):**
1. Klik kanan connection `ketemu_db` → **SQL Editor → Execute SQL Script…**
2. Pilih file: `backend/sql/01_schema.sql`
3. Centang **Auto-commit** → klik **Start**.
4. Tunggu sampai muncul "Script executed successfully".

**Cara alternatif (paste manual):**
1. Klik kanan `ketemu_db` → **SQL Editor → Open SQL Script**.
2. Buka file `backend/sql/01_schema.sql` di text editor → copy semua → paste ke SQL Editor DBeaver.
3. Tekan **Alt+X** (Execute SQL Script) — bukan Ctrl+Enter (yang itu cuma jalanin 1 statement).

#### B.4 — Import `02_seed.sql` (isi data demo)

Ulangi cara di atas, tapi pilih file `backend/sql/02_seed.sql`. Wajib dijalankan **setelah** schema, karena seed bergantung pada tabel.

#### B.5 — Refresh & Verifikasi Tabel

1. Klik kanan node **Tables** di sidebar → **Refresh** (F5).
2. Kamu harus melihat 10 tabel ini:
   `users`, `locations`, `items`, `claims`, `honesty_logs`, `quizzes`, `quiz_questions`, `quiz_attempts`, `priority_transactions`, `notifications`.

---

### C. Cek Data Sudah Masuk dengan Benar

#### C.1 — Cek lewat klik kanan
Klik kanan tabel apapun → **View Data → All Rows** (atau tekan F4 dengan tabel dipilih).

#### C.2 — Cek lewat SQL Editor (recommended)

Buka **SQL Editor** baru (Ctrl+Alt+Enter di connection), paste & jalankan query verifikasi ini satu per satu (blok query → Ctrl+Enter):

```sql
-- 1) Jumlah baris di setiap tabel utama (harus > 0 setelah seed)
SELECT 'users' AS tabel, COUNT(*) FROM users
UNION ALL SELECT 'locations', COUNT(*) FROM locations
UNION ALL SELECT 'items', COUNT(*) FROM items
UNION ALL SELECT 'honesty_logs', COUNT(*) FROM honesty_logs
UNION ALL SELECT 'quizzes', COUNT(*) FROM quizzes
UNION ALL SELECT 'quiz_questions', COUNT(*) FROM quiz_questions
UNION ALL SELECT 'notifications', COUNT(*) FROM notifications;

-- 2) Lihat semua user demo
SELECT email, full_name, role, honesty_points FROM users ORDER BY honesty_points DESC;

-- 3) Lihat semua barang yang dilaporkan
SELECT title, type, category, status, location_text, date_event
FROM items ORDER BY created_at DESC;

-- 4) Lihat soal kuis integritas
SELECT display_order, question, correct_answer FROM quiz_questions ORDER BY display_order;

-- 5) Lihat lokasi QR code
SELECT name, building, qr_code FROM locations;
```

**Hasil yang benar:**
- `users` = 5 baris
- `locations` = 4 baris
- `items` = 5 baris
- `quiz_questions` = 5 baris
- `quizzes` = 1 baris
- `honesty_logs` = 8 baris
- `notifications` = 2 baris

Kalau jumlahnya beda atau ada error `relation does not exist` → schema/seed belum berhasil di-import. Ulangi langkah B.3 dan B.4.

#### C.3 — Cek Foreign Key & Relasi

Klik tabel `items` di sidebar → tab **ER Diagram** → kamu akan lihat relasi `items → users` dan `items → locations`. Ini bukti FK aktif.

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

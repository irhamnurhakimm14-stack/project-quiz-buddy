# 🔍 KETEMU — Lost & Found Kampus (MVP Minggu 1)

> Aplikasi web sederhana untuk melaporkan barang **hilang** dan **temuan** di lingkungan kampus.
> **Stack:** PHP murni · PostgreSQL · Bootstrap 5
> **Tim:** Kelompok 5 — Siti Fayza Kamila · Abiyyu Ghulmy · Irham Nurhakim

---

## 📁 Struktur Project

```
ketemu/
├── php/                      ← INI yang akan kamu jalankan
│   ├── config/
│   │   ├── koneksi.php       ← Edit user/password DB di sini
│   │   └── helpers.php
│   ├── sql/
│   │   ├── skema.sql         ← Import ke DBeaver dulu
│   │   └── seed.sql          ← Data awal (akun demo, dll)
│   ├── templates/
│   │   ├── header.php
│   │   └── footer.php
│   ├── uploads/              ← Tempat foto upload tersimpan
│   ├── index.php             ← Beranda
│   ├── login.php
│   ├── register.php
│   ├── logout.php
│   ├── dashboard.php
│   ├── lapor.php             ← Form lapor + upload foto
│   └── list_barang.php       ← Daftar laporan + filter
└── README.md (file ini)
```

> ℹ️ Folder lain seperti `src/`, `node_modules/`, `package.json` dst. boleh **kamu hapus** — itu sisa scaffold dari Lovable yang tidak dipakai untuk MVP PHP ini.

---

## ⚙️ PERSIAPAN — Yang harus di-install

| Software        | Untuk apa                          | Link Download                                    |
|-----------------|------------------------------------|--------------------------------------------------|
| **XAMPP**       | Menjalankan PHP (Apache)           | https://www.apachefriends.org/                   |
| **PostgreSQL**  | Database (versi 14 / 15 / 16)      | https://www.postgresql.org/download/             |
| **DBeaver**     | GUI untuk lihat & isi database     | https://dbeaver.io/download/                     |
| **Git**         | Push ke GitHub                     | https://git-scm.com/                             |

> 💡 Saat install PostgreSQL, **catat password** untuk user `postgres`. Kita butuh nanti.

---

## 🗄️ LANGKAH 1 — Setup Database di DBeaver

### 1.1 Buka DBeaver → buat koneksi baru
1. Klik tombol **🔌 New Database Connection** (kiri atas).
2. Pilih **PostgreSQL** → klik **Next**.
3. Isi:
   - **Host:** `localhost`
   - **Port:** `5432`
   - **Database:** `postgres` (sementara, kita bikin yang baru di langkah berikutnya)
   - **Username:** `postgres`
   - **Password:** *(password yang kamu set saat install PostgreSQL)*
4. Klik **Test Connection** → kalau ✅ "Connected", klik **Finish**.

📸 **Screenshot 1:** Window konfigurasi koneksi DBeaver.
📸 **Screenshot 2:** Pop-up "Connected" hijau.

### 1.2 Buat database `ketemu_db`
1. Klik kanan koneksi `localhost` di sidebar → **SQL Editor → New SQL Script**.
2. Tempel & jalankan (klik ▶ atau `Ctrl+Enter`):
   ```sql
   CREATE DATABASE ketemu_db;
   ```
3. Klik kanan koneksi → **Refresh** (F5). Database `ketemu_db` muncul di sidebar.

### 1.3 Import skema (3 tabel)
1. Klik kanan **`ketemu_db`** → **SQL Editor → New SQL Script**.
   ⚠️ **Pastikan** judul tab editor menyebut `ketemu_db`, bukan `postgres`.
2. Buka file `php/sql/skema.sql` (di File Explorer atau VS Code), **copy semua isinya**.
3. Paste ke SQL editor DBeaver → tekan **`Alt+X`** (Execute SQL Script) atau klik kanan → **Execute → Execute SQL Script**.
4. Refresh sidebar (F5) → buka `ketemu_db` → `Schemas` → `public` → `Tables` → muncul **3 tabel**: `users`, `barang`, `laporan`.

📸 **Screenshot 3:** 3 tabel terlihat di sidebar DBeaver.

### 1.4 Import data awal (seed)
1. Buka SQL editor baru di `ketemu_db`.
2. Copy isi `php/sql/seed.sql` → paste → **Alt+X**.
3. Verifikasi data:
   ```sql
   SELECT COUNT(*) FROM users;     -- harus 3
   SELECT COUNT(*) FROM barang;    -- harus 6
   SELECT COUNT(*) FROM laporan;   -- harus 3
   SELECT * FROM users;
   ```

📸 **Screenshot 4:** Hasil `SELECT * FROM users` muncul 3 baris.

---

## 🖥️ LANGKAH 2 — Jalankan Project PHP

### 2.1 Pindahkan folder `php/` ke htdocs XAMPP
1. Buka folder XAMPP, biasanya:
   - Windows: `C:\xampp\htdocs\`
   - Mac: `/Applications/XAMPP/htdocs/`
2. **Copy** folder `php/` dari project kamu ke `htdocs/`.
3. **Rename** menjadi `ketemu`. Hasil akhirnya: `C:\xampp\htdocs\ketemu\`.

### 2.2 Aktifkan ekstensi PostgreSQL di PHP
1. Buka **XAMPP Control Panel** → klik **Config** di sebelah Apache → **PHP (php.ini)**.
2. Cari baris-baris ini, **hapus tanda `;` di depannya** (un-comment):
   ```ini
   extension=pdo_pgsql
   extension=pgsql
   ```
3. Simpan, lalu di XAMPP Control Panel klik **Stop** → **Start** Apache.

### 2.3 Sesuaikan koneksi DB
Buka `C:\xampp\htdocs\ketemu\config\koneksi.php` dengan editor (VS Code / Notepad).
Ganti baris ini sesuai password PostgreSQL kamu:
```php
$DB_PASS = "postgres";  // ← ganti dengan password milikmu
```

### 2.4 Jalankan!
1. Pastikan **Apache** dan **PostgreSQL** sama-sama nyala.
2. Buka browser → **http://localhost/ketemu/**

✅ Halaman beranda KETEMU muncul.

📸 **Screenshot 5:** Halaman beranda di browser.

### 2.5 Akun Demo (sudah ada dari seed)
| Email                          | Password    |
|--------------------------------|-------------|
| `fayza@student.ipb.ac.id`      | `password123` |
| `abiyyu@student.ipb.ac.id`     | `password123` |
| `irham@student.ipb.ac.id`      | `password123` |

---

## 🧪 LANGKAH 3 — Coba semua fitur

| Fitur                 | URL                              | Yang dilakukan                          |
|-----------------------|----------------------------------|------------------------------------------|
| Beranda + statistik   | `/ketemu/`                       | Lihat jumlah laporan & user              |
| Daftar akun           | `/ketemu/register.php`           | Buat akun baru                           |
| Masuk                 | `/ketemu/login.php`              | Login dengan akun demo                   |
| Dashboard             | `/ketemu/dashboard.php`          | Lihat laporan milikmu                    |
| Buat laporan          | `/ketemu/lapor.php`              | Form + upload gambar                     |
| Daftar laporan        | `/ketemu/list_barang.php`        | Filter hilang/temuan + cari              |

📸 Ambil screenshot tiap halaman untuk dokumentasi.

---

## 📤 LANGKAH 4 — Push ke GitHub

```bash
# Di folder project kamu (yang ada README ini)
git init
git add .
git commit -m "Initial commit: KETEMU MVP minggu 1 (PHP + PostgreSQL)"

# Buat repo kosong di github.com bernama 'ketemu', lalu:
git branch -M main
git remote add origin https://github.com/USERNAME-KAMU/ketemu.git
git push -u origin main
```

📸 **Screenshot 6:** Repository GitHub dengan file project muncul.

---

## 📸 BUKTI PENGERJAAN — Checklist Screenshot

Simpan semua di folder `docs/screenshots/`.

### ✅ 1) Setup Project
- [ ] `01-struktur-folder.png` — struktur folder di VS Code
- [ ] `02-xampp-running.png` — XAMPP Apache nyala (status hijau)
- [ ] `03-github-repo.png` — repository di GitHub

### ✅ 2) UI Sederhana
- [ ] `04-beranda.png` — halaman beranda
- [ ] `05-register.png` — form daftar
- [ ] `06-login.png` — form login
- [ ] `07-dashboard.png` — dashboard user
- [ ] `08-form-lapor.png` — form buat laporan
- [ ] `09-list-barang.png` — daftar laporan + filter
- [ ] `10-detail-with-foto.png` — laporan dengan foto upload

### ✅ 3) Database Setup
- [ ] `11-dbeaver-koneksi.png` — konfigurasi koneksi
- [ ] `12-dbeaver-connected.png` — pop-up "Connected" ✅
- [ ] `13-3-tabel.png` — 3 tabel (`users`, `barang`, `laporan`) di sidebar
- [ ] `14-select-users.png` — hasil `SELECT * FROM users`
- [ ] `15-select-laporan.png` — hasil `SELECT * FROM laporan`

---

## ❓ Troubleshooting

| Masalah                                      | Solusi                                                                |
|----------------------------------------------|-----------------------------------------------------------------------|
| `could not find driver`                      | Ekstensi `pdo_pgsql` belum aktif. Cek langkah **2.2**.                |
| `Connection refused` / `password auth failed`| Password di `koneksi.php` salah, atau service PostgreSQL belum nyala. |
| Halaman blank putih                          | Tambah `error_reporting(E_ALL); ini_set('display_errors',1);` di atas file. |
| Foto tidak ke-upload                         | Folder `php/uploads/` harus writable (Linux/Mac: `chmod 777`).        |
| Login "Email atau password salah" (akun demo)| Pastikan kamu jalankan `seed.sql` di database `ketemu_db`, bukan `postgres`. |

---

**© 2026 KETEMU — Kelompok 5 IPB University**

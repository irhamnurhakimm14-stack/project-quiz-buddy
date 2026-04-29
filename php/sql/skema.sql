-- ============================================================
-- KETEMU MVP — Skema Database PostgreSQL
-- 3 tabel sederhana: users, barang, laporan
-- ============================================================

DROP TABLE IF EXISTS laporan CASCADE;
DROP TABLE IF EXISTS barang CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ----------- TABLE USERS -----------
CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    nama        VARCHAR(100) NOT NULL,
    email       VARCHAR(120) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,  -- disimpan ter-hash (password_hash)
    no_hp       VARCHAR(20),
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------- TABLE BARANG -----------
-- Master data jenis barang (opsional, bisa dipakai sebagai kategori)
CREATE TABLE barang (
    id          SERIAL PRIMARY KEY,
    nama        VARCHAR(100) NOT NULL,
    kategori    VARCHAR(50)  NOT NULL,
    deskripsi   TEXT,
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------- TABLE LAPORAN -----------
-- Laporan kehilangan / penemuan barang oleh user
CREATE TABLE laporan (
    id           SERIAL PRIMARY KEY,
    user_id      INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    barang_id    INT REFERENCES barang(id) ON DELETE SET NULL,
    jenis        VARCHAR(10) NOT NULL CHECK (jenis IN ('hilang','temuan')),
    judul        VARCHAR(150) NOT NULL,
    deskripsi    TEXT NOT NULL,
    lokasi       VARCHAR(150),
    tanggal      DATE NOT NULL,
    foto         VARCHAR(255),
    status       VARCHAR(20) DEFAULT 'aktif',  -- aktif, selesai
    dibuat_pada  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index untuk pencarian
CREATE INDEX idx_laporan_jenis ON laporan(jenis);
CREATE INDEX idx_laporan_user  ON laporan(user_id);

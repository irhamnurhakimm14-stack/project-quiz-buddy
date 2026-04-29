-- ============================================================
-- KETEMU MVP — Data Awal (Seed)
-- ============================================================

-- Password semua user demo: "password123"
-- Hash di bawah dibuat dengan password_hash('password123', PASSWORD_DEFAULT)
INSERT INTO users (nama, email, password, no_hp) VALUES
('Siti Fayza Kamila', 'fayza@student.ipb.ac.id',
 '$2y$10$zg5UH3gpTun8EgUAn89xseQWT3AVH4b1NcEIJXQv8T6oW1L5NJmCS', '081234567890'),
('Abiyyu Ghulmy',     'abiyyu@student.ipb.ac.id',
 '$2y$10$zg5UH3gpTun8EgUAn89xseQWT3AVH4b1NcEIJXQv8T6oW1L5NJmCS', '081234567891'),
('Irham Nurhakim',    'irham@student.ipb.ac.id',
 '$2y$10$zg5UH3gpTun8EgUAn89xseQWT3AVH4b1NcEIJXQv8T6oW1L5NJmCS', '081234567892');

INSERT INTO barang (nama, kategori, deskripsi) VALUES
('Kartu Tanda Mahasiswa', 'Kartu Identitas', 'Kartu identitas mahasiswa kampus'),
('Dompet',                'Dompet',           'Dompet kulit / kain berisi kartu & uang'),
('Botol Minum',           'Botol Minum',      'Tumbler / botol minum stainless / plastik'),
('Kunci',                 'Kunci',            'Kunci kost / motor / loker'),
('Smartphone',            'Elektronik',       'Telepon genggam berbagai merek'),
('Tas Ransel',            'Tas',              'Tas ransel / selempang mahasiswa');

INSERT INTO laporan (user_id, barang_id, jenis, judul, deskripsi, lokasi, tanggal, status) VALUES
(1, 1, 'hilang', 'KTM atas nama Siti Fayza',
 'Hilang KTM warna biru di area Fakultas Ekonomi sekitar pukul 10 pagi.',
 'Fakultas Ekonomi IPB', CURRENT_DATE - INTERVAL '2 day', 'aktif'),
(2, 3, 'temuan', 'Botol Minum Hitam Merk Tupperware',
 'Menemukan botol minum hitam di meja perpustakaan lantai 2.',
 'Perpustakaan Lt.2', CURRENT_DATE - INTERVAL '1 day', 'aktif'),
(3, 4, 'hilang', 'Kunci motor Honda',
 'Kehilangan kunci motor dengan gantungan kunci doraemon.',
 'Parkiran GWW', CURRENT_DATE, 'aktif');

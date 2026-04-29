-- ============================================================
-- KETEMU - Seed Data
-- Password untuk semua user demo: "password123"
-- bcrypt hash di bawah ini valid untuk "password123"
-- ============================================================

INSERT INTO users (id, email, password_hash, full_name, nim, phone, role, faculty, honesty_points, is_verified) VALUES
('11111111-1111-1111-1111-111111111111', 'admin@ketemu.id',  '$2b$10$LO.6hqNAu78uyTyr18bLyuVDEO4Dzfw8O39BUJVKHntmf.YkImeLy', 'Admin KETEMU', NULL, '081200000001', 'admin',   'Universitas', 0,   TRUE),
('22222222-2222-2222-2222-222222222222', 'fayza@student.ipb.ac.id', '$2b$10$LO.6hqNAu78uyTyr18bLyuVDEO4Dzfw8O39BUJVKHntmf.YkImeLy', 'Siti Fayza Kamila', 'A24210001', '082123466074', 'student', 'FEM', 120, TRUE),
('33333333-3333-3333-3333-333333333333', 'irham@student.ipb.ac.id', '$2b$10$LO.6hqNAu78uyTyr18bLyuVDEO4Dzfw8O39BUJVKHntmf.YkImeLy', 'Muhammad Irham Nurhakim', 'A24210002', '081234567890', 'student', 'FMIPA', 85, TRUE),
('44444444-4444-4444-4444-444444444444', 'abi@student.ipb.ac.id',   '$2b$10$LO.6hqNAu78uyTyr18bLyuVDEO4Dzfw8O39BUJVKHntmf.YkImeLy', 'Abiyyurasyiddhiya Ghulmy', 'G64210003', '081298765432', 'student', 'Ilkom', 200, TRUE),
('55555555-5555-5555-5555-555555555555', 'budi.kantin@ketemu.id',   '$2b$10$LO.6hqNAu78uyTyr18bLyuVDEO4Dzfw8O39BUJVKHntmf.YkImeLy', 'Pak Budi (Kantin)', NULL, '081311112222', 'vendor', 'Kantin Sapta', 60, TRUE);

INSERT INTO locations (id, name, building, description, qr_code, latitude, longitude) VALUES
('a0000000-0000-0000-0000-000000000001', 'Kantin Sapta', 'Sapta Lounge', 'Kantin pusat IPB Dramaga', 'QR-SAPTA-001', -6.5598, 106.7251),
('a0000000-0000-0000-0000-000000000002', 'GWW Lobby',    'Graha Widya Wisuda', 'Lobby utama GWW', 'QR-GWW-001', -6.5610, 106.7240),
('a0000000-0000-0000-0000-000000000003', 'Perpustakaan LSI', 'LSI', 'Lobby Perpustakaan', 'QR-LSI-001', -6.5587, 106.7260),
('a0000000-0000-0000-0000-000000000004', 'Masjid Al-Hurriyyah', 'Masjid Kampus', 'Pelataran masjid', 'QR-MAH-001', -6.5592, 106.7245);

INSERT INTO items (id, user_id, type, title, description, category, image_url, location_id, location_text, date_event, status, is_priority) VALUES
('b0000000-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 'lost',  'KTM IPB atas nama Siti Fayza',     'Kartu mahasiswa hilang sekitar lobby GWW. Mohon bantuan.', 'Kartu Identitas', NULL, 'a0000000-0000-0000-0000-000000000002', 'GWW Lobby',    CURRENT_DATE - 2, 'approved', TRUE),
('b0000000-0000-0000-0000-000000000002', '33333333-3333-3333-3333-333333333333', 'lost',  'Kunci motor Honda Beat hitam',      'Gantungan boneka kucing kuning. Hilang di parkiran FMIPA.', 'Kunci', NULL, NULL, 'Parkiran FMIPA', CURRENT_DATE - 1, 'approved', FALSE),
('b0000000-0000-0000-0000-000000000003', '55555555-5555-5555-5555-555555555555', 'found', 'Dompet kulit warna coklat',         'Ditemukan di meja kantin Sapta. Isi: KTP, KTM, beberapa kartu.', 'Dompet', NULL, 'a0000000-0000-0000-0000-000000000001', 'Kantin Sapta', CURRENT_DATE, 'approved', FALSE),
('b0000000-0000-0000-0000-000000000004', '44444444-4444-4444-4444-444444444444', 'found', 'AirPods Pro case putih',            'Ketemu di meja baca lantai 2 Perpustakaan LSI.', 'Elektronik', NULL, 'a0000000-0000-0000-0000-000000000003', 'Perpustakaan LSI', CURRENT_DATE - 3, 'approved', FALSE),
('b0000000-0000-0000-0000-000000000005', '22222222-2222-2222-2222-222222222222', 'found', 'Botol minum tumbler hijau',         'Ada stiker laboratorium kimia. Ditemukan di Masjid Al-Hurriyyah.', 'Botol Minum', NULL, 'a0000000-0000-0000-0000-000000000004', 'Masjid Al-Hurriyyah', CURRENT_DATE - 1, 'approved', FALSE);

INSERT INTO honesty_logs (user_id, points, reason, reference_type) VALUES
('22222222-2222-2222-2222-222222222222', 50,  'Mengembalikan barang temuan', 'item'),
('22222222-2222-2222-2222-222222222222', 20,  'Lulus Kuis Integritas',       'quiz'),
('22222222-2222-2222-2222-222222222222', 50,  'Verifikasi akun kampus',      'profile'),
('33333333-3333-3333-3333-333333333333', 25,  'Menemukan dan melapor',       'item'),
('33333333-3333-3333-3333-333333333333', 60,  'Klaim valid terkonfirmasi',   'claim'),
('44444444-4444-4444-4444-444444444444', 100, 'Top kontributor bulan ini',   'event'),
('44444444-4444-4444-4444-444444444444', 100, 'Menyerahkan barang ke pemilik','item'),
('55555555-5555-5555-5555-555555555555', 60,  'Karyawan kantin terverifikasi','profile');

-- ============== KUIS INTEGRITAS ==============
INSERT INTO quizzes (id, title, description, points_reward) VALUES
('c0000000-0000-0000-0000-000000000001', 'Kuis Integritas Dasar', 'Uji pemahamanmu tentang kejujuran dan integritas digital di kampus.', 20);

INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, display_order) VALUES
('c0000000-0000-0000-0000-000000000001', 'Kamu menemukan dompet di kantin. Apa yang seharusnya kamu lakukan?',
 'Mengambil isinya', 'Membiarkannya', 'Melaporkan via KETEMU dengan foto & lokasi', 'Memberikan ke teman', 'C',
 'Pelaporan terstruktur memastikan barang sampai ke pemilik aslinya.', 1),
('c0000000-0000-0000-0000-000000000001', 'Apa fungsi utama Honesty Points di KETEMU?',
 'Hadiah uang tunai', 'Apresiasi terukur untuk perilaku jujur', 'Mata uang jual-beli', 'Tidak ada gunanya', 'B',
 'Honesty Points adalah sistem gamifikasi terhadap integritas.', 2),
('c0000000-0000-0000-0000-000000000001', 'Saat mengklaim barang, bukti apa yang paling kuat?',
 'Mengaku kenal', 'Foto detail unik & deskripsi rinci yang hanya pemilik tahu', 'Suara pelan', 'Memohon-mohon', 'B',
 'Bukti detail unik mencegah klaim palsu.', 3),
('c0000000-0000-0000-0000-000000000001', 'Mengapa verifikasi lokasi (QR) penting?',
 'Sekedar ramai', 'Membuktikan kehadiran fisik & mencegah laporan palsu', 'Untuk iklan', 'Tidak penting', 'B',
 'QR Code lokasi mengikat laporan ke titik fisik kampus.', 4),
('c0000000-0000-0000-0000-000000000001', 'Mana sikap yang TIDAK mencerminkan integritas digital?',
 'Tidak menyebar identitas orang lain', 'Memvalidasi info sebelum share', 'Membuat laporan palsu untuk lucu-lucuan', 'Menjaga privasi', 'C',
 'Laporan palsu merusak kepercayaan komunitas.', 5);

-- ============== NOTIFIKASI DEMO ==============
INSERT INTO notifications (user_id, title, body, link) VALUES
('22222222-2222-2222-2222-222222222222', 'Selamat datang di KETEMU!', 'Akunmu sudah terverifikasi. Mulai dengan Kuis Integritas untuk +20 poin.', '/quiz'),
('33333333-3333-3333-3333-333333333333', 'Ada klaim baru pada laporanmu', 'Seseorang mengklaim "Kunci motor Honda Beat hitam". Cek detailnya.', '/items');

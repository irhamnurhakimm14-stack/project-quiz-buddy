<?php
$judul_halaman = "Beranda";
require __DIR__ . '/templates/header.php';

// Statistik singkat
$tot_hilang = $pdo->query("SELECT COUNT(*) FROM laporan WHERE jenis='hilang' AND status='aktif'")->fetchColumn();
$tot_temuan = $pdo->query("SELECT COUNT(*) FROM laporan WHERE jenis='temuan' AND status='aktif'")->fetchColumn();
$tot_user   = $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
?>

<div class="p-5 mb-4 bg-white rounded-3 shadow-sm">
  <div class="container-fluid py-4">
    <h1 class="display-5 fw-bold">KETEMU 🔍</h1>
    <p class="col-md-8 fs-5 text-muted">
      Platform Lost &amp; Found sederhana untuk warga kampus.
      Laporkan barang yang hilang atau yang kamu temukan.
    </p>
    <?php if (!user_aktif()): ?>
      <a href="register.php" class="btn btn-primary btn-lg me-2">Daftar Sekarang</a>
      <a href="list_barang.php" class="btn btn-outline-primary btn-lg">Lihat Laporan</a>
    <?php else: ?>
      <a href="lapor.php" class="btn btn-primary btn-lg me-2">+ Buat Laporan</a>
      <a href="list_barang.php" class="btn btn-outline-primary btn-lg">Lihat Daftar</a>
    <?php endif; ?>
  </div>
</div>

<div class="row g-3">
  <div class="col-md-4">
    <div class="card text-center p-4">
      <div class="display-6 text-danger fw-bold"><?= $tot_hilang ?></div>
      <div class="text-muted">Barang Hilang</div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card text-center p-4">
      <div class="display-6 text-success fw-bold"><?= $tot_temuan ?></div>
      <div class="text-muted">Barang Temuan</div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card text-center p-4">
      <div class="display-6 text-primary fw-bold"><?= $tot_user ?></div>
      <div class="text-muted">Pengguna Terdaftar</div>
    </div>
  </div>
</div>

<?php require __DIR__ . '/templates/footer.php'; ?>

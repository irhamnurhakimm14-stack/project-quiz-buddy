<?php
require_once __DIR__ . '/../config/koneksi.php';
require_once __DIR__ . '/../config/helpers.php';
?>
<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= isset($judul_halaman) ? htmlspecialchars($judul_halaman) . ' — KETEMU' : 'KETEMU — Lost & Found Kampus' ?></title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">
<style>
  body { background:#f6f7fb; }
  .navbar-brand { font-weight:700; letter-spacing:-.5px; }
  .card { border:0; box-shadow:0 2px 8px rgba(0,0,0,.05); }
  .badge-hilang { background:#dc3545; }
  .badge-temuan { background:#198754; }
</style>
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
  <div class="container">
    <a class="navbar-brand" href="index.php">
      <i class="bi bi-search-heart"></i> KETEMU
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="nav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item"><a class="nav-link" href="list_barang.php">Daftar Laporan</a></li>
        <?php if (user_aktif()): ?>
          <li class="nav-item"><a class="nav-link" href="lapor.php">+ Buat Laporan</a></li>
          <li class="nav-item"><a class="nav-link" href="dashboard.php">Dashboard</a></li>
        <?php endif; ?>
      </ul>
      <ul class="navbar-nav">
        <?php if (user_aktif()): ?>
          <li class="nav-item">
            <span class="nav-link">Halo, <b><?= htmlspecialchars(nama_user()) ?></b></span>
          </li>
          <li class="nav-item">
            <a class="btn btn-sm btn-warning ms-2" href="logout.php">Keluar</a>
          </li>
        <?php else: ?>
          <li class="nav-item"><a class="nav-link" href="login.php">Masuk</a></li>
          <li class="nav-item"><a class="btn btn-sm btn-warning ms-2" href="register.php">Daftar</a></li>
        <?php endif; ?>
      </ul>
    </div>
  </div>
</nav>

<main class="container pb-5">
<?php tampil_flash(); ?>

<?php
require_once __DIR__ . '/config/koneksi.php';
require_once __DIR__ . '/config/helpers.php';
harus_login();

$uid = user_aktif();
$saya  = $pdo->prepare("SELECT * FROM users WHERE id=?"); $saya->execute([$uid]);
$user = $saya->fetch();

$lap   = $pdo->prepare("SELECT * FROM laporan WHERE user_id=? ORDER BY dibuat_pada DESC");
$lap->execute([$uid]);
$laporan_saya = $lap->fetchAll();

$judul_halaman = "Dashboard";
require __DIR__ . '/templates/header.php';
?>

<div class="card p-4 mb-4">
  <h3>Halo, <?= htmlspecialchars($user['nama']) ?> 👋</h3>
  <div class="text-muted">
    <i class="bi bi-envelope"></i> <?= htmlspecialchars($user['email']) ?>
    <?php if ($user['no_hp']): ?>
      &nbsp;·&nbsp; <i class="bi bi-telephone"></i> <?= htmlspecialchars($user['no_hp']) ?>
    <?php endif; ?>
  </div>
</div>

<div class="d-flex justify-content-between align-items-center mb-3">
  <h4 class="mb-0">Laporan Saya (<?= count($laporan_saya) ?>)</h4>
  <a href="lapor.php" class="btn btn-primary"><i class="bi bi-plus-lg"></i> Buat Laporan</a>
</div>

<?php if (!$laporan_saya): ?>
  <div class="alert alert-light text-center">
    Kamu belum membuat laporan apa pun.
    <a href="lapor.php">Buat laporan pertamamu →</a>
  </div>
<?php else: ?>
  <div class="row g-3">
    <?php foreach ($laporan_saya as $l): ?>
      <div class="col-md-6">
        <div class="card p-3 h-100">
          <div class="d-flex justify-content-between mb-2">
            <span class="badge <?= $l['jenis']==='hilang'?'badge-hilang':'badge-temuan' ?>">
              <?= strtoupper($l['jenis']) ?>
            </span>
            <small class="text-muted"><?= date('d M Y', strtotime($l['tanggal'])) ?></small>
          </div>
          <h5 class="mb-1"><?= htmlspecialchars($l['judul']) ?></h5>
          <div class="text-muted small mb-2">
            <i class="bi bi-geo-alt"></i> <?= htmlspecialchars($l['lokasi']) ?>
          </div>
          <p class="mb-2"><?= nl2br(htmlspecialchars(substr($l['deskripsi'],0,120))) ?>...</p>
          <?php if ($l['foto']): ?>
            <img src="uploads/<?= htmlspecialchars($l['foto']) ?>" class="img-fluid rounded" style="max-height:160px;object-fit:cover">
          <?php endif; ?>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
<?php endif; ?>

<?php require __DIR__ . '/templates/footer.php'; ?>

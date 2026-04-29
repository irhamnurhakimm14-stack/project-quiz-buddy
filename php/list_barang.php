<?php
require_once __DIR__ . '/config/koneksi.php';
require_once __DIR__ . '/config/helpers.php';

$jenis = $_GET['jenis'] ?? 'semua';
$cari  = trim($_GET['q'] ?? '');

$sql = "SELECT l.*, u.nama AS pelapor, u.no_hp, b.kategori
        FROM laporan l
        JOIN users u  ON u.id = l.user_id
        LEFT JOIN barang b ON b.id = l.barang_id
        WHERE l.status='aktif'";
$param = [];

if (in_array($jenis, ['hilang','temuan'])) {
    $sql .= " AND l.jenis = ?"; $param[] = $jenis;
}
if ($cari !== '') {
    $sql .= " AND (l.judul ILIKE ? OR l.deskripsi ILIKE ? OR l.lokasi ILIKE ?)";
    array_push($param, "%$cari%", "%$cari%", "%$cari%");
}
$sql .= " ORDER BY l.dibuat_pada DESC";

$stmt = $pdo->prepare($sql); $stmt->execute($param);
$data = $stmt->fetchAll();

$judul_halaman = "Daftar Laporan";
require __DIR__ . '/templates/header.php';
?>

<div class="card p-3 mb-3">
  <form class="row g-2" method="get">
    <div class="col-md-6">
      <input type="text" name="q" class="form-control" placeholder="Cari judul, deskripsi, lokasi..." value="<?= htmlspecialchars($cari) ?>">
    </div>
    <div class="col-md-3">
      <select name="jenis" class="form-select">
        <option value="semua"  <?= $jenis==='semua' ?'selected':'' ?>>Semua jenis</option>
        <option value="hilang" <?= $jenis==='hilang'?'selected':'' ?>>🔴 Hilang</option>
        <option value="temuan" <?= $jenis==='temuan'?'selected':'' ?>>🟢 Temuan</option>
      </select>
    </div>
    <div class="col-md-3">
      <button class="btn btn-primary w-100">Filter</button>
    </div>
  </form>
</div>

<h4>Ditemukan <?= count($data) ?> laporan</h4>

<div class="row g-3">
  <?php if (!$data): ?>
    <div class="col-12">
      <div class="alert alert-light text-center">Tidak ada laporan yang cocok.</div>
    </div>
  <?php endif; ?>

  <?php foreach ($data as $l): ?>
    <div class="col-md-6 col-lg-4">
      <div class="card h-100">
        <?php if ($l['foto']): ?>
          <img src="uploads/<?= htmlspecialchars($l['foto']) ?>" class="card-img-top" style="height:200px;object-fit:cover">
        <?php else: ?>
          <div class="bg-light d-flex align-items-center justify-content-center" style="height:200px">
            <i class="bi bi-image text-muted" style="font-size:3rem"></i>
          </div>
        <?php endif; ?>
        <div class="card-body">
          <div class="d-flex justify-content-between mb-2">
            <span class="badge <?= $l['jenis']==='hilang'?'badge-hilang':'badge-temuan' ?>">
              <?= strtoupper($l['jenis']) ?>
            </span>
            <small class="text-muted"><?= date('d M Y', strtotime($l['tanggal'])) ?></small>
          </div>
          <h5><?= htmlspecialchars($l['judul']) ?></h5>
          <p class="text-muted small mb-2">
            <i class="bi bi-geo-alt"></i> <?= htmlspecialchars($l['lokasi'] ?: '-') ?>
          </p>
          <p class="mb-2"><?= nl2br(htmlspecialchars(substr($l['deskripsi'],0,100))) ?>...</p>
          <hr class="my-2">
          <div class="small">
            <i class="bi bi-person"></i> <?= htmlspecialchars($l['pelapor']) ?>
            <?php if ($l['no_hp']): ?>
              <br><i class="bi bi-telephone"></i>
              <a href="https://wa.me/<?= preg_replace('/^0/','62',$l['no_hp']) ?>" target="_blank">
                <?= htmlspecialchars($l['no_hp']) ?>
              </a>
            <?php endif; ?>
          </div>
        </div>
      </div>
    </div>
  <?php endforeach; ?>
</div>

<?php require __DIR__ . '/templates/footer.php'; ?>

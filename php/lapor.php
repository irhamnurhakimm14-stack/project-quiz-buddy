<?php
require_once __DIR__ . '/config/koneksi.php';
require_once __DIR__ . '/config/helpers.php';
harus_login();

$daftar_barang = $pdo->query("SELECT * FROM barang ORDER BY nama")->fetchAll();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $jenis     = $_POST['jenis'] ?? 'hilang';
    $judul     = trim($_POST['judul'] ?? '');
    $deskripsi = trim($_POST['deskripsi'] ?? '');
    $lokasi    = trim($_POST['lokasi'] ?? '');
    $tanggal   = $_POST['tanggal'] ?? date('Y-m-d');
    $barang_id = !empty($_POST['barang_id']) ? (int)$_POST['barang_id'] : null;
    $foto_db   = null;

    // Upload gambar
    if (!empty($_FILES['foto']['name'])) {
        $folder = __DIR__ . '/uploads';
        if (!is_dir($folder)) mkdir($folder, 0777, true);
        $ext   = strtolower(pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION));
        $allow = ['jpg','jpeg','png','gif','webp'];
        if (in_array($ext, $allow) && $_FILES['foto']['size'] < 5 * 1024 * 1024) {
            $nama_file = uniqid('lap_') . '.' . $ext;
            if (move_uploaded_file($_FILES['foto']['tmp_name'], "$folder/$nama_file")) {
                $foto_db = $nama_file;
            }
        } else {
            flash("Foto harus jpg/png/gif/webp dan < 5MB.", "error");
        }
    }

    if ($judul && $deskripsi) {
        $stmt = $pdo->prepare("
            INSERT INTO laporan (user_id, barang_id, jenis, judul, deskripsi, lokasi, tanggal, foto)
            VALUES (?,?,?,?,?,?,?,?)
        ");
        $stmt->execute([user_aktif(), $barang_id, $jenis, $judul, $deskripsi, $lokasi, $tanggal, $foto_db]);
        flash("Laporan berhasil dikirim! 🎉");
        header("Location: list_barang.php"); exit;
    } else {
        flash("Judul dan deskripsi wajib diisi.", "error");
    }
}

$judul_halaman = "Buat Laporan";
require __DIR__ . '/templates/header.php';
?>

<div class="row justify-content-center">
  <div class="col-md-8">
    <div class="card p-4">
      <h3 class="mb-3">Buat Laporan</h3>
      <form method="post" enctype="multipart/form-data">
        <div class="mb-3">
          <label class="form-label">Jenis laporan</label>
          <div class="d-flex gap-3">
            <label class="form-check">
              <input class="form-check-input" type="radio" name="jenis" value="hilang" checked>
              <span class="form-check-label">🔴 Saya kehilangan</span>
            </label>
            <label class="form-check">
              <input class="form-check-input" type="radio" name="jenis" value="temuan">
              <span class="form-check-label">🟢 Saya menemukan</span>
            </label>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Judul singkat</label>
          <input type="text" name="judul" class="form-control" required placeholder="Contoh: KTM atas nama Andi">
        </div>

        <div class="mb-3">
          <label class="form-label">Deskripsi detail</label>
          <textarea name="deskripsi" class="form-control" rows="4" required placeholder="Warna, ciri unik, kondisi..."></textarea>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Kategori barang</label>
            <select name="barang_id" class="form-select">
              <option value="">— Pilih —</option>
              <?php foreach ($daftar_barang as $b): ?>
                <option value="<?= $b['id'] ?>"><?= htmlspecialchars($b['nama']) ?> (<?= htmlspecialchars($b['kategori']) ?>)</option>
              <?php endforeach; ?>
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Tanggal kejadian</label>
            <input type="date" name="tanggal" class="form-control" value="<?= date('Y-m-d') ?>" required>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Lokasi</label>
          <input type="text" name="lokasi" class="form-control" placeholder="Contoh: Perpustakaan Lt.2, dekat jendela">
        </div>

        <div class="mb-3">
          <label class="form-label">Foto (opsional, max 5MB)</label>
          <input type="file" name="foto" class="form-control" accept="image/*">
        </div>

        <button type="submit" class="btn btn-primary btn-lg w-100">Kirim Laporan</button>
      </form>
    </div>
  </div>
</div>

<?php require __DIR__ . '/templates/footer.php'; ?>

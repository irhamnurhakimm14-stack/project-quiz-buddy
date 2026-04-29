<?php
require_once __DIR__ . '/config/koneksi.php';
require_once __DIR__ . '/config/helpers.php';

if (!empty($_SESSION['user_id'])) { header("Location: dashboard.php"); exit; }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nama     = trim($_POST['nama'] ?? '');
    $email    = trim($_POST['email'] ?? '');
    $no_hp    = trim($_POST['no_hp'] ?? '');
    $password = $_POST['password'] ?? '';

    if (strlen($password) < 6) {
        flash("Password minimal 6 karakter.", "error");
    } else {
        $cek = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $cek->execute([$email]);
        if ($cek->fetch()) {
            flash("Email sudah terdaftar.", "error");
        } else {
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO users (nama, email, password, no_hp) VALUES (?,?,?,?)");
            $stmt->execute([$nama, $email, $hash, $no_hp]);
            flash("Pendaftaran berhasil! Silakan masuk.");
            header("Location: login.php"); exit;
        }
    }
}

$judul_halaman = "Daftar";
require __DIR__ . '/templates/header.php';
?>

<div class="row justify-content-center">
  <div class="col-md-5">
    <div class="card p-4">
      <h3 class="mb-3 text-center">Daftar Akun</h3>
      <form method="post">
        <div class="mb-3">
          <label class="form-label">Nama lengkap</label>
          <input type="text" name="nama" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Email kampus</label>
          <input type="email" name="email" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">No. HP (opsional)</label>
          <input type="text" name="no_hp" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">Password (min. 6 karakter)</label>
          <input type="password" name="password" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary w-100">Daftar</button>
      </form>
      <p class="text-center mt-3 mb-0">
        Sudah punya akun? <a href="login.php">Masuk</a>
      </p>
    </div>
  </div>
</div>

<?php require __DIR__ . '/templates/footer.php'; ?>

<?php
require_once __DIR__ . '/config/koneksi.php';
require_once __DIR__ . '/config/helpers.php';

if (!empty($_SESSION['user_id'])) { header("Location: dashboard.php"); exit; }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['nama']    = $user['nama'];
        flash("Selamat datang, {$user['nama']}!");
        header("Location: dashboard.php"); exit;
    } else {
        flash("Email atau password salah.", "error");
    }
}

$judul_halaman = "Masuk";
require __DIR__ . '/templates/header.php';
?>

<div class="row justify-content-center">
  <div class="col-md-5">
    <div class="card p-4">
      <h3 class="mb-3 text-center">Masuk ke KETEMU</h3>
      <form method="post">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" name="email" class="form-control" required value="fayza@student.ipb.ac.id">
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" name="password" class="form-control" required value="password123">
        </div>
        <button type="submit" class="btn btn-primary w-100">Masuk</button>
      </form>
      <p class="text-center mt-3 mb-0">
        Belum punya akun? <a href="register.php">Daftar</a>
      </p>
      <div class="alert alert-info small mt-3 mb-0">
        <b>Akun demo:</b><br>
        fayza@student.ipb.ac.id / password123
      </div>
    </div>
  </div>
</div>

<?php require __DIR__ . '/templates/footer.php'; ?>

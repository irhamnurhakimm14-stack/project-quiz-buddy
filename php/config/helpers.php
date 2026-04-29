<?php
// Helper kecil: cek login & redirect

function harus_login() {
    if (empty($_SESSION['user_id'])) {
        header("Location: login.php");
        exit;
    }
}

function user_aktif() {
    return $_SESSION['user_id'] ?? null;
}

function nama_user() {
    return $_SESSION['nama'] ?? 'Pengguna';
}

function flash($msg, $tipe = 'success') {
    $_SESSION['flash'] = ['msg' => $msg, 'tipe' => $tipe];
}

function tampil_flash() {
    if (!empty($_SESSION['flash'])) {
        $f = $_SESSION['flash'];
        unset($_SESSION['flash']);
        $kelas = $f['tipe'] === 'error' ? 'alert-danger' : 'alert-success';
        echo "<div class='alert $kelas alert-dismissible fade show' role='alert'>"
           . htmlspecialchars($f['msg'])
           . "<button type='button' class='btn-close' data-bs-dismiss='alert'></button></div>";
    }
}

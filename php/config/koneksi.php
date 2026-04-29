<?php
// ============================================
// KONEKSI DATABASE POSTGRESQL — KETEMU MVP
// ============================================
// Ubah nilai di bawah sesuai konfigurasi PostgreSQL kamu

$DB_HOST = "localhost";
$DB_PORT = "5432";
$DB_NAME = "ketemu_db";
$DB_USER = "postgres";
$DB_PASS = "postgres"; // ganti sesuai password PostgreSQL kamu

try {
    $dsn = "pgsql:host=$DB_HOST;port=$DB_PORT;dbname=$DB_NAME";
    $pdo = new PDO($dsn, $DB_USER, $DB_PASS, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    die("❌ Koneksi database gagal: " . $e->getMessage());
}

// Mulai session global
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

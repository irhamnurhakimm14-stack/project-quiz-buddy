<?php
require_once __DIR__ . '/config/koneksi.php';
require_once __DIR__ . '/config/helpers.php';
session_destroy();
header("Location: index.php");
exit;

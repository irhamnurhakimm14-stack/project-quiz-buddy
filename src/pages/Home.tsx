// Halaman ini hanya untuk preview di Lovable.
// Aplikasi yang sebenarnya ada di folder /php/ dan dijalankan via XAMPP.
// Lihat README.md untuk panduan lengkap.

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-3">🔍 KETEMU — MVP Minggu 1</h1>
      <p className="text-muted-foreground mb-6">
        Project utama berada di folder <code className="bg-muted px-1.5 py-0.5 rounded">php/</code>{" "}
        (PHP murni + PostgreSQL + Bootstrap 5).
      </p>

      <div className="border border-border rounded-lg p-5 mb-4 bg-card">
        <h2 className="font-semibold mb-2">📂 Cara menjalankan</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Copy folder <code>php/</code> ke <code>C:\xampp\htdocs\ketemu\</code></li>
          <li>Import <code>php/sql/skema.sql</code> &amp; <code>seed.sql</code> di DBeaver</li>
          <li>Edit <code>php/config/koneksi.php</code> sesuai password PostgreSQL</li>
          <li>Buka <code>http://localhost/ketemu/</code></li>
        </ol>
      </div>

      <div className="border border-border rounded-lg p-5 bg-card">
        <h2 className="font-semibold mb-2">📖 Panduan lengkap</h2>
        <p className="text-sm">
          Buka file <code className="bg-muted px-1.5 py-0.5 rounded">README.md</code> di
          root project — sudah ada langkah-langkah XAMPP, DBeaver, dan GitHub.
        </p>
      </div>

      <p className="text-xs text-muted-foreground mt-6">
        Preview Lovable ini <b>bukan aplikasi sebenarnya</b> — aplikasi PHP harus
        dijalankan di laptop kamu sendiri.
      </p>
    </div>
  );
}

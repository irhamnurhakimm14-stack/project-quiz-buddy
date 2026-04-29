import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Layout>
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-3">
            <i className="bi bi-search me-2"></i>KETEMU
          </h1>
          <p className="lead mb-4">
            Platform Lost &amp; Found Kampus — barang hilang? Pasti KETEMU.
          </p>
          <div className="d-flex gap-2 justify-content-center flex-wrap">
            <Link to="/lapor" className="btn btn-light btn-lg">
              <i className="bi bi-megaphone me-2"></i>Buat Laporan
            </Link>
            <Link to="/list-barang" className="btn btn-outline-light btn-lg">
              <i className="bi bi-list-ul me-2"></i>Lihat Daftar
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <i className="bi bi-person-plus display-5 text-primary"></i>
                <h5 className="card-title mt-3">Daftar Akun</h5>
                <p className="card-text text-muted">
                  Buat akun pakai email kampus untuk mulai melapor barang hilang atau temuan.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <i className="bi bi-megaphone display-5 text-primary"></i>
                <h5 className="card-title mt-3">Lapor Barang</h5>
                <p className="card-text text-muted">
                  Isi form: jenis (hilang/temuan), judul, deskripsi, lokasi, dan upload foto.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <i className="bi bi-list-check display-5 text-primary"></i>
                <h5 className="card-title mt-3">Cari &amp; Temukan</h5>
                <p className="card-text text-muted">
                  Lihat daftar laporan aktif, filter berdasarkan jenis, dan cari sesuai kata kunci.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="alert alert-info mt-5 mb-0" role="alert">
          <i className="bi bi-info-circle me-2"></i>
          <strong>Catatan:</strong> Preview ini adalah <em>mirror UI</em> dari aplikasi PHP.
          Backend asli (PHP + PostgreSQL) ada di folder <code>php/</code> — jalankan via XAMPP
          di <code>http://localhost/ketemu/</code>. Lihat <code>README.md</code>.
        </div>
      </section>
    </Layout>
  );
};

export default Home;

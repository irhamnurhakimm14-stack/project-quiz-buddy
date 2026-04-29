import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, getLaporan, Laporan } from "@/mock/data";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [list, setList] = useState<Laporan[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setList(getLaporan().filter((l) => l.user_id === user.id));
  }, [user, navigate]);

  if (!user) return null;

  const total = list.length;
  const aktif = list.filter((l) => l.status === "aktif").length;
  const selesai = list.filter((l) => l.status === "selesai").length;

  return (
    <Layout>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h3 className="mb-1">Dashboard</h3>
            <p className="text-muted mb-0">Halo, <strong>{user.nama}</strong> 👋</p>
          </div>
          <Link to="/lapor" className="btn btn-primary">
            <i className="bi bi-plus-circle me-1"></i>Buat Laporan Baru
          </Link>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card text-bg-primary shadow-sm">
              <div className="card-body">
                <h6 className="card-subtitle">Total Laporan</h6>
                <h2 className="mb-0">{total}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-bg-warning shadow-sm">
              <div className="card-body">
                <h6 className="card-subtitle">Aktif</h6>
                <h2 className="mb-0">{aktif}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-bg-success shadow-sm">
              <div className="card-body">
                <h6 className="card-subtitle">Selesai</h6>
                <h2 className="mb-0">{selesai}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-header bg-white">
            <strong>Laporan Saya</strong>
          </div>
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Jenis</th>
                  <th>Judul</th>
                  <th>Lokasi</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {list.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-muted py-4">
                      Belum ada laporan. <Link to="/lapor">Buat laporan pertamamu</Link>.
                    </td>
                  </tr>
                ) : (
                  list.map((l, i) => (
                    <tr key={l.id}>
                      <td>{i + 1}</td>
                      <td>
                        <span
                          className={`badge ${
                            l.jenis === "hilang" ? "text-bg-danger" : "text-bg-success"
                          }`}
                        >
                          {l.jenis.toUpperCase()}
                        </span>
                      </td>
                      <td>{l.judul}</td>
                      <td>{l.lokasi}</td>
                      <td>{l.tanggal}</td>
                      <td>
                        <span className="badge text-bg-secondary">{l.status}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

import Layout from "@/components/Layout";
import { useMemo, useState } from "react";
import { getLaporan } from "@/mock/data";

const ListBarang = () => {
  const [q, setQ] = useState("");
  const [jenis, setJenis] = useState<"semua" | "hilang" | "temuan">("semua");
  const data = getLaporan();

  const filtered = useMemo(() => {
    return data.filter((l) => {
      const matchJ = jenis === "semua" || l.jenis === jenis;
      const matchQ =
        q === "" ||
        l.judul.toLowerCase().includes(q.toLowerCase()) ||
        l.lokasi.toLowerCase().includes(q.toLowerCase()) ||
        l.barang_nama.toLowerCase().includes(q.toLowerCase());
      return matchJ && matchQ;
    });
  }, [data, q, jenis]);

  return (
    <Layout>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h3 className="mb-0">
            <i className="bi bi-list-ul me-2"></i>Daftar Laporan
          </h3>
          <span className="badge text-bg-primary fs-6">{filtered.length} laporan</span>
        </div>

        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <div className="row g-2">
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="🔎 Cari judul, lokasi, atau kategori..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <select
                  className="form-select"
                  value={jenis}
                  onChange={(e) => setJenis(e.target.value as "semua" | "hilang" | "temuan")}
                >
                  <option value="semua">Semua Jenis</option>
                  <option value="hilang">Hilang</option>
                  <option value="temuan">Temuan</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="alert alert-light border text-center">
            Tidak ada laporan yang cocok.
          </div>
        ) : (
          <div className="row g-3">
            {filtered.map((l) => (
              <div className="col-md-6 col-lg-4" key={l.id}>
                <div className="card h-100 shadow-sm border-0">
                  {l.foto ? (
                    <img
                      src={l.foto}
                      alt={l.judul}
                      className="card-img-top"
                      style={{ height: 180, objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      className="bg-light d-flex align-items-center justify-content-center text-muted"
                      style={{ height: 180 }}
                    >
                      <i className="bi bi-image" style={{ fontSize: 48 }}></i>
                    </div>
                  )}
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                      <span
                        className={`badge ${
                          l.jenis === "hilang" ? "text-bg-danger" : "text-bg-success"
                        }`}
                      >
                        {l.jenis.toUpperCase()}
                      </span>
                      <small className="text-muted">{l.tanggal}</small>
                    </div>
                    <h6 className="card-title">{l.judul}</h6>
                    <p className="card-text small text-muted mb-2">
                      {l.deskripsi.length > 80
                        ? l.deskripsi.slice(0, 80) + "..."
                        : l.deskripsi}
                    </p>
                    <ul className="list-unstyled small mb-0">
                      <li>
                        <i className="bi bi-tag me-1"></i>
                        {l.barang_nama}
                      </li>
                      <li>
                        <i className="bi bi-geo-alt me-1"></i>
                        {l.lokasi}
                      </li>
                      <li>
                        <i className="bi bi-person me-1"></i>
                        {l.user_nama}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ListBarang;

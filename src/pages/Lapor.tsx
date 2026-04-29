import Layout from "@/components/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addLaporan, getCurrentUser, kategoriBarang } from "@/mock/data";

const Lapor = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [form, setForm] = useState({
    jenis: "hilang" as "hilang" | "temuan",
    barang_nama: kategoriBarang[0],
    judul: "",
    deskripsi: "",
    lokasi: "",
    tanggal: new Date().toISOString().slice(0, 10),
  });
  const [foto, setFoto] = useState<string | undefined>();
  const [ok, setOk] = useState("");

  if (!user) {
    return (
      <Layout>
        <div className="container">
          <div className="alert alert-warning">
            Kamu harus login dulu untuk membuat laporan.{" "}
            <a href="/login">Login di sini</a>.
          </div>
        </div>
      </Layout>
    );
  }

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setFoto(reader.result as string);
    reader.readAsDataURL(f);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    addLaporan({
      ...form,
      user_id: user.id,
      user_nama: user.nama,
      status: "aktif",
      foto,
    });
    setOk("Laporan berhasil disimpan!");
    setTimeout(() => navigate("/list-barang"), 1200);
  };

  return (
    <Layout>
      <div className="container" style={{ maxWidth: 720 }}>
        <h3 className="mb-4">
          <i className="bi bi-megaphone me-2"></i>Buat Laporan
        </h3>

        {ok && <div className="alert alert-success">{ok}</div>}

        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <form onSubmit={submit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Jenis Laporan</label>
                  <select
                    className="form-select"
                    value={form.jenis}
                    onChange={(e) =>
                      setForm({ ...form, jenis: e.target.value as "hilang" | "temuan" })
                    }
                  >
                    <option value="hilang">Barang Hilang</option>
                    <option value="temuan">Barang Temuan</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Kategori Barang</label>
                  <select
                    className="form-select"
                    value={form.barang_nama}
                    onChange={(e) => setForm({ ...form, barang_nama: e.target.value })}
                  >
                    {kategoriBarang.map((k) => (
                      <option key={k}>{k}</option>
                    ))}
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label">Judul Laporan</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contoh: KTM atas nama Budi"
                    value={form.judul}
                    onChange={(e) => setForm({ ...form, judul: e.target.value })}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Deskripsi</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Ciri-ciri detail, warna, merek, kondisi..."
                    value={form.deskripsi}
                    onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-8">
                  <label className="form-label">Lokasi</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contoh: Perpustakaan Lt.2"
                    value={form.lokasi}
                    onChange={(e) => setForm({ ...form, lokasi: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Tanggal</label>
                  <input
                    type="date"
                    className="form-control"
                    value={form.tanggal}
                    onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Foto Barang (opsional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={onFile}
                  />
                  {foto && (
                    <img
                      src={foto}
                      alt="preview"
                      className="img-thumbnail mt-2"
                      style={{ maxHeight: 180 }}
                    />
                  )}
                </div>
              </div>
              <div className="d-flex gap-2 mt-4">
                <button className="btn btn-primary" type="submit">
                  <i className="bi bi-send me-1"></i>Kirim Laporan
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate(-1)}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Lapor;

import Layout from "@/components/Layout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "@/mock/data";

const Register = () => {
  const [form, setForm] = useState({ nama: "", email: "", no_hp: "", password: "" });
  const [ok, setOk] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({ id: 99, nama: form.nama, email: form.email, no_hp: form.no_hp });
    setOk("Registrasi berhasil! Mengarahkan ke dashboard...");
    setTimeout(() => navigate("/dashboard"), 1000);
  };

  return (
    <Layout>
      <div className="container" style={{ maxWidth: 460 }}>
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <h3 className="card-title text-center mb-4">
              <i className="bi bi-person-plus me-2"></i>Daftar Akun
            </h3>
            {ok && <div className="alert alert-success py-2">{ok}</div>}
            <form onSubmit={submit}>
              <div className="mb-3">
                <label className="form-label">Nama Lengkap</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email Kampus</label>
                <input
                  type="email"
                  className="form-control"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">No. HP</label>
                <input
                  type="tel"
                  className="form-control"
                  value={form.no_hp}
                  onChange={(e) => setForm({ ...form, no_hp: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  minLength={6}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <div className="form-text">Minimal 6 karakter.</div>
              </div>
              <button className="btn btn-primary w-100" type="submit">
                Daftar
              </button>
            </form>
            <p className="text-center mt-3 mb-0">
              Sudah punya akun? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;

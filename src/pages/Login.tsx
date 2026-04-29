import Layout from "@/components/Layout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginMock, setCurrentUser } from "@/mock/data";

const Login = () => {
  const [email, setEmail] = useState("fayza@student.ipb.ac.id");
  const [password, setPassword] = useState("password123");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const u = loginMock(email, password);
    if (!u) {
      setErr("Email atau password salah. Coba akun demo di bawah.");
      return;
    }
    setCurrentUser(u);
    navigate("/dashboard");
  };

  return (
    <Layout>
      <div className="container" style={{ maxWidth: 460 }}>
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <h3 className="card-title text-center mb-4">
              <i className="bi bi-box-arrow-in-right me-2"></i>Login
            </h3>
            {err && <div className="alert alert-danger py-2">{err}</div>}
            <form onSubmit={submit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary w-100" type="submit">
                Login
              </button>
            </form>
            <hr />
            <p className="small text-muted mb-1">Akun demo:</p>
            <ul className="small text-muted mb-0">
              <li>fayza@student.ipb.ac.id</li>
              <li>abiyyu@student.ipb.ac.id</li>
              <li>Password: <code>password123</code></li>
            </ul>
            <p className="text-center mt-3 mb-0">
              Belum punya akun? <Link to="/register">Daftar</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

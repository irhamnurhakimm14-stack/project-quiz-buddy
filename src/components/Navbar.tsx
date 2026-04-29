import { Link, NavLink, useNavigate } from "react-router-dom";
import { getCurrentUser, setCurrentUser } from "@/mock/data";

const Navbar = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const logout = () => {
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-search me-2"></i>KETEMU
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMain"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMain">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/list-barang">
                <i className="bi bi-list-ul me-1"></i>List Barang
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/lapor">
                <i className="bi bi-megaphone me-1"></i>Lapor
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">
                  <i className="bi bi-speedometer2 me-1"></i>Dashboard
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    <i className="bi bi-person-circle me-1"></i>
                    {user.nama}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-light btn-sm ms-2" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-light btn-sm ms-2" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

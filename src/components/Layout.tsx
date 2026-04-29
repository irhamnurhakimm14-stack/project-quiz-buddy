import { ReactNode } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-vh-100 d-flex flex-column bg-light">
    <Navbar />
    <main className="flex-grow-1 py-4">{children}</main>
    <footer className="bg-dark text-light py-3 text-center small">
      © 2026 KETEMU — MVP Minggu 1 · PHP + PostgreSQL + Bootstrap 5
    </footer>
  </div>
);

export default Layout;

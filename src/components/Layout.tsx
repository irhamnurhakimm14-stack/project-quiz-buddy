import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border bg-muted/30 mt-20">
        <div className="container py-10 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="font-display font-bold text-lg mb-2">KETEMU</div>
            <p className="text-muted-foreground">
              Platform Lost & Found Terintegrasi untuk Ekosistem Kampus Modern di Indonesia.
            </p>
          </div>
          <div>
            <div className="font-semibold mb-2">Navigasi</div>
            <ul className="space-y-1 text-muted-foreground">
              <li><Link to="/items" className="hover:text-foreground">Jelajahi Laporan</Link></li>
              <li><Link to="/quiz" className="hover:text-foreground">Kuis Integritas</Link></li>
              <li><Link to="/leaderboard" className="hover:text-foreground">Leaderboard</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Tim Kelompok 5</div>
            <ul className="space-y-1 text-muted-foreground">
              <li>Siti Fayza Kamila — CEO</li>
              <li>Abiyyurasyiddhiya Ghulmy — CTO</li>
              <li>Muhammad Irham Nurhakim — CMO/CFO</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
          © 2026 KETEMU — Kelompok 5 · IPB University
        </div>
      </footer>
    </div>
  );
}

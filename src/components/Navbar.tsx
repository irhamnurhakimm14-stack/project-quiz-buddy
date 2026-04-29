import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/ketemu-logo.png";
import { Button } from "@/components/ui/button";
import { Sparkles, LogOut, User as UserIcon, Shield } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const navItem = "px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-smooth";
  const active = "text-primary font-semibold";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="KETEMU" className="h-9 w-9" width={36} height={36} />
          <span className="font-display font-bold text-xl tracking-tight">KETEMU</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/items" className={({isActive}) => `${navItem} ${isActive ? active : ""}`}>Jelajahi</NavLink>
          <NavLink to="/leaderboard" className={({isActive}) => `${navItem} ${isActive ? active : ""}`}>Leaderboard</NavLink>
          <NavLink to="/quiz" className={({isActive}) => `${navItem} ${isActive ? active : ""}`}>Kuis Integritas</NavLink>
          {user?.role === "admin" && (
            <NavLink to="/admin" className={({isActive}) => `${navItem} ${isActive ? active : ""}`}>Admin</NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/report" className="hidden sm:inline-flex">
                <Button variant="hero" size="sm">+ Lapor</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
                  <Avatar className="h-9 w-9 border-2 border-secondary">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {user.full_name.split(" ").map(s=>s[0]).slice(0,2).join("")}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>
                    <div className="font-semibold">{user.full_name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary/15 text-secondary-foreground text-xs font-semibold">
                      <Sparkles className="h-3 w-3" /> {user.honesty_points} Honesty Points
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => nav("/profile")}>
                    <UserIcon className="h-4 w-4 mr-2" /> Profil saya
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem onClick={() => nav("/admin")}>
                      <Shield className="h-4 w-4 mr-2" /> Admin panel
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { logout(); nav("/"); }}>
                    <LogOut className="h-4 w-4 mr-2" /> Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/login"><Button variant="ghost" size="sm">Masuk</Button></Link>
              <Link to="/register"><Button variant="hero" size="sm">Daftar Gratis</Button></Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

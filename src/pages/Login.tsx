import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import logo from "@/assets/ketemu-logo.png";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("fayza@student.ipb.ac.id");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try { await login(email, password); toast.success("Selamat datang kembali!"); nav("/items"); }
    catch (e: any) { toast.error(e.message || "Gagal login"); }
    finally { setLoading(false); }
  };

  return (
    <Layout>
      <div className="container py-16 max-w-md">
        <Card className="p-8 shadow-elegant">
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="KETEMU" className="h-14 w-14 mb-3" />
            <h1 className="font-display text-2xl font-bold">Masuk ke KETEMU</h1>
            <p className="text-sm text-muted-foreground">Lanjutkan kontribusimu</p>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Kampus</Label>
              <Input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            </div>
            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading ? "Memproses..." : "Masuk"}
            </Button>
          </form>
          <p className="text-sm text-center mt-6 text-muted-foreground">
            Belum punya akun? <Link to="/register" className="text-primary font-semibold">Daftar gratis</Link>
          </p>
          <div className="mt-6 p-3 rounded-lg bg-muted text-xs text-muted-foreground">
            <div className="font-semibold mb-1">Akun demo:</div>
            <div>fayza@student.ipb.ac.id / password123</div>
            <div>admin@ketemu.id / password123 (admin)</div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

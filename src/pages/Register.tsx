import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({
    full_name: "", email: "", password: "", nim: "", phone: "",
    role: "student", faculty: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => setForm(s => ({ ...s, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error("Password minimal 6 karakter");
    setLoading(true);
    try { await register(form); toast.success("Akun berhasil dibuat!"); nav("/items"); }
    catch (e: any) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  return (
    <Layout>
      <div className="container py-16 max-w-lg">
        <Card className="p-8 shadow-elegant">
          <h1 className="font-display text-2xl font-bold mb-1">Daftar KETEMU</h1>
          <p className="text-sm text-muted-foreground mb-6">Mulai berkontribusi & kumpulkan Honesty Points</p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label>Nama Lengkap</Label>
              <Input value={form.full_name} onChange={e=>set("full_name", e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Email Kampus</Label>
                <Input type="email" value={form.email} onChange={e=>set("email", e.target.value)} required />
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" value={form.password} onChange={e=>set("password", e.target.value)} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>NIM (opsional)</Label>
                <Input value={form.nim} onChange={e=>set("nim", e.target.value)} />
              </div>
              <div>
                <Label>No. WA</Label>
                <Input value={form.phone} onChange={e=>set("phone", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Peran</Label>
                <Select value={form.role} onValueChange={v=>set("role", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Mahasiswa</SelectItem>
                    <SelectItem value="staff">Dosen / Staff</SelectItem>
                    <SelectItem value="vendor">Karyawan Kantin / Vendor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Fakultas / Unit</Label>
                <Input value={form.faculty} onChange={e=>set("faculty", e.target.value)} />
              </div>
            </div>
            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading ? "Memproses..." : "Daftar Sekarang"}
            </Button>
          </form>
          <p className="text-sm text-center mt-6 text-muted-foreground">
            Sudah punya akun? <Link to="/login" className="text-primary font-semibold">Masuk</Link>
          </p>
        </Card>
      </div>
    </Layout>
  );
}

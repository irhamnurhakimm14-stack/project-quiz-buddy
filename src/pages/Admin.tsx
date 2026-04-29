import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Package, CheckCircle2, DollarSign, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function Admin() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);

  const load = () => {
    api("/admin/stats").then(setStats);
    api("/admin/items").then(setItems as any);
  };
  useEffect(() => { if (user?.role === "admin") load(); }, [user]);

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Layout><div className="container py-20 text-center"><AlertCircle className="h-12 w-12 mx-auto text-destructive mb-2"/><h1 className="font-display text-2xl font-bold">Akses ditolak</h1><p className="text-muted-foreground">Halaman ini hanya untuk admin.</p></div></Layout>;

  const update = async (id: string, status: string) => {
    await api(`/admin/items/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
    toast.success("Status diperbarui");
    load();
  };

  return (
    <Layout>
      <div className="container py-10">
        <h1 className="font-display text-3xl font-bold mb-6">Admin Dashboard</h1>

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Stat icon={Users} label="Pengguna" value={stats.total_users} />
            <Stat icon={Package} label="Total Laporan" value={stats.total_items} />
            <Stat icon={CheckCircle2} label="Selesai" value={stats.total_resolved} />
            <Stat icon={DollarSign} label="Pendapatan Priority" value={`Rp ${Number(stats.revenue_priority).toLocaleString("id-ID")}`} />
          </div>
        )}

        <Card className="p-5">
          <h2 className="font-display font-bold text-xl mb-4">Moderasi Laporan</h2>
          <div className="space-y-2">
            {items.map(it => (
              <div key={it.id} className="p-4 border border-border rounded-lg flex items-center gap-3 flex-wrap">
                <Badge variant={it.type==="lost"?"destructive":"default"} className={it.type==="found"?"bg-accent text-accent-foreground":""}>
                  {it.type}
                </Badge>
                <div className="flex-1 min-w-[200px]">
                  <div className="font-semibold">{it.title}</div>
                  <div className="text-xs text-muted-foreground">{it.reporter_name} · {it.category}</div>
                </div>
                <Badge variant="outline">{it.status}</Badge>
                <div className="flex gap-2">
                  {it.status !== "approved" && <Button size="sm" variant="hero" onClick={()=>update(it.id,"approved")}>Setujui</Button>}
                  {it.status !== "rejected" && <Button size="sm" variant="outline" onClick={()=>update(it.id,"rejected")}>Tolak</Button>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}

function Stat({ icon: Icon, label, value }: any) {
  return (
    <Card className="p-5">
      <Icon className="h-6 w-6 text-primary mb-2" />
      <div className="text-2xl font-display font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </Card>
  );
}

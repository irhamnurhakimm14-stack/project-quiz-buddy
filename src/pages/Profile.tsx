import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function Profile() {
  const { user, refresh } = useAuth();
  const [logs, setLogs] = useState<any[]>([]);
  const [myClaims, setMyClaims] = useState<any[]>([]);
  const [incoming, setIncoming] = useState<any[]>([]);

  const loadAll = () => {
    api("/honesty/me").then(setLogs as any);
    api("/claims/mine").then(setMyClaims as any);
    api("/claims/incoming").then(setIncoming as any);
  };
  useEffect(() => { if (user) loadAll(); }, [user]);

  if (!user) return <Navigate to="/login" />;

  const reviewClaim = async (id: string, status: "approved" | "rejected") => {
    await api(`/claims/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
    toast.success(status === "approved" ? "Klaim disetujui, barang dikembalikan!" : "Klaim ditolak.");
    loadAll(); refresh();
  };

  return (
    <Layout>
      <div className="container py-10 max-w-4xl">
        <Card className="p-6 mb-6 gradient-hero text-primary-foreground">
          <div className="flex items-center gap-5 flex-wrap">
            <Avatar className="h-20 w-20 border-4 border-secondary">
              <AvatarFallback className="bg-secondary text-secondary-foreground text-xl font-bold">
                {user.full_name.split(" ").map(s=>s[0]).slice(0,2).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold">{user.full_name}</h1>
              <p className="opacity-80 text-sm">{user.email} · {user.role}</p>
              <p className="opacity-70 text-sm">{user.faculty || ""}</p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-bold text-lg">
                <Sparkles className="h-5 w-5" /> {user.honesty_points}
              </div>
              <div className="text-xs opacity-80 mt-1">Honesty Points</div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="incoming">
          <TabsList>
            <TabsTrigger value="incoming">Klaim Masuk ({incoming.length})</TabsTrigger>
            <TabsTrigger value="mine">Klaim Saya ({myClaims.length})</TabsTrigger>
            <TabsTrigger value="logs">Riwayat Poin</TabsTrigger>
          </TabsList>

          <TabsContent value="incoming" className="space-y-3 mt-4">
            {incoming.length === 0 && <p className="text-muted-foreground text-center py-6">Belum ada klaim masuk.</p>}
            {incoming.map(c => (
              <Card key={c.id} className="p-5">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex-1 min-w-[200px]">
                    <div className="text-xs text-muted-foreground">Pada laporan</div>
                    <div className="font-semibold">{c.item_title}</div>
                    <div className="text-sm mt-2">Diklaim oleh <span className="font-semibold">{c.claimant_name}</span> · <span className="text-secondary">{c.claimant_points} poin</span></div>
                    <p className="text-sm text-muted-foreground mt-2 italic">"{c.proof_text}"</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge variant={c.status==="pending"?"outline":c.status==="approved"?"default":"destructive"}
                           className={c.status==="approved"?"bg-success text-success-foreground":""}>
                      {c.status}
                    </Badge>
                    {c.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="hero" onClick={() => reviewClaim(c.id, "approved")}>Setuju</Button>
                        <Button size="sm" variant="outline" onClick={() => reviewClaim(c.id, "rejected")}>Tolak</Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="mine" className="space-y-3 mt-4">
            {myClaims.length === 0 && <p className="text-muted-foreground text-center py-6">Kamu belum mengklaim apapun.</p>}
            {myClaims.map(c => (
              <Card key={c.id} className="p-5 flex justify-between items-center gap-3">
                <div>
                  <div className="font-semibold">{c.item_title}</div>
                  <div className="text-sm text-muted-foreground">{format(new Date(c.created_at),"dd MMM yyyy")}</div>
                </div>
                <Badge className={c.status==="approved"?"bg-success text-success-foreground":""}
                       variant={c.status==="approved"?"default":c.status==="rejected"?"destructive":"outline"}>
                  {c.status}
                </Badge>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="logs" className="space-y-2 mt-4">
            {logs.length === 0 && <p className="text-muted-foreground text-center py-6">Belum ada riwayat poin.</p>}
            {logs.map(l => (
              <Card key={l.id} className="p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium">{l.reason}</div>
                  <div className="text-xs text-muted-foreground">{format(new Date(l.created_at),"dd MMM yyyy HH:mm")}</div>
                </div>
                <div className={`font-display font-bold ${l.points>=0?"text-success":"text-destructive"}`}>
                  {l.points >= 0 ? "+" : ""}{l.points}
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

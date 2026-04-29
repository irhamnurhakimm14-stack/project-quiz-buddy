import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { MapPin, Calendar, Eye, Sparkles, Phone, Zap, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

export default function ItemDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const nav = useNavigate();
  const [item, setItem] = useState<any>(null);
  const [proof, setProof] = useState("");
  const [proofImg, setProofImg] = useState("");
  const [open, setOpen] = useState(false);

  const load = async () => setItem(await api(`/items/${id}`));
  useEffect(() => { load(); }, [id]);

  if (!item) return <Layout><div className="container py-20 text-center text-muted-foreground">Memuat...</div></Layout>;

  const submitClaim = async () => {
    if (!user) return nav("/login");
    if (proof.length < 20) return toast.error("Bukti minimal 20 karakter detail unik.");
    try {
      await api(`/items/${id}/claims`, { method: "POST", body: JSON.stringify({ proof_text: proof, proof_image_url: proofImg || null }) });
      toast.success("Klaim terkirim! Pelapor akan meninjau bukti kamu.");
      setOpen(false); setProof(""); setProofImg("");
    } catch (e: any) { toast.error(e.message); }
  };

  const buyPriority = async () => {
    try {
      await api(`/items/${id}/priority`, { method: "POST" });
      toast.success("Priority Broadcast aktif 72 jam!");
      load();
    } catch (e: any) { toast.error(e.message); }
  };

  const resolve = async () => {
    await api(`/items/${id}/resolve`, { method: "PATCH" });
    toast.success("Laporan ditandai selesai.");
    load();
  };

  const isOwner = user?.id === item.user_id;

  return (
    <Layout>
      <div className="container py-10 max-w-4xl">
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={item.type==="lost"?"destructive":"default"}
                     className={item.type==="found"?"bg-accent text-accent-foreground":""}>
                {item.type==="lost"?"HILANG":"DITEMUKAN"}
              </Badge>
              <Badge variant="outline">{item.category}</Badge>
              {item.is_priority && <Badge className="bg-secondary text-secondary-foreground gap-1"><Sparkles className="h-3 w-3"/>Priority</Badge>}
              {item.status === "resolved" && <Badge className="bg-success text-success-foreground gap-1"><CheckCircle2 className="h-3 w-3"/>Selesai</Badge>}
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold">{item.title}</h1>
          </div>
        </div>

        <Card className="p-6 mb-6 shadow-card">
          <p className="text-foreground leading-relaxed mb-6">{item.description}</p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-primary" />
              <div>
                <div className="text-muted-foreground">Lokasi</div>
                <div className="font-semibold">{item.location_name || item.location_text || "—"}</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="h-4 w-4 mt-0.5 text-primary" />
              <div>
                <div className="text-muted-foreground">Tanggal kejadian</div>
                <div className="font-semibold">{format(new Date(item.date_event),"dd MMMM yyyy")}</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Eye className="h-4 w-4 mt-0.5 text-primary" />
              <div>
                <div className="text-muted-foreground">Dilihat</div>
                <div className="font-semibold">{item.views} kali</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 mt-0.5 text-secondary" />
              <div>
                <div className="text-muted-foreground">Pelapor</div>
                <div className="font-semibold">{item.reporter_name} · {item.reporter_points} poin</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-wrap gap-3">
          {!isOwner && item.status !== "resolved" && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="hero" size="lg">Klaim Barang Ini</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Kirim bukti klaim</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Sebutkan detail unik yang hanya pemilik tahu (warna, goresan, isi, tulisan, dll).</p>
                  <div>
                    <Label>Bukti detail (min 20 karakter)</Label>
                    <Textarea rows={5} value={proof} onChange={e=>setProof(e.target.value)} placeholder="Contoh: di bagian belakang ada stiker laboratorium kimia, gantungan boneka kucing kuning..." />
                  </div>
                  <div>
                    <Label>URL foto bukti (opsional)</Label>
                    <Input value={proofImg} onChange={e=>setProofImg(e.target.value)} placeholder="https://..." />
                  </div>
                  <Button variant="hero" className="w-full" onClick={submitClaim}>Kirim Klaim</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
          {isOwner && !item.is_priority && item.status !== "resolved" && (
            <Button variant="navy" onClick={buyPriority}><Zap className="h-4 w-4" /> Aktifkan Priority Rp 5.000</Button>
          )}
          {isOwner && item.status !== "resolved" && (
            <Button variant="outline" onClick={resolve}>Tandai Selesai</Button>
          )}
          {isOwner && item.reporter_phone && (
            <a href={`https://wa.me/${item.reporter_phone.replace(/\D/g,"")}`} target="_blank" rel="noreferrer">
              <Button variant="outline"><Phone className="h-4 w-4" /> WhatsApp</Button>
            </a>
          )}
        </div>
      </div>
    </Layout>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const CATEGORIES = ["Kartu Identitas","Kunci","Dompet","Elektronik","Botol Minum","Buku","Pakaian","Tas","Lainnya"];

export default function Report() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [locations, setLocations] = useState<any[]>([]);
  const [form, setForm] = useState({
    type: "lost", title: "", description: "", category: "Kartu Identitas",
    location_id: "", location_text: "", date_event: new Date().toISOString().slice(0,10),
    image_url: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) nav("/login");
    api("/locations").then(setLocations);
  }, []);

  const set = (k: string, v: any) => setForm(s => ({ ...s, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, location_id: form.location_id || null };
      const it = await api<any>("/items", { method: "POST", body: JSON.stringify(payload) });
      toast.success(form.type === "found" ? "Terima kasih! +25 Honesty Points 🎉" : "Laporan terkirim!");
      nav(`/items/${it.id}`);
    } catch (e: any) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  return (
    <Layout>
      <div className="container py-10 max-w-2xl">
        <h1 className="font-display text-3xl font-bold mb-2">Buat Laporan</h1>
        <p className="text-muted-foreground mb-6">Detail yang lengkap mempercepat barang KETEMU.</p>
        <Card className="p-6">
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label className="mb-2 block">Jenis laporan</Label>
              <RadioGroup value={form.type} onValueChange={v=>set("type", v)} className="grid grid-cols-2 gap-3">
                <Label className={`p-4 rounded-xl border-2 cursor-pointer flex items-center gap-2 ${form.type==="lost"?"border-destructive bg-destructive/5":"border-border"}`}>
                  <RadioGroupItem value="lost" /> <span className="font-semibold">Saya kehilangan</span>
                </Label>
                <Label className={`p-4 rounded-xl border-2 cursor-pointer flex items-center gap-2 ${form.type==="found"?"border-accent bg-accent/5":"border-border"}`}>
                  <RadioGroupItem value="found" /> <span className="font-semibold">Saya menemukan</span>
                </Label>
              </RadioGroup>
            </div>
            <div>
              <Label>Judul singkat</Label>
              <Input value={form.title} onChange={e=>set("title", e.target.value)} required placeholder="Contoh: KTM atas nama Andi" />
            </div>
            <div>
              <Label>Deskripsi detail</Label>
              <Textarea rows={4} value={form.description} onChange={e=>set("description", e.target.value)} required placeholder="Warna, ciri unik, kondisi..." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Kategori</Label>
                <Select value={form.category} onValueChange={v=>set("category", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Tanggal</Label>
                <Input type="date" value={form.date_event} onChange={e=>set("date_event", e.target.value)} required />
              </div>
            </div>
            <div>
              <Label>Lokasi (titik QR)</Label>
              <Select value={form.location_id || "none"} onValueChange={v=>set("location_id", v==="none"?"":v)}>
                <SelectTrigger><SelectValue placeholder="Pilih titik kampus..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">— Tidak ada / lainnya —</SelectItem>
                  {locations.map((l:any) => <SelectItem key={l.id} value={l.id}>{l.name} — {l.qr_code}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Lokasi spesifik (teks)</Label>
              <Input value={form.location_text} onChange={e=>set("location_text", e.target.value)} placeholder="Contoh: meja paling pojok dekat jendela" />
            </div>
            <div>
              <Label>URL foto (opsional)</Label>
              <Input value={form.image_url} onChange={e=>set("image_url", e.target.value)} placeholder="https://..." />
            </div>
            <Button type="submit" variant="hero" className="w-full" size="lg" disabled={loading}>
              {loading ? "Memproses..." : "Kirim Laporan"}
            </Button>
          </form>
        </Card>
      </div>
    </Layout>
  );
}

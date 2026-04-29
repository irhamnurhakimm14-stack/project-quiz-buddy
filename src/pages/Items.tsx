import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Sparkles, Calendar, Eye, Filter } from "lucide-react";
import { format } from "date-fns";

type Item = {
  id: string; type: "lost"|"found"; title: string; description: string; category: string;
  image_url: string | null; location_text: string | null; location_name: string | null;
  date_event: string; reporter_name: string; reporter_points: number;
  is_priority: boolean; views: number; created_at: string;
};

const CATEGORIES = ["Kartu Identitas","Kunci","Dompet","Elektronik","Botol Minum","Buku","Pakaian","Tas","Lainnya"];

export default function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const [q, setQ] = useState("");
  const [type, setType] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (type !== "all") params.set("type", type);
    if (category !== "all") params.set("category", category);
    if (q) params.set("q", q);
    const data = await api<Item[]>(`/items?${params}`);
    setItems(data); setLoading(false);
  };

  useEffect(() => { load(); }, [type, category]);

  return (
    <Layout>
      <div className="container py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold">Jelajahi Laporan</h1>
            <p className="text-muted-foreground mt-1">Temukan barangmu atau bantu kembalikan barang teman.</p>
          </div>
          <Link to="/report"><Button variant="hero" size="lg">+ Lapor Sekarang</Button></Link>
        </div>

        <Card className="p-4 mb-6 flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-10" placeholder="Cari judul atau deskripsi..." value={q}
                   onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&load()} />
          </div>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="md:w-40"><SelectValue placeholder="Tipe" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tipe</SelectItem>
              <SelectItem value="lost">Hilang</SelectItem>
              <SelectItem value="found">Ditemukan</SelectItem>
            </SelectContent>
          </Select>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="md:w-52"><SelectValue placeholder="Kategori" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="navy" onClick={load}><Filter className="h-4 w-4" /> Terapkan</Button>
        </Card>

        {loading ? (
          <div className="text-center text-muted-foreground py-20">Memuat...</div>
        ) : items.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">Belum ada laporan untuk filter ini.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((it) => (
              <Link to={`/items/${it.id}`} key={it.id}>
                <Card className="p-5 h-full hover:shadow-elegant transition-smooth border-border hover:border-primary/30">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant={it.type === "lost" ? "destructive" : "default"}
                           className={it.type==="found" ? "bg-accent text-accent-foreground" : ""}>
                      {it.type === "lost" ? "HILANG" : "DITEMUKAN"}
                    </Badge>
                    {it.is_priority && (
                      <Badge className="bg-secondary text-secondary-foreground gap-1">
                        <Sparkles className="h-3 w-3" /> Priority
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-lg mb-1 line-clamp-1">{it.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{it.description}</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {it.location_name || it.location_text || "—"}</div>
                    <div className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {format(new Date(it.date_event),"dd MMM yyyy")}</div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">oleh <span className="font-semibold text-foreground">{it.reporter_name}</span></span>
                    <span className="inline-flex items-center gap-1 text-secondary font-semibold">
                      <Sparkles className="h-3 w-3" /> {it.reporter_points}
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

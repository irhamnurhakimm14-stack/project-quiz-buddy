import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import hero from "@/assets/hero-campus.jpg";
import { Search, Shield, Sparkles, MapPin, CheckCircle2, Users, ArrowRight, Trophy, Brain } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
        </div>
        <div className="container py-20 md:py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span>Platform Lost & Found Pertama Berbasis Integritas</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-balance leading-[1.05]">
              Barang hilang?<br />
              <span className="bg-clip-text text-transparent gradient-hero">Pasti KETEMU.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl text-balance">
              Satu ekosistem terpadu untuk seluruh civitas kampus — aman, transparan, dan diapresiasi
              lewat sistem <span className="font-semibold text-foreground">Honesty Points</span>.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/items"><Button variant="hero" size="lg" className="text-base">
                <Search className="h-5 w-5" /> Cari Barang
              </Button></Link>
              <Link to="/report"><Button variant="navy" size="lg" className="text-base">
                Laporkan <ArrowRight className="h-5 w-5" />
              </Button></Link>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg">
              {[
                { v: "1.200+", l: "Barang Kembali" },
                { v: "94%", l: "Klaim Valid" },
                { v: "5★", l: "Trust Score" },
              ].map((s) => (
                <div key={s.l} className="p-4 rounded-xl bg-card shadow-card border border-border">
                  <div className="font-display font-bold text-2xl text-primary">{s.v}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container py-20">
        <div className="max-w-2xl mb-12">
          <div className="text-sm font-semibold text-secondary uppercase tracking-wider">3 Pilar KETEMU</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">Dibangun dengan integritas</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Shield, t: "Verifikasi Inklusif", d: "Email kampus + QR Code lokasi merangkul mahasiswa hingga karyawan kantin." },
            { icon: CheckCircle2, t: "Moderasi Cermat", d: "Setiap laporan ditinjau admin terlatih untuk mencegah klaim palsu & spam." },
            { icon: Sparkles, t: "Honesty Points", d: "Apresiasi terukur untuk perilaku jujur — gamifikasi integritas digital." },
          ].map((f) => (
            <div key={f.t} className="p-8 rounded-2xl bg-card shadow-card border border-border hover:shadow-elegant transition-smooth">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{f.t}</h3>
              <p className="text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-muted/40 py-20">
        <div className="container">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-12">Cara kerja, sederhana.</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { n: "01", icon: MapPin,        t: "Lapor",     d: "Foto, deskripsi, lokasi QR/teks." },
              { n: "02", icon: Search,        t: "Telusur",   d: "Cari berdasarkan kategori & lokasi." },
              { n: "03", icon: Users,         t: "Klaim",     d: "Kirim bukti detail unik milikmu." },
              { n: "04", icon: Trophy,        t: "Apresiasi", d: "Honesty Points & leaderboard." },
            ].map((s) => (
              <div key={s.n} className="relative p-6 rounded-2xl bg-card border border-border">
                <div className="font-display text-5xl font-bold text-secondary/30">{s.n}</div>
                <s.icon className="h-6 w-6 text-primary absolute top-6 right-6" />
                <div className="font-display font-bold text-lg mt-2">{s.t}</div>
                <p className="text-sm text-muted-foreground mt-1">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA QUIZ */}
      <section className="container py-20">
        <div className="rounded-3xl gradient-hero p-10 md:p-16 text-primary-foreground relative overflow-hidden">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <Brain className="h-10 w-10 text-secondary mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Uji integritasmu, dapatkan poin.</h2>
            <p className="opacity-90 mb-6">Selesaikan Kuis Integritas dan kumpulkan Honesty Points pertamamu — tonggak awal jadi warga kampus yang amanah.</p>
            <Link to="/quiz"><Button variant="hero" size="lg">Mulai Kuis Integritas</Button></Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

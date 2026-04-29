// Mock data store untuk preview Lovable (frontend-only mirror dari PHP)
export type User = { id: number; nama: string; email: string; no_hp: string };
export type Barang = { id: number; nama: string; kategori: string };
export type Laporan = {
  id: number;
  user_id: number;
  user_nama: string;
  barang_nama: string;
  jenis: "hilang" | "temuan";
  judul: string;
  deskripsi: string;
  lokasi: string;
  tanggal: string;
  status: "aktif" | "selesai";
  foto?: string;
};

export const seedUsers: User[] = [
  { id: 1, nama: "Siti Fayza Kamila", email: "fayza@student.ipb.ac.id", no_hp: "081234567890" },
  { id: 2, nama: "Abiyyu Ghulmy", email: "abiyyu@student.ipb.ac.id", no_hp: "081234567891" },
  { id: 3, nama: "Irham Nurhakim", email: "irham@student.ipb.ac.id", no_hp: "081234567892" },
];

export const kategoriBarang = [
  "Kartu Identitas",
  "Dompet",
  "Botol Minum",
  "Kunci",
  "Elektronik",
  "Tas",
  "Lainnya",
];

const seedLaporan: Laporan[] = [
  {
    id: 1,
    user_id: 1,
    user_nama: "Siti Fayza Kamila",
    barang_nama: "KTM",
    jenis: "hilang",
    judul: "KTM atas nama Siti Fayza",
    deskripsi: "Hilang KTM warna biru di area Fakultas Ekonomi sekitar pukul 10 pagi.",
    lokasi: "Fakultas Ekonomi IPB",
    tanggal: "2026-04-27",
    status: "aktif",
  },
  {
    id: 2,
    user_id: 2,
    user_nama: "Abiyyu Ghulmy",
    barang_nama: "Botol Minum",
    jenis: "temuan",
    judul: "Botol Minum Hitam Merk Tupperware",
    deskripsi: "Menemukan botol minum hitam di meja perpustakaan lantai 2.",
    lokasi: "Perpustakaan Lt.2",
    tanggal: "2026-04-28",
    status: "aktif",
  },
  {
    id: 3,
    user_id: 3,
    user_nama: "Irham Nurhakim",
    barang_nama: "Kunci",
    jenis: "hilang",
    judul: "Kunci motor Honda",
    deskripsi: "Kehilangan kunci motor dengan gantungan kunci doraemon.",
    lokasi: "Parkiran GWW",
    tanggal: "2026-04-29",
    status: "aktif",
  },
];

const LAP_KEY = "ketemu_laporan";
const USER_KEY = "ketemu_user";

export function getLaporan(): Laporan[] {
  const raw = localStorage.getItem(LAP_KEY);
  if (!raw) {
    localStorage.setItem(LAP_KEY, JSON.stringify(seedLaporan));
    return seedLaporan;
  }
  return JSON.parse(raw);
}

export function addLaporan(l: Omit<Laporan, "id">): Laporan {
  const list = getLaporan();
  const baru = { ...l, id: Math.max(0, ...list.map((x) => x.id)) + 1 };
  list.unshift(baru);
  localStorage.setItem(LAP_KEY, JSON.stringify(list));
  return baru;
}

export function getCurrentUser(): User | null {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setCurrentUser(u: User | null) {
  if (u) localStorage.setItem(USER_KEY, JSON.stringify(u));
  else localStorage.removeItem(USER_KEY);
}

export function loginMock(email: string, password: string): User | null {
  // Demo: password apapun untuk email seed diterima (mirror seed.sql password123)
  if (password.length < 6) return null;
  const u = seedUsers.find((x) => x.email === email);
  return u ?? null;
}

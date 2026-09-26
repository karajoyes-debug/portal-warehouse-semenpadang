export type AppId = 'portal' | 'spkl' | 'irgr' | 'solar' | 'minmax' | 'arsip';

export type UserRole = 'manager' | 'staff' | 'supervisor';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  unit: string;
  avatar?: string;
}

export interface ExternalAppSettings {
  spklUrl: string;
  irgrUrl: string;
  solarUrl: string;
  minmaxUrl: string;
  arsipUrl: string;
}

export interface SpklRecord {
  id: string;
  noSpkl: string;
  tanggal: string;
  nama: string;
  badge: string;
  unitKerja: string;
  tipeKaryawan: 'Organik' | 'Non Organik';
  alasanLembur: string;
  uraianPekerjaan: string;
  jamMulai: string;
  jamSelesai: string;
  jumlahJam: number;
  statusApproval: 'Pending' | 'Disetujui' | 'Ditolak';
  disetujuiOleh?: string;
  createdAt: string;
}

export interface IrGrRecord {
  id: string;
  noPo: string;
  vendor: string;
  namaBarang: string;
  jumlahDiterima: number;
  satuan: string;
  tanggalTerima: string;
  statusQc: 'Menunggu QC' | 'Inspeksi Selesai' | 'Ditolak QC';
  noGrSap?: string;
  statusGr: 'Pending GR' | 'GR Terbit (MIGO)' | 'Parsial';
}

export interface SolarRecord {
  id: string;
  noSuratJalan: string;
  tanggalMasuk: string;
  vendorTransporter: string;
  nomorPolisiTruk: string;
  namaSopir: string;
  volumeSuratJalanLiter: number;
  soundingTinggiCm: number;
  volumeFisikDiterimaLiter: number;
  selisihLiter: number;
  densitas15C: number;
  tangkiTujuan: 'Tangki 01 (Utama)' | 'Tangki 02 (Cadangan)';
  petugasPenerima: string;
}

export interface MinMaxItem {
  id: string;
  kodeMaterial: string;
  namaMaterial: string;
  satuan: string;
  kategori: string;
  lokasiBin: string;
  stokFisik: number;
  minStock: number;
  maxStock: number;
  reorderPoint: number;
  leadTimeHari: number;
  statusPengadaan: 'Aman' | 'Reorder Point' | 'Kritis (Di Bawah Min)';
}

export interface ArsipRecord {
  id: string;
  nomorDokumen: string;
  jenisDokumen: 'SPKL' | 'BAP Solar' | 'PO & GR' | 'Surat Jalan' | 'Berita Acara Lainnya';
  tanggalDokumen: string;
  perihal: string;
  lokasiPenyimpananFisik: string;
  rakDus: string;
  filePdfName?: string;
  diinputOleh: string;
}

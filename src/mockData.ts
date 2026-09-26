import { 
  SpklRecord, 
  IrGrRecord, 
  SolarRecord, 
  MinMaxItem, 
  ArsipRecord, 
  UserProfile, 
  ExternalAppSettings 
} from './types';

export const defaultExternalSettings: ExternalAppSettings = {
  spklUrl: 'https://spklembur.pythonanywhere.com/',
  irgrUrl: 'https://monitoringirgrpenerimaan-ptsemenpadang.streamlit.app/',
  solarUrl: 'https://penerimaansolar.pythonanywhere.com/',
  minmaxUrl: 'https://karajoyes-debug.github.io/min-max-stock-level-warehouse-pt-semen-padang/',
  arsipUrl: 'https://portal-arsip-gudang-pt-semen-padang-seven.vercel.app/',
};

export const defaultUser: UserProfile = {
  id: 'usr-001',
  name: 'Hamdi Ayussa',
  username: 'hamdi',
  role: 'manager',
  unit: 'Unit Gudang & Logistik',
  avatar: 'HA'
};

export const initialSpklList: SpklRecord[] = [
  {
    id: 'spkl-01',
    noSpkl: 'SPKL/PTSP/GDG/2026/09/0142',
    tanggal: '2026-09-24',
    nama: 'Rahmat Hidayat',
    badge: 'PTSP-48821',
    unitKerja: 'Penerimaan & Bongkar Muat',
    tipeKaryawan: 'Organik',
    alasanLembur: 'Bongkar Muat Kritis',
    uraianPekerjaan: 'Bongkar muat refractories kiln Indarung VI kedatangan mendesak dari Pelabuhan Teluk Bayur',
    jamMulai: '17:00',
    jamSelesai: '21:00',
    jumlahJam: 4,
    statusApproval: 'Pending',
    createdAt: '2026-09-24 16:30'
  },
  {
    id: 'spkl-02',
    noSpkl: 'SPKL/PTSP/GDG/2026/09/0141',
    tanggal: '2026-09-24',
    nama: 'Budi Santoso',
    badge: 'PTSP-49102',
    unitKerja: 'Stockist & Spareparts',
    tipeKaryawan: 'Non Organik',
    alasanLembur: 'Stock Opname Parsial',
    uraianPekerjaan: 'Pemeriksaan fisik bin rak A-01 s/d A-15 material bearing & seal kritis',
    jamMulai: '17:00',
    jamSelesai: '19:30',
    jumlahJam: 2.5,
    statusApproval: 'Disetujui',
    disetujuiOleh: 'Hamdi Ayussa',
    createdAt: '2026-09-24 15:45'
  },
  {
    id: 'spkl-03',
    noSpkl: 'SPKL/PTSP/GDG/2026/09/0140',
    tanggal: '2026-09-23',
    nama: 'Zulfikar Ahmad',
    badge: 'PTSP-47653',
    unitKerja: 'Logistik BBM Solar',
    tipeKaryawan: 'Organik',
    alasanLembur: 'Penerimaan Solar Malam',
    uraianPekerjaan: 'Sounding dan pengisian tangki solar 01 kedatangan truk tangki Pertamina 16.000 Liter',
    jamMulai: '19:00',
    jamSelesai: '22:00',
    jumlahJam: 3,
    statusApproval: 'Disetujui',
    disetujuiOleh: 'Yan Tanamal',
    createdAt: '2026-09-23 18:00'
  }
];

export const initialIrGrList: IrGrRecord[] = [
  {
    id: 'irgr-01',
    noPo: 'PO-4500892110',
    vendor: 'PT Jaya Kencana Teknik',
    namaBarang: 'V-Belt Mitsuboshi SPC-4500 (Set of 4)',
    jumlahDiterima: 20,
    satuan: 'SET',
    tanggalTerima: '2026-09-24',
    statusQc: 'Inspeksi Selesai',
    noGrSap: '5001928374',
    statusGr: 'GR Terbit (MIGO)'
  },
  {
    id: 'irgr-02',
    noPo: 'PO-4500892234',
    vendor: 'PT SKF Indonesia Distribusi',
    namaBarang: 'Spherical Roller Bearing 22328 CC/W33',
    jumlahDiterima: 4,
    satuan: 'PCS',
    tanggalTerima: '2026-09-24',
    statusQc: 'Inspeksi Selesai',
    statusGr: 'Pending GR'
  },
  {
    id: 'irgr-03',
    noPo: 'PO-4500891998',
    vendor: 'PT Pertamina Lubricants',
    namaBarang: 'Pelumas Meditran SX 15W-40 (Drum 209L)',
    jumlahDiterima: 15,
    satuan: 'DRUM',
    tanggalTerima: '2026-09-23',
    statusQc: 'Menunggu QC',
    statusGr: 'Pending GR'
  }
];

export const initialSolarList: SolarRecord[] = [
  {
    id: 'sol-01',
    noSuratJalan: 'SJ-PTM-20260924-089',
    tanggalMasuk: '2026-09-24 14:15',
    vendorTransporter: 'PT Elnusa Petrofin',
    nomorPolisiTruk: 'BA 8912 QU',
    namaSopir: 'Roni Hendrawan',
    volumeSuratJalanLiter: 16000,
    soundingTinggiCm: 325,
    volumeFisikDiterimaLiter: 15980,
    selisihLiter: -20,
    densitas15C: 0.835,
    tangkiTujuan: 'Tangki 01 (Utama)',
    petugasPenerima: 'Zulfikar Ahmad'
  },
  {
    id: 'sol-02',
    noSuratJalan: 'SJ-PTM-20260922-045',
    tanggalMasuk: '2026-09-22 09:30',
    vendorTransporter: 'PT Elnusa Petrofin',
    nomorPolisiTruk: 'BA 9034 QA',
    namaSopir: 'Dedi Kurniawan',
    volumeSuratJalanLiter: 16000,
    soundingTinggiCm: 326,
    volumeFisikDiterimaLiter: 16005,
    selisihLiter: 5,
    densitas15C: 0.834,
    tangkiTujuan: 'Tangki 01 (Utama)',
    petugasPenerima: 'Zulfikar Ahmad'
  }
];

export const initialMinMaxList: MinMaxItem[] = [
  {
    id: 'mm-01',
    kodeMaterial: 'MAT-1002931',
    namaMaterial: 'V-Belt Wedge SPC 4500 Mitsuboshi',
    satuan: 'PCS',
    kategori: 'Mechanical Spares',
    lokasiBin: 'RAK-B04-02',
    stokFisik: 4,
    minStock: 8,
    maxStock: 30,
    reorderPoint: 12,
    leadTimeHari: 14,
    statusPengadaan: 'Kritis (Di Bawah Min)'
  },
  {
    id: 'mm-02',
    kodeMaterial: 'MAT-1004882',
    namaMaterial: 'Filter Udara Donalson P777868 Heavy Duty',
    satuan: 'PCS',
    kategori: 'Filtration',
    lokasiBin: 'RAK-C01-05',
    stokFisik: 6,
    minStock: 10,
    maxStock: 40,
    reorderPoint: 15,
    leadTimeHari: 21,
    statusPengadaan: 'Kritis (Di Bawah Min)'
  },
  {
    id: 'mm-03',
    kodeMaterial: 'MAT-1007712',
    namaMaterial: 'Oli Hidrolik Shell Tellus S2 MX 68 (Drum)',
    satuan: 'DRUM',
    kategori: 'Pelumas & Kimia',
    lokasiBin: 'GUD-OIL-B02',
    stokFisik: 8,
    minStock: 5,
    maxStock: 25,
    reorderPoint: 10,
    leadTimeHari: 10,
    statusPengadaan: 'Reorder Point'
  },
  {
    id: 'mm-04',
    kodeMaterial: 'MAT-1009943',
    namaMaterial: 'Bearing SKF Deep Groove 6312-2Z/C3',
    satuan: 'PCS',
    kategori: 'Mechanical Spares',
    lokasiBin: 'RAK-A02-11',
    stokFisik: 24,
    minStock: 10,
    maxStock: 50,
    reorderPoint: 18,
    leadTimeHari: 30,
    statusPengadaan: 'Aman'
  }
];

export const initialArsipList: ArsipRecord[] = [
  {
    id: 'ars-01',
    nomorDokumen: 'SPKL/PTSP/GDG/2026/08/0981',
    jenisDokumen: 'SPKL',
    tanggalDokumen: '2026-08-31',
    perihal: 'Rekapitulasi Lembur Karyawan Gudang Indarung Periode Agustus 2026',
    lokasiPenyimpananFisik: 'Gedung Arsip Gudang Lantai 2',
    rakDus: 'Bantex SPKL-2026-08 (Lemari 03 / Rak B)',
    filePdfName: 'REKAP_SPKL_AGUSTUS_2026_SEMEN_PADANG.pdf',
    diinputOleh: 'Hamdi Ayussa'
  },
  {
    id: 'ars-02',
    nomorDokumen: 'BAP-SOLAR-PTSP-202609-0012',
    jenisDokumen: 'BAP Solar',
    tanggalDokumen: '2026-09-15',
    perihal: 'Berita Acara Penerimaan Solar Industri Pertamina 32.000 Liter',
    lokasiPenyimpananFisik: 'Ruang Staf Gudang Solar',
    rakDus: 'Ordner SOLAR-Q3-2026 (Lemari Besi 01)',
    filePdfName: 'BAP_PENERIMAAN_SOLAR_15SEP2026.pdf',
    diinputOleh: 'Zulfikar Ahmad'
  }
];

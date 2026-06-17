/** Finance portal tour definitions — Full specific coverage including all sub-pages. */

// ─── Finance Home ──────────────────────────────────────────────────
const financeHomeTour = {
  name: "Finance Home",
  description: "Validasi sales, AP ledger, journals, dan approvals.",
  steps: [
    {
      target: "[data-testid='finance-welcome']",
      title: "Finance Overview",
      content: "Pusat **kontrol finansial**: validasi sales, AP ledger, journal entries, payments. Periode aktif ditunjukkan di header.",
      placement: "bottom",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='finance-kpi-strip']",
      title: "KPI Finance",
      content: "**4 KPI utama**:\n\n• **Pending Validation** — daily sales menunggu finance\n• **Journal This Period** — JAE bulan aktif\n• **AP Exposure** — total hutang ke vendor\n• **Rejected DS** — daily sales yang perlu fix",
      placement: "bottom",
    },
    {
      target: "[data-testid='fin-qa-validate']",
      title: "Validate Sales Queue",
      content: "Klik untuk masuk queue **validasi daily sales** dari outlet. Validasi cepat menjaga TB akurat.",
      placement: "right",
    },
    {
      target: "[data-testid='fin-qa-manual']",
      title: "Manual Journal Entry",
      content: "Buat **JAE manual** untuk koreksi/penyesuaian. Sistem enforce **Dr = Cr** sebelum post.",
      placement: "right",
    },
    {
      target: "[data-testid='fin-qa-pl']",
      title: "Profit & Loss",
      content: "Laporan **P&L** matrix bulan x periode YTD. Drill-down ke transaksi level dari tiap cell.",
      placement: "left",
    },
  ],
};

// ─── Sales Validation Queue ────────────────────────────────────────
const financeValidationTour = {
  name: "Sales Validation Queue",
  description: "Review dan validasi daily sales dari semua outlet.",
  steps: [
    {
      target: "[data-testid='validation-queue-page']",
      title: "Sales Validation Queue",
      content: "Antrian **validasi daily sales** dari semua outlet. Finance Manager harus validasi setiap laporan sebelum journal entries di-post.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='vq-header-card']",
      title: "Filter & Actions",
      content: "Filter berdasarkan outlet dan tanggal. Klik **Validate** untuk approve laporan — journal entries otomatis ter-post ke GL.",
      placement: "bottom",
    },
    {
      target: "[data-testid='vq-table-card']",
      title: "Detail Laporan",
      content: "Setiap baris = satu daily sales report dari outlet. Klik **View** untuk lihat breakdown per channel dan payment method sebelum validasi.",
      placement: "top",
    },
    {
      target: "[data-testid='vq-table-card']",
      title: "Reject & Feedback",
      content: "Jika laporan tidak akurat, klik **Reject** dan tulis alasan. Outlet manager akan di-notifikasi untuk perbaikan dan submit ulang.",
      placement: "top",
      variant: "tip",
    },
  ],
};

// ─── Manual Journal Entry ────────────────────────────────────────
const financeManualJournalTour = {
  name: "Manual Journal Entry",
  description: "Buat jurnal akuntansi manual dengan validasi Dr=Cr.",
  steps: [
    {
      target: "[data-testid='mje-page']",
      title: "Manual Journal Entry",
      content: "Buat **jurnal akuntansi manual** untuk koreksi, penyesuaian, atau transaksi yang tidak masuk via auto-journal.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='mje-date']",
      title: "Tanggal & Deskripsi",
      content: "Pilih **tanggal** posting (harus dalam periode aktif). Isi **deskripsi** yang jelas untuk audit trail.",
      placement: "bottom",
    },
    {
      target: "[data-testid='mje-lines-table']",
      title: "Baris Debit/Kredit",
      content: "Tambah baris dengan tombol **+ Baris**. Setiap baris: pilih COA, isi Debit atau Kredit (tidak keduanya), tambah memo dan outlet.",
      placement: "top",
    },
    {
      target: "[data-testid='mje-save']",
      title: "Posting JE",
      content: "**Post** hanya aktif jika **Dr = Cr** (balanced). JE yang sudah dipost bisa di-**reverse** jika ada kesalahan — system buat JE kebalikan otomatis.",
      placement: "bottom",
      variant: "tip",
    },
  ],
};

// ─── AP Aging ──────────────────────────────────────────────────────
const financeAPTour = {
  name: "AP Aging — Hutang Dagang",
  description: "Pantau dan kelola hutang ke vendor dengan aging analysis.",
  steps: [
    {
      target: "[data-testid='ap-aging-page']",
      title: "AP Aging Ledger",
      content: "Monitor **hutang dagang** ke semua vendor. Aging mengelompokkan hutang berdasarkan umur: Current, 1-30hr, 31-60hr, dan >60hr.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='ap-toolbar']",
      title: "Filter & Export",
      content: "Set **As of Date** untuk lihat posisi AP di tanggal tertentu. Klik **Export** untuk download CSV untuk rekonsiliasi eksternal.",
      placement: "bottom",
    },
    {
      target: "[data-testid='ap-buckets']",
      title: "Aging Buckets",
      content: "**5 bucket aging**:\n\n• **Current** — belum jatuh tempo\n• **1–30 hr** — lewat 1-30 hari\n• **31–60 hr** — risiko medium\n• **>60 hr** — butuh tindakan segera\n\nKlik bucket untuk filter tabel otomatis.",
      placement: "bottom",
    },
    {
      target: "[data-testid='ap-aging-table']",
      title: "Detail per Vendor",
      content: "Setiap baris = satu vendor. Klik baris untuk lihat **GR/PO detail** yang belum dibayar. Siapkan Payment Request dari sini.",
      placement: "top",
    },
    {
      target: "[data-testid='ap-grand-total']",
      title: "Grand Total AP",
      content: "Total hutang ke semua vendor pada tanggal yang dipilih. Angka ini harus **match dengan saldo COA AP** di Balance Sheet.",
      placement: "top",
      variant: "tip",
    },
  ],
};

// ─── Journal List ────────────────────────────────────────────────
const financeJournalsTour = {
  name: "Journal Entries — Daftar JAE",
  description: "Lihat, filter, dan buat journal entries akuntansi.",
  steps: [
    {
      target: "[data-testid='journal-list-page']",
      title: "Journal Entries",
      content: "Daftar semua **journal entries** — auto-generated (dari DS, GR, payroll) maupun manual. Double-entry accounting terjamin.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='je-filter-card']",
      title: "Filter Jurnal",
      content: "Filter berdasarkan:\n\n• **Periode** (bulan akuntansi)\n• **Source** (DS/PROC/INV/MANUAL/PAYROLL)\n• **Search** (doc no / deskripsi)",
      placement: "bottom",
    },
    {
      target: "[data-testid='je-source']",
      title: "Source Journal",
      content: "**Source** menunjukkan asal auto-journal:\n\n• **DS** — dari daily sales\n• **PROC** — dari GR procurement\n• **INV** — dari movement inventory\n• **MANUAL** — input finance",
      placement: "right",
    },
    {
      target: "[data-testid='je-new']",
      title: "Buat Manual JAE",
      content: "Klik **+ JAE Manual** untuk jurnal koreksi/penyesuaian. Sistem enforce **Dr = Cr** sebelum bisa di-post.",
      placement: "left",
    },
    {
      target: "[data-testid='je-list-card']",
      title: "Klik Baris untuk Detail",
      content: "Klik baris journal untuk lihat detail baris Dr/Cr lengkap. Dari detail, bisa **reverse** journal jika ada kesalahan input.",
      placement: "top",
      variant: "tip",
    },
  ],
};

// ─── Payment Request List ────────────────────────────────────────
const financePaymentRequestsTour = {
  name: "Payment Requests — Tagihan ke Finance",
  description: "Daftar semua payment request yang diajukan ke Finance.",
  steps: [
    {
      target: "[data-testid='payment-request-list-page']",
      title: "Payment Requests",
      content: "Daftar semua **payment request** dari outlet dan procurement. Finance memproses pembayaran setelah request diapprove.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='pr-stats-cards']",
      title: "Stats Overview",
      content: "Ringkasan: **Total Pending** (menunggu approval), **Approved** (siap bayar), **Paid MTD**, dan **Total Outstanding**.",
      placement: "bottom",
    },
    {
      target: "[data-testid='pr-filter-card']",
      title: "Filter Requests",
      content: "Filter berdasarkan **status** (Pending/Approved/Paid/Rejected), tanggal, dan outlet. Berguna untuk daily reconciliation.",
      placement: "bottom",
    },
    {
      target: "[data-testid='pr-create']",
      title: "Buat Payment Request",
      content: "Klik **+ Buat** untuk request pembayaran baru. Link ke AP/GR untuk full traceability. Request masuk approval workflow sebelum diproses.",
      placement: "bottom",
      variant: "tip",
    },
  ],
};

// ─── Payment List ────────────────────────────────────────────────
const financePaymentsTour = {
  name: "Payment Requests — Workflow Pembayaran",
  description: "Kelola payment request: dari draft → approval → paid.",
  steps: [
    {
      target: "[data-testid='payment-list-page']",
      title: "Payment Requests",
      content: "Workflow pembayaran ke vendor. Setiap payment harus melalui **request → approval → paid** sebelum JE otomatis dibuat.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='pay-kpi-strip']",
      title: "KPI Payments",
      content: "Ringkasan: **Total Pending**, **Approved (siap bayar)**, **Paid MTD**, dan **Total Outstanding**.",
      placement: "bottom",
    },
    {
      target: "[data-testid='pay-status-tabs']",
      title: "Filter by Status",
      content: "Tab status:\n\n• **Pending** — menunggu approval\n• **Approved** — siap dibayarkan\n• **Paid** — sudah dibayar\n• **Rejected** — ditolak, perlu revisi",
      placement: "bottom",
    },
    {
      target: "[data-testid='pay-new-btn']",
      title: "Buat Payment Request",
      content: "Klik **New Payment** untuk buat payment request baru. Link ke GR/AP aging untuk traceability lengkap.",
      placement: "left",
    },
    {
      target: "[data-testid='pay-table-card']",
      title: "Aksi per Payment",
      content: "Di tabel: klik **Approve** (jika punya izin) atau **View** untuk lihat detail. Setelah paid, **JE otomatis ter-post** di accounts payable.",
      placement: "top",
      variant: "tip",
    },
  ],
};

// ─── Bank Reconciliation ─────────────────────────────────────────
const financeBankReconTour = {
  name: "Bank Reconciliation",
  description: "Upload mutasi rekening dan cocokkan dengan journal entries.",
  steps: [
    {
      target: "body",
      title: "Bank Reconciliation",
      content: "Cocokkan **mutasi rekening bank** dengan journal entries di sistem. Identifikasi transaksi yang belum ter-posting atau ada discrepancy.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='br-new-upload']",
      title: "Upload Mutasi",
      content: "Upload file **CSV mutasi rekening** dari internet banking. Sistem auto-parse format standar bank Indonesia.",
      placement: "bottom",
    },
    {
      target: "body",
      title: "Proses Matching",
      content: "Sistem otomatis match berdasarkan **jumlah** dan **tanggal** (toleransi ±3 hari). Klik **Match** manual untuk transaksi yang tidak ter-match otomatis.",
      placement: "center",
    },
    {
      target: "[data-testid='br-commit']",
      title: "Commit Rekonsiliasi",
      content: "Klik **Commit** setelah semua match selesai. Transaksi unmatched bisa di-mark sebagai **exception** dengan catatan alasan.",
      placement: "bottom",
      variant: "tip",
    },
  ],
};

// ─── AR Invoices ──────────────────────────────────────────────────
const financeARInvoicesTour = {
  name: "AR Invoices — Piutang Dagang",
  description: "Kelola invoice ke customer B2B dan aging piutang.",
  steps: [
    {
      target: "[data-testid='ar-invoice-list']",
      title: "AR Invoices",
      content: "Kelola **piutang dagang** dari customer B2B (katering, event, dll). Track invoice yang belum dibayar dengan aging analysis.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='ar-kpi-strip']",
      title: "KPI AR",
      content: "• **Total Invoices** — jumlah invoice aktif\n• **Outstanding** — total piutang belum dibayar\n• **Overdue** — piutang lewat jatuh tempo\n• **Paid MTD** — pembayaran diterima bulan ini",
      placement: "bottom",
    },
    {
      target: "[data-testid='ar-tabs']",
      title: "4 Tab AR",
      content: "• **Invoices** — daftar invoice dengan status\n• **Customers** — master customer B2B\n• **Aging Report** — aging analysis piutang\n• **Rekonsiliasi** — cocokkan pembayaran yang diterima",
      placement: "bottom",
    },
    {
      target: "[data-testid='create-invoice-btn']",
      title: "Buat Invoice",
      content: "Klik **+ Invoice** untuk buat invoice ke customer. Isi detail, nominal, dan jatuh tempo. Invoice otomatis ter-journal sebagai piutang.",
      placement: "bottom",
      variant: "tip",
    },
  ],
};

// ─── Trial Balance ────────────────────────────────────────────────
const financeTrialBalanceTour = {
  name: "Trial Balance",
  description: "Neraca saldo semua akun COA untuk cek keseimbangan buku.",
  steps: [
    {
      target: "[data-testid='trial-balance-page']",
      title: "Trial Balance",
      content: "**Neraca Saldo** semua akun COA per periode. Jumlah total Debit harus sama dengan total Kredit — jika tidak, ada error di jurnal.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='tb-filter-card']",
      title: "Filter & Export",
      content: "Pilih **periode** (bulan akuntansi) dan **outlet** (All atau spesifik). Export ke CSV untuk rekonsiliasi eksternal dengan akuntan.",
      placement: "bottom",
    },
    {
      target: "[data-testid='tb-balance-status']",
      title: "Status Balance",
      content: "**Hijau** = TB balance (Dr = Cr). **Amber/Merah** = ada discrepancy yang perlu diselidiki. Investigasi journal entries untuk temukan sumber masalah.",
      placement: "bottom",
    },
    {
      target: "[data-testid='tb-table-card']",
      title: "Baca TB",
      content: "Klik baris akun untuk drill-down ke semua jurnal yang mempengaruhi akun tersebut di periode yang dipilih.",
      placement: "top",
      variant: "tip",
    },
  ],
};

// ─── Balance Sheet ────────────────────────────────────────────────
const financeBalanceSheetTour = {
  name: "Balance Sheet — Neraca Keuangan",
  description: "Laporan posisi keuangan: Aset, Kewajiban, dan Ekuitas.",
  steps: [
    {
      target: "[data-testid='balance-sheet-page']",
      title: "Balance Sheet",
      content: "Laporan **posisi keuangan** Torado Group. Menampilkan Aset = Kewajiban + Ekuitas per tanggal yang dipilih.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='bs-filter-card']",
      title: "As of Date",
      content: "Pilih **tanggal** untuk lihat posisi keuangan di titik waktu tertentu. Berguna untuk laporan bulanan, kuartalan, atau tahunan.",
      placement: "bottom",
    },
    {
      target: "[data-testid='bs-balance-status']",
      title: "Status Balanced",
      content: "**Hijau** = neraca seimbang (Aset = Kewajiban + Ekuitas). Jika tidak seimbang, ada jurnal yang salah atau belum ter-posting.",
      placement: "bottom",
    },
    {
      target: "[data-testid='bs-sections']",
      title: "3 Seksi Neraca",
      content: "**Aset** (kiri atas) — **Kewajiban** (kanan atas) — **Ekuitas** (kanan bawah). Klik akun untuk drill-down ke jurnal pendukungnya.",
      placement: "top",
      variant: "tip",
    },
  ],
};

// ─── Cashflow Report ──────────────────────────────────────────────
const financeCashflowTour = {
  name: "Cashflow Statement — Arus Kas",
  description: "Laporan arus kas: operasional, investasi, dan pendanaan.",
  steps: [
    {
      target: "[data-testid='cashflow-report-page']",
      title: "Cashflow Statement",
      content: "Laporan **arus kas** Torado Group per periode. Menampilkan kas masuk dan keluar dari aktivitas operasional, investasi, dan pendanaan.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='cf-filter-card']",
      title: "Pilih Periode",
      content: "Pilih **bulan** untuk laporan arus kas. Export ke CSV untuk laporan ke stakeholder atau auditor.",
      placement: "bottom",
    },
    {
      target: "[data-testid='cf-kpi-cards']",
      title: "KPI Arus Kas",
      content: "• **Kas Masuk** — total pemasukan\n• **Kas Keluar** — total pengeluaran\n• **Net Cashflow** — selisih masuk-keluar\n• **Closing Balance** — saldo kas akhir periode",
      placement: "bottom",
    },
    {
      target: "[data-testid='cf-daily-chart-card']",
      title: "Chart Harian",
      content: "Chart arus kas harian untuk lihat **pola cash flow** dalam sebulan. Berguna identifikasi hari-hari dengan cash crunch.",
      placement: "top",
      variant: "tip",
    },
  ],
};

// ─── Chart of Accounts ───────────────────────────────────────────
const financeCOATour = {
  name: "Chart of Accounts (COA)",
  description: "Browse dan manage akun-akun buku besar.",
  steps: [
    {
      target: "[data-testid='coa-browser-page']",
      title: "Chart of Accounts",
      content: "Daftar lengkap **akun buku besar** (COA) Torado Group. Setiap transaksi akuntansi di-posting ke salah satu akun ini.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='coa-filter-card']",
      title: "Filter COA",
      content: "Filter berdasarkan **tipe akun** (Aset/Kewajiban/Ekuitas/Pendapatan/Beban). Toggle **Postable Only** untuk lihat akun yang bisa digunakan di jurnal.",
      placement: "bottom",
    },
    {
      target: "[data-testid='coa-table-card']",
      title: "Struktur COA",
      content: "COA memiliki **hierarki**: group account → sub-account → detail account. Hanya **detail account** (postable) yang bisa digunakan di jurnal.",
      placement: "top",
    },
    {
      target: "[data-testid='coa-edit-link']",
      title: "Edit COA",
      content: "Untuk tambah atau edit akun COA, klik link **Edit di Master Data**. Perubahan COA harus dikonsultasikan dengan Finance Manager — salah COA bisa merusak laporan.",
      placement: "bottom",
      variant: "tip",
    },
  ],
};

// ─── Profit & Loss ───────────────────────────────────────────────
const financeProfitLossTour = {
  name: "Profit & Loss — Laporan Laba Rugi",
  description: "Baca dan drill-down laporan P&L per periode dan outlet.",
  steps: [
    {
      target: "body",
      title: "Laporan P&L",
      content: "Laporan **Laba Rugi** menampilkan Revenue − COGS − Opex = Net Profit. Pilih periode dan outlet untuk filter yang spesifik.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "body",
      title: "Cara Membaca P&L",
      content: "• **Hijau** — nilai positif (revenue/profit)\n• **Merah** — nilai negatif (expense/loss)\n• Klik **sel angka** untuk drill-down ke transaksi asal\n• Column = bulan, Row = akun COA",
      placement: "center",
      variant: "tip",
    },
  ],
};

// ─── Anomaly Feed ─────────────────────────────────────────────────
const financeAnomaliesTour = {
  name: "Anomaly Feed — Deteksi Keuangan",
  description: "Review flag anomali otomatis dari seluruh data keuangan.",
  steps: [
    {
      target: "[data-testid='anomaly-feed-page']",
      title: "Anomaly Feed",
      content: "Sistem secara otomatis mendeteksi **anomali keuangan**: jurnal tidak balance, stok negatif, sales spike, dan hutang overdue.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='anomaly-scan-btn']",
      title: "Scan Manual",
      content: "Klik **Scan Sekarang** untuk jalankan deteksi anomali real-time. Scan otomatis berjalan setiap malam via scheduler.",
      placement: "bottom",
    },
    {
      target: "body",
      title: "Filter Anomali",
      content: "Filter berdasarkan:\n\n• **Tipe** — journal, sales, inventory, AP\n• **Severity** — Critical/High/Medium/Low\n• **Status** — Open/Resolved/Ignored",
      placement: "center",
    },
    {
      target: "body",
      title: "Respons Anomali",
      content: "Klik anomali untuk lihat detail dan **AI explanation** penyebabnya. Klik **Resolve** setelah ditangani, atau **Ignore** jika sudah diketahui dan acceptable.",
      placement: "center",
      variant: "tip",
    },
  ],
};

// ─── Comparatives ────────────────────────────────────────────────
const financeComparativesTour = {
  name: "Period Comparatives",
  description: "Bandingkan performa keuangan antar periode.",
  steps: [
    {
      target: "[data-testid='comparatives-page']",
      title: "Period Comparatives",
      content: "Bandingkan **performa keuangan** antar periode: bulan ini vs bulan lalu, Q1 vs Q2, atau year-over-year.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='comp-period']",
      title: "Pilih Periode Pembanding",
      content: "Pilih 2 periode untuk dibandingkan. Bisa berupa 2 bulan berbeda, 2 kuartal, atau 2 tahun berbeda.",
      placement: "bottom",
    },
    {
      target: "[data-testid='comp-delta']",
      title: "Delta & Trend",
      content: "Kolom **Δ (Delta)** menunjukkan selisih absolut dan persentase perubahan. **Hijau** = membaik, **Merah** = memburuk.",
      placement: "top",
      variant: "tip",
    },
  ],
};

// ─── Period Locking ──────────────────────────────────────────────
const financePeriodsLockingTour = {
  name: "Period Locking & Enforcement",
  description: "Cara kelola periode akuntansi dan enforcement locking backdated entries.",
  steps: [
    {
      target: "[data-testid='periods-page']",
      title: "Finance Periods",
      content: "Kelola **periode akuntansi** bulanan. Setiap periode bisa di-lock untuk mencegah perubahan retroaktif.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='periods-table']",
      title: "Status Periode",
      content: "Status periode:\n\n• **Open** — bisa posting transaksi\n• **Locked** — tidak bisa posting (kecuali override permission)\n• **Closed** — full lock untuk audit trail",
      placement: "top",
    },
    {
      target: "[data-testid='period-lock-btn']",
      title: "Lock Periode",
      content: "Klik **Lock** pada periode yang sudah selesai untuk mencegah backdated journal entries. Lock enforcement aktif di seluruh sistem.",
      placement: "left",
      variant: "tip",
    },
  ],
};

// ─── Period Closing Hub ──────────────────────────────────────────
const financePeriodClosingHubTour = {
  name: "Period Closing Hub — Tutup Bulan",
  description: "Workflow 4-fase penutupan periode akuntansi bulanan.",
  steps: [
    {
      target: "[data-testid='period-closing-hub']",
      title: "Period Closing Hub",
      content: "Workflow **4 fase** penutupan bulanan yang berurutan. Selesaikan tiap fase sebelum lanjut ke fase berikutnya.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='pc-phase-validation']",
      title: "Fase 1: Validasi",
      content: "Validasi semua daily sales outlet belum ada yang pending/rejected. Semua harus **Approved** sebelum close.",
      placement: "bottom",
    },
    {
      target: "[data-testid='pc-phase-anomaly']",
      title: "Fase 2: Cek Anomali",
      content: "Review flag anomali otomatis:\n\n• Jurnal tidak balance\n• COA salah mapping\n• Stok negatif\n• Hutang overdue",
      placement: "bottom",
    },
    {
      target: "[data-testid='pc-phase-closing']",
      title: "Fase 3: Closing Wizard",
      content: "Generate **closing journal** otomatis: tutup akun pendapatan/beban ke retained earnings. Cek TB Balance Sheet satu kali lagi.",
      placement: "bottom",
    },
    {
      target: "[data-testid='pc-phase-lock']",
      title: "Fase 4: Lock Periode",
      content: "Fase terakhir: **lock periode** agar tidak bisa di-posting lagi. Setelah lock, laporan keuangan final dan tidak bisa diubah.",
      placement: "bottom",
      variant: "tip",
    },
  ],
};

export {
  financeHomeTour,
  financeValidationTour,
  financeManualJournalTour,
  financeAPTour,
  financeJournalsTour,
  financePaymentRequestsTour,
  financePaymentsTour,
  financeBankReconTour,
  financeARInvoicesTour,
  financeTrialBalanceTour,
  financeBalanceSheetTour,
  financeCashflowTour,
  financeCOATour,
  financeProfitLossTour,
  financeAnomaliesTour,
  financeComparativesTour,
  financePeriodsLockingTour,
  financePeriodClosingHubTour,
};

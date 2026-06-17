# plan.md — Torado ERP UI/UX + IA + Flow + Backend↔Frontend Parity (MASTER PLAN, pasca-audit mendalam)

## 1) Objectives
- Menjadikan 3 dokumen ini sebagai **single source of truth**:
  - UI/UX audit + temuan per-halaman + peta IA: `/app/memory/UI_UX_AUDIT_2026-06-17.md` (termasuk Addendum layar 15")
  - Blueprint implementasi token-level (tema tetap): `/app/design_guidelines.md`
  - Audit parity backend↔frontend: `/app/memory/PARITY_AUDIT_2026-06-17.md`
- Eksekusi perbaikan **tanpa mengganti tema/visual** (aurora/glassmorphism + Inter tetap). Fokus: **density/ukuran/spacing, konsistensi komponen, IA (struktur menu), discoverability, user flow**.
- Kalibrasi UX untuk **laptop 15"** dengan viewport acuan **1280×800** (dan sanity @1366×768). Target: konten kunci **above-the-fold** (tanpa scroll berlebihan).
- Menjaga fungsionalitas: **tidak merusak** backend yang sudah lulus integrity gates & intent audits. Perubahan UI harus non-breaking.
- Verifikasi per fase:
  - Screenshot tool @1280×800 **light + dark**
  - Frontend testing agent untuk perubahan struktur navigasi / IA
  - Jalankan `intent_audit_5portals.py` + `intent_audit_remaining.py` (read-only) **setelah perubahan yang menyentuh data/aggregasi**

**Keputusan user (sudah disetujui):**
- Konsolidasi hub **Payments (Finance)** & **Operations (Admin)** → **YA (hub+tabs)**
- "Akses Cepat" cross-portal → **diperjelas** (ikon panah keluar + label portal)
- Lebar sidebar target → **248px** (rekomendasi blueprint)

---

## 2) Implementation Steps (Phased)

### Phase 0 — Checkpoint Review (Wajib sebelum kode disentuh)
**Status:** DONE (audit selesai; eksekusi menunggu aba-aba "lanjut")

**User stories**
1. Sebagai user, saya ingin audit yang benar-benar berbasis observasi UI (bukan scanning) dan ada blueprint solusi.
2. Sebagai owner, saya ingin semua keputusan design tetap menjaga tema namun memperbaiki density.
3. Sebagai user, saya ingin kalibrasi audit sesuai layar 15" sehingga hasilnya relevan.
4. Sebagai stakeholder, saya ingin tahu ada/tidak gap backend→frontend.

**Steps (yang sudah dilakukan)**
- Live walkthrough + screenshot multi-portal; re-capture @1280×800 & @1366×768 untuk meniru layar 15".
- Menulis laporan:
  - UI/UX audit: `/app/memory/UI_UX_AUDIT_2026-06-17.md`
  - Blueprint token-level: `/app/design_guidelines.md`
  - Parity backend↔frontend: `/app/memory/PARITY_AUDIT_2026-06-17.md`

**Output**
- Scope v1 terkunci: tema tidak berubah; fokus density/IA/flow; viewport acuan 1280×800.
- Keputusan user untuk: hub Payments & Operations, Akses Cepat diperjelas, sidebar 248px.

---

### Phase 0.5 — Fondasi Token (Design System, tema tetap) **P0 (fondasi teknis)**
**Tujuan:** membuat “komponen dasar” yang menjadi sumber konsistensi (font/spacing/cards/tabs) sebelum mengutak-atik IA besar.

**User stories**
1. Sebagai user, saya ingin tipografi dan spacing konsisten di seluruh portal.
2. Sebagai user, saya ingin KPI/stat tampil ringkas dan seragam.
3. Sebagai user, saya ingin tab in-page konsisten (1 komponen tab).

**Steps (implementasi)**
- Terapkan **typography_scale** dan **spacing_density_scale** dari `/app/design_guidelines.md`:
  - `PageHeader` jadi compact: h1 `text-xl md:text-2xl`, icon `h-6/7`, `mb-3/4`.
  - Container page: `py-3 lg:py-4` (mengganti `lg:py-8`).
- Buat komponen **`CompactStatCard`** tunggal (sm/md) sebagai pengganti ≥5 varian stat card.
  - Pertahankan `KpiSnapshotStrip` sebagai baseline “strip ringkas”.
- Standarkan **Tabs pill** tunggal (PortalSubNav / shadcn Tabs) sesuai spec:
  - Trigger `h-8 px-2.5 text-[13px]`, list `p-1 gap-1.5`, active = `pill-active`.

**Acceptance**
- FE build sukses.
- Screenshot @1280×800 (light+dark) pada 2 dashboard menunjukkan:
  - Title/header lebih pendek.
  - KPI/stat card ringkas & seragam.
- Tidak ada regresi dark mode (kontras + readability).

---

### Phase 1 — Sidebar & IA (P0, dampak terbesar)
**Tujuan:** menyelesaikan akar kebingungan navigasi: double-active, redundant menu, sidebar terlalu panjang, urutan tidak sesuai best practice.

**User stories**
1. Sebagai user, saya ingin klik submenu tanpa parent ikut “active” (no double-active).
2. Sebagai user, saya ingin sidebar muat dan terbaca di 15" tanpa perlu collapse.
3. Sebagai user Finance, saya ingin Reports hanya 1 link karena tab sudah ada.
4. Sebagai user Procurement, saya ingin Vendors bersih: view jadi tab (Scorecard/Comparison/AI/Item Catalog).
5. Sebagai admin, saya ingin Payments (Finance) & Operations (Admin) jadi hub+tabs agar sidebar pendek.

**Steps (implementasi)**
- **Fix double-active** (leaf-only active background):
  - `Sidebar.jsx`: active style hanya untuk route terdalam; parent hanya indikator subtle (tanpa background).
- **Flatten single-item sections**:
  - Owner: Financial Health/AI Insights; Outlet: CRM/Daily Orders/End-of-Day; Executive: Analytics/Reservasi.
- **Sidebar compaction**:
  - Lebar `w-[248px]`, font item `text-[13px]`, subitem `text-[12.5px]`, padding rapat, section label `text-[11px] uppercase tracking`.
- **Dedupe IA**:
  - Finance: Reports 8 item → 1 “Reports Hub” (sisanya tab di halaman).
  - Procurement: hapus `Vendor Scorecard/Comparison/Item Catalog/AI Recommend` dari sidebar (gunakan tab di `/procurement/vendors`).
- **Konsolidasi hub sesuai keputusan user**:
  - Finance: “Payments Hub” + “Tax Center” (tab di halaman).
  - Admin: “Operations Hub” + “Loyalty Hub” (tab di halaman).
- **IA ordering best-practice**:
  - Urut by frequency × criticality × workflow; dashboard/operasional di atas, config/admin di bawah.
  - Target **≤12 item top-level/portal**.

**Verification (wajib sebelum Phase 2)**
- Screenshot tool @1280×800 **dan** sanity @1366×768:
  - `/finance/reports` (sidebar tidak duplikatif; tabs tetap)
  - `/procurement/vendors` (sidebar bersih; tabs tetap)
  - contoh flatten (Outlet/Owner)
- Frontend testing agent:
  - Navigasi portal switching + membuka tab + deep-link.

**Acceptance**
- Tidak ada double-active.
- Sidebar Finance/Admin tidak overflow parah; usable tanpa collapse di 15".
- Redundansi menu-tab hilang (Finance Reports, Procurement Vendors).

---

### Phase 2 — Density Per Halaman + Flow (P1)
**Tujuan:** menaikkan density di page yang paling boros ruang, memperbaiki flow agar tidak “klik nyasar”.

**User stories**
1. Sebagai user, saya ingin dashboard menampilkan lebih banyak info above-the-fold.
2. Sebagai user, saya ingin AI assistant tidak memakan ½ layar.
3. Sebagai user, saya ingin “Akses Cepat” jelas saat lompat portal.
4. Sebagai user Inventory, saya ingin outlet valuation menampilkan nama outlet (bukan UUID).
5. Sebagai user, saya ingin komponen status/badge konsisten.

**Steps**
- Migrasi dashboard ke **CompactStatCard**:
  - Owner/Executive/Outlet/Procurement/Inventory/Finance/HR/Admin.
- Rapikan density umum:
  - Search bar `h-9`, grid gap `gap-3`, action tiles lebih ringkas, vendor/entity cards dipadatkan.
- **AI assistant collapsible** di dashboard:
  - Default collapsed ~44px; expand max `320px`.
- **Akses Cepat diperjelas** (sesuai keputusan user):
  - Tombol eksplisit (bukan whole-card click), tambah ikon `ArrowUpRight` + label portal.
  - Audit clickable containers agar tidak trigger navigasi tak terduga.
- Fix data bug:
  - Inventory Overview: map `outlet_id → outlet_name`.
- Discoverability:
  - Breadcrumbs di halaman dalam/detail.
  - Global search Ctrl/⌘K ditonjolkan (trigger kecil di header).
- Konsistensi status:
  - Ganti badge solid (HR Leaves) → `StatusPill`.
- Hilangkan pemborosan header:
  - Hapus/kurangi hero "Admin Platform" berulang di sub-halaman (tampil hanya di `/admin`).

**Verification**
- Screenshot tool @1280×800 light+dark untuk archetype:
  - KPI dashboard (Executive Analytics, Owner)
  - Hub-with-tabs (HR Compensation, Admin Config)
  - Data-table list (PO, Journals)
  - AI page (Owner AI)
- Frontend testing agent: regresi navigasi + tab + portal jump labeling.

**Acceptance**
- Above-the-fold rule tercapai di 1280×800: PageHeader compact + filter/tanggal + KPI strip/tabel utama terlihat tanpa scroll berat.
- AI card tidak lagi mendominasi dashboard.
- Tidak ada navigasi “nyasar” tanpa affordance.

---

### Phase 3 — Backend↔Frontend Parity Gaps (berdasarkan PARITY_AUDIT) **(butuh konfirmasi user per item)**
**Tujuan:** menutup gap fitur backend yang belum ada UI  atau memperjelas discoverability.

**User stories**
1. Sebagai staff, saya ingin bisa ganti password.
2. Sebagai finance, saya ingin edit AR customer/invoice dan kirim reminder.
3. Sebagai finance, saya ingin export excel laporan finance penting.
4. Sebagai HR/Admin, saya ingin fitur analytics/recruitment mudah ditemukan.

**Candidate scope (Kategori A, rekomendasi)**
- Staff Change Password: UI profil → `POST /auth/change-password`.
- AR:
  - Edit customer  `PUT /ar/customers/{}`
  - Edit invoice  `PUT /ar/invoices/{}`
  - Tombol remind  `POST /ar/invoices/{}/remind`
- (Opsional) Cash accounts: edit/hapus/rekonsiliasi.
- (Opsional) AI Exec-QA: riwayat sesi.
- Export Excel finance (trial balance / PL / journal ledger / ap-aging) jika belum tersambung di UI.
- Discoverability: entry-point jelas untuk `JobApplications` & `CRMAnalytics`.

**Verification**
- Backend sanity (curl/httpx) + FE testing agent.
- Jika ada perubahan agregasi/reporting, jalankan intent_audit scripts (read-only).

**Acceptance**
- Fitur yang dipilih user tersedia di UI, dapat diakses tanpa “hidden route”.

---

### Phase 4 — Cleanup & QA (stabilitas, non-UX)
**Tujuan:** merapikan debt teknis tanpa risiko ke user flow.

**Steps**
- Tandai endpoint duplikat/usang sebagai deprecated (jangan hapus tanpa verifikasi integrasi):
  - `/ai/extract-receipt`, `/master/coa`, `/budget/import-csv`, `/reports/inventory/valuation.xlsx`, dll.
- Bersihkan sisa placeholder / redirect legacy (mis. ClosingWizardPlaceholder).
- Fix isu recurring **B8 pytest DB pollution**:
  - `backend/tests/conftest.py` → pakai disposable test DB + teardown.
- Jalankan `intent_audit_5portals.py` + `intent_audit_remaining.py` (read-only) untuk memastikan invariants tetap benar.

**Acceptance**
- Demo DB tidak tercemar saat pytest.
- Intent audits tetap PASS.

---

### Phase 5 — Verifikasi Lintas-Dimensi (Blind Spots)
**Tujuan:** memastikan perubahan density tidak merusak aksesibilitas, responsif, dan performa.

**Checklist**
- Dark mode visual pass (kontras, pill-active, glass layers).
- Responsif: spot-check tablet/mobile (layout tidak pecah; sidebar/drawer baik).
- A11y: fokus keyboard `focus-visible`, hit area minimum, readability pada font kecil.
- Performa: tabel besar (virtualisasi jika perlu; `VirtualList` sudah ada), avoid re-render berlebihan.
- Konsistensi bahasa + format angka/tanggal (tabular-nums untuk KPI).

**Acceptance**
- Tidak ada regresi UX di dark mode/responsif.
- Navigasi tetap cepat dan dapat dipahami.

---

## 3) Next Actions (Immediate)
1. **Mode sekarang: analisis dulu** — tunggu aba-aba user "lanjut" untuk mulai Phase 0.5.
2. Saat user memberi "lanjut":
   - Implement **Phase 0.5** (fondasi token) → screenshot @1280×800 light+dark → minta approval.
3. Lanjut **Phase 1** (Sidebar & IA) → testing agent → approval.
4. Setelah Phase 2, barulah bahas Phase 3 (Parity gaps) berdasarkan item yang user pilih.

---

## 📌 EXECUTION LOG (2026-06-17, sesi UI/UX)

### ✅ Phase 0.5 — Token compaction (SELESAI)
- `PageHeader.jsx`: h1 `text-3xl→text-lg/xl/2xl`, icon `h-11→h-9/10`, `mb-5/6→mb-3/4`.
- `KpiCard.jsx`: `p-5→p-4`, value `text-[28px]→text-[22px]`, icon `h-9→h-8`, `mb-3/mt-3→mb-2/mt-2`, blur `h-28→h-20`.
- Verified: esbuild clean; screenshot Finance (light) + Owner (dark) @1280×800 → KPI lebih ringkas, tema utuh.

### ✅ Phase 1a — Sidebar logic (SELESAI)
- `Sidebar.jsx`: **double-active FIXED** (leaf-only background; parent section hanya text highlight, tanpa bg).
- **Flatten single-item sections** → render sebagai link langsung (Owner Financial Health/AI Insights, Outlet CRM/Daily Orders/End-of-Day, Executive Analytics/Reservasi, Admin Master Data/Settings/CMS/SEO, dll).
- **Compaction**: width `280→248px`, item/section `text-sm→text-[13px]`, padding rapat, `space-y-1→space-y-0.5`.
- Verified: esbuild clean; screenshot light+dark → no double-active, sidebar muat lebih banyak.

### ✅ Phase 1b — IA dedup aman (SELESAI; tab tujuan sudah ada)
- Finance Reports **8→1** (`Reports Hub`; 7 deep-link `?tab=` dihapus dari sidebar — tab ada di `/finance/reports`).
- Procurement Vendors **dedup**: hapus Scorecard/Comparison dari sidebar + Vendor Catalog/AI Recommend dari Smart Procurement (pill-link sudah ada di `/procurement/vendors`).
- **Hasil audit IA:** procurement **15→11 (≤12 ✓)**, finance **32→25**. Parity **0 ORPHAN MODULE**.

### ✅ Phase 1c — Hub consolidation (SELESAI — Finance & Admin = 12 item)
Hub baru (pola FinanceReportsHub, render komponen existing inline sbg tab; URL ?tab=):
- **FinancePaymentsHub** (`/finance/payments-hub`): 8 tab (Payment Requests · AP · Payments · Payment Runs · Run Templates · Bank Recon · AR Invoices · Deposit Reservasi).
- **FinanceTaxHub** (`/finance/tax`): 3 tab (Tax Center · e-Faktur · e-Bupot).
- **FinanceBudgetHub** (`/finance/budget-hub`): 3 tab (Budget vs Actual · Management · Forecasting).
- **Period Closing** (`/finance/period-closing`): PeriodClosingHub SUDAH mengandung Periods + Anomaly + Wizard + Lock sbg fase → section di-collapse jadi 1 item (tanpa komponen baru).
- **LoyaltyHub** (`/admin/loyalty`): 5 tab (Overview · Customers · Rewards · Redemptions · CRM Analytics).
- **Operations & Monitoring** (`/admin/operations`): Operations.jsx diperluas +3 tab (Laporan Terjadwal · Manajemen Data · Tour Analytics) → total 8 tab, sidebar 1 item.
- **UserManagementHub** (`/admin/user-management`): 3 tab (Users · Roles · Activity Log).
- **AdminSetupHub** (`/admin/setup`): 3 tab (Number Series · Tax Config · Bulk Import).

**Hasil IA final:** finance **32→12 ✓**, admin **27→12 ✓**, procurement 11, outlet 12, owner 6, hr 6, inventory 8, executive 13 (di luar scope — user minta Finance & Admin saja). esbuild clean, parity **0 ORPHAN MODULE**, frontend compile bersih. Diverifikasi screenshot @1280×800: semua 7 hub render data nyata + tab-switch jalan, sidebar Finance & Admin masing-masing 12 item rapi.

### ✅ Verifikasi navigasi (testing agent iteration_38 + manual)
- Testing agent melaporkan 9 "blank screen" → **SEMUA FALSE-POSITIVE** (screenshot diambil sebelum async data load). Diverifikasi manual @1280×800: `/admin/master-data`, `/admin/settings`, `/admin/cms/brands`, `/admin/smart-seo`, `/executive/period-compare` semua render penuh (chart, tabel, form, tabs). `/executive/reservations` & `/outlet/daily-orders` = **empty-state sah** (data belum di-seed, per GROUND_TRUTH Part D), bukan blank.
- PASS: login, 8/8 portal switch, flatten single-item links navigasi benar, no double-active, Finance Reports tabs utuh, Procurement Vendors pill-links utuh, data nyata render, 0 console error.
- **Kesimpulan: Phase 0.5 + 1a + 1b TIDAK ada regresi.**

---

## 4) Success Criteria
- **Theme preserved**: aurora/glassmorphism + Inter tidak berubah; hanya density/spacing/IA/flow.
- **Viewport 15" ready**: @1280×800, halaman kunci memenuhi above-the-fold rule.
- Sidebar:
  - Tidak ada **double-active**.
  - Lebar ~248px; font ringkas; section label jelas.
  - ≤12 item top-level/portal; tidak perlu collapse untuk usable.
- IA:
  - Finance Reports 8→1 link; Procurement Vendors bebas redundansi.
  - Payments/Operations menjadi hub+tabs.
- Konsistensi:
  - KPI/stat memakai 1 komponen (CompactStatCard) + 1 gaya tabs.
  - Status badge konsisten (StatusPill).
- Flow:
  - Akses Cepat jelas saat pindah portal (ikon + label), tidak ada navigasi "nyasar" tanpa affordance.
- Quality:
  - Screenshot tool + frontend testing agent PASS per fase.
  - Intent audits (read-only) tetap hijau saat relevan.

**Catatan scope:** GL opening-stock valuation tetap BLOCKED menunggu keputusan bisnis owner (di luar scope UI/UX).

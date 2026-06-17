> 🏷️ **STATUS: 🟢 CURRENT.** Fitur yang dideskripsikan punya router & terverifikasi. Peta selesai-vs-belum: `memory/GROUND_TRUTH_2026-06-17.md`.


# PRD — Aurora F&B ERP System (Torado Group)
*Updated: 2026-06-14*

## Original Problem Statement
Adapt engineering guardrails, ensure strict definition of done, create health check tooling, seed missing database collections, fix backend unit tests, write regression tests, visually verify UI components, and handle finance/procurement feature enhancements.

## Product Vision
A robust FARM-stack ERP for a multi-brand F&B group (Torado Group), covering Finance, Procurement, HR, Inventory, Sales, and Operations.

---

## Architecture

### Stack
- **Backend**: FastAPI (Python 3.11), MongoDB (Motor async), Pydantic v2
- **Frontend**: React 18, Tailwind CSS, Shadcn/UI, Lucide-react
- **Auth**: JWT Bearer tokens (access + refresh)
- **AI**: Emergent Universal LLM Key (text gen)

### Key Directories
- `/app/backend/routers/` — FastAPI route definitions
- `/app/backend/services/` — Public facade services
- `/app/backend/services/_*/` — Private domain implementations
- `/app/backend/tests/` — Pytest test suite (203 tests)
- `/app/frontend/src/portals/finance/` — Finance module components

---

## Core Features Implemented

### Finance Module
- [x] General Ledger (COA, Journal Entries, Reversal)
- [x] Trial Balance, P&L, Balance Sheet, Cash Flow
- [x] AR Aging, AP Aging
- [x] Manual Journals with approval workflow
- [x] Period Lock/Close system
- [x] Fixed Assets (depreciation, disposal)
- [x] Bank Accounts management

### Bank Reconciliation (Deep UAT Complete)
- [x] Auto-match PAY + JE candidates with confidence scoring
- [x] Manual match interface with type/amount filters
- [x] JE matching (`journal_entries` as target type)
- [x] Reverse Reconciliation (undo commit)
- [x] Session History/Audit Log panel
- [x] `test_bank_recon.py` — full test coverage

### Anomaly Feed (Phase 7D / Phase 5C — Complete)
- [x] Sales deviation detection (all outlets)
- [x] Vendor price spike & lead-time anomalies
- [x] AP cash spike detection
- [x] Filter bar: period, severity, status, type, outlet, amount, assignee, search
- [x] Triage workflow (acknowledge, investigate, resolved, false_positive)
- [x] Analytics dashboard (Phase 5C.6)
- [x] CSV/XLSX export
- [x] Configurable Scan Dialog (days, as_of_date, period)
- [x] Scan result breakdown (Sales Deviation, Vendor, AP/Kas counts)
- [x] Last-scan indicator below summary tiles
- [x] `GET /api/anomalies/last-scan` endpoint
- [x] **NEW P2**: Threshold Override UI (admin gear icon in toolbar)
  - [x] Dialog modal dengan 3 tab scope (Group, Brand, Outlet)
  - [x] 4 detector cards (Sales Deviation, Vendor Price, Vendor Leadtime, AP Spike)
  - [x] Field editing dengan "modified" indicator + default value hint
  - [x] Toggle enable/disable per detector
  - [x] Simpan override ke `business_rules` collection
  - [x] Reset ke default (soft-delete override)
  - [x] Override status indicator ("Override aktif" badge)
- [x] `GET /api/anomalies/thresholds`
- [x] `POST /api/anomalies/thresholds` (upsert by scope)
- [x] `DELETE /api/anomalies/thresholds/{rule_id}`
- [x] `test_anomaly_feed_regression.py` — 17 tests
- [x] `test_threshold_wht_p2.py` — 15 tests

### Payment Runs (Batch Payment — Complete)
- [x] Draft → Confirmed → Posted workflow (or Cancelled)
- [x] Select multiple approved Payment Requests
- [x] **NEW P2**: WHT Support — PAYs dengan withholding tax dibayar dengan JE individual
  - [x] Non-WHT PAYs → batch JE tunggal (Dr expense lines, Cr bank total)
  - [x] WHT PAYs → individual JEs via `post_for_withholding_payment`
  - [x] PPh dicatat ke `ebupot_wh` collection (ebupot recording)
  - [x] Bank outflow = gross - WHT untuk WHT payments
  - [x] `je_ids: [...]` menyimpan semua JE IDs
  - [x] WHT column di payment picker dan detail tabel
  - [x] WHT banner di detail page
  - [x] Gross / WHT / Net summary cards
- [x] PRN number series (PRN-{YY}{MM}-{0000})
- [x] GR payment status update on posting
- [x] `GET /api/finance/payment-runs/kpi`
- [x] `GET /api/finance/payment-runs` (list with status/date filters)
- [x] `POST /api/finance/payment-runs` (create draft)
- [x] `GET /api/finance/payment-runs/{id}` (detail + enriched payments)
- [x] `PATCH /api/finance/payment-runs/{id}` (update draft)
- [x] `POST /api/finance/payment-runs/{id}/confirm`
- [x] `POST /api/finance/payment-runs/{id}/post` (execute — WHT aware)
- [x] `POST /api/finance/payment-runs/{id}/cancel`
- [x] Frontend: `PaymentRunList.jsx` (KPI strip, filter tabs, create dialog + WHT column)
- [x] Frontend: `PaymentRunDetail.jsx` (detail, timeline, action buttons, WHT banner)
- [x] `test_payment_runs.py` — 5 tests (8 skipped - no approved PAY in demo DB)

### Procurement
- [x] PR → PO → GR workflow
- [x] RFQ / Vendor comparison
- [x] Item pricing versioning (Market List)
- [x] Procurement Reports Tab in Finance Reports Hub

### HR / Payroll
- [x] Employee master, leave management
- [x] Payroll cycle (draft → approve → post)
- [x] KDO/BDO operations

### Inventory
- [x] Stock movements, adjustments

### Payment Run Templates (Recurring Payment — NEW)
- [x] Template menyimpan: name, bank_account, schedule_day (1-28), auto_approve, items
- [x] Items: payee (vendor/employee/other), amount, description, COA debit, WHT fields
- [x] Apply template → buat N Payment Requests (approved if auto_approve) + draft Payment Run
- [x] KPI: apply_count, last_applied_at per template
- [x] `GET /api/finance/payment-run-templates` (list)
- [x] `POST /api/finance/payment-run-templates` (create, items bisa kosong saat create)
- [x] `GET /api/finance/payment-run-templates/{id}` (detail)
- [x] `PATCH /api/finance/payment-run-templates/{id}` (update + edit items)
- [x] `DELETE /api/finance/payment-run-templates/{id}` (soft-delete)
- [x] `POST /api/finance/payment-run-templates/{id}/apply` (apply → PR + Run)
- [x] Frontend: `PaymentRunTemplateList.jsx` (grid cards + create dialog + apply dialog)
- [x] Frontend: `PaymentRunTemplateDetail.jsx` (items table + add/edit/remove item + apply)
- [x] "Templates" shortcut button di PaymentRunList
- [x] Nav schema: "Run Templates" di bawah Payments section
- [x] `test_payment_run_templates.py` — 7 tests

### Engineering Guardrails
- [x] Trailing-slash 400 middleware in `server.py`
- [x] `test_api_structure.py` — trailing slash tests
- [x] `ENGINEERING_GUARDRAILS.md` policy document
- [x] Public service facades (no duplication)
- [x] Audit log for all financial mutations
- [x] Period lock enforcement on all financial writes

---

## Key APIs

### Payment Runs
- `GET /api/finance/payment-runs/kpi`
- `GET/POST /api/finance/payment-runs`
- `GET/PATCH /api/finance/payment-runs/{id}`
- `POST /api/finance/payment-runs/{id}/confirm|post|cancel`

### Anomaly Thresholds
- `GET /api/anomalies/thresholds` — list all override rules
- `POST /api/anomalies/thresholds` — upsert by scope
- `DELETE /api/anomalies/thresholds/{rule_id}` — revert to default
- `GET /api/anomalies/last-scan`

### Bank Recon
- `POST /api/finance/bank-recon/sessions/{id}/reverse-commit`
- `GET /api/finance/bank-recon/sessions/{id}/history`

---

## DB Collections
`bank_recon_sessions`, `journal_entries`, `payment_requests`, `payment_runs`, `audit_logs`, `anomaly_events`, `bank_accounts`, `chart_of_accounts`, `goods_receipts`, `number_series`, `business_rules`

---

## Test Status
- **Total tests**: 210 passed, 11 skipped
- **Test files**: `test_anomaly_feed_regression.py` (17), `test_bank_recon.py`, `test_api_structure.py`, `test_payment_runs.py` (5), `test_threshold_wht_p2.py` (15)

---

## Credentials
- admin@torado.id / Torado@2026 (SUPER_ADMIN)
- finance@torado.id / Torado@2026 (Finance Manager)

---

## Forensic Audit & Remediation — 2026-06-14
Audit forensik menyeluruh (backend code + integritas data/SSOT + redundansi + 351 endpoint + 46 halaman frontend). Laporan terkonsolidasi (dokumen forensik asli sudah dihapus): `memory/GROUND_TRUTH_2026-06-17.md` (Part B = verifikasi klaim FIXED; Part E = backlog open). Semua bug code diperbaiki & diverifikasi (215 pytest pass, GL balanced, health 25/25, UI confirmed by testing agent).

**Fixed:**
- F1 — Test reproducibility: `test_payment_run_templates.py`/`test_phase5_refactor.py` baca `frontend/.env` (bukan env-var) → 8 error hilang, 210→215 pass.
- F2 — Tax Settlement PPN: rewrite `services/_period/tax_settlement.py` pakai `gl_mapping` SSOT + `_post_journal` (sebelumnya baca `db.coa`/`ap_invoices` kosong + kode COA salah → JE tak pernah dibuat).
- F3 — AP collection drift: `cash_position`/`owner_digest`/`daily_briefing`/`ebupot`/`tax_settlement` → `ap_ledgers` (field `balance`); + perbaiki burn-rate (`coa.type`/`lines.dr`). Cash position AP exposure Rp0→Rp93,8jt.
- F4 — KDO/BDO Excel report → `kdo_bdo_orders`+`req_date`.
- F5 — Index pindah dari koleksi kosong ke nyata (`accounting_periods` unique, `ap_ledgers`, `inventory_movements`).
- F6 — `verify_contract.py` kini scan services + nama kanonik diperbaiki (`accounting_periods`/`ap_ledgers`/`inventory_movements`).
- F7 — Hapus dead code (`ar_reminder_service.py`, `stock_balance_service.py`).
- F10 — AP Aging XLSX export 500 → `workbook_to_bytes()`.
- FE1 — `LeaveRequests.jsx` pakai cached `useAuth()`. FE2 — hapus registrasi Service Worker (file tak ada). FE4 — `test_credentials.md` token key `aurora_access_token`.
- D1 — Backfill AP subledger ke GL (`scripts/backfill_ap_opening.py`): Balance Sheet liabilities Rp0→Rp93,8jt (balanced).

**Non-issue / data-gap:** F9 (AI QA session disimpan via upsert), FE3 (hook sudah `toast.error`), D2 (Budget/Asset/Approval kosong = seed gap).

**Sisa LOW (dicatat):** split `petty_cash_transactions`(32) vs `petty_cash`(90) di exec-drilldown; plafon `per_page:100` di PODetail/PRDetail; PPN-in/e-Bupot butuh AP melacak `ppn_amount`/`pph23` (gap desain).

## UI/UX Fixes — 2026-06-14 (15" laptop)
- **U1 (P0)** — "Gagal memuat request" (429) saat navigasi cepat: bucket rate-limit `api` dinaikkan 200→1000 req/60s di `core/rate_limiter.py` (+ docstring `core/middleware.py`). Retry 429 di `lib/api.js` tetap aktif.
- **U2 (P1)** — Logo "Torado" & menu portal overlap di 1366px: `TopNav.jsx` portal switcher kini `flex-1 min-w-0 overflow-x-auto no-scrollbar` + pill ringkas (`px-3 py-1.5 text-[13px]`); logo & right-cluster `shrink-0`. Semua 8 portal reachable via scroll, tidak overlap. Utility `.no-scrollbar` ditambah di `index.css`.
- **U3 (P1)** — Hapus menu "Navigation History" (RECENT) + PINNED dari sidebar: `Sidebar.jsx` ditulis ulang tanpa section pinned/recent & tombol pin; hook `useSidebarPins.js` dihapus (dead code). Menu utama tidak lagi terdorong ke bawah.
- Verifikasi: screenshot 1366px (no overlap, sidebar bersih), backend 215 passed/12 skipped.

## UI/UX Overhaul — 2026-06-14 (usability standard + showcase)
Audit menyeluruh (9 portal / 283 halaman) menemukan masalah usability sistemik (bukan kasus tunggal):
hanya 1/~100 tabel punya drill-down, 4/~100 sortable, 5/10 chart pakai tooltip Recharts default, waterfall Profit Walk palsu, KpiCard tanpa tren.

**Primitive baru (high-leverage):**
- `components/shared/DataTable.jsx` — tabel terpadu: sortable, sticky header, hover, tabular-nums, **expandable drill-down**, responsif mobile, loading/empty bawaan.
- `components/shared/KpiCard.jsx` (redesign) — delta chip + sparkline + hover; backward-compatible.
- `components/shared/Sparkline.jsx`, `components/shared/charts/chartKit.jsx` (GlassTooltip, ChartEmpty, SEMANTIC, axisProps), `components/shared/charts/WaterfallChart.jsx` (waterfall SVG sejati: floating bars + connector + value label).

**Showcase — Executive Profit Walk:** backend `profit_walk_service.compute_profit_walk` kini mengembalikan `stages[].breakdown` (akun COA period/compare); halaman dibangun ulang dgn KpiCard + WaterfallChart + DataTable expandable. Tested PASS.

**Konsolidasi:** menu+route "Sales Wizard" dihapus → redirect ke `/outlet/daily-sales/new`; satu pintu masuk Daily Sales. Tested PASS.

**Charts dimigrasi ke GlassTooltip/ChartEmpty (chart ERRORs = 0):** CashPosition, PeriodCompare, OutletBudgetMonitor, CRMAnalytics, CMSAnalytics, AnomalyAnalyticsDashboard.

**Governance baru (case study):** `docs/UX_USABILITY_STANDARD.md` (standar baku + DoD checklist) + `scripts/ux_audit.py` (auditor; `--strict` gate). Baseline saat ini: **43 ERROR, 349 WARN** = backlog migrasi Fase 4/5.

### Backlog Fase 4 (roll-out tabel + select) — PROGRESS 2026-06-14
**Selesai turn ini (tested, iteration_20 PASS):**
- ✅ **Semua 43 table ERROR dibersihkan → ux_audit `--strict` lulus (0 ERROR).**
- ✅ Auditor `ux_audit.py` disempurnakan agar terpercaya: suppress rule yang sudah dijamin DataTable/DataList; form/dialog/detail → WARN (bukan ERROR).
- ✅ `FixedAssetList` dimigrasi penuh ke `DataTable` (sortable + empty state) sebagai contoh flagship.
- ✅ `tabular-nums` ditambahkan ke ~18 file (CRMAnalytics, ARInvoiceDialogs, BudgetVsActual, BudgetApprovals, ReservationSummary, ReservationDeposits, EBupot/EFaktur, FixedAssetDetail, FdoPage, MarketList, PriceIntelligence, VendorCatalog, ApprovalCenter, RFQDetail, CashCsvUploader, dll).
- ✅ Empty-state ditambahkan: SalesHeatmapWidget, ArchivalView, ExportTab.
- ✅ `components/shared/SimpleSelect.jsx` dibuat (menangani gotcha shadcn empty-value "" ↔ sentinel).

**Fase 4 — SELECT roll-out SELESAI (tested, iteration_21 PASS — 0 crash, 30+ dropdown diverifikasi):**
- ✅ **SEMUA `<select>` native dimigrasi ke `SimpleSelect`** di seluruh portal:
  - finance (COABrowser, Comparatives, Forecasting, ProfitLoss, TrialBalance, PivotReport, BankRecon, AnomalyFeed/index+ThresholdSettingsDialog, ManualJournalForm, PaymentDetail, PaymentRunTemplateList+Detail, ProcurementReportsTab, TaxCenter PPh21+Withholding)
  - inventory (StockBalance, TransferList, Valuation, OpnameList, LowStockAlert, Movements, AdjustmentList)
  - outlet (DailySalesFormSteps, KdoBdoList, UrgentPurchaseList, PettyCashList, DailySalesFormPkg)
  - admin (ApprovalWorkflows, UserDialog, ImportTab, LogsView, BrandInstagramPosts, MasterData)
  - executive (AnomalyDetection ×4, BrandMixOverview)
  - Sisa `form.select` WARN = 1 (false-positive komentar di SimpleSelect.jsx).

**Fase 3 — TABLE→DataTable + drill-down (user minta drill-down "perlu") — PROGRESS 2026-06-14:**
- ✅ Finance list (5 file, tested iteration_22 — AP Aging & Journals FULL PASS drill-down live; PR/PRN/Payments verified-by-code, DB kosong):
  - PaymentRequestList (drill-down inline `pr.items`), PaymentRunList (lazy-fetch payments), PaymentList (PayBreakdown + WHT), APAging (reuse item drill-down + footer total, sortable), JournalList (DataList→DataTable, lazy-fetch baris jurnal Dr/Cr balanced).
- ✅ Procurement list (2 file, smoke-verified drill-down OK): PRList (inline `pr.lines`), POList (inline `po.lines`). DataList→DataTable + sortable.

**Sisa backlog tabel (WARN, dipandu `ux_audit.py`):**
- ✅ **Fase 3 Admin (tested iteration_25 + TourAnalytics fix self-verified):** 9 list page dimigrasi ke `DataTable` — AuditLog, UsersAdmin (drill-down roles/akses), MasterData (drill-down semua field + dynamic cols), LoyaltyAdminCustomers, LoyaltyAdminRedemptions, LogsView, SchedulerView, ArchivalView, TourAnalytics (klik baris → dialog drop-off). Skip: BulkImportAdmin, ExportTab, CRMAnalytics, MetricsView (form/analytics).
  - CATATAN bug fork: 4 file (UsersAdmin/MasterData/LoyaltyAdminRedemptions/TourAnalytics) sempat half-migrated (import diganti DataTable tapi body masih `<LoadingState>/<Skeleton>/<Table>` tak diimpor → crash). Diperbaiki turn ini.
- ✅ **Fase 3 Executive (tested iteration_26, 100% PASS):** 3 list page dimigrasi — ExecutiveHome "Top Outlets" (sortable + onRowClick navigate ke /executive/outlet/{id}), ReservationSummary "Per Outlet" (sortable + empty state), BudgetApprovals (2 tabel: submitted + approved, drill-down rincian COA lines, action Approve/Reject/Lock). Skip by-design: PeriodCompare (matrix metric×period), OutletBudgetAllocation (form-input matrix), OutletBudgetMonitor (heatmap/detail matrix + charts).
- Sisa: Procurement (VendorScorecardList kandidat; GR/PO/PR Form/Detail = skip), Reports/shared lain. Audit saat ini: **0 ERROR, 181 WARN** (mayoritas form/detail/matrix yang sengaja tidak dimigrasi).
- Catatan: tabel form-input & detail line-item sengaja TIDAK dimigrasi (bukan list/report).
### Backlog Fase 5 (bersih-bersih menu/IA)
- Finance Reports 7 deep-link `?tab=` → sub-tab di hub; rapikan Period Closing (Workflow vs Wizard vs Periods); naming "Owner Home" di Executive; urutan menu HR.

## Backlog / Upcoming

### P1
- Email Notifications untuk approval workflow (PR submitted → email ke approver dengan tombol "Approve")

### P2 (selesai)
- ~~Payment Run: support WHT payments~~ ✅
- ~~Anomaly Feed: threshold override UI untuk admin~~ ✅

### P3 (Future)
- Payment Run: batch cancel after posting (partial reversal)
- Payment Run export ke format bank file (BCA/CIMB format)
- Payment Run Template (konfigurasi run reusable untuk vendor reguler)
- Anomaly Feed: scheduled auto-scan (cron trigger)
- Dashboard analytics payment runs per bulan

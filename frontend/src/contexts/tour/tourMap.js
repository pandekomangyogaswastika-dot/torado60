/**
 * tourMap.js — Centralized mapping of routes → tour IDs + tour metadata
 *
 * Format:
 *   pathToTours: { "/path": ["tour-id-1", "tour-id-2"] }
 *   - exact match first
 *   - prefix match with "/*" suffix
 *   - dynamic params via ":param" segments
 *
 *   tourMetadata: { "tour-id": { title, description, icon } }
 */

// =====================================================
// PATH → TOURS MAPPING
// =====================================================

const pathToTours = {
  // ==== Outlet portal ====
  "/outlet": ["outlet-home"],
  "/outlet/home": ["outlet-home"],
  "/outlet/daily-orders": ["outlet-daily-orders"],
  "/outlet/end-of-day": ["outlet-end-of-day"],
  "/outlet/crm": ["outlet-crm-hub"],
  "/outlet/reservations": ["outlet-reservation-list"],
  "/outlet/reservations/new": ["outlet-reservation-form"],
  "/outlet/reservations/:id/edit": ["outlet-reservation-form"],
  "/outlet/daily-sales": ["outlet-daily-sales"],
  "/outlet/sales-wizard": ["outlet-sales-wizard"],
  "/outlet/daily-close": ["outlet-daily-close"],
  "/outlet/petty-cash": ["outlet-petty-cash"],
  "/outlet/loyalty/scan": ["outlet-loyalty-scan"],
  "/outlet/loyalty/redeem": ["outlet-loyalty-redeem"],

  // ==== Admin portal ====
  "/admin": ["admin-home"],
  "/admin/master-data": ["admin-master-data"],
  "/admin/master/:entity": ["admin-master-data"],
  "/admin/cms-studio": ["admin-cms-studio"],
  "/admin/cms/:entity": ["admin-cms-studio"],
  "/admin/cms/menu": ["admin-menu-cms"],
  "/admin/cms/brands": ["admin-cms-studio"],
  "/admin/cms/news": ["admin-cms-studio"],
  "/admin/users": ["admin-users"],
  "/admin/roles": ["admin-roles"],
  "/admin/approval-builder": ["admin-approval-builder"],
  "/admin/workflows": ["admin-workflows"],
  "/admin/bulk-import": ["admin-bulk-import"],
  "/admin/number-series": ["admin-number-series"],
  "/admin/tax-config": ["admin-tax-config"],
  "/admin/operations": ["admin-operations"],
  "/admin/settings": ["admin-settings"],
  "/admin/loyalty": ["admin-loyalty-overview"],
  "/admin/loyalty/customers": ["admin-loyalty-customers"],
  "/admin/loyalty/rewards": ["admin-loyalty-rewards"],
  "/admin/configuration": ["admin-configuration"],
  "/admin/report-schedules": ["admin-report-schedules"],
  "/admin/data-management": ["admin-data-management"],
  "/admin/smart-seo": ["admin-smart-seo"],
  "/admin/integrations": ["admin-integrations"],
  "/admin/audit-log": ["admin-audit-log"],
  "/admin/tour-analytics": ["admin-tour-analytics"],

  // ==== Procurement portal ====
  "/procurement": ["procurement-home"],
  "/procurement/kanban": ["procurement-kanban"],
  "/procurement/pr": ["procurement-pr-list"],
  "/procurement/po": ["procurement-po-list"],
  "/procurement/vendor-comparison": ["procurement-vendor-compare"],
  "/procurement/gr": ["procurement-gr"],
  "/procurement/vendors": ["procurement-vendors"],
  "/procurement/vendor-scorecard": ["procurement-vendor-scorecard"],
  "/procurement/vendor-recommend": ["procurement-vendor-recommend"],
  "/procurement/rfq": ["procurement-rfq"],

  // ==== Finance portal ====
  "/finance": ["finance-home"],
  "/finance/validation": ["finance-validation"],
  "/finance/manual-journal": ["finance-manual-journal"],
  "/finance/ap-aging": ["finance-ap"],
  "/finance/journals": ["finance-journals"],
  "/finance/payment-requests": ["finance-payment-requests"],
  "/finance/payments": ["finance-payments"],
  "/finance/bank-recon": ["finance-bank-recon"],
  "/finance/ar": ["finance-ar"],
  "/finance/trial-balance": ["finance-trial-balance"],
  "/finance/balance-sheet": ["finance-balance-sheet"],
  "/finance/cashflow": ["finance-cashflow"],
  "/finance/coa": ["finance-coa"],
  "/finance/profit-loss": ["finance-profit-loss"],
  "/finance/anomalies": ["finance-anomalies"],
  "/finance/comparatives": ["finance-comparatives"],
  "/finance/periods": ["finance-periods"],
  "/finance/period-closing": ["finance-period-closing"],

  // ==== Inventory portal ====
  "/inventory": ["inventory-home"],
  "/inventory/balance": ["inventory-balance"],
  "/inventory/movements": ["inventory-movements"],
  "/inventory/movements-hub": ["inventory-movements-hub"],
  "/inventory/opname": ["inventory-opname"],
  "/inventory/transfers": ["inventory-transfers"],
  "/inventory/adjustments": ["inventory-adjustment"],
  "/inventory/low-stock": ["inventory-low-stock"],
  "/inventory/market-list": ["inventory-market-list"],

  // ==== Executive portal ====
  "/executive": ["executive-home"],
  "/executive/ai": ["executive-ai-qa"],
  "/executive/anomaly": ["executive-anomaly"],
  "/executive/brand-mix": ["executive-brand-mix"],
  "/executive/profit-walk": ["executive-profit-walk"],
  "/executive/period-compare": ["executive-period-compare"],

  // ==== Owner portal ====
  "/owner": ["owner-home"],
  "/owner/cash": ["owner-cash"],
  "/owner/approvals": ["owner-approvals"],
  "/owner/briefing": ["owner-briefing"],
  "/owner/ai-assistant": ["owner-ai-assistant"],

  // ==== HR portal ====
  "/hr": ["hr-home"],
  "/hr/payroll": ["hr-payroll"],
  "/hr/advances": ["hr-advances"],
  "/hr/leaves": ["hr-leaves"],
  "/hr/job-applications": ["hr-job-applications"],
  "/hr/job-listings": ["hr-job-listings"],
  "/hr/service-charge": ["hr-service-charge"],
  "/hr/incentive": ["hr-incentive"],
  "/hr/compensation": ["hr-compensation"],
};

// =====================================================
// TOUR METADATA
// =====================================================

const tourMetadata = {
  // ==== Outlet ====
  "outlet-home": { title: "Outlet — Workbench Harian", description: "Cara mengelola tugas harian outlet", icon: "🏪" },
  "outlet-daily-orders": { title: "Daily Orders Hub (KDO, BDO, FDO)", description: "Kelola semua purchase orders harian dari satu tempat", icon: "📋" },
  "outlet-end-of-day": { title: "End-of-Day Workflow", description: "4 langkah penutupan harian outlet", icon: "🔒" },
  "outlet-crm-hub": { title: "CRM & Reservasi Hub", description: "Panduan mengelola reservasi dan loyalty member", icon: "📊" },
  "outlet-reservation-list": { title: "Daftar Reservasi", description: "Status reservasi & downpayment tracking", icon: "📋" },
  "outlet-reservation-form": { title: "Form Reservasi", description: "Cara membuat & mengedit reservasi", icon: "✏️" },
  "outlet-daily-sales": { title: "Daily Sales", description: "Cara input penjualan harian", icon: "💵" },
  "outlet-sales-wizard": { title: "Sales Wizard 5-Langkah", description: "Wizard input daily sales per channel & payment", icon: "🧙" },
  "outlet-daily-close": { title: "Daily Close", description: "Penutupan harian outlet dengan validasi lengkap", icon: "🔒" },
  "outlet-petty-cash": { title: "Petty Cash", description: "Kelola kas kecil outlet", icon: "🧧" },
  "outlet-loyalty-scan": { title: "Input Poin Loyalty", description: "Scan struk untuk akumulasi poin member", icon: "⚡" },
  "outlet-loyalty-redeem": { title: "Redeem Voucher", description: "Tukar poin / voucher member di kasir", icon: "🎁" },

  // ==== Admin ====
  "admin-home": { title: "Admin Home", description: "Tour cepat halaman utama admin", icon: "⚙️" },
  "admin-master-data": { title: "Master Data Hub", description: "Kelola semua master data dalam satu halaman", icon: "🗂️" },
  "admin-cms-studio": { title: "CMS Studio", description: "9 entitas CMS website public dalam satu workspace", icon: "📰" },
  "admin-menu-cms": { title: "E-Menu CMS", description: "Kelola menu, upload foto & PDF", icon: "🍽️" },
  "admin-cms-brands": { title: "CMS Studio — Brands", description: "Edit profil brand untuk website public", icon: "🏷️" },
  "admin-cms-news": { title: "CMS Studio — News", description: "Publish artikel & konten website", icon: "📰" },
  "admin-users": { title: "Manajemen User", description: "Buat user, atur role, dan reset password", icon: "👥" },
  "admin-roles": { title: "Roles & Permissions", description: "Kelola peran dan izin akses untuk semua user", icon: "🔐" },
  "admin-approval-builder": { title: "Approval Matrix Builder", description: "Bangun workflow approval multi-tier secara visual", icon: "🔀" },
  "admin-workflows": { title: "Approval Workflows", description: "Kelola aturan approval berbasis teks untuk semua modul", icon: "📋" },
  "admin-bulk-import": { title: "Bulk Excel Import", description: "Import ratusan data sekaligus via CSV/Excel", icon: "📊" },
  "admin-number-series": { title: "Number Series", description: "Atur format nomor otomatis untuk semua jenis dokumen", icon: "🔢" },
  "admin-tax-config": { title: "Tax Configuration", description: "Atur tax codes dan rate PPN/service charge", icon: "💰" },
  "admin-operations": { title: "System Operations", description: "Pantau kesehatan sistem: metrics, logs, scheduler", icon: "⚙️" },
  "admin-settings": { title: "System Settings", description: "Konfigurasi global sistem: timezone, branding, parameter", icon: "🔧" },
  "admin-loyalty-overview": { title: "Loyalty Admin — Overview", description: "Dashboard program loyalty: member, poin, rewards", icon: "🎁" },
  "admin-loyalty-customers": { title: "Loyalty Customers", description: "Kelola daftar member loyalty", icon: "👥" },
  "admin-loyalty-rewards": { title: "Loyalty Rewards Catalog", description: "Kelola katalog rewards program", icon: "🎁" },
  "admin-configuration": { title: "Business Rules Configuration", description: "Atur parameter bisnis per outlet", icon: "📋" },
  "admin-report-schedules": { title: "Laporan Terjadwal", description: "Atur laporan otomatis via Email/WhatsApp/Telegram", icon: "📅" },
  "admin-data-management": { title: "Manajemen Data", description: "Export, import, dan hapus data dalam jumlah besar", icon: "💾" },
  "admin-smart-seo": { title: "Smart SEO AI", description: "Optimalkan SEO website dengan bantuan AI", icon: "🔍" },
  "admin-integrations": { title: "Integrations Hub", description: "Konfigurasi API key (LLM, Email, WhatsApp, dll)", icon: "🔌" },
  "admin-audit-log": { title: "Audit Log", description: "Lacak semua aktivitas user di sistem", icon: "🔍" },
  "admin-tour-analytics": { title: "Tour Analytics", description: "Lacak penggunaan & efektivitas Help & Tour", icon: "📊" },

  // ==== Procurement ====
  "procurement-home": { title: "Procurement Home", description: "Overview pembelian & approvals", icon: "🛒" },
  "procurement-kanban": { title: "Workboard Kanban", description: "Drag & drop PR → PO → GR", icon: "🗂️" },
  "procurement-pr-list": { title: "Purchase Requests", description: "Kelola & approve permintaan pembelian", icon: "📝" },
  "procurement-po-list": { title: "Purchase Orders", description: "Buat, kirim & pantau PO ke vendor", icon: "📦" },
  "procurement-vendor-compare": { title: "Bandingkan Vendor", description: "Cari vendor terbaik berdasarkan history", icon: "⚖️" },
  "procurement-gr": { title: "Penerimaan Barang (GR)", description: "Posting GR & auto-journal AP", icon: "🚚" },
  "procurement-vendors": { title: "All Vendors", description: "Lihat dan kelola semua vendor terdaftar", icon: "🏢" },
  "procurement-vendor-scorecard": { title: "Vendor Scorecard", description: "Peringkat performa vendor berdasarkan historis", icon: "📊" },
  "procurement-vendor-recommend": { title: "AI Vendor Recommendation", description: "AI merekomendasikan vendor terbaik", icon: "🤖" },
  "procurement-rfq": { title: "RFQ — Request for Quotation", description: "Kirim permintaan penawaran harga ke vendor", icon: "📋" },

  // ==== Finance ====
  "finance-home": { title: "Finance Home", description: "Validasi sales, AP, approvals", icon: "💰" },
  "finance-validation": { title: "Sales Validation Queue", description: "Review dan validasi daily sales dari semua outlet", icon: "✅" },
  "finance-manual-journal": { title: "Manual Journal Entry", description: "Buat jurnal akuntansi manual dengan validasi Dr=Cr", icon: "📓" },
  "finance-ap": { title: "AP Aging — Hutang Dagang", description: "Pantau aging hutang ke vendor", icon: "📒" },
  "finance-journals": { title: "Journal Entries", description: "Lihat, filter & buat JAE manual", icon: "📓" },
  "finance-payment-requests": { title: "Payment Requests", description: "Daftar semua payment request yang diajukan", icon: "💳" },
  "finance-payments": { title: "Payment Requests — Workflow Pembayaran", description: "Workflow pembayaran: request → approve → paid", icon: "💳" },
  "finance-bank-recon": { title: "Bank Reconciliation", description: "Upload mutasi rekening dan cocokkan dengan JE", icon: "🏦" },
  "finance-ar": { title: "AR Invoices — Piutang Dagang", description: "Kelola invoice ke customer B2B", icon: "📄" },
  "finance-trial-balance": { title: "Trial Balance", description: "Neraca saldo semua akun COA", icon: "⚖️" },
  "finance-balance-sheet": { title: "Balance Sheet — Neraca Keuangan", description: "Laporan posisi keuangan: Aset, Kewajiban, Ekuitas", icon: "📊" },
  "finance-cashflow": { title: "Cashflow Statement — Arus Kas", description: "Laporan arus kas: operasional, investasi, pendanaan", icon: "💵" },
  "finance-coa": { title: "Chart of Accounts (COA)", description: "Browse dan manage akun-akun buku besar", icon: "📖" },
  "finance-profit-loss": { title: "Profit & Loss — Laporan Laba Rugi", description: "Baca dan drill-down laporan P&L", icon: "📈" },
  "finance-anomalies": { title: "Anomaly Feed — Deteksi Keuangan", description: "Review flag anomali otomatis dari seluruh data keuangan", icon: "🚨" },
  "finance-comparatives": { title: "Period Comparatives", description: "Bandingkan performa keuangan antar periode", icon: "📊" },
  "finance-periods": { title: "Period Locking", description: "Kelola periode akuntansi & enforcement", icon: "📅" },
  "finance-period-closing": { title: "Period Closing Hub", description: "Workflow 4-fase tutup bulan akuntansi", icon: "🔒" },

  // ==== Inventory ====
  "inventory-home": { title: "Inventory Home", description: "Overview stock & alerts", icon: "📦" },
  "inventory-balance": { title: "Stock Balance — Matrix Stok", description: "Stok real-time: list dan matrix view", icon: "📊" },
  "inventory-movements": { title: "Movement Journal", description: "Timeline keluar-masuk barang lengkap", icon: "🔄" },
  "inventory-movements-hub": { title: "Stock Movements Hub", description: "History, transfers & adjustments dalam satu tempat", icon: "📦" },
  "inventory-opname": { title: "Stock Opname", description: "Hitung stok fisik dengan AI variance analysis", icon: "🔢" },
  "inventory-transfers": { title: "Transfer Stok", description: "Pindahkan stok antar outlet dengan traceability", icon: "🚛" },
  "inventory-adjustment": { title: "Stock Adjustment", description: "Koreksi stok: damage, expired, loss", icon: "⚠️" },
  "inventory-low-stock": { title: "Low Stock Alert", description: "Monitor item di bawah par level dan buat PR otomatis", icon: "⚠️" },
  "inventory-market-list": { title: "Market List — Harga Acuan", description: "Pantau harga pasar referensi dan approve harga kwartal", icon: "💰" },

  // ==== Executive ====
  "executive-home": { title: "Executive Dashboard", description: "KPI strip + drilldown + insights", icon: "📈" },
  "executive-ai-qa": { title: "AI Q&A Assistant", description: "Tanya AI tentang performance bisnis", icon: "🤖" },
  "executive-anomaly": { title: "Anomaly Detection", description: "AI mendeteksi pola anomali di data bisnis dan keuangan", icon: "🚨" },
  "executive-brand-mix": { title: "Brand Mix Overview", description: "Analisis kontribusi dan performa masing-masing brand", icon: "📊" },
  "executive-profit-walk": { title: "Profit Walk — Analisis Laba", description: "Waterfall chart kontribusi tiap komponen ke laba bersih", icon: "📈" },
  "executive-period-compare": { title: "Period Compare — Perbandingan Periode", description: "Bandingkan KPI bisnis antar periode secara visual", icon: "📊" },

  // ==== Owner ====
  "owner-home": { title: "Owner Cockpit", description: "Cash + profit walk + approvals", icon: "👑" },
  "owner-cash": { title: "Cash Position", description: "Lihat posisi kas total group dan proyeksi ke depan", icon: "🏦" },
  "owner-approvals": { title: "My Approvals", description: "Setujui permintaan dari mobile", icon: "✅" },
  "owner-briefing": { title: "Daily Briefing AI", description: "Ringkasan bisnis harian otomatis dengan AI analysis", icon: "📄" },
  "owner-ai-assistant": { title: "Business Q&A — AI Assistant", description: "Tanya apapun tentang bisnis dalam Bahasa Indonesia", icon: "🤖" },

  // ==== HR ====
  "hr-home": { title: "HR Home", description: "Overview employees, payroll & advance", icon: "👤" },
  "hr-payroll": { title: "HR Payroll", description: "Kelola penggajian bulanan karyawan", icon: "💼" },
  "hr-advances": { title: "Employee Advances", description: "Kelola kasbon karyawan", icon: "💸" },
  "hr-leaves": { title: "Leave Management", description: "Kelola cuti dan absensi karyawan", icon: "📆" },
  "hr-job-applications": { title: "Job Applications", description: "Review lamaran kerja dari website", icon: "📄" },
  "hr-job-listings": { title: "Job Listings", description: "Buat dan kelola lowongan kerja di website public", icon: "📋" },
  "hr-service-charge": { title: "Service Charge Distribution", description: "Distribusi service charge dari penjualan ke karyawan", icon: "💰" },
  "hr-incentive": { title: "Incentive Management", description: "Kelola bonus dan insentif kinerja karyawan", icon: "🎁" },
  "hr-compensation": { title: "Compensation Hub", description: "7 modul remunerasi karyawan dalam satu workspace", icon: "💰" },

  // ==== General ====
  "general-navigation": { title: "Navigasi Umum", description: "Cara mengelola sistem ERP secara umum", icon: "🧭" },
};

// =====================================================
// LOOKUP HELPERS
// =====================================================

export function getToursForPath(path) {
  const ids = [];

  // Exact match
  if (pathToTours[path]) {
    ids.push(...pathToTours[path]);
  } else {
    // Pattern match (dynamic params e.g. /admin/master/:entity, /outlet/reservations/:id/edit)
    for (const [pattern, tourIds] of Object.entries(pathToTours)) {
      if (pattern.includes(":")) {
        const regex = new RegExp("^" + pattern.replace(/:[^/]+/g, "[^/]+") + "$");
        if (regex.test(path)) {
          ids.push(...tourIds);
          break;
        }
      }
    }
  }

  // Always include general-navigation as fallback
  if (!ids.includes("general-navigation")) {
    ids.push("general-navigation");
  }

  return ids;
}

export function getTourMetadata(tourId) {
  return tourMetadata[tourId] || null;
}

export { pathToTours, tourMetadata };

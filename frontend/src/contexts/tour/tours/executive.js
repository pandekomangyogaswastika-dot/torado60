/** Executive and Owner portal tour definitions — Full coverage.
 * Phase D Hardening: replaced body targets with stable data-testid anchors.
 */

// ─── Executive Home ──────────────────────────────────────────────────
const executiveHomeTour = {
  name: "Executive Dashboard",
  description: "Real-time KPI, trends, dan AI insights untuk seluruh group.",
  steps: [
    {
      target: "[data-testid='executive-header']",
      title: "Executive Dashboard",
      content: "**Top-level overview** untuk owner & GM. KPI realtime + AI insights + drilldown ke brand/outlet.",
      placement: "bottom",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='exec-filterbar']",
      title: "Filter Bar",
      content: "Pilih **periode** (Today/Week/Month/Quarter/YTD/Custom), filter **brand** & **outlet** multi-select. URL akan auto-update untuk share/deep-link.",
      placement: "bottom",
    },
    {
      target: "[data-testid='exec-link-profit-walk']",
      title: "Profit Walk",
      content: "**Waterfall chart** profit period-over-period. Klik untuk lihat kontribusi tiap komponen ke laba.",
      placement: "bottom",
    },
    {
      target: "[data-testid='exec-live-toggle']",
      title: "Live Mode",
      content: "Aktifkan untuk auto-refresh setiap 60 detik. Cocok untuk pantau realtime di TV display.",
      placement: "left",
    },
    {
      target: "[data-testid='exec-export-pdf']",
      title: "Export PDF",
      content: "Export snapshot dashboard ke PDF untuk meeting. Includes filter context & timestamp.",
      placement: "left",
    },
    {
      target: "[data-testid='exec-kpi-strip-primary']",
      title: "KPI Primary Strip",
      content: "**Sales Hari Ini / WTD / MTD** + **Inventory Value**. Klik untuk drill ke source page.",
      placement: "bottom",
    },
  ],
};

// ─── Executive AI Q&A ─────────────────────────────────────────────────
const executiveAIQATour = {
  name: "Executive AI Q&A",
  description: "Tanya AI tentang performa bisnis dalam Bahasa Indonesia.",
  steps: [
    {
      target: "[data-testid='executive-qa-page']",
      title: "AI Business Q&A",
      content: "Tanya **pertanyaan bisnis** dalam Bahasa Indonesia dan AI akan menjawab berdasarkan data aktual ERP. Tidak perlu tahu cara query database.",
      placement: "top",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='qa-suggestion']",
      title: "Contoh Pertanyaan",
      content: "\u2022 'Sales Altero bulan ini berapa?'\n\u2022 'Vendor mana yang paling sering terlambat?'\n\u2022 'Outlet mana yang paling profitable Q1?'\n\u2022 'Item apa yang paling banyak diorder?'",
      placement: "bottom",
    },
    {
      target: "[data-testid='qa-input']",
      title: "AI Tool Calling",
      content: "AI secara otomatis memilih **tool** yang tepat (sales, inventory, finance, procurement) dan mengambil data real-time dari sistem untuk menjawab.",
      placement: "top",
      variant: "tip",
    },
  ],
};

// ─── Executive Anomaly Detection ───────────────────────────────────────────────
const executiveAnomalyTour = {
  name: "Anomaly Detection",
  description: "AI mendeteksi pola anomali di data bisnis dan keuangan.",
  steps: [
    {
      target: "[data-testid='executive-anomaly-page']",
      title: "Anomaly Detection",
      content: "Sistem **AI** secara otomatis mendeteksi anomali di data bisnis: penjualan tidak wajar, stok jeblok tiba-tiba, hutang melonjak, dan lainnya.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='anomaly-scan-btn']",
      title: "Scan Manual",
      content: "Klik **Scan** untuk jalankan deteksi anomali sekarang. Scan otomatis berjalan via scheduler malam hari.",
      placement: "bottom",
    },
    {
      target: "[data-testid='executive-anomaly-page']",
      title: "Filter Anomali",
      content: "Filter berdasarkan **severity** (Critical/High/Medium), **status**, **tipe anomali**, dan **rentang hari**.",
      placement: "top",
    },
    {
      target: "[data-testid='executive-anomaly-page']",
      title: "Tindak Lanjut",
      content: "Klik anomali untuk lihat **AI explanation** dan rekomendasi tindakan. Klik **Resolve** setelah ditangani atau **Ignore** jika sudah acceptable.",
      placement: "top",
      variant: "tip",
    },
  ],
};

// ─── Brand Mix Overview ──────────────────────────────────────────────────
const executiveBrandMixTour = {
  name: "Brand Mix Overview",
  description: "Analisis kontribusi dan performa masing-masing brand.",
  steps: [
    {
      target: "[data-testid='brand-mix-overview']",
      title: "Brand Mix Analysis",
      content: "Analisis **kontribusi setiap brand** (Altero, Bakkies, Calluna, De La Sol, Rucker Park) terhadap total revenue dan profit group.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='brand-mix-period']",
      title: "Pilih Periode",
      content: "Filter per bulan untuk lihat mix brand di periode tertentu. Bandingkan dua periode berbeda untuk lihat pergeseran kontribusi.",
      placement: "bottom",
    },
    {
      target: "[data-testid='brand-mix-overview']",
      title: "Baca Brand Mix",
      content: "\u2022 **Donut chart** — proporsi revenue per brand\n\u2022 **Table** — revenue, growth, margin per brand\n\u2022 Klik brand untuk **drill-down** ke detail outlet\n\u2022 **Warna merah** = brand underperforming",
      placement: "bottom",
      variant: "tip",
    },
  ],
};

// ─── Profit Walk ────────────────────────────────────────────────────
const executiveProfitWalkTour = {
  name: "Profit Walk — Analisis Laba",
  description: "Waterfall chart kontribusi tiap komponen ke laba bersih.",
  steps: [
    {
      target: "[data-testid='profit-walk-page']",
      title: "Profit Walk",
      content: "**Waterfall chart** yang menunjukkan bagaimana Revenue dikurangi berbagai komponen biaya menjadi Net Profit. Cocok untuk presentasi ke investor.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='profit-walk-controls']",
      title: "Pilih Periode & Pembanding",
      content: "Pilih periode dan pembanding (bulan lalu atau tahun lalu). Chart menampilkan delta di tiap komponen untuk analisis mendalam.",
      placement: "bottom",
    },
    {
      target: "[data-testid='profit-kpi-cards']",
      title: "KPI Summary",
      content: "KPI cards di atas chart: **Revenue**, **COGS**, **Gross Profit**, dan **Net Profit** dengan persentase perubahan vs pembanding.",
      placement: "bottom",
    },
    {
      target: "[data-testid='profit-walk-page']",
      title: "Interpretasi Profit Walk",
      content: "\u2022 **Bar hijau** — kontribusi positif (revenue)\n\u2022 **Bar merah** — komponen pengurang (biaya)\n\u2022 Klik bar untuk drill-down ke kategori beban",
      placement: "bottom",
      variant: "tip",
    },
  ],
};

// ─── Period Compare ───────────────────────────────────────────────────
const executivePeriodCompareTour = {
  name: "Period Compare — Perbandingan Periode",
  description: "Bandingkan KPI bisnis antar periode secara visual.",
  steps: [
    {
      target: "[data-testid='period-compare-page']",
      title: "Period Compare",
      content: "Bandingkan **KPI bisnis** antar 2 periode: sales, gross profit, COGS, opex, net profit. Berguna untuk evaluasi bulanan/kuartalan.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='period-compare-controls']",
      title: "Pilih Periode",
      content: "Pilih 2 periode untuk dibandingkan. Bisa berupa bulan berbeda, kuartal, atau year-over-year.",
      placement: "bottom",
    },
    {
      target: "[data-testid='period-compare-metrics']",
      title: "Pilih Metrik",
      content: "Centang metrik yang ingin ditampilkan. Bisa pilih **Sales, Gross Profit, Net Profit, COGS, OPEX**, dan lainnya.",
      placement: "bottom",
    },
    {
      target: "[data-testid='period-compare-page']",
      title: "Baca Perbandingan",
      content: "Kolom **Delta** menunjukkan selisih: positif = membaik, negatif = memburuk. Klik baris untuk drill-down ke breakdown per brand/outlet.",
      placement: "top",
      variant: "tip",
    },
  ],
};

export {
  executiveHomeTour,
  executiveAIQATour,
  executiveAnomalyTour,
  executiveBrandMixTour,
  executiveProfitWalkTour,
  executivePeriodCompareTour,
};

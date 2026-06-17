/** Shared / general navigation tour definitions. */

const generalNavigationTour = {
  name: "Navigasi Umum — ERP Portal",
  description: "Kenali komponen UI umum di seluruh sistem.",
  steps: [
    {
      target: "body",
      title: "Selamat datang di Aurora F&B ERP",
      content:
        "Sistem ERP multi-brand untuk Torado Group. Mari kenali komponen UI utama.",
      placement: "center",
      disableBeacon: true,
      variant: "hero",
    },
    {
      target: "[data-testid='logo-home-button']",
      title: "Logo & Home",
      content:
        "Klik **logo** untuk kembali ke landing dashboard portal aktif Anda.",
      placement: "bottom",
    },
    {
      target: "[data-testid='open-global-search']",
      title: "Global Search",
      content:
        "Tekan **⌘K** atau klik di sini untuk cari items, vendors, employees, transaksi (PR/PO/PAY/JAE doc no). Sangat powerful!",
      placement: "bottom",
    },
    {
      target: "[data-testid='help-tour-button']",
      title: "Help & Tour",
      content:
        "Tombol ini — kapan saja butuh panduan, klik di sini untuk mulai tour relevan dengan halaman aktif.",
      placement: "bottom",
      variant: "tip",
    },
  ],
};

// ============================================================
// EXPORT REGISTRY
// ============================================================


export { generalNavigationTour };

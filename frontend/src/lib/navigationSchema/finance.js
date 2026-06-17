/** navigationSchema/finance.js — Finance portal navigation. */

import {
  LayoutDashboard,
  Users,
  Building2,
  Package,
  Settings,
  FileText,
  ScrollText,
  CreditCard,
  Calculator,
  FileCheck,
  Calendar,
  Banknote,
  Receipt,
  TrendingUp,
  Wallet,
  UserCog,
  DollarSign,
  Gift,
  ClipboardList,
  ShoppingCart,
  Truck,
  Store,
  BarChart3,
  Boxes,
  ArrowLeftRight,
  ClipboardCheck,
  WrenchIcon,
  Crown,
  Sparkles,
  Brain,
  MessageSquare,
  Shield,
  Activity,
  Star,
  AlertTriangle,
  Layers,
  BookOpen,
  Archive,
  Target,
  Workflow,
  Coffee,
  ListChecks,
  History,
  BellRing,
  ChevronRight,
  Landmark,
  LineChart,
  PiggyBank,
  QrCode,
  FileSpreadsheet,
  CalendarCheck,
} from "lucide-react";

// eslint-disable-next-line no-unused-vars
export const financeNav = {
  id: "finance",
  name: "Finance Portal",
  sections: [
    {
      id: "overview",
      name: "Overview",
      icon: LayoutDashboard,
      items: [
        { id: "dashboard", name: "Dashboard", path: "/finance" },
        { id: "approval-center-finance", name: "Approval Center", path: "/finance/approvals" },
      ],
    },
    {
      id: "transactions",
      name: "Transactions",
      icon: Receipt,
      items: [
        { id: "validation", name: "Sales Validation", path: "/finance/validation" },
        { id: "journals", name: "Journals", path: "/finance/journals" },
        { id: "manual-je", name: "Manual JE", path: "/finance/manual-journal" },
      ],
    },
    {
      id: "payments",
      name: "Payments",
      icon: CreditCard,
      items: [
        { id: "payment-requests", name: "Payment Requests", path: "/finance/payment-requests" },
        { id: "ap", name: "Accounts Payable", path: "/finance/ap-aging" },
        { id: "payments", name: "Payments", path: "/finance/payments" },
        { id: "payment-runs", name: "Payment Runs", path: "/finance/payment-runs" },
        { id: "payment-run-templates", name: "Run Templates", path: "/finance/payment-run-templates" },
        { id: "bank-recon", name: "Bank Reconciliation", path: "/finance/bank-recon" },
        { id: "ar-invoices", name: "AR Invoices", path: "/finance/ar-invoices" },
        { id: "reservation-deposits", name: "Deposit Reservasi", path: "/finance/reservation-deposits" },
      ],
    },
    {
      id: "reports",
      name: "Reports",
      icon: FileText,
      items: [
        { id: "reports-hub", name: "Reports Hub", path: "/finance/reports" },
        // Trial Balance · P&L · Balance Sheet · Cashflow · Period Compare · Custom Reports
        // · Pivot are in-page TABS of /finance/reports (removed from sidebar to dedupe IA).
      ],
    },
    {
      id: "tax",
      name: "Tax & Compliance",
      icon: FileCheck,
      items: [
        { id: "tax", name: "Tax Center", path: "/finance/tax" },
        { id: "efaktur", name: "e-Faktur", path: "/finance/efaktur" },
        { id: "ebupot", name: "e-Bupot", path: "/finance/ebupot" },
      ],
    },
    {
      id: "assets-budget",
      name: "Assets & Budget",
      icon: Landmark,
      items: [
        { id: "assets", name: "Fixed Assets", path: "/finance/assets" },
        { id: "budget", name: "Budget vs Actual", path: "/finance/budget" },
        { id: "budget-manage", name: "Budget Management", path: "/finance/budget/manage" },
        { id: "forecasting", name: "Forecasting", path: "/finance/forecasting" },
      ],
    },
    {
      id: "period",
      name: "Period Closing",
      icon: Calendar,
      items: [
        { id: "period-closing-hub", name: "Period Closing Workflow", path: "/finance/period-closing", badge: "NEW" },
        { id: "periods", name: "Periods (List)", path: "/finance/periods" },
        { id: "anomalies", name: "Anomaly Feed", path: "/finance/anomalies" },
      ],
    },
    {
      id: "finance-config",
      name: "Finance Config",
      icon: BookOpen,
      items: [
        { id: "coa", name: "Chart of Accounts", path: "/finance/coa" },
        // REMOVED: Vendor Scorecard - duplicate, keep only in Procurement portal
      ],
    },
    // REMOVED: Reservasi section (single-item) - merged into Payments section above
  ],
};

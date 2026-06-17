"""Accounts Payable aging report."""
from __future__ import annotations

from datetime import datetime, timezone
from typing import Optional

from core.db import get_db


async def ap_aging(*, as_of: Optional[str] = None) -> dict:
    """AP Aging report (vendor-level): current, <30, 30-60, 60-90, >90 days."""
    db = get_db()
    if as_of:
        try:
            today = datetime.strptime(as_of, "%Y-%m-%d").date()
        except Exception:  # noqa: BLE001
            today = datetime.now(timezone.utc).date()
    else:
        today = datetime.now(timezone.utc).date()

    bucket_keys = ["current", "d_30", "d_60", "d_90", "d_90p"]
    buckets: dict[str, float] = {k: 0.0 for k in bucket_keys}
    rows: dict[str, dict] = {}
    grand_total = 0.0

    vendor_names: dict[str, str] = {}
    async for v in db.vendors.find({"deleted_at": None}):
        vendor_names[v["id"]] = v.get("name", v["id"])

    async for gr in db.goods_receipts.find({"deleted_at": None}):
        if gr.get("payment_status") == "paid":
            continue
        outstanding = float(gr.get("outstanding") or gr.get("grand_total") or 0)
        if outstanding <= 0:
            continue
        vendor_id = gr.get("vendor_id", "unknown")
        vendor_name = vendor_names.get(vendor_id, vendor_id)
        try:
            due_date_str = gr.get("due_date") or gr.get("receive_date")
            due_date = datetime.strptime(due_date_str, "%Y-%m-%d").date() if due_date_str else today
        except Exception:  # noqa: BLE001
            due_date = today
        days_overdue = (today - due_date).days
        if days_overdue <= 0:
            b_key = "current"
        elif days_overdue <= 30:
            b_key = "d_30"
        elif days_overdue <= 60:
            b_key = "d_60"
        elif days_overdue <= 90:
            b_key = "d_90"
        else:
            b_key = "d_90p"
        buckets[b_key] = round(buckets[b_key] + outstanding, 2)
        grand_total += outstanding
        item_entry = {"gr_id": gr["id"], "gr_no": gr.get("gr_number"), "receive_date": gr.get("receive_date"), "due_date": due_date_str, "outstanding": outstanding, "days_overdue": days_overdue, "bucket": b_key}
        if vendor_id not in rows:
            rows[vendor_id] = {"vendor_id": vendor_id, "vendor_name": vendor_name, "total": 0.0, "current": 0.0, "d_30": 0.0, "d_60": 0.0, "d_90": 0.0, "d_90p": 0.0, "items": []}
        rows[vendor_id]["total"] = round(rows[vendor_id]["total"] + outstanding, 2)
        rows[vendor_id][b_key] = round(rows[vendor_id][b_key] + outstanding, 2)
        rows[vendor_id]["items"].append(item_entry)

    return {
        "as_of": str(today),
        "grand_total": round(grand_total, 2),
        "buckets": {k: round(v, 2) for k, v in buckets.items()},
        "rows": sorted(rows.values(), key=lambda r: -r["total"]),
        "vendor_count": len(rows),
    }

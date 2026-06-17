"""AR payment reminders (Telegram / email)."""
from __future__ import annotations

import logging
from datetime import datetime, timezone

from core.db import get_db, serialize

logger = logging.getLogger("aurora.ar")


async def send_reminder(invoice_id: str, channel: str, *, user_id: str) -> dict:
    """Send payment reminder via Telegram or Email."""
    db = get_db()
    invoice = await db.ar_invoices.find_one({"id": invoice_id, "deleted_at": None})
    if not invoice:
        raise ValueError("Invoice not found")

    inv = serialize(invoice)
    msg = (
        f"\U0001f4cb *PENGINGAT PEMBAYARAN*\n"
        f"Invoice: {inv['invoice_no']}\n"
        f"Customer: {inv['customer_name']}\n"
        f"Total: Rp {inv['total_amount']:,.0f}\n"
        f"Outstanding: Rp {inv['outstanding']:,.0f}\n"
        f"Jatuh Tempo: {inv['due_date']}\n"
        f"Status: {inv['status'].upper()}"
    )

    result = {"channel": channel, "sent": False, "message": msg}

    if channel == "telegram":
        try:
            from services.telegram_service import send_message
            await send_message(msg)
            result["sent"] = True
        except Exception as e:
            result["error"] = str(e)
    elif channel == "email":
        try:
            from services.email_service import send_simple_email
            customer = await db.ar_customers.find_one({"id": inv.get("customer_id")}) if inv.get("customer_id") else None
            to_email = (customer or {}).get("email") or ""
            if to_email:
                await send_simple_email(
                    to=to_email,
                    subject=f"Pengingat Pembayaran Invoice {inv['invoice_no']}",
                    body=msg.replace("*", ""),
                )
                result["sent"] = True
            else:
                result["error"] = "Customer email not set"
        except Exception as e:
            result["error"] = str(e)

    now = datetime.now(timezone.utc).isoformat()
    await db.ar_invoices.update_one(
        {"id": invoice_id},
        {"$inc": {"reminders_sent": 1}, "$set": {"last_reminder_at": now, "updated_at": now}}
    )
    return result

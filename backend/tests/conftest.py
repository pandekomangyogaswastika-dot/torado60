"""Shared fixtures for backend integration tests.

These tests hit the running backend at http://localhost:8001/api/* and use the
seeded demo data (admin@torado.id / Torado@2026 + 8 role users).

IMPORTANT: Tests are READ-MOSTLY. Any data they CREATE uses unique IDs derived
from the test timestamp so they do not collide with seeded data or each other.
They rely on soft-delete + idempotent operations to avoid polluting the DB.
"""
import os
import time
import uuid
from typing import Optional

import httpx
import pytest

BASE_URL = os.environ.get("TEST_BACKEND_URL", "http://localhost:8001")
API = f"{BASE_URL}/api"

# Demo credentials seeded by seed_demo.py
DEMO_PASSWORD = "Torado@2026"
DEMO_USERS = {
    "admin":       "admin@torado.id",
    "executive":   "executive@torado.id",
    "finance":     "finance@torado.id",
    "procurement": "procurement@torado.id",
    "alt_manager": "alt.manager@torado.id",
    "dls_manager": "dls.manager@torado.id",
    "cal_manager": "cal.manager@torado.id",
    "rkp_manager": "rkp.manager@torado.id",
    "bkk_manager": "bkk.manager@torado.id",
}

# Owner user is seeded separately by seed_phase11_demo (we try it but tolerate absence)
DEMO_USERS_OPTIONAL = {
    "owner": "owner@torado.id",
}


def _login(client: httpx.Client, email: str, password: str = DEMO_PASSWORD) -> Optional[str]:
    r = client.post(f"{API}/auth/login", json={"email": email, "password": password})
    if r.status_code != 200:
        return None
    payload = r.json()
    if not payload.get("success"):
        return None
    return (payload.get("data") or {}).get("access_token")


@pytest.fixture(scope="session")
def http_client():
    with httpx.Client(timeout=30.0, base_url=API) as c:
        yield c


@pytest.fixture(scope="session")
def tokens(http_client):
    """Login as every demo user once; return dict role_key -> token."""
    out: dict[str, str] = {}
    for key, email in DEMO_USERS.items():
        tok = _login(http_client, email)
        if tok:
            out[key] = tok
    for key, email in DEMO_USERS_OPTIONAL.items():
        tok = _login(http_client, email)
        if tok:
            out[key] = tok
    # admin token is mandatory for most tests
    assert "admin" in out, "FATAL: admin@torado.id could not log in. Did you seed?"
    return out


@pytest.fixture(scope="session")
def admin_token(tokens):
    return tokens["admin"]


@pytest.fixture(scope="session")
def finance_token(tokens):
    return tokens.get("finance")


@pytest.fixture(scope="session")
def procurement_token(tokens):
    return tokens.get("procurement")


@pytest.fixture(scope="session")
def alt_token(tokens):
    return tokens.get("alt_manager")


def _auth_headers(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def auth_headers():
    """Helper factory: pass a token, get {Authorization: Bearer <tok>} dict."""
    return _auth_headers


@pytest.fixture(scope="session")
def seeded_outlets(http_client, admin_token):
    r = http_client.get("/master/outlets", headers=_auth_headers(admin_token))
    if r.status_code != 200:
        return []
    data = r.json().get("data") or []
    return data


@pytest.fixture(scope="session")
def seeded_items(http_client, admin_token):
    r = http_client.get("/master/items", headers=_auth_headers(admin_token))
    if r.status_code != 200:
        return []
    return r.json().get("data") or []


@pytest.fixture(scope="session")
def seeded_vendors(http_client, admin_token):
    r = http_client.get("/master/vendors", headers=_auth_headers(admin_token))
    if r.status_code != 200:
        return []
    return r.json().get("data") or []


@pytest.fixture(scope="session")
def seeded_coa(http_client, admin_token):
    r = http_client.get("/finance/chart-of-accounts", headers=_auth_headers(admin_token))
    if r.status_code != 200:
        return []
    return r.json().get("data") or []


@pytest.fixture
def unique_suffix():
    """Returns a short unique string for test entity codes/names so tests don't collide."""
    return f"{int(time.time())}-{uuid.uuid4().hex[:6]}"


# ----- ergonomic helpers -----
def api_get(client: httpx.Client, path: str, token: str | None = None, **kwargs):
    headers = kwargs.pop("headers", {}) or {}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return client.get(path, headers=headers, **kwargs)


def api_post(client: httpx.Client, path: str, token: str | None = None, **kwargs):
    headers = kwargs.pop("headers", {}) or {}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return client.post(path, headers=headers, **kwargs)


# Re-export helpers under the tests namespace
pytest.api_get = api_get
pytest.api_post = api_post

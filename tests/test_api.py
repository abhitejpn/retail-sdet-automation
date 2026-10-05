import requests

API = "http://127.0.0.1:5000"


def test_get_products_returns_success():
    r = requests.get(f"{API}/api/products")
    assert r.status_code == 200
    assert isinstance(r.json(), list)


def test_product_schema_contains_required_fields():
    product = requests.get(f"{API}/api/products").json()[0]
    assert {"id", "name", "price", "category"} <= product.keys()


def test_user_login_returns_user_role():
    r = requests.post(f"{API}/api/login", json={"username": "user", "password": "user123"})
    assert r.status_code == 200
    assert r.json()["role"] == "user"


def test_admin_login_returns_admin_role():
    r = requests.post(f"{API}/api/login", json={"username": "admin", "password": "admin123"})
    assert r.status_code == 200
    assert r.json()["role"] == "admin"


def test_invalid_login_is_rejected():
    r = requests.post(f"{API}/api/login", json={"username": "admin", "password": "wrong"})
    assert r.status_code == 401


def test_user_cannot_create_product():
    r = requests.post(f"{API}/api/products", headers={"X-Role": "user"}, json={"name": "Blocked Product", "price": 100, "category": "Test"})
    assert r.status_code == 403


def test_admin_can_create_product():
    r = requests.post(f"{API}/api/products", headers={"X-Role": "admin"}, json={"name": "Automation Test Product", "price": 999, "category": "Test"})
    assert r.status_code == 201
    assert r.json()["name"] == "Automation Test Product"


def test_create_product_requires_required_fields():
    r = requests.post(f"{API}/api/products", headers={"X-Role": "admin"}, json={"name": "Test Product"})
    assert r.status_code == 400


def test_unknown_product_returns_404():
    r = requests.get(f"{API}/api/products/9999")
    assert r.status_code == 404
    assert r.json()["error"] == "Product not found"


def test_health_endpoint():
    r = requests.get(f"{API}/api/health")
    assert r.status_code == 200
    assert r.json()["status"] == "healthy"

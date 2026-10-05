from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

PRODUCTS = [
    {"id": 1, "name": "Wireless Mouse", "price": 799, "category": "Accessories", "icon": "🖱️", "description": "Comfortable wireless mouse for work and study."},
    {"id": 2, "name": "Mechanical Keyboard", "price": 2499, "category": "Accessories", "icon": "⌨️", "description": "Tactile mechanical keyboard for productive typing."},
    {"id": 3, "name": "USB-C Hub", "price": 1499, "category": "Electronics", "icon": "🔌", "description": "Multi-port USB-C hub for laptops and tablets."},
    {"id": 4, "name": "Laptop Stand", "price": 1299, "category": "Accessories", "icon": "💻", "description": "Adjustable stand for a better desk setup."},
    {"id": 5, "name": "Wireless Headphones", "price": 2999, "category": "Audio", "icon": "🎧", "description": "Wireless headphones for calls, music and travel."},
    {"id": 6, "name": "Webcam", "price": 1899, "category": "Electronics", "icon": "📷", "description": "Full HD webcam for meetings and streaming."},
]

USERS = {
    "admin": {"password": "admin123", "role": "admin", "name": "RetailHub Admin"},
    "user": {"password": "user123", "role": "user", "name": "Demo Customer"},
}


def require_admin():
    return request.headers.get("X-Role", "").lower() == "admin"


@app.post("/api/login")
def login():
    data = request.get_json(silent=True) or {}
    username = str(data.get("username", "")).strip().lower()
    password = str(data.get("password", ""))
    account = USERS.get(username)
    if not account or account["password"] != password:
        return jsonify({"error": "Invalid username or password"}), 401
    return jsonify({"username": username, "role": account["role"], "name": account["name"]})


@app.get("/api/products")
def products():
    q = request.args.get("q", "").strip().lower()
    category = request.args.get("category", "").strip().lower()
    result = PRODUCTS
    if q:
        result = [p for p in result if q in p["name"].lower() or q in p.get("description", "").lower()]
    if category and category != "all":
        result = [p for p in result if p["category"].lower() == category]
    return jsonify(result)


@app.get("/api/products/<int:product_id>")
def product(product_id):
    item = next((p for p in PRODUCTS if p["id"] == product_id), None)
    if item is None:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(item)


@app.post("/api/products")
def create_product():
    if not require_admin():
        return jsonify({"error": "Admin role required"}), 403
    data = request.get_json(silent=True) or {}
    required = ["name", "price", "category"]
    if not all(str(data.get(x, "")).strip() for x in required):
        return jsonify({"error": "name, price and category are required"}), 400
    try:
        price = float(data["price"])
    except (TypeError, ValueError):
        return jsonify({"error": "price must be a number"}), 400
    if price < 0:
        return jsonify({"error": "price cannot be negative"}), 400
    new_id = max(p["id"] for p in PRODUCTS) + 1 if PRODUCTS else 1
    item = {
        "id": new_id,
        "name": str(data["name"]).strip(),
        "price": price,
        "category": str(data["category"]).strip(),
        "icon": str(data.get("icon") or "🛍️").strip(),
        "description": str(data.get("description") or "New product added by admin.").strip(),
    }
    PRODUCTS.append(item)
    return jsonify(item), 201


@app.delete("/api/products/<int:product_id>")
def delete_product(product_id):
    if not require_admin():
        return jsonify({"error": "Admin role required"}), 403
    index = next((i for i, p in enumerate(PRODUCTS) if p["id"] == product_id), None)
    if index is None:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(PRODUCTS.pop(index))


@app.get("/api/health")
def health():
    return jsonify({"status": "healthy", "service": "retail-api"})


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)

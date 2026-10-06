
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime

app = Flask(__name__)
CORS(app)

DATABASE = "orders.db"


def init_db():
    conn = sqlite3.connect(DATABASE)

    conn.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL,
            items TEXT NOT NULL,
            total REAL NOT NULL,
            status TEXT DEFAULT 'pending',
            created_at TEXT NOT NULL
        )
    """)

    conn.commit()
    conn.close()


@app.route("/")
def home():
    return jsonify({
        "message": "Welcome to Spaceship Wears API",
        "status": "running"
    })


@app.route("/api/orders", methods=["POST"])
def create_order():
    data = request.get_json(silent=True) or {}

    required = [
        "customer_name",
        "email",
        "phone",
        "address",
        "items",
        "total"
    ]

    for field in required:
        if not data.get(field):
            return jsonify({
                "error": f"{field} is required"
            }), 400

    try:
        total = float(data["total"])

        if total <= 0:
            return jsonify({"error": "Invalid total"}), 400

    except (ValueError, TypeError):
        return jsonify({"error": "Invalid total"}), 400

    conn = sqlite3.connect(DATABASE)

    cursor = conn.execute("""
        INSERT INTO orders
        (customer_name, email, phone, address, items, total, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        data["customer_name"],
        data["email"],
        data["phone"],
        data["address"],
        str(data["items"]),
        total,
        datetime.now().isoformat()
    ))

    order_id = cursor.lastrowid

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Order received successfully",
        "order_id": order_id,
        "status": "pending"
    }), 201


@app.route("/api/orders", methods=["GET"])
def get_orders():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    rows = conn.execute(
        "SELECT * FROM orders ORDER BY id DESC"
    ).fetchall()

    orders = [dict(row) for row in rows]

    conn.close()

    return jsonify(orders)


if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=5000, debug=True)

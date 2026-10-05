# RetailHub — SDET Automation Project

A full-stack retail application built as an **SDET portfolio project** to demonstrate UI automation, REST API testing, functional testing, regression testing, and role-based application testing.

The application uses a **React frontend**, **Flask REST API backend**, **Pytest**, and **Playwright**.

## 🚀 Project Overview

RetailHub is a demo e-commerce application with separate **User** and **Admin** workflows.

### User capabilities

- User login
- Browse products
- Search products
- Filter products by category
- Add products to cart
- Manage the shopping flow

### Admin capabilities

- Admin login
- Access Admin Dashboard
- Add products
- Delete products
- Manage the product catalog

The project is designed to provide realistic end-to-end scenarios for software testing and automation.

---

## 🏗️ Application Architecture

```text
                    ┌──────────────────────┐
                    │     React Frontend   │
                    │      Vite + React    │
                    │                      │
                    │ Landing Page         │
                    │ User Login           │
                    │ Admin Dashboard      │
                    │ Product Catalog      │
                    │ Shopping Cart        │
                    └──────────┬───────────┘
                               │
                         REST API Calls
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Flask Backend     │
                    │      REST API        │
                    │                      │
                    │ Authentication       │
                    │ Product Management   │
                    │ Product APIs         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Automated Tests    │
                    │                      │
                    │ Pytest               │
                    │ Playwright           │
                    │ API Testing          │
                    │ UI Testing           │
                    └──────────────────────┘
```

---

## 🛠️ Technologies Used

### Frontend
- React
- Vite
- JavaScript
- HTML
- CSS

### Backend
- Python
- Flask
- REST API

### Testing
- Pytest
- Playwright
- Requests
- Chromium

### Development Tools
- Git
- GitHub
- VS Code
- Python Virtual Environment
- npm

---

## 👥 Demo Roles

### User

```text
Username: user
Password: user123
```

### Admin

```text
Username: admin
Password: admin123
```

> These credentials are for the local demo application only.

---

## 📁 Project Structure

```text
retail_sdet_react/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   └── server.py
│   ├── .venv/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── pages/
│   └── retail_page.py
│
├── tests/
│   ├── test_api.py
│   └── test_ui.py
│
├── conftest.py
├── pytest.ini
└── README.md
```

---

# ▶️ Running the Application

## 1. Start the Flask Backend

Open a terminal in the `backend` directory:

```powershell
cd backend
```

Start the backend:

```powershell
.\.venv\Scripts\python.exe -m app.server
```

Backend:

```text
http://127.0.0.1:5000
```

Keep this terminal running.

---

## 2. Start the React Frontend

Open a second terminal:

```powershell
cd frontend
```

If Node.js is not available in the current PowerShell session:

```powershell
$env:Path += ";C:\Program Files\nodejs"
```

Install dependencies if required:

```powershell
& "C:\Program Files\nodejs\npm.cmd" install
```

Start the frontend:

```powershell
& "C:\Program Files\nodejs\npm.cmd" run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🧪 Automated Testing

The project contains both **API tests** and **UI tests**.

## API Testing

API tests validate backend functionality such as:

- Health endpoint
- Product retrieval
- Product creation
- Product data validation
- Product deletion
- API responses

## UI Testing

Playwright tests validate application behavior such as:

- Landing/catalog page loading
- Product search
- Category filtering
- Product interaction
- Cart behavior
- User-facing workflows

---

## Running Tests

Activate the backend virtual environment or use its Python executable.

From the project root:

```powershell
pytest -v
```

For Playwright tests:

```powershell
pytest tests/test_ui.py -v
```

For API tests:

```powershell
pytest tests/test_api.py -v
```

---

# 🔍 Example End-to-End Test Flow

A typical automated scenario can validate:

```text
Landing Page
      ↓
User Login
      ↓
Product Catalog
      ↓
Search Product
      ↓
Filter Category
      ↓
Add Product to Cart
      ↓
Verify Cart
```

An Admin scenario:

```text
Admin Login
      ↓
Admin Dashboard
      ↓
Add Product
      ↓
Verify Product
      ↓
Delete Product
      ↓
Verify Product Removal
```

---

# 🔐 Role-Based Testing

The application provides separate workflows for Admin and User roles.

Example negative test scenarios:

- Invalid login credentials
- User attempting to access Admin functionality
- Missing required product fields
- Invalid product data
- Product not found
- Empty search results

These scenarios help demonstrate both **positive and negative testing**.

---

# 🎯 SDET Skills Demonstrated

This project demonstrates practical experience with:

- UI automation
- REST API testing
- Functional testing
- End-to-end testing
- Regression testing
- Positive and negative test scenarios
- Role-based testing
- Test automation using Python
- Playwright browser automation
- Pytest test framework
- REST API validation
- Debugging application behavior
- Git and GitHub
- React application testing
- Backend/API integration testing

---

# 📌 Portfolio Purpose

This project was created to demonstrate practical **Software Development Engineer in Test (SDET)** skills through a full-stack application and automated test suite.

It focuses on building reliable automated tests around realistic user and administrator workflows rather than only testing isolated functions.

---

# 👨‍💻 Author

**Abhitej P N**

MCA Graduate | Python | REST APIs | Automation Testing | Playwright | Pytest

GitHub:  
https://github.com/abhitejpn

---

## 📄 License

This project is intended for educational and portfolio purposes.
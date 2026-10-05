# RetailHub — React + Flask SDET Portfolio Project

A full-stack retail demo application designed for Software Quality Engineering / SDET practice.

## Roles

### User
- Browse products
- Search and filter products
- Add products to cart

Demo user: `user` / `user123`

### Admin
- Login to admin console
- Add products
- Delete products
- View current catalog

Demo admin: `admin` / `admin123`

## Architecture

React UI (Vite) → Flask REST API → In-memory product data

## Run backend

```bash
cd backend
python -m pip install -r requirements.txt
python -m app.server
```

API: http://127.0.0.1:5000

## Run frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

UI: http://localhost:5173

## Run tests

With both servers running:

```bash
pytest -v
```

## Portfolio / SDET coverage

- React landing page and product catalog
- User and admin role flows
- Flask REST API
- API authorization checks
- Product creation and deletion
- Python + pytest
- Playwright browser automation
- Page Object Model
- Positive and negative test cases
- End-to-end user journey
- Regression-ready automated suite

> Note: authentication is intentionally simplified for portfolio/testing practice. It is not production-grade authentication.

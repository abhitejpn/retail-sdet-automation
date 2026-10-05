import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Search, ShoppingCart, Check, Package, ShieldCheck, Zap, ArrowRight, LogIn, Plus, Trash2, LogOut, LayoutDashboard, Store } from "lucide-react";
import "./styles.css";

const API = "http://127.0.0.1:5000";

function App() {
  const [page, setPage] = useState("home");
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [added, setAdded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [adminForm, setAdminForm] = useState({ name: "", price: "", category: "Electronics", icon: "🛍️", description: "" });
  const [adminMessage, setAdminMessage] = useState("");

  async function loadProducts() {
    setLoading(true);
    try {
      const response = await fetch(`${API}/api/products`);
      setProducts(await response.json());
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadProducts(); }, []);

  const categories = ["all", ...new Set(products.map(p => p.category))];
  const filtered = useMemo(() => products.filter(p => {
    const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) || (p.description || "").toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesQuery && matchesCategory;
  }), [products, query, category]);

  function addToCart(product) {
    setCart([...cart, product]);
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1200);
  }

  async function login(e) {
    e.preventDefault();
    setLoginError("");
    try {
      const response = await fetch(`${API}/api/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(loginForm) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");
      setUser(data);
      setLoginForm({ username: "", password: "" });
      setPage(data.role === "admin" ? "admin" : "products");
    } catch (error) { setLoginError(error.message); }
  }

  function logout() { setUser(null); setPage("home"); }

  async function addProduct(e) {
    e.preventDefault();
    setAdminMessage("");
    try {
      const response = await fetch(`${API}/api/products`, { method: "POST", headers: { "Content-Type": "application/json", "X-Role": user?.role || "" }, body: JSON.stringify({ ...adminForm, price: Number(adminForm.price) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to add product");
      setAdminMessage(`Product "${data.name}" added successfully.`);
      setAdminForm({ name: "", price: "", category: "Electronics", icon: "🛍️", description: "" });
      await loadProducts();
    } catch (error) { setAdminMessage(error.message); }
  }

  async function deleteProduct(id) {
    const response = await fetch(`${API}/api/products/${id}`, { method: "DELETE", headers: { "X-Role": user?.role || "" } });
    if (response.ok) await loadProducts();
  }

  return (
    <div className="app">
      <header className="header">
        <button className="brand brand-button" onClick={() => setPage("home")} aria-label="Go to home">
          <div className="brand-mark">R</div><div><div className="brand-name">RetailHub</div><div className="brand-subtitle">SDET Demo Store</div></div>
        </button>
        <nav className="nav">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("products")}>Products</button>
          {user?.role === "admin" && <button onClick={() => setPage("admin")}><LayoutDashboard size={15}/> Admin</button>}
        </nav>
        <div className="header-actions">
          <div className="cart" aria-label="Shopping cart"><ShoppingCart size={19}/><span>Cart</span><b id="cart-count">{cart.length}</b></div>
          {user ? <button className="user-chip" onClick={logout}><span>{user.name}</span><LogOut size={15}/></button> : <button className="login-link" onClick={() => setPage("login")}><LogIn size={16}/> Login</button>}
        </div>
      </header>

      {page === "home" && (
        <main>
          <section className="landing-hero">
            <div className="landing-copy">
              <p className="eyebrow">SMART RETAIL · QUALITY ENGINEERING</p>
              <h1>Shop simply.<br/><span>Test everything.</span></h1>
              <p>RetailHub is a modern demo commerce platform built for realistic UI, API and end-to-end automation testing.</p>
              <div className="landing-actions"><button className="primary-button" onClick={() => setPage("products")}>Shop products <ArrowRight size={17}/></button><button className="secondary-button" onClick={() => setPage("login")}>Sign in</button></div>
              <div className="trust-row"><span><ShieldCheck size={16}/> Role-based access</span><span><Zap size={16}/> API powered</span><span><Check size={16}/> Automation ready</span></div>
            </div>
            <div className="landing-panel"><div className="panel-icon"><Store size={30}/></div><h3>Built for SDET practice</h3><p>React UI · Flask REST API · Pytest · Playwright</p><div className="mini-stats"><div><strong>{products.length}</strong><small>Products</small></div><div><strong>2</strong><small>Roles</small></div><div><strong>API</strong><small>Backend</small></div></div></div>
          </section>
          <section className="feature-strip"><div><Package size={21}/><strong>Product catalog</strong><span>Search and filter products</span></div><div><ShieldCheck size={21}/><strong>Admin controls</strong><span>Add and manage products</span></div><div><Zap size={21}/><strong>Test-ready</strong><span>Automate key user journeys</span></div></section>
        </main>
      )}

      {page === "login" && (
        <main className="center-page"><form className="login-card" onSubmit={login}><div className="login-icon"><LogIn size={24}/></div><p className="eyebrow">RETAILHUB ACCOUNT</p><h1>Welcome back</h1><p className="muted">Sign in as a customer or administrator.</p><label>Username<input aria-label="Username" value={loginForm.username} onChange={e => setLoginForm({...loginForm, username: e.target.value})} required/></label><label>Password<input aria-label="Password" type="password" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} required/></label>{loginError && <div className="error">{loginError}</div>}<button className="primary-button full" type="submit">Login <ArrowRight size={17}/></button><div className="demo-credentials"><strong>Demo accounts</strong><span>User: <b>user</b> / <b>user123</b></span><span>Admin: <b>admin</b> / <b>admin123</b></span></div></form></main>
      )}

      {page === "products" && (
        <main><section className="catalog-hero"><p className="eyebrow">QUALITY ENGINEERING LAB</p><h1>Product catalog</h1><p>Browse, search and add products to your cart.</p></section><section className="toolbar"><div className="search-box"><Search size={19}/><input aria-label="Search products" placeholder="Search products..." value={query} onChange={e => setQuery(e.target.value)}/></div><div className="categories">{categories.map(c => <button key={c} className={category === c ? "category active" : "category"} onClick={() => setCategory(c)}>{c === "all" ? "All products" : c}</button>)}</div></section><section className="section-heading"><div><h2>Featured products</h2><p>{filtered.length} products available</p></div><div className="quality-badge"><Zap size={16}/> Automation ready</div></section>{loading ? <div className="empty">Loading products...</div> : filtered.length === 0 ? <div className="empty" id="empty"><Package size={40}/><h3>No products found</h3><p>Try another search or category.</p></div> : <div className="grid">{filtered.map(product => <article className="product-card" data-product-id={product.id} key={product.id}><div className="product-image">{product.icon}</div><div className="product-category">{product.category}</div><h3>{product.name}</h3><p className="product-description">{product.description}</p><div className="card-bottom"><strong>₹{Number(product.price).toLocaleString("en-IN")}</strong><button className="add" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to cart`}>{added === product.id ? <><Check size={17}/> Added</> : <>Add to cart</>}</button></div></article>)}</div>}</main>
      )}

      {page === "admin" && user?.role === "admin" && (
        <main className="admin-page"><section className="admin-hero"><div><p className="eyebrow">ADMIN CONSOLE</p><h1>Manage your catalog</h1><p>Add products to the store and maintain the demo inventory.</p></div><div className="admin-badge"><ShieldCheck size={18}/> Admin access</div></section><div className="admin-layout"><form className="admin-card" onSubmit={addProduct}><div className="card-title"><Plus size={19}/><div><h2>Add product</h2><p>New products become visible to users immediately.</p></div></div><label>Product name<input aria-label="Product name" value={adminForm.name} onChange={e => setAdminForm({...adminForm, name: e.target.value})} required/></label><div className="form-row"><label>Price (₹)<input aria-label="Price" type="number" min="0" value={adminForm.price} onChange={e => setAdminForm({...adminForm, price: e.target.value})} required/></label><label>Category<select aria-label="Category" value={adminForm.category} onChange={e => setAdminForm({...adminForm, category: e.target.value})}><option>Electronics</option><option>Accessories</option><option>Audio</option><option>Home</option><option>Clothing</option></select></label></div><div className="form-row"><label>Icon<input aria-label="Icon" value={adminForm.icon} onChange={e => setAdminForm({...adminForm, icon: e.target.value})}/></label><label>Description<input aria-label="Description" value={adminForm.description} onChange={e => setAdminForm({...adminForm, description: e.target.value})}/></label></div>{adminMessage && <div className={adminMessage.includes("successfully") ? "success" : "error"}>{adminMessage}</div>}<button className="primary-button full" type="submit"><Plus size={17}/> Add product</button></form><section className="admin-card"><div className="card-title"><Package size={19}/><div><h2>Current products</h2><p>{products.length} products in the catalog.</p></div></div><div className="admin-products">{products.map(p => <div className="admin-product" key={p.id}><span className="admin-product-icon">{p.icon}</span><div><strong>{p.name}</strong><small>{p.category} · ₹{Number(p.price).toLocaleString("en-IN")}</small></div><button className="delete" onClick={() => deleteProduct(p.id)} aria-label={`Delete ${p.name}`}><Trash2 size={16}/></button></div>)}</div></section></div></main>
      )}

      <footer><span>RetailHub SDET Demo</span><span>React UI · Flask REST API · Playwright Tests</span></footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

/* Buoy × Vesper Commerce — 1-hour delivery mockup interactions */

// ---------- Product catalog (homepage grid) ----------
const PRODUCTS = [
  { line:"Hydration", name:"Ocean Electrolyte Drops", img:"assets/energy-duo.png",  cal:0, protein:"72 servings", sugar:"0g", price:"$29.00", status:"Best seller", rating:"4.8 · 3,142" },
  { line:"Energy",    name:"Energy Duo", img:"assets/energy-duo.png",               cal:0, protein:"3 bottles + pouch", sugar:"0g", price:"$167.00", status:"Bundle", rating:"4.7 · 412" },
  { line:"Defense",   name:"Defense Duo", img:"assets/defense-duo.png",             cal:0, protein:"3 bottles + mist", sugar:"0g", price:"$91.00", status:"", rating:"4.6 · 286" },
  { line:"Brain",     name:"Brain Health Duo", img:"assets/brain-duo.png",          cal:0, protein:"3 bottles + pouch", sugar:"0g", price:"$133.00", status:"", rating:"4.6 · 198" },
  { line:"Digestion", name:"Digestion Duo", img:"assets/brain-duo.png",             cal:0, protein:"3 bottles + pouch", sugar:"0g", price:"$133.00", status:"", rating:"4.5 · 174" },
  { line:"Magnesium", name:"Magnesium Travel Packs", img:"assets/mag-packs.png",    cal:0, protein:"5 single servings", sugar:"0g", price:"$16.43", status:"Travel", rating:"4.7 · 521" },
  { line:"Reds",      name:"Rainforest Reds Travel Packs", img:"assets/reds-packs.png", cal:0, protein:"5 single servings", sugar:"0g", price:"$22.77", status:"New", rating:"4.6 · 143" },
  { line:"Defense",   name:"Rainforest Defense Mist", img:"assets/defense-duo.png", cal:0, protein:"2 fl oz", sugar:"0g", price:"$46.00", status:"", rating:"4.5 · 96" },
];

function cardHTML(p) {
  const lineClass = p.line.toLowerCase() === "bronze" ? "bronze" : (p.line.toLowerCase()==="cod" ? "gold" : "gold");
  const statusTag = p.status ? `<span class="tag status">${p.status}</span>` : "";
  return `
  <a class="card" href="product.html">
    <div class="thumb">
      <div class="badges">
        <span class="tag line ${lineClass}"><span class="dot"></span> ${p.line}</span>
        ${statusTag}
        <span class="tag onehr">⚡ 1-hr</span>
      </div>
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
    </div>
    <div class="body">
      <div class="line-label">${p.line}</div>
      <h3>${p.name}</h3>
      <div class="stats"><span><b>${p.cal}</b> cal</span><span><b>${p.protein}</b> protein</span><span><b>${p.sugar}</b> sugar</span></div>
      <div class="rating">★ ${p.rating} reviews</div>
      <div class="foot">
        <span class="price">${p.price}</span>
        <button class="add" onclick="event.preventDefault();addToCart()">Add</button>
      </div>
    </div>
  </a>`;
}

// ---------- On-demand catalog (Buoy Now page) ----------
const NOW_PRODUCTS = [
  { line:"Hydration", format:"Single bottle", name:"Ocean Electrolyte Drops", img:"assets/energy-duo.png",   size:"1.6 fl oz", protein:"72 servings", price:"$29.00" },
  { line:"Magnesium", format:"Travel 5-pack", name:"Magnesium Travel Packs", img:"assets/mag-packs.png",     size:"5 × single", protein:"5 servings", price:"$16.43" },
  { line:"Reds",      format:"Travel 5-pack", name:"Rainforest Reds Travel Packs", img:"assets/reds-packs.png", size:"5 × single", protein:"5 servings", price:"$22.77" },
  { line:"Magnesium", format:"Single serve",  name:"Magnesium Single", img:"assets/mag-packs.png",           size:"1 packet",  protein:"1 serving",  price:"$3.99" },
  { line:"Reds",      format:"Single serve",  name:"Rainforest Reds Single", img:"assets/reds-packs.png",    size:"1 packet",  protein:"1 serving",  price:"$4.99" },
  { line:"Defense",   format:"Single bottle", name:"Rainforest Defense Mist", img:"assets/defense-duo.png",  size:"2 fl oz",   protein:"Travel size", price:"$21.00" },
  { line:"Brain",     format:"Single bottle", name:"Brain Health Drops", img:"assets/brain-duo.png",         size:"1.6 fl oz", protein:"72 servings", price:"$39.00" },
  { line:"Energy",    format:"Single bottle", name:"Energy Drops", img:"assets/energy-duo.png",              size:"1.6 fl oz", protein:"72 servings", price:"$39.00" },
];

function nowCardHTML(p) {
  const lineClass = p.line.toLowerCase() === "bronze" ? "bronze" : "gold";
  return `
  <div class="now-card">
    <div class="now-thumb">
      <button class="now-add" onclick="addToCart()" aria-label="Add ${p.name}">Add</button>
      <span class="now-protein">${p.protein}<small>protein</small></span>
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
    </div>
    <div class="now-body">
      <div class="now-format"><span class="tag line ${lineClass}"><span class="dot"></span> ${p.line}</span> · ${p.format}</div>
      <h3>${p.name}</h3>
      <div class="now-foot"><span class="now-size">${p.size}</span><span class="now-price">${p.price}</span></div>
    </div>
  </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("prodGrid");
  if (grid) grid.innerHTML = PRODUCTS.map(cardHTML).join("");
  const nowGrid = document.getElementById("nowGrid");
  if (nowGrid) nowGrid.innerHTML = NOW_PRODUCTS.map(nowCardHTML).join("");
  // restore cart count
  const c = sessionStorage.getItem("cartCount");
  if (c) setCartCount(parseInt(c, 10));
});

// Buoy Now address check -> reveal grid
function nowCheck() {
  const el = document.getElementById("nowAddrState");
  const grid = document.getElementById("nowGridWrap");
  if (el) el.classList.add("show");
  if (grid) grid.classList.add("show");
}

// ---------- Cart ----------
function setCartCount(n) {
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = n);
  sessionStorage.setItem("cartCount", n);
}
function addToCart() {
  const el = document.querySelector(".cart-count");
  const n = (el ? parseInt(el.textContent, 10) : 0) + 1;
  setCartCount(n);
  toast("Added to cart · eligible for 1-hour delivery ⚡");
}

// ---------- Homepage address availability ----------
function checkAvailability() {
  const box = document.getElementById("availResult");
  if (box) box.classList.add("show");
}

// ---------- PDP: purchase modes ----------
function setMode(mode) {
  document.querySelectorAll(".buy-mode").forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
  const isOneHr = mode === "onehr";
  const mod = document.getElementById("onehrModule");
  const stdBenefits = document.getElementById("stdBenefits");
  const stdBuyRow = document.getElementById("stdBuyRow");
  if (mod) mod.style.display = isOneHr ? "block" : "none";
  if (stdBenefits) stdBenefits.style.display = isOneHr ? "none" : "grid";
  if (stdBuyRow) stdBuyRow.style.display = isOneHr ? "none" : "flex";
  const addBtn = document.getElementById("addBtn");
  if (addBtn && !isOneHr) {
    addBtn.textContent = mode === "subscribe" ? "Subscribe — $35.10" : "Add to cart — $39.00";
  }
}
function pdpCheck() {
  const a = document.getElementById("pdpAvail");
  if (a) a.style.display = "block";
}
let q = 1;
function qty(d) {
  q = Math.max(1, q + d);
  const el = document.getElementById("qtyVal");
  if (el) el.textContent = q;
}

// ---------- Checkout v2: shipping + plan + totals ----------
const CO = { subtotal: 58.0, tax: 5.15, ship: 7.0, shipLabel: "1-Hour delivery" };

function selectShip(el) {
  document.querySelectorAll("#shipOpts .co-opt").forEach(o => o.classList.remove("selected"));
  el.classList.add("selected");
  CO.ship = parseFloat(el.dataset.cost);
  CO.shipLabel = el.dataset.label || "Shipping";
  // show/hide the 1-hour routing note
  const note = document.getElementById("routeNote");
  if (note) note.style.display = el.classList.contains("onehr") ? "flex" : "none";
  updateCheckoutTotals();
}
function updateCheckoutTotals() {
  const total = CO.subtotal + CO.ship + CO.tax;
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  set("sumShipLabel", CO.shipLabel);
  set("sumShip", CO.ship === 0 ? "FREE" : "$" + CO.ship.toFixed(2));
  set("sumTotal", "$" + total.toFixed(2));
  const inst = (total / 4).toFixed(2);
  set("instAmt", "$" + inst);
  const pb = document.getElementById("placeBtn");
  if (pb) pb.textContent = "Place order · $" + total.toFixed(2);
}
function selectPlan(el) {
  document.querySelectorAll("#planOpts .co-opt").forEach(o => o.classList.remove("selected"));
  el.classList.add("selected");
}
function placeOrder() {
  const oneHr = document.querySelector("#shipOpts .co-opt.selected.onehr");
  toast(oneHr ? "Order placed ⚡ Routing to nearest store — arriving in ~52 min"
              : "Order placed ✓ Thanks — your Buoy order is confirmed.");
}
document.addEventListener("DOMContentLoaded", updateCheckoutTotals);

// ---------- Slide-out cart drawer + rewards meter ----------
const CART = { name: "Ocean Electrolyte Drops", line: "Hydration", img: "assets/energy-duo.png", unit: 29.0, qty: 2, sub: false };
const TIERS = [
  { key: "ship", label: "Free Shipping", at: 2, pos: 16 },
  { key: "gift", label: "Free Gift",     at: 3, pos: 58 },
  { key: "cart", label: "Free Bottle",   at: 4, pos: 100 },
];

function injectCartDrawer() {
  if (document.getElementById("cartDrawer")) return;
  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <div class="cart-overlay" id="cartOverlay" onclick="closeCart()"></div>
    <aside class="cart-drawer" id="cartDrawer" aria-label="Your cart">
      <div class="cart-head">
        <h2>Your cart <span id="cartQtyHead">(2)</span></h2>
        <button class="cart-close" onclick="closeCart()" aria-label="Close cart">✕</button>
      </div>
      <div class="meter">
        <div class="meter-tiers" id="meterTiers"></div>
        <div class="meter-track"><div class="meter-fill" id="meterFill"></div><div id="meterNodes"></div></div>
        <div class="meter-msg" id="meterMsg"></div>
      </div>
      <div class="cart-eligible"><span>⚡</span> <span>This item is eligible for <b>1-hour delivery</b> in New York.</span></div>
      <div class="cart-body" id="cartBody"></div>
      <div class="cart-foot">
        <div class="cart-sub-toggle">
          <label><input type="checkbox" id="cartSub" onchange="toggleSub()" /> Subscribe to your cart &amp; save.</label>
          <span class="save">Save 10%</span>
        </div>
        <button class="cart-checkout" onclick="location.href='checkout.html'" id="cartCheckoutBtn">Checkout — $78</button>
        <div class="cart-fineprint">Taxes, discounts and shipping calculated at checkout.</div>
      </div>
    </aside>`;
  document.body.appendChild(wrap);
  renderCart();
}

function renderCart() {
  const q = CART.qty;
  // tiers
  const tiers = document.getElementById("meterTiers");
  if (tiers) tiers.innerHTML = TIERS.map(t => `<div class="meter-tier ${q >= t.at ? "done" : ""}">${t.label}</div>`).join("");
  // nodes
  const nodes = document.getElementById("meterNodes");
  if (nodes) nodes.innerHTML = TIERS.map(t => {
    const state = q >= t.at ? (q === t.at ? "current" : "done") : "";
    return `<div class="meter-node ${state}" style="left:${t.pos}%"><span class="lbl">${t.at} Carton${t.at>1?"s":""}</span></div>`;
  }).join("");
  // fill
  const fill = document.getElementById("meterFill");
  if (fill) {
    let pct = 6;
    if (q >= 4) pct = 100; else if (q === 3) pct = 58; else if (q === 2) pct = 16; else pct = 6;
    fill.style.width = pct + "%";
  }
  // message
  const msg = document.getElementById("meterMsg");
  if (msg) {
    if (q >= 4) msg.innerHTML = `🎉 You've unlocked a <b>free carton</b>!`;
    else if (q === 3) msg.innerHTML = `Add <b>1 more carton</b> to unlock a free carton.`;
    else if (q === 2) msg.innerHTML = `<span class="bolt">✓</span> Free shipping unlocked — add 1 more for a <b>free gift</b>.`;
    else msg.innerHTML = `Add <b>1 more carton</b> for free shipping.`;
  }
  // line item
  const body = document.getElementById("cartBody");
  if (body) body.innerHTML = `
    <div class="cart-line">
      <div class="im"><img src="${CART.img}" alt="" /></div>
      <div class="info">
        <div class="ln"><span class="dot"></span> ${CART.line}</div>
        <h3>${CART.name}</h3>
        <div class="pr">$${CART.unit.toFixed(2)}&nbsp; | &nbsp;1 Carton – 12 Bars.</div>
        <div class="sub-row"><span>Subscription:<br/>${CART.sub ? "Subscribe & Save 10%" : "One-Time Purchase"}</span><a href="#" onclick="event.preventDefault();toggleSubLink()">Edit</a></div>
        <div class="qty-row2">
          <div class="cart-stepper"><button onclick="cartQty(-1)">−</button><span id="cartLineQty">${CART.qty}</span><button onclick="cartQty(1)">+</button></div>
          <button class="rm" onclick="cartRemove()">Remove</button>
        </div>
      </div>
    </div>`;
  // header + checkout total
  const factor = CART.sub ? 0.9 : 1;
  const total = CART.qty * CART.unit * factor;
  const head = document.getElementById("cartQtyHead");
  if (head) head.textContent = `(${CART.qty})`;
  const btn = document.getElementById("cartCheckoutBtn");
  if (btn) btn.textContent = `Checkout — $${total.toFixed(total % 1 ? 2 : 0)}`;
  setCartCount(CART.qty);
}
function openCart() { injectCartDrawer(); requestAnimationFrame(() => { document.getElementById("cartOverlay").classList.add("open"); document.getElementById("cartDrawer").classList.add("open"); }); }
function closeCart() { const o=document.getElementById("cartOverlay"), d=document.getElementById("cartDrawer"); if(o)o.classList.remove("open"); if(d)d.classList.remove("open"); }
function cartQty(d) { CART.qty = Math.max(1, CART.qty + d); renderCart(); }
function cartRemove() { CART.qty = 1; renderCart(); }
function toggleSub() { CART.sub = document.getElementById("cartSub").checked; renderCart(); }
function toggleSubLink() { CART.sub = !CART.sub; const c=document.getElementById("cartSub"); if(c)c.checked=CART.sub; renderCart(); }

// ---------- Mobile hamburger menu ----------
function injectMobileMenu() {
  if (document.getElementById("mobileMenu")) return;
  const active = location.pathname.endsWith("buoy-now.html") ? "buoy-now" : "";
  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <div class="menu-overlay" id="menuOverlay" onclick="closeMenu()"></div>
    <nav class="mobile-menu" id="mobileMenu" aria-label="Menu">
      <div class="mm-head">
        <img src="assets/logo-white.svg" alt="Buoy" />
        <button class="mm-close" onclick="closeMenu()" aria-label="Close menu">✕</button>
      </div>
      <div class="mm-links">
        <a href="index.html#shop">Shop all</a>
        <a href="index.html#shop">Bars</a>
        <a href="index.html#shop">Pints</a>
        <a href="index.html#shop">Bundle</a>
        <a href="buoy-now.html" class="${active === "buoy-now" ? "active" : ""}">Buoy Now</a>
      </div>
      <div class="mm-cta"><a href="buoy-now.html" class="btn btn-white btn-block">⚡ Check your address</a></div>
      <div class="mm-sub">
        <a href="#">Store locator</a>
        <a href="#">Wholesale</a>
        <a href="checkout.html" onclick="event.preventDefault();closeMenu();openCart()">Cart</a>
      </div>
    </nav>`;
  document.body.appendChild(wrap);
}
function openMenu() { injectMobileMenu(); requestAnimationFrame(() => { document.getElementById("menuOverlay").classList.add("open"); document.getElementById("mobileMenu").classList.add("open"); }); }
function closeMenu() { const o = document.getElementById("menuOverlay"), m = document.getElementById("mobileMenu"); if (o) o.classList.remove("open"); if (m) m.classList.remove("open"); }

// ---------- tiny toast ----------
function toast(msg) {
  let t = document.getElementById("__toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "__toast";
    t.style.cssText = "position:fixed;left:50%;bottom:70px;transform:translateX(-50%);background:#0a0a0a;color:#fff;padding:13px 22px;border-radius:999px;font-family:'Space Mono',monospace;font-size:13px;z-index:200;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:opacity .25s ease;";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = "1";
  clearTimeout(t._h);
  t._h = setTimeout(() => { t.style.opacity = "0"; }, 2600);
}

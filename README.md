# Buoy × Vesper Commerce — 1-Hour Delivery Mockup

A concept/demo site showing how **one-hour delivery** (powered by GoPuff + DoorDash, acting as a delivery 3PL) could work **natively inside justaddbuoy.com**.

Built by AccelPay / Vesper Commerce for a sales conversation with Buoy.

## Pages
- **index.html** — Homepage. Buoy's real look & feel + a signature "Need it now? Get Buoy in under an hour" band with a live address check, a customer-facing "How it works", and ⚡ 1-hr tags across the product grid.
- **buoy-now.html** — Dedicated on-demand collection page (à la Nectar Now): hero with delivery facts, sticky address bar, and a grid of single-serve / small-format items with per-unit pricing.
- **product.html** — Product detail page (Ocean Electrolyte Drops) with a third purchase option — **⚡ 1-Hour Delivery** — that reveals an address check and delivery-only small formats (single bar / 4-pack).
- **checkout.html** — Buoy Shop-style checkout: Ship to block, a shipping selector combining the standard tiers (2-4 Day Standard FREE, 2-Day Air, 1-Day Air) **plus** the new 1-Hour Delivery options (DoorDash / GoPuff), a Plan section (Pay now / Pay in 4), an upsell rail, discount code, and a live-updating order summary. Includes the "order stays in your Shopify OMS" reassurance.

## Shared components
- **Slide-out cart drawer** (all pages, opens from the Cart pill) — replicates Buoy's rewards meter: Free Shipping → Free Gift → Free Carton milestones that fill as you add cartons (2/3/4), line item with subscription + qty stepper, "Subscribe & save 10%" toggle, and a live checkout total.

## Design notes
- Replicates Buoy's design system: **Instrument Serif** display + **Inter** body (Suisse substitute), black/white palette, pill buttons, off-white product panels, and their nav/footer.
- Product photography and logos are Buoy's own assets (in `assets/`) for demo fidelity.
- 1-hour delivery components (GoPuff/DoorDash chips, address module, delivery method) are the AccelPay additions — kept in Buoy's native style so they read as "already part of the site."

## Disclaimer
This is a **non-commercial sales mockup**, not affiliated with or endorsed by Buoy, GoPuff, or DoorDash. All Buoy trademarks and imagery belong to Buoy. A small "Vesper Commerce demo" ribbon is shown on each page.

## Run locally
Just open `index.html` in a browser, or serve the folder:
```
python3 -m http.server 8000
```

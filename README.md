# E-Commerce Frontend + Cart System

A professional React + Vite storefront app with product browsing, cart/wishlist persistence, promo discounts, and a frontend-only checkout flow.

## Tech Stack

- React + Vite
- JavaScript (no TypeScript)
- React Router
- React Context + useReducer
- Plain CSS (`src/styles/global.css`)
- localStorage persistence for cart, wishlist, promo code, and recently viewed items
- Local JSON catalog (`src/data/products.json`)

## Features

- Home page with hero, featured products, and recently viewed products
- Shop page with:
  - Search by title
  - Category filter
  - Price sorting (low-high, high-low)
  - Client-side pagination (8 per page)
- Product details page with:
  - Image gallery
  - Quantity selector
  - Add to cart
  - Wishlist toggle
  - Related products by category
- Cart page with:
  - Quantity increase/decrease
  - Remove item and clear cart
  - Subtotal, shipping, tax, discount, total
  - Promo code support (`SAVE10` = 10% off)
- Checkout page with frontend form validation and order success flow
- Wishlist page with remove and move-to-cart
- Responsive mobile-first UI
- Navbar badges for cart item count and wishlist count
- Error handling for invalid product IDs and unknown routes
- Minimal custom toast notifications (no library)

## Project Structure

```text
src/
  data/products.json
  components/
    Navbar.jsx
    ProductCard.jsx
    QuantitySelector.jsx
    Price.jsx
    Pagination.jsx
    SearchBar.jsx
    Filters.jsx
    ToastContainer.jsx
  pages/
    Home.jsx
    Shop.jsx
    ProductDetails.jsx
    Cart.jsx
    Checkout.jsx
    Wishlist.jsx
    NotFound.jsx
  context/
    storeContext.jsx
    reducer.js
    actions.js
  utils/
    formatCurrency.js
    storage.js
    calcTotals.js
  styles/
    global.css
  App.jsx
  main.jsx
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Routes

- `/` Home
- `/shop` Product listing
- `/product/:id` Product details
- `/cart` Cart
- `/checkout` Checkout
- `/wishlist` Wishlist
- `*` Not Found

## Business Rules Implemented

- Cart quantities cannot go negative.
- If item quantity drops to 0, the item is removed.
- Cart, wishlist, promo code, and recently viewed products persist in localStorage.
- Promo code persists until cleared or order placement.
- `SAVE10` gives 10% discount.

## Notes

- Product data is fully local and mock-driven.
- No external API calls are used.
- No Tailwind/UI libraries are used.

# Cedar & Co. — Mini E-Commerce

A small, responsive storefront built for the React Developer Intern take-home assessment. Browse a locally stored product collection, search and filter by category, open product details, and manage a shopping bag that stays saved in your browser.

## Run locally

Requirements: Node.js 18 or later and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). To make a production build, run `npm run build`; use `npm run preview` to preview that build.

## What is included

- Local product data in `src/data/products.json` (no backend or product API)
- Responsive product grid with category filters, search, and price/rating sorting
- Product detail routes with product information, quantity selection, and related items
- Cart add, remove, quantity controls, item count, subtotal, and shipping progress
- Cart state built with React Context and `useReducer`, persisted with `localStorage`
- Reusable header, footer, product card, product artwork, and empty-state components
- Search uses `useDeferredValue`; derived product lists use `useMemo`
- Checkout is intentionally a demo interaction; no payment or order service is connected

## How the React state works

`CartProvider` wraps the app so the header, product page, and cart page can all read and update the same cart. Its reducer handles four actions: add a product, change a quantity, remove a line, or clear the cart. `itemCount` and `subtotal` are calculated from the cart lines, while an effect saves each update to `localStorage`. On the next visit, the provider reads and validates the saved lines before using them.

The home and product pages load the JSON catalogue asynchronously and show loading or error UI while that happens. Search and category/sort choices are kept as local page state; `useMemo` recalculates the visible list when those inputs change, and `useDeferredValue` keeps typing responsive. React Router reads the product ID from the URL so each product has a shareable detail route.

## Project structure

```text
src/
  components/   Reusable storefront components
  data/         Local product catalogue
  pages/        Home, product detail, and cart routes
  state/        Cart context, reducer, and persistence
  App.jsx       Route definitions
  main.jsx      React entry point
  styles.css    Responsive visual system
```

## GitHub submission

Create an empty repository on GitHub, then from this project folder run:

```bash
git init
git add .
git commit -m "Build Cedar and Co mini ecommerce storefront"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Replace the remote URL with your repository URL. Review the code and be ready to explain how the cart reducer, context, and persistence work; the assessment expects candidates to understand and take responsibility for their submission.

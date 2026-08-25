# TENTIM — Website

A dark, bold, minimalist multi-page website for a graphic design & web
development studio, plus a starter backend for the features that need one.

## What's in here

```
tentim/
├── index.html          Home
├── portfolio.html       Portfolio (with client-side category filter)
├── services.html        Services & pricing
├── about.html            About
├── contact.html          Contact (brief form)
├── blog.html             Blog index
├── blog-post.html        Sample blog post template
├── login.html            Client login (demo auth)
├── portal.html           Client dashboard/portal (demo data)
├── admin.html            Studio admin dashboard (demo data)
├── css/style.css         Full design system
├── js/main.js            Interactive grid background, nav, forms, filters, demo auth
└── backend/              Starter Node/Express API (see below)
```

Open `index.html` in a browser (or serve the folder — see below) to view
the site right now. Every page, animation, hover state, portfolio filter,
and form works in the browser as-is.

## Design system

- **Palette** — near-black base (`#0a0a0c`), warm signal red-orange accent
  (`#ff4d2e`), a rare mint accent for success states, tonal greys for
  everything else.
- **Type** — Space Grotesk (display), Inter (body), JetBrains Mono (labels,
  data, UI chrome) — nods to the studio's dual design/dev identity.
- **Signature element** — an interactive pixel-grid background that reacts
  to the cursor across every page, standing in for both a design grid and
  a code grid.

## Running it locally

No build step required — it's static HTML/CSS/JS.

```bash
# any static server works, e.g.:
npx serve tentim
# or
python3 -m http.server 8000 --directory tentim
```

## What's real vs. what's a demo right now

Being upfront about this so nothing surprises you at launch:

| Feature | Status today | To make it real |
|---|---|---|
| All 6 pages, nav, animations, portfolio filter | ✅ Fully working | — |
| Contact form | Front-end validation + simulated submit | Point `#contact-form` at `POST /api/contact` (backend included) |
| Newsletter sign-up | Simulated submit | Point the footer form at `POST /api/newsletter` |
| Client login | Any email/password "signs in" (session flag only) | Wire to `POST /api/auth/login` with real password hashing (backend included, needs a real user table) |
| Client portal / admin dashboard | Static sample data | Fetch from `/api/contact`, `/api/blog`, and a clients/invoices table you add |
| Payments ("Pay now") | Placeholder button | Connect Stripe using `backend/routes/payments.js`, add your Stripe keys |
| Blog | Static posts in HTML | Optional: move to `backend/routes/blog.js` + a database, or a headless CMS |

## Backend

`backend/` is a runnable Express starter with routes for contact, auth,
payments (Stripe scaffold), newsletter, and a simple blog API.

```bash
cd backend
npm install
cp .env.example .env   # fill in real values
npm start
```

It uses in-memory arrays so you can run it immediately — swap those for a
real database (Postgres, MySQL, MongoDB) before launch, and put
`requireAuth()` from `routes/auth.js` in front of the admin-only routes.

## Deployment checklist for "fully live"

1. **Hosting** — static frontend on Vercel/Netlify/Cloudflare Pages;
   backend on Render/Railway/Fly.io, or both together on a Node host.
2. **Domain** — point `tentim4all.com` (or your chosen domain) at the
   frontend host, and set `CLIENT_ORIGIN` in the backend's `.env` to match.
3. **Database** — add Postgres/MongoDB and replace the in-memory arrays
   in each route file.
4. **Auth** — hash real passwords with bcrypt, store users in the
   database, keep `JWT_SECRET` out of source control.
5. **Payments** — create a Stripe account, add live keys, uncomment the
   Stripe calls in `routes/payments.js`, and configure the webhook.
6. **Email** — connect a transactional email provider (Resend, Postmark,
   SES) for contact-form notifications and newsletter delivery, or an ESP
   (Mailchimp, ConvertKit) for the newsletter list itself.
7. **Content** — swap the placeholder client names, testimonials, and
   portfolio pieces for real project details and images.

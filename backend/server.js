/**
 * TENTIM — backend starter (Node.js + Express)
 * -----------------------------------------------------------------------
 * This is a minimal, production-oriented starting point for the features
 * the frontend currently mocks: contact form, client/admin auth, a simple
 * data API for the dashboards, payments, and newsletter sign-up.
 *
 * It is NOT wired into the static site automatically — you need to:
 *   1. npm install
 *   2. Fill in the .env values (see .env.example)
 *   3. npm run start
 *   4. Point the frontend forms at these routes (see js/main.js comments)
 *
 * Swap the in-memory arrays for a real database (Postgres/MongoDB) before
 * going live — they exist here only to make the routes runnable out of
 * the box.
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payments');
const newsletterRoutes = require('./routes/newsletter');
const blogRoutes = require('./routes/blog');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'tentim-backend' }));

app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/blog', blogRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`TENTIM backend listening on :${PORT}`));

module.exports = app;

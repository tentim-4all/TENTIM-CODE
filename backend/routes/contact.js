const express = require('express');
const router = express.Router();

// Swap for a real database table (e.g. `submissions`).
const submissions = [];

/**
 * POST /api/contact
 * body: { name, email, budget, service, message }
 * Stores the lead and (in production) sends a notification email via
 * a provider such as Resend, Postmark, or SES — plug that in below.
 */
router.post('/', async (req, res) => {
  const { name, email, budget, service, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required.' });
  }

  const entry = {
    id: submissions.length + 1,
    name, email, budget, service, message,
    receivedAt: new Date().toISOString(),
    status: 'new',
  };
  submissions.push(entry);

  // TODO: send an email notification, e.g.:
  // await resend.emails.send({ to: 'hello@tentim4all.com', subject: `New brief from ${name}`, ... });

  res.status(201).json({ ok: true, message: "Message received — we'll reply within one business day." });
});

// GET /api/contact  (admin-only in production — add auth middleware)
router.get('/', (req, res) => res.json(submissions));

module.exports = router;

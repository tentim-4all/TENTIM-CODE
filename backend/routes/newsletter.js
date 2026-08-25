const express = require('express');
const router = express.Router();

// Swap for a real ESP integration (Mailchimp, ConvertKit, Resend Audiences, etc.)
const subscribers = [];

/**
 * POST /api/newsletter
 * body: { email }
 */
router.post('/', async (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'email is required.' });
  if (subscribers.includes(email)) {
    return res.json({ ok: true, message: 'Already subscribed.' });
  }
  subscribers.push(email);

  // TODO: call your ESP's API here, e.g.:
  // await mailchimp.lists.addListMember(LIST_ID, { email_address: email, status: 'subscribed' });

  res.status(201).json({ ok: true, message: 'Subscribed — welcome to the dispatch.' });
});

module.exports = router;

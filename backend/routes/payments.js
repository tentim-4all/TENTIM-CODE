const express = require('express');
const router = express.Router();

// npm install stripe
// const Stripe = require('stripe');
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * POST /api/payments/create-checkout-session
 * body: { invoiceId, amount, currency, clientEmail }
 * Creates a Stripe Checkout session and returns the URL for redirect.
 * Requires a Stripe account and STRIPE_SECRET_KEY in .env.
 */
router.post('/create-checkout-session', async (req, res) => {
  const { invoiceId, amount, currency = 'usd', clientEmail } = req.body || {};
  if (!amount) return res.status(400).json({ error: 'amount is required.' });

  try {
    // const session = await stripe.checkout.sessions.create({
    //   mode: 'payment',
    //   payment_method_types: ['card'],
    //   customer_email: clientEmail,
    //   line_items: [{
    //     price_data: {
    //       currency,
    //       product_data: { name: `TENTIM Invoice ${invoiceId}` },
    //       unit_amount: Math.round(amount * 100),
    //     },
    //     quantity: 1,
    //   }],
    //   success_url: `${process.env.CLIENT_ORIGIN}/portal.html?paid=1`,
    //   cancel_url: `${process.env.CLIENT_ORIGIN}/portal.html?paid=0`,
    // });
    // return res.json({ url: session.url });

    // Placeholder response until Stripe keys are configured:
    res.json({ url: null, note: 'Add STRIPE_SECRET_KEY in .env and uncomment the Stripe call above.' });
  } catch (err) {
    res.status(500).json({ error: 'Could not create checkout session.' });
  }
});

// Stripe webhook endpoint — verifies and records successful payments.
// Mount with express.raw({type: 'application/json'}) in server.js if you
// enable this, since Stripe needs the raw body for signature verification.
router.post('/webhook', (req, res) => {
  // const sig = req.headers['stripe-signature'];
  // const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  // handle event.type === 'checkout.session.completed' -> mark invoice paid
  res.json({ received: true });
});

module.exports = router;

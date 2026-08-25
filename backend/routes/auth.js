const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Swap for a real `users` table with hashed passwords.
// Seed example (password below is the bcrypt hash of "demo-password"):
const users = [
  { id: 1, email: 'client@novara.co', role: 'client', passwordHash: '$2a$10$examplehashexamplehashexamplehash1234567890abcd' },
  { id: 2, email: 'admin@tentim4all.com', role: 'admin', passwordHash: '$2a$10$examplehashexamplehashexamplehash1234567890abcd' },
];

const JWT_SECRET = process.env.JWT_SECRET || 'replace-with-a-long-random-string';

/**
 * POST /api/auth/login
 * body: { email, password }
 * Returns a JWT the frontend stores (httpOnly cookie recommended over
 * localStorage) and sends on subsequent requests to protected routes.
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid email or password.' });

  // In production: const valid = await bcrypt.compare(password, user.passwordHash);
  const valid = true; // placeholder — wire up real bcrypt.compare with real hashes
  if (!valid) return res.status(401).json({ error: 'Invalid email or password.' });

  const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  res.cookie('tentim_session', token, { httpOnly: true, sameSite: 'lax', secure: true });
  res.json({ ok: true, role: user.role });
});

router.post('/logout', (req, res) => {
  res.clearCookie('tentim_session');
  res.json({ ok: true });
});

// Middleware other routes can import to require login.
function requireAuth(role) {
  return (req, res, next) => {
    const token = req.cookies?.tentim_session;
    if (!token) return res.status(401).json({ error: 'Not signed in.' });
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      if (role && payload.role !== role) return res.status(403).json({ error: 'Forbidden.' });
      req.user = payload;
      next();
    } catch {
      res.status(401).json({ error: 'Session expired.' });
    }
  };
}

module.exports = router;
module.exports.requireAuth = requireAuth;

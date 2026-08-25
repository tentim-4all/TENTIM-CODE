const express = require('express');
const router = express.Router();

// Swap for a real `posts` table, or a headless CMS (Sanity, Contentful, etc.)
const posts = [
  {
    slug: 'why-dark-ui-needs-a-brighter-accent',
    title: 'Why dark UI needs a brighter accent than you think',
    tag: 'Design',
    excerpt: "Most dark interfaces under-saturate their one accent colour. Here's the contrast math that fixes it.",
    publishedAt: '2026-06-02',
    body: 'Full article body would live here or in a CMS...',
  },
];

router.get('/', (req, res) => res.json(posts));
router.get('/:slug', (req, res) => {
  const post = posts.find(p => p.slug === req.params.slug);
  if (!post) return res.status(404).json({ error: 'Post not found.' });
  res.json(post);
});

// POST/PUT/DELETE below should be behind requireAuth('admin') from routes/auth.js
router.post('/', (req, res) => {
  const { title, tag, excerpt, body } = req.body || {};
  if (!title || !body) return res.status(400).json({ error: 'title and body are required.' });
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const post = { slug, title, tag, excerpt, body, publishedAt: new Date().toISOString().slice(0, 10) };
  posts.push(post);
  res.status(201).json(post);
});

module.exports = router;

import express from 'express';
import Article from '../models/Article.js';

const router = express.Router();

// GET /api/article - fetch all or search
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    let articles;
    if (q) {
      articles = await Article.find({ title: { $regex: q, $options: 'i' } });
    } else {
      articles = await Article.find().sort({ createdAt: -1 });
    }
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// GET /api/article/:slug - fetch by slug
router.get('/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// POST /api/article - create new article
router.post('/', async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

export default router; 
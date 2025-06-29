import express from 'express';
import Comment from '../models/Comment.js';

const router = express.Router();

// GET comments for an article
router.get('/:slug', async (req, res) => {
  try {
    const comments = await Comment.find({ articleSlug: req.params.slug }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new comment
router.post('/', async (req, res) => {
  const { articleSlug, user, content } = req.body;

  if (!articleSlug || !user || !content) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const newComment = await Comment.create({ articleSlug, user, content });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to post comment' });
  }
});

export default router; 
import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: String,
  coverImage: String,
  content: String,
  author: {
    name: String,
    avatar: String
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Article', articleSchema); 
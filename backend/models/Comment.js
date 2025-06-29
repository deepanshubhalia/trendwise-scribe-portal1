import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  articleSlug: {
    type: String,
    required: true,
  },
  user: {
    name: String,
    email: String,
    image: String,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Comment || mongoose.model('Comment', commentSchema); 
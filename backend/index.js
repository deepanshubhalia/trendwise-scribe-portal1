import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import botRoutes from './routes/bot.js';
import Article from './models/Article.js';
import Comment from './models/Comment.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// MongoDB Connection (temporarily disabled for debugging)
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ MongoDB connected!');
    } else {
      console.log('⚠️  MONGODB_URI not found, using in-memory storage');
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.log('⚠️  Continuing with in-memory storage');
  }
};

connectDB();

app.use(cors());
app.use(express.json());

// Add mongoose to app.locals for bot routes
app.locals.mongoose = mongoose;

// Add in-memory storage function for bot routes
app.locals.addArticle = (article) => {
  articles.push(article);
  return article;
};

// In-memory storage as fallback
let articles = [
  {
    _id: "1",
    title: "The Rise of AI in Web Development",
    slug: "rise-of-ai-in-web-development",
    excerpt: "Discover how Artificial Intelligence is revolutionizing the way we build and interact with websites.",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
    createdAt: new Date().toISOString(),
    content: "<h2>The Age of AI is Here</h2><p>AI is no longer a futuristic concept; it's a present reality that's transforming how we approach web development. From automated testing to intelligent code completion, AI tools are becoming indispensable for modern developers.</p><p>Machine learning algorithms can now predict user behavior, optimize performance, and even generate code snippets. This revolution is not just about efficiency—it's about creating better, more intuitive user experiences.</p><h3>Key Benefits</h3><ul><li>Automated testing and debugging</li><li>Intelligent code completion</li><li>Performance optimization</li><li>User behavior prediction</li></ul>",
    author: {
      name: "Jane Doe",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  },
  {
    _id: "2",
    title: "Mastering State Management in React",
    slug: "mastering-state-management-in-react",
    excerpt: "Learn the best practices for managing state in React applications, from simple useState to complex Redux patterns.",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
    createdAt: new Date().toISOString(),
    content: "<h2>Understanding React State</h2><p>State management is the backbone of any React application. Whether you're building a simple todo app or a complex enterprise solution, understanding how to manage state effectively is crucial.</p><p>React provides several ways to manage state, each with its own use cases and trade-offs. From the simple useState hook to complex state machines, choosing the right approach can make or break your application.</p><h3>State Management Options</h3><ul><li>useState for local component state</li><li>useContext for shared state</li><li>Redux for complex state logic</li><li>Zustand for lightweight state</li></ul>",
    author: {
      name: "John Smith",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg"
    }
  },
  {
    _id: "3",
    title: "A Complete Guide to Headless CMS",
    slug: "guide-to-headless-cms",
    excerpt: "Explore the benefits and implementation of headless CMS systems for modern web applications.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    createdAt: new Date().toISOString(),
    content: "<h2>What is a Headless CMS?</h2><p>A headless CMS separates the content management backend from the presentation layer, giving developers complete freedom in how they display content across different platforms and devices.</p><p>This architecture provides several advantages, including better performance, flexibility in frontend technology choices, and the ability to serve content to multiple platforms from a single source.</p><h3>Popular Headless CMS Options</h3><ul><li>Strapi - Open source and self-hosted</li><li>Contentful - Enterprise-grade solution</li><li>Sanity - Real-time collaboration</li><li>Ghost - Focused on publishing</li></ul>",
    author: {
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/47.jpg"
    }
  }
];

let comments = [
  {
    _id: "1",
    articleSlug: "rise-of-ai-in-web-development",
    user: {
      name: "John Doe",
      email: "john@example.com",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    content: "Great article! AI is definitely changing how we approach development.",
    createdAt: new Date().toISOString()
  },
  {
    _id: "2",
    articleSlug: "rise-of-ai-in-web-development",
    user: {
      name: "Jane Smith",
      email: "jane@example.com",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    content: "I've been using GitHub Copilot and it's amazing how much it speeds up development.",
    createdAt: new Date().toISOString()
  }
];

// Get all articles
app.get('/api/article', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      // Use MongoDB if connected
      const articles = await Article.find().sort({ createdAt: -1 });
      res.json(articles);
    } else {
      // Use in-memory storage as fallback
      res.json(articles);
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.json(articles); // Fallback to in-memory
  }
});

// Get single article by slug
app.get('/api/article/:slug', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      // Use MongoDB if connected
      const article = await Article.findOne({ slug: req.params.slug });
      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }
      res.json(article);
    } else {
      // Use in-memory storage as fallback
      const article = articles.find(a => a.slug === req.params.slug);
      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }
      res.json(article);
    }
  } catch (error) {
    console.error('Error fetching article:', error);
    // Fallback to in-memory
    const article = articles.find(a => a.slug === req.params.slug);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  }
});

// Create a new article
app.post('/api/article', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      // Use MongoDB if connected
      const article = new Article(req.body);
      await article.save();
      res.status(201).json(article);
    } else {
      // Use in-memory storage as fallback
      const newArticle = {
        _id: Date.now().toString(),
        ...req.body,
        createdAt: new Date().toISOString()
      };
      articles.push(newArticle);
      res.status(201).json(newArticle);
    }
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// Get comments for an article
app.get('/api/comment/:slug', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      // Use MongoDB if connected
      const comments = await Comment.find({ articleSlug: req.params.slug }).sort({ createdAt: -1 });
      res.json(comments);
    } else {
      // Use in-memory storage as fallback
      const articleComments = comments.filter(c => c.articleSlug === req.params.slug);
      res.json(articleComments);
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
    // Fallback to in-memory
    const articleComments = comments.filter(c => c.articleSlug === req.params.slug);
    res.json(articleComments);
  }
});

// Add a new comment
app.post('/api/comment', async (req, res) => {
  try {
    const { articleSlug, user, content } = req.body;
    
    if (!articleSlug || !user || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (mongoose.connection.readyState === 1) {
      // Use MongoDB if connected
      const comment = new Comment({
        articleSlug,
        user,
        content
      });
      await comment.save();
      res.status(201).json(comment);
    } else {
      // Use in-memory storage as fallback
      const newComment = {
        _id: Date.now().toString(),
        articleSlug,
        user,
        content,
        createdAt: new Date().toISOString()
      };
      comments.push(newComment);
      res.status(201).json(newComment);
    }
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

app.use('/api/bot', botRoutes);

// Root test route for health check
app.get('/', (req, res) => {
  res.send('Backend is running successfully!');
});

app.listen(port, () => {
  console.log(`✅ Backend API server running on http://localhost:${port}`);
});
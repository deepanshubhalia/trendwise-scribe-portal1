import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-memory storage for articles and comments
let articles = [
    {
        _id: "1",
        title: "The Rise of AI in Web Development",
        slug: "rise-of-ai-in-web-development",
        excerpt: "Discover how Artificial Intelligence is revolutionizing the way we build and interact with websites.",
        coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
        createdAt: new Date().toISOString(),
        content: "<h2>The Age of AI is Here</h2><p>AI is no longer a futuristic concept; it's a present reality that's transforming how we approach web development. From automated testing to intelligent code completion, AI tools are becoming indispensable for modern developers.</p><p>Machine learning algorithms can now predict user behavior, optimize performance, and even generate code snippets. This revolution is not just about efficiency—it's about creating better, more intuitive user experiences.</p><h3>Key Benefits</h3><ul><li>Automated testing and debugging</li><li>Intelligent code completion</li><li>Performance optimization</li><li>User behavior prediction</li></ul>"
    },
    {
        _id: "2",
        title: "Mastering State Management in React",
        slug: "mastering-state-management-in-react",
        excerpt: "Learn the best practices for managing state in React applications, from simple useState to complex Redux patterns.",
        coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
        createdAt: new Date().toISOString(),
        content: "<h2>Understanding React State</h2><p>State management is the backbone of any React application. Whether you're building a simple todo app or a complex enterprise solution, understanding how to manage state effectively is crucial.</p><p>React provides several ways to manage state, each with its own use cases and trade-offs. From the simple useState hook to complex state machines, choosing the right approach can make or break your application.</p><h3>State Management Options</h3><ul><li>useState for local component state</li><li>useContext for shared state</li><li>Redux for complex state logic</li><li>Zustand for lightweight state</li></ul>"
    },
    {
        _id: "3",
        title: "A Complete Guide to Headless CMS",
        slug: "guide-to-headless-cms",
        excerpt: "Explore the benefits and implementation of headless CMS systems for modern web applications.",
        coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
        createdAt: new Date().toISOString(),
        content: "<h2>What is a Headless CMS?</h2><p>A headless CMS separates the content management backend from the presentation layer, giving developers complete freedom in how they display content across different platforms and devices.</p><p>This architecture provides several advantages, including better performance, flexibility in frontend technology choices, and the ability to serve content to multiple platforms from a single source.</p><h3>Popular Headless CMS Options</h3><ul><li>Strapi - Open source and self-hosted</li><li>Contentful - Enterprise-grade solution</li><li>Sanity - Real-time collaboration</li><li>Ghost - Focused on publishing</li></ul>"
    }
];

let comments = [
    {
        _id: "1",
        articleSlug: "rise-of-ai-in-web-development",
        author: "John Doe",
        content: "Great article! AI is definitely changing how we approach development.",
        createdAt: new Date().toISOString()
    },
    {
        _id: "2",
        articleSlug: "rise-of-ai-in-web-development",
        author: "Jane Smith",
        content: "I've been using GitHub Copilot and it's amazing how much it speeds up development.",
        createdAt: new Date().toISOString()
    }
];

// Get all articles
app.get('/api/article', (req, res) => {
    res.json(articles);
});

// Get single article by slug
app.get('/api/article/:slug', (req, res) => {
    const article = articles.find(a => a.slug === req.params.slug);
    if (!article) {
        return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
});

// Get comments for an article
app.get('/api/comment/:slug', (req, res) => {
    const articleComments = comments.filter(c => c.articleSlug === req.params.slug);
    res.json(articleComments);
});

// Add a new comment
app.post('/api/comment', (req, res) => {
    const { articleSlug, author, content } = req.body;
    
    if (!articleSlug || !author || !content) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const newComment = {
        _id: Date.now().toString(),
        articleSlug,
        author,
        content,
        createdAt: new Date().toISOString()
    };
    
    comments.push(newComment);
    res.status(201).json(newComment);
});

app.listen(port, () => {
    console.log(`Backend API server running on http://localhost:${port}`);
});
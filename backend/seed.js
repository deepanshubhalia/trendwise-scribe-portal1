import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Article from './models/Article.js';
import Comment from './models/Comment.js';

dotenv.config();

const sampleArticles = [
  {
    title: "The Rise of AI in Web Development",
    slug: "rise-of-ai-in-web-development",
    excerpt: "Discover how Artificial Intelligence is revolutionizing the way we build and interact with websites.",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
    content: "<h2>The Age of AI is Here</h2><p>AI is no longer a futuristic concept; it's a present reality that's transforming how we approach web development. From automated testing to intelligent code completion, AI tools are becoming indispensable for modern developers.</p><p>Machine learning algorithms can now predict user behavior, optimize performance, and even generate code snippets. This revolution is not just about efficiency—it's about creating better, more intuitive user experiences.</p><h3>Key Benefits</h3><ul><li>Automated testing and debugging</li><li>Intelligent code completion</li><li>Performance optimization</li><li>User behavior prediction</li></ul>",
    author: {
      name: "Jane Doe",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  },
  {
    title: "Mastering State Management in React",
    slug: "mastering-state-management-in-react",
    excerpt: "Learn the best practices for managing state in React applications, from simple useState to complex Redux patterns.",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
    content: "<h2>Understanding React State</h2><p>State management is the backbone of any React application. Whether you're building a simple todo app or a complex enterprise solution, understanding how to manage state effectively is crucial.</p><p>React provides several ways to manage state, each with its own use cases and trade-offs. From the simple useState hook to complex state machines, choosing the right approach can make or break your application.</p><h3>State Management Options</h3><ul><li>useState for local component state</li><li>useContext for shared state</li><li>Redux for complex state logic</li><li>Zustand for lightweight state</li></ul>",
    author: {
      name: "John Smith",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg"
    }
  },
  {
    title: "A Complete Guide to Headless CMS",
    slug: "guide-to-headless-cms",
    excerpt: "Explore the benefits and implementation of headless CMS systems for modern web applications.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    content: "<h2>What is a Headless CMS?</h2><p>A headless CMS separates the content management backend from the presentation layer, giving developers complete freedom in how they display content across different platforms and devices.</p><p>This architecture provides several advantages, including better performance, flexibility in frontend technology choices, and the ability to serve content to multiple platforms from a single source.</p><h3>Popular Headless CMS Options</h3><ul><li>Strapi - Open source and self-hosted</li><li>Contentful - Enterprise-grade solution</li><li>Sanity - Real-time collaboration</li><li>Ghost - Focused on publishing</li></ul>",
    author: {
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/47.jpg"
    }
  }
];

const sampleComments = [
  {
    articleSlug: "rise-of-ai-in-web-development",
    user: {
      name: "John Doe",
      email: "john@example.com",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    content: "Great article! AI is definitely changing how we approach development."
  },
  {
    articleSlug: "rise-of-ai-in-web-development",
    user: {
      name: "Jane Smith",
      email: "jane@example.com",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    content: "I've been using GitHub Copilot and it's amazing how much it speeds up development."
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Article.deleteMany({});
    await Comment.deleteMany({});
    console.log('✅ Cleared existing data');

    // Insert sample articles
    const articles = await Article.insertMany(sampleArticles);
    console.log(`✅ Inserted ${articles.length} articles`);

    // Insert sample comments
    const comments = await Comment.insertMany(sampleComments);
    console.log(`✅ Inserted ${comments.length} comments`);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 
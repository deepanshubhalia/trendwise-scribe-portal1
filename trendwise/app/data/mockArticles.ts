export const mockArticles = [
  {
    id: "1",
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt: "Discover the latest trends shaping the future of web development, from AI integration to performance optimization techniques that are revolutionizing how we build modern applications.",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop",
    category: "Technology",
    readTime: "5 min read",
    publishedAt: "2 days ago",
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c5f2?w=100&h=100&fit=crop&crop=face"
    },
    content: `
      <h2>The Evolution of Modern Web Development</h2>
      <p>Web development has undergone tremendous changes in recent years. From the rise of JavaScript frameworks to the adoption of modern CSS techniques, developers now have more tools than ever to create stunning user experiences.</p>
      
      <h3>Key Trends Shaping 2024</h3>
      <p>This year promises to bring exciting developments in several key areas:</p>
      
      <h4>1. AI-Powered Development Tools</h4>
      <p>Artificial intelligence is revolutionizing how we write code. Tools like GitHub Copilot and ChatGPT are becoming integral parts of the development workflow, helping developers write better code faster.</p>
      
      <h4>2. Performance-First Architecture</h4>
      <p>With Core Web Vitals becoming increasingly important for SEO, developers are prioritizing performance from the ground up. This includes adopting techniques like:</p>
      <ul>
        <li>Server-side rendering (SSR)</li>
        <li>Static site generation (SSG)</li>
        <li>Progressive Web Apps (PWAs)</li>
        <li>Edge computing</li>
      </ul>
      
      <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=400&fit=crop" alt="Code on screen" />
      
      <h3>The Rise of Component-Driven Development</h3>
      <p>Component-based architectures continue to dominate the landscape. React, Vue, and Angular have established patterns that promote reusability and maintainability.</p>
      
      <blockquote>
        "The future of web development lies in creating more intuitive, performant, and accessible experiences for all users." - Jane Doe, Senior Frontend Architect
      </blockquote>
      
      <h3>Conclusion</h3>
      <p>As we move forward, the key to success in web development will be staying adaptable and continuing to learn. The tools and techniques that define our industry today may be obsolete tomorrow, but the principles of good design and user experience will always remain relevant.</p>
    `
  },
  {
    id: "2",
    title: "Mastering React Hooks: A Complete Guide",
    excerpt: "Learn how to leverage React Hooks to build more efficient and maintainable applications. This comprehensive guide covers everything from basic useState to custom hooks.",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=450&fit=crop",
    category: "React",
    readTime: "8 min read",
    publishedAt: "1 week ago",
    author: {
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    content: `
      <h2>Understanding React Hooks</h2>
      <p>React Hooks revolutionized how we write React components by allowing us to use state and other React features in functional components.</p>
      
      <h3>The Basics: useState and useEffect</h3>
      <p>These two hooks form the foundation of most React applications:</p>
      
      <pre><code>
const [count, setCount] = useState(0);

useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);
      </code></pre>
      
      <h3>Advanced Patterns</h3>
      <p>As your applications grow more complex, you'll want to explore advanced hook patterns and custom hooks for better code organization.</p>
    `
  },
  {
    id: "3",
    title: "Building Scalable APIs with Node.js",
    excerpt: "Explore best practices for creating robust and scalable APIs using Node.js, Express, and modern database technologies.",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
    category: "Backend",
    readTime: "12 min read",
    publishedAt: "3 days ago",
    author: {
      name: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    content: `
      <h2>Building APIs That Scale</h2>
      <p>Creating APIs that can handle millions of requests requires careful planning and implementation of best practices.</p>
      
      <h3>Architecture Considerations</h3>
      <p>When building scalable APIs, consider these architectural patterns:</p>
      <ul>
        <li>Microservices architecture</li>
        <li>API Gateway patterns</li>
        <li>Caching strategies</li>
        <li>Load balancing</li>
      </ul>
    `
  },
  {
    id: "4",
    title: "CSS Grid vs Flexbox: When to Use Which",
    excerpt: "A comprehensive comparison of CSS Grid and Flexbox, helping you choose the right layout method for your next project.",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=450&fit=crop",
    category: "CSS",
    readTime: "6 min read",
    publishedAt: "5 days ago",
    author: {
      name: "Emily Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    content: `
      <h2>CSS Layout: Grid vs Flexbox</h2>
      <p>Both CSS Grid and Flexbox are powerful layout systems, but they excel in different scenarios.</p>
      
      <h3>When to Use Flexbox</h3>
      <p>Flexbox is perfect for one-dimensional layouts:</p>
      <ul>
        <li>Navigation bars</li>
        <li>Card layouts</li>
        <li>Centering content</li>
      </ul>
      
      <h3>When to Use CSS Grid</h3>
      <p>CSS Grid shines for two-dimensional layouts:</p>
      <ul>
        <li>Page layouts</li>
        <li>Complex card grids</li>
        <li>Magazine-style layouts</li>
      </ul>
    `
  },
  {
    id: "5",
    title: "The Art of Clean Code: Principles Every Developer Should Know",
    excerpt: "Discover the fundamental principles of writing clean, maintainable code that your future self and teammates will thank you for.",
    thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=450&fit=crop",
    category: "Programming",
    readTime: "10 min read",
    publishedAt: "1 week ago",
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    content: `
      <h2>Writing Code That Lasts</h2>
      <p>Clean code is not just about making it workit's about making it readable, maintainable, and extensible.</p>
      
      <h3>Core Principles</h3>
      <p>The foundation of clean code rests on several key principles:</p>
      
      <h4>1. Meaningful Names</h4>
      <p>Choose names that reveal intent and make code self-documenting.</p>
      
      <h4>2. Functions Should Do One Thing</h4>
      <p>Keep functions small and focused on a single responsibility.</p>
      
      <h4>3. Don't Repeat Yourself (DRY)</h4>
      <p>Eliminate duplication to reduce maintenance burden.</p>
    `
  },
  {
    id: "6",
    title: "Mobile-First Design: Creating Better User Experiences",
    excerpt: "Learn why mobile-first design is crucial in today's world and how to implement it effectively in your projects.",
    thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=450&fit=crop",
    category: "Design",
    readTime: "7 min read",
    publishedAt: "4 days ago",
    author: {
      name: "Lisa Wong",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face"
    },
    content: `
      <h2>Designing for Mobile First</h2>
      <p>With mobile traffic accounting for over 50% of web usage, mobile-first design is no longer optionalit's essential.</p>
      
      <h3>Why Mobile-First Matters</h3>
      <p>Starting with mobile constraints forces you to prioritize content and functionality, resulting in cleaner, more focused designs.</p>
      
      <h3>Implementation Strategies</h3>
      <p>Effective mobile-first design requires careful consideration of:</p>
      <ul>
        <li>Touch targets and accessibility</li>
        <li>Content hierarchy</li>
        <li>Performance optimization</li>
        <li>Progressive enhancement</li>
      </ul>
    `
  }
]; 
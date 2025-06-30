import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Topics for article generation
const topics = [
    "The Future of Artificial Intelligence in Web Development",
    "Building Scalable Microservices with Node.js",
    "Mastering React Hooks and State Management",
    "The Rise of TypeScript in Modern Development",
    "Optimizing Database Performance in Web Applications",
    "Implementing Real-time Features with WebSockets",
    "Security Best Practices for Web Applications",
    "The Evolution of CSS: From Flexbox to Grid",
    "Building Progressive Web Apps (PWAs)",
    "API Design Patterns and Best Practices"
];

// Fallback content templates
const fallbackContent = {
    "The Future of Artificial Intelligence in Web Development": {
        content: `
        <h2>The Future of Artificial Intelligence in Web Development</h2>
        <p>Artificial Intelligence is revolutionizing the way we approach web development. From automated testing to intelligent code completion, AI tools are becoming indispensable for modern developers.</p>
        <p>Machine learning algorithms can now predict user behavior, optimize performance, and even generate code snippets. This revolution is not just about efficiency—it's about creating better, more intuitive user experiences.</p>
        <h3>Key Benefits of AI in Web Development</h3>
        <ul>
            <li>Automated testing and debugging</li>
            <li>Intelligent code completion</li>
            <li>Performance optimization</li>
            <li>User behavior prediction</li>
        </ul>
        <p>As we move forward, AI will continue to shape the future of web development, making it more accessible and efficient than ever before.</p>
        `,
        coverImage: "https://source.unsplash.com/800x450/?ai,web"
    },
    "Building Scalable Microservices with Node.js": {
        content: `
        <h2>Building Scalable Microservices with Node.js</h2>
        <p>Microservices architecture has become the standard for building scalable, maintainable applications. Node.js, with its event-driven, non-blocking I/O model, is perfectly suited for microservices development.</p>
        <p>This approach allows teams to develop, deploy, and scale services independently, leading to faster development cycles and better fault tolerance.</p>
        <h3>Best Practices for Node.js Microservices</h3>
        <ul>
            <li>Use lightweight frameworks like Express.js</li>
            <li>Implement proper error handling</li>
            <li>Use containerization with Docker</li>
            <li>Implement service discovery</li>
        </ul>
        <p>By following these practices, you can build robust, scalable microservices that can handle high traffic and complex business logic.</p>
        `,
        coverImage: "https://source.unsplash.com/800x450/?nodejs,microservices"
    },
    "Mastering React Hooks and State Management": {
        content: `
        <h2>Mastering React Hooks and State Management</h2>
        <p>React Hooks have transformed how we manage state and side effects in functional components. They provide a more intuitive way to work with React's features without the complexity of class components.</p>
        <p>Understanding hooks like useState, useEffect, and useContext is essential for modern React development. They enable cleaner, more maintainable code.</p>
        <h3>Essential React Hooks</h3>
        <ul>
            <li>useState for local component state</li>
            <li>useEffect for side effects</li>
            <li>useContext for shared state</li>
            <li>useReducer for complex state logic</li>
        </ul>
        <p>Mastering these hooks will significantly improve your React development skills and code quality.</p>
        `,
        coverImage: "https://source.unsplash.com/800x450/?react,hooks"
    },
    "The Rise of TypeScript in Modern Development": {
        content: `
        <h2>The Rise of TypeScript in Modern Development</h2>
        <p>TypeScript has emerged as the preferred choice for large-scale JavaScript applications. Its static typing system helps catch errors early and provides better developer experience.</p>
        <p>Major frameworks like React, Angular, and Vue.js have embraced TypeScript, making it an essential skill for modern web developers.</p>
        <h3>Benefits of TypeScript</h3>
        <ul>
            <li>Early error detection</li>
            <li>Better IDE support</li>
            <li>Improved code documentation</li>
            <li>Enhanced refactoring capabilities</li>
        </ul>
        <p>As the ecosystem continues to grow, TypeScript is becoming the standard for professional JavaScript development.</p>
        `,
        coverImage: "https://source.unsplash.com/800x450/?typescript,javascript"
    },
    "Optimizing Database Performance in Web Applications": {
        content: `
        <h2>Optimizing Database Performance in Web Applications</h2>
        <p>Database performance is crucial for the success of any web application. Poor database design and queries can lead to slow response times and poor user experience.</p>
        <p>Understanding indexing, query optimization, and database design patterns is essential for building high-performance applications.</p>
        <h3>Performance Optimization Techniques</h3>
        <ul>
            <li>Proper indexing strategies</li>
            <li>Query optimization</li>
            <li>Connection pooling</li>
            <li>Caching strategies</li>
        </ul>
        <p>By implementing these techniques, you can significantly improve your application's performance and scalability.</p>
        `,
        coverImage: "https://source.unsplash.com/800x450/?database,performance"
    },
    "Implementing Real-time Features with WebSockets": {
        content: `
        <h2>Implementing Real-time Features with WebSockets</h2>
        <p>WebSockets enable real-time, two-way communication between client and server, making them ideal for chat apps, live notifications, and collaborative tools.</p>
        <p>Learn how to set up WebSockets, handle events, and scale real-time features in your web applications.</p>
        <h3>WebSocket Use Cases</h3>
        <ul>
            <li>Live chat applications</li>
            <li>Real-time notifications</li>
            <li>Collaborative editing</li>
            <li>Live data dashboards</li>
        </ul>
        <p>Mastering WebSockets will help you build engaging, interactive web experiences.</p>
        `,
        coverImage: "https://source.unsplash.com/800x450/?websockets,real-time"
    },
    "Security Best Practices for Web Applications": {
        content: `
        <h2>Security Best Practices for Web Applications</h2>
        <p>Security is paramount in web development. Learn about authentication, authorization, data validation, and other best practices to keep your applications safe.</p>
        <h3>Key Security Practices</h3>
        <ul>
            <li>Input validation</li>
            <li>Authentication & authorization</li>
            <li>HTTPS everywhere</li>
            <li>Regular security audits</li>
        </ul>
        <p>Implementing these practices will help you protect your users and your business.</p>
        `,
        coverImage: "https://source.unsplash.com/800x450/?security,web"
    },
    "The Evolution of CSS: From Flexbox to Grid": {
        content: `
        <h2>The Evolution of CSS: From Flexbox to Grid</h2>
        <p>CSS has evolved rapidly, with Flexbox and Grid revolutionizing layout techniques. Learn how to use these tools to build responsive, modern web layouts.</p>
        <h3>Modern CSS Features</h3>
        <ul>
            <li>Flexbox for 1D layouts</li>
            <li>Grid for 2D layouts</li>
            <li>Custom properties (CSS variables)</li>
            <li>Responsive design techniques</li>
        </ul>
        <p>Stay up to date with the latest in CSS to create beautiful, flexible designs.</p>
        `,
        coverImage: "https://source.unsplash.com/800x450/?css,grid,flexbox"
    },
    "Building Progressive Web Apps (PWAs)": {
        content: `
        <h2>Building Progressive Web Apps (PWAs)</h2>
        <p>PWAs combine the best of web and mobile apps. Learn how to make your web apps installable, offline-capable, and fast.</p>
        <h3>PWA Features</h3>
        <ul>
            <li>Offline support</li>
            <li>Push notifications</li>
            <li>App-like experience</li>
            <li>Fast loading</li>
        </ul>
        <p>PWAs are the future of web apps—start building them today!</p>
        `,
        coverImage: "https://source.unsplash.com/800x450/?pwa,web,app"
    },
    "API Design Patterns and Best Practices": {
        content: `
        <h2>API Design Patterns and Best Practices</h2>
        <p>Designing robust APIs is crucial for scalable applications. Learn about REST, GraphQL, versioning, and documentation best practices.</p>
        <h3>API Best Practices</h3>
        <ul>
            <li>RESTful design</li>
            <li>GraphQL for flexibility</li>
            <li>Comprehensive documentation</li>
            <li>Versioning strategies</li>
        </ul>
        <p>Well-designed APIs are the backbone of modern web and mobile apps.</p>
        `,
        coverImage: "https://source.unsplash.com/800x450/?api,design"
    }
};

// 🧪 Hugging Face API article generator
router.post("/generate", async (req, res) => {
    try {
        // Pick a random topic
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        
        // Generate unique ID and slug
        const id = uuidv4();
        const timestamp = Date.now();
        const slug = `ai-generated-${timestamp}`;
        
        let generatedContent = "";
        let useFallback = false;
        
        // Try Hugging Face API first
        if (process.env.HUGGINGFACE_API_KEY) {
            try {
                const prompt = `Write a blog article about ${randomTopic}. Include an introduction, main points, and conclusion.`;
                
                console.log('Calling Hugging Face API with prompt:', prompt);
                
                const response = await fetch(
                    "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
                    {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            inputs: prompt,
                            parameters: {
                                max_length: 300,
                                temperature: 0.8,
                                do_sample: true,
                                return_full_text: false
                            }
                        }),
                    }
                );

                console.log('Hugging Face API Response Status:', response.status);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('Hugging Face API Response received');
                    
                    generatedContent = data[0]?.generated_text || "";
                    
                    if (generatedContent && generatedContent.length > 50) {
                        // Clean up the generated content
                        generatedContent = generatedContent
                            .replace(/^.*?:\s*/, '') // Remove any prefix
                            .replace(/\n\n/g, '</p><p>') // Convert double line breaks to paragraphs
                            .replace(/\n/g, '<br>'); // Convert single line breaks to <br>
                        
                        generatedContent = `<h2>${randomTopic}</h2><p>${generatedContent}</p>`;
                    } else {
                        useFallback = true;
                    }
                } else {
                    useFallback = true;
                }
            } catch (apiError) {
                console.error('Hugging Face API Error:', apiError);
                useFallback = true;
            }
        } else {
            useFallback = true;
        }
        
        // Use fallback content if API fails or no API key
        if (useFallback || !generatedContent) {
            console.log('Using fallback content for topic:', randomTopic);
            if (fallbackContent[randomTopic]) {
                generatedContent = fallbackContent[randomTopic].content;
                var fallbackCoverImage = fallbackContent[randomTopic].coverImage;
            } else {
                // Generic fallback content
                generatedContent = `
                    <h2>${randomTopic}</h2>
                    <p>This is a comprehensive article about ${randomTopic}. In this article, we will explore the key concepts, best practices, and practical applications of this important topic in modern web development.</p>
                    <p>We'll cover everything from basic principles to advanced techniques that you can apply in your projects. This topic is essential for any developer looking to stay current with modern development practices.</p>
                    <h3>Key Points Covered</h3>
                    <ul>
                        <li>Fundamental concepts and principles</li>
                        <li>Best practices and industry standards</li>
                        <li>Practical implementation examples</li>
                        <li>Common pitfalls and how to avoid them</li>
                    </ul>
                    <p>By understanding these concepts, you'll be better equipped to tackle complex development challenges and build more robust applications.</p>
                `;
                var fallbackCoverImage = `https://source.unsplash.com/800x450/?${randomTopic.split(" ").join(",")}`;
            }
        }
        
        // Create article object
        const generatedArticle = {
            _id: id,
            title: randomTopic,
            slug: slug,
            excerpt: `An in-depth exploration of ${randomTopic.toLowerCase()}.`,
            content: generatedContent,
            coverImage: fallbackCoverImage || `https://source.unsplash.com/800x450/?${randomTopic.split(" ").join(",")}`,
            createdAt: new Date().toISOString(),
            isAI: true // Flag to identify AI-generated articles
        };

        // Store the article using the appropriate method
        let storedArticle;
        if (req.app.locals.addArticle) {
            // Use in-memory storage if available
            storedArticle = req.app.locals.addArticle(generatedArticle);
        } else {
            // Use MongoDB if available, otherwise just return the article
            try {
                const Article = (await import('../models/Article.js')).default;
                if (req.app.locals.mongoose && req.app.locals.mongoose.connection.readyState === 1) {
                    const article = new Article(generatedArticle);
                    storedArticle = await article.save();
                } else {
                    storedArticle = generatedArticle;
                }
            } catch (error) {
                console.error('Error saving article:', error);
                storedArticle = generatedArticle;
            }
        }
        
        res.json({
            success: true,
            message: "AI-generated article created and stored successfully",
            article: storedArticle,
            topic: randomTopic,
            source: useFallback ? "fallback" : "huggingface"
        });
        
    } catch (error) {
        console.error('Error generating AI article:', error);
        res.status(500).json({
            success: false,
            message: "Failed to generate AI article",
            error: error.message
        });
    }
});

// Get available topics (for admin UI)
router.get("/topics", (req, res) => {
    res.json({
        success: true,
        topics: topics.map((topic, index) => ({
            id: index,
            title: topic
        }))
    });
});

// Get available templates (for admin UI)
router.get("/templates", (req, res) => {
    const templates = topics.map((topic, index) => ({
        id: index,
        title: topic,
        excerpt: `An in-depth exploration of ${topic.toLowerCase()}.`
    }));
    
    res.json({
        success: true,
        templates: templates
    });
});

export default router; 
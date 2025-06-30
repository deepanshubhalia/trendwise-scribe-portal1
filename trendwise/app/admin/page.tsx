'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';

interface MockArticle {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  createdAt: string;
  isMock: boolean;
}

interface Template {
  id: number;
  title: string;
  excerpt: string;
}

export default function AdminPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<MockArticle | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [message, setMessage] = useState('');

  // Fetch available templates
  const fetchTemplates = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/bot/templates');
      const data = await response.json();
      if (data.success) {
        setTemplates(data.templates);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  // Generate a mock article
  const generateArticle = async () => {
    setIsGenerating(true);
    setMessage('');
    setGeneratedArticle(null);

    try {
      const response = await fetch('http://localhost:5001/api/bot/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedArticle(data.article);
        setMessage('✅ Article generated successfully!');
      } else {
        setMessage('❌ Failed to generate article: ' + data.message);
      }
    } catch (error) {
      console.error('Error generating article:', error);
      setMessage('❌ Error generating article. Please check if backend is running.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Load templates on component mount
  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🧪 Mock Article Generator
          </h1>
          
          <div className="mb-8">
            <p className="text-gray-600 mb-4">
              Generate mock articles for testing without requiring OpenAI API. 
              Each generation creates a random article from predefined templates.
            </p>
            
            <Button 
              onClick={generateArticle}
              disabled={isGenerating}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              {isGenerating ? '🔄 Generating...' : '🚀 Generate Mock Article'}
            </Button>
          </div>

          {message && (
            <div className={`p-4 rounded-lg mb-6 ${
              message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}

          {templates.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Available Templates ({templates.length})
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {templates.map((template) => (
                  <div key={template.id} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">
                      {template.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {template.excerpt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {generatedArticle && (
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Generated Article
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {generatedArticle.title}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {generatedArticle.excerpt}
                  </p>
                  <div className="text-sm text-gray-500">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      Mock Article
                    </span>
                    <span className="ml-2">
                      Slug: {generatedArticle.slug}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <img 
                    src={generatedArticle.coverImage} 
                    alt={generatedArticle.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                <div className="prose max-w-none">
                  <div 
                    dangerouslySetInnerHTML={{ __html: generatedArticle.content }}
                    className="text-gray-700"
                  />
                </div>

                <div className="mt-4 pt-4 border-t">
                  <Button 
                    onClick={() => window.open(`/article/${generatedArticle.slug}`, '_blank')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    👁️ View Article
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
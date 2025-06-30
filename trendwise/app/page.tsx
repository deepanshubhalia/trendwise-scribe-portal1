"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Article } from '../types/article';
import Header from "@/app/components/Header";
import ArticleCard from "@/app/components/ArticleCard";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Search } from "lucide-react";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const searchParams = useSearchParams();
  const router = useRouter();

  const categories = ["All", "Technology", "React", "Backend", "CSS", "Programming", "Design"];

  // Format date consistently
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    } else {
      params.delete('search');
    }
    router.push(`/?${params.toString()}`);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    router.push(`/?${params.toString()}`);
  };

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    const searchQuery = searchParams.get('search');
    
    // Update local search term from URL
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }

    // Build API URL with search parameter
    const url = searchQuery 
      ? `${apiUrl}/api/article?search=${encodeURIComponent(searchQuery)}`
      : `${apiUrl}/api/article`;

    setLoading(true);
    fetch(url)
      .then(async (res) => {
        if (!res.ok) {
          const errText = await res.text();
          console.error('Error fetching articles:', res.status, errText);
          setLoading(false);
          return [];
        }
        return res.json();
      })
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching articles:', err);
        setLoading(false);
      });
  }, [searchParams]);

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 mb-12">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Discover Trending
              <br />
              <span className="text-primary">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Stay ahead with the latest articles on technology, development, and digital innovation.
            </p>
          </div>
          
          {/* Search Form */}
          <div className="mb-8 animate-scale-in">
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 pr-20 search-bar"
                  autoFocus
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                  {searchTerm && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleClearSearch}
                      className="h-6 px-2 text-xs"
                    >
                      Clear
                    </Button>
                  )}
                  <Button
                    type="submit"
                    size="sm"
                    className="h-6 px-2 text-xs"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Articles Grid */}
        <section>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Loading articles...</p>
            </div>
          ) : (
            <div className="grid gap-8 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article._id}
                  id={article.slug || article._id}
                  title={article.title}
                  excerpt={article.excerpt}
                  thumbnail={article.coverImage || '/default-cover.jpg'}
                  category={article.category}
                  readTime={article.readTime}
                  publishedAt={formatDate(article.createdAt)}
                  author={article.author}
                />
              ))}
            </div>
          )}

          {!loading && filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {searchParams.get('search') 
                  ? `No articles found matching "${searchParams.get('search')}".`
                  : "No articles found matching your criteria."
                }
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  router.push('/');
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        <section className="mt-16 py-12 bg-muted/30 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Get the latest articles delivered straight to your inbox.
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <Input placeholder="Enter your email" className="flex-1" />
            <Button>Subscribe</Button>
          </div>
        </section>
      </main>
    </div>
  );
}

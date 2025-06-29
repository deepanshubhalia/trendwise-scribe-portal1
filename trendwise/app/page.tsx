"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
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

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    fetch(`${apiUrl}/api/article`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
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
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
          
          {/* Mobile Search */}
          <div className="md:hidden mb-8 animate-scale-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 search-bar"
              />
            </div>
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
                <Link key={article._id} href={`/article/${article.slug}`}>
                  <div className="animate-fade-in">
                    <div className="border rounded-lg p-4 shadow hover:shadow-md transition cursor-pointer">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="rounded mb-4 h-48 w-full object-cover"
                      />
                      <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                      <p className="text-gray-600 mb-2">{article.excerpt}</p>
                      <span className="text-sm text-gray-400">
                        {formatDate(article.createdAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No articles found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
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

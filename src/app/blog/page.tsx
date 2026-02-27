'use client';

import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

// Sample blog posts
const blogPosts = [
  {
    id: '1',
    title: 'Top 10 Trends in E-Commerce for 2024',
    slug: 'top-10-ecommerce-trends-2024',
    excerpt: 'Discover the latest trends shaping the e-commerce industry and how you can leverage them for your online store.',
    content: 'Full content here...',
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    author: 'John Doe',
    category: 'Industry News',
    publishedAt: '2024-01-15',
    isPublished: true,
  },
  {
    id: '2',
    title: 'How to Boost Your Online Sales',
    slug: 'how-to-boost-online-sales',
    excerpt: 'Learn proven strategies to increase your conversion rates and grow your e-commerce business.',
    content: 'Full content here...',
    featuredImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    author: 'Jane Smith',
    category: 'Tips & Tricks',
    publishedAt: '2024-01-10',
    isPublished: true,
  },
  {
    id: '3',
    title: 'Customer Success Stories',
    slug: 'customer-success-stories',
    excerpt: 'Read inspiring stories from our customers and learn how they achieved remarkable results.',
    content: 'Full content here...',
    featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    author: 'Mike Johnson',
    category: 'Success Stories',
    publishedAt: '2024-01-05',
    isPublished: true,
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
        <p className="text-xl text-gray-600">
          Latest news, tips, and insights from the e-commerce world
        </p>
      </div>

      {/* Featured Post */}
      <section className="mb-12">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-gray-200 h-64 lg:h-auto flex items-center justify-center">
              <span className="text-gray-500">Featured Image</span>
            </div>
            <div className="p-8">
              <span className="inline-block bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full mb-4">
                {blogPosts[0].category}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {blogPosts[0].title}
              </h2>
              <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {blogPosts[0].author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {blogPosts[0].publishedAt}
                </div>
              </div>
              <Link
                href={`/blog/${blogPosts[0].slug}`}
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
              >
                Read More
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <span className="text-gray-500">Post Image</span>
              </div>
              <div className="p-6">
                <span className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full mb-3">
                  {post.category}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <User className="h-3 w-3" />
                    {post.author}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

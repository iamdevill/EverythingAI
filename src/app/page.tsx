'use client';

import Link from 'next/link';
import { ArrowRight, Truck, RefreshCw, Shield, Headphones } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

// Sample featured products - using placeholder images
const featuredProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    slug: 'premium-wireless-headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    compareAtPrice: 249.99,
    images: ['/placeholder-product.jpg'],
    category: { id: '1', name: 'Electronics', slug: 'electronics', isActive: true },
    inventory: 50,
    sku: 'WH-001',
    isFeatured: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    slug: 'smart-watch-pro',
    description: 'Advanced smartwatch with health tracking features',
    price: 299.99,
    images: ['/placeholder-product.jpg'],
    category: { id: '1', name: 'Electronics', slug: 'electronics', isActive: true },
    inventory: 30,
    sku: 'SW-001',
    isFeatured: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Designer Leather Bag',
    slug: 'designer-leather-bag',
    description: 'Genuine leather messenger bag for professionals',
    price: 149.99,
    images: ['/placeholder-product.jpg'],
    category: { id: '2', name: 'Fashion', slug: 'fashion', isActive: true },
    inventory: 25,
    sku: 'LB-001',
    isFeatured: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Running Shoes',
    slug: 'running-shoes',
    description: 'Lightweight and comfortable running shoes',
    price: 89.99,
    compareAtPrice: 119.99,
    images: ['/placeholder-product.jpg'],
    category: { id: '3', name: 'Sports', slug: 'sports', isActive: true },
    inventory: 100,
    sku: 'RS-001',
    isFeatured: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $50',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-day return policy',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure checkout',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated customer service',
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing Products
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Shop the latest trends with our curated collection of premium products. 
              Quality meets style at unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Now
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-gray-50 py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="mt-2 text-gray-600">Check out our most popular items</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
            >
              View All Products
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
            <p className="mt-2 text-gray-600">Browse our collections</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Electronics', slug: 'electronics' },
              { name: 'Fashion', slug: 'fashion' },
              { name: 'Sports', slug: 'sports' },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/shop?category=${category.slug}`}
                className="group relative h-64 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Subscribe to Our Newsletter</h2>
            <p className="mt-2 text-blue-100">
              Get the latest updates on new products and upcoming sales
            </p>
            <form className="mt-8 max-w-md mx-auto flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

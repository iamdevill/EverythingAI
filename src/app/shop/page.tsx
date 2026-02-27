'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

// Sample all products - using placeholder images
const allProducts: Product[] = [
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
  {
    id: '5',
    name: 'Laptop Stand',
    slug: 'laptop-stand',
    description: 'Ergonomic aluminum laptop stand',
    price: 49.99,
    images: ['/placeholder-product.jpg'],
    category: { id: '1', name: 'Electronics', slug: 'electronics', isActive: true },
    inventory: 75,
    sku: 'LS-001',
    isFeatured: false,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Wireless Mouse',
    slug: 'wireless-mouse',
    description: 'Precision wireless mouse with long battery life',
    price: 39.99,
    images: ['/placeholder-product.jpg'],
    category: { id: '1', name: 'Electronics', slug: 'electronics', isActive: true },
    inventory: 150,
    sku: 'WM-001',
    isFeatured: false,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '7',
    name: 'Fitness Tracker',
    slug: 'fitness-tracker',
    description: 'Track your fitness goals with this sleek tracker',
    price: 79.99,
    compareAtPrice: 99.99,
    images: ['/placeholder-product.jpg'],
    category: { id: '1', name: 'Electronics', slug: 'electronics', isActive: true },
    inventory: 60,
    sku: 'FT-001',
    isFeatured: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '8',
    name: 'Yoga Mat',
    slug: 'yoga-mat',
    description: 'Premium non-slip yoga mat',
    price: 34.99,
    images: ['/placeholder-product.jpg'],
    category: { id: '3', name: 'Sports', slug: 'sports', isActive: true },
    inventory: 200,
    sku: 'YM-001',
    isFeatured: false,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'sports', name: 'Sports' },
];

const sortOptions = [
  { id: 'featured', name: 'Featured' },
  { id: 'price-low', name: 'Price: Low to High' },
  { id: 'price-high', name: 'Price: High to Low' },
  { id: 'newest', name: 'Newest' },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const filteredProducts = allProducts
    .filter((product) => {
      if (selectedCategory !== 'all' && product.category.slug !== selectedCategory) {
        return false;
      }
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
        <p className="mt-2 text-gray-600">Browse our complete collection</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Filters</h2>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category.id}
                      onChange={() => setSelectedCategory(category.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Min"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort and Results Count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} products
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {/* Products */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

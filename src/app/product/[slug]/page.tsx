'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, Heart, Share2, Truck, RefreshCw, Shield, Check, Star } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';

// Sample product data - using placeholder images
const getProductBySlug = (slug: string) => {
  const products = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      slug: 'premium-wireless-headphones',
      description: 'Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise cancellation technology, 30-hour battery life, and premium comfort for extended listening sessions. Perfect for music lovers, professionals, and anyone who demands the best audio quality.',
      price: 199.99,
      compareAtPrice: 249.99,
      images: ['/placeholder-product.jpg', '/placeholder-product.jpg', '/placeholder-product.jpg'],
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
      description: 'Stay connected and track your fitness with our advanced smartwatch. Features include heart rate monitoring, GPS tracking, sleep analysis, and smartphone notifications.',
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
  ];
  return products.find(p => p.slug === slug) || products[0];
};

const relatedProducts = [
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
    description: 'Precision wireless mouse',
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
    description: 'Track your fitness goals',
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
];

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const product = getProductBySlug(params.slug);

  const handleAddToCart = () => {
    addItem(product, undefined, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
          <li>/</li>
          <li><Link href="/shop" className="hover:text-blue-600">Shop</Link></li>
          <li>/</li>
          <li><Link href={`/shop?category=${product.category.slug}`} className="hover:text-blue-600">{product.category.name}</Link></li>
          <li>/</li>
          <li className="text-gray-900">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            <span className="text-8xl">📦</span>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex items-center justify-center ${
                  selectedImage === index ? 'border-blue-600' : 'border-transparent'
                }`}
              >
                <span className="text-2xl">📦</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm text-gray-500">(12 reviews)</span>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <>
                <span className="text-xl text-gray-500 line-through">{formatPrice(product.compareAtPrice)}</span>
                <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                  {Math.round((1 - product.price / product.compareAtPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          {/* Short Description */}
          <p className="mt-4 text-gray-600">{product.description}</p>

          {/* SKU */}
          <p className="mt-2 text-sm text-gray-500">SKU: {product.sku}</p>

          {/* Stock Status */}
          <div className="mt-4 flex items-center gap-2">
            {product.inventory > 0 ? (
              <>
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-green-600 font-medium">In Stock ({product.inventory} available)</span>
              </>
            ) : (
              <span className="text-red-500 font-medium">Out of Stock</span>
            )}
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center border border-gray-300 rounded-lg w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-gray-100 transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-6 py-2 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                className="p-3 hover:bg-gray-100 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.inventory === 0}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Heart className="h-6 w-6" />
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 className="h-6 w-6" />
            </button>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Truck className="h-6 w-6 mx-auto text-blue-600" />
              <p className="text-xs mt-1">Free Shipping</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <RefreshCw className="h-6 w-6 mx-auto text-blue-600" />
              <p className="text-xs mt-1">Easy Returns</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Shield className="h-6 w-6 mx-auto text-blue-600" />
              <p className="text-xs mt-1">Secure Payment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      </section>
    </div>
  );
}

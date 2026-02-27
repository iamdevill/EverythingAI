'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, undefined, 1);
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {/* Placeholder when no image */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
          <span className="text-4xl">📦</span>
        </div>
        
        {/* Sale Badge */}
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            SALE
          </span>
        )}

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <Eye className="h-4 w-4 text-gray-600" />
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

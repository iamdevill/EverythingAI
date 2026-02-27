'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, User, LogIn } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useAuthStore } from '@/store/authStore';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const { settings } = useSettingsStore();
  const { user } = useAuthStore();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Top Bar */}
      <div className="hidden md:flex bg-gray-900 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <p>Welcome to {settings.storeName}!</p>
          <div className="flex items-center gap-4">
            <a href={`tel:${settings.storePhone}`} className="hover:text-gray-300">
              {settings.storePhone}
            </a>
            <a href={`mailto:${settings.storeEmail}`} className="hover:text-gray-300">
              {settings.storeEmail}
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold text-gray-900">
              {settings.storeName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search */}
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5 text-gray-700" />
            </button>

            {/* Account - Logged In */}
            {user ? (
              <div className="relative">
                <button
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="hidden lg:block text-sm font-medium text-gray-700">
                    {user.firstName || user.email.split('@')[0]}
                  </span>
                </button>

                {/* Account Dropdown */}
                {isAccountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      My Account
                    </Link>
                    <Link
                      href="/account/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      Orders
                    </Link>
                    <Link
                      href="/account/wishlist"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      Wishlist
                    </Link>
                    <hr className="my-2 border-gray-200" />
                    <Link
                      href="/signin"
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      onClick={() => {
                        useAuthStore.getState().logout();
                        setIsAccountMenuOpen(false);
                      }}
                    >
                      Sign Out
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              /* Account - Logged Out */
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="hidden sm:flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="max-w-7xl mx-auto flex gap-2">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <hr className="my-2 border-gray-200" />
            {user ? (
              <>
                <Link
                  href="/account"
                  className="px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Account
                </Link>
                <Link
                  href="/signin"
                  className="px-4 py-3 text-red-600 hover:bg-red-50 font-medium"
                  onClick={() => {
                    useAuthStore.getState().logout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign Out
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-3 text-blue-600 hover:bg-blue-50 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

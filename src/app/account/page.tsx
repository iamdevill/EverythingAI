'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Package, Heart, Settings, LogOut, MapPin, CreditCard } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { createClient } from '@/lib/supabase';

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      setLoading(true);
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            firstName: session.user.user_metadata?.first_name || '',
            lastName: session.user.user_metadata?.last_name || '',
            addresses: [],
            isActive: true,
            createdAt: new Date(session.user.created_at),
            updatedAt: new Date(),
          });
        } else if (!user) {
          router.push('/signin');
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const accountSections = [
    {
      title: 'My Account',
      icon: User,
      items: [
        { name: 'Profile Information', icon: User, href: '/account/profile' },
        { name: 'Addresses', icon: MapPin, href: '/account/addresses' },
        { name: 'Payment Methods', icon: CreditCard, href: '/account/payment' },
      ],
    },
    {
      title: 'Orders',
      icon: Package,
      items: [
        { name: 'Order History', icon: Package, href: '/account/orders' },
        { name: 'Wishlist', icon: Heart, href: '/account/wishlist' },
      ],
    },
    {
      title: 'Settings',
      icon: Settings,
      items: [
        { name: 'Account Settings', icon: Settings, href: '/account/settings' },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
        <p className="mt-2 text-gray-600">
          Welcome back, {user.firstName || user.email}!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* User Info Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <Link
              href="/account/orders"
              className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition-colors"
            >
              <Package className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">My Orders</span>
            </Link>
            <Link
              href="/account/wishlist"
              className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition-colors"
            >
              <Heart className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">Wishlist</span>
            </Link>
            <Link
              href="/account/addresses"
              className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition-colors"
            >
              <MapPin className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">Addresses</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-6 py-3 hover:bg-red-50 transition-colors text-left text-red-600"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Account Sections */}
          {accountSections.map((section) => (
            <div key={section.title} className="bg-white rounded-lg border border-gray-200 mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <section.icon className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {section.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <item.icon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Recent Orders Placeholder */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            </div>
            <div className="p-6 text-center">
              <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

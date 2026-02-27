'use client';

import { Target, Heart, Award, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We are dedicated to providing the best shopping experience with quality products and exceptional customer service.
        </p>
      </section>

      {/* Our Story */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2020, we started with a simple mission: to make quality products accessible to everyone. 
            What began as a small online shop has grown into a trusted destination for shoppers seeking premium products 
            at competitive prices.
          </p>
          <p className="text-gray-600">
            We believe in the power of e-commerce to connect people with products they love. Our team works tirelessly 
            to curate the best selection, ensure fast shipping, and provide outstanding support at every step of your shopping journey.
          </p>
        </div>
        <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
          <span className="text-gray-500">Our Team Image</span>
        </div>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
            <p className="text-gray-600">To deliver exceptional value and quality to every customer, every time.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer First</h3>
            <p className="text-gray-600">Your satisfaction is our top priority. We listen and improve continuously.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
            <p className="text-gray-600">Every product is carefully selected and tested for quality.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
            <p className="text-gray-600">Building lasting relationships with customers and partners.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 text-white rounded-2xl py-16 px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">50K+</div>
            <div className="text-gray-400">Happy Customers</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">1000+</div>
            <div className="text-gray-400">Products</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">5+</div>
            <div className="text-gray-400">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">4.9</div>
            <div className="text-gray-400">Customer Rating</div>
          </div>
        </div>
      </section>
    </div>
  );
}

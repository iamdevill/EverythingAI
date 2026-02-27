// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: Category;
  variants?: ProductVariant[];
  inventory: number;
  sku: string;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string;
  price: number;
  inventory: number;
  options: {
    name: string;
    value: string;
  }[];
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive: boolean;
}

// Cart Types
export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: CartItem[];
  shippingAddress: Address;
  billingAddress: Address;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: Address[];
  createdAt: Date;
}

export interface Address {
  id: string;
  type: 'shipping' | 'billing';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: Date;
  isPublished: boolean;
}

// Page Types
export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  isPublished: boolean;
  order: number;
}

// Store Settings Types
export interface StoreSettings {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeLogo?: string;
  storeFavicon?: string;
  currency: string;
  currencySymbol: string;
  address: Address;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

// Theme Types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
  fonts: {
    heading: string;
    body: string;
  };
  borderRadius: string;
  headerStyle: 'default' | 'minimal' | 'centered';
  footerStyle: 'default' | 'minimal' | 'columns';
}

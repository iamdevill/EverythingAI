export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: Category;
  inventory: number;
  sku: string;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  price: number;
  sku: string;
  inventory: number;
  options: Array<{
    name: string;
    value: string;
  }>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  variant?: ProductVariant;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  email: string;
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  total: number;
  currency: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod?: string;
  shippingAddress: Address;
  billingAddress: Address;
  customerNote?: string;
  shippingMethod?: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  productName: string;
  variantName?: string;
  price: number;
  quantity: number;
  subtotal: number;
  createdAt: Date;
}

export interface Address {
  id: string;
  userId: string;
  type: 'shipping' | 'billing';
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  orderId: string;
  paymentIntentId?: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded';
  paymentMethodType?: string;
  paymentMethodDetails?: any;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoreSettings {
  id: string;
  storeName: string;
  storeEmail: string;
  storePhone?: string;
  storeLogo?: string;
  storeFavicon?: string;
  currency: string;
  currencySymbol: string;
  taxRate: number;
  shippingEnabled: boolean;
  freeShippingThreshold: number;
  defaultShippingCost: number;
  address?: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  themeColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderRequest {
  cartItems: Array<{
    productId: string;
    variantId?: string;
    quantity: number;
  }>;
  shippingAddress: Omit<Address, 'id' | 'userId' | 'isDefault' | 'createdAt' | 'updatedAt'>;
  billingAddress?: Omit<Address, 'id' | 'userId' | 'isDefault' | 'createdAt' | 'updatedAt'>;
  customerNote?: string;
  shippingMethod?: string;
  email: string;
}

export interface UpdateOrderRequest {
  id?: string;
  orderId?: string;
  status?: Order['status'];
  paymentStatus?: Order['paymentStatus'];
  trackingNumber?: string;
  estimatedDelivery?: Date;
}

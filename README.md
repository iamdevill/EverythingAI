# E-Commerce Store

A full-featured e-commerce platform built with Next.js, TypeScript, Tailwind CSS, and Supabase. This project is designed to be similar to Zoho Commerce with product management, shopping cart, user authentication, and payment integration capabilities.

## 🚀 Tech Stack

- **Frontend**: Next.js 16 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Database & Auth**: Supabase
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## ✅ Features Completed

### Core Pages
- [x] Home Page - Hero section, featured products, categories, newsletter
- [x] Shop Page - Product listing with filters (category, price) and sorting
- [x] Product Detail Page - Image gallery, product info, add to cart
- [x] Cart Page - Full cart management with quantity controls
- [x] Checkout Page - Multi-step checkout (shipping → payment → review)
- [x] About Page - Company info, values, statistics
- [x] Contact Page - Contact form with store details
- [x] Blog Page - Blog listing

### Authentication
- [x] Sign Up - Email/password registration with validation
- [x] Sign In - Email/password login
- [x] Google OAuth - Sign in with Google
- [x] Account Dashboard - User profile, orders link, sign out

### UI Components
- [x] Responsive Header - Navigation, search, user menu, cart icon
- [x] Footer - Company info, quick links, contact details
- [x] Announcement Bar - Promotional messages with dismiss
- [x] Cookie Consent - GDPR-compliant cookie banner
- [x] Product Card - Image, price, add to cart button

## 📋 Next Steps to Complete

### 1. Zoho Books Integration (Product Sync)
**Goal**: Fetch products from Zoho Books and sync to database with real-time updates

**Steps**:
1. Get Zoho Books API credentials from Zoho Developer Console
2. Create Zoho API service (`src/lib/zoho.ts`)
3. Implement product fetch and import logic
4. Set up Supabase database tables for products
5. Create sync mechanism (webhook or scheduled job)
6. Keep products updated in real-time

**Files to create**:
- `src/lib/zoho.ts` - Zoho Books API client
- `src/app/api/sync-products/route.ts` - Sync endpoint
- Database migration for products table

### 2. Checkout Confirmation Page
**Goal**: Create order confirmation page after successful payment

**Steps**:
1. Create order confirmation page (`/order-confirmation`)
2. Display order details (order number, items, total)
3. Show shipping/tracking information
4. Send confirmation email (optional)
5. Clear cart after successful order

**Files to create**:
- `src/app/order-confirmation/page.tsx`

### 3. Payment Integration (Stripe)
**Goal**: Add Stripe payment processing

**Steps**:
1. Get Stripe API keys from Stripe Dashboard
2. Install Stripe packages: `npm install @stripe/stripe-js @stripe/react-stripe-js stripe`
3. Create Stripe service (`src/lib/stripe.ts`)
4. Create payment intent API route
5. Update checkout page with Stripe Elements
6. Handle payment success/failure
7. Store payment records in database

**Files to create**:
- `src/lib/stripe.ts` - Stripe configuration
- `src/app/api/create-payment-intent/route.ts` - Payment intent endpoint
- Update `src/app/checkout/page.tsx`

### 4. Database Schema Setup
**Goal**: Set up complete Supabase database schema

**Tables needed**:
- `products` - Product catalog from Zoho Books
- `orders` - Customer orders
- `order_items` - Individual items in orders
- `addresses` - User shipping/billing addresses
- `payments` - Payment records
- `wishlist` - User wishlists

**Steps**:
1. Create SQL migration file
2. Set up Row Level Security (RLS) policies
3. Configure database relationships

### 5. Complete Account Pages
**Goal**: Add remaining account functionality

**Pages to create**:
- `/account/orders` - Order history with status
- `/account/wishlist` - Saved products
- `/account/addresses` - Address book management
- `/account/settings` - Account settings

## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/iamdevill/EverythingAI.git
cd ecommerce-store
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file with your credentials:

```env
# Supabase (get from https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Zoho Books (get from https://api-console.zoho.com/)
ZOHO_CLIENT_ID=your-zoho-client-id
ZOHO_CLIENT_SECRET=your-zoho-client-secret
ZOHO_ORGANIZATION_ID=your-organization-id

# Stripe (get from https://dashboard.stripe.com/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### 4. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the database migrations
3. Enable Google OAuth in Authentication → Providers
4. Get your API keys and add to `.env.local`

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ecommerce-store/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── account/            # Account dashboard
│   │   ├── checkout/           # Checkout page
│   │   ├── cart/               # Shopping cart
│   │   ├── shop/               # Product listing
│   │   ├── product/            # Product detail
│   │   ├── signin/             # Sign in page
│   │   ├── signup/             # Sign up page
│   │   └── ...
│   ├── components/             # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   └── ...
│   ├── lib/                    # Utility functions & services
│   │   ├── supabase.ts         # Supabase client
│   │   ├── stripe.ts           # Stripe (to be added)
│   │   ├── zoho.ts             # Zoho Books (to be added)
│   │   └── utils.ts
│   ├── store/                  # Zustand stores
│   │   ├── authStore.ts        # Authentication state
│   │   ├── cartStore.ts        # Shopping cart
│   │   └── settingsStore.ts    # Store settings
│   └── types/                  # TypeScript types
│       └── index.ts
├── .env.local                  # Environment variables
├── package.json
└── README.md
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

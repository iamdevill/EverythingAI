# EverythingAI Deployment Guide for Render

This guide will help you deploy your EverythingAI e-commerce application to Render using GitHub integration.

## 📋 Pre-requisites

1. **GitHub Account** - Your code is already on GitHub at `https://github.com/iamdevill/EverythingAI`
2. **Render Account** - Sign up at https://render.com
3. **Supabase Account** - You already have this configured
4. **Stripe Account** - Optional for payments (you have test keys configured)

## 🚀 Step-by-Step Deployment Process

### Step 1: Prepare Your Repository

Your repository is already up-to-date with the latest code including:
- Product management system
- Order management system  
- Admin panel with multiple tabs
- Database schema and APIs

### Step 2: Set Up Supabase Database (Production)

1. Go to https://supabase.com and open your project dashboard
2. Create a new project for production or use existing one
3. **Important**: Copy the production database URL and API keys
4. Run the schema migration:

```sql
-- Apply the schema from database/schema.sql to your production database
-- You can do this in Supabase SQL Editor or via command line
```

### Step 3: Deploy to Render

#### Option A: Web Service Deployment

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Create New Web Service**
   - Connect your GitHub account
   - Select the repository: `iamdevill/EverythingAI`
   - Choose branch: `master`

3. **Configure Service Settings**
   - **Name**: `everythingai` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Select free tier to start

4. **Set Environment Variables**
   Add these environment variables in Render dashboard:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-production-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_xxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=sb_service_role_xxxxxxxxxx

# Stripe Configuration (Optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxx

# Next.js Configuration
NODE_ENV=production
```

#### Option B: Static Site Deployment (Alternative)

Since this is a Next.js app, Render can also deploy it as a static site:

1. **Create Static Site** in Render
2. **Build Command**: `npm run build`
3. **Publish Directory**: `out` (add `output: 'export'` to next.config.ts)

### Step 4: Configure Custom Domain (Optional)

1. In Render dashboard, go to your service settings
2. Click "Add Custom Domain"
3. Follow the DNS configuration instructions

## 🔧 Environment Variables Checklist

Create a `.env.production` file for reference:

```env
# Supabase - Production
NEXT_PUBLIC_SUPABASE_URL=https://your-production-url.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_xxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=sb_service_role_xxxxxxxxxx

# Stripe - Production (get from Stripe dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxx

# Next.js
NODE_ENV=production
```

## 📊 Database Migration

**Important**: Your production database needs the schema from `database/schema.sql`. You can:

1. **Manual Migration**: Copy and paste the SQL into Supabase SQL Editor
2. **Command Line**: Use pg_dump and pg_restore
3. **Supabase Migration Tool**: Use Supabase CLI for migrations

```bash
# Install Supabase CLI
npm install -g supabase

# Run migration
supabase db push
```

## 🛠️ Build Configuration

Your `package.json` is already configured correctly:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build", 
    "start": "next start",
    "lint": "eslint"
  }
}
```

## 🔍 Testing Deployment

After deployment, test these endpoints:

1. **Homepage**: `https://your-render-url.onrender.com`
2. **Products API**: `https://your-render-url.onrender.com/api/products`
3. **Orders API**: `https://your-render-url.onrender.com/api/orders`
4. **Admin Panel**: `https://your-render-url.onrender.com/admin`

## 🚨 Troubleshooting

### Common Issues:

1. **Environment Variables**: Double-check all Supabase keys are correct
2. **Database Connection**: Ensure production Supabase URL is configured
3. **Build Errors**: Check Render logs for specific error messages
4. **CORS Issues**: Verify Supabase CORS settings include your Render URL

### Render Logs Access:

1. Go to your Render service dashboard
2. Click on "Logs" tab
3. Check for build errors or runtime issues

## 📈 Monitoring and Maintenance

1. **Auto-deploy**: Render automatically deploys on git push to master
2. **Health checks**: Render monitors your service automatically
3. **Scaling**: Upgrade plan if you need more resources
4. **Backups**: Supabase handles database backups automatically

## 🔄 Continuous Deployment Setup

Your GitHub repository is already connected. Every time you push to master:
1. Render automatically detects changes
2. Runs `npm install && npm run build`
3. Deploys the new version
4. Routes traffic to the new deployment

## 💡 Additional Tips

1. **Environment Separation**: Consider using separate Supabase projects for dev/staging/prod
2. **CDN**: Render automatically provides CDN for static assets
3. **SSL**: Free SSL certificates are included
4. **Performance**: Use Render's performance monitoring tools

## 📞 Support Resources

- **Render Documentation**: https://render.com/docs
- **Supabase Documentation**: https://supabase.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment

---

**Your application is production-ready!** The order management system, product catalog, and admin panel are fully functional. Once deployed, you'll have a complete e-commerce platform running on Render.
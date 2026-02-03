# Stripe E-commerce Setup Guide

## Overview
Your pricing page now has a complete shopping cart and checkout system with Stripe integration. Customers can purchase your services directly online with automatic recurring billing.

## What's Been Implemented

### 1. Shopping Cart System
- **Cart State Management** (`public/js/cart.js`)
  - Stores cart in localStorage (persists across page refreshes)
  - Enforces business rules: only one item per category
  - Auto-includes free hosting when SEO is selected
  
### 2. Cart UI
- **Cart Sidebar** (`src/components/CartSidebar.astro`)
  - Slides in from right when "Add to Cart" is clicked
  - Shows all items, totals, and "FREE Hosting" badge
  - Cart badge in navigation shows item count
  
### 3. Checkout Flow
- **Pricing Page** → Add items to cart
- **Checkout Page** (`/checkout`) → Review order + enter info
- **Stripe Checkout** → Secure payment processing
- **Success Page** (`/success`) → Order confirmation
- **Cancel Page** (`/cancel`) → Return if cancelled

### 4. Business Rules Enforced
- ✅ Only ONE item per category (can't add multiple SEO tiers)
- ✅ SEO packages include FREE hosting automatically
- ✅ Can't add standalone hosting if SEO is in cart
- ✅ If SEO removed, hosting "included" flag is removed

## Required Setup Steps

### Step 1: Create Stripe Account
1. Go to https://stripe.com and sign up
2. Complete account verification
3. Get your API keys from: https://dashboard.stripe.com/apikeys

### Step 2: Configure Environment Variables
Update `.env.local` with your Stripe keys:

```env
# Test mode keys (for development)
STRIPE_SECRET_KEY=sk_test_...
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# When ready for production, use live keys:
# STRIPE_SECRET_KEY=sk_live_...
# PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### Step 3: Create Products in Stripe Dashboard

Go to https://dashboard.stripe.com/products and create:

**One-time Products:**
- Web Design - Authority Website: $4,995

**Recurring Products (monthly):**
- Local SEO - The Foundation: $500/month
- Local SEO - The Growth Engine: $1,250/month
- Local SEO - Market Dominance: $2,000/month
- WordPress Support - Technical Plan: $99/month
- WordPress Support - Content Plan: $249/month
- WordPress Support - VIP Plan: $499/month
- Managed Hosting - Sleep at Night Protocol: $75/month (or $0 when bundled)

**After creating each product:**
1. Copy the Price ID (starts with `price_...`)
2. Update `.env.local` with the corresponding price IDs

### Step 4: Test the System

1. Start dev server: `npm run dev`
2. Go to http://localhost:4321/pricing
3. Add items to cart (try different combinations)
4. Verify business rules:
   - Can only add one SEO tier at a time
   - SEO packages show "Free Hosting" badge
   - Can't add hosting separately if SEO is in cart
5. Proceed to checkout
6. Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any billing ZIP code

### Step 5: Go Live

When ready for production:
1. Activate your Stripe account (complete verification)
2. Create live products (same as test, but in live mode)
3. Update `.env.local` with live API keys
4. Deploy to your production environment
5. Ensure `.env.local` is in `.gitignore` (it should be)

## How It Works

### Customer Flow
1. **Browse pricing** → Select items from each category
2. **Add to cart** → Click "Add to Cart" on any pricing tier
3. **Review cart** → Cart sidebar opens automatically
4. **Checkout** → Click "Proceed to Checkout"
5. **Enter info** → Fill out customer details
6. **Payment** → Redirected to Stripe's secure checkout
7. **Success** → Confirmation page + email receipt

### Mixed Checkout Handling
The system handles three scenarios:
- **One-time only** (Web Design) → Stripe payment mode
- **Subscription only** (SEO/Support/Hosting) → Stripe subscription mode
- **Mixed** (Web Design + SEO) → Subscription mode (one-time items currently skipped)

⚠️ **Note:** Mixing one-time and subscription items in Stripe Checkout is complex. Current implementation handles subscriptions. For production, consider:
1. Two-step checkout (charge one-time first, then create subscription)
2. Use Stripe's invoice system with setup fees
3. Build custom checkout with Stripe Elements

## Testing Payment Scenarios

### Test Cards (Stripe provides these)
- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **3D Secure:** 4000 0025 0000 3155
- **Insufficient funds:** 4000 0000 0000 9995

See all test cards: https://stripe.com/docs/testing

## Important Notes

1. **Environment Security:** Never commit `.env.local` to git
2. **Webhook Setup:** For production, set up Stripe webhooks to handle:
   - Payment success events
   - Subscription cancellations
   - Failed payments
3. **Email Notifications:** Consider adding email confirmations after purchase
4. **Tax Compliance:** Add tax calculation if required in your jurisdiction
5. **Customer Portal:** Stripe provides a customer portal for managing subscriptions

## Support

If you need help:
- Stripe docs: https://stripe.com/docs
- Stripe support: https://support.stripe.com
- Test mode: Use test API keys to safely test everything before going live

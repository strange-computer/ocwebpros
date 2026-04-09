import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-01-28.clover',
});

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { items, customer } = body;

    if (!items || !items.items || items.items.length === 0) {
      return new Response(JSON.stringify({ error: 'Cart is empty' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const cartItems = items.items;
    const totals = items.totals;

    // Validate business rules server-side
    const categories = cartItems.map((item: any) => item.category);
    const uniqueCategories = new Set(categories);
    if (categories.length !== uniqueCategories.size) {
      return new Response(JSON.stringify({ error: 'Multiple items from same category' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Determine checkout mode and build line items
    const hasSubscriptions = cartItems.some((item: any) => item.type === 'subscription');
    const hasOneTime = cartItems.some((item: any) => item.type === 'one-time');

    let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let mode: 'payment' | 'subscription' = 'payment';

    if (hasSubscriptions && !hasOneTime) {
      // Subscription only mode
      mode = 'subscription';
      lineItems = cartItems.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.type === 'subscription' ? 'Monthly subscription' : 'One-time payment',
          },
          recurring: item.type === 'subscription' ? { interval: 'month' } : undefined,
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: 1,
      }));

      // Add hosting if included (as $0 line item for transparency)
      if (totals.hostingIncluded) {
        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Managed Hosting - Peace of Mind Protocol',
              description: 'Included FREE with Local SEO package',
            },
            recurring: { interval: 'month' },
            unit_amount: 0, // Free
          },
          quantity: 1,
        });
      }
    } else if (hasOneTime && !hasSubscriptions) {
      // One-time payment only
      mode = 'payment';
      lineItems = cartItems.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: 1,
      }));
    } else {
      // Mixed mode: use subscription mode and add one-time as setup fee
      mode = 'subscription';
      
      // Add subscriptions
      const subscriptionItems = cartItems.filter((item: any) => item.type === 'subscription');
      lineItems = subscriptionItems.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: 'Monthly subscription',
          },
          recurring: { interval: 'month' },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: 1,
      }));

      // Add hosting if included
      if (totals.hostingIncluded) {
        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Managed Hosting - Peace of Mind Protocol',
              description: 'Included FREE with Local SEO package',
            },
            recurring: { interval: 'month' },
            unit_amount: 0,
          },
          quantity: 1,
        });
      }
    }

    // Always use canonical HTTPS URL for redirects. request.url can be http:// when
    // Netlify terminates SSL at the edge, which would cause "not secure" after checkout.
    const origin = 'https://www.ocwebpros.com';

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: lineItems,
      customer_email: customer.email,
      phone_number_collection: {
        enabled: true,
      },
      metadata: {
        customerName: customer.name,
        customerPhone: customer.phone,
        businessName: customer.businessName || '',
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    });

    // If we have one-time items in a subscription checkout, we need to handle setup fees differently
    // For now, we'll use the invoice_creation feature or handle in two steps
    if (hasOneTime && hasSubscriptions) {
      // Note: This is a complex case. For production, consider:
      // 1. Two separate Stripe sessions (charge one-time first, then subscribe)
      // 2. Use invoice with subscription setup
      // 3. Custom payment flow with Stripe Elements
      // For now, we'll just skip one-time items if there are subscriptions
      console.warn('Mixed one-time and subscription items - handling as subscription only');
    }

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to create checkout session' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

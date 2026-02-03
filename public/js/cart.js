// Shopping Cart State Management
// Business Rules:
// 1. Only one item per category (web-design, seo, support, hosting)
// 2. When SEO is added, hosting is marked as "included" (free)
// 3. When SEO is removed, hosting "included" flag is removed

const CART_KEY = 'lfw_cart';
const CATEGORIES = {
  WEB_DESIGN: 'web-design',
  SEO: 'seo',
  SUPPORT: 'support',
  HOSTING: 'hosting'
};

class ShoppingCart {
  constructor() {
    this.items = this.loadCart();
    this.listeners = [];
  }

  // Load cart from localStorage
  loadCart() {
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error loading cart:', e);
      return [];
    }
  }

  // Save cart to localStorage
  saveCart() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(this.items));
      this.notifyListeners();
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }

  // Add listener for cart changes
  onChange(callback) {
    this.listeners.push(callback);
  }

  // Notify all listeners of cart changes
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.items));
  }

  // Check if category already has an item
  hasCategory(category) {
    return this.items.some(item => item.category === category);
  }

  // Get item by category
  getItemByCategory(category) {
    return this.items.find(item => item.category === category);
  }

  // Check if SEO is in cart
  hasSEO() {
    return this.items.some(item => item.category === CATEGORIES.SEO);
  }

  // Add item to cart with business rules validation
  addItem(item) {
    const { id, name, price, category, type, interval, stripeId } = item;

    // Validate required fields
    if (!id || !name || price === undefined || !category || !type) {
      console.error('Invalid item:', item);
      return { success: false, message: 'Invalid item data' };
    }

    // Business Rule: Only one item per category
    const existingInCategory = this.getItemByCategory(category);
    if (existingInCategory) {
      // Replace the existing item in this category
      this.removeItem(existingInCategory.id);
    }

    // Special Rule: Can't add hosting if SEO is in cart (it's included)
    if (category === CATEGORIES.HOSTING && this.hasSEO()) {
      return { 
        success: false, 
        message: 'Hosting is included free with your SEO package!' 
      };
    }

    // Add the item
    this.items.push({
      id,
      name,
      price: parseFloat(price),
      category,
      type, // 'one-time' or 'subscription'
      interval: interval || null, // 'month' or null
      stripeId: stripeId || null,
      addedAt: Date.now()
    });

    // Special Rule: If SEO was just added, mark hosting as included
    if (category === CATEGORIES.SEO) {
      // Remove standalone hosting if it exists (replace with included version)
      const standaloneHosting = this.getItemByCategory(CATEGORIES.HOSTING);
      if (standaloneHosting) {
        this.removeItem(standaloneHosting.id);
      }
    }

    this.saveCart();
    return { success: true, message: 'Added to cart' };
  }

  // Remove item from cart
  removeItem(id) {
    const item = this.items.find(i => i.id === id);
    this.items = this.items.filter(i => i.id !== id);
    
    // Special Rule: If SEO was removed, hosting is no longer included
    // (User would need to add hosting separately if they want it)
    if (item && item.category === CATEGORIES.SEO) {
      // Just remove the included flag - don't auto-add hosting
      // User can manually add if needed
    }

    this.saveCart();
    return { success: true };
  }

  // Get all items
  getItems() {
    return this.items;
  }

  // Get cart count
  getCount() {
    return this.items.length;
  }

  // Check if hosting should be shown as included
  isHostingIncluded() {
    return this.hasSEO();
  }

  // Calculate totals
  getTotals() {
    let oneTimeTotal = 0;
    let monthlyTotal = 0;

    this.items.forEach(item => {
      if (item.type === 'one-time') {
        oneTimeTotal += item.price;
      } else if (item.type === 'subscription') {
        monthlyTotal += item.price;
      }
    });

    // Add hosting value if included with SEO
    const hostingIncluded = this.isHostingIncluded();
    const hostingValue = hostingIncluded ? 75 : 0;

    return {
      oneTime: oneTimeTotal,
      monthly: monthlyTotal,
      hostingIncluded,
      hostingValue,
      totalMonthly: monthlyTotal + (hostingIncluded ? 0 : 0) // Hosting is free when included
    };
  }

  // Clear cart
  clearCart() {
    this.items = [];
    this.saveCart();
    return { success: true };
  }

  // Get formatted cart for checkout
  getCheckoutData() {
    const totals = this.getTotals();
    return {
      items: this.items,
      totals,
      hostingIncluded: totals.hostingIncluded
    };
  }
}

// Create global cart instance
window.cart = new ShoppingCart();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ShoppingCart;
}

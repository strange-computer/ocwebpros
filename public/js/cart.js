// Shopping Cart State Management
// Business Rules:
// 1. Only one item per category (web-design, seo, support, hosting)

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

  // Add item to cart with business rules validation
  addItem(item) {
    const { id, name, price, category, type, interval } = item;

    // Validate required fields
    if (!id || !name || price === undefined || !category || !type) {
      console.error('Invalid item:', item);
      return { success: false, message: 'Invalid item data' };
    }

    // Business Rule: Only one item per category
    const existingInCategory = this.getItemByCategory(category);
    if (existingInCategory) {
      this.removeItem(existingInCategory.id);
    }

    // Add the item
    this.items.push({
      id,
      name,
      price: parseFloat(price),
      category,
      type, // 'one-time' or 'subscription'
      interval: interval || null, // 'month' or null
      addedAt: Date.now()
    });

    this.saveCart();
    return { success: true, message: 'Added to cart' };
  }

  // Remove item from cart
  removeItem(id) {
    this.items = this.items.filter(i => i.id !== id);
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

    return {
      oneTime: oneTimeTotal,
      monthly: monthlyTotal
    };
  }

  // Clear cart
  clearCart() {
    this.items = [];
    this.saveCart();
    return { success: true };
  }

}

// Create global cart instance
window.cart = new ShoppingCart();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ShoppingCart;
}

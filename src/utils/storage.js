export const STORAGE_KEYS = {
  cart: 'store_cart',
  wishlist: 'store_wishlist',
  promoCode: 'store_promo_code',
  recentViewed: 'store_recent_viewed'
};

export const readStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors in private mode or full quota conditions.
  }
};

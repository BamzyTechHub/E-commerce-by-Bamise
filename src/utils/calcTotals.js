export const SHIPPING_FEE = 8.5;
export const TAX_RATE = 0.075;
export const PROMO_CODES = {
  SAVE10: 0.1
};

export const calculateSubtotal = (cartItems) =>
  cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const calculateDiscount = (subtotal, promoCode) => {
  const rate = PROMO_CODES[promoCode] || 0;
  return subtotal * rate;
};

export const calculateTotals = (cartItems, promoCode) => {
  const subtotal = calculateSubtotal(cartItems);
  const discount = calculateDiscount(subtotal, promoCode);
  const taxable = Math.max(subtotal - discount, 0);
  const shipping = cartItems.length > 0 ? SHIPPING_FEE : 0;
  const tax = taxable * TAX_RATE;
  const total = taxable + shipping + tax;

  return { subtotal, discount, shipping, tax, total };
};

import { Link } from 'react-router-dom';
import QuantitySelector from '../components/QuantitySelector';
import Price from '../components/Price';
import { useStore } from '../context/storeContext';
import { PROMO_CODES } from '../utils/calcTotals';
import { useState } from 'react';

const Cart = () => {
  const {
    cart,
    promoCode,
    totals,
    incrementQty,
    decrementQty,
    removeFromCart,
    clearCart,
    applyPromo,
    clearPromo,
    notify
  } = useStore();

  const [promoInput, setPromoInput] = useState(promoCode);

  const handleApplyPromo = () => {
    const normalized = promoInput.trim().toUpperCase();
    if (!PROMO_CODES[normalized]) {
      notify('Invalid promo code', 'error');
      return;
    }

    applyPromo(normalized);
    notify(`Promo code ${normalized} applied`, 'success');
  };

  if (cart.length === 0) {
    return (
      <section className="container page-stack">
        <h1>Cart</h1>
        <p className="state-card">Your cart is empty.</p>
        <Link to="/shop" className="btn btn-primary">
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="container page-stack">
      <div className="section-head">
        <h1>Cart</h1>
        <button type="button" className="btn btn-outline" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {cart.map((item) => (
            <article key={item.id} className="cart-item">
              <img src={item.images[0]} alt={item.title} />
              <div>
                <h2>{item.title}</h2>
                <p>{item.category}</p>
                <Price value={item.price} className="price" />
                <QuantitySelector
                  value={item.quantity}
                  min={1}
                  max={item.stock}
                  onDecrease={() => decrementQty(item.id)}
                  onIncrease={() => incrementQty(item.id)}
                />
                <button type="button" className="text-btn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="summary-card">
          <h2>Order Summary</h2>

          <label htmlFor="promo-code">Promo code</label>
          <div className="promo-row">
            <input
              id="promo-code"
              type="text"
              value={promoInput}
              onChange={(event) => setPromoInput(event.target.value)}
              placeholder="SAVE10"
            />
            <button type="button" className="btn btn-outline" onClick={handleApplyPromo}>
              Apply
            </button>
          </div>

          {promoCode ? (
            <button type="button" className="text-btn" onClick={clearPromo}>
              Clear promo ({promoCode})
            </button>
          ) : null}

          <div className="summary-row">
            <span>Subtotal</span>
            <Price value={totals.subtotal} />
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <Price value={totals.shipping} />
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <Price value={totals.tax} />
          </div>
          <div className="summary-row">
            <span>Discount</span>
            <span>-<Price value={totals.discount} /></span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <Price value={totals.total} />
          </div>

          <Link to="/checkout" className="btn btn-primary">
            Go to Checkout
          </Link>
        </aside>
      </div>
    </section>
  );
};

export default Cart;

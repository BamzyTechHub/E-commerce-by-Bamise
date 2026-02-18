import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useStore } from '../context/storeContext';
import Price from '../components/Price';

const emptyForm = {
  name: '',
  email: '',
  address: '',
  city: '',
  country: ''
};

const Checkout = () => {
  const { cart, totals, placeOrder, notify } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = 'Name is required.';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Valid email is required.';
    if (!form.address.trim()) nextErrors.address = 'Address is required.';
    if (!form.city.trim()) nextErrors.city = 'City is required.';
    if (!form.country.trim()) nextErrors.country = 'Country is required.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      notify('Please fix form errors before placing order', 'error');
      return;
    }

    placeOrder();
    setOrderPlaced(true);
    notify('Order placed successfully', 'success');
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <section className="container page-stack">
        <h1>Checkout</h1>
        <p className="state-card">Your cart is empty. Add items before checkout.</p>
        <Link to="/shop" className="btn btn-primary">
          Back to Shop
        </Link>
      </section>
    );
  }

  if (orderPlaced) {
    return (
      <section className="container page-stack">
        <h1>Order Confirmed</h1>
        <p className="state-card">Thank you for your purchase. Your order has been placed successfully.</p>
        <button type="button" className="btn btn-primary" onClick={() => navigate('/shop')}>
          Continue Shopping
        </button>
      </section>
    );
  }

  return (
    <section className="container page-stack">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form className="summary-card" onSubmit={handleSubmit} noValidate>
          <h2>Shipping Details</h2>

          <div className="field-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            />
            {errors.name ? <small className="error">{errors.name}</small> : null}
          </div>

          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            />
            {errors.email ? <small className="error">{errors.email}</small> : null}
          </div>

          <div className="field-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              value={form.address}
              onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
            />
            {errors.address ? <small className="error">{errors.address}</small> : null}
          </div>

          <div className="field-group">
            <label htmlFor="city">City</label>
            <input
              id="city"
              value={form.city}
              onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))}
            />
            {errors.city ? <small className="error">{errors.city}</small> : null}
          </div>

          <div className="field-group">
            <label htmlFor="country">Country</label>
            <input
              id="country"
              value={form.country}
              onChange={(event) => setForm((prev) => ({ ...prev, country: event.target.value }))}
            />
            {errors.country ? <small className="error">{errors.country}</small> : null}
          </div>

          <button type="submit" className="btn btn-primary">
            Place Order
          </button>
        </form>

        <aside className="summary-card">
          <h2>Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="summary-row">
              <span>
                {item.title} x {item.quantity}
              </span>
              <Price value={item.price * item.quantity} />
            </div>
          ))}
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
          <div className="summary-row total">
            <span>Total</span>
            <Price value={totals.total} />
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Checkout;

import { useEffect, useState } from 'react';
import { useStore } from '../context/storeContext';

const POPUP_KEY = 'retention_popup_closed';

const RetentionPopup = () => {
  const { notify } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const closed = localStorage.getItem(POPUP_KEY);
    if (closed === 'true') {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem(POPUP_KEY, 'true');
  };

  const submitForm = (event) => {
    event.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      notify('Enter a valid email address', 'error');
      return;
    }

    localStorage.setItem('retention_email', email.trim());
    notify('Thanks for subscribing. Welcome discount unlocked.', 'success');
    closePopup();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-overlay" role="dialog" aria-modal="true" aria-label="Subscription popup">
      <div className="popup-card">
        <button type="button" className="popup-close" onClick={closePopup} aria-label="Close popup">
          x
        </button>
        <p className="eyebrow">Retention Offer</p>
        <h3>Get 10% off your first order</h3>
        <p>Join our updates and receive product drops, deals, and curated picks every week.</p>
        <form onSubmit={submitForm} className="popup-form">
          <label htmlFor="popup-email">Email address</label>
          <input
            id="popup-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />
          <button type="submit" className="btn btn-primary">
            Claim Offer
          </button>
        </form>
      </div>
    </div>
  );
};

export default RetentionPopup;

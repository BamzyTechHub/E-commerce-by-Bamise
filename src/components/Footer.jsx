import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <section>
          <p className="brand footer-brand">ShopSphere</p>
          <p>Premium lifestyle commerce experience for skincare, tech, fashion, and fitness.</p>
          <p className="creator">Created by OLOYEDE BAMISE EZEKIEL</p>
        </section>

        <section>
          <h3>Explore</h3>
          <div className="footer-links">
            <Link to="/shop">Shop</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/checkout">Checkout</Link>
          </div>
        </section>

        <section>
          <h3>Support</h3>
          <div className="footer-links">
            <Link to="/contact">Contact</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/form">Request Form</Link>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;

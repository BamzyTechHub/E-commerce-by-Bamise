import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useStore } from '../context/storeContext';

const Home = () => {
  const { products, recentViewed } = useStore();
  const [loading] = useState(false);

  const featured = useMemo(() => [...products].sort((a, b) => b.rating - a.rating).slice(0, 4), [products]);
  const recentProducts = useMemo(
    () => recentViewed.map((id) => products.find((product) => product.id === id)).filter(Boolean),
    [recentViewed, products]
  );

  return (
    <section className="container page-stack">
      <section className="hero">
        <p className="eyebrow">Curated Marketplace</p>
        <h1>Shop premium picks built for modern everyday living</h1>
        <p>
          Explore skincare, electronics, fashion, and fitness essentials with a fast cart, smooth checkout,
          and personalized shopping flow.
        </p>
        <div className="inline-actions">
          <Link to="/shop" className="btn btn-primary">
            Explore Shop
          </Link>
          <Link to="/form" className="btn btn-outline btn-light">
            Send Request
          </Link>
        </div>
      </section>

      <section className="feature-strip">
        <article>
          <h3>Fast Checkout</h3>
          <p>Quick totals, promo support, and clear order summary.</p>
        </article>
        <article>
          <h3>Wishlist Sync</h3>
          <p>Save products and move them to cart in one click.</p>
        </article>
        <article>
          <h3>Retention Ready</h3>
          <p>Email popup captures leads and keeps users engaged.</p>
        </article>
      </section>

      <section>
        <div className="section-head">
          <h2>Featured Products</h2>
        </div>

        {loading ? (
          <p className="state-card">Loading featured products...</p>
        ) : (
          <div className="product-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="section-head">
          <h2>Recently Viewed</h2>
        </div>

        {recentProducts.length === 0 ? (
          <p className="state-card">You have not viewed any product yet.</p>
        ) : (
          <div className="product-grid">
            {recentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </section>
  );
};

export default Home;

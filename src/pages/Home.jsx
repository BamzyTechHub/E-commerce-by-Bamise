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
        <p className="eyebrow">Modern Essentials</p>
        <h1>Discover products that elevate your everyday routine</h1>
        <p>Shop skincare, electronics, fashion, and fitness gear from one clean storefront.</p>
        <Link to="/shop" className="btn btn-primary">
          Explore Shop
        </Link>
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

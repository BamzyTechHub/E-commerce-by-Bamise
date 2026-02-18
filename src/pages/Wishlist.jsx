import { Link } from 'react-router-dom';
import { useStore } from '../context/storeContext';
import Price from '../components/Price';

const Wishlist = () => {
  const { wishlist, toggleWishlist, moveWishlistToCart, notify } = useStore();

  if (wishlist.length === 0) {
    return (
      <section className="container page-stack">
        <h1>Wishlist</h1>
        <p className="state-card">Your wishlist is empty.</p>
        <Link to="/shop" className="btn btn-primary">
          Explore Products
        </Link>
      </section>
    );
  }

  return (
    <section className="container page-stack">
      <h1>Wishlist</h1>
      <div className="list-stack">
        {wishlist.map((item) => (
          <article key={item.id} className="wishlist-item">
            <img src={item.images[0]} alt={item.title} />
            <div>
              <h2>{item.title}</h2>
              <p>{item.category}</p>
              <Price value={item.price} className="price" />
            </div>
            <div className="inline-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  moveWishlistToCart(item.id);
                  notify(`${item.title} moved to cart`, 'success');
                }}
              >
                Move to Cart
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  toggleWishlist(item);
                  notify(`${item.title} removed from wishlist`, 'info');
                }}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Wishlist;

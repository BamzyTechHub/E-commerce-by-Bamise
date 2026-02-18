import { Link } from 'react-router-dom';
import { useStore } from '../context/storeContext';
import Price from './Price';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist, notify } = useStore();
  const inWishlist = wishlist.some((item) => item.id === product.id);

  const handleQuickAdd = () => {
    addToCart(product, 1);
    notify(`${product.title} added to cart`, 'success');
  };

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img src={product.images[0]} alt={product.title} loading="lazy" />
      </Link>

      <div className="product-content">
        <p className="category-tag">{product.category}</p>
        <Link to={`/product/${product.id}`} className="product-title-link">
          <h3>{product.title}</h3>
        </Link>
        <p className="rating">Rating: {product.rating.toFixed(1)} / 5</p>
        <Price value={product.price} className="price" />

        <div className="product-actions">
          <button type="button" className="btn btn-primary" onClick={handleQuickAdd}>
            Quick Add
          </button>
          <button
            type="button"
            className="btn btn-outline"
            aria-pressed={inWishlist}
            onClick={() => {
              toggleWishlist(product);
              notify(
                inWishlist ? `${product.title} removed from wishlist` : `${product.title} added to wishlist`,
                'info'
              );
            }}
          >
            {inWishlist ? 'Wishlisted' : 'Wishlist'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

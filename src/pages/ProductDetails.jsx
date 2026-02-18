import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import QuantitySelector from '../components/QuantitySelector';
import ProductCard from '../components/ProductCard';
import Price from '../components/Price';
import { useStore } from '../context/storeContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { products, addToCart, toggleWishlist, wishlist, addRecentView, notify } = useStore();

  const productId = Number(id);
  const product = products.find((item) => item.id === productId);
  const inWishlist = product ? wishlist.some((item) => item.id === product.id) : false;

  const [activeImage, setActiveImage] = useState(product?.images[0] || '');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
      setQuantity(1);
      addRecentView(product.id);
    }
  }, [product, addRecentView]);

  const relatedProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    return products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
  }, [product, products]);

  if (!product) {
    return (
      <section className="container page-stack">
        <p className="state-card">Product not found. Please check the URL or return to the shop.</p>
        <Link className="btn btn-primary" to="/shop">
          Back to Shop
        </Link>
      </section>
    );
  }

  return (
    <section className="container page-stack">
      <div className="details-layout">
        <div>
          <img src={activeImage} alt={product.title} className="details-main-image" />
          <div className="thumb-row">
            {product.images.map((image) => (
              <button
                type="button"
                key={image}
                className={activeImage === image ? 'thumb active' : 'thumb'}
                onClick={() => setActiveImage(image)}
                aria-label={`View image of ${product.title}`}
              >
                <img src={image} alt={product.title} />
              </button>
            ))}
          </div>
        </div>

        <article className="details-card">
          <p className="category-tag">{product.category}</p>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>SKU: {product.sku}</p>
          <p>Rating: {product.rating.toFixed(1)} / 5</p>
          <p>Stock: {product.stock}</p>
          <Price value={product.price} className="price xl" />

          <QuantitySelector
            value={quantity}
            min={1}
            max={product.stock}
            onDecrease={() => setQuantity((prev) => Math.max(1, prev - 1))}
            onIncrease={() => setQuantity((prev) => Math.min(product.stock, prev + 1))}
          />

          <div className="inline-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                addToCart(product, quantity);
                notify(`${product.title} added to cart`, 'success');
              }}
            >
              Add to Cart
            </button>

            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                toggleWishlist(product);
                notify(inWishlist ? 'Removed from wishlist' : 'Added to wishlist', 'info');
              }}
            >
              {inWishlist ? 'Remove Wishlist' : 'Add Wishlist'}
            </button>
          </div>
        </article>
      </div>

      <section>
        <div className="section-head">
          <h2>Related Products</h2>
        </div>
        {relatedProducts.length === 0 ? (
          <p className="state-card">No related products found.</p>
        ) : (
          <div className="product-grid">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </section>
    </section>
  );
};

export default ProductDetails;

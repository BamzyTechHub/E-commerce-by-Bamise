import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../context/storeContext';

const Navbar = () => {
  const { cart, wishlist } = useStore();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="navbar-wrap">
      <nav className="navbar container" aria-label="Main navigation">
        <Link to="/" className="brand" aria-label="ShopSphere home">
          <span className="logo-mark" aria-hidden="true">
            SB
          </span>
          <span>
            ShopSphere
            <small>by OLOYEDE BAMISE EZEKIEL</small>
          </span>
        </Link>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
          <NavLink to="/form">Form</NavLink>
          <NavLink to="/wishlist">
            Wishlist <span className="badge">{wishlist.length}</span>
          </NavLink>
          <NavLink to="/cart">
            Cart <span className="badge">{cartCount}</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

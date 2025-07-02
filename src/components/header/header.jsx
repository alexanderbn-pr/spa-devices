import './header.scss';
import logo from '../../assets/icons/logo.png';
import cart from '../../assets/icons/cart.png';
import Breadcrumbs from '../breadcrumb/breadcrumb';
import { useCart } from '../../hooks/useCart';

const Header = () => {
  const { cartItemsCount } = useCart();
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header-logo" />
      <Breadcrumbs />
      <div className="header-cart">
        <img alt="cart icon" src={cart} />
        {cartItemsCount > 0 && (
          <span className="header-cart-count">{cartItemsCount}</span>
        )}
      </div>
    </header>
  );
};

export default Header;

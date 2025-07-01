import './header.scss';
import logo from '../../assets/icons/logo.png';
import Breadcrumbs from '../breadcrumb/breadcrumb';

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header-logo" />
      <Breadcrumbs />
      <p>Cart Items</p>
    </header>
  );
};

export default Header;

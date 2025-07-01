import { Link, useLocation } from 'react-router-dom';
import './breadcrumb.scss';

const Breadcrumbs = () => {
  const location = useLocation();

  if (location.pathname === '/device') {
    return (
      <nav className="breadcrumb">
        <strong>
          <span>Dispositivos</span>
        </strong>
      </nav>
    );
  }
  if (location.pathname === '/deviceDetails') {
    return (
      <nav className="breadcrumb">
        <Link to="/device">Dispositivos</Link>
        <span> / </span>
        <strong>
          <span>Detalles del Dispositivo</span>
        </strong>
      </nav>
    );
  }
  return null;
};

export default Breadcrumbs;

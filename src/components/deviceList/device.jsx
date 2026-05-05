import { memo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Device = ({ device }) => {
  const navigate = useNavigate();

  return (
    <article
      className="device-card"
      onClick={() => navigate(`/deviceDetails/${device.id}`)}
      role="button"
      tabIndex={0}
      aria-label={`Ver ${device.brand} ${device.model}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(`/deviceDetails/${device.id}`);
        }
      }}
    >
      {/* Image - Product as hero */}
      <div className="device-card-image-container">
        <img
          className="device-card-image"
          alt=""
          src={device.imgUrl}
        />
      </div>

      {/* Info */}
      <div className="device-card-content">
        {/* Brand label - Apple style small uppercase */}
        <span className="device-card-brand">{device.brand}</span>
        
        {/* Model */}
        <h3 className="device-card-model">{device.model}</h3>

        {/* Quick specs - minimal */}
        <div className="device-card-specs">
          {device.ram && <span className="spec-tag">{device.ram}</span>}
          {device.internalMemory?.[0] && (
            <span className="spec-tag">{device.internalMemory[0]}</span>
          )}
          {device.os && <span className="spec-tag">{device.os}</span>}
        </div>

        {/* Price - prominent */}
        <div className="device-card-price">
          <span className="price-amount">{device.price || '—'}</span>
          <span className="price-currency">€</span>
        </div>
      </div>

      {/* Learn more link - Apple style pill */}
      <div className="device-card-cta">
        <span className="cta-text">Ver detalles</span>
        <span className="cta-arrow" aria-hidden="true">›</span>
      </div>
    </article>
  );
};

Device.propTypes = {
  device: PropTypes.object.isRequired,
};

export default memo(Device);
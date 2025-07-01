import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Device = ({ device }) => {
  console.log('Renderizando DeviceComponent', device.id);
  const navigate = useNavigate();

  return (
    <section
      className="device-card"
      onClick={() => navigate(`/deviceDetails/${device.id}`)}
      aria-label="Ver detalles del dispositivo"
    >
      <div className="device-card-info">
        <p className="device-card-model">{device.brand} :</p>
        <p className="device-card-model">{device.model}</p>
      </div>
      <img
        className="device-card-image"
        alt="image of device"
        src={device.imgUrl}
      />
    </section>
  );
};

Device.propTypes = {
  device: PropTypes.object.isRequired,
};

export default React.memo(Device);

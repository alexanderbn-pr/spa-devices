import React from 'react';
import './deviceDetails.scss';
import { useParams } from 'react-router-dom';
import { useDeviceDetails } from '../../hooks/useDeviceDetails';
import { CURRENCY, WEIGHT } from '../../constants';
import { useCart } from '../../hooks/useCart';

const DeviceDetails = () => {
  const { id } = useParams();
  const {
    deviceDetails,
    isLoadingDeviceDetails,
    isErrorDeviceDetails,
    getDeviceDetails,
    storages,
    storageSelected,
    setStorageSelected,
    colors,
    colorSelected,
    setColorSelected,
  } = useDeviceDetails(id);

  const { addToCart, isLoadingAddingCart } = useCart();

  const handleAddDeviceCart = (id, color, storage) => {
    addToCart({
      id,
      colorCode: color,
      storageCode: storage,
    });
  };

  //Para que sea mas facil de entender, he usado este modo de mostrar la carga porque solo se va a mostrar la pantalla entera
  //Y los detalles de los dispositivos va a ser mas extenso
  if (isLoadingDeviceDetails) return <div className="loading">Cargando...</div>;
  if (isErrorDeviceDetails)
    return (
      <section>
        <p className="error-message">
          Ha habido un error al obtenero los dispositivos
        </p>
        <button onClick={() => getDeviceDetails}>Recargar detalles</button>
      </section>
    );

  return (
    <div>
      <img
        className="device-details-image"
        alt="image of device"
        src={deviceDetails.imgUrl}
      />
      <div className="device-details-info">
        <div className="device-details-text">
          <p className="device-card-model">{deviceDetails.brand} :</p>
          <p className="device-card-model">{deviceDetails.model}</p>
          <p className="device-card-info device-card-info-price">
            {deviceDetails.price || 100} {CURRENCY}
          </p>
          <p className="device-card-model">{deviceDetails.cpu}</p>
          <p className="device-card-model">{deviceDetails.ram}</p>
          <p className="device-card-model">{deviceDetails.os}</p>
          <p className="device-card-model">{deviceDetails.displayResolution}</p>
          <p className="device-card-model">{deviceDetails.battery}</p>
          <p className="device-card-model">{deviceDetails.primaryCamera[0]}</p>
          <p className="device-card-model">{deviceDetails.dimentions}</p>
          <p className="device-card-model">
            {deviceDetails.weight} {WEIGHT}
          </p>
        </div>
        <div className="device-details-actions">
          <select
            className="device-color-select"
            value={colorSelected}
            onChange={(e) => setColorSelected(e.target.value)}
          >
            {colors.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            className="device-storage-select"
            value={storageSelected}
            onChange={(e) => setStorageSelected(e.target.value)}
          >
            {storages.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            disabled={!storageSelected || !colorSelected || isLoadingAddingCart}
            onClick={() =>
              handleAddDeviceCart(id, colorSelected, storageSelected)
            }
          >
            {isLoadingAddingCart ? 'Añadiendo...' : 'Añadir al carrito'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetails;

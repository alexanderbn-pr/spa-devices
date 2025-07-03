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

  if (isLoadingDeviceDetails) return <div className="loading">Cargando...</div>;
  if (isErrorDeviceDetails)
    return (
      <section>
        <p className="error-message">
          Ha habido un error al obtenero los dispositivos
        </p>
        <button aria-label="Recargar detalles" onClick={() => getDeviceDetails}>
          Recargar detalles
        </button>
      </section>
    );

  return (
    <main className="details-view">
      <section className="details-view-image">
        <img src={deviceDetails.imgUrl} alt="image of device" />
      </section>
      <section className="details-view-side">
        <aside className="details-view-side-text details-view-container">
          <p>
            <span>Marca: </span> {deviceDetails.brand}
          </p>
          <p>
            <span>Modelo: </span> {deviceDetails.model}
          </p>
          <p>
            <span>Precio: </span> {deviceDetails.price || 100} {CURRENCY}
          </p>
          <p>
            <span>Cpu: </span> {deviceDetails.cpu}
          </p>
          <p>
            <span>Memoria: </span> {deviceDetails.ram}
          </p>
          <p>
            <span>Sistema operativo: </span> {deviceDetails.os}
          </p>
          <p>
            <span>Resolución: </span> {deviceDetails.displayResolution}
          </p>
          <p>
            <span>Bateria: </span> {deviceDetails.battery}
          </p>
          <p>
            <span>Camara principal: </span> {deviceDetails.primaryCamera[0]}
          </p>
          <p>
            <span>Dimensiones: </span> {deviceDetails.dimentions}
          </p>
          <p>
            <span>Peso: </span> {deviceDetails.weight} {WEIGHT}
          </p>
        </aside>
        <aside className="details-view-actions details-view-container">
          <div className="details-view-actions-selects">
            <select
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
              value={storageSelected}
              onChange={(e) => setStorageSelected(e.target.value)}
            >
              {storages.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button
            disabled={!storageSelected || !colorSelected || isLoadingAddingCart}
            onClick={() =>
              handleAddDeviceCart(id, colorSelected, storageSelected)
            }
            aria-label="Añadir al carrito"
          >
            {isLoadingAddingCart ? 'Añadiendo...' : 'Añadir al carrito'}
          </button>
        </aside>
      </section>
    </main>
  );
};

export default DeviceDetails;

'use client';

import './device-details.scss';
import { useParams, Link } from 'react-router-dom';
import { useDeviceDetails } from '../../../../hooks/useDeviceDetails';
import { CURRENCY, WEIGHT, UNKNOWN } from '../../../../constants';
import { useCart } from '../../../../hooks/useCart';
import { DeviceListSkeleton } from '../../../../components/deviceList/DeviceListSkeleton';

const DeviceDetailsPage = () => {
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

  const formatDetail = (value, suffix = '') =>
    value ? `${value}${suffix}` : UNKNOWN;

  if (isLoadingDeviceDetails) return <DeviceListSkeleton count={1} />;
  if (isErrorDeviceDetails)
    return (
      <section className="error-state">
        <p className="error-message">
          Ha habido un error al obtener los dispositivos
        </p>
        <button className="primary" onClick={() => getDeviceDetails()}>
          Recargar detalles
        </button>
      </section>
    );

  return (
    <main className="details-view">
      <section className="details-view-image" aria-label="Imagen del producto">
        <div className="image-container">
          <img 
            src={deviceDetails.imgUrl} 
            alt={`${deviceDetails.brand} ${deviceDetails.model}`} 
          />
        </div>
        <div className="image-price">
          <span className="price-amount">{formatDetail(deviceDetails.price)}</span>
          <span className="price-currency">{CURRENCY}</span>
        </div>
      </section>

      <section className="details-view-side">
        {/* Header - Brand & Model */}
        <div className="details-view-side-header">
          <span className="product-brand">{deviceDetails.brand || UNKNOWN}</span>
          <h1 className="product-model">{deviceDetails.model || UNKNOWN}</h1>
        </div>

        {/* Specs Grid */}
        <div className="details-view-side-specs" aria-label="Características técnicas">
          <div className="spec-row">
            <span className="spec-label">Procesador</span>
            <span className="spec-value">{formatDetail(deviceDetails.cpu)}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Memoria RAM</span>
            <span className="spec-value">{formatDetail(deviceDetails.ram)}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Almacenamiento</span>
            <span className="spec-value">{formatDetail(deviceDetails.internalMemory?.[0])}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Sistema operativo</span>
            <span className="spec-value">{formatDetail(deviceDetails.os)}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Pantalla</span>
            <span className="spec-value">{formatDetail(deviceDetails.displayResolution)}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Batería</span>
            <span className="spec-value">{formatDetail(deviceDetails.battery)}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Cámara principal</span>
            <span className="spec-value">{formatDetail(deviceDetails.primaryCamera?.[0])}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Dimensiones</span>
            <span className="spec-value">{formatDetail(deviceDetails.dimentions)}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Peso</span>
            <span className="spec-value">{formatDetail(deviceDetails.weight, WEIGHT)}</span>
          </div>
        </div>

        {/* Color Selector - Visual swatches */}
        <div className="details-view-side-color">
          <span className="color-label">Color</span>
          <div className="color-options" role="radiogroup" aria-label="Seleccionar color">
            {colors.map((color) => (
              <button
                key={color.value}
                className={`color-swatch ${colorSelected === color.value ? 'selected' : ''}`}
                style={{ backgroundColor: color.value.toLowerCase() }}
                onClick={() => setColorSelected(color.value)}
                aria-label={`Color ${color.label}`}
                aria-pressed={colorSelected === color.value}
                title={color.label}
              />
            ))}
          </div>
        </div>

        {/* Storage Selector - Buttons */}
        <div className="details-view-side-storage">
          <span className="storage-label">Almacenamiento</span>
          <div className="storage-options" role="radiogroup" aria-label="Seleccionar almacenamiento">
            {storages.map((storage) => (
              <button
                key={storage.value}
                className={`storage-btn ${storageSelected === storage.value ? 'selected' : ''}`}
                onClick={() => setStorageSelected(storage.value)}
                aria-label={`${storage.label}`}
                aria-pressed={storageSelected === storage.value}
              >
                {storage.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="details-view-side-actions">
          <div className="stock-status">
            <span className="stock-dot" aria-hidden="true"></span>
            <span>En stock - Entrega en 24-48h</span>
          </div>

          <button
            className="add-to-cart-btn"
            disabled={!storageSelected || !colorSelected || isLoadingAddingCart}
            onClick={() => handleAddDeviceCart(id, colorSelected, storageSelected)}
            aria-label={isLoadingAddingCart ? 'Añadiendo al carrito...' : 'Añadir al carrito'}
          >
            {isLoadingAddingCart ? (
              'Añadiendo...'
            ) : (
              <>
                <span className="btn-icon" aria-hidden="true">🛒</span>
                <span>Añadir al carrito</span>
              </>
            )}
          </button>

          {/* Delivery info */}
          <div className="delivery-info">
            <div className="delivery-option">
              <span className="delivery-icon" aria-hidden="true">📦</span>
              <span>Envío gratis en 24-48 horas</span>
            </div>
            <div className="delivery-option">
              <span className="delivery-icon" aria-hidden="true">🏪</span>
              <span>Recogida en tienda gratis</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="breadcrumb" aria-label="Navegación">
            <Link to="/device">Volver a dispositivos</Link>
          </nav>
        </div>
      </section>
    </main>
  );
};

export default DeviceDetailsPage;
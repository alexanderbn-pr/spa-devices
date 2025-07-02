import React from 'react';
import { useDevices } from '../../hooks/useDevices';
import DeviceList from '../../components/deviceList/deviceList';
import Search from '../../components/search/search';
import './device.scss';

function Device() {
  const {
    getDevices,
    isLoadingDevices,
    isErrorDevices,
    devices,
    setSearchName,
    searchName,
  } = useDevices();

  return (
    <main className="devices-container">
      {isErrorDevices && (
        <section>
          <p className="error-message">
            Ha habido un error al obtenero los dispositivos
          </p>
          <button onClick={() => getDevices}>Recargar dispositivos</button>
        </section>
      )}

      {isLoadingDevices ? (
        <p className="loading">Cargando...</p>
      ) : (
        <>
          <article className="devices-container-header">
            <h3>Lista de dispositivos</h3>
            <Search valueSearch={searchName} setValue={setSearchName} />
          </article>
          <DeviceList devices={devices} />
        </>
      )}
    </main>
  );
}

export default Device;

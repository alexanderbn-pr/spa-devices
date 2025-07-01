import React from 'react';
import './deviceDetails.scss';
import { useParams } from 'react-router-dom';
import { useDeviceDetails } from '../../hooks/useDeviceDetails';

const DeviceDetails = () => {
  const { id } = useParams();
  const {
    deviceDetails,
    isLoadingDeviceDetails,
    isErrorDeviceDetails,
    getDeviceDetails,
  } = useDeviceDetails(id);

  //Para que sea mas facil de entender, he usado este modo de mostrar la carga porque solo se va a mostrar la pantalla entera
  //Y los detalles de los dispositivos va a ser mas extenso
  if (isLoadingDeviceDetails) return <div>Cargando...</div>;
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
      <h2>
        {deviceDetails.brand} - {deviceDetails.model}
      </h2>
    </div>
  );
};

export default DeviceDetails;

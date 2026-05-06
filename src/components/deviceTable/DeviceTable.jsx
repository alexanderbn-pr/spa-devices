/**
 * DeviceTable - Tabla específica para dispositivos
 * Usa la tabla genérica con columnas predefinidas para Dispositivos
 */

import { useNavigate } from 'react-router-dom';
import { Table } from '../Table/Table';

/**
 * Configuración de columnas para la tabla de dispositivos
 * Columnas: imgUrl, brand, model, price
 */
const deviceColumns = [
  {
    key: 'imgUrl',
    label: 'Imagen',
    dataType: 'string',
    sortable: false,
    filterable: false,
    width: '80px',
    render: (device) => device.imgUrl 
      ? <img src={device.imgUrl} alt={device.model} style={{width: 64, height: 64, objectFit: 'cover', borderRadius: 8}} />
      : '—'
  },
  {
    key: 'brand',
    label: 'Marca',
    dataType: 'string',
    sortable: true,
    filterable: true,
  },
  {
    key: 'model',
    label: 'Modelo',
    dataType: 'string',
    sortable: true,
    filterable: true,
  },
  {
    key: 'price',
    label: 'Precio',
    dataType: 'number',
    sortable: true,
    filterable: true,
    render: (device) => `$${device.price ? device.price : '0.00'}`
  }
];

/**
 * Tabla de dispositivos
 * @param {Object} props
 * @param {Array} props.devices - Lista de dispositivos
 * @returns {JSX.Element}
 */
export function DeviceTable({ devices }) {
  const navigate = useNavigate();
  
  // Navegar a deviceDetails con el ID del dispositivo
  const handleRowClick = (device) => {
    navigate(`/deviceDetails/${device.id}`);
  };
  
  // Configuración de la tabla (sin modificar las columnas base)
  const tableConfig = {
    data: devices,
    columns: deviceColumns,
    paginated: true,
    pageSize: 15,
    searchable: true,
    searchableFields: ['brand', 'model'],
    debounceMs: 300,
    sortable: true,
    striped: true,
    hover: true,
    onRowClick: handleRowClick,
    rowClickable: true,
  };

  return <Table config={tableConfig} />;
}

export default DeviceTable;
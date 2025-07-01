import './deviceList.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Device from '../deviceList/device';

const DeviceList = ({ devices }) => {
  console.log('Renderizando DeviceList', devices.length);
  return (
    <div className="devices-list">
      {devices.length > 0 &&
        devices.map((device) => <Device device={device} key={device.id} />)}
    </div>
  );
};

DeviceList.propTypes = {
  devices: PropTypes.array.isRequired,
};

export default React.memo(DeviceList);

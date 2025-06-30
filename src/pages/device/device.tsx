import React, { useEffect } from 'react';
import { useDevices } from '../../hooks/useDevices';

import './device.scss';

function Device() {
  const {getDevices,isLoadingDevices,isErrorDevices, devices} = useDevices();

  return (
    <>
      <h1>Device</h1>
    </>
  );
}

export default Device;

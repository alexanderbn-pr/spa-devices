import { memo } from 'react';
import Device from './device';
import '../deviceList/device-list.scss';


const DeviceList = memo(({ devices }) => {
  return (
    <section className="devices-list">
      {devices.map((device) => (
        <Device device={device} key={device.id} />
      ))}
    </section>
  );
});

export default DeviceList;
'use client';

import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useDevices } from '../../../../hooks/useDevices';
import { useDevicesSearch } from '../../../../hooks/useDevicesSearch';
import { DeviceListSkeleton } from '../../../../components/deviceList/DeviceListSkeleton';
import DeviceList from '../../../../components/deviceList/deviceList';
import Search from '../../../../components/search/Search';
import ErrorBoundary from '../../../../components/error/ErrorBoundary';
import './device.scss';

function DevicePage() {
  // useDevicesSearch maneja el estado Y el debounce
  const { searchName, setSearchName, debouncedFilterName } = useDevicesSearch();
  
  return (
    <main className="devices-container">
      <ErrorBoundary>
        <section className="devices-content">
          {/* Search siempre visible */}
          <article className="devices-content-header">
            <h3>Dispositivos</h3>
            <div className="header-actions">
              <Link to="/device-table" className="btn-view-table">
                Ver tabla
              </Link>
              <Search valueSearch={searchName} setValue={setSearchName} />
            </div>
          </article>

          {/* Suspense - pasa el valor debounced */}
          <Suspense fallback={<DeviceListSkeleton count={6} />}>
            <DeviceContent debouncedSearch={debouncedFilterName} />
          </Suspense>
        </section>
      </ErrorBoundary>
    </main>
  );
}

function DeviceContent({ debouncedSearch }) {
  // Solo recibe el valor debounced, no maneja estado
  const { devices } = useDevices(debouncedSearch);
  return <DeviceList devices={devices} />;
}

export default DevicePage;
'use client';

import { Component } from 'react';
import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useDevices } from '../../hooks/useDevices';
import { useDevicesSearch } from '../../hooks/useDevicesSearch';
import { DeviceListSkeleton } from '../../components/deviceList/DeviceListSkeleton';
import DeviceList from '../../components/deviceList/deviceList';
import Search from '../../components/search/Search';
import './device.scss';

// Error Boundary simple
class DeviceErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-state">
          <p className="error-message">Error al cargar dispositivos</p>
          <button className="primary" onClick={() => this.setState({ hasError: false })}>
            Reintentar
          </button>
        </section>
      );
    }
    return this.props.children;
  }
}

function Device() {
  // useDevicesSearch maneja el estado Y el debounce
  const { searchName, setSearchName, debouncedFilterName } = useDevicesSearch();
  
  return (
    <main className="devices-container">
      <DeviceErrorBoundary>
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
      </DeviceErrorBoundary>
    </main>
  );
}

function DeviceContent({ debouncedSearch }) {
  // Solo recibe el valor debounced, no maneja estado
  const { devices } = useDevices(debouncedSearch);
  return <DeviceList devices={devices} />;
}

export default Device;
/**
 * DeviceTablePage - Página de tabla de dispositivos
 * Usa useSuspenseQuery + ErrorBoundary + Suspense como las otras páginas
 */

import { Component, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDevices } from '../../hooks/useDevices';
import DeviceTable from '../../components/DeviceTable/DeviceTable';
import { DeviceTableSkeleton } from '../../components/deviceTable/DeviceTableSkeleton';
import './DeviceTablePage.scss';

// Error Boundary simple (igual que en device.jsx)
class DeviceTableErrorBoundary extends Component {
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
          <p className="error-message">Error al cargar la tabla de dispositivos</p>
          <button className="primary" onClick={() => this.setState({ hasError: false })}>
            Reintentar
          </button>
        </section>
      );
    }
    return this.props.children;
  }
}

/**
 * Componente principal de la página
 */
function DeviceTablePage() {
  const navigate = useNavigate();
  
  return (
    <main className="device-table-container">
      <DeviceTableErrorBoundary>
        <section className="device-table-content">
          {/* Título con botón de volver */}
          <article className="device-table-header">
            <div className="header-left">
              <button 
                className="btn-back" 
                onClick={() => navigate('/device')}
              >
                ← Volver
              </button>
              <h3>Tabla de Dispositivos</h3>
            </div>
            <p className="header-subtitle">
              Vista comparar dispositivos
            </p>
          </article>

          {/* Suspense con los datos */}
          <Suspense fallback={<DeviceTableSkeleton count={5} />}>
            <DeviceTableContent />
          </Suspense>
        </section>
      </DeviceTableErrorBoundary>
    </main>
  );
}

/**
 * Contenido que consume los datos (se suspende)
 */
function DeviceTableContent() {
  const { devices } = useDevices('');
  return <DeviceTable devices={devices} />;
}

export default DeviceTablePage;
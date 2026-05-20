/**
 * DeviceTablePage - Página de tabla de dispositivos
 * Usa useSuspenseQuery + ErrorBoundary + Suspense como las otras páginas
 */

import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDevices } from '../../../../hooks/useDevices';
import DeviceTable from '../../../../components/deviceTable/DeviceTable';
import { DeviceTableSkeleton } from '../../../../components/deviceTable/DeviceTableSkeleton';
import ErrorBoundary from '../../../../components/error/ErrorBoundary';
import './DeviceTablePage.scss';

/**
 * Componente principal de la página
 */
function DeviceTablePage() {
  const navigate = useNavigate();
  
  return (
    <main className="device-table-container">
      <ErrorBoundary>
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
      </ErrorBoundary>
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
import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Header from './components/header/header';
import ErrorBoundary from './components/error/ErrorBoundary';
import { ToastProvider } from './contexts/ToastContext';
import { ToastRenderer } from './components/toast/ToastProvider';

// Import i18n configuration
import './i18n';

// Code splitting por ruta - cada página se carga solo cuando se necesita
const Device = lazy(() => import('./pages/device/device'));
const DeviceDetails = lazy(() => import('./pages/deviceDetails/deviceDetails'));
const DeviceTable = lazy(() => import('./pages/device-table/DeviceTablePage'));

// Componente de carga para Suspense
function LoadingFallback() {
  return <div className="loading">Cargando...</div>;
}

// Global fallback for uncaught errors
function GlobalErrorFallback() {
  return (
    <div className="loading">
      Ha ocurrido un error inesperado. Por favor, recarga la página.
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <Router>
        <ToastRenderer />
        <Header />
        <ErrorBoundary fallback={<GlobalErrorFallback />}>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Navigate to="/device" replace />} />
              <Route path="/device" element={<Device />} />
              <Route path="/deviceDetails/:id" element={<DeviceDetails />} />
              <Route path="/device-table" element={<DeviceTable />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </ToastProvider>
  );
}

export default App;
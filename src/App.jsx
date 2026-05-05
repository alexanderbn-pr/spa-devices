import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Header from './components/header/header';

// Code splitting por ruta - cada página se carga solo cuando se necesita
const Device = lazy(() => import('./pages/device/device'));
const DeviceDetails = lazy(() => import('./pages/deviceDetails/deviceDetails'));

// Componente de carga para Suspense
function LoadingFallback() {
  return <div className="loading">Cargando...</div>;
}

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/device" replace />} />
          <Route path="/device" element={<Device />} />
          <Route path="/deviceDetails/:id" element={<DeviceDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
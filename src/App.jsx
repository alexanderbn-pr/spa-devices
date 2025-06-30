import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Device from './pages/device/device';
import DeviceDetails from './pages/deviceDetails/deviceDetails';
import Header from './components/header/header';
import Footer from './components/footer/footer';

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/device" replace />} />
          <Route path="/device" element={<Device />} />
          <Route path="/deviceDetails" element={<DeviceDetails />} />
        </Routes>
        <Footer />
      </Router>
  );
}

export default App;

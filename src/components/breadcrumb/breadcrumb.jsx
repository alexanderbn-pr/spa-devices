'use client';

import { Link, useLocation, useMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDeviceDetails } from '../../hooks/useDeviceDetails';

import './breadcrumb.scss';

const Breadcrumbs = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const match = useMatch('/deviceDetails/:id');
  const id = match?.params?.id;
  const { deviceDetails } = useDeviceDetails(id);
  let model;

  if (location.pathname === '/device') {
    return (
      <nav className="breadcrumb">
        <strong>
          <span>{t('nav.devices')}</span>
        </strong>
      </nav>
    );
  }

  if (location.pathname.includes('/deviceDetails/')) {
    model = deviceDetails?.model;

    return (
      <nav className="breadcrumb">
        <Link to="/device">{t('nav.devices')}</Link>
        <span> / </span>
        <strong>
          <span>{model}</span>
        </strong>
      </nav>
    );
  }
  return null;
};

export default Breadcrumbs;

/**
 * Skeleton para mostrar mientras cargan los dispositivos
 * Evita layout shift y da feedback visual inmediato
 * Se usa como fallback de Suspense
 */
import { useTranslation } from 'react-i18next';

const DeviceListSkeleton = ({ count = 6 }) => {
  const { t } = useTranslation();

  return (
    <section className="devices-list" aria-busy="true" aria-label={t('loadingDevices')}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="device-card device-card-skeleton"
          aria-hidden="true"
        >
          {/* Image skeleton */}
          <div className="device-card-image-skeleton" />

          {/* Info skeleton */}
          <div className="device-card-info-skeleton">
            <div className="device-card-model-skeleton" />
            <div className="device-card-model-skeleton model-short" />
          </div>

          {/* Price skeleton */}
          <div className="device-card-price-skeleton" />
        </div>
      ))}
    </section>
  );
};

DeviceListSkeleton.defaultProps = {
  count: 6,
};

export { DeviceListSkeleton };
export default DeviceListSkeleton;
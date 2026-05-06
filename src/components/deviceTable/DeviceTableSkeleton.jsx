import './DeviceTableSkeleton.scss';

/**
 * Skeleton para la tabla de dispositivos
 * Se usa como fallback de Suspense mientras cargan los datos
 * @param {Object} props
 * @param {number} props.count - Número de filas a mostrar (default: 5)
 * @returns {JSX.Element}
 */
function DeviceTableSkeleton({ count = 5 }) {
  return (
    <div className="device-table-skeleton">
      {/* Header skeleton */}
      <div className="skeleton-row">
        <div className="skeleton-img" style={{ width: 80 }} />
        <div className="skeleton-text skeleton-text-long" />
        <div className="skeleton-text skeleton-text-long" />
        <div className="skeleton-price" />
      </div>

      {/* Skeleton rows */}
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-row">
          {/* Image column - 64px */}
          <div className="skeleton-img" />

          {/* Brand column */}
          <div className="skeleton-text skeleton-text-short" />

          {/* Model column */}
          <div className="skeleton-text skeleton-text-long" />

          {/* Price column */}
          <div className="skeleton-price" />
        </div>
      ))}
    </div>
  );
}

DeviceTableSkeleton.defaultProps = {
  count: 5,
};

export { DeviceTableSkeleton };
export default DeviceTableSkeleton;
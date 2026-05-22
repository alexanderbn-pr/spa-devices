import { useQuery } from '@tanstack/react-query';
import { fetchDeviceDetails } from '../services/getDeviceDetails';
import { queryKeys } from '../lib/query-keys';

/**
 * useBreadcrumbDevice — Hook TanStack Query mínimo para el breadcrumb.
 * Reusa la misma queryKey que useDeviceDetails para aprovechar la caché.
 *
 * @param {string} id - ID del dispositivo
 * @returns {{ modelName: string | undefined, isLoading: boolean }}
 */
export const useBreadcrumbDevice = (id) => {
  const { data: deviceDetails, isLoading } = useQuery({
    queryKey: queryKeys.devices.detail(id),
    queryFn: () => fetchDeviceDetails(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    modelName: deviceDetails?.model,
    isLoading,
  };
};

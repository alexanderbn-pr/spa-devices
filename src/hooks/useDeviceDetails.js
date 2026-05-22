import { useQuery } from '@tanstack/react-query';
import { fetchDeviceDetails } from '../services/getDeviceDetails';
import { queryKeys } from '../lib/query-keys';
import { EXPIRATION } from '../constants';

/**
 * Hook para obtener detalles de un dispositivo específico.
 * Solo maneja fetching con TanStack Query.
 * La selección de almacenamiento/color se maneja en useDeviceOptions.
 */
export const useDeviceDetails = (id) => {
  const {
    data: deviceDetails,
    isLoading: isLoadingDeviceDetails,
    isError: isErrorDeviceDetails,
    refetch: getDeviceDetails,
  } = useQuery({
    queryKey: queryKeys.devices.detail(id),
    queryFn: () => fetchDeviceDetails(id),
    enabled: !!id,
    staleTime: EXPIRATION,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    getDeviceDetails,
    isLoadingDeviceDetails,
    isErrorDeviceDetails,
    deviceDetails,
  };
};
